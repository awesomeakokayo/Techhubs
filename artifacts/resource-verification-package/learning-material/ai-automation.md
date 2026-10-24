# AI Automation (`ai-automation`)

Slug: `ai-automation` · Category: ai · Stages: 8

## Stage 1 — Automation Fundamentals

**Objective:** Identify tasks that are stable, repetitive, measurable, and safe enough to automate.

**Success criteria:**
- Define inputs and outputs
- Identify exceptions
- Reject unsuitable automation candidates

### Instruction

Not everything should be automated. Learn to identify good automation candidates and design reliable workflows.


LEARNING OBJECTIVE
Identify tasks that are stable, repetitive, measurable, and safe enough to automate.


TECHSKILLHUB LESSON
You are designing an automation where inputs, rules, exceptions, failures, and irreversible actions must be controlled. Automation Fundamentals is about automation candidates. The central idea is: Identify tasks that are stable, repetitive, measurable, and safe enough to automate. Do not treat AI output as the skill itself. The skill is the human ability to frame the problem, choose an appropriate AI role, inspect the result, and decide what happens next. Start with the required outcome and constraints, give only the context needed for that decision, and define how you will know whether the result is good enough.


COMMON MISTAKES
• Starting with a tool or prompt before defining the actual problem and success criteria.
• Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
• Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Worked example

You automate a weekly classification task only after confirming the inputs are stable and the output can be measured.

### Common mistakes
- Starting with a tool or prompt before defining the actual problem and success criteria.
- Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
- Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Knowledge check (4 questions, server graded: yes)

1. Which process is the strongest automation candidate?
   - **✔ Stable, repetitive process with clear inputs and outputs**
   - Ambiguous negotiation
   - Irreversible high-impact decision without review
   - Constantly changing process
   - _Answer:_ Stable, repetitive process with clear inputs and outputs · _Why:_ Stable, measurable work is easier to automate safely. · _Level:_ understand

2. You are given a new automation task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - Use the first AI output if it sounds confident
   - **✔ Define the task, success criteria, and constraints for the automation problem before choosing how AI should help.**
   - Add more adjectives to the prompt until the answer feels professional
   - Let the AI decide the success criteria after producing the output
   - _Answer:_ Define the task, success criteria, and constraints for the automation problem before choosing how AI should help. · _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _Level:_ apply

3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - Whether the output is polished enough to avoid review
   - Whether the prompt was longer than the previous one
   - **✔ Look for evidence that the learner can define inputs and outputs, and can identify exceptions rather than merely repeat a definition.**
   - Whether the model generated the answer quickly
   - _Answer:_ Look for evidence that the learner can define inputs and outputs, and can identify exceptions rather than merely repeat a definition. · _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _Level:_ apply

4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - Accept it because the output looks good
   - Give them the answer and mark the stage complete
   - Move them to the next stage because AI is probabilistic anyway
   - _Answer:_ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work. · _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _Level:_ analyze

### Phase project — Build: Automation Fundamentals Mini-Project (`stage:ai-automation:1`)

- **Rubric version:** sm-twh2ho-7 · **Pass threshold:** 0.8 · **Source inspection:** no
- **Rubric:**
  - Demonstrates the section outcome: Identify tasks that are stable, repetitive, measurable, and safe enough to automate. (weight 2, mandatory)
  - Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) (weight 2, mandatory)
  - Explains the decisions and trade-offs behind the work (weight 1)
  - Explains how the result was checked against the section success criteria (weight 1)
  - Define inputs and outputs (weight 1)
  - Identify exceptions (weight 1)
  - Reject unsuitable automation candidates (weight 1)
- **Acceptance criteria (contract):**
  - Define inputs and outputs
  - Identify exceptions
  - Reject unsuitable automation candidates

### Recorded uncertainties
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 2 — Workflows

**Objective:** Design workflows with explicit failure paths rather than assuming every step succeeds.

**Success criteria:**
- Define failure cases
- Choose recovery behavior
- Protect downstream actions

### Instruction

Learn the fundamental patterns of workflow design — triggers, actions, conditions, and error handling.


