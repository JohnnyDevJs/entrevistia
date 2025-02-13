import '@/app/assets/styles/globals.css'

import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'

import { APP_NAME, APP_DESCRIPTION, SERVER_URL} from '@/lib/constants'
import { Providers } from './providers'
import { cn } from '@heroui/react'

const openSans = Open_Sans({
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
      <body className={cn(openSans.className, "antialiased")}>
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'light' }}>
          {children}
        </Providers>
      </body>
    </html>
  )
}
