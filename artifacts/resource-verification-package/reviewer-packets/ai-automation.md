# Reviewer packet — AI Automation

- **Track id:** `ai-automation`  ·  **Slug:** `ai-automation`  ·  **Category:** ai  ·  **AI track:** yes
- **Status:** ⏳ AWAITING INDEPENDENT HUMAN REVIEW — **not approved**.
- **Automated evidence (not approval):** readiness 99.5/100 · worthiness 99/100 · mandatory gates pass. A passing mechanical audit is not human sign-off.

> This packet contains internal answer keys and rubric criteria for review purposes. It includes only short original excerpts of external resources; no third-party material is reproduced in full.

## 1. Learning objectives and sequence

| # | Stage | Objective | Est. time | Lessons |
| --- | --- | --- | --- | --- |
| 1 | Automation Fundamentals | Identify tasks that are stable, repetitive, measurable, and safe enough to automate. | 1 week | 5 |
| 2 | Workflows | Design workflows with explicit failure paths rather than assuming every step succeeds. | 1 week | 5 |
| 3 | APIs | Diagnose API failures by checking credentials, scopes, endpoints, payloads, and configuration. | 1 week | 5 |
| 4 | Webhooks | Secure webhook-driven workflows with authentication, validation, permissions, and constrained side effects. | 1 week | 5 |
| 5 | AI in Workflows | Place AI where probabilistic interpretation adds value while deterministic controls handle predictable operations. | 1 week | 5 |
| 6 | Structured Data | Validate structured data between workflow steps so bad inputs do not silently propagate. | 1 week | 5 |
| 7 | Human Approval | Use human approval for consequential or ambiguous actions that should not be fully automated. | 3 to 5 days | 5 |
| 8 | Reliable Automation | Operate an automation reliably with logs, alerts, bounded retries, recovery, and maintenance planning. | 1 week | 5 |

## 2. Representative and high-risk lessons

Representative lessons (first, middle, last so a reviewer sees the whole arc): stages 1, 5, 8.

Highest-risk lessons by resource evidence (verify these first):

- **Stage 3 — APIs**: content-inspected required resources 1, objective-matching resources 0, playback-verified resources 0.
- **Stage 7 — Human Approval**: content-inspected required resources 1, objective-matching resources 0, playback-verified resources 0.
- **Stage 8 — Reliable Automation**: content-inspected required resources 1, objective-matching resources 0, playback-verified resources 0.

## 3. External resource evidence (destination + inspected content)

### Stage 1 — Automation Fundamentals

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| n8n Docs — Understand Workflows | required | L3 | content-inspection | 20 min | 1 | https://docs.n8n.io/workflows/ |
- _L3 required evidence — n8n Docs: “For the complete documentation index, see llms.txt . This page is also available as Markdown . A workflow is a collection of nodes connected together to automate a process. Create a workflow, or use a workflow template …”_

### Stage 2 — Workflows

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| n8n Documentation | required | L3 | content-inspection | — | 1 | https://docs.n8n.io |
| Make Academy | required | L3 | content-inspection | — | 2 | https://academy.make.com/ |
| n8n Courses | required | L2 | http-probe | — | 1 | https://docs.n8n.io/courses/ |
- _L3 required evidence — n8n: “For the complete documentation index, see llms.txt . This page is also available as Markdown . n8n is a fair-code licensed workflow automation tool that combines AI features with business process automation. Get set up …”_
- _L3 required evidence — Make: “New Learning Path Automation to AI Agents: Advanced ✨ Earn Your Badge 🎁 Sign up to unlock an exclusive Academy reward Make Academy Your free online path to mastering Make Learn Make at your own pace with hands-on cours…”_

### Stage 3 — APIs

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| n8n Documentation | required | L3 | content-inspection | — | 0 | https://docs.n8n.io/ |
- _L3 required evidence — n8n: “For the complete documentation index, see llms.txt . This page is also available as Markdown . n8n is a fair-code licensed workflow automation tool that combines AI features with business process automation. Get set up …”_

### Stage 4 — Webhooks

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| n8n Documentation — Error Handling | required | L3 | content-inspection | — | 1 | https://docs.n8n.io/flow-logic/error-handling/ |
- _L3 required evidence — n8n: “For the complete documentation index, see llms.txt . This page is also available as Markdown . When designing your flow logic , it's a good practice to consider potential errors, and set up methods to handle them gracef…”_

