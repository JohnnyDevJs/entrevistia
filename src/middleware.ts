import withAuth, { NextRequestWithAuth } from 'next-auth/middleware'

import { IUser } from './backend/models/user.model'

export default withAuth(function middleware(req: NextRequestWithAuth): void {
  const url: string = req.nextUrl.pathname
  const user: IUser | undefined = req.nextauth?.token?.user as IUser

  if (user) {
    console.log(`Authenticated user accessing: ${url}`, user)
  } else {
    console.log(`Unauthenticated access attempt: ${url}`)
  }
})

export const config = {
  matcher: ['/app/:path*'],
}
