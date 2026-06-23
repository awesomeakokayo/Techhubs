import { auth } from '@/auth'
import { cookies, headers } from 'next/headers'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await auth()
  const h = await headers()
  const c = await cookies()
  const allCookies = c.getAll()
  const sessionCookie = allCookies.find(ck => ck.name.includes('session-token'))

  return Response.json({
    hasSession: !!session,
    hasUser: !!session?.user,
    sessionId: session?.user?.id ?? null,
    sessionCookieName: sessionCookie?.name ?? null,
    sessionCookieValue: sessionCookie?.value?.substring(0, 20) + '...' ?? null,
    allCookieNames: allCookies.map(ck => ck.name),
    host: h.get('host'),
    nexthost: h.get('x-forwarded-host'),
    nextproto: h.get('x-forwarded-proto'),
  })
}
