import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { hasTrackAccess } from '@/lib/access'
import { getTrackById } from '@/lib/tracks'
import { isPlainObject, mergeClientProgress, protectedProgressKeysPresent } from '@/lib/server-progress'
import type { Prisma } from '@prisma/client'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Learning is free for everyone, so a signed-in learner always receives their
  // own synced progress. (Previously gated behind legacy paid entitlements.)
  const records = await prisma.userTrackProgress.findMany({
    where: { userId: session.user.id },
    select: { trackId: true, data: true, updatedAt: true },
  })

  const progress: Record<string, { data: unknown; updatedAt: string }> = {}
  for (const r of records) {
    progress[r.trackId] = { data: r.data, updatedAt: r.updatedAt.toISOString() }
  }

  return NextResponse.json(progress)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => null) as { trackId?: unknown; data?: unknown } | null
  if (!body || typeof body.trackId !== 'string' || !isPlainObject(body.data)) {
    return NextResponse.json({ error: 'A trackId and a data object are required.' }, { status: 400 })
  }

  const trackId = body.trackId.trim()
  if (!trackId || trackId.length > 120 || !getTrackById(trackId)) {
    return NextResponse.json({ error: 'Unknown track.' }, { status: 404 })
  }

  // Progression-authoritative fields are written only by trusted server code.
  // A learner must not be able to forge a project pass (or rewrite their path
  // version) through this client-facing endpoint.
  const protectedKeys = protectedProgressKeysPresent(body.data)
  if (protectedKeys.length > 0) {
    return NextResponse.json(
      {
        error: 'These progress fields are managed by the server and cannot be set by the client.',
        fields: protectedKeys,
      },
      { status: 400 },
    )
  }

  const allowed = await hasTrackAccess(session.user.id, trackId)
  if (!allowed) {
    return NextResponse.json(
      { error: 'You do not have access to this course' },
      { status: 403 }
    )
  }

  // Merge rather than overwrite, so server-owned state (assessment results,
  // path version) is never clobbered by a client sync.
  const existing = await prisma.userTrackProgress.findUnique({
    where: { userId_trackId: { userId: session.user.id, trackId } },
    select: { data: true },
  })
  const merged = mergeClientProgress(existing?.data, body.data) as Prisma.InputJsonValue

  await prisma.userTrackProgress.upsert({
    where: {
      userId_trackId: { userId: session.user.id, trackId },
    },
    create: {
      userId: session.user.id,
      trackId,
      data: merged,
    },
    update: {
      data: merged,
    },
  })

  return NextResponse.json({ ok: true })
}