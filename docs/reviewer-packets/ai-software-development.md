# Reviewer packet — AI-Assisted Software Development

- **Track id:** `ai-software-development`  ·  **Slug:** `ai-software-development`  ·  **Category:** ai  ·  **AI track:** yes
- **Status:** ⏳ AWAITING INDEPENDENT HUMAN REVIEW — **not approved**.
- **Automated evidence (not approval):** readiness 99.5/100 · worthiness 99.1/100 · mandatory gates pass. A passing mechanical audit is not human sign-off.

> This packet contains internal answer keys and rubric criteria for review purposes. It includes only short original excerpts of external resources; no third-party material is reproduced in full.

## 1. Learning objectives and sequence

| # | Stage | Objective | Est. time | Lessons |
| --- | --- | --- | --- | --- |
| 1 | AI Coding Fundamentals | Use AI coding assistance without confusing generated code with verified software. | 1 week | 5 |
| 2 | Code Generation | Give AI coding systems precise requirements, interfaces, constraints, acceptance criteria, and context. | 1 week | 5 |
| 3 | Debugging With AI | Use AI for debugging while reproducing failures, understanding root causes, and validating fixes. | 1 week | 5 |
| 4 | AI Coding Tools | Delegate bounded multi-step tasks to coding agents while preserving scope control and review. | 1 week | 5 |
| 5 | Coding Agents | Control agent changes through explicit boundaries, diff review, security awareness, and human approval. | 1 week | 5 |
| 6 | Testing & Verification | Treat AI-generated tests as evidence to inspect rather than proof that the application is correct. | 1 week | 5 |
| 7 | Building With AI | Run a professional AI-assisted development loop from requirements through review, testing, and integration. | 1 week | 5 |
| 8 | Professional AI-Assisted Development | Define team-level rules for AI-assisted development, including security, review, maintainability, and acceptable use. | 1 week | 5 |

## 2. Representative and high-risk lessons

Representative lessons (first, middle, last so a reviewer sees the whole arc): stages 1, 5, 8.

Highest-risk lessons by resource evidence (verify these first):

- **Stage 6 — Testing & Verification**: content-inspected required resources 1, objective-matching resources 0, playback-verified resources 0.
- **Stage 8 — Professional AI-Assisted Development**: content-inspected required resources 1, objective-matching resources 0, playback-verified resources 0.
- **Stage 2 — Code Generation**: content-inspected required resources 1, objective-matching resources 1, playback-verified resources 0.

## 3. External resource evidence (destination + inspected content)

### Stage 1 — AI Coding Fundamentals

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| GitHub Copilot Documentation | required | L3 | content-inspection | — | 2 | https://docs.github.com/en/copilot |
- _L3 required evidence — GitHub Docs: “GitHub Copilot documentation You can use GitHub Copilot to enhance your productivity and assist as you work on code. Overview Quickstart Articles Learn about Copilot About agent skills Skills allow Copilot to perform sp…”_

### Stage 2 — Code Generation

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Microsoft — Generative AI for Beginners | required | L2 | http-probe | — | 0 | https://learn.microsoft.com/en-us/shows/generative-ai-for-beginners/ |
| GitHub Copilot — Code Review | required | L3 | content-inspection | — | 2 | https://docs.github.com/en/copilot/concepts/agents/code-review |
- _L3 required evidence — GitHub Docs: “GitHub Copilot code review Copilot reviews your pull requests, identifies issues, and suggests fixes you can apply in a couple of clicks. Who can use this feature? Available for all paid Copilot plans . In this article …”_

### Stage 3 — Debugging With AI

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Anthropic — Build With Claude | required | L3 | content-inspection | — | 0 | https://www.anthropic.com/learn/build-with-claude |
| GitHub Copilot — Code Review | required | L3 | content-inspection | — | 1 | https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review |
- _L3 required evidence — Anthropic: “Build with Claude Courses and tutorials from Anthropic for developers. Learn Claude Code and the Claude API, then build agents with MCP, skills, and tool use. Start here Claude Code 101 An agentic coding tool that lives…”_
- _L3 required evidence — GitHub Docs: “Using GitHub Copilot code review Learn how to request a code review from GitHub Copilot. Tool navigation In this article Introduction GitHub Copilot can review your code and provide feedback. Where possible, Copilot's f…”_

