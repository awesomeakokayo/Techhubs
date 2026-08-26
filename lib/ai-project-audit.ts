export interface AIProjectSkillTrace {
  skill: string
  sourceStageId: number
  learn: string
  see: string
  practice: string
  verify: string
}

export interface AIProjectAudit {
  projectId: string
  trackId: string
  projectStageId: number
  traces: AIProjectSkillTrace[]
  newMajorConcepts: string[]
  status: 'complete' | 'needs-fix'
}

/** Phase 5: every portfolio project is audited backwards against the curriculum. */
export const AI_PROJECT_AUDITS: Record<string, AIProjectAudit> = {
  'ai-f-p3': {
    projectId: 'ai-f-p3', trackId: 'ai-foundations', projectStageId: 6, status: 'complete', newMajorConcepts: [],
    traces: [
      { skill: 'Design a repeatable AI workflow', sourceStageId: 6, learn: 'Stage 6 Learn: repeatable workflows, inputs, review gates, and quality criteria.', see: 'Stage 6 worked example: recurring weekly task converted into a documented workflow.', practice: 'ai-foundations-p6.', verify: 'Stage 6 Verify: choose the workflow with explicit inputs, review, and quality controls.' },
      { skill: 'Use AI selectively while retaining human judgment', sourceStageId: 4, learn: 'Stage 4 Learn: AI as a reasoning partner without outsourcing responsibility.', see: 'Stage 4 worked example: AI challenges project assumptions while the learner makes the decision.', practice: 'ai-foundations-p4.', verify: 'Stage 4 Verify: separate AI suggestions from final judgment.' },
      { skill: 'Verify AI output', sourceStageId: 5, learn: 'Stage 5 Learn: identify claims that require verification and build an evidence check.', see: 'Stage 5 worked example: trace an unsupported statistic to authoritative evidence.', practice: 'ai-foundations-p5.', verify: 'Stage 5 Verify: verify important claims against authoritative sources.' },
    ],
  },
  'ai-w-p4': {
    projectId: 'ai-w-p4', trackId: 'ai-work', projectStageId: 5, status: 'complete', newMajorConcepts: [],
    traces: [
      { skill: 'Responsible workplace AI workflows', sourceStageId: 5, learn: 'Stage 5 Learn: approved use cases, data boundaries, review requirements, and outcomes.', see: 'Stage 5 worked example: internal-information workflow with explicit data and approval boundaries.', practice: 'ai-work-p4.', verify: 'Stage 5 Verify: apply safe data and human-review boundaries.' },
      { skill: 'Plan repeatable work with constraints', sourceStageId: 4, learn: 'Stage 4 Learn: planning with dependencies, capacity, and constraints.', see: 'Stage 4 worked example: correct an AI plan that ignored a dependency.', practice: 'ai-work-p4.', verify: 'Stage 4 Verify: revise an unrealistic AI-generated plan using real constraints.' },
      { skill: 'Review AI-generated work against source material', sourceStageId: 2, learn: 'Stage 2 Learn: document outputs are not the source itself.', see: 'Stage 2 worked example: verify names, dates, numbers, and exceptions against the original.', practice: 'ai-work-p2.', verify: 'Stage 2 Verify: distinguish reliable source detail from generated summary.' },
    ],
  },
  'ai-r-p2': {
    projectId: 'ai-r-p2', trackId: 'ai-research', projectStageId: 5, status: 'complete', newMajorConcepts: [],
    traces: [
      { skill: 'Frame a research question and search strategy', sourceStageId: 1, learn: 'Stage 1 Learn: narrow broad questions and distinguish discovery from evidence.', see: 'Stage 1 worked example: break a broad question into measurable sub-questions.', practice: 'ai-research-p1.', verify: 'Stage 1 Verify: choose the research approach based on freshness and evidence needs.' },
      { skill: 'Trace and verify evidence', sourceStageId: 2, learn: 'Stage 2 Learn: trace important claims to primary or authoritative sources.', see: 'Stage 2 worked example: locate the original report behind an AI claim.', practice: 'ai-research-p2.', verify: 'Stage 2 Verify: compare source evidence with AI output and record corrections.' },
      { skill: 'Evaluate source quality', sourceStageId: 3, learn: 'Stage 3 Learn: examine authority, method, definitions, date, and relevance.', see: 'Stage 3 worked example: reconcile sources using different definitions.', practice: 'ai-research-p3.', verify: 'Stage 3 Verify: explain why conflicting evidence differs and which is stronger.' },
      { skill: 'Audit high-risk claims', sourceStageId: 4, learn: 'Stage 4 Learn: verify quotations, statistics, dates, and consequential claims.', see: 'Stage 4 worked example: reject a plausible quote when the original wording does not match.', practice: 'ai-research-p4.', verify: 'Stage 4 Verify: verify original wording and context before publication.' },
      { skill: 'Synthesize evidence with uncertainty', sourceStageId: 5, learn: 'Stage 5 Learn: expose evidence, conflict, and uncertainty in the final brief.', see: 'Stage 5 worked example: evidence table separating facts, interpretation, and uncertainty.', practice: 'ai-research-p5.', verify: 'Stage 5 Verify: identify the strongest evidence trail and honest uncertainty.' },
    ],
  },
  'ai-c-p4': {
    projectId: 'ai-c-p4', trackId: 'ai-content', projectStageId: 5, status: 'complete', newMajorConcepts: [],
    traces: [
      { skill: 'Define audience, objective, and original value', sourceStageId: 1, learn: 'Stage 1 Learn: audience, purpose, differentiation, and original value.', see: 'Stage 1 worked example: define a specific audience and content proposition before prompting.', practice: 'ai-content-p1.', verify: 'Stage 1 Verify: select the content direction with clear audience value.' },
      { skill: 'Research and ideate without inventing evidence', sourceStageId: 2, learn: 'Stage 2 Learn: AI-assisted research with traceable claims.', see: 'Stage 2 worked example: research AI-generated ideas and discard weak claims.', practice: 'ai-content-p2.', verify: 'Stage 2 Verify: separate evidence from ideas and keep sources traceable.' },
      { skill: 'Draft and edit with human editorial ownership', sourceStageId: 3, learn: 'Stage 3 Learn: drafting, revision, voice, accuracy, and originality.', see: 'Stage 3 worked example: improve clarity while restoring nuance and removing unsupported claims.', practice: 'ai-content-p3.', verify: 'Stage 3 Verify: improve quality without surrendering voice.' },
      { skill: 'Create and evaluate visual direction', sourceStageId: 4, learn: 'Stage 4 Learn: visual constraints, consistency, accessibility, and brand fit.', see: 'Stage 4 worked example: reject an attractive but brand-inappropriate visual.', practice: 'ai-content-p4.', verify: 'Stage 4 Verify: choose the direction that best serves communication goals.' },
      { skill: 'Measure outcomes and iterate', sourceStageId: 5, learn: 'Stage 5 Learn: use outcomes and quality signals rather than volume.', see: 'Stage 5 worked example: choose the next change from meaningful performance signals.', practice: 'ai-content-p5.', verify: 'Stage 5 Verify: interpret performance and choose the next iteration.' },
    ],
  },
  'ai-y-p3': {
    projectId: 'ai-y-p3', trackId: 'ai-youtube', projectStageId: 10, status: 'complete', newMajorConcepts: [],
    traces: [
      { skill: 'Channel strategy and audience proposition', sourceStageId: 1, learn: 'Stage 1 Learn: specific audience, value proposition, content pillars, sustainable direction.', see: 'Stage 1 worked example: identify a repeatable viewer problem a channel can solve.', practice: 'ai-youtube-p1.', verify: 'Stage 1 Verify: choose a defensible, differentiated channel direction.' },
      { skill: 'Topic research and differentiation', sourceStageId: 2, learn: 'Stage 2 Learn: viewer demand, search intent, competition, differentiated angles.', see: 'Stage 2 worked example: compare competitors, comments, search intent, and gaps.', practice: 'ai-youtube-p2.', verify: 'Stage 2 Verify: choose the topic with evidence of audience need.' },
      { skill: 'Research-backed scripting', sourceStageId: 3, learn: 'Stage 3 Learn: hook, narrative structure, claims, pacing, and fact-checking.', see: 'Stage 3 worked example: build a script from research with a credible hook.', practice: 'ai-youtube-p3.', verify: 'Stage 3 Verify: keep claims supported and the promise clear.' },
      { skill: 'Packaging and expectation alignment', sourceStageId: 4, learn: 'Stage 4 Learn: align thumbnail, title, opening, and delivery.', see: 'Stage 4 worked example: fix the expectation gap between packaging and opening.', practice: 'ai-youtube-p6.', verify: 'Stage 4 Verify: choose accurate, audience-relevant packaging.' },
      { skill: 'Originality and platform quality', sourceStageId: 5, learn: 'Stage 5 Learn: original viewer value and risks of repetitive mass production.', see: 'Stage 5 worked example: audit for low-value repetition.', practice: 'ai-youtube-p5.', verify: 'Stage 5 Verify: reject production approaches that sacrifice original value.' },
      { skill: 'AI disclosure', sourceStageId: 6, learn: 'Stage 6 Learn: recognize disclosure expectations for realistic synthetic media.', see: 'Stage 6 worked example: determine whether synthetic media requires disclosure.', practice: 'ai-youtube-p4.', verify: 'Stage 6 Verify: select the correct disclosure action.' },
      { skill: 'Analytics-driven iteration', sourceStageId: 7, learn: 'Stage 7 Learn: use impressions, CTR, retention, and watch time to diagnose and experiment.', see: 'Stage 7 worked example: weak retention after strong impressions points to an opening problem.', practice: 'ai-youtube-p7.', verify: 'Stage 7 Verify: choose one focused experiment tied to a metric.' },
    ],
  },
  'ai-s-p4': {
    projectId: 'ai-s-p4', trackId: 'ai-software-development', projectStageId: 8, status: 'complete', newMajorConcepts: [],
    traces: [
      { skill: 'Understand and inspect AI-generated code', sourceStageId: 1, learn: 'Stage 1 Learn: generated code must be understood, reviewed, and tested.', see: 'Stage 1 worked example: inspect generated code and edge cases.', practice: 'ai-software-development-p2.', verify: 'Stage 1 Verify: reject plausible but unverified code.' },
      { skill: 'Write bounded coding requirements', sourceStageId: 2, learn: 'Stage 2 Learn: requirements, interfaces, constraints, acceptance criteria, repository context.', see: 'Stage 2 worked example: bounded implementation brief.', practice: 'ai-software-development-p1.', verify: 'Stage 2 Verify: choose a sufficiently bounded request.' },
      { skill: 'Debug from evidence', sourceStageId: 3, learn: 'Stage 3 Learn: reproduce failures, isolate root causes, validate fixes.', see: 'Stage 3 worked example: reproduce before asking AI for hypotheses.', practice: 'ai-software-development-p3.', verify: 'Stage 3 Verify: reject untested diagnoses.' },
      { skill: 'Delegate bounded agent work', sourceStageId: 4, learn: 'Stage 4 Learn: delegate multi-step coding tasks with scope control.', see: 'Stage 4 worked example: inspect and reject unrelated agent changes.', practice: 'ai-software-development-p4.', verify: 'Stage 4 Verify: choose the approach with appropriate review burden.' },
      { skill: 'Control sensitive changes', sourceStageId: 5, learn: 'Stage 5 Learn: protect authentication, secrets, and sensitive code with approval.', see: 'Stage 5 worked example: prevent an agent changing authentication without review.', practice: 'ai-software-development-p5.', verify: 'Stage 5 Verify: choose the safest permission boundary.' },
      { skill: 'Test AI-generated code', sourceStageId: 6, learn: 'Stage 6 Learn: generated tests are evidence, not proof; cover edge cases.', see: 'Stage 6 worked example: add a test exposing an untested failure.', practice: 'ai-software-development-p6.', verify: 'Stage 6 Verify: identify missing coverage and validate independently.' },
      { skill: 'Run a professional AI-assisted development loop', sourceStageId: 7, learn: 'Stage 7 Learn: requirement → bounded delegation → diff review → tests → integration.', see: 'Stage 7 worked example: use AI speed without replacing engineering judgment.', practice: 'ai-software-development-p7.', verify: 'Stage 7 Verify: select the workflow preserving review and testing.' },
      { skill: 'Team AI policy and review standards', sourceStageId: 8, learn: 'Stage 8 Learn: acceptable use, security, review gates, maintainability, documentation.', see: 'Stage 8 worked example: team rules for AI-assisted development.', practice: 'Stage 8 stage practice.', verify: 'Stage 8 Verify: apply team-level review and security rules.' },
    ],
  },
  'ai-a-p2': {
    projectId: 'ai-a-p2', trackId: 'ai-automation', projectStageId: 8, status: 'complete', newMajorConcepts: [],
    traces: [
      { skill: 'Select a safe automation candidate', sourceStageId: 1, learn: 'Stage 1 Learn: stable, repetitive, measurable tasks with acceptable risk.', see: 'Stage 1 worked example: confirm stable inputs and measurable output.', practice: 'ai-automation-p1.', verify: 'Stage 1 Verify: reject automation whose risk exceeds its value.' },
      { skill: 'Design workflows and failure paths', sourceStageId: 2, learn: 'Stage 2 Learn: triggers, data handoffs, error paths, approvals.', see: 'Stage 2 worked example: retry, manual-review, and side-effect protection.', practice: 'ai-automation-p2.', verify: 'Stage 2 Verify: choose the design with explicit failure paths.' },
      { skill: 'Specify API boundaries', sourceStageId: 3, learn: 'Stage 3 Learn: request/response shapes, authentication, failure cases.', see: 'Stage 3 worked example: inspect credentials and scopes before rewriting.', practice: 'ai-automation-p3.', verify: 'Stage 3 Verify: diagnose the failure at the correct boundary.' },
      { skill: 'Secure webhook actions', sourceStageId: 4, learn: 'Stage 4 Learn: authentication, validation, permissions, constrained side effects.', see: 'Stage 4 worked example: validate a webhook before a consequential action.', practice: 'ai-automation-p4.', verify: 'Stage 4 Verify: identify the safe webhook control.' },
      { skill: 'Place AI inside deterministic controls', sourceStageId: 5, learn: 'Stage 5 Learn: probabilistic AI where it helps, deterministic controls around it.', see: 'Stage 5 worked example: AI classifies while deterministic rules validate and route.', practice: 'Stage 5 stage practice.', verify: 'Stage 5 Verify: choose the architecture with fixed controls around AI.' },
      { skill: 'Validate structured data contracts', sourceStageId: 6, learn: 'Stage 6 Learn: schemas, validation, rejection, safe failure behavior.', see: 'Stage 6 worked example: reject malformed JSON at the boundary.', practice: 'Stage 6 stage practice.', verify: 'Stage 6 Verify: stop malformed data at the boundary.' },
      { skill: 'Use human approval for consequential actions', sourceStageId: 7, learn: 'Stage 7 Learn: escalation and approval for ambiguous or high-impact actions.', see: 'Stage 7 worked example: low-confidence customer response requires approval.', practice: 'Stage 7 stage practice.', verify: 'Stage 7 Verify: choose the correct escalation boundary.' },
      { skill: 'Operate and recover automations', sourceStageId: 8, learn: 'Stage 8 Learn: logs, alerts, bounded retries, recovery, maintenance.', see: 'Stage 8 worked example: teammate can operate from logs and recovery rules.', practice: 'Stage 8 operational practice.', verify: 'Stage 8 Verify: choose maintainable monitoring and recovery.' },
    ],
  },
  'ai-ag-p2': {
    projectId: 'ai-ag-p2', trackId: 'ai-agents', projectStageId: 10, status: 'complete', newMajorConcepts: [],
    traces: [
      { skill: 'Know when an agent is justified', sourceStageId: 1, learn: 'Stage 1 Learn: assistants, workflows, agents; choose the simplest suitable architecture.', see: 'Stage 1 worked example: stable process remains deterministic.', practice: 'ai-agents-p1.', verify: 'Stage 1 Verify: reject unnecessary agent complexity.' },
      { skill: 'Prefer deterministic workflows when appropriate', sourceStageId: 2, learn: 'Stage 2 Learn: avoid agent complexity when process is known and stable.', see: 'Stage 2 worked example: compare workflow and agent.', practice: 'Stage 2 architecture practice.', verify: 'Stage 2 Verify: choose the simpler architecture when it suffices.' },
      { skill: 'Design agent goals and boundaries', sourceStageId: 3, learn: 'Stage 3 Learn: explicit responsibility, boundaries, observable tool use.', see: 'Stage 3 worked example: goal, tools, escalation, forbidden actions.', practice: 'Stage 3 design practice.', verify: 'Stage 3 Verify: choose boundaries matching the goal.' },
      { skill: 'Define tool contracts and permissions', sourceStageId: 4, learn: 'Stage 4 Learn: inputs, outputs, permissions, constraints, validation.', see: 'Stage 4 worked example: read-only database access.', practice: 'ai-agents-p2.', verify: 'Stage 4 Verify: select the safest tool contract.' },
      { skill: 'Control context and memory', sourceStageId: 5, learn: 'Stage 5 Learn: relevant context, bounded memory, sensitive-information protection.', see: 'Stage 5 worked example: current-run context versus retained memory.', practice: 'Stage 5 context/memory practice.', verify: 'Stage 5 Verify: choose the appropriate memory scope.' },
      { skill: 'Bound recovery and escalation', sourceStageId: 6, learn: 'Stage 6 Learn: retry limits, replanning, escalation.', see: 'Stage 6 worked example: escalation after repeated failure.', practice: 'Stage 6 failure-handling practice.', verify: 'Stage 6 Verify: choose bounded recovery.' },
      { skill: 'Observe and diagnose agent behavior', sourceStageId: 7, learn: 'Stage 7 Learn: traces, logs, auditability.', see: 'Stage 7 worked example: wrong API call revealed by trace.', practice: 'ai-agents-p3.', verify: 'Stage 7 Verify: use traces to diagnose failure.' },
      { skill: 'Require human approval for high-impact actions', sourceStageId: 8, learn: 'Stage 8 Learn: approval gates for consequential or irreversible actions.', see: 'Stage 8 worked example: purchase/account change requires approval.', practice: 'Stage 8 approval practice.', verify: 'Stage 8 Verify: identify mandatory approval.' },
      { skill: 'Evaluate agent behavior', sourceStageId: 9, learn: 'Stage 9 Learn: normal, edge, failure, safety-sensitive evaluation.', see: 'Stage 9 worked example: compare changes with the same evaluation set.', practice: 'ai-agents-p3.', verify: 'Stage 9 Verify: choose an evaluation set that detects regressions.' },
    ],
  },
  'ai-e-p2': {
    projectId: 'ai-e-p2', trackId: 'ai-engineering', projectStageId: 10, status: 'complete', newMajorConcepts: [],
    traces: [
      { skill: 'Integrate models with reliable interfaces', sourceStageId: 1, learn: 'Stage 1 Learn: model contracts, validation, safe configuration, interfaces.', see: 'Stage 1 worked example: reject malformed output before production logic.', practice: 'ai-engineering-p1.', verify: 'Stage 1 Verify: choose the safe integration boundary.' },
      { skill: 'Select models using measured tradeoffs', sourceStageId: 2, learn: 'Stage 2 Learn: quality, cost, latency, routing.', see: 'Stage 2 worked example: route work according to capability.', practice: 'ai-engineering-p1.', verify: 'Stage 2 Verify: select by measured task fit.' },
      { skill: 'Validate AI output semantically', sourceStageId: 3, learn: 'Stage 3 Learn: schema validity does not equal semantic correctness.', see: 'Stage 3 worked example: reject a schema-valid unsupported claim.', practice: 'Stage 3 application practice.', verify: 'Stage 3 Verify: choose semantic validation.' },
      { skill: 'Use embeddings for retrieval', sourceStageId: 4, learn: 'Stage 4 Learn: embeddings and semantic similarity for knowledge access.', see: 'Stage 4 worked example: retrieve conceptually related support passages.', practice: 'ai-engineering-p3.', verify: 'Stage 4 Verify: identify appropriate retrieval use.' },
      { skill: 'Design RAG context and chunking', sourceStageId: 5, learn: 'Stage 5 Learn: chunking, context boundaries, relevance, evidence traceability.', see: 'Stage 5 worked example: improve irrelevant retrieval context.', practice: 'Stage 4/5 retrieval exercises.', verify: 'Stage 5 Verify: improve retrieval by diagnosing context quality.' },
      { skill: 'Diagnose retrieval failures', sourceStageId: 6, learn: 'Stage 6 Learn: separate retrieval failure from generation failure.', see: 'Stage 6 worked example: bad answer traced to missing evidence.', practice: 'ai-engineering-p3.', verify: 'Stage 6 Verify: improve the correct layer.' },
      { skill: 'Evaluate AI systems', sourceStageId: 8, learn: 'Stage 8 Learn: evaluation sets, metrics, regression checks.', see: 'Stage 8 worked example: compare a change using the same cases.', practice: 'ai-engineering-p4.', verify: 'Stage 8 Verify: choose criteria supporting reliable iteration.' },
      { skill: 'Optimize cost and latency', sourceStageId: 9, learn: 'Stage 9 Learn: measure cost drivers and validate quality after optimization.', see: 'Stage 9 worked example: reduce unnecessary calls without losing quality.', practice: 'Stage 9 optimization practice.', verify: 'Stage 9 Verify: choose an optimization preserving required quality.' },
      { skill: 'Prepare an AI system for production', sourceStageId: 10, learn: 'Stage 10 Learn: security, monitoring, fallbacks, evaluation, rollback.', see: 'Stage 10 worked example: production controls before launch.', practice: 'Stage 10 production-readiness practice.', verify: 'Stage 10 Verify: choose the production gate covering reliability and risk.' },
    ],
  },
  'ai-d-p2': {
    projectId: 'ai-d-p2', trackId: 'ai-design', projectStageId: 8, status: 'complete', newMajorConcepts: [],
    traces: [
      { skill: 'Explore design directions with AI', sourceStageId: 1, learn: 'Stage 1 Learn: explore directions while preserving user-centered judgment.', see: 'Stage 1 worked example: choose among generated directions using user goals.', practice: 'ai-design-p1.', verify: 'Stage 1 Verify: keep design judgment human-led.' },
      { skill: 'Evaluate UI against hierarchy and usability', sourceStageId: 2, learn: 'Stage 2 Learn: evaluate AI-generated UI against task completion and usability evidence.', see: 'Stage 2 worked example: attractive layout hides primary action.', practice: 'ai-design-p2.', verify: 'Stage 2 Verify: choose the direction that serves the user problem.' },
      { skill: 'Maintain visual consistency', sourceStageId: 3, learn: 'Stage 3 Learn: constraints, references, reusable patterns, consistency.', see: 'Stage 3 worked example: set typography, color, spacing, content, component constraints.', practice: 'ai-design-p3.', verify: 'Stage 3 Verify: choose the revision that improves the visual system.' },
      { skill: 'Check accessibility and responsible visual output', sourceStageId: 4, learn: 'Stage 4 Learn: accuracy, accessibility, originality, brand fit, human ownership.', see: 'Stage 4 worked example: replace misleading generated visual.', practice: 'Stage 4 design review practice.', verify: 'Stage 4 Verify: reject output violating accessibility or accuracy.' },
      { skill: 'Use evidence to challenge design assumptions', sourceStageId: 5, learn: 'Stage 5 Learn: validate personas and assumptions with evidence.', see: 'Stage 5 worked example: challenge unsupported persona assumption.', practice: 'Stage 5 evidence-based design practice.', verify: 'Stage 5 Verify: update design when evidence contradicts assumption.' },
      { skill: 'Prototype and iterate', sourceStageId: 6, learn: 'Stage 6 Learn: prototype the riskiest interaction before full polish.', see: 'Stage 6 worked example: test risky interaction first.', practice: 'Stage 6 prototyping practice.', verify: 'Stage 6 Verify: choose the prototype that tests the highest-risk assumption.' },
      { skill: 'Use design-system patterns', sourceStageId: 7, learn: 'Stage 7 Learn: tokens, components, accessibility, consistency.', see: 'Stage 7 worked example: accelerate components while preserving system rules.', practice: 'Stage 7 design-system practice.', verify: 'Stage 7 Verify: choose the reusable, accessible pattern.' },
      { skill: 'Exercise final design judgment', sourceStageId: 8, learn: 'Stage 8 Learn: reject AI suggestions that conflict with evidence, accessibility, ethics, or goals.', see: 'Stage 8 worked example: explain why an AI recommendation should be rejected.', practice: 'Stage 8 design-judgment practice.', verify: 'Stage 8 Verify: justify a human-led rejection and better alternative.' },
    ],
  },
}

export function getAIProjectAudit(projectId: string): AIProjectAudit | null {
  return AI_PROJECT_AUDITS[projectId] ?? null
}

export function getAIProjectSkillTraces(projectId: string): AIProjectSkillTrace[] {
  return AI_PROJECT_AUDITS[projectId]?.traces ?? []
}

export function getUntaughtAIProjectConcepts(): AIProjectAudit[] {
  return Object.values(AI_PROJECT_AUDITS).filter((audit) => audit.status === 'needs-fix' || audit.newMajorConcepts.length > 0)
}
