
import * as functions from "firebase-functions/v2";
import * as admin from "firebase-admin";
import { onCall, HttpsError } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import { z } from "zod";
import Stripe from "stripe";
import * as logger from "firebase-functions/logger";

admin.initializeApp();

// ============================================================================
// ARCHITECTURAL CORE: SHARED SERVICES (SINGLETONS)
// Centralized, reusable, and performant logic hubs.
// ============================================================================

/**
 * Service to manage stock inventory.
 * In a real-world scenario, this would connect to a database or inventory API.
 * @class StockService
 */
class StockService {
  private static instance: StockService;

  private constructor() {
    logger.info("StockService Singleton Initialized (Warm Start)");
  }

  public static getInstance(): StockService {
    if (!StockService.instance) {
      StockService.instance = new StockService();
    }
    return StockService.instance;
  }

  /**
   * Checks if a given quantity of an item is in stock.
   * @param {string} itemId - The ID of the item.
   * @param {number} quantity - The quantity to check.
   * @returns {Promise<boolean>}
   */
  async verifyStock(itemId: string, quantity: number): Promise<boolean> {
    // SIMULATION: In a real system, this would query a database.
    logger.info(`Verifying stock for item ${itemId}, quantity ${quantity}.`);
    // Fake stock levels for demonstration.
    const stockDatabase: { [key: string]: number } = { "prod_abc": 10, "prod_xyz": 0 };
    await new Promise(resolve => setTimeout(resolve, 50)); // Simulate DB latency
    return (stockDatabase[itemId] || 0) >= quantity;
  }
}

/**
 * Service to handle tax calculations.
 * Can be expanded to handle different regions and tax laws.
 * @class TaxService
 */
class TaxService {
  private static instance: TaxService;
  private taxRate = 0.17; // 17% VAT for Mozambique (IVA)

  private constructor() {
    logger.info("TaxService Singleton Initialized (Warm Start)");
  }

  public static getInstance(): TaxService {
    if (!TaxService.instance) {
      TaxService.instance = new TaxService();
    }
    return TaxService.instance;
  }

  /**
   * Calculates the tax for a given amount.
   * @param {number} amount - The amount in the smallest currency unit (e.g., cents).
   * @returns {Promise<number>} - The calculated tax amount.
   */
  async calculateTax(amount: number): Promise<number> {
    await new Promise(resolve => setTimeout(resolve, 20)); // Simulate calculation latency
    const tax = Math.floor(amount * this.taxRate);
    logger.info(`Calculated tax for amount ${amount}: ${tax}`);
    return tax;
  }
}

/**
 * Orchestration service for handling orders.
 * This service demonstrates the Hexagonal Architecture principle by calling
 * other independent services (Stock, Tax, Payment).
 * @class OrderService
 */
class OrderService {
  private static instance: OrderService;
  private stripe: Stripe;
  private stockService: StockService;
  private taxService: TaxService;

  private constructor(stripeKey: string) {
    this.stripe = new Stripe(stripeKey, { apiVersion: "2024-06-20", typescript: true });
    this.stockService = StockService.getInstance();
    this.taxService = TaxService.getInstance();
    logger.info("OrderService Singleton Initialized (Warm Start)");
  }

  public static getInstance(stripeKey: string): OrderService {
    if (!OrderService.instance) {
      OrderService.instance = new OrderService(stripeKey);
    }
    return OrderService.instance;
  }

  /**
   * Processes a full order, including stock check, tax calculation, and payment.
   * @param {object} orderData - The validated order data.
   * @returns {Promise<object>} - The result of the payment intent.
   */
  async processNewOrder(orderData: { itemId: string; quantity: number; amount: number; currency: "usd" | "brl" | "eur"; paymentMethodId: string; customerId: string; }) {
    const { itemId, quantity, amount, currency, paymentMethodId, customerId } = orderData;

    // --- Performance Optimization: Concurrency ---
    // Run independent checks in parallel.
    const [hasStock, taxAmount] = await Promise.all([
      this.stockService.verifyStock(itemId, quantity),
      this.taxService.calculateTax(amount),
    ]);

    if (!hasStock) {
      throw new HttpsError("failed-precondition", `Item ${itemId} is out of stock.`);
    }

    const totalAmount = amount + taxAmount;

    // Process the payment via Stripe
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: totalAmount,
      currency,
      payment_method: paymentMethodId,
      customer: customerId, // Associate with Firebase UID
      confirm: true,
      automatic_payment_methods: { enabled: true, allow_redirects: "never" },
      metadata: {
        itemId: itemId,
        quantity: quantity,
        tax_amount: taxAmount,
      },
    });

    // In a real system, you would now save the order to your Firestore database.
    // e.g., await admin.firestore().collection('orders').add({ ... });

    return { clientSecret: paymentIntent.client_secret, status: paymentIntent.status, totalAmount };
  }
}


// ============================================================================
// CONTROLLER LAYER: FIREBASE FUNCTION HANDLERS
// Lean, secure entry points that delegate logic to the service layer.
// ============================================================================

