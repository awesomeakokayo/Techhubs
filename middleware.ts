import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    secureCookie: process.env.NODE_ENV === 'production',
    cookieName: 'next-auth.session-token',
  })

  if (!token) {
    const url = new URL('/login', req.url)
    url.searchParams.set('next', req.nextUrl.pathname + req.nextUrl.search)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/account',
    '/account/:path*',
    '/dashboard',
    '/dashboard/:path*',
    '/learning',
    '/plan',
    '/achievements',
    '/certificate/:path*',
    '/guided-path/:path+',
  ],
}
