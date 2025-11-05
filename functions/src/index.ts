
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

/**
 * Define uma Custom Claim de administrador num utilizador.
 * Apenas um administrador já autenticado pode chamar esta função.
 * @param {string} data.email O email do utilizador a ser promovido.
 */
export const setAdminRole = functions.https.onCall(async (data, context) => {
  // 1. Verificação de Segurança Robusta
  // Verifica se o *chamador* da função já é um admin.
  if (context.auth?.token.admin !== true) {
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
    throw new functions.https.HttpsError("internal", error.message);
  }
});
