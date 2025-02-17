import '@/assets/styles/globals.css'

import { cn } from '@heroui/react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Footer } from '@/components/layout/footer'
import { HeaderAnnouncement } from '@/components/layout/header/header-announcement'
import { Navbar } from '@/components/layout/header/navbar'
import { APP_DESCRIPTION, APP_NAME } from '@/constants'

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
          <HeaderAnnouncement />
          <div className="relative flex flex-col h-[calc(100vh-49px)]">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
