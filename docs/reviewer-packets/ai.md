# Reviewer packet — AI for Work & Productivity

- **Track id:** `ai`  ·  **Slug:** `ai-for-work`  ·  **Category:** grow  ·  **AI track:** no
- **Status:** ⏳ AWAITING INDEPENDENT HUMAN REVIEW — **not approved**.
- **Automated evidence (not approval):** readiness 99.1/100 · worthiness 98.1/100 · mandatory gates pass. A passing mechanical audit is not human sign-off.

> This packet contains internal answer keys and rubric criteria for review purposes. It includes only short original excerpts of external resources; no third-party material is reproduced in full.

## 1. Learning objectives and sequence

| # | Stage | Objective | Est. time | Lessons |
| --- | --- | --- | --- | --- |
| 1 | Understanding AI Tools | Choose AI tools based on what they can and cannot do. | 1 week | 4 |
| 2 | Prompt Engineering | Write instructions that produce reliable results. | 2 to 3 weeks | 5 |
| 3 | AI for Your Field | Apply AI effectively within your own field. | Ongoing | 4 |
| 4 | AI Ethics & Verification | Use AI responsibly with verification and privacy in mind. | 1 to 2 weeks | 4 |

## 2. Representative and high-risk lessons

Representative lessons (first, middle, last so a reviewer sees the whole arc): stages 1, 3, 4.

Highest-risk lessons by resource evidence (verify these first):

- **Stage 1 — Understanding AI Tools**: content-inspected required resources 1, objective-matching resources 1, playback-verified resources 0.
- **Stage 2 — Prompt Engineering**: content-inspected required resources 2, objective-matching resources 0, playback-verified resources 0.
- **Stage 3 — AI for Your Field**: content-inspected required resources 1, objective-matching resources 0, playback-verified resources 0.

## 3. External resource evidence (destination + inspected content)

### Stage 1 — Understanding AI Tools

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| IBM — What is Artificial Intelligence (AI)? | required | L3 | content-inspection | — | 2 | https://www.ibm.com/think/topics/artificial-intelligence |
| Intro to Large Language Models | required | L2 | http-probe | — | 0 | https://www.youtube.com/watch?v=zjkBMFhNj_g |
| Neural Networks, 3Blue1Brown | required | L2 | http-probe | — | 0 | https://www.youtube.com/watch?v=aircAruvnKk |
- _L3 required evidence — IBM: “Get hands-on experience with IBM tech Join one of the largest technical IBM community gatherings What is artificial intelligence (AI)? Published 09 August 2024 Updated 02 October 2026 By Cole Stryker and Eda Kavlakoglu …”_

### Stage 2 — Prompt Engineering

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Learn Prompting | required | L3 | content-inspection | — | 0 | https://learnprompting.org |
| Prompt Engineering Guide | required | L3 | content-inspection | — | 0 | https://www.promptingguide.ai |
- _L3 required evidence — Learn Prompting: “Learn, Apply, & Get Certified in Gain cutting-edge AI knowledge with hands-on, research-backed courses that solve real-world problems. Start Learning For Free For Businesses Trusted by the world's biggest companies and …”_
- _L3 required evidence — DAIR.AI: “Prompt Engineering Prompt Engineering Guide Prompt engineering is a relatively new discipline for developing and optimizing prompts to efficiently use language models (LMs) for a wide variety of applications and researc…”_

### Stage 3 — AI for Your Field

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| DeepLearning.AI Short Courses | required | L3 | content-inspection | — | 0 | https://www.deeplearning.ai/short-courses |
- _L3 required evidence — DeepLearning.AI: “AI Courses Grow your AI career with foundational specializations and skill-specific short courses taught by leaders in the field. Most Popular Course DeepLearning.AI AI Prompting for Everyone AI Prompting for Everyone B…”_

### Stage 4 — AI Ethics & Verification

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| fast.ai Practical Data Ethics | required | L3 | content-inspection | — | 1 | https://ethics.fast.ai |
- _L3 required evidence — fast.ai: “ethics Overview Syllabus Lesson 1- Disinformation Lesson 2- Bias and Fairness Lesson 3- Foundations of Ethics and Ethics Toolkit Lesson 4- Privacy and Surveillance Lesson 5- Our Ecosystem, Metrics, and Venture Capital L…”_