LEARNING OBJECTIVE
Design workflows with explicit failure paths rather than assuming every step succeeds.


TECHSKILLHUB LESSON
You are designing an automation where inputs, rules, exceptions, failures, and irreversible actions must be controlled. Workflows is about workflow design. The central idea is: Design workflows with explicit failure paths rather than assuming every step succeeds. Do not treat AI output as the skill itself. The skill is the human ability to frame the problem, choose an appropriate AI role, inspect the result, and decide what happens next. Start with the required outcome and constraints, give only the context needed for that decision, and define how you will know whether the result is good enough.


COMMON MISTAKES
• Starting with a tool or prompt before defining the actual problem and success criteria.
• Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
• Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Worked example

You design a workflow with a retry path, dead-letter/manual review path, and protection against repeated side effects.

### Common mistakes
- Starting with a tool or prompt before defining the actual problem and success criteria.
- Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
- Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Knowledge check (4 questions, server graded: yes)

1. Why do workflows need explicit failure paths?
   - They make diagrams prettier
   - **✔ APIs, data, credentials, and AI outputs can fail and need safe recovery**
   - They guarantee no failures
   - They replace testing
   - _Answer:_ APIs, data, credentials, and AI outputs can fail and need safe recovery · _Why:_ Reliable automation assumes failure. · _Level:_ understand

2. You are given a new automation task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - Use the first AI output if it sounds confident
   - Add more adjectives to the prompt until the answer feels professional
   - **✔ Define the task, success criteria, and constraints for the automation problem before choosing how AI should help.**
   - Let the AI decide the success criteria after producing the output
   - _Answer:_ Define the task, success criteria, and constraints for the automation problem before choosing how AI should help. · _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _Level:_ apply

3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - **✔ Look for evidence that the learner can define failure cases, and can choose recovery behavior rather than merely repeat a definition.**
   - Whether the output is polished enough to avoid review
   - Whether the prompt was longer than the previous one
   - Whether the model generated the answer quickly
   - _Answer:_ Look for evidence that the learner can define failure cases, and can choose recovery behavior rather than merely repeat a definition. · _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _Level:_ apply

4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - Accept it because the output looks good
   - Give them the answer and mark the stage complete
   - Move them to the next stage because AI is probabilistic anyway
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - _Answer:_ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work. · _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _Level:_ analyze

### Phase project — Build: Workflows Mini-Project (`stage:ai-automation:2`)

- **Rubric version:** sm-1c59gbm-7 · **Pass threshold:** 0.8 · **Source inspection:** no
- **Rubric:**
  - Demonstrates the section outcome: Design workflows with explicit failure paths rather than assuming every step succeeds. (weight 2, mandatory)
  - Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) (weight 2, mandatory)
  - Explains the decisions and trade-offs behind the work (weight 1)
  - Explains how the result was checked against the section success criteria (weight 1)
  - Define failure cases (weight 1)
  - Choose recovery behavior (weight 1)
  - Protect downstream actions (weight 1)
- **Acceptance criteria (contract):**
  - Define failure cases
  - Choose recovery behavior
  - Protect downstream actions

### Recorded uncertainties
- 1 required resource(s) could not be content-inspected (video, interactive app or JS shell) — manual or playback verification advised.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 3 — APIs

**Objective:** Diagnose API failures by checking credentials, scopes, endpoints, payloads, and configuration.

**Success criteria:**
- Interpret common errors
- Trace the failure boundary
- Correct configuration safely

### Instruction

APIs are the backbone of automation. Understand how to connect different services through their APIs.


LEARNING OBJECTIVE
Diagnose API failures by checking credentials, scopes, endpoints, payloads, and configuration.


TECHSKILLHUB LESSON
You are designing an automation where inputs, rules, exceptions, failures, and irreversible actions must be controlled. APIs is about API diagnosis. The central idea is: Diagnose API failures by checking credentials, scopes, endpoints, payloads, and configuration. Do not treat AI output as the skill itself. The skill is the human ability to frame the problem, choose an appropriate AI role, inspect the result, and decide what happens next. Start with the required outcome and constraints, give only the context needed for that decision, and define how you will know whether the result is good enough.


