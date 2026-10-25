import type { Resource } from './tracks'

/**
 * Stage-specific external learning resources researched to close the resource
 * gaps the curriculum-quality audit reported for the AI tracks.
 *
 * Design rules (see docs/curriculum-quality-audit.md):
 *   - One resource per gap stage, chosen for that stage's exact objective — not
 *     a generic "AI" landing page.
 *   - Official documentation, an established university/organisation, or a
 *     recognised educational publisher.
 *   - Free to access as learning material (no trial/paywall gating the taught
 *     content). Some tool features may be paid, but nothing here requires
 *     payment to study the assigned material.
 *   - Every URL was destination- and content-checked on 2026-10-17 (see
 *     `scripts/resource-probe.json` and `lib/resource-verification.ts`).
 *
 * These complement `AI_RESOURCE_EXTENSIONS`, `AI_RESOURCE_REGISTRY` and
 * `AI_INSTRUCTIONAL_GAP_RESOURCES`; `lib/stage-resources.ts` resolves the union
 * so both the served learner path and the audit agree on the resource map.
 */
export const AI_STAGE_RESOURCES: Record<string, Resource[]> = {
  'ai-foundations': [
    {
      id: 'ai-x-foundations-6',
      title: 'Anthropic — Building Effective AI Agents (Workflow Patterns)',
      description:
        'Composable workflow patterns — prompt chaining, routing, and orchestrator/worker designs — that turn ad-hoc prompting into a repeatable, reviewable AI workflow.',
      url: 'https://www.anthropic.com/engineering/building-effective-agents',
      type: 'docs',
      free: true,
      source: 'Anthropic',
    },
  ],
  'ai-work': [
    {
      id: 'ai-x-work-4',
      title: 'Microsoft Learn — Draft, Analyze, and Present with Microsoft Copilot (MS-4018)',
      description:
        'Free Microsoft Learn path covering AI-assisted planning, drafting, analysis, and reporting — the professional planning tasks this stage teaches.',
      url: 'https://learn.microsoft.com/en-us/training/paths/draft-analyze-present-microsoft-365-copilot',
      type: 'docs',
      free: true,
      source: 'Microsoft Learn',
    },
  ],
  'ai-content': [
    {
      id: 'ai-x-content-6',
      title: 'Digital Marketing Institute — Content Repurposing',
      description:
        'A lesson on adapting one strong original asset into multiple formats and channels without diluting quality or copying — the repurposing judgement this stage requires.',
      url: 'https://digitalmarketinginstitute.com/resources/lessons/content-marketing_content-repurposing_ttbC',
      type: 'docs',
      free: true,
      source: 'Digital Marketing Institute',
    },
    {
      id: 'ai-x-content-4',
      title: 'OpenAI — DALL·E 3 (how text-to-image generation works)',
      description:
        'Explains what text-to-image generation can and cannot do and how prompts translate into images — the capabilities and limits this visual-creation stage must understand before using any tool.',
      url: 'https://openai.com/index/dall-e-3/',
      type: 'docs',
      free: true,
      source: 'OpenAI',
    },
    {
      id: 'ai-x-content-6b',
      title: 'Sprout Social — A Marketer\u2019s Guide to Repurposing Content',
      description:
        'Practical, channel-by-channel guidance on recycling one asset into several native formats while keeping each version useful rather than duplicative.',
      url: 'https://sproutsocial.com/insights/repurpose-content/',
      type: 'docs',
      free: true,
      source: 'Sprout Social',
    },
  ],
  'ai-youtube': [
    {
      id: 'ai-x-youtube-8',
      title: 'YouTube Help — Upload YouTube videos',
      description:
        'Official upload guidance covering title, description, visibility, playlists, and scheduling — the publishing workflow this stage teaches.',
      url: 'https://support.google.com/youtube/answer/57407',
      type: 'docs',
      free: true,
      source: 'YouTube Help',
    },
  ],
  'ai-software-development': [
    {
      id: 'ai-x-software-8',
      title: 'GitHub Docs — Responsible Use of GitHub Copilot Features',
      description:
        'Official purpose, capabilities, limitations, and deployer best practices for AI coding features — the team-level standards this stage expects.',
      url: 'https://docs.github.com/en/copilot/responsible-use',
      type: 'docs',
      free: true,
      source: 'GitHub Docs',
    },
  ],
  'ai-automation': [
    {
      id: 'ai-x-automation-1',
      title: 'n8n Docs — Understand Workflows',
      description:
        'Official explanation of workflows, nodes, triggers, and executions — the automation fundamentals this opening stage introduces.',
      url: 'https://docs.n8n.io/workflows/',
      type: 'docs',
      free: true,
      source: 'n8n Docs',
    },
    {
      id: 'ai-x-automation-6',
      title: 'n8n Docs — Work With Data',
      description:
        'How data moves through a workflow, including item structure, references, and transformation — the structured-data reasoning this stage requires.',
      url: 'https://docs.n8n.io/data/',
      type: 'docs',
      free: true,
      source: 'n8n Docs',
    },
    {
      id: 'ai-x-automation-7',
      title: 'n8n Docs — Wait (Human-in-the-Loop)',
      description:
        'Official guidance on pausing a workflow for a human decision or approval before consequential actions — the human-approval pattern this stage teaches.',
      url: 'https://docs.n8n.io/flow-logic/waiting/',
      type: 'docs',
      free: true,
      source: 'n8n Docs',
    },
    {
      id: 'ai-x-automation-8',
      title: 'n8n Docs — Hosting, Logging and Monitoring',
      description:
        'Production hosting guidance covering logs, monitoring, and execution visibility — the observability this reliability stage requires.',
      url: 'https://docs.n8n.io/hosting/logging-monitoring/',
      type: 'docs',
      free: true,
      source: 'n8n Docs',
    },
  ],
  'ai-agents': [
    {
      id: 'ai-x-agents-5',
      title: 'LangGraph — Memory Overview',
      description:
        'Short-term and long-term memory concepts for agent context, including what to store, retrieve, and forget — the context/memory design this stage covers.',
      url: 'https://docs.langchain.com/oss/python/langgraph/memory',
      type: 'docs',
      free: true,
      source: 'LangChain',
    },
    {
      id: 'ai-x-agents-6',
      title: 'LangGraph — Overview (Graphs, Planning and Control Flow)',
      description:
        'How explicit graphs, state, and control flow make agent planning inspectable instead of a single opaque prompt.',
      url: 'https://docs.langchain.com/oss/python/langgraph/overview',
      type: 'docs',
      free: true,
      source: 'LangChain',
    },
    {
      id: 'ai-x-agents-8',
      title: 'Microsoft Learn — Responsible AI in Azure Workloads (Oversight & Guardrails)',
      description:
        'Architecture guidance for human oversight, escalation, guardrails, and independent monitoring of agentic systems — the oversight this stage requires.',
      url: 'https://learn.microsoft.com/en-us/azure/well-architected/ai/responsible-ai',
      type: 'docs',
      free: true,
      source: 'Microsoft Learn',
    },
    {
      id: 'ai-x-agents-9',
      title: 'LangGraph — Testing',
      description:
        'Testing and reliability techniques for agent graphs, including deterministic checks and regression coverage against expected behaviour.',
      url: 'https://docs.langchain.com/oss/python/langgraph/test',
      type: 'docs',
      free: true,
      source: 'LangChain',
    },
  ],
  'ai-engineering': [
    {
      id: 'ai-x-engineering-5',
      title: 'LangChain — Retrieval',
      description:
        'Retrieval concepts and patterns — when to retrieve, how to shape queries, and how retrieved evidence reaches the model — for the retrieval stage.',
      url: 'https://docs.langchain.com/oss/python/langchain/retrieval',
      type: 'docs',
      free: true,
      source: 'LangChain',
    },
    {
      id: 'ai-x-engineering-7',
      title: 'OpenAI — Vector Embeddings',
      description:
        'What embeddings are, how semantic similarity search works, and how vector search supports retrieval — the vector-search fundamentals this stage teaches.',
      url: 'https://platform.openai.com/docs/guides/embeddings',
      type: 'docs',
      free: true,
      source: 'OpenAI',
    },
    {
      id: 'ai-x-engineering-9',
      title: 'OpenAI — Latency Optimization',
      description:
        'Concrete strategies for reducing model latency and cost, including routing, caching, and streaming — the cost/latency trade-offs this stage requires.',
      url: 'https://platform.openai.com/docs/guides/latency-optimization',
      type: 'docs',
      free: true,
      source: 'OpenAI',
    },
    {
      id: 'ai-x-engineering-10',
      title: 'OpenAI — Production Best Practices',
      description:
        'Production guidance on reliability, monitoring, evaluation, and safe rollout for AI features — the deployment requirements this final stage covers.',
      url: 'https://platform.openai.com/docs/guides/production-best-practices',
      type: 'docs',
      free: true,
      source: 'OpenAI',
    },
  ],
  'ai-design': [
    {
      id: 'ai-x-design-1',
      title: 'Interaction Design Foundation — What Is Generative AI?',
      description:
        'A design-oriented explanation of what generative AI is, what it can produce, and where it fits in a design workflow — the grounding this stage needs before using AI to explore design directions.',
      url: 'https://www.interaction-design.org/literature/topics/generative-ai',
      type: 'docs',
      free: true,
      source: 'Interaction Design Foundation',
    },
    {
      id: 'ai-x-design-3',
      title: 'OpenAI — DALL·E 3 (text-to-image generation)',
      description:
        'How a text prompt becomes an image, and the practical limits of image-generation models — the capabilities and constraints this image-generation stage must account for.',
      url: 'https://openai.com/index/dall-e-3/',
      type: 'docs',
      free: true,
      source: 'OpenAI',
    },
    {
      id: 'ai-x-design-4',
      title: 'Nielsen Norman Group — AI Prototyping in Real Design Contexts',
      description:
        'Evidence-based guidance on where AI helps visual exploration (early ideation) and where it fails — the judgement this visual-exploration stage teaches.',
      url: 'https://www.nngroup.com/articles/ai-prototyping',
      type: 'docs',
      free: true,
      source: 'Nielsen Norman Group',
    },
    {
      id: 'ai-x-design-6',
      title: 'Figma Learn — Guide to Prototyping',
      description:
        'Official guide to building interactive prototypes and interactions — the prototyping workflow this stage requires.',
      url: 'https://help.figma.com/hc/en-us/articles/360040314193',
      type: 'docs',
      free: true,
      source: 'Figma Learn',
    },
    {
      id: 'ai-x-design-7',
      title: 'Figma — Design Systems (Consistency and Brand)',
      description:
        'How reusable components, tokens, and guidelines maintain visual consistency and brand across a product — the brand-consistency concern this stage covers.',
      url: 'https://www.figma.com/design-systems',
      type: 'docs',
      free: true,
      source: 'Figma',
    },
    {
      id: 'ai-x-design-8',
      title: 'Nielsen Norman Group — The Core Skill of Design in the AI Era: Critique',
      description:
        'Why human critique and explicit judging criteria are required to evaluate AI-generated design — the human-judgement outcome this stage teaches.',
      url: 'https://www.nngroup.com/articles/ai-era-critique',
      type: 'docs',
      free: true,
      source: 'Nielsen Norman Group',
    },
  ],
}

