# Reviewer packet — AI Agents

- **Track id:** `ai-agents`  ·  **Slug:** `ai-agents`  ·  **Category:** ai  ·  **AI track:** yes
- **Status:** ⏳ AWAITING INDEPENDENT HUMAN REVIEW — **not approved**.
- **Automated evidence (not approval):** readiness 100/100 · worthiness 100/100 · mandatory gates pass. A passing mechanical audit is not human sign-off.

> This packet contains internal answer keys and rubric criteria for review purposes. It includes only short original excerpts of external resources; no third-party material is reproduced in full.

## 1. Learning objectives and sequence

| # | Stage | Objective | Est. time | Lessons |
| --- | --- | --- | --- | --- |
| 1 | What AI Agents Are | Explain the difference between assistants, workflows, and agents, and identify when agents actually add value. | 1 week | 5 |
| 2 | Agents vs Chatbots | Choose deterministic workflows over agents when the process is known, stable, and easier to control. | 3 to 5 days | 5 |
| 3 | Agents vs Workflows | Design agent systems with explicit responsibilities, boundaries, and observable tool use. | 3 to 5 days | 5 |
| 4 | Tools | Create safe tool contracts with clear inputs, outputs, permissions, constraints, and validation. | 1 week | 6 |
| 5 | Context & Memory | Design context and memory so the agent receives relevant information without uncontrolled state accumulation. | 1 week | 5 |
| 6 | Planning | Handle agent failure with bounded retries, replanning, and escalation rather than infinite autonomous looping. | 1 week | 5 |
| 7 | Tool Use | Make agent behavior observable enough to diagnose failures and audit consequential actions. | 1 week | 5 |
| 8 | Human Oversight | Place human approval at the right points for consequential, irreversible, or ambiguous actions. | 3 to 5 days | 5 |
| 9 | Reliability | Evaluate agents using representative normal cases, edge cases, failures, and safety-sensitive scenarios. | 1 week | 5 |
| 10 | Agent Workflow Design | Justify agent complexity and coordinate specialized agents only when it creates measurable value. | 1 week | 5 |

## 2. Representative and high-risk lessons

Representative lessons (first, middle, last so a reviewer sees the whole arc): stages 1, 6, 10.

Highest-risk lessons by resource evidence (verify these first):

- **Stage 1 — What AI Agents Are**: content-inspected required resources 2, objective-matching resources 2, playback-verified resources 0.
- **Stage 2 — Agents vs Chatbots**: content-inspected required resources 1, objective-matching resources 1, playback-verified resources 0.
- **Stage 3 — Agents vs Workflows**: content-inspected required resources 2, objective-matching resources 2, playback-verified resources 0.

## 3. External resource evidence (destination + inspected content)

### Stage 1 — What AI Agents Are

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| OpenAI Academy — Agents & Workflows | required | L3 | content-inspection | — | 2 | https://academy.openai.com/ |
| Microsoft Learn — Generative AI and Agents | required | L3 | content-inspection | — | 3 | https://learn.microsoft.com/en-us/training/modules/fundamentals-generative-ai/ |
- _L3 required evidence — OpenAI Academy: “OpenAI Academy Unlock the opportunities of the AI era by equipping yourself with the knowledge and skills to harness artificial intelligence effectively. Build the AI skills your organization needs For knowledge workers…”_
- _L3 required evidence — Microsoft Learn: “Read in English Introduction to generative AI and agents Module 7 Units Beginner AI Engineer Developer Solution Architect Student Microsoft Foundry Generative AI powers applications that can create content, answer quest…”_

### Stage 2 — Agents vs Chatbots

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Microsoft — Responsible AI for Agents | required | L3 | content-inspection | — | 2 | https://learn.microsoft.com/en-us/agents/design-guidelines/responsible-ai |
- _L3 required evidence — Microsoft Learn: “Read in English Edit Note Access to this page requires authorization. You can try signing in or changing directories . Access to this page requires authorization. You can try changing directories . Responsible AI for ag…”_

