# Phase 4 — AI Learning Sequence

Every AI stage in the guided path now follows one fixed instructional contract:

**Learn → See → Practice → Verify → Build**

## Stage contract

### 1. Learn

The learner receives a TechSkillHub-authored explanation of the competency, including the objective, core lesson, common mistakes, and success criteria.

### 2. See

The learner sees one realistic worked example. The example demonstrates the decision-making involved in the competency instead of simply showing another definition or external link.

### 3. Practice

The learner performs one coherent task themselves. Legacy multiple practice tasks are intentionally reduced to the primary task so the sequence stays focused.

### 4. Verify

The learner completes a multiple-choice mastery check. Questions emphasize application, diagnosis, tradeoffs, and professional judgment rather than vocabulary recall. AI tracks require at least 80%.

### 5. Build

Every stage ends with an artifact that uses the competency. A mapped portfolio project is used when available; otherwise the stage generates a focused mini-project so no competency ends without application.

## Implementation

`lib/ai-guided-path.ts` is the source of truth for the AI sequence. For each AI roadmap stage it creates exactly five learner-facing steps and assigns `learningPhase` metadata:

- `learn`
- `see`
- `practice`
- `verify`
- `build`

The underlying generic guided-path step types remain unchanged so existing progress persistence and non-AI tracks are not unnecessarily disturbed.

## Design principles

- TechSkillHub teaches fundamentals itself before sending learners elsewhere.
- Worked examples are not counted as practice.
- Practice is something the learner must actually do.
- Verification happens after practice, not before it.
- Verification tests judgment, not memorization.
- Build is mandatory for every AI stage.
- External resources are reinforcement, never the core lesson.
- No stage may silently omit a Build or Verify step.

## Phase 4 acceptance test

For every AI track and every roadmap stage, the generated path must satisfy:

`[learn, see, practice, verify, build]`

in exactly that order, with no extra legacy resource, project, or checkpoint steps inserted between them.
