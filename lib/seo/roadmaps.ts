import { RelatedLink } from './content-types'

export interface CustomRoadmapStage {
  title: string
  description: string
  topics: string[]
}

export interface CustomRoadmap {
  slug: string
  title: string
  seoTitle: string
  description: string
  openingAnswer: string
  intro: string
  audience: string[]
  stages: CustomRoadmapStage[]
  projects: string[]
  faqs: { question: string; answer: string }[]
  related: RelatedLink[]
  publishedTime: string
  modifiedTime: string
}

/** Map older /alias URLs to the canonical roadmap slug served from TRACKS. */
export const ROADMAP_SLUG_ALIASES: Record<string, string> = {
  python: 'python-development',
  'artificial-intelligence': 'ai-for-work',
}

export const EXTRA_ROADMAPS: Record<string, CustomRoadmap> = {
  javascript: {
    slug: 'javascript',
    title: 'JavaScript Roadmap for Beginners: Learn JavaScript Step by Step',
    seoTitle: 'JavaScript Roadmap for Beginners: Learn JavaScript Step by Step',
    description:
      'The complete JavaScript roadmap — core language, DOM, ES6+, async and React — in the exact order to learn it.',
    openingAnswer:
      'To learn JavaScript, start with the core language (variables, types, functions, arrays, objects), then learn the DOM to build interactive pages, master ES6+ syntax, learn asynchronous programming with promises and Fetch, and finally build projects and learn React.',
    intro:
      'JavaScript is the language of the interactive web and the foundation of modern frontend careers. This roadmap sequences everything you need, with free resources and projects along the way.',
    audience: ['Frontend beginners', 'Web developers', 'Career switchers', 'Students'],
    stages: [
      {
        title: 'Core language',
        description: 'The fundamentals of writing JavaScript: variables, operators, control flow and functions.',
        topics: ['Variables (let, const)', 'Data types & strings', 'Operators & conditionals', 'Loops & iteration', 'Functions & scope'],
      },
      {
        title: 'Data structures',
        description: 'The everyday containers JavaScript developers work with in every project.',
        topics: ['Arrays & array methods', 'Objects & destructuring', 'Template literals', 'Spread & rest', 'Common patterns'],
      },
      {
        title: 'The DOM',
        description: 'Make pages interactive — selecting, updating and listening to the document.',
        topics: ['Selecting elements', 'Changing styles & content', 'Events & listeners', 'Creating elements', 'Forms'],
      },
      {
        title: 'ES6+ modern syntax',
        description: 'The modern syntax used in every real codebase and framework tutorial.',
        topics: ['Arrow functions', 'Destructuring', 'Modules (import/export)', 'Optional chaining', 'Modern iteration'],
      },
      {
        title: 'Async JavaScript',
        description: 'Handling things that take time — network requests, timers and data loading.',
        topics: ['Callbacks', 'Promises', 'async/await', 'Fetch API', 'Error handling'],
      },
      {
        title: 'Projects',
        description: 'Combine everything in real, interactive applications.',
        topics: ['To-do app', 'Weather app', 'Quiz app', 'Modal & filter UI', 'Simple CRUD app'],
      },
      {
        title: 'React + Next.js',
        description: 'Transition from core JavaScript to professional component-based development.',
        topics: ['Components & props', 'State & hooks', 'Routing', 'Next.js basics', 'Deployment'],
      },
    ],
    projects: ['To-do application', 'Weather app using an API', 'Interactive quiz', 'Kanban board', 'Personal dashboard'],
    faqs: [
      {
        question: 'How long does it take to learn JavaScript?',
        answer: 'Core language and the DOM take most consistent learners 2 to 4 months. React and real projects add several more months.',
      },
      {
        question: 'Should I learn vanilla JavaScript before React?',
        answer: 'Yes — unambiguously. React is built on the language. A strong foundation makes framework learning fast and your code better.',
      },
      {
        question: 'Is JavaScript enough to get a job?',
        answer: 'JavaScript plus React and a portfolio of deployed projects is the core of most entry-level frontend roles.',
      },
    ],
    related: [
      { title: 'How to Learn JavaScript From Scratch', href: '/guides/how-to-learn-javascript', description: 'A written guide to the same path.' },
      { title: 'Frontend Developer Roadmap', href: '/roadmaps/frontend-development', description: 'JavaScript inside the full frontend path.' },
      { title: 'React Roadmap', href: '/roadmaps/react', description: 'What comes after JavaScript.' },
      { title: 'Beginner Projects to Build', href: '/projects/beginner', description: 'Practice JavaScript by building.' },
    ],
    publishedTime: '2026-07-01T00:00:00.000Z',
    modifiedTime: '2026-08-19T00:00:00.000Z',
  },

  react: {
    slug: 'react',
    title: 'React Roadmap for Beginners: Learn React Step by Step',
    seoTitle: 'React Roadmap for Beginners: Learn React Step by Step',
    description:
      'The React roadmap — prerequisites, components, hooks and your path from JavaScript to modern production apps with Next.js.',
    openingAnswer:
      'To learn React, master JavaScript fundamentals first, then learn components and props, state management with hooks, routing, and how to fetch data. Build several projects, then learn Next.js for production, SEO-friendly applications and deployment.',
    intro:
      'React is the most in-demand frontend framework in the world. This roadmap assumes you know HTML, CSS and core JavaScript, and sequences React itself from components to shipped apps.',
    audience: ['Frontend developers', 'JavaScript developers', 'Career switchers', 'Junior developers'],
    stages: [
      {
        title: 'Prerequisites',
        description: 'React is far easier with a solid JavaScript base. Verify these before you start.',
        topics: ['ES6+ syntax', 'Functions & arrow functions', 'Arrays & objects', 'Destructuring & spread', 'Async / Fetch'],
      },
      {
        title: 'React foundations',
        description: 'The mental model of React: components, props and unidirectional data flow.',
        topics: ['Components & JSX', 'Props & composition', 'Conditional rendering', 'Lists & keys', 'Styling'],
      },
      {
        title: 'State & hooks',
        description: 'Making components interactive and managing data that changes.',
        topics: ['useState', 'useEffect', 'Controlled inputs & forms', 'Lifting state up', 'Custom hooks'],
      },
      {
        title: 'Advanced patterns',
        description: 'The patterns production React applications rely on.',
        topics: ['Context API', 'Reducer & complex state', 'Data fetching patterns', 'Error boundaries', 'Performance basics (memo)'],
      },
      {
        title: 'Routing',
        description: 'Multi-page experiences inside a single-page application.',
        topics: ['React Router', 'Dynamic routes', 'Navigation & links', 'URL state'],
      },
      {
        title: 'Next.js',
        description: 'The production framework built on React with SEO, routing and deployment included.',
        topics: ['Pages & layouts', 'Server vs client components', 'Data fetching', 'Metadata & SEO', 'Production deployment'],
      },
      {
        title: 'Professional skills',
        description: 'The habits that separate hobby code from professional code.',
        topics: ['Git workflows', 'Testing (Jest/RTL)', 'Accessibility', 'Performance & Core Web Vitals', 'Code review'],
      },
    ],
    projects: ['Todo app with hooks', 'Recipe browser with data fetching', 'E-commerce product page', 'Dashboard with charts', 'Full Next.js portfolio'],
    faqs: [
      {
        question: 'Do I need to know JavaScript before React?',
        answer: 'Yes. Attempting React before mastering JavaScript fundamentals is the most common reason React feels hard.',
      },
      {
        question: 'Is React or Vue better for beginners?',
        answer: 'Both teach componentization. React has the largest job market and ecosystem, which is why TechSkillHub sequences it.',
      },
      {
        question: 'Do I need to learn Redux?',
        answer: 'Not first. Modern React uses hooks, context and data-fetching libraries. Tackle state libraries only when your project genuinely needs them.',
      },
      {
        question: 'Is learning Next.js necessary?',
        answer: 'For employability, very useful — Next.js is the dominant React framework for production and SEO-critical apps.',
      },
    ],
    related: [
      { title: 'Frontend Developer Roadmap', href: '/roadmaps/frontend-development', description: 'React inside the full frontend path.' },
      { title: 'JavaScript Roadmap for Beginners', href: '/roadmaps/javascript', description: 'The foundation you need first.' },
      { title: 'How to Learn JavaScript From Scratch', href: '/guides/how-to-learn-javascript', description: 'Written guide to JavaScript first.' },
      { title: 'Intermediate Projects to Build', href: '/projects/intermediate', description: 'React practice projects.' },
    ],
    publishedTime: '2026-07-02T00:00:00.000Z',
    modifiedTime: '2026-08-19T00:00:00.000Z',
  },
}

export function resolveRoadmapSlug(slug: string): string {
  return ROADMAP_SLUG_ALIASES[slug] ?? slug
}