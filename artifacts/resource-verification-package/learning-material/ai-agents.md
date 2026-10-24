# AI Agents (`ai-agents`)

Slug: `ai-agents` · Category: ai · Stages: 10

## Stage 1 — What AI Agents Are

**Objective:** Explain the difference between assistants, workflows, and agents, and identify when agents actually add value.

**Success criteria:**
- Classify a system correctly
- Choose the simplest suitable architecture
- Explain the tradeoff

### Instruction

Understand what AI agents are, how they work, and when they are appropriate versus overkill.


LEARNING OBJECTIVE
Explain the difference between assistants, workflows, and agents, and identify when agents actually add value.


TECHSKILLHUB LESSON
You are designing an agentic system where tools, permissions, memory, failure handling, and human approval must be explicit. What AI Agents Are is about agent fundamentals. The central idea is: Explain the difference between assistants, workflows, and agents, and identify when agents actually add value. Do not treat AI output as the skill itself. The skill is the human ability to frame the problem, choose an appropriate AI role, inspect the result, and decide what happens next. Start with the required outcome and constraints, give only the context needed for that decision, and define how you will know whether the result is good enough.


COMMON MISTAKES
• Starting with a tool or prompt before defining the actual problem and success criteria.
• Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
• Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Worked example

A known three-step process is stable, so you use a deterministic workflow instead of introducing an agent unnecessarily.

### Common mistakes
- Starting with a tool or prompt before defining the actual problem and success criteria.
- Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
- Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Knowledge check (4 questions, server graded: yes)

1. Which description best fits an AI agent?
   - A static FAQ
   - **✔ A system pursuing a goal through model decisions and tool actions within defined boundaries**
   - Any chatbot
   - A search engine
   - _Answer:_ A system pursuing a goal through model decisions and tool actions within defined boundaries · _Why:_ Agents combine model decisions with actions and boundaries. · _Level:_ understand

2. You are given a new agent systems task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - Use the first AI output if it sounds confident
   - **✔ Define the task, success criteria, and constraints for the agent systems problem before choosing how AI should help.**
   - Add more adjectives to the prompt until the answer feels professional
   - Let the AI decide the success criteria after producing the output
   - _Answer:_ Define the task, success criteria, and constraints for the agent systems problem before choosing how AI should help. · _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _Level:_ apply

3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - Whether the output is polished enough to avoid review
   - Whether the prompt was longer than the previous one
   - **✔ Look for evidence that the learner can classify a system correctly, and can choose the simplest suitable architecture rather than merely repeat a definition.**
   - Whether the model generated the answer quickly
   - _Answer:_ Look for evidence that the learner can classify a system correctly, and can choose the simplest suitable architecture rather than merely repeat a definition. · _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _Level:_ apply

4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - Accept it because the output looks good
   - Give them the answer and mark the stage complete
   - Move them to the next stage because AI is probabilistic anyway
   - _Answer:_ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work. · _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _Level:_ analyze

### Phase project — Build: What AI Agents Are Mini-Project (`stage:ai-agents:1`)

- **Rubric version:** sm-1sxld56-7 · **Pass threshold:** 0.8 · **Source inspection:** no
- **Rubric:**
  - Demonstrates the section outcome: Explain the difference between assistants, workflows, and agents, and identify when agents actually add value. (weight 2, mandatory)
  - Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) (weight 2, mandatory)
  - Explains the decisions and trade-offs behind the work (weight 1)
  - Explains how the result was checked against the section success criteria (weight 1)
  - Classify a system correctly (weight 1)
  - Choose the simplest suitable architecture (weight 1)
  - Explain the tradeoff (weight 1)
- **Acceptance criteria (contract):**
  - Classify a system correctly
  - Choose the simplest suitable architecture
  - Explain the tradeoff

### Recorded uncertainties
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 2 — Agents vs Chatbots

**Objective:** Choose deterministic workflows over agents when the process is known, stable, and easier to control.

**Success criteria:**
- Identify unnecessary agent complexity
- Compare architectures
- Justify the simpler option

### Instruction

Agents differ from chatbots in fundamental ways. Understand when each approach is appropriate.


LEARNING OBJECTIVE
Choose deterministic workflows over agents when the process is known, stable, and easier to control.


