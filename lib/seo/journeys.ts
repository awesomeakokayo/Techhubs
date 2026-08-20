/**
 * Learning Journey graph — the internal "contextual next step" system.
 *
 * Every journey models the funnel:
 *   entryPage → roadmap → project → career → nextSkill
 *
 * Pages are NOT edited to reference a journey — a page is resolved to a
 * journey by slug (guide slug, roadmap cluster id, career slug, resource
 * slug). This keeps the authoring model small and the graph structural.
 */

export type JourneyKind = 'guide' | 'roadmap' | 'project' | 'career' | 'resource' | 'start'

export interface JourneyNode {
  label: string
  href: string
  kind: JourneyKind
  description: string
}

export interface LearningJourney {
  /** Cluster id — matches a roadmap slug or page slug where possible. */
  id: string
  /** "Learn by goal" label shown on the /start funnel hub. */
  goal: string
  cluster: string
  audience: string[]
  /** Where a learner first lands (usually the guide or start). */
  entry: JourneyNode
  /** The structured learning path. */
  roadmap: JourneyNode
  /** The project that proves the learning (primary). */
  project?: JourneyNode
  /** The career the path leads to when relevant. */
  career?: JourneyNode
  /** What to learn after this completes. */
  nextSkill?: JourneyNode
}

function node(kind: JourneyKind, label: string, href: string, description: string): JourneyNode {
  return { kind, label, href, description }
}

const BEGINNER_PROJECTS = node(
  'project',
  'Beginner Projects',
  '/projects/beginner',
  'Small real projects to prove every skill you learn.'
)
const INTERMEDIATE_PROJECTS = node(
  'project',
  'Intermediate Projects',
  '/projects/intermediate',
  'Projects with real architecture — APIs, state and user flows.'
)
const ADVANCED_PROJECTS = node(
  'project',
  'Advanced Projects',
  '/projects/advanced',
  'Demanding full-stack and systems projects for serious builders.'
)