COMMON MISTAKES
• Starting with a tool or prompt before defining the actual problem and success criteria.
• Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
• Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Worked example

A 401 error appears. You inspect credentials and scopes before rewriting the entire workflow.

### Common mistakes
- Starting with a tool or prompt before defining the actual problem and success criteria.
- Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
- Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Knowledge check (4 questions, server graded: yes)

1. A workflow receives an API 401. What should you inspect?
   - Only the prompt
   - **✔ Credentials, token scope/expiry, endpoint, and request configuration**
   - Only UI
   - Nothing
   - _Answer:_ Credentials, token scope/expiry, endpoint, and request configuration · _Why:_ 401 indicates an authentication/authorization problem at the request boundary. · _Level:_ understand

2. You are given a new automation task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - **✔ Define the task, success criteria, and constraints for the automation problem before choosing how AI should help.**
   - Use the first AI output if it sounds confident
   - Add more adjectives to the prompt until the answer feels professional
   - Let the AI decide the success criteria after producing the output
   - _Answer:_ Define the task, success criteria, and constraints for the automation problem before choosing how AI should help. · _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _Level:_ apply

3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - Whether the output is polished enough to avoid review
   - Whether the prompt was longer than the previous one
   - Whether the model generated the answer quickly
   - **✔ Look for evidence that the learner can interpret common errors, and can trace the failure boundary rather than merely repeat a definition.**
   - _Answer:_ Look for evidence that the learner can interpret common errors, and can trace the failure boundary rather than merely repeat a definition. · _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _Level:_ apply

4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - Accept it because the output looks good
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - Give them the answer and mark the stage complete
   - Move them to the next stage because AI is probabilistic anyway
   - _Answer:_ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work. · _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _Level:_ analyze

### Phase project — Build: APIs Mini-Project (`stage:ai-automation:3`)

- **Rubric version:** sm-lxm48-7 · **Pass threshold:** 0.8 · **Source inspection:** no
- **Rubric:**
  - Demonstrates the section outcome: Diagnose API failures by checking credentials, scopes, endpoints, payloads, and configuration. (weight 2, mandatory)
  - Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) (weight 2, mandatory)
  - Explains the decisions and trade-offs behind the work (weight 1)
  - Explains how the result was checked against the section success criteria (weight 1)
  - Interpret common errors (weight 1)
  - Trace the failure boundary (weight 1)
  - Correct configuration safely (weight 1)
- **Acceptance criteria (contract):**
  - Interpret common errors
  - Trace the failure boundary
  - Correct configuration safely

### Recorded uncertainties
- 1 content-verified resource(s) share no vocabulary with the objective — relevance needs human review.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 4 — Webhooks

**Objective:** Secure webhook-driven workflows with authentication, validation, permissions, and constrained side effects.

**Success criteria:**
- Validate requests
- Limit permissions
- Protect sensitive actions

### Instruction

Webhooks let services notify your workflows when things happen. Learn to set up and process webhook events.


LEARNING OBJECTIVE
Secure webhook-driven workflows with authentication, validation, permissions, and constrained side effects.


TECHSKILLHUB LESSON
You are designing an automation where inputs, rules, exceptions, failures, and irreversible actions must be controlled. Webhooks is about webhook security. The central idea is: Secure webhook-driven workflows with authentication, validation, permissions, and constrained side effects. Do not treat AI output as the skill itself. The skill is the human ability to frame the problem, choose an appropriate AI role, inspect the result, and decide what happens next. Start with the required outcome and constraints, give only the context needed for that decision, and define how you will know whether the result is good enough.


COMMON MISTAKES
• Starting with a tool or prompt before defining the actual problem and success criteria.
• Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
• Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Worked example

A webhook can trigger a financial action, so you validate the sender and constrain the permission before the action can execute.

### Common mistakes
- Starting with a tool or prompt before defining the actual problem and success criteria.
- Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
- Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Knowledge check (4 questions, server graded: yes)

