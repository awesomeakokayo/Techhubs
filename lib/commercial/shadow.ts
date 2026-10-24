/**
 * TechSkillHub — shadow access evaluation (pure decision + redacted logging).
 *
 * Shadow mode answers "what WOULD the premium policy decide?" without ever
 * changing access. It is used only for diagnostics while enforcement is off: the
 * returned `allowed` is always `true` in shadow mode, so the caller cannot
 * accidentally deny anyone. Nothing here writes to the database, so shadow
 * evaluation cannot mutate access, progress, prices or payment state.
 */

import crypto from 'node:crypto'
import { canAccessTrack, type EntitlementSnapshot } from './entitlements'

export type AccessEnforcementMode = 'off' | 'shadow' | 'enforced'

export interface AccessDecision {
  /** The access decision actually applied. Always true unless enforced. */
  allowed: boolean
  enforcement: AccessEnforcementMode
  /** What the premium policy would decide (diagnostics only). */
  proposedAllowed: boolean
  /** True when the proposed decision differs from today's open access. */
  wouldChange: boolean
  reason: string
}

/**
 * The single pure access-policy decision. In `off` and `shadow` modes `allowed`
 * is always true, so access is never reduced while enforcement is disabled.
 */
export function decideTrackAccess(input: {
  enforced: boolean
  shadow: boolean
  snapshot: EntitlementSnapshot | null
  trackId: string
  premiumIds: readonly string[]
}): AccessDecision {
  const { enforced, shadow, snapshot, trackId, premiumIds } = input

  if (!enforced) {
    const proposed =
      shadow && snapshot ? canAccessTrack(snapshot, trackId, premiumIds) : true
    return {
      allowed: true,
      enforcement: shadow ? 'shadow' : 'off',
      proposedAllowed: proposed,
      wouldChange: proposed === false,
      reason: shadow ? 'shadow_evaluation' : 'enforcement_disabled',
    }
  }

  const allowed = snapshot ? canAccessTrack(snapshot, trackId, premiumIds) : false
  return {
    allowed,
    enforcement: 'enforced',
    proposedAllowed: allowed,
    wouldChange: false,
    reason: allowed ? 'entitled' : 'not_entitled',
  }
}

/** Redact an identifier for logs: a stable short prefix, never the full id. */
export function redactId(value: string | null | undefined): string | null {
  if (!value) return null
  return `u_${crypto.createHash('sha256').update(value).digest('hex').slice(0, 10)}`
}

/**
 * Privacy-conscious shadow diagnostic. Logs only a redacted user prefix, the
 * track id and the proposed decision — never secrets, submissions or assessment
 * content. Never throws.
 */
export function logShadowDecision(decision: AccessDecision, input: { userId: string; trackId: string }): void {
  if (!decision.wouldChange) return
  try {
    console.info(
      JSON.stringify({
        event: 'shadow_access_mismatch',
        user: redactId(input.userId),
        trackId: input.trackId,
        enforced: decision.enforcement,
        proposedAllowed: decision.proposedAllowed,
      }),
    )
  } catch {
    // Diagnostics must never break the request path.
  }
}
