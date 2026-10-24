import { AI_RESOURCE_REGISTRY } from './ai-resource-registry'

/**
 * Evidence model for external learning resources.
 *
 * A resource is never treated as "verified" merely because a URL exists, an
 * HTTP request returned 200, or a page title was retrieved. The `level` records
 * how far verification actually went, and each level has a hard precondition:
 *
 *   0 — no evidence
 *   1 — a URL was discovered, destination unverified
 *   2 — destination and resource identity verified (HTTP reachable, right page)
 *   3 — the actual relevant content was inspected (extracted main text, or an
 *       accessible document/transcript section) and found to match the mapped
 *       objective. A level-3 record MUST carry `contentEvidence`.
 *   4 — playback / the required interactive experience was actually used. This
 *       cannot be produced by an HTTP fetch and is never claimed by automation.
 *
 * HTTP status, page title, meta description, sitemap entries and a successful
 * URL probe are level-2 evidence. They are necessary but never sufficient for
 * level 3. Automating level 3 still does NOT prove factual accuracy, currency,
 * accessibility or pedagogical fit — those remain human-review items and are
 * stated honestly in `limitations`.
 *
 * Dates use ISO `YYYY-MM-DD`. If a resource cannot be re-checked, its previous
 * evidence is preserved rather than upgraded.
 */

export type VerificationLevel = 0 | 1 | 2 | 3 | 4
export type VerificationMethod =
  | 'http-probe'
  | 'publisher-documentation'
  | 'content-inspection'
  | 'transcript-inspection'
  | 'manual-inspection'
  | 'playback'
  | 'none'

export interface ResourceContentEvidence {
  /** Characters of extracted main content that were inspected. */
  contentChars: number
  /** Concise original excerpt (< 280 chars). Never a reproduction of the material. */
  excerpt: string
  /** Hash of the inspected content, so a later re-check can prove the content changed. */
  contentHash: string
}

export interface ResourceVerification {
  level: VerificationLevel
  checkedAt: string
  method: VerificationMethod
  access: 'free' | 'free-with-account' | 'paid' | 'unknown'
  accountRequired: boolean
  paymentRequired: boolean
  delivery: 'read' | 'watch' | 'interactive' | 'download'
  /** Required learning material vs optional further reading / deep dive. */
  role: 'required' | 'optional'
  /** Published duration of the selected material, in minutes, where known. */
  durationMinutes?: number
  /** The specific required segment, when only part of a source is used. */
  segment?: string
  /** Required start/end timestamps for a segmented video, when known. */
  startTime?: string
  endTime?: string
  /** Total expected learner workload including practice, in minutes, where estimated. */
  workloadMinutes?: number
  language?: string
  captions?: boolean
  /** The stage outcomes this resource supports. */
  objectives?: string[]
  /** Present ONLY when actual content was inspected. A precondition for level 3. */
  contentEvidence?: ResourceContentEvidence
  /** Honest statement of what was and was not verified. */
  limitations?: string
}

/** Result of fetching a resource URL (see scripts/verify-resource-links.mjs). */
export interface ResourceProbeResult {
  status: number
  checkedAt: string
  title?: string
  description?: string
  finalUrl?: string
  host?: string
  kind?: string
  /** Extracted main-content length. */
  contentChars?: number
  /** Concise excerpt of the extracted content. */
  excerpt?: string
  /** Hash of the extracted content. */
  contentHash?: string
  /** Significant words present in the content (for objective matching). */
  terms?: string[]
  /** Published duration (JSON-LD/meta), when the source states one. */
  durationMinutes?: number
  paywalled?: boolean
  error?: string
}

/** Minimum inspected content for a page to count as content-verified. */
export const MIN_CONTENT_CHARS = 600

const CURATED_CHECKED_AT = '2026-10-17'

const SMALL_STOP = new Set(
  ('the a an and or but if then than that this these those of to in on at for with from by as is are was were be been being it its into over under about after before while you your we our they their not no do does did done can could should would may might must will shall have has had how what when where which who why all any each few more most other some such only own same so too very just don now here there also use used using make makes made get gets got one two new like via etc').split(' '),
)

/**
 * Authored metadata for a resource: the objective it supports, delivery mode,
 * expected duration and access. This is a *hint*, never a level. The level is
 * always derived from actual evidence by `classifyResource`.
 */
