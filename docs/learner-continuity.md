# Learner Continuity — path updates without resetting returning learners

Internal working document. Describes the defect that was fixed, the replacement
policy, the guarantees it makes, the learner-facing behaviour, and the evidence
that proves it works. It is **not** an approval of anything.

## 1. The defect

A guided path is an ordered list of steps. A learner's position is stored as a
single integer cursor (`GuidedPathEnrollment.currentStepIndex` = number of
completed steps = index of the next unlocked step); the UI marks every step with
`index < currentStepIndex` as done.

When a path's step list changed, the old code (`resolvePathMigration` in
`lib/guided-path.ts`) **restarted any incomplete path at index 0**. That does not
delete database rows, but it does lose the learner's *position*: every completed
section is shown as incomplete again and the learner is forced to repeat valid,
already-finished work. That is a continuity failure, not a data-loss failure —
and it is invisible to a test that only checks rows still exist.

## 2. The replacement policy

The scalar cursor is replaced by an **evidence-based remap**, split into a pure
policy module and a thin database module:

- `lib/path-compat.ts` — pure policy:
  - **stable semantic keys** for steps (`stage + role + resource/project id`), so
    a key survives insertions and reordering;
  - `resolveCompatiblePathIndex(...)` — reconstructs the learner's genuinely
    completed steps from their `UserProgress` activity records, not from the old
    integer;
  - `describePathUpdate(...)` / `pathUpdateNoticeFromRecord(...)` — the honest,
    learner-facing explanation of what changed;
  - `PROJECT_ID_ALIASES` / `canonicalProjectId` — so a renamed project id is
    recognised as the same project;
  - `isAssessmentStepType` — assessments are never adopted.
- `lib/path-enrollment.ts` — the database layer (dependencies minimal so it can
  be integration-tested against a disposable database without a route handler).

Resolution rules:

| Situation | Result |
| --- | --- |
| Records exist | resume **immediately after the furthest completed step**; earlier steps not individually recorded are *adopted* (shown complete) but **not counted as mastered** |
| An uncompleted **assessment** sits before the anchor | resume **at it** — never skipped or adopted |
| No records but stored position > 0 | keep the position (`restored`) — **never reset** |
| Learner stranded at 0 by the old code | repaired forward from records (`recovered`) |
| New/empty learner | `fresh` at 0 on the **latest** path |

## 3. Guarantees

1. A completed course stays completed.
2. An incomplete path resumes at the correct equivalent step — never restarted
   merely because a version number changed.
3. A newly required assessment is never skipped using historical activity.
4. Every historical record (progress, submissions, assessment history) is
   preserved untouched.
5. Progression and credit are **not** double-consumed during upgrades or
   retries (assessment reservations are atomic and idempotent — see
   `docs/assessment-credit-concurrency.md`).
6. The learner is **told** when the path changed, not silently moved.

## 4. Learner-facing behaviour

- The server persists a `pathUpdate` record (with `pathCompatibility` among the
  server-owned progress keys, so the client cannot forge it) whenever a remap
  happens.
- The guided path shows a dismissible **"Course updated"** banner explaining the
  change and confirming that completed work and position were preserved.
- Dismissal is persisted **server-side** and cleared only when the learner
  dismisses it; acknowledging the notice is **progression-neutral** (it grants
  nothing and blocks nothing).

## 5. Verification evidence

Automated (all passing on the final tree):

- `tests/path-continuity.test.js` — the pure remap rules.
- `tests/path-enrollment.integration.test.js` — 6 integration tests against a
  disposable PostgreSQL database, including the DB-only-change case that is
  invisible to row-preservation checks.
- `tests/guided-path-progression.test.js`, `tests/server-progress.test.js` —
  progression and server-owned-key protection.
- `e2e/path-continuity.spec.ts` — **4 browser tests** through the real HTTP +
  browser path, using an *older* path version written straight into the progress
  record (the only way to simulate history, since the version field is
  server-owned):
  1. a returning learner keeps their position and completed work;
  2. the update notice appears and **persists until dismissed**;
  3. a completed course stays complete;
  4. a new learner gets the latest path with **no** notice.

Full Playwright suite: **40 passed**.

## 6. Honest limits

- The remap is only as good as the semantic keys. If a future edit changes a
  stage's meaning while reusing its key, the learner keeps the historical
  completion — this is intended (preserve history) but a *materially changed*
  objective must be flagged as a new mastery requirement rather than silently
  credited. The notice mechanism exists precisely to surface that.
- A stage that cannot be mapped safely keeps the learner's historical data and a
  recoverable position; it is never a silent reset.
- No production learner records were read, modified or migrated to verify this.
  Verification uses disposable fixtures only.
