# Implementation Prompt — TechSkillHUB Curriculum Evidence Package

Implement only after reviewing the current repository/schema independently. Treat the outputs in this bundle as a reviewed proposal, not as authority to launch paid curriculum.

## Required inputs
- `02_STAGE_LEARNING_SPECS.json` (186 stage specs, five MCQs/100 points each, mastery and practice)
- `04_APPROVED_RESOURCE_MAP.csv` (historical mapped resources and decisions; despite filename, all choices remain provisional)
- `05_QUIZ_BANK.jsonl` (930 questions; answers/rationales are server/reviewer-only)
- `06_STAGE_MASTERY_AND_PRACTICE.json`
- `07_PHASE_PROJECTS.json` (discipline-specific project evidence/rubrics)
- `08_REVIEW_AND_OPEN_ISSUES.csv`, `09_RESOURCE_VERIFICATION_LOG.csv`, `research-progress.json`

## Non-negotiable constraints
- Do not deploy, commit/push, reset/clean files, run migrations, touch production/shared databases, access learner records, change payment/entitlement behavior or enable checkout.
- Do not integrate the mascot in this workstream.
- Preserve learner progress and existing assessment history.
- Keep answer keys and correct-answer rationales out of public client bundles. Grade or fetch approved answer metadata server-side only; authorize progression server-side.
- A mechanically complete JSON object does not equal a verified resource or approved course. Every resource has an evidence level and limitation; keep a resource out of required learner path unless exact relevant content, current free access and accessibility/workload have been checked.
- Never claim videos were played. Playback is L4 and remains zero in this package.
- Never require GitHub for design, marketing, writing, research, video or management artifacts when the actual project deliverable is not code. Use the project's allowed evidence format.
- Cybersecurity actions must stay within written authorization and controlled labs; blockchain tasks must not use real funds/mainnet without separate approval.
- Do not publish proposed prices or change commercial access gates.

## Work to do in implementation
1. Inspect current Prisma schemas, API validation, curriculum types, assessment types, AI evaluation contracts and progression authorization; report mismatches before editing.
2. Map these data to existing schemas without deleting or resetting learner data. Provide migration/spec changes only for review; do not execute them.
3. Make resource verification state first-class: `discovered`, `destination_verified`, `content_inspected`, `current_free_access_verified`, `human_reviewed`, `approved`. Do not infer later states from prior states or from a numeric quality score.
4. Implement point-aware quiz scoring. Keep server/reviewer answers private. Check that five questions per stage total 100; critical questions can block independently; do not leak answer keys in API responses or client payloads.
5. Implement discipline-specific evidence types/rubrics and ensure the exact effective brief/rubric is delivered to the evaluator. Verify a design artifact does not require a repo; a cybersecurity finding requires scope/evidence/remediation; data requires reproducibility/interpretation; video/content requires authentic creative output and appropriate rights/policy checks.
6. Enforce structured AI assessment output with schema validation, bounded length/cost, retry/failure paths and human-approval gates where required. AI must not waive mandatory criteria because of fluent prose.
7. Add regression tests for generic questions, incorrect keys, non-100 totals, generic or mismatched rubrics, missing current resource evidence, unverified/free-unknown resources shown as required, inappropriate artifact types, unauthorized cyber scope, secrets exposure, and server-side progression enforcement.
8. Create an implementation report including tests actually run, skipped tests, schema gaps, data migration proposal, compatibility issues, and rollback steps. Do not claim success for tests not run.

## Release gates (must remain off in this task)
No checkout activation, public prices, entitlement enforcement, payment-provider live/sandbox test, deployment or premium sign-off. All curriculum records stay `needs_human_review` until the actual qualified review process records a human decision.
