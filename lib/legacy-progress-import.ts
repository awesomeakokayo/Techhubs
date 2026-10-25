/**
 * Legacy browser progress import helpers (pure, browser-safe, testable).
 *
 * The legacy `tsh-progress` blob is the source of checklist data to import into
 * the server-authoritative `ChecklistProgress` model. These helpers only read
 * and shape that data; they never delete it.
 */

import type { ChecklistKind } from './checklist-progress'

export const LEGACY_PROGRESS_KEY = 'tsh-progress'
export const LEGACY_USER_KEY = 'tsh-user'
export const LEGACY_BACKUP_KEY = 'tsh-progress-backup'

export function importMarkerKey(userId: string): string {
  return `tsh-progress-imported:${userId}`
}

export function dismissMarkerKey(userId: string): string {
  return `tsh-progress-import-dismissed:${userId}`
}

export interface LegacyTrackProgress {
  started?: boolean
  completedStages?: number[]
  completedProjects?: string[]
  lastVisited?: string
}

export interface LegacyProgressData {
  tracks?: Record<string, LegacyTrackProgress>
  quizResult?: unknown
  bookmarks?: string[]
}

export interface LegacyImportItem {
  trackId: string
  kind: ChecklistKind
  itemKey: string
}

function itemKeyOf(item: LegacyImportItem): string {
  return `${item.trackId}\u0000${item.kind}\u0000${item.itemKey}`
}

/** Collect the completed roadmap stages and projects recorded in the legacy blob. */
export function collectImportItems(data: LegacyProgressData | null | undefined): LegacyImportItem[] {
  const unique = new Map<string, LegacyImportItem>()
  const tracks = data?.tracks
  if (!tracks || typeof tracks !== 'object') return []

  for (const [trackId, progress] of Object.entries(tracks)) {
    if (!trackId || !progress || typeof progress !== 'object') continue

    for (const stageId of progress.completedStages ?? []) {
      if (typeof stageId === 'number' && Number.isFinite(stageId)) {
        const item: LegacyImportItem = { trackId, kind: 'STAGE', itemKey: String(stageId) }
        unique.set(itemKeyOf(item), item)
      }
    }

    for (const projectId of progress.completedProjects ?? []) {
      if (typeof projectId === 'string' && projectId.trim()) {
        const item: LegacyImportItem = { trackId, kind: 'PROJECT', itemKey: projectId.trim() }
        unique.set(itemKeyOf(item), item)
      }
    }
  }

  return Array.from(unique.values())
}

export interface LegacyImportSummary {
  stages: number
  projects: number
  total: number
  tracks: number
}

export function summarizeImportItems(items: readonly LegacyImportItem[]): LegacyImportSummary {
  let stages = 0
  let projects = 0
  const tracks = new Set<string>()
  for (const item of items) {
    if (item.kind === 'STAGE') stages += 1
    else projects += 1
    tracks.add(item.trackId)
  }
  return { stages, projects, total: items.length, tracks: tracks.size }
}

export type LegacyImportEligibility = 'eligible' | 'different-user' | 'empty'

/**
 * Decide whether a learner may be offered the import.
 * Anonymous data (no stored user id) and data owned by the current user are
 * eligible; another user's data never is.
 */
export function classifyLegacyImport(
  storedUserId: string | null | undefined,
  currentUserId: string | null | undefined,
  itemCount: number,
): LegacyImportEligibility {
  if (!itemCount || itemCount <= 0) return 'empty'
  if (storedUserId && currentUserId && storedUserId !== currentUserId) return 'different-user'
  return 'eligible'
}

/** True when local data belongs to a different account and must be preserved then cleared. */
export function shouldResetLegacyForUser(
  storedUserId: string | null | undefined,
  currentUserId: string | null | undefined,
): boolean {
  return Boolean(storedUserId && currentUserId && storedUserId !== currentUserId)
}
