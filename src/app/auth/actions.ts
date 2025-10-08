
'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeFirebase } from '@/firebase';
import { users } from '@/lib/data'; // Still needed for mock permissions/roles

// Initialize Firebase Admin SDK
const { auth } = initializeFirebase();

export async function handleLogin(
  prevState: { error: string | null } | null,
  formData: FormData
): Promise<{ error: string | null }> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email e password são obrigatórios.' };
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Find the corresponding user in our mock data to get roles/permissions
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