// --- 1. NEW Order System ---
const stripeKey = defineSecret("STRIPE_API_KEY");

const PlaceOrderSchema = z.object({
  itemId: z.string().startsWith("prod_"),
  quantity: z.number().int().positive(),
  amount: z.number().int().positive().max(1000000), // Base amount in cents
  currency: z.enum(["usd", "brl", "eur"]),
  paymentMethodId: z.string().startsWith("pm_")
});

export const placeOrder = onCall({ secrets: [stripeKey], region: "us-central1", enforceAppCheck: true }, async (request) => {
  // A. Authentication & Authorization Check
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Authentication is required.");
  }
  const uid = request.auth.uid;

  // B. Sanitization (Code Firewall)
  const validation = PlaceOrderSchema.safeParse(request.data);
  if (!validation.success) {
    logger.warn("Invalid order data received", { uid, errors: validation.error.flatten() });
    throw new HttpsError("invalid-argument", "Invalid or corrupt order data provided.");
  }

  try {
    // C. Delegation to the Orchestration Service (Singleton Pattern)
    const orderService = OrderService.getInstance(stripeKey.value());
    const result = await orderService.processNewOrder({
      ...validation.data,
      customerId: uid,
    });
    return { status: "success", orderResult: result };
  } catch (error) {
    logger.error("Order processing failed unexpectedly", { uid, error });
    if (error instanceof HttpsError) {
      throw error; // Re-throw known errors (e.g., out of stock)
    }
    if (error instanceof Stripe.errors.StripeCardError) {
      throw new HttpsError("aborted", error.message); // Client-safe Stripe error
    }
    // D. Graceful Failure Response
    throw new HttpsError("internal", "The system encountered an unexpected issue and has recovered.");
  }
});

/**
 * REUSABILITY DEMO: This is a Firestore trigger that could re-use the SAME OrderService
 * to handle a different business process, e.g., re-processing a failed payment.
 */
// export const onOrderUpdate = onDocumentUpdated("/orders/{orderId}", async (event) => {
//   const orderData = event.data?.after.data();
//   if (orderData?.status === 'requires_payment_method') {
//     const orderService = OrderService.getInstance(stripeKey.value());
//     // You could call a different method on the service here, e.g.,
//     // await orderService.retryPayment(orderData);
//     logger.info(`Re-processing order ${event.params.orderId} via OrderService.`);
//   }
// });


// --- 2. EXISTING Payment & Admin Functions ---

const PaymentSchema = z.object({
  amount: z.number().int().positive("Amount must be a positive integer.").max(1000000, "Amount exceeds the maximum limit."),
  currency: z.enum(["usd", "eur", "brl"], { errorMap: () => ({ message: "Invalid currency provided." }) }),
  paymentMethodId: z.string().startsWith("pm_", "Invalid payment method ID format.")
});

export const createPaymentIntent = onCall(
  { secrets: [stripeKey], region: "us-central1", enforceAppCheck: true, cors: [/^https:\/\/your-app-domain\.com$/] },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError("unauthenticated", "Authentication is required to perform this action.");
    }
    const validationResult = PaymentSchema.safeParse(request.data);
    if (!validationResult.success) {
      throw new HttpsError("invalid-argument", "The provided payment data is invalid.", validationResult.error.flatten());
    }
    const { amount, currency, paymentMethodId } = validationResult.data;

    try {
      const stripe = new Stripe(stripeKey.value(), { apiVersion: "2024-06-20", typescript: true });
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method: paymentMethodId,
        customer: request.auth.uid,
        confirm: true,
        automatic_payment_methods: { enabled: true, allow_redirects: "never" }
      });
      return { success: true, clientSecret: paymentIntent.client_secret, status: paymentIntent.status };
    } catch (error: unknown) {
      logger.error("Stripe API Error:", error);
      let clientMessage = "A failure occurred while processing the payment.";
      if (error instanceof Stripe.errors.StripeCardError) {
        clientMessage = error.message;
      }
      throw new HttpsError("aborted", clientMessage);
    }
  }
);

const ADMIN_SECRET = "oryon-super-secret-key-2024";

export const setAdminRole = functions.https.onCall(async (data, context) => {
  const isFirstAdminAttempt = data.adminSecret === ADMIN_SECRET;
  if (context.auth?.token.admin !== true && !isFirstAdminAttempt) {
    throw new functions.https.HttpsError("permission-denied", "Apenas administradores podem adicionar outros administradores.");
  }
  const email = data.email;
  if (!email) {
    throw new functions.https.HttpsError("invalid-argument", "O email é obrigatório.");
  }
  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    await admin.auth().revokeRefreshTokens(user.uid);
    return { message: `Sucesso! ${email} foi promovido a administrador. O utilizador terá de fazer login novamente.` };
  } catch (error: any) {
    logger.error("Erro ao definir admin role:", error);
    if (error.code === 'auth/user-not-found') {
      throw new functions.https.HttpsError("not-found", `O utilizador com o email ${email} não foi encontrado.`);
    }
    throw new functions.https.HttpsError("internal", error.message);
  }
});

    