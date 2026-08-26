import { buildGuidedPath, type GuidedStep } from './guided-path'
import { AI_PROJECT_EXTENSIONS, AI_RESOURCE_EXTENSIONS, AI_RESOURCE_STAGE_MAP, AI_STAGE_CHECKPOINTS } from './ai-curriculum'
import { getAIPracticeTasks } from './ai-practice'
import { getAdvancedAIPracticeTasks } from './ai-practice-advanced'
import { getAIProjectsForStage } from './ai-projects'
import { getAIStageObjective } from './ai-stage-objectives'
import { getAIStageLesson } from './ai-stage-lessons'
import { getAISupplementalQuestions } from './ai-assessment-bank'
import { getVerifiedAIResource } from './ai-resource-audit'
import { getAIInstructionalGapResources } from './ai-instructional-gap-resources'
import { isAIProjectPortfolioReady } from './ai-project-quality'

const AI_TRACK_IDS = new Set(Object.keys(AI_RESOURCE_EXTENSIONS))

/**
 * Phase 4 contract for every AI stage:
 *
 *   LEARN    -> TechSkillHub-authored explanation
 *   SEE      -> one worked example of the competency in context
 *   PRACTICE -> one learner-performed task
 *   VERIFY   -> application/judgment multiple-choice assessment
 *   BUILD    -> a concrete project or stage-sized build
 *
 * The function deliberately produces exactly five learning steps per AI
 * stage. External resources are reinforcement, not substitutes for Learn.
 */
export function buildAIWorldClassPath(trackId: string): GuidedStep[] {
  const base = buildGuidedPath(trackId)
  if (!AI_TRACK_IDS.has(trackId)) return base

  const output: GuidedStep[] = []
  let index = 0

  for (const stage of base.filter((step) => step.type === 'concept')) {
    const stageId = stage.stageId
    const objective = getAIStageObjective(trackId, stageId)
    const lesson = objective
      ? getAIStageLesson(trackId, stageId, stage.title, objective.objective, objective.successCriteria)
      : null

    // 1. LEARN — the concept is taught by TechSkillHub itself.
    output.push({
      ...stage,
      index: index++,
      learningPhase: 'learn',
      title: `Learn: ${stage.title}`,
      description: lesson
        ? [
            stage.description,
            `\n\nLEARNING OBJECTIVE\n${objective!.objective}`,
            `\n\nTECHSKILLHUB LESSON\n${lesson.lesson}`,
            `\n\nCOMMON MISTAKES\n• ${lesson.commonMistakes.join('\n• ')}`,
          ].join('\n')
        : stage.description,
      topics: lesson
        ? [...(stage.topics ?? []), ...objective!.successCriteria.map((criterion) => `Success: ${criterion}`)]
        : stage.topics,
    })

    // 2. SEE — a worked example, deliberately separate from Learn.
    output.push({
      index: index++,
      type: 'resource',
      learningPhase: 'see',
      title: `See: ${stage.title} in Practice`,
      description: lesson?.workedExample ?? 'Study a realistic example showing how this competency is applied, including the decision points and quality checks.',
      estimatedTime: '10–15 min',
      stageId,
      resourceType: 'example',
      resourceSource: 'TechSkillHub Worked Example',
      resourceFree: true,
    })

    // 3. PRACTICE — exactly one learner task. If multiple legacy tasks exist,
    // combine their instructions into one coherent exercise rather than making
    // the learner navigate several unrelated steps.
    const practiceTasks = [
      ...getAIPracticeTasks(trackId, stageId),
      ...getAdvancedAIPracticeTasks(trackId, stageId),
    ]
    const primaryPractice = practiceTasks[0]
    output.push({
      index: index++,
      type: 'resource',
      learningPhase: 'practice',
      title: primaryPractice ? `Practice: ${primaryPractice.title}` : `Practice: Apply ${stage.title}`,
      description: primaryPractice
        ? `${primaryPractice.description}\n\nINSTRUCTIONS\n${primaryPractice.instructions.join('\n')}`
        : lesson?.appliedChallenge ?? `Apply ${stage.title} to a realistic problem and document what you did, what failed, and how you checked the result.`,
      estimatedTime: '15–30 min',
      resourceId: primaryPractice?.id,
      stageId,
      resourceType: 'practice',
      resourceSource: 'TechSkillHub Guided Practice',
      resourceFree: true,
    })

    // 4. VERIFY — application and judgment, not trivia. Merge the authored
    // checkpoint bank with supplemental questions and require a meaningful set.
    const authoredQuestions = objective ? getAISupplementalQuestions(trackId, stageId, objective) : []
    const questions = [...(AI_STAGE_CHECKPOINTS[trackId]?.[stageId] ?? []), ...authoredQuestions]
    output.push({
      index: index++,
      type: 'quiz',
      learningPhase: 'verify',
      title: `Verify: Stage ${stageId} Mastery`,
      description: 'Apply the competency to realistic situations. Choose the best professional decision, not merely the definition you remember. AI stages require at least 80% to continue.',
      estimatedTime: '10–20 min',
      stageId,
      quizQuestions: questions,
    })

    // 5. BUILD — every stage gets a concrete artifact. Mature portfolio
    // projects are used when mapped; otherwise create a deliberately small
    // stage build so no competency ends without application.
    const mappedProject = getAIProjectsForStage(trackId, stageId).find((project) => isAIProjectPortfolioReady(project.id))
    output.push(mappedProject
      ? {
          index: index++,
          type: 'project',
          learningPhase: 'build',
          title: `Build: ${mappedProject.title}`,
          description: mappedProject.description,
          estimatedTime: stageId >= 8 ? '2–5 days' : '1–2 days',
          projectId: mappedProject.id,
          stageId,
          techTags: mappedProject.techTags,
        }
      : {
          index: index++,
          type: 'project',
          learningPhase: 'build',
          title: `Build: ${stage.title} Mini-Project`,
          description: lesson
            ? `Create a small, working artifact that demonstrates the competency from this stage. Start from the practice result, improve it using the feedback from Verify, and document your inputs, decisions, output, and quality checks.\n\nBUILD SUCCESS CRITERIA\n${objective?.successCriteria.map((criterion) => `• ${criterion}`).join('\n') ?? '• The artifact works for the intended use case.\n• You can explain the decisions you made.\n• You verify the result before considering it complete.'}`
            : `Create a small working artifact that demonstrates ${stage.title}. Document your decisions and verify the result before considering the build complete.`,
          estimatedTime: '1–2 days',
          stageId,
          resourceType: 'build',
          resourceSource: 'TechSkillHub Stage Build',
          resourceFree: true,
        })
  }

  return output
}

export { AI_PROJECT_EXTENSIONS }