1. A webhook can change customer records. What control is appropriate?
   - Accept every payload
   - **✔ Authenticate and validate the payload and restrict allowed actions**
   - Disable logs
   - Trust the URL
   - _Answer:_ Authenticate and validate the payload and restrict allowed actions · _Why:_ External triggers require authentication, validation, and constrained effects. · _Level:_ understand

2. You are given a new automation task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - Use the first AI output if it sounds confident
   - Add more adjectives to the prompt until the answer feels professional
   - Let the AI decide the success criteria after producing the output
   - **✔ Define the task, success criteria, and constraints for the automation problem before choosing how AI should help.**
   - _Answer:_ Define the task, success criteria, and constraints for the automation problem before choosing how AI should help. · _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _Level:_ apply

3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - Whether the output is polished enough to avoid review
   - **✔ Look for evidence that the learner can validate requests, and can limit permissions rather than merely repeat a definition.**
   - Whether the prompt was longer than the previous one
   - Whether the model generated the answer quickly
   - _Answer:_ Look for evidence that the learner can validate requests, and can limit permissions rather than merely repeat a definition. · _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _Level:_ apply

4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - Accept it because the output looks good
   - Give them the answer and mark the stage complete
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - Move them to the next stage because AI is probabilistic anyway
   - _Answer:_ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work. · _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _Level:_ analyze

### Phase project — Build: Webhooks Mini-Project (`stage:ai-automation:4`)

- **Rubric version:** sm-hwibw9-7 · **Pass threshold:** 0.8 · **Source inspection:** no
- **Rubric:**
  - Demonstrates the section outcome: Secure webhook-driven workflows with authentication, validation, permissions, and constrained side effects. (weight 2, mandatory)
  - Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) (weight 2, mandatory)
  - Explains the decisions and trade-offs behind the work (weight 1)
  - Explains how the result was checked against the section success criteria (weight 1)
  - Validate requests (weight 1)
  - Limit permissions (weight 1)
  - Protect sensitive actions (weight 1)
- **Acceptance criteria (contract):**
  - Validate requests
  - Limit permissions
  - Protect sensitive actions

### Recorded uncertainties
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 5 — AI in Workflows

**Objective:** Place AI where probabilistic interpretation adds value while deterministic controls handle predictable operations.

**Success criteria:**
- Identify AI-worthy steps
- Keep fixed rules around them
- Define review gates

### Instruction

Learn to add AI capabilities to your workflows for classification, extraction, generation, and routing.


LEARNING OBJECTIVE
Place AI where probabilistic interpretation adds value while deterministic controls handle predictable operations.


TECHSKILLHUB LESSON
You are designing an automation where inputs, rules, exceptions, failures, and irreversible actions must be controlled. AI in Workflows is about AI placement. The central idea is: Place AI where probabilistic interpretation adds value while deterministic controls handle predictable operations. Do not treat AI output as the skill itself. The skill is the human ability to frame the problem, choose an appropriate AI role, inspect the result, and decide what happens next. Start with the required outcome and constraints, give only the context needed for that decision, and define how you will know whether the result is good enough.


COMMON MISTAKES
• Starting with a tool or prompt before defining the actual problem and success criteria.
• Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
• Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Worked example

AI classifies incoming messages, while deterministic rules handle routing, validation, and irreversible operations.

### Common mistakes
- Starting with a tool or prompt before defining the actual problem and success criteria.
- Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
- Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Knowledge check (4 questions, server graded: yes)

1. Where should AI sit inside an automation?
   - Everywhere
   - **✔ Where probabilistic language understanding adds value, surrounded by deterministic controls**
   - Only at the beginning
   - Only at the end
   - _Answer:_ Where probabilistic language understanding adds value, surrounded by deterministic controls · _Why:_ AI is useful for interpretation/generation while fixed rules handle predictable operations. · _Level:_ understand

2. You are given a new automation task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - Use the first AI output if it sounds confident
   - **✔ Define the task, success criteria, and constraints for the automation problem before choosing how AI should help.**
   - Add more adjectives to the prompt until the answer feels professional
   - Let the AI decide the success criteria after producing the output
   - _Answer:_ Define the task, success criteria, and constraints for the automation problem before choosing how AI should help. · _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _Level:_ apply

