'use client';

import { useActionState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { login } from '@/actions/auth';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const fillExampleData = () => {
    if (emailRef.current) emailRef.current.value = 'janet.weaver@reqres.in';
    if (passwordRef.current) passwordRef.current.value = '12345678';
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md'>
        <div>
          <h1 className='text-3xl font-bold text-center text-gray-900'>
            Login to Auth Board
          </h1>
        </div>
        <form
          action={formAction}
          className='mt-8 space-y-6'
        >
          {state?.error && (
            <div className='p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md'>
              {state.error}
            </div>
          )}
          <Input
            label='Email'
            name='email'
            placeholder='Enter your email'
            required
            ref={emailRef}
          />
          <Input
            label='Password'
            type='password'
            name='password'
            placeholder='Enter your password'
            required
            ref={passwordRef}
          />
          <Button
            type='submit'
            disabled={isPending}
            className='w-full'
          >
            {isPending ? 'Logging in...' : 'Login'}
          </Button>
          <div className='text-center'>
            <button
              type='button'
              onClick={fillExampleData}
              className='cursor-pointer text-sm text-gray-600 hover:text-blue-600 transition-colors group'
            >
              <span className='px-3 py-1.5 rounded-md bg-gray-100 group-hover:bg-blue-50 transition-colors font-medium'>
                Try demo credentials
              </span>
            </button>
            <div className='mt-3 pt-3 border-t border-gray-200'>
              <p className='text-xs text-gray-400 space-x-2'>
                <span className='inline-block'>
                  <span className='text-gray-500 font-medium'>Email:</span>{' '}
                  <span className='font-mono text-gray-600'>
                    janet.weaver@reqres.in
                  </span>
                </span>
                <span className='text-gray-300'>•</span>
                <span className='inline-block'>
                  <span className='text-gray-500 font-medium'>Pass:</span>{' '}
                  <span className='font-mono text-gray-600'>12345678</span>
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
