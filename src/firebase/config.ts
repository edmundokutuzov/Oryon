// This configuration is now driven by environment variables.
// For local development, you MUST create a .env.local file in the root of your project.
// For production (e.g., Netlify), you MUST set these environment variables in your deployment provider's dashboard.
//
// Example .env.local:
// NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
// NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"
// NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
// NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-auth-domain"
// NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"

export const firebaseConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  measurementId: "", // This value is optional
};

if (!firebaseConfig.apiKey) {
  throw new Error('Firebase configuration is missing. Make sure to set the environment variables in .env.local or your deployment provider.');
}
