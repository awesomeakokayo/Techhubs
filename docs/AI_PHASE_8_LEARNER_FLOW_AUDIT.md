# Phase 8 — Final Beginner Learner-Flow Audit

## Audit premise

This audit simulates the learner starting with:

> **I know nothing about AI.**

The learner must be able to progress through the AI curriculum without using outside search to discover an essential concept, procedure, or prerequisite. External links in the learning path are reinforcement, not hidden prerequisites.

## Required stage contract

Every AI stage must expose exactly this instructional order:

**Learn → See → Practice → Verify → Build**

- **Learn:** TechSkillHub-authored explanation, objective, success criteria, and mistakes.
- **See:** a worked example tied to the same competency; an external resource may reinforce it, but the example itself is authored by TechSkillHub.
- **Practice:** a concrete learner task with instructions and success criteria, or a stage-specific applied challenge when no dedicated task exists.
- **Verify:** multiple-choice questions tied to the stage objective/competencies and annotated with teaching provenance; the assessment is application-heavy and requires 80% to continue.
- **Build:** a stage-specific artifact or mapped portfolio project whose prerequisite skills are already taught and practiced.

## Beginner-flow checks

### 1. No hidden concept dependencies

A stage's task, assessment, and build are generated from the stage objective, authored lesson, practice library, assessment bank, and project audit. The learner is not directed to a generic web search as a prerequisite.

### 2. External resources are optional reinforcement

The `See` step reads only from the canonical Phase 7 verified resource registry. A missing external resource does not remove the worked example, and therefore does not block progression.

### 3. Every stage produces work

Practice requires an artifact, decision record, workflow, analysis, draft, prototype, test, or other observable learner action. Build requires a concrete artifact brief or an existing portfolio project brief.

### 4. Every assessed concept is taught

Verify questions are generated only from the stage checkpoint bank, the stage objective/success criteria, or the controlled fallback questions. AI Verify questions are annotated by the assessment-audit layer with teaching stage and cognitive level.

### 5. Projects do not introduce surprise skills

Portfolio builds surface their Phase 5 prerequisite trace. The audit marks all currently mapped portfolio projects complete and records zero unresolved major concepts.

### 6. Resources are deployment-safe

The learner-facing AI path reads from the canonical Phase 7 registry, whose entries are explicitly marked free and verified and include provider, competency, stage, type, and last-checked date.

## Track coverage

| AI track | Stages | Beginner gate | Result |
|---|---:|---|---|
| AI Foundations | 6 | Learn → See → Practice → Verify → Build on every stage | ✅ Pass |
| AI for Work | 5 | Same contract | ✅ Pass |
| AI Research | 5 | Same contract | ✅ Pass |
| AI Content | 5 | Same contract | ✅ Pass |
| AI YouTube | 10 | Same contract | ✅ Pass |
| AI Software Development | 8 | Same contract | ✅ Pass |
| AI Automation | 8 | Same contract | ✅ Pass |
| AI Agents | 10 | Same contract | ✅ Pass |
| AI Engineering | 10 | Same contract | ✅ Pass |
| AI Design | 8 | Same contract | ✅ Pass |
| **Total** | **75** | **375 instructional phase steps** | **✅ Pass** |

## Abandonment test

At each handoff, ask:

> **Does TechSkillHub give me everything I need to perform the next task?**

### Learn → See

Yes. The explanation and worked example are generated from the same stage objective. The learner does not need an external tutorial to understand the example.

### See → Practice

Yes. Practice uses the stage's dedicated task or the authored applied challenge, with instructions and success criteria. The learner does not need to invent the exercise.

### Practice → Verify

Yes. The Verify step is generated from the same stage objective, checkpoint questions, supplemental assessment questions, and controlled fallback questions. It does not require outside research to answer a prerequisite question.

### Verify → Build

Yes. Every stage gets a Build step. Mapped portfolio projects include a backward prerequisite trace; unmapped stages receive a stage-specific mini-project derived from the stage competency.

## Important exception

Some competencies deliberately refer to **current external policy or live product documentation**—for example YouTube AI disclosure rules or changing AI tool interfaces. These are treated as optional/verified reference material where possible. The underlying decision principle is taught by TechSkillHub first, so the learner is not abandoned with “go search the internet.”

## Final acceptance result

**Every task has a learning source:** ✅

Stage objectives, lessons, worked examples, practice tasks, verified resources, assessments, and project briefs are connected through the guided-path builder.

**Every assessed concept was taught:** ✅

AI assessment questions are tied to a teaching stage and cognitive level through the Phase 6 assessment-audit layer.

**Every project skill was introduced beforehand:** ✅

The Phase 5 project audit provides backward traces for all ten mapped portfolio projects, and the Build step surfaces those traces.

**Every required resource is free and verified:** ✅

The AI learner flow consumes only the canonical Phase 7 registry for external reinforcement.

**Every stage produces actual work:** ✅

Each stage has Practice and Build phases with explicit learner actions and evidence expectations.

**A beginner can progress without being abandoned:** ✅

No stage depends on an undocumented “figure it out yourself” step. External resources are reinforcement; TechSkillHub-owned lessons and examples remain the instructional backbone.

## Final verdict

### AI curriculum learner-flow audit: **PASS**

The AI curriculum now behaves as a curriculum rather than a resource list:

**Teach → Demonstrate → Do → Prove → Build**

The beginner gate should be rerun whenever an AI stage, practice task, assessment bank, resource registry, or portfolio project brief is changed.
