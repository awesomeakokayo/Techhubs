/**
 * Server-authoritative fields inside `UserTrackProgress.data`.
 *
 * These fields decide progression and are written ONLY by trusted server code:
 *  - `projectSubmissions` / `projectSubmissionHistory` — written by the project
 *    verification pipeline (`lib/project-verification/store.ts`). The guided-path
 *    route reads `projectSubmissions[...].status === 'passed'` to allow a project
 *    step to advance, so if a client could write this map it could forge a pass
 *    and unlock the next stage without any verification.
 *  - `guidedPathVersion` / `aiGuidedPathVersion` — written by path migration
 *    (`lib/path-enrollment.ts`). A client must not be able to rewrite its own
 *    path version to dodge a re-key/remap.
 *  - `pathCompatibility` — written by path migration; records how the learner's
 *    position was remapped across a path update.
 *  - `sectionMastery` / `masterySubmissions` — reserved for server-recorded,
 *    AI-verified section-level mastery results.
 *  - `quizAttempts` — durable quiz attempt state, including graded scores,
 *    passing attempts and legacy grandfather records. If a client could write
 *    this map it could forge a passed attempt and advance without submitting
 *    answers for server-side grading.
 *
 * A client may only sync its own non-authoritative state through
 * `POST /api/progress`; the authoritative keys are refused outright.
 */
export const SERVER_OWNED_PROGRESS_KEYS = [
  'projectSubmissions',
  'projectSubmissionHistory',
  'guidedPathVersion',
  'aiGuidedPathVersion',
  'pathCompatibility',
  'sectionMastery',
  'masterySubmissions',
  'quizAttempts',
] as const

export type ServerOwnedProgressKey = (typeof SERVER_OWNED_PROGRESS_KEYS)[number]

/** True for a plain JSON object (not null, not an array). */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Returns the server-owned keys present in a client-supplied progress payload.
 * An empty array means the payload touches no authoritative field.
 */
export function protectedProgressKeysPresent(data: unknown): string[] {
  if (!isPlainObject(data)) return []
  return SERVER_OWNED_PROGRESS_KEYS.filter((key) => Object.prototype.hasOwnProperty.call(data, key))
}

/**
 * Merge client-owned progress keys into the stored server data WITHOUT ever
 * writing a server-owned key from the client payload. Server-owned keys already
 * in `existing` are preserved verbatim; client-owned keys in `incoming` are
 * applied; server-owned keys present in `incoming` are dropped as a last line of
 * defence (the route rejects them earlier with a 400).
 */
export function mergeClientProgress(
  existing: unknown,
  incoming: Record<string, unknown>,
): Record<string, unknown> {
  const base = isPlainObject(existing) ? { ...existing } : {}
  for (const [key, value] of Object.entries(incoming)) {
    if ((SERVER_OWNED_PROGRESS_KEYS as readonly string[]).includes(key)) continue
    base[key] = value
  }
  return base
}
