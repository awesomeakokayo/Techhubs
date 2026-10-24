import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { getTrackById } from '@/lib/tracks'
import { isKnownChecklistItem, parseChecklistWrite } from '@/lib/checklist-progress'
import { getChecklistItems, setChecklistCompletion, type ChecklistItemRecord } from '@/lib/checklist-store'

export const dynamic = 'force-dynamic'

function serialize(record: ChecklistItemRecord) {
  return {
    trackId: record.trackId,
    kind: record.kind,
    itemKey: record.itemKey,
    isCompleted: record.isCompleted,
    completedAt: record.completedAt ? record.completedAt.toISOString() : null,
  }
}

export async function GET(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
  }

  const trackId = new URL(req.url).searchParams.get('trackId')?.trim() || undefined
  if (trackId && !getTrackById(trackId)) {
    return NextResponse.json({ error: 'Unknown track' }, { status: 404 })
  }

  const items = await getChecklistItems(prisma, session.user.id, trackId)
  return NextResponse.json({ items: items.map(serialize) })
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const parsed = parseChecklistWrite(body)
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 })
  }

  const { trackId, kind, itemKey, completed } = parsed.value
  const track = getTrackById(trackId)
  if (!track) {
    return NextResponse.json({ error: 'Unknown track' }, { status: 404 })
  }

  const catalogue = {
    stageIds: track.roadmap.map((stage) => stage.id),
    projectIds: (track.projects ?? []).map((project) => project.id),
  }
  if (!isKnownChecklistItem(kind, itemKey, catalogue)) {
    return NextResponse.json({ error: 'Unknown checklist item' }, { status: 400 })
  }

  try {
    const record = await setChecklistCompletion(prisma, session.user.id, { trackId, kind, itemKey, completed })
    return NextResponse.json(serialize(record))
  } catch (error) {
    console.error('checklist-progress: update failed', error)
    return NextResponse.json({ error: 'Could not update checklist progress.' }, { status: 500 })
  }
}