### Stage 3 — Agents vs Workflows

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Anthropic — Build With Claude | required | L3 | content-inspection | — | 2 | https://www.anthropic.com/learn/build-with-claude |
| Microsoft — Responsible AI | required | L3 | content-inspection | — | 3 | https://learn.microsoft.com/en-us/agents/center-of-excellence/responsible-ai |
- _L3 required evidence — Anthropic: “Build with Claude Courses and tutorials from Anthropic for developers. Learn Claude Code and the Claude API, then build agents with MCP, skills, and tool use. Start here Claude Code 101 An agentic coding tool that lives…”_
- _L3 required evidence — Microsoft Learn: “Read in English Edit Note Access to this page requires authorization. You can try signing in or changing directories . Access to this page requires authorization. You can try changing directories . Apply responsible AI …”_

### Stage 4 — Tools

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Microsoft Learn — Get Started With Generative AI and Agents | required | L3 | content-inspection | — | 2 | https://learn.microsoft.com/en-us/training/modules/get-started-with-generative-ai-and-agents/ |
| OpenAI API — Working with evals | required | L3 | content-inspection | — | 1 | https://platform.openai.com/docs/guides/evals |
| Microsoft Learn — Design responsible agent boundaries, data… | required | L3 | content-inspection | — | 1 | https://learn.microsoft.com/en-us/agents/design-guidelines/responsible-ai |
- _L3 required evidence — Microsoft Learn: “Read in English Get started with generative AI and agents in Azure Module 7 Units Beginner AI Engineer Data Scientist Developer Solution Architect Student Microsoft Foundry Learn how to use generative AI models and agen…”_
- _L3 required evidence — OpenAI: “Responses Evaluations (often called evals ) test model outputs to ensure they meet style and content criteria that you specify. Writing evals to understand how your LLM applications are performing against your expectati…”_
- _L3 required evidence — Microsoft Learn: “Read in English Edit Note Access to this page requires authorization. You can try signing in or changing directories . Access to this page requires authorization. You can try changing directories . Responsible AI for ag…”_

### Stage 5 — Context & Memory

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| LangGraph — Memory Overview | required | L3 | content-inspection | 14 min | 5 | https://docs.langchain.com/oss/python/langgraph/memory |
- _L3 required evidence — LangChain: “Memory is a system that remembers information about previous interactions. For AI agents, memory is crucial because it lets them remember previous interactions, learn from feedback, and adapt to user preferences. As age…”_

### Stage 6 — Planning

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| LangGraph — Overview (Graphs, Planning and Control Flow) | required | L3 | content-inspection | — | 1 | https://docs.langchain.com/oss/python/langgraph/overview |
- _L3 required evidence — LangChain: “Trusted by companies shaping the future of agents—including Klarna, Uber, J.P. Morgan, and more—LangGraph is a low-level orchestration framework and runtime for building, managing, and deploying long-running, stateful a…”_

### Stage 7 — Tool Use

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Anthropic — Build With Claude | required | L3 | content-inspection | — | 2 | https://www.anthropic.com/learn/build-with-claude |
| OpenAI — Evaluate agent behavior with repeatable test cases… | required | L3 | content-inspection | — | 0 | https://platform.openai.com/docs/guides/evals |
- _L3 required evidence — Anthropic: “Build with Claude Courses and tutorials from Anthropic for developers. Learn Claude Code and the Claude API, then build agents with MCP, skills, and tool use. Start here Claude Code 101 An agentic coding tool that lives…”_
- _L3 required evidence — OpenAI: “Responses Evaluations (often called evals ) test model outputs to ensure they meet style and content criteria that you specify. Writing evals to understand how your LLM applications are performing against your expectati…”_

