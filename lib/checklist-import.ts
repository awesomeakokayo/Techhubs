/**
 * Checklist-progress import: payload validation (pure) and the server-side
 * reconciliation service.
 *
 * Reconciliation is deliberately conservative and idempotent:
 *   - no server record  -> create a completed record (timestamp = import time)
 *   - already completed -> preserved untouched (original timestamp kept)
 *   - marked incomplete -> preserved untouched (a stale local completion must
 *                          not overwrite an explicit server-side uncheck)
 * `createMany({ skipDuplicates: true })` makes this a single atomic statement
 * and the database's composite unique constraint remains the final guard.
 */

import { isKnownChecklistItem } from './checklist-progress'
import type { ChecklistKind } from './checklist-progress'
import type { PrismaClient } from '@prisma/client'

export interface ChecklistImportItem {
  trackId: string
  kind: ChecklistKind
  itemKey: string
}

export interface ChecklistImportOutcome {
  received: number
  created: number
  alreadyCompleted: number
  preservedIncomplete: number
}

export const MAX_IMPORT_ITEMS = 500
export const MAX_IDENTIFIER_LENGTH = 120

export type ImportPayloadParseResult =
  | { ok: true; items: ChecklistImportItem[] }
  | { ok: false; error: string }

function isKind(value: unknown): value is ChecklistKind {
  return value === 'STAGE' || value === 'PROJECT'
}

/** Validate the shape and limits of an import payload (no catalogue knowledge). */
export function parseChecklistImportPayload(body: unknown): ImportPayloadParseResult {
  if (typeof body !== 'object' || body === null) {
    return { ok: false, error: 'Invalid request body.' }
  }
  const items = (body as { items?: unknown }).items
  if (!Array.isArray(items)) {
    return { ok: false, error: 'A list of items is required.' }
  }
  if (items.length === 0) {
    return { ok: false, error: 'No items to import.' }
  }
  if (items.length > MAX_IMPORT_ITEMS) {
    return { ok: false, error: `Too many items (maximum ${MAX_IMPORT_ITEMS}).` }
  }

  const parsed: ChecklistImportItem[] = []
  for (const raw of items) {
    if (typeof raw !== 'object' || raw === null) {
      return { ok: false, error: 'Each item must be an object.' }
    }
    const record = raw as Record<string, unknown>
    const trackId = typeof record.trackId === 'string' ? record.trackId.trim() : ''
    const itemKey = typeof record.itemKey === 'string' ? record.itemKey.trim() : ''
    if (!trackId || trackId.length > MAX_IDENTIFIER_LENGTH) {
      return { ok: false, error: 'A valid track is required for every item.' }
    }
    if (!itemKey || itemKey.length > MAX_IDENTIFIER_LENGTH) {
      return { ok: false, error: 'A valid item key is required for every item.' }
    }
    if (!isKind(record.kind)) {
      return { ok: false, error: 'Checklist kind must be STAGE or PROJECT.' }
    }
    parsed.push({ trackId, kind: record.kind, itemKey })
  }

  return { ok: true, items: parsed }
}

function keyOf(item: ChecklistImportItem): string {
  return `${item.trackId}\u0000${item.kind}\u0000${item.itemKey}`
}

/**
 * Reconcile a set of (local, completed) checklist items into `ChecklistProgress`
 * for the given user. Idempotent and safe to retry. Never rewrites existing
 * records; never touches guided-path or completion records.
 */
export async function importChecklistProgress(
  prisma: PrismaClient,
  userId: string,
  items: readonly ChecklistImportItem[],
): Promise<ChecklistImportOutcome> {
  const unique = new Map<string, ChecklistImportItem>()
  for (const item of items) unique.set(keyOf(item), item)
  const list = Array.from(unique.values())

  let alreadyCompleted = 0
  let preservedIncomplete = 0
  const toCreate: ChecklistImportItem[] = []

  if (list.length > 0) {
    const existing = await prisma.checklistProgress.findMany({
      where: {
        userId,
        OR: list.map((item) => ({ trackId: item.trackId, kind: item.kind, itemKey: item.itemKey })),
      },
      select: { trackId: true, kind: true, itemKey: true, isCompleted: true },
    })
    const existingByKey = new Map(existing.map((row) => [keyOf(row as ChecklistImportItem), row]))

    for (const item of list) {
      const current = existingByKey.get(keyOf(item))
      if (current?.isCompleted) alreadyCompleted += 1
      else if (current) preservedIncomplete += 1
      else toCreate.push(item)
    }
  }

  const importedAt = new Date()
  let created = 0
  if (toCreate.length > 0) {
    const result = await prisma.checklistProgress.createMany({
      data: toCreate.map((item) => ({
        userId,
        trackId: item.trackId,
        kind: item.kind,
        itemKey: item.itemKey,
        isCompleted: true,
        completedAt: importedAt,
      })),
      skipDuplicates: true,
    })
    created = result.count
  }

  return { received: items.length, created, alreadyCompleted, preservedIncomplete }
}

export interface ChecklistCatalogueLike {
  stageIds: readonly number[]
  projectIds: readonly string[]
}

export interface SkippedChecklistItem {
  trackId: string
  kind: string
  itemKey: string
  reason: 'unknown_track' | 'unknown_item'
}

/**
 * Split parsed items into catalogue-valid items and reported-but-not-imported
 * items. Invalid items are never silently imported.
 */
export function partitionChecklistImport(
  items: readonly ChecklistImportItem[],
  resolveCatalogue: (trackId: string) => ChecklistCatalogueLike | null,
): { valid: ChecklistImportItem[]; skipped: SkippedChecklistItem[] } {
  const valid: ChecklistImportItem[] = []
  const skipped: SkippedChecklistItem[] = []

  for (const item of items) {
    const catalogue = resolveCatalogue(item.trackId)
    if (!catalogue) {
      skipped.push({ trackId: item.trackId, kind: item.kind, itemKey: item.itemKey, reason: 'unknown_track' })
      continue
    }
    if (!isKnownChecklistItem(item.kind, item.itemKey, catalogue)) {
      skipped.push({ trackId: item.trackId, kind: item.kind, itemKey: item.itemKey, reason: 'unknown_item' })
      continue
    }
    valid.push(item)
  }

  return { valid, skipped }
}