TECHSKILLHUB LESSON
You are designing an agentic system where tools, permissions, memory, failure handling, and human approval must be explicit. Agents vs Chatbots is about workflow vs agent. The central idea is: Choose deterministic workflows over agents when the process is known, stable, and easier to control. Do not treat AI output as the skill itself. The skill is the human ability to frame the problem, choose an appropriate AI role, inspect the result, and decide what happens next. Start with the required outcome and constraints, give only the context needed for that decision, and define how you will know whether the result is good enough.


COMMON MISTAKES
• Starting with a tool or prompt before defining the actual problem and success criteria.
• Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
• Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Worked example

You compare the same task as a fixed workflow and as an agent, then reject the agent when its flexibility does not justify added failure modes.

### Common mistakes
- Starting with a tool or prompt before defining the actual problem and success criteria.
- Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
- Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Knowledge check (4 questions, server graded: yes)

1. Should every simple FAQ become an agent?
   - Yes
   - **✔ No; a direct response or deterministic workflow may be simpler and more reliable**
   - Only if it is short
   - Only on mobile
   - _Answer:_ No; a direct response or deterministic workflow may be simpler and more reliable · _Why:_ Use the simplest reliable architecture that meets the need. · _Level:_ understand

2. You are given a new agent systems task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - Use the first AI output if it sounds confident
   - Add more adjectives to the prompt until the answer feels professional
   - **✔ Define the task, success criteria, and constraints for the agent systems problem before choosing how AI should help.**
   - Let the AI decide the success criteria after producing the output
   - _Answer:_ Define the task, success criteria, and constraints for the agent systems problem before choosing how AI should help. · _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _Level:_ apply

3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - **✔ Look for evidence that the learner can identify unnecessary agent complexity, and can compare architectures rather than merely repeat a definition.**
   - Whether the output is polished enough to avoid review
   - Whether the prompt was longer than the previous one
   - Whether the model generated the answer quickly
   - _Answer:_ Look for evidence that the learner can identify unnecessary agent complexity, and can compare architectures rather than merely repeat a definition. · _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _Level:_ apply

4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - Accept it because the output looks good
   - Give them the answer and mark the stage complete
   - Move them to the next stage because AI is probabilistic anyway
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - _Answer:_ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work. · _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _Level:_ analyze

### Phase project — Build: Agents vs Chatbots Mini-Project (`stage:ai-agents:2`)

- **Rubric version:** sm-15w7cod-7 · **Pass threshold:** 0.8 · **Source inspection:** no
- **Rubric:**
  - Demonstrates the section outcome: Choose deterministic workflows over agents when the process is known, stable, and easier to control. (weight 2, mandatory)
  - Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) (weight 2, mandatory)
  - Explains the decisions and trade-offs behind the work (weight 1)
  - Explains how the result was checked against the section success criteria (weight 1)
  - Identify unnecessary agent complexity (weight 1)
  - Compare architectures (weight 1)
  - Justify the simpler option (weight 1)
- **Acceptance criteria (contract):**
  - Identify unnecessary agent complexity
  - Compare architectures
  - Justify the simpler option

### Recorded uncertainties
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 3 — Agents vs Workflows

**Objective:** Design agent systems with explicit responsibilities, boundaries, and observable tool use.

**Success criteria:**
- Define the agent goal
- Specify boundaries
- Define tool responsibilities

### Instruction

Not every task needs an agent. Learn when deterministic workflows are better than agent-based approaches.


LEARNING OBJECTIVE
Design agent systems with explicit responsibilities, boundaries, and observable tool use.


TECHSKILLHUB LESSON
You are designing an agentic system where tools, permissions, memory, failure handling, and human approval must be explicit. Agents vs Workflows is about agent design. The central idea is: Design agent systems with explicit responsibilities, boundaries, and observable tool use. Do not treat AI output as the skill itself. The skill is the human ability to frame the problem, choose an appropriate AI role, inspect the result, and decide what happens next. Start with the required outcome and constraints, give only the context needed for that decision, and define how you will know whether the result is good enough.


COMMON MISTAKES
• Starting with a tool or prompt before defining the actual problem and success criteria.
• Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
• Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Worked example

You define an agent goal, allowed tools, output contract, escalation rule, and actions it is never allowed to take.

### Common mistakes
- Starting with a tool or prompt before defining the actual problem and success criteria.
- Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
- Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Knowledge check (4 questions, server graded: yes)

1. Why can deterministic workflows be preferable to agents?
   - They are always smarter
   - **✔ Known steps are easier to test, constrain, and reason about**
   - They hallucinate more
   - They need no requirements
   - _Answer:_ Known steps are easier to test, constrain, and reason about · _Why:_ Predictable processes benefit from predictable execution. · _Level:_ understand