3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - Whether the output is polished enough to avoid review
   - Whether the prompt was longer than the previous one
   - **✔ Look for evidence that the learner can identify ai-worthy steps, and can keep fixed rules around them rather than merely repeat a definition.**
   - Whether the model generated the answer quickly
   - _Answer:_ Look for evidence that the learner can identify ai-worthy steps, and can keep fixed rules around them rather than merely repeat a definition. · _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _Level:_ apply

4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - Accept it because the output looks good
   - Give them the answer and mark the stage complete
   - Move them to the next stage because AI is probabilistic anyway
   - _Answer:_ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work. · _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _Level:_ analyze

### Phase project — Build: AI in Workflows Mini-Project (`stage:ai-automation:5`)

- **Rubric version:** sm-kwq9kp-7 · **Pass threshold:** 0.8 · **Source inspection:** no
- **Rubric:**
  - Demonstrates the section outcome: Place AI where probabilistic interpretation adds value while deterministic controls handle predictable operations. (weight 2, mandatory)
  - Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) (weight 2, mandatory)
  - Explains the decisions and trade-offs behind the work (weight 1)
  - Explains how the result was checked against the section success criteria (weight 1)
  - Identify AI-worthy steps (weight 1)
  - Keep fixed rules around them (weight 1)
  - Define review gates (weight 1)
- **Acceptance criteria (contract):**
  - Identify AI-worthy steps
  - Keep fixed rules around them
  - Define review gates

### Recorded uncertainties
- 2 content-verified resource(s) share no vocabulary with the objective — relevance needs human review.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 6 — Structured Data

**Objective:** Validate structured data between workflow steps so bad inputs do not silently propagate.

**Success criteria:**
- Define schemas
- Reject malformed data
- Create safe failure behavior

### Instruction

Automations work with data. Learn to handle structured data effectively in your workflows.


LEARNING OBJECTIVE
Validate structured data between workflow steps so bad inputs do not silently propagate.


TECHSKILLHUB LESSON
You are designing an automation where inputs, rules, exceptions, failures, and irreversible actions must be controlled. Structured Data is about data contracts. The central idea is: Validate structured data between workflow steps so bad inputs do not silently propagate. Do not treat AI output as the skill itself. The skill is the human ability to frame the problem, choose an appropriate AI role, inspect the result, and decide what happens next. Start with the required outcome and constraints, give only the context needed for that decision, and define how you will know whether the result is good enough.


COMMON MISTAKES
• Starting with a tool or prompt before defining the actual problem and success criteria.
• Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
• Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Worked example

A malformed JSON payload is rejected at the boundary instead of silently flowing into the next node.

### Common mistakes
- Starting with a tool or prompt before defining the actual problem and success criteria.
- Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
- Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Knowledge check (4 questions, server graded: yes)

1. Why validate structured data between steps?
   - To make it prettier
   - **✔ Malformed data can cause downstream failures or incorrect actions**
   - Validation is unnecessary
   - APIs never fail
   - _Answer:_ Malformed data can cause downstream failures or incorrect actions · _Why:_ Validation catches bad data early. · _Level:_ understand

2. You are given a new automation task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - Use the first AI output if it sounds confident
   - Add more adjectives to the prompt until the answer feels professional
   - **✔ Define the task, success criteria, and constraints for the automation problem before choosing how AI should help.**
   - Let the AI decide the success criteria after producing the output
   - _Answer:_ Define the task, success criteria, and constraints for the automation problem before choosing how AI should help. · _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _Level:_ apply

3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - **✔ Look for evidence that the learner can define schemas, and can reject malformed data rather than merely repeat a definition.**
   - Whether the output is polished enough to avoid review
   - Whether the prompt was longer than the previous one
   - Whether the model generated the answer quickly
   - _Answer:_ Look for evidence that the learner can define schemas, and can reject malformed data rather than merely repeat a definition. · _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _Level:_ apply

