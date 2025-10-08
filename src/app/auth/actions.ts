
'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import { users } from '@/lib/data';

const { auth, firestore } = initializeFirebase();

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
  const rememberMe = formData.get('remember') === 'on';

  if (!email || !password) {
    return { error: 'Email e password são obrigatórios.' };
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    const userDocRef = doc(firestore, 'users', firebaseUser.uid);
    const userDoc = await getDoc(userDocRef);

    let appUser;

    if (userDoc.exists()) {
      const firestoreData = userDoc.data();
      // Combine Firestore data with a consistent ID structure from mock data if needed
      appUser = {
        id: users.find(u => u.email === firebaseUser.email)?.id || 0, // Fallback ID
        ...firestoreData,
      };
    } else {
      // Fallback to mock data if user is not in Firestore (for demo purposes)
      appUser = users.find((u) => u.email === firebaseUser.email);
    }
    
    if (!appUser) {
      return { error: 'Utilizador não encontrado na base de dados da aplicação.' };
    }
    
    // Placeholder for 2FA logic
    if (appUser.permissions.includes('2fa')) {
      console.log(`User ${appUser.name} requires 2FA. Redirecting to 2FA verification page... (feature to be implemented)`);
      // In a real implementation, you would redirect to a 2FA page here.
      // For now, we proceed to login.
    }


    const userSession = {
      id: appUser.id,
      name: appUser.name,
      email: firebaseUser.email,
      role: appUser.role,
      permissions: appUser.permissions,
      uid: firebaseUser.uid,
    };

    cookies().set('oryon_user_session', JSON.stringify(userSession), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: rememberMe ? 60 * 60 * 24 * 7 : undefined, // 7 days if "remember me" is checked
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
