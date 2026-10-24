# AI for Work & Productivity (`ai`)

Slug: `ai-for-work` · Category: grow · Stages: 4

## Stage 1 — Understanding AI Tools

**Objective:** Choose AI tools based on what they can and cannot do.

**Success criteria:**
- Explain what an LLM is
- Identify limitations
- Choose when not to use AI

### Instruction

Before using AI effectively, you must understand what it is, and critically, what it cannot do.

OBJECTIVE
Choose AI tools based on what they can and cannot do.

SUCCESS CRITERIA
• Explain what an LLM is
• Identify limitations
• Choose when not to use AI

WORKED EXAMPLE
Choose and evaluate an AI tool for a task. Step 1: write the task in one sentence. Step 2: pick two tools that could do it. Step 3: run the same input through both. Step 4: compare output quality, cost and data handling, and justify your choice in writing.

COMMON MISTAKES
• Trusting fluent output as fact
• Using AI for tasks needing current, verifiable data without verification

### Worked example

Choose and evaluate an AI tool for a task. Step 1: write the task in one sentence. Step 2: pick two tools that could do it. Step 3: run the same input through both. Step 4: compare output quality, cost and data handling, and justify your choice in writing.

### Common mistakes
- Trusting fluent output as fact
- Using AI for tasks needing current, verifiable data without verification

### Ungraded practice
**Practice: Understanding AI Tools**

DO THIS NOW
For three tasks, decide whether an LLM, a traditional tool, or a person is best, and justify each choice in one sentence.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. What is a large language model fundamentally doing when it responds?
   - Looking up a stored answer
   - **✔ Predicting likely next text tokens from patterns learned in training**
   - Searching the live web by default
   - Running your code
   - _Answer:_ Predicting likely next text tokens from patterns learned in training · _Why:_ LLMs generate text by predicting likely continuations from training patterns. · _Level:_ understand

2. A model states a confident statistic with no source. What should you assume?
   - It is correct
   - **✔ It may be a hallucination and must be verified**
   - It came from a trusted database
   - It cannot be wrong
   - _Answer:_ It may be a hallucination and must be verified · _Why:_ Fluent confidence is not evidence; verify claims, especially numbers. · _Level:_ evaluate

3. When is a traditional tool better than an LLM?
   - Writing a poem
   - **✔ Calculating a precise, auditable result**
   - Brainstorming names
   - Summarising a document
   - _Answer:_ Calculating a precise, auditable result · _Why:_ For exact, auditable computation, use deterministic tools. · _Level:_ apply

### Phase project — Build: Personal Prompt Library (`ai-p1`)

- **Objective:** Complete "Personal Prompt Library" to a standard you can show and explain to someone else.
- **Problem:** A real foundation problem that demonstrates the skills in this phase.
- **Audience:** A specific user or stakeholder you can name.
- **Required functionality:**
  - Implement the core behaviour described in the project
  - Handle at least one edge case or failure
  - Document how to run it
- **Constraints:**
  - Use only tools introduced in the prerequisite lessons
  - Do not copy a tutorial step-for-step
- **Acceptance criteria (brief):**
  - The core behaviour works as described
  - At least one edge case is handled
  - You can explain each significant decision you made
  - The project is documented well enough for someone else to run it
- **Required evidence:**
  - A repository or design file link
  - A short written summary of the problem and solution
  - Evidence of testing or validation where relevant
- **Rubric version:** rizw7jo-8 · **Pass threshold:** 0.8 · **Source inspection:** yes
- **Rubric:**
  - A public, inspectable source artifact is provided (weight 1, mandatory)
  - Relevant implementation is present (not an empty or unrelated repository) (weight 2, mandatory)
  - A meaningful README explains the project (weight 1, mandatory)
  - The written explanation describes the actual submitted work (weight 1, mandatory)
  - The core behaviour works as described (weight 1)
  - At least one edge case is handled (weight 1)
  - You can explain each significant decision you made (weight 1)
  - The project is documented well enough for someone else to run it (weight 1)
- **Acceptance criteria (contract):**
  - The core behaviour works as described
  - At least one edge case is handled
  - You can explain each significant decision you made
  - The project is documented well enough for someone else to run it

