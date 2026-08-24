export interface AIStageObjective {
  objective: string
  successCriteria: string[]
}

/** Stage-level competencies shown inside the existing concept cards. */
export const AI_STAGE_OBJECTIVES: Record<string, Record<number, AIStageObjective>> = {
  'ai-foundations': {
    1: { objective: 'Explain what modern AI systems can and cannot reliably do, and distinguish models, products, assistants, search tools, and agents.', successCriteria: ['Explain generative AI in plain language', 'Identify common failure modes', 'Choose when AI should or should not be used'] },
    2: { objective: 'Select AI tools based on the task, freshness requirements, evidence needs, modality, cost, and risk.', successCriteria: ['Compare at least two tool approaches', 'Justify a tool choice using task requirements', 'Recognize when a traditional tool is better'] },
    3: { objective: 'Design clear AI instructions that provide the context, constraints, examples, and output format needed for reliable work.', successCriteria: ['Write a structured instruction', 'Improve a weak instruction through iteration', 'Define what a successful output looks like'] },
    4: { objective: 'Use AI as a reasoning partner without outsourcing responsibility for important decisions.', successCriteria: ['Surface assumptions and alternatives', 'Ask useful follow-up questions', 'Separate AI suggestions from final judgment'] },
    5: { objective: 'Detect when AI output needs verification and build a repeatable evidence-checking process.', successCriteria: ['Identify claims that require verification', 'Prefer authoritative evidence', 'Document uncertainty and corrections'] },
    6: { objective: 'Turn a useful AI technique into a repeatable workflow with defined inputs, review gates, and quality criteria.', successCriteria: ['Document a repeatable workflow', 'Test multiple iterations', 'Define review criteria and failure handling'] },
  },
  'ai-work': {
    1: { objective: 'Apply AI to communication and reporting while keeping purpose, audience, tone, and source material under control.', successCriteria: ['Produce a structured work output', 'Match an output to its audience', 'Review generated claims and wording'] },
    2: { objective: 'Use AI with documents and information without confusing generated summaries with the source itself.', successCriteria: ['Extract relevant information', 'Check important details against the source', 'State limitations clearly'] },
    3: { objective: 'Use AI to support learning and problem solving while preserving active thinking and verification.', successCriteria: ['Attempt work before asking for answers', 'Use AI for feedback and explanation', 'Demonstrate understanding independently'] },
    4: { objective: 'Use AI to plan work while validating estimates, dependencies, priorities, and constraints.', successCriteria: ['Turn a goal into a practical plan', 'Check dependencies and capacity', 'Revise unrealistic AI suggestions'] },
    5: { objective: 'Design responsible workplace AI workflows with approved use cases, data boundaries, review requirements, and measurable outcomes.', successCriteria: ['Define a safe use case', 'Set review and data rules', 'Define success measures'] },
  },
  'ai-research': {
    1: { objective: 'Use AI to expand research questions and discover useful search directions without treating generated text as evidence.', successCriteria: ['Turn a broad question into sub-questions', 'Generate useful search terms', 'Separate leads from verified findings'] },
    2: { objective: 'Verify important claims using primary or authoritative sources and document the evidence trail.', successCriteria: ['Trace a claim to a source', 'Compare evidence with the AI output', 'Record corrections'] },
    3: { objective: 'Resolve conflicting evidence by examining methods, definitions, dates, source quality, and context.', successCriteria: ['Identify why sources disagree', 'Rank evidence by quality', 'Explain the remaining uncertainty'] },
    4: { objective: 'Verify quotations, statistics, dates, and other high-risk claims before publishing or presenting them.', successCriteria: ['Locate original records', 'Verify wording and context', 'Reject unsupported claims'] },
    5: { objective: 'Produce a research brief that exposes evidence, uncertainty, sources, and reasoning rather than only a polished conclusion.', successCriteria: ['State the research question', 'Present evidence and conflicts', 'Explain confidence and uncertainty'] },
  },
  'ai-content': {
    1: { objective: 'Design content around audience, purpose, differentiation, and original value before using AI for production.', successCriteria: ['Define audience and objective', 'Choose a distinct angle', 'Explain why the content should exist'] },
    2: { objective: 'Use AI to accelerate research and ideation while keeping claims traceable and the editorial direction human-owned.', successCriteria: ['Research the topic', 'Separate evidence from ideas', 'Create an editorial brief'] },
    3: { objective: 'Use AI for drafting and editing without surrendering voice, accuracy, originality, or final judgment.', successCriteria: ['Create a draft', 'Perform AI-assisted revision', 'Document human editorial changes'] },
    4: { objective: 'Use AI-assisted visuals and creative tools while maintaining accuracy, consistency, accessibility, and brand fit.', successCriteria: ['Define visual constraints', 'Reject misleading outputs', 'Refine visuals against a brief'] },
    5: { objective: 'Measure content using outcomes and quality signals rather than production volume alone.', successCriteria: ['Choose meaningful metrics', 'Interpret audience response', 'Propose the next iteration'] },
  },
  'ai-youtube': {
    1: { objective: 'Build a YouTube strategy around a specific audience, clear value proposition, sustainable content pillars, and evidence of demand.', successCriteria: ['Define the audience', 'Choose a defensible niche/angle', 'Set sustainable content pillars'] },
    2: { objective: 'Research topics and competitors to find viewer demand and a differentiated editorial angle.', successCriteria: ['Map search/viewer intent', 'Analyze competitor gaps', 'Choose a differentiated topic'] },
    3: { objective: 'Create scripts through research, structure, fact-checking, editing, and a clear viewer promise.', successCriteria: ['Write a strong hook and structure', 'Verify claims', 'Edit for clarity and pacing'] },
    4: { objective: 'Align thumbnails, titles, openings, and delivery so the viewer promise is clear and credible.', successCriteria: ['Create coherent packaging', 'Identify expectation gaps', 'Improve the opening'] },
    5: { objective: 'Understand originality and platform-quality requirements before scaling AI-assisted production.', successCriteria: ['Recognize inauthentic content risks', 'Protect original value', 'Avoid copycat production systems'] },
    6: { objective: 'Apply current disclosure expectations when AI meaningfully generates or alters realistic content.', successCriteria: ['Recognize when disclosure is required', 'Use appropriate disclosure', 'Document AI use where useful'] },
    7: { objective: 'Use analytics to diagnose performance and choose the next experiment rather than chasing vanity metrics.', successCriteria: ['Interpret impressions and CTR', 'Interpret retention/watch time', 'Choose one focused experiment'] },
    8: { objective: 'Edit for retention without sacrificing clarity, narrative coherence, or audience expectations.', successCriteria: ['Identify unnecessary friction', 'Preserve the story', 'Improve pacing intentionally'] },
    9: { objective: 'Keep audience understanding, originality, fact-checking, and editorial responsibility human-owned while using AI for production speed.', successCriteria: ['Document human decisions', 'Verify final work', 'Maintain original value'] },
    10: { objective: 'Operate an AI-assisted channel with current platform rules, quality controls, and a repeatable improvement loop.', successCriteria: ['Review current policy', 'Audit content quality', 'Define the next production cycle'] },
  },
  'ai-software-development': {
    1: { objective: 'Use AI coding assistance without confusing generated code with verified software.', successCriteria: ['Explain generated code', 'Identify likely failure modes', 'Review before integration'] },
    2: { objective: 'Give AI coding systems precise requirements, interfaces, constraints, acceptance criteria, and context.', successCriteria: ['Write a bounded implementation brief', 'Define acceptance criteria', 'Provide relevant repository context'] },
    3: { objective: 'Use AI for debugging while reproducing failures, understanding root causes, and validating fixes.', successCriteria: ['Reproduce the issue', 'Explain the root cause', 'Verify the fix with tests'] },
    4: { objective: 'Delegate bounded multi-step tasks to coding agents while preserving scope control and review.', successCriteria: ['Define agent scope', 'Inspect diffs', 'Reject unrelated changes'] },
    5: { objective: 'Control agent changes through explicit boundaries, diff review, security awareness, and human approval.', successCriteria: ['Review file changes', 'Protect sensitive areas', 'Revert unsafe or unrelated changes'] },
    6: { objective: 'Treat AI-generated tests as evidence to inspect rather than proof that the application is correct.', successCriteria: ['Assess test coverage', 'Add missing cases', 'Validate behavior independently'] },
    7: { objective: 'Run a professional AI-assisted development loop from requirements through review, testing, and integration.', successCriteria: ['Plan the work', 'Delegate safely', 'Test and verify before merge'] },
    8: { objective: 'Define team-level rules for AI-assisted development, including security, review, maintainability, and acceptable use.', successCriteria: ['Write team guidance', 'Define review gates', 'Protect secrets and sensitive code'] },
  },
  'ai-automation': {
    1: { objective: 'Identify tasks that are stable, repetitive, measurable, and safe enough to automate.', successCriteria: ['Define inputs and outputs', 'Identify exceptions', 'Reject unsuitable automation candidates'] },
    2: { objective: 'Design workflows with explicit failure paths rather than assuming every step succeeds.', successCriteria: ['Define failure cases', 'Choose recovery behavior', 'Protect downstream actions'] },
    3: { objective: 'Diagnose API failures by checking credentials, scopes, endpoints, payloads, and configuration.', successCriteria: ['Interpret common errors', 'Trace the failure boundary', 'Correct configuration safely'] },
    4: { objective: 'Secure webhook-driven workflows with authentication, validation, permissions, and constrained side effects.', successCriteria: ['Validate requests', 'Limit permissions', 'Protect sensitive actions'] },
    5: { objective: 'Place AI where probabilistic interpretation adds value while deterministic controls handle predictable operations.', successCriteria: ['Identify AI-worthy steps', 'Keep fixed rules around them', 'Define review gates'] },
    6: { objective: 'Validate structured data between workflow steps so bad inputs do not silently propagate.', successCriteria: ['Define schemas', 'Reject malformed data', 'Create safe failure behavior'] },
    7: { objective: 'Use human approval for consequential or ambiguous actions that should not be fully automated.', successCriteria: ['Identify approval boundaries', 'Design escalation', 'Log decisions'] },
    8: { objective: 'Operate an automation reliably with logs, alerts, bounded retries, recovery, and maintenance planning.', successCriteria: ['Define observability', 'Design recovery', 'Document maintenance'] },
  },
  'ai-agents': {
    1: { objective: 'Explain the difference between assistants, workflows, and agents, and identify when agents actually add value.', successCriteria: ['Classify a system correctly', 'Choose the simplest suitable architecture', 'Explain the tradeoff'] },
    2: { objective: 'Choose deterministic workflows over agents when the process is known, stable, and easier to control.', successCriteria: ['Identify unnecessary agent complexity', 'Compare architectures', 'Justify the simpler option'] },
    3: { objective: 'Design agent systems with explicit responsibilities, boundaries, and observable tool use.', successCriteria: ['Define the agent goal', 'Specify boundaries', 'Define tool responsibilities'] },
    4: { objective: 'Create safe tool contracts with clear inputs, outputs, permissions, constraints, and validation.', successCriteria: ['Define tool schemas', 'Restrict permissions', 'Validate tool results'] },
    5: { objective: 'Design context and memory so the agent receives relevant information without uncontrolled state accumulation.', successCriteria: ['Define memory scope', 'Remove irrelevant state', 'Protect sensitive information'] },
    6: { objective: 'Handle agent failure with bounded retries, replanning, and escalation rather than infinite autonomous looping.', successCriteria: ['Define failure limits', 'Design recovery', 'Escalate when required'] },
    7: { objective: 'Make agent behavior observable enough to diagnose failures and audit consequential actions.', successCriteria: ['Capture tool traces', 'Define useful logs', 'Use traces during debugging'] },
    8: { objective: 'Place human approval at the right points for consequential, irreversible, or ambiguous actions.', successCriteria: ['Identify high-impact actions', 'Define approval gates', 'Document escalation'] },
    9: { objective: 'Evaluate agents using representative normal cases, edge cases, failures, and safety-sensitive scenarios.', successCriteria: ['Build an evaluation set', 'Define expected outcomes', 'Track regressions'] },
    10: { objective: 'Justify agent complexity and coordinate specialized agents only when it creates measurable value.', successCriteria: ['Compare single vs multi-agent designs', 'Measure the benefit', 'Reject unnecessary complexity'] },
  },
  'ai-engineering': {
    1: { objective: 'Integrate models into software using structured outputs, validation, safe configuration, and clear interfaces.', successCriteria: ['Define a model contract', 'Validate responses', 'Handle failures safely'] },
    2: { objective: 'Select and route models according to capability, quality, cost, latency, and workload.', successCriteria: ['Compare models on task fit', 'Define routing rules', 'Measure tradeoffs'] },
    3: { objective: 'Validate AI outputs semantically instead of assuming schema validity means correctness.', successCriteria: ['Define semantic checks', 'Reject unsupported outputs', 'Create fallback behavior'] },
    4: { objective: 'Use embeddings and semantic retrieval appropriately for knowledge access and similarity tasks.', successCriteria: ['Explain embeddings', 'Choose a retrieval use case', 'Evaluate similarity behavior'] },
    5: { objective: 'Design useful RAG chunks and context boundaries so retrieval remains relevant and interpretable.', successCriteria: ['Choose chunking strategy', 'Inspect retrieved context', 'Improve bad retrieval'] },
    6: { objective: 'Diagnose retrieval failures separately from generation failures and improve the correct layer.', successCriteria: ['Inspect retrieval results', 'Separate retrieval from generation errors', 'Test improvements'] },
    7: { objective: 'Combine semantic and lexical retrieval when the problem benefits from both kinds of matching.', successCriteria: ['Identify hybrid-search needs', 'Compare retrieval approaches', 'Measure results'] },
    8: { objective: 'Evaluate AI applications with representative tests, defined quality criteria, and regression checks.', successCriteria: ['Create an evaluation set', 'Define metrics', 'Track regressions'] },
    9: { objective: 'Optimize AI systems for cost and latency without losing the quality required for the use case.', successCriteria: ['Measure cost drivers', 'Reduce unnecessary work', 'Validate quality after optimization'] },
    10: { objective: 'Prepare AI applications for production with security, monitoring, evaluation, error handling, and rollback.', successCriteria: ['Protect secrets and endpoints', 'Define monitoring', 'Create fallback/rollback behavior'] },
  },
  'ai-design': {
    1: { objective: 'Use AI to explore design directions while preserving design principles and user-centered decision making.', successCriteria: ['Generate alternatives', 'Explain selection criteria', 'Keep user needs central'] },
    2: { objective: 'Evaluate AI-generated UI concepts against hierarchy, task completion, and usability evidence.', successCriteria: ['Identify hierarchy problems', 'Revise against user goals', 'Avoid novelty for novelty’s sake'] },
    3: { objective: 'Create consistent visual exploration using defined direction, constraints, references, and reusable patterns.', successCriteria: ['Set visual constraints', 'Compare alternatives', 'Maintain consistency'] },
    4: { objective: 'Own the accuracy, accessibility, originality, brand fit, and user impact of AI-assisted visual output.', successCriteria: ['Run accessibility checks', 'Reject misleading output', 'Document human decisions'] },
    5: { objective: 'Challenge unsupported user assumptions and use evidence to guide AI-assisted design decisions.', successCriteria: ['Identify assumptions', 'Seek evidence', 'Update the design from evidence'] },
    6: { objective: 'Use prototypes to reduce the cost of learning before committing to full implementation.', successCriteria: ['Build a focused prototype', 'Test the riskiest assumption', 'Iterate from findings'] },
    7: { objective: 'Use AI to accelerate design-system application without compromising consistency or accessibility.', successCriteria: ['Apply existing tokens/components', 'Check consistency', 'Preserve accessibility'] },
    8: { objective: 'Reject AI suggestions when they conflict with user needs, evidence, accessibility, ethics, or the design goal.', successCriteria: ['Explain the rejection', 'Suggest a better direction', 'Document the decision'] },
  },
}

export function getAIStageObjective(trackId: string, stageId: number): AIStageObjective | null {
  return AI_STAGE_OBJECTIVES[trackId]?.[stageId] ?? null
}
