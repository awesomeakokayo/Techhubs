/**
 * Pure, dependency-free derivation of learner progress.
 *
 * Two DISTINCT progress concepts are modelled and must never be blended into a
 * single arbitrary percentage:
 *
 *   1. Guided-path progress — sequential lesson steps, tracked by
 *      `GuidedPathEnrollment.currentStepIndex` (the number of completed steps,
 *      which is also the index of the next unlocked step).
 *   2. Checklist progress — explicit completion of roadmap stages and projects,
 *      kept separate from guided-path steps.
 *
 * `GuidedPathEnrollment.currentStepIndex` semantics (verified against
 * `app/api/guided-path/[trackId]/route.ts`):
 *   - initial: 0 (no steps completed)
 *   - completing the step at index i stores i + 1
 *   - the final step (index totalSteps - 1) stores totalSteps and records completion
 *   - the GET endpoint clamps the stored value to `totalSteps`
 * Therefore `completedSteps === clamp(currentStepIndex, 0, totalSteps)` and the
 * next unlocked step index is `completedSteps` until the path is complete.
 */

export interface GuidedPathProgress {
  /** True when a guided-path enrollment exists for this learner and track. */
  started: boolean
  /** Number of steps in the current guided path (path version). */
  totalSteps: number
  /** Steps completed, clamped to [0, totalSteps]. */
  completedSteps: number
  /** Index of the next unlocked step, or null when complete or empty. */
  nextStepIndex: number | null
  /** Whole-number percent of steps completed (0-100). Guided path only. */
  percent: number
  /** True when every step is complete (totalSteps > 0 and all steps done). */
  isComplete: boolean
}

export interface ChecklistProgress {
  completedStages: number
  totalStages: number
  completedProjects: number
  totalProjects: number
  /** True when at least one roadmap stage or project has been completed. */
  hasActivity: boolean
  /** True when every stage and project is complete and there is at least one item. */
  isComplete: boolean
}

/**
 * A track's progress, kept as two separate concepts. There is deliberately no
 * combined percentage field.
 */
export interface TrackProgress {
  guided: GuidedPathProgress
  checklist: ChecklistProgress
}

function nonNegativeCount(value: number | null | undefined): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 0
  const floored = Math.floor(value)
  return floored > 0 ? floored : 0
}

function clampIndex(value: number | null | undefined, max: number): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 0
  const floored = Math.floor(value)
  if (floored < 0) return 0
  if (floored > max) return max
  return floored
}

function uniqueCount(values: readonly (number | string)[] | null | undefined): number {
  if (!Array.isArray(values)) return 0
  return new Set(values).size
}

/**
 * Derive guided-path progress from an enrollment record and the current path's
 * total step count. Pass `null` for `enrollment` when the learner has not
 * enrolled (the path is available but not started).
 */
export function deriveGuidedPathProgress(
  enrollment: { currentStepIndex: number } | null | undefined,
  totalSteps: number | null | undefined,
): GuidedPathProgress {
  const total = nonNegativeCount(totalSteps)
  const started = Boolean(enrollment)
  const completedSteps = clampIndex(enrollment?.currentStepIndex ?? 0, total)
  const isComplete = total > 0 && completedSteps >= total
  const nextStepIndex = total === 0 || isComplete ? null : completedSteps
  const percent = total > 0 ? Math.round((completedSteps / total) * 100) : 0

  return { started, totalSteps: total, completedSteps, nextStepIndex, percent, isComplete }
}

/**
 * Derive roadmap/project checklist progress. Completed ids are de-duplicated and
 * clamped to the catalogue totals. Callers must pass ids that belong to the
 * track; this function cannot validate membership against the catalogue.
 */
export function deriveChecklistProgress(input: {
  completedStageIds?: readonly number[] | null
  completedProjectIds?: readonly string[] | null
  totalStages: number
  totalProjects: number
}): ChecklistProgress {
  const totalStages = nonNegativeCount(input?.totalStages)
  const totalProjects = nonNegativeCount(input?.totalProjects)
  const completedStages = Math.min(uniqueCount(input?.completedStageIds), totalStages)
  const completedProjects = Math.min(uniqueCount(input?.completedProjectIds), totalProjects)

  return {
    completedStages,
    totalStages,
    completedProjects,
    totalProjects,
    hasActivity: completedStages > 0 || completedProjects > 0,
    isComplete:
      totalStages + totalProjects > 0 &&
      completedStages >= totalStages &&
      completedProjects >= totalProjects,
  }
}

