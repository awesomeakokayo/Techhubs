export interface AIPracticeTask {
  id: string
  trackId: string
  stageId: number
  title: string
  description: string
  instructions: string[]
  successCriteria: string[]
}

/**
 * Practice tasks deliberately sit between resource consumption and the stage
 * mastery check. They are completion-based, not a second grading system.
 * The existing guided-path resource step is reused for persistence and UX.
 */
export const AI_PRACTICE_TASKS: AIPracticeTask[] = [
  {
    id: 'ai-foundations-p1', trackId: 'ai-foundations', stageId: 1,
    title: 'Practice: classify the task before choosing the tool',
    description: 'Take five realistic tasks and decide whether the first move should be AI, search, code/data tooling, automation, or human judgment.',
    instructions: ['Choose five tasks from your own work or study.', 'For each task, name the tool category you would start with.', 'Write one sentence explaining why a different tool would be weaker.'],
    successCriteria: ['You distinguish current-information tasks from generative tasks.', 'You identify when computation or human judgment is more appropriate than a chatbot.', 'Your reasoning is tied to the task requirements.'],
  },
  {
    id: 'ai-foundations-p2', trackId: 'ai-foundations', stageId: 2,
    title: 'Practice: compare two AI tools for the same job',
    description: 'Run the same clearly defined task through two different AI systems and compare the outputs instead of assuming one is universally better.',
    instructions: ['Choose a task that both tools can perform.', 'Use the same useful context and output requirements.', 'Compare accuracy, usefulness, limitations, and verification needs.'],
    successCriteria: ['The task and evaluation criteria are explicit.', 'You identify a meaningful difference between the tools.', 'You make a task-specific recommendation.'],
  },
  {
    id: 'ai-foundations-p3', trackId: 'ai-foundations', stageId: 3,
    title: 'Practice: turn a vague request into a professional instruction',
    description: 'Take one vague AI request and transform it into a clear instruction containing context, task, constraints, audience, and output format.',
    instructions: ['Write the original vague request.', 'Rewrite it with relevant context and constraints.', 'Run both versions and compare the outputs.'],
    successCriteria: ['The improved instruction reduces ambiguity.', 'The output format is explicit.', 'You can explain which added context changed the result.'],
  },
  {
    id: 'ai-foundations-p4', trackId: 'ai-foundations', stageId: 4,
    title: 'Practice: use AI as a reasoning partner',
    description: 'Use AI to surface assumptions and alternatives for a real decision while keeping the final decision under your control.',
    instructions: ['Define the decision and constraints.', 'Ask AI to identify assumptions, alternatives, trade-offs, and missing information.', 'Write your own final decision and explain where AI helped or failed.'],
    successCriteria: ['You separate AI suggestions from your final judgment.', 'You identify at least one assumption that required checking.', 'You make a decision using explicit trade-offs.'],
  },
  {
    id: 'ai-foundations-p5', trackId: 'ai-foundations', stageId: 5,
    title: 'Practice: verify a fluent but uncertain answer',
    description: 'Take an AI answer containing several factual claims and create a verification plan before treating the claims as evidence.',
    instructions: ['Highlight the claims that could materially affect the conclusion.', 'Find an authoritative source for each important claim.', 'Mark each claim as supported, contradicted, or unresolved.'],
    successCriteria: ['You do not use AI fluency as proof.', 'Important claims have evidence or an explicit uncertainty label.', 'You can explain why each source is appropriate.'],
  },
  {
    id: 'ai-foundations-p6', trackId: 'ai-foundations', stageId: 6,
    title: 'Practice: design a repeatable AI workflow',
    description: 'Choose one task you perform repeatedly and turn it into a repeatable AI-assisted workflow with a review gate.',
    instructions: ['Define the recurring task and desired output.', 'Break the work into steps and mark where AI helps.', 'Add a human review point and a final quality checklist.'],
    successCriteria: ['The workflow is repeatable.', 'AI is used only where it adds value.', 'A verification/review step is explicit.'],
  },
  {
    id: 'ai-work-p1', trackId: 'ai-work', stageId: 1,
    title: 'Practice: improve a real work message',
    description: 'Take a real non-sensitive email or professional message and improve clarity, structure, audience fit, and tone with AI.',
    instructions: ['Remove confidential or personal information.', 'Define the recipient, purpose, and desired action.', 'Compare your original and revised versions.'],
    successCriteria: ['The revised message has a clear purpose.', 'The requested action is unambiguous.', 'The tone matches the intended audience.'],
  },
  {
    id: 'ai-work-p2', trackId: 'ai-work', stageId: 2,
    title: 'Practice: turn a long document into an action brief',
    description: 'Use AI to transform a long non-sensitive document into an action brief while preserving important caveats.',
    instructions: ['Define the target audience.', 'Request a structured brief with decisions, actions, risks, and open questions.', 'Check the brief against the source and correct omissions.'],
    successCriteria: ['Important caveats are preserved.', 'Actions are distinguishable from facts.', 'The final brief is shorter without becoming misleading.'],
  },
  {
    id: 'ai-work-p3', trackId: 'ai-work', stageId: 3,
    title: 'Practice: build a learning workflow',
    description: 'Use AI as a tutor to learn one unfamiliar concept, then test yourself without looking at the generated explanation.',
    instructions: ['Ask for a beginner explanation and a worked example.', 'Ask the AI to generate three increasingly difficult practice questions.', 'Answer them yourself and review the explanations afterward.'],
    successCriteria: ['You solve at least one problem before seeing the answer.', 'You identify where your understanding is weak.', 'You can explain the concept without copying the AI output.'],
  },
  {
    id: 'ai-work-p4', trackId: 'ai-work', stageId: 4,
    title: 'Practice: design an AI-assisted weekly workflow',
    description: 'Create a weekly workflow that uses AI for planning, drafting, review, and prioritization without delegating final decisions.',
    instructions: ['List recurring weekly tasks.', 'Assign AI only to tasks where it helps.', 'Define review checkpoints and a final priority decision owned by you.'],
    successCriteria: ['The workflow has clear inputs and outputs.', 'Human decisions remain explicit.', 'You can repeat the workflow next week with minimal redesign.'],
  },
  {
    id: 'ai-research-p1', trackId: 'ai-research', stageId: 1,
    title: 'Practice: choose AI or search',
    description: 'Take eight research questions and decide whether each requires ordinary search, AI-assisted search, primary-source research, or a combination.',
    instructions: ['Classify each question by freshness and evidence requirements.', 'Choose the first research action.', 'Explain what evidence would change your conclusion.'],
    successCriteria: ['Freshness is considered.', 'Evidence requirements drive the tool choice.', 'You distinguish discovery from verification.'],
  },
  {
    id: 'ai-research-p2', trackId: 'ai-research', stageId: 2,
    title: 'Practice: build a research brief',
    description: 'Start with a real research question and create an AI-assisted search plan before writing the answer.',
    instructions: ['Write the question and five sub-questions.', 'Use AI to propose search terms and gaps.', 'Search independently and record the strongest evidence.'],
    successCriteria: ['The research is organized around a question.', 'AI helps with discovery rather than replacing evidence.', 'The final sources are traceable.'],
  },
  {
    id: 'ai-research-p3', trackId: 'ai-research', stageId: 3,
    title: 'Practice: evaluate source quality',
    description: 'Compare three sources supporting the same claim and rank them by authority, relevance, currency, and proximity to primary evidence.',
    instructions: ['Choose one claim.', 'Find three sources.', 'Rank them and explain the ranking.'],
    successCriteria: ['You can distinguish primary from secondary evidence.', 'You consider currency and authority.', 'Your ranking is justified.'],
  },
  {
    id: 'ai-research-p4', trackId: 'ai-research', stageId: 4,
    title: 'Practice: audit an AI-generated report',
    description: 'Audit an AI-generated report for unsupported claims, missing evidence, and misleading certainty.',
    instructions: ['Mark every factual claim.', 'Verify the important claims.', 'Rewrite the report with evidence and uncertainty where necessary.'],
    successCriteria: ['Important claims are verified.', 'Unsupported claims are corrected or removed.', 'Uncertainty is represented honestly.'],
  },
  {
    id: 'ai-research-p5', trackId: 'ai-research', stageId: 5,
    title: 'Practice: build a repeatable research workflow',
    description: 'Document a reusable process from research question to source collection, verification, synthesis, and final brief.',
    instructions: ['Define each workflow step.', 'Specify which tool is used at each step.', 'Add an explicit verification gate before synthesis.'],
    successCriteria: ['Another learner could follow the process.', 'Each step has a clear input and output.', 'Verification happens before conclusions are finalized.'],
  },
]

export function getAIPracticeTasks(trackId: string, stageId: number) {
  return AI_PRACTICE_TASKS.filter((task) => task.trackId === trackId && task.stageId === stageId)
}
