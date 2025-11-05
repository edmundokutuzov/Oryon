
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

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
