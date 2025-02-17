'use client'

import { HeroUIProvider } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { SessionProvider } from 'next-auth/react'
import type { ThemeProviderProps } from 'next-themes'
import { ThemeProvider as NextThemeProvider } from 'next-themes'

type ProvidersProps = {
  children: React.ReactNode
  themeProps?: ThemeProviderProps
}
export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter()

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemeProvider {...themeProps}>
        <SessionProvider>{children}</SessionProvider>
      </NextThemeProvider>
    </HeroUIProvider>
  )
}
