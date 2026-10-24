# AI-Assisted Software Development (`ai-software-development`)

Slug: `ai-software-development` · Category: ai · Stages: 8

## Stage 1 — AI Coding Fundamentals

**Objective:** Use AI coding assistance without confusing generated code with verified software.

**Success criteria:**
- Explain generated code
- Identify likely failure modes
- Review before integration

### Instruction

Understand how AI coding tools actually work so you can use them effectively and know their limits.


LEARNING OBJECTIVE
Use AI coding assistance without confusing generated code with verified software.


TECHSKILLHUB LESSON
You are using AI inside a real software-development workflow where code still has to be understood, tested, reviewed, secured, and maintained. AI Coding Fundamentals is about AI coding fundamentals. The central idea is: Use AI coding assistance without confusing generated code with verified software. Do not treat AI output as the skill itself. The skill is the human ability to frame the problem, choose an appropriate AI role, inspect the result, and decide what happens next. Start with the required outcome and constraints, give only the context needed for that decision, and define how you will know whether the result is good enough.


COMMON MISTAKES
• Starting with a tool or prompt before defining the actual problem and success criteria.
• Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
• Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Worked example

AI suggests a function. You read it line by line, explain its behavior, identify edge cases, and only then integrate it.

### Common mistakes
- Starting with a tool or prompt before defining the actual problem and success criteria.
- Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
- Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Knowledge check (4 questions, server graded: yes)

1. What is the most dangerous misconception about generated code?
   - It can be useful
   - **✔ If it compiles, it must be correct**
   - It can speed up prototypes
   - It can explain code
   - _Answer:_ If it compiles, it must be correct · _Why:_ Compilation does not prove correctness, security, performance, or maintainability. · _Level:_ understand

2. You are given a new software development task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - Use the first AI output if it sounds confident
   - **✔ Define the task, success criteria, and constraints for the software development problem before choosing how AI should help.**
   - Add more adjectives to the prompt until the answer feels professional
   - Let the AI decide the success criteria after producing the output
   - _Answer:_ Define the task, success criteria, and constraints for the software development problem before choosing how AI should help. · _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _Level:_ apply

3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - Whether the output is polished enough to avoid review
   - Whether the prompt was longer than the previous one
   - **✔ Look for evidence that the learner can explain generated code, and can identify likely failure modes rather than merely repeat a definition.**
   - Whether the model generated the answer quickly
   - _Answer:_ Look for evidence that the learner can explain generated code, and can identify likely failure modes rather than merely repeat a definition. · _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _Level:_ apply

4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - Accept it because the output looks good
   - Give them the answer and mark the stage complete
   - Move them to the next stage because AI is probabilistic anyway
   - _Answer:_ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work. · _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _Level:_ analyze

### Phase project — Build: AI Coding Fundamentals Mini-Project (`stage:ai-software-development:1`)

- **Rubric version:** sm-1xg41rw-7 · **Pass threshold:** 0.8 · **Source inspection:** no
- **Rubric:**
  - Demonstrates the section outcome: Use AI coding assistance without confusing generated code with verified software. (weight 2, mandatory)
  - Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) (weight 2, mandatory)
  - Explains the decisions and trade-offs behind the work (weight 1)
  - Explains how the result was checked against the section success criteria (weight 1)
  - Explain generated code (weight 1)
  - Identify likely failure modes (weight 1)
  - Review before integration (weight 1)
- **Acceptance criteria (contract):**
  - Explain generated code
  - Identify likely failure modes
  - Review before integration

### Recorded uncertainties
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 2 — Code Generation

**Objective:** Give AI coding systems precise requirements, interfaces, constraints, acceptance criteria, and context.

**Success criteria:**
- Write a bounded implementation brief
- Define acceptance criteria
- Provide relevant repository context

### Instruction

Learn to use AI for generating code efficiently while understanding exactly what it produces.


LEARNING OBJECTIVE
Give AI coding systems precise requirements, interfaces, constraints, acceptance criteria, and context.


