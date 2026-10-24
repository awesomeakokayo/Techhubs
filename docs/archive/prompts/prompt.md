# TechSkillHub — Complete AI Category Implementation Specification

## MASTER PROMPT FOR OPENCODE REMO V2.5

You have direct access to the TechSkillHub codebase.

Your task is to implement a complete new **AI category** inside the **existing TechSkillHub learning architecture**.

This is an implementation task, not a redesign of the entire platform.

The repository is the source of truth for architecture.

The specification below is the source of truth for the AI curriculum, content direction, project structure, resource selection, quiz requirements, SEO requirements, and learner experience.

---

# 1. FIRST RULE: INSPECT BEFORE EDITING

Before making any changes, inspect the existing repository and understand how TechSkillHub currently handles:

* top-level categories
* tracks
* roadmaps
* stages
* resources
* projects
* guided paths
* quizzes
* quiz scoring
* learner progress
* authentication
* paid/pro content
* navigation
* SEO/search intents
* learning journeys
* project pages
* track pages
* roadmap pages

At minimum, inspect the relevant existing files such as:

```text
lib/tracks.ts
lib/guided-path.ts
lib/quiz-data.ts
lib/seo/search-intents.ts
lib/seo/journeys.ts
```

and the actual components/routes that render:

```text
categories
tracks
roadmaps
guided paths
quizzes
projects
progress
premium/pro content
```

Do NOT assume these files work exactly as described in this prompt.

Read the real code.

Then extend the existing implementation.

---

# 2. DO NOT BUILD A SECOND PLATFORM

This is extremely important.

Do NOT create:

* a second AI learning engine
* a second guided-path engine
* a second quiz system
* a second progress system
* an AI grading service
* an AI submission-review system
* an AI project-evaluation system
* a separate AI database
* a separate authentication system
* a separate subscription system
* a new payment system
* a new portfolio architecture
* an external assessment provider
* a third-party learner-management system

TechSkillHub already has systems for these things.

Use them.

Improve them only where the existing implementation genuinely requires a small compatible extension.

---

# 3. WHAT WE ARE ADDING

TechSkillHub currently has several major learning categories.

Add:

# AI

as an additional top-level category.

The intended category structure is:

```text
Build
Grow
Design
Analyze
AI
```

IMPORTANT:

Inspect the actual category implementation.

If `Grow` exists and is active, KEEP IT.

Do not silently remove or rename existing categories.

AI is an addition.

---

# 4. WHAT THE AI CATEGORY MEANS

AI is NOT:

> "A collection of ChatGPT tutorials."

AI is a complete learning category about:

> **How to effectively work, create, research, build, automate, and solve problems with modern AI systems.**

The learner should understand:

* AI assistants
* AI models
* AI search
* AI research
* multimodal AI
* prompting
* AI workflows
* AI coding
* coding agents
* AI content creation
* AI video
* AI YouTube
* automation
* AI agents
* APIs
* AI applications
* data/retrieval
* responsible AI
* verification
* choosing the right tool for the job

ChatGPT is only ONE example of an AI product.

Do not build the curriculum around OpenAI alone.

---

# 5. CORE LEARNING PHILOSOPHY

The AI category must teach:

```text
Understand
↓
Choose
↓
Instruct
↓
Practice
↓
Evaluate
↓
Verify
↓
Build
↓
Improve
```

The learner must leave with practical capability.

Do NOT design the curriculum around:

```text
watch video
↓
read article
↓
answer easy question
↓
finish course
```

Instead:

```text
Learn
↓
Apply
↓
Question
↓
Practice
↓
Build
↓
Project
↓
Progress
```

---

# 6. FREE VS PAID EXPERIENCE

The AI category page itself should be accessible.

The free experience should let users:

* discover the AI category
* understand what the category teaches
* browse tracks
* view selected learning material
* access free resources
* understand project outcomes
* preview the guided learning path

The full guided experience should use the **existing TechSkillHub paid/pro access system**.

DO NOT invent another paywall.

Find the existing premium/pro architecture and integrate AI into it.

The intended product model is:

### Free

AI category + free resources + previews.

### Paid/Pro

Guided AI learning:

* structured stages
* guided lessons
* quizzes
* projects
* progress
* completion

