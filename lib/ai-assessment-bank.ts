import type { QuizQuestion } from './guided-path'
import type { AIStageObjective } from './ai-stage-objectives'

const ROTATION = [1, 2, 0, 3]

const DOMAIN: Record<string, string> = {
  'ai-foundations': 'AI work',
  'ai-work': 'professional work',
  'ai-research': 'research',
  'ai-content': 'content production',
  'ai-youtube': 'YouTube production',
  'ai-software-development': 'software development',
  'ai-automation': 'automation',
  'ai-agents': 'agent systems',
  'ai-engineering': 'AI application engineering',
  'ai-design': 'AI-assisted design',
}

function placeCorrectOption(correct: string, distractors: string[], correctIndex: number) {
  const options = [...distractors]
  options.splice(correctIndex, 0, correct)
  return options
}

export function getAISupplementalQuestions(trackId: string, stageId: number, objective: AIStageObjective): QuizQuestion[] {
  const domain = DOMAIN[trackId] ?? 'AI work'
  const criterionA = objective.successCriteria[0] ?? 'apply the core concept'
  const criterionB = objective.successCriteria[1] ?? 'evaluate the result'
  const indices = [
    ROTATION[(stageId - 1) % ROTATION.length],
    ROTATION[stageId % ROTATION.length],
    ROTATION[(stageId + 1) % ROTATION.length],
  ]

  const firstCorrect = `Define the task, success criteria, and constraints for the ${domain} problem before choosing how AI should help.`
  const first = placeCorrectOption(firstCorrect, [
    'Use the first AI output if it sounds confident',
    'Add more adjectives to the prompt until the answer feels professional',
    'Let the AI decide the success criteria after producing the output',
  ], indices[0])

  const secondCorrect = `Look for evidence that the learner can ${criterionA.toLowerCase()}, and can ${criterionB.toLowerCase()} rather than merely repeat a definition.`
  const second = placeCorrectOption(secondCorrect, [
    'Whether the output is polished enough to avoid review',
    'Whether the prompt was longer than the previous one',
    'Whether the model generated the answer quickly',
  ], indices[1])

  const thirdCorrect = 'Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.'
  const third = placeCorrectOption(thirdCorrect, [
    'Accept it because the output looks good',
    'Give them the answer and mark the stage complete',
    'Move them to the next stage because AI is probabilistic anyway',
  ], indices[2])

  return [
    {
      question: `You are given a new ${domain} task related to this stage. Which approach best demonstrates professional use of the stage competency?`,
      options: first,
      correctIndex: indices[0],
      explanation: 'Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed.',
    },
    {
      question: 'Which evidence would give you the strongest confidence that someone actually understands this stage?',
      options: second,
      correctIndex: indices[1],
      explanation: 'Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology.',
    },
    {
      question: 'A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?',
      options: third,
      correctIndex: indices[2],
      explanation: 'A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output.',
    },
  ]
}