### Recorded uncertainties
- 2 required resource(s) could not be content-inspected (video, interactive app or JS shell) — manual or playback verification advised.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 2 — Prompt Engineering

**Objective:** Write instructions that produce reliable results.

**Success criteria:**
- Use few-shot examples
- Apply step-by-step reasoning
- Set role and constraints

### Instruction

The quality of your AI outputs depends entirely on the quality of your inputs. Prompting is a learnable skill.

OBJECTIVE
Write instructions that produce reliable results.

SUCCESS CRITERIA
• Use few-shot examples
• Apply step-by-step reasoning
• Set role and constraints

WORKED EXAMPLE
Engineer a prompt deliberately. Step 1: state the role, the task and the output format. Step 2: provide the minimum context needed. Step 3: run it and note where the output drifts. Step 4: add one constraint and re-run — keep changes to one at a time so you can attribute the effect.

COMMON MISTAKES
• Vague prompts
• Assuming one attempt is the final word

### Worked example

Engineer a prompt deliberately. Step 1: state the role, the task and the output format. Step 2: provide the minimum context needed. Step 3: run it and note where the output drifts. Step 4: add one constraint and re-run — keep changes to one at a time so you can attribute the effect.

### Common mistakes
- Vague prompts
- Assuming one attempt is the final word

### Ungraded practice
**Practice: Prompt Engineering**

DO THIS NOW
Write a prompt with a role, a clear task, constraints and two examples, then improve it after seeing a weak first result.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. What is few-shot prompting?
   - Repeating the same request
   - **✔ Providing a few examples of the desired input/output in the prompt**
   - Running the prompt many times
   - Using a paid model
   - _Answer:_ Providing a few examples of the desired input/output in the prompt · _Why:_ Few-shot prompting demonstrates the desired pattern with examples. · _Level:_ understand

2. Why ask a model to reason step by step on a complex task?
   - It is faster
   - **✔ It often improves accuracy on multi-step problems**
   - It reduces cost
   - It hides errors
   - _Answer:_ It often improves accuracy on multi-step problems · _Why:_ Explicit reasoning steps help models avoid jumping to a wrong answer. · _Level:_ apply

3. What is the role of a system prompt?
   - To store the answer
   - **✔ To set persistent instructions and persona that shape all responses**
   - To log usage
   - To encrypt output
   - _Answer:_ To set persistent instructions and persona that shape all responses · _Why:_ A system prompt sets durable context and behaviour for the model. · _Level:_ understand

### Phase project — Build: AI Research Report (`ai-p2`)

- **Objective:** Complete "AI Research Report" to a standard you can show and explain to someone else.
- **Problem:** A real applied problem that demonstrates the skills in this phase.
- **Audience:** A specific user or stakeholder you can name.
- **Required functionality:**
  - Implement the core behaviour described in the project
  - Handle at least one edge case or failure
  - Document how to run it
- **Constraints:**
  - Use only tools introduced in the prerequisite lessons
  - Do not copy a tutorial step-for-step
- **Acceptance criteria (brief):**
  - The core behaviour works as described
  - At least one edge case is handled
  - You can explain each significant decision you made
  - The project is documented well enough for someone else to run it
- **Required evidence:**
  - A repository or design file link
  - A short written summary of the problem and solution
  - Evidence of testing or validation where relevant
- **Rubric version:** rizw7jo-8 · **Pass threshold:** 0.8 · **Source inspection:** yes
- **Rubric:**
  - A public, inspectable source artifact is provided (weight 1, mandatory)
  - Relevant implementation is present (not an empty or unrelated repository) (weight 2, mandatory)
  - A meaningful README explains the project (weight 1, mandatory)
  - The written explanation describes the actual submitted work (weight 1, mandatory)
  - The core behaviour works as described (weight 1)
  - At least one edge case is handled (weight 1)
  - You can explain each significant decision you made (weight 1)
  - The project is documented well enough for someone else to run it (weight 1)
- **Acceptance criteria (contract):**
  - The core behaviour works as described
  - At least one edge case is handled
  - You can explain each significant decision you made
  - The project is documented well enough for someone else to run it