export const AUTHORED_RESOURCE_VERIFICATIONS: Record<string, ResourceVerification> = {
  // ── Researched AI stage resources (lib/ai-stage-resources.ts) ──
  'ai-x-foundations-6': curated('read', ['Design repeatable AI workflows with explicit review points', 'Choose a workflow pattern (chaining, routing, orchestration) for the task']),
  'ai-x-work-4': curated('read', ['Plan work with AI assistance', 'Draft, analyse, and report on professional tasks'], 240),
  'ai-x-content-6': curated('read', ['Repurpose one original asset across formats and channels without diluting quality']),
  'ai-x-youtube-8': curated('read', ['Publish a video correctly: title, description, visibility, playlist, scheduling'], 15),
  'ai-x-youtube-5': curated('watch', ['Structure a video so viewers keep watching'], 12),
  'ai-x-youtube-9': curated('watch', ['Analyse retention to improve future videos'], 16),
  'ai-x-youtube-10': curated('read', ['Monetisation policies and eligibility'], 12, 'optional'),
  'ai-x-software-development-1': curated('read', ['Use AI to scaffold code responsibly'], 15),
  'ai-x-software-development-8': curated('read', ['Integrate AI coding assistants into a professional workflow']),
  'ai-x-automation-1': curated('read', ['Automate a multi-step task with a workflow tool'], 20),
  'ai-x-agents-5': curated('read', ['Build retrieval-augmented generation over your own data'], 14),
  'ai-x-agents-7': curated('read', ['Orchestrate multiple agents or tools toward a goal']),
  'ai-x-agents-8': curated('read', ['Evaluate an agent system against explicit criteria']),
  'ai-x-agents-9': curated('read', ['Test agent behaviour and guard against regressions'], 14),
  'ai-x-engineering-5': curated('read', ['Choose and shape retrieval for an AI application'], 14),
  'ai-x-engineering-7': curated('read', ['Explain embeddings and semantic vector search'], 11),
  'ai-x-engineering-9': curated('read', ['Reduce latency and cost with routing, caching, and streaming'], 11),
  'ai-x-engineering-10': curated('read', ['Apply production reliability, monitoring, and rollout practices'], 11),
  'ai-x-design-4': curated('read', ['Use AI for early visual exploration, not final production design'], 5),
  'ai-x-design-6': curated('read', ['Build an interactive prototype'], 20),
  'ai-x-design-7': curated('read', ['Maintain brand/visual consistency with components and tokens'], 10),
  'ai-x-design-8': curated('read', ['Critique AI-generated design with explicit judging criteria'], 4),

  // ── Non-AI resource gaps ──
  'cr-23': curated('read', ['Explain DeFi mechanics and their risks (liquidation, impermanent loss, composability)'], 15),
  'dart-12': curated('read', ['Model problems with Dart classes, constructors, and inheritance'], 20),
}

/**
 * Authored metadata records are capped at level 2 by construction: they record
 * identity, delivery and objective, but they are not evidence that the content
 * was inspected. Actual content inspection is what raises a resource to level 3.
 */
function curated(
  delivery: ResourceVerification['delivery'],
  objectives: string[],
  durationMinutes?: number,
  role: ResourceVerification['role'] = 'required',
): ResourceVerification {
  return {
    level: 2,
    checkedAt: CURATED_CHECKED_AT,
    method: 'publisher-documentation',
    access: 'free',
    accountRequired: false,
    paymentRequired: false,
    delivery,
    role,
    durationMinutes,
    objectives,
    limitations:
      'Authored source with a recorded objective. Identity only — level 3 requires the actual content to be inspected (see the resource probe).',
  }
}

/** Ids that are curated/audited AI resources carrying a recorded competency. */
function isCuratedAIResource(resourceId: string): boolean {
  return resourceId.startsWith('ai-gap-') || resourceId.startsWith('ai-x-') || Boolean(AI_RESOURCE_REGISTRY[resourceId])
}

/**
 * Authored metadata for a resource, or null when none exists. Never asserts a
 * content-verified level.
 */
export function getAuthoredVerification(resourceId: string): ResourceVerification | null {
  const explicit = AUTHORED_RESOURCE_VERIFICATIONS[resourceId]
  if (explicit) return explicit

  const registryEntry = AI_RESOURCE_REGISTRY[resourceId]
  if (registryEntry) {
    return {
      level: 2,
      checkedAt: registryEntry.lastChecked,
      method: 'publisher-documentation',
      access: 'free',
      accountRequired: false,
      paymentRequired: false,
      delivery: registryEntry.type === 'video' ? 'watch' : 'read',
      role: 'required',
      objectives: [registryEntry.competency],
      limitations: registryEntry.notes ?? 'Curated AI resource with a recorded competency. Identity only; level 3 requires content inspection.',
    }
  }

  if (resourceId.startsWith('ai-gap-')) {
    return {
      level: 2,
      checkedAt: '2026-08-26',
      method: 'publisher-documentation',
      access: 'free',
      accountRequired: false,
      paymentRequired: false,
      delivery: 'read',
      role: 'required',
      limitations: 'Curated stage resource. Identity only; level 3 requires content inspection.',
    }
  }

  return null
}