export const LEARNING_JOURNEYS: LearningJourney[] = [
  {
    id: 'how-to-learn-coding',
    goal: 'Learn coding',
    cluster: 'starting-coding',
    audience: ['Complete beginners', 'Students', 'Career switchers'],
    entry: node(
      'guide',
      'How to Learn Coding',
      '/guides/how-to-learn-coding',
      'A direct answer to how to start coding from zero.'
    ),
    roadmap: node('roadmap', 'Python Roadmap', '/roadmaps/python-development', 'The gentlest first language, in order.'),
    project: BEGINNER_PROJECTS,
    career: node('career', 'Software Engineer', '/careers/software-engineer', 'See where the path leads.'),
    nextSkill: node('roadmap', 'JavaScript Roadmap', '/roadmaps/javascript', 'The language of the web, next.'),
  },
  {
    id: 'how-to-learn-web-development',
    goal: 'Build websites',
    cluster: 'web-development',
    audience: ['Complete beginners', 'Career switchers', 'Freelancers'],
    entry: node(
      'guide',
      'How to Learn Web Development',
      '/guides/how-to-learn-web-development',
      'HTML, CSS, JavaScript and deployment in the right order.'
    ),
    roadmap: node('roadmap', 'Frontend Roadmap', '/roadmaps/frontend-development', 'Every frontend skill in sequence.'),
    project: BEGINNER_PROJECTS,
    career: node('career', 'Frontend Developer', '/careers/frontend-developer', 'The entry-level web role.'),
    nextSkill: node('roadmap', 'Backend Roadmap', '/roadmaps/backend-development', 'Make your websites fully functional.'),
  },
  {
    id: 'frontend-development',
    goal: 'Become a frontend developer',
    cluster: 'frontend-development',
    audience: ['Career switchers', 'Juniors', 'Self-taught learners'],
    entry: node(
      'guide',
      'How to Become a Frontend Developer',
      '/guides/how-to-become-a-frontend-developer',
      'The complete zero-to-hire frontend path.'
    ),
    roadmap: node('roadmap', 'Frontend Developer Roadmap', '/roadmaps/frontend-development', 'Learn every frontend skill in order.'),
    project: BEGINNER_PROJECTS,
    career: node('career', 'Frontend Developer Career', '/careers/frontend-developer', 'Skills, expectations and portfolio.'),
    nextSkill: node('roadmap', 'Backend Roadmap', '/roadmaps/backend-development', 'Broaden into full-stack.'),
  },
  {
    id: 'backend-development',
    goal: 'Become a backend developer',
    cluster: 'backend-development',
    audience: ['Career switchers', 'Programmers', 'Students'],
    entry: node(
      'guide',
      'How to Become a Backend Developer',
      '/guides/how-to-become-a-backend-developer',
      'APIs, databases and server-side logic.'
    ),
    roadmap: node('roadmap', 'Backend Developer Roadmap', '/roadmaps/backend-development', 'The backend path in order.'),
    project: INTERMEDIATE_PROJECTS,
    career: node('career', 'Backend Developer Career', '/careers/backend-developer', 'What the role requires.'),
    nextSkill: node('roadmap', 'Full-Stack Roadmap', '/roadmaps/full-stack-development', 'Add the frontend layer.'),
  },
  {
    id: 'full-stack-development',
    goal: 'Become a full-stack developer',
    cluster: 'full-stack-development',
    audience: ['Career switchers', 'Juniors', 'Self-taught learners'],
    entry: node(
      'guide',
      'How to Learn Web Development',
      '/guides/how-to-learn-web-development',
      'The complete beginner web journey.'
    ),
    roadmap: node('roadmap', 'Full-Stack Developer Roadmap', '/roadmaps/full-stack-development', 'Frontend to backend to deployed apps.'),
    project: ADVANCED_PROJECTS,
    career: node('career', 'Full-Stack Developer Career', '/careers/full-stack-developer', 'Do both, end to end.'),
    nextSkill: node('roadmap', 'DevOps Roadmap', '/roadmaps/devops-engineering', 'Deploy, scale and automate.'),
  },
  {
    id: 'javascript',
    goal: 'Learn JavaScript',
    cluster: 'javascript',
    audience: ['Complete beginners', 'Web learners'],
    entry: node(
      'guide',
      'How to Learn JavaScript',
      '/guides/how-to-learn-javascript',
      'Core language to DOM to modern syntax.'
    ),
    roadmap: node('roadmap', 'JavaScript Roadmap', '/roadmaps/javascript', 'JavaScript in a structured, step-by-step roadmap.'),
    project: BEGINNER_PROJECTS,
    career: node('career', 'Frontend Developer Career', '/careers/frontend-developer', 'JavaScript is the frontend foundation.'),
    nextSkill: node('roadmap', 'React Roadmap', '/roadmaps/react', 'What comes after core JavaScript.'),
  },
  {
    id: 'react',
    goal: 'Learn React',
    cluster: 'react',
    audience: ['Beginner-to-intermediate web learners'],
    entry: node(
      'guide',
      'How to Learn JavaScript',
      '/guides/how-to-learn-javascript',
      'Make sure your JavaScript base is solid first.'
    ),
    roadmap: node('roadmap', 'React Roadmap', '/roadmaps/react', 'Components, state, hooks and Next.js.'),
    project: INTERMEDIATE_PROJECTS,
    career: node('career', 'Frontend Developer Career', '/careers/frontend-developer', 'React is the most-requested frontend skill.'),
    nextSkill: node('roadmap', 'Full-Stack Roadmap', '/roadmaps/full-stack-development', 'Add backend skills around React.'),
  },
  {
    id: 'python',
    goal: 'Learn Python',
    cluster: 'python',
    audience: ['Complete beginners', 'Data beginners', 'Career switchers'],
    entry: node(
      'guide',
      'How to Learn Python',
      '/guides/how-to-learn-python',
      'A beginner roadmap for the most readable language.'
    ),
    roadmap: node('roadmap', 'Python Roadmap', '/roadmaps/python-development', 'Python fundamentals in order.'),
    project: BEGINNER_PROJECTS,
    career: node('career', 'Backend Developer Career', '/careers/backend-developer', 'Python powers backend and data roles.'),
    nextSkill: node('roadmap', 'Data Science Roadmap', '/roadmaps/data-science', 'Python is the gateway to data work.'),
  },
  {
    id: 'ai',
    goal: 'Learn AI',
    cluster: 'ai-data-cybersecurity',
    audience: ['Career switchers', 'Data beginners', 'Product-minded learners'],
    entry: node(
      'guide',
      'How to Learn AI',
      '/guides/how-to-learn-ai',
      'Practical AI skills that build toward real work.'
    ),
    roadmap: node('roadmap', 'AI Roadmap', '/roadmaps/ai-for-work', 'Practical, project-ready AI skills.'),
    project: INTERMEDIATE_PROJECTS,
    career: node('career', 'AI Engineer Career', '/careers/ai-engineer', 'The AI engineering role, explained.'),
    nextSkill: node('roadmap', 'Data Science Roadmap', '/roadmaps/data-science', 'Deepen into statistics and modeling.'),
  },
  {
    id: 'data-science',
    goal: 'Learn data skills',
    cluster: 'ai-data-cybersecurity',
    audience: ['Beginners', 'Career switchers', 'Analysts'],
    entry: node(
      'guide',
      'How to Learn Python',
      '/guides/how-to-learn-python',
      'Python is the foundation of data work.'
    ),
    roadmap: node('roadmap', 'Data Science Roadmap', '/roadmaps/data-science', 'Statistics, analysis and ML fundamentals.'),
    project: ADVANCED_PROJECTS,
    career: node('career', 'Software Engineer Career', '/careers/software-engineer', 'Data roles fit inside engineering tracks.'),
    nextSkill: node('roadmap', 'AI Roadmap', '/roadmaps/ai-for-work', 'From data science into applied AI.'),
  },
  {
    id: 'cybersecurity',
    goal: 'Explore cybersecurity',
    cluster: 'ai-data-cybersecurity',
    audience: ['Beginners', 'IT learners'],
    entry: node(
      'guide',
      'How to Learn Coding',
      '/guides/how-to-learn-coding',
      'Security basics build on how systems work.'
    ),
    roadmap: node('roadmap', 'Cybersecurity Roadmap', '/roadmaps/cybersecurity', 'Networking, defense and testing fundamentals.'),
    project: ADVANCED_PROJECTS,
    career: node('career', 'Software Engineer Career', '/careers/software-engineer', 'Security skills fit engineering breadth.'),
    nextSkill: node('roadmap', 'Backend Roadmap', '/roadmaps/backend-development', 'Understanding systems deepens security work.'),
  },
  {
    id: 'get-into-tech',
    goal: 'Get into tech',
    cluster: 'career-transition',
    audience: ['Career switchers', 'Graduates', 'Self-taught learners'],
    entry: node(
      'guide',
      'How to Get Into Tech',
      '/guides/how-to-get-into-tech',
      'A practical, honest path from career switch to first role.'
    ),
    roadmap: node('roadmap', 'Frontend Roadmap', '/roadmaps/frontend-development', 'The most accessible entry path, in order.'),
    project: BEGINNER_PROJECTS,
    career: node('career', 'Frontend Developer Career', '/careers/frontend-developer', 'The entry-level role that hires consistently.'),
    nextSkill: node('start', 'Find Your Path', '/start', 'Not sure where to start? Run the quick quiz.'),
  },
  {
    id: 'first-tech-job',
    goal: 'Get your first tech job',
    cluster: 'career-transition',
    audience: ['Career switchers', 'Juniors', 'Grads'],
    entry: node(
      'guide',
      'How to Get Your First Tech Job',
      '/guides/how-to-get-your-first-tech-job',
      'From portfolio to interview to offer.'
    ),
    roadmap: node('roadmap', 'Frontend Roadmap', '/roadmaps/frontend-development', 'Skills that make you hireable.'),
    project: BEGINNER_PROJECTS,
    career: node('career', 'Software Engineer Career', '/careers/software-engineer', 'Engineering roles beyond the first job.'),
    nextSkill: node(
      'guide',
      'How to Build a Developer Portfolio',
      '/guides/how-to-build-a-developer-portfolio',
      'The portfolio is what gets you interviews.'
    ),
  },
  {
    id: 'portfolio',
    goal: 'Build a portfolio',
    cluster: 'career-transition',
    audience: ['Juniors', 'Career switchers'],
    entry: node(
      'guide',
      'How to Build a Developer Portfolio',
      '/guides/how-to-build-a-developer-portfolio',
      'Turn learning into proof of skill.'
    ),
    roadmap: node('roadmap', 'Frontend Roadmap', '/roadmaps/frontend-development', 'Portfolio projects come from the roadmap.'),
    project: BEGINNER_PROJECTS,
    career: node('career', 'Frontend Developer Career', '/careers/frontend-developer', 'What employers expect in projects.'),
    nextSkill: node(
      'guide',
      'How to Get Your First Tech Job',
      '/guides/how-to-get-your-first-tech-job',
      'Use the portfolio to land interviews.'
    ),
  },
]