### Stage 5 — AI in Workflows

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| OpenAI Academy — Agents & Workflows | required | L3 | content-inspection | — | 0 | https://academy.openai.com/ |
| Microsoft Learn — Generative AI and Agents | required | L3 | content-inspection | — | 0 | https://learn.microsoft.com/en-us/training/modules/fundamentals-generative-ai/ |
| Microsoft — Responsible AI | required | L3 | content-inspection | — | 2 | https://learn.microsoft.com/en-us/agents/center-of-excellence/responsible-ai |
- _L3 required evidence — OpenAI Academy: “OpenAI Academy Unlock the opportunities of the AI era by equipping yourself with the knowledge and skills to harness artificial intelligence effectively. Build the AI skills your organization needs For knowledge workers…”_
- _L3 required evidence — Microsoft Learn: “Read in English Introduction to generative AI and agents Module 7 Units Beginner AI Engineer Developer Solution Architect Student Microsoft Foundry Generative AI powers applications that can create content, answer quest…”_
- _L3 required evidence — Microsoft Learn: “Read in English Edit Note Access to this page requires authorization. You can try signing in or changing directories . Access to this page requires authorization. You can try changing directories . Apply responsible AI …”_

### Stage 6 — Structured Data

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| n8n Docs — Work With Data | required | L3 | content-inspection | — | 3 | https://docs.n8n.io/data/ |
- _L3 required evidence — n8n Docs: “For the complete documentation index, see llms.txt . This page is also available as Markdown . In n8n, data flows through your workflow from node to node. Each node receives data, processes it, and passes the results to…”_

### Stage 7 — Human Approval

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| n8n Docs — Wait (Human-in-the-Loop) | required | L3 | content-inspection | — | 0 | https://docs.n8n.io/flow-logic/waiting/ |
- _L3 required evidence — n8n Docs: “For the complete documentation index, see llms.txt . This page is also available as Markdown . Waiting allows you to pause a workflow mid-execution, then resume where the workflow left off, with the same data. This is u…”_

### Stage 8 — Reliable Automation

| Resource | Role | Level | Method | Duration | Match | URL |
| --- | --- | --- | --- | --- | --- | --- |
| n8n Docs — Hosting, Logging and Monitoring | required | L3 | content-inspection | — | 0 | https://docs.n8n.io/hosting/logging-monitoring/ |
- _L3 required evidence — n8n Docs: “For the complete documentation index, see llms.txt . This page is also available as Markdown . You can self-host n8n on your own infrastructure, on-premises, or in a private cloud, using Docker Compose, one-line setup, …”_

## 4. Required video segments and measured duration

No required video resources on this track — all required material is text/interactive.

## 5. Knowledge checks and answer keys (internal)

### Stage 1 — Automation Fundamentals (4 questions)

1. Which process is the strongest automation candidate?
   - **✔ Stable, repetitive process with clear inputs and outputs**
   - · Ambiguous negotiation
   - · Irreversible high-impact decision without review
   - · Constantly changing process
   - _Why:_ Stable, measurable work is easier to automate safely. · _level: understand_
2. You are given a new automation task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - · Use the first AI output if it sounds confident
   - **✔ Define the task, success criteria, and constraints for the automation problem before choosing how AI should help.**
   - · Add more adjectives to the prompt until the answer feels professional
   - · Let the AI decide the success criteria after producing the output
   - _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _level: apply_
3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - · Whether the output is polished enough to avoid review
   - · Whether the prompt was longer than the previous one
   - **✔ Look for evidence that the learner can define inputs and outputs, and can identify exceptions rather than merely repeat a definition.**
   - · Whether the model generated the answer quickly
   - _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _level: apply_
4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - · Accept it because the output looks good
   - · Give them the answer and mark the stage complete
   - · Move them to the next stage because AI is probabilistic anyway
   - _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _level: analyze_

### Stage 2 — Workflows (4 questions)

1. Why do workflows need explicit failure paths?
   - · They make diagrams prettier
   - **✔ APIs, data, credentials, and AI outputs can fail and need safe recovery**
   - · They guarantee no failures
   - · They replace testing
   - _Why:_ Reliable automation assumes failure. · _level: understand_
