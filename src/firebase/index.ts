
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

// Re-export all members from the 'provider' module
export * from './provider';

let app: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

/**
 * Initializes and returns the Firebase app, auth, and firestore instances.
 * This function ensures that Firebase is initialized only once.
 */
export function initializeFirebase(): {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
} {
  if (typeof window === 'undefined') {
    // Server-side initialization
    const apps = getApps();
    app = apps.length ? getApp() : initializeApp(firebaseConfig);
  } else {
    // Client-side initialization
    if (!app) {
      app = initializeApp(firebaseConfig);
    }
  }
  
  auth = getAuth(app);
  firestore = getFirestore(app);

  return { app, auth, firestore };
}
