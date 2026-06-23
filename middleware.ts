import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isGuidedPath = pathname.startsWith('/guided-path')
  const isAccount = pathname === '/account' || pathname.startsWith('/account/')

  if (isGuidedPath || isAccount) {
    const token = await getToken({
      req,
      secret: process.env.AUTH_SECRET,
      secureCookie: true,
      cookieName: 'next-auth.session-token',
    })

    if (!token) {
      return NextResponse.redirect(new URL('/login?next=' + pathname, req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/guided-path/:path*', '/account', '/account/:path*'],
}