## 4. Required video segments and measured duration

| Stage | Video | Level | Published duration | Required segment |
| --- | --- | --- | --- | --- |
| 1 | Intro to Large Language Models | L2 | not verified | not verified — review manually |
| 1 | Neural Networks, 3Blue1Brown | L2 | not verified | not verified — review manually |

⚠️ Playback and runtime could not be verified from this environment (no unauthenticated transcript/runtime source). **A human must confirm runtime, the required 5–15 min segment (max 20 min uninterrupted) and that the segment teaches the objective.**

## 5. Knowledge checks and answer keys (internal)

### Stage 1 — Understanding AI Tools (3 questions)

1. What is a large language model fundamentally doing when it responds?
   - · Looking up a stored answer
   - **✔ Predicting likely next text tokens from patterns learned in training**
   - · Searching the live web by default
   - · Running your code
   - _Why:_ LLMs generate text by predicting likely continuations from training patterns. · _level: understand_
2. A model states a confident statistic with no source. What should you assume?
   - · It is correct
   - **✔ It may be a hallucination and must be verified**
   - · It came from a trusted database
   - · It cannot be wrong
   - _Why:_ Fluent confidence is not evidence; verify claims, especially numbers. · _level: evaluate_
3. When is a traditional tool better than an LLM?
   - · Writing a poem
   - **✔ Calculating a precise, auditable result**
   - · Brainstorming names
   - · Summarising a document
   - _Why:_ For exact, auditable computation, use deterministic tools. · _level: apply_

### Stage 2 — Prompt Engineering (3 questions)

1. What is few-shot prompting?
   - · Repeating the same request
   - **✔ Providing a few examples of the desired input/output in the prompt**
   - · Running the prompt many times
   - · Using a paid model
   - _Why:_ Few-shot prompting demonstrates the desired pattern with examples. · _level: understand_
2. Why ask a model to reason step by step on a complex task?
   - · It is faster
   - **✔ It often improves accuracy on multi-step problems**
   - · It reduces cost
   - · It hides errors
   - _Why:_ Explicit reasoning steps help models avoid jumping to a wrong answer. · _level: apply_
3. What is the role of a system prompt?
   - · To store the answer
   - **✔ To set persistent instructions and persona that shape all responses**
   - · To log usage
   - · To encrypt output
   - _Why:_ A system prompt sets durable context and behaviour for the model. · _level: understand_

### Stage 3 — AI for Your Field (3 questions)

1. You ask an AI coding assistant for a function. Before using it you should…
   - · Ship it
   - **✔ Read it, test it, and check edge cases**
   - · Only check formatting
   - · Ask a second AI
   - _Why:_ Generated code must be understood and tested before use. · _level: evaluate_
2. An AI data tool produces a summary chart. Why verify it?
   - · Charts are always wrong
   - **✔ The tool may mis-handle the data or the request; confirm the computation**
   - · It is slower
   - · To reduce costs
   - _Why:_ Generated analyses can misread data; verify the computation. · _level: analyze_
3. AI is best used in a design workflow to…
   - · Replace user research
   - **✔ Explore options quickly while you apply judgement and test with users**
   - · Finalise without review
   - · Ignore accessibility
   - _Why:_ AI accelerates exploration; humans keep judgement, research and accessibility. · _level: understand_

### Stage 4 — AI Ethics & Verification (3 questions)

1. Before sharing AI-generated content publicly, you should…
   - · Publish immediately
   - **✔ Fact-check the claims and confirm you can stand behind them**
   - · Add a disclaimer only
   - · Shorten it
   - _Why:_ Responsibility for published claims stays with you. · _level: evaluate_
2. Why avoid pasting confidential client data into a public AI tool?
   - · It slows the tool
   - **✔ It may be stored or used in ways that breach confidentiality**
   - · It increases cost
   - · It is technically impossible
   - _Why:_ Data sent to external tools may leave your control, breaching confidentiality. · _level: evaluate_
3. "Thinking before prompting" means…
   - · Writing longer prompts
   - **✔ Deciding the goal, what you need, and how you will verify the result first**
   - · Using a bigger model
   - · Copying a prompt
   - _Why:_ Clarity about goal and verification improves results and reduces risk. · _level: understand_

## 6. AI-verified mastery assessment rubric

