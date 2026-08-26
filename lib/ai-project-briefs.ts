export interface AIProjectBrief {
  projectId: string
  why: string
  deliverables: string[]
  acceptanceCriteria: string[]
  evidence: string[]
  stretchGoal: string
}

export const AI_PROJECT_BRIEFS: Record<string, AIProjectBrief> = {
  'ai-f-p3': {
    projectId: 'ai-f-p3',
    why: 'Demonstrate that you can turn a recurring task into a deliberate AI workflow instead of relying on ad-hoc chat prompts.',
    deliverables: [
      'Document the original task, inputs, time cost, and quality problems.',
      'Define where AI adds value and where human judgment remains required.',
      'Create the reusable instructions, context template, output format, and review checklist.',
      'Run at least three iterations and record what failed and what changed.',
      'Produce a short before/after comparison of the workflow.',
    ],
    acceptanceCriteria: [
      'The workflow has a clear trigger, input, AI step, review step, and final output.',
      'Success criteria are defined before evaluating the workflow.',
      'At least one failure mode is documented with a mitigation.',
      'The final workflow is specific enough that another person could reproduce it.',
    ],
    evidence: ['Final workflow', 'Before/after example', 'Iteration notes', 'Review checklist'],
    stretchGoal: 'Generalize the workflow into a reusable template for a second related task without copying the entire first workflow.',
  },
  'ai-w-p4': {
    projectId: 'ai-w-p4',
    why: 'Show that you can apply AI responsibly across repeatable professional work while retaining quality control.',
    deliverables: [
      'Choose three recurring tasks from a real or realistic work context.',
      'Create a workflow for each with inputs, instructions, output contract, review gate, and failure cases.',
      'Test each workflow against at least three representative examples.',
      'Document where human approval is mandatory.',
      'Compare time saved and quality before versus after.',
    ],
    acceptanceCriteria: [
      'Each workflow has measurable success criteria.',
      'Sensitive-data and tool-use boundaries are explicit.',
      'The learner can explain why AI is appropriate for each selected task.',
      'Quality controls are part of the workflow, not an afterthought.',
    ],
    evidence: ['Three workflow specs', 'Test examples', 'Quality checklist', 'Before/after results'],
    stretchGoal: 'Combine two workflows into one controlled multi-step process with a clear handoff between them.',
  },
  'ai-r-p2': {
    projectId: 'ai-r-p2',
    why: 'Demonstrate that you can use AI to accelerate research without confusing generated text with evidence.',
    deliverables: [
      'Define one research question and identify which parts require current evidence.',
      'Build an evidence map containing at least five sources.',
      'Classify sources by authority, date, methodology, and relevance.',
      'Verify the central claims and record disagreements or uncertainty.',
      'Produce a concise final research brief with an evidence table.',
    ],
    acceptanceCriteria: [
      'Every major factual claim is traceable to evidence.',
      'Primary or authoritative sources are preferred when available.',
      'Conflicting evidence is explicitly acknowledged.',
      'AI-generated material is clearly separated from verified evidence.',
    ],
    evidence: ['Research question', 'Search strategy', 'Evidence map', 'Final brief', 'Verification notes'],
    stretchGoal: 'Create a repeatable verification checklist that another researcher could use for the same type of question.',
  },
  'ai-c-p4': {
    projectId: 'ai-c-p4',
    why: 'Prove that you can use AI throughout a content workflow without sacrificing originality, accuracy, or editorial judgment.',
    deliverables: [
      'Define audience, objective, positioning, and the core idea.',
      'Research the topic and record important factual claims.',
      'Produce an original draft and document AI-assisted revisions.',
      'Create a fact-check log for claims that matter.',
      'Adapt the core idea for at least two additional formats or platforms.',
      'Define metrics for judging whether the campaign worked.',
    ],
    acceptanceCriteria: [
      'The central idea is original and audience-specific.',
      'Important claims have supporting evidence.',
      'AI use is documented rather than hidden.',
      'Adaptations preserve the core message while respecting the format of each channel.',
    ],
    evidence: ['Research notes', 'Original draft', 'AI revision notes', 'Fact-check log', 'Final content set'],
    stretchGoal: 'Run a small audience test and revise the campaign based on observed engagement or feedback.',
  },
  'ai-y-p3': {
    projectId: 'ai-y-p3',
    why: 'Demonstrate an end-to-end AI-assisted YouTube workflow built around audience value rather than mass production.',
    deliverables: [
      'Define one audience and a focused channel proposition.',
      'Research and select three related video topics.',
      'Write and fact-check the scripts.',
      'Produce the three videos with documented AI assistance.',
      'Create titles, thumbnails, descriptions, and publishing metadata.',
      'Review early performance and document the change planned for video four.',
    ],
    acceptanceCriteria: [
      'The three videos have a coherent audience and content promise.',
      'The opening delivers on the packaging promise.',
      'Material AI-generated or altered content is disclosed where current policy requires it.',
      'The workflow does not rely on repetitive mass-produced content with little original value.',
      'Analytics observations lead to a concrete iteration decision.',
    ],
    evidence: ['Channel brief', 'Three scripts', 'Three videos', 'Packaging assets', 'Analytics review'],
    stretchGoal: 'Run a controlled packaging experiment on a later video and document what changed in CTR or retention.',
  },
  'ai-s-p4': {
    projectId: 'ai-s-p4',
    why: 'Demonstrate professional judgment when reviewing AI-assisted software rather than treating generated code as automatically correct.',
    deliverables: [
      'Inspect the application architecture and generated-code changes.',
      'Review correctness, security, tests, performance, and maintainability.',
      'Identify at least five concrete findings and rank them by severity.',
      'Reproduce the most important defects where possible.',
      'Propose or implement prioritized remediation.',
      'Document what the AI handled well and where human review was essential.',
    ],
    acceptanceCriteria: [
      'Findings are specific, reproducible, and tied to evidence.',
      'Security and correctness issues are separated from style preferences.',
      'The remediation plan is prioritized by risk and impact.',
      'The learner can explain each important change.',
    ],
    evidence: ['Audit report', 'Code diff/review notes', 'Test evidence', 'Remediation plan'],
    stretchGoal: 'Create a small regression test suite that protects the highest-risk findings from reappearing.',
  },
  'ai-a-p2': {
    projectId: 'ai-a-p2',
    why: 'Show that you can design reliable AI automation instead of building a fragile chain of prompts and webhooks.',
    deliverables: [
      'Define the business process, trigger, inputs, and desired outcome.',
      'Create an explicit data contract between each workflow step.',
      'Place AI only where probabilistic interpretation adds value.',
      'Add validation, human approval, logging, retries, and failure handling.',
      'Describe maintenance and monitoring requirements.',
    ],
    acceptanceCriteria: [
      'The workflow has a clear happy path and explicit failure paths.',
      'External inputs are authenticated and validated where appropriate.',
      'Consequential actions have an appropriate human control.',
      'The workflow can be explained and maintained by someone else.',
    ],
    evidence: ['Workflow diagram', 'Data contracts', 'Failure matrix', 'Control points', 'Maintenance plan'],
    stretchGoal: 'Create a replay/recovery strategy for failed runs without duplicating irreversible actions.',
  },
  'ai-ag-p2': {
    projectId: 'ai-ag-p2',
    why: 'Demonstrate that you understand agents as bounded systems with tools, state, evaluation, and controls—not simply as chatbots.',
    deliverables: [
      'Define the agent goal and why an agent is justified over a deterministic workflow.',
      'Document tools, permissions, context, memory, and action boundaries.',
      'Build the main workflow with bounded recovery and escalation.',
      'Create an evaluation set covering normal cases, edge cases, and failures.',
      'Demonstrate at least five failure cases and the resulting controls.',
      'Document cost, approval, and monitoring decisions.',
    ],
    acceptanceCriteria: [
      'Every tool has a clear contract and constrained permission set.',
      'Irreversible or high-impact actions have human approval.',
      'Evaluation cases have expected outcomes.',
      'Failure handling is bounded; the agent cannot retry indefinitely.',
    ],
    evidence: ['Architecture diagram', 'Tool contracts', 'Evaluation set', 'Failure demonstrations', 'Monitoring plan'],
    stretchGoal: 'Compare the agent against a simpler deterministic workflow and quantify whether the extra complexity is justified.',
  },
  'ai-e-p2': {
    projectId: 'ai-e-p2',
    why: 'Demonstrate practical AI engineering: retrieval quality, evaluation, observability, cost awareness, and iterative improvement.',
    deliverables: [
      'Build a small RAG application around a defined document set.',
      'Create an evaluation set with expected evidence and answers.',
      'Measure retrieval and answer quality before and after an improvement.',
      'Inspect failure cases and improve chunking, retrieval, or query formulation.',
      'Monitor approximate model and retrieval cost.',
      'Document architectural tradeoffs and limitations.',
    ],
    acceptanceCriteria: [
      'The system can expose the evidence used for an answer.',
      'Evaluation cases cover representative and difficult inputs.',
      'Changes are justified by observed evaluation results.',
      'Cost and latency are considered alongside quality.',
    ],
    evidence: ['Architecture diagram', 'Evaluation dataset', 'Before/after metrics', 'Failure analysis', 'Tradeoff notes'],
    stretchGoal: 'Add a regression evaluation that can be rerun after future retrieval or model changes.',
  },
  'ai-d-p2': {
    projectId: 'ai-d-p2',
    why: 'Show that AI can accelerate creative exploration without replacing user research, accessibility, or design judgment.',
    deliverables: [
      'Define the product problem, audience, and evidence behind the design goal.',
      'Explore multiple AI-assisted directions and record why alternatives were rejected.',
      'Create a coherent interface or prototype using an appropriate design system.',
      'Run an accessibility review and user feedback cycle.',
      'Iterate based on evidence and document where human judgment changed the output.',
    ],
    acceptanceCriteria: [
      'The design is grounded in a user problem rather than visual novelty.',
      'Accessibility requirements are actively checked.',
      'AI-generated directions are evaluated against constraints.',
      'The final case study shows iteration, not just the final screenshot.',
    ],
    evidence: ['Problem statement', 'Exploration board', 'Rejected alternatives', 'Prototype', 'Accessibility review', 'Iteration notes'],
    stretchGoal: 'Create a reusable design-system pattern or component derived from the final solution.',
  },
}
