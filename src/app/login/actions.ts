'use server';

import { AuthService } from '@/core/services/AuthService';
import { createSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export async function loginAction(prevState: unknown, formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return { error: 'Username and password are required.' };
  }

  const user = await AuthService.login(username, password);

  if (!user) {
    return { error: 'Invalid credentials. Please try again.' };
  }

  // Create session
  await createSession(user);

  redirect('/dashboard');
}
