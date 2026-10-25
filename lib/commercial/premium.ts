/**
 * TechSkillHub — first-wave premium track manifest (server-controlled).
 *
 * This module is the SINGLE tracked source of truth for which tracks make up
 * the first premium wave. It exists so the shortlist is documented, reviewable
 * and testable without depending on an unset local environment variable, while
 * still allowing an operator to override the set at deploy time.
 *
 * Selection method: see `docs/premium-first-wave.md`. Tracks were scored against
 * the agreed readiness rubric using real catalogue data (guided-path steps,
 * embedded project steps, authored project briefs, authored knowledge-check
 * coverage, portfolio project, resources). No demand or market claim is made:
 * none was available in the repository.
 *
 * SAFETY: selecting premium tracks here does NOT restrict anyone. Access is
 * decided by `hasTrackAccess`, which returns `true` for every learner until
 * `COMMERCE_ENTITLEMENTS_ENFORCED` (or a server-side pilot cohort) is enabled.
 * Checkout remains independently fail-closed in `lib/commercial/launch.ts`.
 */

import { TRACKS } from '../tracks'

export interface PremiumWaveTrack {
  /** Canonical track id (verified against the catalogue below). */
  trackId: string
  /** Verified canonical slug. */
  slug: string
  /** Verified display title. */
  title: string
  category: string
  /** Readiness score (0–100) from the documented rubric. */
  readinessScore: number
  /** Why this track is suitable for the first commercial release. */
  rationale: string
  /** What a Free learner is expected to retain for this track. */
  freePreview: string
}

/**
 * The approved first premium wave — exactly three tracks that genuinely meet the
 * readiness bar (see docs/premium-first-wave.md for the full rubric, evidence,
 * deferred candidates and remaining gaps).
 */
export const PREMIUM_WAVE_1: readonly PremiumWaveTrack[] = [
  {
    trackId: 'frontend',
    slug: 'frontend-development',
    title: 'Frontend Development',
    category: 'build',
    readinessScore: 79.9,
    rationale:
      'Deepest and most complete build track: 40 guided steps across 5 stages, 6 embedded project steps, 15 knowledge-check questions with authored coverage for every stage, 4 authored project briefs and a portfolio-grade final project (fe-p7).',
    freePreview: 'Track-level access; the whole Free catalogue (29 other tracks) remains open.',
  },
  {
    trackId: 'backend',
    slug: 'backend-development',
    title: 'Backend Development',
    category: 'build',
    readinessScore: 78.0,
    rationale:
      '37 guided steps across 5 stages, 5 embedded project steps, 15 knowledge-check questions with full authored coverage, 4 authored project briefs and a portfolio final project (be-p5). Pairs naturally with Frontend to form a coherent software-engineering wave.',
    freePreview: 'Track-level access; the whole Free catalogue (29 other tracks) remains open.',
  },
  {
    trackId: 'python',
    slug: 'python-development',
    title: 'Python Development',
    category: 'build',
    readinessScore: 69.4,
    rationale:
      '29 guided steps across 5 stages with 6 embedded project steps and full authored knowledge-check coverage (5/5), 2 authored project briefs and a portfolio final project (py-p6). Broad, high-demand foundation that complements the web tracks.',
    freePreview: 'Track-level access; the whole Free catalogue (29 other tracks) remains open.',
  },
]

/** Every canonical track id in the catalogue (verified at module load). */
export const ALL_TRACK_IDS: readonly string[] = TRACKS.map((track) => track.id)

/** The three first-wave track ids, in manifest order. */
export const FIRST_WAVE_TRACK_IDS: readonly string[] = PREMIUM_WAVE_1.map((track) => track.trackId)

const ALL_TRACK_ID_SET = new Set(ALL_TRACK_IDS)

/**
 * Parse an operator allowlist. Unknown ids are DROPPED (fail-safe): a typo, a
 * blank entry or an unrecognised token can never make a different track premium
 * and can never turn the whole catalogue premium.
 */
export function parsePremiumAllowlist(raw: string, knownIds: readonly string[] = ALL_TRACK_IDS): string[] {
  const known = new Set(knownIds)
  return Array.from(
    new Set(
      raw
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean)
        .filter((id) => known.has(id)),
    ),
  )
}

/** Ids present in the raw allowlist that are not real catalogue tracks. */
export function premiumAllowlistUnknown(raw: string, knownIds: readonly string[] = ALL_TRACK_IDS): string[] {
  const known = new Set(knownIds)
  return Array.from(
    new Set(
      raw
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean)
        .filter((id) => !known.has(id)),
    ),
  )
}

export interface PremiumConfig {
  trackIds: string[]
  /** Where the effective set came from. */
  source: 'manifest' | 'env' | 'none'
  /** Non-fatal configuration problems to surface (e.g. unknown ids). */
  issues: string[]
}

/**
 * Resolve the effective premium set.
 *
 *  - `COMMERCE_PREMIUM_TRACK_IDS` set and non-empty → that operator value
 *    (validated; unknown ids dropped).
 *  - `COMMERCE_PREMIUM_TRACK_IDS` set to empty/whitespace → explicitly none.
 *  - unset → the tracked first-wave manifest.
 *
 * The result is always validated against the real catalogue, so the premium set
 * can never accidentally contain every track or a non-existent id.
 */
export function resolvePremiumConfig(
  env: Record<string, string | undefined> = process.env,
  knownIds: readonly string[] = ALL_TRACK_IDS,
): PremiumConfig {
  const raw = env.COMMERCE_PREMIUM_TRACK_IDS
  if (typeof raw === 'string') {
    const unknown = premiumAllowlistUnknown(raw, knownIds)
    const trackIds = parsePremiumAllowlist(raw, knownIds)
    const issues = unknown.length > 0 ? [`unknown_premium_track_ids:${unknown.join(',')}`] : []
    return { trackIds, source: trackIds.length > 0 ? 'env' : 'none', issues }
  }

  // No override: use the tracked manifest, but only keep ids that still exist in
  // the catalogue (defends against a catalogue rename silently breaking config).
  const manifestIds = FIRST_WAVE_TRACK_IDS.filter((id) => new Set(knownIds).has(id))
  const dropped = FIRST_WAVE_TRACK_IDS.filter((id) => !new Set(knownIds).has(id))
  const issues = dropped.length > 0 ? [`manifest_ids_not_in_catalogue:${dropped.join(',')}`] : []
  return { trackIds: manifestIds, source: manifestIds.length > 0 ? 'manifest' : 'none', issues }
}

/** True when the id is a real premium track under the given environment. */
export function isPremiumTrackInCatalogue(
  trackId: string,
  env: Record<string, string | undefined> = process.env,
  knownIds: readonly string[] = ALL_TRACK_IDS,
): boolean {
  if (!ALL_TRACK_ID_SET.has(trackId) && !knownIds.includes(trackId)) return false
  return resolvePremiumConfig(env, knownIds).trackIds.includes(trackId)
}
