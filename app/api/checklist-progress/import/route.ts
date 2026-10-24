import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { getTrackById } from '@/lib/tracks'
import {
  importChecklistProgress,
  parseChecklistImportPayload,
  partitionChecklistImport,
  type ChecklistCatalogueLike,
} from '@/lib/checklist-import'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const parsed = parseChecklistImportPayload(body)
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 })
  }

  const cache = new Map<string, ChecklistCatalogueLike | null>()
  const resolveCatalogue = (trackId: string): ChecklistCatalogueLike | null => {
    if (cache.has(trackId)) return cache.get(trackId) ?? null
    const track = getTrackById(trackId)
    const catalogue = track
      ? {
          stageIds: track.roadmap.map((stage) => stage.id),
          projectIds: (track.projects ?? []).map((project) => project.id),
        }
      : null
    cache.set(trackId, catalogue)
    return catalogue
  }

  const { valid, skipped } = partitionChecklistImport(parsed.items, resolveCatalogue)

  try {
    const outcome = await importChecklistProgress(prisma, session.user.id, valid)
    return NextResponse.json({ ok: true, imported: outcome, skipped })
  } catch (error) {
    console.error('checklist-progress/import: failed', error)
    return NextResponse.json(
      { ok: false, error: 'Import could not be completed. Your saved progress is unchanged.' },
      { status: 500 },
    )
  }
}
