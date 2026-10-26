# Phase 5 — AI Project Backward Audit

Every AI project is audited from the requirement backward:

**Project requirement → competency → Learn → See → Practice → Verify**

A project may combine earlier competencies, but it must not introduce a new major concept at build time.

## Results

| Project | Track | Build stage | Status |
|---|---|---:|---|
| `ai-f-p3` | AI Foundations | 6 | ✅ Complete |
| `ai-w-p4` | AI for Work | 5 | ✅ Complete |
| `ai-r-p2` | AI Research | 5 | ✅ Complete |
| `ai-c-p4` | AI Content | 5 | ✅ Complete |
| `ai-y-p3` | AI YouTube | 10 | ✅ Complete |
| `ai-s-p4` | AI Software Development | 8 | ✅ Complete |
| `ai-a-p2` | AI Automation | 8 | ✅ Complete |
| `ai-ag-p2` | AI Agents | 10 | ✅ Complete |
| `ai-e-p2` | AI Engineering | 10 | ✅ Complete |
| `ai-d-p2` | AI Design | 8 | ✅ Complete |

## Major finding fixed

The AI Software Development portfolio project previously required learners to review **performance**. Performance engineering was not an explicit competency in the mapped AI sequence, so the requirement was removed. The project now evaluates correctness, security, tests, maintainability, and scope discipline—all already taught.

## Backward coverage

**AI Foundations:** repeatable workflow design comes from Stage 6, with judgment and verification from Stages 4–5.

**AI for Work:** responsible workflow design comes from Stage 5, supported by planning and document-review skills from earlier stages.

**AI Research:** the final brief follows question framing → evidence tracing → source evaluation → claim auditing → synthesis with uncertainty.

**AI Content:** the campaign uses audience definition → research → drafting/editing → visual direction → measurement.

**AI YouTube:** the cumulative Stage 10 project traces strategy, topic research, scripting, packaging, originality, disclosure, and analytics to earlier stages.

**AI Software Development:** the build traces code understanding, bounded requirements, debugging, agent delegation, security boundaries, testing, professional development, and team policy.

**AI Automation:** the build traces safe candidate selection, workflow design, API/webhook controls, AI placement, data validation, human approval, and operations.

**AI Agents:** the final project traces architecture choice, tool boundaries, memory, failure handling, observability, human approval, and evaluation.

**AI Engineering:** the RAG project traces model integration, model selection, validation, embeddings, retrieval/chunking, retrieval diagnosis, evaluation, optimization, and production readiness.

**AI Design:** the case study traces AI-assisted exploration, UI evaluation, visual consistency, accessibility, evidence, prototyping, design-system use, and final design judgment.

## Implementation

`lib/ai-project-audit.ts` contains machine-readable prerequisite traces for all ten portfolio projects. Each trace records the competency, source stage, Learn, See, Practice, and Verify evidence.

`lib/ai-guided-path.ts` surfaces the prerequisite trace in the Build step, so the learner sees exactly why the project is being assigned.

## Regression rule

Future project changes require review when a deliverable introduces an untaught major competency, requires an untaught tool/concept, lacks Learn/See/Practice/Verify evidence, or is mapped earlier than a competency it assumes.

Current audit result: **10/10 AI portfolio projects complete; 0 unresolved major-concept flags.**