---

# 7. AI CATEGORY LANDING PAGE COPY

Use the following copy as the starting point and adapt typography, spacing, components, and tone to the existing TechSkillHub design system.

## Eyebrow

AI

## H1

Learn to work with AI — not just chat with it.

## Body

AI can research, write, analyze, code, design, create video, automate workflows, search information, and help build software.

The difficult part is knowing what to use, how to use it, and when another tool is better.

TechSkillHub teaches the skills behind the tools.

Start from the fundamentals. Learn how to choose the right AI system, give it the right context, evaluate its output, verify important information, and turn useful techniques into repeatable workflows.

Then build real projects that prove what you learned.

## Primary CTA

Explore AI

## Secondary CTA

Start the Guided Path

---

# 8. CATEGORY OUTCOME COPY

Use:

## What you'll learn

* Understand modern AI and how different AI systems work
* Use AI tools effectively
* Write clearer instructions
* Give AI useful context
* Evaluate AI output
* Verify important claims
* Combine AI with search and research
* Use AI for work and productivity
* Create content with AI
* Create video with AI
* Build YouTube workflows with AI
* Develop software with AI
* Automate repetitive work
* Understand AI agents
* Build AI-powered applications
* Choose the right tool for the right task

---

# 9. DO NOT MAKE AI TOOL CLAIMS WITHOUT EVIDENCE

Never write:

> "ChatGPT is the best AI."

Never write:

> "Claude is the best AI."

Never write:

> "Gemini is the best AI."

Never create a universal ranking.

Instead:

> "For this particular task, this is currently a strong option because..."

Explain:

* what the tool is good at
* what it is weak at
* when to use it
* when to use another tool

The curriculum should teach **tool selection**, not brand loyalty.

---

# 10. AI CATEGORY TRACKS

Create the following tracks inside the existing track/roadmap architecture.

If some already exist, UPDATE them rather than duplicating them.

## Track 1

### AI Foundations & Fluency

Slug:

`ai-foundations`

Tagline:

Understand AI, choose the right tools, and build reliable habits for working with AI.

Stages:

1. Understanding AI
2. The Modern AI Landscape
3. Communicating With AI
4. Thinking With AI
5. AI Reliability
6. Building Repeatable AI Workflows

Project:

**AI Task Triage**

---

## Track 2

### AI for Work & Productivity

Slug:

`ai-work`

Stages:

1. AI for Communication
2. AI for Documents
3. AI for Learning
4. AI for Planning
5. AI for Professional Workflows

Projects:

* AI Communication Workflow
* AI Document Workflow
* AI Workday System

---

## Track 3

### AI Research, Search & Verification

Slug:

`ai-research`

Stages:

1. Search vs AI
2. AI-Assisted Research
3. Sources & Evidence
4. Verification & Fact Checking
5. Research Workflows

Project:

**Verified AI Research Brief**

---

## Track 4

### AI Content Creation

Slug:

`ai-content`

Stages:

1. Content Strategy
2. AI-Assisted Research
3. Writing & Scripting
4. AI Visual Creation
5. Content Production
6. Repurposing

Projects:

* AI Content Strategy
* AI Script + Content Package
* Multi-Platform Content Workflow

---

## Track 5

### AI Video & YouTube

Slug:

`ai-youtube`

Stages:

1. YouTube Fundamentals
2. Topic Research
3. AI-Assisted Scripting
4. AI Voice & Audio
5. AI Visual Production
6. Editing
7. Thumbnails & Packaging
8. Publishing
9. Analytics
10. Responsible Automation

Projects:

**Project 1 — AI-Assisted YouTube Video**

**Project 2 — YouTube Content System**

Do NOT teach spam automation.

Do NOT promise monetization.

Teach sustainable content production.

---

## Track 6

### AI-Assisted Software Development

Slug:

`ai-software-development`

Stages:

1. AI Coding Fundamentals
2. Code Generation
3. Debugging With AI
4. AI Coding Tools
5. Coding Agents
6. Testing & Verification
7. Building With AI
8. Professional AI-Assisted Development

Projects:

**AI-Assisted Landing Page**

**AI-Assisted Web Application**

**AI-Powered Application**

---

## Track 7

