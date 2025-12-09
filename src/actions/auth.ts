'use server';

import { cookies } from 'next/headers';
import { loginSchema } from '@/lib/schema/login';
import { fetchReqRes } from '@/lib/req-res';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export async function login(_prevState: unknown, formData: FormData) {
  try {
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string
    };

    const validatedData = loginSchema.parse(data);

    const response = await fetchReqRes('https://reqres.in/api/login', {
      method: 'POST',
      body: JSON.stringify(validatedData)
    });

    if (!response.ok) {
      return { error: 'Invalid credentials' };
    }

    const result = await response.json();

    // Store token in HttpOnly cookie
    if (result.token) {
      const cookieStore = await cookies();
      cookieStore.set('authToken', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7
      });
    }

    redirect('/dashboard');
  } catch (error) {
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error;
    }
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0];
      return { error: firstError?.message || 'Validation failed' };
    }
    return { error: 'Something went wrong' };
  }
}
