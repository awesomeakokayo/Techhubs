/**
 * Search-intent data model + search-to-page matrix.
 *
 * This is the internal content-strategy backbone. It maps the queries
 * learners actually search to the ONE primary TechSkillHub landing page,
 * its supporting pages, the primary CTA and the learning funnel each intent
 * should enter. It is not a keyword-stuffing list and is not user-visible.
 */

export type SearchIntentType =
  | 'informational'
  | 'educational'
  | 'roadmap'
  | 'project'
  | 'career'
  | 'resource'
  | 'discovery'

export type SearchIntentPriority = 'P0' | 'P1' | 'P2' | 'P3'
export type SearchIntentStatus = 'mapped' | 'gap'

export interface SearchIntent {
  id: string
  /** Example query (one representative query per intent). */
  query: string
  intent: SearchIntentType
  cluster: string
  subcluster?: string
  /** The single page that should win this intent. */
  targetPage: string
  /** Pages that support (not compete with) the target page. */
  supportingPages: string[]
  primaryCta: string
  /** Roadmap that continues this intent's learning journey when applicable. */
  roadmap?: string
  project?: string
  primaryTopic: string
  audience: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  productGoal: string
  priority: SearchIntentPriority
  status: SearchIntentStatus
  notes?: string
}

export const SEARCH_INTENTS: SearchIntent[] = [
  // --- Cluster: Starting coding ---
  {
    id: 'learn-coding',
    query: 'how to learn coding',
    intent: 'educational',
    cluster: 'starting-coding',
    targetPage: '/guides/how-to-learn-coding',
    supportingPages: ['/roadmaps', '/start', '/roadmaps/python-development', '/roadmaps/javascript', '/roadmaps/frontend-development'],
    primaryCta: 'Start the roadmap',
    roadmap: '/roadmaps/python-development',
    project: '/projects/beginner',
    primaryTopic: 'learning to code from scratch',
    audience: 'complete beginners',
    difficulty: 'beginner',
    productGoal: 'guide → roadmap → project',
    priority: 'P0',
    status: 'mapped',
  },
  {
    id: 'get-into-tech',
    query: 'how to get into tech',
    intent: 'career',
    cluster: 'career-transition',
    targetPage: '/guides/how-to-get-into-tech',
    supportingPages: ['/careers', '/guides/how-to-get-your-first-tech-job', '/roadmaps/frontend-development', '/start'],
    primaryCta: 'Find your path',
    roadmap: '/roadmaps/frontend-development',
    project: '/projects/beginner',
    primaryTopic: 'entering tech without a degree',
    audience: 'career switchers',
    difficulty: 'beginner',
    productGoal: 'guide → start → roadmap',
    priority: 'P0',
    status: 'mapped',
    notes: 'Dedicated guide added in this stage; previously only covered by how-to-learn-coding.',
  },

  // --- Cluster: Web development ---
  {
    id: 'learn-web-dev',
    query: 'how to learn web development',
    intent: 'educational',
    cluster: 'web-development',
    targetPage: '/guides/how-to-learn-web-development',
    supportingPages: ['/roadmaps/frontend-development', '/roadmaps/backend-development', '/projects/beginner'],
    primaryCta: 'Start the web roadmap',
    roadmap: '/roadmaps/frontend-development',
    project: '/projects/beginner',
    primaryTopic: 'web development from zero',
    audience: 'complete beginners',
    difficulty: 'beginner',
    productGoal: 'guide → frontend roadmap → projects',
    priority: 'P0',
    status: 'mapped',
  },
  {
    id: 'web-dev-roadmap',
    query: 'web development roadmap',
    intent: 'roadmap',
    cluster: 'web-development',
    targetPage: '/roadmaps/frontend-development',
    supportingPages: ['/roadmaps/backend-development', '/guides/how-to-learn-web-development', '/start'],
    primaryCta: 'Start this roadmap',
    roadmap: '/roadmaps/frontend-development',
    project: '/projects/beginner',
    primaryTopic: 'web development learning order',
    audience: 'self-directed learners',
    difficulty: 'beginner',
    productGoal: 'roadmap → track → project',
    priority: 'P0',
    status: 'mapped',
  },
  {
    id: 'frontend-roadmap',
    query: 'frontend developer roadmap',
    intent: 'roadmap',
    cluster: 'frontend-development',
    targetPage: '/roadmaps/frontend-development',
    supportingPages: ['/careers/frontend-developer', '/guides/how-to-become-a-frontend-developer', '/guides/how-to-learn-javascript', '/projects/beginner'],
    primaryCta: 'Start the frontend roadmap',
    roadmap: '/roadmaps/frontend-development',
    project: '/projects/beginner',
    primaryTopic: 'frontend developer skills in order',
    audience: 'web beginners and career switchers',
    difficulty: 'beginner',
    productGoal: 'roadmap → track → portfolio',
    priority: 'P0',
    status: 'mapped',
  },
  {
    id: 'backend-roadmap',
    query: 'backend developer roadmap',
    intent: 'roadmap',
    cluster: 'backend-development',
    targetPage: '/roadmaps/backend-development',
    supportingPages: ['/careers/backend-developer', '/guides/how-to-become-a-backend-developer', '/guides/how-to-learn-python', '/projects/intermediate'],
    primaryCta: 'Start the backend roadmap',
    roadmap: '/roadmaps/backend-development',
    project: '/projects/intermediate',
    primaryTopic: 'backend developer skills in order',
    audience: 'programmers and career switchers',
    difficulty: 'beginner',
    productGoal: 'roadmap → track → projects',
    priority: 'P0',
    status: 'mapped',
  },
  {
    id: 'fullstack-roadmap',
    query: 'full stack developer roadmap',
    intent: 'roadmap',
    cluster: 'full-stack-development',
    targetPage: '/roadmaps/full-stack-development',
    supportingPages: ['/careers/full-stack-developer', '/guides/how-to-learn-web-development', '/projects/advanced'],
    primaryCta: 'Start the full-stack roadmap',
    roadmap: '/roadmaps/full-stack-development',
    project: '/projects/advanced',
    primaryTopic: 'full-stack learning order',
    audience: 'web learners',
    difficulty: 'intermediate',
    productGoal: 'roadmap → track → projects',
    priority: 'P0',
    status: 'mapped',
  },

  // --- Cluster: Programming languages ---
  {
    id: 'learn-python',
    query: 'how to learn python',
    intent: 'educational',
    cluster: 'python',
    targetPage: '/guides/how-to-learn-python',
    supportingPages: ['/roadmaps/python-development', '/guides/what-programming-language-should-i-learn', '/projects/beginner'],
    primaryCta: 'Start the Python roadmap',
    roadmap: '/roadmaps/python-development',
    project: '/projects/beginner',
    primaryTopic: 'learning python from zero',
    audience: 'complete beginners',
    difficulty: 'beginner',
    productGoal: 'guide → python roadmap → projects',
    priority: 'P0',
    status: 'mapped',
  },
  {
    id: 'learn-javascript',
    query: 'how to learn javascript',
    intent: 'educational',
    cluster: 'javascript',
    targetPage: '/guides/how-to-learn-javascript',
    supportingPages: ['/roadmaps/javascript', '/roadmaps/react', '/guides/how-to-learn-web-development', '/projects/beginner'],
    primaryCta: 'Start the JavaScript roadmap',
    roadmap: '/roadmaps/javascript',
    project: '/projects/beginner',
    primaryTopic: 'learning javascript from zero',
    audience: 'web beginners',
    difficulty: 'beginner',
    productGoal: 'guide → javascript roadmap → react',
    priority: 'P0',
    status: 'mapped',
  },
  {
    id: 'javascript-roadmap',
    query: 'javascript roadmap',
    intent: 'roadmap',
    cluster: 'javascript',
    targetPage: '/roadmaps/javascript',
    supportingPages: ['/guides/how-to-learn-javascript', '/roadmaps/react', '/projects/beginner'],
    primaryCta: 'Start the JavaScript roadmap',
    roadmap: '/roadmaps/javascript',
    project: '/projects/beginner',
    primaryTopic: 'javascript learning order',
    audience: 'web beginners',
    difficulty: 'beginner',
    productGoal: 'roadmap → track → react',
    priority: 'P0',
    status: 'mapped',
  },
  {
    id: 'react-roadmap',
    query: 'react roadmap',
    intent: 'roadmap',
    cluster: 'react',
    targetPage: '/roadmaps/react',
    supportingPages: ['/roadmaps/javascript', '/guides/how-to-learn-javascript', '/careers/frontend-developer', '/projects/intermediate'],
    primaryCta: 'Start the React roadmap',
    roadmap: '/roadmaps/react',
    project: '/projects/intermediate',
    primaryTopic: 'react learning order',
    audience: 'beginner-intermediate frontend learners',
    difficulty: 'intermediate',
    productGoal: 'roadmap → track → full-stack',
    priority: 'P0',
    status: 'mapped',
  },
  {
    id: 'first-language',
    query: 'which programming language should I learn first',
    intent: 'informational',
    cluster: 'starting-coding',
    subcluster: 'programming-languages',
    targetPage: '/guides/what-programming-language-should-i-learn',
    supportingPages: ['/guides/how-to-learn-coding', '/roadmaps/python-development', '/roadmaps/javascript'],
    primaryCta: 'Start a roadmap',
    roadmap: '/roadmaps/python-development',
    primaryTopic: 'choosing a first programming language',
    audience: 'complete beginners',
    difficulty: 'beginner',
    productGoal: 'guide → chosen roadmap',
    priority: 'P1',
    status: 'mapped',
  },

  // --- Cluster: Projects ---
  {
    id: 'coding-projects-beginners',
    query: 'coding projects for beginners',
    intent: 'project',
    cluster: 'projects',
    targetPage: '/projects',
    supportingPages: ['/projects/beginner', '/projects/intermediate', '/roadmaps/frontend-development'],
    primaryCta: 'Build this project',
    project: '/projects/beginner',
    primaryTopic: 'beginner coding projects',
    audience: 'beginner learners',
    difficulty: 'beginner',
    productGoal: 'project list → project → track',
    priority: 'P1',
    status: 'mapped',
  },
  {
    id: 'projects-for-portfolio',
    query: 'projects to build for a portfolio',
    intent: 'project',
    cluster: 'career-transition',
    targetPage: '/projects/beginner',
    supportingPages: ['/guides/how-to-build-a-developer-portfolio', '/careers/frontend-developer', '/roadmaps/frontend-development'],
    primaryCta: 'Build a portfolio project',
    project: '/projects/beginner',
    primaryTopic: 'portfolio projects',
    audience: 'junior developers',
    difficulty: 'beginner',
    productGoal: 'projects → portfolio guide → career',
    priority: 'P1',
    status: 'mapped',
  },

  // --- Cluster: Career transition ---
  {
    id: 'become-frontend-dev',
    query: 'how to become a frontend developer',
    intent: 'career',
    cluster: 'frontend-development',
    targetPage: '/careers/frontend-developer',
    supportingPages: ['/guides/how-to-become-a-frontend-developer', '/roadmaps/frontend-development', '/guides/how-to-build-a-developer-portfolio'],
    primaryCta: 'Start the frontend roadmap',
    roadmap: '/roadmaps/frontend-development',
    project: '/projects/beginner',
    primaryTopic: 'becoming a frontend developer',
    audience: 'career switchers',
    difficulty: 'beginner',
    productGoal: 'career → roadmap → portfolio',
    priority: 'P0',
    status: 'mapped',
  },
  {
    id: 'become-backend-dev',
    query: 'how to become a backend developer',
    intent: 'career',
    cluster: 'backend-development',
    targetPage: '/careers/backend-developer',
    supportingPages: ['/guides/how-to-become-a-backend-developer', '/roadmaps/backend-development', '/guides/how-to-learn-python'],
    primaryCta: 'Start the backend roadmap',
    roadmap: '/roadmaps/backend-development',
    project: '/projects/intermediate',
    primaryTopic: 'becoming a backend developer',
    audience: 'career switchers',
    difficulty: 'beginner',
    productGoal: 'career → roadmap → projects',
    priority: 'P0',
    status: 'mapped',
  },
  {
    id: 'become-software-engineer',
    query: 'how to become a software engineer',
    intent: 'career',
    cluster: 'career-transition',
    targetPage: '/careers/software-engineer',
    supportingPages: ['/careers/frontend-developer', '/roadmaps/full-stack-development', '/guides/how-to-get-your-first-tech-job'],
    primaryCta: 'Explore the career path',
    roadmap: '/roadmaps/full-stack-development',
    project: '/projects/advanced',
    primaryTopic: 'becoming a software engineer',
    audience: 'career switchers',
    difficulty: 'intermediate',
    productGoal: 'career → roadmap → first job',
    priority: 'P0',
    status: 'mapped',
  },
  {
    id: 'first-tech-job',
    query: 'how to get your first tech job',
    intent: 'career',
    cluster: 'career-transition',
    targetPage: '/guides/how-to-get-your-first-tech-job',
    supportingPages: ['/guides/how-to-build-a-developer-portfolio', '/careers/software-engineer', '/roadmaps/frontend-development'],
    primaryCta: 'Get job-ready',
    roadmap: '/roadmaps/frontend-development',
    project: '/projects/beginner',
    primaryTopic: 'landing the first tech role',
    audience: 'juniors and career switchers',
    difficulty: 'intermediate',
    productGoal: 'guide → portfolio → career',
    priority: 'P0',
    status: 'mapped',
  },

  // --- Cluster: AI / data ---
  {
    id: 'learn-ai',
    query: 'how to learn AI',
    intent: 'educational',
    cluster: 'ai-data-cybersecurity',
    targetPage: '/guides/how-to-learn-ai',
    supportingPages: ['/roadmaps/ai-for-work', '/careers/ai-engineer', '/guides/how-to-learn-python'],
    primaryCta: 'Start the AI roadmap',
    roadmap: '/roadmaps/ai-for-work',
    project: '/projects/intermediate',
    primaryTopic: 'learning applied AI',
    audience: 'beginners and professionals',
    difficulty: 'beginner',
    productGoal: 'guide → ai roadmap → projects',
    priority: 'P1',
    status: 'mapped',
  },
  {
    id: 'ai-roadmap',
    query: 'ai roadmap',
    intent: 'roadmap',
    cluster: 'ai-data-cybersecurity',
    targetPage: '/roadmaps/ai-for-work',
    supportingPages: ['/guides/how-to-learn-ai', '/careers/ai-engineer'],
    primaryCta: 'Start this roadmap',
    roadmap: '/roadmaps/ai-for-work',
    project: '/projects/intermediate',
    primaryTopic: 'applied AI learning order',
    audience: 'self-directed learners',
    difficulty: 'beginner',
    productGoal: 'roadmap → track → projects',
    priority: 'P1',
    status: 'mapped',
  },
  {
    id: 'data-science-roadmap',
    query: 'data science roadmap',
    intent: 'roadmap',
    cluster: 'ai-data-cybersecurity',
    targetPage: '/roadmaps/data-science',
    supportingPages: ['/guides/how-to-learn-python', '/roadmaps/python-development'],
    primaryCta: 'Start the data science roadmap',
    roadmap: '/roadmaps/data-science',
    project: '/projects/advanced',
    primaryTopic: 'data science learning order',
    audience: 'beginners and analysts',
    difficulty: 'intermediate',
    productGoal: 'roadmap → track → projects',
    priority: 'P1',
    status: 'mapped',
  },
  {
    id: 'cybersecurity-roadmap',
    query: 'cybersecurity roadmap',
    intent: 'roadmap',
    cluster: 'ai-data-cybersecurity',
    targetPage: '/roadmaps/cybersecurity',
    supportingPages: ['/guides/how-to-learn-coding'],
    primaryCta: 'Start the cybersecurity roadmap',
    roadmap: '/roadmaps/cybersecurity',
    project: '/projects/advanced',
    primaryTopic: 'cybersecurity learning order',
    audience: 'beginner IT learners',
    difficulty: 'beginner',
    productGoal: 'roadmap → track → projects',
    priority: 'P1',
    status: 'mapped',
  },

  // --- Cluster: African learners / free ---
  {
    id: 'free-coding-resources',
    query: 'free coding resources for beginners',
    intent: 'resource',
    cluster: 'african-learners',
    subcluster: 'free-learning',
    targetPage: '/resources/free-coding-resources',
    supportingPages: ['/resources/free-tech-resources', '/guides/how-to-learn-coding', '/roadmaps'],
    primaryCta: 'Explore free resources',
    roadmap: '/roadmaps/frontend-development',
    primaryTopic: 'free coding resources',
    audience: 'budget-conscious beginners',
    difficulty: 'beginner',
    productGoal: 'resources → guide → roadmap',
    priority: 'P1',
    status: 'mapped',
  },
  {
    id: 'african-tech-resources',
    query: 'how to learn coding for free in Nigeria',
    intent: 'resource',
    cluster: 'african-learners',
    targetPage: '/resources/african-tech-resources',
    supportingPages: ['/resources/free-coding-resources', '/guides/how-to-learn-coding', '/roadmaps/python-development'],
    primaryCta: 'Explore free resources',
    roadmap: '/roadmaps/python-development',
    primaryTopic: 'free tech resources for African learners',
    audience: 'African students and career switchers',
    difficulty: 'beginner',
    productGoal: 'resources → guide → roadmap',
    priority: 'P1',
    status: 'mapped',
  },

  // --- Cluster: AI beginner ---
  {
    id: 'ai-beginner',
    query: 'how to use AI for beginners',
    intent: 'educational',
    cluster: 'ai-beginner',
    targetPage: '/tracks/ai-foundations',
    supportingPages: ['/roadmaps/ai-foundations', '/tracks/ai-for-work'],
    primaryCta: 'Start the AI foundations track',
    roadmap: '/roadmaps/ai-foundations',
    primaryTopic: 'getting started with AI',
    audience: 'complete beginners',
    difficulty: 'beginner',
    productGoal: 'track → roadmap → project',
    priority: 'P0',
    status: 'mapped',
  },
  {
    id: 'ai-learn',
    query: 'how to learn AI',
    intent: 'educational',
    cluster: 'ai-beginner',
    targetPage: '/tracks/ai-foundations',
    supportingPages: ['/roadmaps/ai-foundations', '/tracks/ai-for-work'],
    primaryCta: 'Start learning AI',
    roadmap: '/roadmaps/ai-foundations',
    primaryTopic: 'learning AI from scratch',
    audience: 'beginners and professionals',
    difficulty: 'beginner',
    productGoal: 'track → roadmap → projects',
    priority: 'P0',
    status: 'mapped',
  },

  // --- Cluster: AI for work ---
  {
    id: 'ai-for-work',
    query: 'how to use AI for work',
    intent: 'educational',
    cluster: 'ai-for-work',
    targetPage: '/tracks/ai-for-work',
    supportingPages: ['/roadmaps/ai-for-work', '/tracks/ai-foundations'],
    primaryCta: 'Start the AI for Work track',
    roadmap: '/roadmaps/ai-for-work',
    primaryTopic: 'AI productivity for professionals',
    audience: 'professionals and office workers',
    difficulty: 'beginner',
    productGoal: 'track → roadmap → project',
    priority: 'P0',
    status: 'mapped',
  },

  // --- Cluster: AI prompting ---
  {
    id: 'ai-prompting',
    query: 'prompt engineering for beginners',
    intent: 'educational',
    cluster: 'ai-prompting',
    targetPage: '/tracks/ai-foundations',
    supportingPages: ['/roadmaps/ai-foundations'],
    primaryCta: 'Learn AI prompting',
    roadmap: '/roadmaps/ai-foundations',
    primaryTopic: 'effective AI prompting',
    audience: 'beginners',
    difficulty: 'beginner',
    productGoal: 'track → roadmap → project',
    priority: 'P1',
    status: 'mapped',
  },

  // --- Cluster: AI research ---
  {
    id: 'ai-research',
    query: 'how to use AI for research',
    intent: 'educational',
    cluster: 'ai-research',
    targetPage: '/tracks/ai-research-verification',
    supportingPages: ['/roadmaps/ai-research-verification'],
    primaryCta: 'Start the AI Research track',
    roadmap: '/roadmaps/ai-research-verification',
    primaryTopic: 'AI-assisted research',
    audience: 'researchers and students',
    difficulty: 'beginner',
    productGoal: 'track → roadmap → project',
    priority: 'P1',
    status: 'mapped',
  },

  // --- Cluster: AI coding ---
  {
    id: 'ai-coding',
    query: 'how to code with AI',
    intent: 'educational',
    cluster: 'ai-coding',
    targetPage: '/tracks/ai-software-development',
    supportingPages: ['/roadmaps/ai-software-development'],
    primaryCta: 'Start the AI Software Development track',
    roadmap: '/roadmaps/ai-software-development',
    primaryTopic: 'AI-assisted software development',
    audience: 'developers and learners',
    difficulty: 'intermediate',
    productGoal: 'track → roadmap → projects',
    priority: 'P0',
    status: 'mapped',
  },

  // --- Cluster: AI video/YouTube ---
  {
    id: 'ai-youtube',
    query: 'how to make YouTube videos with AI',
    intent: 'educational',
    cluster: 'ai-youtube',
    targetPage: '/tracks/ai-youtube',
    supportingPages: ['/roadmaps/ai-youtube'],
    primaryCta: 'Start the AI YouTube track',
    roadmap: '/roadmaps/ai-youtube',
    primaryTopic: 'AI-assisted YouTube content',
    audience: 'content creators',
    difficulty: 'intermediate',
    productGoal: 'track → roadmap → projects',
    priority: 'P1',
    status: 'mapped',
  },

  // --- Cluster: AI automation ---
  {
    id: 'ai-automation',
    query: 'AI automation for beginners',
    intent: 'educational',
    cluster: 'ai-automation',
    targetPage: '/tracks/ai-automation',
    supportingPages: ['/roadmaps/ai-automation'],
    primaryCta: 'Start the AI Automation track',
    roadmap: '/roadmaps/ai-automation',
    primaryTopic: 'AI workflow automation',
    audience: 'professionals and developers',
    difficulty: 'intermediate',
    productGoal: 'track → roadmap → project',
    priority: 'P1',
    status: 'mapped',
  },

  // --- Cluster: AI agents ---
  {
    id: 'ai-agents',
    query: 'what are AI agents',
    intent: 'educational',
    cluster: 'ai-agents',
    targetPage: '/tracks/ai-agents',
    supportingPages: ['/roadmaps/ai-agents'],
    primaryCta: 'Start the AI Agents track',
    roadmap: '/roadmaps/ai-agents',
    primaryTopic: 'AI agent design and building',
    audience: 'developers and technical learners',
    difficulty: 'advanced',
    productGoal: 'track → roadmap → project',
    priority: 'P1',
    status: 'mapped',
  },

  // --- Cluster: AI design ---
  {
    id: 'ai-design',
    query: 'how to design with AI',
    intent: 'educational',
    cluster: 'ai-design',
    targetPage: '/tracks/ai-design',
    supportingPages: ['/roadmaps/ai-design'],
    primaryCta: 'Start the AI Design track',
    roadmap: '/roadmaps/ai-design',
    primaryTopic: 'AI-assisted design',
    audience: 'designers and creative professionals',
    difficulty: 'beginner',
    productGoal: 'track → roadmap → project',
    priority: 'P1',
    status: 'mapped',
  },
]