### Stage 8 — Human Oversight

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Microsoft Learn — Responsible AI in Azure Workloads (Oversi… | required | L3 | content-inspection | — | 2 | https://learn.microsoft.com/en-us/azure/well-architected/ai/responsible-ai |
- _L3 required evidence — Microsoft Learn: “Read in English Edit Note Access to this page requires authorization. You can try signing in or changing directories . Access to this page requires authorization. You can try changing directories . Responsible AI in Azu…”_

### Stage 9 — Reliability

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| LangGraph — Testing | required | L3 | content-inspection | 14 min | 2 | https://docs.langchain.com/oss/python/langgraph/test |
- _L3 required evidence — LangChain: “After you’ve prototyped your LangGraph agent, a natural next step is to add tests. This guide covers some useful patterns you can use when writing unit tests. Note that this guide is LangGraph-specific and covers scenar…”_

### Stage 10 — Agent Workflow Design

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| LangChain Documentation | required | L3 | content-inspection | — | 2 | https://python.langchain.com/docs/get_started/introduction |
- _L3 required evidence — LangChain: “This quickstart shows you how to create a fully functional AI agent in just a few minutes. Build the LangChain quickstart agent Using an AI coding assistant? Install the LangChain Docs MCP servers to give your agent acc…”_

## 4. Required video segments and measured duration

No required video resources on this track — all required material is text/interactive.

## 5. Knowledge checks and answer keys (internal)

### Stage 1 — What AI Agents Are (4 questions)

1. Which description best fits an AI agent?
   - · A static FAQ
   - **✔ A system pursuing a goal through model decisions and tool actions within defined boundaries**
   - · Any chatbot
   - · A search engine
   - _Why:_ Agents combine model decisions with actions and boundaries. · _level: understand_
2. You are given a new agent systems task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - · Use the first AI output if it sounds confident
   - **✔ Define the task, success criteria, and constraints for the agent systems problem before choosing how AI should help.**
   - · Add more adjectives to the prompt until the answer feels professional
   - · Let the AI decide the success criteria after producing the output
   - _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _level: apply_
3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - · Whether the output is polished enough to avoid review
   - · Whether the prompt was longer than the previous one
   - **✔ Look for evidence that the learner can classify a system correctly, and can choose the simplest suitable architecture rather than merely repeat a definition.**
   - · Whether the model generated the answer quickly
   - _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _level: apply_
4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - · Accept it because the output looks good
   - · Give them the answer and mark the stage complete
   - · Move them to the next stage because AI is probabilistic anyway
   - _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _level: analyze_

### Stage 2 — Agents vs Chatbots (4 questions)

1. Should every simple FAQ become an agent?
   - · Yes
   - **✔ No; a direct response or deterministic workflow may be simpler and more reliable**
   - · Only if it is short
   - · Only on mobile
   - _Why:_ Use the simplest reliable architecture that meets the need. · _level: understand_
2. You are given a new agent systems task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - · Use the first AI output if it sounds confident
   - · Add more adjectives to the prompt until the answer feels professional
   - **✔ Define the task, success criteria, and constraints for the agent systems problem before choosing how AI should help.**
   - · Let the AI decide the success criteria after producing the output
   - _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _level: apply_
3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - **✔ Look for evidence that the learner can identify unnecessary agent complexity, and can compare architectures rather than merely repeat a definition.**
   - · Whether the output is polished enough to avoid review
   - · Whether the prompt was longer than the previous one
   - · Whether the model generated the answer quickly
   - _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _level: apply_
4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - · Accept it because the output looks good
   - · Give them the answer and mark the stage complete
   - · Move them to the next stage because AI is probabilistic anyway
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _level: analyze_

### Stage 3 — Agents vs Workflows (4 questions)

1. Why can deterministic workflows be preferable to agents?
   - · They are always smarter
   - **✔ Known steps are easier to test, constrain, and reason about**
   - · They hallucinate more
   - · They need no requirements
   - _Why:_ Predictable processes benefit from predictable execution. · _level: understand_
2. You are given a new agent systems task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - **✔ Define the task, success criteria, and constraints for the agent systems problem before choosing how AI should help.**
   - · Use the first AI output if it sounds confident
   - · Add more adjectives to the prompt until the answer feels professional
   - · Let the AI decide the success criteria after producing the output
   - _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _level: apply_
3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - · Whether the output is polished enough to avoid review
   - · Whether the prompt was longer than the previous one
   - · Whether the model generated the answer quickly
   - **✔ Look for evidence that the learner can define the agent goal, and can specify boundaries rather than merely repeat a definition.**
   - _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _level: apply_
4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - · Accept it because the output looks good
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - · Give them the answer and mark the stage complete
   - · Move them to the next stage because AI is probabilistic anyway
   - _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _level: analyze_

### Stage 4 — Tools (4 questions)

1. What should an agent tool contract define?
   - · Only a name
   - **✔ Purpose, inputs, constraints, permissions, and expected result**
   - · Marketing copy
   - · No validation
   - _Why:_ Tools define the agent’s action boundary and need explicit contracts. · _level: understand_
2. You are given a new agent systems task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - · Use the first AI output if it sounds confident
   - · Add more adjectives to the prompt until the answer feels professional
   - · Let the AI decide the success criteria after producing the output
   - **✔ Define the task, success criteria, and constraints for the agent systems problem before choosing how AI should help.**
   - _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _level: apply_
3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - · Whether the output is polished enough to avoid review
   - **✔ Look for evidence that the learner can define tool schemas, and can restrict permissions rather than merely repeat a definition.**
   - · Whether the prompt was longer than the previous one
   - · Whether the model generated the answer quickly
   - _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _level: apply_
4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - · Accept it because the output looks good
   - · Give them the answer and mark the stage complete
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - · Move them to the next stage because AI is probabilistic anyway
   - _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _level: analyze_

### Stage 5 — Context & Memory (4 questions)

1. Why is poorly designed long-term memory risky?
   - · It uses no storage
   - **✔ Stale, irrelevant, or sensitive information can influence future decisions**
   - · Memory always improves accuracy
   - · Agents cannot use context
   - _Why:_ Memory introduces state that must be governed and relevant. · _level: understand_
2. You are given a new agent systems task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - · Use the first AI output if it sounds confident
   - **✔ Define the task, success criteria, and constraints for the agent systems problem before choosing how AI should help.**
   - · Add more adjectives to the prompt until the answer feels professional
   - · Let the AI decide the success criteria after producing the output
   - _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _level: apply_
3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - · Whether the output is polished enough to avoid review
   - · Whether the prompt was longer than the previous one
   - **✔ Look for evidence that the learner can define memory scope, and can remove irrelevant state rather than merely repeat a definition.**
   - · Whether the model generated the answer quickly
   - _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _level: apply_
4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - · Accept it because the output looks good
   - · Give them the answer and mark the stage complete
   - · Move them to the next stage because AI is probabilistic anyway
   - _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _level: analyze_

### Stage 6 — Planning (4 questions)

1. An agent repeatedly fails a subtask. What should it do?
   - · Retry forever
   - **✔ Use bounded recovery/replanning and escalate when appropriate**
   - · Hide the error
   - · Invent a result
   - _Why:_ Reliable agents need bounded recovery and escalation. · _level: understand_
2. You are given a new agent systems task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - · Use the first AI output if it sounds confident
   - · Add more adjectives to the prompt until the answer feels professional
   - **✔ Define the task, success criteria, and constraints for the agent systems problem before choosing how AI should help.**
   - · Let the AI decide the success criteria after producing the output
   - _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _level: apply_
3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - **✔ Look for evidence that the learner can define failure limits, and can design recovery rather than merely repeat a definition.**
   - · Whether the output is polished enough to avoid review
   - · Whether the prompt was longer than the previous one
   - · Whether the model generated the answer quickly
   - _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _level: apply_
4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - · Accept it because the output looks good
   - · Give them the answer and mark the stage complete
   - · Move them to the next stage because AI is probabilistic anyway
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _level: analyze_

### Stage 7 — Tool Use (4 questions)

1. Why should tool calls be observable?
   - · Decoration
   - **✔ To diagnose failures and audit consequential behavior**
   - · To use more tokens
   - · To remove testing
   - _Why:_ Tool traces provide evidence of agent behavior. · _level: understand_
2. You are given a new agent systems task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - **✔ Define the task, success criteria, and constraints for the agent systems problem before choosing how AI should help.**
   - · Use the first AI output if it sounds confident
   - · Add more adjectives to the prompt until the answer feels professional
   - · Let the AI decide the success criteria after producing the output
   - _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _level: apply_
3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - · Whether the output is polished enough to avoid review
   - · Whether the prompt was longer than the previous one
   - · Whether the model generated the answer quickly
   - **✔ Look for evidence that the learner can capture tool traces, and can define useful logs rather than merely repeat a definition.**
   - _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _level: apply_
4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - · Accept it because the output looks good
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - · Give them the answer and mark the stage complete
   - · Move them to the next stage because AI is probabilistic anyway
   - _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _level: analyze_

### Stage 8 — Human Oversight (4 questions)

1. Which task clearly warrants human approval?
   - · Drafting a note
   - **✔ Executing an irreversible financial transaction from ambiguous evidence**
   - · Formatting JSON
   - · Generating ideas
   - _Why:_ High-impact irreversible actions require strong controls. · _level: understand_
2. You are given a new agent systems task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - · Use the first AI output if it sounds confident
   - · Add more adjectives to the prompt until the answer feels professional
   - · Let the AI decide the success criteria after producing the output
   - **✔ Define the task, success criteria, and constraints for the agent systems problem before choosing how AI should help.**
   - _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _level: apply_
3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - · Whether the output is polished enough to avoid review
   - **✔ Look for evidence that the learner can identify high-impact actions, and can define approval gates rather than merely repeat a definition.**
   - · Whether the prompt was longer than the previous one
   - · Whether the model generated the answer quickly
   - _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _level: apply_
4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - · Accept it because the output looks good
   - · Give them the answer and mark the stage complete
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - · Move them to the next stage because AI is probabilistic anyway
   - _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _level: analyze_

### Stage 9 — Reliability (4 questions)

1. What should an agent evaluation set contain?
   - · Only easy cases
   - **✔ Representative normal cases, edge cases, failures, and safety-sensitive scenarios**
   - · Only developer favorites
   - · No expected outcomes
   - _Why:_ Evaluation should reflect real use and important failure modes. · _level: understand_
2. You are given a new agent systems task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - · Use the first AI output if it sounds confident
   - **✔ Define the task, success criteria, and constraints for the agent systems problem before choosing how AI should help.**
   - · Add more adjectives to the prompt until the answer feels professional
   - · Let the AI decide the success criteria after producing the output
   - _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _level: apply_
3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - · Whether the output is polished enough to avoid review
   - · Whether the prompt was longer than the previous one
   - **✔ Look for evidence that the learner can build an evaluation set, and can define expected outcomes rather than merely repeat a definition.**
   - · Whether the model generated the answer quickly
   - _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _level: apply_
4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - · Accept it because the output looks good
   - · Give them the answer and mark the stage complete
   - · Move them to the next stage because AI is probabilistic anyway
   - _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _level: analyze_

### Stage 10 — Agent Workflow Design (4 questions)

1. When is multi-agent coordination justified?
   - · Always
   - **✔ When specialized responsibilities provide measurable value that a simpler design cannot**
   - · For every chatbot
   - · Only for images
   - _Why:_ Complexity should be justified by a real requirement. · _level: understand_
2. You are given a new agent systems task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - · Use the first AI output if it sounds confident
   - · Add more adjectives to the prompt until the answer feels professional
   - **✔ Define the task, success criteria, and constraints for the agent systems problem before choosing how AI should help.**
   - · Let the AI decide the success criteria after producing the output
   - _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _level: apply_
3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - **✔ Look for evidence that the learner can compare single vs multi-agent designs, and can measure the benefit rather than merely repeat a definition.**
   - · Whether the output is polished enough to avoid review
   - · Whether the prompt was longer than the previous one
   - · Whether the model generated the answer quickly
   - _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _level: apply_
4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - · Accept it because the output looks good
   - · Give them the answer and mark the stage complete
   - · Move them to the next stage because AI is probabilistic anyway
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _level: analyze_

## 6. AI-verified mastery assessment rubric

### Stage 1 — project `stage:ai-agents:1` (rubric sm-1sxld56-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| Demonstrates the section outcome: Explain the difference between assistants, workflows, and agents, and identify when agents actually add value. | 2 | yes |
| Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) | 2 | yes |
| Explains the decisions and trade-offs behind the work | 1 | no |
| Explains how the result was checked against the section success criteria | 1 | no |
| Classify a system correctly | 1 | no |
| Choose the simplest suitable architecture | 1 | no |
| Explain the tradeoff | 1 | no |

