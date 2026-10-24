# TechSkillHUB — Staged Curriculum Implementation Master Prompt

Use this prompt **only after** `01_PREFLIGHT_PROMPT.md` has run and `docs/curriculum-import-preflight.md` has been reviewed. The preflight must be the basis for actual schema mapping. Implement the research package as a batch-based update to the existing TechSkillHUB application; do not build a parallel learning system.

## Mission

Implement the 186-stage curriculum research package so each stage has accurate instruction, appropriately verified free learning resources, a stage-specific quiz, a useful AI mastery task, authentic practice, and properly mapped phase/project work. Integrate only what maps safely to the existing application architecture. Continue until all stages have been handled or actual blockers are recorded.

### Required data inputs

Use the extracted files under `local-research/research_package/TechSkillHUB_Curriculum_Research_Deliverables/`:
- `02_STAGE_LEARNING_SPECS.json`
- `03_RESOURCE_CANDIDATES.csv`
- `04_APPROVED_RESOURCE_MAP.csv`
- `05_QUIZ_BANK.jsonl`
- `06_STAGE_MASTERY_AND_PRACTICE.json`
- `07_PHASE_PROJECTS.json`
- `08_REVIEW_AND_OPEN_ISSUES.csv`
- `09_RESOURCE_VERIFICATION_LOG.csv`
- `research-progress.json`

Use `00_EXECUTIVE_PLAN.md`, `12_FINAL_COVERAGE_REPORT.md`, `SOURCE_PROVENANCE.md`, `QA_VALIDATION.txt`, and the preflight output to understand status and limits.

## Non-negotiable interpretation of the package

- The package is a research and implementation proposal, **not approved curriculum**.
- The resource map filename contains `APPROVED`, but the resources are still provisional. Never infer approval from that filename or from a high screening score.
- 143 candidate stages passed only an archived screening signal. They are not current live-access verified.
- 43 stages were blocked from the archived resource eligibility screen. Do not make up sources or silently promote them. Use current web research if the IDE has a working browser/search tool; otherwise preserve the blocker and make sure in-product teaching remains useful without falsely labelling an external source verified.
- In the research checkpoint, zero of 186 primary pages were fully live-reverified, L4 playback/interaction verification is zero, and human sign-off is zero.
- 930 quiz items are drafts. Five questions per stage and a 100-point total are mechanical properties, not proof of correctness.
- 125 records are phase/capstone projects. Do not count the 66 synthetic section-mastery contracts as full projects.
- Do not call all 32 courses premium-ready or approved.

## Safety and preservation

- Preserve the pre-existing dirty working tree. Do not run `git reset`, `git clean`, broad reverts, stash/pop, or any destructive operation.
- Verify the current HEAD and make a restorable backup before editing.
- Do not commit, push, tag or deploy.
- Do not inspect production/shared database records, run a production migration, or initiate payments/refunds/subscriptions.
- Keep `COMMERCE_CHECKOUT_ENABLED=false`, `COMMERCE_ENTITLEMENTS_ENFORCED=false`, `COMMERCE_PRICES_APPROVED=false`, and the provider test-mode default unchanged.
- No customer emails/announcements.
- Mascot work is deferred and out of scope.
- Preserve learner progress, assessment histories, submissions, achievements and earned certificates.
- Do not execute migrations. If a migration is technically necessary, create a proposal and test only against disposable PostgreSQL with explicit safe environment checks.

## Implementation approach — batches, not a giant rewrite

Use a progress ledger saved under `docs/curriculum-implementation/` and update it after every batch. Process one track or a small bounded group of stages at a time. Do not dump all 8 MB of JSON into context. Use scripts for parsing, indexing, validation and bounded stage extraction.

### Batch 0 — mapping guard

Use the preflight to confirm the actual schema. Build or update a deterministic importer/validator only if useful; it must validate canonical IDs, stage relationships, point totals, rubrics, resource statuses, allowed evidence types and existing progress compatibility. It must fail closed on unknown IDs and conflicting mappings. Do not replace the runtime source of truth with a second JSON catalogue.

### Pilot batch — 4 representative tracks

Implement and test these tracks first:
- Frontend Development (`frontend`, 5 stages)
- UI/UX (`uiux`, 5 stages)
- AI Foundations (`ai-foundations`, 6 stages)
- Cybersecurity (`cyber`, 4 stages)

This 20-stage pilot intentionally tests programming, design, AI and security learning. Use existing actual canonical stage IDs from the manifest, not invented IDs.

For the pilot:
1. Map the researched lesson specs to existing runtime types.
2. Review each resource decision. Required resources must have verified current access and inspected relevant content; unknown or blocked sources stay optional/blocked. Never force a GitHub repository for non-code evidence.
3. Integrate stage-specific quizzes, preserving weights (five questions at 20 points each when the five-question schema is the approved target), correct keys, rationales and feedback. Validate server-side. Never ship answer keys/rationales to unauthorised client payloads or bundles. Return only appropriate post-submission feedback.
4. Integrate mastery tasks through the existing AI assessment engine, with correct stage objectives, rubric versions, discipline-specific evidence formats, credit reservation, idempotency, failure-closed behaviour and real server-side progression authorization.
5. Integrate practice and phase projects using the real project/evaluator schema. Map each project to its intended stage; don't treat synthetic mastery contracts as phase projects. For Cybersecurity, keep activity within authorized labs; no public targets or real attacks.
6. Verify the frontend flow from lesson/resource -> quiz -> mastery evidence -> feedback/retry -> eligible progression. Preserve previously earned outcomes and in-progress position through semantic mapping; do not reset users because of a version bump.
7. Add targeted regression tests and update the batch ledger.

