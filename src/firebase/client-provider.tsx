
'use client';
import { FirebaseProvider, initializeFirebase } from '.';
import { ReactNode } from 'react';

const { app, auth, firestore } = initializeFirebase();

/**
 * Provides the Firebase context to client-side components.
 * This ensures that Firebase is initialized only once.
 */
export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  return (
    <FirebaseProvider app={app} auth={auth} firestore={firestore}>
      {children}
    </FirebaseProvider>
  );
}