TECHSKILLHUB LESSON
You are using AI inside a real software-development workflow where code still has to be understood, tested, reviewed, secured, and maintained. Code Generation is about bounded coding instructions. The central idea is: Give AI coding systems precise requirements, interfaces, constraints, acceptance criteria, and context. Do not treat AI output as the skill itself. The skill is the human ability to frame the problem, choose an appropriate AI role, inspect the result, and decide what happens next. Start with the required outcome and constraints, give only the context needed for that decision, and define how you will know whether the result is good enough.


COMMON MISTAKES
• Starting with a tool or prompt before defining the actual problem and success criteria.
• Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
• Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Worked example

Instead of asking an agent to “build the feature,” you supply requirements, interfaces, constraints, acceptance criteria, and repository context.

### Common mistakes
- Starting with a tool or prompt before defining the actual problem and success criteria.
- Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
- Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Knowledge check (4 questions, server graded: yes)

1. What improves AI-generated implementation most?
   - Vague requests
   - **✔ Clear requirements, constraints, interfaces, acceptance criteria, and context**
   - More emojis
   - No project context
   - _Answer:_ Clear requirements, constraints, interfaces, acceptance criteria, and context · _Why:_ Specific requirements reduce ambiguity. · _Level:_ understand

2. You are given a new software development task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - Use the first AI output if it sounds confident
   - Add more adjectives to the prompt until the answer feels professional
   - **✔ Define the task, success criteria, and constraints for the software development problem before choosing how AI should help.**
   - Let the AI decide the success criteria after producing the output
   - _Answer:_ Define the task, success criteria, and constraints for the software development problem before choosing how AI should help. · _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _Level:_ apply

3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - **✔ Look for evidence that the learner can write a bounded implementation brief, and can define acceptance criteria rather than merely repeat a definition.**
   - Whether the output is polished enough to avoid review
   - Whether the prompt was longer than the previous one
   - Whether the model generated the answer quickly
   - _Answer:_ Look for evidence that the learner can write a bounded implementation brief, and can define acceptance criteria rather than merely repeat a definition. · _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _Level:_ apply

4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - Accept it because the output looks good
   - Give them the answer and mark the stage complete
   - Move them to the next stage because AI is probabilistic anyway
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - _Answer:_ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work. · _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _Level:_ analyze

### Phase project — Build: Code Generation Mini-Project (`stage:ai-software-development:2`)

- **Rubric version:** sm-12ahxgl-7 · **Pass threshold:** 0.8 · **Source inspection:** no
- **Rubric:**
  - Demonstrates the section outcome: Give AI coding systems precise requirements, interfaces, constraints, acceptance criteria, and context. (weight 2, mandatory)
  - Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) (weight 2, mandatory)
  - Explains the decisions and trade-offs behind the work (weight 1)
  - Explains how the result was checked against the section success criteria (weight 1)
  - Write a bounded implementation brief (weight 1)
  - Define acceptance criteria (weight 1)
  - Provide relevant repository context (weight 1)
- **Acceptance criteria (contract):**
  - Write a bounded implementation brief
  - Define acceptance criteria
  - Provide relevant repository context

### Recorded uncertainties
- 1 required resource(s) could not be content-inspected (video, interactive app or JS shell) — manual or playback verification advised.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 3 — Debugging With AI

**Objective:** Use AI for debugging while reproducing failures, understanding root causes, and validating fixes.

**Success criteria:**
- Reproduce the issue
- Explain the root cause
- Verify the fix with tests

### Instruction

AI can help you debug faster, but you still need to understand the root cause and verify the fix.


LEARNING OBJECTIVE
Use AI for debugging while reproducing failures, understanding root causes, and validating fixes.


TECHSKILLHUB LESSON
You are using AI inside a real software-development workflow where code still has to be understood, tested, reviewed, secured, and maintained. Debugging With AI is about debugging. The central idea is: Use AI for debugging while reproducing failures, understanding root causes, and validating fixes. Do not treat AI output as the skill itself. The skill is the human ability to frame the problem, choose an appropriate AI role, inspect the result, and decide what happens next. Start with the required outcome and constraints, give only the context needed for that decision, and define how you will know whether the result is good enough.


COMMON MISTAKES
• Starting with a tool or prompt before defining the actual problem and success criteria.
• Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
• Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Worked example

