
import * as functions from "firebase-functions/v2";
import * as admin from "firebase-admin";

// Native Firebase integration with Google Cloud Secret Manager.
// This is the correct, modern approach.
import { defineSecret } from "firebase-functions/params";

admin.initializeApp();

// ============================================================================
// SECRET MANAGEMENT: BEST PRACTICES IMPLEMENTATION
// ============================================================================

/**
 * Define the secret parameter.
 * This declaration DOES NOT access the secret value. It only defines a reference
 * to the secret that will be managed by the Google Cloud infrastructure.
 * The secret name 'STRIPE_API_KEY' will be created in Secret Manager.
 */
const stripeApiKey = defineSecret("STRIPE_API_KEY");

/**
 * An HTTPS Cloud Function demonstrating secure access to a secret.
 * It simulates processing a payment using a Stripe API key fetched from Secret Manager.
 * 
 * This function is configured with the `secrets` option, which grants it IAM access
 * to the specified secret(s) at deployment time.
 */
export const processPaymentWithSecret = functions.https.onRequest(
  { secrets: [stripeApiKey] },
  async (req: functions.https.Request, res: functions.Response): Promise<void> => {
    // Security Best Practice: Only allow POST requests for state-changing operations.
    if (req.method !== "POST") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    // Input Validation
    const { amount, currency, token } = req.body as { amount?: number; currency?: string; token?: string };
    if (!amount || !currency || !token) {
      res.status(400).json({ error: "Bad Request: Missing 'amount', 'currency', or 'token' in request body." });
      return;
    }

    try {
      // --- CORE LOGIC: Access the secret's value ONLY inside the runtime scope ---
      // The .value() method is synchronous and only works here, inside the function execution.
      // It retrieves the secret value that the Cloud Functions infrastructure has made available.
      const key: string = stripeApiKey.value();

      if (!key) {
        // This case should ideally not happen if the secret is provisioned correctly,
        // but it's a critical safeguard.
        console.error("CRITICAL: STRIPE_API_KEY secret was not available at runtime.");
        res.status(500).json({ error: "Internal Server Error: Payment processing configuration is missing." });
        return;
      }
      
      // --- Simulate calling a third-party API (e.g., Stripe) ---
      // In a real implementation, you would use the Stripe Node.js library here.
      // const stripe = new Stripe(key);
      // const charge = await stripe.charges.create({ ... });
      console.log(`Simulating Stripe API call with amount: ${amount} ${currency}`);

      // Simulating a potential error from the third-party API.
      if (token === 'tok_fail') {
          throw new Error("Simulated Stripe API Error: Invalid card token.");
      }

      // Success Response
      res.status(200).json({
        success: true,
        transactionId: `txn_${Date.now()}`,
        amount,
        currency,
      });

    } catch (error: unknown) {
      console.error("Error during payment processing:", error);

      // Graceful error handling
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      res.status(500).json({
        success: false,
        error: `Internal Server Error: Could not process payment. Reason: ${errorMessage}`,
      });
    }
  }
);


// ============================================================================
// EXISTING ADMIN ROLE FUNCTION
// ============================================================================

// LEIA-ME: A chave mestra é uma medida de segurança temporária para o primeiro admin.
// Em produção, esta variável deve ser configurada de forma segura (ex: via `firebase functions:config:set` ou Secret Manager).
const ADMIN_SECRET = "oryon-super-secret-key-2024";

/**
 * Define uma Custom Claim de administrador num utilizador.
 * @param {string} data.email O email do utilizador a ser promovido.
 * @param {string} [data.adminSecret] A chave mestra para a primeira promoção.
 */
export const setAdminRole = functions.https.onCall(async (data, context) => {
  
  const isFirstAdminAttempt = data.adminSecret === ADMIN_SECRET;

  // 1. Verificação de Segurança Robusta
  // Permite a execução se o chamador já for admin OU se estiver a usar a chave mestra.
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
    // 2. Encontrar o utilizador pelo email
    const user = await admin.auth().getUserByEmail(email);

    // 3. Definir a Custom Claim
    // Isto adiciona { admin: true } ao token de autenticação do utilizador.
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });

    // 4. (Opcional, mas recomendado) Forçar o logout do utilizador
    // para que ele tenha de fazer login novamente e receber o novo token.
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
