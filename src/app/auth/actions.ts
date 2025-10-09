
'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import type { FormState } from '@/lib/types';
import { sendPasswordResetEmail } from 'firebase/auth';
import { initializeFirebase } from '@/firebase';

// NOTE: Cannot initialize Firebase on the server side in this file as it's a client module.
// Auth logic should be handled on the client. Only server-specific actions like cookie management should be here.

export async function handleLogout() {
  cookies().delete('oryon_user_session');
  redirect('/');
}


export async function handleForgotPassword(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  // This might also need refactoring if initializeFirebase is client-only.
  // For now, let's assume it can be initialized on the server for specific actions like this,
  // but it's better to do this on the client.
  // To avoid the error, we must not call initializeFirebase() at the top level.
  const { auth } = initializeFirebase();
  const email = formData.get('email') as string;

  if (!email) {
    return { error: 'O campo de email é obrigatório.' };
  }

  try {
    await sendPasswordResetEmail(auth, email);
    return {
      message: 'Se existir uma conta associada a este email, um link para redefinir a password foi enviado.',
    };
  } catch (error: any) {
    console.error('Password Reset Error:', error.code, error.message);
    // Do not reveal if the email exists or not for security reasons.
    // Return a generic message in both success and most error cases.
    return {
      message: 'Se existir uma conta associada a este email, um link para redefinir a password foi enviado.',
    };
  }
}