- Pass threshold: 0.8. Requires source inspection: no; written explanation: yes.

### Stage 2 — project `stage:ai-agents:2` (rubric sm-15w7cod-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| Demonstrates the section outcome: Choose deterministic workflows over agents when the process is known, stable, and easier to control. | 2 | yes |
| Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) | 2 | yes |
| Explains the decisions and trade-offs behind the work | 1 | no |
| Explains how the result was checked against the section success criteria | 1 | no |
| Identify unnecessary agent complexity | 1 | no |
| Compare architectures | 1 | no |
| Justify the simpler option | 1 | no |

- Pass threshold: 0.8. Requires source inspection: no; written explanation: yes.

### Stage 3 — project `stage:ai-agents:3` (rubric sm-1seldlk-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| Demonstrates the section outcome: Design agent systems with explicit responsibilities, boundaries, and observable tool use. | 2 | yes |
| Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) | 2 | yes |
| Explains the decisions and trade-offs behind the work | 1 | no |
| Explains how the result was checked against the section success criteria | 1 | no |
| Define the agent goal | 1 | no |
| Specify boundaries | 1 | no |
| Define tool responsibilities | 1 | no |

- Pass threshold: 0.8. Requires source inspection: no; written explanation: yes.

### Stage 4 — project `stage:ai-agents:4` (rubric sm-2w97rd-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| Demonstrates the section outcome: Create safe tool contracts with clear inputs, outputs, permissions, constraints, and validation. | 2 | yes |
| Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) | 2 | yes |
| Explains the decisions and trade-offs behind the work | 1 | no |
| Explains how the result was checked against the section success criteria | 1 | no |
| Define tool schemas | 1 | no |
| Restrict permissions | 1 | no |
| Validate tool results | 1 | no |

