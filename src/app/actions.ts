'use server';

import { redirect } from 'next/navigation';

export async function handleLogin(formData: FormData) {
  // This is a simulated login.
  // In a real application, you would validate credentials against a database.
  const email = formData.get('email');
  if (email) {
    // For this example, we'll assume login is always successful
    // and redirect to the dashboard.
    redirect('/dashboard');
  }
  // In a real app, you would handle login failure here.
}
