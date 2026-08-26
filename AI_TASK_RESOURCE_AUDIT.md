# AI Learning Task → Resource Audit

## Purpose

This audit checks every current AI practice-stage competency against the actual teaching material present in the repository. A learner must not be asked to learn, research, compare, practice, or build a skill without a clear prerequisite lesson or verified free resource.

## Phase 3 rule

A task is **Complete** when the learner can answer “Where was this skill taught?” with either:

1. a specific TechSkillHub-authored lesson immediately before the task; or
2. a specific free authoritative resource attached to that stage.

The sequence is intentional: **TechSkillHub lesson → targeted reinforcement → practice → mastery check**. We do not add multiple links merely to make a stage look full.

## Phase 3 remediation status

### AI Foundations

1. Classify the task before choosing the tool — **Covered** by the stage lesson and Microsoft Learn reinforcement.
2. Compare two AI tools — **Covered** by Microsoft Learn generative-AI material plus the stage lesson.
3. Turn a vague request into a professional instruction — **Covered** by the authored lesson and OpenAI Academy prompting guidance.
4. Use AI as a reasoning partner — **Covered** by the authored lesson and prompting reinforcement.
5. Verify a fluent but uncertain answer — **Covered** by the authored verification lesson and OpenAI Evals reference.
6. Design a repeatable AI workflow — **Covered** by the authored lesson and the existing AI-workflow material.

### AI for Work

1. Improve a real work message — **Covered** by the authored lesson and OpenAI Academy guidance.
2. Turn a long document into an action brief — **Covered** by the authored lesson plus OpenAI's practical file/workflow guidance.
3. Build a learning workflow — **Covered** by the authored lesson plus Microsoft prompting/AI-agent learning material.
4. Design an AI-assisted weekly workflow — **Covered** by the authored lesson and practical workflow guidance.
5. Design a responsible workplace AI workflow — **Covered** by Microsoft responsible-AI guidance and the authored lesson.

### AI Research

1. Choose AI or search — **Covered** by the authored tool-selection lesson and Cornell's research-strategy guidance.
2. Build a research brief — **Covered** by Cornell's research-strategy guide plus the authored research lesson.
3. Evaluate source quality — **Covered** by Cornell's source-evaluation guidance and Google Scholar.
4. Audit an AI-generated report — **Covered** by the authored verification lesson plus Cornell source-evaluation guidance.
5. Build a repeatable research workflow — **Covered** by Cornell's step-by-step research strategy and the authored workflow lesson.

### AI Content

1. Define the audience before generating — **Covered** by the authored content lesson and OpenAI prompting guidance.
2. Research before drafting — **Covered** by the authored lesson and research workflow material.
3. Build and edit an AI-assisted draft — **Covered** by the authored lesson and Microsoft Generative AI for Beginners.
4. Create a visual direction board — **Covered** by Canva Design School and the authored lesson.
5. Build a repeatable content production workflow — **Covered** by the authored workflow lesson and OpenAI Academy practical workflow guidance.

### AI YouTube

1. Analyze a channel before copying its format — **Covered** by the authored analysis lesson and YouTube's guidance on audience/content patterns.
2. Validate a YouTube topic — **Covered** by YouTube Trends and audience-content guidance.
3. Turn research into an original script — **Covered** by the authored scripting lesson and the existing generative-AI material.
4. Create a production plan — **Covered** by YouTube's sustainable-content guidance and the authored production lesson.
5. Edit for retention and clarity — **Covered** by the authored editing lesson plus YouTube audience/analytics guidance.
6. Evaluate packaging — **Covered** by YouTube's official title and thumbnail guidance.
7. Use analytics to form a hypothesis — **Covered** by YouTube audience analytics guidance.

### AI Software Development

1. Decompose a coding task before prompting — **Covered** by the authored decomposition lesson and GitHub Copilot documentation.
2. Review generated code — **Covered** by GitHub's official code-review documentation.
3. Debug with evidence — **Covered** by the authored debugging lesson plus GitHub's review/validation workflow.
4. Compare AI coding tools — **Covered** by the authored comparison framework plus official GitHub documentation.
5. Constrain an agent — **Covered** by the authored boundary lesson and GitHub custom review instructions.
6. Test generated code — **Covered** by the authored testing lesson and GitHub's review guidance.
7. Build one feature end-to-end with AI assistance — **Covered** by the authored professional workflow plus GitHub Copilot/Codex material.

### AI Automation

1. Identify an automation candidate — **Covered** by the authored process-selection lesson and n8n documentation.
2. Draw the workflow before building — **Covered** by n8n documentation/courses.
3. Specify an API contract — **Covered** by the authored contract lesson and n8n documentation.
4. Design for failure — **Covered** by n8n error-handling documentation.
5. Place AI inside automation — **Covered** by the authored deterministic-vs-probabilistic design lesson and responsible-AI guidance.

### AI Agents

1. Distinguish agent, workflow, and chatbot — **Covered** by Microsoft/OpenAI agent material and the authored lesson.
2. Define tool boundaries — **Covered** by the authored boundary lesson plus Microsoft responsible-AI guidance.
3. Design an agent evaluation — **Covered** by OpenAI Evals documentation and the authored evaluation lesson.

### AI Engineering

1. Choose the model for the task — **Covered** by the authored model-selection lesson and official API documentation.
2. Define structured output — **Covered** by the authored reliability lesson and OpenAI Structured Outputs documentation.
3. Design a retrieval plan — **Covered** by the authored retrieval lesson and LangChain retrieval/application documentation.
4. Create an AI evaluation set — **Covered** by the authored evaluation lesson and OpenAI Evals documentation.

### AI Design

1. Choose where AI helps a design workflow — **Covered** by the authored workflow lesson and Canva Design School.
2. Explore and evaluate UI directions — **Covered** by the authored evaluation lesson and Figma documentation.
3. Refine an AI-generated visual — **Covered** by the authored refinement lesson and Canva Design School.

## Architecture

`lib/ai-guided-path.ts` now injects the Phase 3 instructional-gap resources immediately after the stage lesson and before practice. Existing curriculum resources still pass through the central AI resource QA layer. This preserves the learning order rather than dumping every resource at the end of a track.

## Quality rule going forward

Do not add another external link just because a task exists. First ask:

- Is the competency fundamental? If yes, teach it in TechSkillHub.
- If external reinforcement materially improves the lesson, use one authoritative free source.
- Add a second source only when it covers a genuinely different need.
- Never make paid API/tool usage a prerequisite for completing a learning task.
- Re-audit the exact stage mapping whenever a task or resource is moved.

## Phase 3 conclusion

The previously identified AI instructional gaps have now been remediated in the guided-path implementation. The next audit should focus on **resource quality and task-to-resource precision**, not simply resource quantity.