2. You are given a new automation task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - · Use the first AI output if it sounds confident
   - · Add more adjectives to the prompt until the answer feels professional
   - **✔ Define the task, success criteria, and constraints for the automation problem before choosing how AI should help.**
   - · Let the AI decide the success criteria after producing the output
   - _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _level: apply_
3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - **✔ Look for evidence that the learner can define failure cases, and can choose recovery behavior rather than merely repeat a definition.**
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

### Stage 3 — APIs (4 questions)

1. A workflow receives an API 401. What should you inspect?
   - · Only the prompt
   - **✔ Credentials, token scope/expiry, endpoint, and request configuration**
   - · Only UI
   - · Nothing
   - _Why:_ 401 indicates an authentication/authorization problem at the request boundary. · _level: understand_
2. You are given a new automation task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - **✔ Define the task, success criteria, and constraints for the automation problem before choosing how AI should help.**
   - · Use the first AI output if it sounds confident
   - · Add more adjectives to the prompt until the answer feels professional
   - · Let the AI decide the success criteria after producing the output
   - _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _level: apply_
3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - · Whether the output is polished enough to avoid review
   - · Whether the prompt was longer than the previous one
   - · Whether the model generated the answer quickly
   - **✔ Look for evidence that the learner can interpret common errors, and can trace the failure boundary rather than merely repeat a definition.**
   - _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _level: apply_
4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - · Accept it because the output looks good
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - · Give them the answer and mark the stage complete
   - · Move them to the next stage because AI is probabilistic anyway
   - _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _level: analyze_

### Stage 4 — Webhooks (4 questions)

1. A webhook can change customer records. What control is appropriate?
   - · Accept every payload
   - **✔ Authenticate and validate the payload and restrict allowed actions**
   - · Disable logs
   - · Trust the URL
   - _Why:_ External triggers require authentication, validation, and constrained effects. · _level: understand_
2. You are given a new automation task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - · Use the first AI output if it sounds confident
   - · Add more adjectives to the prompt until the answer feels professional
   - · Let the AI decide the success criteria after producing the output
   - **✔ Define the task, success criteria, and constraints for the automation problem before choosing how AI should help.**
   - _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _level: apply_
3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - · Whether the output is polished enough to avoid review
   - **✔ Look for evidence that the learner can validate requests, and can limit permissions rather than merely repeat a definition.**
   - · Whether the prompt was longer than the previous one
   - · Whether the model generated the answer quickly
   - _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _level: apply_
4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - · Accept it because the output looks good
   - · Give them the answer and mark the stage complete
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - · Move them to the next stage because AI is probabilistic anyway
   - _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _level: analyze_

### Stage 5 — AI in Workflows (4 questions)

1. Where should AI sit inside an automation?
   - · Everywhere
   - **✔ Where probabilistic language understanding adds value, surrounded by deterministic controls**
   - · Only at the beginning
   - · Only at the end
   - _Why:_ AI is useful for interpretation/generation while fixed rules handle predictable operations. · _level: understand_
2. You are given a new automation task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - · Use the first AI output if it sounds confident
   - **✔ Define the task, success criteria, and constraints for the automation problem before choosing how AI should help.**
   - · Add more adjectives to the prompt until the answer feels professional
   - · Let the AI decide the success criteria after producing the output
   - _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _level: apply_
3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - · Whether the output is polished enough to avoid review
   - · Whether the prompt was longer than the previous one
   - **✔ Look for evidence that the learner can identify ai-worthy steps, and can keep fixed rules around them rather than merely repeat a definition.**
   - · Whether the model generated the answer quickly
   - _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _level: apply_
4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - · Accept it because the output looks good
   - · Give them the answer and mark the stage complete
   - · Move them to the next stage because AI is probabilistic anyway
   - _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _level: analyze_

### Stage 6 — Structured Data (4 questions)

1. Why validate structured data between steps?
   - · To make it prettier
   - **✔ Malformed data can cause downstream failures or incorrect actions**
   - · Validation is unnecessary
   - · APIs never fail
   - _Why:_ Validation catches bad data early. · _level: understand_
2. You are given a new automation task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - · Use the first AI output if it sounds confident
   - · Add more adjectives to the prompt until the answer feels professional
   - **✔ Define the task, success criteria, and constraints for the automation problem before choosing how AI should help.**
   - · Let the AI decide the success criteria after producing the output
   - _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _level: apply_