### AI Automation

Slug:

`ai-automation`

Stages:

1. Automation Fundamentals
2. Workflows
3. APIs
4. Webhooks
5. AI in Workflows
6. Structured Data
7. Human Approval
8. Reliable Automation

Project:

**AI Workflow Automation**

---

## Track 8

### AI Agents

Slug:

`ai-agents`

Stages:

1. What AI Agents Are
2. Agents vs Chatbots
3. Agents vs Workflows
4. Tools
5. Context & Memory
6. Planning
7. Tool Use
8. Human Oversight
9. Reliability
10. Agent Workflow Design

Project:

**AI Research Agent**

---

## Track 9

### AI Data, APIs & Engineering

Slug:

`ai-engineering`

Stages:

1. AI APIs
2. Model Selection
3. Structured Outputs
4. Embeddings
5. Retrieval
6. RAG
7. Vector Search
8. AI Evaluation
9. Cost & Latency
10. Deployment

Project:

**Build a Small AI Application**

Use free/local options where possible.

Do not force paid API usage.

---

## Track 10

### AI Design & Creative Work

Slug:

`ai-design`

Stages:

1. AI in Design
2. UI Ideation
3. Image Generation
4. Visual Exploration
5. Design Refinement
6. Prototyping
7. Brand Consistency
8. Human Design Judgment

Project:

**AI-Assisted Product Concept**

---

# 11. FOUNDATIONS GUIDED PATH

The default AI guided learning path should begin with:

```text
AI Foundations
↓
AI Fluency
↓
AI for Work
↓
AI Research
↓
AI Creation
↓
AI Development
↓
AI Automation
↓
AI Agents
```

Use the EXISTING guided-path architecture.

Do not make a separate AI path engine.

---

# 12. EXISTING GUIDED PATH PATTERN

Use whatever the repository currently uses.

The target educational pattern is:

```text
Concept
↓
Resource
↓
Quiz
↓
Concept
↓
Resource
↓
Quiz
↓
Project
↓
Checkpoint
```

If the current engine derives these steps automatically from Track data, populate the data correctly and let the engine do the work.

Do not duplicate the engine.

---

# 13. QUIZZES — IMPORTANT

Every graded AI question MUST be multiple-choice.

Never create free-text questions.

Every question must have exactly:

```ts
{
  question: string,
  options: string[],
  correctIndex: number,
  explanation: string
}
```

Use the existing quiz data structure.

Do not create another quiz model.

---

# 14. QUIZ QUALITY

Questions must be application-focused.

Target distribution:

20% knowledge

40% scenario/application

20% tool selection

20% evaluation/decision making

Avoid trivial questions.

Do not create:

"What does AI stand for?"

and consider that sufficient.

Instead, ask things such as:

---

### Question

A manager asks an AI tool for today's market statistics. The answer contains exact numbers but provides no sources. What is the best next step?

A. Ask the AI the same question again.

B. Add "be 100% accurate" to the prompt.

C. Verify the figures using current authoritative sources.

D. Assume the numbers are correct because they are specific.

Correct:

C

Explanation:

Specific or confident AI output is not evidence of accuracy. Current factual claims should be verified using authoritative sources.

---

### Question

You need to analyze a dataset containing 100,000 transaction records. Which approach is most appropriate?

A. Paste all 100,000 records into a chatbot.

B. Ask the chatbot to estimate the totals.

C. Use an appropriate data-analysis/database workflow and use AI where it helps with analysis or explanation.

D. Ask the AI to identify the answer from a random sample and assume the same result.

Correct:

C

Explanation:

Large structured datasets are better handled by appropriate computational/data tools. AI can assist with analysis, transformation, explanation, and workflow design.

---

### Question

Which instruction gives an AI system the most useful context?

A. "Write something good."

B. "Explain this."

C. "Write a 300-word explanation for a first-year computer science student who has never used an API. Include one simple example."

D. "Give me the smartest answer possible."

Correct:

C

Explanation:

The instruction establishes audience, purpose, length, subject context, and expected output.

---

# 15. QUIZ DESIGN FOR ADVANCED STAGES

Later questions should require judgment.

Example:

