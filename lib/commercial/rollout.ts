/**
 * TechSkillHub — staged rollout controls (server-controlled, pure).
 *
 * Everything here is decided from server environment configuration only. A
 * client cannot assert a phase, a cohort or an enforcement decision, and a
 * missing/garbage value always resolves to the safest phase (0) and to "not in
 * pilot". The cohort for a given user is deterministic, so it cannot change
 * between requests.
 *
 * Phases (see docs/premium-rollout.md):
 *   0 Internal preparation — everything present, nothing active (default).
 *   1 Shadow evaluation    — decisions logged, access never changed.
 *   2 Informational        — upcoming-model announcement shown, no restriction.
 *   3 Controlled pilot     — a named/percentage cohort is treated as enforced.
 *   4 Existing-user rollout— global enforcement.
 *
 * Access is only ever restricted when enforcement is on, either globally
 * (`COMMERCE_ENTITLEMENTS_ENFORCED=true`) or for a member of the explicit pilot
 * cohort. Both are OFF by default.
 */

import crypto from 'node:crypto'
import { entitlementsEnforced } from './providers'

type Env = Record<string, string | undefined>

export type RolloutPhase = 0 | 1 | 2 | 3 | 4

/** Shadow evaluation: compare decisions without changing access. */
export function shadowEvaluationEnabled(env: Env = process.env): boolean {
  return env.COMMERCE_SHADOW_EVAL === 'true'
}

/** The pilot cohort must be explicitly enabled before it can affect anyone. */
export function pilotEnabled(env: Env = process.env): boolean {
  return env.COMMERCE_PILOT_ENABLED === 'true'
}

function parseIdList(raw: string | undefined): string[] {
  if (typeof raw !== 'string') return []
  return raw
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)
}

function parsePercent(raw: string | undefined): number {
  if (typeof raw !== 'string') return 0
  const value = Number.parseInt(raw.trim(), 10)
  if (!Number.isFinite(value)) return 0
  return Math.max(0, Math.min(100, value))
}

/** Stable 0–99 bucket for a user id (deterministic across requests). */
export function cohortBucket(userId: string): number {
  const digest = crypto.createHash('sha256').update(userId).digest()
  const value = digest.readUInt32BE(0)
  return value % 100
}

/**
 * Whether a user is in the controlled pilot cohort. Deterministic and
 * fail-closed: disabled unless `COMMERCE_PILOT_ENABLED=true`, and only true for
 * an explicit id or a stable percentage bucket.
 */
export function isPilotUser(userId: string, env: Env = process.env): boolean {
  if (!pilotEnabled(env)) return false
  if (!userId) return false
  const ids = parseIdList(env.COMMERCE_PILOT_USER_IDS)
  if (ids.includes(userId)) return true
  const percent = parsePercent(env.COMMERCE_PILOT_PERCENT)
  if (percent <= 0) return false
  return cohortBucket(userId) < percent
}

/**
 * Per-user enforcement decision. Global enforcement wins; otherwise only an
 * explicit pilot cohort is enforced. Default (no flags) is `false` for everyone.
 */
export function entitlementsEnforcedForUser(
  userId: string | null | undefined,
  env: Env = process.env,
): boolean {
  if (entitlementsEnforced(env)) return true
  if (!userId) return false
  return isPilotUser(userId, env)
}

/** Resolve the effective phase, from explicit config or derived from the flags. */
export function rolloutPhase(env: Env = process.env): RolloutPhase {
  const explicit = Number.parseInt((env.COMMERCE_ROLLOUT_PHASE ?? '').trim(), 10)
  if (Number.isFinite(explicit) && explicit >= 0 && explicit <= 4) {
    return explicit as RolloutPhase
  }
  if (entitlementsEnforced(env)) return 4
  if (pilotEnabled(env) && (parseIdList(env.COMMERCE_PILOT_USER_IDS).length > 0 || parsePercent(env.COMMERCE_PILOT_PERCENT) > 0)) {
    return 3
  }
  if (shadowEvaluationEnabled(env)) return 1
  return 0
}