- Pass threshold: 0.8. Requires source inspection: no; written explanation: yes.

### Stage 5 — project `stage:ai-agents:5` (rubric sm-1qicmdl-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| Demonstrates the section outcome: Design context and memory so the agent receives relevant information without uncontrolled state accumulation. | 2 | yes |
| Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) | 2 | yes |
| Explains the decisions and trade-offs behind the work | 1 | no |
| Explains how the result was checked against the section success criteria | 1 | no |
| Define memory scope | 1 | no |
| Remove irrelevant state | 1 | no |
| Protect sensitive information | 1 | no |

- Pass threshold: 0.8. Requires source inspection: no; written explanation: yes.

### Stage 6 — project `stage:ai-agents:6` (rubric sm-pledli-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| Demonstrates the section outcome: Handle agent failure with bounded retries, replanning, and escalation rather than infinite autonomous looping. | 2 | yes |
| Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) | 2 | yes |
| Explains the decisions and trade-offs behind the work | 1 | no |
| Explains how the result was checked against the section success criteria | 1 | no |
| Define failure limits | 1 | no |
| Design recovery | 1 | no |
| Escalate when required | 1 | no |

- Pass threshold: 0.8. Requires source inspection: no; written explanation: yes.

### Stage 7 — project `stage:ai-agents:7` (rubric sm-172dvio-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| Demonstrates the section outcome: Make agent behavior observable enough to diagnose failures and audit consequential actions. | 2 | yes |
| Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) | 2 | yes |
| Explains the decisions and trade-offs behind the work | 1 | no |
| Explains how the result was checked against the section success criteria | 1 | no |
| Capture tool traces | 1 | no |
| Define useful logs | 1 | no |
| Use traces during debugging | 1 | no |

