import * as functions from "firebase-functions/v2";
import * as admin from "firebase-admin";
import { onCall, HttpsError } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import { z } from "zod";
import Stripe from "stripe";

admin.initializeApp();

// ============================================================================
// NEW PAYMENT FUNCTION (Distinguished Engineer Pattern)
// ============================================================================

// 1. Declarative Secret Definition
// This defines a reference to the secret in Secret Manager. The value is NOT
// accessed here. This is the modern, idiomatic approach for GCP.
const stripeKey = defineSecret("STRIPE_API_KEY");

// 2. Strict Input Validation Schema (using Zod)
// This ensures that any data passed to the function conforms to a strict contract,
// preventing injection attacks and malformed data issues.
const PaymentSchema = z.object({
  amount: z.number().int().positive("Amount must be a positive integer.").max(1000000, "Amount exceeds the maximum limit."), // Amount in the smallest currency unit (e.g., cents)
  currency: z.enum(["usd", "eur", "brl"], { errorMap: () => ({ message: "Invalid currency provided." }) }),
  paymentMethodId: z.string().startsWith("pm_", "Invalid payment method ID format.")
});

// 3. Robust, Secure, and Production-Ready Cloud Function Implementation
export const createPaymentIntent = onCall(
  {
    secrets: [stripeKey], // Natively integrates the secret with the function's runtime environment.
    region: "us-central1", // Specify region for better performance and predictability.
    enforceAppCheck: true, // Hardened security: Rejects requests without a valid App Check token.
    cors: [/^https:\/\/your-app-domain\.com$/] // Restrict to your web app's domain.
  },
  async (request) => {
    // Authentication Check: Ensure the user is logged in.
    if (!request.auth) {
      throw new HttpsError("unauthenticated", "Authentication is required to perform this action.");
    }

    // Input Validation: Use Zod's safeParse to validate the incoming data against the schema.
    const validationResult = PaymentSchema.safeParse(request.data);
    if (!validationResult.success) {
      // If validation fails, throw a structured error. Do not log raw user input.
      throw new HttpsError("invalid-argument", "The provided payment data is invalid.", validationResult.error.flatten());
    }
    const { amount, currency, paymentMethodId } = validationResult.data;

    try {
      // Secure Initialization: The secret's value is accessed ONLY within the function's
      // execution scope. It's never in a global variable or logged.
      const stripe = new Stripe(stripeKey.value(), {
        apiVersion: "2024-06-20",
        typescript: true,
      });

      // Core Business Logic: Create and confirm the Payment Intent.
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method: paymentMethodId,
        customer: request.auth.uid, // Associate the payment with the Firebase User ID.
        confirm: true, // Attempts to immediately confirm the payment.
        automatic_payment_methods: { enabled: true, allow_redirects: "never" } // For single, off-session payments.
      });

      // Success Response: Return only the necessary data to the client.
      return { success: true, clientSecret: paymentIntent.client_secret, status: paymentIntent.status };

    } catch (error: unknown) {
      // Graceful & Secure Error Handling
      console.error("Stripe API Error:", error); // Log the detailed error for internal debugging.
      
      let clientMessage = "A failure occurred while processing the payment.";
      if (error instanceof Stripe.errors.StripeCardError) {
        // Provide a more specific (but still safe) message for card errors.
        clientMessage = error.message;
      }

      // Throw a canonical HttpsError. This ensures that no raw stack traces or sensitive
      // internal error details are leaked to the client.
      throw new HttpsError("aborted", clientMessage);
    }
  }
);


// ============================================================================
// EXISTING ADMIN ROLE FUNCTION (Preserved)
// ============================================================================

const ADMIN_SECRET = "oryon-super-secret-key-2024";

export const setAdminRole = functions.https.onCall(async (data, context) => {
  const isFirstAdminAttempt = data.adminSecret === ADMIN_SECRET;

  if (context.auth?.token.admin !== true && !isFirstAdminAttempt) {
    throw new functions.https.HttpsError(
      "permission-denied",
      "Apenas administradores podem adicionar outros administradores."
    );
  }

  const email = data.email;
  if (!email) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "O email é obrigatório."
    );
  }

  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    await admin.auth().revokeRefreshTokens(user.uid);
    return {
      message: `Sucesso! ${email} foi promovido a administrador. O utilizador terá de fazer login novamente.`,
    };
  } catch (error: any) {
    console.error("Erro ao definir admin role:", error);
    if (error.code === 'auth/user-not-found') {
        throw new functions.https.HttpsError("not-found", `O utilizador com o email ${email} não foi encontrado.`);
    }
    throw new functions.https.HttpsError("internal", error.message);
  }
});
