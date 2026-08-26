import { buildGuidedPath, type GuidedStep, type QuizQuestion } from './guided-path'
import { AI_PROJECT_EXTENSIONS, AI_RESOURCE_EXTENSIONS, AI_STAGE_CHECKPOINTS } from './ai-curriculum'
import { getAIPracticeTasks } from './ai-practice'
import { getAdvancedAIPracticeTasks } from './ai-practice-advanced'
import { getAIProjectsForStage } from './ai-projects'
import { getAIStageObjective } from './ai-stage-objectives'
import { getAIStageLesson } from './ai-stage-lessons'
import { getAISupplementalQuestions } from './ai-assessment-bank'
import { annotateAIQuestions } from './ai-assessment-audit'
import { getAIResourceAuditsForStage } from './ai-resource-registry'
import { AI_PROJECT_BRIEFS } from './ai-project-briefs'
import { getAIProjectAudit } from './ai-project-audit'
import { isAIProjectPortfolioReady } from './ai-project-quality'

export type AILearningPhase = 'learn' | 'see' | 'practice' | 'verify' | 'build'
type AIWorldClassStep = GuidedStep & { learningPhase: AILearningPhase }

const AI_TRACK_IDS = new Set(Object.keys(AI_RESOURCE_EXTENSIONS))

function buildFallbackVerifyQuestions(stageTitle: string, objective: string, successCriteria: string[]): QuizQuestion[] {
  return [
    { question: `A learner has completed ${stageTitle}, but their result does not meet one of the stated success criteria. What should happen next?`, options: ['Ship it because the AI produced it.', 'Change the success criteria so the result passes.', 'Inspect the failure, make a targeted correction, and verify the result again.', 'Ignore the criteria for advanced stages.'], correctIndex: 2, explanation: 'Professional mastery requires checking the work against the intended outcome and iterating when it falls short.' },
    { question: `Which behavior best demonstrates mastery of this stage: ${objective}`, options: ['Producing more AI output without checking it.', 'Following the tool’s default behavior exactly.', 'Applying the competency deliberately and explaining the tradeoffs behind the result.', 'Choosing the most expensive tool available.'], correctIndex: 2, explanation: 'The competency is the learner’s judgment and ability to apply the method, not the tool’s output volume.' },
    { question: 'Which evidence would be most useful for proving the stage was actually learned?', options: ['A screenshot of an AI response.', `An artifact showing the learner applied ${successCriteria[0] ?? 'the competency'} and checked the result.`, 'A list of AI tools they know by name.', 'A longer prompt with more instructions.'], correctIndex: 1, explanation: 'Applied evidence is stronger than a screenshot, tool list, or prompt length because it demonstrates competency in practice.' },
  ]
}

function buildProjectDescription(stageTitle: string, objective: string, successCriteria: string[], existingDescription?: string, brief?: (typeof AI_PROJECT_BRIEFS)[string], audit?: ReturnType<typeof getAIProjectAudit>) {
  const parts = [
    existingDescription ?? `Create a small, working artifact that demonstrates ${stageTitle}.`,
    `\n\nBUILD OBJECTIVE\n${objective}`,
    `\n\nPREREQUISITE TRACE\n${audit?.traces.map((trace) => `• Stage ${trace.sourceStageId}: ${trace.skill}\n  Learn → See → Practice → Verify`).join('\n') ?? '• Use the Learn → See → Practice → Verify work completed in this stage.'}`,
    `\n\nDELIVERABLES\n${brief?.deliverables.map((item) => `• ${item}`).join('\n') ?? '• Build a usable artifact for the stage competency.\n• Include a before/after or decision record where iteration matters.\n• Document the inputs, decisions, outputs, and verification performed.'}`,
    `\n\nACCEPTANCE CRITERIA\n${brief?.acceptanceCriteria.map((item) => `• ${item}`).join('\n') ?? successCriteria.map((criterion) => `• ${criterion}`).join('\n')}`,
    `\n\nEVIDENCE\n${brief?.evidence.map((item) => `• ${item}`).join('\n') ?? '• Working artifact\n• Brief implementation notes\n• Verification evidence'}`,
  ]
  if (brief?.stretchGoal) parts.push(`\n\nSTRETCH GOAL\n${brief.stretchGoal}`)
  return parts.join('')
}