4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - Accept it because the output looks good
   - Give them the answer and mark the stage complete
   - Move them to the next stage because AI is probabilistic anyway
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - _Answer:_ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work. · _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _Level:_ analyze

### Phase project — Build: Structured Data Mini-Project (`stage:ai-automation:6`)

- **Rubric version:** sm-13zdbpg-7 · **Pass threshold:** 0.8 · **Source inspection:** no
- **Rubric:**
  - Demonstrates the section outcome: Validate structured data between workflow steps so bad inputs do not silently propagate. (weight 2, mandatory)
  - Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) (weight 2, mandatory)
  - Explains the decisions and trade-offs behind the work (weight 1)
  - Explains how the result was checked against the section success criteria (weight 1)
  - Define schemas (weight 1)
  - Reject malformed data (weight 1)
  - Create safe failure behavior (weight 1)
- **Acceptance criteria (contract):**
  - Define schemas
  - Reject malformed data
  - Create safe failure behavior

### Recorded uncertainties
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 7 — Human Approval

**Objective:** Use human approval for consequential or ambiguous actions that should not be fully automated.

**Success criteria:**
- Identify approval boundaries
- Design escalation
- Log decisions

### Instruction

Not everything should run automatically. Learn to build human oversight into your automations.


LEARNING OBJECTIVE
Use human approval for consequential or ambiguous actions that should not be fully automated.


TECHSKILLHUB LESSON
You are designing an automation where inputs, rules, exceptions, failures, and irreversible actions must be controlled. Human Approval is about human approval. The central idea is: Use human approval for consequential or ambiguous actions that should not be fully automated. Do not treat AI output as the skill itself. The skill is the human ability to frame the problem, choose an appropriate AI role, inspect the result, and decide what happens next. Start with the required outcome and constraints, give only the context needed for that decision, and define how you will know whether the result is good enough.


COMMON MISTAKES
• Starting with a tool or prompt before defining the actual problem and success criteria.
• Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
• Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Worked example

A customer-facing response requires human approval when confidence is low or the requested action is consequential.

### Common mistakes
- Starting with a tool or prompt before defining the actual problem and success criteria.
- Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
- Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Knowledge check (4 questions, server graded: yes)

1. Which action usually deserves human approval?
   - Formatting a document
   - **✔ A consequential customer refund where exceptions are possible**
   - Sorting a list
   - Renaming a file
   - _Answer:_ A consequential customer refund where exceptions are possible · _Why:_ Consequential or ambiguous actions benefit from human oversight. · _Level:_ understand

2. You are given a new automation task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - **✔ Define the task, success criteria, and constraints for the automation problem before choosing how AI should help.**
   - Use the first AI output if it sounds confident
   - Add more adjectives to the prompt until the answer feels professional
   - Let the AI decide the success criteria after producing the output
   - _Answer:_ Define the task, success criteria, and constraints for the automation problem before choosing how AI should help. · _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _Level:_ apply

3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - Whether the output is polished enough to avoid review
   - Whether the prompt was longer than the previous one
   - Whether the model generated the answer quickly
   - **✔ Look for evidence that the learner can identify approval boundaries, and can design escalation rather than merely repeat a definition.**
   - _Answer:_ Look for evidence that the learner can identify approval boundaries, and can design escalation rather than merely repeat a definition. · _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _Level:_ apply

4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - Accept it because the output looks good
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - Give them the answer and mark the stage complete
   - Move them to the next stage because AI is probabilistic anyway
   - _Answer:_ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work. · _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _Level:_ analyze

### Phase project — Build: Human Approval Mini-Project (`stage:ai-automation:7`)

- **Rubric version:** sm-857e5w-7 · **Pass threshold:** 0.8 · **Source inspection:** no
- **Rubric:**
  - Demonstrates the section outcome: Use human approval for consequential or ambiguous actions that should not be fully automated. (weight 2, mandatory)
  - Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) (weight 2, mandatory)
  - Explains the decisions and trade-offs behind the work (weight 1)
  - Explains how the result was checked against the section success criteria (weight 1)
  - Identify approval boundaries (weight 1)
  - Design escalation (weight 1)
  - Log decisions (weight 1)
