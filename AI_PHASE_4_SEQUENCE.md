# Phase 4 — AI Learning Sequence

Every AI stage uses the same instructional contract:

**LEARN → SEE → PRACTICE → VERIFY → BUILD**

## Learn

TechSkillHub teaches the competency directly through the stage objective, explanation, success criteria, worked context, and common mistakes.

## See

The learner studies a concrete worked example. Where Phase 3 identified a useful authoritative free resource for the stage, the best matching resource is available as optional reinforcement without replacing the authored lesson.

## Practice

The learner performs one focused task themselves. Existing AI practice tasks are reused when they are stage-aligned; otherwise the stage lesson's applied challenge becomes the required practice.

## Verify

The learner completes a multiple-choice mastery check focused on application and judgment. AI stages require at least 80% to continue, and the server recomputes the score from the submitted answers.

Each stage receives at least three verification questions. Existing high-quality questions are retained and capped at five so the assessment stays focused.

## Build

Every AI stage ends with a build. A portfolio-quality project is used when one is explicitly mapped to that competency. Otherwise a stage-specific mini-project is generated from the stage objective and success criteria.

Build descriptions include an objective, deliverables, acceptance criteria, and evidence requirements. Existing portfolio projects also reuse their detailed project briefs where available.

## Progress safety

The five-step structure changes the number and meaning of guided-path indices. AI guided paths therefore use an explicit version marker (`4`) in `UserTrackProgress`. Existing learners are migrated to the first incomplete AI stage rather than resuming at an obsolete index.

## Acceptance test

For every AI stage:

- Exactly five learner-facing steps exist.
- Their phases are `learn`, `see`, `practice`, `verify`, `build` in that order.
- Learn is authored by TechSkillHub.
- See contains a concrete worked example.
- Practice requires learner action.
- Verify contains application/judgment questions and enforces the AI mastery threshold.
- Build produces a stage-specific artifact or uses a mapped portfolio project.
- No paid API/tool is required merely to understand or complete the curriculum.