### Stage 1 — project `ai-p1` (rubric rizw7jo-8)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| A public, inspectable source artifact is provided | 1 | yes |
| Relevant implementation is present (not an empty or unrelated repository) | 2 | yes |
| A meaningful README explains the project | 1 | yes |
| The written explanation describes the actual submitted work | 1 | yes |
| The core behaviour works as described | 1 | no |
| At least one edge case is handled | 1 | no |
| You can explain each significant decision you made | 1 | no |
| The project is documented well enough for someone else to run it | 1 | no |

- Pass threshold: 0.8. Requires source inspection: yes; written explanation: yes.

### Stage 2 — project `ai-p2` (rubric rizw7jo-8)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| A public, inspectable source artifact is provided | 1 | yes |
| Relevant implementation is present (not an empty or unrelated repository) | 2 | yes |
| A meaningful README explains the project | 1 | yes |
| The written explanation describes the actual submitted work | 1 | yes |
| The core behaviour works as described | 1 | no |
| At least one edge case is handled | 1 | no |
| You can explain each significant decision you made | 1 | no |
| The project is documented well enough for someone else to run it | 1 | no |

- Pass threshold: 0.8. Requires source inspection: yes; written explanation: yes.

### Stage 3 — project `ai-p4` (rubric rkxxxc-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| A public, inspectable source artifact is provided | 1 | yes |
| Relevant implementation is present (not an empty or unrelated repository) | 2 | yes |
| A meaningful README explains the project | 1 | yes |
| The written explanation describes the actual submitted work | 1 | yes |
| Each workflow produces a usable output from a defined input | 1 | no |
| Each includes a review step | 1 | no |
| Failure examples are genuine and the fix is explained | 1 | no |

- Pass threshold: 0.8. Requires source inspection: yes; written explanation: yes.

### Stage 4 — project `ai-p3` (rubric rizw7jo-8)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| A public, inspectable source artifact is provided | 1 | yes |
| Relevant implementation is present (not an empty or unrelated repository) | 2 | yes |
| A meaningful README explains the project | 1 | yes |
| The written explanation describes the actual submitted work | 1 | yes |
| The core behaviour works as described | 1 | no |
| At least one edge case is handled | 1 | no |
| You can explain each significant decision you made | 1 | no |
| The project is documented well enough for someone else to run it | 1 | no |

- Pass threshold: 0.8. Requires source inspection: yes; written explanation: yes.

## 7. Phase projects and acceptance criteria

### Stage 1 — Build: Personal Prompt Library

- **Objective:** Complete "Personal Prompt Library" to a standard you can show and explain to someone else.
- **Problem:** A real foundation problem that demonstrates the skills in this phase.
- **Audience:** A specific user or stakeholder you can name.
- **Required functionality:**
  - Implement the core behaviour described in the project
  - Handle at least one edge case or failure
  - Document how to run it
- **Acceptance criteria:**
  - The core behaviour works as described
  - At least one edge case is handled
  - You can explain each significant decision you made
  - The project is documented well enough for someone else to run it
- **Required evidence:**
  - A repository or design file link
  - A short written summary of the problem and solution
  - Evidence of testing or validation where relevant
- **Constraints:**
  - Use only tools introduced in the prerequisite lessons
  - Do not copy a tutorial step-for-step

### Stage 2 — Build: AI Research Report

- **Objective:** Complete "AI Research Report" to a standard you can show and explain to someone else.
- **Problem:** A real applied problem that demonstrates the skills in this phase.
- **Audience:** A specific user or stakeholder you can name.
- **Required functionality:**
  - Implement the core behaviour described in the project
  - Handle at least one edge case or failure
  - Document how to run it
- **Acceptance criteria:**
  - The core behaviour works as described
  - At least one edge case is handled
  - You can explain each significant decision you made
  - The project is documented well enough for someone else to run it
- **Required evidence:**
  - A repository or design file link
  - A short written summary of the problem and solution
  - Evidence of testing or validation where relevant
- **Constraints:**
  - Use only tools introduced in the prerequisite lessons
  - Do not copy a tutorial step-for-step

### Stage 3 — Build: Field AI Workflow Playbook

