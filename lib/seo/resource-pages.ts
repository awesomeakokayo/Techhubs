import { SeoPage } from './content-types'

export interface ResourceHubLink {
  title: string
  url: string
  description: string
  free: boolean
  kind: 'course' | 'docs' | 'practice' | 'tool' | 'community'
}

export interface ResourceHubPage extends SeoPage {
  links: ResourceHubLink[]
}

export const RESOURCE_PAGE_CONTENT: Record<string, ResourceHubPage> = {
  'free-coding-resources': {
    slug: 'free-coding-resources',
    title: 'Free Coding Resources for Beginners',
    seoTitle: 'Free Coding Resources for Beginners (2026)',
    description:
      'A curated list of genuinely free resources for learning to code — courses, documentation, practice tools and communities.',
    openingAnswer:
      'You can learn to code entirely for free. The highest-quality resources — MDN, freeCodeCamp, The Odin Project, JavaScript.info and more — cost nothing and are better than most paid alternatives. This page curates the best of them by goal.',
    intro:
      'Nobody needs to pay to learn fundamentals. This is a curated, working list of free resources TechSkillHub recommends across its roadmaps — proven, relevant and maintained.',
    audiences: ['Complete beginners', 'Students', 'Career switchers', 'Budget-conscious learners'],
    sections: [
      {
        heading: 'How to use this list',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Pick the goal that matches you — web development, Python, or fundamentals — and follow ONE resource deeply before starting another. Combining learning with the TechSkillHub roadmaps keeps you in the right order.',
          },
        ],
      },
      {
        heading: 'Start here if you are brand new',
        blocks: [
          {
            kind: 'list',
            items: [
              'freeCodeCamp — a project-based, completely free full curriculum.',
              'The Odin Project — a rigorous free full-stack path.',
              'CS50 — Harvard’s famous free computer science introduction.',
              'MDN Learn Web Development — the authoritative free reference and tutorial set.',
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I really learn to code 100% free?',
        answer:
          'Yes. The best learning resources for fundamentals — MDN, freeCodeCamp, JavaScript.info — are free and world-class. Paid content mostly adds structure, which TechSkillHub provides free via roadmaps.',
      },
      {
        question: 'Are free resources lower quality?',
        answer:
          'No. Many free resources (MDN, freeCodeCamp, The Odin Project) are widely considered better than paid alternatives for fundamentals.',
      },
      {
        question: 'What is the best free coding website for beginners?',
        answer:
          'freeCodeCamp and The Odin Project are the strongest structured options. MDN is the best reference to pair with anything you follow.',
      },
      {
        question: 'How do free learning resources stay maintained?',
        answer:
          'Community-driven projects like MDN and freeCodeCamp have large contributor bases and update continuously. That is part of why they are reliable.',
      },
    ],
    cta: { label: 'Follow a structured roadmap', href: '/roadmaps' },
    related: [
      { title: 'How to Learn Coding From Scratch', href: '/guides/how-to-learn-coding', description: 'Know what to learn before you pick resources.' },
      { title: 'Free Tech Resources', href: '/resources/free-tech-resources', description: 'Broader free resources beyond coding.' },
      { title: 'Python Roadmap for Beginners', href: '/roadmaps/python-development', description: 'Free Python resources in learning order.' },
      { title: 'Frontend Developer Roadmap', href: '/roadmaps/frontend-development', description: 'Free frontend resources, sequenced.' },
    ],
    links: [
      { title: 'freeCodeCamp', url: 'https://www.freecodecamp.org', description: 'Project-based free curriculum covering web development and Python.', free: true, kind: 'course' },
      { title: 'The Odin Project', url: 'https://www.theodinproject.com', description: 'Rigorous free full-stack path with heavy project work.', free: true, kind: 'course' },
      { title: 'CS50: Introduction to Computer Science', url: 'https://cs50.harvard.edu/x/', description: 'Harvard’s celebrated free intro to programming and CS.', free: true, kind: 'course' },
      { title: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/docs/Learn', description: 'The authoritative free HTML, CSS and JS reference and tutorials.', free: true, kind: 'docs' },
      { title: 'JavaScript.info', url: 'https://javascript.info', description: 'The best free modern JavaScript tutorial and reference.', free: true, kind: 'docs' },
      { title: 'Python.org Beginner Tutorials', url: 'https://docs.python.org/3/tutorial/', description: 'Official free Python tutorial from the language maintainers.', free: true, kind: 'docs' },
      { title: 'Khan Academy — Programming', url: 'https://www.khanacademy.org/computing/computer-programming', description: 'Gentle interactive introduction to programming concepts.', free: true, kind: 'course' },
      { title: 'SoloLearn', url: 'https://www.sololearn.com', description: 'Mobile-friendly lessons and community for many languages.', free: true, kind: 'practice' },
      { title: 'Exercism', url: 'https://exercism.org', description: 'Free coding exercises with mentor feedback.', free: true, kind: 'practice' },
      { title: 'HackerRank', url: 'https://www.hackerrank.com', description: 'Free algorithm and language practice challenges.', free: true, kind: 'practice' },
      { title: 'Codecademy Free Plan', url: 'https://www.codecademy.com', description: 'Interactive lessons; free tier covers fundamentals.', free: true, kind: 'course' },
      { title: 'r/learnprogramming', url: 'https://www.reddit.com/r/learnprogramming/', description: 'Large supportive community for beginner questions.', free: true, kind: 'community' },
    ],
    publishedTime: '2026-06-08T00:00:00.000Z',
    modifiedTime: '2026-08-19T00:00:00.000Z',
  },

  'free-tech-resources': {
    slug: 'free-tech-resources',
    title: 'Free Tech Resources for Independent Learners',
    seoTitle: 'Free Tech Resources for Independent Learners',
    description:
      'Tools and resources for learning tech on your own — docs, practice platforms, communities and design resources that cost nothing.',
    openingAnswer:
      'The best free tech resources combine official documentation, structured practice platforms and active communities. This page curates them across backend, data, design, DevOps and general developer work.',
    intro:
      'Independent learning works when you combine three things: good references (docs), deliberate practice (exercises) and help when stuck (communities). Here is the best of each, free.',
    audiences: ['Self-taught learners', 'Students', 'Junior developers', 'Career switchers'],
    sections: [
      {
        heading: 'References and documentation',
        blocks: [
          {
            kind: 'list',
            items: [
              'MDN Web Docs for HTML, CSS and JavaScript.',
              'Python official documentation and Python tutorial.',
              'React and Next.js official docs.',
              'PostgreSQL docs for database work.',
            ],
          },
        ],
      },
      {
        heading: 'Practice platforms',
        blocks: [
          {
            kind: 'list',
            items: [
              'Exercism for language fundamentals with mentoring.',
              'HackerRank and LeetCode for algorithm practice.',
              'Frontend Mentor for building real interfaces.',
              'CSS Battle and CodinGame for gamified practice.',
            ],
          },
        ],
      },
      {
        heading: 'Communities that help',
        blocks: [
          {
            kind: 'list',
            items: [
              'Stack Overflow for specific technical questions.',
              'r/learnprogramming and r/webdev for learning support.',
              'Discord servers of free programs like The Odin Project.',
              'Local developer communities — search for developer meetups in your city.',
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Do I need to buy tools to learn tech?',
        answer: 'No. Editors like VS Code, platforms like GitHub and hosting like Vercel offer free tiers sufficient for learning and building real projects.',
      },
      {
        question: 'What free tool should a beginner install first?',
        answer: 'VS Code (editor), Git (version control) and a modern browser with developer tools. That is a complete free beginner setup.',
      },
      {
        question: 'Are free practice platforms enough for interview prep?',
        answer: 'Yes — LeetCode and HackerRank free tiers cover most algorithm practice beginners and juniors realistically need.',
      },
    ],
    cta: { label: 'Start a tech roadmap', href: '/roadmaps' },
    related: [
      { title: 'Free Coding Resources for Beginners', href: '/resources/free-coding-resources', description: 'Curated free courses for beginners.' },
      { title: 'Developer Tools', href: '/resources/developer-tools', description: 'Everyday tools every builder needs.' },
      { title: 'African Tech Resources', href: '/resources/african-tech-resources', description: 'Africa-focused free learning opportunities.' },
      { title: 'How to Learn Tech on Your Own', href: '/guides/how-to-learn-coding', description: 'Structure your self-taught journey.' },
    ],
    links: [
      { title: 'MDN Web Docs', url: 'https://developer.mozilla.org', description: 'The definitive free web reference.', free: true, kind: 'docs' },
      { title: 'React Docs', url: 'https://react.dev', description: 'Official modern React documentation and tutorials.', free: true, kind: 'docs' },
      { title: 'Next.js Docs', url: 'https://nextjs.org/docs', description: 'Official Next.js documentation.', free: true, kind: 'docs' },
      { title: 'PostgreSQL Documentation', url: 'https://www.postgresql.org/docs/', description: 'Free, excellent database documentation.', free: true, kind: 'docs' },
      { title: 'Frontend Mentor', url: 'https://www.frontendmentor.io', description: 'Free design challenges for practicing real interfaces.', free: true, kind: 'practice' },
      { title: 'LeetCode', url: 'https://leetcode.com', description: 'Algorithm practice for coding interviews.', free: true, kind: 'practice' },
      { title: 'Exercism', url: 'https://exercism.org', description: 'Track-based exercises with free mentoring.', free: true, kind: 'practice' },
      { title: 'VS Code', url: 'https://code.visualstudio.com', description: 'The most widely used free code editor.', free: true, kind: 'tool' },
      { title: 'GitHub Free', url: 'https://github.com', description: 'Free version control and portfolio hosting.', free: true, kind: 'tool' },
      { title: 'Vercel', url: 'https://vercel.com', description: 'Free hosting for frontend and full-stack projects.', free: true, kind: 'tool' },
      { title: 'Figma Free', url: 'https://figma.com', description: 'Free design tool for reading and making designs.', free: true, kind: 'tool' },
      { title: 'Stack Overflow', url: 'https://stackoverflow.com', description: 'The largest Q&A site for developers.', free: true, kind: 'community' },
    ],
    publishedTime: '2026-06-08T00:00:00.000Z',
    modifiedTime: '2026-08-19T00:00:00.000Z',
  },

  'african-tech-resources': {
    slug: 'african-tech-resources',
    title: 'Free Tech Resources for African Students',
    seoTitle: 'Free Tech Resources for African Students',
    description:
      'Genuinely useful free ways for African learners to start tech — communities, scholarships, data plans, and how to learn without traditional infrastructure.',
    openingAnswer:
      'African learners have strong free options to start tech: global free courses (freeCodeCamp, MDN, The Odin Project) plus local developer communities, campus tech clubs, scholarships and cloud free tiers. Data costs and reliable power can be barriers, so plan around them with offline-capable resources and community-run training.',
    intro:
      'African tech talent is thriving, and most of the global free resources work anywhere. This page focuses on what is genuinely useful for learners on the continent — including local communities and practical realities.',
    audiences: ['African students', 'African graduates', 'Career switchers in Africa', 'Budget learners'],
    sections: [
      {
        heading: 'Start with global free resources',
        blocks: [
          {
            kind: 'paragraph',
            text: 'World-class free resources work from anywhere with internet: freeCodeCamp, The Odin Project, MDN, JavaScript.info and Python tutorial. They require no payment and no course fees.',
          },
        ],
      },
      {
        heading: 'Join local developer communities',
        blocks: [
          {
            kind: 'list',
            items: [
              'GDG (Google Developer Groups) chapters in most major cities.',
              'ForLoop Africa for Pan-African developer community and opportunities.',
              'Codecademy Africa community initiatives.',
              'University tech clubs — many run free trainings and projects.',
              'Local WhatsApp and Discord developer communities.',
            ],
          },
        ],
      },
      {
        heading: 'Scholarships and training programs',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Several organizations run free training programs for African learners. Search for current cohorts of programs like the ALX Software Engineering scholarship, AWS re/Start (available in multiple African countries), Google’s Africa Developer tools, and university-sponsored bootcamps. Always verify current terms before applying.',
          },
        ],
      },
      {
        heading: 'Practical realities: data and power',
        blocks: [
          {
            kind: 'list',
            items: [
              'Download resources on Wi-Fi for offline study (YouTube courses, docs).',
              'Use text-light learning: MDN and documentation pages consume little data.',
              'Phone practice apps can supplement, not replace, a real editor.',
              'Community hubs with power and internet (libraries, hubs, campus labs) help a lot.',
              'Code in the cloud on free tiers to save device resources.',
            ],
          },
        ],
      },
      {
        heading: 'Build a portfolio that travels',
        blocks: [
          {
            kind: 'paragraph',
            text: 'African developers succeed on the global market through demonstrated skill. Ship projects publicly on GitHub, and use the same free portfolio that works everywhere.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I learn to code in Africa for free?',
        answer: 'Yes — all the major global free resources work from anywhere. Local communities and scholarship programs add structure and support.',
      },
      {
        question: 'Which communities should I join first?',
        answer: 'A local GDG chapter, ForLoop Africa, and the community around whichever free course you choose. In-person communities build the relationships that lead to opportunities.',
      },
      {
        question: 'How do I deal with expensive data?',
        answer: 'Download courses on Wi-Fi, prefer text-based resources that use little bandwidth, and study offline where possible. Campus and hub connections help.',
      },
      {
        question: 'Is remote tech work realistic from Africa?',
        answer: 'Yes — many firms hire African developers remotely, especially for skills like React, Python and cloud. A strong public portfolio is the primary requirement.',
      },
    ],
    cta: { label: 'Start a free roadmap', href: '/start' },
    related: [
      { title: 'Free Coding Resources for Beginners', href: '/resources/free-coding-resources', description: 'The best free beginner courses.' },
      { title: 'Free Tech Resources', href: '/resources/free-tech-resources', description: 'Docs, tools and practice platforms.' },
      { title: 'How to Get Your First Tech Job', href: '/guides/how-to-get-your-first-tech-job', description: 'Turn skills into opportunities.' },
      { title: 'How to Build a Developer Portfolio', href: '/guides/how-to-build-a-developer-portfolio', description: 'Portfolios that work globally.' },
    ],
    links: [
      { title: 'freeCodeCamp', url: 'https://www.freecodecamp.org', description: '.org domain confirms it’s free — the online version is fully free.', free: true, kind: 'course' },
      { title: 'ForLoop Africa', url: 'https://forloop.africa', description: 'Pan-African developer community with events and networking.', free: true, kind: 'community' },
      { title: 'Google Developers Groups', url: 'https://developers.google.com/community/gdg', description: 'Find a local GDG chapter near your city.', free: true, kind: 'community' },
      { title: 'The Odin Project', url: 'https://www.theodinproject.com', description: 'Free, rigorous full-stack curriculum — works anywhere.', free: true, kind: 'course' },
      { title: 'MDN Web Docs', url: 'https://developer.mozilla.org', description: 'Low-bandwidth-friendly authoritative reference.', free: true, kind: 'docs' },
      { title: 'MDN Learning Area', url: 'https://developer.mozilla.org/en-US/docs/Learn', description: 'Structured free tutorials for complete beginners.', free: true, kind: 'docs' },
    ],
    publishedTime: '2026-06-09T00:00:00.000Z',
    modifiedTime: '2026-08-19T00:00:00.000Z',
  },

  'developer-tools': {
    slug: 'developer-tools',
    title: 'Developer Tools Every Beginner Should Know',
    seoTitle: 'Developer Tools Every Beginner Should Know',
    description:
      'The essential free tools developers use daily — editors, version control, APIs, databases, deployment and debugging.',
    openingAnswer:
      'Every developer’s daily toolkit is built from a few free tools: a code editor (VS Code), Git and GitHub for version control, the browser DevTools for debugging, a database (PostgreSQL), an API testing tool and a deployment platform (Vercel). This page explains each one and how beginners use them.',
    intro:
      'Tools do not make you a developer — but knowing the standard toolkit makes you employable and productive. Here is the essential free set, in the order you will adopt it.',
    audiences: ['Beginners', 'Junior developers', 'Self-taught learners', 'Career switchers'],
    sections: [
      {
        heading: 'The core set',
        blocks: [
          {
            kind: 'list',
            items: [
              'VS Code — the standard free code editor.',
              'Git + GitHub — version control and collaboration.',
              'Browser DevTools — inspect and debug everything in the browser.',
              'A database — PostgreSQL via Neon or Railway free tiers.',
              'An API testing tool — Postman or the browser.',
              'A deployment platform — Vercel or Netlify.',
            ],
          },
        ],
      },
      {
        heading: 'When to learn each tool',
        blocks: [
          {
            kind: 'steps',
            items: [
              {
                title: 'Editor your first week',
                text: 'Install VS Code, learn extensions, and write your first files in it.',
              },
              {
                title: 'Git within your first month',
                text: 'Learn init, add, commit, push and branches. Use it on every single project from day one.',
              },
              {
                title: 'DevTools as soon as you write JavaScript',
                text: 'The Console, Elements and Network tabs are how you debug for the rest of your career.',
              },
              {
                title: 'Database with your first backend',
                text: 'When you build an API, add PostgreSQL. Learn tables, queries and an ORM like Prisma.',
              },
              {
                title: 'Deployment from your first real project',
                text: 'Push a project live early — the confidence and skill payoff is enormous.',
              },
            ],
          },
        ],
      },
      {
        heading: 'AI tools as accelerators',
        blocks: [
          {
            kind: 'paragraph',
            text: 'AI coding assistants are now part of the standard toolkit. Use them to explain errors, review code and generate boilerplate — never to copy solutions you do not understand. The fundamentals remain the requirement.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Do developer tools cost money?',
        answer: 'The core set is free. VS Code, Git, GitHub free tier, PostgreSQL free tiers and Vercel free tier cover all beginner and most intermediate needs.',
      },
      {
        question: 'Which tool should I learn first?',
        answer: 'A code editor, then Git. Both are used in every single project you will ever build.',
      },
      {
        question: 'Do I need expensive hardware?',
        answer: 'No. Modern web development and cloud free tiers run on modest hardware, including many older laptops.',
      },
      {
        question: 'Are AI coding tools allowed in learning?',
        answer: 'Yes, as a tutor and accelerator. Just ensure you can explain and rebuild the code yourself — that is what interviews will test.',
      },
    ],
    cta: { label: 'Start building with a roadmap', href: '/roadmaps' },
    related: [
      { title: 'Free Tech Resources', href: '/resources/free-tech-resources', description: 'More free tools and references.' },
      { title: 'How to Learn Web Development', href: '/guides/how-to-learn-web-development', description: 'Where each tool fits in your journey.' },
      { title: 'Intermediate Projects to Build', href: '/projects/intermediate', description: 'Use these tools on real projects.' },
      { title: 'How to Build a Developer Portfolio', href: '/guides/how-to-build-a-developer-portfolio', description: 'Present tools-driven work effectively.' },
    ],
    links: [
      { title: 'Visual Studio Code', url: 'https://code.visualstudio.com', description: 'Free, extensible code editor.', free: true, kind: 'tool' },
      { title: 'GitHub', url: 'https://github.com', description: 'Free Git hosting and collaboration.', free: true, kind: 'tool' },
      { title: 'Git Official Docs', url: 'https://git-scm.com/doc', description: 'Reference for version control.', free: true, kind: 'docs' },
      { title: 'PostgreSQL', url: 'https://www.postgresql.org', description: 'The free database developers trust.', free: true, kind: 'tool' },
      { title: 'Neon', url: 'https://neon.tech', description: 'Free serverless PostgreSQL with a generous free tier.', free: true, kind: 'tool' },
      { title: 'Vercel', url: 'https://vercel.com', description: 'Free hosting for modern web applications.', free: true, kind: 'tool' },
      { title: 'Postman', url: 'https://www.postman.com', description: 'Free API testing and documentation.', free: true, kind: 'tool' },
      { title: 'Docker', url: 'https://www.docker.com', description: 'Free containerization for consistent environments.', free: true, kind: 'tool' },
      { title: 'notion.so', url: 'https://www.notion.so', description: 'Notes and project documentation for learners.', free: true, kind: 'tool' },
    ],
    publishedTime: '2026-06-11T00:00:00.000Z',
    modifiedTime: '2026-08-19T00:00:00.000Z',
  },
}