An AI coding agent modifies several files and reports that all tests pass. You inspect the diff and notice that it changed authentication logic unrelated to your original task. What should you do?

A. Accept the changes because the tests passed.

B. Accept the changes because an AI agent knows the codebase.

C. Review the changes, revert unrelated modifications, and verify the intended behavior independently.

D. Delete the project and start again.

Correct:

C

Explanation:

Passing tests do not automatically make unrelated changes acceptable. AI-generated changes still require human review and scope control.

---

# 16. AI FOUNDATIONS — LESSONS

Create beginner-friendly lesson content around:

### Lesson 1

What AI Actually Is

Teach:

* AI as a broad field
* machine learning
* generative AI
* models
* products
* tools

### Lesson 2

How Modern AI Tools Differ

Teach:

* general assistants
* reasoning models
* multimodal systems
* search/research tools
* coding tools
* creative tools
* automation
* agents

### Lesson 3

What AI Is Good At

Teach:

* transformation
* summarization
* generation
* classification
* brainstorming
* explanation
* pattern-oriented tasks

### Lesson 4

Where AI Can Fail

Teach:

* hallucinations
* outdated information
* missing context
* ambiguity
* overconfidence
* incorrect assumptions

### Lesson 5

When AI Is Not the Right Tool

Teach:

* search
* database
* calculator
* traditional software
* code
* human judgment

### Lesson 6

Responsible AI Use

Teach:

* privacy
* sensitive information
* verification
* copyright considerations
* attribution
* human oversight

---

# 17. AI FOUNDATIONS PROJECT

## AI Task Triage

The learner receives ten realistic tasks.

Examples:

1. "Find today's USD/NGN exchange rate."
2. "Summarize a 10-page document."
3. "Calculate 100,000 transaction totals."
4. "Generate five YouTube concepts."
5. "Debug a React component."
6. "Generate an image concept."
7. "Research a current market trend."
8. "Automate repetitive email classification."
9. "Make a legal decision with serious consequences."
10. "Build a customer-support workflow."

For every task, learner chooses an appropriate approach:

* AI assistant
* search/research
* code/data tool
* creative AI
* automation
* human judgment
* combination

Project goal:

Teach tool selection.

---

# 18. AI FLUENCY PROJECT

## Personal AI Workbench

Learner selects a recurring task.

Required components:

* task definition
* context
* desired output
* constraints
* examples
* review criteria
* reusable instruction
* iteration

The learner should end with a repeatable workflow.

---

# 19. AI RESEARCH PROJECT

## Verified AI Research Brief

Learner must:

1. formulate a question
2. identify what must be current
3. search
4. gather sources
5. compare sources
6. identify unsupported claims
7. verify important statements
8. synthesize findings
9. produce final brief

The project should emphasize:

AI output ≠ evidence.

---

# 20. AI CONTENT PROJECT

## AI Content Package

Create:

* content objective
* target audience
* research
* topic
* angle
* outline
* draft
* editing
* final version
* repurposed version

---

# 21. AI YOUTUBE PROJECT

## AI-Assisted YouTube Video

Deliver:

* audience
* topic
* research
* hook
* outline
* script
* narration
* visual plan
* final video
* thumbnail
* title
* description

Do not require paid AI software.

Allow equivalent free/local workflows where appropriate.

---

# 22. AI SOFTWARE PROJECT

## Build a Website With AI

Learner should:

* define requirements
* use AI to plan
* implement
* review generated code
* debug
* test
* deploy if possible

The learner must understand what was generated.

Do not teach:

"accept AI code without reviewing it."

---

# 23. AI AUTOMATION PROJECT

## AI Workflow Automation

Example:

```text
Form submission
↓
AI classification
↓
Information extraction
↓
Routing
↓
Draft response
↓
Human review
↓
Record result
```

Use the existing project model.

---

# 24. AI AGENT PROJECT

## AI Research Agent

The learner should design or build a workflow where an AI agent:

* accepts a research question
* uses approved tools
* collects evidence
* structures findings
* cites/links sources
* returns a bounded output

Teach:

Not every task needs an agent.

---

# 25. AI ENGINEERING PROJECT

## Build a Small AI Application

Possible project:

* document Q&A
* study assistant
* research assistant
* structured data extractor
* support assistant

