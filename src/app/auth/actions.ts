
'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { users } from '@/lib/data';
import type { FormState } from '@/lib/types';
import { sendPasswordResetEmail } from 'firebase/auth';
import { initializeFirebase } from '@/firebase';

const { auth } = initializeFirebase();

export async function handleLogin(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  
  // Find the admin user (ID 1) from the mock data
  const adminUser = users.find((u) => u.id === 1);

  if (!adminUser) {
    return { error: 'Utilizador administrador não encontrado nos dados mock.' };
  }

  // Create the session object for the admin user
  const userSession = {
    id: adminUser.id,
    name: adminUser.name,
    email: adminUser.email,
    role: adminUser.role,
    permissions: adminUser.permissions,
    uid: 'admin_placeholder_uid', // Placeholder UID
  };

  // Set the session cookie
  cookies().set('oryon_user_session', JSON.stringify(userSession), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });

  // Redirect to the dashboard
  redirect('/dashboard');
}

export async function handleLogout() {
  cookies().delete('oryon_user_session');
  redirect('/');
}


export async function handleForgotPassword(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
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
