# TechSkillHUB Research Package — Read-Only Preflight Prompt

You are working in the existing TechSkillHUB repository. Your task is to inspect and reconcile the supplied curriculum research package before implementation. **This phase is strictly read-only. Do not edit application files.**

## Context

TechSkillHUB is a guided learning platform for beginners and career changers. Its value is not simply listing courses: it curates credible free learning resources, gives original instructional context, tests knowledge, requires practical application, and uses server-side AI verification to assess mastery before progression.

The existing repository has significant uncommitted work. Preserve it. The research package is a proposed curriculum update, not authority to approve or launch paid content.

## Input files

The expanded curriculum folder is intentionally not tracked in this public repository. The preserved input archive is:
`local-research/TechSkillHUB_DeepSeek_IDE_Starter_Pack/research_package/source-deliverables.zip`
with its matching checksum file `SOURCE_ARCHIVE_SHA256.txt` in the same directory.

Use the actual `CURRICULUM_PACKAGE_DIR` provided by the operator. If no extracted directory is provided, inspect the archive/checksum metadata and ask for extraction into a temporary directory outside the tracked application tree before proceeding. Do not assume an extracted folder exists under the repository. Once provided, locate the directory containing `01_STAGE_MANIFEST.csv`, `02_STAGE_LEARNING_SPECS.json`, and `00_EXECUTIVE_PLAN.md`; the archive's parent-folder layout may vary. Do not modify the archive or regenerate missing files.

Read these first:
- `00_EXECUTIVE_PLAN.md`
- `01_STAGE_MANIFEST.csv`
- `02_STAGE_LEARNING_SPECS.json`
- `03_RESOURCE_CANDIDATES.csv`
- `04_APPROVED_RESOURCE_MAP.csv`
- `05_QUIZ_BANK.jsonl`
- `06_STAGE_MASTERY_AND_PRACTICE.json`
- `07_PHASE_PROJECTS.json`
- `08_REVIEW_AND_OPEN_ISSUES.csv`
- `09_RESOURCE_VERIFICATION_LOG.csv`
- `12_FINAL_COVERAGE_REPORT.md`
- `QA_VALIDATION.txt`
- `SOURCE_PROVENANCE.md`
- `research-progress.json`

Do not load every 8 MB JSON file into one prompt or dump it in full to the conversation. Use scripts or bounded reads to inspect and validate data by track and stage.

## Source facts to verify, not blindly trust

- 32 tracks and 186 unique stages.
- 930 draft MCQs, five per stage, 100 total points per stage.
- 186 mastery/practice records.
- 125 phase/capstone projects; 66 synthetic section-mastery contracts are not additional phase projects.
- 610 candidate-comparison rows, 584 resource-map rows, 1,021 verification-log rows.
- 143 stages have provisional archived-evidence candidates; 43 are blocked by the archive-only eligibility screen.
- 0/186 stage primary pages fully reverified live in the resumed checkpoint; 0 playback/interaction verifications (L4).
- Human sign-off is 0. QA reports 29 PASS, 3 WARN, 0 FAIL; the WARN items are meaningful blockers.

`04_APPROVED_RESOURCE_MAP.csv` is not actually an approved resource list. All selections remain provisional pending current content, free-access, account/paywall, duration/accessibility and appropriate review checks.

The research bundle is known to contain unresolved mapping/access issues and model-authored draft quizzes/rubrics. Point totals and normalized uniqueness do not prove correctness or teaching quality.

## Inspect the live repository

1. Print and record repository root, branch, HEAD, dirty working-tree count and whether a local backup exists. Do not clean, reset, stash, commit or push.
2. Locate the actual sources of truth for track/stage definitions, learner path construction, resources, quiz delivery/grading, answer-key storage, AI mastery, project contracts, persistence, assessment credits and progression authorization.
3. Inspect current Prisma schema and API contracts. Do not run any migrations.
4. Determine how these bundle fields map to actual runtime types and data sources. Identify unsupported fields, missing required fields, conflicting stage IDs, duplicate resources, project/evaluator mismatches, versioning effects and any risk to current learner data.
5. Confirm how answer keys/rationales are kept private and how the server authorizes progression.
6. Confirm which resource URLs have current evidence versus archive-only evidence. Do not call a URL currently verified because the archive shows HTTP 200 or old extracted content.
7. Identify the 43 archive-screen-blocked stages and plan how they will be handled: use available browsing tools for actual research if possible; otherwise keep them explicitly blocked or use an adequately taught in-product lesson without falsely claiming external-resource verification.
8. Inspect representative quiz/question and project/evaluator samples from several different disciplines, including Frontend, UI/UX, Cybersecurity, AI Foundations, Writing or Project Management. Identify mismatches rather than assume one schema fits every discipline.
9. Check for the known hazards: generic cross-discipline rubrics/questions, GitHub-required evidence for non-code work, unknown or false free-access assumptions, overlong videos without selected segments, source-answer leakage, stale rubric reuse, and path-version changes that could reset learners.

## Required output

Create `docs/curriculum-import-preflight.md` and machine-readable `docs/curriculum-import-preflight.json` containing:
- repository baseline and source-package identity;
- source counts independently reconciled;
- per-file shape/count validation;
- actual application schema/path mapping;
- a per-track summary with all canonical stage IDs;
- proposed import/update strategy with exact target source files;
- resource-status handling, especially 143 provisional and 43 blocked stages;
- quiz, mastery, practice and project mapping risks;
- security/privacy risks and regressions to guard against;
- required tests and expected acceptance results;
- a batch plan (pilot first, then remaining tracks);
- files likely to change and any migration proposal (proposal only, never execute);
- remaining human review and live provider limitations.

Run only read-only inspection, JSON/CSV parsing and non-mutating validation scripts. Do not edit application source, do not modify any records, and do not modify commercial gates.

Finish with a concise report explaining whether it is safe to start implementation. Do not claim all research has been live-verified. Stop after producing the preflight report.
