import type { Project, QuizQuestion, Resource } from './tracks'

/**
 * Phase 3A — AI curriculum extensions.
 *
 * These additions deliberately plug into the existing Track / Resource / Project /
 * Quiz / guided-path system. They do not introduce a second learning engine.
 * All listed learning resources are free to access at the time of curation and
 * favour official documentation or established educational publishers.
 */

export const AI_RESOURCE_EXTENSIONS: Record<string, Resource[]> = {
  'ai-foundations': [
    {
      id: 'ai-f8',
      title: 'OpenAI Academy — AI Foundations',
      description: 'Free, self-paced foundation course covering AI, LLMs, prompting, context, output review, and responsible use. Includes hands-on practice.',
      url: 'https://academy.openai.com/public/courses/ai-foundations-juzjs?autoEnroll=true',
      type: 'docs',
      free: true,
      source: 'OpenAI Academy',
    },
    {
      id: 'ai-f9',
      title: 'Microsoft Learn — Introduction to Generative AI',
      description: 'Beginner module covering generative AI, LLMs, model comparison, critical thinking, responsible use, and an assessment.',
      url: 'https://learn.microsoft.com/en-us/training/modules/intro-generative-ai-explore-basics/',
      type: 'docs',
      free: true,
      source: 'Microsoft Learn',
    },
    {
      id: 'ai-f10',
      title: 'Microsoft Learn — Introduction to Generative AI and Agents',
      description: 'A concise introduction to LLMs, prompts, agents, and an applied exercise with a knowledge check.',
      url: 'https://learn.microsoft.com/en-us/training/modules/fundamentals-generative-ai/',
      type: 'docs',
      free: true,
      source: 'Microsoft Learn',
    },
    {
      id: 'ai-f11',
      title: 'AI Foundations — Visual Neural Network Primer',
      description: 'Optional visual foundation for understanding how neural networks learn. Use after the non-technical AI introduction.',
      url: 'https://www.youtube.com/watch?v=aircAruvnKk',
      type: 'video',
      free: true,
      source: '3Blue1Brown',
    },
    {
      id: 'ai-f12',
      title: 'Microsoft — Generative AI for Beginners Full Series',
      description: 'Free 18-part series covering LLMs, model comparison, responsible AI, prompting, RAG, security, agents, and application lifecycle.',
      url: 'https://www.youtube.com/watch?v=k7HaeJs-N-o',
      type: 'video',
      free: true,
      source: 'Microsoft Developer',
    },
  ],
  'ai-work': [
    {
      id: 'ai-w4',
      title: 'OpenAI Academy — Getting Started With ChatGPT',
      description: 'Official practical guide to prompting, files, search, image creation, projects, and repeatable workflows.',
      url: 'https://openai.com/academy/getting-started/',
      type: 'docs',
      free: true,
      source: 'OpenAI Academy',
    },
    {
      id: 'ai-w5',
      title: 'OpenAI Academy — ChatGPT for Work',
      description: 'Practical guidance for applying AI to everyday professional work, with emphasis on reviewable outputs and workflow design.',
      url: 'https://openai.com/academy/using-chatgpt/',
      type: 'docs',
      free: true,
      source: 'OpenAI Academy',
    },
    {
      id: 'ai-w6',
      title: 'Microsoft Learn — Unlock Productivity With Generative AI',
      description: 'Free business-focused module covering productivity use cases, responsible use, security, and workflow adoption.',
      url: 'https://learn.microsoft.com/en-us/training/modules/generative-ai-productivity/',
      type: 'docs',
      free: true,
      source: 'Microsoft Learn',
    },
  ],
  'ai-research': [
    {
      id: 'ai-r3',
      title: 'OpenAI Academy — AI Fundamentals',
      description: 'Understand model limitations, how AI systems work, and why verification matters when using AI output.',
      url: 'https://openai.com/academy/what-is-ai/',
      type: 'docs',
      free: true,
      source: 'OpenAI Academy',
    },
    {
      id: 'ai-r4',
      title: 'Google Scholar',
      description: 'Free academic search engine for locating primary research and checking claims against scholarly sources.',
      url: 'https://scholar.google.com/',
      type: 'tool',
      free: true,
      source: 'Google Scholar',
    },
    {
      id: 'ai-r5',
      title: 'Microsoft Learn — Explore Internet Search and Beyond',
      description: 'Free module for improving search strategy and combining search with modern AI capabilities.',
      url: 'https://learn.microsoft.com/en-us/training/modules/enable-digital-transformation/',
      type: 'docs',
      free: true,
      source: 'Microsoft Learn',
    },
  ],
  'ai-content': [
    {
      id: 'ai-c3',
      title: 'OpenAI Academy — Applied AI Foundations',
      description: 'Learn to turn recurring content tasks into repeatable workflows with explicit review points.',
      url: 'https://academy.openai.com/',
      type: 'docs',
      free: true,
      source: 'OpenAI Academy',
    },
    {
      id: 'ai-c4',
      title: 'Canva Design School',
      description: 'Free design education for composition, visual communication, and content production. Use AI as an accelerator, not a substitute for design judgment.',
      url: 'https://www.canva.com/designschool/',
      type: 'docs',
      free: true,
      source: 'Canva',
    },
    {
      id: 'ai-c5',
      title: 'Microsoft — Generative AI for Beginners Full Series',
      description: 'Free series with practical prompting, responsible AI, image generation, UX, and AI application lifecycle lessons.',
      url: 'https://www.youtube.com/watch?v=k7HaeJs-N-o',
      type: 'video',
      free: true,
      source: 'Microsoft Developer',
    },
  ],
  'ai-youtube': [
    {
      id: 'ai-y3',
      title: 'YouTube Creator Academy — Analytics',
      description: 'Official guidance on impressions, click-through rate, watch time, audience retention, reach, and audience reports.',
      url: 'https://creatoracademy.youtube.com/page/lesson/using-analytics',
      type: 'docs',
      free: true,
      source: 'YouTube',
    },
    {
      id: 'ai-y4',
      title: 'YouTube Monetization Policies',
      description: 'Official monetization policy. Essential reading for AI-assisted creators: original value, reused content, and inauthentic mass-produced content.',
      url: 'https://support.google.com/youtube/answer/1311392',
      type: 'docs',
      free: true,
      source: 'YouTube',
    },
    {
      id: 'ai-y5',
      title: 'YouTube — Disclosing Use of Generative AI',
      description: 'Official requirements for disclosing realistic AI-generated or meaningfully altered content, plus examples that do and do not require disclosure.',
      url: 'https://support.google.com/youtube/answer/14328491',
      type: 'docs',
      free: true,
      source: 'YouTube',
    },
    {
      id: 'ai-y6',
      title: 'Microsoft — Generative AI for Beginners Full Series',
      description: 'Free 18-part production-oriented AI series covering prompting, image generation, UX, security, RAG, and agents.',
      url: 'https://www.youtube.com/watch?v=k7HaeJs-N-o',
      type: 'video',
      free: true,
      source: 'Microsoft Developer',
    },
  ],
  'ai-software-development': [
    {
      id: 'ai-s4',
      title: 'GitHub Copilot Documentation',
      description: 'Official documentation for Copilot features, code generation, review, agentic workflows, and responsible use.',
      url: 'https://docs.github.com/en/copilot',
      type: 'docs',
      free: true,
      source: 'GitHub',
    },
    {
      id: 'ai-s5',
      title: 'OpenAI Academy — Codex',
      description: 'Official guidance for AI-assisted coding tasks and workflows. Focus on delegation, review, and keeping humans responsible for the result.',
      url: 'https://openai.com/academy/codex/',
      type: 'docs',
      free: true,
      source: 'OpenAI Academy',
    },
    {
      id: 'ai-s6',
      title: 'Microsoft — Generative AI for Beginners Full Series',
      description: 'Free series including prompting, application lifecycle, security, function calling, RAG, and agents.',
      url: 'https://www.youtube.com/watch?v=k7HaeJs-N-o',
      type: 'video',
      free: true,
      source: 'Microsoft Developer',
    },
    {
      id: 'ai-s7',
      title: 'Anthropic — Build With Claude',
      description: 'Official API and prompting guidance covering model choice, prompts, tool use, and application development.',
      url: 'https://www.anthropic.com/learn/build-with-claude',
      type: 'docs',
      free: true,
      source: 'Anthropic',
    },
  ],
  'ai-automation': [
    {
      id: 'ai-a4',
      title: 'n8n Documentation',
      description: 'Official documentation for workflow automation, integrations, triggers, nodes, credentials, and production workflows.',
      url: 'https://docs.n8n.io/',
      type: 'docs',
      free: true,
      source: 'n8n',
    },
    {
      id: 'ai-a5',
      title: 'n8n Learning Path',
      description: 'Structured learning resources for building workflows and understanding automation patterns with n8n.',
      url: 'https://docs.n8n.io/courses/',
      type: 'docs',
      free: true,
      source: 'n8n',
    },
    {
      id: 'ai-a6',
      title: 'Microsoft Learn — Introduction to Generative AI and Agents',
      description: 'Free module introducing LLMs, prompts, agents, and applied generative AI concepts that can be embedded in workflows.',
      url: 'https://learn.microsoft.com/en-us/training/modules/fundamentals-generative-ai/',
      type: 'docs',
      free: true,
      source: 'Microsoft Learn',
    },
  ],
  'ai-agents': [
    {
      id: 'ai-ag4',
      title: 'OpenAI Academy — Agents & Workflows',
      description: 'Free practical course on directing agents, providing context, defining outputs, setting boundaries, reviewing drafts, and refining workflows.',
      url: 'https://academy.openai.com/',
      type: 'docs',
      free: true,
      source: 'OpenAI Academy',
    },
    {
      id: 'ai-ag5',
      title: 'Microsoft Learn — Introduction to Generative AI and Agents',
      description: 'Beginner-friendly module explaining LLMs, prompts, agents, and an applied exercise with a knowledge check.',
      url: 'https://learn.microsoft.com/en-us/training/modules/fundamentals-generative-ai/',
      type: 'docs',
      free: true,
      source: 'Microsoft Learn',
    },
    {
      id: 'ai-ag6',
      title: 'Microsoft Learn — Get Started With Generative AI and Agents',
      description: 'Hands-on module covering model selection, agent creation, testing, and calling agents from code.',
      url: 'https://learn.microsoft.com/en-us/training/modules/get-started-with-generative-ai-and-agents/',
      type: 'docs',
      free: true,
      source: 'Microsoft Learn',
    },
    {
      id: 'ai-ag7',
      title: 'Anthropic — Build With Claude',
      description: 'Official guidance for Claude applications, tool use, model selection, prompting, and agentic development.',
      url: 'https://www.anthropic.com/learn/build-with-claude',
      type: 'docs',
      free: true,
      source: 'Anthropic',
    },
  ],
  'ai-engineering': [
    {
      id: 'ai-e5',
      title: 'OpenAI API Documentation',
      description: 'Official API reference for models, structured outputs, tool use, embeddings, and application patterns.',
      url: 'https://platform.openai.com/docs',
      type: 'docs',
      free: true,
      source: 'OpenAI',
    },
    {
      id: 'ai-e6',
      title: 'Anthropic — Build With Claude',
      description: 'Official developer guidance for Claude APIs, prompting, tool use, model selection, and application development.',
      url: 'https://www.anthropic.com/learn/build-with-claude',
      type: 'docs',
      free: true,
      source: 'Anthropic',
    },
    {
      id: 'ai-e7',
      title: 'Microsoft — Generative AI for Beginners Full Series',
      description: 'Free series covering model comparison, prompting, vector databases, RAG, function calling, security, lifecycle, agents, and fine-tuning.',
      url: 'https://www.youtube.com/watch?v=k7HaeJs-N-o',
      type: 'video',
      free: true,
      source: 'Microsoft Developer',
    },
    {
      id: 'ai-e8',
      title: 'LangChain Documentation',
      description: 'Open-source documentation for composing model calls, retrieval, tools, and application workflows.',
      url: 'https://python.langchain.com/docs/get_started/introduction',
      type: 'docs',
      free: true,
      source: 'LangChain',
    },
    {
      id: 'ai-e9',
      title: 'Microsoft Learn — Explore Generative AI',
      description: 'Free module covering generative AI, LLMs, multimodal generation, responsible use, and an applied exercise.',
      url: 'https://learn.microsoft.com/en-us/training/modules/explore-generative-ai/',
      type: 'docs',
      free: true,
      source: 'Microsoft Learn',
    },
  ],
  'ai-design': [
    {
      id: 'ai-d3',
      title: 'Figma Help Center — AI Features',
      description: 'Official Figma guidance for AI-powered design features and workflows.',
      url: 'https://help.figma.com/hc/en-us/categories/360002051613',
      type: 'docs',
      free: true,
      source: 'Figma',
    },
    {
      id: 'ai-d4',
      title: 'Canva Design School',
      description: 'Free design education covering composition and visual communication. Useful for grounding AI-assisted design in fundamentals.',
      url: 'https://www.canva.com/designschool/',
      type: 'docs',
      free: true,
      source: 'Canva',
    },
    {
      id: 'ai-d5',
      title: 'Microsoft — Generative AI for Beginners Full Series',
      description: 'Free series including image generation, UX design for AI applications, and responsible AI.',
      url: 'https://www.youtube.com/watch?v=k7HaeJs-N-o',
      type: 'video',
      free: true,
      source: 'Microsoft Developer',
    },
  ],
}