A test fails. You reproduce the failure, isolate the root cause, ask AI for hypotheses, and verify the chosen fix with a regression test.

### Common mistakes
- Starting with a tool or prompt before defining the actual problem and success criteria.
- Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
- Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Knowledge check (4 questions, server graded: yes)

1. An AI-generated bug fix passes one test but you cannot explain the root cause. What next?
   - Ship it
   - **✔ Reproduce and understand the failure, then validate the fix against it**
   - Delete the bug
   - Ask AI to sound certain
   - _Answer:_ Reproduce and understand the failure, then validate the fix against it · _Why:_ A professional fix requires understanding and evidence. · _Level:_ understand

2. You are given a new software development task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - **✔ Define the task, success criteria, and constraints for the software development problem before choosing how AI should help.**
   - Use the first AI output if it sounds confident
   - Add more adjectives to the prompt until the answer feels professional
   - Let the AI decide the success criteria after producing the output
   - _Answer:_ Define the task, success criteria, and constraints for the software development problem before choosing how AI should help. · _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _Level:_ apply

3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - Whether the output is polished enough to avoid review
   - Whether the prompt was longer than the previous one
   - Whether the model generated the answer quickly
   - **✔ Look for evidence that the learner can reproduce the issue, and can explain the root cause rather than merely repeat a definition.**
   - _Answer:_ Look for evidence that the learner can reproduce the issue, and can explain the root cause rather than merely repeat a definition. · _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _Level:_ apply

4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - Accept it because the output looks good
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - Give them the answer and mark the stage complete
   - Move them to the next stage because AI is probabilistic anyway
   - _Answer:_ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work. · _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _Level:_ analyze

### Phase project — Build: Debugging With AI Mini-Project (`stage:ai-software-development:3`)

- **Rubric version:** sm-vjr2zf-7 · **Pass threshold:** 0.8 · **Source inspection:** no
- **Rubric:**
  - Demonstrates the section outcome: Use AI for debugging while reproducing failures, understanding root causes, and validating fixes. (weight 2, mandatory)
  - Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) (weight 2, mandatory)
  - Explains the decisions and trade-offs behind the work (weight 1)
  - Explains how the result was checked against the section success criteria (weight 1)
  - Reproduce the issue (weight 1)
  - Explain the root cause (weight 1)
  - Verify the fix with tests (weight 1)
- **Acceptance criteria (contract):**
  - Reproduce the issue
  - Explain the root cause
  - Verify the fix with tests

### Recorded uncertainties
- 1 content-verified resource(s) share no vocabulary with the objective — relevance needs human review.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 4 — AI Coding Tools

**Objective:** Delegate bounded multi-step tasks to coding agents while preserving scope control and review.

**Success criteria:**
- Define agent scope
- Inspect diffs
- Reject unrelated changes

### Instruction

Explore the major AI coding tools and learn when each is most effective for different types of tasks.


LEARNING OBJECTIVE
Delegate bounded multi-step tasks to coding agents while preserving scope control and review.


TECHSKILLHUB LESSON
You are using AI inside a real software-development workflow where code still has to be understood, tested, reviewed, secured, and maintained. AI Coding Tools is about coding agents. The central idea is: Delegate bounded multi-step tasks to coding agents while preserving scope control and review. Do not treat AI output as the skill itself. The skill is the human ability to frame the problem, choose an appropriate AI role, inspect the result, and decide what happens next. Start with the required outcome and constraints, give only the context needed for that decision, and define how you will know whether the result is good enough.


COMMON MISTAKES
• Starting with a tool or prompt before defining the actual problem and success criteria.
• Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
• Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Worked example

An agent changes five unrelated files. You inspect the diff, keep the in-scope changes, and reject the rest.

### Common mistakes
- Starting with a tool or prompt before defining the actual problem and success criteria.
- Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
- Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Knowledge check (4 questions, server graded: yes)

1. When should an AI coding agent be used instead of inline completion?
   - Always
   - **✔ For bounded multi-step tasks where broader context and controlled autonomy provide value**
   - Never
   - Only for CSS
   - _Answer:_ For bounded multi-step tasks where broader context and controlled autonomy provide value · _Why:_ Tool autonomy should match task scope and review capacity. · _Level:_ understand