2. You are given a new agent systems task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - **✔ Define the task, success criteria, and constraints for the agent systems problem before choosing how AI should help.**
   - Use the first AI output if it sounds confident
   - Add more adjectives to the prompt until the answer feels professional
   - Let the AI decide the success criteria after producing the output
   - _Answer:_ Define the task, success criteria, and constraints for the agent systems problem before choosing how AI should help. · _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _Level:_ apply

3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - Whether the output is polished enough to avoid review
   - Whether the prompt was longer than the previous one
   - Whether the model generated the answer quickly
   - **✔ Look for evidence that the learner can define the agent goal, and can specify boundaries rather than merely repeat a definition.**
   - _Answer:_ Look for evidence that the learner can define the agent goal, and can specify boundaries rather than merely repeat a definition. · _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _Level:_ apply

4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - Accept it because the output looks good
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - Give them the answer and mark the stage complete
   - Move them to the next stage because AI is probabilistic anyway
   - _Answer:_ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work. · _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _Level:_ analyze

### Phase project — Build: Agents vs Workflows Mini-Project (`stage:ai-agents:3`)

- **Rubric version:** sm-1seldlk-7 · **Pass threshold:** 0.8 · **Source inspection:** no
- **Rubric:**
  - Demonstrates the section outcome: Design agent systems with explicit responsibilities, boundaries, and observable tool use. (weight 2, mandatory)
  - Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) (weight 2, mandatory)
  - Explains the decisions and trade-offs behind the work (weight 1)
  - Explains how the result was checked against the section success criteria (weight 1)
  - Define the agent goal (weight 1)
  - Specify boundaries (weight 1)
  - Define tool responsibilities (weight 1)
- **Acceptance criteria (contract):**
  - Define the agent goal
  - Specify boundaries
  - Define tool responsibilities

### Recorded uncertainties
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 4 — Tools

**Objective:** Create safe tool contracts with clear inputs, outputs, permissions, constraints, and validation.

**Success criteria:**
- Define tool schemas
- Restrict permissions
- Validate tool results

### Instruction

Agents need tools to interact with the world. Learn to define, select, and integrate tools for agent systems.


LEARNING OBJECTIVE
Create safe tool contracts with clear inputs, outputs, permissions, constraints, and validation.


TECHSKILLHUB LESSON
You are designing an agentic system where tools, permissions, memory, failure handling, and human approval must be explicit. Tools is about tool contracts. The central idea is: Create safe tool contracts with clear inputs, outputs, permissions, constraints, and validation. Do not treat AI output as the skill itself. The skill is the human ability to frame the problem, choose an appropriate AI role, inspect the result, and decide what happens next. Start with the required outcome and constraints, give only the context needed for that decision, and define how you will know whether the result is good enough.


COMMON MISTAKES
• Starting with a tool or prompt before defining the actual problem and success criteria.
• Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
• Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Worked example

A database tool can read records but cannot delete them. Permissions reflect the actual risk of the action.

### Common mistakes
- Starting with a tool or prompt before defining the actual problem and success criteria.
- Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
- Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Knowledge check (4 questions, server graded: yes)

1. What should an agent tool contract define?
   - Only a name
   - **✔ Purpose, inputs, constraints, permissions, and expected result**
   - Marketing copy
   - No validation
   - _Answer:_ Purpose, inputs, constraints, permissions, and expected result · _Why:_ Tools define the agent’s action boundary and need explicit contracts. · _Level:_ understand

2. You are given a new agent systems task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - Use the first AI output if it sounds confident
   - Add more adjectives to the prompt until the answer feels professional
   - Let the AI decide the success criteria after producing the output
   - **✔ Define the task, success criteria, and constraints for the agent systems problem before choosing how AI should help.**
   - _Answer:_ Define the task, success criteria, and constraints for the agent systems problem before choosing how AI should help. · _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _Level:_ apply

3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - Whether the output is polished enough to avoid review
   - **✔ Look for evidence that the learner can define tool schemas, and can restrict permissions rather than merely repeat a definition.**
   - Whether the prompt was longer than the previous one
   - Whether the model generated the answer quickly
   - _Answer:_ Look for evidence that the learner can define tool schemas, and can restrict permissions rather than merely repeat a definition. · _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _Level:_ apply

