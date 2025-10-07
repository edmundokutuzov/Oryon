'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { users } from '@/lib/data';

export async function handleLogin(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const user = users.find(u => u.email === email);

  // In a real app, you'd use a secure hashing library like bcrypt to compare passwords.
  // For this demo, we do a direct comparison.
  if (user && user.password === password) {
    const userSession = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
    };
    cookies().set('oryon_user_session', JSON.stringify(userSession), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    redirect('/dashboard');
  } else {
    // Redirect back to login with an error message
    redirect('/?error=invalid_credentials');
  }
}