### Stage 4 — AI Coding Tools

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| GitHub Copilot Documentation | required | L3 | content-inspection | — | 4 | https://docs.github.com/en/copilot |
| Anthropic — Build With Claude | required | L3 | content-inspection | — | 5 | https://www.anthropic.com/learn/build-with-claude |
- _L3 required evidence — GitHub: “GitHub Copilot documentation You can use GitHub Copilot to enhance your productivity and assist as you work on code. Overview Quickstart Articles Learn about Copilot About agent skills Skills allow Copilot to perform sp…”_
- _L3 required evidence — Anthropic: “Build with Claude Courses and tutorials from Anthropic for developers. Learn Claude Code and the Claude API, then build agents with MCP, skills, and tool use. Start here Claude Code 101 An agentic coding tool that lives…”_

### Stage 5 — Coding Agents

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| OpenAI Academy — Codex | required | L3 | content-inspection | — | 1 | https://openai.com/academy/codex/ |
| GitHub Copilot — Custom Review Instructions | required | L3 | content-inspection | — | 3 | https://docs.github.com/en/copilot/tutorials/customize-code-review |
| GitHub Docs — Review AI-assisted code changes and identify … | required | L3 | content-inspection | — | 3 | https://docs.github.com/en/copilot/concepts/agents/code-review |
- _L3 required evidence — OpenAI Academy: “OpenAI Codex Use Codex to write code, run tasks, and build automated workflows. Start using Codex Build workflows with Codex Start using Codex Apply Codex to core coding work and workflows. Get started with Codex Set up…”_
- _L3 required evidence — GitHub Docs: “Using custom instructions to unlock the power of Copilot code review Learn how to write effective custom instructions that help GitHub Copilot provide more relevant and actionable code reviews. In this article Introduct…”_
- _L3 required evidence — GitHub Docs: “GitHub Copilot code review Copilot reviews your pull requests, identifies issues, and suggests fixes you can apply in a couple of clicks. Who can use this feature? Available for all paid Copilot plans . In this article …”_

### Stage 6 — Testing & Verification

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| GitHub Copilot — Code Review | required | L3 | content-inspection | — | 0 | https://docs.github.com/en/copilot/concepts/agents/code-review |
- _L3 required evidence — GitHub Docs: “GitHub Copilot code review Copilot reviews your pull requests, identifies issues, and suggests fixes you can apply in a couple of clicks. Who can use this feature? Available for all paid Copilot plans . In this article …”_

### Stage 7 — Building With AI

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Microsoft — Generative AI for Beginners | required | L2 | http-probe | — | 0 | https://www.youtube.com/watch?v=k7HaeJs-N-o |
| GitHub Copilot — Code Review | required | L3 | content-inspection | — | 1 | https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review |
- _L3 required evidence — GitHub Docs: “Using GitHub Copilot code review Learn how to request a code review from GitHub Copilot. Tool navigation In this article Introduction GitHub Copilot can review your code and provide feedback. Where possible, Copilot's f…”_

### Stage 8 — Professional AI-Assisted Development

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| GitHub Docs — Responsible Use of GitHub Copilot Features | required | L3 | content-inspection | — | 0 | https://docs.github.com/en/copilot/responsible-use |
- _L3 required evidence — GitHub Docs: “Responsible use of GitHub Copilot features Learn how to use GitHub Copilot features responsibly by understanding their purposes, capabilities, and limitations. Application card: GitHub Copilot Chat Learn how to use GitH…”_

## 4. Required video segments and measured duration

| Stage | Video | Level | Published duration | Required segment |
| --- | --- | --- | --- | --- |
| 2 | Microsoft — Generative AI for Beginners | L2 | not verified | not verified — review manually |
| 7 | Microsoft — Generative AI for Beginners | L2 | not verified | not verified — review manually |

⚠️ Playback and runtime could not be verified from this environment (no unauthenticated transcript/runtime source). **A human must confirm runtime, the required 5–15 min segment (max 20 min uninterrupted) and that the segment teaches the objective.**

## 5. Knowledge checks and answer keys (internal)

### Stage 1 — AI Coding Fundamentals (4 questions)

1. What is the most dangerous misconception about generated code?
   - · It can be useful
   - **✔ If it compiles, it must be correct**
   - · It can speed up prototypes
   - · It can explain code
   - _Why:_ Compilation does not prove correctness, security, performance, or maintainability. · _level: understand_
2. You are given a new software development task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - · Use the first AI output if it sounds confident
   - **✔ Define the task, success criteria, and constraints for the software development problem before choosing how AI should help.**
   - · Add more adjectives to the prompt until the answer feels professional
   - · Let the AI decide the success criteria after producing the output
   - _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _level: apply_
