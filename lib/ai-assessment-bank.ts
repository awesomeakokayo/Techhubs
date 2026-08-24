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

export function getAISupplementalQuestions(trackId: string, stageId: number, objective: AIStageObjective): QuizQuestion[] {
  const domain = DOMAIN[trackId] ?? 'AI work'
  const answerIndex = ROTATION[(stageId - 1) % ROTATION.length]
  const criterionA = objective.successCriteria[0] ?? 'apply the core concept'
  const criterionB = objective.successCriteria[1] ?? 'evaluate the result'

  const q1Options = [
    `Use the first AI output if it sounds confident`,
    `Define the task, success criteria, and relevant constraints before choosing how AI should help`,
    `Add more adjectives to the prompt until the answer feels professional`,
    `Let the AI decide the success criteria after producing the output`,
  ]
  const q2Options = [
    `Whether the output is polished enough to avoid review`,
    `Whether the learner can explain the decision, reproduce the reasoning, and show evidence that the result meets the requirement`,
    `Whether the prompt was longer than the previous one`,
    `Whether the model generated the answer quickly`,
  ]

  q1Options[1] = `Define the task, success criteria, and constraints for the ${domain} problem before choosing how AI should help.`
  q2Options[1] = `Look for evidence that the learner can ${criterionA.toLowerCase()}, and can ${criterionB.toLowerCase()} rather than merely repeat a definition.`

  return [
    {
      question: `You are given a new ${domain} task related to this stage. Which approach best demonstrates professional use of the stage competency?`,
      options: q1Options,
      correctIndex: answerIndex === 1 ? 1 : 1,
      explanation: 'Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed.',
    },
    {
      question: `Which evidence would give you the strongest confidence that someone actually understands this stage?`,
      options: q2Options,
      correctIndex: 1,
      explanation: 'Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology.',
    },
    {
      question: `A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?`,
      options: [
        'Accept it because the output looks good',
        'Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work',
        'Give them the answer and mark the stage complete',
        'Move them to the next stage because AI is probabilistic anyway',
      ],
      correctIndex: 1,
      explanation: 'A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output.',
    },
  ]
}