4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - Accept it because the output looks good
   - Give them the answer and mark the stage complete
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - Move them to the next stage because AI is probabilistic anyway
   - _Answer:_ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work. · _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _Level:_ analyze

### Phase project — Build: Tools Mini-Project (`stage:ai-agents:4`)

- **Rubric version:** sm-2w97rd-7 · **Pass threshold:** 0.8 · **Source inspection:** no
- **Rubric:**
  - Demonstrates the section outcome: Create safe tool contracts with clear inputs, outputs, permissions, constraints, and validation. (weight 2, mandatory)
  - Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) (weight 2, mandatory)
  - Explains the decisions and trade-offs behind the work (weight 1)
  - Explains how the result was checked against the section success criteria (weight 1)
  - Define tool schemas (weight 1)
  - Restrict permissions (weight 1)
  - Validate tool results (weight 1)
- **Acceptance criteria (contract):**
  - Define tool schemas
  - Restrict permissions
  - Validate tool results

### Recorded uncertainties
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 5 — Context & Memory

**Objective:** Design context and memory so the agent receives relevant information without uncontrolled state accumulation.

**Success criteria:**
- Define memory scope
- Remove irrelevant state
- Protect sensitive information

### Instruction

Agents need to remember and use context effectively. Learn about memory systems and context management.


LEARNING OBJECTIVE
Design context and memory so the agent receives relevant information without uncontrolled state accumulation.


TECHSKILLHUB LESSON
You are designing an agentic system where tools, permissions, memory, failure handling, and human approval must be explicit. Context & Memory is about context and memory. The central idea is: Design context and memory so the agent receives relevant information without uncontrolled state accumulation. Do not treat AI output as the skill itself. The skill is the human ability to frame the problem, choose an appropriate AI role, inspect the result, and decide what happens next. Start with the required outcome and constraints, give only the context needed for that decision, and define how you will know whether the result is good enough.


COMMON MISTAKES
• Starting with a tool or prompt before defining the actual problem and success criteria.
• Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
• Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Worked example

You define what short-term context belongs in the current run and what long-term memory is appropriate to retain.

### Common mistakes
- Starting with a tool or prompt before defining the actual problem and success criteria.
- Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
- Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Knowledge check (4 questions, server graded: yes)

1. Why is poorly designed long-term memory risky?
   - It uses no storage
   - **✔ Stale, irrelevant, or sensitive information can influence future decisions**
   - Memory always improves accuracy
   - Agents cannot use context
   - _Answer:_ Stale, irrelevant, or sensitive information can influence future decisions · _Why:_ Memory introduces state that must be governed and relevant. · _Level:_ understand

2. You are given a new agent systems task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - Use the first AI output if it sounds confident
   - **✔ Define the task, success criteria, and constraints for the agent systems problem before choosing how AI should help.**
   - Add more adjectives to the prompt until the answer feels professional
   - Let the AI decide the success criteria after producing the output
   - _Answer:_ Define the task, success criteria, and constraints for the agent systems problem before choosing how AI should help. · _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _Level:_ apply

3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - Whether the output is polished enough to avoid review
   - Whether the prompt was longer than the previous one
   - **✔ Look for evidence that the learner can define memory scope, and can remove irrelevant state rather than merely repeat a definition.**
   - Whether the model generated the answer quickly
   - _Answer:_ Look for evidence that the learner can define memory scope, and can remove irrelevant state rather than merely repeat a definition. · _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _Level:_ apply

4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - Accept it because the output looks good
   - Give them the answer and mark the stage complete
   - Move them to the next stage because AI is probabilistic anyway
   - _Answer:_ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work. · _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _Level:_ analyze

### Phase project — Build: Context & Memory Mini-Project (`stage:ai-agents:5`)

- **Rubric version:** sm-1qicmdl-7 · **Pass threshold:** 0.8 · **Source inspection:** no
- **Rubric:**
  - Demonstrates the section outcome: Design context and memory so the agent receives relevant information without uncontrolled state accumulation. (weight 2, mandatory)
  - Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) (weight 2, mandatory)
  - Explains the decisions and trade-offs behind the work (weight 1)
  - Explains how the result was checked against the section success criteria (weight 1)
  - Define memory scope (weight 1)
  - Remove irrelevant state (weight 1)
  - Protect sensitive information (weight 1)
- **Acceptance criteria (contract):**
  - Define memory scope
  - Remove irrelevant state
  - Protect sensitive information

### Recorded uncertainties
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 6 — Planning