2. You are given a new software development task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - Use the first AI output if it sounds confident
   - Add more adjectives to the prompt until the answer feels professional
   - Let the AI decide the success criteria after producing the output
   - **✔ Define the task, success criteria, and constraints for the software development problem before choosing how AI should help.**
   - _Answer:_ Define the task, success criteria, and constraints for the software development problem before choosing how AI should help. · _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _Level:_ apply

3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - Whether the output is polished enough to avoid review
   - **✔ Look for evidence that the learner can define agent scope, and can inspect diffs rather than merely repeat a definition.**
   - Whether the prompt was longer than the previous one
   - Whether the model generated the answer quickly
   - _Answer:_ Look for evidence that the learner can define agent scope, and can inspect diffs rather than merely repeat a definition. · _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _Level:_ apply

4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - Accept it because the output looks good
   - Give them the answer and mark the stage complete
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - Move them to the next stage because AI is probabilistic anyway
   - _Answer:_ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work. · _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _Level:_ analyze

### Phase project — Build: AI Coding Tools Mini-Project (`stage:ai-software-development:4`)

- **Rubric version:** sm-1jlpovt-7 · **Pass threshold:** 0.8 · **Source inspection:** no
- **Rubric:**
  - Demonstrates the section outcome: Delegate bounded multi-step tasks to coding agents while preserving scope control and review. (weight 2, mandatory)
  - Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) (weight 2, mandatory)
  - Explains the decisions and trade-offs behind the work (weight 1)
  - Explains how the result was checked against the section success criteria (weight 1)
  - Define agent scope (weight 1)
  - Inspect diffs (weight 1)
  - Reject unrelated changes (weight 1)
- **Acceptance criteria (contract):**
  - Define agent scope
  - Inspect diffs
  - Reject unrelated changes

### Recorded uncertainties
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 5 — Coding Agents

**Objective:** Control agent changes through explicit boundaries, diff review, security awareness, and human approval.

**Success criteria:**
- Review file changes
- Protect sensitive areas
- Revert unsafe or unrelated changes

### Instruction

AI coding agents can make complex changes across multiple files. Learn to use them safely with proper scope control and review.


LEARNING OBJECTIVE
Control agent changes through explicit boundaries, diff review, security awareness, and human approval.


TECHSKILLHUB LESSON
You are using AI inside a real software-development workflow where code still has to be understood, tested, reviewed, secured, and maintained. Coding Agents is about agent boundaries. The central idea is: Control agent changes through explicit boundaries, diff review, security awareness, and human approval. Do not treat AI output as the skill itself. The skill is the human ability to frame the problem, choose an appropriate AI role, inspect the result, and decide what happens next. Start with the required outcome and constraints, give only the context needed for that decision, and define how you will know whether the result is good enough.


COMMON MISTAKES
• Starting with a tool or prompt before defining the actual problem and success criteria.
• Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
• Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Worked example

You prevent the coding agent from modifying authentication and secret-handling code without explicit review.

### Common mistakes
- Starting with a tool or prompt before defining the actual problem and success criteria.
- Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
- Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Knowledge check (4 questions, server graded: yes)

1. An agent modifies unrelated authentication files. What should happen?
   - Merge if tests pass
   - **✔ Review the diff, revert unrelated changes, and verify requested behavior**
   - Ignore it
   - Deploy immediately
   - _Answer:_ Review the diff, revert unrelated changes, and verify requested behavior · _Why:_ Scope control and diff review are essential. · _Level:_ understand

2. You are given a new software development task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - Use the first AI output if it sounds confident
   - **✔ Define the task, success criteria, and constraints for the software development problem before choosing how AI should help.**
   - Add more adjectives to the prompt until the answer feels professional
   - Let the AI decide the success criteria after producing the output
   - _Answer:_ Define the task, success criteria, and constraints for the software development problem before choosing how AI should help. · _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _Level:_ apply