- **Objective:** Create three documented AI workflows that fit the learner's actual work.
- **Problem:** Generic AI advice does not translate into repeatable, field-specific work.
- **Audience:** The learner's own professional context and a reviewer in the same field.
- **Required functionality:**
  - Three recurring tasks from the learner's field
  - For each: task definition, context template, instructions, expected output, and a review checklist
  - A logged failure example per workflow with the fix
- **Acceptance criteria:**
  - Each workflow produces a usable output from a defined input
  - Each includes a review step
  - Failure examples are genuine and the fix is explained
- **Required evidence:**
  - A playbook document with the three workflows
  - Input/output examples
  - A failure log with corrections
- **Constraints:**
  - Do not use confidential or unapproved data
  - Each workflow must be re-runnable by someone else

### Stage 4 — Portfolio project: AI-Integrated App

- **Objective:** Complete "AI-Integrated App" to a standard you can show and explain to someone else.
- **Problem:** A real portfolio problem that demonstrates the skills in this phase.
- **Audience:** A specific user or stakeholder you can name.
- **Required functionality:**
  - Implement the core behaviour described in the project
  - Handle at least one edge case or failure
  - Document how to run it
- **Acceptance criteria:**
  - The core behaviour works as described
  - At least one edge case is handled
  - You can explain each significant decision you made
  - The project is documented well enough for someone else to run it
- **Required evidence:**
  - A repository or design file link
  - A short written summary of the problem and solution
  - Evidence of testing or validation where relevant
- **Constraints:**
  - Use only tools introduced in the prerequisite lessons
  - Do not copy a tutorial step-for-step

## 8. Worked examples

- **Stage 1:** Choose and evaluate an AI tool for a task. Step 1: write the task in one sentence. Step 2: pick two tools that could do it. Step 3: run the same input through both. Step 4: compare output quality, cost and data handling…
- **Stage 2:** Engineer a prompt deliberately. Step 1: state the role, the task and the output format. Step 2: provide the minimum context needed. Step 3: run it and note where the output drifts. Step 4: add one constraint and re-run …
- **Stage 3:** Build a workflow for your own field. Step 1: pick a recurring task in your work. Step 2: write the input template and the instruction. Step 3: define the review step and what you check before using the output. Step 4: l…
- **Stage 4:** Verify AI output before using it. Step 1: identify any factual claims. Step 2: check each against a primary source. Step 3: look for bias, missing context or fabricated references. Step 4: record the verification and no…

## 9. Outstanding verification limitations

Resources whose content could not be inspected automatically (verify manually or replace):

- Stage 1 — required (L2): https://www.youtube.com/watch?v=zjkBMFhNj_g
- Stage 1 — required (L2): https://www.youtube.com/watch?v=aircAruvnKk

- Level-4 evidence (video playback / interactive use) is **not** available for any resource in this environment.

## 10. Areas requiring human review

- **Subject matter:** factual accuracy, currency and depth of each lesson, resource and knowledge check.
- **Pedagogy:** whether the worked example and resource actually prepare the learner for the knowledge check and project.
- **Accessibility:** captions/transcripts, contrast, keyboard use and screen-reader behaviour of the learning UI.
- **Assessment quality:** plausibility of distractors, whether questions test understanding rather than recall, fairness of rubric weights and the pass threshold.
- **Sign-off:** record a genuine, named review in `docs/curriculum-quality-signoff.json`. No track is approved until then.

## 11. Exact criteria for passing

A track becomes **premium-approved** only when ALL of the following hold. Failing any one blocks approval, even when the aggregate scores are high. 90 is a floor per score, not compensation for a failed gate.

- Mechanical: readiness ≥ 90 (this track: 99.1) **and** worthiness ≥ 90 (this track: 98.1).
- Mandatory quality gates: all pass (this track: pass).
- Every stage: at least one required resource verified to content-inspected (level 3) or better.
- Every stage: a valid knowledge check with a correct answer key, plausible distractors and server-side grading.
- Every progression-bearing section: an AI-verified mastery rubric anchored to the section objective, with source inspection where required.
- Every phase: a project with a brief, required evidence and acceptance criteria.
- A genuine, named **human** sign-off in `docs/curriculum-quality-signoff.json`.

**Would fail review if:** a required resource 404s or teaches a different objective; an answer key is wrong; a rubric can be passed without the required evidence; a mandatory criterion is waived by a high aggregate score; a project has no acceptance criteria or evidence; or a video is claimed watched without playback verification.