Use free/local options when possible.

---

# 26. AI DESIGN PROJECT

## AI-Assisted Product Concept

Deliver:

* product problem
* audience
* visual direction
* concepts
* generated alternatives
* selected direction
* refined design
* explanation of design decisions

Teach human judgment.

---

# 27. RESOURCES — FREE ONLY FOR THE FREE LEARNING PATH

The following resource set has been researched and should be included only after verifying the live URL during implementation.

### OpenAI Academy — AI Foundations

URL:

https://openai.com/academy/ai-fundamentals/

Purpose:

AI basics, how AI works, use cases, responsible use.

---

### OpenAI Academy — AI Foundations Course

URL:

https://academy.openai.com/public/courses/ai-foundations-juzjs?autoEnroll=true

Purpose:

Hands-on introduction to AI, prompting, context, review, responsible use.

OpenAI currently states the Academy courses are free and available globally to anyone with a ChatGPT account.

---

### OpenAI Academy — Getting Started With ChatGPT

URL:

https://openai.com/academy/getting-started/

Purpose:

Practical introduction to ChatGPT.

Use this as a supplementary resource, not the entire curriculum.

OpenAI's current guide covers practical prompting, tools, files, search/deep research, image creation, projects and workflows.

---

### OpenAI Academy — Applied AI Foundations

URL:

https://academy.openai.com/

Use the current Academy course listing to link to Applied AI Foundations.

Purpose:

Move from individual prompts to repeatable workflows.

OpenAI currently describes this as breaking recurring work into steps, deciding where AI helps, and adding review points.

---

### OpenAI Academy — Agents & Workflows

URL:

https://academy.openai.com/

Use the current course listing to link to Agents & Workflows.

Purpose:

Structured agent/workflow thinking.

OpenAI currently describes this course as practicing how to direct agents, provide context, define outputs, set boundaries, review drafts and refine workflows.

---

### Microsoft Learn — Introduction to Generative AI

URL:

https://learn.microsoft.com/en-us/training/modules/intro-generative-ai-explore-basics/

Purpose:

Beginner introduction to generative AI, LLMs, model comparison, critical thinking and responsible use.

Microsoft currently lists it as a beginner module with an assessment.

---

### Microsoft Learn — What Is Generative AI?

URL:

https://learn.microsoft.com/en-us/training/modules/what-generative-ai/

Purpose:

Generative AI fundamentals and responsible use.

---

### Microsoft — Generative AI for Beginners

URL:

https://learn.microsoft.com/en-us/shows/generative-ai-for-beginners/

Purpose:

Technical AI/building path.

Microsoft currently describes this as an 18-lesson comprehensive course.

---

### Microsoft Learn — Generative AI and Agents

URL:

https://learn.microsoft.com/en-us/training/modules/fundamentals-generative-ai/

Purpose:

Generative AI, LLMs, prompts, agents.

Current module includes knowledge assessment.

---

### Anthropic — Build With Claude

URL:

https://www.anthropic.com/learn/build-with-claude

Purpose:

Prompt engineering, evaluations, RAG and building AI applications.

Anthropic currently links learners from this resource to its interactive prompt engineering tutorial and evaluations material.

---

# 28. YOUTUBE RESOURCES

Use YouTube only when the video materially improves the lesson.

Do not add random AI influencers.

Prefer:

* OpenAI
* Anthropic
* GitHub
* Microsoft
* Google
* official product channels
* highly reputable technical educators

Current examples already researched:

### Microsoft — Generative AI for Beginners

Series:

https://learn.microsoft.com/en-us/shows/generative-ai-for-beginners/

The Microsoft page currently contains an 18-episode series covering topics including LLM fundamentals, model comparison and responsible AI.

Add individual YouTube/embedded video entries only after verifying the exact current video URL.

---

# 29. RESOURCE DATA

Use the existing resource type and shape.

For each resource store:

* id
* title
* description
* url
* type
* free: true
* source/provider

If the repository already supports additional metadata, you may add:

* verifiedAt
* level
* recommendedFor
* notes

But only if this fits the existing data architecture.

Do NOT build an elaborate new resource CMS.

---

# 30. IMPORTANT RESOURCE RULE

Do not require paid software for a free learning exercise.

