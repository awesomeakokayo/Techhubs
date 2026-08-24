export interface RoadmapEntry {
  id: string
  title: string
  description: string
  roadmapUrl: string
  trackSlug?: string
  trackId?: string
  colorHex: string
  stages: [string, string, string]
}

export const ROADMAPS: RoadmapEntry[] = [
  { id: 'frontend', title: 'Frontend Developer', description: 'HTML, CSS, JavaScript, React, and modern frontend tooling.', roadmapUrl: 'https://roadmap.sh/frontend', trackSlug: 'frontend-development', trackId: 'frontend', colorHex: '#61DAFB', stages: ['HTML & CSS', 'JavaScript', 'React & Frameworks'] },
  { id: 'backend', title: 'Backend Developer', description: 'APIs, databases, authentication, and server-side logic.', roadmapUrl: 'https://roadmap.sh/backend', trackSlug: 'backend-development', trackId: 'backend', colorHex: '#68D391', stages: ['Language Basics', 'REST APIs', 'Databases & Deploy'] },
  { id: 'fullstack', title: 'Full-Stack Developer', description: 'End-to-end product development from UI to database.', roadmapUrl: 'https://roadmap.sh/full-stack', trackSlug: 'full-stack-development', trackId: 'fullstack', colorHex: '#F6AD55', stages: ['Frontend', 'Backend', 'Integration'] },
  { id: 'python', title: 'Python Developer', description: 'Python for APIs, automation, data, and AI integration.', roadmapUrl: 'https://roadmap.sh/python', trackSlug: 'python-development', trackId: 'python', colorHex: '#FFD43B', stages: ['Python Core', 'Frameworks', 'Specialization'] },
  { id: 'react', title: 'React Developer', description: 'Deep dive into React ecosystem and production patterns.', roadmapUrl: 'https://roadmap.sh/react', trackSlug: 'frontend-development', trackId: 'frontend', colorHex: '#61DAFB', stages: ['React Basics', 'Hooks & State', 'Next.js'] },
  { id: 'nodejs', title: 'Node.js Developer', description: 'JavaScript on the server with Express and databases.', roadmapUrl: 'https://roadmap.sh/nodejs', trackSlug: 'backend-development', trackId: 'backend', colorHex: '#68D391', stages: ['Node Basics', 'Express', 'Production'] },
  { id: 'data-analyst', title: 'Data Analyst', description: 'SQL, Python, visualization, and business insights.', roadmapUrl: 'https://roadmap.sh/data-analyst', trackSlug: 'data-analysis', trackId: 'data', colorHex: '#9F7AEA', stages: ['SQL', 'Python & Pandas', 'Dashboards'] },
  { id: 'data-science', title: 'Data Scientist', description: 'Statistics, ML, and model deployment.', roadmapUrl: 'https://roadmap.sh/data-science', trackSlug: 'data-science', trackId: 'datascience', colorHex: '#B794F4', stages: ['Math & Stats', 'ML Models', 'Deployment'] },
  { id: 'devops', title: 'DevOps Engineer', description: 'CI/CD, containers, cloud, and infrastructure.', roadmapUrl: 'https://roadmap.sh/devops', trackSlug: 'devops-engineering', trackId: 'devops', colorHex: '#FC8181', stages: ['Linux & Git', 'Docker', 'Cloud & K8s'] },
  { id: 'qa', title: 'QA Engineer', description: 'Manual testing, automation, and quality systems.', roadmapUrl: 'https://roadmap.sh/qa', trackSlug: 'qa-engineering', trackId: 'qa', colorHex: '#76E4F7', stages: ['Testing Basics', 'Automation', 'CI Integration'] },
  { id: 'cyber', title: 'Cybersecurity', description: 'Networks, ethical hacking, and security operations.', roadmapUrl: 'https://roadmap.sh/cyber-security', trackSlug: 'cybersecurity', trackId: 'cyber', colorHex: '#48BB78', stages: ['Networking', 'Offensive', 'Defensive'] },
  { id: 'uiux', title: 'UI/UX Designer', description: 'Research, wireframes, prototypes, and design systems.', roadmapUrl: 'https://roadmap.sh/ux-design', trackSlug: 'ui-ux-design', trackId: 'uiux', colorHex: '#F687B3', stages: ['UX Research', 'UI Design', 'Prototyping'] },
  { id: 'ai-engineer', title: 'AI Engineer', description: 'LLMs, RAG, agents, and production AI systems.', roadmapUrl: 'https://roadmap.sh/ai-engineer', trackSlug: 'ai-for-work', trackId: 'ai', colorHex: '#00D4AA', stages: ['ML Basics', 'LLMs', 'Production AI'] },
  { id: 'ai-foundations', title: 'AI Foundations', description: 'AI literacy, tool selection, prompting, verification, and repeatable workflows.', roadmapUrl: '/ai', trackSlug: 'ai-foundations', trackId: 'ai-foundations', colorHex: '#00D4AA', stages: ['AI Foundations', 'AI Fluency', 'Reliable Workflows'] },
  { id: 'ai-work', title: 'AI for Work', description: 'Practical AI workflows for communication, documents, planning, and professional productivity.', roadmapUrl: '/ai', trackSlug: 'ai-work', trackId: 'ai-work', colorHex: '#00D4AA', stages: ['Communication', 'Documents & Research', 'Professional Workflows'] },
  { id: 'ai-research', title: 'AI Research & Verification', description: 'Search, evidence, verification, synthesis, and trustworthy AI-assisted research.', roadmapUrl: '/ai', trackSlug: 'ai-research', trackId: 'ai-research', colorHex: '#00D4AA', stages: ['Search & Sources', 'Evidence', 'Verification'] },
  { id: 'ai-content', title: 'AI Content Creation', description: 'Content strategy, research, writing, visual creation, production, and repurposing.', roadmapUrl: '/ai', trackSlug: 'ai-content', trackId: 'ai-content', colorHex: '#00D4AA', stages: ['Strategy', 'Production', 'Repurposing'] },
  { id: 'ai-youtube', title: 'AI YouTube', description: 'AI-assisted YouTube research, scripting, production, packaging, analytics, and responsible automation.', roadmapUrl: '/ai', trackSlug: 'ai-youtube', trackId: 'ai-youtube', colorHex: '#00D4AA', stages: ['Research & Scripting', 'Production', 'Analytics & Iteration'] },
  { id: 'ai-software-development', title: 'AI Software Development', description: 'AI-assisted coding, debugging, testing, agents, and professional software workflows.', roadmapUrl: '/ai', trackSlug: 'ai-software-development', trackId: 'ai-software-development', colorHex: '#00D4AA', stages: ['AI Coding', 'Verification', 'Production Development'] },
  { id: 'ai-automation', title: 'AI Automation', description: 'Workflow design, APIs, validation, human approval, reliability, and maintenance.', roadmapUrl: '/ai', trackSlug: 'ai-automation', trackId: 'ai-automation', colorHex: '#00D4AA', stages: ['Workflow Basics', 'AI Automation', 'Reliable Systems'] },
  { id: 'ai-agents', title: 'AI Agents', description: 'Agent design, tools, context, memory, evaluation, boundaries, and human oversight.', roadmapUrl: '/ai', trackSlug: 'ai-agents', trackId: 'ai-agents', colorHex: '#00D4AA', stages: ['Agent Fundamentals', 'Tool Use', 'Bounded Agents'] },
  { id: 'ai-design', title: 'AI Design', description: 'AI-assisted UI, visual exploration, prototyping, accessibility, and human design judgment.', roadmapUrl: '/ai', trackSlug: 'ai-design', trackId: 'ai-design', colorHex: '#00D4AA', stages: ['AI Design Foundations', 'Exploration', 'Product Design'] },
  { id: 'android', title: 'Android Developer', description: 'Native Android with Kotlin and Jetpack.', roadmapUrl: 'https://roadmap.sh/android', trackSlug: 'mobile-development', trackId: 'mobile', colorHex: '#63B3ED', stages: ['Kotlin', 'Android SDK', 'Publishing'] },
  { id: 'react-native', title: 'React Native', description: 'Cross-platform mobile with React Native.', roadmapUrl: 'https://roadmap.sh/react-native', trackSlug: 'mobile-development', trackId: 'mobile', colorHex: '#63B3ED', stages: ['RN Basics', 'Navigation', 'Deploy'] },
  { id: 'git', title: 'Git & GitHub', description: 'Version control essential for every developer.', roadmapUrl: 'https://roadmap.sh/git-github', colorHex: '#F0A500', stages: ['Git Basics', 'Branching', 'Collaboration'] },
  { id: 'docker', title: 'Docker', description: 'Containers for consistent dev and deployment.', roadmapUrl: 'https://roadmap.sh/docker', trackSlug: 'devops', trackId: 'devops', colorHex: '#FC8181', stages: ['Images', 'Compose', 'Production'] },
]
