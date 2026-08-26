# AI Learning Task → Resource Audit

## Purpose

This audit checks every current AI practice-stage competency against the actual teaching material already present in the repository. A learner must not be told to learn, research, compare, practice, or build a skill without a clear prerequisite lesson or verified free resource.

## Audit rule

A task is **Complete** only when the learner can answer: “Where was this skill taught?” with a specific TechSkillHub lesson or a specific verified free resource attached to the stage before the task.

Status values:
- **Covered** — a stage-specific TechSkillHub lesson and/or mapped free resource teaches the competency.
- **Partial** — related material exists, but it is generic, indirect, or not mapped to the exact stage.
- **Gap** — the task introduces a material competency without an adequate preceding teaching resource.

## Findings by AI path

### AI Foundations

1. Classify the task before choosing the tool — **Partial**. Stage lesson covers tool selection conceptually; no dedicated resource is mapped to stage 1 for search vs AI vs traditional tooling.
2. Compare two AI tools — **Partial**. Stage 2 has the competency objective but no dedicated resource mapped to stage 2; current supplemental resources are concentrated on stages 1 and 3.
3. Turn a vague request into a professional instruction — **Covered**. Stage 3 has Microsoft Generative AI material plus the authored TechSkillHub lesson.
4. Use AI as a reasoning partner — **Partial**. Authored lesson exists, but no stage-specific external teaching resource is mapped to stage 4.
5. Verify a fluent but uncertain answer — **Partial**. Authored lesson exists, but no stage-specific external resource is mapped to stage 5.
6. Design a repeatable AI workflow — **Partial**. Authored lesson exists, but no stage-specific external resource is mapped to stage 6.

### AI for Work

1. Improve a real work message — **Covered/Partial**. OpenAI Academy workplace guidance is available at stage 1.
2. Turn a long document into an action brief — **Partial**. The current resource map is not tightly aligned to document analysis for this exact stage.
3. Build a learning workflow — **Gap/Partial**. No dedicated stage resource teaches AI-as-tutor practice before the task.
4. Design an AI-assisted weekly workflow — **Partial**. Concepts are covered by authored lesson, but not by a tightly mapped stage resource.
5. Design a responsible workplace AI workflow — **Covered/Partial**. Microsoft/OpenAI material is available, but the stage mapping is broader than the exact competency.

### AI Research

1. Choose AI or search — **Partial**. Google Scholar and general AI fundamentals are available, but tool-selection teaching is not tightly staged.
2. Build a research brief — **Gap/Partial**. No direct stage resource teaches the exact AI-assisted research-planning workflow.
3. Evaluate source quality — **Partial**. Google Scholar is available at stage 3, but the learner also needs explicit instruction on authority, primary evidence, currency, and methodology.
4. Audit an AI-generated report — **Gap/Partial**. The authored lesson teaches verification, but no dedicated stage resource prepares the learner for report auditing.
5. Build a repeatable research workflow — **Gap**. No direct stage resource teaches the full reusable workflow before the task.

### AI Content

1. Define the audience before generating — **Partial**. OpenAI/Canva material exists, but no dedicated resource directly teaches audience/problem/promise framing for AI content.
2. Research before drafting — **Partial**. General AI material exists; dedicated content-research instruction is not stage-specific.
3. Build and edit an AI-assisted draft — **Covered/Partial**. Microsoft Generative AI for Beginners plus authored lesson provide related teaching.
4. Create a visual direction board — **Covered/Partial**. Canva Design School is mapped to stage 4.
5. Build a repeatable content production workflow — **Gap/Partial**. No dedicated stage resource teaches the end-to-end production workflow.

### AI YouTube

1. Analyze a channel before copying its format — **Partial**. The authored lesson gives the method; no stage-specific official YouTube teaching resource is mapped to stage 1.
2. Validate a YouTube topic — **Gap/Partial**. The current resource set starts with analytics/policy and does not directly teach topic validation.
3. Turn research into an original script — **Partial**. Microsoft series is mapped to stage 3 but is broader than YouTube scripting.
4. Create a production plan — **Gap/Partial**. No stage-specific resource teaches production planning and asset rights/disclosure checks.
5. Edit for retention and clarity — **Gap/Partial**. Analytics resource is later; no dedicated editing/retention teaching resource is mapped to stage 5.
6. Evaluate packaging — **Gap**. No dedicated resource teaches title/thumbnail promise alignment before the practice task.
7. Use analytics to form a hypothesis — **Covered**. YouTube Creator Academy analytics resource is directly mapped to stage 9/10 area, but stage mapping should be reconciled because the practice task is stage 7.

