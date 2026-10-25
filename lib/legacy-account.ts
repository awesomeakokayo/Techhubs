/**
 * Centralised, order-safe handling of legacy progress when the signed-in account
 * changes. The previous account's blob is copied to the recovery slot BEFORE it
 * is cleared, so no order of component effects can lose it. Data belonging to a
 * different account is never shown or imported into the current account.
 */

import { clearProgress, getStoredUserId, setStoredUserId } from './progress'
import { LEGACY_BACKUP_KEY, LEGACY_PROGRESS_KEY, shouldResetLegacyForUser } from './legacy-progress-import'

export function prepareLegacyProgressForUser(currentUserId: string): void {
  if (typeof window === 'undefined') return
  try {
    const storedUserId = getStoredUserId()
    if (shouldResetLegacyForUser(storedUserId, currentUserId)) {
      const raw = localStorage.getItem(LEGACY_PROGRESS_KEY)
      if (raw && !localStorage.getItem(LEGACY_BACKUP_KEY)) {
        localStorage.setItem(LEGACY_BACKUP_KEY, raw)
      }
      clearProgress()
    }
    setStoredUserId(currentUserId)
  } catch {
    /* storage unavailable — nothing to do */
  }
}