3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - Whether the output is polished enough to avoid review
   - Whether the prompt was longer than the previous one
   - **✔ Look for evidence that the learner can review file changes, and can protect sensitive areas rather than merely repeat a definition.**
   - Whether the model generated the answer quickly
   - _Answer:_ Look for evidence that the learner can review file changes, and can protect sensitive areas rather than merely repeat a definition. · _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _Level:_ apply

4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - Accept it because the output looks good
   - Give them the answer and mark the stage complete
   - Move them to the next stage because AI is probabilistic anyway
   - _Answer:_ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work. · _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _Level:_ analyze

### Phase project — Build: Coding Agents Mini-Project (`stage:ai-software-development:5`)

- **Rubric version:** sm-o3ec2t-7 · **Pass threshold:** 0.8 · **Source inspection:** no
- **Rubric:**
  - Demonstrates the section outcome: Control agent changes through explicit boundaries, diff review, security awareness, and human approval. (weight 2, mandatory)
  - Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) (weight 2, mandatory)
  - Explains the decisions and trade-offs behind the work (weight 1)
  - Explains how the result was checked against the section success criteria (weight 1)
  - Review file changes (weight 1)
  - Protect sensitive areas (weight 1)
  - Revert unsafe or unrelated changes (weight 1)
- **Acceptance criteria (contract):**
  - Review file changes
  - Protect sensitive areas
  - Revert unsafe or unrelated changes

### Recorded uncertainties
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 6 — Testing & Verification

**Objective:** Treat AI-generated tests as evidence to inspect rather than proof that the application is correct.

**Success criteria:**
- Assess test coverage
- Add missing cases
- Validate behavior independently

### Instruction

Passing tests do not automatically make code correct. Learn to verify AI-generated code thoroughly.


LEARNING OBJECTIVE
Treat AI-generated tests as evidence to inspect rather than proof that the application is correct.


TECHSKILLHUB LESSON
You are using AI inside a real software-development workflow where code still has to be understood, tested, reviewed, secured, and maintained. Testing & Verification is about test verification. The central idea is: Treat AI-generated tests as evidence to inspect rather than proof that the application is correct. Do not treat AI output as the skill itself. The skill is the human ability to frame the problem, choose an appropriate AI role, inspect the result, and decide what happens next. Start with the required outcome and constraints, give only the context needed for that decision, and define how you will know whether the result is good enough.


COMMON MISTAKES
• Starting with a tool or prompt before defining the actual problem and success criteria.
• Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
• Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Worked example

AI-generated tests all pass, but you identify an untested failure mode and add a case that exposes a real bug.

### Common mistakes
- Starting with a tool or prompt before defining the actual problem and success criteria.
- Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
- Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Knowledge check (4 questions, server graded: yes)

1. Why are AI-generated tests not sufficient on their own?
   - They cannot run
   - **✔ They can encode wrong assumptions or miss important behaviors**
   - AI cannot write tests
   - Tests are unnecessary
   - _Answer:_ They can encode wrong assumptions or miss important behaviors · _Why:_ Tests provide evidence only for what they actually cover. · _Level:_ understand

2. You are given a new software development task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - Use the first AI output if it sounds confident
   - Add more adjectives to the prompt until the answer feels professional
   - **✔ Define the task, success criteria, and constraints for the software development problem before choosing how AI should help.**
   - Let the AI decide the success criteria after producing the output
   - _Answer:_ Define the task, success criteria, and constraints for the software development problem before choosing how AI should help. · _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _Level:_ apply

3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - **✔ Look for evidence that the learner can assess test coverage, and can add missing cases rather than merely repeat a definition.**
   - Whether the output is polished enough to avoid review
   - Whether the prompt was longer than the previous one
   - Whether the model generated the answer quickly
   - _Answer:_ Look for evidence that the learner can assess test coverage, and can add missing cases rather than merely repeat a definition. · _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _Level:_ apply

4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - Accept it because the output looks good
   - Give them the answer and mark the stage complete
   - Move them to the next stage because AI is probabilistic anyway
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - _Answer:_ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work. · _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _Level:_ analyze

### Phase project — Build: Testing & Verification Mini-Project (`stage:ai-software-development:6`)

