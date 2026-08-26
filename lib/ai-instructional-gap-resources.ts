import type { Resource } from './tracks'

/**
 * Phase 3 instructional-gap fixes.
 *
 * These resources are intentionally stage-specific. Fundamental concepts are
 * still taught in the TechSkillHub lesson first; these links are used where an
 * external reference materially improves preparation for the practice task.
 * All entries are free to access as learning material.
 */
export const AI_INSTRUCTIONAL_GAP_RESOURCES: Record<string, Resource[]> = {
  'ai-foundations': [
    {
      id: 'ai-gap-foundations-2',
      title: 'Microsoft Learn — Introduction to Generative AI',
      description: 'Free beginner module for understanding generative AI, comparing models, and applying critical thinking before choosing a tool.',
      url: 'https://learn.microsoft.com/en-us/training/modules/intro-generative-ai-explore-basics/',
      type: 'docs', free: true, source: 'Microsoft Learn',
    },
    {
      id: 'ai-gap-foundations-4',
      title: 'OpenAI Academy — Prompting',
      description: 'Official guidance on clear instructions, context, output requirements, and iterative refinement.',
      url: 'https://academy.openai.com/en/public/clubs/work-users-ynjqu/resources/prompting',
      type: 'docs', free: true, source: 'OpenAI Academy',
    },
    {
      id: 'ai-gap-foundations-5',
      title: 'OpenAI API — Evals',
      description: 'Official evaluation reference that introduces repeatable ways to inspect AI behavior instead of trusting fluent output.',
      url: 'https://platform.openai.com/docs/api-reference/evals',
      type: 'docs', free: true, source: 'OpenAI',
    },
  ],
  'ai-work': [
    {
      id: 'ai-gap-work-2',
      title: 'OpenAI Academy — Getting Started With ChatGPT',
      description: 'Official practical guidance for working with files, search, prompts, and repeatable workflows when turning information into useful work.',
      url: 'https://openai.com/academy/getting-started/',
      type: 'docs', free: true, source: 'OpenAI Academy',
    },
    {
      id: 'ai-gap-work-3',
      title: 'Microsoft Learn — Understand AI Agents and Prompting',
      description: 'Beginner module showing how to craft effective prompts and use AI for practical tasks, with a knowledge assessment.',
      url: 'https://learn.microsoft.com/en-us/training/modules/understand-ai-agents-prompting/',
      type: 'docs', free: true, source: 'Microsoft Learn',
    },
    {
      id: 'ai-gap-work-5',
      title: 'Microsoft — Apply Responsible AI',
      description: 'Guidance on data boundaries, human oversight, accountability, and release gates for responsible AI use.',
      url: 'https://learn.microsoft.com/en-us/agents/center-of-excellence/responsible-ai',
      type: 'docs', free: true, source: 'Microsoft Learn',
    },
  ],
  'ai-research': [
    {
      id: 'ai-gap-research-1',
      title: 'Cornell Library — Developing a Research Strategy',
      description: 'University library guide that teaches a step-by-step research strategy: define the topic, search, evaluate sources, and cite evidence.',
      url: 'https://guides.library.cornell.edu/SociologyHonorsThesis/strategy',
      type: 'docs', free: true, source: 'Cornell University Library',
    },
    {
      id: 'ai-gap-research-2',
      title: 'Google Scholar',
      description: 'Free scholarly search for finding papers, tracing citations, and moving from broad discovery toward primary evidence.',
      url: 'https://scholar.google.com/',
      type: 'tool', free: true, source: 'Google Scholar',
    },
    {
      id: 'ai-gap-research-3',
      title: 'Cornell Library — Evaluate Sources',
      description: 'University guidance for critically analyzing information sources and independently verifying claims instead of trusting search results.',
      url: 'https://guides.library.cornell.edu/english1183ac23/evaluate',
      type: 'docs', free: true, source: 'Cornell University Library',
    },
    {
      id: 'ai-gap-research-4',
      title: 'Cornell Library — Evaluate Sources',
      description: 'Use a university research guide to audit authority, evidence, context, and verification when reviewing an AI-generated report.',
      url: 'https://guides.library.cornell.edu/english1183ac23/evaluate',
      type: 'docs', free: true, source: 'Cornell University Library',
    },
    {
      id: 'ai-gap-research-5',
      title: 'Cornell Library — Developing a Research Strategy',
      description: 'A reusable research workflow covering topic selection, searching, source evaluation, and citation.',
      url: 'https://guides.library.cornell.edu/SociologyHonorsThesis/strategy',
      type: 'docs', free: true, source: 'Cornell University Library',
    },
  ],
  'ai-content': [
    {
      id: 'ai-gap-content-2',
      title: 'OpenAI Academy — Prompting',
      description: 'Official practical instruction for turning a content goal, audience context, and constraints into useful AI-assisted work.',
      url: 'https://academy.openai.com/en/public/clubs/work-users-ynjqu/resources/prompting',
      type: 'docs', free: true, source: 'OpenAI Academy',
    },
    {
      id: 'ai-gap-content-3',
      title: 'Microsoft — Generative AI for Beginners',
      description: 'Free beginner series covering prompting, generation, application workflows, and responsible AI.',
      url: 'https://www.youtube.com/watch?v=k7HaeJs-N-o',
      type: 'video', free: true, source: 'Microsoft Developer',
    },
    {
      id: 'ai-gap-content-5',
      title: 'OpenAI Academy — Getting Started With ChatGPT',
      description: 'Official guidance for turning recurring work into repeatable AI-assisted workflows with explicit review points.',
      url: 'https://openai.com/academy/getting-started/',
      type: 'docs', free: true, source: 'OpenAI Academy',
    },
  ],
  'ai-youtube': [
    {
      id: 'ai-gap-youtube-1',
      title: 'YouTube Help — What Content to Create',
      description: 'Official guidance for using audience behavior, content groups, and patterns to choose sustainable topics rather than copying trends blindly.',
      url: 'https://support.google.com/youtube/answer/13616340?hl=en',
      type: 'docs', free: true, source: 'YouTube',
    },
    {
      id: 'ai-gap-youtube-2',
      title: 'YouTube Help — Explore Trends',
      description: 'Official guide to the YouTube Studio Trends tab, including top searches, breakout videos, and content gaps for validating ideas.',
      url: 'https://support.google.com/youtube/answer/11962757?co=GENIE.Platform%3DDesktop&hl=en',
      type: 'docs', free: true, source: 'YouTube',
    },
    {
      id: 'ai-gap-youtube-3',
      title: 'YouTube Help — What Viewers Are Watching',
      description: 'Official audience guidance for finding patterns in what viewers watch and using those patterns to plan original content.',
      url: 'https://support.google.com/youtube/answer/13616337?hl=en',
      type: 'docs', free: true, source: 'YouTube',
    },
    {
      id: 'ai-gap-youtube-4',
      title: 'YouTube Help — What Content to Create',
      description: 'Official guidance for building repeatable formats, grouping content, and making a sustainable production plan from audience evidence.',
      url: 'https://support.google.com/youtube/answer/13616340?hl=en',
      type: 'docs', free: true, source: 'YouTube',
    },
    {
      id: 'ai-gap-youtube-5',
      title: 'YouTube Help — Thumbnail & Title Tips',
      description: 'Official guidance for accurate title/thumbnail promises, audience targeting, and measuring packaging performance.',
      url: 'https://support.google.com/youtube/answer/12340300?hl=en',
      type: 'docs', free: true, source: 'YouTube',
    },
    {
      id: 'ai-gap-youtube-6',
      title: 'YouTube Help — Thumbnail & Title Tips',
      description: 'Official guidance for title and thumbnail accuracy, clarity, audience fit, and performance measurement.',
      url: 'https://support.google.com/youtube/answer/12340300?hl=en',
      type: 'docs', free: true, source: 'YouTube',
    },
    {
      id: 'ai-gap-youtube-7',
      title: 'YouTube Help — Audience Analytics',
      description: 'Official guidance for understanding audience segments and using viewer behavior to form content hypotheses.',
      url: 'https://support.google.com/youtube/answer/9314416?hl=en',
      type: 'docs', free: true, source: 'YouTube',
    },
  ],
  'ai-software-development': [
    {
      id: 'ai-gap-software-1',
      title: 'GitHub Copilot Documentation',
      description: 'Official documentation for planning AI-assisted coding work and understanding where Copilot fits into a developer workflow.',
      url: 'https://docs.github.com/en/copilot',
      type: 'docs', free: true, source: 'GitHub Docs',
    },
    {
      id: 'ai-gap-software-2',
      title: 'GitHub Copilot — Code Review',
      description: 'Official guidance for inspecting AI-assisted code changes and validating findings rather than accepting generated code blindly.',
      url: 'https://docs.github.com/en/copilot/concepts/agents/code-review',
      type: 'docs', free: true, source: 'GitHub Docs',
    },
    {
      id: 'ai-gap-software-3',
      title: 'GitHub Copilot — Code Review',
      description: 'Official review workflow for checking AI-generated changes, identifying issues, and deciding what should actually be merged.',
      url: 'https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review',
      type: 'docs', free: true, source: 'GitHub Docs',
    },
    {
      id: 'ai-gap-software-4',
      title: 'GitHub Copilot Documentation',
      description: 'Official documentation to compare AI coding workflows by capabilities, review requirements, and integration points.',
      url: 'https://docs.github.com/en/copilot',
      type: 'docs', free: true, source: 'GitHub Docs',
    },
    {
      id: 'ai-gap-software-5',
      title: 'GitHub Copilot — Custom Review Instructions',
      description: 'Official guidance for setting repository-wide and path-specific review rules around coding standards, testing, and security.',
      url: 'https://docs.github.com/en/copilot/tutorials/customize-code-review',
      type: 'docs', free: true, source: 'GitHub Docs',
    },
    {
      id: 'ai-gap-software-6',
      title: 'GitHub Copilot — Code Review',
      description: 'Official code-review material that reinforces the need to inspect, test, and validate AI-generated changes.',
      url: 'https://docs.github.com/en/copilot/concepts/agents/code-review',
      type: 'docs', free: true, source: 'GitHub Docs',
    },
    {
      id: 'ai-gap-software-7',
      title: 'GitHub Copilot — Code Review',
      description: 'Official review workflow for inspecting AI-assisted code changes and acting on findings.',
      url: 'https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review',
      type: 'docs', free: true, source: 'GitHub Docs',
    },
  ],
  'ai-automation': [
    {
      id: 'ai-gap-automation-3',
      title: 'n8n Documentation',
      description: 'Official workflow documentation for nodes, integrations, webhooks, credentials, and data passed between steps.',
      url: 'https://docs.n8n.io/',
      type: 'docs', free: true, source: 'n8n',
    },
    {
      id: 'ai-gap-automation-4',
      title: 'n8n Documentation — Error Handling',
      description: 'Official documentation for designing failure paths, retries, and error workflows instead of assuming every automation succeeds.',
      url: 'https://docs.n8n.io/flow-logic/error-handling/',
      type: 'docs', free: true, source: 'n8n',
    },
    {
      id: 'ai-gap-automation-5',
      title: 'Microsoft — Responsible AI',
      description: 'Guidance for placing human oversight and explicit controls around AI actions inside workflows.',
      url: 'https://learn.microsoft.com/en-us/agents/center-of-excellence/responsible-ai',
      type: 'docs', free: true, source: 'Microsoft Learn',
    },
  ],
  'ai-agents': [
    {
      id: 'ai-gap-agents-2',
      title: 'Microsoft — Responsible AI for Agents',
      description: 'Guidance on defining agent responsibilities, data boundaries, accountability, and human oversight.',
      url: 'https://learn.microsoft.com/en-us/agents/design-guidelines/responsible-ai',
      type: 'docs', free: true, source: 'Microsoft Learn',
    },
    {
      id: 'ai-gap-agents-3',
      title: 'Microsoft — Responsible AI',
      description: 'Production-oriented guidance for explicit controls, monitoring, human review, and release gates around agents.',
      url: 'https://learn.microsoft.com/en-us/agents/center-of-excellence/responsible-ai',
      type: 'docs', free: true, source: 'Microsoft Learn',
    },
    {
      id: 'ai-gap-agents-4',
      title: 'OpenAI API — Evals',
      description: 'Official reference for creating repeatable evaluations and measuring application behavior instead of judging an agent from one successful run.',
      url: 'https://platform.openai.com/docs/api-reference/evals',
      type: 'docs', free: true, source: 'OpenAI',
    },
  ],
  'ai-engineering': [
    {
      id: 'ai-gap-engineering-1',
      title: 'OpenAI API Documentation',
      description: 'Official API reference for understanding model capabilities and matching API behavior to application requirements.',
      url: 'https://platform.openai.com/docs',
      type: 'docs', free: true, source: 'OpenAI',
    },
    {
      id: 'ai-gap-engineering-2',
      title: 'OpenAI API — Structured Outputs',
      description: 'Official documentation for schema-constrained output, useful when reliability depends on predictable machine-readable responses.',
      url: 'https://platform.openai.com/docs/guides/structured-outputs',
      type: 'docs', free: true, source: 'OpenAI',
    },
    {
      id: 'ai-gap-engineering-3',
      title: 'LangChain Documentation — Retrieval',
      description: 'Open documentation for retrieval patterns and application workflows that support retrieval-augmented systems.',
      url: 'https://docs.langchain.com/oss/python/langchain/overview',
      type: 'docs', free: true, source: 'LangChain',
    },
    {
      id: 'ai-gap-engineering-4',
      title: 'OpenAI API — Evals',
      description: 'Official reference for repeatable evaluation runs and comparing AI application behavior over time.',
      url: 'https://platform.openai.com/docs/api-reference/evals',
      type: 'docs', free: true, source: 'OpenAI',
    },
  ],
  'ai-design': [
    {
      id: 'ai-gap-design-1',
      title: 'Canva Design School',
      description: 'Free design education for visual hierarchy, composition, and communication fundamentals before introducing AI into the workflow.',
      url: 'https://www.canva.com/design-school/courses/',
      type: 'docs', free: true, source: 'Canva Design School',
    },
    {
      id: 'ai-gap-design-2',
      title: 'Figma Help Center',
      description: 'Official documentation for components, variables, and design-system workflows that support disciplined UI evaluation and refinement.',
      url: 'https://help.figma.com/',
      type: 'docs', free: true, source: 'Figma',
    },
    {
      id: 'ai-gap-design-3',
      title: 'Canva Design School',
      description: 'Free design fundamentals for evaluating composition, consistency, hierarchy, and communication quality in generated concepts.',
      url: 'https://www.canva.com/design-school/courses/',
      type: 'docs', free: true, source: 'Canva Design School',
    },
  ],
}

export function getAIInstructionalGapResources(trackId: string, stageId: number): Resource[] {
  const resources = AI_INSTRUCTIONAL_GAP_RESOURCES[trackId] ?? []
  return resources.filter((resource) => resource.id.endsWith(`-${stageId}`))
}