- **Acceptance criteria (contract):**
  - Identify approval boundaries
  - Design escalation
  - Log decisions

### Recorded uncertainties
- 1 content-verified resource(s) share no vocabulary with the objective — relevance needs human review.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 8 — Reliable Automation

**Objective:** Operate an automation reliably with logs, alerts, bounded retries, recovery, and maintenance planning.

**Success criteria:**
- Define observability
- Design recovery
- Document maintenance

### Instruction

Production automations need to be reliable. Learn to build automations that handle errors gracefully.


LEARNING OBJECTIVE
Operate an automation reliably with logs, alerts, bounded retries, recovery, and maintenance planning.


TECHSKILLHUB LESSON
You are designing an automation where inputs, rules, exceptions, failures, and irreversible actions must be controlled. Reliable Automation is about operations and recovery. The central idea is: Operate an automation reliably with logs, alerts, bounded retries, recovery, and maintenance planning. Do not treat AI output as the skill itself. The skill is the human ability to frame the problem, choose an appropriate AI role, inspect the result, and decide what happens next. Start with the required outcome and constraints, give only the context needed for that decision, and define how you will know whether the result is good enough.


COMMON MISTAKES
• Starting with a tool or prompt before defining the actual problem and success criteria.
• Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
• Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Worked example

You add logs, alerts, bounded retries, and a recovery procedure that a teammate can operate.

### Common mistakes
- Starting with a tool or prompt before defining the actual problem and success criteria.
- Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
- Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Knowledge check (4 questions, server graded: yes)

1. A production workflow fails periodically. What should be added?
   - Ignore it
   - **✔ Logs, alerts, bounded retries, failure handling, and safe recovery/replay**
   - Infinite retries
   - More prompts only
   - _Answer:_ Logs, alerts, bounded retries, failure handling, and safe recovery/replay · _Why:_ Production automation needs observability and controlled recovery. · _Level:_ understand

2. You are given a new automation task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - Use the first AI output if it sounds confident
   - Add more adjectives to the prompt until the answer feels professional
   - Let the AI decide the success criteria after producing the output
   - **✔ Define the task, success criteria, and constraints for the automation problem before choosing how AI should help.**
   - _Answer:_ Define the task, success criteria, and constraints for the automation problem before choosing how AI should help. · _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _Level:_ apply

3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - Whether the output is polished enough to avoid review
   - **✔ Look for evidence that the learner can define observability, and can design recovery rather than merely repeat a definition.**
   - Whether the prompt was longer than the previous one
   - Whether the model generated the answer quickly
   - _Answer:_ Look for evidence that the learner can define observability, and can design recovery rather than merely repeat a definition. · _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _Level:_ apply

4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - Accept it because the output looks good
   - Give them the answer and mark the stage complete
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - Move them to the next stage because AI is probabilistic anyway
   - _Answer:_ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work. · _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _Level:_ analyze

### Phase project — Build: Production Automation Design (`ai-a-p2`)

- **Rubric version:** rizw7jo-8 · **Pass threshold:** 0.8 · **Source inspection:** yes
- **Rubric:**
  - A public, inspectable source artifact is provided (weight 1, mandatory)
  - Relevant implementation is present (not an empty or unrelated repository) (weight 2, mandatory)
  - A meaningful README explains the project (weight 1, mandatory)
  - The written explanation describes the actual submitted work (weight 1, mandatory)
  - The workflow has a clear happy path and explicit failure paths. (weight 1)
  - External inputs are authenticated and validated where appropriate. (weight 1)
  - Consequential actions have an appropriate human control. (weight 1)
  - The workflow can be explained and maintained by someone else. (weight 1)
- **Acceptance criteria (contract):**
  - The workflow has a clear happy path and explicit failure paths.
  - External inputs are authenticated and validated where appropriate.
  - Consequential actions have an appropriate human control.
  - The workflow can be explained and maintained by someone else.

### Recorded uncertainties
- 1 content-verified resource(s) share no vocabulary with the objective — relevance needs human review.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.