3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - · Whether the output is polished enough to avoid review
   - · Whether the prompt was longer than the previous one
   - **✔ Look for evidence that the learner can explain generated code, and can identify likely failure modes rather than merely repeat a definition.**
   - · Whether the model generated the answer quickly
   - _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _level: apply_
4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - · Accept it because the output looks good
   - · Give them the answer and mark the stage complete
   - · Move them to the next stage because AI is probabilistic anyway
   - _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _level: analyze_

### Stage 2 — Code Generation (4 questions)

1. What improves AI-generated implementation most?
   - · Vague requests
   - **✔ Clear requirements, constraints, interfaces, acceptance criteria, and context**
   - · More emojis
   - · No project context
   - _Why:_ Specific requirements reduce ambiguity. · _level: understand_
2. You are given a new software development task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - · Use the first AI output if it sounds confident
   - · Add more adjectives to the prompt until the answer feels professional
   - **✔ Define the task, success criteria, and constraints for the software development problem before choosing how AI should help.**
   - · Let the AI decide the success criteria after producing the output
   - _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _level: apply_
3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - **✔ Look for evidence that the learner can write a bounded implementation brief, and can define acceptance criteria rather than merely repeat a definition.**
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

### Stage 3 — Debugging With AI (4 questions)

1. An AI-generated bug fix passes one test but you cannot explain the root cause. What next?
   - · Ship it
   - **✔ Reproduce and understand the failure, then validate the fix against it**
   - · Delete the bug
   - · Ask AI to sound certain
   - _Why:_ A professional fix requires understanding and evidence. · _level: understand_
2. You are given a new software development task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - **✔ Define the task, success criteria, and constraints for the software development problem before choosing how AI should help.**
   - · Use the first AI output if it sounds confident
   - · Add more adjectives to the prompt until the answer feels professional
   - · Let the AI decide the success criteria after producing the output
   - _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _level: apply_
3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - · Whether the output is polished enough to avoid review
   - · Whether the prompt was longer than the previous one
   - · Whether the model generated the answer quickly
   - **✔ Look for evidence that the learner can reproduce the issue, and can explain the root cause rather than merely repeat a definition.**
   - _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _level: apply_
4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - · Accept it because the output looks good
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - · Give them the answer and mark the stage complete
   - · Move them to the next stage because AI is probabilistic anyway
   - _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _level: analyze_

### Stage 4 — AI Coding Tools (4 questions)

1. When should an AI coding agent be used instead of inline completion?
   - · Always
   - **✔ For bounded multi-step tasks where broader context and controlled autonomy provide value**
   - · Never
   - · Only for CSS
   - _Why:_ Tool autonomy should match task scope and review capacity. · _level: understand_
2. You are given a new software development task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - · Use the first AI output if it sounds confident
   - · Add more adjectives to the prompt until the answer feels professional
   - · Let the AI decide the success criteria after producing the output
   - **✔ Define the task, success criteria, and constraints for the software development problem before choosing how AI should help.**
   - _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _level: apply_
3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - · Whether the output is polished enough to avoid review
   - **✔ Look for evidence that the learner can define agent scope, and can inspect diffs rather than merely repeat a definition.**
   - · Whether the prompt was longer than the previous one
   - · Whether the model generated the answer quickly
   - _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _level: apply_
4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - · Accept it because the output looks good
   - · Give them the answer and mark the stage complete
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - · Move them to the next stage because AI is probabilistic anyway
   - _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _level: analyze_

### Stage 5 — Coding Agents (4 questions)

1. An agent modifies unrelated authentication files. What should happen?
   - · Merge if tests pass
   - **✔ Review the diff, revert unrelated changes, and verify requested behavior**
   - · Ignore it
   - · Deploy immediately
   - _Why:_ Scope control and diff review are essential. · _level: understand_
2. You are given a new software development task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - · Use the first AI output if it sounds confident
   - **✔ Define the task, success criteria, and constraints for the software development problem before choosing how AI should help.**
   - · Add more adjectives to the prompt until the answer feels professional
   - · Let the AI decide the success criteria after producing the output
   - _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _level: apply_
3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - · Whether the output is polished enough to avoid review
   - · Whether the prompt was longer than the previous one
   - **✔ Look for evidence that the learner can review file changes, and can protect sensitive areas rather than merely repeat a definition.**
   - · Whether the model generated the answer quickly
   - _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _level: apply_
