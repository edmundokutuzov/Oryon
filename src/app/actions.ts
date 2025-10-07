'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { users } from '@/lib/data';

export async function handleLogin(formData: FormData) {
  // This is a simulated login.
  // In a real application, you would validate credentials against a database.
  const email = formData.get('email');

  const user = users.find(u => u.email === email);

  if (user) {
    // For this example, we'll assume login is always successful
    // and redirect to the dashboard.
    // Securely store user info in a cookie. Do not store passwords.
    const userSession = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    cookies().set('oryon_user_session', JSON.stringify(userSession), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    redirect('/dashboard');
  }
  // In a real app, you would handle login failure here.
}
