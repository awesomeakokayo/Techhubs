import type { AIStageObjective } from './ai-stage-objectives'
import { AI_STAGE_OBJECTIVES } from './ai-stage-objectives'
import { AI_RESOURCE_EXTENSIONS } from './ai-curriculum'
import { getAIPracticeTasks } from './ai-practice'
import { getAdvancedAIPracticeTasks } from './ai-practice-advanced'

export interface AICompetencyResourceMapEntry {
  trackId: string
  stageId: number
  competency: string
  techSkillHubExplanation: string
  primaryResourceId: string
  secondaryResourceId?: string
  practiceTaskId?: string
  resourceFit: 'direct' | 'supporting'
  note?: string
}

/**
 * Single source of truth for the AI learning chain:
 * competency -> TechSkillHub explanation -> primary resource -> optional secondary resource -> practice task.
 *
 * Resource IDs resolve through AI_RESOURCE_EXTENSIONS and are subsequently passed
 * through the existing AI resource audit before they are shown in a guided path.
 */
export const AI_COMPETENCY_RESOURCE_MAP: AICompetencyResourceMapEntry[] = [
  // AI FOUNDATIONS
  { trackId: 'ai-foundations', stageId: 1, competency: 'AI mental models and limits', techSkillHubExplanation: 'Explain what modern AI systems can do, what they cannot guarantee, and how models, assistants, search tools and agents differ.', primaryResourceId: 'ai-f9', secondaryResourceId: 'ai-f11', practiceTaskId: 'ai-foundations-p1', resourceFit: 'direct' },
  { trackId: 'ai-foundations', stageId: 2, competency: 'AI tool selection', techSkillHubExplanation: 'Choose tools by task requirements, freshness, evidence needs, modality, cost and risk rather than by brand popularity.', primaryResourceId: 'ai-f9', secondaryResourceId: 'ai-f10', practiceTaskId: 'ai-foundations-p2', resourceFit: 'direct' },
  { trackId: 'ai-foundations', stageId: 3, competency: 'Clear AI instructions', techSkillHubExplanation: 'Design instructions with task, context, constraints, audience, examples and output requirements.', primaryResourceId: 'ai-f10', secondaryResourceId: 'ai-f9', practiceTaskId: 'ai-foundations-p3', resourceFit: 'direct' },
  { trackId: 'ai-foundations', stageId: 4, competency: 'AI-assisted reasoning', techSkillHubExplanation: 'Use AI to surface assumptions, alternatives and trade-offs while retaining responsibility for the final decision.', primaryResourceId: 'ai-w4', secondaryResourceId: 'ai-w5', practiceTaskId: 'ai-foundations-p4', resourceFit: 'supporting', note: 'Work-oriented official guidance supports iterative reasoning workflows; TechSkillHub lesson supplies the decision-making framework.' },
  { trackId: 'ai-foundations', stageId: 5, competency: 'AI output verification', techSkillHubExplanation: 'Identify claims that require independent verification and build an evidence trail before consequential use.', primaryResourceId: 'ai-r3', secondaryResourceId: 'ai-r4', practiceTaskId: 'ai-foundations-p5', resourceFit: 'direct' },
  { trackId: 'ai-foundations', stageId: 6, competency: 'Repeatable AI workflows', techSkillHubExplanation: 'Turn useful AI techniques into repeatable workflows with stable inputs, review gates and measurable quality criteria.', primaryResourceId: 'ai-w6', secondaryResourceId: 'ai-w4', practiceTaskId: 'ai-foundations-p6', resourceFit: 'direct' },

  // AI FOR WORK
  { trackId: 'ai-work', stageId: 1, competency: 'Professional AI communication', techSkillHubExplanation: 'Apply AI to communication with explicit audience, purpose, tone, facts and desired action.', primaryResourceId: 'ai-w4', secondaryResourceId: 'ai-w5', practiceTaskId: 'ai-work-p1', resourceFit: 'direct' },
  { trackId: 'ai-work', stageId: 2, competency: 'AI-assisted document workflows', techSkillHubExplanation: 'Use AI to extract and transform information while checking important details against the source document.', primaryResourceId: 'ai-w5', secondaryResourceId: 'ai-w4', practiceTaskId: 'ai-work-p2', resourceFit: 'direct' },
  { trackId: 'ai-work', stageId: 3, competency: 'AI-assisted learning', techSkillHubExplanation: 'Use AI as a tutor and feedback partner while preserving active recall, independent attempts and understanding.', primaryResourceId: 'ai-w6', secondaryResourceId: 'ai-w4', practiceTaskId: 'ai-work-p3', resourceFit: 'supporting' },
  { trackId: 'ai-work', stageId: 4, competency: 'AI-assisted planning', techSkillHubExplanation: 'Use AI to draft plans while checking dependencies, capacity, estimates, priorities and constraints yourself.', primaryResourceId: 'ai-w6', secondaryResourceId: 'ai-w5', practiceTaskId: 'ai-work-p4', resourceFit: 'supporting' },
  { trackId: 'ai-work', stageId: 5, competency: 'Responsible workplace AI workflows', techSkillHubExplanation: 'Define safe use cases, data boundaries, review requirements and measurable outcomes before deploying AI at work.', primaryResourceId: 'ai-w6', secondaryResourceId: 'ai-w4', resourceFit: 'supporting', note: 'The current free resources cover responsible/productivity use; dedicated governance content should remain a future resource-audit candidate.' },

  // AI RESEARCH
  { trackId: 'ai-research', stageId: 1, competency: 'Question framing and discovery', techSkillHubExplanation: 'Break broad questions into researchable sub-questions and use AI to expand search directions without treating generated text as evidence.', primaryResourceId: 'ai-r4', secondaryResourceId: 'ai-r3', practiceTaskId: 'ai-research-p1', resourceFit: 'supporting' },
  { trackId: 'ai-research', stageId: 2, competency: 'Evidence tracing', techSkillHubExplanation: 'Trace AI-generated claims to original or authoritative sources and record corrections.', primaryResourceId: 'ai-r4', secondaryResourceId: 'ai-r5', practiceTaskId: 'ai-research-p2', resourceFit: 'supporting' },
  { trackId: 'ai-research', stageId: 3, competency: 'Conflicting-source analysis', techSkillHubExplanation: 'Resolve disagreement by checking definitions, methods, dates, source quality and context.', primaryResourceId: 'ai-r4', secondaryResourceId: 'ai-r3', practiceTaskId: 'ai-research-p3', resourceFit: 'supporting' },
  { trackId: 'ai-research', stageId: 4, competency: 'High-risk claim verification', techSkillHubExplanation: 'Verify quotations, statistics, dates and other high-risk claims against original evidence before publication.', primaryResourceId: 'ai-r4', secondaryResourceId: 'ai-r3', practiceTaskId: 'ai-research-p4', resourceFit: 'supporting' },
  { trackId: 'ai-research', stageId: 5, competency: 'Evidence-first research synthesis', techSkillHubExplanation: 'Produce a research brief that separates evidence, interpretation, uncertainty and reasoning.', primaryResourceId: 'ai-r5', secondaryResourceId: 'ai-r4', practiceTaskId: 'ai-research-p5', resourceFit: 'supporting' },

  // AI CONTENT
  { trackId: 'ai-content', stageId: 1, competency: 'Audience and original value', techSkillHubExplanation: 'Define audience, purpose, differentiation and success before using AI for content production.', primaryResourceId: 'ai-c4', secondaryResourceId: 'ai-c3', practiceTaskId: 'ai-content-p1', resourceFit: 'direct' },
  { trackId: 'ai-content', stageId: 2, competency: 'AI-assisted content research', techSkillHubExplanation: 'Use AI for ideation and synthesis while keeping claims traceable and editorial direction human-owned.', primaryResourceId: 'ai-c3', secondaryResourceId: 'ai-c5', practiceTaskId: 'ai-content-p2', resourceFit: 'supporting' },
  { trackId: 'ai-content', stageId: 3, competency: 'AI-assisted drafting and editing', techSkillHubExplanation: 'Use AI for drafting and revision without giving up accuracy, originality, voice or final editorial judgment.', primaryResourceId: 'ai-c3', secondaryResourceId: 'ai-c5', practiceTaskId: 'ai-content-p3', resourceFit: 'supporting' },
  { trackId: 'ai-content', stageId: 4, competency: 'AI-assisted visual production', techSkillHubExplanation: 'Use AI visuals selectively while preserving design consistency, accessibility, accuracy and brand fit.', primaryResourceId: 'ai-c4', secondaryResourceId: 'ai-c5', practiceTaskId: 'ai-content-p4', resourceFit: 'direct' },
  { trackId: 'ai-content', stageId: 5, competency: 'Content measurement and iteration', techSkillHubExplanation: 'Judge content using meaningful audience outcomes and iterate based on evidence rather than output volume.', primaryResourceId: 'ai-c3', secondaryResourceId: 'ai-y3', practiceTaskId: 'ai-content-p5', resourceFit: 'supporting' },

  // AI YOUTUBE
  { trackId: 'ai-youtube', stageId: 1, competency: 'Channel strategy', techSkillHubExplanation: 'Build a channel proposition around a specific audience, durable value proposition and sustainable content pillars.', primaryResourceId: 'ai-y6', secondaryResourceId: 'ai-y3', practiceTaskId: 'ai-youtube-p1', resourceFit: 'supporting', note: 'The current free materials support AI-assisted content creation; YouTube strategy is primarily taught by TechSkillHub here.' },
  { trackId: 'ai-youtube', stageId: 2, competency: 'Topic and competitor research', techSkillHubExplanation: 'Research viewer intent and competing content to choose a differentiated topic before production.', primaryResourceId: 'ai-y3', secondaryResourceId: 'ai-y6', practiceTaskId: 'ai-youtube-p2', resourceFit: 'supporting' },
  { trackId: 'ai-youtube', stageId: 3, competency: 'Research-led scripting', techSkillHubExplanation: 'Turn evidence into an original script with a credible hook, structure, fact-checking and deliberate pacing.', primaryResourceId: 'ai-y6', secondaryResourceId: 'ai-y4', practiceTaskId: 'ai-youtube-p3', resourceFit: 'supporting' },
  { trackId: 'ai-youtube', stageId: 4, competency: 'Video packaging and viewer promise', techSkillHubExplanation: 'Align titles, thumbnails and openings so the promise is clear, compelling and truthful.', primaryResourceId: 'ai-y3', secondaryResourceId: 'ai-y6', practiceTaskId: 'ai-youtube-p4', resourceFit: 'supporting' },
  { trackId: 'ai-youtube', stageId: 5, competency: 'Originality and platform quality', techSkillHubExplanation: 'Recognize repetitive or mass-produced content risks and protect meaningful original viewer value.', primaryResourceId: 'ai-y4', secondaryResourceId: 'ai-y6', resourceFit: 'direct' },
  { trackId: 'ai-youtube', stageId: 6, competency: 'AI disclosure', techSkillHubExplanation: 'Recognize when realistic altered or synthetic media requires disclosure and document the decision.', primaryResourceId: 'ai-y5', secondaryResourceId: 'ai-y4', resourceFit: 'direct', note: 'YouTube is the authoritative source for the current disclosure requirement.' },
  { trackId: 'ai-youtube', stageId: 7, competency: 'YouTube analytics and experimentation', techSkillHubExplanation: 'Interpret impressions, CTR, retention and watch time to form one focused next experiment.', primaryResourceId: 'ai-y3', secondaryResourceId: 'ai-y6', practiceTaskId: 'ai-youtube-p7', resourceFit: 'direct' },
  { trackId: 'ai-youtube', stageId: 8, competency: 'Editing for retention', techSkillHubExplanation: 'Diagnose friction, redundancy and unclear sections and make targeted edits that preserve the story.', primaryResourceId: 'ai-y6', secondaryResourceId: 'ai-y3', practiceTaskId: 'ai-youtube-p5', resourceFit: 'supporting' },
  { trackId: 'ai-youtube', stageId: 9, competency: 'Editorial ownership', techSkillHubExplanation: 'Keep facts, narrative, originality and audience value under human control while using AI for production speed.', primaryResourceId: 'ai-y4', secondaryResourceId: 'ai-y6', resourceFit: 'direct' },
  { trackId: 'ai-youtube', stageId: 10, competency: 'Sustainable AI-assisted channel operations', techSkillHubExplanation: 'Operate a repeatable production and review loop that incorporates quality controls, analytics and current platform rules.', primaryResourceId: 'ai-y4', secondaryResourceId: 'ai-y3', resourceFit: 'direct' },

  // AI SOFTWARE DEVELOPMENT
  { trackId: 'ai-software-development', stageId: 1, competency: 'AI coding fundamentals', techSkillHubExplanation: 'Treat generated code as untrusted until it is understood, tested, reviewed and checked for security and maintainability.', primaryResourceId: 'ai-s4', secondaryResourceId: 'ai-s5', practiceTaskId: 'ai-software-development-p1', resourceFit: 'direct' },
  { trackId: 'ai-software-development', stageId: 2, competency: 'Bounded coding instructions', techSkillHubExplanation: 'Give coding systems requirements, interfaces, constraints, acceptance criteria and relevant repository context.', primaryResourceId: 'ai-s5', secondaryResourceId: 'ai-s4', practiceTaskId: 'ai-software-development-p2', resourceFit: 'direct' },
  { trackId: 'ai-software-development', stageId: 3, competency: 'Evidence-driven debugging', techSkillHubExplanation: 'Reproduce bugs, collect evidence, form hypotheses, test fixes and document the root cause.', primaryResourceId: 'ai-s4', secondaryResourceId: 'ai-s5', practiceTaskId: 'ai-software-development-p3', resourceFit: 'supporting' },
  { trackId: 'ai-software-development', stageId: 4, competency: 'Coding-agent delegation', techSkillHubExplanation: 'Delegate bounded work to coding agents while maintaining scope control, review and rollback ability.', primaryResourceId: 'ai-s4', secondaryResourceId: 'ai-s5', practiceTaskId: 'ai-software-development-p4', resourceFit: 'direct' },
  { trackId: 'ai-software-development', stageId: 5, competency: 'Agent boundaries and approval', techSkillHubExplanation: 'Restrict what coding agents can change and require human approval around sensitive or high-risk areas.', primaryResourceId: 'ai-s5', secondaryResourceId: 'ai-s4', practiceTaskId: 'ai-software-development-p5', resourceFit: 'supporting' },
  { trackId: 'ai-software-development', stageId: 6, competency: 'Test verification of AI-generated code', techSkillHubExplanation: 'Use tests as evidence to evaluate generated code rather than treating passing output as proof of correctness.', primaryResourceId: 'ai-s4', secondaryResourceId: 'ai-s7', practiceTaskId: 'ai-software-development-p6', resourceFit: 'direct' },
  { trackId: 'ai-software-development', stageId: 7, competency: 'Professional AI-assisted development loop', techSkillHubExplanation: 'Run requirements → bounded delegation → diff review → testing → integration as one repeatable engineering loop.', primaryResourceId: 'ai-s7', secondaryResourceId: 'ai-s4', practiceTaskId: 'ai-software-development-p7', resourceFit: 'supporting' },
  { trackId: 'ai-software-development', stageId: 8, competency: 'Team AI development policy', techSkillHubExplanation: 'Define team guidance for safe AI use, review gates, secret handling, documentation and maintainability.', primaryResourceId: 'ai-s6', secondaryResourceId: 'ai-s4', resourceFit: 'supporting', note: 'The current public materials support engineering practice; organizational policy is primarily authored by TechSkillHub.' },

  // AI AUTOMATION
  { trackId: 'ai-automation', stageId: 1, competency: 'Automation candidate selection', techSkillHubExplanation: 'Select stable, repetitive, measurable tasks that can be automated without disproportionate risk.', primaryResourceId: 'ai-a5', secondaryResourceId: 'ai-a4', practiceTaskId: 'ai-automation-p1', resourceFit: 'direct' },
  { trackId: 'ai-automation', stageId: 2, competency: 'Workflow design', techSkillHubExplanation: 'Design automation with explicit inputs, outputs, handoffs, failure paths and review points.', primaryResourceId: 'ai-a4', secondaryResourceId: 'ai-a5', practiceTaskId: 'ai-automation-p2', resourceFit: 'direct' },
  { trackId: 'ai-automation', stageId: 3, competency: 'API diagnosis', techSkillHubExplanation: 'Diagnose API failures by checking credentials, scopes, endpoints, payloads and configuration boundaries.', primaryResourceId: 'ai-a4', secondaryResourceId: 'ai-a5', practiceTaskId: 'ai-automation-p3', resourceFit: 'direct' },
  { trackId: 'ai-automation', stageId: 4, competency: 'Webhook security', techSkillHubExplanation: 'Secure event-driven workflows with authentication, request validation, narrow permissions and constrained side effects.', primaryResourceId: 'ai-a4', secondaryResourceId: 'ai-a6', practiceTaskId: 'ai-automation-p4', resourceFit: 'supporting' },
  { trackId: 'ai-automation', stageId: 5, competency: 'AI placement in automation', techSkillHubExplanation: 'Use probabilistic AI where interpretation adds value while deterministic controls handle predictable operations.', primaryResourceId: 'ai-a6', secondaryResourceId: 'ai-a5', resourceFit: 'direct' },
  { trackId: 'ai-automation', stageId: 6, competency: 'Data contracts', techSkillHubExplanation: 'Validate structured data between steps so malformed inputs do not silently propagate.', primaryResourceId: 'ai-a4', secondaryResourceId: 'ai-a5', resourceFit: 'supporting' },
  { trackId: 'ai-automation', stageId: 7, competency: 'Human approval boundaries', techSkillHubExplanation: 'Route consequential or ambiguous actions to people instead of fully automating them.', primaryResourceId: 'ai-a5', secondaryResourceId: 'ai-a6', resourceFit: 'supporting' },
  { trackId: 'ai-automation', stageId: 8, competency: 'Reliable automation operations', techSkillHubExplanation: 'Operate workflows with logs, alerts, bounded retries, recovery procedures and maintenance planning.', primaryResourceId: 'ai-a5', secondaryResourceId: 'ai-a4', resourceFit: 'direct' },

  // AI AGENTS
  { trackId: 'ai-agents', stageId: 1, competency: 'Agent fundamentals', techSkillHubExplanation: 'Distinguish assistants, deterministic workflows and agents by autonomy, tool use and task variability.', primaryResourceId: 'ai-ag5', secondaryResourceId: 'ai-ag4', practiceTaskId: 'ai-agents-p1', resourceFit: 'direct' },
  { trackId: 'ai-agents', stageId: 2, competency: 'Workflow vs agent selection', techSkillHubExplanation: 'Prefer deterministic workflows when the process is known, stable and easier to control.', primaryResourceId: 'ai-ag5', secondaryResourceId: 'ai-ag6', resourceFit: 'direct' },
  { trackId: 'ai-agents', stageId: 3, competency: 'Agent system design', techSkillHubExplanation: 'Define an agent goal, responsibilities, boundaries, tools and observable outcomes before implementation.', primaryResourceId: 'ai-ag6', secondaryResourceId: 'ai-ag7', resourceFit: 'direct' },
  { trackId: 'ai-agents', stageId: 4, competency: 'Tool contracts and permissions', techSkillHubExplanation: 'Define narrow tool schemas, permissions, validation and disallowed actions for agents.', primaryResourceId: 'ai-ag6', secondaryResourceId: 'ai-ag7', practiceTaskId: 'ai-agents-p2', resourceFit: 'direct' },
  { trackId: 'ai-agents', stageId: 5, competency: 'Context and memory', techSkillHubExplanation: 'Control what context and memory an agent receives so state stays relevant, bounded and safe.', primaryResourceId: 'ai-ag5', secondaryResourceId: 'ai-ag6', resourceFit: 'supporting' },
  { trackId: 'ai-agents', stageId: 6, competency: 'Agent failure handling', techSkillHubExplanation: 'Bound retries, re-planning and escalation so agents fail safely instead of looping indefinitely.', primaryResourceId: 'ai-ag6', secondaryResourceId: 'ai-ag7', resourceFit: 'direct' },
  { trackId: 'ai-agents', stageId: 7, competency: 'Agent observability', techSkillHubExplanation: 'Use traces and logs to diagnose tool misuse, planning errors and consequential behavior.', primaryResourceId: 'ai-ag6', secondaryResourceId: 'ai-ag7', practiceTaskId: 'ai-agents-p3', resourceFit: 'supporting' },
  { trackId: 'ai-agents', stageId: 8, competency: 'Human approval in agent systems', techSkillHubExplanation: 'Place approval gates around consequential, irreversible or ambiguous actions.', primaryResourceId: 'ai-ag6', secondaryResourceId: 'ai-ag7', resourceFit: 'supporting' },
  { trackId: 'ai-agents', stageId: 9, competency: 'Agent evaluation', techSkillHubExplanation: 'Evaluate normal, edge, adversarial and failure scenarios against explicit expected behavior.', primaryResourceId: 'ai-ag6', secondaryResourceId: 'ai-ag7', resourceFit: 'supporting' },
  { trackId: 'ai-agents', stageId: 10, competency: 'Multi-agent tradeoffs', techSkillHubExplanation: 'Use multiple agents only when coordination creates measurable value over a simpler design.', primaryResourceId: 'ai-ag7', secondaryResourceId: 'ai-ag6', resourceFit: 'supporting' },

  // AI ENGINEERING
  { trackId: 'ai-engineering', stageId: 1, competency: 'Model integration and interfaces', techSkillHubExplanation: 'Integrate models with explicit contracts, validation, safe configuration and failure handling.', primaryResourceId: 'ai-e5', secondaryResourceId: 'ai-e6', practiceTaskId: 'ai-engineering-p1', resourceFit: 'direct' },
  { trackId: 'ai-engineering', stageId: 2, competency: 'Model selection and routing', techSkillHubExplanation: 'Select and route models by capability, quality, cost, latency and workload requirements.', primaryResourceId: 'ai-e5', secondaryResourceId: 'ai-e9', practiceTaskId: 'ai-engineering-p2', resourceFit: 'direct' },
  { trackId: 'ai-engineering', stageId: 3, competency: 'Semantic output validation', techSkillHubExplanation: 'Check AI output for supported meaning and evidence, not merely whether the response matches a schema.', primaryResourceId: 'ai-e5', secondaryResourceId: 'ai-e9', resourceFit: 'supporting' },
  { trackId: 'ai-engineering', stageId: 4, competency: 'Embeddings and semantic retrieval', techSkillHubExplanation: 'Use embeddings for suitable similarity and retrieval problems while understanding what similarity does and does not mean.', primaryResourceId: 'ai-e8', secondaryResourceId: 'ai-e5', practiceTaskId: 'ai-engineering-p3', resourceFit: 'direct' },
  { trackId: 'ai-engineering', stageId: 5, competency: 'RAG chunking and context', techSkillHubExplanation: 'Design chunks, metadata and context boundaries that preserve retrieval relevance and interpretability.', primaryResourceId: 'ai-e8', secondaryResourceId: 'ai-e5', resourceFit: 'direct' },
  { trackId: 'ai-engineering', stageId: 6, competency: 'Retrieval diagnosis', techSkillHubExplanation: 'Separate retrieval failures from generation failures and improve the correct system layer.', primaryResourceId: 'ai-e8', secondaryResourceId: 'ai-e9', practiceTaskId: 'ai-engineering-p4', resourceFit: 'supporting' },
  { trackId: 'ai-engineering', stageId: 7, competency: 'Hybrid retrieval', techSkillHubExplanation: 'Combine semantic and lexical retrieval when exact and conceptual matching both matter.', primaryResourceId: 'ai-e8', secondaryResourceId: 'ai-e5', resourceFit: 'supporting' },
  { trackId: 'ai-engineering', stageId: 8, competency: 'AI evaluation', techSkillHubExplanation: 'Build representative evaluations with explicit quality criteria and regression checks.', primaryResourceId: 'ai-e9', secondaryResourceId: 'ai-e5', resourceFit: 'direct' },
  { trackId: 'ai-engineering', stageId: 9, competency: 'Cost and latency optimization', techSkillHubExplanation: 'Measure and reduce unnecessary model work while preserving the quality needed for the use case.', primaryResourceId: 'ai-e5', secondaryResourceId: 'ai-e7', resourceFit: 'supporting' },
  { trackId: 'ai-engineering', stageId: 10, competency: 'Production readiness', techSkillHubExplanation: 'Prepare AI systems for production with security, monitoring, evaluation, fallbacks and rollback plans.', primaryResourceId: 'ai-e9', secondaryResourceId: 'ai-e5', resourceFit: 'supporting' },

  // AI DESIGN
  { trackId: 'ai-design', stageId: 1, competency: 'AI-assisted creative exploration', techSkillHubExplanation: 'Use AI to explore alternatives while preserving user goals and design principles.', primaryResourceId: 'ai-d4', secondaryResourceId: 'ai-d5', practiceTaskId: 'ai-design-p1', resourceFit: 'direct' },
  { trackId: 'ai-design', stageId: 2, competency: 'AI-assisted UI evaluation', techSkillHubExplanation: 'Evaluate AI-generated UI directions against hierarchy, task completion, usability and user needs.', primaryResourceId: 'ai-d4', secondaryResourceId: 'ai-d3', practiceTaskId: 'ai-design-p2', resourceFit: 'supporting' },
  { trackId: 'ai-design', stageId: 3, competency: 'Visual systems and constraints', techSkillHubExplanation: 'Set visual direction, constraints, references and reusable patterns before generating alternatives.', primaryResourceId: 'ai-d4', secondaryResourceId: 'ai-d5', practiceTaskId: 'ai-design-p3', resourceFit: 'direct' },
  { trackId: 'ai-design', stageId: 4, competency: 'Responsible visual output', techSkillHubExplanation: 'Own accuracy, accessibility, originality, brand fit and user impact of AI-assisted visual work.', primaryResourceId: 'ai-d4', secondaryResourceId: 'ai-d5', resourceFit: 'supporting' },
  { trackId: 'ai-design', stageId: 5, competency: 'Evidence-based design decisions', techSkillHubExplanation: 'Challenge unsupported assumptions and update design choices from user and product evidence.', primaryResourceId: 'ai-d4', secondaryResourceId: 'ai-d5', resourceFit: 'supporting' },
  { trackId: 'ai-design', stageId: 6, competency: 'Prototype-driven learning', techSkillHubExplanation: 'Use focused prototypes to reduce uncertainty and test the riskiest interaction before polishing.', primaryResourceId: 'ai-d4', secondaryResourceId: 'ai-d3', resourceFit: 'supporting' },
  { trackId: 'ai-design', stageId: 7, competency: 'AI-assisted design systems', techSkillHubExplanation: 'Use AI to accelerate component work without breaking tokens, consistency or accessibility.', primaryResourceId: 'ai-d3', secondaryResourceId: 'ai-d4', resourceFit: 'supporting' },
  { trackId: 'ai-design', stageId: 8, competency: 'Design judgment and rejection', techSkillHubExplanation: 'Reject AI recommendations that conflict with user needs, evidence, accessibility, ethics or product goals.', primaryResourceId: 'ai-d4', secondaryResourceId: 'ai-d5', resourceFit: 'supporting' },
]

