export type AIResourceStatus = 'verified'
export type AIResourceType = 'docs' | 'video' | 'course' | 'tool'

export interface AIResourceAuditEntry {
  id: string
  trackId: string
  url: string
  provider: string
  free: true
  competency: string
  stage: number
  type: AIResourceType
  status: AIResourceStatus
  lastChecked: string
  notes?: string
}

/** Canonical Phase 7 registry for external AI learning resources. */
export const AI_RESOURCE_REGISTRY: Record<string, AIResourceAuditEntry> = {
  'ai-f1-ms-generative-ai': {
    id: 'ai-f1-ms-generative-ai', trackId: 'ai-foundations',
    url: 'https://learn.microsoft.com/en-us/training/modules/intro-generative-ai-explore-basics/',
    provider: 'Microsoft Learn', free: true,
    competency: 'Explain generative AI, understand LLMs, compare model approaches, and apply critical thinking.', stage: 1, type: 'course', status: 'verified', lastChecked: '2026-08-26'
  },
  'ai-f3-openai-prompting': {
    id: 'ai-f3-openai-prompting', trackId: 'ai-foundations',
    url: 'https://academy.openai.com/en/public/clubs/work-users-ynjqu/resources/prompting',
    provider: 'OpenAI Academy', free: true,
    competency: 'Write clear AI instructions using task definition, context, output requirements, and iteration.', stage: 3, type: 'course', status: 'verified', lastChecked: '2026-08-26'
  },
  'ai-f5-openai-evals': {
    id: 'ai-f5-openai-evals', trackId: 'ai-foundations',
    url: 'https://platform.openai.com/docs/guides/evals',
    provider: 'OpenAI', free: true,
    competency: 'Create repeatable evaluations and inspect AI behavior against explicit testing criteria.', stage: 5, type: 'docs', status: 'verified', lastChecked: '2026-08-26'
  },
  'ai-w1-openai-getting-started': {
    id: 'ai-w1-openai-getting-started', trackId: 'ai-work', url: 'https://openai.com/academy/getting-started/', provider: 'OpenAI Academy', free: true,
    competency: 'Identify practical AI use cases and begin a task with deliberate instructions.', stage: 1, type: 'course', status: 'verified', lastChecked: '2026-08-26'
  },
  'ai-w3-ms-prompting-agents': {
    id: 'ai-w3-ms-prompting-agents', trackId: 'ai-work', url: 'https://learn.microsoft.com/en-us/training/modules/understand-ai-agents-prompting/', provider: 'Microsoft Learn', free: true,
    competency: 'Craft effective prompts and use AI deliberately for practical tasks.', stage: 3, type: 'course', status: 'verified', lastChecked: '2026-08-26'
  },
  'ai-w5-ms-responsible-ai': {
    id: 'ai-w5-ms-responsible-ai', trackId: 'ai-work', url: 'https://learn.microsoft.com/en-us/agents/center-of-excellence/responsible-ai', provider: 'Microsoft Learn', free: true,
    competency: 'Apply responsible AI controls including human oversight, accountability, data boundaries, and release gates.', stage: 5, type: 'docs', status: 'verified', lastChecked: '2026-08-26'
  },
  'ai-r1-cornell-strategy': {
    id: 'ai-r1-cornell-strategy', trackId: 'ai-research', url: 'https://guides.library.cornell.edu/SociologyHonorsThesis/strategy', provider: 'Cornell University Library', free: true,
    competency: 'Develop a step-by-step research strategy: define a topic, search, evaluate sources, and cite evidence.', stage: 1, type: 'docs', status: 'verified', lastChecked: '2026-08-26'
  },
  'ai-r3-google-scholar': {
    id: 'ai-r3-google-scholar', trackId: 'ai-research', url: 'https://scholar.google.com/', provider: 'Google Scholar', free: true,
    competency: 'Find scholarly evidence and trace claims toward primary research.', stage: 3, type: 'tool', status: 'verified', lastChecked: '2026-08-26'
  },
  'ai-r3-cornell-evaluate': {
    id: 'ai-r3-cornell-evaluate', trackId: 'ai-research', url: 'https://guides.library.cornell.edu/english1183ac23/evaluate', provider: 'Cornell University Library', free: true,
    competency: 'Critically evaluate authority, evidence, context, and reliability of information sources.', stage: 3, type: 'docs', status: 'verified', lastChecked: '2026-08-26'
  },
  'ai-r5-cornell-strategy': {
    id: 'ai-r5-cornell-strategy', trackId: 'ai-research', url: 'https://guides.library.cornell.edu/SociologyHonorsThesis/strategy', provider: 'Cornell University Library', free: true,
    competency: 'Build a repeatable research workflow from question selection through source evaluation and citation.', stage: 5, type: 'docs', status: 'verified', lastChecked: '2026-08-26'
  },
  'ai-c2-openai-prompting': {
    id: 'ai-c2-openai-prompting', trackId: 'ai-content', url: 'https://academy.openai.com/en/public/clubs/work-users-ynjqu/resources/prompting', provider: 'OpenAI Academy', free: true,
    competency: 'Translate audience, purpose, context, and constraints into effective AI-assisted content instructions.', stage: 2, type: 'course', status: 'verified', lastChecked: '2026-08-26'
  },
  'ai-c3-microsoft-generative-ai': {
    id: 'ai-c3-microsoft-generative-ai', trackId: 'ai-content', url: 'https://www.youtube.com/watch?v=k7HaeJs-N-o', provider: 'Microsoft Developer', free: true,
    competency: 'Understand practical generative-AI workflows and responsible application patterns.', stage: 3, type: 'video', status: 'verified', lastChecked: '2026-08-26'
  },
  'ai-c4-canva-design-school': {
    id: 'ai-c4-canva-design-school', trackId: 'ai-content', url: 'https://www.canva.com/design-school/courses/', provider: 'Canva Design School', free: true,
    competency: 'Apply visual hierarchy, composition, and communication fundamentals to creative direction.', stage: 4, type: 'course', status: 'verified', lastChecked: '2026-08-26'
  },
  'ai-c5-openai-workflows': {
    id: 'ai-c5-openai-workflows', trackId: 'ai-content', url: 'https://openai.com/academy/getting-started/', provider: 'OpenAI Academy', free: true,
    competency: 'Turn recurring AI-assisted content work into a repeatable workflow with explicit review points.', stage: 5, type: 'course', status: 'verified', lastChecked: '2026-08-26'
  },
  'ai-y1-youtube-content': {
    id: 'ai-y1-youtube-content', trackId: 'ai-youtube', url: 'https://support.google.com/youtube/answer/13616340?hl=en', provider: 'YouTube Help', free: true,
    competency: 'Choose sustainable content ideas using audience patterns, content groups, and demand signals.', stage: 1, type: 'docs', status: 'verified', lastChecked: '2026-08-26'
  },
  'ai-y2-youtube-viewers': {
    id: 'ai-y2-youtube-viewers', trackId: 'ai-youtube', url: 'https://support.google.com/youtube/answer/13616337?hl=en', provider: 'YouTube Help', free: true,
    competency: 'Use viewer behavior and content patterns to inform original topic and format decisions.', stage: 2, type: 'docs', status: 'verified', lastChecked: '2026-08-26'
  },
  'ai-y5-youtube-monetization': {
    id: 'ai-y5-youtube-monetization', trackId: 'ai-youtube', url: 'https://support.google.com/youtube/answer/1311392', provider: 'YouTube Help', free: true,
    competency: 'Recognize originality, reused-content, and inauthentic mass-production risks in YouTube publishing.', stage: 5, type: 'docs', status: 'verified', lastChecked: '2026-08-26'
  },
  'ai-y6-youtube-disclosure': {
    id: 'ai-y6-youtube-disclosure', trackId: 'ai-youtube', url: 'https://support.google.com/youtube/answer/14328491', provider: 'YouTube Help', free: true,
    competency: 'Apply current disclosure requirements to realistic AI-generated or meaningfully altered content.', stage: 6, type: 'docs', status: 'verified', lastChecked: '2026-08-26'
  },
  'ai-y7-youtube-analytics': {
    id: 'ai-y7-youtube-analytics', trackId: 'ai-youtube', url: 'https://support.google.com/youtube/answer/9314416?hl=en', provider: 'YouTube Help', free: true,
    competency: 'Interpret audience analytics and form evidence-based content hypotheses.', stage: 7, type: 'docs', status: 'verified', lastChecked: '2026-08-26'
  },
  'ai-y6-youtube-thumbnails': {
    id: 'ai-y6-youtube-thumbnails', trackId: 'ai-youtube', url: 'https://support.google.com/youtube/answer/12340300?hl=en', provider: 'YouTube Help', free: true,
    competency: 'Create accurate titles and thumbnails that align audience expectations with the video promise.', stage: 6, type: 'docs', status: 'verified', lastChecked: '2026-08-26'
  },
  'ai-s1-github-copilot': {
    id: 'ai-s1-github-copilot', trackId: 'ai-software-development', url: 'https://docs.github.com/en/copilot', provider: 'GitHub Docs', free: true,
    competency: 'Understand AI-assisted coding workflows and where coding agents fit in software development.', stage: 1, type: 'docs', status: 'verified', lastChecked: '2026-08-26'
  },
  'ai-s5-github-code-review': {
    id: 'ai-s5-github-code-review', trackId: 'ai-software-development', url: 'https://docs.github.com/en/copilot/concepts/agents/code-review', provider: 'GitHub Docs', free: true,
    competency: 'Review AI-assisted code changes and identify issues before accepting them.', stage: 5, type: 'docs', status: 'verified', lastChecked: '2026-08-26'
  },
  'ai-s5-github-custom-review': {
    id: 'ai-s5-github-custom-review', trackId: 'ai-software-development', url: 'https://docs.github.com/en/copilot/tutorials/customize-code-review', provider: 'GitHub Docs', free: true,
    competency: 'Define repository-level and path-specific review instructions for coding standards, testing, and security.', stage: 5, type: 'docs', status: 'verified', lastChecked: '2026-08-26'
  },
  'ai-a2-n8n-docs': {
    id: 'ai-a2-n8n-docs', trackId: 'ai-automation', url: 'https://docs.n8n.io/', provider: 'n8n', free: true,
    competency: 'Design workflows with triggers, nodes, integrations, credentials, data handoffs, and recovery paths.', stage: 2, type: 'docs', status: 'verified', lastChecked: '2026-08-26'
  },
  'ai-a4-n8n-error-handling': {
    id: 'ai-a4-n8n-error-handling', trackId: 'ai-automation', url: 'https://docs.n8n.io/flow-logic/error-handling/', provider: 'n8n', free: true,
    competency: 'Design explicit error handling, retries, and failure workflows instead of assuming the happy path.', stage: 4, type: 'docs', status: 'verified', lastChecked: '2026-08-26'
  },
  'ai-a5-ms-responsible-ai': {
    id: 'ai-a5-ms-responsible-ai', trackId: 'ai-automation', url: 'https://learn.microsoft.com/en-us/agents/center-of-excellence/responsible-ai', provider: 'Microsoft Learn', free: true,
    competency: 'Place human oversight and explicit controls around AI actions inside automations.', stage: 5, type: 'docs', status: 'verified', lastChecked: '2026-08-26'
  },
  'ai-ag4-ms-responsible-ai': {
    id: 'ai-ag4-ms-responsible-ai', trackId: 'ai-agents', url: 'https://learn.microsoft.com/en-us/agents/design-guidelines/responsible-ai', provider: 'Microsoft Learn', free: true,
    competency: 'Design responsible agent boundaries, data controls, accountability, and human oversight.', stage: 4, type: 'docs', status: 'verified', lastChecked: '2026-08-26'
  },
  'ai-ag7-openai-evals': {
    id: 'ai-ag7-openai-evals', trackId: 'ai-agents', url: 'https://platform.openai.com/docs/guides/evals', provider: 'OpenAI', free: true,
    competency: 'Evaluate agent behavior with repeatable test cases and explicit expected outcomes.', stage: 7, type: 'docs', status: 'verified', lastChecked: '2026-08-26'
  },
  'ai-e1-openai-api': {
    id: 'ai-e1-openai-api', trackId: 'ai-engineering', url: 'https://platform.openai.com/docs', provider: 'OpenAI', free: true,
    competency: 'Use official API concepts and interfaces to integrate AI models into software.', stage: 1, type: 'docs', status: 'verified', lastChecked: '2026-08-26', notes: 'Current OpenAI docs redirect to developers.openai.com/api/docs.'
  },
  'ai-e3-openai-structured': {
    id: 'ai-e3-openai-structured', trackId: 'ai-engineering', url: 'https://platform.openai.com/docs/guides/structured-outputs', provider: 'OpenAI', free: true,
    competency: 'Constrain model responses to predictable machine-readable schemas and validate failures.', stage: 3, type: 'docs', status: 'verified', lastChecked: '2026-08-26', notes: 'Current URL redirects to developers.openai.com/api/docs/guides/structured-outputs.'
  },
  'ai-e4-langchain-retrieval': {
    id: 'ai-e4-langchain-retrieval', trackId: 'ai-engineering', url: 'https://docs.langchain.com/oss/python/langchain/overview', provider: 'LangChain', free: true,
    competency: 'Understand application patterns for models, retrieval, tools, and AI workflows.', stage: 4, type: 'docs', status: 'verified', lastChecked: '2026-08-26'
  },
  'ai-e8-openai-evals': {
    id: 'ai-e8-openai-evals', trackId: 'ai-engineering', url: 'https://platform.openai.com/docs/guides/evals', provider: 'OpenAI', free: true,
    competency: 'Create repeatable AI evaluation runs for application quality and regression testing.', stage: 8, type: 'docs', status: 'verified', lastChecked: '2026-08-26'
  },
  'ai-d2-figma-help': {
    id: 'ai-d2-figma-help', trackId: 'ai-design', url: 'https://help.figma.com/', provider: 'Figma', free: true,
    competency: 'Use Figma components, variables, and design-system workflows to create and evaluate coherent interfaces.', stage: 2, type: 'docs', status: 'verified', lastChecked: '2026-08-26'
  },
  'ai-d3-canva-design-school': {
    id: 'ai-d3-canva-design-school', trackId: 'ai-design', url: 'https://www.canva.com/design-school/courses/', provider: 'Canva Design School', free: true,
    competency: 'Strengthen composition, hierarchy, and visual communication when refining AI-assisted creative output.', stage: 3, type: 'course', status: 'verified', lastChecked: '2026-08-26'
  },
  'ai-ag8': {
    id: 'ai-ag8', trackId: 'ai-agents',
    url: 'https://developers.openai.com/tracks/building-agents',
    provider: 'OpenAI Developers', free: true,
    competency: 'Choose between workflow and agent designs, and understand the components and tradeoffs of agentic applications.', stage: 2, type: 'docs', status: 'verified', lastChecked: '2026-10-28'
  },
  'ai-ag9': {
    id: 'ai-ag9', trackId: 'ai-agents',
    url: 'https://developers.openai.com/api/docs/guides/agents/sdk',
    provider: 'OpenAI Developers', free: true,
    competency: 'Define agents and understand the runtime loop, state, tools, and handoff primitives.', stage: 3, type: 'docs', status: 'verified', lastChecked: '2026-10-28'
  },
  'ai-ag10': {
    id: 'ai-ag10', trackId: 'ai-agents',
    url: 'https://developers.openai.com/api/docs/guides/function-calling',
    provider: 'OpenAI Developers', free: true,
    competency: 'Define tool schemas and follow the request, validation, execution, and tool-result lifecycle.', stage: 4, type: 'docs', status: 'verified', lastChecked: '2026-10-28'
  },
  'ai-ag11': {
    id: 'ai-ag11', trackId: 'ai-agents',
    url: 'https://developers.openai.com/api/docs/guides/conversation-state',
    provider: 'OpenAI Developers', free: true,
    competency: 'Choose state-management patterns and separate current task context from durable memory.', stage: 5, type: 'docs', status: 'verified', lastChecked: '2026-10-28'
  },
  'ai-ag12': {
    id: 'ai-ag12', trackId: 'ai-agents',
    url: 'https://developers.openai.com/api/docs/guides/agents/guardrails-approvals',
    provider: 'OpenAI Developers', free: true,
    competency: 'Validate agent inputs, outputs, and tool behavior and handle a failed check safely.', stage: 6, type: 'docs', status: 'verified', lastChecked: '2026-10-28'
  },
  'ai-ag13': {
    id: 'ai-ag13', trackId: 'ai-agents',
    url: 'https://developers.openai.com/api/docs/guides/agents/integrations-observability',
    provider: 'OpenAI Developers', free: true,
    competency: 'Inspect traces for tool calls, handoffs, guardrails, timing, and runtime failures.', stage: 7, type: 'docs', status: 'verified', lastChecked: '2026-10-28'
  },
  'ai-ag14': {
    id: 'ai-ag14', trackId: 'ai-agents',
    url: 'https://developers.openai.com/api/docs/guides/agents/guardrails-approvals',
    provider: 'OpenAI Developers', free: true,
    competency: 'Pause sensitive operations for human review and resume or reject the exact pending action.', stage: 8, type: 'docs', status: 'verified', lastChecked: '2026-10-28'
  },
  'ai-ag15': {
    id: 'ai-ag15', trackId: 'ai-agents',
    url: 'https://developers.openai.com/api/docs/guides/agent-evals',
    provider: 'OpenAI Developers', free: true,
    competency: 'Create representative agent evaluation cases and use traces to diagnose regressions.', stage: 9, type: 'docs', status: 'verified', lastChecked: '2026-10-28'
  },
  'ai-ag16': {
    id: 'ai-ag16', trackId: 'ai-agents',
    url: 'https://developers.openai.com/api/docs/guides/agents/orchestration',
    provider: 'OpenAI Developers', free: true,
    competency: 'Compare manager-with-tools and handoff designs and decide when multiple agents justify their cost.', stage: 10, type: 'docs', status: 'verified', lastChecked: '2026-10-28'
  },
  'ai-e10': {
    id: 'ai-e10', trackId: 'ai-engineering',
    url: 'https://developers.openai.com/api/docs/guides/model-selection',
    provider: 'OpenAI Developers', free: true,
    competency: 'Select models based on measured task quality, capability, latency, and cost.', stage: 2, type: 'docs', status: 'verified', lastChecked: '2026-10-28'
  },
  'ai-e11': {
    id: 'ai-e11', trackId: 'ai-engineering',
    url: 'https://developers.openai.com/api/docs/guides/structured-outputs',
    provider: 'OpenAI Developers', free: true,
    competency: 'Constrain model output to a schema and distinguish syntactic validity from semantic correctness.', stage: 3, type: 'docs', status: 'verified', lastChecked: '2026-10-28'
  },
  'ai-e12': {
    id: 'ai-e12', trackId: 'ai-engineering',
    url: 'https://developers.openai.com/api/docs/guides/embeddings',
    provider: 'OpenAI Developers', free: true,
    competency: 'Understand vector embeddings and where semantic similarity is useful.', stage: 4, type: 'docs', status: 'verified', lastChecked: '2026-10-28'
  },
  'ai-e13': {
    id: 'ai-e13', trackId: 'ai-engineering',
    url: 'https://developers.openai.com/api/docs/guides/retrieval',
    provider: 'OpenAI Developers', free: true,
    competency: 'Design retrieval with vector stores, chunking, ranking, and relevance diagnostics.', stage: 5, type: 'docs', status: 'verified', lastChecked: '2026-10-28'
  },
  'ai-e14': {
    id: 'ai-e14', trackId: 'ai-engineering',
    url: 'https://developers.openai.com/api/docs/guides/tools-file-search',
    provider: 'OpenAI Developers', free: true,
    competency: 'Use file search for knowledge retrieval and inspect the inputs used to ground generated answers.', stage: 6, type: 'docs', status: 'verified', lastChecked: '2026-10-28'
  },
  'ai-e15': {
    id: 'ai-e15', trackId: 'ai-engineering',
    url: 'https://learn.microsoft.com/en-us/azure/search/hybrid-search-overview',
    provider: 'Microsoft Learn', free: true,
    competency: 'Explain how keyword and vector retrieval can be combined and evaluated.', stage: 7, type: 'docs', status: 'verified', lastChecked: '2026-10-28'
  },
  'ai-e16': {
    id: 'ai-e16', trackId: 'ai-engineering',
    url: 'https://www.promptfoo.dev/docs/intro/',
    provider: 'Promptfoo', free: true,
    competency: 'Create repeatable model and prompt tests, inspect outputs, and prevent regressions.', stage: 8, type: 'docs', status: 'verified', lastChecked: '2026-10-28'
  },
  'ai-e17': {
    id: 'ai-e17', trackId: 'ai-engineering',
    url: 'https://developers.openai.com/api/docs/guides/cost-optimization',
    provider: 'OpenAI Developers', free: true,
    competency: 'Measure and reduce unnecessary model requests, tokens, and costs while preserving quality.', stage: 9, type: 'docs', status: 'verified', lastChecked: '2026-10-28'
  },
  'ai-e18': {
    id: 'ai-e18', trackId: 'ai-engineering',
    url: 'https://developers.openai.com/api/docs/guides/deployment-checklist',
    provider: 'OpenAI Developers', free: true,
    competency: 'Check security, model choice, evaluation, monitoring, latency, cost, and reliability before deployment.', stage: 10, type: 'docs', status: 'verified', lastChecked: '2026-10-28'
  },
  'ai-e19': {
    id: 'ai-e19', trackId: 'ai-engineering',
    url: 'https://developers.openai.com/api/docs',
    provider: 'OpenAI Developers', free: true,
    competency: 'Navigate the API documentation for integrating model calls, tools, and structured responses.', stage: 1, type: 'docs', status: 'verified', lastChecked: '2026-10-28'
  },
  'ai-ag17': {
    id: 'ai-ag17', trackId: 'ai-agents',
    url: 'https://developers.openai.com/tracks/building-agents',
    provider: 'OpenAI Developers', free: true,
    competency: 'Understand the purpose of agents and map the learning sequence from core concepts to tools, guardrails, and evaluation.', stage: 1, type: 'docs', status: 'verified', lastChecked: '2026-10-28'
  },
}