const INTENT_BY_ID = new Map(SEARCH_INTENTS.map((i) => [i.id, i]))

export function getIntentById(id: string): SearchIntent | null {
  return INTENT_BY_ID.get(id) ?? null
}

/**
 * Reverse lookup: which search intent's target page (or supporting page) is
 * this path? Used to keep content pages aligned with their intent mapping.
 */
export function getIntentForPath(
  path: string,
  includeSupporting = false
): SearchIntent | null {
  const p = path.replace(/\/+$/, '')
  for (const intent of SEARCH_INTENTS) {
    if (intent.targetPage === p) return intent
  }
  if (includeSupporting) {
    for (const intent of SEARCH_INTENTS) {
      if (intent.supportingPages.includes(p)) return intent
    }
  }
  return null
}

/** Gap intents — queries with no strong page yet (future content, P2/P3). */
export function getGapIntents(): SearchIntent[] {
  return SEARCH_INTENTS.filter((i) => i.status === 'gap')
}

/** Search-to-page matrix rows: Query → Target → CTA → Roadmap → Project → Event. */
export interface SearchToPageRow {
  query: string
  intent: SearchIntentType
  cluster: string
  targetPage: string
  primaryCta: string
  roadmap?: string
  project?: string
  productGoal: string
  priority: SearchIntentPriority
}

export function getSearchToPageMatrix(): SearchToPageRow[] {
  return SEARCH_INTENTS.filter((i) => i.status === 'mapped').map((i) => ({
    query: i.query,
    intent: i.intent,
    cluster: i.cluster,
    targetPage: i.targetPage,
    primaryCta: i.primaryCta,
    roadmap: i.roadmap,
    project: i.project,
    productGoal: i.productGoal,
    priority: i.priority,
  }))
}