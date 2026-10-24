import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { hasTrackAccess } from '@/lib/access'
import { getTrackById } from '@/lib/tracks'

export const dynamic = 'force-dynamic'

/**
 * Lightweight client-side access probe for static track pages so gating stays
 * server-authoritative while page markup stays cached/static.
 */
export async function GET(
  _req: Request,
  { params }: { params: { trackId: string } }
) {
  if (!getTrackById(params.trackId)) {
    return NextResponse.json({ error: 'Track not found', hasAccess: false }, { status: 404 })
  }

  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ hasAccess: false })
  }
  const hasAccess = await hasTrackAccess(session.user.id, params.trackId)
  return NextResponse.json({ hasAccess })
}