For example:

If a workflow can be demonstrated with a free product or local tool, provide that option.

If a paid tool is industry-leading but not free, it may be mentioned under:

"Current tool options"

but it must not be the only required route for completing the free lesson.

---

# 31. TOOL LANDSCAPE

Teach categories rather than brands.

Examples:

### AI assistants

ChatGPT
Claude
Gemini
Copilot

### AI search/research

Perplexity
search-enabled AI assistants
traditional web search

### AI coding

GitHub Copilot
Cursor
Claude Code
other current coding agents

### AI creative

image generation/editing
video generation/editing
voice/audio

### Automation

n8n
Make
Zapier
APIs/webhooks

### AI systems

RAG
retrieval
embeddings
vector search
agents
tool calling

Update tool recommendations by current evidence when editing the data.

---

# 32. SEO IMPLEMENTATION

Use the existing:

```text
lib/seo/search-intents.ts
```

or the current equivalent after inspection.

Add AI search intents.

Do NOT create a second SEO framework.

---

# 33. SEO INTENT CLUSTERS

## Cluster: Beginner AI

Queries:

* how to learn AI
* how to use AI
* how to use AI for beginners
* how to learn AI from scratch
* how to use generative AI
* how to use AI effectively
* how to get started with AI

---

## Cluster: AI for Work

* how to use AI for work
* how to use AI at work
* how to use AI for productivity
* how to automate work with AI
* AI productivity for beginners
* how to use ChatGPT for work

---

## Cluster: Prompting

* how to write AI prompts
* how to prompt AI
* prompt engineering for beginners
* how to get better AI responses
* how to improve ChatGPT prompts

---

## Cluster: AI Research

* how to use AI for research
* how to research with AI
* AI research for beginners
* how to verify AI answers
* how to fact check AI
* how to use AI search

---

## Cluster: AI Coding

* how to code with AI
* how to build software with AI
* how to build an app with AI
* AI coding for beginners
* AI software development
* how to use AI coding tools

---

## Cluster: AI Video

* how to create videos with AI
* how to make videos with AI
* AI video creation
* how to edit videos with AI
* AI video for beginners

---

## Cluster: AI YouTube

* how to make YouTube videos with AI
* AI YouTube automation
* YouTube automation with AI
* how to create faceless YouTube videos with AI
* how to start an AI YouTube channel
* how to use AI for YouTube

---

## Cluster: AI Automation

* AI automation for beginners
* how to automate tasks with AI
* how to build AI workflows
* AI workflow automation
* how to automate business with AI

---

## Cluster: AI Agents

* what are AI agents
* how to build AI agents
* AI agents for beginners
* how to create AI agents
* AI agent workflows

---

## Cluster: AI Design

* how to design with AI
* AI design tools
* AI UI design
* AI graphic design
* AI assisted design

---

# 34. SEARCH-TO-LEARNING FUNNEL

Use the existing journey system.

The intended structure is:

```text
Search Query
↓
Relevant TechSkillHub Page
↓
AI Track/Roadmap
↓
Guided Lesson
↓
Quiz
↓
Project
↓
Career/Next Skill
```

Example:

```text
"how to build software with AI"

↓
AI Software Development page

↓
AI Software Development roadmap

↓
AI coding stage

↓
quiz

↓
AI-assisted software project

↓
next skill
```

Another:

```text
"how to make YouTube videos with AI"

↓
AI YouTube page

↓
AI YouTube roadmap

↓
video production stage

↓
quiz

↓
YouTube project
```

---

# 35. EXISTING JOURNEY MODEL

Use the existing:

```text
entry
→ roadmap
→ project
→ career
→ nextSkill
```

Do not replace it.

Add the appropriate AI journeys.

---

# 36. INTERNAL LINKING

Every AI article/guide should link logically to:

* AI category
* relevant AI roadmap
* relevant project
* related AI guide
* next skill
* existing Build/Design/Analyze/Grow category where relevant

For example:

AI-assisted coding article:

AI Software Development
→ Build
→ Web Development
→ AI Agents

AI design article:

AI Design
→ Design
→ UI/UX
→ AI Creative Work

AI research article:

AI Research
→ Analyze
→ Data/Research skills