- Pass threshold: 0.8. Requires source inspection: no; written explanation: yes.

### Stage 8 — project `stage:ai-agents:8` (rubric sm-14r2zz4-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| Demonstrates the section outcome: Place human approval at the right points for consequential, irreversible, or ambiguous actions. | 2 | yes |
| Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) | 2 | yes |
| Explains the decisions and trade-offs behind the work | 1 | no |
| Explains how the result was checked against the section success criteria | 1 | no |
| Identify high-impact actions | 1 | no |
| Define approval gates | 1 | no |
| Document escalation | 1 | no |

- Pass threshold: 0.8. Requires source inspection: no; written explanation: yes.

### Stage 9 — project `stage:ai-agents:9` (rubric sm-1suseuo-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| Demonstrates the section outcome: Evaluate agents using representative normal cases, edge cases, failures, and safety-sensitive scenarios. | 2 | yes |
| Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) | 2 | yes |
| Explains the decisions and trade-offs behind the work | 1 | no |
| Explains how the result was checked against the section success criteria | 1 | no |
| Build an evaluation set | 1 | no |
| Define expected outcomes | 1 | no |
| Track regressions | 1 | no |

- Pass threshold: 0.8. Requires source inspection: no; written explanation: yes.

### Stage 10 — project `ai-ag-p2` (rubric rizw7jo-8)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| A public, inspectable source artifact is provided | 1 | yes |
| Relevant implementation is present (not an empty or unrelated repository) | 2 | yes |
| A meaningful README explains the project | 1 | yes |
| The written explanation describes the actual submitted work | 1 | yes |
| Every tool has a clear contract and constrained permission set. | 1 | no |
| Irreversible or high-impact actions have human approval. | 1 | no |
| Evaluation cases have expected outcomes. | 1 | no |
| Failure handling is bounded; the agent cannot retry indefinitely. | 1 | no |

