/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'

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
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID!,
      clientSecret: env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      await dbConnect()

      console.log('account', account?.providerAccountId)

      if (account?.provider === 'credentials') {
        user.id = user?._id
      } else {
        const existingUser = await User.findOne({ email: user?.email })

        if (!existingUser) {
          const newUser = new User({
            email: user?.email,
            name: user?.name,
            profilePicture: { url: profile?.image || user?.image },
            authProviders: [
              {
                provider: account?.provider,
                providerId: account?.providerAccountId || profile?.sub,
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
      } else {
        await dbConnect()

        const dbUser = await User.findById(token.user.id)

        if (dbUser) token.user = dbUser
      }

      return token
    },
    async session({ session, token }: any) {
      session.user = token.user

      delete session.user.password

      return session
    },
  },
  pages: {
    signIn: '/login',
  },

  secret: env.NEXTAUTH_SECRET,
} satisfies NextAuthOptions

export const handler = NextAuth(authOptions)