/** Derive both progress concepts for a track, reported separately. */
export function deriveTrackProgress(input: {
  enrollment: { currentStepIndex: number } | null | undefined
  totalSteps: number | null | undefined
  completedStageIds?: readonly number[] | null
  completedProjectIds?: readonly string[] | null
  totalStages: number
  totalProjects: number
}): TrackProgress {
  return {
    guided: deriveGuidedPathProgress(input.enrollment, input.totalSteps),
    checklist: deriveChecklistProgress({
      completedStageIds: input.completedStageIds,
      completedProjectIds: input.completedProjectIds,
      totalStages: input.totalStages,
      totalProjects: input.totalProjects,
    }),
  }
}

/* --------------------------------------------------------------------------
 * Portfolio readiness
 *
 * A deliberately non-blended report of what a learner can actually show:
 * content viewed, knowledge checks passed, projects submitted, and whether the
 * portfolio-grade project is in place. It never collapses into a single score.
 * ------------------------------------------------------------------------ */

export interface PortfolioReadiness {
  /** Number of guided steps completed (content viewed + tasks attempted). */
  stepsCompleted: number
  stepsTotal: number
  /** Server-validated knowledge checks passed. */
  knowledgeChecksPassed: number
  knowledgeChecksTotal: number
  /** Project evidence records submitted (self-reported, format-validated). */
  projectsSubmitted: number
  projectsTotal: number
  /** Portfolio-grade (final) projects with submitted evidence. */
  portfolioArtifacts: number
  /** True when every knowledge check passed and every project has evidence. */
  ready: boolean
}

interface ReadinessStep {
  type: string
  projectId?: string
  isPortfolio?: boolean
}

/**
 * Statuses that count as verified project evidence. The project-verification
 * pipeline (`lib/project-verification/assessment.ts`) writes `'passed'` when a
 * submission meets the rubric; `'submitted'` is accepted only as a legacy alias
 * (no current code writes it). Anything else (`in_progress`, `changes_required`,
 * `invalid`, `incomplete`, `unable_to_verify`, `service_unavailable`) does not
 * count, so portfolio readiness reflects genuinely verified work.
 */
const VERIFIED_PROJECT_STATUSES = new Set(['passed', 'submitted'])

function isVerifiedProjectStatus(status: string | undefined | null): boolean {
  return typeof status === 'string' && VERIFIED_PROJECT_STATUSES.has(status)
}

/**
 * @param completedSteps number of sequential steps completed (0..steps.length)
 * @param steps the ordered guided steps (steps[i] is completed when i < completedSteps)
 * @param submissions map of projectId -> submission record ({ status: 'passed' })
 */
export function derivePortfolioReadiness(
  completedSteps: number,
  steps: readonly ReadinessStep[],
  submissions: Record<string, { status?: string } | null | undefined> | null | undefined,
): PortfolioReadiness {
  const total = steps.length
  const completed = Math.max(0, Math.min(Math.floor(completedSteps) || 0, total))
  const done = steps.slice(0, completed)
  const map = submissions ?? {}

  const knowledgeChecksTotal = steps.filter((s) => s.type === 'quiz').length
  const knowledgeChecksPassed = done.filter((s) => s.type === 'quiz').length

  const projectSteps = steps.filter((s) => s.type === 'project')
  const projectsTotal = projectSteps.length
  const submitted = (step: ReadinessStep) =>
    Boolean(step.projectId && isVerifiedProjectStatus(map[step.projectId]?.status))
  const projectsSubmitted = projectSteps.filter((s) => submitted(s) && done.includes(s)).length
  const portfolioArtifacts = projectSteps.filter((s) => s.isPortfolio && submitted(s) && done.includes(s)).length

  const ready =
    total > 0 &&
    completed >= total &&
    knowledgeChecksPassed === knowledgeChecksTotal &&
    projectsSubmitted === projectsTotal &&
    portfolioArtifacts > 0

  return {
    stepsCompleted: completed,
    stepsTotal: total,
    knowledgeChecksPassed,
    knowledgeChecksTotal,
    projectsSubmitted,
    projectsTotal,
    portfolioArtifacts,
    ready,
  }
}
