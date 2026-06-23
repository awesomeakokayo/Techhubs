import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

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

  const body = await req.json() as { trackId: string; data: Record<string, unknown> }

  const jsonData = JSON.parse(JSON.stringify(body.data)) as Prisma.InputJsonValue

  await prisma.userTrackProgress.upsert({
    where: {
      userId_trackId: { userId: session.user.id, trackId: body.trackId },
    },
    create: {
      userId: session.user.id,
      trackId: body.trackId,
      data: jsonData,
    },
    update: {
      data: jsonData,
    },
  })

  return NextResponse.json({ ok: true })
}