- **Rubric version:** sm-hjjg95-7 · **Pass threshold:** 0.8 · **Source inspection:** no
- **Rubric:**
  - Demonstrates the section outcome: Treat AI-generated tests as evidence to inspect rather than proof that the application is correct. (weight 2, mandatory)
  - Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) (weight 2, mandatory)
  - Explains the decisions and trade-offs behind the work (weight 1)
  - Explains how the result was checked against the section success criteria (weight 1)
  - Assess test coverage (weight 1)
  - Add missing cases (weight 1)
  - Validate behavior independently (weight 1)
- **Acceptance criteria (contract):**
  - Assess test coverage
  - Add missing cases
  - Validate behavior independently

### Recorded uncertainties
- 1 content-verified resource(s) share no vocabulary with the objective — relevance needs human review.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 7 — Building With AI

**Objective:** Run a professional AI-assisted development loop from requirements through review, testing, and integration.

**Success criteria:**
- Plan the work
- Delegate safely
- Test and verify before merge

### Instruction

Combine AI tools into a complete development workflow for building real applications efficiently.


LEARNING OBJECTIVE
Run a professional AI-assisted development loop from requirements through review, testing, and integration.


TECHSKILLHUB LESSON
You are using AI inside a real software-development workflow where code still has to be understood, tested, reviewed, secured, and maintained. Building With AI is about professional development loop. The central idea is: Run a professional AI-assisted development loop from requirements through review, testing, and integration. Do not treat AI output as the skill itself. The skill is the human ability to frame the problem, choose an appropriate AI role, inspect the result, and decide what happens next. Start with the required outcome and constraints, give only the context needed for that decision, and define how you will know whether the result is good enough.


COMMON MISTAKES
• Starting with a tool or prompt before defining the actual problem and success criteria.
• Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
• Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Worked example

You run a loop of requirement → bounded delegation → diff review → tests → integration rather than “prompt until it works.”

### Common mistakes
- Starting with a tool or prompt before defining the actual problem and success criteria.
- Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
- Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Knowledge check (4 questions, server graded: yes)

1. Which workflow best combines AI speed with engineering discipline?
   - Generate everything then review at the end
   - **✔ Define requirements, delegate bounded tasks, inspect diffs, test, manually verify, integrate**
   - Avoid tests
   - Let AI choose architecture
   - _Answer:_ Define requirements, delegate bounded tasks, inspect diffs, test, manually verify, integrate · _Why:_ Continuous bounded review is safer and more maintainable. · _Level:_ understand

2. You are given a new software development task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - **✔ Define the task, success criteria, and constraints for the software development problem before choosing how AI should help.**
   - Use the first AI output if it sounds confident
   - Add more adjectives to the prompt until the answer feels professional
   - Let the AI decide the success criteria after producing the output
   - _Answer:_ Define the task, success criteria, and constraints for the software development problem before choosing how AI should help. · _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _Level:_ apply

3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - Whether the output is polished enough to avoid review
   - Whether the prompt was longer than the previous one
   - Whether the model generated the answer quickly
   - **✔ Look for evidence that the learner can plan the work, and can delegate safely rather than merely repeat a definition.**
   - _Answer:_ Look for evidence that the learner can plan the work, and can delegate safely rather than merely repeat a definition. · _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _Level:_ apply

4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - Accept it because the output looks good
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - Give them the answer and mark the stage complete
   - Move them to the next stage because AI is probabilistic anyway
   - _Answer:_ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work. · _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _Level:_ analyze

### Phase project — Build: Building With AI Mini-Project (`stage:ai-software-development:7`)

- **Rubric version:** sm-ln29ra-7 · **Pass threshold:** 0.8 · **Source inspection:** no
- **Rubric:**
  - Demonstrates the section outcome: Run a professional AI-assisted development loop from requirements through review, testing, and integration. (weight 2, mandatory)
  - Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) (weight 2, mandatory)
  - Explains the decisions and trade-offs behind the work (weight 1)
  - Explains how the result was checked against the section success criteria (weight 1)
  - Plan the work (weight 1)
  - Delegate safely (weight 1)
  - Test and verify before merge (weight 1)
