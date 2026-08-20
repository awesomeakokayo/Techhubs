import { SeoPage } from './content-types'

export const CAREER_CONTENT: Record<string, SeoPage> = {
  'frontend-developer': {
    slug: 'frontend-developer',
    title: 'How to Become a Frontend Developer',
    seoTitle: 'How to Become a Frontend Developer: Skills, Path & Portfolio',
    description:
      'What frontend developers do, the skills they need, what to learn, projects to build and how to break in — with the TechSkillHub roadmap.',
    openingAnswer:
      'A frontend developer builds the visual and interactive layer of websites and applications using HTML, CSS and JavaScript, plus modern frameworks like React. To become one, learn those foundations, master Git, build a portfolio of deployed projects, and practice communicating your work.',
    intro:
      'Frontend development is one of the most accessible entrances into tech because the tools are free, the results are visible and the job market is deep. This career guide covers the role, skills and realistic path to entry.',
    audiences: ['Career switchers', 'Juniors', 'Students', 'Self-taught learners'],
    sections: [
      {
        heading: 'What does the role do?',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Frontend developers turn designs and ideas into working interfaces users can click, scroll and interact with. They work with designers, product managers and backend developers to build responsive, accessible, fast experiences.',
          },
        ],
      },
      {
        heading: 'Skills required',
        blocks: [
          {
            kind: 'list',
            items: [
              'HTML and semantic, accessible markup.',
              'CSS: layout, responsive design, modern techniques.',
              'JavaScript: core language, DOM, asynchronous code.',
              'React and a production framework such as Next.js.',
              'Git and GitHub, plus basic deployment skills.',
              'Basic performance, testing and accessibility awareness.',
            ],
          },
        ],
      },
      {
        heading: 'What to learn and in what order',
        blocks: [
          {
            kind: 'list',
            items: [
              '1. HTML and CSS — build and style static, responsive pages.',
              '2. JavaScript — the interactive foundation.',
              '3. Git — version control for every project.',
              '4. React + Next.js — modern production frameworks.',
              '5. Deployment and publishing your work online.',
              '6. Interview practice and portfolio polish.',
            ],
          },
          {
            kind: 'paragraph',
            text: 'The TechSkillHub Frontend Development roadmap sequences these exactly, with curated free resources at every stage.',
          },
        ],
      },
      {
        heading: 'Projects to build',
        blocks: [
          {
            kind: 'list',
            items: [
              'A responsive landing page.',
              'A to-do app with persistence.',
              'An app that fetches and displays API data (weather, movies).',
              'An e-commerce style product page.',
              'A polished portfolio website that showcases all of the above.',
            ],
          },
        ],
      },
      {
        heading: 'Tools commonly used',
        blocks: [
          {
            kind: 'list',
            items: [
              'Code editor: VS Code.',
              'Browser DevTools for debugging.',
              'Figma for reading designs.',
              'GitHub for version control.',
              'Vercel or Netlify for deployment.',
              'AI assistants for iteration — with real understanding maintained.',
            ],
          },
        ],
      },
      {
        heading: 'Portfolio expectations',
        blocks: [
          {
            kind: 'list',
            items: [
              '3–5 deployed projects with live links and clear write-ups.',
              'A professional personal site.',
              'Consistent, clean code and commit history.',
              'Projects that demonstrate different skills.',
            ],
          },
        ],
      },
      {
        heading: 'How the TechSkillHub roadmap fits in',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Follow the roadmap from HTML foundations through React and deployment, using the curated free resources and building the linked projects along the way. When you finish, you will have the portfolio and fundamentals a junior frontend role expects.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I become a frontend developer without a degree?',
        answer: 'Yes. Frontend hiring is project and portfolio driven. Demonstrable skills and deployed projects carry most junior hiring decisions.',
      },
      {
        question: 'How long does it take?',
        answer: 'Most consistent learners reach entry-level readiness in 8 to 12 months, depending on available hours.',
      },
      {
        question: 'Do I need design skills?',
        answer: 'Not professional design skills, but an eye for spacing, type and polish helps you implement designs well and stand out.',
      },
      {
        question: 'Is React really necessary?',
        answer: 'For the modern job market, yes — React is the most requested frontend framework. A solid JavaScript base makes it learnable.',
      },
    ],
    cta: { label: 'Start the Frontend Roadmap', href: '/roadmaps/frontend-development' },
    related: [
      { title: 'Frontend Developer Roadmap', href: '/roadmaps/frontend-development', description: 'Learn every skill in order.' },
      { title: 'How to Become a Frontend Developer', href: '/guides/how-to-become-a-frontend-developer', description: 'The complete guide from zero to hire.' },
      { title: 'How to Build a Developer Portfolio', href: '/guides/how-to-build-a-developer-portfolio', description: 'Turn projects into proof of skill.' },
      { title: 'Beginner Web Projects', href: '/projects/beginner', description: 'Practice with buildable projects.' },
    ],
    publishedTime: '2026-06-15T00:00:00.000Z',
    modifiedTime: '2026-08-19T00:00:00.000Z',
  },

  'backend-developer': {
    slug: 'backend-developer',
    title: 'How to Become a Backend Developer',
    seoTitle: 'How to Become a Backend Developer: Skills, Path & Projects',
    description:
      'What backend developers do, the skills required, the learning path, tools and how the TechSkillHub backend roadmap gets you there.',
    openingAnswer:
      'A backend developer builds the servers, databases and APIs that power applications. To become one, learn a backend language (Python or Node.js), master SQL and databases, build REST APIs, understand authentication and security, and learn deployment.',
    intro:
      'Backend development is the reliable, logic-driven spine of every application. It rewards systematic thinking and offers stable, well-paid careers — including strong remote and freelance options.',
    audiences: ['Career switchers', 'Junior developers', 'Students', 'Self-taught learners'],
    sections: [
      {
        heading: 'What does the role do?',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Backend developers ensure data is stored securely, APIs respond correctly and applications scale. When a user signs in, searches or saves data, backend code makes it happen.',
          },
        ],
      },
      {
        heading: 'Skills required',
        blocks: [
          {
            kind: 'list',
            items: [
              'A backend language: Python or JavaScript/Node.js.',
              'SQL and database design (PostgreSQL).',
              'Building and designing REST APIs.',
              'Authentication, authorization and basic security.',
              'Deployment, environment variables and logging.',
              'Testing and code review.',
            ],
          },
        ],
      },
      {
        heading: 'What to learn and in what order',
        blocks: [
          {
            kind: 'list',
            items: [
              '1. A backend language — fundamentals first.',
              '2. SQL and databases.',
              '3. REST API design and building.',
              '4. Authentication and security.',
              '5. Deployment and monitoring.',
              '6. Full-stack integration and portfolio projects.',
            ],
          },
        ],
      },
      {
        heading: 'Projects to build',
        blocks: [
          {
            kind: 'list',
            items: [
              'A to-do API with full CRUD.',
              'A URL shortener with a database.',
              'A blog backend with authentication.',
              'An e-commerce cart API.',
              'One complete full-stack application.',
            ],
          },
        ],
      },
      {
        heading: 'Tools commonly used',
        blocks: [
          {
            kind: 'list',
            items: [
              'Language stack: Python (FastAPI/Django) or Node.js (Express).',
              'Database: PostgreSQL.',
              'Prisma or an ORM for database access.',
              'Git and GitHub.',
              'A hosting platform such as Render or Railway.',
              'API testing tools like Postman.',
            ],
          },
        ],
      },
      {
        heading: 'How the TechSkillHub roadmap fits in',
        blocks: [
          {
            kind: 'paragraph',
            text: 'The TechSkillHub Backend Development roadmap walks you from language basics through databases, APIs, security and deployment with curated resources and projects at every stage.',
          },
          {
            kind: 'paragraph',
            text: 'For Python-focused learners, starting with the Python roadmap builds the language foundation the backend track builds on.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Do I need to learn frontend to be a backend developer?',
        answer: 'Not deeply. Understanding how APIs are consumed helps, but most backend roles do not require frontend skills.',
      },
      {
        question: 'Which language should I pick?',
        answer: 'Python is the most accessible and hugely in demand. Node.js is ideal if you already know JavaScript. Both are excellent choices.',
      },
      {
        question: 'How long does it take?',
        answer: 'With consistent practice, most learners reach entry-level readiness in 9 to 12 months.',
      },
      {
        question: 'Is backend harder than frontend?',
        answer: 'Different, not harder. Backend offers less visual feedback, which is why building complete APIs early matters so much.',
      },
    ],
    cta: { label: 'Start the Backend Roadmap', href: '/roadmaps/backend-development' },
    related: [
      { title: 'Backend Developer Roadmap', href: '/roadmaps/backend-development', description: 'APIs, databases and deployment in order.' },
      { title: 'How to Become a Backend Developer', href: '/guides/how-to-become-a-backend-developer', description: 'The complete backend career guide.' },
      { title: 'Python Roadmap for Beginners', href: '/roadmaps/python-development', description: 'Build the language foundation first.' },
      { title: 'Intermediate Projects to Build', href: '/projects/intermediate', description: 'Real projects to prove backend skills.' },
    ],
    publishedTime: '2026-06-16T00:00:00.000Z',
    modifiedTime: '2026-08-19T00:00:00.000Z',
  },

  'full-stack-developer': {
    slug: 'full-stack-developer',
    title: 'How to Become a Full-Stack Developer',
    seoTitle: 'How to Become a Full-Stack Developer: The Complete Path',
    description:
      'Full-stack development explained — frontend, backend, databases and deployment — plus the roadmap that sequences it all.',
    openingAnswer:
      'A full-stack developer builds both the frontend (interfaces) and backend (servers, APIs, databases) of applications. To become one, learn frontend foundations first, then backend, then integrate them into complete applications and deploy them.',
    intro:
      'Full-stack developers are versatile: able to ship a complete feature from database to interface. It is a demanding but deeply rewarding path, and a great fit for independent builders, freelancers and startup-minded developers.',
    audiences: ['Career switchers', 'Aspiring founders', 'Freelancers', 'Juniors'],
    sections: [
      {
        heading: 'What does the role do?',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Full-stack developers work across the entire stack — user interfaces, business logic, databases and deployment. In larger companies they may specialize more; in smaller teams they own complete features end to end.',
          },
        ],
      },
      {
        heading: 'Skills required',
        blocks: [
          {
            kind: 'list',
            items: [
              'Frontend: HTML, CSS, JavaScript, React.',
              'Backend: Node.js or Python, REST APIs.',
              'Databases: SQL and a database like PostgreSQL.',
              'Authentication and basic security.',
              'Git, deployment and environment management.',
              'Debugging across frontend and backend.',
            ],
          },
        ],
      },
      {
        heading: 'What to learn and in what order',
        blocks: [
          {
            kind: 'list',
            items: [
              '1. Frontend foundations — HTML, CSS, JavaScript.',
              '2. React and building interactive UIs.',
              '3. Backend — a language, REST APIs and databases.',
              '4. Authentication and security.',
              '5. Integration — connecting frontend to backend.',
              '6. Deployment of complete applications.',
            ],
          },
        ],
      },
      {
        heading: 'Projects to build',
        blocks: [
          {
            kind: 'list',
            items: [
              'A full-stack to-do app with accounts.',
              'A blog platform with authentication and comments.',
              'An e-commerce store with a cart and database.',
              'A team or project management dashboard.',
              'An AI-powered application with a backend.',
            ],
          },
        ],
      },
      {
        heading: 'Entry-level considerations',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Full-stack roles expect breadth, so demonstrate depth where it counts. Hiring managers want to see at least one area you can go deep on (usually JavaScript), plus working full-stack projects that prove integration skills.',
          },
        ],
      },
      {
        heading: 'How the TechSkillHub roadmap fits in',
        blocks: [
          {
            kind: 'paragraph',
            text: 'The TechSkillHub Full-Stack Development roadmap combines the frontend and backend tracks into a single end-to-end path, so you build complete, deployable applications rather than disjoint skills.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Should I start full-stack or pick one side first?',
        answer: 'Start with the frontend, since visual results keep motivation high and the HTML/CSS/JavaScript foundation serves both sides.',
      },
      {
        question: 'How long does it take to become a full-stack developer?',
        answer: 'Being comfortable across the stack typically takes 12 to 18 months of consistent practice. Full-stack is a breadth game and breadth takes time.',
      },
      {
        question: 'Is full-stack better than specializing?',
        answer: 'Both are valuable. Full-stack suits small teams, freelancing and product work. Deep specialization suits large companies. Many developers start full-stack and deepen one side later.',
      },
      {
        question: 'Do full-stack developers earn more?',
        answer: 'Not automatically — specialization and experience move salaries far more. But versatility opens more opportunities and freelance options.',
      },
    ],
    cta: { label: 'Start the Full-Stack Roadmap', href: '/roadmaps/full-stack-development' },
    related: [
      { title: 'Full-Stack Developer Roadmap', href: '/roadmaps/full-stack-development', description: 'Frontend to backend to deployed apps.' },
      { title: 'How to Learn Web Development', href: '/guides/how-to-learn-web-development', description: 'The complete beginner journey.' },
      { title: 'How to Build a Developer Portfolio', href: '/guides/how-to-build-a-developer-portfolio', description: 'Showcase your full-stack projects.' },
      { title: 'Advanced Projects to Build', href: '/projects/advanced', description: 'Prove full-stack depth with real builds.' },
    ],
    publishedTime: '2026-06-17T00:00:00.000Z',
    modifiedTime: '2026-08-19T00:00:00.000Z',
  },

  'software-engineer': {
    slug: 'software-engineer',
    title: 'How to Become a Software Engineer',
    seoTitle: 'How to Become a Software Engineer: A Realistic Guide',
    description:
      'The software engineering path explained — what the role involves, the skills to build, projects that count and how to break in without a CS degree.',
    openingAnswer:
      'Software engineering is designing, building and maintaining software systems at scale. To become one, master programming fundamentals and data structures, learn to build full applications, practice algorithm problem solving, and develop professional engineering habits like testing, code review and clean architecture.',
    intro:
      'Software engineer is the broadest title in tech — spanning web, mobile, desktop, systems and everything between. This guide focuses on the practical path most self-taught and bootcamp learners follow toward the web-adjacent roles that hire most.',
    audiences: ['Career switchers', 'CS students', 'Self-taught learners', 'Bootcamp grads'],
    sections: [
      {
        heading: 'What does the role do?',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Software engineers design, write, test and maintain software applications and systems. Beyond writing code, the work includes designing architecture, reviewing peers, debugging production issues and collaborating across teams.',
          },
        ],
      },
      {
        heading: 'Skills required',
        blocks: [
          {
            kind: 'list',
            items: [
              'Programming fundamentals and at least one language deeply.',
              'Data structures and algorithms.',
              'Building web applications end to end.',
              'SQL and working with databases.',
              'Git, testing and code review.',
              'Basic system design and architecture thinking.',
              'Debugging and reading production logs.',
            ],
          },
        ],
      },
      {
        heading: 'The learning path',
        blocks: [
          {
            kind: 'steps',
            items: [
              {
                title: 'Master one language stack',
                text: 'JavaScript (full-stack) or Python (backend/data) both open wide doors. Go deep before expanding.',
              },
              {
                title: 'Learn data structures and algorithms',
                text: 'Arrays, hash maps, stacks, queues, trees, graphs and common algorithm patterns. This underpins both interviews and daily engineering.',
              },
              {
                title: 'Build real applications',
                text: 'Complete systems with frontend, backend, database, tests and deployment. Integration is where engineering is really learned.',
              },
              {
                title: 'Practice professional habits',
                text: 'Write tests, do code reviews, document decisions, work in public on GitHub. These habits are what "engineer" means in practice.',
              },
              {
                title: 'Study system design basics',
                text: 'For interviews and real systems: caching, queues, scaling, databases, APIs. Junior-level depth is enough to start.',
              },
            ],
          },
        ],
      },
      {
        heading: 'Projects that demonstrate engineering',
        blocks: [
          {
            kind: 'list',
            items: [
              'A full application with authentication and a database.',
              'An API designed for scale-sensitive use (rate limiting, caching).',
              'A project with a written architecture and test coverage.',
              'An open-source contribution accepted by a real project.',
            ],
          },
        ],
      },
      {
        heading: 'How the TechSkillHub roadmap fits in',
        blocks: [
          {
            kind: 'paragraph',
            text: 'The Frontend, Backend and Full-Stack roadmaps build the application-level skills that software engineering interviews and roles test. They pair each skill with projects that produce portfolio evidence.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Do I need a computer science degree?',
        answer: 'No. A degree helps with some employers and visa situations, but skills, projects and interview performance open most software engineering roles.',
      },
      {
        question: 'How long does it take to become employable?',
        answer: 'For a web-focused engineering role, 12 to 18 months of consistent, project-based practice is a realistic range.',
      },
      {
        question: 'How important are algorithms in interviews?',
        answer: 'Very important for large tech companies, less for product-focused startups. Learn them — they also improve your daily problem solving.',
      },
      {
        question: 'Should I learn multiple programming languages?',
        answer: 'After mastering one, yes. A second language expands opportunities. But depth in one first language is the foundation.',
      },
    ],
    cta: { label: 'Start the Full-Stack Roadmap', href: '/roadmaps/full-stack-development' },
    related: [
      { title: 'Full-Stack Developer Roadmap', href: '/roadmaps/full-stack-development', description: 'The end-to-end engineering path.' },
      { title: 'How to Get Your First Tech Job', href: '/guides/how-to-get-your-first-tech-job', description: 'Turn engineering skills into an offer.' },
      { title: 'Data Structures Practice', href: '/resources/developer-tools', description: 'Tools that support engineering practice.' },
      { title: 'How to Build a Developer Portfolio', href: '/guides/how-to-build-a-developer-portfolio', description: 'Prove your engineering with visible work.' },
    ],
    publishedTime: '2026-06-19T00:00:00.000Z',
    modifiedTime: '2026-08-19T00:00:00.000Z',
  },

  'ai-engineer': {
    slug: 'ai-engineer',
    title: 'How to Become an AI Engineer',
    seoTitle: 'How to Become an AI Engineer: Skills, Path & Projects',
    description:
      'The AI engineer career path — skills required, what to learn, projects to build and how to break into building AI applications.',
    openingAnswer:
      'An AI engineer builds products and systems that use AI — integrating language models, building agents, retrieval systems and evaluating outputs. To become one, learn Python, understand how models work practically, master API integration and prompt/output engineering, and build a portfolio of working AI applications.',
    intro:
      'AI engineering is one of the fastest-growing roles in tech. It sits between "ML scientist" and "software engineer", and rewards practical builders who can ship AI features reliably.',
    audiences: ['Developers', 'Career switchers', 'Data beginners', 'Students'],
    sections: [
      {
        heading: 'What does the role do?',
        blocks: [
          {
            kind: 'paragraph',
            text: 'AI engineers integrate AI into real products: connecting applications to language models, building retrieval-augmented (RAG) systems, creating automated agents, evaluating model outputs and shipping reliable AI features.',
          },
        ],
      },
      {
        heading: 'Skills required',
        blocks: [
          {
            kind: 'list',
            items: [
              'Python and working with data.',
              'Understanding how LLMs work at a practical level.',
              'API integration and building products with AI.',
              'Prompt and output engineering.',
              'RAG, embeddings and working with documents.',
              'Evaluation: measuring whether AI outputs are good.',
              'Software fundamentals: APIs, version control, deployment.',
            ],
          },
        ],
      },
      {
        heading: 'The learning path',
        blocks: [
          {
            kind: 'steps',
            items: [
              {
                title: 'Learn Python and data basics',
                text: 'Python is the AI ecosystem language. Pair fundamentals with reading and cleaning data.',
              },
              {
                title: 'Understand ML and LLM fundamentals',
                text: 'Training, evaluation, tokens, context, hallucination. Enough practical grounding to reason about what models can and cannot do.',
              },
              {
                title: 'Master model integration',
                text: 'Connect to model APIs, handle streaming, build chat and assistant features in real applications.',
              },
              {
                title: 'Build with RAG and agents',
                text: 'Retrieve from your own documents, build multi-step agents with tools, and learn evaluation patterns.',
              },
              {
                title: 'Ship a portfolio of AI products',
                text: 'A document Q&A app, an automation agent, an AI workflow tool. Deployed and documented.',
              },
            ],
          },
        ],
      },
      {
        heading: 'Projects to build',
        blocks: [
          {
            kind: 'list',
            items: [
              'A document-answering assistant using RAG.',
              'An AI writing or research workflow tool.',
              'An automated data-cleaning agent.',
              'A chatbot grounded in real company information.',
              'An AI evaluation harness that scores model outputs.',
            ],
          },
        ],
      },
      {
        heading: 'How the TechSkillHub roadmap fits in',
        blocks: [
          {
            kind: 'paragraph',
            text: 'The TechSkillHub AI roadmap and Python roadmap build the practical foundation — language, data and model integration — with resources that emphasize building over theory.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Do I need a machine learning degree?',
        answer: 'No. Most AI engineering roles are software engineering roles with AI. Practical integration skills and shipped products carry most hiring decisions.',
      },
      {
        question: 'How long does it take?',
        answer: 'With a programming foundation, most learners build employable AI skills in 6 to 12 months of focused practice.',
      },
      {
        question: 'What is the difference between AI engineer and data scientist?',
        answer: 'Data scientists analyse data and build models; AI engineers build products around models. They overlap — practical builders often sit between them.',
      },
      {
        question: 'Is AI engineering a bubble?',
        answer: 'The hype fluctuates, but the underlying pattern — software that uses language models — is durable. Deep fundamentals keep you valuable whatever the trend.',
      },
    ],
    cta: { label: 'Start the AI Roadmap', href: '/roadmaps/ai-for-work' },
    related: [
      { title: 'AI Roadmap for Beginners', href: '/roadmaps/ai-for-work', description: 'Practical AI skills in order.' },
      { title: 'How to Learn AI', href: '/guides/how-to-learn-ai', description: 'Start AI the practical way.' },
      { title: 'How to Learn Python', href: '/guides/how-to-learn-python', description: 'The programming foundation for AI.' },
      { title: 'Advanced Projects to Build', href: '/projects/advanced', description: 'AI-adjacent projects that prove skill.' },
    ],
    publishedTime: '2026-06-21T00:00:00.000Z',
    modifiedTime: '2026-08-19T00:00:00.000Z',
  },
}