/** Maps each researched resource id to the stage it supports. */
export const AI_STAGE_RESOURCE_MAP: Record<string, Record<string, number>> = {
  'ai-foundations': { 'ai-x-foundations-6': 6 },
  'ai-work': { 'ai-x-work-4': 4 },
  'ai-content': { 'ai-x-content-4': 4, 'ai-x-content-6': 6, 'ai-x-content-6b': 6 },
  'ai-youtube': { 'ai-x-youtube-8': 8 },
  'ai-software-development': { 'ai-x-software-8': 8 },
  'ai-automation': {
    'ai-x-automation-1': 1,
    'ai-x-automation-6': 6,
    'ai-x-automation-7': 7,
    'ai-x-automation-8': 8,
  },
  'ai-agents': { 'ai-x-agents-5': 5, 'ai-x-agents-6': 6, 'ai-x-agents-8': 8, 'ai-x-agents-9': 9 },
  'ai-engineering': {
    'ai-x-engineering-5': 5,
    'ai-x-engineering-7': 7,
    'ai-x-engineering-9': 9,
    'ai-x-engineering-10': 10,
  },
  'ai-design': {
    'ai-x-design-1': 1,
    'ai-x-design-3': 3,
    'ai-x-design-4': 4,
    'ai-x-design-6': 6,
    'ai-x-design-7': 7,
    'ai-x-design-8': 8,
  },
}

export function getResearchedAIStageResources(trackId: string, stageId: number): Resource[] {
  const resources = AI_STAGE_RESOURCES[trackId] ?? []
  const map = AI_STAGE_RESOURCE_MAP[trackId] ?? {}
  return resources.filter((resource) => map[resource.id] === stageId)
}
