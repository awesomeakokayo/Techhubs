/**
 * External-resource gate for the imported research package.
 *
 * Archive-era evidence is never enough to make a resource required. A package
 * primary is `verified` only when a fresh check proves the exact URL is
 * reachable, its content was inspected, it is currently free and it is
 * objectively relevant. A stage can also be ready through a verified
 * alternative while its package primary remains blocked or provisional.
 *
 * No check performed by this repository proves playback, interactive
 * completion, factual accuracy or pedagogical quality. Those remain human
 * review items, so `verified` is not approval and never enables premium.
 */

import {
  PACKAGE_BLOCKED_STAGES,
  PACKAGE_RESOURCE_DISPOSITIONS,
  PACKAGE_STAGE_READY_KEYS,
  PACKAGE_VERIFIED_STAGES,
} from './resources.generated'
import type { PackageResourceCheck, PackageResourceDisposition, SelectedPackageResource } from './types'

export type PackageResourceStatus = 'blocked' | 'provisional' | 'verified' | 'none'
export type CurrentCheckStatus = 'none' | 'current'

export interface StageResourcePolicy {
  trackId: string
  stageId: number
  status: PackageResourceStatus
  /** True only when the selected (primary or alternative) resource passed the fresh check. */
  required: boolean
  role: 'required' | 'optional'
  currentCheck: CurrentCheckStatus
  primary: PackageResourceDisposition['primary']
  selected: SelectedPackageResource | null
  stageReady: boolean
  reason: string
}

function dispositionFor(trackId: string, stageId: number): PackageResourceDisposition | null {
  return PACKAGE_RESOURCE_DISPOSITIONS[`${trackId}:${stageId}`] ?? null
}

export function getStageResourcePolicy(trackId: string, stageId: number): StageResourcePolicy {
  const disposition = dispositionFor(trackId, stageId)
  const selected = disposition?.selected ?? null
  return {
    trackId,
    stageId,
    status: disposition?.status ?? 'none',
    required: Boolean(selected && disposition?.stageReady),
    role: selected && disposition?.stageReady ? 'required' : 'optional',
    currentCheck: selected ? 'current' : 'none',
    primary: disposition?.primary ?? null,
    selected,
    stageReady: Boolean(disposition?.stageReady),
    reason:
      disposition?.reason ??
      'No current, free, content-inspected external primary or alternative has been verified for this stage.',
  }
}

/**
 * Promotion decision for a package primary. Archive evidence cannot satisfy it;
 * the caller must supply a fresh check for the exact primary URL. This is kept
 * separate from the generated evidence so future checks cannot silently upgrade
 * the current record.
 */
export function canPromoteResourceToRequired(
  disposition: PackageResourceDisposition | null,
  currentCheck: PackageResourceCheck | null,
): boolean {
  if (!disposition?.primary || !currentCheck) return false
  if (currentCheck.url !== disposition.primary.url) return false
  if (!currentCheck.freeAccess || currentCheck.accountRequired || currentCheck.paymentRequired) return false
  if (!currentCheck.contentInspected || !currentCheck.objectiveRelevant) return false
  return currentCheck.verificationLevel === 3 || currentCheck.verificationLevel === 4
}

export interface PackageResourceGateAudit {
  ok: boolean
  total: number
  blocked: number
  provisional: number
  verified: number
  stageReady: number
  selectedAlternative: number
  requiredCount: number
  currentVerifiedCount: number
  violations: string[]
}

/** Deterministic audit used by tests and the implementation ledger. */
export function auditPackageResourceGate(): PackageResourceGateAudit {
  const entries = Object.entries(PACKAGE_RESOURCE_DISPOSITIONS)
  const violations: string[] = []
  let blocked = 0
  let provisional = 0
  let verified = 0
  let stageReady = 0
  let selectedAlternative = 0
  let requiredCount = 0
  let currentVerifiedCount = 0

  for (const [key, disposition] of entries) {
    if (disposition.status === 'blocked') blocked += 1
    else if (disposition.status === 'provisional') provisional += 1
    else if (disposition.status === 'verified') verified += 1
    else violations.push(`${key}: unsupported status ${String(disposition.status)}`)

    if (disposition.stageReady) stageReady += 1
    if (disposition.selected?.source === 'alternative') selectedAlternative += 1
    if (disposition.required) requiredCount += 1

    if (disposition.status === 'verified') {
      const check = disposition.primary?.currentCheck
      if (!check) {
        violations.push(`${key}: verified primary has no current check`)
      } else {
        currentVerifiedCount += 1
        if (!check.freeAccess || check.accountRequired || check.paymentRequired) {
          violations.push(`${key}: verified primary is not currently free`)
        }
        if (!check.contentInspected || !check.objectiveRelevant) {
          violations.push(`${key}: verified primary lacks inspected, relevant content`)
        }
      }
    }

    if (disposition.required !== disposition.stageReady) {
      violations.push(`${key}: required flag does not match stage readiness`)
    }

    if (disposition.selected) {
      if (!disposition.stageReady) violations.push(`${key}: selected resource on a non-ready stage`)
      const states = disposition.selected.states
      if (!states.destination_verified || !states.content_inspected || !states.current_free_access_verified) {
        violations.push(`${key}: selected resource lacks current destination/content/access evidence`)
      }
      if (states.playback_verified || states.human_reviewed || states.approved) {
        violations.push(`${key}: selected resource claims playback, human review or approval`)
      }
    } else if (disposition.stageReady) {
      violations.push(`${key}: stage-ready without a selected resource`)
    }

    if (disposition.primary?.verificationLevel === '4') {
      violations.push(`${key}: archive record claims playback verification`)
    }
  }

  return {
    ok:
      violations.length === 0 &&
      entries.length === 186 &&
      blocked === PACKAGE_BLOCKED_STAGES.length &&
      verified === PACKAGE_VERIFIED_STAGES.length &&
      stageReady === PACKAGE_STAGE_READY_KEYS.length,
    total: entries.length,
    blocked,
    provisional,
    verified,
    stageReady,
    selectedAlternative,
    requiredCount,
    currentVerifiedCount,
    violations,
  }
}

/** All currently blocked package-primary stage keys, sorted for stable reporting. */
export function blockedPackageStages(): string[] {
  return [...PACKAGE_BLOCKED_STAGES]
}

/** All provisional package-primary stage keys, sorted for stable reporting. */
export function provisionalPackageStages(): string[] {
  return Object.entries(PACKAGE_RESOURCE_DISPOSITIONS)
    .filter(([, disposition]) => disposition.status === 'provisional')
    .map(([key]) => key)
    .sort()
}

/** All stages with a freshly verified selected resource. */
export function readyPackageStages(): string[] {
  return [...PACKAGE_STAGE_READY_KEYS]
}