export const AI_RESOURCE_STAGE_MAP: Record<string, Record<string, number>> = {
  'ai-foundations': { 'ai-f8': 1, 'ai-f9': 1, 'ai-f10': 2, 'ai-f11': 1, 'ai-f12': 3 },
  'ai-work': { 'ai-w4': 1, 'ai-w5': 5, 'ai-w6': 5 },
  'ai-research': { 'ai-r3': 1, 'ai-r4': 3, 'ai-r5': 1 },
  'ai-content': { 'ai-c3': 1, 'ai-c4': 4, 'ai-c5': 3 },
  'ai-youtube': { 'ai-y3': 9, 'ai-y4': 10, 'ai-y5': 10, 'ai-y6': 3 },
  'ai-software-development': { 'ai-s4': 4, 'ai-s5': 5, 'ai-s6': 7, 'ai-s7': 4 },
  'ai-automation': { 'ai-a4': 2, 'ai-a5': 2, 'ai-a6': 5 },
  'ai-agents': { 'ai-ag4': 1, 'ai-ag5': 1, 'ai-ag6': 4, 'ai-ag7': 7 },
  'ai-engineering': { 'ai-e5': 1, 'ai-e6': 1, 'ai-e7': 6, 'ai-e8': 6, 'ai-e9': 2 },
  'ai-design': { 'ai-d3': 2, 'ai-d4': 1, 'ai-d5': 3 },
}

const q = (question: string, options: string[], correctIndex: number, explanation: string): QuizQuestion => ({
  question,
  options,
  correctIndex,
  explanation,
})