- **Acceptance criteria (contract):**
  - Plan the work
  - Delegate safely
  - Test and verify before merge

### Recorded uncertainties
- 1 required resource(s) could not be content-inspected (video, interactive app or JS shell) — manual or playback verification advised.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 8 — Professional AI-Assisted Development

**Objective:** Define team-level rules for AI-assisted development, including security, review, maintainability, and acceptable use.

**Success criteria:**
- Write team guidance
- Define review gates
- Protect secrets and sensitive code

### Instruction

Professional development with AI requires standards, review processes, and long-term thinking about maintainability.


LEARNING OBJECTIVE
Define team-level rules for AI-assisted development, including security, review, maintainability, and acceptable use.


TECHSKILLHUB LESSON
You are using AI inside a real software-development workflow where code still has to be understood, tested, reviewed, secured, and maintained. Professional AI-Assisted Development is about team policy. The central idea is: Define team-level rules for AI-assisted development, including security, review, maintainability, and acceptable use. Do not treat AI output as the skill itself. The skill is the human ability to frame the problem, choose an appropriate AI role, inspect the result, and decide what happens next. Start with the required outcome and constraints, give only the context needed for that decision, and define how you will know whether the result is good enough.


COMMON MISTAKES
• Starting with a tool or prompt before defining the actual problem and success criteria.
• Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
• Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Worked example

A team defines acceptable AI usage, review gates, secret-handling rules, and documentation expectations.

### Common mistakes
- Starting with a tool or prompt before defining the actual problem and success criteria.
- Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
- Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Knowledge check (4 questions, server graded: yes)

1. What should a team document for AI-assisted coding?
   - Only the tool name
   - **✔ Acceptable uses, coding standards, review expectations, security rules, and maintainability requirements**
   - Nothing
   - Only prompts
   - _Answer:_ Acceptable uses, coding standards, review expectations, security rules, and maintainability requirements · _Why:_ Teams need shared engineering controls, not merely tool access. · _Level:_ understand

2. You are given a new software development task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - Use the first AI output if it sounds confident
   - Add more adjectives to the prompt until the answer feels professional
   - Let the AI decide the success criteria after producing the output
   - **✔ Define the task, success criteria, and constraints for the software development problem before choosing how AI should help.**
   - _Answer:_ Define the task, success criteria, and constraints for the software development problem before choosing how AI should help. · _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _Level:_ apply

3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - Whether the output is polished enough to avoid review
   - **✔ Look for evidence that the learner can write team guidance, and can define review gates rather than merely repeat a definition.**
   - Whether the prompt was longer than the previous one
   - Whether the model generated the answer quickly
   - _Answer:_ Look for evidence that the learner can write team guidance, and can define review gates rather than merely repeat a definition. · _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _Level:_ apply

4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - Accept it because the output looks good
   - Give them the answer and mark the stage complete
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - Move them to the next stage because AI is probabilistic anyway
   - _Answer:_ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work. · _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _Level:_ analyze

### Phase project — Build: AI Engineering Audit (`ai-s-p4`)

- **Rubric version:** rizw7jo-8 · **Pass threshold:** 0.8 · **Source inspection:** yes
- **Rubric:**
  - A public, inspectable source artifact is provided (weight 1, mandatory)
  - Relevant implementation is present (not an empty or unrelated repository) (weight 2, mandatory)
  - A meaningful README explains the project (weight 1, mandatory)
  - The written explanation describes the actual submitted work (weight 1, mandatory)
  - Findings are specific, reproducible, and tied to evidence. (weight 1)
  - Security and correctness issues are separated from style preferences. (weight 1)
  - The remediation plan is prioritized by risk and impact. (weight 1)
  - The learner can explain each important change. (weight 1)
- **Acceptance criteria (contract):**
  - Findings are specific, reproducible, and tied to evidence.
  - Security and correctness issues are separated from style preferences.
  - The remediation plan is prioritized by risk and impact.
  - The learner can explain each important change.

### Recorded uncertainties
- 1 content-verified resource(s) share no vocabulary with the objective — relevance needs human review.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.
