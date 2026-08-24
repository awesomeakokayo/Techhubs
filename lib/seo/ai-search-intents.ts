export interface AISearchIntent {
  id: string
  query: string
  targetPage: string
  roadmap: string
  project: string
  nextSkill: string
  intent: 'educational' | 'roadmap' | 'project' | 'career'
  priority: 'P0' | 'P1' | 'P2'
}

/**
 * Audit map for the AI category. The primary destination is intentionally
 * narrow: each query has one landing page so search pages do not compete with
 * one another.
 */
export const AI_SEARCH_INTENTS: AISearchIntent[] = [
  { id: 'ai-how-to-learn', query: 'how to learn AI', targetPage: '/ai', roadmap: '/roadmaps/ai-foundations', project: '/tracks/ai-foundations', nextSkill: '/tracks/ai-work', intent: 'educational', priority: 'P0' },
  { id: 'ai-use-effectively', query: 'how to use AI effectively', targetPage: '/ai', roadmap: '/roadmaps/ai-work', project: '/tracks/ai-work', nextSkill: '/tracks/ai-research', intent: 'educational', priority: 'P0' },
  { id: 'ai-for-work', query: 'how to use AI for work', targetPage: '/tracks/ai-work', roadmap: '/roadmaps/ai-work', project: '/tracks/ai-work', nextSkill: '/tracks/ai-research', intent: 'educational', priority: 'P0' },
  { id: 'ai-research', query: 'how to use AI for research', targetPage: '/tracks/ai-research', roadmap: '/roadmaps/ai-research', project: '/tracks/ai-research', nextSkill: '/tracks/ai-engineering', intent: 'educational', priority: 'P0' },
  { id: 'ai-verify', query: 'how to verify AI answers', targetPage: '/tracks/ai-research', roadmap: '/roadmaps/ai-research', project: '/tracks/ai-research', nextSkill: '/tracks/ai-work', intent: 'educational', priority: 'P0' },
  { id: 'ai-build-software', query: 'how to build software with AI', targetPage: '/tracks/ai-software-development', roadmap: '/roadmaps/ai-software-development', project: '/tracks/ai-software-development', nextSkill: '/tracks/frontend-development', intent: 'educational', priority: 'P0' },
  { id: 'ai-coding', query: 'AI coding for beginners', targetPage: '/tracks/ai-software-development', roadmap: '/roadmaps/ai-software-development', project: '/tracks/ai-software-development', nextSkill: '/tracks/frontend-development', intent: 'educational', priority: 'P0' },
  { id: 'ai-video', query: 'how to create videos with AI', targetPage: '/tracks/ai-youtube', roadmap: '/roadmaps/ai-youtube', project: '/tracks/ai-youtube', nextSkill: '/tracks/video-editing', intent: 'educational', priority: 'P1' },
  { id: 'ai-youtube', query: 'how to use AI for YouTube', targetPage: '/tracks/ai-youtube', roadmap: '/roadmaps/ai-youtube', project: '/tracks/ai-youtube', nextSkill: '/tracks/youtube-automation', intent: 'educational', priority: 'P0' },
  { id: 'ai-youtube-automation', query: 'YouTube automation with AI', targetPage: '/tracks/ai-youtube', roadmap: '/roadmaps/ai-youtube', project: '/tracks/ai-youtube', nextSkill: '/tracks/youtube-automation', intent: 'educational', priority: 'P0' },
  { id: 'ai-automation', query: 'AI automation for beginners', targetPage: '/tracks/ai-automation', roadmap: '/roadmaps/ai-automation', project: '/tracks/ai-automation', nextSkill: '/tracks/ai-agents', intent: 'educational', priority: 'P0' },
  { id: 'ai-agents', query: 'how to build AI agents', targetPage: '/tracks/ai-agents', roadmap: '/roadmaps/ai-agents', project: '/tracks/ai-agents', nextSkill: '/tracks/ai-engineering', intent: 'educational', priority: 'P0' },
  { id: 'ai-engineering', query: 'AI engineering roadmap', targetPage: '/tracks/ai-engineering', roadmap: '/roadmaps/ai-engineering', project: '/tracks/ai-engineering', nextSkill: '/tracks/backend-development', intent: 'roadmap', priority: 'P0' },
  { id: 'ai-rag', query: 'how to build a RAG application', targetPage: '/tracks/ai-engineering', roadmap: '/roadmaps/ai-engineering', project: '/tracks/ai-engineering', nextSkill: '/tracks/backend-development', intent: 'project', priority: 'P1' },
  { id: 'ai-design', query: 'how to design with AI', targetPage: '/tracks/ai-design', roadmap: '/roadmaps/ai-design', project: '/tracks/ai-design', nextSkill: '/tracks/ui-ux-design', intent: 'educational', priority: 'P1' },
  { id: 'ai-career', query: 'AI skills to learn for work', targetPage: '/ai', roadmap: '/roadmaps/ai-foundations', project: '/tracks/ai-foundations', nextSkill: '/careers/ai-engineer', intent: 'career', priority: 'P1' },
]

export function getAISearchIntentForQuery(query: string): AISearchIntent | null {
  const normalized = query.trim().toLowerCase()
  return AISearchIntents.find((intent) => intent.query.toLowerCase() === normalized) ?? null
}