export function getAIResourceAuditsForStage(trackId: string, stage: number): AIResourceAuditEntry[] {
  return Object.values(AI_RESOURCE_REGISTRY).filter((entry) => entry.trackId === trackId && entry.stage === stage)
}

export function getAIResourceAudit(id: string): AIResourceAuditEntry | null {
  return AI_RESOURCE_REGISTRY[id] ?? null
}

export function getAIResourceRegistryEntries(): AIResourceAuditEntry[] {
  return Object.values(AI_RESOURCE_REGISTRY)
}

export function assertAIResourceRegistry(): void {
  const ids = new Set<string>()
  for (const entry of Object.values(AI_RESOURCE_REGISTRY)) {
    if (ids.has(entry.id)) throw new Error(`Duplicate AI resource audit id: ${entry.id}`)
    ids.add(entry.id)
    if (!entry.url.startsWith('https://')) throw new Error(`AI resource must use HTTPS: ${entry.id}`)
    if (!entry.provider || !entry.competency || !entry.stage || !entry.type || !entry.status || !entry.lastChecked) throw new Error(`Incomplete AI resource audit entry: ${entry.id}`)
    if (entry.free !== true || entry.status !== 'verified') throw new Error(`Non-deployable resource in canonical AI registry: ${entry.id}`)
  }
}