const JOURNEY_BY_ID = new Map(LEARNING_JOURNEYS.map((j) => [j.id, j]))

export function getJourneyById(id?: string): LearningJourney | null {
  if (!id) return null
  return JOURNEY_BY_ID.get(id) ?? null
}

/**
 * Resolve a page slug to the journey it belongs to.
 * Slug may be a guide slug, a roadmap/track slug, a career slug, a resource
 * slug or the journey id itself.
 */
export function getJourneyForSlug(slug: string): LearningJourney | null {
  if (!slug) return null
  const s = slug.replace(/^\//, '')
  const direct = JOURNEY_BY_ID.get(s)
  if (direct) return direct

  for (const journey of LEARNING_JOURNEYS) {
    const allNodes = [journey.entry, journey.roadmap, journey.project, journey.career, journey.nextSkill].filter(
      (n): n is JourneyNode => Boolean(n)
    )
    const hit = allNodes.some((n) => {
      const href = n.href.replace(/^\//, '')
      return href === s || href.endsWith(`/${s}`)
    })
    if (hit) return journey
  }
  return null
}

/**
 * Ordered funnel steps for a journey (entry → roadmap → project → career → next).
 */
export function getJourneySteps(
  journey: LearningJourney
): JourneyNode[] {
  return [journey.entry, journey.roadmap, journey.project, journey.career, journey.nextSkill].filter(
    (n): n is JourneyNode => Boolean(n)
  )
}