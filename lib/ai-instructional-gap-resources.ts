import type { Resource } from './tracks'

/**
 * Phase 3 resource-gap fixes.
 *
 * These are stage-specific learning resources added where the original AI
 * curriculum had a task whose supporting material was too broad. They are
 * intentionally free to read/use as learning material; paid API/tool usage is
 * never a prerequisite for completing the TechSkillHub course.
 */
export const AI_INSTRUCTIONAL_GAP_RESOURCES: Record<string, Resource[]> = {
  'ai-foundations': [
    { id: 'ai-gap-foundations-4', title: 'OpenAI Academy — Prompting', description: 'Official guidance on clear instructions, context, output requirements and iterative refinement.', url: 'https://academy.openai.com/en/public/clubs/work-users-ynjqu/resources/prompting', type: 'docs', free: true, source: 'OpenAI Academy' },
  ],
  'ai-work': [
    { id: 'ai-gap-work-3', title: 'Microsoft Learn — Understand AI Agents and Prompting', description: 'Beginner module showing how to craft effective prompts and use AI for practical tasks, with a knowledge assessment.', url: 'https://learn.microsoft.com/en-us/training/modules/understand-ai-agents-prompting/', type: 'docs', free: true, source: 'Microsoft Learn' },
    { id: 'ai-gap-work-4', title: 'OpenAI Academy — Prompting', description: 'Practical instruction for giving AI clear tasks, relevant context, constraints and desired output.', url: 'https://academy.openai.com/en/public/clubs/work-users-ynjqu/resources/prompting', type: 'docs', free: true, source: 'OpenAI Academy' },
    { id: 'ai-gap-work-5', title: 'Microsoft — Apply Responsible AI', description: 'Current guidance on designing responsible AI use with data boundaries, human oversight and release gates.', url: 'https://learn.microsoft.com/en-us/agents/center-of-excellence/responsible-ai', type: 'docs', free: true, source: 'Microsoft Learn' },
  ],
  'ai-research': [
    { id: 'ai-gap-research-1', title: 'Google Scholar', description: 'Free scholarly search for discovering papers and tracing claims toward primary evidence.', url: 'https://scholar.google.com/', type: 'tool', free: true, source: 'Google Scholar' },
    { id: 'ai-gap-research-2', title: 'Google Scholar', description: 'Use scholarly search to trace claims, inspect original papers and record evidence.', url: 'https://scholar.google.com/', type: 'tool', free: true, source: 'Google Scholar' },
    { id: 'ai-gap-research-3', title: 'Google Scholar', description: 'Compare primary and secondary research sources before resolving conflicts between claims.', url: 'https://scholar.google.com/', type: 'tool', free: true, source: 'Google Scholar' },
    { id: 'ai-gap-research-4', title: 'Google Scholar', description: 'Locate original papers and records when verifying quotations, statistics and high-risk claims.', url: 'https://scholar.google.com/', type: 'tool', free: true, source: 'Google Scholar' },
    { id: 'ai-gap-research-5', title: 'Google Scholar', description: 'Use traceable scholarly evidence as the source layer for an evidence-first research brief.', url: 'https://scholar.google.com/', type: 'tool', free: true, source: 'Google Scholar' },
  ],
  'ai-content': [
    { id: 'ai-gap-content-2', title: 'OpenAI Academy — Prompting', description: 'Official practical instruction for turning content goals, context and constraints into useful AI-assisted work.', url: 'https://academy.openai.com/en/public/clubs/work-users-ynjqu/resources/prompting', type: 'docs', free: true, source: 'OpenAI Academy' },
    { id: 'ai-gap-content-3', title: 'OpenAI Academy — Prompting', description: 'Use clear task framing, context and output requirements to create and iteratively refine AI-assisted drafts.', url: 'https://academy.openai.com/en/public/clubs/work-users-ynjqu/resources/prompting', type: 'docs', free: true, source: 'OpenAI Academy' },
    { id: 'ai-gap-content-5', title: 'YouTube Creator Academy — Analytics', description: 'Official analytics guidance for interpreting audience response and choosing what to improve next.', url: 'https://creatoracademy.youtube.com/page/lesson/using-analytics', type: 'docs', free: true, source: 'YouTube Creator Academy' },
  ],
  'ai-youtube': [
    { id: 'ai-gap-youtube-1', title: 'YouTube Creators — Titles & Thumbnails', description: 'Official creator guidance on titles, thumbnails and using analytics to understand packaging performance.', url: 'https://www.youtube.com/watch?v=ubFTkoJkNX4', type: 'video', free: true, source: 'YouTube Creators' },
    { id: 'ai-gap-youtube-2', title: 'YouTube Creator Academy — Analytics', description: 'Official guidance for understanding reach, impressions, CTR, engagement and audience behavior.', url: 'https://creatoracademy.youtube.com/page/lesson/using-analytics', type: 'docs', free: true, source: 'YouTube Creator Academy' },
    { id: 'ai-gap-youtube-3', title: 'YouTube Creators — Titles & Thumbnails', description: 'Official walkthrough of packaging decisions that influence whether viewers choose to watch.', url: 'https://www.youtube.com/watch?v=ubFTkoJkNX4', type: 'video', free: true, source: 'YouTube Creators' },
    { id: 'ai-gap-youtube-4', title: 'YouTube Creators — Titles & Thumbnails', description: 'Official guidance on aligning titles and thumbnails with the content promise and measuring performance.', url: 'https://www.youtube.com/watch?v=ubFTkoJkNX4', type: 'video', free: true, source: 'YouTube Creators' },
    { id: 'ai-gap-youtube-8', title: 'YouTube Creator Academy — Understand Your Engagement', description: 'Official guidance on watch time, average view duration and audience retention for diagnosing viewer drop-off.', url: 'https://creatoracademy.youtube.com/page/lesson/engagement-analytics?cid=analytics-series&hl=en', type: 'docs', free: true, source: 'YouTube Creator Academy' },
  ],
  'ai-software-development': [
    { id: 'ai-gap-software-3', title: 'GitHub Copilot — Code Review', description: 'Official guidance for reviewing AI-assisted code changes and validating the result rather than accepting suggestions blindly.', url: 'https://docs.github.com/en/copilot/concepts/agents/code-review', type: 'docs', free: true, source: 'GitHub Docs' },
    { id: 'ai-gap-software-5', title: 'GitHub Copilot — Custom Instructions for Code Review', description: 'Official guidance on repository-wide and path-specific review instructions, scope and security expectations.', url: 'https://docs.github.com/en/copilot/tutorials/customize-code-review', type: 'docs', free: true, source: 'GitHub Docs' },
    { id: 'ai-gap-software-7', title: 'GitHub Copilot — Code Review', description: 'Official review workflow for inspecting AI-assisted code changes and acting on findings.', url: 'https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review', type: 'docs', free: true, source: 'GitHub Docs' },
    { id: 'ai-gap-software-8', title: 'GitHub Copilot — Custom Review Instructions', description: 'Official patterns for team-level coding standards, security, testing and review guidance.', url: 'https://docs.github.com/en/copilot/tutorials/customize-code-review', type: 'docs', free: true, source: 'GitHub Docs' },
  ],
  'ai-automation': [
    { id: 'ai-gap-automation-4', title: 'n8n Documentation', description: 'Official workflow documentation for credentials, integrations, webhooks and controlled automation behavior.', url: 'https://docs.n8n.io/', type: 'docs', free: true, source: 'n8n' },
    { id: 'ai-gap-automation-6', title: 'n8n Courses', description: 'Official free learning material for building workflows and working safely with structured workflow data.', url: 'https://docs.n8n.io/courses/', type: 'docs', free: true, source: 'n8n' },
    { id: 'ai-gap-automation-7', title: 'Microsoft — Apply Responsible AI', description: 'Guidance on human oversight, release gates and accountable AI actions in workflows and agents.', url: 'https://learn.microsoft.com/en-us/agents/center-of-excellence/responsible-ai', type: 'docs', free: true, source: 'Microsoft Learn' },
  ],
  'ai-agents': [
    { id: 'ai-gap-agents-5', title: 'Microsoft — Responsible AI for Agents', description: 'Current guidance on agent responsibilities, data boundaries, accountability, human oversight and safety.', url: 'https://learn.microsoft.com/en-us/agents/design-guidelines/responsible-ai', type: 'docs', free: true, source: 'Microsoft Learn' },
    { id: 'ai-gap-agents-7', title: 'Microsoft — Apply Responsible AI', description: 'Guidance on building agents with explicit controls, monitoring, human review and release gates.', url: 'https://learn.microsoft.com/en-us/agents/center-of-excellence/responsible-ai', type: 'docs', free: true, source: 'Microsoft Learn' },
    { id: 'ai-gap-agents-8', title: 'Microsoft — Apply Responsible AI', description: 'Use release gates and human-in-the-loop patterns when agent actions have meaningful consequences.', url: 'https://learn.microsoft.com/en-us/agents/center-of-excellence/responsible-ai', type: 'docs', free: true, source: 'Microsoft Learn' },
    { id: 'ai-gap-agents-9', title: 'OpenAI API — Evals', description: 'Official reference material for designing repeatable evaluations and tracking model/application behavior.', url: 'https://platform.openai.com/docs/api-reference/evals', type: 'docs', free: true, source: 'OpenAI' },
    { id: 'ai-gap-agents-10', title: 'GitHub Copilot Agents', description: 'Official agent documentation illustrating bounded delegation, task execution and iterative review of agent work.', url: 'https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents', type: 'docs', free: true, source: 'GitHub Docs' },
  ],
  'ai-engineering': [
    { id: 'ai-gap-engineering-3', title: 'OpenAI API — Structured Outputs', description: 'Official documentation on schema-constrained model output; pair it with the TechSkillHub lesson on semantic validation.', url: 'https://platform.openai.com/docs/api-reference/responses', type: 'docs', free: true, source: 'OpenAI' },
    { id: 'ai-gap-engineering-6', title: 'OpenAI API — Evals', description: 'Official reference for repeatable evaluation runs and comparing AI application behavior over time.', url: 'https://platform.openai.com/docs/api-reference/evals', type: 'docs', free: true, source: 'OpenAI' },
    { id: 'ai-gap-engineering-7', title: 'LangChain Documentation — Retrieval', description: 'Open documentation for retrieval patterns that can combine semantic and other matching strategies; no paid service is required to study the concepts.', url: 'https://docs.langchain.com/oss/python/langchain/overview', type: 'docs', free: true, source: 'LangChain' },
    { id: 'ai-gap-engineering-9', title: 'OpenAI API Reference — Model Selection and Responses', description: 'Official model/API reference for understanding capability and response trade-offs; API usage is not required to study this material.', url: 'https://platform.openai.com/docs/api-reference/chat', type: 'docs', free: true, source: 'OpenAI' },
    { id: 'ai-gap-engineering-10', title: 'Microsoft — Responsible AI', description: 'Current production-oriented guidance on security, monitoring, human oversight, accountability and release gates for AI systems.', url: 'https://learn.microsoft.com/en-us/agents/center-of-excellence/responsible-ai', type: 'docs', free: true, source: 'Microsoft Learn' },
  ],
  'ai-design': [
    { id: 'ai-gap-design-2', title: 'Canva Design School', description: 'Free design education for visual hierarchy, composition, communication and design fundamentals that can be applied while evaluating AI-generated UI directions.', url: 'https://www.canva.com/design-school/courses/', type: 'docs', free: true, source: 'Canva Design School' },
    { id: 'ai-gap-design-4', title: 'Canva Design School', description: 'Free design fundamentals for visual communication, hierarchy and audience-focused design decisions.', url: 'https://www.canva.com/design-school/courses/', type: 'docs', free: true, source: 'Canva Design School' },
    { id: 'ai-gap-design-5', title: 'Canva Design School', description: 'Free design fundamentals that support evidence-based visual decisions and clearer communication.', url: 'https://www.canva.com/design-school/courses/', type: 'docs', free: true, source: 'Canva Design School' },
    { id: 'ai-gap-design-6', title: 'Canva Design School', description: 'Free learning material for visual prototyping and communication fundamentals.', url: 'https://www.canva.com/design-school/courses/', type: 'docs', free: true, source: 'Canva Design School' },
    { id: 'ai-gap-design-7', title: 'Figma Help Center', description: 'Official documentation for components, variables and design-system workflows; AI features are not required for these concepts.', url: 'https://help.figma.com/', type: 'docs', free: true, source: 'Figma' },
    { id: 'ai-gap-design-8', title: 'Canva Design School', description: 'Free fundamentals for evaluating composition, consistency and communication quality when rejecting weak AI-generated design ideas.', url: 'https://www.canva.com/design-school/courses/', type: 'docs', free: true, source: 'Canva Design School' },
  ],
}

export function getAIInstructionalGapResources(trackId: string, stageId: number): Resource[] {
  const resources = AI_INSTRUCTIONAL_GAP_RESOURCES[trackId] ?? []
  return resources.filter((resource) => resource.id.endsWith(`-${stageId}`))
}