4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - · Accept it because the output looks good
   - · Give them the answer and mark the stage complete
   - · Move them to the next stage because AI is probabilistic anyway
   - _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _level: analyze_

### Stage 6 — Testing & Verification (4 questions)

1. Why are AI-generated tests not sufficient on their own?
   - · They cannot run
   - **✔ They can encode wrong assumptions or miss important behaviors**
   - · AI cannot write tests
   - · Tests are unnecessary
   - _Why:_ Tests provide evidence only for what they actually cover. · _level: understand_
2. You are given a new software development task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - · Use the first AI output if it sounds confident
   - · Add more adjectives to the prompt until the answer feels professional
   - **✔ Define the task, success criteria, and constraints for the software development problem before choosing how AI should help.**
   - · Let the AI decide the success criteria after producing the output
   - _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _level: apply_
3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - **✔ Look for evidence that the learner can assess test coverage, and can add missing cases rather than merely repeat a definition.**
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

### Stage 7 — Building With AI (4 questions)

1. Which workflow best combines AI speed with engineering discipline?
   - · Generate everything then review at the end
   - **✔ Define requirements, delegate bounded tasks, inspect diffs, test, manually verify, integrate**
   - · Avoid tests
   - · Let AI choose architecture
   - _Why:_ Continuous bounded review is safer and more maintainable. · _level: understand_
2. You are given a new software development task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - **✔ Define the task, success criteria, and constraints for the software development problem before choosing how AI should help.**
   - · Use the first AI output if it sounds confident
   - · Add more adjectives to the prompt until the answer feels professional
   - · Let the AI decide the success criteria after producing the output
   - _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _level: apply_
3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - · Whether the output is polished enough to avoid review
   - · Whether the prompt was longer than the previous one
   - · Whether the model generated the answer quickly
   - **✔ Look for evidence that the learner can plan the work, and can delegate safely rather than merely repeat a definition.**
   - _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _level: apply_
4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - · Accept it because the output looks good
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - · Give them the answer and mark the stage complete
   - · Move them to the next stage because AI is probabilistic anyway
   - _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _level: analyze_

### Stage 8 — Professional AI-Assisted Development (4 questions)

1. What should a team document for AI-assisted coding?
   - · Only the tool name
   - **✔ Acceptable uses, coding standards, review expectations, security rules, and maintainability requirements**
   - · Nothing
   - · Only prompts
   - _Why:_ Teams need shared engineering controls, not merely tool access. · _level: understand_
2. You are given a new software development task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - · Use the first AI output if it sounds confident
   - · Add more adjectives to the prompt until the answer feels professional
   - · Let the AI decide the success criteria after producing the output
   - **✔ Define the task, success criteria, and constraints for the software development problem before choosing how AI should help.**
   - _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _level: apply_
3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - · Whether the output is polished enough to avoid review
   - **✔ Look for evidence that the learner can write team guidance, and can define review gates rather than merely repeat a definition.**
   - · Whether the prompt was longer than the previous one
   - · Whether the model generated the answer quickly
   - _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _level: apply_
4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - · Accept it because the output looks good
   - · Give them the answer and mark the stage complete
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - · Move them to the next stage because AI is probabilistic anyway
   - _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _level: analyze_

## 6. AI-verified mastery assessment rubric

### Stage 1 — project `stage:ai-software-development:1` (rubric sm-1xg41rw-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| Demonstrates the section outcome: Use AI coding assistance without confusing generated code with verified software. | 2 | yes |
| Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) | 2 | yes |
| Explains the decisions and trade-offs behind the work | 1 | no |
| Explains how the result was checked against the section success criteria | 1 | no |
| Explain generated code | 1 | no |
| Identify likely failure modes | 1 | no |
| Review before integration | 1 | no |

- Pass threshold: 0.8. Requires source inspection: no; written explanation: yes.

### Stage 2 — project `stage:ai-software-development:2` (rubric sm-12ahxgl-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| Demonstrates the section outcome: Give AI coding systems precise requirements, interfaces, constraints, acceptance criteria, and context. | 2 | yes |
| Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) | 2 | yes |
| Explains the decisions and trade-offs behind the work | 1 | no |
| Explains how the result was checked against the section success criteria | 1 | no |
| Write a bounded implementation brief | 1 | no |
| Define acceptance criteria | 1 | no |
| Provide relevant repository context | 1 | no |