- Pass threshold: 0.8. Requires source inspection: yes; written explanation: yes.

## 7. Phase projects and acceptance criteria

### Stage 1 — Build: What AI Agents Are Mini-Project
- **Acceptance criteria:**
  - Classify a system correctly
  - Choose the simplest suitable architecture
  - Explain the tradeoff

### Stage 2 — Build: Agents vs Chatbots Mini-Project
- **Acceptance criteria:**
  - Identify unnecessary agent complexity
  - Compare architectures
  - Justify the simpler option

### Stage 3 — Build: Agents vs Workflows Mini-Project
- **Acceptance criteria:**
  - Define the agent goal
  - Specify boundaries
  - Define tool responsibilities

### Stage 4 — Build: Tools Mini-Project
- **Acceptance criteria:**
  - Define tool schemas
  - Restrict permissions
  - Validate tool results

### Stage 5 — Build: Context & Memory Mini-Project
- **Acceptance criteria:**
  - Define memory scope
  - Remove irrelevant state
  - Protect sensitive information

### Stage 6 — Build: Planning Mini-Project
- **Acceptance criteria:**
  - Define failure limits
  - Design recovery
  - Escalate when required

### Stage 7 — Build: Tool Use Mini-Project
- **Acceptance criteria:**
  - Capture tool traces
  - Define useful logs
  - Use traces during debugging

### Stage 8 — Build: Human Oversight Mini-Project
- **Acceptance criteria:**
  - Identify high-impact actions
  - Define approval gates
  - Document escalation

### Stage 9 — Build: Reliability Mini-Project
- **Acceptance criteria:**
  - Build an evaluation set
  - Define expected outcomes
  - Track regressions

### Stage 10 — Build: Bounded Agent System
- **Acceptance criteria:**
  - Every tool has a clear contract and constrained permission set.
  - Irreversible or high-impact actions have human approval.
  - Evaluation cases have expected outcomes.
  - Failure handling is bounded; the agent cannot retry indefinitely.