3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - **✔ Look for evidence that the learner can define schemas, and can reject malformed data rather than merely repeat a definition.**
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

### Stage 7 — Human Approval (4 questions)

1. Which action usually deserves human approval?
   - · Formatting a document
   - **✔ A consequential customer refund where exceptions are possible**
   - · Sorting a list
   - · Renaming a file
   - _Why:_ Consequential or ambiguous actions benefit from human oversight. · _level: understand_
2. You are given a new automation task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - **✔ Define the task, success criteria, and constraints for the automation problem before choosing how AI should help.**
   - · Use the first AI output if it sounds confident
   - · Add more adjectives to the prompt until the answer feels professional
   - · Let the AI decide the success criteria after producing the output
   - _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _level: apply_
3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - · Whether the output is polished enough to avoid review
   - · Whether the prompt was longer than the previous one
   - · Whether the model generated the answer quickly
   - **✔ Look for evidence that the learner can identify approval boundaries, and can design escalation rather than merely repeat a definition.**
   - _Why:_ Competence is shown through correct application, evidence, reasoning, and the ability to explain or improve the result—not by recognizing terminology. · _level: apply_
4. A learner completes the stage task but cannot explain why the result is reliable. What is the most appropriate next move?
   - · Accept it because the output looks good
   - **✔ Ask the learner to identify the success criteria, inspect the relevant evidence or failure modes, and revise the work.**
   - · Give them the answer and mark the stage complete
   - · Move them to the next stage because AI is probabilistic anyway
   - _Why:_ A world-class pathway requires the learner to understand and evaluate the result, not merely produce an output. · _level: analyze_

### Stage 8 — Reliable Automation (4 questions)

1. A production workflow fails periodically. What should be added?
   - · Ignore it
   - **✔ Logs, alerts, bounded retries, failure handling, and safe recovery/replay**
   - · Infinite retries
   - · More prompts only
   - _Why:_ Production automation needs observability and controlled recovery. · _level: understand_
2. You are given a new automation task related to this stage. Which approach best demonstrates professional use of the stage competency?
   - · Use the first AI output if it sounds confident
   - · Add more adjectives to the prompt until the answer feels professional
   - · Let the AI decide the success criteria after producing the output
   - **✔ Define the task, success criteria, and constraints for the automation problem before choosing how AI should help.**
   - _Why:_ Professional AI use starts with the problem, constraints, and definition of success. The tool or prompt comes after the work is framed. · _level: apply_
3. Which evidence would give you the strongest confidence that someone actually understands this stage?
   - · Whether the output is polished enough to avoid review
   - **✔ Look for evidence that the learner can define observability, and can design recovery rather than merely repeat a definition.**
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

### Stage 1 — project `stage:ai-automation:1` (rubric sm-twh2ho-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| Demonstrates the section outcome: Identify tasks that are stable, repetitive, measurable, and safe enough to automate. | 2 | yes |
| Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) | 2 | yes |
| Explains the decisions and trade-offs behind the work | 1 | no |
| Explains how the result was checked against the section success criteria | 1 | no |
| Define inputs and outputs | 1 | no |
| Identify exceptions | 1 | no |
| Reject unsuitable automation candidates | 1 | no |

- Pass threshold: 0.8. Requires source inspection: no; written explanation: yes.

### Stage 2 — project `stage:ai-automation:2` (rubric sm-1c59gbm-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| Demonstrates the section outcome: Design workflows with explicit failure paths rather than assuming every step succeeds. | 2 | yes |
| Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) | 2 | yes |
| Explains the decisions and trade-offs behind the work | 1 | no |
| Explains how the result was checked against the section success criteria | 1 | no |
| Define failure cases | 1 | no |
| Choose recovery behavior | 1 | no |
| Protect downstream actions | 1 | no |

- Pass threshold: 0.8. Requires source inspection: no; written explanation: yes.

### Stage 3 — project `stage:ai-automation:3` (rubric sm-lxm48-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| Demonstrates the section outcome: Diagnose API failures by checking credentials, scopes, endpoints, payloads, and configuration. | 2 | yes |
| Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) | 2 | yes |
| Explains the decisions and trade-offs behind the work | 1 | no |
| Explains how the result was checked against the section success criteria | 1 | no |
| Interpret common errors | 1 | no |
| Trace the failure boundary | 1 | no |
| Correct configuration safely | 1 | no |