- Pass threshold: 0.8. Requires source inspection: no; written explanation: yes.

### Stage 3 — project `stage:ai-software-development:3` (rubric sm-vjr2zf-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| Demonstrates the section outcome: Use AI for debugging while reproducing failures, understanding root causes, and validating fixes. | 2 | yes |
| Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) | 2 | yes |
| Explains the decisions and trade-offs behind the work | 1 | no |
| Explains how the result was checked against the section success criteria | 1 | no |
| Reproduce the issue | 1 | no |
| Explain the root cause | 1 | no |
| Verify the fix with tests | 1 | no |

- Pass threshold: 0.8. Requires source inspection: no; written explanation: yes.

### Stage 4 — project `stage:ai-software-development:4` (rubric sm-1jlpovt-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| Demonstrates the section outcome: Delegate bounded multi-step tasks to coding agents while preserving scope control and review. | 2 | yes |
| Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) | 2 | yes |
| Explains the decisions and trade-offs behind the work | 1 | no |
| Explains how the result was checked against the section success criteria | 1 | no |
| Define agent scope | 1 | no |
| Inspect diffs | 1 | no |
| Reject unrelated changes | 1 | no |

- Pass threshold: 0.8. Requires source inspection: no; written explanation: yes.

### Stage 5 — project `stage:ai-software-development:5` (rubric sm-o3ec2t-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| Demonstrates the section outcome: Control agent changes through explicit boundaries, diff review, security awareness, and human approval. | 2 | yes |
| Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) | 2 | yes |
| Explains the decisions and trade-offs behind the work | 1 | no |
| Explains how the result was checked against the section success criteria | 1 | no |
| Review file changes | 1 | no |
| Protect sensitive areas | 1 | no |
| Revert unsafe or unrelated changes | 1 | no |

- Pass threshold: 0.8. Requires source inspection: no; written explanation: yes.

### Stage 6 — project `stage:ai-software-development:6` (rubric sm-hjjg95-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| Demonstrates the section outcome: Treat AI-generated tests as evidence to inspect rather than proof that the application is correct. | 2 | yes |
| Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) | 2 | yes |
| Explains the decisions and trade-offs behind the work | 1 | no |
| Explains how the result was checked against the section success criteria | 1 | no |
| Assess test coverage | 1 | no |
| Add missing cases | 1 | no |
| Validate behavior independently | 1 | no |

- Pass threshold: 0.8. Requires source inspection: no; written explanation: yes.

### Stage 7 — project `stage:ai-software-development:7` (rubric sm-ln29ra-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| Demonstrates the section outcome: Run a professional AI-assisted development loop from requirements through review, testing, and integration. | 2 | yes |
| Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) | 2 | yes |
| Explains the decisions and trade-offs behind the work | 1 | no |
| Explains how the result was checked against the section success criteria | 1 | no |
| Plan the work | 1 | no |
| Delegate safely | 1 | no |
| Test and verify before merge | 1 | no |

- Pass threshold: 0.8. Requires source inspection: no; written explanation: yes.

### Stage 8 — project `ai-s-p4` (rubric rizw7jo-8)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| A public, inspectable source artifact is provided | 1 | yes |
| Relevant implementation is present (not an empty or unrelated repository) | 2 | yes |
| A meaningful README explains the project | 1 | yes |
| The written explanation describes the actual submitted work | 1 | yes |
| Findings are specific, reproducible, and tied to evidence. | 1 | no |
| Security and correctness issues are separated from style preferences. | 1 | no |
| The remediation plan is prioritized by risk and impact. | 1 | no |
| The learner can explain each important change. | 1 | no |

- Pass threshold: 0.8. Requires source inspection: yes; written explanation: yes.

## 7. Phase projects and acceptance criteria

### Stage 1 — Build: AI Coding Fundamentals Mini-Project
- **Acceptance criteria:**
  - Explain generated code
  - Identify likely failure modes
  - Review before integration

### Stage 2 — Build: Code Generation Mini-Project
- **Acceptance criteria:**
  - Write a bounded implementation brief
  - Define acceptance criteria
  - Provide relevant repository context

### Stage 3 — Build: Debugging With AI Mini-Project
- **Acceptance criteria:**
  - Reproduce the issue
  - Explain the root cause
  - Verify the fix with tests

### Stage 4 — Build: AI Coding Tools Mini-Project
- **Acceptance criteria:**
  - Define agent scope
  - Inspect diffs
  - Reject unrelated changes

