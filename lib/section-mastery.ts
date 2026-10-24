/**
 * Section-level AI-verified mastery.
 *
 * A progression-bearing section may embed a "Build" step with no mapped
 * portfolio project (all of the AI tracks do). Without a contract such a step is
 * unassessable and the learner is permanently blocked. This resolver builds a
 * mastery contract from the section's authored objective and success criteria,
 * reusing the shared assessment pipeline.
 *
 * It returns `null` when the section has no authored objective: we must never
 * fabricate a rubric for content that does not state what the learner should
 * achieve.
 */

import { getTrackById } from './tracks'
import { getAIStageObjective } from './ai-stage-objectives'
import { getAIProjectsForStage } from './ai-projects'
import { AI_PROJECT_BRIEFS } from './ai-project-briefs'
import { getProjectBrief } from './curriculum'
import { getExtraProjects } from './curriculum-extended-projects'
import type { ProjectBrief } from './curriculum'
import {
  deriveContract,
  deriveStageMasteryContract,
  stageMasteryProjectId,
  type SubmissionContract,
} from './project-verification/contract'
import { getPilotStageContent } from './curriculum-package/pilot.generated'

export interface SectionMastery {
  /** Synthetic assessment id stored in the shared submission map. */
  projectId: string
  contract: SubmissionContract
  stageId: number
  title: string
  objective: string
}

/**
 * Resolve the section-mastery assessment for a stage, or null when the stage has
 * no authored objective to assess against.
 */
export function resolveSectionMastery(trackId: string, stageId: number): SectionMastery | null {
  const track = getTrackById(trackId)
  if (!track) return null
  const stage = track.roadmap.find((s) => s.id === stageId)
  if (!stage) return null

  const objective = getAIStageObjective(trackId, stageId)
  if (!objective?.objective?.trim()) return null

  const pilot = getPilotStageContent(trackId, stageId)
  const contract = deriveStageMasteryContract({
    trackId,
    stageId,
    stageTitle: stage.title,
    objective: objective.objective,
    successCriteria: objective.successCriteria ?? [],
    rubric: pilot?.mastery?.criteria.map((criterion) => ({
      id: criterion.id,
      label: criterion.name,
      weight: criterion.weight,
      mandatory: criterion.mandatory,
    })),
    note: pilot ? 'Pilot section mastery rubric imported from the research package; content and rubric remain pending human review.' : undefined,
  })

  return {
    projectId: stageMasteryProjectId(trackId, stageId),
    contract,
    stageId,
    title: stage.title,
    objective: objective.objective,
  }
}

export { stageMasteryProjectId }

export interface StepAssessment {
  /** The id the submission is stored under (real project id or synthetic stage id). */
  projectId: string
  contract: SubmissionContract
}

/**
 * Resolve the assessment for a guided step. Returns null when the step is not an
 * assessable project step, or when a build step has no authored objective to
 * assess against (we never fabricate a rubric).
 */
export function resolveStepAssessment(
  trackId: string,
  step: { type: string; projectId?: string | null; stageId?: number | null },
): StepAssessment | null {
  if (step.type !== 'project') return null
  const track = getTrackById(trackId)
  if (!track) return null

  if (step.projectId) {
    // Projects live either on the base track (non-AI) or in the AI project
    // extensions (which are keyed by stage, not by track.projects). Both must be
    // searched or an AI capstone step silently becomes unassessable.
    const project =
      track.projects.find((p) => p.id === step.projectId) ??
      getExtraProjects(trackId).find((p) => p.id === step.projectId) ??
      (typeof step.stageId === 'number'
        ? getAIProjectsForStage(trackId, step.stageId).find((p) => p.id === step.projectId)
        : undefined)
    if (!project) return null
    // The AI project extensions carry their own authored acceptance criteria.
    // Overlay them on the derived brief so the AI capstone is assessed against
    // its authored outcomes (as the AI path intends) rather than a generic
    // template; fall back to the derived brief when no authored brief exists.
    const base = getProjectBrief(project.id, project.level, project.title)
    const aiBrief = AI_PROJECT_BRIEFS[project.id]
    const brief: ProjectBrief = aiBrief ? { ...base, acceptanceCriteria: aiBrief.acceptanceCriteria } : base
    return {
      projectId: project.id,
      contract: deriveContract({ project, track, brief }),
    }
  }

  if (typeof step.stageId === 'number') {
    const mastery = resolveSectionMastery(trackId, step.stageId)
    if (mastery) return { projectId: mastery.projectId, contract: mastery.contract }
  }
  return null
}
