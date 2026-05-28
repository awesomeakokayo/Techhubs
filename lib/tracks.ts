export type TrackCategory = 'build' | 'design' | 'analyze' | 'grow'
export type ResourceType = 'docs' | 'video' | 'practice' | 'book' | 'tool' | 'community'
export type ProjectLevel = 'beginner' | 'intermediate' | 'advanced'

export interface Resource { id: string; title: string; description: string; url: string; type: ResourceType; free: boolean; source: string }
export interface Project { id: string; title: string; description: string; level: ProjectLevel; techTags: string[] }
export interface Stage { id: number; title: string; duration: string; topics: string[]; description: string }
export interface AIGuide { goodFor: string[]; notFor: string[]; tools: { name: string; use: string; url: string }[]; samplePrompts: string[] }
export interface Track {
  id: string; slug: string; name: string; tagline: string; category: TrackCategory;
  colorHex: string; icon: string; difficulty: 1|2|3|4|5; difficultyLabel: string;
  timeEstimate: string; techStack: string[];
  overview: { description: string; whatYouCanBuild: string[]; jobTitles: string[]; salaryRange: string };
  roadmap: Stage[]; resources: Resource[]; projects: Project[]; aiGuide: AIGuide; careerTip: string;
}

export const TRACKS: Track[] = [
  {
    id: "frontend",
    slug: "frontend-development",
    name: "Frontend Development",
    tagline: "Build everything users see, click, and experience on the web.",
    category: "build",
    colorHex: "#61DAFB",
    icon: "Monitor",
    difficulty: 3,
    difficultyLabel: "Medium",
    timeEstimate: "4 to 6 months",
    techStack: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind"],
    overview: {
      description:
        "Frontend developers build the visual layer of the web â€” layouts, buttons, forms, animations, and everything users interact with. You translate designs into working code using HTML, CSS, and JavaScript, then build complex interfaces using React.",
      whatYouCanBuild: [
        "Responsive websites",
        "Web applications",
        "Dashboards",
        "E-commerce storefronts",
        "AI-powered chat interfaces",
      ],
      jobTitles: [
        "Frontend Developer",
        "UI Developer",
        "React Developer",
        "Web Developer",
        "Frontend Engineer",
      ],
      salaryRange: "$40,000 to $120,000/year",
    },
    roadmap: [
      {
        id: 1,
        title: "Foundations",
        duration: "4 to 8 weeks",
        topics: [
          "HTML5 semantics",
          "CSS3 & Flexbox",
          "CSS Grid",
          "Responsive Design",
          "Basic JavaScript",
        ],
        description:
          "Master the building blocks of the web. HTML structures content, CSS styles and positions it, JavaScript makes it interactive.",
      },
      {
        id: 2,
        title: "Core JavaScript",
        duration: "4 to 6 weeks",
        topics: [
          "ES6+ syntax",
          "DOM Manipulation",
          "Events & forms",
          "Async JavaScript",
          "Fetch API",
        ],
        description:
          "Go deep into JavaScript. Learn modern syntax, DOM manipulation, and how to fetch data from APIs.",
      },
      {
        id: 3,
        title: "React Framework",
        duration: "6 to 10 weeks",
        topics: [
          "Components & Props",
          "State with Hooks",
          "React Router",
          "Context API",
          "Next.js Basics",
        ],
        description:
          "React is the most in-demand frontend skill. Build component-based UIs and production apps with Next.js.",
      },
      {
        id: 4,
        title: "Professional Skills",
        duration: "3 to 4 weeks",
        topics: [
          "Git workflows",
          "Testing (Jest)",
          "Performance optimization",
          "Accessibility (a11y)",
          "Deployment",
        ],
        description:
          "Bridge the gap from learning to professional work. These are the practices that separate juniors from team-ready developers.",
      },
      {
        id: 5,
        title: "AI-Assisted Workflow",
        duration: "Ongoing",
        topics: [
          "GitHub Copilot",
          "v0.dev for UI",
          "AI debugging",
          "Verifying AI code",
        ],
        description:
          "Use AI as a powerful assistant â€” not a replacement for understanding. Build faster without losing the ability to think.",
      },
    ],
    resources: [
      {
        id: "fe-1",
        title: "MDN Web Docs",
        description:
          "The gold standard HTML, CSS, and JavaScript reference. Bookmark this forever.",
        url: "https://developer.mozilla.org/en-US/docs/Learn",
        type: "docs",
        free: true,
        source: "Mozilla",
      },
      {
        id: "fe-2",
        title: "The Odin Project",
        description:
          "Free, project-based full-stack curriculum. Best structured free path for web dev.",
        url: "https://www.theodinproject.com/foundations",
        type: "docs",
        free: true,
        source: "The Odin Project",
      },
      {
        id: "fe-3",
        title: "JavaScript.info",
        description:
          "The best JavaScript learning site on the internet. Clear, thorough, modern.",
        url: "https://javascript.info",
        type: "docs",
        free: true,
        source: "javascript.info",
      },
      {
        id: "fe-4",
        title: "React Official Docs",
        description:
          "Completely rewritten official docs with interactive examples.",
        url: "https://react.dev",
        type: "docs",
        free: true,
        source: "React",
      },
      {
        id: "fe-5",
        title: "HTML Crash Course",
        description:
          "Traversy Media â€” perfect introduction for absolute beginners.",
        url: "https://www.youtube.com/watch?v=UB1O30fR-EE",
        type: "video",
        free: true,
        source: "Traversy Media",
      },
      {
        id: "fe-6",
        title: "JavaScript Full Course",
        description: "3-hour JavaScript beginner course by freeCodeCamp.",
        url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
        type: "video",
        free: true,
        source: "freeCodeCamp",
      },
      {
        id: "fe-7",
        title: "React Full Course",
        description:
          "Complete React course covering hooks, router, and state management.",
        url: "https://www.youtube.com/watch?v=bMknfKXIFA8",
        type: "video",
        free: true,
        source: "freeCodeCamp",
      },
      {
        id: "fe-8",
        title: "Frontend Mentor",
        description:
          "Real HTML/CSS/JS challenges with professional designs to implement.",
        url: "https://www.frontendmentor.io",
        type: "practice",
        free: true,
        source: "Frontend Mentor",
      },
      {
        id: "fe-9",
        title: "Flexbox Froggy",
        description: "Learn CSS flexbox interactively by moving frogs.",
        url: "https://flexboxfroggy.com",
        type: "practice",
        free: true,
        source: "Flexbox Froggy",
      },
      {
        id: "fe-10",
        title: "CSS Grid Garden",
        description: "Learn CSS grid layout by watering a garden.",
        url: "https://cssgridgarden.com",
        type: "practice",
        free: true,
        source: "CSS Grid Garden",
      },
      {
        id: "fe-11",
        title: "Full Stack Open",
        description:
          "University of Helsinki free full-stack curriculum. Deep and rigorous.",
        url: "https://fullstackopen.com/en",
        type: "docs",
        free: true,
        source: "Univ. of Helsinki",
      },
      {
        id: "fe-12",
        title: "Next.js Learn",
        description:
          "Official Next.js interactive course. Built by Vercel, always up to date.",
        url: "https://nextjs.org/learn",
        type: "docs",
        free: true,
        source: "Vercel",
      },
      {
        id: "fe-13",
        title: "Tailwind CSS Docs",
        description:
          "Official Tailwind documentation â€” the fastest way to style anything.",
        url: "https://tailwindcss.com/docs",
        type: "docs",
        free: true,
        source: "Tailwind",
      },
      {
        id: "fe-14",
        title: "Eloquent JavaScript",
        description:
          "Free online book that builds deep JavaScript understanding.",
        url: "https://eloquentjavascript.net",
        type: "book",
        free: true,
        source: "Marijn Haverbeke",
      },
      {
        id: "fe-15",
        title: "v0.dev by Vercel",
        description:
          "AI-powered UI generation. Describe a component, get React + Tailwind code.",
        url: "https://v0.dev",
        type: "tool",
        free: true,
        source: "Vercel",
      },
    ],
    projects: [
      {
        id: "fe-p1",
        title: "Personal Portfolio",
        description:
          "Build your own site with bio, skills, and project showcase.",
        level: "beginner",
        techTags: ["HTML", "CSS"],
      },
      {
        id: "fe-p2",
        title: "Calculator App",
        description: "Functional calculator with keyboard support and history.",
        level: "beginner",
        techTags: ["HTML", "CSS", "JavaScript"],
      },
      {
        id: "fe-p3",
        title: "Responsive Landing Page",
        description:
          "Pixel-perfect implementation of a Figma or Dribbble design.",
        level: "beginner",
        techTags: ["HTML", "Tailwind CSS"],
      },
      {
        id: "fe-p4",
        title: "Weather App",
        description:
          "Fetch real weather data from OpenWeatherMap API with search.",
        level: "intermediate",
        techTags: ["JavaScript", "API", "CSS"],
      },
      {
        id: "fe-p5",
        title: "Movie Search App",
        description: "Search and display movies using TMDB API with filters.",
        level: "intermediate",
        techTags: ["React", "API"],
      },
      {
        id: "fe-p6",
        title: "Budget Tracker",
        description: "Track income and expenses with categories and charts.",
        level: "intermediate",
        techTags: ["React", "localStorage"],
      },
      {
        id: "fe-p7",
        title: "Full E-commerce Frontend",
        description: "Product listings, cart, and checkout flow.",
        level: "advanced",
        techTags: ["React", "Next.js", "Tailwind"],
      },
      {
        id: "fe-p8",
        title: "AI Chat Interface",
        description:
          "Chat UI connecting to OpenAI or Groq API with message history.",
        level: "advanced",
        techTags: ["React", "AI API", "Next.js"],
      },
    ],
    aiGuide: {
      goodFor: [
        "Generating boilerplate components",
        "Explaining CSS bugs",
        "Writing unit tests",
        "Creating mock data",
        "Suggesting responsive layout fixes",
      ],
      notFor: [
        "Designing your application architecture",
        "Writing production logic you have not reviewed",
        "Replacing your understanding of the DOM",
      ],
      tools: [
        {
          name: "GitHub Copilot",
          use: "In-editor code completion and generation",
          url: "https://github.com/features/copilot",
        },
        {
          name: "v0.dev",
          use: "Rapid UI prototyping from text prompts",
          url: "https://v0.dev",
        },
        {
          name: "Cursor",
          use: "Full AI code editor for larger files",
          url: "https://cursor.sh",
        },
        {
          name: "Claude",
          use: "Debugging, explaining errors, refactoring",
          url: "https://claude.ai",
        },
      ],
      samplePrompts: [
        "I have this React component [paste code]. It re-renders every time the parent state changes even though the props have not changed. What is causing this and how do I fix it using React.memo?",
        "Write a reusable Button component in React with TypeScript that accepts: variant (primary | secondary | danger), size (sm | md | lg), disabled state, and an onClick handler.",
        "Explain what this CSS is doing and why the flexbox alignment is not working as expected: [paste code]",
      ],
    },
    careerTip:
      "Build your portfolio site first â€” use it as living proof of skill. Deploy every project. Employers want live links, not just GitHub repos.",
  },
  {
    id: "backend",
    slug: "backend-development",
    name: "Backend Development",
    tagline:
      "Build the systems, APIs, and databases that power every application.",
    category: "build",
    colorHex: "#68D391",
    icon: "Server",
    difficulty: 4,
    difficultyLabel: "Hard",
    timeEstimate: "5 to 8 months",
    techStack: [
      "Python",
      "Node.js",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
    ],
    overview: {
      description:
        "Backend developers build the server-side logic, databases, and APIs that power every application. You handle data, security, authentication, and performance â€” none of which users see, but everything depends on.",
      whatYouCanBuild: [
        "REST APIs",
        "Authentication systems",
        "Database schemas",
        "Real-time chat backends",
        "AI-powered APIs",
      ],
      jobTitles: [
        "Backend Developer",
        "API Developer",
        "Node.js Developer",
        "Python Developer",
        "Software Engineer",
      ],
      salaryRange: "$50,000 to $130,000/year",
    },
    roadmap: [
      {
        id: 1,
        title: "Foundations",
        duration: "4 to 6 weeks",
        topics: [
          "How the internet works",
          "HTTP & REST",
          "Python or Node.js basics",
          "Terminal & Linux",
          "Git workflows",
        ],
        description:
          "Understand how web servers communicate and pick your first backend language.",
      },
      {
        id: 2,
        title: "Core Backend",
        duration: "6 to 8 weeks",
        topics: [
          "REST API design",
          "CRUD operations",
          "HTTP methods",
          "JWT Authentication",
          "Input validation",
          "Error handling",
        ],
        description:
          "Build real APIs. Handle requests, manage authentication, and structure your application cleanly.",
      },
      {
        id: 3,
        title: "Databases",
        duration: "4 to 6 weeks",
        topics: [
          "SQL fundamentals",
          "PostgreSQL",
          "Database design",
          "ORM (SQLAlchemy/Prisma)",
          "MongoDB basics",
          "Indexing",
        ],
        description:
          "Data is the heart of every application. Design schemas, query efficiently, and connect databases to your APIs.",
      },
      {
        id: 4,
        title: "Advanced Backend",
        duration: "4 to 6 weeks",
        topics: [
          "FastAPI / Express.js",
          "Caching with Redis",
          "WebSockets",
          "Background jobs",
          "File uploads",
          "Rate limiting",
        ],
        description:
          "Level up your APIs with performance patterns and real-time features.",
      },
      {
        id: 5,
        title: "Deployment",
        duration: "3 to 4 weeks",
        topics: [
          "Docker basics",
          "Render / Railway",
          "Environment variables",
          "CI/CD pipelines",
          "Linux server basics",
        ],
        description:
          "Get your APIs live. Learn containerization and deployment pipelines.",
      },
    ],
    resources: [
      {
        id: "be-1",
        title: "CS50 Web Programming",
        description:
          "Harvard free web course â€” Python, Django, SQL, JavaScript.",
        url: "https://cs50.harvard.edu/web",
        type: "docs",
        free: true,
        source: "Harvard",
      },
      {
        id: "be-2",
        title: "FastAPI Official Docs",
        description:
          "The best API framework documentation with excellent examples.",
        url: "https://fastapi.tiangolo.com",
        type: "docs",
        free: true,
        source: "FastAPI",
      },
      {
        id: "be-3",
        title: "Node.js & Express Full Course",
        description: "Complete Node.js and Express course by freeCodeCamp.",
        url: "https://www.youtube.com/watch?v=Oe421EPjeBE",
        type: "video",
        free: true,
        source: "freeCodeCamp",
      },
      {
        id: "be-4",
        title: "PostgreSQL Full Course",
        description:
          "Learn PostgreSQL from scratch â€” tables, queries, joins, and more.",
        url: "https://www.youtube.com/watch?v=qw--VYLpxG4",
        type: "video",
        free: true,
        source: "freeCodeCamp",
      },
      {
        id: "be-5",
        title: "SQLZoo",
        description:
          "Interactive SQL practice with exercises from beginner to advanced.",
        url: "https://sqlzoo.net",
        type: "practice",
        free: true,
        source: "SQLZoo",
      },
      {
        id: "be-6",
        title: "JWT Introduction",
        description:
          "Official JWT.io documentation explaining tokens, signing, and usage.",
        url: "https://jwt.io/introduction",
        type: "docs",
        free: true,
        source: "jwt.io",
      },
      {
        id: "be-7",
        title: "Docker Full Course",
        description:
          "Learn Docker from ground up â€” images, containers, Compose.",
        url: "https://www.youtube.com/watch?v=fqMOX6JJhGo",
        type: "video",
        free: true,
        source: "freeCodeCamp",
      },
      {
        id: "be-8",
        title: "FastAPI Full Course",
        description: "Complete FastAPI course for Python backend development.",
        url: "https://www.youtube.com/watch?v=0sOvCWFmrtA",
        type: "video",
        free: true,
        source: "freeCodeCamp",
      },
      {
        id: "be-9",
        title: "Use The Index, Luke",
        description:
          "Essential guide to SQL database performance and indexing.",
        url: "https://use-the-index-luke.com",
        type: "docs",
        free: true,
        source: "Markus Winand",
      },
      {
        id: "be-10",
        title: "Full Stack Open",
        description:
          "University of Helsinki â€” Node, Express, MongoDB, GraphQL.",
        url: "https://fullstackopen.com/en",
        type: "docs",
        free: true,
        source: "Univ. of Helsinki",
      },
    ],
    projects: [
      {
        id: "be-p1",
        title: "Blog REST API",
        description:
          "CRUD API for blog posts with categories, pagination, and search.",
        level: "beginner",
        techTags: ["FastAPI", "PostgreSQL"],
      },
      {
        id: "be-p2",
        title: "User Auth System",
        description:
          "Registration, login, JWT tokens, password reset, refresh tokens.",
        level: "beginner",
        techTags: ["Node.js", "JWT", "bcrypt"],
      },
      {
        id: "be-p3",
        title: "URL Shortener",
        description:
          "Shorten URLs, track click counts, and redirect with analytics.",
        level: "intermediate",
        techTags: ["FastAPI", "Redis", "PostgreSQL"],
      },
      {
        id: "be-p4",
        title: "Real-time Chat Backend",
        description:
          "WebSocket chat server with rooms, presence, and message history.",
        level: "advanced",
        techTags: ["Node.js", "WebSockets", "PostgreSQL"],
      },
      {
        id: "be-p5",
        title: "AI-Powered API",
        description:
          "API that accepts text prompts and returns AI-generated responses via Groq.",
        level: "advanced",
        techTags: ["FastAPI", "Groq API", "PostgreSQL"],
      },
    ],
    aiGuide: {
      goodFor: [
        "Writing CRUD route templates fast",
        "Generating SQL queries from plain English",
        "Debugging error messages",
        "Writing API documentation",
        "Suggesting database schema improvements",
      ],
      notFor: [
        "Security-sensitive auth logic â€” always review yourself",
        "Business logic requiring domain knowledge",
        "Replacing testing",
      ],
      tools: [
        {
          name: "GitHub Copilot / Cursor",
          use: "In-editor code generation",
          url: "https://cursor.sh",
        },
        {
          name: "Claude",
          use: "Architecture planning, code review, API docs",
          url: "https://claude.ai",
        },
        {
          name: "Postman AI",
          use: "Auto-generate API test collections",
          url: "https://www.postman.com",
        },
      ],
      samplePrompts: [
        "Write a FastAPI endpoint that accepts a user registration form (email, password, full name), hashes the password with bcrypt, saves to PostgreSQL using SQLAlchemy, and returns a JWT token. Include proper error handling for duplicate emails.",
        "I have this SQL query running slowly on 2 million rows: [paste]. Suggest indexes and optimizations.",
        "Explain this PostgreSQL error and suggest a fix: [paste error]",
      ],
    },
    careerTip:
      "Master one language and one database deeply before branching out. Python + FastAPI + PostgreSQL is an excellent starting combination.",
  },
  {
    id: "fullstack",
    slug: "full-stack-development",
    name: "Full-Stack Development",
    tagline: "Design it, build it, deploy it â€” end to end, all by yourself.",
    category: "build",
    colorHex: "#F6AD55",
    icon: "Layers",
    difficulty: 5,
    difficultyLabel: "Advanced",
    timeEstimate: "8 to 12 months",
    techStack: [
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "Tailwind",
      "Docker",
    ],
    overview: {
      description:
        "Full-stack developers build complete applications â€” the interface, APIs, and databases. You can take a product from idea to deployed, working software entirely on your own.",
      whatYouCanBuild: [
        "Complete SaaS products",
        "E-commerce platforms",
        "Social media platforms",
        "Learning management systems",
        "AI-powered web apps",
      ],
      jobTitles: [
        "Full-Stack Developer",
        "Software Engineer",
        "Product Engineer",
        "Web Application Developer",
      ],
      salaryRange: "$60,000 to $150,000/year",
    },
    roadmap: [
      {
        id: 1,
        title: "Complete Frontend Track",
        duration: "See Frontend track",
        topics: [
          "HTML, CSS, JavaScript",
          "React + Next.js",
          "Tailwind CSS",
          "Deployment to Vercel",
        ],
        description:
          "Full-stack starts with frontend mastery. Complete the Frontend Development track in full first.",
      },
      {
        id: 2,
        title: "Complete Backend Track",
        duration: "See Backend track",
        topics: [
          "Node.js or Python",
          "REST APIs",
          "PostgreSQL",
          "Authentication",
        ],
        description:
          "Then complete the Backend Development track â€” especially REST APIs, authentication, and PostgreSQL.",
      },
      {
        id: 3,
        title: "Integration",
        duration: "3 to 4 weeks",
        topics: [
          "Connecting frontend to backend",
          "Authentication flows end-to-end",
          "Error handling across the stack",
          "State management with server data",
        ],
        description:
          "Integration is where most full-stack learners struggle. Learn to connect all the pieces cleanly.",
      },
      {
        id: 4,
        title: "Full Deployment",
        duration: "2 to 3 weeks",
        topics: [
          "Frontend on Vercel",
          "Backend on Render/Railway",
          "Database on Neon/Supabase",
          "Environment variables",
          "Domain setup",
        ],
        description:
          "Get the complete stack live. Managing different deployment environments is a real skill.",
      },
      {
        id: 5,
        title: "Production Patterns",
        duration: "3 to 4 weeks",
        topics: [
          "SaaS architecture",
          "Stripe payment integration",
          "Real-time features",
          "Background jobs",
        ],
        description:
          "Build things that actually make money. Stripe, real-time, and SaaS patterns unlock serious product building.",
      },
    ],
    resources: [
      {
        id: "fs-1",
        title: "Full Stack Open",
        description:
          "University of Helsinki complete full-stack curriculum. The single best free full-stack course.",
        url: "https://fullstackopen.com/en",
        type: "docs",
        free: true,
        source: "Univ. of Helsinki",
      },
      {
        id: "fs-2",
        title: "The Odin Project",
        description:
          "Complete full-stack curriculum from foundations to NodeJS. All free, project-based.",
        url: "https://www.theodinproject.com",
        type: "docs",
        free: true,
        source: "The Odin Project",
      },
      {
        id: "fs-3",
        title: "Next.js Official Docs",
        description: "Next.js is the premier full-stack React framework.",
        url: "https://nextjs.org/docs",
        type: "docs",
        free: true,
        source: "Vercel",
      },
      {
        id: "fs-4",
        title: "Supabase Docs",
        description:
          "Open-source Firebase alternative: auth, PostgreSQL, storage.",
        url: "https://supabase.com/docs",
        type: "docs",
        free: true,
        source: "Supabase",
      },
      {
        id: "fs-5",
        title: "Stripe Documentation",
        description:
          "Official Stripe docs for payments and subscription billing.",
        url: "https://stripe.com/docs",
        type: "docs",
        free: true,
        source: "Stripe",
      },
      {
        id: "fs-6",
        title: "Full-Stack MERN App",
        description:
          "Build a complete MERN stack application with Traversy Media.",
        url: "https://www.youtube.com/watch?v=nu_pCVPKzTk",
        type: "video",
        free: true,
        source: "Traversy Media",
      },
    ],
    projects: [
      {
        id: "fs-p1",
        title: "Full Blog Platform",
        description:
          "Blog with auth, CRUD posts, comments, categories, and admin panel.",
        level: "intermediate",
        techTags: ["Next.js", "PostgreSQL", "Auth"],
      },
      {
        id: "fs-p2",
        title: "Job Board",
        description:
          "Post, search, and apply for jobs with employer and candidate dashboards.",
        level: "intermediate",
        techTags: ["React", "Node.js", "PostgreSQL"],
      },
      {
        id: "fs-p3",
        title: "E-commerce Platform",
        description:
          "Products, cart, checkout with Stripe, order management, and admin.",
        level: "advanced",
        techTags: ["Next.js", "Stripe", "PostgreSQL"],
      },
      {
        id: "fs-p4",
        title: "AI Productivity App",
        description:
          "Notes + tasks + AI summarization and scheduling â€” like Notion + AI.",
        level: "advanced",
        techTags: ["Next.js", "Groq API", "PostgreSQL", "Redis"],
      },
    ],
    aiGuide: {
      goodFor: [
        "Architecting data models across frontend and backend",
        "Debugging cross-origin errors",
        "Writing API client code",
        "Generating boilerplate for auth and CRUD patterns",
      ],
      notFor: [
        "Security implications of your architecture",
        "Performance profiling decisions",
        "Deployment decisions without review",
      ],
      tools: [
        {
          name: "Cursor",
          use: "Full AI editor â€” excellent for full-stack projects",
          url: "https://cursor.sh",
        },
        {
          name: "v0.dev",
          use: "Generate full-stack Next.js components and pages",
          url: "https://v0.dev",
        },
        {
          name: "Claude",
          use: "Architecture planning, debugging, code review",
          url: "https://claude.ai",
        },
      ],
      samplePrompts: [
        "I am building a SaaS app with Next.js and Supabase. Design a database schema for multi-tenant subscriptions where each organization can have multiple users with roles: admin, member, viewer.",
        "My Next.js app sends a request to my Express API but I get a CORS error. Here is my Express config: [paste]. Here is the error: [paste]. What is wrong and how do I fix it properly?",
      ],
    },
    careerTip:
      "One deployed, polished full-stack project beats ten incomplete ones. Build your best idea to production quality, maintain it, and that single project will get you hired.",
  },
  {
    id: "python",
    slug: "python-development",
    name: "Python Development",
    tagline:
      "The most versatile language in tech â€” automation, APIs, AI, and data.",
    category: "build",
    colorHex: "#FFD43B",
    icon: "Code2",
    difficulty: 3,
    difficultyLabel: "Medium",
    timeEstimate: "3 to 5 months",
    techStack: [
      "Python",
      "FastAPI",
      "SQLAlchemy",
      "Pandas",
      "BeautifulSoup",
      "Groq/OpenAI",
    ],
    overview: {
      description:
        "Python is used for backend APIs, automation, data science, and AI. It has the simplest syntax of any mainstream language â€” perfect for beginners â€” while being powerful enough for the world's largest tech companies.",
      whatYouCanBuild: [
        "REST APIs",
        "Automation scripts",
        "Web scrapers",
        "AI chatbots",
        "Data pipelines",
        "Telegram/WhatsApp bots",
      ],
      jobTitles: [
        "Python Developer",
        "Backend Developer",
        "Data Engineer",
        "Automation Engineer",
        "AI/ML Engineer",
      ],
      salaryRange: "$50,000 to $130,000/year",
    },
    roadmap: [
      {
        id: 1,
        title: "Python Basics",
        duration: "3 to 4 weeks",
        topics: [
          "Variables & data types",
          "Conditions & loops",
          "Functions & scope",
          "Lists, dicts, tuples, sets",
          "File handling & errors",
        ],
        description:
          "Python is one of the easiest languages to start with. Nail the fundamentals and everything else opens up.",
      },
      {
        id: 2,
        title: "Intermediate Python",
        duration: "3 to 4 weeks",
        topics: [
          "OOP: classes & inheritance",
          "Comprehensions",
          "Decorators & generators",
          "Modules & packages",
          "Virtual environments",
        ],
        description:
          "These concepts separate beginners from developers. OOP is especially important for real projects.",
      },
      {
        id: 3,
        title: "Python for the Web",
        duration: "4 to 5 weeks",
        topics: [
          "FastAPI fundamentals",
          "SQLAlchemy ORM",
          "JWT authentication",
          "Async Python",
          "API documentation",
        ],
        description:
          "Build real APIs. FastAPI is the modern choice â€” fast, typed, with beautiful automatic docs.",
      },
      {
        id: 4,
        title: "Automation & Scripting",
        duration: "2 to 3 weeks",
        topics: [
          "File system operations",
          "Web scraping (BeautifulSoup)",
          "Working with PDFs & Excel",
          "Sending emails",
          "Scheduling tasks",
        ],
        description:
          "Python excels at automating repetitive tasks. Build tools that save hours every week.",
      },
      {
        id: 5,
        title: "Python + AI",
        duration: "4 to 6 weeks",
        topics: [
          "OpenAI / Groq API integration",
          "Prompt engineering in Python",
          "LangChain basics",
          "Vector databases intro",
          "Building AI agents",
        ],
        description:
          "Python is the dominant language of AI. Learn to build applications that use LLMs as their backbone.",
      },
    ],
    resources: [
      {
        id: "py-1",
        title: "Official Python Tutorial",
        description: "The Python.org tutorial. Use alongside other sources.",
        url: "https://docs.python.org/3/tutorial",
        type: "docs",
        free: true,
        source: "Python.org",
      },
      {
        id: "py-2",
        title: "Python Full Course for Beginners",
        description:
          "4.5-hour Python beginner course â€” the best single video to start with.",
        url: "https://www.youtube.com/watch?v=rfscVS0vtbw",
        type: "video",
        free: true,
        source: "freeCodeCamp",
      },
      {
        id: "py-3",
        title: "Automate the Boring Stuff",
        description:
          "Free online book: Python automation for files, PDFs, Excel, emails, web scraping.",
        url: "https://automatetheboringstuff.com",
        type: "book",
        free: true,
        source: "Al Sweigart",
      },
      {
        id: "py-4",
        title: "Real Python",
        description: "High-quality Python tutorials on every topic imaginable.",
        url: "https://realpython.com",
        type: "docs",
        free: false,
        source: "Real Python",
      },
      {
        id: "py-5",
        title: "Corey Schafer Python Tutorials",
        description:
          "The best Python YouTube channel. Deep, clear, professional-level content.",
        url: "https://www.youtube.com/@coreyms",
        type: "video",
        free: true,
        source: "Corey Schafer",
      },
      {
        id: "py-6",
        title: "FastAPI Full Course",
        description:
          "Complete FastAPI tutorial â€” routing, auth, databases, deployment.",
        url: "https://www.youtube.com/watch?v=0sOvCWFmrtA",
        type: "video",
        free: true,
        source: "freeCodeCamp",
      },
      {
        id: "py-7",
        title: "Groq API Quickstart",
        description:
          "Run LLMs at incredible speed. The Groq quickstart for Python developers.",
        url: "https://console.groq.com/docs/quickstart",
        type: "docs",
        free: true,
        source: "Groq",
      },
      {
        id: "py-8",
        title: "LangChain Python Docs",
        description:
          "Build AI-powered apps with LangChain â€” agents, chains, and memory.",
        url: "https://python.langchain.com/docs/get_started/introduction",
        type: "docs",
        free: true,
        source: "LangChain",
      },
    ],
    projects: [
      {
        id: "py-p1",
        title: "File Organizer Script",
        description:
          "Auto-sort files in Downloads folder into categorized subfolders.",
        level: "beginner",
        techTags: ["Python", "os", "shutil"],
      },
      {
        id: "py-p2",
        title: "Web Scraper",
        description:
          "Scrape job listings or news and save to CSV with BeautifulSoup.",
        level: "beginner",
        techTags: ["Python", "BeautifulSoup", "requests"],
      },
      {
        id: "py-p3",
        title: "REST API with FastAPI",
        description: "Full CRUD API with FastAPI, SQLAlchemy, and PostgreSQL.",
        level: "intermediate",
        techTags: ["FastAPI", "PostgreSQL", "SQLAlchemy"],
      },
      {
        id: "py-p4",
        title: "PDF Report Generator",
        description: "Take data input and auto-generate formatted PDF reports.",
        level: "intermediate",
        techTags: ["Python", "reportlab", "Pandas"],
      },
      {
        id: "py-p5",
        title: "Telegram Bot",
        description:
          "Build a Telegram bot with commands, inline keyboards, and database persistence.",
        level: "intermediate",
        techTags: ["Python", "python-telegram-bot"],
      },
      {
        id: "py-p6",
        title: "AI Chatbot API",
        description:
          "Multi-turn AI chatbot backed by Groq LLM with conversation history.",
        level: "advanced",
        techTags: ["FastAPI", "Groq API", "PostgreSQL"],
      },
    ],
    aiGuide: {
      goodFor: [
        "Generating automation script templates",
        "Debugging logic errors and tracebacks",
        "Converting pseudocode to Python",
        "Writing docstrings and type hints",
        "Refactoring messy code",
      ],
      notFor: [
        "Understanding concepts for the first time â€” work through them yourself",
        "Replacing testing",
        "Security-sensitive code without thorough review",
      ],
      tools: [
        {
          name: "GitHub Copilot / Cursor",
          use: "In-editor Python code generation",
          url: "https://cursor.sh",
        },
        {
          name: "Claude",
          use: "Code review, refactoring, architecture decisions",
          url: "https://claude.ai",
        },
      ],
      samplePrompts: [
        "Refactor this Python function to be more Pythonic, add type hints, and improve error handling without changing the core logic: [paste code]",
        'Write a Python script using Pandas that: loads all CSV files from a given folder, merges them into one DataFrame, removes duplicate rows by "id" column, and saves the result.',
        "Explain this Python traceback and tell me exactly what to fix: [paste traceback]",
      ],
    },
    careerTip:
      "Python is a gateway language â€” it leads to backend, data, AI, and automation. Once solid at fundamentals, specialize. Pick one direction: APIs, data, or AI, and go deep.",
  },
  {
    id: "uiux",
    slug: "ui-ux-design",
    name: "UI/UX Design",
    tagline: "Design interfaces that feel intuitive, beautiful, and human.",
    category: "design",
    colorHex: "#F687B3",
    icon: "Palette",
    difficulty: 2,
    difficultyLabel: "Beginner-Friendly",
    timeEstimate: "3 to 5 months",
    techStack: ["Figma", "FigJam", "Adobe XD", "Prototyping", "User Research"],
    overview: {
      description:
        "UI designers decide how things look. UX designers decide how things work and feel. Great product designers do both. You research users, design flows, create wireframes, build prototypes, and test with real people.",
      whatYouCanBuild: [
        "Mobile app UIs",
        "Web dashboards",
        "Design systems",
        "Interactive prototypes",
        "Brand identity systems",
      ],
      jobTitles: [
        "UI Designer",
        "UX Designer",
        "Product Designer",
        "UX Researcher",
        "Interaction Designer",
      ],
      salaryRange: "$45,000 to $120,000/year",
    },
    roadmap: [
      {
        id: 1,
        title: "Design Fundamentals",
        duration: "2 to 3 weeks",
        topics: [
          "Typography",
          "Color theory",
          "Layout & grid systems",
          "Visual hierarchy",
          "Gestalt principles",
        ],
        description:
          "Every great designer understands the principles behind visual communication. These are tools, not rules.",
      },
      {
        id: 2,
        title: "UX Foundations",
        duration: "3 to 4 weeks",
        topics: [
          "What is UX?",
          "User research methods",
          "Personas & journey maps",
          "Information architecture",
          "Wireframing",
        ],
        description:
          "UX is about understanding people. Research what users need, map their experiences, and structure information clearly.",
      },
      {
        id: 3,
        title: "Figma Mastery",
        duration: "4 to 6 weeks",
        topics: [
          "Frames, components, variants",
          "Auto layout",
          "Prototyping",
          "Design systems",
          "Developer handoff",
        ],
        description:
          "Figma is the industry-standard design tool. Learn it deeply â€” components, auto-layout, and interactive prototypes.",
      },
      {
        id: 4,
        title: "Advanced UX",
        duration: "3 to 4 weeks",
        topics: [
          "Usability testing",
          "Accessibility design",
          "Mobile-first design",
          "Design sprints",
          "Micro-interactions",
        ],
        description:
          "Move from making things look good to making things work well. Test with real users, fix what breaks, iterate.",
      },
      {
        id: 5,
        title: "Portfolio & Case Studies",
        duration: "Ongoing",
        topics: [
          "Documenting design process",
          "Writing case studies",
          "Publishing on Behance",
          "Presenting work",
        ],
        description:
          "A designer with no portfolio is invisible. Document your thinking, not just final designs.",
      },
    ],
    resources: [
      {
        id: "ux-1",
        title: "Google UX Design Certificate",
        description:
          "Google's 7-course UX certificate on Coursera. Audit for free. Industry recognized.",
        url: "https://www.coursera.org/professional-certificates/google-ux-design",
        type: "docs",
        free: false,
        source: "Google / Coursera",
      },
      {
        id: "ux-2",
        title: "Figma Official Tutorials",
        description:
          "Learn Figma from its creators â€” the fastest way to get started.",
        url: "https://help.figma.com/hc/en-us/categories/360002051613",
        type: "docs",
        free: true,
        source: "Figma",
      },
      {
        id: "ux-3",
        title: "Nielsen Norman Group Articles",
        description:
          "The world's most respected UX research and writing. Read weekly.",
        url: "https://www.nngroup.com/articles",
        type: "docs",
        free: true,
        source: "NNGroup",
      },
      {
        id: "ux-4",
        title: "Interaction Design Foundation",
        description:
          "Comprehensive UX courses â€” many free. Strong theoretical foundation.",
        url: "https://www.interaction-design.org/courses",
        type: "docs",
        free: false,
        source: "IDF",
      },
      {
        id: "ux-5",
        title: "DesignCourse YouTube",
        description:
          "Gary Simon's channel â€” excellent UI design tutorials and Figma walkthroughs.",
        url: "https://www.youtube.com/@DesignCourse",
        type: "video",
        free: true,
        source: "DesignCourse",
      },
      {
        id: "ux-6",
        title: "Mobbin",
        description:
          "Real app UI patterns from thousands of iOS and Android apps. Best design reference.",
        url: "https://mobbin.com",
        type: "tool",
        free: true,
        source: "Mobbin",
      },
      {
        id: "ux-7",
        title: "Coolors",
        description:
          "The fastest color palette generator. Pick, adjust, and export in seconds.",
        url: "https://coolors.co",
        type: "tool",
        free: true,
        source: "Coolors",
      },
      {
        id: "ux-8",
        title: "Google Material Design",
        description:
          "Google's complete design system â€” typography, components, and patterns.",
        url: "https://material.io/design",
        type: "docs",
        free: true,
        source: "Google",
      },
      {
        id: "ux-9",
        title: "Dribbble",
        description:
          "Design community and portfolio platform. Browse for inspiration daily.",
        url: "https://dribbble.com",
        type: "tool",
        free: true,
        source: "Dribbble",
      },
    ],
    projects: [
      {
        id: "ux-p1",
        title: "App Redesign",
        description:
          "Redesign one screen of a popular app with documented reasoning for every decision.",
        level: "beginner",
        techTags: ["Figma"],
      },
      {
        id: "ux-p2",
        title: "Local Business Website UI",
        description:
          "Design a full website UI for a local business from scratch.",
        level: "beginner",
        techTags: ["Figma", "Typography", "Color"],
      },
      {
        id: "ux-p3",
        title: "Mobile App Prototype",
        description:
          "Design and prototype a 5-screen mobile app with full interactive flow in Figma.",
        level: "intermediate",
        techTags: ["Figma", "Prototyping", "UX"],
      },
      {
        id: "ux-p4",
        title: "Design System",
        description:
          "Build a full design system: color palette, type scale, spacing, and 8 components.",
        level: "advanced",
        techTags: ["Figma", "Design Systems"],
      },
      {
        id: "ux-p5",
        title: "Full UX Case Study",
        description:
          "Complete UX process: research, personas, wireframes, prototype, usability test, report.",
        level: "advanced",
        techTags: ["Figma", "Research", "Testing"],
      },
    ],
    aiGuide: {
      goodFor: [
        "Writing UX copy and microcopy",
        "Summarizing user research findings",
        "Generating design critique checklists",
        "Brainstorming component variations",
      ],
      notFor: [
        "Making final design decisions â€” that requires human judgment and taste",
        "Replacing real user research",
        "Building a consistent design system automatically",
      ],
      tools: [
        {
          name: "Midjourney",
          use: "Visual inspiration and mood board generation",
          url: "https://midjourney.com",
        },
        {
          name: "Galileo AI",
          use: "Wireframe generation from text prompts",
          url: "https://www.usegalileo.ai",
        },
        {
          name: "Figma AI",
          use: "Auto-layout suggestions and AI content fill",
          url: "https://www.figma.com",
        },
        {
          name: "Claude",
          use: "UX writing, research synthesis, design critique",
          url: "https://claude.ai",
        },
      ],
      samplePrompts: [
        "Act as a UX copywriter. Write 5 versions of an error message for when a payment fails. App tone is friendly and supportive. Each under 15 words.",
        "I am designing a mobile banking app for young adults aged 18 to 25 in Nigeria. Give me 8 UX principles to prioritize for this audience and context.",
      ],
    },
    careerTip:
      "Case studies win you jobs, not just pretty screens. Document your process to  the problem, your thinking, your decisions. That is what interviewers actually read.",
  },
  {
    id: "qa",
    slug: "qa-engineering",
    name: "QA Engineering",
    tagline:
      "Find what breaks before users do â€” and make sure it stays fixed.",
    category: "grow",
    colorHex: "#76E4F7",
    icon: "Bug",
    difficulty: 3,
    difficultyLabel: "Medium",
    timeEstimate: "3 to 5 months",
    techStack: ["Postman", "Playwright", "Cypress", "Selenium", "Jest", "k6"],
    overview: {
      description:
        "QA engineers ensure software works correctly for every user, in every scenario, on every device. You design test plans, write test cases, automate repetitive tests, and file clear bug reports.",
      whatYouCanBuild: [
        "Automated test suites",
        "API test collections",
        "Performance test reports",
        "Bug tracking documentation",
      ],
      jobTitles: [
        "QA Engineer",
        "Software Tester",
        "Test Automation Engineer",
        "SDET",
        "Quality Analyst",
      ],
      salaryRange: "$40,000 to $100,000/year",
    },
    roadmap: [
      {
        id: 1,
        title: "Testing Fundamentals",
        duration: "3 to 4 weeks",
        topics: [
          "Types of testing",
          "Writing test cases",
          "Bug reporting",
          "Test plans & strategy",
          "Manual testing workflow",
        ],
        description:
          "Understand what software testing is, why it matters, and how to think systematically about finding failures.",
      },
      {
        id: 2,
        title: "Tools & API Testing",
        duration: "3 to 4 weeks",
        topics: [
          "Postman for API testing",
          "Browser DevTools",
          "SQL for data validation",
          "Writing clear bug reports",
        ],
        description:
          "Get hands-on with real testing tools. Postman for APIs and browser DevTools for frontend testing are essential.",
      },
      {
        id: 3,
        title: "Test Automation",
        duration: "5 to 6 weeks",
        topics: [
          "Playwright (recommended)",
          "Cypress for frontend",
          "Selenium WebDriver",
          "Page Object Model",
        ],
        description:
          "Automation is what separates manual testers from engineers. Learn to write tests that run themselves.",
      },
      {
        id: 4,
        title: "Advanced QA",
        duration: "3 to 4 weeks",
        topics: [
          "Performance testing (k6)",
          "Security testing basics",
          "CI/CD test integration",
          "Test reporting",
        ],
        description:
          "Go beyond functional testing â€” performance, security, and integrating tests into development pipelines.",
      },
    ],
    resources: [
      {
        id: "qa-1",
        title: "Software Testing Full Course",
        description:
          "Comprehensive QA course covering manual testing, automation, and tools.",
        url: "https://www.youtube.com/watch?v=4ELH9fNMBOQ",
        type: "video",
        free: true,
        source: "freeCodeCamp",
      },
      {
        id: "qa-2",
        title: "Guru99 Software Testing",
        description:
          "The most comprehensive free testing tutorial site. Covers everything.",
        url: "https://www.guru99.com/software-testing.html",
        type: "docs",
        free: true,
        source: "Guru99",
      },
      {
        id: "qa-3",
        title: "Playwright Official Docs",
        description:
          "Modern, recommended test automation tool. Great docs and cross-browser support.",
        url: "https://playwright.dev/docs/intro",
        type: "docs",
        free: true,
        source: "Microsoft",
      },
      {
        id: "qa-4",
        title: "Postman Learning Center",
        description:
          "Official Postman docs and learning paths. Master API testing completely.",
        url: "https://learning.postman.com/docs/getting-started/introduction",
        type: "docs",
        free: true,
        source: "Postman",
      },
      {
        id: "qa-5",
        title: "Cypress Full Course",
        description:
          "Frontend test automation with Cypress â€” the most popular frontend testing tool.",
        url: "https://www.youtube.com/watch?v=BQqzfHQkREo",
        type: "video",
        free: true,
        source: "freeCodeCamp",
      },
      {
        id: "qa-6",
        title: "Ministry of Testing",
        description:
          "The premier QA community â€” articles, courses, and a global network of testers.",
        url: "https://www.ministryoftesting.com",
        type: "community",
        free: true,
        source: "MoT",
      },
      {
        id: "qa-7",
        title: "k6 Performance Testing",
        description:
          "Load testing with k6 â€” write performance tests in JavaScript.",
        url: "https://k6.io/docs",
        type: "docs",
        free: true,
        source: "Grafana",
      },
    ],
    projects: [
      {
        id: "qa-p1",
        title: "Login Page Test Cases",
        description:
          "Write a complete manual test case document for a login form â€” all paths.",
        level: "beginner",
        techTags: ["Manual Testing", "Documentation"],
      },
      {
        id: "qa-p2",
        title: "API Test Collection",
        description:
          "Build a Postman collection testing a public API endpoint with assertions.",
        level: "beginner",
        techTags: ["Postman", "API Testing"],
      },
      {
        id: "qa-p3",
        title: "Automated Login Tests",
        description:
          "Write Playwright tests for login flow: valid, invalid, locked account.",
        level: "intermediate",
        techTags: ["Playwright", "TypeScript"],
      },
      {
        id: "qa-p4",
        title: "Performance Test Report",
        description:
          "Run k6 load tests against an API, analyze results, write a report.",
        level: "advanced",
        techTags: ["k6", "Performance", "Reporting"],
      },
    ],
    aiGuide: {
      goodFor: [
        "Generating test cases from feature descriptions",
        "Writing Playwright scripts from plain English",
        "Explaining why a test is failing",
        "Reviewing test coverage gaps",
      ],
      notFor: [
        "Replacing actual test execution",
        "Knowing your application's specific business logic",
        "Making severity judgments without product context",
      ],
      tools: [
        {
          name: "GitHub Copilot",
          use: "Writing automation scripts in your editor",
          url: "https://github.com/features/copilot",
        },
        {
          name: "Claude / ChatGPT",
          use: "Generating test cases from requirements",
          url: "https://claude.ai",
        },
      ],
      samplePrompts: [
        "Feature: user can log in with email and password, locked out after 5 failed attempts. Generate complete test cases: happy path, invalid credentials, locked account, empty fields.",
        "Write a Playwright test in TypeScript that navigates to /login, fills email and password, clicks submit, and asserts user is redirected to /dashboard.",
      ],
    },
    careerTip:
      "QA is underrated and underhired. Combine QA with test automation coding skills and you become significantly more employable and better paid.",
  },
  {
    id: "data",
    slug: "data-analysis",
    name: "Data Analysis",
    tagline: "Turn raw numbers into decisions that actually matter.",
    category: "analyze",
    colorHex: "#9F7AEA",
    icon: "BarChart2",
    difficulty: 3,
    difficultyLabel: "Medium",
    timeEstimate: "4 to 6 months",
    techStack: ["Excel", "SQL", "Python", "Pandas", "Power BI", "Tableau"],
    overview: {
      description:
        "Data analysts collect, clean, and interpret data to help organizations make informed decisions. You work with spreadsheets, SQL, Python, and visualization tools to find patterns and tell stories with data.",
      whatYouCanBuild: [
        "Business dashboards",
        "Sales performance reports",
        "Customer behavior analyses",
        "Financial forecasting models",
      ],
      jobTitles: [
        "Data Analyst",
        "Business Intelligence Analyst",
        "Reporting Analyst",
        "Operations Analyst",
      ],
      salaryRange: "$45,000 to $100,000/year",
    },
    roadmap: [
      {
        id: 1,
        title: "Spreadsheets & Excel",
        duration: "2 to 3 weeks",
        topics: [
          "Formulas & functions",
          "Pivot tables",
          "Charts & visualization",
          "Data cleaning in Excel",
          "VLOOKUP / INDEX-MATCH",
        ],
        description:
          "Excel is still the most-used data tool in the world. Master it completely before moving on.",
      },
      {
        id: 2,
        title: "SQL Fundamentals",
        duration: "4 to 5 weeks",
        topics: [
          "SELECT, WHERE, ORDER BY",
          "Aggregations: COUNT, SUM, AVG",
          "JOINs: INNER, LEFT, RIGHT",
          "Subqueries and CTEs",
          "Window functions",
        ],
        description:
          "SQL is the language of data. Every analyst uses it every single day.",
      },
      {
        id: 3,
        title: "Python for Data",
        duration: "5 to 6 weeks",
        topics: [
          "Pandas: data manipulation",
          "NumPy: numerical operations",
          "Matplotlib & Seaborn",
          "Handling missing data",
          "Merging and reshaping data",
        ],
        description:
          "Python unlocks powerful data analysis at scale. Pandas is your most important library.",
      },
      {
        id: 4,
        title: "BI & Visualization Tools",
        duration: "3 to 4 weeks",
        topics: [
          "Power BI fundamentals",
          "Tableau Public",
          "Google Looker Studio",
          "Dashboard design principles",
        ],
        description:
          "Great analysis is useless if you cannot communicate it. Build dashboards that tell clear stories.",
      },
      {
        id: 5,
        title: "Statistics Basics",
        duration: "2 to 3 weeks",
        topics: [
          "Mean, median, mode",
          "Standard deviation",
          "Correlation vs causation",
          "Basic hypothesis testing",
        ],
        description:
          "You need enough statistics to avoid drawing wrong conclusions from your data.",
      },
    ],
    resources: [
      {
        id: "da-1",
        title: "SQL Full Course",
        description:
          "Complete SQL covering everything from SELECT to window functions.",
        url: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
        type: "video",
        free: true,
        source: "freeCodeCamp",
      },
      {
        id: "da-2",
        title: "SQLZoo",
        description:
          "Interactive SQL practice. The best place to drill queries until they feel natural.",
        url: "https://sqlzoo.net",
        type: "practice",
        free: true,
        source: "SQLZoo",
      },
      {
        id: "da-3",
        title: "Pandas Full Course",
        description:
          "Learn Python Pandas â€” loading, cleaning, transforming, and analyzing data.",
        url: "https://www.youtube.com/watch?v=vmEHCJofslg",
        type: "video",
        free: true,
        source: "freeCodeCamp",
      },
      {
        id: "da-4",
        title: "Kaggle Learn",
        description:
          "Free micro-courses on Python, Pandas, SQL, and data viz. Highly practical.",
        url: "https://www.kaggle.com/learn",
        type: "docs",
        free: true,
        source: "Kaggle",
      },
      {
        id: "da-5",
        title: "Excel Full Course",
        description:
          "Master Excel for data analysis â€” formulas, pivot tables, charts, power query.",
        url: "https://www.youtube.com/watch?v=Vl0H-qTclOg",
        type: "video",
        free: true,
        source: "freeCodeCamp",
      },
      {
        id: "da-6",
        title: "Power BI Full Course",
        description:
          "Complete Power BI course â€” connect data and build interactive reports.",
        url: "https://www.youtube.com/watch?v=TmhQCQr_DCA",
        type: "video",
        free: true,
        source: "freeCodeCamp",
      },
      {
        id: "da-7",
        title: "Kaggle Datasets",
        description:
          "Thousands of free datasets to practice on. Download and analyze anything.",
        url: "https://www.kaggle.com/datasets",
        type: "practice",
        free: true,
        source: "Kaggle",
      },
      {
        id: "da-8",
        title: "Select Star SQL",
        description:
          "Interactive SQL book. Best way to learn SQL for real analytical queries.",
        url: "https://selectstarsql.com",
        type: "book",
        free: true,
        source: "Zi Chong Kao",
      },
    ],
    projects: [
      {
        id: "da-p1",
        title: "Sales Dashboard",
        description:
          "Analyze a sales dataset and build an interactive dashboard with KPIs.",
        level: "beginner",
        techTags: ["Excel", "Power BI"],
      },
      {
        id: "da-p2",
        title: "SQL Dataset Analysis",
        description:
          "Download a Kaggle dataset, write 15+ SQL queries, and document insights.",
        level: "beginner",
        techTags: ["SQL", "PostgreSQL"],
      },
      {
        id: "da-p3",
        title: "Student Performance Analysis",
        description:
          "Analyze academic dataset with Pandas: trends, outliers, correlations.",
        level: "intermediate",
        techTags: ["Python", "Pandas", "Matplotlib"],
      },
      {
        id: "da-p4",
        title: "Financial Report Dashboard",
        description:
          "Build a Tableau Public dashboard from a financial CSV dataset.",
        level: "intermediate",
        techTags: ["Tableau", "Data Viz"],
      },
    ],
    aiGuide: {
      goodFor: [
        "Writing SQL queries from plain English",
        "Explaining dataset columns",
        "Suggesting chart types",
        "Writing Pandas cleaning scripts",
        "Interpreting statistical results",
      ],
      notFor: [
        "Interpreting business context it does not know",
        "Replacing statistical understanding",
        "Making business decisions â€” that is your job",
      ],
      tools: [
        {
          name: "ChatGPT Code Interpreter",
          use: "Upload CSVs and ask AI to analyze and chart them",
          url: "https://chat.openai.com",
        },
        {
          name: "Julius AI",
          use: "Dedicated data analysis AI with chart generation",
          url: "https://julius.ai",
        },
        {
          name: "Claude",
          use: "SQL generation, Pandas scripts, insight interpretation",
          url: "https://claude.ai",
        },
      ],
      samplePrompts: [
        "Write a SQL query that finds the top 10 customers by total order value in the past 6 months, grouped by region. Schema: orders(id, customer_id, amount, date, region).",
        'I have a Pandas DataFrame with a "date" column stored as strings in dd/mm/yyyy format. Write code to convert it to datetime, extract month and year, and create a monthly sales summary by product category.',
      ],
    },
    careerTip:
      "Domain knowledge multiplies your value. A data analyst who understands finance, healthcare, or logistics is far more valuable than one who only knows SQL.",
  },
  {
    id: "datascience",
    slug: "data-science",
    name: "Data Science",
    tagline:
      "Build models that predict, classify, and discover patterns in data.",
    category: "analyze",
    colorHex: "#B794F4",
    icon: "BrainCircuit",
    difficulty: 5,
    difficultyLabel: "Advanced",
    timeEstimate: "9 to 14 months",
    techStack: [
      "Python",
      "Pandas",
      "Scikit-learn",
      "TensorFlow",
      "PyTorch",
      "Jupyter",
    ],
    overview: {
      description:
        "Data scientists build machine learning models that predict outcomes, classify data, and find hidden patterns. The field sits at the intersection of statistics, programming, and domain expertise.",
      whatYouCanBuild: [
        "Predictive models",
        "Recommendation systems",
        "Image classifiers",
        "NLP pipelines",
        "Fraud detection systems",
      ],
      jobTitles: [
        "Data Scientist",
        "ML Engineer",
        "AI Researcher",
        "NLP Engineer",
        "Computer Vision Engineer",
      ],
      salaryRange: "$70,000 to $160,000/year",
    },
    roadmap: [
      {
        id: 1,
        title: "Prerequisite: Data Analysis",
        duration: "Complete first",
        topics: [
          "Python + Pandas",
          "SQL",
          "Statistics basics",
          "Data visualization",
        ],
        description:
          "Data Science builds on Data Analysis. Complete that track first â€” especially Python, Pandas, and statistics.",
      },
      {
        id: 2,
        title: "Statistics & Math",
        duration: "3 to 4 weeks",
        topics: [
          "Probability distributions",
          "Linear algebra basics",
          "Calculus concepts (gradients)",
          "Hypothesis testing",
        ],
        description:
          "You do not need a math degree, but you need enough to understand why models work and when they fail.",
      },
      {
        id: 3,
        title: "Machine Learning",
        duration: "6 to 8 weeks",
        topics: [
          "Supervised learning: regression, classification",
          "Unsupervised: clustering",
          "Model evaluation metrics",
          "Feature engineering",
          "Scikit-learn",
        ],
        description:
          "Classical ML is the most practical starting point. Master Scikit-learn and core algorithms first.",
      },
      {
        id: 4,
        title: "Deep Learning Basics",
        duration: "4 to 5 weeks",
        topics: [
          "Neural networks fundamentals",
          "TensorFlow or PyTorch",
          "CNNs for image tasks",
          "Intro to NLP",
          "Transfer learning",
        ],
        description:
          "Deep learning powers modern AI. Start with concepts, then apply with PyTorch or TensorFlow.",
      },
      {
        id: 5,
        title: "MLOps & Deployment",
        duration: "2 to 3 weeks",
        topics: [
          "Saving and loading models",
          "FastAPI ML endpoints",
          "Model monitoring",
          "Experiment tracking (MLflow)",
        ],
        description:
          "A model in a Jupyter notebook has zero impact. Learn to deploy models as usable APIs.",
      },
    ],
    resources: [
      {
        id: "ds-1",
        title: "fast.ai",
        description:
          "Practical deep learning from the top down. One of the best AI courses in existence. Free.",
        url: "https://www.fast.ai",
        type: "docs",
        free: true,
        source: "fast.ai",
      },
      {
        id: "ds-2",
        title: "Andrew Ng ML Course",
        description:
          "The course that introduced millions to machine learning. Audit free on Coursera.",
        url: "https://www.coursera.org/specializations/machine-learning-introduction",
        type: "docs",
        free: false,
        source: "DeepLearning.AI",
      },
      {
        id: "ds-3",
        title: "Kaggle Learn ML",
        description:
          "Free ML courses: intro to ML, intermediate ML, feature engineering, deep learning.",
        url: "https://www.kaggle.com/learn",
        type: "docs",
        free: true,
        source: "Kaggle",
      },
      {
        id: "ds-4",
        title: "Introduction to Statistical Learning",
        description:
          "Essential ML statistics textbook. Free PDF. Read alongside coding practice.",
        url: "https://www.statlearning.com",
        type: "book",
        free: true,
        source: "James, Witten, Hastie, Tibshirani",
      },
      {
        id: "ds-5",
        title: "ML Full Course",
        description:
          "Machine learning course covering core algorithms with Python.",
        url: "https://www.youtube.com/watch?v=i_LwzRVP7bg",
        type: "video",
        free: true,
        source: "freeCodeCamp",
      },
      {
        id: "ds-6",
        title: "PyTorch Official Tutorials",
        description:
          "Official PyTorch tutorials â€” the industry-standard deep learning framework.",
        url: "https://pytorch.org/tutorials",
        type: "docs",
        free: true,
        source: "Meta AI",
      },
      {
        id: "ds-7",
        title: "StatQuest with Josh Starmer",
        description:
          "Statistics and ML concepts explained visually and clearly. Essential channel.",
        url: "https://www.youtube.com/@statquest",
        type: "video",
        free: true,
        source: "StatQuest",
      },
    ],
    projects: [
      {
        id: "ds-p1",
        title: "Titanic Survival Predictor",
        description:
          "Classic Kaggle competition. Build a classifier with feature engineering.",
        level: "beginner",
        techTags: ["Python", "Pandas", "Scikit-learn"],
      },
      {
        id: "ds-p2",
        title: "House Price Prediction",
        description:
          "Regression model predicting property prices with feature analysis and cross-validation.",
        level: "intermediate",
        techTags: ["Scikit-learn", "Pandas", "EDA"],
      },
      {
        id: "ds-p3",
        title: "Image Classifier",
        description:
          "CNN classifier for 10-class image recognition using PyTorch.",
        level: "advanced",
        techTags: ["PyTorch", "CNN", "GPU Training"],
      },
      {
        id: "ds-p4",
        title: "Deployed ML API",
        description:
          "Train a model, save it, and serve predictions via FastAPI endpoint.",
        level: "advanced",
        techTags: ["FastAPI", "scikit-learn", "Docker"],
      },
    ],
    aiGuide: {
      goodFor: [
        "Explaining ML algorithms in plain terms",
        "Debugging model training code",
        "Suggesting feature engineering ideas",
        "Explaining statistical concepts",
      ],
      notFor: [
        "Replacing mathematical understanding â€” you must grasp why models work",
        "Validating results without your own analysis",
      ],
      tools: [
        {
          name: "ChatGPT Code Interpreter",
          use: "Upload datasets and run ML experiments interactively",
          url: "https://chat.openai.com",
        },
        {
          name: "Claude",
          use: "Explaining concepts, debugging training pipelines",
          url: "https://claude.ai",
        },
      ],
      samplePrompts: [
        "Explain gradient descent as if I understand basic algebra but not calculus. Include why it works and what can go wrong with learning rate.",
        "My Random Forest has 97% training accuracy but only 61% test accuracy. Explain what is happening and give me 5 concrete steps to fix it.",
      ],
    },
    careerTip:
      "Kaggle competitions are your portfolio. Even finishing in the top 40% shows employers you can apply ML to real problems. Publish your notebooks.",
  },
  {
    id: "devops",
    slug: "devops-engineering",
    name: "DevOps Engineering",
    tagline:
      "Build the infrastructure and pipelines that keep software running at scale.",
    category: "grow",
    colorHex: "#FC8181",
    icon: "GitBranch",
    difficulty: 5,
    difficultyLabel: "Advanced",
    timeEstimate: "8 to 12 months",
    techStack: [
      "Linux",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "AWS/GCP",
      "Terraform",
    ],
    overview: {
      description:
        "DevOps engineers design and maintain infrastructure, deployment pipelines, and monitoring systems that keep software running reliably. You bridge development and operations.",
      whatYouCanBuild: [
        "CI/CD pipelines",
        "Containerized deployments",
        "Monitoring dashboards",
        "Infrastructure as code",
        "Auto-scaling systems",
      ],
      jobTitles: [
        "DevOps Engineer",
        "Site Reliability Engineer (SRE)",
        "Platform Engineer",
        "Cloud Engineer",
      ],
      salaryRange: "$70,000 to $160,000/year",
    },
    roadmap: [
      {
        id: 1,
        title: "Linux & Networking",
        duration: "4 to 5 weeks",
        topics: [
          "Linux command line mastery",
          "TCP/IP, DNS, HTTP, SSH",
          "Shell scripting (Bash)",
          "File permissions & users",
        ],
        description:
          "Everything in DevOps runs on Linux. Master the command line and networking before anything else.",
      },
      {
        id: 2,
        title: "Version Control & CI/CD",
        duration: "3 to 4 weeks",
        topics: [
          "Advanced Git workflows",
          "GitHub Actions",
          "CI/CD concepts",
          "Pipeline building",
        ],
        description:
          "Automate the process from code commit to production deployment.",
      },
      {
        id: 3,
        title: "Containers & Docker",
        duration: "4 to 5 weeks",
        topics: [
          "Containerization concepts",
          "Docker images & containers",
          "Docker Compose",
          "Multi-stage builds",
        ],
        description:
          "Docker changed how software is packaged and deployed. Understanding containers is fundamental.",
      },
      {
        id: 4,
        title: "Cloud & Orchestration",
        duration: "4 to 6 weeks",
        topics: [
          "Cloud concepts (AWS/GCP/Azure)",
          "Kubernetes fundamentals",
          "Infrastructure as Code (Terraform)",
          "Serverless basics",
        ],
        description:
          "Learn the major concepts and at least one cloud provider deeply.",
      },
      {
        id: 5,
        title: "Monitoring & Security",
        duration: "2 to 3 weeks",
        topics: [
          "Prometheus & Grafana",
          "Log aggregation",
          "Alerting systems",
          "Security hardening",
        ],
        description:
          "Keeping systems healthy requires knowing when they are unhealthy. Monitoring is how you know before users do.",
      },
    ],
    resources: [
      {
        id: "dv-1",
        title: "Linux Full Course",
        description:
          "Complete Linux course â€” command line, file system, processes, and scripting.",
        url: "https://www.youtube.com/watch?v=j5Zsa_eOXeY",
        type: "video",
        free: true,
        source: "freeCodeCamp",
      },
      {
        id: "dv-2",
        title: "Docker Full Course",
        description:
          "Learn Docker from the ground up â€” images, containers, volumes, Compose.",
        url: "https://www.youtube.com/watch?v=fqMOX6JJhGo",
        type: "video",
        free: true,
        source: "freeCodeCamp",
      },
      {
        id: "dv-3",
        title: "GitHub Actions Docs",
        description:
          "Official GitHub Actions documentation. Learn CI/CD with the most popular tool.",
        url: "https://docs.github.com/en/actions",
        type: "docs",
        free: true,
        source: "GitHub",
      },
      {
        id: "dv-4",
        title: "Kubernetes Tutorials",
        description:
          "Official Kubernetes tutorials from basics to advanced deployment strategies.",
        url: "https://kubernetes.io/docs/tutorials",
        type: "docs",
        free: true,
        source: "CNCF",
      },
      {
        id: "dv-5",
        title: "TechWorld with Nana",
        description:
          "The best DevOps YouTube channel â€” Docker, Kubernetes, CI/CD, cloud.",
        url: "https://www.youtube.com/@TechWorldwithNana",
        type: "video",
        free: true,
        source: "TechWorld with Nana",
      },
      {
        id: "dv-6",
        title: "Terraform Learn",
        description:
          "HashiCorp's official Terraform learning platform â€” Infrastructure as Code.",
        url: "https://learn.hashicorp.com/terraform",
        type: "docs",
        free: true,
        source: "HashiCorp",
      },
      {
        id: "dv-7",
        title: "AWS Full Course",
        description: "Complete AWS cloud fundamentals course for beginners.",
        url: "https://www.youtube.com/watch?v=IPvYjXCsTg8",
        type: "video",
        free: true,
        source: "freeCodeCamp",
      },
    ],
    projects: [
      {
        id: "dv-p1",
        title: "Dockerized Application",
        description:
          "Containerize a full-stack app with multi-stage Docker build and Docker Compose.",
        level: "intermediate",
        techTags: ["Docker", "Docker Compose"],
      },
      {
        id: "dv-p2",
        title: "CI/CD Pipeline",
        description:
          "GitHub Actions pipeline: test â†’ build Docker image â†’ deploy to Render.",
        level: "intermediate",
        techTags: ["GitHub Actions", "Docker", "CI/CD"],
      },
      {
        id: "dv-p3",
        title: "Monitoring Stack",
        description:
          "Set up Prometheus and Grafana to monitor an API with dashboards and alerts.",
        level: "advanced",
        techTags: ["Prometheus", "Grafana", "Docker"],
      },
    ],
    aiGuide: {
      goodFor: [
        "Writing Dockerfiles and docker-compose files",
        "Creating GitHub Actions workflows",
        "Writing Bash scripts",
        "Explaining infrastructure errors",
        "Generating Terraform configs",
      ],
      notFor: [
        "Replacing hands-on experience with real infrastructure",
        "Security decisions without expert review",
      ],
      tools: [
        {
          name: "GitHub Copilot",
          use: "YAML pipeline generation and script writing",
          url: "https://github.com/features/copilot",
        },
        {
          name: "Warp Terminal",
          use: "AI-powered terminal with command suggestions",
          url: "https://www.warp.dev",
        },
      ],
      samplePrompts: [
        "Write a multi-stage Dockerfile for a Python FastAPI app: uses Python 3.11, installs dependencies, runs as non-root user, exposes port 8000, minimizes final image size.",
        "Write a GitHub Actions workflow that triggers on push to main, runs pytest, builds a Docker image, pushes to Docker Hub, and deploys to Render via deploy hook.",
      ],
    },
    careerTip:
      "Get the AWS Cloud Practitioner certification while learning â€” it is free to study for and validates foundational knowledge. Then aim for AWS Solutions Architect Associate.",
  },
  {
    id: "cyber",
    slug: "cybersecurity",
    name: "Cybersecurity",
    tagline: "Protect systems, find vulnerabilities, and defend what matters.",
    category: "grow",
    colorHex: "#48BB78",
    icon: "Shield",
    difficulty: 4,
    difficultyLabel: "Hard",
    timeEstimate: "6 to 10 months",
    techStack: [
      "Linux",
      "Kali Linux",
      "Wireshark",
      "Nmap",
      "Burp Suite",
      "Metasploit",
    ],
    overview: {
      description:
        "Cybersecurity professionals protect systems and data from attacks. Ethical hackers find vulnerabilities before malicious actors do. One of the fastest-growing, highest-demand fields in tech globally.",
      whatYouCanBuild: [
        "Vulnerability assessment reports",
        "Penetration testing scripts",
        "Security audit documentation",
        "CTF challenge solutions",
      ],
      jobTitles: [
        "Security Analyst",
        "Penetration Tester",
        "Cybersecurity Engineer",
        "SOC Analyst",
        "Ethical Hacker",
      ],
      salaryRange: "$60,000 to $150,000/year",
    },
    roadmap: [
      {
        id: 1,
        title: "Networking Fundamentals",
        duration: "3 to 4 weeks",
        topics: [
          "TCP/IP, DNS, HTTP/HTTPS",
          "OSI model",
          "Firewalls, VPNs, proxies",
          "Wireshark traffic analysis",
        ],
        description:
          "You cannot protect what you do not understand. Network knowledge is the foundation of all security work.",
      },
      {
        id: 2,
        title: "Security Concepts",
        duration: "3 to 4 weeks",
        topics: [
          "CIA Triad",
          "Authentication & authorization",
          "Common attacks: phishing, MITM, SQLi, XSS",
          "OWASP Top 10",
        ],
        description:
          "Learn the language of security â€” attacks, defenses, and the frameworks professionals use.",
      },
      {
        id: 3,
        title: "Ethical Hacking",
        duration: "5 to 6 weeks",
        topics: [
          "Kali Linux setup",
          "Reconnaissance (OSINT)",
          "Vulnerability scanning (Nmap, Nessus)",
          "Exploitation (Metasploit)",
          "Web app testing (Burp Suite)",
        ],
        description:
          "Think like an attacker. This is how security professionals find and report vulnerabilities.",
      },
      {
        id: 4,
        title: "Defensive Security",
        duration: "3 to 4 weeks",
        topics: [
          "Log analysis",
          "SIEM tools (Splunk basics)",
          "Incident response",
          "Security hardening",
        ],
        description:
          "Offense teaches you how attacks work. Defense teaches you how to stop them.",
      },
    ],
    resources: [
      {
        id: "cy-1",
        title: "TryHackMe",
        description:
          "The best beginner cybersecurity platform. Gamified labs and guided paths.",
        url: "https://tryhackme.com",
        type: "practice",
        free: true,
        source: "TryHackMe",
      },
      {
        id: "cy-2",
        title: "HackTheBox",
        description:
          "Intermediate to advanced hacking labs. The next step after TryHackMe.",
        url: "https://www.hackthebox.com",
        type: "practice",
        free: true,
        source: "HackTheBox",
      },
      {
        id: "cy-3",
        title: "PortSwigger Web Security Academy",
        description:
          "Free world-class web security training from the Burp Suite creators.",
        url: "https://portswigger.net/web-security",
        type: "docs",
        free: true,
        source: "PortSwigger",
      },
      {
        id: "cy-4",
        title: "Google Cybersecurity Certificate",
        description:
          "Google's cybersecurity certificate on Coursera. Audit for free.",
        url: "https://www.coursera.org/professional-certificates/google-cybersecurity",
        type: "docs",
        free: false,
        source: "Google / Coursera",
      },
      {
        id: "cy-5",
        title: "NetworkChuck YouTube",
        description:
          "Networking and cybersecurity content. Engaging and practical.",
        url: "https://www.youtube.com/@NetworkChuck",
        type: "video",
        free: true,
        source: "NetworkChuck",
      },
      {
        id: "cy-6",
        title: "OWASP Top 10",
        description:
          "The definitive list of the 10 most critical web application security risks.",
        url: "https://owasp.org/www-project-top-ten",
        type: "docs",
        free: true,
        source: "OWASP",
      },
      {
        id: "cy-7",
        title: "PicoCTF",
        description:
          "Beginner Capture The Flag challenges. Best place to start practicing.",
        url: "https://picoctf.org",
        type: "practice",
        free: true,
        source: "CMU",
      },
    ],
    projects: [
      {
        id: "cy-p1",
        title: "Home Network Audit",
        description:
          "Use Nmap to scan your own network and document devices, open ports, and risks.",
        level: "beginner",
        techTags: ["Nmap", "Linux"],
      },
      {
        id: "cy-p2",
        title: "Vulnerable App Pentest",
        description:
          "Test DVWA or HackTheBox and write a professional penetration test report.",
        level: "intermediate",
        techTags: ["Kali Linux", "Burp Suite", "Metasploit"],
      },
      {
        id: "cy-p3",
        title: "CTF Write-ups",
        description:
          "Solve 5 TryHackMe challenges and publish detailed write-ups.",
        level: "intermediate",
        techTags: ["CTF", "Linux", "Crypto"],
      },
    ],
    aiGuide: {
      goodFor: [
        "Explaining security concepts and attack vectors",
        "Writing security policy documentation",
        "Understanding CVEs and vulnerability reports",
      ],
      notFor: [
        "Any task facilitating real attacks on systems you do not own",
        "Bypassing security controls in production",
        "Generating malicious code of any kind",
      ],
      tools: [
        {
          name: "Claude / ChatGPT",
          use: "Explaining security concepts and documentation writing",
          url: "https://claude.ai",
        },
      ],
      samplePrompts: [
        "Explain how SQL injection works, what damage it can cause, and the 3 most effective prevention methods in a Python + PostgreSQL application.",
        "Explain the difference between symmetric and asymmetric encryption, when each is used, and give real-world examples of both.",
      ],
    },
    careerTip:
      "Certifications matter more in cybersecurity than any other tech track. Aim for CompTIA Security+ first â€” it is widely recognized and achievable for beginners.",
  },
  {
    id: "mobile",
    slug: "mobile-development",
    name: "Mobile Development",
    tagline: "Build apps that live in the pockets of billions of people.",
    category: "build",
    colorHex: "#63B3ED",
    icon: "Smartphone",
    difficulty: 4,
    difficultyLabel: "Hard",
    timeEstimate: "5 to 8 months",
    techStack: [
      "React Native",
      "Expo",
      "Flutter",
      "Dart",
      "Firebase",
      "TypeScript",
    ],
    overview: {
      description:
        "Mobile developers build apps for Android and iOS. React Native (JavaScript/TypeScript) and Flutter (Dart) are the two most popular cross-platform frameworks â€” write once, deploy to both platforms.",
      whatYouCanBuild: [
        "Chat apps",
        "Finance trackers",
        "E-commerce apps",
        "Health and habit apps",
        "Social platforms",
      ],
      jobTitles: [
        "Mobile Developer",
        "React Native Developer",
        "Flutter Developer",
        "iOS Developer",
        "Android Developer",
      ],
      salaryRange: "$55,000 to $130,000/year",
    },
    roadmap: [
      {
        id: 1,
        title: "Prerequisites",
        duration: "3 to 4 weeks",
        topics: [
          "JavaScript / React fundamentals (for RN)",
          "Dart basics (for Flutter)",
          "Mobile UI design principles",
        ],
        description:
          "Choose your track: React Native (JS background) or Flutter (learn Dart). Both are excellent for cross-platform development.",
      },
      {
        id: 2,
        title: "Core Mobile Development",
        duration: "4 to 5 weeks",
        topics: [
          "Components & styling",
          "Navigation (React Navigation / GoRouter)",
          "State management",
          "Device APIs: camera, location",
        ],
        description:
          "Build your first real screens. Mobile development feels different from web â€” learn the patterns that make apps feel native.",
      },
      {
        id: 3,
        title: "Firebase & Backend",
        duration: "3 to 4 weeks",
        topics: [
          "Firebase Authentication",
          "Firestore database",
          "Firebase Storage",
          "Push notifications",
        ],
        description:
          "Firebase gives your app a full backend without building one from scratch. Perfect for MVPs.",
      },
      {
        id: 4,
        title: "Publishing & Polish",
        duration: "2 to 3 weeks",
        topics: [
          "Play Store publishing",
          "App Store publishing",
          "App icons & splash screens",
          "Performance optimization",
        ],
        description:
          "Getting an app to production is a skill of its own. Learn publishing, ASO, and monitoring.",
      },
    ],
    resources: [
      {
        id: "mob-1",
        title: "React Native Official Docs",
        description:
          "The complete React Native documentation â€” components, APIs, and guides.",
        url: "https://reactnative.dev/docs/getting-started",
        type: "docs",
        free: true,
        source: "Meta",
      },
      {
        id: "mob-2",
        title: "Expo Documentation",
        description:
          "Expo is the easiest way to start React Native development.",
        url: "https://docs.expo.dev",
        type: "docs",
        free: true,
        source: "Expo",
      },
      {
        id: "mob-3",
        title: "React Native Full Course",
        description:
          "Complete React Native course by freeCodeCamp â€” components to deployment.",
        url: "https://www.youtube.com/watch?v=0-S5a0eXPoc",
        type: "video",
        free: true,
        source: "freeCodeCamp",
      },
      {
        id: "mob-4",
        title: "Flutter Official Getting Started",
        description:
          "Google's Flutter documentation and getting started guide.",
        url: "https://flutter.dev/docs/get-started",
        type: "docs",
        free: true,
        source: "Google",
      },
      {
        id: "mob-5",
        title: "Flutter Full Course",
        description:
          "Complete Flutter course from zero â€” widgets, navigation, Firebase, deployment.",
        url: "https://www.youtube.com/watch?v=VPvVD8t02U8",
        type: "video",
        free: true,
        source: "freeCodeCamp",
      },
      {
        id: "mob-6",
        title: "Firebase Official Docs",
        description:
          "Official Firebase docs covering auth, Firestore, storage, and more.",
        url: "https://firebase.google.com/docs",
        type: "docs",
        free: true,
        source: "Google",
      },
    ],
    projects: [
      {
        id: "mob-p1",
        title: "Chat App",
        description:
          "Real-time messaging with rooms, user avatars, and Firebase backend.",
        level: "intermediate",
        techTags: ["React Native", "Firebase", "Expo"],
      },
      {
        id: "mob-p2",
        title: "Finance Tracker",
        description:
          "Track income and expenses with charts, categories, and monthly summaries.",
        level: "intermediate",
        techTags: ["React Native", "SQLite", "Charts"],
      },
      {
        id: "mob-p3",
        title: "Habit Tracker App",
        description:
          "Track daily habits with streaks, reminders, and a progress dashboard.",
        level: "intermediate",
        techTags: ["React Native", "AsyncStorage", "Notifications"],
      },
      {
        id: "mob-p4",
        title: "E-commerce App",
        description:
          "Product catalog, cart, checkout with backend API integration.",
        level: "advanced",
        techTags: ["React Native", "FastAPI", "Stripe"],
      },
    ],
    aiGuide: {
      goodFor: [
        "Generating React Native component templates",
        "Explaining platform-specific errors",
        "Writing navigation configuration",
        "Debugging Firebase integration issues",
      ],
      notFor: [
        "Device-specific behavior testing â€” you need physical devices",
        "App Store review policy decisions",
      ],
      tools: [
        {
          name: "GitHub Copilot",
          use: "Component generation and code completion",
          url: "https://github.com/features/copilot",
        },
        {
          name: "Claude / ChatGPT",
          use: "Debugging platform errors and architecture questions",
          url: "https://claude.ai",
        },
      ],
      samplePrompts: [
        "Write a React Native component for a custom bottom tab navigator with 4 tabs: Home, Explore, Notifications, Profile. Use Expo icons and React Navigation. Include TypeScript types.",
        "I am getting this Expo build error: [paste error]. Explain the cause and exact steps to fix it.",
      ],
    },
    careerTip:
      "Publish at least one app to the Play Store. A live app link is far more powerful than a GitHub repo. The publishing process teaches things no course covers.",
  },
  {
    id: "video",
    slug: "video-editing",
    name: "Video Editing",
    tagline:
      "Transform raw footage into stories that captivate and retain audiences.",
    category: "grow",
    colorHex: "#FBB040",
    icon: "Film",
    difficulty: 2,
    difficultyLabel: "Beginner-Friendly",
    timeEstimate: "2 to 4 months",
    techStack: ["DaVinci Resolve", "Premiere Pro", "CapCut", "After Effects"],
    overview: {
      description:
        "Video editors cut, arrange, color, and polish raw footage into compelling content for YouTube, social media, film, and marketing. One of the most in-demand creative skills in the world.",
      whatYouCanBuild: [
        "YouTube long-form edits",
        "Reels and Shorts",
        "Brand promos",
        "Documentary cuts",
        "Motion graphic intros",
      ],
      jobTitles: [
        "Video Editor",
        "Content Creator",
        "Motion Designer",
        "Post-Production Editor",
        "Social Media Video Editor",
      ],
      salaryRange: "$35,000 to $90,000/year (freelance varies widely)",
    },
    roadmap: [
      {
        id: 1,
        title: "Editing Fundamentals",
        duration: "2 to 3 weeks",
        topics: [
          "Timeline editing",
          "Cut types: hard cut, J-cut, L-cut",
          "Audio levels and syncing",
          "Export settings",
        ],
        description:
          "Learn how editing software works and the fundamental language of cuts, transitions, and timing.",
      },
      {
        id: 2,
        title: "Storytelling & Pacing",
        duration: "2 to 3 weeks",
        topics: [
          "Story structure",
          "Pacing for different formats",
          "Music selection and sync",
          "Retention editing",
        ],
        description:
          "Technical editing is the vehicle. Storytelling is the destination. Make people watch until the end.",
      },
      {
        id: 3,
        title: "Visual Effects & Graphics",
        duration: "3 to 4 weeks",
        topics: [
          "Color correction and grading",
          "Text animations",
          "Basic motion graphics",
          "Sound design",
        ],
        description:
          "Elevate your edits with professional color, clear typography, and visual polish.",
      },
      {
        id: 4,
        title: "Platform-Specific Editing",
        duration: "2 to 3 weeks",
        topics: [
          "YouTube long-form (10 to 20 min)",
          "Shorts and Reels (60 to 90 sec)",
          "Captions and subtitles",
          "Podcast video editing",
        ],
        description:
          "Different platforms have different editing languages. Master the nuances of each format.",
      },
    ],
    resources: [
      {
        id: "vid-1",
        title: "DaVinci Resolve Official Training",
        description:
          "Free professional-grade video editing software with official training.",
        url: "https://www.blackmagicdesign.com/products/davinciresolve/training",
        type: "docs",
        free: true,
        source: "Blackmagic Design",
      },
      {
        id: "vid-2",
        title: "Casey Faris â€” DaVinci Resolve",
        description:
          "Best DaVinci Resolve YouTube channel. Clear tutorials for all levels.",
        url: "https://www.youtube.com/@CaseyFaris",
        type: "video",
        free: true,
        source: "Casey Faris",
      },
      {
        id: "vid-3",
        title: "Adobe Premiere Pro Tutorials",
        description:
          "Official Adobe tutorials for Premiere Pro â€” industry standard for professional editing.",
        url: "https://helpx.adobe.com/premiere-pro/tutorials.html",
        type: "docs",
        free: false,
        source: "Adobe",
      },
      {
        id: "vid-4",
        title: "CapCut Learn Center",
        description:
          "Official CapCut tutorials. Best mobile editing tool for beginners.",
        url: "https://www.capcut.com/learn",
        type: "docs",
        free: true,
        source: "CapCut",
      },
      {
        id: "vid-5",
        title: "Pexels â€” Free Stock Video",
        description:
          "High-quality free stock video for practice projects and B-roll.",
        url: "https://www.pexels.com",
        type: "tool",
        free: true,
        source: "Pexels",
      },
      {
        id: "vid-6",
        title: "Descript",
        description:
          "AI-powered transcript-based video editing. Edit video like a document.",
        url: "https://www.descript.com",
        type: "tool",
        free: false,
        source: "Descript",
      },
    ],
    projects: [
      {
        id: "vid-p1",
        title: "Talking Head Edit",
        description:
          "Record 5 minutes of yourself talking, edit it down to 2 tight, engaging minutes.",
        level: "beginner",
        techTags: ["DaVinci Resolve", "CapCut"],
      },
      {
        id: "vid-p2",
        title: "60-Second Promo",
        description:
          "Create a 60-second product promo from stock footage and music.",
        level: "beginner",
        techTags: ["DaVinci Resolve", "Motion Graphics"],
      },
      {
        id: "vid-p3",
        title: "YouTube Video Edit",
        description:
          "Edit a 10 to 15 minute YouTube video with B-roll, lower thirds, color grade.",
        level: "intermediate",
        techTags: ["Premiere Pro", "After Effects"],
      },
    ],
    aiGuide: {
      goodFor: [
        "Writing scripts and voiceover copy",
        "Generating YouTube title options",
        "Creating thumbnail concepts",
        "Suggesting pacing and structure improvements",
      ],
      notFor: [
        "Making creative editing decisions â€” that requires human taste",
        "Replacing the craft of storytelling",
      ],
      tools: [
        {
          name: "ElevenLabs",
          use: "AI voiceover generation for narration",
          url: "https://elevenlabs.io",
        },
        {
          name: "Descript",
          use: "AI transcript editing, filler word removal",
          url: "https://www.descript.com",
        },
        {
          name: "Claude / ChatGPT",
          use: "Script writing, titles, descriptions",
          url: "https://claude.ai",
        },
      ],
      samplePrompts: [
        "Write a 60-second YouTube Shorts script about [topic]. Hook viewer in the first 3 seconds with a question, deliver one clear insight, end with a specific call to action. Tone: energetic and direct.",
        "Generate 10 YouTube title options for a video about [topic]. Curiosity-driven, under 60 characters, optimized for click-through rate.",
      ],
    },
    careerTip:
      'Specialize early. "I edit finance or tech YouTube videos with graphics and captions" gets you hired and lets you charge more than a generic editor.',
  },
  {
    id: "youtube",
    slug: "youtube-automation",
    name: "YouTube Automation",
    tagline: "Build content businesses that generate value while you sleep.",
    category: "grow",
    colorHex: "#FF4E4E",
    icon: "Youtube",
    difficulty: 2,
    difficultyLabel: "Beginner-Friendly",
    timeEstimate: "1 to 3 months",
    techStack: ["Canva", "ElevenLabs", "CapCut", "vidIQ", "TubeBuddy"],
    overview: {
      description:
        "YouTube automation is building channels that produce video content systematically â€” using scripts, AI voices, stock footage, and editors â€” without being on camera. It is a content business model as much as a skill.",
      whatYouCanBuild: [
        "Faceless YouTube channels",
        "Niche content businesses",
        "Educational video series",
        "AI-narrated documentaries",
      ],
      jobTitles: [
        "Content Creator",
        "YouTube Strategist",
        "Channel Manager",
        "Digital Media Producer",
      ],
      salaryRange: "$0 to $50,000+/month (highly variable, performance-based)",
    },
    roadmap: [
      {
        id: 1,
        title: "Channel Strategy",
        duration: "1 to 2 weeks",
        topics: [
          "Niche selection",
          "Search volume research",
          "Competitor analysis",
          "Channel setup and branding",
        ],
        description:
          "Pick the right niche before creating anything. Evergreen topics with search demand and low competition are the target.",
      },
      {
        id: 2,
        title: "Content Production",
        duration: "3 to 4 weeks",
        topics: [
          "Script writing with hooks",
          "AI voiceovers (ElevenLabs)",
          "Stock footage sourcing",
          "Thumbnail design (Canva)",
        ],
        description:
          "Build a repeatable production system. Automation channels live or die by consistency and quality.",
      },
      {
        id: 3,
        title: "Growth & SEO",
        duration: "2 to 3 weeks",
        topics: [
          "YouTube SEO",
          "Title and thumbnail optimization",
          "Upload schedule",
          "Analytics reading",
        ],
        description:
          "Publishing is only half the work. Learn how to get YouTube to recommend your videos.",
      },
      {
        id: 4,
        title: "Monetization",
        duration: "Ongoing",
        topics: [
          "YouTube Partner Program",
          "Sponsorships",
          "Affiliate marketing",
          "Digital products",
        ],
        description:
          "Multiple income streams make a channel sustainable. YPP is the start, not the end.",
      },
    ],
    resources: [
      {
        id: "yt-1",
        title: "Matt Par YouTube Channel",
        description:
          "The leading YouTube automation channel. Systems, niches, strategy from someone running many channels.",
        url: "https://www.youtube.com/@MattPar",
        type: "video",
        free: true,
        source: "Matt Par",
      },
      {
        id: "yt-2",
        title: "ElevenLabs",
        description:
          "Industry-best AI voice generation. Indistinguishable from human narration.",
        url: "https://elevenlabs.io",
        type: "tool",
        free: false,
        source: "ElevenLabs",
      },
      {
        id: "yt-3",
        title: "Canva",
        description:
          "Design thumbnails, channel art, and graphics â€” free plan is sufficient to start.",
        url: "https://www.canva.com",
        type: "tool",
        free: true,
        source: "Canva",
      },
      {
        id: "yt-4",
        title: "vidIQ",
        description:
          "YouTube SEO and keyword research tool. Free tier useful for beginners.",
        url: "https://vidiq.com",
        type: "tool",
        free: true,
        source: "vidIQ",
      },
      {
        id: "yt-5",
        title: "TubeBuddy",
        description:
          "YouTube channel growth tool â€” keyword research, A/B thumbnail testing.",
        url: "https://tubebuddy.com",
        type: "tool",
        free: true,
        source: "TubeBuddy",
      },
      {
        id: "yt-6",
        title: "Pexels",
        description: "Free stock video for B-roll without copyright issues.",
        url: "https://www.pexels.com",
        type: "tool",
        free: true,
        source: "Pexels",
      },
    ],
    projects: [
      {
        id: "yt-p1",
        title: "First 3 Videos",
        description:
          "Produce and publish your first 3 automation videos with script, AI voice, thumbnail.",
        level: "beginner",
        techTags: ["ElevenLabs", "CapCut", "Canva"],
      },
      {
        id: "yt-p2",
        title: "SEO Content Calendar",
        description:
          "Research and plan 30 video ideas ranked by search volume and competition.",
        level: "beginner",
        techTags: ["vidIQ", "TubeBuddy", "Research"],
      },
      {
        id: "yt-p3",
        title: "Channel at 1,000 Subscribers",
        description:
          "Reach 1,000 subscribers on a niche channel with consistent publishing strategy.",
        level: "advanced",
        techTags: ["YouTube SEO", "Analytics", "Strategy"],
      },
    ],
    aiGuide: {
      goodFor: [
        "Generating script outlines for any topic",
        "Writing multiple title options for A/B testing",
        "Creating video description templates",
        "Suggesting niche ideas",
      ],
      notFor: [
        "Replacing human editorial judgment on what audiences want",
        "Guaranteeing channel growth",
        "Automating audience relationship building",
      ],
      tools: [
        {
          name: "Claude / ChatGPT",
          use: "Scripts, titles, descriptions, research summaries",
          url: "https://claude.ai",
        },
        {
          name: "ElevenLabs",
          use: "Voice generation for narration",
          url: "https://elevenlabs.io",
        },
        {
          name: "Perplexity AI",
          use: "Fast research and fact-checking for scripts",
          url: "https://www.perplexity.ai",
        },
      ],
      samplePrompts: [
        "I run a YouTube automation channel in the personal finance niche targeting young adults in Africa. Generate 10 video ideas with strong search potential, a title for each, and a 3-sentence script outline.",
        'Write a YouTube video hook for: "5 Money Habits That Keep Most People Broke." Hook should create curiosity in first 15 seconds and make viewers unable to click away.',
      ],
    },
    careerTip:
      "Consistency over perfection when starting. 50 average videos beat 5 perfect ones when building channel authority. Improve quality as you learn what works.",
  },
  {
    id: "marketing",
    slug: "digital-marketing",
    name: "Digital Marketing",
    tagline:
      "Grow audiences, drive traffic, and turn attention into business outcomes.",
    category: "grow",
    colorHex: "#68D391",
    icon: "TrendingUp",
    difficulty: 2,
    difficultyLabel: "Beginner-Friendly",
    timeEstimate: "2 to 4 months",
    techStack: [
      "Google Ads",
      "Meta Ads",
      "Mailchimp",
      "Google Analytics",
      "SEMrush",
      "Canva",
    ],
    overview: {
      description:
        "Digital marketers promote products and services through online channels. It is a broad field with many specializations â€” SEO, paid ads, email marketing, social media, and content. Every business needs it.",
      whatYouCanBuild: [
        "SEO content strategies",
        "Paid ad campaigns",
        "Email marketing sequences",
        "Social media calendars",
        "Analytics dashboards",
      ],
      jobTitles: [
        "Digital Marketing Manager",
        "SEO Specialist",
        "Paid Ads Manager",
        "Content Marketer",
        "Growth Marketer",
      ],
      salaryRange: "$40,000 to $100,000/year",
    },
    roadmap: [
      {
        id: 1,
        title: "Marketing Foundations",
        duration: "2 to 3 weeks",
        topics: [
          "Customer journey (awareness â†’ purchase)",
          "Marketing channels overview",
          "Target audience research",
          "Branding basics",
          "Marketing metrics",
        ],
        description:
          "Understand the full picture before specializing. Great marketers understand business goals, not just tactics.",
      },
      {
        id: 2,
        title: "Core Channels",
        duration: "6 to 8 weeks",
        topics: [
          "SEO: on-page, off-page, technical",
          "Social media marketing",
          "Content marketing",
          "Email marketing",
          "Copywriting basics",
        ],
        description:
          "Master the organic channels first â€” SEO and content marketing compound over time and cost nothing but effort.",
      },
      {
        id: 3,
        title: "Paid Advertising",
        duration: "3 to 4 weeks",
        topics: [
          "Google Ads fundamentals",
          "Meta Ads (Facebook/Instagram)",
          "Ad targeting and segmentation",
          "Budget management",
        ],
        description:
          "Paid ads amplify what already works. Learn to spend money profitably before spending big.",
      },
      {
        id: 4,
        title: "Analytics & Optimization",
        duration: "2 to 3 weeks",
        topics: [
          "Google Analytics 4",
          "Conversion tracking",
          "A/B testing",
          "ROI reporting",
        ],
        description:
          "Data separates professional marketers from guessers. Measure everything and optimize relentlessly.",
      },
    ],
    resources: [
      {
        id: "mkt-1",
        title: "Google Digital Garage",
        description:
          "Google's free digital marketing certification. Covers all major channels.",
        url: "https://learndigital.withgoogle.com/digitalgarage",
        type: "docs",
        free: true,
        source: "Google",
      },
      {
        id: "mkt-2",
        title: "HubSpot Academy",
        description:
          "Free marketing certifications on inbound, email, SEO, and social media.",
        url: "https://academy.hubspot.com",
        type: "docs",
        free: true,
        source: "HubSpot",
      },
      {
        id: "mkt-3",
        title: "SEMrush Academy",
        description:
          "Free SEO and SEM courses from one of the most respected tools in the industry.",
        url: "https://www.semrush.com/academy",
        type: "docs",
        free: true,
        source: "SEMrush",
      },
      {
        id: "mkt-4",
        title: "Moz SEO Learning Center",
        description:
          "The definitive SEO learning resource. Comprehensive and up to date.",
        url: "https://moz.com/learn/seo/what-is-seo",
        type: "docs",
        free: true,
        source: "Moz",
      },
      {
        id: "mkt-5",
        title: "Neil Patel YouTube",
        description:
          "High-quality SEO, content, and digital marketing strategy tutorials.",
        url: "https://www.youtube.com/@NeilPatel",
        type: "video",
        free: true,
        source: "Neil Patel",
      },
      {
        id: "mkt-6",
        title: "Ahrefs YouTube",
        description:
          "The best SEO YouTube channel. Practical, well-researched, actionable content.",
        url: "https://www.youtube.com/@AhrefsTV",
        type: "video",
        free: true,
        source: "Ahrefs",
      },
    ],
    projects: [
      {
        id: "mkt-p1",
        title: "SEO Audit Report",
        description:
          "Pick a local business website, run a full SEO audit, and write a recommendations report.",
        level: "beginner",
        techTags: ["SEO", "Moz", "Google Search Console"],
      },
      {
        id: "mkt-p2",
        title: "Content Calendar",
        description:
          "Create a 30-day social media content calendar with captions and hashtags.",
        level: "beginner",
        techTags: ["Content Strategy", "Canva"],
      },
      {
        id: "mkt-p3",
        title: "Email Campaign",
        description:
          "Build a 5-email welcome sequence for a product using Mailchimp. Track open rates.",
        level: "intermediate",
        techTags: ["Mailchimp", "Copywriting", "Email"],
      },
    ],
    aiGuide: {
      goodFor: [
        "Writing multiple ad copy variations for A/B testing",
        "Generating social media captions for a week",
        "Writing email subject lines",
        "Analyzing and rewriting underperforming copy",
      ],
      notFor: [
        "Replacing genuine audience understanding",
        "Predicting campaign performance",
        "Making media buying decisions without platform data",
      ],
      tools: [
        {
          name: "Claude / ChatGPT",
          use: "Copywriting, campaign ideation, content planning",
          url: "https://claude.ai",
        },
        {
          name: "Canva AI",
          use: "Ad creative and social media graphic generation",
          url: "https://www.canva.com",
        },
        {
          name: "Perplexity AI",
          use: "Market research and competitor intelligence",
          url: "https://www.perplexity.ai",
        },
      ],
      samplePrompts: [
        "Write 5 Facebook Ad headline options for a Nigerian fintech app targeting small business owners aged 25 to 45 focused on saving time on bookkeeping. Each under 40 characters.",
        "Create a 2-week Instagram content calendar for a fashion brand targeting Gen Z women in Lagos. Include post concept, caption under 150 chars, and 5 hashtags per day.",
      ],
    },
    careerTip:
      "Get Google's free Digital Marketing certification first â€” it validates baseline knowledge. Then specialize: SEO is the highest long-term value marketing skill.",
  },
  {
    id: "ai",
    slug: "ai-for-work",
    name: "AI for Work & Productivity",
    tagline:
      "Use AI as a thinking partner that makes you sharper, not dependent.",
    category: "grow",
    colorHex: "#00D4AA",
    icon: "Sparkles",
    difficulty: 1,
    difficultyLabel: "All Levels",
    timeEstimate: "Ongoing",
    techStack: [
      "Claude",
      "ChatGPT",
      "Gemini",
      "Copilot",
      "Cursor",
      "Perplexity",
    ],
    overview: {
      description:
        "AI tools are now part of every professional workflow. This track teaches you to use them intelligently â€” as tools that amplify your thinking, not replace it. It applies to every other track in this hub.",
      whatYouCanBuild: [
        "AI-assisted workflows",
        "Custom prompt libraries",
        "Automated research pipelines",
        "AI-augmented development setups",
      ],
      jobTitles: [
        "AI-Augmented Developer",
        "Prompt Engineer",
        "AI Product Manager",
        "LLM Application Developer",
      ],
      salaryRange: "This track amplifies every other track's salary potential",
    },
    roadmap: [
      {
        id: 1,
        title: "Understanding AI Tools",
        duration: "1 week",
        topics: [
          "What LLMs are and are not",
          "Major tools: Claude, ChatGPT, Gemini",
          "Strengths and limitations",
          "Hallucinations and fact-checking",
        ],
        description:
          "Before using AI effectively, you must understand what it is â€” and critically, what it cannot do.",
      },
      {
        id: 2,
        title: "Prompt Engineering",
        duration: "2 to 3 weeks",
        topics: [
          "Zero-shot prompting",
          "Few-shot prompting",
          "Chain-of-thought",
          "System prompts and roles",
          "Iterating and refining",
        ],
        description:
          "The quality of your AI outputs depends entirely on the quality of your inputs. Prompting is a learnable skill.",
      },
      {
        id: 3,
        title: "AI for Your Field",
        duration: "Ongoing",
        topics: [
          "AI for developers (Copilot, Cursor)",
          "AI for designers (Midjourney, Figma AI)",
          "AI for analysts (Code Interpreter)",
          "AI for writers (Claude)",
        ],
        description:
          "Each field has specific AI workflows. Learn the tools and patterns for your specific track.",
      },
      {
        id: 4,
        title: "AI Ethics & Verification",
        duration: "1 to 2 weeks",
        topics: [
          "Understanding hallucinations",
          "Fact-checking AI output",
          "Privacy and data concerns",
          "Thinking before prompting",
        ],
        description:
          "The most important AI skill is knowing when not to trust it. Build the habit of verification.",
      },
    ],
    resources: [
      {
        id: "ai-1",
        title: "Intro to Large Language Models",
        description:
          "Andrej Karpathy's definitive video explanation of how LLMs work. Watch this first.",
        url: "https://www.youtube.com/watch?v=zjkBMFhNj_g",
        type: "video",
        free: true,
        source: "Andrej Karpathy",
      },
      {
        id: "ai-2",
        title: "Prompt Engineering Guide",
        description:
          "The most comprehensive free prompt engineering reference. All major techniques covered.",
        url: "https://www.promptingguide.ai",
        type: "docs",
        free: true,
        source: "DAIR.AI",
      },
      {
        id: "ai-3",
        title: "Learn Prompting",
        description:
          "Free interactive course on prompt engineering from basics to advanced.",
        url: "https://learnprompting.org",
        type: "docs",
        free: true,
        source: "Learn Prompting",
      },
      {
        id: "ai-4",
        title: "DeepLearning.AI Short Courses",
        description:
          "Free short courses from Andrew Ng on prompt engineering, LangChain, and AI apps.",
        url: "https://www.deeplearning.ai/short-courses",
        type: "docs",
        free: true,
        source: "DeepLearning.AI",
      },
      {
        id: "ai-5",
        title: "Neural Networks â€” 3Blue1Brown",
        description:
          "Visual, intuitive explanation of how neural networks learn. Beautiful and clear.",
        url: "https://www.youtube.com/watch?v=aircAruvnKk",
        type: "video",
        free: true,
        source: "3Blue1Brown",
      },
      {
        id: "ai-6",
        title: "fast.ai Practical Data Ethics",
        description:
          "Think critically about AI â€” bias, fairness, safety, and ethics.",
        url: "https://ethics.fast.ai",
        type: "docs",
        free: true,
        source: "fast.ai",
      },
    ],
    projects: [
      {
        id: "ai-p1",
        title: "Personal Prompt Library",
        description:
          "Build a personal library of 20+ tested prompts for your specific workflow and field.",
        level: "beginner",
        techTags: ["Prompt Engineering", "Claude", "ChatGPT"],
      },
      {
        id: "ai-p2",
        title: "AI Research Report",
        description:
          "Research a topic using AI tools, verify every claim independently, produce a report.",
        level: "intermediate",
        techTags: ["Perplexity", "Claude", "Verification"],
      },
      {
        id: "ai-p3",
        title: "AI-Integrated App",
        description:
          "Build an application that calls an LLM API as a core feature.",
        level: "advanced",
        techTags: ["Python", "Groq API", "FastAPI"],
      },
    ],
    aiGuide: {
      goodFor: ["Everything in this track â€” AI teaches you to use AI"],
      notFor: [
        "This is the one track where the entire point is learning AI tools",
      ],
      tools: [
        {
          name: "Claude",
          use: "Long-form reasoning, code, writing, analysis",
          url: "https://claude.ai",
        },
        {
          name: "ChatGPT",
          use: "General purpose, code interpreter, images",
          url: "https://chat.openai.com",
        },
        {
          name: "Perplexity AI",
          use: "Research with citations and live web access",
          url: "https://www.perplexity.ai",
        },
        {
          name: "GitHub Copilot",
          use: "In-editor code completion",
          url: "https://github.com/features/copilot",
        },
        {
          name: "Cursor",
          use: "Full AI code editor for serious development",
          url: "https://cursor.sh",
        },
        {
          name: "v0.dev",
          use: "AI UI component generation from text",
          url: "https://v0.dev",
        },
      ],
      samplePrompts: [
        "Act as a senior software engineer reviewing my code. Look for: bugs, security issues, performance problems, and style issues. Be specific about what to fix and why. Code: [paste]",
        "I need to learn [specific concept]. Explain it in simple terms first, then with a concrete example, then tell me the most common misconceptions beginners have about it.",
      ],
    },
    careerTip:
      "The professionals thriving with AI use it to go deeper, not shallower. Use AI to understand things faster â€” then push further on your own. That combination is unbeatable.",
  },
  {
    id: "nocode",
    slug: "no-code-development",
    name: "No-Code Development",
    tagline: "Build functional products without writing a single line of code.",
    category: "design",
    colorHex: "#A78BFA",
    icon: "Blocks",
    difficulty: 1,
    difficultyLabel: "Beginner",
    timeEstimate: "1 to 2 months",
    techStack: ["Webflow", "Bubble", "Framer", "Zapier", "Glide", "Airtable"],
    overview: {
      description:
        "No-code tools let you build websites, apps, and automations without writing code. It is the fastest way to validate ideas, build MVPs, and create tools for non-technical businesses.",
      whatYouCanBuild: [
        "Marketing websites",
        "Web apps with databases",
        "Automated workflows",
        "Mobile-first apps from spreadsheets",
      ],
      jobTitles: [
        "No-Code Developer",
        "Automation Specialist",
        "Operations Manager",
        "Product Manager",
      ],
      salaryRange: "$35,000 to $80,000/year",
    },
    roadmap: [
      {
        id: 1,
        title: "Website Building",
        duration: "2 to 3 weeks",
        topics: [
          "Webflow fundamentals",
          "Framer for React sites",
          "CMS and dynamic content",
          "Responsive layouts",
        ],
        description:
          "Build professional websites without code. Webflow is the industry leader for design-quality no-code sites.",
      },
      {
        id: 2,
        title: "App Building",
        duration: "3 to 4 weeks",
        topics: [
          "Bubble for web apps",
          "Glide for mobile apps",
          "Database design",
          "User authentication",
          "Logic and workflows",
        ],
        description:
          "Build functional applications with user accounts, databases, and business logic â€” all without code.",
      },
      {
        id: 3,
        title: "Automation",
        duration: "2 to 3 weeks",
        topics: [
          "Zapier workflows",
          "Make (Integromat)",
          "Connecting APIs without code",
          "Multi-step automations",
        ],
        description:
          "Connect tools, trigger actions, and automate repetitive tasks across any platform.",
      },
    ],
    resources: [
      {
        id: "nc-1",
        title: "Webflow University",
        description:
          "Official Webflow learning platform. The most complete free no-code web building education.",
        url: "https://webflow.com/university",
        type: "docs",
        free: true,
        source: "Webflow",
      },
      {
        id: "nc-2",
        title: "Bubble Academy",
        description:
          "Official Bubble tutorials for building full web apps without code.",
        url: "https://bubble.io/learn",
        type: "docs",
        free: true,
        source: "Bubble",
      },
      {
        id: "nc-3",
        title: "Framer Learn",
        description:
          "Build React-powered websites without code using Framer's visual editor.",
        url: "https://framer.com/learn",
        type: "docs",
        free: true,
        source: "Framer",
      },
      {
        id: "nc-4",
        title: "Zapier Learn",
        description:
          "Official Zapier documentation and tutorials for workflow automation.",
        url: "https://zapier.com/learn",
        type: "docs",
        free: true,
        source: "Zapier",
      },
      {
        id: "nc-5",
        title: "Glide Apps",
        description:
          "Build mobile apps from Google Sheets or Airtable with no code.",
        url: "https://www.glideapps.com",
        type: "tool",
        free: true,
        source: "Glide",
      },
    ],
    projects: [
      {
        id: "nc-p1",
        title: "Business Website",
        description:
          "Build a complete 5-page business website in Webflow from a design brief.",
        level: "beginner",
        techTags: ["Webflow", "CMS", "Responsive"],
      },
      {
        id: "nc-p2",
        title: "Automation Workflow",
        description:
          "Zapier: new form submission â†’ add to Airtable â†’ send welcome email.",
        level: "beginner",
        techTags: ["Zapier", "Airtable", "Email"],
      },
      {
        id: "nc-p3",
        title: "MVP Web App",
        description:
          "Build a functional web app in Bubble with user auth, database, and core features.",
        level: "intermediate",
        techTags: ["Bubble", "Database", "Auth"],
      },
    ],
    aiGuide: {
      goodFor: [
        "Writing content for your no-code site",
        "Generating workflow logic descriptions",
        "Planning data structure for your app",
      ],
      notFor: [
        "This track is about visual building â€” AI keeps you focused on the tools",
      ],
      tools: [
        {
          name: "Claude / ChatGPT",
          use: "Content writing, workflow planning, troubleshooting",
          url: "https://claude.ai",
        },
      ],
      samplePrompts: [
        "I am building a membership platform in Bubble for freelance designers. Design the database schema â€” what tables, fields, and relationships do I need?",
        "Write homepage copy for a freelance web design studio: hero headline, subheadline, 3 service descriptions, testimonial placeholder, and CTA.",
      ],
    },
    careerTip:
      "No-code is a multiplier. Add basic HTML/CSS and SQL knowledge and you can break out of tool limitations when needed â€” and charge significantly more.",
  },
  {
    id: "writing",
    slug: "technical-writing",
    name: "Technical Writing",
    tagline:
      "Write documentation so clear that engineers stop asking questions.",
    category: "design",
    colorHex: "#E2C97E",
    icon: "FileText",
    difficulty: 2,
    difficultyLabel: "Beginner-Friendly",
    timeEstimate: "2 to 3 months",
    techStack: [
      "Markdown",
      "Confluence",
      "Notion",
      "ReadMe",
      "Git",
      "Docs as Code",
    ],
    overview: {
      description:
        "Technical writers create documentation that makes complex systems understandable â€” API docs, user guides, tutorials, and changelogs. If you can write clearly about technical things, you are in demand.",
      whatYouCanBuild: [
        "API documentation",
        "User manuals and guides",
        "Developer tutorials",
        "Internal knowledge bases",
        "Product changelogs",
      ],
      jobTitles: [
        "Technical Writer",
        "Documentation Engineer",
        "Developer Advocate",
        "Content Engineer",
      ],
      salaryRange: "$50,000 to $120,000/year",
    },
    roadmap: [
      {
        id: 1,
        title: "Writing Fundamentals",
        duration: "2 to 3 weeks",
        topics: [
          "Writing for technical audiences",
          "Clarity and concision",
          "Active voice",
          "Structure and hierarchy",
          "Tone and consistency",
        ],
        description:
          "Good technical writing is not about big vocabulary â€” it is about clarity. Say complex things simply.",
      },
      {
        id: 2,
        title: "Tools & Formats",
        duration: "2 to 3 weeks",
        topics: [
          "Markdown mastery",
          "Docs as Code (Git)",
          "Confluence / Notion",
          "ReadMe.com",
          "Diagrams (Mermaid, Excalidraw)",
        ],
        description:
          "Technical writers work inside the same tools as engineers. Learn the formats used by modern tech teams.",
      },
      {
        id: 3,
        title: "Documentation Types",
        duration: "3 to 4 weeks",
        topics: [
          "API documentation",
          "Tutorial writing",
          "How-to guides",
          "Conceptual explanations",
          "Reference documentation",
        ],
        description:
          "Each documentation type has a different structure and purpose. Learn the Divio documentation system.",
      },
      {
        id: 4,
        title: "Portfolio & Specialization",
        duration: "Ongoing",
        topics: [
          "Technical writing portfolio",
          "Specializing by domain",
          "Writing for open source",
        ],
        description:
          "Build a portfolio of real documentation samples. Contributing to open source docs is an excellent start.",
      },
    ],
    resources: [
      {
        id: "tw-1",
        title: "Google Technical Writing Courses",
        description:
          "Google's free technical writing courses. Pre-course and main course. Essential starting point.",
        url: "https://developers.google.com/tech-writing",
        type: "docs",
        free: true,
        source: "Google",
      },
      {
        id: "tw-2",
        title: "Write the Docs Guide",
        description:
          "Community-driven documentation best practices guide. The industry standard reference.",
        url: "https://www.writethedocs.org/guide",
        type: "docs",
        free: true,
        source: "Write the Docs",
      },
      {
        id: "tw-3",
        title: "Divio Documentation System",
        description:
          "The 4-type documentation framework: tutorials, how-tos, explanations, and references.",
        url: "https://www.divio.com/blog/documentation",
        type: "docs",
        free: true,
        source: "Divio",
      },
      {
        id: "tw-4",
        title: "Markdown Guide",
        description:
          "Complete reference for Markdown syntax â€” the format of most technical documentation.",
        url: "https://www.markdownguide.org/cheat-sheet",
        type: "docs",
        free: true,
        source: "Markdown Guide",
      },
    ],
    projects: [
      {
        id: "tw-p1",
        title: "API Documentation",
        description:
          "Document a public API or one you built â€” endpoints, parameters, responses, errors.",
        level: "beginner",
        techTags: ["Markdown", "ReadMe", "APIs"],
      },
      {
        id: "tw-p2",
        title: "Tutorial Series",
        description:
          "Write a 3-part tutorial teaching a beginner to build something in your area of expertise.",
        level: "intermediate",
        techTags: ["Docs as Code", "Markdown", "Git"],
      },
      {
        id: "tw-p3",
        title: "Open Source Contribution",
        description:
          "Improve the documentation of a real open source project and submit a pull request.",
        level: "advanced",
        techTags: ["GitHub", "Markdown", "Open Source"],
      },
    ],
    aiGuide: {
      goodFor: [
        "Drafting first versions of documentation sections",
        "Simplifying overly complex sentences",
        "Generating API reference templates",
        "Proofreading and consistency checking",
      ],
      notFor: [
        "Understanding the technical systems you are documenting",
        "Replacing clarity of thought with generated text",
      ],
      tools: [
        {
          name: "Claude",
          use: "Draft documentation, simplify text, consistency review",
          url: "https://claude.ai",
        },
        {
          name: "Grammarly",
          use: "Grammar, tone, and readability checks",
          url: "https://www.grammarly.com",
        },
      ],
      samplePrompts: [
        "I have written this technical explanation but it is too long. Simplify it for junior developers who understand JavaScript but not React: [paste text]",
        "Generate an API reference entry for this endpoint formatted as Markdown with: Description, HTTP Method, URL, Request Parameters, Request Body, Response, Error Codes, and a code example: [paste details]",
      ],
    },
    careerTip:
      "Technical writers who can read code earn significantly more than those who cannot. Even basic Python or JavaScript reading ability makes you far more effective and employable.",
  },
];

export const getAllTracks = () => TRACKS
export const getTrackBySlug = (slug: string) => TRACKS.find(t => t.slug === slug)
export const getTrackById = (id: string) => TRACKS.find(t => t.id === id)
export const getTracksByCategory = (category: TrackCategory) => TRACKS.filter(t => t.category === category)
export const getTrackSlugs = () => TRACKS.map(t => t.slug)

export const CATEGORIES = [
  { id: 'build' as TrackCategory, label:'BUILD', description:'Write code, create systems, ship products', color:'#00D4AA' },
  { id: 'design' as TrackCategory, label:'DESIGN', description:'Create interfaces, experiences, and content', color:'#A78BFA' },
  { id: 'analyze' as TrackCategory, label:'ANALYZE', description:'Extract meaning from data and systems', color:'#F0A500' },
  { id: 'grow' as TrackCategory, label:'GROW', description:'Scale, secure, market, and automate', color:'#388BFD' },
]

