/**
 * Compatible path-continuity mapping.
 *
 * Why this exists
 * ---------------
 * A guided path is an ordered list of steps. Learners are tracked by a single
 * integer cursor (`GuidedPathEnrollment.currentStepIndex` = number of completed
 * steps = index of the next unlocked step), so the interface marks every step
 * with `index < currentStepIndex` as done. When a path's step list changes, that
 * integer no longer points at the same place.
 *
 * The previous policy restarted *incomplete* paths at index 0. Restarting does
 * not lose database rows, but it DOES lose the learner's position in the
 * interface: every completed section is shown as incomplete again and the
 * learner is forced to repeat valid, already-completed work. This module
 * replaces that policy with a principled, evidence-based remap:
 *
 *   1. Steps are identified by a stable *semantic key* (stage + role +
 *      resource/project id), not by their position, so a key survives
 *      insertions and reordering.
 *   2. The learner's genuinely completed steps are reconstructed from their
 *      `UserProgress` activity records, which carry the same stable semantics.
 *   3. The cursor is placed immediately after the learner's furthest completed
 *      step, so their position is preserved.
 *   4. Steps before that point that are not in the completed set were, by
 *      construction, introduced after the learner passed them (guided paths are
 *      strictly linear, so a step that existed could not have been skipped).
 *      They are *adopted* — never presented as a failure — but they are NOT
 *      counted as mastered.
 *   5. A mandatory assessment (quiz, project or checkpoint) that the learner has
 *      not completed is never adopted and never skipped: the learner resumes at
 *      the earliest such step, so a newly required assessment cannot be bypassed
 *      using historical activity.
 *
 * Everything here is pure so the policy is unit-testable without a database.
 */

/** The structural identity of a guided step, independent of its position. */
export interface StepIdentity {
  type: string
  stageId?: number
  resourceId?: string
  projectId?: string
}

/** A `UserProgress` row, reduced to the fields the mapping needs. */
export interface CompletionRecord {
  itemType: string
  stageId?: number | null
  resourceId?: string | null
}

/**
 * Explicit old-id -> new-id aliases for projects whose identifier changed.
 *
 * When a project is *replaced* its stored submission is still kept, but the
 * historical completion key must be translated to the new step, otherwise the
 * learner would be asked to redo work that was replaced rather than newly
 * required. Aliases are additive and auditable; there are none today.
 */
export const PROJECT_ID_ALIASES: Record<string, string> = {}

/** Apply the (documented, currently empty) project id alias table. */
export function canonicalProjectId(projectId: string): string {
  return PROJECT_ID_ALIASES[projectId] ?? projectId
}

/** Step types that gate progression and must never be adopted from history. */
export function isAssessmentStepType(type: string): boolean {
  return type === 'quiz' || type === 'project' || type === 'checkpoint'
}

/** The stable key for a guided step. */
export function guidedStepKey(step: StepIdentity): string {
  const stage = step.stageId ?? ''
  switch (step.type) {
    case 'concept':
      return `c:${stage}`
    case 'quiz':
      return `q:${stage}`
    case 'practice':
      return `p:${stage}`
    case 'checkpoint':
      return `k:${stage}`
    case 'project':
      return `j:${canonicalProjectId(step.projectId ?? `stage-${stage}`)}`
    case 'resource':
      return `r:${stage}:${step.resourceId ?? ''}`
    default:
      return `x:${step.type}:${stage}:${step.resourceId ?? step.projectId ?? ''}`
  }
}

/** The stable step key implied by a completed `UserProgress` row, or null. */
export function userProgressStepKey(record: CompletionRecord): string | null {
  const stage = record.stageId ?? ''
  const resourceId = record.resourceId ?? null

  if (record.itemType === 'project') {
    return resourceId ? `j:${canonicalProjectId(resourceId)}` : null
  }
  if (record.itemType !== 'stage') return null
  if (!resourceId) return null
  if (resourceId === `step-quiz-${stage}`) return `q:${stage}`
  if (resourceId === `step-practice-${stage}`) return `p:${stage}`
  if (resourceId === `step-checkpoint-${stage}`) return `k:${stage}`
  // Other synthetic `step-*` ids carry no stable meaning across versions.
  if (resourceId.startsWith('step-')) return null
  return `r:${stage}:${resourceId}`
}

