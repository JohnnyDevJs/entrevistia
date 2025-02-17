import { DefaultSession, DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface User extends DefaultUser {
    _id: string
    password?: string
  }

  interface Session extends DefaultSession {
    user: User
  }

  interface JWT {
    user: User
  }
}
