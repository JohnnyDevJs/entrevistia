import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { dbConnect } from '@/backend/config/db-connect'
import { User } from '@/backend/models/user.model'
import { env } from '@/env'

export const options = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        await dbConnect()

        const user = await User.findOne({ email: credentials?.email })

        if (!user) {
          throw new Error('E-mail ou senha inválidos')
        }

        const isPasswordMatched = await user.comparePassword(
          credentials?.password,
        )

        if (!isPasswordMatched) {
          throw new Error('E-mail ou senha inválidos')
        }

        return user
      },
    }),
  ],

  secret: env.NEXTAUTH_SECRET,
} satisfies NextAuthOptions

export const { handlers, auth, signIn, signOut } = NextAuth(options)
