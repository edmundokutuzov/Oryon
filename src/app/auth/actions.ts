
'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { initializeFirebase } from '@/firebase';
import { users } from '@/lib/data';

const { auth } = initializeFirebase();

type FormState = {
  error?: string | null;
  message?: string | null;
}

export async function handleLogin(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email e password são obrigatórios.' };
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const appUser = users.find((u) => u.email === user.email);

    if (!appUser) {
      return { error: 'Utilizador não encontrado na base de dados da aplicação.' };
    }

    const userSession = {
      id: appUser.id,
      name: appUser.name,
      email: user.email,
      role: appUser.role,
      permissions: appUser.permissions,
      uid: user.uid,
    };

    cookies().set('oryon_user_session', JSON.stringify(userSession), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    
  } catch (error: any) {
    console.error('Firebase Authentication Error:', error.code, error.message);
    switch (error.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return { error: 'Credenciais inválidas. Por favor, tente novamente.' };
      case 'auth/too-many-requests':
        return { error: 'Acesso temporariamente bloqueado devido a muitas tentativas. Tente novamente mais tarde.' };
      default:
        return { error: 'Ocorreu um erro inesperado. Por favor, tente novamente.' };
    }
  }

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
