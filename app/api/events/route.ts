import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import {
  isClientRecordableEvent,
  sanitizeLearningEventPayload,
} from '@/lib/learning-events'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Authentication required' }, { status: 401 })

  const body = await req.json().catch(() => null)
  const events = Array.isArray(body) ? body : body ? [body] : []
  if (events.length === 0 || events.length > 25) {
    return NextResponse.json({ error: 'Provide between one and twenty-five events.' }, { status: 400 })
  }

  const userId = session.user.id
  const records: Prisma.LearningEventCreateManyInput[] = []
  for (const raw of events) {
    if (typeof raw !== 'object' || raw === null) {
      return NextResponse.json({ error: 'Each event must be an object.' }, { status: 400 })
    }
    if (!isClientRecordableEvent(raw.eventName)) {
      return NextResponse.json({ error: 'Unsupported event for this endpoint.' }, { status: 400 })
    }
    const event = sanitizeLearningEventPayload({ ...raw, userId })
    records.push({
      userId: event.userId,
      eventName: event.eventName,
      trackId: event.trackId,
      stepId: event.stepId,
      metadata: (event.metadata ?? undefined) as Prisma.InputJsonValue | undefined,
    })
  }

  try {
    await prisma.learningEvent.createMany({ data: records })
  } catch {
    return NextResponse.json({ error: 'Failed to record events.' }, { status: 500 })
  }

  return NextResponse.json({ recorded: records.length })
}
