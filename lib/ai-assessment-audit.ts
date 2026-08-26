import type { QuizCognitiveLevel, QuizQuestion } from './guided-path'
import { getAIStageObjective } from './ai-stage-objectives'

export interface AIAssessmentTrace {
  trackId: string
  stageId: number
  questionIndex: number
  cognitiveLevel: QuizCognitiveLevel
  teachingStageId: number
  teachingSource: string
}

/**
 * Phase 6 assessment contract.
 *
 * Every AI quiz question receives explicit provenance back to the stage whose
 * Learn / See / Practice content taught the competency. The generated order
 * is deliberately application-heavy: Understand -> Apply -> Apply -> Analyze -> Evaluate.
 */
export const AI_ASSESSMENT_COGNITIVE_ORDER: QuizCognitiveLevel[] = [
  'understand',
  'apply',
  'apply',
  'analyze',
  'evaluate',
]

export function annotateAIQuestions(
  trackId: string,
  stageId: number,
  questions: QuizQuestion[],
): QuizQuestion[] {
  const objective = getAIStageObjective(trackId, stageId)
  const teachingSource = objective
    ? `AI Stage ${stageId} Learn: ${objective.objective}`
    : `AI Stage ${stageId} Learn: stage competency`

  return questions.slice(0, 5).map((question, index) => ({
    ...question,
    teachingSource,
    teachingStageId: stageId,
    cognitiveLevel: AI_ASSESSMENT_COGNITIVE_ORDER[index] ?? 'apply',
  }))
}

export function getAIQuestionCognitiveBalance(questions: QuizQuestion[]): Record<QuizCognitiveLevel, number> {
  const balance: Record<QuizCognitiveLevel, number> = {
    recall: 0,
    understand: 0,
    apply: 0,
    analyze: 0,
    evaluate: 0,
  }
  for (const question of questions) {
    if (question.cognitiveLevel) balance[question.cognitiveLevel] += 1
  }
  return balance
}

export function validateAIAssessmentTrace(trackId: string, stageId: number, questions: QuizQuestion[]): string[] {
  const errors: string[] = []
  if (questions.length < 3 || questions.length > 5) errors.push(`Stage ${stageId} must have 3–5 questions.`)

  questions.forEach((question, index) => {
    if (question.teachingStageId !== stageId) errors.push(`Stage ${stageId}, question ${index + 1} has no local teaching-stage provenance.`)
    if (!question.teachingSource) errors.push(`Stage ${stageId}, question ${index + 1} is missing teachingSource.`)
    if (!question.cognitiveLevel) errors.push(`Stage ${stageId}, question ${index + 1} is missing cognitiveLevel.`)
  })

  const balance = getAIQuestionCognitiveBalance(questions)
  const applicationAndReasoning = balance.apply + balance.analyze + balance.evaluate
  if (questions.length >= 5 && applicationAndReasoning < 3) {
    errors.push(`Stage ${stageId} must emphasize application/reasoning: found ${applicationAndReasoning}/5.`)
  }
  return errors
}