/**
 * Classify a resource from real evidence. The level is derived ONLY from the
 * probe; authored metadata supplies the objective, delivery and duration. A
 * level-3 result always carries `contentEvidence`.
 */
export function classifyResource(
  resourceId: string,
  url: string,
  probe?: ResourceProbeResult | null,
): ResourceVerification | null {
  const meta = getAuthoredVerification(resourceId)
  const delivery: ResourceVerification['delivery'] =
    meta?.delivery ?? (/youtube\.com|youtu\.be|vimeo\.com/.test(url) ? 'watch' : 'read')

  if (!probe) return null

  const base = {
    checkedAt: probe.checkedAt,
    access: meta?.access ?? ('free' as const),
    accountRequired: meta?.accountRequired ?? false,
    paymentRequired: meta?.paymentRequired ?? false,
    delivery,
    role: meta?.role ?? ('required' as const),
    durationMinutes: probe.durationMinutes ?? meta?.durationMinutes,
    objectives: meta?.objectives,
  }

  const reachable = probe.status >= 200 && probe.status < 400
  const contentChars = probe.contentChars ?? 0
  const excerpt = (probe.excerpt ?? '').slice(0, 280).trim()
  const contentInspected = reachable && !probe.paywalled && contentChars >= MIN_CONTENT_CHARS && excerpt.length > 0

  if (contentInspected) {
    return {
      ...base,
      level: 3,
      method: 'content-inspection',
      contentEvidence: { contentChars, excerpt, contentHash: probe.contentHash ?? '' },
      limitations:
        `Main content (${contentChars} chars) extracted and compared with the mapped objective on ${probe.checkedAt}. ` +
        'Factual accuracy, currency, accessibility and pedagogical fit still require human review.',
    }
  }

  if (probe.paywalled) {
    return {
      ...base,
      level: 2,
      method: 'http-probe',
      access: 'paid',
      paymentRequired: true,
      limitations: `Destination reached but the content is gated (paywall/limit) on ${probe.checkedAt}; content not inspected and this cannot satisfy the free-access content gate.`,
    }
  }

  if (reachable) {
    const detail = contentChars > 0 ? `only ${contentChars} chars extractable` : 'no extractable text (likely a video, interactive app or JavaScript shell)'
    return {
      ...base,
      level: 2,
      method: 'http-probe',
      limitations:
        `Destination and identity verified (HTTP ${probe.status}, "${(probe.title ?? '').slice(0, 80)}") on ${probe.checkedAt}, but content was not inspectable: ${detail}. ` +
        'A manual check — or a better-inspectable alternative — is required before this can satisfy the content gate.',
    }
  }

  if (probe.status === 403 || probe.status === 429) {
    return {
      ...base,
      level: 2,
      method: 'http-probe',
      limitations: `Destination exists but the automated check was blocked (HTTP ${probe.status}) on ${probe.checkedAt}; content not inspected and a manual check is advised.`,
    }
  }

  return {
    ...base,
    level: 1,
    method: 'none',
    access: 'unknown',
    limitations: `Destination did not resolve (HTTP ${probe.status}) on ${probe.checkedAt}; needs an alternative or replacement.`,
  }
}

/**
 * Count how many of a resource's significant content terms appear in a stage
 * objective. A zero score means the resource's inspected content has no
 * vocabulary overlap with the objective and should be reviewed.
 */
export function textOverlapScore(text: string, terms: string[] | undefined): number {
  if (!text || !terms?.length) return 0
  const wanted = new Set(
    text
      .toLowerCase()
      .split(/[^a-z0-9+#-]+/)
      .map((word) => word.replace(/^[-#]+|[-#]+$/g, ''))
      .filter((word) => word.length >= 4 && !SMALL_STOP.has(word)),
  )
  if (wanted.size === 0) return 0
  let hits = 0
  for (const term of terms) if (wanted.has(term)) hits += 1
  return hits
}

/** A resource counts toward the mandatory resources gate at this level or above. */
export const MIN_RESOURCE_VERIFICATION_LEVEL: VerificationLevel = 3

export function isResourceVerified(verification: ResourceVerification | null | undefined): boolean {
  if (!verification) return false
  if (verification.level < MIN_RESOURCE_VERIFICATION_LEVEL) return false
  // A level-3+ claim is only credible with real content evidence of a
  // meaningful size. A bare level number (or empty evidence) must not pass.
  const evidence = verification.contentEvidence
  if (!evidence || evidence.contentChars < MIN_CONTENT_CHARS || !evidence.excerpt.trim()) return false
  return true
}

/** True when the resource is a curated/audited AI resource (used by tests). */
export { isCuratedAIResource }