This creates the cross-category learning graph.

---

# 37. PROGRESS

Use the existing progress system.

Do not create localStorage-only AI progress.

Do not create a second database.

Do not build a separate AI progress context unless the existing application architecture requires a small AI-specific adapter.

The learner should see the same progress behavior used elsewhere in TechSkillHub.

AI should inherit the existing progress model.

---

# 38. STAGE COMPLETION

Follow the current project/quiz/progress logic.

Do NOT invent a new rule such as:

"AI project must be approved by an AI grader."

There is no such requirement.

Use the existing project completion behavior.

Use the existing guided-path checkpoint system.

Use the existing quiz result behavior.

---

# 39. QUESTIONS MUST BE ANSWERABLE BY THE EXISTING SYSTEM

This is critical.

Every question must be auto-checkable.

Therefore:

NO:

* written explanations required for scoring
* project text answers used as quiz answers
* subjective essays
* free-text grading

YES:

* multiple choice
* single correct answer
* deterministic `correctIndex`

Projects remain projects.

Quizzes remain machine-checkable quizzes.

---

# 40. COPY FOR PAID GUIDED CTA

Use:

### Go beyond the basics.

The free resources help you explore what AI can do.

The guided path helps you build the skill step by step.

Work through structured lessons, answer practical questions, complete projects, and track your progress as you build real AI skills.

CTA:

**Start the Guided AI Path**

Use the repository's existing payment/pro access mechanism.

---

# 41. PROJECT SELLING POINT

AI category pages should visibly emphasize:

## Learn by building.

Do not merely say learners will "understand AI."

Tell them they will build practical things.

Examples:

* research brief
* content workflow
* YouTube video
* AI-assisted application
* automation
* AI agent workflow
* AI product concept

This should be one of the major conversion points for the paid guided path.

---

# 42. BEGINNER-FRIENDLINESS

Every lesson should explain:

* what the concept means
* why it matters
* what problem it solves
* how it works
* example
* mistake to avoid
* practice task
* resource
* quiz
* project relationship

Do not assume:

* programming knowledge
* AI terminology
* prompting experience
* technical background

Technical tracks can increase difficulty progressively.

---

# 43. DO NOT OVER-DEPEND ON CHATGPT

Do not make the curriculum:

ChatGPT
→ ChatGPT
→ ChatGPT
→ ChatGPT

Instead:

AI assistant
→ search
→ research
→ documents
→ image
→ video
→ coding
→ automation
→ agents
→ APIs
→ databases
→ human judgment

ChatGPT can appear where appropriate.

It must not become the definition of AI.

---

# 44. MODEL-SELECTION TEACHING

Teach learners to ask:

1. What task am I doing?
2. What kind of input do I have?
3. How current does the information need to be?
4. How much context is involved?
5. Do I need reasoning?
6. Do I need search?
7. Do I need images/video/audio?
8. Do I need code?
9. Do I need automation?
10. Do I need a database?
11. Does this require a human decision?

Then choose the tool.

---

# 45. HIGH-STAKES TEACHING

Teach that AI should not be treated as the sole authority for:

* medical decisions
* legal decisions
* financial decisions
* safety-critical decisions
* important employment decisions

For such topics, teach:

AI assistance
+
authoritative information
+
qualified human judgment

---

# 46. RESPONSIBLE AI

Include:

* privacy
* personal data
* sensitive information
* confidential work
* copyright
* attribution
* misinformation
* hallucinations
* human review

OpenAI's current AI Fundamentals curriculum explicitly includes responsible and safe AI use, so this should remain a core foundation rather than an afterthought.

---

# 47. TOOL FRESHNESS

AI tools change fast.

Therefore:

Do not make durable curriculum depend on:

* a particular button location
* a temporary feature name
* a short-lived model name
* pricing
* temporary UI behavior

Teach principles first.

Tool-specific lessons should be treated as current references.

---

# 48. RESOURCE VERIFICATION

Because your OpenCode environment cannot browse the internet, do not ask OpenCode to discover unknown URLs.

Use the URLs supplied in this prompt and the URLs already present in the repository.

However, before writing them to the final data structure:

