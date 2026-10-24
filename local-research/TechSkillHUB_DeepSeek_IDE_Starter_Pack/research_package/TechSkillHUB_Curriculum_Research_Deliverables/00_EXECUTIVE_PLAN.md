# TechSkillHUB Curriculum Research — Execution Package

**Snapshot date:** 2026-10-21  
**Status:** Stage specs drafted; resource verification and human review still in progress.  
**Source SHA-256:** `ec2ff32e9f7c805cc9c6db1972426fdbe412a31ec3487ace1993867ae3cf6266`

## Scope reconciled from the archive

- 32 tracks and 186 unique stages.
- 398 mapped resource rows, 326 canonical URLs stated in the package README (the parsed canonical list also needs reconciliation because URL normalization can change its distinct count).
- 191 exported project records; 638 source-stage knowledge-check records.
- Output this batch: 610 stage-candidate rows, 186 stage specifications, 930 MCQs, 584 inventory/candidate resource-map rows, 408 verification records and 125 normalized phase projects.

## Work completed in this checkpoint

1. Reconciled the source counts and SHA-256 against the provided sidecar.
2. Reviewed all 398 resource rows and documented an explicit keep/hold/remove/optional/manual-review recommendation with the archive evidence level and limitation.
3. Built a per-stage candidate comparison record and reselected the best archived instructional candidate when it had L3 extracted content, an explicitly not-paywalled state, adequate extracted content, an instructional format and positive objective-match signal.
4. Rebuilt quiz questions to retain supplied non-generic stage-aligned items where usable and add stage/objective/domain-specific scenario items; each stage has five MCQs at 20 points each (100 points total).
5. Replaced cross-discipline generic mastery/project rubrics with discipline-specific scoring criteria and more appropriate artifact formats.
6. Preserved `needs_human_review` for all 186 stages, set human/premium approvals to zero, left playback verification at zero, and kept commerce/deployment/mascot work outside scope.

## Critical resource decisions

- **143 stages** have a provisional primary candidate that met the archive-only L3/free-state/instructional-format/positive objective-match screen. This does **not** certify the current page remains free or accessible today.
- **43 stages** are blocked on an eligible external primary in this batch; a mapped item may only be a tool/practice environment, show inadequate objective-match evidence, or have uncertain/no relevant extract.
- All candidate sources that lack matching archive content extraction are L2 or L1, not L3. All videos without a verified segment/runtime remain optional deep dives pending manual inspection. No source is playback-verified.

## Quality standards

Candidate selection is based on objective match, content evidence, currency/reliability, clarity, exercises, access, workload and accessibility. Access, identity and content evidence are gates; a numeric screening score cannot override a failed gate. The CSV distinguishes current inventory claims from a new recommendation and historical verification evidence.

## High-priority open work

1. Freshly open each selected primary and verify exact unit, no-payment access, accessibility/captions and runtime. For blocked rows, research at least three credible alternatives and select only after reading relevant content.
2. Have subject-matter experts review all 930 questions, especially distractors and critical flags; each answer key is private/server-side only.
3. Validate all 186 stage rubrics and 125 phase-project contracts against the live evaluator schema. Specifically review the previously flagged AI capstones whose artifacts were forced into a software/GitHub workflow.
4. Verify every named policy (AI disclosure, monetization, security and vendor-specific tool detail) immediately before publication.
5. Run curriculum readiness >=90 and premium-worthiness >=90 only after all hard gates and authentic human sign-off; automated QA is not sign-off.

## Hard gates preserved

No checkout activation, public pricing, entitlement enforcement, payment tests, deployment, production DB changes, migration, commits/pushes, customer contact or mascot integration. Existing learning progress and assessment history must remain untouched.


## Resumption checkpoint — 21 October 2026

The canonical URL discrepancy is resolved: the export has 327 raw distinct `canonical_url` strings but 326 after trailing-slash normalization (`https://docs.n8n.io` and `https://docs.n8n.io/` are the sole normalized pair). The verification log now includes a separate row for each of the 610 comparison candidates in addition to 398 source-inventory rows and 10 live spot-check records. It does not represent those candidate rows as fresh live checks.

The resumed batch re-authored flagged quiz items for AI Research (all five stages), AI Content Creation / Repurposing, AI Agents / Tools, and selected AI workflow, AI engineering, QA, backend, DevOps, Dart and mobile stages. Every quiz still needs qualified review. Exact content checks now explicitly remain open when duplicates or source alignment issues persist; mechanical point totals are not evidence of pedagogical validity.

Live verification limitation: a new web search batch was rejected by the web tool with a quota/rate-cap error. The existing evidence set includes 10 current official-source spot-check records and archived probe/content extraction evidence, but zero stages fully live-reverified in this resumed batch and zero playback/interaction verifications. All stages remain `needs_human_review`; all commerce and mascot gates remain untouched/deferred.


## Checkpoint update — 21 October 2026 (latest)

The deliverables now contain stage-level draft records for all 186 stages, 930 quiz items scored to 100 per stage, mastery/practice records for every stage, and 125 weighted phase-project rubrics. Duplicate quiz stems were explicitly repaired and captured in `QUIZ_DUPLICATE_REPAIR_LOG.csv`; exact-stem QA is now a separate check rather than a hidden assumption. These outputs remain authored drafts pending a qualified SME review.

**Access ceiling:** the web research tool refused later grouped requests with a rate/access-limit response; three separate fetch attempts failed DNS before HTTP response. Those are retrieval limitations, not evidence the URLs themselves are offline. Therefore zero of 186 current stage-primary pages are called fully live-reverified in this checkpoint. The 610 candidate records are comparisons to investigate, not 610 independently opened live pages. The 143 archived-evidence candidates remain provisional and 43 stages remain blocked from the archival eligibility screen. See `SOURCE_PROVENANCE.md`, `09_RESOURCE_VERIFICATION_LOG.csv`, `research-progress.json`, and `12_FINAL_COVERAGE_REPORT.md`.

All courses remain `needs_human_review`. Zero courses are human-approved or premium-approved; all commercial/production gates remain off, and mascot integration remains deferred.
