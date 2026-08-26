import { buildGuidedPath, type GuidedStep } from './guided-path'
import { AI_PROJECT_EXTENSIONS, AI_RESOURCE_EXTENSIONS, AI_STAGE_CHECKPOINTS } from './ai-curriculum'
import { getAIPracticeTasks } from './ai-practice'
import { getAdvancedAIPracticeTasks } from './ai-practice-advanced'
import { getAIProjectsForStage } from './ai-projects'
import { getAIStageObjective } from './ai-stage-objectives'
import { getAIStageLesson } from './ai-stage-lessons'
import { getAISupplementalQuestions } from './ai-assessment-bank'
import { getVerifiedAIResource } from './ai-resource-audit'
import { AI_COMPETENCY_RESOURCE_MAP } from './ai-competency-resource-map'
import { isAIProjectPortfolioReady } from './ai-project-quality'

const AI_TRACK_IDS = new Set(Object.keys(AI_RESOURCE_EXTENSIONS))

function getMappedResources(trackId: string, stageId: number) {
  const mapped = AI_COMPETENCY_RESOURCE_MAP.filter(
    (entry) => entry.trackId === trackId && entry.stageId === stageId,
  )

  const ids = mapped.flatMap((entry) => [entry.primaryResourceId, entry.secondaryResourceId]).filter(Boolean) as string[]
  const uniqueIds = [...new Set(ids)]

  return uniqueIds
    .map((resourceId) => {
      const resource = (AI_RESOURCE_EXTENSIONS[trackId] ?? []).find((item) => item.id === resourceId)
      if (!resource) return null
      const audit = getVerifiedAIResource(resource.id)
      if (!audit || !audit.free || !audit.includeInGuidedPath) return null
      return { resource, audit }
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
}

export function buildAIWorldClassPath(trackId: string): GuidedStep[] {
  const base = buildGuidedPath(trackId)
  if (!AI_TRACK_IDS.has(trackId)) return base

  const checkpoints = AI_STAGE_CHECKPOINTS[trackId] ?? {}
  const injectedStages = new Set<number>()
  const output: GuidedStep[] = []
  const finalStage = base.reduce((max, step) => Math.max(max, step.stageId), 0)

  for (const step of base) {
    if (step.type === 'project') continue

    const stageId = step.stageId

    if (step.type === 'concept') {
      const objective = getAIStageObjective(trackId, stageId)
      if (objective) {
        const lesson = getAIStageLesson(trackId, stageId, step.title, objective.objective, objective.successCriteria)
        output.push({
          ...step,
          description: [
            step.description,
            `\n\nLEARNING OBJECTIVE\n${objective.objective}`,
            `\n\nTECHSKILLHUB LESSON\n${lesson.lesson}`,
            `\n\nWORKED EXAMPLE\n${lesson.workedExample}`,
            `\n\nCOMMON MISTAKES\n• ${lesson.commonMistakes.join('\n• ')}`,
            `\n\nAPPLIED CHALLENGE\n${lesson.appliedChallenge}`,
          ].join('\n'),
          topics: [...(step.topics ?? []), ...objective.successCriteria.map((criterion) => `Success: ${criterion}`)],
        })
        continue
      }
    }

    const shouldInject = !injectedStages.has(stageId) && step.type === 'checkpoint'

    if (shouldInject) {
      injectedStages.add(stageId)

      for (const { resource, audit } of getMappedResources(trackId, stageId)) {
        const entry = AI_COMPETENCY_RESOURCE_MAP.find(
          (item) => item.trackId === trackId && item.stageId === stageId &&
            (item.primaryResourceId === resource.id || item.secondaryResourceId === resource.id),
        )
        const fitNote = entry?.resourceFit === 'supporting'
          ? 'Use this alongside the TechSkillHub lesson; the resource reinforces the competency rather than replacing instruction.'
          : 'Use this resource to deepen and practice the competency taught in the TechSkillHub lesson.'

        output.push({
          index: 0,
          type: 'resource',
          title: resource.title,
          description: `${resource.description} ${fitNote}`,
          estimatedTime: resource.type === 'video' ? '30–120 min' : '30–90 min',
          resourceUrl: audit.verifiedUrl,
          resourceId: resource.id,
          stageId,
          resourceType: resource.type,
          resourceSource: audit.provider,
          resourceFree: true,
        })
      }

      const practiceTasks = [
        ...getAIPracticeTasks(trackId, stageId),
        ...getAdvancedAIPracticeTasks(trackId, stageId),
      ]

      for (const task of practiceTasks) {
        output.push({
          index: 0,
          type: 'resource',
          title: task.title,
          description: `${task.description} ${task.instructions.join(' ')} Success criteria: ${task.successCriteria.join('; ')}`,
          estimatedTime: '15–30 min',
          resourceId: task.id,
          stageId,
          resourceType: 'practice',
          resourceSource: 'TechSkillHub Guided Practice',
          resourceFree: true,
        })
      }

      const objective = getAIStageObjective(trackId, stageId)
      const authoredQuestions = objective ? getAISupplementalQuestions(trackId, stageId, objective) : []
      const stageQuestions = [...(checkpoints[stageId] ?? []), ...authoredQuestions]

      if (stageQuestions.length) {
        output.push({
          index: 0,
          type: 'quiz',
          title: `Applied Mastery Check — Stage ${stageId}`,
          description: 'This checkpoint tests application, diagnosis, and evaluation. AI pathways require at least 80% to continue. The server re-checks your submitted answers.',
          estimatedTime: '10–20 min',
          stageId,
          quizQuestions: stageQuestions,
        })
      }

      const stageProjects = getAIProjectsForStage(trackId, stageId).filter((project) => isAIProjectPortfolioReady(project.id))
      for (const project of stageProjects) {
        output.push({
          index: 0,
          type: 'project',
          title: `Build: ${project.title}`,
          description: project.description,
          estimatedTime: stageId === finalStage ? '2–5 days' : '1–3 days',
          projectId: project.id,
          stageId,
          techTags: project.techTags,
        })
      }
    }

    output.push(step)
  }

  return output.map((step, index) => ({ ...step, index }))
}

export { AI_PROJECT_EXTENSIONS }
