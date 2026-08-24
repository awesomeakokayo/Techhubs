import { buildGuidedPath, type GuidedStep } from './guided-path'
import { AI_PROJECT_EXTENSIONS, AI_RESOURCE_EXTENSIONS, AI_RESOURCE_STAGE_MAP, AI_STAGE_CHECKPOINTS } from './ai-curriculum'
import { getAIPracticeTasks } from './ai-practice'
import { getAdvancedAIPracticeTasks } from './ai-practice-advanced'

const AI_TRACK_IDS = new Set(Object.keys(AI_RESOURCE_EXTENSIONS))

export function buildAIWorldClassPath(trackId: string): GuidedStep[] {
  const base = buildGuidedPath(trackId)
  if (!AI_TRACK_IDS.has(trackId)) return base

  const resources = AI_RESOURCE_EXTENSIONS[trackId] ?? []
  const resourceStages = AI_RESOURCE_STAGE_MAP[trackId] ?? {}
  const projects = AI_PROJECT_EXTENSIONS[trackId] ?? []
  const checkpoints = AI_STAGE_CHECKPOINTS[trackId] ?? {}
  const injectedStages = new Set<number>()
  const output: GuidedStep[] = []
  const finalStage = base.reduce((max, step) => Math.max(max, step.stageId), 0)

  for (const step of base) {
    const stageId = step.stageId
    const shouldInject = !injectedStages.has(stageId) && (step.type === 'project' || step.type === 'checkpoint')

    if (shouldInject) {
      injectedStages.add(stageId)

      for (const resource of resources.filter((item) => resourceStages[item.id] === stageId)) {
        output.push({ index: 0, type: 'resource', title: resource.title, description: resource.description, estimatedTime: resource.type === 'video' ? '30–120 min' : '30–90 min', resourceUrl: resource.url, resourceId: resource.id, stageId, resourceType: resource.type, resourceSource: resource.source, resourceFree: resource.free })
      }

      const practiceTasks = [...getAIPracticeTasks(trackId, stageId), ...getAdvancedAIPracticeTasks(trackId, stageId)]
      for (const task of practiceTasks) {
        output.push({ index: 0, type: 'resource', title: task.title, description: `${task.description} ${task.instructions.join(' ')}`, estimatedTime: '15–30 min', resourceId: task.id, stageId, resourceType: 'practice', resourceSource: 'TechSkillHub Guided Practice', resourceFree: true })
      }

      if (stageId === finalStage) {
        const project = projects[0]
        if (project) output.push({ index: 0, type: 'project', title: `Build: ${project.title}`, description: project.description, estimatedTime: '1–3 days', projectId: project.id, stageId, techTags: project.techTags })
      }

      const stageQuestions = checkpoints[stageId]
      if (stageQuestions?.length) output.push({ index: 0, type: 'quiz', title: `Applied Mastery Check — Stage ${stageId}`, description: 'These questions test whether you can apply the stage concepts to realistic work. You must understand the reasoning, not just recognize definitions.', estimatedTime: '10–15 min', stageId, quizQuestions: stageQuestions })
    }

    output.push(step)
  }

  return output.map((step, index) => ({ ...step, index }))
}