### Stage 5 — Build: Coding Agents Mini-Project
- **Acceptance criteria:**
  - Review file changes
  - Protect sensitive areas
  - Revert unsafe or unrelated changes

### Stage 6 — Build: Testing & Verification Mini-Project
- **Acceptance criteria:**
  - Assess test coverage
  - Add missing cases
  - Validate behavior independently

### Stage 7 — Build: Building With AI Mini-Project
- **Acceptance criteria:**
  - Plan the work
  - Delegate safely
  - Test and verify before merge

### Stage 8 — Build: AI Engineering Audit
- **Acceptance criteria:**
  - Findings are specific, reproducible, and tied to evidence.
  - Security and correctness issues are separated from style preferences.
  - The remediation plan is prioritized by risk and impact.
  - The learner can explain each important change.

## 8. AI lesson demonstrations

- **Stage 1:** {"lesson":"You are using AI inside a real software-development workflow where code still has to be understood, tested, reviewed, secured, and maintained. AI Coding Fundamentals is about AI coding fundamentals. The centr…
- **Stage 2:** {"lesson":"You are using AI inside a real software-development workflow where code still has to be understood, tested, reviewed, secured, and maintained. Code Generation is about bounded coding instructions. The central…
- **Stage 3:** {"lesson":"You are using AI inside a real software-development workflow where code still has to be understood, tested, reviewed, secured, and maintained. Debugging With AI is about debugging. The central idea is: Use AI…
- **Stage 4:** {"lesson":"You are using AI inside a real software-development workflow where code still has to be understood, tested, reviewed, secured, and maintained. AI Coding Tools is about coding agents. The central idea is: Dele…
- **Stage 5:** {"lesson":"You are using AI inside a real software-development workflow where code still has to be understood, tested, reviewed, secured, and maintained. Coding Agents is about agent boundaries. The central idea is: Con…
- **Stage 6:** {"lesson":"You are using AI inside a real software-development workflow where code still has to be understood, tested, reviewed, secured, and maintained. Testing & Verification is about test verification. The central id…
- **Stage 7:** {"lesson":"You are using AI inside a real software-development workflow where code still has to be understood, tested, reviewed, secured, and maintained. Building With AI is about professional development loop. The cent…
- **Stage 8:** {"lesson":"You are using AI inside a real software-development workflow where code still has to be understood, tested, reviewed, secured, and maintained. Professional AI-Assisted Development is about team policy. The ce…

## 9. Outstanding verification limitations

Resources whose content could not be inspected automatically (verify manually or replace):

- Stage 2 — required (L2): https://learn.microsoft.com/en-us/shows/generative-ai-for-beginners/
- Stage 7 — required (L2): https://www.youtube.com/watch?v=k7HaeJs-N-o

- Level-4 evidence (video playback / interactive use) is **not** available for any resource in this environment.

## 10. Areas requiring human review

- **Subject matter:** factual accuracy, currency and depth of each lesson, resource and knowledge check.
- **Pedagogy:** whether the worked example and resource actually prepare the learner for the knowledge check and project.
- **Accessibility:** captions/transcripts, contrast, keyboard use and screen-reader behaviour of the learning UI.
- **Assessment quality:** plausibility of distractors, whether questions test understanding rather than recall, fairness of rubric weights and the pass threshold.
- **Sign-off:** record a genuine, named review in `docs/curriculum-quality-signoff.json`. No track is approved until then.

## 11. Exact criteria for passing

A track becomes **premium-approved** only when ALL of the following hold. Failing any one blocks approval, even when the aggregate scores are high. 90 is a floor per score, not compensation for a failed gate.

- Mechanical: readiness ≥ 90 (this track: 99.5) **and** worthiness ≥ 90 (this track: 99.1).
- Mandatory quality gates: all pass (this track: pass).
- Every stage: at least one required resource verified to content-inspected (level 3) or better.
- Every stage: a valid knowledge check with a correct answer key, plausible distractors and server-side grading.
- Every progression-bearing section: an AI-verified mastery rubric anchored to the section objective, with source inspection where required.
- Every phase: a project with a brief, required evidence and acceptance criteria.
- A genuine, named **human** sign-off in `docs/curriculum-quality-signoff.json`.

**Would fail review if:** a required resource 404s or teaches a different objective; an answer key is wrong; a rubric can be passed without the required evidence; a mandatory criterion is waived by a high aggregate score; a project has no acceptance criteria or evidence; or a video is claimed watched without playback verification.