## 8. AI lesson demonstrations

- **Stage 1:** {"lesson":"You are designing an agentic system where tools, permissions, memory, failure handling, and human approval must be explicit. What AI Agents Are is about agent fundamentals. The central idea is: Explain the di…
- **Stage 2:** {"lesson":"You are designing an agentic system where tools, permissions, memory, failure handling, and human approval must be explicit. Agents vs Chatbots is about workflow vs agent. The central idea is: Choose determin…
- **Stage 3:** {"lesson":"You are designing an agentic system where tools, permissions, memory, failure handling, and human approval must be explicit. Agents vs Workflows is about agent design. The central idea is: Design agent system…
- **Stage 4:** {"lesson":"You are designing an agentic system where tools, permissions, memory, failure handling, and human approval must be explicit. Tools is about tool contracts. The central idea is: Create safe tool contracts with…
- **Stage 5:** {"lesson":"You are designing an agentic system where tools, permissions, memory, failure handling, and human approval must be explicit. Context & Memory is about context and memory. The central idea is: Design context a…
- **Stage 6:** {"lesson":"You are designing an agentic system where tools, permissions, memory, failure handling, and human approval must be explicit. Planning is about failure handling. The central idea is: Handle agent failure with …
- **Stage 7:** {"lesson":"You are designing an agentic system where tools, permissions, memory, failure handling, and human approval must be explicit. Tool Use is about observability. The central idea is: Make agent behavior observabl…
- **Stage 8:** {"lesson":"You are designing an agentic system where tools, permissions, memory, failure handling, and human approval must be explicit. Human Oversight is about human approval. The central idea is: Place human approval …
- **Stage 9:** {"lesson":"You are designing an agentic system where tools, permissions, memory, failure handling, and human approval must be explicit. Reliability is about evaluation. The central idea is: Evaluate agents using represe…
- **Stage 10:** {"lesson":"You are designing an agentic system where tools, permissions, memory, failure handling, and human approval must be explicit. Agent Workflow Design is about multi-agent tradeoffs. The central idea is: Justify …

## 9. Outstanding verification limitations

Every mapped resource reached content-inspected (level 3).

- Level-4 evidence (video playback / interactive use) is **not** available for any resource in this environment.

## 10. Areas requiring human review

- **Subject matter:** factual accuracy, currency and depth of each lesson, resource and knowledge check.
- **Pedagogy:** whether the worked example and resource actually prepare the learner for the knowledge check and project.
- **Accessibility:** captions/transcripts, contrast, keyboard use and screen-reader behaviour of the learning UI.
- **Assessment quality:** plausibility of distractors, whether questions test understanding rather than recall, fairness of rubric weights and the pass threshold.
- **Sign-off:** record a genuine, named review in `docs/curriculum-quality-signoff.json`. No track is approved until then.

## 11. Exact criteria for passing

A track becomes **premium-approved** only when ALL of the following hold. Failing any one blocks approval, even when the aggregate scores are high. 90 is a floor per score, not compensation for a failed gate.

- Mechanical: readiness ≥ 90 (this track: 100) **and** worthiness ≥ 90 (this track: 100).
- Mandatory quality gates: all pass (this track: pass).
- Every stage: at least one required resource verified to content-inspected (level 3) or better.
- Every stage: a valid knowledge check with a correct answer key, plausible distractors and server-side grading.
- Every progression-bearing section: an AI-verified mastery rubric anchored to the section objective, with source inspection where required.
- Every phase: a project with a brief, required evidence and acceptance criteria.
- A genuine, named **human** sign-off in `docs/curriculum-quality-signoff.json`.

**Would fail review if:** a required resource 404s or teaches a different objective; an answer key is wrong; a rubric can be passed without the required evidence; a mandatory criterion is waived by a high aggregate score; a project has no acceptance criteria or evidence; or a video is claimed watched without playback verification.