export function buildAIWorldClassPath(trackId: string): GuidedStep[] {
  const base = buildGuidedPath(trackId)
  if (!AI_TRACK_IDS.has(trackId)) return base
  const output: AIWorldClassStep[] = []
  let index = 0

  for (const stage of base.filter((step) => step.type === 'concept')) {
    const stageId = stage.stageId
    const objective = getAIStageObjective(trackId, stageId)
    const lesson = objective ? getAIStageLesson(trackId, stageId, stage.title, objective.objective, objective.successCriteria) : null

    const objectiveText = objective?.objective ?? stage.description
    const successCriteria = objective?.successCriteria ?? []
    output.push({
      ...stage,
      index: index++,
      learningPhase: 'learn',
      title: `Learn: ${stage.title}`,
      description: lesson
        ? [
            stage.description,
            `\n\nLEARNING OBJECTIVE\n${objectiveText}`,
            `\n\nTECHSKILLHUB LESSON\n${lesson.lesson}`,
            `\n\nCOMMON MISTAKES\n• ${lesson.commonMistakes.join('\n• ')}`,
          ].join('\n')
        : stage.description,
      topics: lesson ? [...(stage.topics ?? []), ...successCriteria.map((criterion) => `Success: ${criterion}`)] : stage.topics,
    })

    const auditedResources = getAIResourceAuditsForStage(trackId, stageId)
    const seeResource = auditedResources[0]
    output.push({
      index: index++,
      type: 'resource',
      learningPhase: 'see',
      title: `See: ${stage.title} in Practice`,
      description: [
        'WORKED EXAMPLE\n' + (lesson?.workedExample ?? 'Study a realistic example showing the competency in use.'),
        seeResource ? `\n\nOPTIONAL VERIFIED REINFORCEMENT\n${seeResource.provider}: ${seeResource.competency}` : '',
      ].join(''),
      estimatedTime: '10–20 min',
      resourceUrl: seeResource?.url,
      resourceId: seeResource?.id,
      stageId,
      resourceType: seeResource?.type ?? 'example',
      resourceSource: seeResource?.provider ?? 'TechSkillHub Worked Example',
      resourceFree: true,
    })

    const practiceTasks = [...getAIPracticeTasks(trackId, stageId), ...getAdvancedAIPracticeTasks(trackId, stageId)]
    const primaryPractice = practiceTasks[0]
    output.push({
      index: index++,
      type: 'resource',
      learningPhase: 'practice',
      title: primaryPractice ? `Practice: ${primaryPractice.title}` : `Practice: Apply ${stage.title}`,
      description: primaryPractice
        ? `${primaryPractice.description}\n\nINSTRUCTIONS\n${primaryPractice.instructions.map((item) => `• ${item}`).join('\n')}\n\nSUCCESS CRITERIA\n${primaryPractice.successCriteria.map((item) => `• ${item}`).join('\n')}`
        : lesson?.appliedChallenge ?? `Apply ${stage.title} to a realistic problem. Record your approach, result, one failure mode, and how you checked the result.`,
      estimatedTime: '15–30 min',
      resourceId: primaryPractice?.id ?? `ai-phase4-${trackId}-${stageId}-practice`,
      stageId,
      resourceType: 'practice',
      resourceSource: 'TechSkillHub Guided Practice',
      resourceFree: true,
    })

    const authoredQuestions = objective ? getAISupplementalQuestions(trackId, stageId, objective) : []
    const questions = [...(AI_STAGE_CHECKPOINTS[trackId]?.[stageId] ?? []), ...authoredQuestions]
    const rawVerifyQuestions: QuizQuestion[] = questions.length >= 3
      ? questions.slice(0, 5)
      : [...questions, ...buildFallbackVerifyQuestions(stage.title, objectiveText, successCriteria)].slice(0, 5)
    const verifyQuestions = annotateAIQuestions(trackId, stageId, rawVerifyQuestions)
    output.push({
      index: index++,
      type: 'quiz',
      learningPhase: 'verify',
      title: `Verify: Stage ${stageId} Mastery`,
      description: 'Test application and professional judgment in realistic situations. AI stages require at least 80% to continue.',
      estimatedTime: '10–20 min',
      stageId,
      quizQuestions: verifyQuestions,
    })

    const mappedProject = getAIProjectsForStage(trackId, stageId).find((project) => isAIProjectPortfolioReady(project.id))
    const brief = mappedProject?.id ? AI_PROJECT_BRIEFS[mappedProject.id] : undefined
    const audit = mappedProject?.id ? getAIProjectAudit(mappedProject.id) : null
    output.push({
      index: index++,
      type: 'project',
      learningPhase: 'build',
      title: mappedProject ? `Build: ${mappedProject.title}` : `Build: ${stage.title} Mini-Project`,
      description: buildProjectDescription(stage.title, objectiveText, successCriteria, mappedProject?.description, brief, audit),
      estimatedTime: stageId >= 8 ? '2–5 days' : '1–2 days',
      projectId: mappedProject?.id,
      stageId,
      techTags: mappedProject?.techTags,
      resourceType: 'build',
      resourceSource: brief ? 'TechSkillHub Portfolio Project Brief' : 'TechSkillHub Stage Build',
      resourceFree: true,
    })
  }

  return output
}

export { AI_PROJECT_EXTENSIONS }