/** Applied questions attached to newly added resources. */
export const AI_RESOURCE_QUIZZES: Record<string, QuizQuestion[]> = {
  'ai-f8': [
    q('You ask an AI assistant to draft a report and it produces a polished answer with two claims you cannot verify. What is the best professional response?', ['Publish it because the writing is polished', 'Ask the same question again and use the second answer', 'Verify the important claims against appropriate sources before publishing', 'Remove every claim that you did not already know'], 2, 'Polished language is not evidence. Important claims should be independently verified.'),
    q('You have a recurring task that takes 45 minutes every Friday. What is the strongest first step for turning it into an AI workflow?', ['Ask AI to automate everything immediately', 'Define the task, inputs, desired output, constraints, and review points', 'Buy the most expensive model', 'Create a giant prompt containing every possible instruction'], 1, 'Reliable workflows begin with a clearly defined task and explicit review points.'),
  ],
  'ai-f9': [
    q('Two models can both answer a question, but one is faster and the other handles complex reasoning better. What should determine your choice?', ['Brand popularity only', 'Match model capability, latency, cost, and task requirements', 'Always choose the slower model', 'Always choose the model with the largest context window'], 1, 'Model selection is a task-specific tradeoff among capability, speed, cost, context, and reliability.'),
    q('An AI system gives a confident answer to a high-stakes question. Which behavior best demonstrates critical thinking?', ['Trust the confidence level', 'Ask it to promise accuracy', 'Identify what must be verified and check authoritative evidence', 'Use the answer only because it contains technical vocabulary'], 2, 'High-stakes outputs require appropriate human judgment and evidence.'),
  ],
  'ai-f10': [
    q('Which situation most clearly calls for an agent rather than a single model response?', ['Rewrite one paragraph', 'Summarize a short email', 'Complete a bounded multi-step task using approved tools and intermediate actions', 'Fix a spelling mistake'], 2, 'Agents are useful when a system needs to pursue a goal through multiple actions and tools.'),
    q('A prompt works well in one conversation but poorly in another. What is the most useful thing to inspect first?', ['The font used by the interface', 'The amount and quality of context and instructions provided', 'The user account age', 'Whether the prompt has emojis'], 1, 'Context, instructions, examples, constraints, and input quality strongly affect output.'),
  ],
  'ai-f11': [
    q('Why is a visual understanding of neural networks useful even for a non-ML professional?', ['It lets you train a frontier model from scratch', 'It provides intuition for how modern models learn patterns from data', 'It replaces the need to verify AI output', 'It proves every AI model reasons like a human'], 1, 'Conceptual understanding helps learners form accurate expectations about AI systems.'),
    q('Which conclusion should you NOT draw from learning how neural networks work?', ['Models learn patterns from training data', 'Model behavior depends on data and training', 'Understanding the mechanism guarantees a model will be correct', 'AI systems have limitations'], 2, 'Understanding how models work does not make their outputs automatically correct.'),
  ],
  'ai-f12': [
    q('You need a quick explanation of a concept, not a production AI application. Which part of a long AI course should you prioritize?', ['Every lesson regardless of relevance', 'The fundamentals, prompting, responsible use, and evaluation sections', 'Only the final fine-tuning lesson', 'Only the image-generation lesson'], 1, 'Learning should follow the task. Fundamentals and reliable use come before specialized engineering.'),
    q('A learner wants to build an AI app but cannot explain how they will evaluate its output. What is the strongest next step?', ['Start coding anyway', 'Choose a more expensive model', 'Define success criteria and an evaluation method before scaling the implementation', 'Add more prompts'], 2, 'Professional AI development requires measurable quality criteria and evaluation.'),
  ],
  'ai-w4': [
    q('You receive a 30-page project brief and need an executive summary plus a list of unresolved decisions. What is the best AI workflow?', ['Paste it into AI and publish the first summary', 'Ask AI to summarize, then inspect the source document and verify important decisions and numbers', 'Ask AI to make the summary sound more confident', 'Skip the original document once AI has read it'], 1, 'AI can accelerate document processing, but the source remains the authority for important claims.'),
    q('Which task is most suitable for a reusable AI workflow?', ['A one-time personal decision with no repeated structure', 'A recurring weekly report with stable inputs and review criteria', 'An emergency decision with missing information', 'A confidential task where the tool is not approved'], 1, 'Recurring, structured tasks with stable inputs are strong automation candidates.'),
  ],
  'ai-w5': [
    q('Your AI assistant drafts a customer email containing an incorrect refund promise. What should happen before sending it?', ['Send it because AI wrote it', 'Ask AI to make it more persuasive', 'Check the policy/source of truth and correct the promise', 'Delete the entire email workflow'], 2, 'Professional communication requires checking claims against the actual policy and context.'),
    q('Which is the strongest reason to use a structured output format in recurring work?', ['It makes the prompt longer', 'It makes review and downstream reuse more consistent', 'It guarantees factual accuracy', 'It prevents all hallucinations'], 1, 'Structure improves consistency and reviewability but does not guarantee truth.'),
  ],
  'ai-w6': [
    q('A team wants to adopt AI for customer operations. What should be established before broad rollout?', ['A rule that every task must use AI', 'Approved use cases, data boundaries, review requirements, and success measures', 'A single prompt for every employee', 'A ban on human review'], 1, 'Responsible adoption starts with governance, boundaries, review, and measurable outcomes.'),
    q('Which statement best describes productivity gains from AI?', ['More AI output automatically means more value', 'Value comes from reducing low-value work while preserving quality and judgment', 'AI eliminates the need for expertise', 'The fastest workflow is always the best workflow'], 1, 'Professional productivity is about outcomes, not raw output volume.'),
  ],
  'ai-r3': [
    q('An AI assistant gives you a precise statistic but no source. What should you do before citing it?', ['Ask it to make the statistic more precise', 'Verify it against an authoritative source', 'Assume precision means confidence', 'Cite the AI assistant itself as the source'], 1, 'Specificity is not evidence. Important statistics should be checked against appropriate primary or authoritative sources.'),
    q('Why can an AI answer sound authoritative while still being wrong?', ['AI only generates random words', 'Language fluency and factual accuracy are different properties', 'AI cannot produce complete sentences', 'Search engines prevent AI from making mistakes'], 1, 'A model can produce fluent language without having reliable evidence for every claim.'),
  ],
  'ai-r4': [
    q('You need evidence for a claim about a scientific finding. Which source is generally strongest for checking the original evidence?', ['A random social post', 'A primary research paper or authoritative source', 'An AI-generated summary with no citations', 'A forum comment'], 1, 'Primary research and authoritative sources are generally stronger evidence than unsourced summaries.'),
    q('Two credible sources disagree. What is the best research response?', ['Choose whichever agrees with you', 'Hide the disagreement', 'Inspect methodology, dates, definitions, and evidence before deciding how to represent the disagreement', 'Ask an AI which source is correct and stop there'], 2, 'Conflicting evidence requires comparison of methods, context, dates, and underlying evidence.'),
  ],
  'ai-r5': [
    q('Which search strategy is strongest for a current factual question?', ['Use one vague query and accept the first result', 'Use targeted queries, compare sources, and trace important claims to authoritative evidence', 'Avoid primary sources', 'Only ask an AI assistant'], 1, 'Good research combines targeted search, source comparison, and verification.'),
    q('Why should a researcher distinguish discovery from verification?', ['Discovery is faster and verification establishes whether a claim is sufficiently supported', 'They are identical', 'Verification is only needed for academic papers', 'Discovery guarantees correctness'], 0, 'AI and search are excellent for discovering leads; verification determines whether evidence supports a claim.'),
  ],
  'ai-c3': [
    q('A creator wants to publish 20 AI-generated posts with nearly identical structure and little original insight. What is the strongest quality concern?', ['The posts are too short', 'The workflow optimizes volume without adding distinctive value', 'AI cannot write headlines', 'Using a calendar is always wrong'], 1, 'AI-assisted content should add genuine value rather than become interchangeable mass production.'),
    q('Which workflow best preserves human authorship while benefiting from AI?', ['AI writes and publishes without review', 'Human defines angle and evidence, AI assists drafting, human edits and verifies the final work', 'AI chooses the topic, claims, sources, and final wording without review', 'Copy a competitor and ask AI to paraphrase it'], 1, 'The human should own the perspective, evidence, editorial judgment, and final quality.'),
  ],
  'ai-c4': [
    q('AI generates five attractive visual concepts. What should determine which concept becomes the final design direction?', ['Which image looks most impressive in isolation', 'User needs, brand constraints, accessibility, clarity, and the communication goal', 'Which took the longest to generate', 'Which has the most visual effects'], 1, 'Design quality is judged against user and communication goals, not novelty alone.'),
    q('What is a major risk of using AI-generated visuals without a design system?', ['The images may be too small', 'The visual language can become inconsistent across the brand', 'AI cannot generate images', 'It always violates copyright'], 1, 'Without constraints, generated visuals can drift in style and weaken brand consistency.'),
  ],
  'ai-c5': [
    q('A content team wants to use AI-generated images and scripts. Which process is strongest?', ['Generate, publish, repeat', 'Define audience and goal, research, generate, edit, verify, review, publish, measure', 'Only optimize prompts', 'Only use AI for the final copy'], 1, 'Professional content production is a full workflow, not a single generation step.'),
    q('Why should a content creator understand AI limitations before using it at scale?', ['Because AI tools are expensive', 'Because scale amplifies errors, weak sourcing, and repetitive output', 'Because AI cannot write', 'Because every AI tool requires programming'], 1, 'Scaling a flawed workflow scales its errors and quality problems too.'),
  ],
  'ai-y3': [
    q('A video has many impressions but a low click-through rate. Which area should the creator investigate first?', ['Thumbnail/title packaging', 'The channel password', 'The video file name only', 'The upload device'], 0, 'Low CTR with high impressions points toward packaging and audience expectation, while retention is a separate diagnostic.'),
    q('A video has strong click-through but viewers leave early. What does that suggest?', ['The packaging may be creating a promise the opening does not fulfill', 'The thumbnail is definitely perfect', 'The audience is always wrong', 'The video should be made longer'], 0, 'High clicks with weak early retention can indicate a mismatch between the promise and the delivered opening.'),
  ],
  'ai-y4': [
    q('Which AI-assisted YouTube approach creates the clearest monetization risk under current policy?', ['Using AI to brainstorm titles', 'Using AI to improve a script', 'Publishing repetitive mass-produced videos with little original value', 'Using AI for captions'], 2, 'YouTube says repetitive or mass-produced content without meaningful original value can be ineligible for monetization.'),
    q('A creator uses AI to transform research into an original educational video with substantial commentary and editing. What principle matters most?', ['AI use automatically disqualifies monetization', 'The resulting content must still provide original, authentic value and comply with policy', 'All AI content is automatically monetizable', 'Only the narration matters'], 1, 'AI use itself is not the deciding factor; originality, value, and policy compliance matter.'),
  ],
  'ai-y5': [
    q('A creator uses AI to make a realistic video showing a real public figure doing something that never happened. What should the creator do?', ['Publish without disclosure', 'Use YouTube’s AI disclosure setting because the realistic alteration must be disclosed', 'Only disclose if viewers complain', 'Delete the channel'], 1, 'YouTube requires disclosure for realistic AI-generated or meaningfully altered content of this kind.'),
    q('Which use generally does not require the AI disclosure described in YouTube’s policy?', ['A realistic fake event presented as real', 'A realistic fake statement by a public figure', 'Using AI to improve a video outline or title', 'Generating realistic footage of a real place that never occurred'], 2, 'YouTube lists production assistance such as outlines, scripts, thumbnails, and titles among uses that generally do not require that disclosure.'),
  ],
  'ai-y6': [
    q('A creator wants to learn AI video production responsibly. Which sequence is strongest?', ['Automation first, quality later', 'Audience and content fundamentals first, then AI-assisted research, scripting, production, analytics, and policy', 'Only learn prompting', 'Only learn image generation'], 1, 'AI is an accelerator inside a broader content discipline; it does not replace audience, editorial, production, and analytics skills.'),
    q('Why should analytics be part of an AI-assisted content workflow?', ['To make every decision automatically', 'To identify patterns and test whether changes improve outcomes', 'Because AI requires analytics', 'To guarantee viral videos'], 1, 'Analytics supports evidence-based iteration; it cannot guarantee virality.'),
  ],
  'ai-s4': [
    q('An AI coding assistant proposes a database migration that drops a column. What should you do?', ['Accept because the assistant generated it', 'Review the diff, understand the impact, back up or test appropriately, and only then apply it', 'Run it directly in production', 'Ask the assistant to make it shorter'], 1, 'Destructive code requires human review and controlled testing.'),
    q('Which is the strongest use of an AI coding assistant for a learner?', ['Generating code they cannot explain', 'Accelerating implementation while requiring the learner to understand, test, and review the result', 'Replacing source control', 'Skipping documentation'], 1, 'AI should accelerate engineering work without removing understanding and verification.'),
  ],
  'ai-s5': [
    q('An AI coding agent modifies authentication files outside the requested feature. What is the correct response?', ['Accept all changes because tests pass', 'Review the diff, revert unrelated changes, and verify the requested behavior', 'Merge immediately', 'Ignore the changes'], 1, 'Scope control and diff review are essential when agents can modify multiple files.'),
    q('Why is a clear task specification especially important when delegating work to an AI coding agent?', ['Agents only understand one sentence', 'Broader autonomy increases the cost of ambiguity and unintended changes', 'Specifications make code compile', 'It prevents all bugs'], 1, 'The more autonomy a tool has, the more important explicit scope, constraints, acceptance criteria, and review become.'),
  ],
  'ai-s6': [
    q('Which statement best describes professional AI-assisted software development?', ['AI writes most code, so testing matters less', 'AI increases implementation speed, making architecture, review, testing, and maintenance discipline more important', 'AI removes the need for Git', 'AI guarantees secure code'], 1, 'Faster generation increases the importance of engineering controls.'),
    q('A generated feature passes unit tests but fails for an important user scenario. What did the team learn?', ['Tests are useless', 'The test suite did not cover the required behavior sufficiently', 'AI cannot write code', 'The user scenario should be ignored'], 1, 'Tests provide evidence only for what they actually exercise.'),
  ],
  'ai-s7': [
    q('You need to choose an AI model for a production feature. What should you compare?', ['Only the model name', 'Capability, latency, cost, context needs, reliability, and task fit', 'Only benchmark scores', 'Only popularity'], 1, 'Model selection is an engineering tradeoff tied to requirements.'),
    q('Why should application developers study official model documentation?', ['It makes their code longer', 'Model behavior, limits, APIs, and supported features change and should be implemented from authoritative guidance', 'Official docs guarantee outputs are correct', 'Documentation is only for beginners'], 1, 'Official documentation is the primary source for supported behavior and current API contracts.'),
  ],
  'ai-a4': [
    q('A workflow should process incoming support tickets. Where should AI be placed?', ['Every step automatically', 'Only where language understanding adds value, with deterministic logic and human review where appropriate', 'Only at the final notification step', 'Nowhere because automation cannot use AI'], 1, 'AI is most useful for tasks such as classification or extraction while deterministic steps handle predictable operations.'),
    q('Why are explicit error paths important in automation?', ['They make workflows prettier', 'External systems fail, data can be malformed, and AI output can require recovery', 'They guarantee zero failures', 'They replace testing'], 1, 'Reliable automation anticipates failure and defines what happens when a step cannot complete safely.'),
  ],
  'ai-a5': [
    q('A workflow calls three services and the second call fails. What is a production-minded design?', ['Stop without recording anything', 'Define retry, failure notification, logging, and safe recovery behavior', 'Retry forever', 'Hide the error from the user'], 1, 'Production workflows need bounded retries, observability, and safe recovery.'),
    q('What should a learner inspect when an automation behaves incorrectly?', ['Only the final output', 'Inputs, trigger data, each transformation, API responses, conditions, and logs', 'Only the AI prompt', 'Only the browser console'], 1, 'Debugging a workflow requires tracing the data and decisions through the entire path.'),
  ],
  'ai-a6': [
    q('When is a deterministic workflow usually preferable to an AI agent?', ['When the steps and decision rules are stable and known in advance', 'Never', 'Only for image generation', 'Only when no APIs exist'], 0, 'Deterministic workflows are easier to test and control when the process is predictable.'),
    q('Why should AI automation include human approval for certain actions?', ['Humans make workflows slower for no reason', 'Some decisions carry consequences that require judgment, accountability, or exception handling', 'AI cannot generate text', 'Approval makes APIs free'], 1, 'Human-in-the-loop controls are appropriate when consequences or ambiguity exceed safe automation boundaries.'),
  ],
  'ai-ag4': [
    q('What is the key difference between a useful agent workflow and a vague autonomous system?', ['The useful workflow defines context, goal, tools, boundaries, outputs, and review', 'The autonomous system uses more tokens', 'The useful workflow has no human involvement', 'The vague system is always more advanced'], 0, 'Good agent design makes the operating boundary explicit.'),
    q('An agent returns a plausible answer but cannot show how it reached the result or what sources it used. What should you improve?', ['Only the UI color', 'Observability, tool traces, source handling, and evaluation criteria', 'The model temperature only', 'The logo'], 1, 'Agent systems need inspectability and evaluation, especially for research or consequential tasks.'),
  ],
  'ai-ag5': [
    q('Which is a sensible reason to use an agent?', ['A simple one-step calculation', 'A bounded multi-step task requiring tools and dynamic decisions', 'Every email rewrite', 'A task with no success criteria'], 1, 'Agents are justified when dynamic multi-step behavior adds value.'),
    q('What should an agent do when it encounters an action outside its authorized scope?', ['Continue anyway', 'Escalate or stop according to its defined boundary', 'Invent permission', 'Hide the action'], 1, 'Boundaries must be enforceable, not merely descriptive.'),
  ],
  'ai-ag6': [
    q('Why should an agent be tested with representative tasks before production use?', ['Agents always behave identically', 'Agent behavior can vary with inputs and tool results, so realistic evaluation is necessary', 'Testing is only for developers', 'Testing makes models smarter'], 1, 'Agentic systems have variable behavior and need scenario-based evaluation.'),
    q('An agent can call a tool that changes customer data. What additional control is most appropriate?', ['Give it unrestricted access', 'Use least privilege and add approval or validation before consequential writes', 'Remove all logs', 'Let it retry forever'], 1, 'Consequential tools should be permissioned narrowly and protected by validation or approval.'),
  ],
  'ai-ag7': [
    q('When comparing agent frameworks or model APIs, what should you prioritize?', ['Marketing claims', 'Supported capabilities, reliability, tool use, evaluation, cost, and maintainability', 'Only GitHub stars', 'Only benchmark screenshots'], 1, 'Professional selection requires evidence against the actual requirements.'),
    q('Why is evaluation important for agent systems?', ['Agents are deterministic', 'You need evidence that the system completes tasks correctly and safely across representative cases', 'Evaluation only improves UI', 'It guarantees zero failures'], 1, 'Evaluation provides evidence about quality, failure modes, and safety.'),
  ],
  'ai-e5': [
    q('Your application expects JSON but the model occasionally returns prose around it. What is the strongest engineering approach?', ['Parse with fragile string slicing only', 'Use supported structured-output/schema mechanisms and validate the result', 'Tell users to fix it manually', 'Ignore the issue'], 1, 'Structured outputs plus validation are more reliable than assuming free-form text will always match a schema.'),
    q('Why should an AI application handle rate limits and transient API errors explicitly?', ['Because APIs never work otherwise', 'External services can throttle or fail temporarily, so resilient applications need bounded retries and fallback behavior', 'Because retries guarantee correctness', 'Because model quality depends on HTTP status codes'], 1, 'Production API integrations must handle transient failures predictably.'),
  ],
  'ai-e6': [
    q('A team compares two models and one is slightly better on quality but 10 times more expensive. What should they do?', ['Always choose the best benchmark', 'Evaluate quality against the business requirement and compare total cost, latency, and failure impact', 'Always choose the cheapest', 'Ignore cost'], 1, 'Model choice is a product and engineering tradeoff, not a single leaderboard decision.'),
    q('Why should AI application prompts be treated as part of the software system?', ['They are decorative text', 'They influence behavior and should be versioned, tested, reviewed, and changed deliberately', 'They never change', 'They replace application code'], 1, 'Prompts can materially affect behavior and should be managed as production artifacts.'),
  ],
  'ai-e7': [
    q('A RAG application retrieves irrelevant documents. What should you inspect first?', ['Only the model temperature', 'Document chunking, metadata, embedding/retrieval quality, query formulation, and evaluation data', 'Only the UI', 'Only the final answer'], 1, 'Retrieval quality depends on the complete ingestion and query pipeline.'),
    q('Why is the RAG pipeline evaluated separately from generation?', ['Because retrieval never matters', 'Because a strong model cannot answer well if the right evidence is not retrieved', 'Because generation is always correct', 'Because vector databases are optional in every system'], 1, 'Retrieval is a separate source of failure and needs its own quality checks.'),
  ],
  'ai-e8': [
    q('When should a vector database be introduced?', ['Whenever an app uses AI', 'When semantic retrieval over a meaningful collection of data is actually required', 'Only for simple chat', 'Only for images'], 1, 'Vector databases solve specific retrieval problems; they should not be added merely because they are fashionable.'),
    q('What is the purpose of embeddings in a semantic search system?', ['They compress images for storage', 'They represent content as vectors so semantic similarity can be measured', 'They guarantee factual accuracy', 'They replace all databases'], 1, 'Embeddings encode semantic relationships into a numerical representation used for similarity search.'),
  ],
  'ai-e9': [
    q('An AI feature produces impressive demos but users report inconsistent results. What should the team add?', ['More marketing', 'A representative evaluation set with measurable quality criteria and regression checks', 'More random prompts', 'No changes'], 1, 'AI features need repeatable evaluation, not only anecdotal demos.'),
    q('Why is responsible AI part of engineering rather than a final checklist?', ['It only concerns legal teams', 'Data, privacy, safety, reliability, and misuse risks are affected by architecture and product decisions', 'It slows all projects', 'It is only relevant to image models'], 1, 'Responsible AI considerations should shape system design and operating practices from the beginning.'),
  ],
  'ai-d3': [
    q('An AI design tool suggests a layout that looks attractive but makes the primary task harder to find. What should the designer do?', ['Accept it because AI suggested it', 'Reject or revise it based on hierarchy and user-task evidence', 'Add more decoration', 'Hide the primary action'], 1, 'Design decisions must serve user goals, not the novelty of generated output.'),
    q('What is the strongest role for AI in early visual exploration?', ['Generate many directions quickly so the designer can compare and refine options', 'Make final decisions without research', 'Replace accessibility testing', 'Eliminate design critique'], 0, 'AI is useful for breadth and exploration while human designers retain judgment.'),
  ],
  'ai-d4': [
    q('Why should AI-assisted design still use a design system?', ['AI cannot generate colors', 'Constraints help maintain consistency across screens and outputs', 'Design systems make all designs identical', 'AI automatically knows the brand'], 1, 'A design system supplies constraints and shared rules that support consistency.'),
    q('A generated visual contains poor contrast. What is the correct response?', ['Keep it because it looks good', 'Adjust it to meet accessibility and communication requirements', 'Ask AI to make it brighter without checking', 'Remove all text'], 1, 'Accessibility is a design requirement, not an optional polish step.'),
  ],
  'ai-d5': [
    q('Which lesson is most relevant when designing an AI-powered interface?', ['Only image generation', 'Understanding how users interact with AI outputs, uncertainty, feedback, and error states', 'Only logo design', 'Only animation'], 1, 'AI interfaces need clear handling of uncertainty, errors, feedback, and user control.'),
    q('Why should AI-generated visual concepts be treated as drafts?', ['AI images cannot be beautiful', 'Generated output may be inconsistent, inaccessible, inaccurate, or unsuitable for the actual user context', 'Drafts are always worse than final work', 'AI cannot generate alternatives'], 1, 'The designer remains responsible for selecting, refining, and validating the final work.'),
  ],
}