**Objective:** Handle agent failure with bounded retries, replanning, and escalation rather than infinite autonomous looping.

**Success criteria:**
- Define failure limits
- Design recovery
- Escalate when required

### Instruction

Agents must plan before acting. Learn task decomposition, plan generation, and adaptive replanning.


LEARNING OBJECTIVE
Handle agent failure with bounded retries, replanning, and escalation rather than infinite autonomous looping.


TECHSKILLHUB LESSON
You are designing an agentic system where tools, permissions, memory, failure handling, and human approval must be explicit. Planning is about failure handling. The central idea is: Handle agent failure with bounded retries, replanning, and escalation rather than infinite autonomous looping. Do not treat AI output as the skill itself. The skill is the human ability to frame the problem, choose an appropriate AI role, inspect the result, and decide what happens next. Start with the required outcome and constraints, give only the context needed for that decision, and define how you will know whether the result is good enough.


COMMON MISTAKES
• Starting with a tool or prompt before defining the actual problem and success criteria.
• Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
• Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Worked example

After two failed attempts, an agent escalates rather than looping indefinitely.

### Common mistakes
- Starting with a tool or prompt before defining the actual problem and success criteria.
- Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
- Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Knowledge check (4 questions, server graded: yes)

1. An agent repeatedly fails a subtask. What should it do?
   - Retry forever
   - **✔ Use bounded recovery/replanning and escalate when appropriate**
   - Hide the error
   - Invent a result
   - _Answer:_ Use bounded recovery/replanning and escalate when appropriate · _Why:_ Reliable agents need bounded recovery and escalation. · _Level:_ understand

2. You are given a new agent systems task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - Use the first AI output if it sounds confident
   - Add more adjectives to the prompt until the answer feels professional
   - **✔ Define the task, success criteria, and constraints for the agent systems problem before choosing how AI should help.**
   - Let the AI decide the success criteria after producing the output
   - _Answer:_ Define the task, success criteria, and constraints for the agent systems problem before choosing how AI should help. · _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _Level:_ apply

3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - **✔ Look for evidence that the learner can define failure limits, and can design recovery rather than merely repeat a definition.**
   - Whether the output is polished enough to avoid review
   - Whether the prompt was longer than the previous one
   - Whether the model generated the answer quickly
   - _Answer:_ Look for evidence that the learner can define failure limits, and can design recovery rather than merely repeat a definition. · _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _Level:_ apply

4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - Accept it because the output looks good
   - Give them the answer and mark the stage complete
   - Move them to the next stage because AI is probabilistic anyway
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - _Answer:_ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work. · _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _Level:_ analyze

### Phase project — Build: Planning Mini-Project (`stage:ai-agents:6`)

- **Rubric version:** sm-pledli-7 · **Pass threshold:** 0.8 · **Source inspection:** no
- **Rubric:**
  - Demonstrates the section outcome: Handle agent failure with bounded retries, replanning, and escalation rather than infinite autonomous looping. (weight 2, mandatory)
  - Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) (weight 2, mandatory)
  - Explains the decisions and trade-offs behind the work (weight 1)
  - Explains how the result was checked against the section success criteria (weight 1)
  - Define failure limits (weight 1)
  - Design recovery (weight 1)
  - Escalate when required (weight 1)
- **Acceptance criteria (contract):**
  - Define failure limits
  - Design recovery
  - Escalate when required

### Recorded uncertainties
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 7 — Tool Use

**Objective:** Make agent behavior observable enough to diagnose failures and audit consequential actions.

**Success criteria:**
- Capture tool traces
- Define useful logs
- Use traces during debugging

### Instruction

Deep dive into how agents use tools — from function calling to multi-tool reasoning chains.


LEARNING OBJECTIVE
Make agent behavior observable enough to diagnose failures and audit consequential actions.


TECHSKILLHUB LESSON
You are designing an agentic system where tools, permissions, memory, failure handling, and human approval must be explicit. Tool Use is about observability. The central idea is: Make agent behavior observable enough to diagnose failures and audit consequential actions. Do not treat AI output as the skill itself. The skill is the human ability to frame the problem, choose an appropriate AI role, inspect the result, and decide what happens next. Start with the required outcome and constraints, give only the context needed for that decision, and define how you will know whether the result is good enough.


COMMON MISTAKES
• Starting with a tool or prompt before defining the actual problem and success criteria.
• Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
• Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Worked example

A tool trace shows the agent called the wrong API twice. You use the trace to diagnose the planning error.

