import { buildGuidedPath, type GuidedStep, type QuizQuestion } from './guided-path'
import { AI_PROJECT_EXTENSIONS, AI_RESOURCE_EXTENSIONS, AI_STAGE_CHECKPOINTS } from './ai-curriculum'
import { getAIPracticeTasks } from './ai-practice'
import { getAdvancedAIPracticeTasks } from './ai-practice-advanced'
import { getAIProjectsForStage } from './ai-projects'
import { getAIStageObjective } from './ai-stage-objectives'
import { getAIStageLesson } from './ai-stage-lessons'
import { getAISupplementalQuestions } from './ai-assessment-bank'
import { isAIProjectPortfolioReady } from './ai-project-quality'

const AI_TRACK_IDS = new Set(Object.keys(AI_RESOURCE_EXTENSIONS))

/**
 * Phase 4 contract for every AI stage:
 * LEARN -> SEE -> PRACTICE -> VERIFY -> BUILD.
 *
 * Each AI stage produces exactly five learner-facing steps. External resources
 * are reinforcement only; they never replace the TechSkillHub lesson.
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

    output.push({
      ...stage,
      index: index++,
      learningPhase: 'learn',
      title: `Learn: ${stage.title}`,
      description: lesson
        ? [stage.description, `\n\nLEARNING OBJECTIVE\n${objective!.objective}`, `\n\nTECHSKILLHUB LESSON\n${lesson.lesson}`, `\n\nCOMMON MISTAKES\n• ${lesson.commonMistakes.join('\n• ')}`].join('\n')
        : stage.description,
      topics: lesson ? [...(stage.topics ?? []), ...objective!.successCriteria.map((criterion) => `Success: ${criterion}`)] : stage.topics,
    })

    output.push({
      index: index++,
      type: 'resource',
      learningPhase: 'see',
      title: `See: ${stage.title} in Practice`,
      description: lesson?.workedExample ?? 'Study a realistic example showing the competency in use. Pay attention to the decisions, constraints, failure modes, and quality checks.',
      estimatedTime: '10–15 min',
      stageId,
      resourceType: 'example',
      resourceSource: 'TechSkillHub Worked Example',
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
        ? `${primaryPractice.description}\n\nINSTRUCTIONS\n${primaryPractice.instructions.join('\n')}`
        : lesson?.appliedChallenge ?? `Apply ${stage.title} to a realistic problem. Record your approach, result, one failure mode, and how you checked the result.`,
      estimatedTime: '15–30 min',
      resourceId: primaryPractice?.id,
      stageId,
      resourceType: 'practice',
      resourceSource: 'TechSkillHub Guided Practice',
      resourceFree: true,
    })

    const authoredQuestions = objective ? getAISupplementalQuestions(trackId, stageId, objective) : []
    const questions = [...(AI_STAGE_CHECKPOINTS[trackId]?.[stageId] ?? []), ...authoredQuestions]
    const verifyQuestions: QuizQuestion[] = questions.length ? questions : [{
      question: `You have completed the ${stage.title} practice. Which action best demonstrates professional mastery?`,
      options: [
        'Accept the first AI result because it is fluent.',
        'Repeat the same prompt until the result looks better.',
        'Apply the competency, inspect the result against explicit success criteria, and correct weaknesses before shipping.',
        'Skip verification if the output is produced by a popular tool.',
      ],
      correctIndex: 2,
      explanation: 'Mastery means applying the competency and exercising judgment over the result, not merely producing an AI output.',
    }]
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
    if (mappedProject) {
      output.push({
        index: index++,
        type: 'project',
        learningPhase: 'build',
        title: `Build: ${mappedProject.title}`,
        description: mappedProject.description,
        estimatedTime: stageId >= 8 ? '2–5 days' : '1–2 days',
        projectId: mappedProject.id,
        stageId,
        techTags: mappedProject.techTags,
      })
    } else {
      output.push({
        index: index++,
        type: 'project',
        learningPhase: 'build',
        title: `Build: ${stage.title} Mini-Project`,
        description: lesson
          ? `Create a small, working artifact that demonstrates the competency from this stage. Start from your Practice result, use the Verify feedback to improve it, and document your inputs, decisions, output, and quality checks.\n\nBUILD SUCCESS CRITERIA\n${objective?.successCriteria.map((criterion) => `• ${criterion}`).join('\n') ?? '• The artifact works for the intended use case.\n• You can explain the decisions you made.\n• You verify the result before calling it complete.'}`
          : `Create a small working artifact that demonstrates ${stage.title}. Document your decisions and verify the result before considering the build complete.`,
        estimatedTime: '1–2 days',
        stageId,
        resourceType: 'build',
        resourceSource: 'TechSkillHub Stage Build',
        resourceFree: true,
      })
    }
  }

  return output
}

export { AI_PROJECT_EXTENSIONS }