/** Stage-level mastery checks. These are intentionally scenario-based and harder than resource recall. */
export const AI_STAGE_CHECKPOINTS: Record<string, Record<number, QuizQuestion[]>> = {
  'ai-foundations': {
    1: [q('A colleague says, "AI knows the answer because it is trained on the internet." What is the best correction?', ['Training makes every output factual', 'Models learn patterns and generate outputs; factual reliability still requires verification', 'AI only memorizes websites word for word', 'Search engines guarantee model accuracy'], 1, 'Training enables pattern learning, not a guarantee that every generated claim is true.')],
    2: [q('You need a current sourced answer about a fast-changing topic. Which approach is strongest?', ['Use any general chatbot and trust its first answer', 'Choose a research/search-oriented tool, inspect sources, and verify important claims', 'Use an older model because it has more training data', 'Avoid all AI'], 1, 'Tool choice should reflect freshness, source needs, and the consequences of error.')],
    3: [q('Which prompt is strongest for a professional task?', ['"Write something about marketing."', '"Act as an expert."', 'A prompt that defines the task, context, audience, constraints, desired format, and examples where useful', 'A prompt with 2,000 words of unrelated context'], 2, 'Effective prompts reduce ambiguity by supplying relevant context and explicit output requirements.')],
    4: [q('You are deciding between two business strategies and want AI assistance. What should AI primarily do?', ['Make the decision for you', 'Surface assumptions, alternatives, tradeoffs, and questions while you retain decision responsibility', 'Choose the option with the most confident wording', 'Generate a conclusion and skip evidence'], 1, 'AI can improve reasoning by expanding and challenging thinking without becoming the final authority.')],
    5: [q('An AI-generated report contains three statistics that appear plausible. What is the correct professional gate?', ['Plausibility is sufficient', 'Verify the statistics against authoritative sources before using them as facts', 'Ask the same AI to confirm them', 'Remove all numbers'], 1, 'Important factual claims need independent evidence.')],
    6: [q('What makes an AI workflow repeatable rather than a collection of random prompts?', ['More prompts', 'A defined task, stable inputs, explicit instructions, output criteria, review points, and an iteration loop', 'Using only one AI provider', 'Never changing the workflow'], 1, 'Repeatability comes from process design and evaluation, not prompt volume.')],
  },
  'ai-work': {
    1: [q('Your manager needs a concise update from messy meeting notes. What should you provide to AI?', ['Only the word "summarize"', 'The notes plus audience, purpose, required decisions/actions, and desired format', 'A demand to be perfect', 'No context so AI remains unbiased'], 1, 'Relevant context and output requirements improve usefulness and reviewability.')],
    2: [q('You must summarize a legal-looking contract for internal triage. What is the safest approach?', ['Use AI output as legal advice', 'Use AI to extract and organize information, then verify important clauses against the original and appropriate professional guidance', 'Ignore the original document', 'Publish the summary externally'], 1, 'AI can support document analysis but should not replace professional review for consequential matters.')],
    3: [q('You want AI to help you learn a difficult topic. Which workflow best supports learning?', ['Ask for the answer and memorize it', 'Ask for an explanation, attempt a problem yourself, request feedback, and test your understanding', 'Have AI complete all exercises', 'Avoid asking questions'], 1, 'Active retrieval and feedback produce stronger learning than passive answer consumption.')],
    4: [q('A project plan generated by AI includes an unrealistic two-day engineering milestone. What should you do?', ['Accept it because AI planned it', 'Use it as a draft, compare it with team capacity and dependencies, then revise the estimate', 'Delete the whole plan', 'Double the budget automatically'], 1, 'AI can propose structure, but real constraints must determine the plan.')],
    5: [q('Which recurring work task is the best automation candidate?', ['A task requiring sensitive judgment with changing rules', 'A repetitive process with stable inputs, clear outputs, and measurable review criteria', 'An emergency decision', 'A task where errors have irreversible consequences and no review is possible'], 1, 'Good automation candidates are repetitive, structured, and safely reviewable.')],
  },
  'ai-research': {
    1: [q('When should traditional search usually be preferred over a conversational AI response?', ['When you need to inspect current primary sources directly', 'Always', 'Never', 'Only for entertainment'], 0, 'Direct source inspection is especially important when freshness and evidence matter.')],
    2: [q('What is the best role for AI at the start of a research project?', ['Produce the final answer without sources', 'Help expand questions, discover terminology, suggest search directions, and organize early findings', 'Replace source reading', 'Decide which evidence is true'], 1, 'AI can accelerate exploration while evidence remains a separate verification step.')],
    3: [q('Which source is strongest for verifying what a company officially announced?', ['An anonymous post', 'The company’s official announcement or filing', 'An AI-generated summary', 'A random forum'], 1, 'Primary sources are usually the best evidence for what an organization itself announced.')],
    4: [q('AI gives you a quote attributed to a public figure. What should you do before publishing it?', ['Publish because the quote sounds plausible', 'Locate the original interview/speech or a reliable primary record and verify the wording and context', 'Ask AI whether it is real', 'Remove quotation marks but keep the claim'], 1, 'Quotes and attributions should be checked against primary or authoritative records.')],
    5: [q('What should a professional research brief make visible?', ['Only the conclusion', 'The question, evidence, important uncertainty, sources, and reasoning behind the conclusion', 'Only AI prompts', 'Only a bibliography'], 1, 'Decision-makers need to understand both the evidence and its limits.')],
  },
  'ai-content': {
    1: [q('A brand wants content that increases trust rather than just volume. What should AI support?', ['Only publishing frequency', 'Audience research, ideation, drafting, and iteration while the team owns the perspective and quality bar', 'Replacing subject-matter expertise', 'Copying competitors'], 1, 'AI should accelerate the content process without removing expertise and editorial judgment.')],
    2: [q('You use AI to identify claims for an article. What is the next step?', ['Assume the claims are correct', 'Trace important claims to reliable sources before treating them as facts', 'Ask another AI to rewrite them', 'Add more adjectives'], 1, 'Research and verification remain necessary even when AI accelerates discovery.')],
    3: [q('Which editing approach preserves authentic voice?', ['Publish the first AI draft', 'Use AI for alternatives and editing suggestions, then choose and revise based on your own voice and audience', 'Ask AI to imitate a living creator exactly', 'Remove all personal perspective'], 1, 'AI can assist editing without replacing the creator’s authorship and judgment.')],
    4: [q('AI generates a visually striking image that misrepresents a real product feature. What should the designer do?', ['Use it because it looks better', 'Reject or revise it because visual accuracy and user expectations matter', 'Hide the image source', 'Add more effects'], 1, 'Visuals must communicate truthfully and meet the product’s actual constraints.')],
    5: [q('A content team measures success only by how many pieces it publishes. What is missing?', ['More tools', 'Outcome and quality metrics such as audience response, retention, conversions, accuracy, and revision quality', 'More prompts', 'A larger content calendar'], 1, 'Output volume is not the same as content effectiveness.')],
    6: [q('A long-form article is repurposed into social posts. What must remain consistent?', ['Every word', 'The factual core, intended message, and audience value while adapting format and context for each platform', 'The exact same length', 'The same headline everywhere'], 1, 'Good repurposing preserves substance while adapting expression to the new format.')],
  },
  'ai-youtube': {
    1: [q('What should determine a new channel’s content strategy?', ['Only what AI can produce cheaply', 'A specific audience, a clear value proposition, sustainable content pillars, and evidence of demand', 'Only the highest CPM niche', 'Whatever competitors upload'], 1, 'YouTube strategy begins with audience value and a sustainable editorial proposition.')],
    2: [q('An AI tool suggests a topic with high search interest but dozens of established videos. What should you investigate next?', ['Publish immediately', 'Identify the search intent, competitor weaknesses, and a differentiated angle you can execute well', 'Ignore the topic', 'Copy the highest-ranked video'], 1, 'Demand alone is insufficient; differentiation and execution quality matter.')],
    3: [q('Which script workflow is strongest?', ['Generate and publish', 'Research, define the viewer promise, outline, draft with AI, fact-check, edit for voice and pacing, then finalize', 'Generate ten scripts and publish all', 'Copy a competitor and paraphrase'], 1, 'A professional script is researched, edited, verified, and shaped around a clear viewer promise.')],
    4: [q('When is AI voice generation a poor choice?', ['When the creator has a real need for narration assistance', 'When synthetic delivery reduces trust or fails the audience/context requirements', 'When the video is educational', 'When captions are also used'], 1, 'Tool choice should serve audience expectations and content quality.')],
    5: [q('Which visual production practice is safest for a professional channel?', ['Use any online footage without checking rights', 'Use licensed/allowed assets, original material, or clearly permitted sources and add meaningful original value', 'Scrape competitor videos', 'Use the same stock sequence repeatedly'], 1, 'Rights, originality, and meaningful transformation are essential parts of sustainable production.')],
    6: [q('What is the purpose of editing for retention?', ['Make every second visually chaotic', 'Remove unnecessary friction while preserving clarity, story, and viewer expectations', 'Hide weak content', 'Increase video length'], 1, 'Retention editing should improve communication and pacing, not merely create stimulation.')],
    7: [q('A thumbnail gets clicks but viewers immediately leave because the video does not match the promise. What should change?', ['Make the thumbnail even more sensational', 'Align title/thumbnail promise with the actual opening and content', 'Disable analytics', 'Remove the intro from every video'], 1, 'Packaging and delivery must create consistent expectations.')],
    8: [q('Which publishing practice supports sustainable growth?', ['Spam multiple uploads with minimal differences', 'Publish consistently with clear packaging, accurate metadata, and a workflow for reviewing performance', 'Change niches every day', 'Buy engagement'], 1, 'Sustainable growth depends on quality, consistency, and evidence-based iteration.')],
    9: [q('A video has high impressions, low CTR, and average retention among those who click. What should be investigated first?', ['Packaging and audience targeting', 'Camera resolution only', 'Description length only', 'Channel password'], 0, 'High impressions with low CTR points toward packaging/audience fit before deeper retention analysis.')],
    10: [q('Why should an AI-assisted creator study YouTube’s current monetization and disclosure policies?', ['Policies never change', 'AI production practices intersect with originality, inauthentic content, reused content, and disclosure requirements', 'Only large channels need policies', 'Policies only affect thumbnails'], 1, 'Creators need current platform rules because AI-assisted production can create policy risks.'),
  },
  'ai-software-development': {
    1: [q('What is the biggest misconception about AI coding tools?', ['They can generate boilerplate', 'Generated code is automatically correct because it compiles', 'They can explain errors', 'They can speed up prototyping'], 1, 'Compilation is not proof of correctness, security, performance, or maintainability.')],
    2: [q('When asking AI to generate a feature, what improves the result most?', ['A vague request', 'Clear requirements, constraints, interfaces, acceptance criteria, and relevant context', 'More emojis', 'No project context'], 1, 'Specific requirements reduce ambiguity and improve reviewability.')],
    3: [q('AI proposes a fix for a bug but cannot explain the root cause. What should you do?', ['Ship the fix', 'Understand and reproduce the root cause, then verify the proposed fix against the failure', 'Delete the bug report', 'Ask AI to sound more certain'], 1, 'A professional fix requires understanding the failure and validating the change.')],
    4: [q('Which factor should influence whether you use inline completion, an AI editor, or an agent?', ['The tool’s popularity only', 'Task scope, context size, required autonomy, review cost, and risk', 'The color of the interface', 'Whether the tool has a free logo'], 1, 'Different tools are appropriate at different levels of task complexity and autonomy.')],
    5: [q('An agent can modify the entire repository. What should constrain it?', ['Nothing', 'A clearly defined scope, acceptance criteria, permissions, and review process', 'Only the model temperature', 'The number of open browser tabs'], 1, 'Autonomous coding requires explicit boundaries and human review.')],
    6: [q('Why are AI-generated tests not sufficient by themselves?', ['Tests cannot run', 'Tests can encode incorrect assumptions or miss important behaviors', 'AI cannot write tests', 'Testing is unnecessary'], 1, 'Tests are only evidence for the behaviors they actually cover.')],
    7: [q('Which development workflow best combines AI speed with engineering discipline?', ['Generate everything and review at the end', 'Define requirements, plan, delegate bounded tasks, inspect diffs, run tests, manually verify, then integrate', 'Avoid AI entirely', 'Let AI choose architecture without discussion'], 1, 'Bounded delegation plus continuous review is safer and more maintainable.')],
    8: [q('What should a team document when adopting AI-assisted coding?', ['Only the AI tool name', 'Coding standards, acceptable uses, review expectations, security rules, and maintainability requirements', 'Nothing', 'Only prompts'], 1, 'Team adoption requires shared engineering expectations, not just tool access.')],
  },
  'ai-automation': {
    1: [q('Which process is the strongest automation candidate?', ['A stable, repetitive process with clear inputs and outputs', 'A highly ambiguous negotiation', 'A sensitive decision with no review', 'A process that changes every hour'], 0, 'Stable, repetitive, measurable work is easier to automate safely.')],
    2: [q('Why should an automation workflow have explicit failure paths?', ['They are optional documentation', 'Failures in APIs, data, credentials, and AI outputs are normal and need safe handling', 'They guarantee no failures', 'They replace monitoring'], 1, 'Reliable systems assume failure and define recovery behavior.')],
    3: [q('An API returns a 401 error during automation. What should you inspect?', ['Only the AI prompt', 'Authentication credentials, token scope/expiry, endpoint, and request configuration', 'Only the UI', 'Nothing'], 1, 'A 401 is an authentication/authorization signal and should be debugged at the request boundary.')],
    4: [q('A webhook can trigger a workflow that changes customer records. What control is appropriate?', ['Allow every payload', 'Validate the payload, authenticate the webhook, and restrict what actions it can trigger', 'Disable logging', 'Trust the sender by URL alone'], 1, 'Webhooks are external inputs and need authentication, validation, and constrained effects.')],
    5: [q('Where should AI be used inside a workflow?', ['Anywhere because AI is fashionable', 'Where probabilistic language understanding adds value, with deterministic controls around it', 'Only at the beginning', 'Only at the end'], 1, 'AI is useful for classification, extraction, generation, and interpretation while deterministic logic handles fixed rules.')],
    6: [q('Why validate structured data before passing it to the next automation step?', ['To make JSON prettier', 'Malformed or unexpected data can cause downstream failures or incorrect actions', 'Validation slows every system', 'APIs never fail'], 1, 'Validation protects downstream systems and catches bad inputs early.')],
    7: [q('Which action should usually require human approval?', ['Formatting a document', 'Sending a consequential customer refund when policy exceptions are possible', 'Sorting a list', 'Renaming a file'], 1, 'Consequential or ambiguous actions benefit from human oversight.')],
    8: [q('A production workflow fails once every few days. What should you add?', ['Ignore it', 'Logs, alerts, bounded retries, failure handling, and a way to replay or recover safely', 'More prompts only', 'Infinite retries'], 1, 'Reliable automation needs observability and controlled recovery.')],
  },
  'ai-agents': {
    1: [q('Which description best fits an AI agent?', ['A static FAQ', 'A system that can pursue a goal through model decisions and tool actions within defined boundaries', 'Any chatbot', 'A search engine'], 1, 'Agents combine model reasoning/decisions with actions and boundaries.')],
    2: [q('A customer asks a simple FAQ question with a known answer. Should you automatically build an agent?', ['Yes, more autonomy is always better', 'No, a simple deterministic or direct model response may be simpler and more reliable', 'Only if the answer is short', 'Only if the user is on mobile'], 1, 'Use the simplest reliable architecture that satisfies the task.')],
    3: [q('Why can a deterministic workflow be preferable to an agent?', ['It is always smarter', 'Known steps are easier to test, constrain, and reason about', 'It can hallucinate more', 'It requires no requirements'], 1, 'Predictable processes benefit from predictable execution.')],
    4: [q('What should an agent tool definition contain?', ['Only a name', 'A clear purpose, input schema, constraints, permissions, and expected result', 'A long marketing description', 'No validation'], 1, 'Tools are part of the agent’s action boundary and need explicit contracts.')],
    5: [q('Why is long-term memory risky if designed poorly?', ['It uses no storage', 'Irrelevant, stale, or sensitive information can influence future decisions', 'Memory always improves accuracy', 'Agents cannot use context'], 1, 'Memory introduces state that must be governed, relevant, and safe.')],
    6: [q('An agent repeatedly fails the same subtask. What should it do?', ['Retry forever', 'Detect the failure, use bounded recovery or replanning, and escalate when appropriate', 'Hide the error', 'Invent a result'], 1, 'Reliable agents need bounded recovery and escalation paths.')],
    7: [q('Why should tool calls be observable?', ['For decoration', 'To understand what the agent did, diagnose failures, and audit consequential behavior', 'To increase token usage', 'To eliminate testing'], 1, 'Tool traces provide evidence of agent behavior and are essential for debugging and governance.')],
    8: [q('Which task most clearly warrants human approval?', ['Drafting an internal note', 'Executing an irreversible financial transaction based on ambiguous evidence', 'Formatting JSON', 'Creating a list of ideas'], 1, 'Irreversible, high-impact actions require strong controls.')],
    9: [q('What should an agent evaluation set contain?', ['Only easy examples', 'Representative normal cases, edge cases, failures, and safety-sensitive scenarios', 'Only the developer’s favorite prompts', 'No expected outcomes'], 1, 'Evaluation must reflect the real operating distribution and important failure modes.')],
    10: [q('When is multi-agent coordination justified?', ['Always', 'When separate specialized responsibilities provide measurable value that a simpler system cannot achieve', 'For every chatbot', 'Only for image generation'], 1, 'Complexity should be justified by a real system requirement.'),
  },
  'ai-engineering': {
    1: [q('Your AI application needs a structured object for downstream code. What should you prefer?', ['Free-form prose only', 'A supported structured-output/schema mechanism plus validation', 'Manual copy/paste', 'A random delimiter'], 1, 'Structured output and validation make model responses safer for software integration.')],
    2: [q('A cheap model handles simple classification but fails complex reasoning. What is the right architecture?', ['Use the expensive model for every task', 'Route tasks to models based on capability requirements and cost/latency constraints', 'Use the cheap model and hide errors', 'Avoid models'], 1, 'Model routing is a practical way to balance quality, cost, and latency.')],
    3: [q('Why validate model output even when using a schema?', ['Schemas guarantee semantic correctness', 'The output can still contain incorrect values or unsupported assumptions', 'Validation is unnecessary', 'Schemas make the model deterministic'], 1, 'Structural validity does not guarantee factual or business correctness.')],
    4: [q('What do embeddings primarily enable?', ['Exact keyword matching only', 'Representing content numerically so semantic similarity can be searched', 'Encrypting documents', 'Generating videos'], 1, 'Embeddings support semantic retrieval and similarity operations.')],
    5: [q('Why is chunking important in RAG?', ['It changes the model’s brand', 'Chunk size and boundaries affect retrieval relevance and the context given to the model', 'It guarantees citations', 'It replaces embeddings'], 1, 'Poor chunking can make relevant information hard to retrieve or too noisy to use.'),
    6: [q('A RAG system retrieves the wrong evidence. What should you avoid doing first?', ['Inspect retrieval quality', 'Evaluate chunking and query formulation', 'Increase the model temperature blindly', 'Compare retrieved documents with expected evidence'], 2, 'Generation settings cannot fix a retrieval pipeline that supplies the wrong evidence.'),
    7: [q('When would hybrid search be useful?', ['When both semantic similarity and exact lexical matches matter', 'Only for images', 'Never', 'Only when no database exists'], 0, 'Hybrid approaches can combine semantic and keyword-style retrieval signals.'),
    8: [q('What is a strong AI evaluation practice?', ['Evaluate only one impressive demo', 'Create representative test cases with expected criteria and monitor regressions', 'Ask the model if it did well', 'Measure token count only'], 1, 'AI quality needs repeatable evaluation against defined criteria.'),
    9: [q('Your AI feature is accurate but expensive. What should you investigate?', ['Nothing', 'Caching, routing, prompt/context size, batching, model choice, and unnecessary calls', 'Only UI color', 'More expensive models'], 1, 'Cost optimization comes from reducing unnecessary work and selecting the right model and architecture.'),
    10: [q('What is required before deploying an AI API to production?', ['Only a working demo', 'Security, secrets management, rate limits, monitoring, evaluation, error handling, and a rollback/fallback strategy', 'Only a logo', 'A larger prompt'], 1, 'Production AI needs normal software engineering controls plus AI-specific evaluation and cost/reliability monitoring.')],
  },
  'ai-design': {
    1: [q('What is AI most useful for in early design?', ['Exploring many possibilities quickly', 'Making final decisions without users', 'Replacing accessibility checks', 'Eliminating design principles'], 0, 'AI is particularly useful for breadth and exploration in early stages.'),
    2: [q('An AI-generated UI looks attractive but users cannot find the main action. What should happen?', ['Keep it because it looks modern', 'Revise the hierarchy based on user goals and usability evidence', 'Add more animation', 'Generate ten more versions'], 1, 'Usability and hierarchy outweigh novelty.'),
    3: [q('Which image-generation practice improves consistency?', ['Random prompts every time', 'Define a visual direction, constraints, references, and reusable prompt patterns', 'Change style every screen', 'Avoid iteration'], 1, 'Consistent constraints and references help maintain a coherent visual language.'),
    4: [q('What is the designer’s responsibility when using AI-generated visuals?', ['Only selecting the prettiest result', 'Checking accuracy, accessibility, brand fit, originality, and user impact', 'None because AI made it', 'Only resizing it'], 1, 'AI does not transfer design responsibility to the tool.'),
    5: [q('A stakeholder asks for an AI-generated concept based on a biased assumption about users. What should the designer do?', ['Generate it without question', 'Challenge the assumption and seek evidence before turning it into a design decision', 'Hide the assumption', 'Ask AI to justify it'], 1, 'Designers are responsible for questioning assumptions that affect users.'),
    6: [q('Why prototype AI-assisted ideas before investing in a full system?', ['Prototypes are cheaper ways to test whether the concept solves a real problem', 'AI prototypes are always final', 'It avoids user research', 'It guarantees adoption'], 0, 'Rapid prototyping reduces the cost of learning before full implementation.'),
    7: [q('How should AI support a design system?', ['Invent a new style for every screen', 'Help apply and extend established tokens and components while humans review consistency', 'Replace the design system', 'Ignore accessibility'], 1, 'AI can accelerate application while the system remains the source of design consistency.'),
    8: [q('When should a designer reject an AI suggestion?', ['Whenever it is generated by AI', 'When it conflicts with user needs, accessibility, evidence, ethics, or the design goal', 'Never', 'Only when it looks ugly'], 1, 'Human judgment is necessary to evaluate AI output against real design constraints.'),
  },
}

export const AI_PROJECT_EXTENSIONS: Record<string, Project[]> = {
  'ai-foundations': [
    { id: 'ai-f-p3', title: 'AI Workflow Case Study', description: 'Choose one recurring real task. Document the original process, identify where AI adds value, write the workflow, test at least three iterations, record failure cases, define review criteria, and present the final before/after process.', level: 'intermediate', techTags: ['AI', 'Workflow Design', 'Evaluation', 'Portfolio'] },
  ],
  'ai-work': [
    { id: 'ai-w-p4', title: 'Professional AI Workflow Portfolio', description: 'Create three documented workflows for different professional tasks. For each include: task definition, input/context template, AI instructions, expected output, review checklist, failure examples, and final improved workflow.', level: 'advanced', techTags: ['AI', 'Productivity', 'Workflow Design', 'Portfolio'] },
  ],
  'ai-research': [
    { id: 'ai-r-p2', title: 'Research Audit & Evidence Map', description: 'Take a current claim, map at least five sources, classify each as primary/secondary, record dates and conflicts, verify the central claims, and produce a final brief with an evidence table and uncertainty notes.', level: 'advanced', techTags: ['Research', 'Verification', 'Source Evaluation', 'Portfolio'] },
  ],
  'ai-content': [
    { id: 'ai-c-p4', title: 'Original Content Campaign', description: 'Build a seven-day campaign from one core idea. Deliver research notes, editorial angle, original draft, AI-assisted revisions, fact-check log, visual direction, platform adaptations, and a post-publication measurement plan.', level: 'advanced', techTags: ['AI', 'Content Strategy', 'Research', 'Portfolio'] },
  ],
  'ai-youtube': [
    { id: 'ai-y-p3', title: 'YouTube Pilot Series', description: 'Produce three related videos for one audience. Document research, differentiation, scripts, production decisions, thumbnails, titles, AI disclosures where required, analytics review, and the changes you would make to video four.', level: 'advanced', techTags: ['AI', 'YouTube', 'Analytics', 'Production', 'Portfolio'] },
  ],
  'ai-software-development': [
    { id: 'ai-s-p4', title: 'AI Engineering Audit', description: 'Take an AI-assisted application and produce a professional engineering review: architecture, generated-code review, test coverage, security risks, performance concerns, maintainability issues, and a prioritized remediation plan.', level: 'advanced', techTags: ['AI', 'Software Engineering', 'Testing', 'Security', 'Portfolio'] },
  ],
  'ai-automation': [
    { id: 'ai-a-p2', title: 'Production Automation Design', description: 'Design an automation for a realistic business process. Include trigger, data contract, transformations, AI step, validation, human approval, retries, logging, failure handling, and maintenance plan. Build a working prototype where practical.', level: 'advanced', techTags: ['AI', 'Automation', 'APIs', 'Reliability', 'Portfolio'] },
  ],
  'ai-agents': [
    { id: 'ai-ag-p2', title: 'Bounded Agent System', description: 'Build an agent for a clearly bounded task. Document tools, permissions, context, memory, planning, evaluation set, failure modes, human approval points, cost limits, and monitoring. Demonstrate at least five failure cases.', level: 'advanced', techTags: ['AI Agents', 'Tool Use', 'Evaluation', 'Safety', 'Portfolio'] },
  ],
  'ai-engineering': [
    { id: 'ai-e-p2', title: 'Production RAG Evaluation', description: 'Build a small RAG application and create an evaluation set. Measure retrieval relevance and answer quality, inspect failure cases, improve chunking/retrieval, monitor cost, and document the architecture and tradeoffs.', level: 'advanced', techTags: ['RAG', 'Embeddings', 'Evaluation', 'AI Engineering', 'Portfolio'] },
  ],
  'ai-design': [
    { id: 'ai-d-p2', title: 'AI-Assisted Design Case Study', description: 'Complete a design problem from research to prototype. Show the AI-assisted explorations, rejected alternatives, accessibility checks, user feedback, final design, and a clear explanation of where human judgment changed the AI output.', level: 'advanced', techTags: ['AI', 'UI/UX', 'Design Systems', 'Research', 'Portfolio'] },
  ],
}
