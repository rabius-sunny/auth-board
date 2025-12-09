import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'

const nunito = Nunito({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Auth Board',
  description: 'Authenticated Dashboard'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${nunito.className} antialiased`}>{children}</body>
    </html>
  )
}
