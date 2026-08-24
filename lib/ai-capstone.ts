export interface AICapstone {
  id: string
  title: string
  purpose: string
  problem: string
  prerequisites: string[]
  deliverables: string[]
  constraints: string[]
  acceptanceCriteria: string[]
  evidence: string[]
  evaluationQuestions: string[]
  stretchGoal: string
}

/**
 * Cross-path capstone. It is intentionally framework-neutral and does not
 * require paid APIs. Learners may implement it with free/local tools or with
 * services they already have access to.
 */
export const AI_SYSTEMS_CAPSTONE: AICapstone = {
  id: 'ai-capstone-systems',
  title: 'AI Systems Capstone — Research, Automate, Build, Evaluate',
  purpose: 'Demonstrate that you can move from an ambiguous real-world problem to a bounded AI-assisted system, while preserving evidence, human judgment, reliability, and measurable quality.',
  problem: 'A small organization wants an AI-assisted research and operations system. It should gather information about a defined topic, separate evidence from generated text, turn verified findings into a structured internal brief, route follow-up actions through a controlled workflow, and expose a simple interface for a user to review the result. You must decide what should be deterministic, what should use AI, where human approval belongs, and how the final system will be evaluated.',
  prerequisites: [
    'Complete at least one AI guided path and its stage projects.',
    'Be able to frame an AI task, verify claims, design a workflow, and interpret basic evaluation results.',
    'Use the existing TechSkillHub learning resources and your chosen free/local tools as references rather than copying a tutorial.',
  ],
  deliverables: [
    'A one-page problem statement with assumptions, users, constraints, and success metrics.',
    'A research plan and evidence map showing how important claims will be verified.',
    'A system architecture or workflow diagram showing deterministic steps, AI steps, tools, data boundaries, and human approval points.',
    'A working prototype or demonstrator of the research/workflow/application path.',
    'An evaluation set containing normal, ambiguous, edge, and failure cases with expected outcomes.',
    'An evaluation report comparing at least one baseline against one improvement.',
    'A short portfolio case study explaining decisions, tradeoffs, failures, revisions, and final results.',
  ],
  constraints: [
    'Do not treat generated text as evidence without verification.',
    'Do not give the system irreversible actions without an explicit human-control design.',
    'Do not add an agent where a deterministic workflow is sufficient.',
    'Do not claim performance without defining what was measured and how.',
    'Do not require a paid API; a free/local implementation is acceptable.',
  ],
  acceptanceCriteria: [
    'Every important factual claim has a traceable verification path.',
    'The architecture clearly separates deterministic operations from probabilistic AI behavior.',
    'High-impact or ambiguous actions have an explicit human approval boundary.',
    'The system handles at least three defined failure modes safely.',
    'Evaluation cases demonstrate what good and bad behavior look like.',
    'The learner can explain why each model, tool, workflow step, and control exists.',
    'At least one improvement is justified by observed evaluation evidence rather than intuition.',
    'The final artifact is understandable to another practitioner without a private walkthrough.',
  ],
  evidence: [
    'Problem brief',
    'Evidence map',
    'Architecture/workflow diagram',
    'Prototype/demo',
    'Evaluation dataset',
    'Before/after results',
    'Failure analysis',
    'Portfolio case study',
  ],
  evaluationQuestions: [
    'Why is AI used for each probabilistic step instead of a simpler deterministic alternative?',
    'Which parts of the system could produce harmful or misleading output, and what controls reduce that risk?',
    'What evidence supports your claim that the improved version is better?',
    'What would you change if the system had to operate at ten times the current volume?',
  ],
  stretchGoal: 'Turn the prototype into a reusable domain-agnostic template and prove that it works on a second, materially different dataset or research question without rewriting the architecture.',
}
