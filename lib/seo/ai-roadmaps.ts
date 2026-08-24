import type { CustomRoadmap } from './roadmaps'

const base = (slug: string, title: string, description: string, trackSlug: string, stages: CustomRoadmap['stages'], projects: string[]): CustomRoadmap => ({
  slug,
  title,
  seoTitle: `${title} | TechSkillHub`,
  description,
  openingAnswer: description,
  intro: `${description} Learn the principles, practice them, and build portfolio evidence through the associated TechSkillHub track.`,
  audience: ['Beginners', 'Career switchers', 'Professionals', 'Students'],
  stages,
  projects,
  faqs: [
    { question: 'Is this AI roadmap beginner-friendly?', answer: 'Yes. It starts with the required mental models and progressively introduces applied work, verification, projects, and deeper engineering or creative skills.' },
    { question: 'Do I need to pay for the learning resources?', answer: 'The required external resources selected for the guided pathway are free to access. Some optional industry tools may have paid features, but paid access is not a prerequisite for the learning objectives.' },
  ],
  related: [
    { title: `${title} Track`, href: `/tracks/${trackSlug}`, description: 'Open the full TechSkillHub track, resources, projects and guided path.' },
    { title: 'AI Learning Hub', href: '/ai', description: 'Compare all AI learning pathways.' },
  ],
  publishedTime: '2026-08-24T00:00:00.000Z',
  modifiedTime: '2026-08-24T00:00:00.000Z',
})