* inspect the URL string
* avoid duplicates
* ensure it is a normal HTTPS URL
* keep the exact URL
* mark it `free: true` only where free access is confirmed by this specification/source
* do not fabricate video IDs

For any resource whose exact live URL is not confidently known, do NOT invent one.

Instead, locate it from an existing repository resource if available.

If no verified URL exists, skip it and report it.

---

# 49. YOUTUBE

You may add verified YouTube videos if:

* exact URL is known
* channel is identifiable
* video is instructional
* video is relevant
* content remains useful
* video is free
* no paid course is required to understand it

Prefer official channels.

Potential source channels:

* OpenAI
* Anthropic
* GitHub
* Microsoft
* Google
* official tool providers

Do not manufacture YouTube URLs.

Do not guess YouTube IDs.

If you cannot verify the exact URL from repository data or this prompt, do not add the video.

---

# 50. RESOURCE TYPES

Use existing ResourceType values.

For example:

```text
docs
video
practice
book
tool
community
```

Do not create a new resource type unless the current repository requires it.

---

# 51. RESOURCE DESCRIPTIONS

Every resource description should explain:

* what it teaches
* why the learner should use it
* which stage it supports

Example:

Bad:

"Learn AI here."

Good:

"Official beginner course covering AI fundamentals, LLM basics, prompting, context, output review, and responsible AI use. Use it alongside Stage 1 before taking the foundation quiz."

---

# 52. PROJECT DESCRIPTIONS

Every project description should contain:

* what the learner is building
* why it matters
* what skill it proves

Example:

### AI Task Triage

You will analyze ten real-world tasks and decide whether AI, search, code, automation, traditional software, or human judgment is the right tool. The project teaches you how to choose tools based on the problem rather than defaulting to a chatbot.

---

# 53. ACCEPTANCE TESTING

After implementation, test:

### Navigation

* AI appears beside existing categories
* Build still works
* Grow still works
* Design still works
* Analyze still works

### AI page

* AI category page loads
* tracks render
* resources render
* projects render

### Guided path

* gated content follows existing premium/pro behavior
* guided AI path works
* lessons render
* resources open
* quizzes render
* quiz options are selectable
* correct answer scoring works
* explanations appear
* project links work
* checkpoints work
* progress works

### SEO

* AI routes have metadata
* search intents compile
* journey graph compiles
* no duplicated intent ownership
* internal links resolve

### Build

Run:

```bash
npm run lint
npm run type-check
npm run build
```

or the actual equivalent commands found in the repository.

Fix errors caused by this implementation.

Do not randomly rewrite unrelated code.

---

# 54. FINAL REPORT

After making changes, report:

## Files changed

List exact files.

## AI category

List:

* category ID
* tracks
* roadmap IDs
* stages

## Projects

List all projects added.

## Resources

List:

* title
* provider
* URL
* stage
* type
* free status

## YouTube

List every YouTube video actually added.

Do NOT claim videos were added if exact URLs could not be verified.

## Quizzes

Give:

* number of AI quiz questions
* number of stages with quizzes
* number of projects

## SEO

Give:

* number of AI search intents added
* clusters
* target pages
* journey additions

## Paid access

Explain how the existing paid/pro architecture now gates guided AI learning.

## Verification

Report:

* lint
* type-check
* build
* tests if available

## Problems

Explicitly state anything you could not implement because the existing repository architecture does not support it.

---

# 55. FINAL ABSOLUTE RULE

Do not hallucinate.

If something is already implemented:

USE IT.

If something is not implemented:

INSPECT THE REPOSITORY.

If the repository supports it:

EXTEND IT.

If the repository does not support it:

MAKE THE SMALLEST COMPATIBLE CHANGE.

If you cannot safely implement something:

DO NOT PRETEND.

Report it.

The goal is not to build the most elaborate AI system.

The goal is to build the **best AI learning category that fits TechSkillHub's existing architecture**.

The final learner experience should be:

```text
Discover AI
↓
Understand AI
↓
Learn AI
↓
Practice AI
↓
Answer practical MCQs
↓
Build projects
↓
Track progress
↓
Unlock the next skill
```

And the final platform structure should be:

```text
Build
Grow
Design
Analyze
AI
```

AI is a new category.

It does not replace the existing platform.

It strengthens it.