### Common mistakes
- Starting with a tool or prompt before defining the actual problem and success criteria.
- Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
- Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Knowledge check (4 questions, server graded: yes)

1. Why should tool calls be observable?
   - Decoration
   - **✔ To diagnose failures and audit consequential behavior**
   - To use more tokens
   - To remove testing
   - _Answer:_ To diagnose failures and audit consequential behavior · _Why:_ Tool traces provide evidence of agent behavior. · _Level:_ understand

2. You are given a new agent systems task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - **✔ Define the task, success criteria, and constraints for the agent systems problem before choosing how AI should help.**
   - Use the first AI output if it sounds confident
   - Add more adjectives to the prompt until the answer feels professional
   - Let the AI decide the success criteria after producing the output
   - _Answer:_ Define the task, success criteria, and constraints for the agent systems problem before choosing how AI should help. · _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _Level:_ apply

3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - Whether the output is polished enough to avoid review
   - Whether the prompt was longer than the previous one
   - Whether the model generated the answer quickly
   - **✔ Look for evidence that the learner can capture tool traces, and can define useful logs rather than merely repeat a definition.**
   - _Answer:_ Look for evidence that the learner can capture tool traces, and can define useful logs rather than merely repeat a definition. · _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _Level:_ apply

4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - Accept it because the output looks good
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - Give them the answer and mark the stage complete
   - Move them to the next stage because AI is probabilistic anyway
   - _Answer:_ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work. · _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _Level:_ analyze

### Phase project — Build: Tool Use Mini-Project (`stage:ai-agents:7`)

- **Rubric version:** sm-172dvio-7 · **Pass threshold:** 0.8 · **Source inspection:** no
- **Rubric:**
  - Demonstrates the section outcome: Make agent behavior observable enough to diagnose failures and audit consequential actions. (weight 2, mandatory)
  - Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) (weight 2, mandatory)
  - Explains the decisions and trade-offs behind the work (weight 1)
  - Explains how the result was checked against the section success criteria (weight 1)
  - Capture tool traces (weight 1)
  - Define useful logs (weight 1)
  - Use traces during debugging (weight 1)
- **Acceptance criteria (contract):**
  - Capture tool traces
  - Define useful logs
  - Use traces during debugging

### Recorded uncertainties
- 1 content-verified resource(s) share no vocabulary with the objective — relevance needs human review.
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 8 — Human Oversight

**Objective:** Place human approval at the right points for consequential, irreversible, or ambiguous actions.

**Success criteria:**
- Identify high-impact actions
- Define approval gates
- Document escalation

### Instruction

Agents should not operate without oversight for important tasks. Learn to build appropriate human checkpoints.


LEARNING OBJECTIVE
Place human approval at the right points for consequential, irreversible, or ambiguous actions.


TECHSKILLHUB LESSON
You are designing an agentic system where tools, permissions, memory, failure handling, and human approval must be explicit. Human Oversight is about human approval. The central idea is: Place human approval at the right points for consequential, irreversible, or ambiguous actions. Do not treat AI output as the skill itself. The skill is the human ability to frame the problem, choose an appropriate AI role, inspect the result, and decide what happens next. Start with the required outcome and constraints, give only the context needed for that decision, and define how you will know whether the result is good enough.


COMMON MISTAKES
• Starting with a tool or prompt before defining the actual problem and success criteria.
• Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
• Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Worked example

A purchase or account change requires human approval before execution.

### Common mistakes
- Starting with a tool or prompt before defining the actual problem and success criteria.
- Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
- Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Knowledge check (4 questions, server graded: yes)

1. Which task clearly warrants human approval?
   - Drafting a note
   - **✔ Executing an irreversible financial transaction from ambiguous evidence**
   - Formatting JSON
   - Generating ideas
   - _Answer:_ Executing an irreversible financial transaction from ambiguous evidence · _Why:_ High-impact irreversible actions require strong controls. · _Level:_ understand

2. You are given a new agent systems task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - Use the first AI output if it sounds confident
   - Add more adjectives to the prompt until the answer feels professional
   - Let the AI decide the success criteria after producing the output
   - **✔ Define the task, success criteria, and constraints for the agent systems problem before choosing how AI should help.**
   - _Answer:_ Define the task, success criteria, and constraints for the agent systems problem before choosing how AI should help. · _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _Level:_ apply

