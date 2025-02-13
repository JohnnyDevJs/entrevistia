'use client'

import Link from 'next/link'

import { Logo } from '@/components/logo'
import { APP_NAME } from '@/constants'

export function Footer() {
  return (
    <footer className="w-full flex items-center justify-center bg-muted md:py-8 lg:py-10">
      <div className="container flex flex-col items-center justify-center gap-4 md:flex-row">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <Logo />
          <span className="text-lg font-semibold">{APP_NAME}</span>
        </Link>
        <nav className="flex flex-wrap items-center justify-center gap-4 text-sm md:justify-end">
          <Link
            href="/"
            className="hover:underline hover:underline-offset-4"
            prefetch={false}
          >
            Home
          </Link>
          <Link
            href="#"
            className="hover:underline hover:underline-offset-4"
            prefetch={false}
          >
            Sobre
          </Link>
          <Link
            href="/#pricing"
            className="hover:underline hover:underline-offset-4"
            prefetch={false}
          >
            Planos
          </Link>
          <Link
            href="#"
            className="hover:underline hover:underline-offset-4"
            prefetch={false}
          >
            Contato
          </Link>
        </nav>
        <p className="text-xs text-muted-foreground">
          &copy; {APP_NAME} {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
