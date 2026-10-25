import { auth } from '@/auth'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  // Diagnostic endpoint — never available in production.
  if (process.env.NODE_ENV === 'production') {
    return new NextResponse(null, { status: 404 })
  }

  const session = await auth()
  const h = await headers()

  // Do not expose session identifiers, cookie names, cookie values, or the
  // complete cookie inventory—even in development or preview environments.
  return Response.json({
    hasSession: !!session,
    hasUser: !!session?.user,
    host: h.get('host'),
    forwardedHost: h.get('x-forwarded-host'),
    forwardedProto: h.get('x-forwarded-proto'),
  })
}
