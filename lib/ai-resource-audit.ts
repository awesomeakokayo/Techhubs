export interface AIResourceAuditEntry {
  resourceId: string
  verifiedUrl: string
  provider: string
  free: boolean
  includeInGuidedPath: boolean
  rationale: string
}

/**
 * Resource QA layer for AI curriculum. URLs here are intentionally limited to
 * resources whose public learning material is free to access. Paid-only tool
 * features are not prerequisites for completing the curriculum.
 */
export const AI_RESOURCE_AUDIT: Record<string, AIResourceAuditEntry> = {
  'ai-f8': { resourceId: 'ai-f8', verifiedUrl: 'https://academy.openai.com/public/courses/ai-foundations-juzjs?autoEnroll=true', provider: 'OpenAI Academy', free: true, includeInGuidedPath: true, rationale: 'OpenAI currently describes Academy courses as free, self-paced, and globally available to people with a ChatGPT account.' },
  'ai-f9': { resourceId: 'ai-f9', verifiedUrl: 'https://learn.microsoft.com/en-us/training/modules/intro-generative-ai-explore-basics/', provider: 'Microsoft Learn', free: true, includeInGuidedPath: true, rationale: 'Current beginner module with an assessment and learning objectives covering generative AI, LLMs, model comparison, critical thinking, and responsible use.' },
  'ai-f10': { resourceId: 'ai-f10', verifiedUrl: 'https://www.youtube.com/watch?v=k7HaeJs-N-o', provider: 'Microsoft Developer', free: true, includeInGuidedPath: true, rationale: 'Official Microsoft Developer 18-lesson Generative AI for Beginners series; the playlist/video URL is publicly accessible.' },
  'ai-f11': { resourceId: 'ai-f11', verifiedUrl: 'https://www.youtube.com/watch?v=aircAruvnKk', provider: '3Blue1Brown', free: true, includeInGuidedPath: true, rationale: 'Public educational video providing a visual conceptual explanation of neural networks.' },
  'ai-w4': { resourceId: 'ai-w4', verifiedUrl: 'https://openai.com/academy/getting-started/', provider: 'OpenAI Academy', free: true, includeInGuidedPath: true, rationale: 'Current official guide covering prompting, tools, files, search, and practical workflows.' },
  'ai-w5': { resourceId: 'ai-w5', verifiedUrl: 'https://openai.com/academy/getting-started/', provider: 'OpenAI Academy', free: true, includeInGuidedPath: true, rationale: 'Use the current official getting-started guide instead of a stale or undocumented guide URL.' },
  'ai-w6': { resourceId: 'ai-w6', verifiedUrl: 'https://learn.microsoft.com/en-us/training/modules/intro-generative-ai-explore-basics/', provider: 'Microsoft Learn', free: true, includeInGuidedPath: true, rationale: 'Verified free module used as the current general-purpose AI critical-thinking reinforcement.' },
  'ai-r3': { resourceId: 'ai-r3', verifiedUrl: 'https://openai.com/academy/what-is-ai/', provider: 'OpenAI Academy', free: true, includeInGuidedPath: true, rationale: 'Current official AI fundamentals article covering models, capabilities, limitations, and responsible use.' },
  'ai-r4': { resourceId: 'ai-r4', verifiedUrl: 'https://scholar.google.com/', provider: 'Google Scholar', free: true, includeInGuidedPath: true, rationale: 'Public search service used to locate academic sources.' },
  'ai-r5': { resourceId: 'ai-r5', verifiedUrl: 'https://learn.microsoft.com/en-us/training/browse/', provider: 'Microsoft Learn', free: true, includeInGuidedPath: true, rationale: 'Use the current training catalogue rather than a generic stale search URL.' },
  'ai-c3': { resourceId: 'ai-c3', verifiedUrl: 'https://academy.openai.com/pages/courses', provider: 'OpenAI Academy', free: true, includeInGuidedPath: true, rationale: 'Current Academy course index explicitly lists Applied AI Foundations as a free course.' },
  'ai-c4': { resourceId: 'ai-c4', verifiedUrl: 'https://www.canva.com/design-school/courses/', provider: 'Canva Design School', free: true, includeInGuidedPath: true, rationale: 'Current Design School course catalogue includes free beginner courses and activities.' },
  'ai-c5': { resourceId: 'ai-c5', verifiedUrl: 'https://www.youtube.com/watch?v=k7HaeJs-N-o', provider: 'Microsoft Developer', free: true, includeInGuidedPath: true, rationale: 'Public Microsoft Developer training series.' },
  'ai-y3': { resourceId: 'ai-y3', verifiedUrl: 'https://creatoracademy.youtube.com/page/lesson/using-analytics', provider: 'YouTube Creator Academy', free: true, includeInGuidedPath: true, rationale: 'Official creator analytics lesson covering channel performance metrics and interpretation.' },
  'ai-y4': { resourceId: 'ai-y4', verifiedUrl: 'https://support.google.com/youtube/answer/1311392', provider: 'YouTube', free: true, includeInGuidedPath: true, rationale: 'Current official monetization/originality policy reference.' },
  'ai-y5': { resourceId: 'ai-y5', verifiedUrl: 'https://support.google.com/youtube/answer/14328491', provider: 'YouTube', free: true, includeInGuidedPath: true, rationale: 'Current official altered/synthetic content disclosure guidance.' },
  'ai-y6': { resourceId: 'ai-y6', verifiedUrl: 'https://www.youtube.com/watch?v=k7HaeJs-N-o', provider: 'Microsoft Developer', free: true, includeInGuidedPath: true, rationale: 'Public Microsoft Developer training series.' },
  'ai-s4': { resourceId: 'ai-s4', verifiedUrl: 'https://docs.github.com/en/copilot', provider: 'GitHub', free: true, includeInGuidedPath: true, rationale: 'Public official documentation; product features may vary by plan, so no paid feature is mandatory.' },
  'ai-s5': { resourceId: 'ai-s5', verifiedUrl: 'https://openai.com/academy/', provider: 'OpenAI Academy', free: true, includeInGuidedPath: true, rationale: 'Use current Academy materials rather than relying on a potentially stale Codex-specific URL.' },
  'ai-s6': { resourceId: 'ai-s6', verifiedUrl: 'https://www.anthropic.com/learn/build-with-claude', provider: 'Anthropic', free: true, includeInGuidedPath: true, rationale: 'Current official developer learning hub.' },
  'ai-s7': { resourceId: 'ai-s7', verifiedUrl: 'https://www.youtube.com/watch?v=k7HaeJs-N-o', provider: 'Microsoft Developer', free: true, includeInGuidedPath: true, rationale: 'Public Microsoft Developer training series.' },
  'ai-a4': { resourceId: 'ai-a4', verifiedUrl: 'https://docs.n8n.io/', provider: 'n8n', free: true, includeInGuidedPath: true, rationale: 'Public official documentation.' },
  'ai-a5': { resourceId: 'ai-a5', verifiedUrl: 'https://docs.n8n.io/courses/', provider: 'n8n', free: true, includeInGuidedPath: true, rationale: 'Public official learning catalogue.' },
  'ai-a6': { resourceId: 'ai-a6', verifiedUrl: 'https://learn.microsoft.com/en-us/training/modules/fundamentals-generative-ai/', provider: 'Microsoft Learn', free: true, includeInGuidedPath: true, rationale: 'Current free module covering generative AI and agents.' },
  'ai-ag4': { resourceId: 'ai-ag4', verifiedUrl: 'https://academy.openai.com/pages/courses', provider: 'OpenAI Academy', free: true, includeInGuidedPath: true, rationale: 'Current Academy course index lists Agents and Workflows.' },
  'ai-ag5': { resourceId: 'ai-ag5', verifiedUrl: 'https://learn.microsoft.com/en-us/training/modules/fundamentals-generative-ai/', provider: 'Microsoft Learn', free: true, includeInGuidedPath: true, rationale: 'Current free module with agents concepts and knowledge assessment.' },
  'ai-ag6': { resourceId: 'ai-ag6', verifiedUrl: 'https://learn.microsoft.com/en-us/training/modules/get-started-with-generative-ai-and-agents/', provider: 'Microsoft Learn', free: true, includeInGuidedPath: true, rationale: 'Current hands-on module covering model selection, agent creation, testing, and code integration.' },
  'ai-ag7': { resourceId: 'ai-ag7', verifiedUrl: 'https://www.anthropic.com/learn/build-with-claude', provider: 'Anthropic', free: true, includeInGuidedPath: true, rationale: 'Current official developer courses and resources.' },
  'ai-e5': { resourceId: 'ai-e5', verifiedUrl: 'https://platform.openai.com/docs', provider: 'OpenAI', free: true, includeInGuidedPath: true, rationale: 'Public API documentation; API usage itself may incur cost, so this is reference-only for concepts unless a free/local route is provided.' },
  'ai-e6': { resourceId: 'ai-e6', verifiedUrl: 'https://www.anthropic.com/learn/build-with-claude', provider: 'Anthropic', free: true, includeInGuidedPath: true, rationale: 'Public official learning material; paid API usage is not required for reading the course material.' },
  'ai-e7': { resourceId: 'ai-e7', verifiedUrl: 'https://www.youtube.com/watch?v=k7HaeJs-N-o', provider: 'Microsoft Developer', free: true, includeInGuidedPath: true, rationale: 'Public Microsoft Developer course series.' },
  'ai-e8': { resourceId: 'ai-e8', verifiedUrl: 'https://docs.langchain.com/oss/python/langchain/overview', provider: 'LangChain', free: true, includeInGuidedPath: true, rationale: 'Current LangChain Python documentation replacing the older python.langchain.com path.' },
  'ai-e9': { resourceId: 'ai-e9', verifiedUrl: 'https://learn.microsoft.com/en-us/training/modules/explore-generative-ai/', provider: 'Microsoft Learn', free: true, includeInGuidedPath: true, rationale: 'Current free module with an applied exercise and assessment.' },
  'ai-d3': { resourceId: 'ai-d3', verifiedUrl: 'https://help.figma.com/hc/en-us/articles/24039793359767-Get-started-with-Figma-AI', provider: 'Figma Learn', free: true, includeInGuidedPath: false, rationale: 'The documentation is public, but some Figma AI functionality requires paid plans; it is therefore reference-only and not a required free resource.' },
  'ai-d4': { resourceId: 'ai-d4', verifiedUrl: 'https://www.canva.com/design-school/courses/', provider: 'Canva Design School', free: true, includeInGuidedPath: true, rationale: 'Current public Design School course catalogue.' },
  'ai-d5': { resourceId: 'ai-d5', verifiedUrl: 'https://www.youtube.com/watch?v=k7HaeJs-N-o', provider: 'Microsoft Developer', free: true, includeInGuidedPath: true, rationale: 'Public Microsoft Developer training series.' },
}

export function getVerifiedAIResource(resourceId: string) {
  return AI_RESOURCE_AUDIT[resourceId] ?? null
}
