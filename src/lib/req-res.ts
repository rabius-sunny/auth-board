'use server'

import { cookies } from 'next/headers'
export const fetchReqRes = async (url: string, options: RequestInit) => {
  const cookieStore = await cookies()
  const authToken = cookieStore.get('authToken')?.value

  if (authToken) {
    options.headers = {
      ...(options.headers ?? {}),
      Authorization: `Bearer ${authToken}`
    }
  }

  return await fetch(url, {
    ...options,
    headers: {
      ...(options.headers ?? {}),
      'Content-Type': 'application/json',
      'x-api-key': process.env.REQRES_SECRET || ''
    }
  })
}
