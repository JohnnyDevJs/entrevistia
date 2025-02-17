/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { dbConnect } from '@/backend/config/db-connect'
import { User } from '@/backend/models/user.model'
import { env } from '@/env'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        await dbConnect()

        const user = await User.findOne({ email: credentials?.email }).select(
          '+password',
        )

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
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      await dbConnect()

      if (account?.provider === 'credentials') {
        user.id = user?._id
      } else {
        const existingUser = await User.findOne({ email: profile?.email })

        if (!existingUser) {
          const newUser = await User.create({
            email: profile?.email,
            name: profile?.name,
            profilePicture: profile?.image || user?.image,
            accountProvider: [
              {
                provider: account?.provider,
                providerId: account?.id || profile?.sub,
              },
            ],
          })

          await newUser.save()

          user.id = newUser._id
        } else {
          user.id = existingUser._id
        }
      }

      return true
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.user = user
      }

      console.log('User', user)
      return token
    },
    async session({ session, token }: any) {
      session.user = token.user

      console.log('token', token)
      return session
    },
  },
  pages: {
    signIn: '/login',
  },

  secret: env.NEXTAUTH_SECRET,
} satisfies NextAuthOptions

export const handler = NextAuth(authOptions)
