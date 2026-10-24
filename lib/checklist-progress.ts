/**
 * Checklist-progress domain helpers.
 *
 * Pure (no database imports) so they can be unit tested directly. Checklist
 * progress models explicit roadmap-stage / project completion and is kept
 * separate from guided-path progress.
 */

export const CHECKLIST_KINDS = ['STAGE', 'PROJECT'] as const
export type ChecklistKind = (typeof CHECKLIST_KINDS)[number]

export function isChecklistKind(value: unknown): value is ChecklistKind {
  return typeof value === 'string' && (CHECKLIST_KINDS as readonly string[]).includes(value)
}

export interface ChecklistCatalogue {
  /** Roadmap stage ids for the track. */
  stageIds: readonly number[]
  /** Project ids for the track. */
  projectIds: readonly string[]
}

/** True when `itemKey` identifies a real roadmap stage or project in the track. */
export function isKnownChecklistItem(
  kind: ChecklistKind,
  itemKey: string,
  catalogue: ChecklistCatalogue,
): boolean {
  if (kind === 'STAGE') return catalogue.stageIds.some((id) => String(id) === itemKey)
  return catalogue.projectIds.some((id) => id === itemKey)
}

export interface ChecklistWriteInput {
  trackId: string
  kind: ChecklistKind
  itemKey: string
  completed: boolean
}

export type ChecklistWriteParseResult =
  | { ok: true; value: ChecklistWriteInput }
  | { ok: false; error: string }

/** Validate the shape of a checklist write request (an explicit desired state). */
export function parseChecklistWrite(body: unknown): ChecklistWriteParseResult {
  if (typeof body !== 'object' || body === null) {
    return { ok: false, error: 'Invalid request body.' }
  }
  const record = body as Record<string, unknown>

  const trackId = typeof record.trackId === 'string' ? record.trackId.trim() : ''
  if (!trackId) return { ok: false, error: 'A valid track is required.' }

  if (!isChecklistKind(record.kind)) {
    return { ok: false, error: 'Checklist kind must be STAGE or PROJECT.' }
  }

  const itemKey = typeof record.itemKey === 'string' ? record.itemKey.trim() : ''
  if (!itemKey) return { ok: false, error: 'A valid checklist item is required.' }

  if (typeof record.completed !== 'boolean') {
    return { ok: false, error: 'Completion state must be true or false.' }
  }

  return { ok: true, value: { trackId, kind: record.kind, itemKey, completed: record.completed } }
}
