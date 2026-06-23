import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isGuidedPath = pathname.startsWith('/guided-path')
  const isAccount = pathname === '/account' || pathname.startsWith('/account/')

  if (isGuidedPath || isAccount) {
    if (!req.auth) {
      return NextResponse.redirect(new URL('/login?next=' + pathname, req.url))
    }

    if (isGuidedPath && !req.auth.user?.isSubscribed) {
      return NextResponse.redirect(new URL('/upgrade', req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/guided-path/:path*', '/account', '/account/:path*'],
}
