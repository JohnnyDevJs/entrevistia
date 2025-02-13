import '@/app/assets/styles/globals.css'

import { cn } from '@heroui/react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from '@/lib/constants'

import { Providers } from './providers'

const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME,
  },
  description: `${APP_DESCRIPTION}`,
  metadataBase: new URL(SERVER_URL),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn(inter.className, 'antialiased')}>
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'light' }}>
          <div className="relative flex flex-col h-screen">
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