Additional YouTube stage objectives exist for policy, disclosure, analytics, retention, editorial ownership and operating a sustainable channel; the mapping must be reconciled against those exact stages.

### AI Software Development

1. Decompose a coding task before prompting — **Partial**. GitHub Copilot/Codex material exists later in the path, not tightly at the first competency.
2. Review generated code — **Partial**. Official coding-assistant documentation exists, but code-review teaching is not sufficiently staged.
3. Debug with evidence — **Gap/Partial**. No dedicated resource teaches AI-assisted evidence-driven debugging before the task.
4. Compare AI coding tools — **Gap/Partial**. Tools are documented, but the comparison/evaluation method is not taught explicitly.
5. Constrain an agent — **Partial**. Agent/tool documentation exists, but boundary design needs direct teaching before practice.
6. Test generated code — **Gap/Partial**. No dedicated resource teaches test-first/AI-generated-test verification at this stage.
7. Build one feature end-to-end with AI assistance — **Partial**. Multiple official resources exist, but the professional loop is mainly authored by TechSkillHub.

### AI Automation

1. Identify an automation candidate — **Covered/Partial**. n8n materials provide the tool foundation; process-selection reasoning is mainly authored.
2. Draw the workflow before building — **Covered** by n8n documentation/courses, but stage linkage should be explicit.
3. Specify an API contract — **Partial**. n8n documentation is available, but API contract design is not directly taught.
4. Design for failure — **Gap/Partial**. No dedicated failure/recovery resource is mapped before the task.
5. Place AI inside automation — **Partial**. Microsoft generative AI/agent resources exist, but the deterministic-vs-probabilistic design principle is mainly authored.

### AI Agents

1. Distinguish agent, workflow, and chatbot — **Covered/Partial**. Microsoft/OpenAI agent materials exist.
2. Define tool boundaries — **Partial**. Agent resources cover tools, but explicit permission-boundary design is mainly authored.
3. Design an agent evaluation — **Gap/Partial**. No dedicated evaluation resource is mapped before the task.

### AI Engineering

1. Choose the model for the task — **Partial**. OpenAI/Anthropic docs exist, but comparative model evaluation is mainly authored.
2. Define structured output — **Partial**. API docs exist; direct teaching of structured-output reliability is not tightly stage-mapped.
3. Design a retrieval plan — **Partial**. Microsoft/LangChain materials cover RAG broadly, but retrieval planning is not directly staged.
4. Create an AI evaluation set — **Gap/Partial**. Evaluation is discussed in the curriculum but lacks a dedicated learning resource before practice.

### AI Design

1. Choose where AI helps a design workflow — **Partial**. Canva/Figma resources exist, but workflow-design judgment is mostly authored.
2. Explore and evaluate UI directions — **Partial**. Figma/Canva material exists, but explicit evaluation methodology is mostly authored.
3. Refine an AI-generated visual — **Partial**. Canva and Microsoft resources cover visual generation, but refinement against a design brief is not directly taught.

## Highest-priority gaps

The clearest resource-completeness failures are:

1. AI Research: research brief, report audit, repeatable workflow.
2. AI YouTube: topic validation, production planning, packaging, retention editing.
3. AI Software Development: evidence-driven debugging, test verification, AI-tool comparison.
4. AI Agents: evaluation design.
5. AI Engineering: evaluation sets and structured-output reliability.
6. AI Foundations: stage 4–6 tool/verification/workflow resources.
7. AI Work: learning workflow and document-to-brief practice.

## Important architecture finding

The current `ai-guided-path.ts` injects a TechSkillHub-authored lesson, then mapped resources, then practice tasks, then the mastery quiz. That is structurally correct, but the resource map is sparse for several later-stage competencies. A later-stage practice task can therefore appear after a generic authored lesson without a dedicated, verified free resource teaching the exact skill.

## Phase 1 conclusion

The AI curriculum is **not resource-complete yet**. The implementation should not add more practice tasks until the identified gaps are filled or the task is rewritten so it relies only on a competency already explicitly taught.