export const AI_ROADMAPS: Record<string, CustomRoadmap> = {
  'ai-foundations': base('ai-foundations', 'AI Foundations Roadmap', 'Learn AI fundamentals, tool selection, prompting, reasoning, verification, and repeatable workflows.', 'ai-foundations', [
    { title: 'AI literacy', description: 'Understand what modern AI systems do, where they fail, and how models, tools and agents differ.', topics: ['AI and generative AI', 'Models and products', 'Limitations and hallucinations', 'Responsible use'] },
    { title: 'AI fluency', description: 'Choose tools and write instructions that create useful, reviewable outputs.', topics: ['Tool selection', 'Context and constraints', 'Prompting', 'Evaluation'] },
    { title: 'Reliable AI workflows', description: 'Turn useful AI techniques into repeatable work with review points and measurable quality.', topics: ['Workflow design', 'Verification', 'Failure handling', 'Portfolio project'] },
  ], ['AI Task Triage', 'Personal AI Workbench']),
  'ai-work': base('ai-work', 'AI for Work Roadmap', 'Learn how to apply AI to communication, documents, planning, learning, and responsible workplace workflows.', 'ai-work', [
    { title: 'Everyday work', description: 'Apply AI to communication and document-heavy tasks without losing control of source material and audience.', topics: ['Writing', 'Summaries', 'Documents', 'Review'] },
    { title: 'Planning and learning', description: 'Use AI to plan and learn while checking assumptions, dependencies, and understanding.', topics: ['Planning', 'Feedback', 'Problem solving', 'Verification'] },
    { title: 'Responsible workplace systems', description: 'Design repeatable AI workflows with data boundaries, approval gates, and measurable outcomes.', topics: ['Governance', 'Privacy', 'Human review', 'Workflow metrics'] },
  ], ['AI Workday System']),
  'ai-research': base('ai-research', 'AI Research Roadmap', 'Use AI for discovery and synthesis while keeping evidence, sources, uncertainty, and verification explicit.', 'ai-research', [
    { title: 'Research framing', description: 'Turn broad questions into focused sub-questions and useful search directions.', topics: ['Question design', 'Search terms', 'Hypotheses', 'Scope'] },
    { title: 'Evidence and verification', description: 'Trace important claims to primary or authoritative evidence and reconcile conflicting sources.', topics: ['Source quality', 'Verification', 'Conflicts', 'Citations'] },
    { title: 'Research synthesis', description: 'Produce a transparent brief that shows evidence, reasoning and uncertainty.', topics: ['Evidence maps', 'Research briefs', 'Uncertainty', 'Portfolio project'] },
  ], ['Verified AI Research Brief']),
  'ai-content': base('ai-content', 'AI Content Creation Roadmap', 'Build original content workflows using AI for research, drafting, visual exploration and iteration.', 'ai-content', [
    { title: 'Content strategy', description: 'Define the audience, outcome and distinctive reason for the content to exist.', topics: ['Audience', 'Positioning', 'Angles', 'Editorial briefs'] },
    { title: 'AI-assisted production', description: 'Use AI to research, draft, edit and explore visuals while keeping human editorial ownership.', topics: ['Research', 'Drafting', 'Editing', 'Visuals'] },
    { title: 'Measurement and iteration', description: 'Evaluate content by outcomes and quality rather than volume.', topics: ['Metrics', 'Feedback', 'A/B thinking', 'Portfolio project'] },
  ], ['Original Content Campaign']),
  'ai-youtube': base('ai-youtube', 'AI YouTube Roadmap', 'Learn how to build a sustainable YouTube workflow with AI while protecting originality, accuracy, analytics and platform compliance.', 'ai-youtube', [
    { title: 'Channel strategy and research', description: 'Define audience, niche, content pillars and differentiated topics.', topics: ['Audience', 'Demand', 'Competitor gaps', 'Editorial strategy'] },
    { title: 'Production and packaging', description: 'Create scripts, videos, thumbnails, titles and metadata around a credible viewer promise.', topics: ['Scripting', 'Production', 'Packaging', 'AI disclosure'] },
    { title: 'Analytics and sustainable growth', description: 'Diagnose performance, protect original value, and run focused experiments.', topics: ['CTR', 'Retention', 'Watch time', 'Policy and iteration'] },
  ], ['AI-Assisted YouTube Video', 'YouTube Content System']),
  'ai-software-development': base('ai-software-development', 'AI Software Development Roadmap', 'Learn to plan, code, debug, test, review and ship software with AI assistance and professional engineering controls.', 'ai-software-development', [
    { title: 'AI coding foundations', description: 'Understand generated code and write precise implementation instructions.', topics: ['Code generation', 'Context', 'Requirements', 'Review'] },
    { title: 'Agents and verification', description: 'Use coding agents safely with bounded scope, diff review, testing and debugging.', topics: ['Coding agents', 'Debugging', 'Tests', 'Security'] },
    { title: 'Professional AI development', description: 'Run an engineering workflow that combines AI speed with human ownership and team standards.', topics: ['Architecture', 'Review gates', 'CI/test thinking', 'Portfolio project'] },
  ], ['AI-Assisted Software Audit', 'AI-Assisted Web Application']),
  'ai-automation': base('ai-automation', 'AI Automation Roadmap', 'Design reliable AI workflows with APIs, data contracts, human approval, observability and recovery.', 'ai-automation', [
    { title: 'Workflow foundations', description: 'Choose suitable automation candidates and model predictable process boundaries.', topics: ['Triggers', 'Inputs', 'Outputs', 'Exceptions'] },
    { title: 'AI and APIs', description: 'Integrate AI where probabilistic interpretation helps while deterministic controls handle operations.', topics: ['APIs', 'Webhooks', 'AI placement', 'Schemas'] },
    { title: 'Reliable automation', description: 'Operate workflows with approval gates, logs, retries, alerts and recovery.', topics: ['Human review', 'Observability', 'Recovery', 'Maintenance'] },
  ], ['AI Workflow Automation']),
  'ai-agents': base('ai-agents', 'AI Agents Roadmap', 'Understand and build bounded agents with tools, context, memory, evaluation and human control.', 'ai-agents', [
    { title: 'Agent foundations', description: 'Understand assistants, workflows and agents and choose the simplest suitable architecture.', topics: ['Agents', 'Workflows', 'Tool use', 'Tradeoffs'] },
    { title: 'Agent systems', description: 'Design tools, context, memory, permissions and bounded failure handling.', topics: ['Tool contracts', 'Memory', 'Permissions', 'Recovery'] },
    { title: 'Evaluation and orchestration', description: 'Evaluate agents and justify single-agent or multi-agent designs.', topics: ['Evaluation sets', 'Observability', 'Human approval', 'Coordination'] },
  ], ['AI Research Agent']),
  'ai-engineering': base('ai-engineering', 'AI Engineering Roadmap', 'Build reliable AI applications using model APIs, structured outputs, retrieval, evaluation, cost controls and production safeguards.', 'ai-engineering', [
    { title: 'Model integration', description: 'Integrate models with structured contracts, validation and safe configuration.', topics: ['APIs', 'Structured outputs', 'Model selection', 'Validation'] },
    { title: 'Retrieval and RAG', description: 'Use embeddings, retrieval and context design to connect AI systems to knowledge.', topics: ['Embeddings', 'RAG', 'Chunking', 'Hybrid retrieval'] },
    { title: 'Production AI', description: 'Evaluate and operate AI systems with quality, cost, latency, security and rollback controls.', topics: ['Evaluation', 'Observability', 'Cost', 'Deployment'] },
  ], ['Production RAG Evaluation', 'AI Systems Capstone']),
  'ai-design': base('ai-design', 'AI Design Roadmap', 'Use AI for design exploration, UI concepts and visual work while preserving accessibility, consistency and user-centered judgment.', 'ai-design', [
    { title: 'AI creative exploration', description: 'Generate and compare design directions against user goals and constraints.', topics: ['Ideation', 'Visual directions', 'Constraints', 'Selection'] },
    { title: 'UI and prototype work', description: 'Use AI to accelerate interface exploration and prototype risky interactions.', topics: ['Hierarchy', 'Components', 'Prototypes', 'Usability'] },
    { title: 'Responsible design systems', description: 'Preserve accessibility, consistency, evidence and human judgment when using AI.', topics: ['Accessibility', 'Design systems', 'Evidence', 'Iteration'] },
  ], ['AI-Assisted Product Concept']),
}