- Pass threshold: 0.8. Requires source inspection: no; written explanation: yes.

### Stage 4 — project `stage:ai-automation:4` (rubric sm-hwibw9-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| Demonstrates the section outcome: Secure webhook-driven workflows with authentication, validation, permissions, and constrained side effects. | 2 | yes |
| Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) | 2 | yes |
| Explains the decisions and trade-offs behind the work | 1 | no |
| Explains how the result was checked against the section success criteria | 1 | no |
| Validate requests | 1 | no |
| Limit permissions | 1 | no |
| Protect sensitive actions | 1 | no |

- Pass threshold: 0.8. Requires source inspection: no; written explanation: yes.

### Stage 5 — project `stage:ai-automation:5` (rubric sm-kwq9kp-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| Demonstrates the section outcome: Place AI where probabilistic interpretation adds value while deterministic controls handle predictable operations. | 2 | yes |
| Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) | 2 | yes |
| Explains the decisions and trade-offs behind the work | 1 | no |
| Explains how the result was checked against the section success criteria | 1 | no |
| Identify AI-worthy steps | 1 | no |
| Keep fixed rules around them | 1 | no |
| Define review gates | 1 | no |

- Pass threshold: 0.8. Requires source inspection: no; written explanation: yes.

### Stage 6 — project `stage:ai-automation:6` (rubric sm-13zdbpg-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| Demonstrates the section outcome: Validate structured data between workflow steps so bad inputs do not silently propagate. | 2 | yes |
| Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) | 2 | yes |
| Explains the decisions and trade-offs behind the work | 1 | no |
| Explains how the result was checked against the section success criteria | 1 | no |
| Define schemas | 1 | no |
| Reject malformed data | 1 | no |
| Create safe failure behavior | 1 | no |

- Pass threshold: 0.8. Requires source inspection: no; written explanation: yes.

### Stage 7 — project `stage:ai-automation:7` (rubric sm-857e5w-7)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| Demonstrates the section outcome: Use human approval for consequential or ambiguous actions that should not be fully automated. | 2 | yes |
| Describes the specific work they actually did for this section (not general advice or a restatement of the lesson) | 2 | yes |
| Explains the decisions and trade-offs behind the work | 1 | no |
| Explains how the result was checked against the section success criteria | 1 | no |
| Identify approval boundaries | 1 | no |
| Design escalation | 1 | no |
| Log decisions | 1 | no |

- Pass threshold: 0.8. Requires source inspection: no; written explanation: yes.

### Stage 8 — project `ai-a-p2` (rubric rizw7jo-8)

| Criterion | Weight | Mandatory |
| --- | --- | --- |
| A public, inspectable source artifact is provided | 1 | yes |
| Relevant implementation is present (not an empty or unrelated repository) | 2 | yes |
| A meaningful README explains the project | 1 | yes |
| The written explanation describes the actual submitted work | 1 | yes |
| The workflow has a clear happy path and explicit failure paths. | 1 | no |
| External inputs are authenticated and validated where appropriate. | 1 | no |
| Consequential actions have an appropriate human control. | 1 | no |
| The workflow can be explained and maintained by someone else. | 1 | no |

- Pass threshold: 0.8. Requires source inspection: yes; written explanation: yes.

## 7. Phase projects and acceptance criteria

### Stage 1 — Build: Automation Fundamentals Mini-Project
- **Acceptance criteria:**
  - Define inputs and outputs
  - Identify exceptions
  - Reject unsuitable automation candidates

### Stage 2 — Build: Workflows Mini-Project
- **Acceptance criteria:**
  - Define failure cases
  - Choose recovery behavior
  - Protect downstream actions

### Stage 3 — Build: APIs Mini-Project
- **Acceptance criteria:**
  - Interpret common errors
  - Trace the failure boundary
  - Correct configuration safely

### Stage 4 — Build: Webhooks Mini-Project
- **Acceptance criteria:**
  - Validate requests
  - Limit permissions
  - Protect sensitive actions

### Stage 5 — Build: AI in Workflows Mini-Project
- **Acceptance criteria:**
  - Identify AI-worthy steps
  - Keep fixed rules around them
  - Define review gates

