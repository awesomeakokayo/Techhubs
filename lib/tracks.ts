export type TrackCategory = 'build' | 'design' | 'analyze' | 'grow' | 'ai'
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
        "Frontend developers build the visual layer of the web, layouts, buttons, forms, animations, and everything users interact with. You translate designs into working code using HTML, CSS, and JavaScript, then build complex interfaces using React.",
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
          "Use AI as a powerful assistant, not a replacement for understanding. Build faster without losing the ability to think.",
      },
    ],
    resources: [
      {
        id: "fe-5",
        title: "HTML Crash Course",
        description:
          "Traversy Media, perfect introduction for absolute beginners.",
        url: "https://www.youtube.com/watch?v=UB1O30fR-EE",
        type: "video",
        free: true,
        source: "Traversy Media",
      },
      {
        id: "fe-0a",
        title: "CSS in 30 Minutes",
        description:
          "Quick CSS overview for visual learners. Pairs well with MDN for deeper learning.",
        url: "https://www.youtube.com/watch?v=0sDktfaD0p0",
        type: "video",
        free: true,
        source: "Traversy Media",
      },
      {
        id: "fe-18",
        title: "CSS Crash Course",
        description:
          "Traversy Media — everything from selectors to responsive design in one video.",
        url: "https://www.youtube.com/watch?v=yfoY53QXEnI",
        type: "video",
        free: true,
        source: "Traversy Media",
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
        id: "fe-6",
        title: "JavaScript Full Course",
        description: "3-hour JavaScript beginner course by freeCodeCamp.",
        url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
        type: "video",
        free: true,
        source: "freeCodeCamp",
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
        id: "fe-16",
        title: "Git & GitHub Crash Course",
        description:
          "Essential Git commands and GitHub workflow every frontend developer must know.",
        url: "https://www.youtube.com/watch?v=RGOj5yH7evk",
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
          "Official Tailwind documentation, the fastest way to style anything.",
        url: "https://tailwindcss.com/docs",
        type: "docs",
        free: true,
        source: "Tailwind",
      },
      {
        id: "fe-17",
        title: "Web Performance Optimization",
        description:
          "Google's guide to making fast websites — Core Web Vitals, lazy loading, and more.",
        url: "https://web.dev/learn-core-web-vitals/",
        type: "docs",
        free: true,
        source: "Google web.dev",
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
      "Build your portfolio site first, use it as living proof of skill. Deploy every project. Employers want live links, not just GitHub repos.",
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
        "Backend developers build the server-side logic, databases, and APIs that power every application. You handle data, security, authentication, and performance, none of which users see, but everything depends on.",
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
        id: "be-15",
        title: "How the Internet Works",
        description:
          "Visual guide to DNS, TCP/IP, and how data moves across the web.",
        url: "https://www.youtube.com/watch?v=7_LPdttKXPc",
        type: "video",
        free: true,
        source: "freeCodeCamp",
      },
      {
        id: "be-14",
        title: "HTTP Crash Course",
        description:
          "Learn how HTTP, URLs, and web servers work in 30 minutes.",
        url: "https://www.youtube.com/watch?v=iYM2zFP3Zn0",
        type: "video",
        free: true,
        source: "Traversy Media",
      },
      {
        id: "be-0b",
        title: "Node Hello World",
        description:
          "Write a Node Hello World in 10 minutes. Build your first working API endpoint.",
        url: "https://www.youtube.com/watch?v=kxW8m5DXWH4",
        type: "video",
        free: true,
        source: "YouTube",
      },
      {
        id: "be-0",
        title: "Build Your First API in 30 Minutes",
        description:
          "Fast-paced intro to REST APIs before diving into full courses. Start here if you find CS50 too long.",
        url: "https://www.youtube.com/watch?v=L72fhGm1tfE",
        type: "video",
        free: true,
        source: "Traversy Media",
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
        id: "be-4",
        title: "PostgreSQL Full Course",
        description:
          "Learn PostgreSQL from scratch, tables, queries, joins, and more.",
        url: "https://www.youtube.com/watch?v=qw--VYLpxG4",
        type: "video",
        free: true,
        source: "freeCodeCamp",
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
        id: "be-7",
        title: "Docker Full Course",
        description:
          "Learn Docker from ground up, images, containers, Compose.",
        url: "https://www.youtube.com/watch?v=fqMOX6JJhGo",
        type: "video",
        free: true,
        source: "freeCodeCamp",
      },
      {
        id: "be-11",
        title: "Render Deployment Guide",
        description:
          "Official guide to deploying web services, static sites, and databases on Render's free tier.",
        url: "https://render.com/docs/your-first-deploy",
        type: "docs",
        free: true,
        source: "Render",
      },
      {
        id: "be-12",
        title: "Railway Deployment Guides",
        description:
          "Step-by-step tutorials for deploying Node.js, Python, and Docker apps on Railway.",
        url: "https://docs.railway.com/guides/express",
        type: "docs",
        free: true,
        source: "Railway",
      },
      {
        id: "be-13",
        title: "GitHub Actions Documentation",
        description:
          "Official docs on CI/CD pipelines, workflow automation, and deployment with GitHub Actions.",
        url: "https://docs.github.com/en/actions",
        type: "docs",
        free: true,
        source: "GitHub",
      },
      {
        id: "be-1",
        title: "CS50 Web Programming",
        description:
          "Harvard free web course, Python, Django, SQL, JavaScript.",
        url: "https://cs50.harvard.edu/web",
        type: "docs",
        free: true,
        source: "Harvard",
      },
      {
        id: "be-10",
        title: "Full Stack Open",
        description:
          "University of Helsinki, Node, Express, MongoDB, GraphQL.",
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
        "Security-sensitive auth logic, always review yourself",
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
    tagline: "Design it, build it, deploy it, end to end, all by yourself.",
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
        "Full-stack developers build complete applications, the interface, APIs, and databases. You can take a product from idea to deployed, working software entirely on your own.",
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
          "Then complete the Backend Development track, especially REST APIs, authentication, and PostgreSQL.",
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
      {
        id: "fs-8",
        title: "WebSockets with Socket.IO",
        description:
          "Beginner-friendly guide to real-time communication with WebSockets and Socket.IO. Build a working app from scratch.",
        url: "https://www.youtube.com/watch?v=CzcfeL7ymbU",
        type: "video",
        free: true,
        source: "freeCodeCamp",
      },
      {
        id: "fs-9",
        title: "Bull Queue Overview",
        description:
          "Learn background job processing with Bull, Redis queues, and delayed tasks in Node.js.",
        url: "https://optimalbits.github.io/bull/",
        type: "docs",
        free: true,
        source: "OptimalBits",
      },
      {
        id: "fs-7",
        title: "SaaS Architecture Guide",
        description:
          "Deep dive into multi-tenant architecture, billing integration, background jobs, and observability for SaaS apps.",
        url: "https://render.com/articles/building-and-deploying-a-saas-application-from-scratch",
        type: "docs",
        free: true,
        source: "Render",
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
          "Notes + tasks + AI summarization and scheduling, like Notion + AI.",
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
          use: "Full AI editor, excellent for full-stack projects",
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
      "The most versatile language in tech, automation, APIs, AI, and data.",
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
        "Python is used for backend APIs, automation, data science, and AI. It has the simplest syntax of any mainstream language, perfect for beginners, while being powerful enough for the world's largest tech companies.",
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
          "Build real APIs. FastAPI is the modern choice, fast, typed, with beautiful automatic docs.",
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
        id: "py-2",
        title: "Python Full Course for Beginners",
        description:
          "4.5-hour Python beginner course, the best single video to start with.",
        url: "https://www.youtube.com/watch?v=rfscVS0vtbw",
        type: "video",
        free: true,
        source: "freeCodeCamp",
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
        id: "py-1",
        title: "Official Python Tutorial",
        description: "The Python.org tutorial. Use alongside other sources.",
        url: "https://docs.python.org/3/tutorial",
        type: "docs",
        free: true,
        source: "Python.org",
      },
      {
        id: "py-4",
        title: "Python for Everybody (freeCodeCamp)",
        description:
          "Complete Python course from zero to data structures. Fully free, no signup required. One of the most popular free Python courses.",
        url: "https://www.youtube.com/watch?v=8DvywoWv6fI",
        type: "video",
        free: true,
        source: "freeCodeCamp / Dr. Chuck",
      },
      {
        id: "py-6",
        title: "FastAPI Full Course",
        description:
          "Complete FastAPI tutorial, routing, auth, databases, deployment.",
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
          "Build AI-powered apps with LangChain, agents, chains, and memory.",
        url: "https://python.langchain.com/docs/get_started/introduction",
        type: "docs",
        free: true,
        source: "LangChain",
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
        "Understanding concepts for the first time, work through them yourself",
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
      "Python is a gateway language, it leads to backend, data, AI, and automation. Once solid at fundamentals, specialize. Pick one direction: APIs, data, or AI, and go deep.",
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
          "Figma is the industry-standard design tool. Learn it deeply, components, auto-layout, and interactive prototypes.",
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
        title: "UX Design Full Course (YouTube)",
        description:
          "Complete UX design course covering user research, wireframing, prototyping, and usability testing. Entirely free on YouTube.",
        url: "https://www.youtube.com/watch?v=_lyzy-vCh5s",
        type: "video",
        free: true,
        source: "CareerFoundry",
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
          "Google's complete design system, typography, components, and patterns.",
        url: "https://material.io/design",
        type: "docs",
        free: true,
        source: "Google",
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
        title: "UX Crash Course (The Futur)",
        description:
          "Practical UX and design thinking crash course. Free, no signup required, taught by industry professionals.",
        url: "https://www.youtube.com/watch?v=3xTtT5rOBLw",
        type: "video",
        free: true,
        source: "The Futur",
      },
      {
        id: "ux-2",
        title: "Figma Official Tutorials",
        description:
          "Learn Figma from its creators, the fastest way to get started.",
        url: "https://help.figma.com/hc/en-us/categories/360002051613",
        type: "docs",
        free: true,
        source: "Figma",
      },
      {
        id: "ux-5",
        title: "DesignCourse YouTube",
        description:
          "Gary Simon's channel, excellent UI design tutorials and Figma walkthroughs.",
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
        id: "ux-9",
        title: "Dribbble",
        description:
          "Design community and portfolio platform. Browse for inspiration daily.",
        url: "https://dribbble.com",
        type: "tool",
        free: true,
        source: "Dribbble",
      },
      {
        id: "ux-12",
        title: "UX Case Study Complete Guide",
        description:
          "Step-by-step guide to writing a UX case study from initial research to final design.",
        url: "https://uxcel.com/blog/ux-case-study",
        type: "docs",
        free: true,
        source: "Uxcel",
      },
      {
        id: "ux-10",
        title: "Behance Case Study Guide",
        description:
          "Behance official guide on building compelling design case studies that showcase your process.",
        url: "https://www.behance.net/resources/articles/building-the-perfect-case-study",
        type: "docs",
        free: true,
        source: "Behance",
      },
      {
        id: "ux-11",
        title: "Dribbble Portfolio Guide",
        description:
          "Expert tips on creating a UI/UX portfolio and case studies that get you hired.",
        url: "https://dribbble.com/resources/career/ui-ux-portfolio",
        type: "docs",
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
        "Making final design decisions, that requires human judgment and taste",
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
      "Find what breaks before users do, and make sure it stays fixed.",
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
          "Go beyond functional testing, performance, security, and integrating tests into development pipelines.",
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
        id: "qa-0a",
        title: "First Test Case Template",
        description:
          "Learn how to write clear test cases using templates. Immediate practice format.",
        url: "https://www.guru99.com/sample-test-cases.html",
        type: "docs",
        free: true,
        source: "Guru99",
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
          "Frontend test automation with Cypress, the most popular frontend testing tool.",
        url: "https://www.youtube.com/watch?v=u8vMu7viCm8",
        type: "video",
        free: true,
        source: "freeCodeCamp",
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
        id: "qa-8",
        title: "Playwright Automation Full Course",
        description:
          "Complete Playwright course covering end-to-end testing, page object model, and CI integration.",
        url: "https://www.youtube.com/watch?v=FjojYq0KxPg",
        type: "video",
        free: true,
        source: "freeCodeCamp",
      },
      {
        id: "qa-6",
        title: "Ministry of Testing",
        description:
          "The premier QA community, articles, courses, and a global network of testers.",
        url: "https://www.ministryoftesting.com",
        type: "community",
        free: true,
        source: "MoT",
      },
      {
        id: "qa-7",
        title: "k6 Performance Testing",
        description:
          "Load testing with k6, write performance tests in JavaScript.",
        url: "https://k6.io/docs",
        type: "docs",
        free: true,
        source: "Grafana",
      },
      {
        id: "qa-9",
        title: "OWASP ZAP Security Testing",
        description:
          "Free web app security scanner. Learn security testing basics with the OWASP ZAP tool.",
        url: "https://www.zaproxy.org/docs/",
        type: "docs",
        free: true,
        source: "OWASP",
      },
    ],
    projects: [
      {
        id: "qa-p1",
        title: "Login Page Test Cases",
        description:
          "Write a complete manual test case document for a login form, all paths.",
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
        id: "da-5",
        title: "Excel Full Course",
        description:
          "Master Excel for data analysis, formulas, pivot tables, charts, power query.",
        url: "https://www.youtube.com/watch?v=Vl0H-qTclOg",
        type: "video",
        free: true,
        source: "freeCodeCamp",
      },
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
        id: "da-8",
        title: "Select Star SQL",
        description:
          "Interactive SQL book. Best way to learn SQL for real analytical queries.",
        url: "https://selectstarsql.com",
        type: "book",
        free: true,
        source: "Zi Chong Kao",
      },
      {
        id: "da-3",
        title: "Pandas Full Course",
        description:
          "Learn Python Pandas, loading, cleaning, transforming, and analyzing data.",
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
        id: "da-0a",
        title: "Kaggle Notebook Example",
        description:
          "Explore Kaggle getting started notebooks and see data analysis done by experts.",
        url: "https://www.kaggle.com/learn-forum",
        type: "practice",
        free: true,
        source: "Kaggle",
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
        id: "da-6",
        title: "Power BI Full Course",
        description:
          "Complete Power BI course, connect data and build interactive reports.",
        url: "https://www.youtube.com/watch?v=TmhQCQr_DCA",
        type: "video",
        free: true,
        source: "freeCodeCamp",
      },
      {
        id: "da-10",
        title: "Khan Academy Statistics",
        description:
          "Complete free course on statistics and probability, from basics to hypothesis testing, with practice exercises.",
        url: "https://www.khanacademy.org/math/statistics-probability",
        type: "docs",
        free: true,
        source: "Khan Academy",
      },
      {
        id: "da-9",
        title: "StatQuest Statistics",
        description:
          "YouTube channel covering statistics fundamentals with clear, visual explanations. Mean, variance, p-values, and more.",
        url: "https://statquest.org/video_index.html",
        type: "video",
        free: true,
        source: "StatQuest",
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
        "Making business decisions, that is your job",
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
          "Data Science builds on Data Analysis. Complete that track first, especially Python, Pandas, and statistics.",
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
        id: "ds-7",
        title: "StatQuest with Josh Starmer",
        description:
          "Statistics and ML concepts explained visually and clearly. Essential channel.",
        url: "https://www.youtube.com/@statquest",
        type: "video",
        free: true,
        source: "StatQuest",
      },
      {
        id: "ds-2",
        title: "Practical Deep Learning (fast.ai)",
        description:
          "Teaches modern deep learning from scratch. Completely free, no paywall, no certificate upsell. Builds real models from lesson one.",
        url: "https://course.fast.ai",
        type: "docs",
        free: true,
        source: "fast.ai",
      },
      {
        id: "ds-0a",
        title: "Simple Classifier Tutorial",
        description:
          "Build a decision tree classifier with scikit-learn. Focus on coding first, not theory.",
        url: "https://scikit-learn.org/stable/modules/tree.html",
        type: "docs",
        free: true,
        source: "Scikit-Learn",
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
        id: "ds-6",
        title: "PyTorch Official Tutorials",
        description:
          "Official PyTorch tutorials, the industry-standard deep learning framework.",
        url: "https://pytorch.org/tutorials",
        type: "docs",
        free: true,
        source: "Meta AI",
      },
      {
        id: "ds-8",
        title: "MLflow Deployment Guide",
        description:
          "Official MLflow guide for packaging, deploying, and serving ML models in production.",
        url: "https://mlflow.org/docs/latest/ml/deployment/",
        type: "docs",
        free: true,
        source: "MLflow",
      },
      {
        id: "ds-9",
        title: "Build Your First MLOps Pipeline",
        description:
          "Hands-on tutorial: build a complete MLOps pipeline with MLflow, FastAPI, Docker, and Prometheus monitoring.",
        url: "https://kodekloud.com/blog/how-to-build-your-first-mlops-pipeline/",
        type: "docs",
        free: true,
        source: "KodeKloud",
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
        "Replacing mathematical understanding, you must grasp why models work",
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
          "Complete Linux course, command line, file system, processes, and scripting.",
        url: "https://www.youtube.com/watch?v=ROjZy1WbCIA",
        type: "video",
        free: true,
        source: "freeCodeCamp",
      },
      {
        id: "dv-0",
        title: "Docker in 100 Seconds",
        description:
          "Visual overview of containerization before the full Docker course. Builds confidence.",
        url: "https://www.youtube.com/watch?v=Gjla2gojmM0",
        type: "video",
        free: true,
        source: "Fireship",
      },
      {
        id: "dv-0b",
        title: "Docker Hello World",
        description:
          "Run your first container in 5 minutes. Learn how images and containers work.",
        url: "https://www.youtube.com/watch?v=Ksx1yVrQaZ0",
        type: "video",
        free: true,
        source: "YouTube",
      },
      {
        id: "dv-2",
        title: "Docker Full Course",
        description:
          "Learn Docker from the ground up, images, containers, volumes, Compose.",
        url: "https://www.youtube.com/watch?v=fqMOX6JJhGo",
        type: "video",
        free: true,
        source: "freeCodeCamp",
      },
      {
        id: "dv-5",
        title: "TechWorld with Nana",
        description:
          "The best DevOps YouTube channel, Docker, Kubernetes, CI/CD, cloud.",
        url: "https://www.youtube.com/@TechWorldwithNana",
        type: "video",
        free: true,
        source: "TechWorld with Nana",
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
        id: "dv-7",
        title: "AWS Full Course",
        description: "Complete AWS cloud fundamentals course for beginners.",
        url: "https://www.youtube.com/watch?v=7HKot-brXFE",
        type: "video",
        free: true,
        source: "freeCodeCamp",
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
        id: "dv-6",
        title: "Terraform Learn",
        description:
          "HashiCorp's official Terraform learning platform, Infrastructure as Code.",
        url: "https://learn.hashicorp.com/terraform",
        type: "docs",
        free: true,
        source: "HashiCorp",
      },
      {
        id: "dv-8",
        title: "Prometheus & Grafana Setup Guide",
        description:
          "Complete guide to installing Prometheus and Grafana for Linux system monitoring with custom dashboards.",
        url: "https://grafana.com/docs/grafana/latest/fundamentals/getting-started/get-started-grafana-prometheus/",
        type: "docs",
        free: true,
        source: "Grafana Labs",
      },
      {
        id: "dv-9",
        title: "Linux Monitoring with Prometheus & Grafana",
        description:
          "Step-by-step tutorial for monitoring CPU, memory, disk, and network metrics with open-source tools.",
        url: "https://www.devopsness.com/blog/linux-system-monitoring-prometheus-grafana",
        type: "docs",
        free: true,
        source: "DevOpsNess",
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
      "Get the AWS Cloud Practitioner certification while learning, it is free to study for and validates foundational knowledge. Then aim for AWS Solutions Architect Associate.",
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
          "Learn the language of security, attacks, defenses, and the frameworks professionals use.",
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
        id: "cy-4",
        title: "TryHackMe — Complete Beginner Path",
        description:
          "Hands-on cybersecurity training with browser-based labs. Free tier covers foundational security concepts, Linux, and web hacking basics.",
        url: "https://tryhackme.com/paths",
        type: "practice",
        free: true,
        source: "TryHackMe",
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
        id: "cy-8",
        title: "Splunk SIEM Tutorial",
        description:
          "Hands-on Splunk tutorial covering log analysis, threat detection, alerting, and SIEM fundamentals.",
        url: "https://www.youtube.com/watch?v=pTvGrj3QOmU",
        type: "video",
        free: true,
        source: "CyberInsight",
      },
      {
        id: "cy-9",
        title: "Splunk SIEM Home Lab",
        description:
          "Complete guide to setting up a Splunk SIEM home lab for log analysis, detection queries, and incident response.",
        url: "https://github.com/0xrajneesh/Splunk-SIEM-Home-Lab",
        type: "practice",
        free: true,
        source: "Rajneesh",
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
      "Certifications matter more in cybersecurity than any other tech track. Aim for CompTIA Security+ first, it is widely recognized and achievable for beginners.",
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
        "Mobile developers build apps for Android and iOS. React Native (JavaScript/TypeScript) and Flutter (Dart) are the two most popular cross-platform frameworks, write once, deploy to both platforms.",
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
          "Build your first real screens. Mobile development feels different from web, learn the patterns that make apps feel native.",
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
        id: "mob-9",
        title: "React Native Full Course",
        description:
          "Build your first mobile app from scratch — React Native for absolute beginners.",
        url: "https://www.youtube.com/watch?v=Zx-RU9R6iGc",
        type: "video",
        free: true,
        source: "freeCodeCamp",
      },
      {
        id: "mob-1",
        title: "React Native Official Docs",
        description:
          "The complete React Native documentation, components, APIs, and guides.",
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
          "Complete React Native course by freeCodeCamp, components to deployment.",
        url: "https://www.youtube.com/watch?v=0-S5a0eXPoc",
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
          "Complete Flutter course from zero, widgets, navigation, Firebase, deployment.",
        url: "https://www.youtube.com/watch?v=VPvVD8t02U8",
        type: "video",
        free: true,
        source: "freeCodeCamp",
      },
      {
        id: "mob-7",
        title: "Publish to Google Play Guide",
        description:
          "Official Android Developers guide on preparing and publishing your app to the Play Store.",
        url: "https://developer.android.com/studio/publish",
        type: "docs",
        free: true,
        source: "Google",
      },
      {
        id: "mob-8",
        title: "Publish to App Store Guide",
        description:
          "Apple's official App Store publishing guide covering app preparation, review, and distribution.",
        url: "https://developer.apple.com/app-store/submitting/",
        type: "docs",
        free: true,
        source: "Apple",
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
        "Device-specific behavior testing, you need physical devices",
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
        title: "Casey Faris, DaVinci Resolve",
        description:
          "Best DaVinci Resolve YouTube channel. Clear tutorials for all levels.",
        url: "https://www.youtube.com/@CaseyFaris",
        type: "video",
        free: true,
        source: "Casey Faris",
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
        title: "Pexels, Free Stock Video",
        description:
          "High-quality free stock video for practice projects and B-roll.",
        url: "https://www.pexels.com",
        type: "tool",
        free: true,
        source: "Pexels",
      },
      {
        id: "vid-9",
        title: "Storytelling for Video Editors",
        description:
          "Learn the principles of visual storytelling, pacing, and emotional sequencing.",
        url: "https://www.youtube.com/watch?v=6YH1T8JZXf0",
        type: "video",
        free: true,
        source: "InCamera",
      },
      {
        id: "vid-7",
        title: "YouTube Creator Academy",
        description:
          "Official YouTube training on platform-specific editing, formats, thumbnails, and audience retention.",
        url: "https://creatoracademy.youtube.com/",
        type: "docs",
        free: true,
        source: "YouTube",
      },
      {
        id: "vid-8",
        title: "YouTube Shorts Fundamentals",
        description:
          "Learn how to create engaging vertical Shorts, optimize for the Shorts feed, and grow with short-form content.",
        url: "https://www.youtube.com/creators/how-things-work/shorts/",
        type: "docs",
        free: true,
        source: "YouTube",
      },
      {
        id: "vid-3",
        title: "DaVinci Resolve Official Training",
        description:
          "Professional-grade video editing, color grading, and audio post-production. The full version is completely free — no subscription needed.",
        url: "https://www.blackmagicdesign.com/products/davinciresolve/training",
        type: "docs",
        free: true,
        source: "Blackmagic Design",
      },
      {
        id: "vid-6",
        title: "CapCut",
        description:
          "Free video editor with AI features — auto-captions, text-to-speech, transitions, and effects. No watermark on the free tier.",
        url: "https://www.capcut.com",
        type: "tool",
        free: true,
        source: "ByteDance",
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
        "Making creative editing decisions, that requires human taste",
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
        "YouTube automation is building channels that produce video content systematically, using scripts, AI voices, stock footage, and editors, without being on camera. It is a content business model as much as a skill.",
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
        id: "yt-9",
        title: "YouTube for Beginners Guide",
        description:
          "Complete beginner's guide to setting up a YouTube channel — equipment, niche, and first video.",
        url: "https://www.youtube.com/watch?v=fYwA_D1RFsM",
        type: "video",
        free: true,
        source: "Think Media",
      },
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
        id: "yt-3",
        title: "Canva",
        description:
          "Design thumbnails, channel art, and graphics, free plan is sufficient to start.",
        url: "https://www.canva.com",
        type: "tool",
        free: true,
        source: "Canva",
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
      {
        id: "yt-2",
        title: "ElevenLabs",
        description:
          "Industry-best AI voice generation. Free tier includes generous monthly character quota — enough for several videos.",
        url: "https://elevenlabs.io",
        type: "tool",
        free: true,
        source: "ElevenLabs",
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
          "YouTube channel growth tool, keyword research, A/B thumbnail testing.",
        url: "https://tubebuddy.com",
        type: "tool",
        free: true,
        source: "TubeBuddy",
      },
      {
        id: "yt-7",
        title: "YouTube Monetization Guide",
        description:
          "Official YouTube guide on monetization, YPP requirements, AdSense, and revenue optimization.",
        url: "https://support.google.com/youtube/answer/72857",
        type: "docs",
        free: true,
        source: "Google",
      },
      {
        id: "yt-8",
        title: "Affiliate Marketing for Creators",
        description:
          "Free hub on affiliate marketing strategies, networks, and best practices for content creators.",
        url: "https://affiliate-marketing-for-beginners.netlify.app/",
        type: "docs",
        free: true,
        source: "Affiliate Marketing Guide",
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
        "Digital marketers promote products and services through online channels. It is a broad field with many specializations, SEO, paid ads, email marketing, social media, and content. Every business needs it.",
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
          "Master the organic channels first, SEO and content marketing compound over time and cost nothing but effort.",
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
        id: "mkt-7",
        title: "Google Ads Fundamentals",
        description:
          "Official Google Ads training covering search, display, video, and measurement fundamentals.",
        url: "https://skillshop.withgoogle.com/courses/google-ads-fundamentals",
        type: "docs",
        free: true,
        source: "Google",
      },
      {
        id: "mkt-9",
        title: "Meta Ads (Facebook/Instagram)",
        description:
          "Official Meta Ads training covering campaign setup, targeting, creative, and optimization.",
        url: "https://www.facebook.com/business/ads",
        type: "docs",
        free: true,
        source: "Meta",
      },
      {
        id: "mkt-8",
        title: "Google Analytics 4 Guide",
        description:
          "Free GA4 course covering setup, reports, conversions, audiences, and insights.",
        url: "https://skillshop.withgoogle.com/courses/google-analytics-4",
        type: "docs",
        free: true,
        source: "Google",
      },
      {
        id: "mkt-10",
        title: "A/B Testing Guide (Optimizely)",
        description:
          "Complete, free guide to A/B testing: hypothesis formation, statistical significance, sample sizing, and common pitfalls. No account required.",
        url: "https://www.optimizely.com/optimization-glossary/ab-testing/",
        type: "docs",
        free: true,
        source: "Optimizely",
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
      "Get Google's free Digital Marketing certification first, it validates baseline knowledge. Then specialize: SEO is the highest long-term value marketing skill.",
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
        "AI tools are now part of every professional workflow. This track teaches you to use them intelligently, as tools that amplify your thinking, not replace it. It applies to every other track in this hub.",
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
          "Before using AI effectively, you must understand what it is, and critically, what it cannot do.",
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
        title: "Neural Networks, 3Blue1Brown",
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
          "Think critically about AI, bias, fairness, safety, and ethics.",
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
      goodFor: ["Everything in this track, AI teaches you to use AI"],
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
      "The professionals thriving with AI use it to go deeper, not shallower. Use AI to understand things faster, then push further on your own. That combination is unbeatable.",
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
          "Build functional applications with user accounts, databases, and business logic, all without code.",
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
        id: "nc-5",
        title: "Glide Apps",
        description:
          "Build mobile apps from Google Sheets or Airtable with no code.",
        url: "https://www.glideapps.com",
        type: "tool",
        free: true,
        source: "Glide",
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
        "This track is about visual building, AI keeps you focused on the tools",
      ],
      tools: [
        {
          name: "Claude / ChatGPT",
          use: "Content writing, workflow planning, troubleshooting",
          url: "https://claude.ai",
        },
      ],
      samplePrompts: [
        "I am building a membership platform in Bubble for freelance designers. Design the database schema, what tables, fields, and relationships do I need?",
        "Write homepage copy for a freelance web design studio: hero headline, subheadline, 3 service descriptions, testimonial placeholder, and CTA.",
      ],
    },
    careerTip:
      "No-code is a multiplier. Add basic HTML/CSS and SQL knowledge and you can break out of tool limitations when needed, and charge significantly more.",
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
        "Technical writers create documentation that makes complex systems understandable, API docs, user guides, tutorials, and changelogs. If you can write clearly about technical things, you are in demand.",
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
          "Good technical writing is not about big vocabulary, it is about clarity. Say complex things simply.",
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
        id: "tw-5",
        title: "Technical Writing for Beginners",
        description:
          "Everything you need to know to start a career in technical writing.",
        url: "https://www.youtube.com/watch?v=bk2K7lGzO4o",
        type: "video",
        free: true,
        source: "freeCodeCamp",
      },
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
        id: "tw-4",
        title: "Markdown Guide",
        description:
          "Complete reference for Markdown syntax, the format of most technical documentation.",
        url: "https://www.markdownguide.org/cheat-sheet",
        type: "docs",
        free: true,
        source: "Markdown Guide",
      },
      {
        id: "tw-6",
        title: "GitHub for Technical Writers",
        description:
          "Learn how to use GitHub for documentation — pull requests, branches, and Markdown rendering.",
        url: "https://docs.github.com/en/get-started/writing-on-github",
        type: "docs",
        free: true,
        source: "GitHub",
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
        id: "tw-7",
        title: "API Documentation Guide",
        description:
          "Best practices for writing API docs that developers actually want to read.",
        url: "https://www.youtube.com/watch?v=qoDPf2NxKEA",
        type: "video",
        free: true,
        source: "freeCodeCamp",
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
    ],
    projects: [
      {
        id: "tw-p1",
        title: "API Documentation",
        description:
          "Document a public API or one you built, endpoints, parameters, responses, errors.",
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
  {
    id: 'crypto',
    slug: 'crypto-web3',
    name: 'Crypto & Web3',
    tagline: 'Build on blockchains, audit smart contracts, and understand the decentralised financial system.',
    category: 'build' as TrackCategory,
    colorHex: '#F7931A',
    icon: 'Coins',
    difficulty: 4 as const,
    difficultyLabel: 'Hard',
    timeEstimate: '6–10 months',
    techStack: ['Solidity', 'Hardhat', 'Foundry', 'ethers.js', 'wagmi', 'React', 'The Graph'],
    overview: {
      description: 'Crypto is not just Bitcoin and NFTs. Web3 is a new layer of the internet where applications run on public blockchains without central authorities. This track teaches you how blockchains actually work, how to write and audit smart contracts, how DeFi protocols are built, and how to analyse on-chain data — the skills that make Web3 developers the highest paid in all of software.',
      whatYouCanBuild: [
        'ERC-20 tokens and NFT collections',
        'Decentralised applications (dApps) with wallet integration',
        'DeFi protocols: AMMs, lending markets, governance systems',
        'On-chain data dashboards with Dune Analytics',
        'Smart contract security audit reports',
      ],
      jobTitles: [
        'Smart Contract Developer',
        'Web3 Frontend Developer',
        'Blockchain Engineer',
        'Smart Contract Auditor',
        'DeFi Analyst',
        'Protocol Researcher',
        'On-Chain Data Analyst',
      ],
      salaryRange: '$70,000–$200,000+/year',
    },
    roadmap: [
      {
        id: 1,
        title: 'How Blockchain Actually Works',
        duration: '2–3 weeks',
        topics: [
          'Cryptographic hashing (SHA-256, keccak-256)',
          'Public key cryptography — wallets and signatures',
          'Consensus: Proof of Work vs Proof of Stake',
          'Block structure: headers, merkle trees, nonces',
          'Layer 1 vs Layer 2 — what scaling means',
          'Gas fees — why they exist and how they spike',
        ],
        description: 'Most people who say they know crypto skip this. Understanding the cryptographic foundations changes how you use, build, and protect everything in this space.',
      },
      {
        id: 2,
        title: 'Wallets, Keys & On-Chain Security',
        duration: '1–2 weeks',
        topics: [
          'Private keys vs seed phrases — what they actually are',
          'How HD wallets derive addresses (BIP-32/39/44)',
          'Hot wallets vs cold wallets vs hardware wallets',
          'Reading transactions before signing them',
          'Token approvals — the most misunderstood attack surface',
          'Common exploits: phishing, clipboard hijacking, approval drains',
          'Multi-sig wallets and when to use them',
        ],
        description: 'This stage will save you money. Understanding how wallet signatures and token approvals work at a contract level prevents the most common ways people lose funds.',
      },
      {
        id: 3,
        title: 'Solidity & Smart Contract Development',
        duration: '6–8 weeks',
        topics: [
          'Solidity syntax: types, functions, modifiers, events',
          'Storage vs memory vs calldata',
          'ERC-20 token standard — how every fungible token works',
          'ERC-721 — how NFTs work under the hood',
          'Hardhat and Foundry development environments',
          'Writing smart contract test suites',
          'OpenZeppelin contract libraries',
          'Deploying to testnets and mainnet',
        ],
        description: 'This is where you go from user to builder. Learn Solidity properly — not just how to write it, but why the patterns exist and what goes wrong when you ignore them.',
      },
      {
        id: 4,
        title: 'DeFi Mechanics & Protocol Understanding',
        duration: '3–4 weeks',
        topics: [
          'AMMs — how Uniswap pricing works (x × y = k)',
          'Liquidity pools, LP tokens, and impermanent loss',
          'Lending protocols and dynamic interest rates (Aave, Compound)',
          'Stablecoins — fiat-backed, overcollateralised, algorithmic',
          'Oracles — how smart contracts get real-world prices (Chainlink)',
          'Flash loans — mechanics and exploit usage',
          'MEV — maximal extractable value and transaction ordering',
          'Cross-chain bridges — mechanics and why they get hacked',
          'DAOs — governance tokens and on-chain voting',
        ],
        description: 'DeFi is a completely new financial system with its own primitives. Understanding these deeply makes you valuable as both a developer and an analyst.',
      },
      {
        id: 5,
        title: 'Web3 Frontend & dApp Development',
        duration: '4–5 weeks',
        topics: [
          'ethers.js — the standard JS library for Ethereum',
          'wagmi — React hooks for Web3 UI development',
          'RainbowKit / ConnectKit — wallet connection UI',
          'Reading on-chain data from the frontend',
          'Writing transactions and tracking their lifecycle',
          'The Graph Protocol — indexing blockchain data',
          'IPFS — decentralised file storage for NFT metadata',
          'Building a complete dApp end-to-end',
        ],
        description: 'Smart contracts without a frontend have no users. Learn to connect your on-chain logic to interfaces real people can use.',
      },
      {
        id: 6,
        title: 'Smart Contract Security & Auditing',
        duration: '3–4 weeks',
        topics: [
          'Reentrancy attacks and checks-effects-interactions pattern',
          'Access control failures — the most common exploit type',
          'Oracle manipulation attacks',
          'Flash loan attack vectors',
          'Integer overflow/underflow',
          'Frontrunning and sandwich attacks',
          'Slither static analysis and Foundry fuzzing',
          'Reading and writing audit reports',
          'Code4rena and Sherlock competitive auditing',
        ],
        description: 'The highest-paid specialisation in all of Web3. A single critical vulnerability can drain hundreds of millions. Auditors who find them before deployment are extremely valuable.',
      },
      {
        id: 7,
        title: 'On-Chain Data Analysis',
        duration: '2–3 weeks',
        topics: [
          'Reading Etherscan and block explorers deeply',
          'Dune Analytics — writing SQL against blockchain data',
          'Key on-chain metrics: active addresses, exchange flows, NVT',
          'Whale wallet tracking and smart money analysis',
          'TVL, protocol revenue, and what they actually measure',
          'Stablecoin flows as a market signal',
          'Building and publishing Dune dashboards',
        ],
        description: 'Everything on a public blockchain is permanently visible. A skilled analyst can see whale movements, accumulation patterns, and protocol health signals invisible in traditional finance.',
      },
    ],
    resources: [
      { id: 'cr-0a', title: 'Blockchain Explained with Visuals (Beginner)', description: '5-minute visual explanation before diving into whitepapers. Much more beginner-friendly.', url: 'https://www.youtube.com/watch?v=xIDL_akXCH4', type: 'video', free: true, source: 'Fireship' },
      { id: 'cr-19', title: 'Blockchain Demo — Anders Brownworth', description: 'The most visual, interactive demonstration of how hashing and blockchains work. Use this in Stage 1.', url: 'https://andersbrownworth.com/blockchain', type: 'practice', free: true, source: 'Anders Brownworth' },
      { id: 'cr-1', title: 'Bitcoin Whitepaper', description: 'Satoshi\'s original 9-page paper. Required reading for anyone in this field.', url: 'https://bitcoin.org/bitcoin.pdf', type: 'book', free: true, source: 'Satoshi Nakamoto' },
      { id: 'cr-2', title: 'Ethereum.org Learn', description: 'The best official Ethereum learning resource. Comprehensive and regularly updated.', url: 'https://ethereum.org/en/learn', type: 'docs', free: true, source: 'Ethereum Foundation' },
      { id: 'cr-21', title: 'MetaMask Basic Safety and Security Tips', description: 'Official guide to wallet safety, seed phrase recovery, and phishing protection.', url: 'https://support.metamask.io/hc/en-us/articles/360015489591-Basic-Safety-and-Security-Tips-for-MetaMask', type: 'docs', free: true, source: 'MetaMask' },
      { id: 'cr-22', title: 'Keep It Simple Crypto - Wallet Basics', description: 'Practical guide to setting up wallets securely. Learn why seed phrases matter and how to keep them safe.', url: 'https://www.youtube.com/@KeepItSimpleCrypto', type: 'video', free: true, source: 'Keep It Simple Crypto' },
      { id: 'cr-3', title: 'CryptoZombies', description: 'The best Solidity beginner course. Learn by building a game on-chain. Fun and effective.', url: 'https://cryptozombies.io', type: 'practice', free: true, source: 'CryptoZombies' },
      { id: 'cr-15', title: 'Solidity by Example', description: 'Practical, concise code examples of Solidity smart contracts. Build your fundamentals step-by-step.', url: 'https://solidity-by-example.org', type: 'docs', free: true, source: 'Solidity by Example' },
      { id: 'cr-0b', title: 'ERC-20 Minimal Clone', description: 'Code an ERC-20 token in Solidity. Deploy a buildable token in 1 hour.', url: 'https://solidity-by-example.org/erc20/', type: 'docs', free: true, source: 'Solidity by Example' },
      { id: 'cr-4', title: 'Patrick Collins — Solidity Full Course', description: 'The most comprehensive free Solidity course. 32 hours covering everything from basics to advanced security.', url: 'https://www.youtube.com/watch?v=umepbfKp5rI', type: 'video', free: true, source: 'Patrick Collins' },
      { id: 'cr-5', title: 'Solidity Official Docs', description: 'The complete language reference. Bookmark this before you write your first contract.', url: 'https://docs.soliditylang.org', type: 'docs', free: true, source: 'Ethereum Foundation' },
      { id: 'cr-7', title: 'OpenZeppelin Docs', description: 'Battle-tested smart contract libraries used in every serious protocol. Read the source code.', url: 'https://docs.openzeppelin.com/contracts', type: 'docs', free: true, source: 'OpenZeppelin' },
      { id: 'cr-11', title: 'wagmi Documentation', description: 'React hooks for Ethereum. The cleanest way to build Web3 UIs in 2025.', url: 'https://wagmi.sh', type: 'docs', free: true, source: 'wagmi' },
      { id: 'cr-6', title: 'Foundry Book', description: 'Documentation for Foundry — the modern, faster alternative to Hardhat. Industry is moving here.', url: 'https://github.com/foundry-rs/foundry', type: 'docs', free: true, source: 'Paradigm' },
      { id: 'cr-12', title: 'Finematics YouTube', description: 'DeFi concepts explained visually and clearly. Start with AMMs and lending protocols.', url: 'https://www.youtube.com/c/Finematics', type: 'video', free: true, source: 'Finematics' },
      { id: 'cr-18', title: 'DeFi Pulse', description: 'Track Total Value Locked (TVL) and learn the foundational metrics used across decentralized finance.', url: 'https://defipulse.com', type: 'docs', free: true, source: 'DeFi Pulse' },
      { id: 'cr-20', title: 'DeFi MOOC — UC Berkeley', description: 'Full university-level DeFi course. Lectures by researchers and actual protocol founders. Free.', url: 'https://defi-learning.org', type: 'docs', free: true, source: 'UC Berkeley' },
      { id: 'cr-13', title: 'Dune Analytics', description: 'Write SQL queries against blockchain data. Build and publish public dashboards. Free.', url: 'https://dune.com', type: 'tool', free: true, source: 'Dune' },
      { id: 'cr-16', title: 'ETHGlobal Hackathons', description: 'The world\'s premier Web3 hackathon series. Compete for large prizes and build your public profile.', url: 'https://ethglobal.com', type: 'community', free: true, source: 'ETHGlobal' },
      { id: 'cr-8', title: 'Ethernaut', description: 'Smart contract security challenges by OpenZeppelin. Solve real exploit scenarios in a safe environment.', url: 'https://ethernaut.openzeppelin.com', type: 'practice', free: true, source: 'OpenZeppelin' },
      { id: 'cr-10', title: 'Cyfrin Updraft Security Course', description: 'The best free smart contract security and auditing curriculum. Built by a top audit firm.', url: 'https://updraft.cyfrin.io', type: 'video', free: true, source: 'Cyfrin' },
      { id: 'cr-9', title: 'Damn Vulnerable DeFi', description: 'Advanced DeFi exploit challenges used by real auditors to practice. Work through all 18 challenges.', url: 'https://github.com/tinchoabbate/damn-vulnerable-defi', type: 'practice', free: true, source: 'tinchoabbate' },
      { id: 'cr-14', title: 'OpenZeppelin Security Blog', description: 'Post-mortems of major DeFi exploits and security audits by a top-tier firm.', url: 'https://blog.openzeppelin.com', type: 'docs', free: true, source: 'OpenZeppelin' },
      { id: 'cr-17', title: 'Code4rena', description: 'Competitive smart contract audit platform. Find bugs in real protocols and get paid for valid findings.', url: 'https://code4rena.com', type: 'practice', free: true, source: 'Code4rena' },
    ],
    projects: [
      { id: 'cr-p1', title: 'Deploy Your Own ERC-20 Token', description: 'Write, test, and deploy a custom token to a testnet with name, symbol, supply cap, and access-controlled minting.', level: 'beginner', techTags: ['Solidity', 'Hardhat', 'OpenZeppelin'] },
      { id: 'cr-p2', title: 'On-Chain Guestbook', description: 'Contract that stores messages on-chain with wallet address and timestamp. Build a frontend with wallet connect and live message feed.', level: 'beginner', techTags: ['Solidity', 'ethers.js', 'React'] },
      { id: 'cr-p3', title: 'On-Chain Data Dashboard', description: 'Build a public Dune Analytics dashboard for one protocol — explain every SQL query in plain English.', level: 'beginner', techTags: ['Dune', 'SQL', 'On-Chain Analysis'] },
      { id: 'cr-p4', title: 'Decentralised Voting System', description: 'Governance contract with proposal creation, time-locked voting, quorum, and result tallying. Full Foundry test coverage.', level: 'intermediate', techTags: ['Solidity', 'Foundry', 'Governance'] },
      { id: 'cr-p5', title: 'NFT Collection with On-Chain Metadata', description: 'Full ERC-721 collection with IPFS metadata, minting frontend, whitelist phase, and royalties (ERC-2981).', level: 'intermediate', techTags: ['Solidity', 'IPFS', 'React', 'wagmi'] },
      { id: 'cr-p6', title: 'DeFi Protocol Analysis Report', description: 'Pick any top-10 DeFi protocol. Write a full technical breakdown: how it works, revenue model, risks, smart money activity, 12-month TVL trends.', level: 'intermediate', techTags: ['DeFi', 'On-Chain Analysis', 'Research'] },
      { id: 'cr-p7', title: 'Simplified AMM from Scratch', description: 'Build a constant-product AMM: add/remove liquidity, token swap, LP token minting, fee collection. No scaffolding — write every line. Foundry fuzz tests required.', level: 'advanced', techTags: ['Solidity', 'DeFi', 'AMM', 'Foundry Fuzzing'] },
      { id: 'cr-p8', title: 'Smart Contract Security Audit Report', description: 'Select an unaudited open-source contract. Run Slither, write Foundry fuzz tests, manually review logic. Produce a professional report: scope, findings by severity, PoC, and fixes.', level: 'advanced', techTags: ['Security', 'Slither', 'Foundry', 'Auditing'] },
    ],
    aiGuide: {
      goodFor: [
        'Explaining complex DeFi mechanisms in plain terms',
        'Reviewing Solidity code for common vulnerability patterns',
        'Writing boilerplate contract code from a specification',
        'Generating Foundry test cases for smart contract functions',
        'Summarising audit reports and protocol documentation',
        'Helping you understand transaction traces from Tenderly',
      ],
      notFor: [
        'Auditing smart contracts reliably — AI misses subtle logic errors that cost millions',
        'Predicting token prices — anyone claiming otherwise is selling something',
        'Replacing your own understanding of cryptographic primitives',
        'Verifying on-chain data — always check the block explorer yourself',
      ],
      tools: [
        { name: 'Claude / ChatGPT', use: 'DeFi concept explanations, Solidity code review, audit report drafting', url: 'https://claude.ai' },
        { name: 'GitHub Copilot', use: 'Solidity code completion and test generation', url: 'https://github.com/features/copilot' },
        { name: 'Tenderly', use: 'Simulate and debug transactions before they touch mainnet', url: 'https://tenderly.co' },
      ],
      samplePrompts: [
        'Explain how the x*y=k invariant in Uniswap V2 determines token price and why large trades cause more slippage than small ones.',
        'Review this Solidity function for reentrancy vulnerabilities and show me how to apply the checks-effects-interactions pattern: [paste code]',
        'Write a Foundry fuzz test for this ERC-20 transfer function that tests for balance underflow, approval bypass, and zero-address edge cases: [paste function]',
        'Explain the difference between msg.sender and tx.origin in Solidity, when each is used, and what the security implications of using tx.origin are.',
      ],
    },
    careerTip: 'In Web3, on-chain proof beats credentials every time. A GitHub with deployed contracts, a public Dune dashboard people use, or a Code4rena finding that paid out will get you further than any certificate. Start building in public from day one.',
  },
  {
    id: 'projectmgmt',
    slug: 'project-management',
    name: 'Project Management',
    tagline: 'Turn ideas into delivered results — on time, in scope, and within budget.',
    category: 'grow' as TrackCategory,
    colorHex: '#4299E1',
    icon: 'ClipboardList',
    difficulty: 2 as const,
    difficultyLabel: 'Beginner-Friendly',
    timeEstimate: '2–4 months',
    techStack: ['Jira', 'Trello', 'Asana', 'Notion', 'MS Project', 'Scrum', 'Agile'],
    overview: {
      description: 'Project management is how teams coordinate, how deadlines get met, and how budgets stay on track. Every organisation needs people who can run projects. This track covers both traditional (Waterfall) and modern (Agile/Scrum) approaches, the tools companies actually use, and the certifications that open doors — including the globally recognised PMP.',
      whatYouCanBuild: ['Full project plans with Gantt charts', 'Agile sprint boards', 'Risk registers and mitigation plans', 'Stakeholder communication plans', 'Project post-mortem reports'],
      jobTitles: ['Project Manager', 'Scrum Master', 'Agile Coach', 'Programme Manager', 'Technical Project Manager', 'Delivery Manager'],
      salaryRange: '$50,000–$130,000/year',
    },
    roadmap: [
      { id: 1, title: 'PM Foundations', duration: '2–3 weeks', topics: ['Project lifecycle: initiation to closure', 'Triple constraint: scope, time, cost', 'Stakeholder identification and mapping', 'Project charter and WBS', 'RACI matrix', 'Risk management basics', 'Communication planning'], description: 'Master the universal language of project management before specialising in any methodology. Every framework is built on these foundations.' },
      { id: 2, title: 'Agile & Scrum', duration: '3–4 weeks', topics: ['The Agile Manifesto and 12 principles', 'Scrum roles: PO, SM, Dev Team', 'Scrum events: Sprint, Planning, Standup, Review, Retro', 'User stories and story points', 'Kanban and WIP limits', 'Velocity and sprint planning', 'When Agile beats Waterfall — and when it does not'], description: 'Agile is now the default in tech. Understand Scrum deeply enough to run it, improve it, and explain it to a non-technical stakeholder.' },
      { id: 3, title: 'Tools & Planning', duration: '2–3 weeks', topics: ['Jira for Agile project tracking', 'Trello and Kanban boards', 'Asana and Monday.com', 'Gantt charts and critical path', 'Notion for documentation and wikis', 'Sprint planning and retrospective templates'], description: 'The best PM is only as effective as their systems. Get hands-on with the tools companies actually use.' },
      { id: 4, title: 'Budgeting & Reporting', duration: '2 weeks', topics: ['Project budgeting and forecasting', 'Earned Value Management (EVM)', 'Status reports that people actually read', 'Project KPIs and health metrics', 'Lessons learned and project closure'], description: 'Numbers and communication are what separate junior PMs from senior ones. Learn to tell the truth about project health clearly and early.' },
      { id: 5, title: 'Certifications & Career', duration: 'Ongoing', topics: ['PMP — the gold standard', 'CAPM for entry-level', 'PSM I (Professional Scrum Master)', 'PRINCE2 basics', 'Building a PM portfolio without formal experience'], description: 'PM certifications open doors that experience alone cannot. Know which one fits your situation and how to prepare efficiently.' },
    ],
    resources: [
      { id: 'pm-1', title: 'Project Management Full Course (freeCodeCamp)', description: 'Complete project management course covering methodologies, planning, budgeting, risk management, and stakeholder communication. Entirely free.', url: 'https://www.youtube.com/watch?v=uWPIsaYpY7U', type: 'video', free: true, source: 'Simplilearn / freeCodeCamp' },
      { id: 'pm-4', title: 'Project Management Full Course', description: 'Comprehensive project management course covering project life cycle, planning, scheduling, and tools.', url: 'https://www.youtube.com/watch?v=uWPIsaYpY7U', type: 'video', free: true, source: 'Simplilearn' },
      { id: 'pm-6', title: 'Agile Manifesto', description: 'The original 12 principles and 4 values. Read the source before reading anyone\'s interpretation of it.', url: 'https://agilemanifesto.org', type: 'docs', free: true, source: 'agilemanifesto.org' },
      { id: 'pm-2', title: 'Scrum Guide 2020', description: 'The official, definitive Scrum framework document. 13 pages. Read it before any Scrum course.', url: 'https://scrumguides.org/scrum-guide.html', type: 'book', free: true, source: 'Scrum.org' },
      { id: 'pm-3', title: 'Atlassian Agile Coach', description: 'Atlassian\'s comprehensive free Agile and Scrum learning resource. Practical and up to date.', url: 'https://www.atlassian.com/agile', type: 'docs', free: true, source: 'Atlassian' },
      { id: 'pm-5', title: 'Jira Tutorial for Beginners', description: 'Complete Jira walkthrough covering boards, backlog, sprints, and tracking daily tasks.', url: 'https://www.youtube.com/watch?v=F3H11Yj1W-k', type: 'video', free: true, source: 'Stewart Gauld' },
      { id: 'pm-8', title: 'ProjectLibre', description: 'Free open-source alternative to MS Project. Build full Gantt charts and project plans.', url: 'https://www.projectlibre.com', type: 'tool', free: true, source: 'ProjectLibre' },
      { id: 'pm-9', title: 'Notion PM Templates', description: 'Free project management templates — sprint boards, project trackers, meeting notes.', url: 'https://www.notion.so/templates/category/project-management', type: 'tool', free: true, source: 'Notion' },
      { id: 'pm-11', title: 'Project Status Reporting Guide', description: 'Best practices for writing effective project status reports with KPIs, traffic lights, and stakeholder communication.', url: 'https://asana.com/resources/project-status-report', type: 'docs', free: true, source: 'Asana' },
      { id: 'pm-10', title: 'Earned Value Management Explained', description: 'Guide to EVM fundamentals: planned value, earned value, actual cost, CPI, SPI, and forecasting.', url: 'https://www.pmi.org/learning/library/earned-value-management-systems-basics-6347', type: 'docs', free: true, source: 'PMI' },
      { id: 'pm-7', title: 'PMI Official Site', description: 'The Project Management Institute — home of the PMP certification. Free resources available.', url: 'https://www.pmi.org', type: 'docs', free: true, source: 'PMI' },
    ],
    projects: [
      { id: 'pm-p1', title: 'Project Charter', description: 'Write a full project charter for a real or hypothetical project — objectives, scope, stakeholders, risks, timeline, and budget estimate.', level: 'beginner', techTags: ['Documentation', 'Planning', 'Stakeholder Management'] },
      { id: 'pm-p2', title: 'Risk Register', description: 'Identify 10 risks for a project, rate each by probability and impact, write mitigation plans for the top 5.', level: 'beginner', techTags: ['Risk Management', 'Planning'] },
      { id: 'pm-p3', title: 'Agile Sprint Simulation', description: 'Use Jira or Trello to simulate a 2-week sprint. Set up a backlog, write user stories, plan the sprint, run daily standup docs, write a retrospective.', level: 'intermediate', techTags: ['Agile', 'Scrum', 'Jira', 'Trello'] },
      { id: 'pm-p4', title: 'Project Post-Mortem Report', description: 'Analyse a famous failed project and write a professional post-mortem: what went wrong, which PM practices were violated, what should have been done differently.', level: 'intermediate', techTags: ['Research', 'Analysis', 'Documentation'] },
      { id: 'pm-p5', title: 'Full Project Plan', description: 'Plan complete delivery of a real project: WBS, Gantt chart, RACI matrix, communication plan, risk register, budget, and stakeholder map.', level: 'advanced', techTags: ['ProjectLibre', 'Notion', 'Full Planning'] },
    ],
    aiGuide: {
      goodFor: ['Drafting project charters from a brief description', 'Writing user stories from feature requirements', 'Generating risk registers for a given project type', 'Creating status report templates', 'Writing retrospective summaries from bullet notes'],
      notFor: ['Making project decisions that require stakeholder context', 'Replacing real communication with team members', 'Estimating timelines without knowing the team\'s actual velocity'],
      tools: [
        { name: 'Claude / ChatGPT', use: 'Drafting PM documents, writing user stories, summarising meeting notes', url: 'https://claude.ai' },
        { name: 'Notion AI', use: 'Auto-fill project templates and summarise project documentation', url: 'https://www.notion.so' },
      ],
      samplePrompts: [
        'I am building a student learning platform. Write a full project charter including: project objectives, in-scope and out-of-scope items, key stakeholders, top 5 risks with mitigation, high-level milestones, and success criteria.',
        'Convert these feature requirements into properly formatted Agile user stories with acceptance criteria: [paste requirements]',
        'Write a weekly project status report for the following situation: [describe project status, blockers, upcoming milestones]',
      ],
    },
    careerTip: 'You do not need to wait for a PM job to get PM experience. Run your university project, your side project, or a community initiative as a real project — charter, backlog, sprints, retrospectives. Document it. That becomes your portfolio.',
  },
  {
    id: 'productmgmt',
    slug: 'product-management',
    name: 'Product Management',
    tagline: 'Decide what gets built, why it matters, and how you will know it worked.',
    category: 'grow' as TrackCategory,
    colorHex: '#ED8936',
    icon: 'Compass',
    difficulty: 3 as const,
    difficultyLabel: 'Medium',
    timeEstimate: '4–6 months',
    techStack: ['Jira', 'Figma', 'Mixpanel', 'Amplitude', 'Notion', 'Google Analytics', 'Hotjar'],
    overview: {
      description: 'Product managers decide what gets built and why — not how. You sit at the intersection of business, technology, and user experience, translating real user needs into products engineers can build and customers will love. It is one of the highest-paid and most influential non-engineering roles in tech, and one of the few careers where deep human empathy is as valuable as analytical thinking.',
      whatYouCanBuild: ['Product requirement documents (PRDs)', 'Product roadmaps', 'User research reports', 'Competitive analysis frameworks', 'Full product case studies', 'A/B test designs and results analyses'],
      jobTitles: ['Product Manager', 'Associate PM', 'Senior PM', 'Technical PM', 'Growth PM', 'Director of Product', 'Chief Product Officer'],
      salaryRange: '$70,000–$200,000+/year',
    },
    roadmap: [
      { id: 1, title: 'Product Thinking Foundations', duration: '2–3 weeks', topics: ['What PM is and is not', 'Jobs To Be Done (JTBD)', 'Product lifecycle: discovery to iteration', 'Business models and unit economics', 'North Star Metric', 'Stakeholder mapping', 'Building product intuition'], description: 'Product thinking is a mindset before it is a skill. Learn to see every product as a set of decisions and tradeoffs rather than a collection of features.' },
      { id: 2, title: 'User Research & Discovery', duration: '3–4 weeks', topics: ['User interviews: prepare, run, synthesise', 'The Mom Test — honest customer conversations', 'Surveys and usability testing', 'Competitive landscape analysis', 'Opportunity sizing', 'Assumption mapping'], description: 'The biggest PM mistake is building solutions before understanding problems. Discovery is how you earn the right to write a PRD.' },
      { id: 3, title: 'Strategy & Prioritisation', duration: '3–4 weeks', topics: ['Product vision and strategy', 'OKRs (Objectives and Key Results)', 'RICE, ICE, MoSCoW prioritisation frameworks', 'Kano Model — delighters vs expectations', 'Product roadmaps that are honest and useful', 'Feature vs outcome thinking', 'Saying no professionally'], description: 'Strategy is about what you will not do as much as what you will. Master prioritisation and you master the most critical PM skill.' },
      { id: 4, title: 'Writing Product Requirements', duration: '2–3 weeks', topics: ['PRD structure and best practices', 'User stories and acceptance criteria', 'Wireframes for PMs (Figma basics)', 'Working with design: handoff and feedback', 'Edge cases — the questions to ask before engineering starts'], description: 'A poorly written PRD creates poorly built products. Learn to communicate requirements so clearly that the right thing gets built the first time.' },
      { id: 5, title: 'Metrics, Analytics & Growth', duration: '3–4 weeks', topics: ['AARRR Pirate Metrics framework', 'DAU/WAU/MAU — when each matters', 'Retention curves and churn analysis', 'A/B testing design and interpretation', 'Funnel analysis — finding where users drop off', 'Mixpanel and Amplitude for product analytics', 'NPS and customer satisfaction'], description: 'Good PMs have opinions backed by data. Great PMs know which data to trust, which to question, and which to ignore.' },
      { id: 6, title: 'Shipping with Engineering', duration: '2–3 weeks', topics: ['How software development actually works', 'Writing tickets engineers love', 'MVP thinking — what minimum viable really means', 'Beta programs and phased launches', 'Launch checklists', 'Post-launch monitoring and response', 'Technical debt and roadmap impact'], description: 'A PM who understands engineering is 10× more effective. You do not need to code — but you need to understand enough to have the right conversations.' },
      { id: 7, title: 'PM Career & Portfolio', duration: 'Ongoing', topics: ['Breaking into PM without formal experience', 'APM programme applications', 'PM interview frameworks', 'Building a PM portfolio with case studies', 'Communities, newsletters, and mentorship'], description: 'The PM career path is not linear. Learn the fastest routes in and the portfolio work that actually gets you noticed.' },
    ],
    resources: [
      { id: 'prd-3', title: 'Product Management Full Course', description: 'Introduction to product management fundamentals, frameworks, product life cycle, and strategy.', url: 'https://www.youtube.com/watch?v=0p5YPBl_uBI', type: 'video', free: true, source: 'Simplilearn' },
      { id: 'prd-10', title: 'The Mom Test Summary', description: 'The most useful book ever written about customer conversations. This summary explains how to talk to customers and learn if your business is a good idea.', url: 'https://www.youtube.com/watch?v=pk3VOO9WT8o', type: 'video', free: true, source: 'Rick Kettner' },
      { id: 'prd-5', title: 'OKR Framework by Google', description: 'Google\'s original OKR documentation and templates from their re:Work initiative.', url: 'https://rework.withgoogle.com/guides/set-goals-with-okrs', type: 'docs', free: true, source: 'Google' },
      { id: 'prd-11', title: 'User Story Mapping Guide', description: 'How to use story mapping to go from user research to actionable product requirements. Free guide.', url: 'https://www.productplan.com/learn/user-story-mapping/', type: 'docs', free: true, source: 'ProductPlan' },
      { id: 'prd-13', title: 'Writing Good Acceptance Criteria', description: 'Guide to writing acceptance criteria that developers and QA can actually use. Examples included.', url: 'https://www.atlassian.com/agile/requirements/acceptance-criteria', type: 'docs', free: true, source: 'Atlassian' },
      { id: 'prd-12', title: 'PRD Template & Examples', description: 'A practical PRD template with real examples from top tech companies. Fill in the blanks to get started.', url: 'https://www.notion.so/templates/product-requirements-document-template', type: 'tool', free: true, source: 'Notion' },
      { id: 'prd-7', title: 'Hotjar', description: 'Heatmaps and session recordings. See what users actually do on a page rather than guessing.', url: 'https://www.hotjar.com', type: 'tool', free: true, source: 'Hotjar' },
      { id: 'prd-6', title: 'Mixpanel', description: 'Product analytics platform. Understand exactly how users behave inside your product. Free tier.', url: 'https://mixpanel.com', type: 'tool', free: true, source: 'Mixpanel' },
      { id: 'prd-1', title: 'Lenny\'s Newsletter', description: 'The best product management newsletter alive. Essays by top PMs at Airbnb, Uber, Figma, and more. Free weekly posts with the option to support.', url: 'https://www.lennysnewsletter.com', type: 'docs', free: true, source: 'Lenny Rachitsky' },
      { id: 'prd-2', title: 'Product School Free Resources', description: 'Free PM resources, webinars, and community from one of the most respected PM schools.', url: 'https://productschool.com/resources', type: 'docs', free: true, source: 'Product School' },
      { id: 'prd-9', title: 'ProductHunt', description: 'Platform where products launch. Essential for understanding what resonates and what does not.', url: 'https://www.producthunt.com', type: 'community', free: true, source: 'Product Hunt' },
      { id: 'prd-8', title: 'Mind the Product', description: 'The largest PM community. Articles, events, job board, and a global Slack community.', url: 'https://www.mindtheproduct.com', type: 'community', free: true, source: 'Mind the Product' },
      { id: 'prd-4', title: 'Shreyas Doshi on Twitter/X', description: 'One of the most insightful PM thinkers sharing publicly. Read every thread, especially on influence and leverage.', url: 'https://twitter.com/shreyas', type: 'community', free: true, source: 'Shreyas Doshi' },
    ],
    projects: [
      { id: 'prd-p1', title: 'Product Teardown', description: 'Pick any daily-use app. Write a teardown: target user, jobs-to-be-done, North Star Metric, what works, and what you would change with justification.', level: 'beginner', techTags: ['Product Thinking', 'Analysis', 'Documentation'] },
      { id: 'prd-p2', title: 'User Interview Report', description: 'Conduct 5 user interviews about a specific problem. Synthesise themes, needs, insights, and 3 opportunity statements.', level: 'beginner', techTags: ['User Research', 'Discovery', 'The Mom Test'] },
      { id: 'prd-p3', title: 'PRD — Product Requirements Document', description: 'Write a full PRD for one feature of an existing product: problem statement, personas, user stories, acceptance criteria, and success metrics.', level: 'intermediate', techTags: ['PRD', 'User Stories', 'Documentation'] },
      { id: 'prd-p4', title: 'Competitive Analysis', description: 'Map 5 competitors across target user, value proposition, pricing, key features, and differentiation. Conclude with a market gap analysis.', level: 'intermediate', techTags: ['Strategy', 'Analysis', 'Market Research'] },
      { id: 'prd-p5', title: 'Full Product Case Study', description: 'Problem → research → opportunity sizing → strategy → MVP scope → 6-month roadmap → launch metrics. Package as a polished PDF portfolio piece.', level: 'advanced', techTags: ['Full PM Process', 'Strategy', 'Portfolio'] },
    ],
    aiGuide: {
      goodFor: ['Drafting PRDs from a problem description', 'Generating user interview question sets', 'Writing user stories and acceptance criteria from feature notes', 'Structuring competitive analysis frameworks', 'Summarising user interview transcripts into themes'],
      notFor: ['Replacing actual conversations with real users', 'Making strategic decisions without business context', 'Generating authentic product insight without research'],
      tools: [
        { name: 'Claude / ChatGPT', use: 'PRD drafting, user story writing, interview synthesis, case study structuring', url: 'https://claude.ai' },
        { name: 'Notion AI', use: 'Filling templates, summarising notes, generating meeting action items', url: 'https://www.notion.so' },
      ],
      samplePrompts: [
        'I am writing a PRD for a feature that lets university students set weekly study goals and track completion. Write the full PRD including: problem statement, 2 user personas, 5 user stories with acceptance criteria, out-of-scope items, and 3 success metrics.',
        'I have these 5 user interview notes: [paste notes]. Synthesise them into: 3 key themes, the top 3 user needs expressed, 2 surprising insights, and 3 opportunity statements formatted as "How might we..." questions.',
        'Generate a RICE prioritisation matrix for these 6 features: [list features]. Estimate each dimension and explain your reasoning.',
      ],
    },
    careerTip: 'The fastest path into PM is building something — even a side project. Run it like a PM: do user research, write a PRD, build an MVP, measure it, iterate. That process, documented as a case study, is more persuasive than any certificate.',
  },
  {
    id: 'dart',
    slug: 'dart-programming',
    name: 'Dart Programming',
    tagline: 'The language that powers Flutter — clean, fast, and built for cross-platform apps.',
    category: 'build' as TrackCategory,
    colorHex: '#00B4AB',
    icon: 'Zap',
    difficulty: 2 as const,
    difficultyLabel: 'Beginner-Friendly',
    timeEstimate: '4–8 weeks',
    techStack: ['Dart', 'DartPad', 'pub.dev', 'Flutter', 'dart:core', 'dart:async'],
    overview: {
      description: 'Dart is Google\'s programming language built for building fast, cross-platform applications. It powers Flutter — letting you write one codebase and deploy to Android, iOS, web, and desktop. Dart is strongly typed, null-safe, and deliberately readable. If Flutter is your destination, Dart is the road. This track takes you from syntax to async patterns to Flutter-ready Dart architecture.',
      whatYouCanBuild: ['CLI tools and scripts', 'Backend servers with Dart (Shelf/Frog)', 'Flutter mobile apps (after this track)', 'Dart packages published to pub.dev', 'Data processing scripts'],
      jobTitles: ['Flutter Developer', 'Mobile Developer', 'Dart Developer', 'Cross-Platform Developer'],
      salaryRange: 'See Mobile Development track — Dart is the prerequisite for Flutter',
    },
    roadmap: [
      { id: 1, title: 'Dart Fundamentals', duration: '2–3 weeks', topics: ['Variables, types, and null safety', 'var, final, const — key differences', 'Null-aware operators: ??, ?., !', 'Functions: named, anonymous, optional parameters', 'Collections: List, Set, Map', 'Control flow and error handling'], description: 'Dart\'s null safety system is its most important modern feature — it eliminates an entire class of runtime errors. Understanding it from day one shapes good habits.' },
      { id: 2, title: 'Object-Oriented Dart', duration: '2–3 weeks', topics: ['Classes, constructors, named constructors', 'Factory constructors', 'Inheritance, abstract classes, interfaces', 'Mixins — Dart\'s multiple inheritance approach', 'Generics and extension methods', 'Enhanced enums'], description: 'Dart is a pure OOP language — everything is an object. Mastering classes and mixins directly translates to how Flutter widgets are structured.' },
      { id: 3, title: 'Async Dart', duration: '1–2 weeks', topics: ['The Dart event loop', 'Future<T> and async/await', 'Stream<T> — sequences of async events', 'StreamController', 'Isolates for true parallelism', 'Error handling in async code'], description: 'Flutter apps are inherently asynchronous — API calls, animations, user input. Understanding Dart\'s async model makes you a significantly better Flutter developer.' },
      { id: 4, title: 'Dart for Flutter', duration: '1–2 weeks', topics: ['How Dart compiles to native (AOT)', 'Dart classes as Flutter widgets', 'dart:core, dart:math, dart:convert', 'pub.dev and pubspec.yaml', 'Unit testing with package:test', 'Dart DevTools for debugging'], description: 'Bridge the gap between pure Dart and Flutter development. Understand how your Dart knowledge translates into every widget, state object, and service you write in Flutter.' },
    ],
    resources: [
      { id: 'dart-3', title: 'Dart Full Course', description: 'Complete beginner Dart course covering all fundamentals — the best free single-video start.', url: 'https://www.youtube.com/watch?v=Ej_Pcr4uC2Q', type: 'video', free: true, source: 'freeCodeCamp' },
      { id: 'dart-1', title: 'Official Dart Documentation', description: 'The complete Dart language tour. Start here and return often. Well maintained by the Dart team.', url: 'https://dart.dev/guides', type: 'docs', free: true, source: 'Google / Dart' },
      { id: 'dart-2', title: 'DartPad', description: 'In-browser Dart editor. Zero setup required. Write and run Dart code instantly from any device.', url: 'https://dartpad.dev', type: 'tool', free: true, source: 'Google' },
      { id: 'dart-6', title: 'Dart Null Safety Guide', description: 'The most important modern Dart feature explained clearly. Essential reading before writing real code.', url: 'https://dart.dev/null-safety', type: 'docs', free: true, source: 'Google / Dart' },
      { id: 'dart-4', title: 'The Net Ninja — Dart Series', description: 'Clear, well-paced Dart tutorial playlist. Good supplement to the official docs.', url: 'https://www.youtube.com/playlist?list=PL4cUxeGkcC9iVGY3ppchN9CBSPYyHmPh4', type: 'video', free: true, source: 'The Net Ninja' },
      { id: 'dart-10', title: 'Dart Async Programming', description: 'Official Dart guide to Futures, async/await, streams, and isolates for concurrent programming.', url: 'https://dart.dev/codelabs/async-await', type: 'docs', free: true, source: 'Google / Dart' },
      { id: 'dart-11', title: 'Dart Streams Tutorial', description: 'Learn Dart StreamController, stream transformations, subscriptions, and broadcast streams.', url: 'https://dart.dev/tutorials/language/streams', type: 'docs', free: true, source: 'Google / Dart' },
      { id: 'dart-5', title: 'Effective Dart', description: 'Google\'s official style guide for writing good Dart. Read this after learning the basics.', url: 'https://dart.dev/guides/language/effective-dart', type: 'docs', free: true, source: 'Google / Dart' },
      { id: 'dart-7', title: 'pub.dev', description: 'The official Dart and Flutter package repository. Where you find packages and publish your own.', url: 'https://pub.dev', type: 'tool', free: true, source: 'Google' },
      { id: 'dart-8', title: 'Flutter Official Docs', description: 'Where your Dart skills are applied. The official Flutter documentation — thorough and up to date.', url: 'https://flutter.dev/docs', type: 'docs', free: true, source: 'Google' },
    ],
    projects: [
      { id: 'dart-p1', title: 'CLI Calculator', description: 'Command-line calculator handling all operations, division-by-zero errors, and user exit gracefully.', level: 'beginner', techTags: ['Dart', 'CLI', 'Error Handling'] },
      { id: 'dart-p2', title: 'Student Grade Manager', description: 'CLI app using classes, lists, and maps. Add students, assign grades, calculate averages.', level: 'beginner', techTags: ['Dart', 'OOP', 'Collections'] },
      { id: 'dart-p3', title: 'Async Weather CLI', description: 'Fetch real weather from a public API using http package, async/await, and JSON parsing. No Flutter.', level: 'intermediate', techTags: ['Dart', 'Async', 'API', 'JSON'] },
      { id: 'dart-p4', title: 'Custom Data Stream', description: 'Simulate a real-time data feed using Stream and StreamController with filtering and transformation.', level: 'intermediate', techTags: ['Dart', 'Streams', 'Async'] },
      { id: 'dart-p5', title: 'Dart Package on pub.dev', description: 'Write, document, test, and publish a small Dart utility package to pub.dev with full unit test coverage.', level: 'advanced', techTags: ['Dart', 'pub.dev', 'Testing', 'Open Source'] },
    ],
    aiGuide: {
      goodFor: ['Explaining Dart null safety errors', 'Converting JavaScript patterns to idiomatic Dart', 'Generating Dart class structures from a description', 'Debugging async/await errors', 'Writing unit tests for Dart functions'],
      notFor: ['Understanding why Dart patterns exist — learn the language first', 'Generating large amounts of Dart code without reviewing it carefully'],
      tools: [
        { name: 'GitHub Copilot', use: 'Dart code completion, especially for boilerplate class structures', url: 'https://github.com/features/copilot' },
        { name: 'Claude / ChatGPT', use: 'Explaining Dart errors, translating JS to Dart, async pattern questions', url: 'https://claude.ai' },
      ],
      samplePrompts: [
        'I am getting this Dart null safety error: [paste error]. Explain what it means and show me two ways to fix it properly.',
        'Rewrite this JavaScript class in idiomatic Dart with null safety, a named constructor, and a factory constructor: [paste JS code]',
        'Write a Dart class that represents a User with: id (non-nullable), name (non-nullable), email (non-nullable), profilePicture (nullable). Include a factory constructor that parses from JSON and a toJson() method.',
      ],
    },
    careerTip: 'Do not skip Dart to rush into Flutter. Developers who understand Dart deeply write significantly better Flutter code, debug 10× faster, and stand out in interviews. Spend real time here first.',
  },
  {
    id: 'sonic',
    slug: 'sonic-blockchain',
    name: 'Sonic Blockchain Development',
    tagline: 'Build on the fastest EVM chain — 10,000 TPS, sub-second finality, and fees that pay you back.',
    category: 'build' as TrackCategory,
    colorHex: '#FF6B35',
    icon: 'Zap',
    difficulty: 4 as const,
    difficultyLabel: 'Hard',
    timeEstimate: '2–4 months',
    techStack: ['Solidity', 'Foundry', 'Sonic EVM', 'OpenZeppelin', 'ethers.js', 'HackQuest'],
    overview: {
      description: 'Sonic is a high-performance EVM-compatible blockchain evolved from Fantom — delivering 10,000 TPS, sub-second finality, and transactions under $0.01. Its Fee Monetisation (FeeM) mechanism pays developers a share of the fees generated by their deployed contracts, creating a direct economic incentive to build. This track follows the official HackQuest Sonic learning path and adds ecosystem depth, project work, and the FeeM strategy layer.',
      whatYouCanBuild: ['Smart contracts deployed on Sonic mainnet', 'FeeM-registered dApps earning on-chain revenue', 'DeFi primitives on a high-performance chain', 'ERC-20 tokens and NFT collections on Sonic', 'Full dApp frontends connected to Sonic contracts'],
      jobTitles: ['Sonic Ecosystem Developer', 'Smart Contract Developer', 'Web3 Engineer', 'Blockchain Developer', 'DeFi Protocol Engineer'],
      salaryRange: '$70,000–$200,000+/year (see Crypto & Web3 track for full career path)',
    },
    roadmap: [
      { id: 1, title: 'Web3 Basics (HackQuest Phase 1)', duration: '1–2 weeks', topics: ['Blockchain fundamentals', 'Wallets and private keys', 'Transactions and gas', 'How decentralised networks reach consensus'], description: 'Complete Phase 1 of the HackQuest Sonic path. This foundation applies to every EVM chain you will ever build on.' },
      { id: 2, title: 'Sonic Ecosystem (HackQuest Phase 2)', duration: '1 week', topics: ['How Sonic evolved from Fantom', '10,000 TPS and sub-second finality — how it works', 'Transaction costs under $0.01', 'Fee Monetisation (FeeM) mechanism', 'Sonic ecosystem overview: protocols, bridges, wallets'], description: 'Understand what makes Sonic different before writing a single line of code. FeeM is the most important concept — it is how building on Sonic becomes financially sustainable.' },
      { id: 3, title: 'Solidity Fundamentals (HackQuest Phases 3–4)', duration: '4–6 weeks', topics: ['Basic Solidity: variables, functions, types (Phase 3)', 'Advanced Solidity: inheritance, interfaces, events, modifiers (Phase 4)', 'Deploying on Sonic testnet', 'Reading your contract on the Sonic block explorer'], description: 'Sonic is EVM-compatible — Solidity you write for Ethereum works here. Complete both phases on HackQuest for the structured, ecosystem-specific curriculum.' },
      { id: 4, title: 'Build & Frameworks (HackQuest Phases 5–6)', duration: '3–4 weeks', topics: ['Guided projects on Sonic (Phase 5)', 'Foundry: compile, test, deploy, fuzz (Phase 6)', 'Writing Foundry tests for your Sonic contracts', 'Deployment scripts and environment management'], description: 'Phase 5 gets you building real things on Sonic. Phase 6 teaches Foundry — the modern toolkit that serious smart contract developers use.' },
      { id: 5, title: 'Security & Ecosystem (HackQuest Phases 7–8)', duration: '2–3 weeks', topics: ['Smart contract security patterns (Phase 7)', 'Reentrancy, access control, oracle manipulation', 'Sonic ecosystem protocols and DeFi (Phase 8)', 'Developer tools, bridges, and community resources'], description: 'Complete the HackQuest path and earn your Sonic certification. Phase 7 ensures your contracts are safe before touching mainnet.' },
      { id: 6, title: 'FeeM Strategy & Mainnet', duration: '2–3 weeks', topics: ['How FeeM calculates developer revenue', 'Registering contracts in the FeeM programme', 'Designing contracts for fee generation', 'Monitoring earnings and contract activity', 'Sonic mainnet deployment checklist'], description: 'FeeM is what makes Sonic uniquely attractive for builders. Learn to design products that generate sustainable on-chain revenue from day one.' },
    ],
    resources: [
      { id: 'son-1', title: 'HackQuest Sonic Learning Track', description: 'The official 8-phase Sonic developer curriculum. Complete it and earn a Sonic certification. Start here.', url: 'https://www.hackquest.io/learning-track/Sonic', type: 'docs', free: true, source: 'HackQuest / Sonic' },
      { id: 'son-2', title: 'Sonic Official Documentation', description: 'Complete Sonic blockchain developer documentation — APIs, RPC endpoints, contract addresses.', url: 'https://docs.soniclabs.com', type: 'docs', free: true, source: 'Sonic Labs' },
      { id: 'son-3', title: 'Sonic Testnet Faucet', description: 'Get free testnet S tokens to deploy and test your contracts before going to mainnet.', url: 'https://testnet.soniclabs.com/account', type: 'tool', free: true, source: 'Sonic Labs' },
      { id: 'son-4', title: 'Sonic Block Explorer', description: 'View transactions, verify contracts, and monitor activity on the Sonic blockchain.', url: 'https://explorer.soniclabs.com', type: 'tool', free: true, source: 'Sonic Labs' },
      { id: 'son-8', title: 'Patrick Collins Solidity Course', description: 'The best free Solidity foundation — complete before or alongside the HackQuest path for deeper understanding.', url: 'https://www.youtube.com/watch?v=umepbfKp5rI', type: 'video', free: true, source: 'Patrick Collins' },
      { id: 'son-6', title: 'OpenZeppelin Contracts', description: 'Battle-tested smart contract libraries fully compatible with Sonic\'s EVM.', url: 'https://docs.openzeppelin.com/contracts', type: 'docs', free: true, source: 'OpenZeppelin' },
      { id: 'son-5', title: 'Foundry Book', description: 'Documentation for Foundry — used in Phase 6 of the HackQuest path and in every serious Sonic project.', url: 'https://book.getfoundry.sh', type: 'docs', free: true, source: 'Paradigm' },
      { id: 'son-10', title: 'Sonic FeeM Strategy Guide', description: 'Official guide to Sonic\'s Fee Monetization mechanism and how to optimize dApp revenue.', url: 'https://docs.sonic.game/sonic/decentralized-ecosystem/feem', type: 'docs', free: true, source: 'Sonic Labs' },
      { id: 'son-11', title: 'Deploying to Sonic Mainnet', description: 'Step-by-step guide to deploying your smart contracts on Sonic mainnet from testnet.', url: 'https://docs.sonic.game/sonic/deployment-guide', type: 'docs', free: true, source: 'Sonic Labs' },
      { id: 'son-7', title: 'Sonic on DefiLlama', description: 'Track Sonic\'s total value locked, protocol growth, and ecosystem development in real time.', url: 'https://defillama.com/chain/Sonic', type: 'tool', free: true, source: 'DefiLlama' },
      { id: 'son-9', title: 'Sonic Discord', description: 'Official Sonic developer community — get help, find collaborators, and stay updated on ecosystem developments.', url: 'https://discord.gg/soniclabs', type: 'community', free: true, source: 'Sonic Labs' },
    ],
    projects: [
      { id: 'son-p1', title: 'First Contract on Sonic Testnet', description: 'Complete HackQuest Phases 1–4, deploy a contract on Sonic testnet, and document: wallet setup, faucet, tx hash, and what the contract does.', level: 'beginner', techTags: ['Solidity', 'Sonic Testnet', 'HackQuest'] },
      { id: 'son-p2', title: 'ERC-20 Token on Sonic', description: 'Deploy a custom ERC-20 on Sonic testnet, verify on block explorer, transfer between wallets, and document the full process.', level: 'beginner', techTags: ['Solidity', 'ERC-20', 'Sonic', 'OpenZeppelin'] },
      { id: 'son-p3', title: 'FeeM-Registered dApp', description: 'Build and register a smart contract in Sonic\'s FeeM programme. Simulate transactions and calculate projected weekly fee revenue.', level: 'intermediate', techTags: ['Sonic', 'FeeM', 'Solidity', 'Revenue'] },
      { id: 'son-p4', title: 'HackQuest Guided Projects Portfolio', description: 'Complete all Phase 5 guided projects. Document each with: what it does, what you learned, and the deployed contract address on testnet.', level: 'intermediate', techTags: ['HackQuest', 'Sonic', 'Solidity', 'Foundry'] },
      { id: 'son-p5', title: 'DeFi Protocol on Sonic Mainnet', description: 'Deploy a simplified DeFi primitive on Sonic mainnet designed for FeeM revenue. Include a security review covering the top 5 vulnerability checks.', level: 'advanced', techTags: ['DeFi', 'Sonic Mainnet', 'FeeM', 'Security'] },
    ],
    aiGuide: {
      goodFor: ['Explaining Sonic-specific concepts like FeeM', 'Reviewing Solidity contracts for common vulnerabilities', 'Generating Foundry test cases', 'Explaining transaction traces from the Sonic explorer', 'Writing deployment scripts'],
      notFor: ['Auditing contracts that will hold real value', 'Predicting Sonic ecosystem growth or token prices', 'Replacing hands-on practice with the HackQuest curriculum'],
      tools: [
        { name: 'Claude / ChatGPT', use: 'Solidity review, FeeM mechanics explanation, deployment script generation', url: 'https://claude.ai' },
        { name: 'GitHub Copilot', use: 'Solidity code completion and Foundry test generation', url: 'https://github.com/features/copilot' },
      ],
      samplePrompts: [
        'Explain how Sonic\'s Fee Monetisation (FeeM) mechanism works technically — how fees are calculated, how developer share is determined, and how to register a contract to participate.',
        'Review this Solidity contract I am deploying on Sonic for reentrancy vulnerabilities and access control issues: [paste code]',
        'Write a Foundry deployment script for this Sonic contract that: sets the deployer as owner, verifies the contract on the Sonic explorer, and logs the deployed address: [paste contract]',
      ],
    },
    careerTip: 'Complete the HackQuest path and earn the Sonic certification — it is on-chain verifiable, which means it is permanent, unfakeable, and lives on your wallet address forever. Add it to every profile immediately.',
  },
  // ======================================================================
  // AI CATEGORY TRACKS
  // ======================================================================
  {
    id: 'ai-foundations',
    slug: 'ai-foundations',
    name: 'AI Foundations & Fluency',
    tagline: 'Understand AI, choose the right tools, and build reliable habits for working with AI.',
    category: 'ai',
    colorHex: '#7C3AED',
    icon: 'Brain',
    difficulty: 1,
    difficultyLabel: 'Beginner-Friendly',
    timeEstimate: '2 to 4 weeks',
    techStack: ['ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'Prompting'],
    overview: {
      description:
        'AI can research, write, analyze, code, design, create video, automate workflows, search information, and help build software. The difficult part is knowing what to use, how to use it, and when another tool is better. This track teaches the fundamentals of working with modern AI systems — not just chatting with them.',
      whatYouCanBuild: [
        'Reliable AI workflows for recurring tasks',
        'Effective prompts that produce useful output',
        'Tool selection strategies for different problems',
        'Verification habits for AI-generated content',
        'Repeatable processes for research, writing, and analysis',
      ],
      jobTitles: [
        'AI Literate Professional',
        'Prompt Engineer',
        'AI Workflow Designer',
        'Content Strategist',
        'Productivity Consultant',
      ],
      salaryRange: '$40,000 to $120,000/year',
    },
    roadmap: [
      {
        id: 1,
        title: 'Understanding AI',
        duration: '1 week',
        topics: [
          'What AI actually is',
          'Machine learning vs generative AI',
          'Models, products, and tools',
          'What AI is good at',
          'Where AI fails',
        ],
        description:
          'AI is a broad field. Learn what modern AI tools actually do, how they differ from each other, and where they are genuinely useful versus where they are not the right tool.',
      },
      {
        id: 2,
        title: 'The Modern AI Landscape',
        duration: '1 week',
        topics: [
          'General assistants (ChatGPT, Claude, Gemini)',
          'Reasoning models',
          'Multimodal systems',
          'Search and research tools',
          'Coding tools',
          'Creative tools',
        ],
        description:
          'The AI tool landscape is large and changing fast. Learn to categorize tools by what they do rather than by brand name, so you can choose the right one for any task.',
      },
      {
        id: 3,
        title: 'Communicating With AI',
        duration: '1 week',
        topics: [
          'How prompts work',
          'Context and instructions',
          'Audience, format, and constraints',
          'Examples and few-shot prompting',
          'Iterating on output',
        ],
        description:
          'The quality of AI output depends heavily on the quality of your input. Learn to give AI the context, structure, and constraints it needs to produce useful results.',
      },
      {
        id: 4,
        title: 'Thinking With AI',
        duration: '1 week',
        topics: [
          'Using AI for brainstorming',
          'Using AI for analysis',
          'Using AI for planning',
          'Combining AI with human judgment',
          'When not to use AI',
        ],
        description:
          'AI is most powerful when it supports your thinking rather than replacing it. Learn to use AI as a thinking partner for research, planning, analysis, and decision-making.',
      },
      {
        id: 5,
        title: 'AI Reliability',
        duration: '1 week',
        topics: [
          'Hallucinations and confabulation',
          'Outdated information',
          'Verification strategies',
          'Source checking',
          'High-stakes decisions',
        ],
        description:
          'AI output is not evidence. Learn to identify when AI is likely wrong, how to verify important claims, and when to treat AI output as a starting point rather than a final answer.',
      },
      {
        id: 6,
        title: 'Building Repeatable AI Workflows',
        duration: '1 week',
        topics: [
          'Task definition',
          'Context templates',
          'Output formats',
          'Review criteria',
          'Iteration and improvement',
        ],
        description:
          'Move from one-off prompts to repeatable workflows. Define tasks clearly, create reusable instruction templates, and build processes you can rely on.',
      },
    ],
    resources: [
      {
        id: 'ai-f1',
        title: 'OpenAI Academy — AI Foundations',
        description:
          'Official beginner course covering AI fundamentals, how AI works, use cases, and responsible use. Use it alongside Stage 1 before taking the foundation quiz.',
        url: 'https://openai.com/academy/ai-fundamentals/',
        type: 'docs',
        free: true,
        source: 'OpenAI',
      },
      {
        id: 'ai-f2',
        title: 'OpenAI Academy — AI Foundations Course',
        description:
          'Hands-on introduction to AI, prompting, context, output review, and responsible use. Free and available globally with a ChatGPT account.',
        url: 'https://academy.openai.com/public/courses/ai-foundations-juzjs?autoEnroll=true',
        type: 'docs',
        free: true,
        source: 'OpenAI Academy',
      },
      {
        id: 'ai-f3',
        title: 'Microsoft Learn — Introduction to Generative AI',
        description:
          'Beginner introduction to generative AI, LLMs, model comparison, critical thinking, and responsible use. Includes an assessment.',
        url: 'https://learn.microsoft.com/en-us/training/modules/intro-generative-ai-explore-basics/',
        type: 'docs',
        free: true,
        source: 'Microsoft Learn',
      },
      {
        id: 'ai-f4',
        title: 'Microsoft Learn — What Is Generative AI?',
        description:
          'Clear, concise explanation of generative AI fundamentals and responsible use. Good supplementary reading for Stage 1.',
        url: 'https://learn.microsoft.com/en-us/training/modules/what-generative-ai/',
        type: 'docs',
        free: true,
        source: 'Microsoft Learn',
      },
      {
        id: 'ai-f5',
        title: 'OpenAI Academy — Getting Started With ChatGPT',
        description:
          'Practical introduction to ChatGPT covering prompting, tools, files, search, image creation, projects and workflows. Use as a supplementary resource.',
        url: 'https://openai.com/academy/getting-started/',
        type: 'docs',
        free: true,
        source: 'OpenAI',
      },
      {
        id: 'ai-f6',
        title: 'Anthropic — Build With Claude',
        description:
          'Prompt engineering, evaluations, and building with Claude. Use alongside OpenAI resources to understand multiple AI assistants.',
        url: 'https://www.anthropic.com/learn/build-with-claude',
        type: 'docs',
        free: true,
        source: 'Anthropic',
      },
      {
        id: 'ai-f7',
        title: 'Microsoft — Generative AI for Beginners',
        description:
          'Comprehensive 18-lesson course covering LLM fundamentals, model comparison, and responsible AI. Excellent for structured learning.',
        url: 'https://learn.microsoft.com/en-us/shows/generative-ai-for-beginners/',
        type: 'video',
        free: true,
        source: 'Microsoft',
      },
    ],
    projects: [
      {
        id: 'ai-f-p1',
        title: 'AI Task Triage',
        description:
          'Analyze ten realistic tasks and decide whether AI, search, code, automation, traditional software, or human judgment is the right tool. Teaches tool selection based on the problem.',
        level: 'beginner',
        techTags: ['AI', 'Tool Selection', 'Critical Thinking'],
      },
      {
        id: 'ai-f-p2',
        title: 'Personal AI Workbench',
        description:
          'Select a recurring task and build a repeatable AI workflow with task definition, context, desired output, constraints, examples, review criteria, and a reusable instruction template.',
        level: 'beginner',
        techTags: ['AI', 'Prompting', 'Workflow Design'],
      },
    ],
    aiGuide: {
      goodFor: [
        'Understanding what AI can and cannot do',
        'Learning to choose the right AI tool for a task',
        'Writing clearer, more effective prompts',
        'Building habits for verifying AI output',
        'Creating repeatable workflows',
      ],
      notFor: [
        'Replacing your own thinking and judgment',
        'Trusting AI output without verification',
        'Using AI for high-stakes decisions without human review',
      ],
      tools: [
        {
          name: 'ChatGPT',
          use: 'General-purpose AI assistant for writing, analysis, brainstorming',
          url: 'https://chat.openai.com',
        },
        {
          name: 'Claude',
          use: 'Long-context reasoning, analysis, and careful writing',
          url: 'https://claude.ai',
        },
        {
          name: 'Gemini',
          use: 'Multimodal tasks, search-integrated AI, Google ecosystem',
          url: 'https://gemini.google.com',
        },
        {
          name: 'Perplexity',
          use: 'AI-powered research with source citations',
          url: 'https://perplexity.ai',
        },
      ],
      samplePrompts: [
        'I need to write a 300-word explanation of how APIs work for a first-year computer science student who has never used one. Include one simple real-world analogy.',
        'Compare three approaches to organizing a weekly content calendar for a small business: manual planning, AI-assisted planning, and fully automated scheduling. List pros and cons of each.',
        'I have a 10-page document about climate policy. Summarize the key arguments, identify any claims that seem unsupported, and suggest three questions I should verify before using this in a report.',
      ],
    },
    careerTip:
      'AI fluency is becoming a baseline professional skill, not a specialty. The people who get ahead are not the ones who know the most AI tools — they are the ones who know which tool to use for which problem, and when to trust their own judgment over AI output.',
  },
  {
    id: 'ai-work',
    slug: 'ai-for-work',
    name: 'AI for Work & Productivity',
    tagline: 'Use AI to write, plan, research, and manage your professional work more effectively.',
    category: 'ai',
    colorHex: '#7C3AED',
    icon: 'Briefcase',
    difficulty: 2,
    difficultyLabel: 'Beginner-Friendly',
    timeEstimate: '3 to 5 weeks',
    techStack: ['ChatGPT', 'Claude', 'Copilot', 'Google Docs', 'Notion AI'],
    overview: {
      description:
      'Most professionals can immediately benefit from AI in their daily work — writing emails, summarizing documents, planning projects, analyzing data, and automating repetitive tasks. This track teaches practical AI skills for the workplace without requiring programming knowledge.',
      whatYouCanBuild: [
        'AI-powered communication workflows',
        'Document analysis and summarization systems',
        'Automated research processes',
        'Planning and project management workflows',
        'Professional productivity systems',
      ],
      jobTitles: [
        'AI-Enhanced Professional',
        'Project Manager',
        'Operations Specialist',
        'Marketing Manager',
        'Business Analyst',
      ],
      salaryRange: '$40,000 to $110,000/year',
    },
    roadmap: [
      {
        id: 1,
        title: 'AI for Communication',
        duration: '1 week',
        topics: [
          'Drafting professional emails',
          'Writing meeting summaries',
          'Creating presentations',
          'Editing and tone adjustment',
          'Multilingual communication',
        ],
        description:
          'Learn to use AI for professional communication — drafting, editing, summarizing, and adapting tone for different audiences.',
      },
      {
        id: 2,
        title: 'AI for Documents',
        duration: '1 week',
        topics: [
          'Summarizing long documents',
          'Extracting key information',
          'Comparing documents',
          'Creating reports from data',
          'Working with PDFs and spreadsheets',
        ],
        description:
          'AI excels at processing large amounts of text. Learn to summarize, extract, compare, and synthesize documents efficiently.',
      },
      {
        id: 3,
        title: 'AI for Learning',
        duration: '1 week',
        topics: [
          'Using AI as a tutor',
          'Creating study materials',
          'Testing your understanding',
          'Researching new topics',
          'Building knowledge frameworks',
        ],
        description:
          'AI can accelerate learning when used correctly. Learn to use it for explanations, practice questions, research, and building understanding.',
      },
      {
        id: 4,
        title: 'AI for Planning',
        duration: '1 week',
        topics: [
          'Project planning with AI',
          'Breaking down large tasks',
          'Creating timelines and roadmaps',
          'Risk identification',
          'Stakeholder communication',
        ],
        description:
          'AI can help you plan more thoroughly by identifying steps you might miss, suggesting timelines, and helping you communicate plans clearly.',
      },
      {
        id: 5,
        title: 'AI for Professional Workflows',
        duration: '1 week',
        topics: [
          'Automating repetitive tasks',
          'Data analysis and reporting',
          'Competitive research',
          'Content calendars',
          'Building personal AI systems',
        ],
        description:
          'Combine everything into professional workflows. Learn to identify repetitive tasks, automate them with AI, and build systems that save hours every week.',
      },
    ],
    resources: [
      {
        id: 'ai-w1',
        title: 'OpenAI Academy — Applied AI Foundations',
        description:
          'Move from individual prompts to repeatable workflows. Covers breaking recurring work into steps, deciding where AI helps, and adding review points.',
        url: 'https://academy.openai.com/',
        type: 'docs',
        free: true,
        source: 'OpenAI Academy',
      },
      {
        id: 'ai-w2',
        title: 'Microsoft Learn — Generative AI and Agents',
        description:
          'Covers generative AI, LLMs, prompts, and agents with a knowledge assessment. Good for understanding AI capabilities in professional contexts.',
        url: 'https://learn.microsoft.com/en-us/training/modules/fundamentals-generative-ai/',
        type: 'docs',
        free: true,
        source: 'Microsoft Learn',
      },
      {
        id: 'ai-w3',
        title: 'OpenAI Academy — Getting Started With ChatGPT',
        description:
          'Practical introduction to ChatGPT covering prompting, tools, files, search, image creation, projects and workflows.',
        url: 'https://openai.com/academy/getting-started/',
        type: 'docs',
        free: true,
        source: 'OpenAI',
      },
    ],
    projects: [
      {
        id: 'ai-w-p1',
        title: 'AI Communication Workflow',
        description:
          'Build a system for drafting, editing, and adapting professional communications using AI with consistent quality and appropriate tone.',
        level: 'beginner',
        techTags: ['AI', 'Communication', 'Workflow'],
      },
      {
        id: 'ai-w-p2',
        title: 'AI Document Workflow',
        description:
          'Create a process for analyzing, summarizing, and extracting information from long documents using AI tools.',
        level: 'beginner',
        techTags: ['AI', 'Documents', 'Analysis'],
      },
      {
        id: 'ai-w-p3',
        title: 'AI Workday System',
        description:
          'Design a complete AI-assisted daily work system covering email, documents, planning, research, and task management.',
        level: 'intermediate',
        techTags: ['AI', 'Productivity', 'System Design'],
      },
    ],
    aiGuide: {
      goodFor: [
        'Drafting and editing professional communications',
        'Summarizing long documents quickly',
        'Planning projects and breaking down tasks',
        'Researching new topics efficiently',
        'Automating repetitive office tasks',
      ],
      notFor: [
        'Making final decisions without human review',
        'Handling sensitive confidential information',
        'Replacing critical thinking in analysis',
      ],
      tools: [
        {
          name: 'ChatGPT',
          use: 'General writing, brainstorming, document analysis',
          url: 'https://chat.openai.com',
        },
        {
          name: 'Claude',
          use: 'Long documents, careful analysis, nuanced writing',
          url: 'https://claude.ai',
        },
        {
          name: 'Microsoft Copilot',
          use: 'Integration with Microsoft 365 apps',
          url: 'https://copilot.microsoft.com',
        },
      ],
      samplePrompts: [
        'I need to write a project update email to my manager. Here are the key points: [list]. Make it professional, concise, and highlight the two risks I should flag.',
        'Summarize this 15-page report into 5 bullet points, identify any claims that seem unsupported, and suggest three follow-up questions.',
        'I have a weekly team meeting. Help me create a reusable agenda template that covers: progress updates, blockers, decisions needed, and action items.',
      ],
    },
    careerTip:
      'The professionals who get promoted fastest are not the ones who work the most hours — they are the ones who work on the right things. AI helps you spend less time on routine work and more time on the work that actually matters.',
  },
  {
    id: 'ai-research',
    slug: 'ai-research-verification',
    name: 'AI Research, Search & Verification',
    tagline: 'Use AI for research while learning to verify claims and maintain accuracy.',
    category: 'ai',
    colorHex: '#7C3AED',
    icon: 'Search',
    difficulty: 2,
    difficultyLabel: 'Beginner-Friendly',
    timeEstimate: '3 to 5 weeks',
    techStack: ['Perplexity', 'ChatGPT', 'Claude', 'Google Scholar', 'Web Search'],
    overview: {
      description:
      'AI is transforming research — but AI output is not evidence. This track teaches you how to use AI for research while building the verification habits that keep your work accurate and credible.',
      whatYouCanBuild: [
        'Verified research briefs',
        'Source-comparison workflows',
        'Fact-checking processes',
        'AI-assisted literature reviews',
        'Reliable research systems',
      ],
      jobTitles: [
        'Research Analyst',
        'Content Researcher',
        'Policy Analyst',
        'Market Researcher',
        'Journalist',
      ],
      salaryRange: '$40,000 to $100,000/year',
    },
    roadmap: [
      {
        id: 1,
        title: 'Search vs AI',
        duration: '3 to 5 days',
        topics: [
          'When to use search vs AI',
          'Traditional search strengths',
          'AI search strengths',
          'Combining both approaches',
          'Source quality assessment',
        ],
        description:
          'Search engines and AI assistants solve different problems. Learn when each is appropriate and how to combine them for better research.',
      },
      {
        id: 2,
        title: 'AI-Assisted Research',
        duration: '1 week',
        topics: [
          'Formulating research questions',
          'Using AI for initial exploration',
          'Identifying knowledge gaps',
          'Gathering sources with AI',
          'Organizing research findings',
        ],
        description:
          'AI can accelerate the early stages of research by helping you explore topics, identify key sources, and organize findings efficiently.',
      },
      {
        id: 3,
        title: 'Sources & Evidence',
        duration: '1 week',
        topics: [
          'Primary vs secondary sources',
          'Source credibility assessment',
          'Cross-referencing claims',
          'Identifying bias',
          'When sources disagree',
        ],
        description:
          'Good research requires good sources. Learn to evaluate source quality, identify bias, and handle conflicting information.',
      },
      {
        id: 4,
        title: 'Verification & Fact Checking',
        duration: '1 week',
        topics: [
          'Verifying AI-generated claims',
          'Checking statistics and numbers',
          'Confirming quotes and attributions',
          'Using authoritative sources',
          'Building verification habits',
        ],
        description:
          'AI confidently states things that are wrong. Learn systematic verification techniques to catch errors before they become problems.',
      },
      {
        id: 5,
        title: 'Research Workflows',
        duration: '1 week',
        topics: [
          'End-to-end research process',
          'AI + human verification loop',
          'Synthesizing findings',
          'Writing research briefs',
          'Presenting evidence',
        ],
        description:
          'Combine everything into a reliable research workflow. From question to verified brief, build a process you can trust.',
      },
    ],
    resources: [
      {
        id: 'ai-r1',
        title: 'OpenAI Academy — AI Foundations',
        description:
          'Covers AI fundamentals including limitations and responsible use. Essential background for understanding why verification matters.',
        url: 'https://openai.com/academy/ai-fundamentals/',
        type: 'docs',
        free: true,
        source: 'OpenAI',
      },
      {
        id: 'ai-r2',
        title: 'Microsoft Learn — Introduction to Generative AI',
        description:
          'Beginner introduction covering model comparison and critical thinking about AI output.',
        url: 'https://learn.microsoft.com/en-us/training/modules/intro-generative-ai-explore-basics/',
        type: 'docs',
        free: true,
        source: 'Microsoft Learn',
      },
    ],
    projects: [
      {
        id: 'ai-r-p1',
        title: 'Verified AI Research Brief',
        description:
          'Formulate a research question, use AI for initial exploration, gather and compare sources, identify unsupported claims, verify important statements, and produce a verified brief.',
        level: 'intermediate',
        techTags: ['AI', 'Research', 'Verification'],
      },
    ],
    aiGuide: {
      goodFor: [
        'Exploring new topics quickly',
        'Finding relevant sources',
        'Summarizing research findings',
        'Identifying gaps in knowledge',
        'Drafting research briefs',
      ],
      notFor: [
        'Relying on AI for factual accuracy without verification',
        'Using AI output as the sole source of evidence',
        'Making important decisions based on unverified AI claims',
      ],
      tools: [
        {
          name: 'Perplexity',
          use: 'AI-powered research with source citations',
          url: 'https://perplexity.ai',
        },
        {
          name: 'ChatGPT',
          use: 'Brainstorming research angles and drafting',
          url: 'https://chat.openai.com',
        },
        {
          name: 'Google Scholar',
          use: 'Academic source verification',
          url: 'https://scholar.google.com',
        },
      ],
      samplePrompts: [
        "A manager asks an AI tool for current market statistics. The answer contains exact numbers but provides no sources. What is the best next step? A) Ask the AI the same question again. B) Add 'be 100% accurate' to the prompt. C) Verify the figures using current authoritative sources. D) Assume the numbers are correct because they are specific.",
        'I need to research the current state of AI regulation in the EU. Help me identify: what to search for, what sources to trust, and what claims I should verify independently.',
        'Compare the strengths and weaknesses of using AI search vs traditional web search for researching a medical topic. When should I prefer one over the other?',
      ],
    },
    careerTip:
      'The ability to verify information is becoming more valuable as AI makes it easier to generate plausible-sounding but incorrect content. Professionals who can distinguish reliable information from confident-sounding noise will be in high demand.',
  },
  {
    id: 'ai-content',
    slug: 'ai-content-creation',
    name: 'AI Content Creation',
    tagline: 'Create better content faster using AI for research, writing, visuals, and production.',
    category: 'ai',
    colorHex: '#7C3AED',
    icon: 'PenTool',
    difficulty: 2,
    difficultyLabel: 'Beginner-Friendly',
    timeEstimate: '4 to 6 weeks',
    techStack: ['ChatGPT', 'Claude', 'Midjourney', 'Canva AI', 'CapCut'],
    overview: {
      description:
      'AI can dramatically accelerate content creation — from research and writing to visuals and repurposing. This track teaches you to use AI as a creative partner while maintaining quality, originality, and your unique voice.',
      whatYouCanBuild: [
        'AI-assisted content strategies',
        'Research-backed written content',
        'Visual content with AI tools',
        'Multi-platform content workflows',
        'Content repurposing systems',
      ],
      jobTitles: [
        'Content Creator',
        'Content Strategist',
        'Marketing Specialist',
        'Social Media Manager',
        'Freelance Writer',
      ],
      salaryRange: '$35,000 to $90,000/year',
    },
    roadmap: [
      {
        id: 1,
        title: 'Content Strategy',
        duration: '1 week',
        topics: [
          'Defining content objectives',
          'Understanding your audience',
          'Content calendar planning',
          'Topic research with AI',
          'Angle and hook development',
        ],
        description:
          'Great content starts with strategy. Learn to use AI for research and planning while keeping human judgment at the center of creative decisions.',
      },
      {
        id: 2,
        title: 'AI-Assisted Research',
        duration: '1 week',
        topics: [
          'Topic exploration',
          'Source gathering',
          'Competitor analysis',
          'Audience insight research',
          'Fact verification',
        ],
        description:
          'Use AI to research topics deeply before writing. Learn to gather sources, analyze competitors, and verify facts efficiently.',
      },
      {
        id: 3,
        title: 'Writing & Scripting',
        duration: '1 week',
        topics: [
          'AI-assisted drafting',
          'Maintaining your voice',
          'Editing with AI',
          'Headlines and hooks',
          'Script writing for video',
        ],
        description:
          'AI can help you draft faster, but the best content still comes from human insight. Learn to use AI as a writing partner without losing your voice.',
      },
      {
        id: 4,
        title: 'AI Visual Creation',
        duration: '1 week',
        topics: [
          'Image generation basics',
          'Visual style development',
          'AI design tools',
          'Creating thumbnails and graphics',
          'Brand consistency',
        ],
        description:
          'AI image generation is powerful but requires taste and judgment. Learn to create visuals that support your content while maintaining quality standards.',
      },
      {
        id: 5,
        title: 'Content Production',
        duration: '1 week',
        topics: [
          'Production workflows',
          'Quality control processes',
          'Publishing optimization',
          'Performance tracking',
          'Iteration based on results',
        ],
        description:
          'Build reliable production workflows that consistently produce quality content. Learn to optimize, track performance, and improve over time.',
      },
      {
        id: 6,
        title: 'Repurposing',
        duration: '1 week',
        topics: [
          'Adapting content for different platforms',
          'Turning articles into videos',
          'Creating social media posts from long content',
          'Audio and podcast adaptation',
          'Multi-format publishing',
        ],
        description:
          'One piece of content can serve many platforms. Learn to efficiently repurpose content across formats while maintaining quality for each audience.',
      },
    ],
    resources: [
      {
        id: 'ai-c1',
        title: 'OpenAI Academy — Applied AI Foundations',
        description:
          'Move from individual prompts to repeatable workflows. Covers breaking recurring work into steps and adding review points.',
        url: 'https://academy.openai.com/',
        type: 'docs',
        free: true,
        source: 'OpenAI Academy',
      },
      {
        id: 'ai-c2',
        title: 'Anthropic — Build With Claude',
        description:
          'Prompt engineering for better outputs. Useful for content creation prompts that need nuance and careful writing.',
        url: 'https://www.anthropic.com/learn/build-with-claude',
        type: 'docs',
        free: true,
        source: 'Anthropic',
      },
    ],
    projects: [
      {
        id: 'ai-c-p1',
        title: 'AI Content Strategy',
        description:
          'Develop a complete content strategy for a specific topic or brand using AI for research, planning, and ideation.',
        level: 'beginner',
        techTags: ['AI', 'Content Strategy', 'Research'],
      },
      {
        id: 'ai-c-p2',
        title: 'AI Script + Content Package',
        description:
          'Create a complete content package: research, outline, draft, edited final version, and a repurposed version for a different platform.',
        level: 'intermediate',
        techTags: ['AI', 'Writing', 'Content Production'],
      },
      {
        id: 'ai-c-p3',
        title: 'Multi-Platform Content Workflow',
        description:
          'Build a workflow that takes one piece of core content and efficiently repurposes it across blog, social media, video script, and newsletter formats.',
        level: 'intermediate',
        techTags: ['AI', 'Repurposing', 'Workflow'],
      },
    ],
    aiGuide: {
      goodFor: [
        'Brainstorming content ideas',
        'Researching topics quickly',
        'Drafting first versions',
        'Editing and improving writing',
        'Creating visual content',
      ],
      notFor: [
        'Publishing AI output without editing',
        'Replacing your unique voice and perspective',
        'Creating content about topics you do not understand',
      ],
      tools: [
        {
          name: 'ChatGPT',
          use: 'Brainstorming, drafting, editing',
          url: 'https://chat.openai.com',
        },
        {
          name: 'Claude',
          use: 'Long-form writing, nuanced content',
          url: 'https://claude.ai',
        },
        {
          name: 'Canva AI',
          use: 'Visual content creation and design',
          url: 'https://canva.com',
        },
      ],
      samplePrompts: [
        'I want to write a blog post about why learning to code matters in 2026. Help me: identify my target audience, brainstorm 5 unique angles, and create an outline that does not sound like every other coding blog post.',
        'Here is my 2000-word article about AI in education. Rewrite the introduction to be more engaging, suggest 3 stronger headlines, and identify any paragraphs that could be tightened.',
        'I have a blog post about productivity tips. Help me repurpose it into: a Twitter thread (8-10 tweets), a LinkedIn post, a short video script, and an email newsletter version.',
      ],
    },
    careerTip:
      'AI makes content creation faster, but it does not make it easier to stand out. The creators who win are the ones who combine AI efficiency with genuine expertise, original thinking, and consistent quality. Use AI for the process, not the perspective.',
  },
  {
    id: 'ai-youtube',
    slug: 'ai-youtube',
    name: 'AI Video & YouTube',
    tagline: 'Create professional YouTube content using AI for research, scripting, production, and growth.',
    category: 'ai',
    colorHex: '#7C3AED',
    icon: 'Youtube',
    difficulty: 3,
    difficultyLabel: 'Medium',
    timeEstimate: '6 to 10 weeks',
    techStack: ['ChatGPT', 'Claude', 'CapCut', 'DaVinci Resolve', 'Canva'],
    overview: {
      description:
      'AI can help with nearly every stage of YouTube content creation — from topic research and scripting to editing and thumbnails. This track teaches sustainable, quality-focused YouTube production using AI tools.',
      whatYouCanBuild: [
        'AI-assisted YouTube videos',
        'Content research workflows',
        'Scripting and narration systems',
        'Thumbnail and packaging strategies',
        'YouTube content production pipelines',
      ],
      jobTitles: [
        'YouTuber',
        'Video Content Creator',
        'Educational Content Producer',
        'Video Marketing Specialist',
        'Social Media Video Creator',
      ],
      salaryRange: '$0 to $100,000+/year',
    },
    roadmap: [
      {
        id: 1,
        title: 'YouTube Fundamentals',
        duration: '1 week',
        topics: ['How YouTube works', 'Content types', 'Audience building', 'Channel strategy', 'Content pillars'],
        description: 'Understand how YouTube works as a platform before using AI to optimize your workflow.',
      },
      {
        id: 2,
        title: 'Topic Research',
        duration: '1 week',
        topics: ['AI-assisted topic discovery', 'Search volume analysis', 'Competition assessment', 'Audience demand signals', 'Content gap identification'],
        description: 'Use AI to find topics people actually search for and that you can create uniquely good content about.',
      },
      {
        id: 3,
        title: 'AI-Assisted Scripting',
        duration: '1 week',
        topics: ['Script structures', 'Hook writing', 'AI for outlines', 'AI for drafts', 'Editing your script'],
        description: 'AI can help you write scripts faster, but the best scripts come from understanding your audience and topic deeply.',
      },
      {
        id: 4,
        title: 'AI Voice & Audio',
        duration: '1 week',
        topics: ['Voice recording basics', 'AI audio tools', 'Narration techniques', 'Sound design', 'Audio quality'],
        description: 'Learn about AI voice tools and when to use them versus recording your own narration.',
      },
      {
        id: 5,
        title: 'AI Visual Production',
        duration: '1 week',
        topics: ['B-roll sourcing', 'AI image generation for video', 'Screen recording', 'Visual storytelling', 'Stock footage'],
        description: 'Use AI to source and create visual elements that make your videos more engaging.',
      },
      {
        id: 6,
        title: 'Editing',
        duration: '1 week',
        topics: ['Editing workflow', 'AI-assisted editing', 'Pacing and rhythm', 'Transitions', 'Color and audio'],
        description: 'Learn efficient editing workflows that combine AI tools with human creative judgment.',
      },
      {
        id: 7,
        title: 'Thumbnails & Packaging',
        duration: '1 week',
        topics: ['Thumbnail design principles', 'AI for thumbnail concepts', 'Title optimization', 'A/B testing', 'Click-through optimization'],
        description: 'Thumbnails and titles determine whether anyone watches. Learn to create packaging that earns clicks honestly.',
      },
      {
        id: 8,
        title: 'Publishing',
        duration: '3 to 5 days',
        topics: ['Upload optimization', 'Descriptions and tags', 'Scheduling', 'Cross-platform promotion', 'Community engagement'],
        description: 'Optimize your publishing workflow to maximize reach without spamming.',
      },
      {
        id: 9,
        title: 'Analytics',
        duration: '1 week',
        topics: ['YouTube Analytics basics', 'Understanding retention', 'AI for data analysis', 'Content performance patterns', 'Data-driven iteration'],
        description: 'Use AI to analyze your YouTube data and identify patterns that inform better content decisions.',
      },
      {
        id: 10,
        title: 'Responsible Automation',
        duration: '3 to 5 days',
        topics: ['Automation boundaries', 'Quality vs quantity', 'Audience trust', 'Sustainable production', 'Long-term thinking'],
        description: 'Teach the limits of automation. Sustainable YouTube success comes from quality and audience trust, not volume.',
      },
    ],
    resources: [
      {
        id: 'ai-y1',
        title: 'OpenAI Academy — Applied AI Foundations',
        description:
          'Move from individual prompts to repeatable workflows. Useful for building content production systems.',
        url: 'https://academy.openai.com/',
        type: 'docs',
        free: true,
        source: 'OpenAI Academy',
      },
      {
        id: 'ai-y2',
        title: 'Anthropic — Build With Claude',
        description:
          'Prompt engineering for better outputs. Useful for scripting and content prompts.',
        url: 'https://www.anthropic.com/learn/build-with-claude',
        type: 'docs',
        free: true,
        source: 'Anthropic',
      },
    ],
    projects: [
      {
        id: 'ai-y-p1',
        title: 'AI-Assisted YouTube Video',
        description:
          'Produce a complete YouTube video using AI for research, scripting, and production. Deliver: audience definition, topic, research, hook, outline, script, visual plan, final video, thumbnail, title, and description.',
        level: 'intermediate',
        techTags: ['AI', 'YouTube', 'Video Production'],
      },
      {
        id: 'ai-y-p2',
        title: 'YouTube Content System',
        description:
          'Design a repeatable YouTube content production system: topic research workflow, scripting template, production pipeline, and publishing checklist.',
        level: 'intermediate',
        techTags: ['AI', 'YouTube', 'System Design'],
      },
    ],
    aiGuide: {
      goodFor: [
        'Researching video topics',
        'Writing scripts and outlines',
        'Creating thumbnails',
        'Analyzing video performance',
        'Repurposing content across platforms',
      ],
      notFor: [
        'Spam automation or mass content farming',
        'Promising monetization or income',
        'Replacing genuine expertise with AI-generated content',
      ],
      tools: [
        {
          name: 'ChatGPT',
          use: 'Scripting, brainstorming, research',
          url: 'https://chat.openai.com',
        },
        {
          name: 'Claude',
          use: 'Long scripts, nuanced content',
          url: 'https://claude.ai',
        },
        {
          name: 'CapCut',
          use: 'Free video editing with AI features',
          url: 'https://capcut.com',
        },
      ],
      samplePrompts: [
        'I want to make a YouTube video about why most people quit learning to code. Help me: identify the target audience, brainstorm 5 unique angles that have not been overdone, and write a hook for the first 10 seconds.',
        'Here is my video script about [topic]. Review it for: pacing issues, unclear sections, weak transitions, and suggest where B-roll or visuals would improve engagement.',
        'I have a 10-minute video about Python automation. Help me repurpose it into: a blog post, 5 tweets, a LinkedIn post, and a short clip concept for TikTok.',
      ],
    },
    careerTip:
      'Do not start a YouTube channel to make money. Start because you have something genuinely useful to teach. The creators who last are the ones who care about the topic, not just the metrics. AI makes production faster — use that speed to focus on quality.',
  },
  {
    id: 'ai-software-development',
    slug: 'ai-software-development',
    name: 'AI-Assisted Software Development',
    tagline: 'Build software faster and better using AI coding tools, agents, and verification practices.',
    category: 'ai',
    colorHex: '#7C3AED',
    icon: 'Code',
    difficulty: 3,
    difficultyLabel: 'Medium',
    timeEstimate: '6 to 10 weeks',
    techStack: ['GitHub Copilot', 'Cursor', 'Claude Code', 'ChatGPT', 'VS Code'],
    overview: {
      description:
      'AI coding tools can dramatically accelerate software development — but only if you understand what they generate and can verify it. This track teaches AI-assisted development with emphasis on code review, testing, and professional practices.',
      whatYouCanBuild: [
        'AI-assisted web applications',
        'Rapid prototyping workflows',
        'AI-powered features',
        'Debugging and testing systems',
        'Professional AI development practices',
      ],
      jobTitles: [
        'AI-Assisted Developer',
        'Full-Stack Developer',
        'Software Engineer',
        'Product Engineer',
        'Technical Founder',
      ],
      salaryRange: '$50,000 to $150,000/year',
    },
    roadmap: [
      {
        id: 1,
        title: 'AI Coding Fundamentals',
        duration: '1 week',
        topics: ['How AI coding tools work', 'Code completion vs generation', 'Context and prompting for code', 'When to use AI for code', 'Limitations of AI coding'],
        description: 'Understand how AI coding tools actually work so you can use them effectively and know their limits.',
      },
      {
        id: 2,
        title: 'Code Generation',
        duration: '1 week',
        topics: ['Generating boilerplate', 'Creating components', 'Writing functions', 'API integration', 'Database schemas'],
        description: 'Learn to use AI for generating code efficiently while understanding exactly what it produces.',
      },
      {
        id: 3,
        title: 'Debugging With AI',
        duration: '1 week',
        topics: ['Error diagnosis', 'Stack trace analysis', 'AI-assisted debugging', 'Root cause analysis', 'Verification after fixes'],
        description: 'AI can help you debug faster, but you still need to understand the root cause and verify the fix.',
      },
      {
        id: 4,
        title: 'AI Coding Tools',
        duration: '1 week',
        topics: ['GitHub Copilot', 'Cursor', 'Claude Code', 'v0.dev', 'Tool selection'],
        description: 'Explore the major AI coding tools and learn when each is most effective for different types of tasks.',
      },
      {
        id: 5,
        title: 'Coding Agents',
        duration: '1 week',
        topics: ['What coding agents are', 'Agent workflows', 'Multi-file changes', 'Scope control', 'Review practices'],
        description: 'AI coding agents can make complex changes across multiple files. Learn to use them safely with proper scope control and review.',
      },
      {
        id: 6,
        title: 'Testing & Verification',
        duration: '1 week',
        topics: ['AI-generated tests', 'Test quality assessment', 'Manual verification', 'Integration testing', 'Code review with AI'],
        description: 'Passing tests do not automatically make code correct. Learn to verify AI-generated code thoroughly.',
      },
      {
        id: 7,
        title: 'Building With AI',
        duration: '1 week',
        topics: ['Full-stack development with AI', 'Rapid prototyping', 'Feature development', 'Architecture decisions', 'Performance considerations'],
        description: 'Combine AI tools into a complete development workflow for building real applications efficiently.',
      },
      {
        id: 8,
        title: 'Professional AI-Assisted Development',
        duration: '1 week',
        topics: ['Team workflows', 'Code standards with AI', 'Documentation', 'Deployment', 'Maintainability'],
        description: 'Professional development with AI requires standards, review processes, and long-term thinking about maintainability.',
      },
    ],
    resources: [
      {
        id: 'ai-s1',
        title: 'GitHub Copilot Documentation',
        description:
          'Official docs for GitHub Copilot. Covers setup, features, and best practices for AI-assisted coding.',
        url: 'https://docs.github.com/en/copilot',
        type: 'docs',
        free: true,
        source: 'GitHub',
      },
      {
        id: 'ai-s2',
        title: 'Anthropic — Build With Claude',
        description:
          'Prompt engineering for code generation, debugging, and development workflows.',
        url: 'https://www.anthropic.com/learn/build-with-claude',
        type: 'docs',
        free: true,
        source: 'Anthropic',
      },
      {
        id: 'ai-s3',
        title: 'Microsoft — Generative AI for Beginners',
        description:
          '18-lesson course covering AI fundamentals useful for understanding the models behind coding tools.',
        url: 'https://learn.microsoft.com/en-us/shows/generative-ai-for-beginners/',
        type: 'video',
        free: true,
        source: 'Microsoft',
      },
    ],
    projects: [
      {
        id: 'ai-s-p1',
        title: 'AI-Assisted Landing Page',
        description:
          'Build a complete landing page using AI coding tools. Define requirements, use AI for planning and implementation, review generated code, debug issues, and deploy.',
        level: 'beginner',
        techTags: ['AI', 'HTML', 'CSS', 'JavaScript'],
      },
      {
        id: 'ai-s-p2',
        title: 'AI-Assisted Web Application',
        description:
          'Build a functional web application with AI assistance. Focus on understanding the generated code, reviewing architecture decisions, and testing thoroughly.',
        level: 'intermediate',
        techTags: ['AI', 'React', 'Node.js', 'Testing'],
      },
      {
        id: 'ai-s-p3',
        title: 'AI-Powered Application',
        description:
          'Build an application that integrates AI capabilities — chat, analysis, generation — using AI coding tools for the development process.',
        level: 'advanced',
        techTags: ['AI', 'Full-Stack', 'AI API', 'Testing'],
      },
    ],
    aiGuide: {
      goodFor: [
        'Generating boilerplate code',
        'Debugging errors quickly',
        'Writing tests',
        'Rapid prototyping',
        'Learning new frameworks',
      ],
      notFor: [
        'Accepting code without understanding it',
        'Security-sensitive code without review',
        'Architecture decisions without consideration',
      ],
      tools: [
        {
          name: 'GitHub Copilot',
          use: 'In-editor code completion and generation',
          url: 'https://github.com/features/copilot',
        },
        {
          name: 'Cursor',
          use: 'Full AI code editor for larger projects',
          url: 'https://cursor.sh',
        },
        {
          name: 'Claude Code',
          use: 'CLI-based AI coding assistant',
          url: 'https://claude.ai',
        },
      ],
      samplePrompts: [
        'An AI coding agent modifies several files and reports that all tests pass. You inspect the diff and notice that it changed authentication logic unrelated to your original task. What should you do? A) Accept the changes because the tests passed. B) Accept the changes because an AI agent knows the codebase. C) Review the changes, revert unrelated modifications, and verify the intended behavior independently. D) Delete the project and start again.',
        'I need to build a user registration form with email validation, password strength checking, and a terms acceptance checkbox. Use React with TypeScript. After generating the code, explain what each part does and identify any security considerations.',
        'Here is a 500-line React component that keeps re-rendering. Use AI to identify the performance issue, explain why it happens, and fix it without breaking the existing functionality.',
      ],
    },
    careerTip:
      'The developers who get hired are not the ones who know the most AI tools — they are the ones who can verify AI output, understand generated code, and build reliable software. AI makes you faster; understanding makes you valuable.',
  },
  {
    id: 'ai-automation',
    slug: 'ai-automation',
    name: 'AI Automation',
    tagline: 'Automate repetitive tasks and build intelligent workflows using AI and APIs.',
    category: 'ai',
    colorHex: '#7C3AED',
    icon: 'Zap',
    difficulty: 3,
    difficultyLabel: 'Medium',
    timeEstimate: '5 to 8 weeks',
    techStack: ['n8n', 'Make', 'Zapier', 'Python', 'APIs'],
    overview: {
      description:
      'AI automation combines the power of AI with workflow automation to eliminate repetitive tasks. Learn to build workflows that classify, extract, route, and process information — with human oversight where it matters.',
      whatYouCanBuild: [
        'AI-powered workflow automations',
        'Data extraction pipelines',
        'Content processing workflows',
        'Notification and routing systems',
        'Business process automation',
      ],
      jobTitles: [
        'Automation Engineer',
        'Operations Engineer',
        'Workflow Designer',
        'No-Code Builder',
        'Business Process Analyst',
      ],
      salaryRange: '$45,000 to $120,000/year',
    },
    roadmap: [
      {
        id: 1,
        title: 'Automation Fundamentals',
        duration: '1 week',
        topics: ['What to automate', 'What not to automate', 'Automation thinking', 'Workflow design', 'Error handling basics'],
        description: 'Not everything should be automated. Learn to identify good automation candidates and design reliable workflows.',
      },
      {
        id: 2,
        title: 'Workflows',
        duration: '1 week',
        topics: ['Workflow design patterns', 'Triggers and actions', 'Conditional logic', 'Error handling', 'Testing workflows'],
        description: 'Learn the fundamental patterns of workflow design — triggers, actions, conditions, and error handling.',
      },
      {
        id: 3,
        title: 'APIs',
        duration: '1 week',
        topics: ['What APIs are', 'REST APIs', 'Authentication', 'Making API calls', 'Reading API responses'],
        description: 'APIs are the backbone of automation. Understand how to connect different services through their APIs.',
      },
      {
        id: 4,
        title: 'Webhooks',
        duration: '1 week',
        topics: ['Webhook concepts', 'Setting up webhooks', 'Receiving data', 'Processing events', 'Webhook security'],
        description: 'Webhooks let services notify your workflows when things happen. Learn to set up and process webhook events.',
      },
      {
        id: 5,
        title: 'AI in Workflows',
        duration: '1 week',
        topics: ['Adding AI to workflows', 'Text classification', 'Information extraction', 'Content generation', 'Decision routing'],
        description: 'Learn to add AI capabilities to your workflows for classification, extraction, generation, and routing.',
      },
      {
        id: 6,
        title: 'Structured Data',
        duration: '1 week',
        topics: ['JSON handling', 'Data transformation', 'CSV processing', 'Database operations', 'Data validation'],
        description: 'Automations work with data. Learn to handle structured data effectively in your workflows.',
      },
      {
        id: 7,
        title: 'Human Approval',
        duration: '3 to 5 days',
        topics: ['When humans need to review', 'Approval workflows', 'Notification systems', 'Escalation paths', 'Audit trails'],
        description: 'Not everything should run automatically. Learn to build human oversight into your automations.',
      },
      {
        id: 8,
        title: 'Reliable Automation',
        duration: '1 week',
        topics: ['Error handling patterns', 'Retry logic', 'Monitoring', 'Logging', 'Maintenance'],
        description: 'Production automations need to be reliable. Learn to build automations that handle errors gracefully.',
      },
    ],
    resources: [
      {
        id: 'ai-a1',
        title: 'OpenAI Academy — Agents & Workflows',
        description:
          'Structured agent and workflow thinking. Covers directing agents, providing context, defining outputs, and setting boundaries.',
        url: 'https://academy.openai.com/',
        type: 'docs',
        free: true,
        source: 'OpenAI Academy',
      },
      {
        id: 'ai-a2',
        title: 'n8n Documentation',
        description:
          'Official docs for n8n, a free and open-source workflow automation tool. Excellent for learning automation concepts.',
        url: 'https://docs.n8n.io',
        type: 'docs',
        free: true,
        source: 'n8n',
      },
      {
        id: 'ai-a3',
        title: 'Make Academy',
        description:
          'Free courses on building automations with Make (formerly Integromat). Good for visual workflow learning.',
        url: 'https://www.make.com/en/academy',
        type: 'docs',
        free: true,
        source: 'Make',
      },
    ],
    projects: [
      {
        id: 'ai-a-p1',
        title: 'AI Workflow Automation',
        description:
          'Build an automation that processes form submissions through AI classification, information extraction, routing, draft response generation, and human review before recording results.',
        level: 'intermediate',
        techTags: ['AI', 'Automation', 'APIs', 'Workflows'],
      },
    ],
    aiGuide: {
      goodFor: [
        'Eliminating repetitive manual tasks',
        'Processing information at scale',
        'Building consistent workflows',
        'Connecting different services',
        'Reducing human error in routine tasks',
      ],
      notFor: [
        'Tasks requiring human judgment and empathy',
        'Critical decisions without oversight',
        'Processes that change frequently',
      ],
      tools: [
        {
          name: 'n8n',
          use: 'Open-source workflow automation',
          url: 'https://n8n.io',
        },
        {
          name: 'Make',
          use: 'Visual workflow automation',
          url: 'https://make.com',
        },
        {
          name: 'Zapier',
          use: 'Simple automation between apps',
          url: 'https://zapier.com',
        },
      ],
      samplePrompts: [
        'I receive 50 customer support emails per day. Help me design a workflow that: classifies emails by urgency and topic, extracts key information, drafts a response, and routes to the right team member for review.',
        'I want to automate my content publishing workflow. When I finish a blog post, it should: generate social media excerpts, create an email newsletter version, schedule posts, and notify my editor. Design this workflow.',
        'What are the three most common mistakes people make when building AI automations, and how do I avoid each one?',
      ],
    },
    careerTip:
      'Automation is not about replacing humans — it is about removing the boring parts so humans can focus on the interesting parts. The best automations are the ones where humans still make the important decisions.',
  },
  {
    id: 'ai-agents',
    slug: 'ai-agents',
    name: 'AI Agents',
    tagline: 'Understand, design, and build AI agents that can plan, use tools, and accomplish goals.',
    category: 'ai',
    colorHex: '#7C3AED',
    icon: 'Bot',
    difficulty: 4,
    difficultyLabel: 'Hard',
    timeEstimate: '6 to 10 weeks',
    techStack: ['LangChain', 'OpenAI API', 'Claude API', 'Python', 'Tool Use'],
    overview: {
      description:
      'AI agents go beyond simple chat — they can plan, use tools, make decisions, and accomplish multi-step goals. This track teaches you to understand, design, and build AI agent systems with appropriate human oversight.',
      whatYouCanBuild: [
        'AI research agents',
        'Tool-using AI systems',
        'Multi-step reasoning workflows',
        'Agent-based applications',
        'Human-in-the-loop agent systems',
      ],
      jobTitles: [
        'AI Engineer',
        'Agent Developer',
        'AI Systems Designer',
        'Automation Engineer',
        'AI Product Developer',
      ],
      salaryRange: '$60,000 to $150,000/year',
    },
    roadmap: [
      {
        id: 1,
        title: 'What AI Agents Are',
        duration: '1 week',
        topics: ['Agent concepts', 'Autonomous vs guided', 'Agent architectures', 'Use cases', 'Limitations'],
        description: 'Understand what AI agents are, how they work, and when they are appropriate versus overkill.',
      },
      {
        id: 2,
        title: 'Agents vs Chatbots',
        duration: '3 to 5 days',
        topics: ['Chatbot limitations', 'Agent capabilities', 'Decision-making', 'Goal-oriented behavior', 'When to use each'],
        description: 'Agents differ from chatbots in fundamental ways. Understand when each approach is appropriate.',
      },
      {
        id: 3,
        title: 'Agents vs Workflows',
        duration: '3 to 5 days',
        topics: ['Deterministic workflows', 'Dynamic agent behavior', 'When agents are better', 'When workflows are better', 'Hybrid approaches'],
        description: 'Not every task needs an agent. Learn when deterministic workflows are better than agent-based approaches.',
      },
      {
        id: 4,
        title: 'Tools',
        duration: '1 week',
        topics: ['Tool definitions', 'Tool selection', 'API integration', 'File operations', 'Web browsing', 'Code execution'],
        description: 'Agents need tools to interact with the world. Learn to define, select, and integrate tools for agent systems.',
      },
      {
        id: 5,
        title: 'Context & Memory',
        duration: '1 week',
        topics: ['Context windows', 'Memory systems', 'Conversation history', 'Long-term memory', 'RAG for agents'],
        description: 'Agents need to remember and use context effectively. Learn about memory systems and context management.',
      },
      {
        id: 6,
        title: 'Planning',
        duration: '1 week',
        topics: ['Task decomposition', 'Plan generation', 'Plan execution', 'Replanning', 'Error recovery'],
        description: 'Agents must plan before acting. Learn task decomposition, plan generation, and adaptive replanning.',
      },
      {
        id: 7,
        title: 'Tool Use',
        duration: '1 week',
        topics: ['Function calling', 'Tool chaining', 'Result interpretation', 'Multi-tool reasoning', 'Tool selection strategies'],
        description: 'Deep dive into how agents use tools — from function calling to multi-tool reasoning chains.',
      },
      {
        id: 8,
        title: 'Human Oversight',
        duration: '3 to 5 days',
        topics: ['Human-in-the-loop', 'Approval workflows', 'Safety boundaries', 'Escalation', 'Monitoring'],
        description: 'Agents should not operate without oversight for important tasks. Learn to build appropriate human checkpoints.',
      },
      {
        id: 9,
        title: 'Reliability',
        duration: '1 week',
        topics: ['Failure modes', 'Retry strategies', 'Fallback behavior', 'Testing agents', 'Production readiness'],
        description: 'Agent systems fail in unpredictable ways. Learn to build reliable agent systems with proper error handling.',
      },
      {
        id: 10,
        title: 'Agent Workflow Design',
        duration: '1 week',
        topics: ['End-to-end agent systems', 'Multi-agent coordination', 'Orchestration patterns', 'Performance optimization', 'Cost management'],
        description: 'Design complete agent systems that coordinate multiple agents, manage resources, and deliver reliable results.',
      },
    ],
    resources: [
      {
        id: 'ai-ag1',
        title: 'OpenAI Academy — Agents & Workflows',
        description:
          'Structured agent and workflow thinking. Covers directing agents, providing context, defining outputs, and setting boundaries.',
        url: 'https://academy.openai.com/',
        type: 'docs',
        free: true,
        source: 'OpenAI Academy',
      },
      {
        id: 'ai-ag2',
        title: 'Anthropic — Build With Claude',
        description:
          'Prompt engineering, tool use, and building with Claude. Covers agentic patterns and evaluation.',
        url: 'https://www.anthropic.com/learn/build-with-claude',
        type: 'docs',
        free: true,
        source: 'Anthropic',
      },
      {
        id: 'ai-ag3',
        title: 'LangChain Documentation',
        description:
          'Build AI-powered applications with LangChain — agents, chains, memory, and tool integration.',
        url: 'https://python.langchain.com/docs/get_started/introduction',
        type: 'docs',
        free: true,
        source: 'LangChain',
      },
    ],
    projects: [
      {
        id: 'ai-ag-p1',
        title: 'AI Research Agent',
        description:
          'Design or build a workflow where an AI agent accepts a research question, uses approved tools, collects evidence, structures findings, cites sources, and returns a bounded output.',
        level: 'advanced',
        techTags: ['AI', 'Agents', 'Tool Use', 'Research'],
      },
    ],
    aiGuide: {
      goodFor: [
        'Automating complex multi-step tasks',
        'Research and information gathering',
        'Building intelligent applications',
        'Creating tool-using AI systems',
        'Developing autonomous workflows',
      ],
      notFor: [
        'Simple tasks that a direct API call handles',
        'Applications requiring perfect reliability',
        'Tasks without appropriate human oversight',
      ],
      tools: [
        {
          name: 'LangChain',
          use: 'Framework for building AI agents and chains',
          url: 'https://langchain.com',
        },
        {
          name: 'OpenAI API',
          use: 'Function calling and agent capabilities',
          url: 'https://platform.openai.com',
        },
        {
          name: 'Claude API',
          use: 'Tool use and agentic workflows',
          url: 'https://console.anthropic.com',
        },
      ],
      samplePrompts: [
        'I want to build a research agent that takes a question, searches the web, reads relevant pages, extracts key information, and produces a structured summary with source citations. Help me design the architecture and tool definitions.',
        'When should I use a simple workflow versus an AI agent for a task? Give me a decision framework with three concrete examples of each.',
        'Design an AI agent workflow for processing customer support tickets: classify urgency, extract key information, draft a response, and route to the appropriate team. Include human approval steps.',
      ],
    },
    careerTip:
      'AI agents are the most exciting and most overhyped area in AI right now. The builders who succeed are the ones who start with simple, reliable systems and add complexity only when needed — not the ones who try to build fully autonomous agents on day one.',
  },
  {
    id: 'ai-engineering',
    slug: 'ai-engineering',
    name: 'AI Data, APIs & Engineering',
    tagline: 'Build AI-powered applications using APIs, embeddings, RAG, and modern AI engineering practices.',
    category: 'ai',
    colorHex: '#7C3AED',
    icon: 'Database',
    difficulty: 4,
    difficultyLabel: 'Hard',
    timeEstimate: '8 to 12 weeks',
    techStack: ['Python', 'OpenAI API', 'Groq', 'Pinecone', 'FastAPI'],
    overview: {
      description:
      'AI engineering is about building applications that use AI models effectively — choosing the right model, managing data, implementing retrieval, and deploying reliably. This track covers the technical foundations of building AI-powered applications.',
      whatYouCanBuild: [
        'AI-powered APIs and services',
        'RAG (Retrieval-Augmented Generation) systems',
        'Document Q&A applications',
        'AI evaluation pipelines',
        'Production AI applications',
      ],
      jobTitles: [
        'AI Engineer',
        'ML Engineer',
        'Backend Developer (AI)',
        'Full-Stack AI Developer',
        'AI Platform Engineer',
      ],
      salaryRange: '$60,000 to $160,000/year',
    },
    roadmap: [
      {
        id: 1,
        title: 'AI APIs',
        duration: '1 week',
        topics: ['API basics', 'OpenAI API', 'Groq API', 'Anthropic API', 'Rate limits and pricing'],
        description: 'Learn to interact with AI models through APIs — the foundation of AI engineering.',
      },
      {
        id: 2,
        title: 'Model Selection',
        duration: '1 week',
        topics: ['Model comparison', 'Capability assessment', 'Cost-performance tradeoffs', 'Latency considerations', 'Task-model matching'],
        description: 'Choose the right model for each task based on capability, cost, speed, and accuracy requirements.',
      },
      {
        id: 3,
        title: 'Structured Outputs',
        duration: '1 week',
        topics: ['JSON mode', 'Function calling', 'Output schemas', 'Validation', 'Error handling'],
        description: 'Get reliable, structured output from AI models for downstream processing.',
      },
      {
        id: 4,
        title: 'Embeddings',
        duration: '1 week',
        topics: ['What embeddings are', 'Text embeddings', 'Similarity search', 'Embedding models', 'Use cases'],
        description: 'Embeddings turn text into numbers that capture meaning. Learn to use them for search, clustering, and retrieval.',
      },
      {
        id: 5,
        title: 'Retrieval',
        duration: '1 week',
        topics: ['Document processing', 'Chunking strategies', 'Metadata handling', 'Retrieval quality', 'Performance optimization'],
        description: 'Effective retrieval is the foundation of RAG. Learn to process documents and retrieve relevant information.',
      },
      {
        id: 6,
        title: 'RAG',
        duration: '1 week',
        topics: ['RAG architecture', 'Index pipeline', 'Query pipeline', 'Context injection', 'Quality evaluation'],
        description: 'Build Retrieval-Augmented Generation systems that combine document retrieval with AI generation.',
      },
      {
        id: 7,
        title: 'Vector Search',
        duration: '1 week',
        topics: ['Vector databases', 'Pinecone', 'Chroma', 'Similarity search', 'Hybrid search'],
        description: 'Vector search enables semantic similarity matching. Learn to implement it for AI applications.',
      },
      {
        id: 8,
        title: 'AI Evaluation',
        duration: '1 week',
        topics: ['Evaluation metrics', 'Testing AI output', 'Quality assessment', 'Benchmarking', 'Continuous evaluation'],
        description: 'How do you know if your AI application is working well? Learn to evaluate AI output systematically.',
      },
      {
        id: 9,
        title: 'Cost & Latency',
        duration: '3 to 5 days',
        topics: ['Token economics', 'Caching strategies', 'Batch processing', 'Model optimization', 'Cost monitoring'],
        description: 'AI APIs cost money per token. Learn to optimize for cost and latency without sacrificing quality.',
      },
      {
        id: 10,
        title: 'Deployment',
        duration: '1 week',
        topics: ['Production readiness', 'API deployment', 'Monitoring', 'Scaling', 'Security'],
        description: 'Deploy AI applications to production with proper monitoring, scaling, and security practices.',
      },
    ],
    resources: [
      {
        id: 'ai-e1',
        title: 'OpenAI API Documentation',
        description:
          'Official docs for the OpenAI API. Covers chat, embeddings, function calling, and more.',
        url: 'https://platform.openai.com/docs',
        type: 'docs',
        free: true,
        source: 'OpenAI',
      },
      {
        id: 'ai-e2',
        title: 'Anthropic — Build With Claude',
        description:
          'Prompt engineering, evaluations, RAG, and building AI applications with Claude.',
        url: 'https://www.anthropic.com/learn/build-with-claude',
        type: 'docs',
        free: true,
        source: 'Anthropic',
      },
      {
        id: 'ai-e3',
        title: 'Groq API Quickstart',
        description:
          'Run LLMs at incredible speed. Free tier available for learning.',
        url: 'https://console.groq.com/docs/quickstart',
        type: 'docs',
        free: true,
        source: 'Groq',
      },
      {
        id: 'ai-e4',
        title: 'LangChain Python Docs',
        description:
          'Build AI-powered apps with LangChain — chains, memory, and retrieval.',
        url: 'https://python.langchain.com/docs/get_started/introduction',
        type: 'docs',
        free: true,
        source: 'LangChain',
      },
    ],
    projects: [
      {
        id: 'ai-e-p1',
        title: 'Build a Small AI Application',
        description:
          'Build a complete AI application — document Q&A, study assistant, research assistant, or support assistant — using free/local options where possible.',
        level: 'advanced',
        techTags: ['AI', 'Python', 'APIs', 'RAG'],
      },
    ],
    aiGuide: {
      goodFor: [
        'Building AI-powered applications',
        'Implementing RAG systems',
        'Choosing and comparing AI models',
        'Optimizing AI application performance',
        'Deploying AI to production',
      ],
      notFor: [
        'Building from scratch without understanding the tools',
        'Ignoring cost and latency in production',
        'Skipping evaluation and testing',
      ],
      tools: [
        {
          name: 'OpenAI API',
          use: 'Chat, embeddings, function calling',
          url: 'https://platform.openai.com',
        },
        {
          name: 'Groq',
          use: 'Fast inference for learning and prototyping',
          url: 'https://groq.com',
        },
        {
          name: 'Pinecone',
          use: 'Vector database for RAG',
          url: 'https://pinecone.io',
        },
      ],
      samplePrompts: [
        'I want to build a document Q&A system. I have 100 PDF documents. Design the architecture: how to process documents, create embeddings, store them, retrieve relevant chunks, and generate answers with citations.',
        'Compare the OpenAI, Anthropic, and Groq APIs for a chat application. Consider: cost, speed, quality, context window, and free tier. Which would you choose for a learning project and why?',
        'My RAG system returns irrelevant documents. The user asks about Python but gets results about Java. What are the most likely causes and how do I fix each one?',
      ],
    },
    careerTip:
      'AI engineering is the fastest-growing area in software. The fundamentals — APIs, data handling, retrieval, evaluation — are more important than any specific framework. Master the concepts and you can adapt to any tool.',
  },
  {
    id: 'ai-design',
    slug: 'ai-design',
    name: 'AI Design & Creative Work',
    tagline: 'Use AI to enhance your design process while maintaining creative judgment and quality.',
    category: 'ai',
    colorHex: '#7C3AED',
    icon: 'Palette',
    difficulty: 2,
    difficultyLabel: 'Beginner-Friendly',
    timeEstimate: '4 to 6 weeks',
    techStack: ['Midjourney', 'DALL-E', 'Figma AI', 'Canva AI', 'Figma'],
    overview: {
      description:
      'AI can accelerate design ideation, visual exploration, and prototyping — but great design still requires human taste, judgment, and understanding of users. This track teaches AI as a design partner, not a design replacement.',
      whatYouCanBuild: [
        'AI-assisted product concepts',
        'Rapid visual exploration',
        'Design system prototyping',
        'Brand identity exploration',
        'UI/UX with AI acceleration',
      ],
      jobTitles: [
        'AI-Enhanced Designer',
        'Product Designer',
        'UI Designer',
        'Creative Director',
        'Brand Designer',
      ],
      salaryRange: '$40,000 to $110,000/year',
    },
    roadmap: [
      {
        id: 1,
        title: 'AI in Design',
        duration: '3 to 5 days',
        topics: ['How AI fits in design', 'AI design tools landscape', 'What AI does well in design', 'What AI cannot do', 'Human design judgment'],
        description: 'Understand where AI helps in the design process and where human judgment remains essential.',
      },
      {
        id: 2,
        title: 'UI Ideation',
        duration: '1 week',
        topics: ['AI for brainstorming layouts', 'Rapid concept generation', 'Style exploration', 'Prompt-driven design', 'Filtering AI output'],
        description: 'Use AI to generate design concepts rapidly, then apply your judgment to filter and refine the best ideas.',
      },
      {
        id: 3,
        title: 'Image Generation',
        duration: '1 week',
        topics: ['AI image tools', 'Prompt crafting for images', 'Style consistency', 'Iteration techniques', 'Quality control'],
        description: 'Learn to generate images effectively with AI tools while maintaining quality and consistency.',
      },
      {
        id: 4,
        title: 'Visual Exploration',
        duration: '1 week',
        topics: ['Mood boards with AI', 'Color palette generation', 'Typography exploration', 'Visual direction', 'Brand identity'],
        description: 'Use AI to explore visual directions quickly, then make informed decisions about brand and style.',
      },
      {
        id: 5,
        title: 'Design Refinement',
        duration: '1 week',
        topics: ['AI-assisted iteration', 'Feedback processing', 'Design system consistency', 'Accessibility considerations', 'Quality standards'],
        description: 'AI can help with iteration, but refinement requires understanding design principles and user needs.',
      },
      {
        id: 6,
        title: 'Prototyping',
        duration: '1 week',
        topics: ['AI for wireframes', 'Rapid prototyping', 'Interactive mockups', 'User testing preparation', 'Design-to-code'],
        description: 'Use AI to move from concept to prototype faster, while maintaining design quality and user focus.',
      },
      {
        id: 7,
        title: 'Brand Consistency',
        duration: '3 to 5 days',
        topics: ['Design systems', 'Brand guidelines', 'AI for maintaining consistency', 'Style guides', 'Cross-platform coherence'],
        description: 'Use AI to help maintain brand consistency across different contexts while preserving design integrity.',
      },
      {
        id: 8,
        title: 'Human Design Judgment',
        duration: '3 to 5 days',
        topics: ['When to override AI', 'User empathy', 'Accessibility', 'Cultural sensitivity', 'Design ethics'],
        description: 'The most important design skill is judgment. Learn when AI suggestions should be accepted, modified, or rejected.',
      },
    ],
    resources: [
      {
        id: 'ai-d1',
        title: 'OpenAI Academy — Applied AI Foundations',
        description:
          'Move from individual prompts to repeatable workflows. Useful for building design workflows with AI.',
        url: 'https://academy.openai.com/',
        type: 'docs',
        free: true,
        source: 'OpenAI Academy',
      },
      {
        id: 'ai-d2',
        title: 'Figma AI Features',
        description:
          'Official Figma documentation on AI-powered design features and workflows.',
        url: 'https://help.figma.com/hc/en-us/categories/360002051613',
        type: 'docs',
        free: true,
        source: 'Figma',
      },
    ],
    projects: [
      {
        id: 'ai-d-p1',
        title: 'AI-Assisted Product Concept',
        description:
          'Design a complete product concept using AI for ideation and exploration: define the problem, identify audience, explore visual directions, generate alternatives, select a direction, refine the design, and explain your design decisions.',
        level: 'intermediate',
        techTags: ['AI', 'Design', 'Prototyping', 'UX'],
      },
    ],
    aiGuide: {
      goodFor: [
        'Rapid visual exploration',
        'Generating design concepts',
        'Creating mood boards and style directions',
        'Accelerating prototyping',
        'Maintaining design system consistency',
      ],
      notFor: [
        'Replacing user research and testing',
        'Making final design decisions without human review',
        'Ignoring accessibility and usability',
      ],
      tools: [
        {
          name: 'Midjourney',
          use: 'AI image generation for concepts and exploration',
          url: 'https://midjourney.com',
        },
        {
          name: 'Figma AI',
          use: 'AI features within Figma for design workflows',
          url: 'https://figma.com',
        },
        {
          name: 'Canva AI',
          use: 'AI-powered design for non-designers',
          url: 'https://canva.com',
        },
      ],
      samplePrompts: [
        'I am designing a mobile app for tracking personal fitness goals. Help me explore 5 different visual directions: minimal, playful, professional, bold, and zen. For each, suggest a color palette, typography style, and key UI patterns.',
        'I have a design for a dashboard. Review it for: visual hierarchy issues, accessibility problems, inconsistent spacing, and opportunities to improve the user flow. Be specific about what to change.',
        'Help me create a brand identity concept for a new AI education platform targeting African learners. Explore: name options, color directions, typography choices, and visual personality traits.',
      ],
    },
    careerTip:
      'AI makes designers faster, but it does not make them better. The designers who thrive are the ones who use AI to explore more ideas in less time, while relying on deep understanding of users, accessibility, and design principles to make the right choices.',
  },
];

export const getAllTracks = () => TRACKS
export const getTrackBySlug = (slug: string) => TRACKS.find(t => t.slug === slug)
export const getTrackById = (id: string) => TRACKS.find(t => t.id === id)
export const getTracksByCategory = (category: TrackCategory) => TRACKS.filter(t => t.category === category)
export const getTrackSlugs = () => TRACKS.map(t => t.slug)

/** Single source of truth for product statistics — derived from the live catalogue. */
export const getProductStats = () => ({
  trackCount: TRACKS.length,
  resourceCount: TRACKS.reduce((n, t) => n + t.resources.length, 0),
  projectCount: TRACKS.reduce((n, t) => n + t.projects.length, 0),
  stageCount: TRACKS.reduce((n, t) => n + t.roadmap.length, 0),
  categoryCount: CATEGORIES.length,
})

export const CATEGORIES = [
  { id: 'build' as TrackCategory, label:'BUILD', description:'Coding, engineering and technical systems', color:'#159A78' },
  { id: 'design' as TrackCategory, label:'DESIGN', description:'Creative and product disciplines', color:'#C26B57' },
  { id: 'analyze' as TrackCategory, label:'ANALYZE', description:'Data, research and analytical disciplines', color:'#6C8FC0' },
  { id: 'grow' as TrackCategory, label:'GROW', description:'Business, communication and professional skills', color:'#C29645' },
  { id: 'ai' as TrackCategory, label:'AI', description:'Artificial intelligence, prompting, automation and AI-powered building', color:'#7C3AED' },
]