/** True when a stable key belongs to a progression-gating assessment. */
export function isAssessmentKey(key: string): boolean {
  const prefix = key.slice(0, 1)
  return prefix === 'q' || prefix === 'j' || prefix === 'k'
}

export type CompatibilityStrategy =
  /** The learner had already finished the course. */
  | 'completed'
  /** Position preserved; any adopted steps were added after the learner passed them. */
  | 'preserved'
  /** A new mandatory assessment sits before the learner's position; resume at it. */
  | 'new-requirement'
  /** No activity records to key on; the stored position was kept as a best effort. */
  | 'restored'
  /** No activity records and no stored position; a genuinely fresh start. */
  | 'fresh'
  /** The learner had been reset to 0 by the old policy; recovered from records. */
  | 'recovered'

export interface CompatibilityInput {
  isCompleted: boolean
  totalSteps: number
  /** The learner's stored `currentStepIndex` under the previous path version. */
  storedStepIndex: number
  /** Stable keys of the steps the learner has genuinely completed. */
  completedKeys: Iterable<string>
  /** Stable keys of the new path, in order. */
  stepKeys: string[]
  /**
   * When true, the mapping runs even though the version already matches. Used to
   * repair learners left at 0 by the old restart policy. Only ever moves a
   * learner forward from an empty position, using genuine records.
   */
  repairStalledAtZero?: boolean
}

export interface CompatibilityResult {
  index: number
  strategy: CompatibilityStrategy
  /** Steps before the resume point that are completed-by-position but not recorded. */
  adoptedSteps: number
  /** The key of the new requirement the learner must satisfy, when applicable. */
  blockingKey: string | null
  /** The furthest step the learner is evidenced to have completed, or -1. */
  anchorIndex: number
}

/** The persisted record of a path update, kept so the notice survives reloads. */
export interface PathUpdateRecord {
  fromVersion: number
  toVersion: number
  strategy: CompatibilityStrategy
  adoptedSteps: number
  at: string
  acknowledged?: boolean
}

/** The learner-facing notice. */
export interface PathUpdateNotice {
  fromVersion: number
  toVersion: number
  strategy: CompatibilityStrategy
  message: string
}

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min
  const floored = Math.floor(value)
  if (floored < min) return min
  if (floored > max) return max
  return floored
}

/**
 * Resolve the learner's resume index in the current path from their completed
 * activity, the new path shape and their stored position.
 */