### Stage 6 — Build: Structured Data Mini-Project
- **Acceptance criteria:**
  - Define schemas
  - Reject malformed data
  - Create safe failure behavior

### Stage 7 — Build: Human Approval Mini-Project
- **Acceptance criteria:**
  - Identify approval boundaries
  - Design escalation
  - Log decisions

### Stage 8 — Build: Production Automation Design
- **Acceptance criteria:**
  - The workflow has a clear happy path and explicit failure paths.
  - External inputs are authenticated and validated where appropriate.
  - Consequential actions have an appropriate human control.
  - The workflow can be explained and maintained by someone else.

## 8. AI lesson demonstrations

- **Stage 1:** {"lesson":"You are designing an automation where inputs, rules, exceptions, failures, and irreversible actions must be controlled. Automation Fundamentals is about automation candidates. The central idea is: Identify ta…
- **Stage 2:** {"lesson":"You are designing an automation where inputs, rules, exceptions, failures, and irreversible actions must be controlled. Workflows is about workflow design. The central idea is: Design workflows with explicit …
- **Stage 3:** {"lesson":"You are designing an automation where inputs, rules, exceptions, failures, and irreversible actions must be controlled. APIs is about API diagnosis. The central idea is: Diagnose API failures by checking cred…
- **Stage 4:** {"lesson":"You are designing an automation where inputs, rules, exceptions, failures, and irreversible actions must be controlled. Webhooks is about webhook security. The central idea is: Secure webhook-driven workflows…
- **Stage 5:** {"lesson":"You are designing an automation where inputs, rules, exceptions, failures, and irreversible actions must be controlled. AI in Workflows is about AI placement. The central idea is: Place AI where probabilistic…
- **Stage 6:** {"lesson":"You are designing an automation where inputs, rules, exceptions, failures, and irreversible actions must be controlled. Structured Data is about data contracts. The central idea is: Validate structured data b…
- **Stage 7:** {"lesson":"You are designing an automation where inputs, rules, exceptions, failures, and irreversible actions must be controlled. Human Approval is about human approval. The central idea is: Use human approval for cons…
- **Stage 8:** {"lesson":"You are designing an automation where inputs, rules, exceptions, failures, and irreversible actions must be controlled. Reliable Automation is about operations and recovery. The central idea is: Operate an au…

## 9. Outstanding verification limitations

Resources whose content could not be inspected automatically (verify manually or replace):

- Stage 2 — required (L2): https://docs.n8n.io/courses/

- Level-4 evidence (video playback / interactive use) is **not** available for any resource in this environment.

## 10. Areas requiring human review

- **Subject matter:** factual accuracy, currency and depth of each lesson, resource and knowledge check.
- **Pedagogy:** whether the worked example and resource actually prepare the learner for the knowledge check and project.
- **Accessibility:** captions/transcripts, contrast, keyboard use and screen-reader behaviour of the learning UI.
- **Assessment quality:** plausibility of distractors, whether questions test understanding rather than recall, fairness of rubric weights and the pass threshold.
- **Sign-off:** record a genuine, named review in `docs/curriculum-quality-signoff.json`. No track is approved until then.

## 11. Exact criteria for passing

A track becomes **premium-approved** only when ALL of the following hold. Failing any one blocks approval, even when the aggregate scores are high. 90 is a floor per score, not compensation for a failed gate.

- Mechanical: readiness ≥ 90 (this track: 99.5) **and** worthiness ≥ 90 (this track: 99).
- Mandatory quality gates: all pass (this track: pass).
- Every stage: at least one required resource verified to content-inspected (level 3) or better.
- Every stage: a valid knowledge check with a correct answer key, plausible distractors and server-side grading.
- Every progression-bearing section: an AI-verified mastery rubric anchored to the section objective, with source inspection where required.
- Every phase: a project with a brief, required evidence and acceptance criteria.
- A genuine, named **human** sign-off in `docs/curriculum-quality-signoff.json`.

**Would fail review if:** a required resource 404s or teaches a different objective; an answer key is wrong; a rubric can be passed without the required evidence; a mandatory criterion is waived by a high aggregate score; a project has no acceptance criteria or evidence; or a video is claimed watched without playback verification.