### Recorded uncertainties
- 2 content-verified resource(s) share no vocabulary with the objective — relevance needs human review.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 3 — AI for Your Field

**Objective:** Apply AI effectively within your own field.

**Success criteria:**
- Use coding assistants safely
- Use AI for design/analysis
- Verify domain output

### Instruction

Each field has specific AI workflows. Learn the tools and patterns for your specific track.

OBJECTIVE
Apply AI effectively within your own field.

SUCCESS CRITERIA
• Use coding assistants safely
• Use AI for design/analysis
• Verify domain output

WORKED EXAMPLE
Build a workflow for your own field. Step 1: pick a recurring task in your work. Step 2: write the input template and the instruction. Step 3: define the review step and what you check before using the output. Step 4: log one failure and the correction that fixed it.

COMMON MISTAKES
• Merging AI code without review
• Trusting AI analysis of data you cannot see it computed correctly

### Worked example

Build a workflow for your own field. Step 1: pick a recurring task in your work. Step 2: write the input template and the instruction. Step 3: define the review step and what you check before using the output. Step 4: log one failure and the correction that fixed it.

### Common mistakes
- Merging AI code without review
- Trusting AI analysis of data you cannot see it computed correctly

### Ungraded practice
**Practice: AI for Your Field**

DO THIS NOW
Use a coding or analysis assistant on a small real task, then verify its output and note one thing it got wrong or missed.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. You ask an AI coding assistant for a function. Before using it you should…
   - Ship it
   - **✔ Read it, test it, and check edge cases**
   - Only check formatting
   - Ask a second AI
   - _Answer:_ Read it, test it, and check edge cases · _Why:_ Generated code must be understood and tested before use. · _Level:_ evaluate

2. An AI data tool produces a summary chart. Why verify it?
   - Charts are always wrong
   - **✔ The tool may mis-handle the data or the request; confirm the computation**
   - It is slower
   - To reduce costs
   - _Answer:_ The tool may mis-handle the data or the request; confirm the computation · _Why:_ Generated analyses can misread data; verify the computation. · _Level:_ analyze

3. AI is best used in a design workflow to…
   - Replace user research
   - **✔ Explore options quickly while you apply judgement and test with users**
   - Finalise without review
   - Ignore accessibility
   - _Answer:_ Explore options quickly while you apply judgement and test with users · _Why:_ AI accelerates exploration; humans keep judgement, research and accessibility. · _Level:_ understand

### Phase project — Build: Field AI Workflow Playbook (`ai-p4`)

- **Objective:** Create three documented AI workflows that fit the learner's actual work.
- **Problem:** Generic AI advice does not translate into repeatable, field-specific work.
- **Audience:** The learner's own professional context and a reviewer in the same field.
- **Required functionality:**
  - Three recurring tasks from the learner's field
  - For each: task definition, context template, instructions, expected output, and a review checklist
  - A logged failure example per workflow with the fix
- **Constraints:**
  - Do not use confidential or unapproved data
  - Each workflow must be re-runnable by someone else
- **Acceptance criteria (brief):**
  - Each workflow produces a usable output from a defined input
  - Each includes a review step
  - Failure examples are genuine and the fix is explained
- **Required evidence:**
  - A playbook document with the three workflows
  - Input/output examples
  - A failure log with corrections
- **Rubric version:** rkxxxc-7 · **Pass threshold:** 0.8 · **Source inspection:** yes
- **Rubric:**
  - A public, inspectable source artifact is provided (weight 1, mandatory)
  - Relevant implementation is present (not an empty or unrelated repository) (weight 2, mandatory)
  - A meaningful README explains the project (weight 1, mandatory)
  - The written explanation describes the actual submitted work (weight 1, mandatory)
  - Each workflow produces a usable output from a defined input (weight 1)
  - Each includes a review step (weight 1)
  - Failure examples are genuine and the fix is explained (weight 1)
- **Acceptance criteria (contract):**
  - Each workflow produces a usable output from a defined input
  - Each includes a review step
  - Failure examples are genuine and the fix is explained