export function resolveCompatiblePathIndex(input: CompatibilityInput): CompatibilityResult {
  const total = Math.max(0, Math.floor(Number(input.totalSteps) || 0))
  const stepKeys = input.stepKeys

  if (input.isCompleted) {
    return { index: total, strategy: 'completed', adoptedSteps: 0, blockingKey: null, anchorIndex: total - 1 }
  }

  const completed = new Set(input.completedKeys)
  const recordedIndices: number[] = []
  for (let i = 0; i < stepKeys.length; i += 1) {
    if (completed.has(stepKeys[i])) recordedIndices.push(i)
  }

  const storedIndex = clamp(input.storedStepIndex, 0, total)

  if (recordedIndices.length === 0) {
    const repairing = Boolean(input.repairStalledAtZero) && storedIndex === 0
    if (repairing) {
      // Nothing to recover from: the learner genuinely has no recorded activity.
      return { index: 0, strategy: 'fresh', adoptedSteps: 0, blockingKey: null, anchorIndex: -1 }
    }
    // No records to key on (for example a learner who only passed stage
    // introductions, which are not recorded). Never silently reset to the start:
    // keep the stored position as a best effort and let the interface explain it.
    return {
      index: storedIndex,
      strategy: storedIndex > 0 ? 'restored' : 'fresh',
      adoptedSteps: 0,
      blockingKey: null,
      anchorIndex: -1,
    }
  }

  const anchorIndex = Math.max(...recordedIndices)

  // Never bypass a newly introduced mandatory assessment that sits before the
  // learner's furthest completed step: resume at the earliest such step. This
  // also stops historical activity from unlocking genuinely new progression.
  let blockingIndex = -1
  let blockingKey: string | null = null
  for (let i = 0; i <= anchorIndex; i += 1) {
    if (!completed.has(stepKeys[i]) && isAssessmentKey(stepKeys[i])) {
      blockingIndex = i
      blockingKey = stepKeys[i]
      break
    }
  }

  if (blockingIndex >= 0) {
    const adoptedSteps = countAdopted(stepKeys, completed, blockingIndex)
    return { index: blockingIndex, strategy: 'new-requirement', adoptedSteps, blockingKey, anchorIndex }
  }

  const index = clamp(anchorIndex + 1, 0, total)
  const adoptedSteps = countAdopted(stepKeys, completed, index)
  return { index, strategy: 'preserved', adoptedSteps, blockingKey: null, anchorIndex }
}

function countAdopted(stepKeys: string[], completed: Set<string>, upTo: number): number {
  let adopted = 0
  for (let i = 0; i < upTo && i < stepKeys.length; i += 1) {
    const key = stepKeys[i]
    // Stage introductions (`c:`) are orientation passthroughs, not activities,
    // so they are never reported as "added" steps.
    if (key.startsWith('c:')) continue
    if (!completed.has(key)) adopted += 1
  }
  return adopted
}

/** A concise, factual explanation of a path update for the learner interface. */
export function describePathUpdate(result: { strategy: CompatibilityStrategy; adoptedSteps?: number }): string | null {
  const adoptedSteps = result.adoptedSteps ?? 0
  switch (result.strategy) {
    case 'preserved':
      if (adoptedSteps > 0) {
        return `This course was updated. You're back where you left off, and ${adoptedSteps === 1 ? '1 new step' : `${adoptedSteps} new steps`} added to earlier sections ${adoptedSteps === 1 ? 'is' : 'are'} available if you want to revisit them.`
      }
      return "This course was updated. You're exactly where you left off."
    case 'new-requirement':
      return 'This course gained a new required step earlier in the path. Your completed work is saved — continue from the new step before moving on.'
    case 'restored':
      return 'This course was updated. Your earlier progress was kept as closely as possible — continue from here. Your saved work and submissions are unchanged.'
    case 'recovered':
      return 'We restored your place in this updated course from your completed activity. Your saved work and submissions are unchanged.'
    case 'completed':
      return null
    case 'fresh':
    default:
      return null
  }
}

/**
 * Build the learner-facing notice from a persisted path-update record, or null
 * when there is nothing to show (no record, already acknowledged, or a no-op
 * update). Kept pure so the route and tests share one source of truth.
 */
export function pathUpdateNoticeFromRecord(record: unknown): PathUpdateNotice | null {
  if (!record || typeof record !== 'object' || Array.isArray(record)) return null
  const raw = record as Record<string, unknown>
  if (raw.acknowledged === true) return null
  const fromVersion = typeof raw.fromVersion === 'number' ? raw.fromVersion : null
  const toVersion = typeof raw.toVersion === 'number' ? raw.toVersion : null
  const strategy = typeof raw.strategy === 'string' ? (raw.strategy as CompatibilityStrategy) : null
  if (fromVersion === null || toVersion === null || !strategy) return null
  const adoptedSteps = typeof raw.adoptedSteps === 'number' ? raw.adoptedSteps : 0
  const message = describePathUpdate({ strategy, adoptedSteps })
  if (!message) return null
  return { fromVersion, toVersion, strategy, message }
}