3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - Whether the output is polished enough to avoid review
   - **✔ Look for evidence that the learner can identify high-impact actions, and can define approval gates rather than merely repeat a definition.**
   - Whether the prompt was longer than the previous one
   - Whether the model generated the answer quickly
   - _Answer:_ Look for evidence that the learner can identify high-impact actions, and can define approval gates rather than merely repeat a definition. · _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _Level:_ apply

4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - Accept it because the output looks good
   - Give them the answer and mark the stage complete
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - Move them to the next stage because AI is probabilistic anyway
   - _Answer:_ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work. · _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _Level:_ analyze

### Phase project — Build: Human Oversight Mini-Project (`stage:ai-agents:8`)

- **Rubric version:** sm-14r2zz4-7 · **Pass threshold:** 0.8 · **Source inspection:** no
- **Rubric:**
  - Demonstrates the section outcome: Place human approval at the right points for consequential, irreversible, or ambiguous actions. (weight 2, mandatory)
  - Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) (weight 2, mandatory)
  - Explains the decisions and trade-offs behind the work (weight 1)
  - Explains how the result was checked against the section success criteria (weight 1)
  - Identify high-impact actions (weight 1)
  - Define approval gates (weight 1)
  - Document escalation (weight 1)
- **Acceptance criteria (contract):**
  - Identify high-impact actions
  - Define approval gates
  - Document escalation

### Recorded uncertainties
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 9 — Reliability

**Objective:** Evaluate agents using representative normal cases, edge cases, failures, and safety-sensitive scenarios.

**Success criteria:**
- Build an evaluation set
- Define expected outcomes
- Track regressions

### Instruction

Agent systems fail in unpredictable ways. Learn to build reliable agent systems with proper error handling.


LEARNING OBJECTIVE
Evaluate agents using representative normal cases, edge cases, failures, and safety-sensitive scenarios.


TECHSKILLHUB LESSON
You are designing an agentic system where tools, permissions, memory, failure handling, and human approval must be explicit. Reliability is about evaluation. The central idea is: Evaluate agents using representative normal cases, edge cases, failures, and safety-sensitive scenarios. Do not treat AI output as the skill itself. The skill is the human ability to frame the problem, choose an appropriate AI role, inspect the result, and decide what happens next. Start with the required outcome and constraints, give only the context needed for that decision, and define how you will know whether the result is good enough.


COMMON MISTAKES
• Starting with a tool or prompt before defining the actual problem and success criteria.
• Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
• Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Worked example

You test normal, ambiguous, adversarial, and failure cases against expected outcomes.

### Common mistakes
- Starting with a tool or prompt before defining the actual problem and success criteria.
- Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
- Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Knowledge check (4 questions, server graded: yes)

1. What should an agent evaluation set contain?
   - Only easy cases
   - **✔ Representative normal cases, edge cases, failures, and safety-sensitive scenarios**
   - Only developer favorites
   - No expected outcomes
   - _Answer:_ Representative normal cases, edge cases, failures, and safety-sensitive scenarios · _Why:_ Evaluation should reflect real use and important failure modes. · _Level:_ understand

2. You are given a new agent systems task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - Use the first AI output if it sounds confident
   - **✔ Define the task, success criteria, and constraints for the agent systems problem before choosing how AI should help.**
   - Add more adjectives to the prompt until the answer feels professional
   - Let the AI decide the success criteria after producing the output
   - _Answer:_ Define the task, success criteria, and constraints for the agent systems problem before choosing how AI should help. · _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _Level:_ apply

3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - Whether the output is polished enough to avoid review
   - Whether the prompt was longer than the previous one
   - **✔ Look for evidence that the learner can build an evaluation set, and can define expected outcomes rather than merely repeat a definition.**
   - Whether the model generated the answer quickly
   - _Answer:_ Look for evidence that the learner can build an evaluation set, and can define expected outcomes rather than merely repeat a definition. · _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _Level:_ apply

4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - Accept it because the output looks good
   - Give them the answer and mark the stage complete
   - Move them to the next stage because AI is probabilistic anyway
   - _Answer:_ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work. · _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _Level:_ analyze

### Phase project — Build: Reliability Mini-Project (`stage:ai-agents:9`)

- **Rubric version:** sm-1suseuo-7 · **Pass threshold:** 0.8 · **Source inspection:** no
- **Rubric:**
  - Demonstrates the section outcome: Evaluate agents using representative normal cases, edge cases, failures, and safety-sensitive scenarios. (weight 2, mandatory)
  - Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) (weight 2, mandatory)
  - Explains the decisions and trade-offs behind the work (weight 1)
  - Explains how the result was checked against the section success criteria (weight 1)
  - Build an evaluation set (weight 1)
  - Define expected outcomes (weight 1)
  - Track regressions (weight 1)