### Recorded uncertainties
- 1 content-verified resource(s) share no vocabulary with the objective — relevance needs human review.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 4 — AI Ethics & Verification

**Objective:** Use AI responsibly with verification and privacy in mind.

**Success criteria:**
- Verify outputs
- Protect private data
- Reason before prompting

### Instruction

The most important AI skill is knowing when not to trust it. Build the habit of verification.

OBJECTIVE
Use AI responsibly with verification and privacy in mind.

SUCCESS CRITERIA
• Verify outputs
• Protect private data
• Reason before prompting

WORKED EXAMPLE
Verify AI output before using it. Step 1: identify any factual claims. Step 2: check each against a primary source. Step 3: look for bias, missing context or fabricated references. Step 4: record the verification and note any claim you could not confirm.

COMMON MISTAKES
• Pasting confidential data into tools
• Publishing unverified AI output

### Worked example

Verify AI output before using it. Step 1: identify any factual claims. Step 2: check each against a primary source. Step 3: look for bias, missing context or fabricated references. Step 4: record the verification and note any claim you could not confirm.

### Common mistakes
- Pasting confidential data into tools
- Publishing unverified AI output

### Ungraded practice
**Practice: AI Ethics & Verification**

DO THIS NOW
Write a short checklist you would use before trusting an AI output in your work, covering verification, privacy and disclosure.

This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.

### Knowledge check (3 questions, server graded: yes)

1. Before sharing AI-generated content publicly, you should…
   - Publish immediately
   - **✔ Fact-check the claims and confirm you can stand behind them**
   - Add a disclaimer only
   - Shorten it
   - _Answer:_ Fact-check the claims and confirm you can stand behind them · _Why:_ Responsibility for published claims stays with you. · _Level:_ evaluate

2. Why avoid pasting confidential client data into a public AI tool?
   - It slows the tool
   - **✔ It may be stored or used in ways that breach confidentiality**
   - It increases cost
   - It is technically impossible
   - _Answer:_ It may be stored or used in ways that breach confidentiality · _Why:_ Data sent to external tools may leave your control, breaching confidentiality. · _Level:_ evaluate

3. "Thinking before prompting" means…
   - Writing longer prompts
   - **✔ Deciding the goal, what you need, and how you will verify the result first**
   - Using a bigger model
   - Copying a prompt
   - _Answer:_ Deciding the goal, what you need, and how you will verify the result first · _Why:_ Clarity about goal and verification improves results and reduces risk. · _Level:_ understand

### Phase project — Portfolio project: AI-Integrated App (`ai-p3`)

- **Objective:** Complete "AI-Integrated App" to a standard you can show and explain to someone else.
- **Problem:** A real portfolio problem that demonstrates the skills in this phase.
- **Audience:** A specific user or stakeholder you can name.
- **Required functionality:**
  - Implement the core behaviour described in the project
  - Handle at least one edge case or failure
  - Document how to run it
- **Constraints:**
  - Use only tools introduced in the prerequisite lessons
  - Do not copy a tutorial step-for-step
- **Acceptance criteria (brief):**
  - The core behaviour works as described
  - At least one edge case is handled
  - You can explain each significant decision you made
  - The project is documented well enough for someone else to run it
- **Required evidence:**
  - A repository or design file link
  - A short written summary of the problem and solution
  - Evidence of testing or validation where relevant
- **Rubric version:** rizw7jo-8 · **Pass threshold:** 0.8 · **Source inspection:** yes
- **Rubric:**
  - A public, inspectable source artifact is provided (weight 1, mandatory)
  - Relevant implementation is present (not an empty or unrelated repository) (weight 2, mandatory)
  - A meaningful README explains the project (weight 1, mandatory)
  - The written explanation describes the actual submitted work (weight 1, mandatory)
  - The core behaviour works as described (weight 1)
  - At least one edge case is handled (weight 1)
  - You can explain each significant decision you made (weight 1)
  - The project is documented well enough for someone else to run it (weight 1)
- **Acceptance criteria (contract):**
  - The core behaviour works as described
  - At least one edge case is handled
  - You can explain each significant decision you made
  - The project is documented well enough for someone else to run it

### Recorded uncertainties
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.
