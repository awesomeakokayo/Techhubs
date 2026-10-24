import { auth } from '@/auth'
import { cookies, headers } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  // Diagnostic endpoint — never available in production.
  if (process.env.NODE_ENV === 'production') {
    return new NextResponse(null, { status: 404 })
  }

  const session = await auth()
  const h = await headers()
  const c = await cookies()
  const hasSessionCookie = c.getAll().some((cookie) => cookie.name.includes('session-token'))

  // Never return identifiers, cookie names, cookie values or session material.
  return Response.json({
    hasSession: !!session,
    hasUser: !!session?.user,
    hasSessionCookie,
    host: h.get('host'),
    forwardedHost: h.get('x-forwarded-host'),
    forwardedProto: h.get('x-forwarded-proto'),
  })
}