- **Acceptance criteria (contract):**
  - Build an evaluation set
  - Define expected outcomes
  - Track regressions

### Recorded uncertainties
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.

## Stage 10 — Agent Workflow Design

**Objective:** Justify agent complexity and coordinate specialized agents only when it creates measurable value.

**Success criteria:**
- Compare single vs multi-agent designs
- Measure the benefit
- Reject unnecessary complexity

### Instruction

Design complete agent systems that coordinate multiple agents, manage resources, and deliver reliable results.


LEARNING OBJECTIVE
Justify agent complexity and coordinate specialized agents only when it creates measurable value.


TECHSKILLHUB LESSON
You are designing an agentic system where tools, permissions, memory, failure handling, and human approval must be explicit. Agent Workflow Design is about multi-agent tradeoffs. The central idea is: Justify agent complexity and coordinate specialized agents only when it creates measurable value. Do not treat AI output as the skill itself. The skill is the human ability to frame the problem, choose an appropriate AI role, inspect the result, and decide what happens next. Start with the required outcome and constraints, give only the context needed for that decision, and define how you will know whether the result is good enough.


COMMON MISTAKES
• Starting with a tool or prompt before defining the actual problem and success criteria.
• Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
• Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Worked example

A multi-agent design adds coordination overhead with no measurable benefit, so you simplify it.

### Common mistakes
- Starting with a tool or prompt before defining the actual problem and success criteria.
- Treating a fluent or visually polished AI result as proof that it is correct or fit for purpose.
- Skipping an independent check when the output affects facts, code, money, privacy, safety, or other consequential decisions.

### Knowledge check (4 questions, server graded: yes)

1. When is multi-agent coordination justified?
   - Always
   - **✔ When specialized responsibilities provide measurable value that a simpler design cannot**
   - For every chatbot
   - Only for images
   - _Answer:_ When specialized responsibilities provide measurable value that a simpler design cannot · _Why:_ Complexity should be justified by a real requirement. · _Level:_ understand

2. You are given a new agent systems task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - Use the first AI output if it sounds confident
   - Add more adjectives to the prompt until the answer feels professional
   - **✔ Define the task, success criteria, and constraints for the agent systems problem before choosing how AI should help.**
   - Let the AI decide the success criteria after producing the output
   - _Answer:_ Define the task, success criteria, and constraints for the agent systems problem before choosing how AI should help. · _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _Level:_ apply

3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - **✔ Look for evidence that the learner can compare single vs multi-agent designs, and can measure the benefit rather than merely repeat a definition.**
   - Whether the output is polished enough to avoid review
   - Whether the prompt was longer than the previous one
   - Whether the model generated the answer quickly
   - _Answer:_ Look for evidence that the learner can compare single vs multi-agent designs, and can measure the benefit rather than merely repeat a definition. · _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _Level:_ apply

4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - Accept it because the output looks good
   - Give them the answer and mark the stage complete
   - Move them to the next stage because AI is probabilistic anyway
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - _Answer:_ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work. · _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _Level:_ analyze

### Phase project — Build: Bounded Agent System (`ai-ag-p2`)

- **Rubric version:** rizw7jo-8 · **Pass threshold:** 0.8 · **Source inspection:** yes
- **Rubric:**
  - A public, inspectable source artifact is provided (weight 1, mandatory)
  - Relevant implementation is present (not an empty or unrelated repository) (weight 2, mandatory)
  - A meaningful README explains the project (weight 1, mandatory)
  - The written explanation describes the actual submitted work (weight 1, mandatory)
  - Every tool has a clear contract and constrained permission set. (weight 1)
  - Irreversible or high-impact actions have human approval. (weight 1)
  - Evaluation cases have expected outcomes. (weight 1)
  - Failure handling is bounded; the agent cannot retry indefinitely. (weight 1)
- **Acceptance criteria (contract):**
  - Every tool has a clear contract and constrained permission set.
  - Irreversible or high-impact actions have human approval.
  - Evaluation cases have expected outcomes.
  - Failure handling is bounded; the agent cannot retry indefinitely.

### Recorded uncertainties
- Factual accuracy, currency, accessibility and pedagogical fit require human subject-matter review.
