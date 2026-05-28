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
  { id: 'android', title: 'Android Developer', description: 'Native Android with Kotlin and Jetpack.', roadmapUrl: 'https://roadmap.sh/android', trackSlug: 'mobile-development', trackId: 'mobile', colorHex: '#63B3ED', stages: ['Kotlin', 'Android SDK', 'Publishing'] },
  { id: 'react-native', title: 'React Native', description: 'Cross-platform mobile with React Native.', roadmapUrl: 'https://roadmap.sh/react-native', trackSlug: 'mobile-development', trackId: 'mobile', colorHex: '#63B3ED', stages: ['RN Basics', 'Navigation', 'Deploy'] },
  { id: 'git', title: 'Git & GitHub', description: 'Version control essential for every developer.', roadmapUrl: 'https://roadmap.sh/git-github', colorHex: '#F0A500', stages: ['Git Basics', 'Branching', 'Collaboration'] },
  { id: 'docker', title: 'Docker', description: 'Containers for consistent dev and deployment.', roadmapUrl: 'https://roadmap.sh/docker', trackSlug: 'devops', trackId: 'devops', colorHex: '#FC8181', stages: ['Images', 'Compose', 'Production'] },
]