After the pilot, run relevant unit tests, tests with disposable PostgreSQL, TypeScript, lint, route/contract tests and applicable Playwright E2E. If any critical test fails, diagnose/fix it before continuing. If there is a fundamental model/schema mismatch that cannot be resolved safely without a decision, stop and report it instead of implementing speculative data changes.

### Remaining batches

Once the pilot passes, continue through all remaining tracks in bounded batches (normally one or two tracks, keeping AI-heavy or high-risk tracks smaller). After every batch:
- validate all stage IDs and record counts;
- run relevant content/contract/resource/project checks;
- test representative learner flow;
- record changes, test results, unresolved issues and remaining stages;
- update the persistent ledger;
- preserve any uncertainty rather than hiding it.

Continue until all 32 tracks/186 stages have been handled or every remaining blocker is explicitly recorded. Do not stop after the pilot and call the project complete. Do not proceed past unresolved critical security or progression failures.

## Resource policy

For every resource proposed as required:
- establish source identity and canonical URL;
- inspect relevant content against the stage objective;
- verify current free access for the exact required segment/module (not merely a free landing page or preview);
- record whether login is required;
- check appropriate learner level and currency;
- record duration/workload when supported by evidence;
- verify the exact selected video segment/playback if claiming playback verification.

Keep evidence state explicit: `discovered`, `destination_verified`, `content_inspected`, `current_free_access_verified`, `human_reviewed`, `approved`. Do not infer one state from another or from scoring. Use the best verification tool actually available. If no live-web tool works, state that and do not claim current verification.

Preferred required video segment: 5–15 minutes, avoid >20 uninterrupted minutes when a coherent segment is available. These are guidance, not a reason to select a worse resource. Longer full courses can be optional deep dives with required module/segment specified only when verified. A text/interactive source is fine when better for the objective.

For each of the 43 blocked candidate stages, try to research at least three credible alternatives where live research access exists. If no suitable option can be verified, keep a blocker and ensure original TechSkillHub instruction/practice is adequate without misrepresenting the external-resource state.

## Quiz, mastery and project policy

- Every stage quiz must map to its explicit learning outcomes and the actual taught material. Correct keys, distractors, rationales and feedback require correctness review; exact-stem uniqueness isn't enough.
- Use the five draft questions per stage and 100-point scheme as the starting proposal, not unquestionable truth. Preserve the 100-point total and five items when the existing runtime supports this and preflight finds no reason to revise; any change must be documented and tested rather than accidental.
- Do not expose hidden correct answers or rationales in source bundles, HTML, serialized client data or pre-submission API responses.
- AI mastery needs evidence meaningful to the discipline, objective-anchored rubric, deterministic critical checks where suitable, valid rubric version and fail-closed behaviour.
- Each phase project needs a real brief, authentic deliverable, submission instructions, criteria, weighted rubric totaling 100, critical gates, evidence format, feedback and retry route.
- Software projects may use GitHub evidence. Design, writing, management, marketing, video, research and other non-code work must accept appropriate artifacts without a forced repo requirement.
- Existing work, completion history, assessments and certificates must persist. New requirements cannot be marked passed without evidence; historical achievements must not be silently revoked.

## QA and release gates

Add regression checks for malformed/question-specificity issues, incorrect keys, non-100 quiz totals, resource status misuse, wrong resource/stage alignment, generic or mismatched rubrics, inappropriate evidence formats, missing mapping, answer-key exposure, unauthorized progression, stale rubric pass reuse and path-version continuity.

Run and report actual results for:
- unit tests;
- curriculum audit and blocked-resource checks;
- quiz/resource/project schema validators;
- TypeScript;
- lint;
- Prisma validation and schema drift;
- disposable PostgreSQL integration/concurrency tests;
- Playwright E2E;
- production build.

Do not weaken tests or turn failures into skipped tests. Repeat required tests after the last code change. No production migration/deploy/live checkout.

## Human approval and final reporting

All imported quizzes, resources, mastery rubrics and project criteria remain `needs_human_review` unless a genuine qualified review has occurred and been recorded. Do not synthesize signatures or reviewers. Premium approval requires both scores >=90, all gates passing, current resource evidence and valid human sign-off.

Produce a final report with:
- original HEAD and backup;
- every track/stage implemented and blockers by canonical ID;
- resources used and current verification level;
- quiz/mastery/project mappings and schema compatibility;
- tests run with exact pass/fail/skip counts;
- migration proposals if any (not executed on production);
- progress-continuity results;
- remaining human/live-resource/provider review;
- explicit confirmation that pricing, commerce gates, deployment and mascot stayed untouched.

Do not claim total success if any batch remains unprocessed or any required verification is unavailable. The goal is to make all 186 stages implementable and coherent in the real app—not merely to ingest a JSON file.