export function getAICompetencyResourceMap(trackId: string, stageId: number) {
  return AI_COMPETENCY_RESOURCE_MAP.filter((entry) => entry.trackId === trackId && entry.stageId === stageId)
}

export function getAICompetencyMapEntry(trackId: string, stageId: number) {
  return AI_COMPETENCY_RESOURCE_MAP.find((entry) => entry.trackId === trackId && entry.stageId === stageId) ?? null
}

/**
 * Curriculum QA helper. It verifies that every AI stage has a competency entry,
 * resolves to a known resource, and points to a practice task when one exists.
 */
export function validateAICompetencyResourceMap() {
  const problems: string[] = []

  for (const [trackId, stages] of Object.entries(AI_STAGE_OBJECTIVES)) {
    for (const stageId of Object.keys(stages).map(Number)) {
      const entry = getAICompetencyMapEntry(trackId, stageId)
      if (!entry) {
        problems.push(`${trackId} stage ${stageId}: missing competency/resource mapping`)
        continue
      }

      const resources = AI_RESOURCE_EXTENSIONS[trackId] ?? []
      const primaryExists = resources.some((resource) => resource.id === entry.primaryResourceId)
      if (!primaryExists) problems.push(`${trackId} stage ${stageId}: primary resource ${entry.primaryResourceId} does not exist`)

      if (entry.secondaryResourceId) {
        const secondaryExists = resources.some((resource) => resource.id === entry.secondaryResourceId)
        if (!secondaryExists) problems.push(`${trackId} stage ${stageId}: secondary resource ${entry.secondaryResourceId} does not exist`)
      }

      const practiceTasks = [
        ...getAIPracticeTasks(trackId, stageId),
        ...getAdvancedAIPracticeTasks(trackId, stageId),
      ]
      if (practiceTasks.length && !entry.practiceTaskId) {
        problems.push(`${trackId} stage ${stageId}: practice exists but is not mapped`)
      }
      if (entry.practiceTaskId && !practiceTasks.some((task) => task.id === entry.practiceTaskId)) {
        problems.push(`${trackId} stage ${stageId}: mapped practice task ${entry.practiceTaskId} does not exist`)
      }
    }
  }

  return { ok: problems.length === 0, problems }
}

export function getAICompetencyObjective(trackId: string, stageId: number): AIStageObjective | null {
  return AI_STAGE_OBJECTIVES[trackId]?.[stageId] ?? null
}
