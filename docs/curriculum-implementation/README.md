# Curriculum Implementation Ledger

This ledger is the persistent record of the TechSkillHUB curriculum import.
It is not a marketing status page. A stage is only marked `approved` after
fresh evidence and named human review. Automated checks can establish
`destination_verified`, `content_inspected` and `current_free_access_verified`;
they do not establish playback, interactive completion, factual accuracy or
pedagogical quality.

## Current status

| Item | Value |
|---|---|
| Branch | `feat/retention-v3` |
| HEAD | `8c1a1154a45c735c3d418b2fa9b8cc7d385a6641` |
| Runtime status | `validated_needs_human_review` |
| Canonical tracks / stages | 32 / 186 |
| Stages with a selected, freshly checked resource | 141 |
| Stages without a suitable required resource | 45 |
| Package primaries verified / provisional / blocked | 44 / 103 / 39 |
| Selected package primaries / verified alternatives | 44 / 97 |
| Real stage-project mappings | 120 |
| AI stages with synthetic mastery only | 66 |
| Human-reviewed resources | 0 |
| Approved stages / premium-ready tracks | 0 / 0 |

The last run of the adapter reports no structural findings, but zero findings
does **not** mean content approval. The unresolved resource, project and
content-alignment states below are real.

## Baseline and preservation

| Item | Value |
|---|---|
| Repository root | `C:\Tech Skill Hub` |
| Working tree (uncommitted) | 46 modified, 49 deleted, 154 untracked (249 entries) |
| Pre-implementation backup | `C:\Users\AWESOME\AppData\Local\Temp\opencode\techskillhub-pre-implementation-backup-20261021.tar.gz` |
| Pre-implementation SHA-256 | `FAC59DD446C2FD2F02455C5903F05AEC921ECF2CD676A8845DAB99F07543131B` |
| Pre-pilot backup | `C:\Users\AWESOME\AppData\Local\Temp\opencode\techskillhub-pre-pilot-backup-20261021.tar.gz` |
| Pre-pilot SHA-256 | `25AFA83D19C34594406BF321E41469F8D1AEE9604CB7C634A4D04D7BFE7B5AF9` |
| Pre-batch-2 backup | `C:\Users\AWESOME\AppData\Local\Temp\opencode\techskillhub-pre-batch2-backup-20261022.tar.gz` |
| Pre-batch-2 SHA-256 | `3777A04C6E03F0966430E0916CDFA66DE788B17E4377C4485F1AA3AE1F73CF73` |
| Package root | `local-research/TechSkillHUB_DeepSeek_IDE_Starter_Pack/research_package/TechSkillHUB_Curriculum_Research_Deliverables/` |
| Package source hash | `ec2ff32e9f7c805cc9c6db1972426fdbe412a31ec3487ace1993867ae3cf6266` |

The working tree was already dirty and remains uncommitted. No reset, clean,
stash/pop, revert, commit, push, tag or deployment was performed. Learner
progress, quiz attempts, completions and certificates were not rewritten.

## Batch plan

| Batch | Scope | Status |
|---|---|---|
| 0 | Ledger, adapter, field mapping, answer privacy, attempt lifecycle, contracts | Complete for this branch; human review pending |
| 1 | 20-stage pilot: `frontend` 1-5, `uiux` 1-5, `ai-foundations` 1-6, `cyber` 1-4 | Integrated and regression-tested; 20/20 remain `needs_human_review` |
| 2 | `backend`, `fullstack`, `python`, `qa` (19 stages) | Integrated; resource verdicts recorded per stage |
| 3 | `data`, `datascience`, `devops`, `mobile` (19 stages) | Integrated; resource verdicts recorded per stage |
| 4 | `video`, `youtube`, `marketing`, `ai` (16 stages) | Integrated; resource verdicts recorded per stage |
| 5 | `nocode`, `writing`, `crypto`, `projectmgmt` (24 stages) | Integrated; resource verdicts recorded per stage |
| 6 | `productmgmt`, `dart`, `sonic`, `ai-work` (23 stages) | Integrated; `productmgmt` 5-7 ready, 8 unresolved |
| 7 | `ai-research`, `ai-content`, `ai-youtube`, `ai-software-development` (29 stages) | Integrated; `ai-youtube` 4-9 aligned by deterministic override; stage 5 resource unresolved |
| 8 | `ai-automation`, `ai-agents`, `ai-engineering`, `ai-design` (36 stages) | Integrated; resource verdicts recorded per stage |
| A1/A2/C1-C3/B1 | Bounded resource research batches | 68 research additions; 141 stages ready, 45 unresolved |

"Integrated" means the canonical stage is represented in the generated runtime
overlay, not that its content or resources are approved. Research additions are
in `resource-research-additions.json`; the verifier merges them into the
existing package sources rather than replacing them.

## Integration contract

| Item | Count |
|---|---|
| Canonical tracks / stages | 32 / 186 |
| Generated stage contents | 186 |
| Package quiz questions | 930 (5 x 20 points per stage) |
| Stage mastery records / 100-point rubrics | 186 / 186 |
| Package project overrides | 125 |
| Generated extra AI projects | 10 |
| Stages mapped to a real project | 120 |
| AI stage-level synthetic mastery contracts | 66 |
| Adapter open issues | 268 |

All 186 stages have a stage objective, authored instruction note, practice
action and completion criteria, a five-question 100-point knowledge check, and
a 100-point mastery rubric. The 66 AI stage-level mastery contracts are
explicitly **not counted as projects**. The 120 project-mapped stages resolve a
real package or generated AI project with a brief, deliverables, required
evidence, weighted rubric, mandatory gates, feedback and resubmission. A stage
without a real project still has authentic practice and a mastery contract; it
is not presented as having a phase project.

Project coverage is split as follows: all 110 non-AI stages have real project
mappings; 10 AI capstone stages map to real AI projects; 66 other AI stages use
synthetic mastery contracts only. The 66 are a genuine phase-project gap and
must not be converted into project records without real briefs and evidence.

## Resource disposition

Fresh evidence is in `docs/curriculum-implementation/resource-verification.json`.
The raw HTTP/content probe is in `scripts/resource-probe.json`. All 446 unique
candidate URLs were probed; 0 remain unprobed. Selection required:

- exact URL destination reachable on the check date;
- inspected main content, not just a title or HTTP status;
- no login, account or payment requirement;
- objective relevance, with a title/objective overlap check and rejection of
  landing pages, course indexes, community homes and resource hubs;
- explicit limitations, duration/access notes and a content hash where
  available.

| State | Count |
|---|---|
| Package primary freshly verified | 44 |
| Package primary provisional | 103 |
| Package primary blocked | 39 |
| Stages with a selected, freshly checked resource | 141 |
| - selected package primary | 44 |
| - selected verified alternative | 97 |
| Stages without a suitable verified resource | 45 |
| Preflight-blocked stages (original) | 43 |
| - now ready through a verified alternative | 33 |
| - still unresolved | 10 |

`verified` means the exact URL passed the automated destination, content,
free-access and objective-overlap checks. It is **not** human approval. No
video or interactive resource has `playback_verified`,
`interaction_verified`, `human_reviewed` or `approved` set to true. A package
primary that remains blocked is not required merely because an alternative is
ready; the package-primary status and the selected stage resource are separate
records.

### Consistency review and demotions

The consistency review found ten stages whose selected page covered only
part of the named outcome, taught a neighbouring topic, or matched a title but
not the objective. They remain unresolved rather than counted as ready:

- `backend:1`: the MDN Express introduction covers HTTP, Node/Express and a
  first server, but not version control.
- `devops:2`: the GitHub Actions quickstart covers CI/CD, but assumes rather
  than teaches version-control fundamentals.
- `productmgmt:8`: the Product School portfolio article covers portfolio
  evidence, but not interview preparation in enough depth.
- `qa:4`: the FastAPI testing page covers API tests, but not performance,
  security and CI for test suites.
- `video:4`: the W3C media-accessibility page covers accessibility, but not
  platform-specific formats and audience adaptation.
- `ai:1`: the prompt-engineering page teaches prompting, not choosing AI tools
  by capability and limits.
- `ai-youtube:2`: the QUT evaluation page teaches evaluating generated content,
  not topic/competitor research.
- `ai-youtube:3`: the QUT evaluation page covers fact-checking, not scripting
  structure and viewer promise.
- `ai-youtube:5`: the YouTube inauthentic-content policy covers originality,
  not visual production, sourcing and rights.
- `ai-youtube:10`: the monetization policy covers platform rules, not quality
  controls and a repeatable improvement loop.

`crypto:9` and `ai-youtube:9` were re-researched: `crypto:9` now uses the OWASP
Smart Contract Top 10 (2026) and `ai-youtube:9` uses the broader YouTube
Analytics overview. The old narrow pages remain rejected.

Residual partial-coverage caveats remain in `ai-content:2`, `ai-content:3`,
`ai-design:1`, `ai-design:4`, `ai-foundations:1`, `ai-research:1`,
`ai-research:3`, `ai-youtube:4`, `ai-youtube:6`, `ai-youtube:7` and
`ai-youtube:8`; these remain counted as ready only because the authored lesson
carries the rest of the objective. They must be confirmed or demoted by human
review, and they are not approvals.

The full finding is in
`docs/curriculum-implementation/consistency-review.md`. The `ai-youtube` 4-9
misalignment has been corrected in place: stable stage IDs and question IDs are
unchanged; objectives, practice, worked examples, mastery criteria and
questions now match the canonical titles. Stage 5 remains resource-unresolved.

### Specific rechecks

- `uiux:4`: package primary remains blocked, but a verified alternative
  (`Prototyping fundamentals`) makes the stage resource-ready.
- `frontend:5`: now ready through a verified alternative on human ownership and
  harness engineering; the package primary remains blocked.
- `cyber:4`: remains resource-blocked. The CISA resources hub was rejected as a
  link hub; no unapproved alternative was promoted.
- `productmgmt:5`, `productmgmt:6`, `productmgmt:7`: ready through verified
  alternatives while their package primaries remain blocked.
- `productmgmt:8`, `backend:1`, `devops:2`, `qa:4`, `video:4`, `ai:1`, `ai-youtube:2`, `ai-youtube:3`, `ai-youtube:5`, `ai-youtube:10`: demoted to unresolved
  after partial-source review.
- `datascience:1`, `datascience:2`: no candidate passed the fresh content,
  free-access and relevance check; both remain optional-only.
- `ai-youtube` 4-9: corrected objectives, practice, mastery and questions via
  deterministic overrides; regression-tested. Stage 5 resource remains
  unresolved, so the track is not premium-ready.

### Stages without a suitable verified resource (45)

These are explicitly blocked for required external resources and remain
ineligible for premium on resource grounds. Authored teaching and practice are
still present.

```text
ai-content:4 ai-design:7 ai-foundations:2 ai-research:5
ai-youtube:2 ai-youtube:3 ai-youtube:5 ai-youtube:10
ai:1 ai:3 ai:4
backend:1 backend:4
crypto:8 crypto:10
cyber:3 cyber:4
dart:4
data:1 data:2
datascience:1 datascience:2
devops:1 devops:2 devops:4
frontend:1 frontend:2 frontend:4
marketing:1
mobile:1 mobile:2
nocode:1 nocode:2
productmgmt:3 productmgmt:8
python:1 python:4
qa:4
sonic:3 sonic:5 sonic:6
uiux:2
video:3 video:4
youtube:2
```

The 10 still-unresolved preflight blockers are:

```text
ai:3
backend:1
crypto:8 crypto:10
cyber:4
devops:1 devops:2
nocode:2
productmgmt:8
youtube:2
```

## P0/P1 remediation status

| Finding | Status | Evidence |
|---|---|---|
| P0-1 answer-key disclosure | Remediated | Public feedback never includes `correctIndex`; failed attempts withhold explanations; unit and E2E tests assert absence. |
| P0-2 no durable attempts/versions | Remediated | `lib/quiz-attempts.ts` + `lib/guided-path-quiz.ts`; versioned attempts in `UserTrackProgress.data`, immutable `LearningEvent`, PostgreSQL row lock, idempotent attempt IDs; `quizAttempts` is client-write-protected. |
| P0-3 dropped quiz fields | Remediated | Adapter preserves IDs, points, objectives, provenance and review status; 930 rows validated. |
| P0-4 artifact/rubric mismatch | Remediated | Strict artifact parser before credit/model calls; alternatives resolved by kind; package and generated project rubrics applied; rubric version changes with labels. |
| P0-5 AI software fallback | Remediated | Explicit discipline routing for all 32 tracks; unknown disciplines fail closed; no GitHub fallback for QA, cyber, design or AI non-code. |
| P0-6 resource overstatement | Partially remediated | 44 primaries have fresh evidence; 141 stages are resource-ready; 45 remain optional-only. No blocked or provisional primary is required. |
| P0-7 outline-only instruction | Remediated for structure; human review pending | All 186 stages have authored instruction, practice, knowledge check and mastery. Thin package outlines were not used as complete lessons. |
| P0-8 persistence | Remediated without migration | Existing JSON + immutable events + row-lock serialization; no schema migration executed; newer/unknown stored schema fails closed. |
| P1-1 static rubric version | Remediated | Rubric hash includes id, mandatory flag, weight and label. |
| P1-2 mandatory contradiction | Remediated | Package mandatory flags plus zero-weight mandatory safety gates. |
| P1-3 AI quiz repetition | Remediated | All 186 stages use stage-scoped five-question quizzes; legacy checkpoint reuse is removed from package stages. |
| P1-4 QA stale count | Recorded | Recomputed in the adapter report; not used as approval. |
| P1-5 video unverified | Recorded | No video is playback-verified or a required primary. |
| P1-6 duplicate URLs | Recorded | Resource dispositions and runtime resolution de-duplicate by normalised URL. |
| P1-7 commercial/cost | Guarded | Commerce gates unchanged; no pricing or entitlement edits. |
| P1-8 licensing/accessibility | Open human gate | No human approval is asserted for any selected resource. |

## Verification evidence (2026-10-22)

All checks ran on branch `feat/retention-v3` at HEAD
`8c1a1154a45c735c3d418b2fa9b8cc7d385a6641` with uncommitted work. PostgreSQL
tests used a disposable local container only:
`tsh-quiz-verify-20261022b`, database `tsh_verify`, `127.0.0.1:55439`.
No shared or production database URL was used.

| Check | Result |
|---|---|
| `npm test` with `TSH_CHECKLIST_IMPORT_TEST_DB` set | **525 pass, 0 fail, 0 skip** |
| `npm run test:e2e` with `E2E_DATABASE_URL` set | **37 pass, 0 fail** on the final two full runs; two earlier full runs had isolated flakes (completion refresh; journeys shell/anonymous-quiz) that passed when rerun alone. No assertion was weakened or skipped. |
| `npm run lint` | 0 warnings, 0 errors |
| `npx prisma validate` | Pass |
| `npm run build` | Pass |
| `node scripts/curriculum-package/adapt.mjs` | `validated_needs_human_review`; 32 tracks, 186 stages, 930 quiz rows, 186 mastery records, 125 projects, 10 extras, 44 verified, 103 provisional, 39 blocked, 0 findings |
| `node scripts/curriculum-package/verify-resources.mjs` | 186 stages; 44 package primaries verified, 141 stage-ready, 97 verified alternatives, 45 unresolved, 446 URLs all probed |
| Targeted curriculum tests | 27 pass, 0 fail (alignment 14 + package 13) |

The first full e2e run had 36/37 because the completion-refresh test did not
see `Step 2 of` after reload; the isolated rerun passed. The second full run had
35/37 because two journey tests failed to establish the test shell/anonymous
quiz state; the isolated `journeys.spec.ts` run passed 6/6. The last two full
runs, including the final run after the last code change, passed 37/37. No
assertion was weakened or skipped.

`npm test` includes 186-stage coverage: every stage has instruction, practice, a
five-question 100-point quiz and a 100-point mastery rubric; all 930 question
ids are unique; 120 stages map to real projects; 66 AI stages use synthetic
mastery contracts that are explicitly excluded from the project catalogue.
The full resource audit asserts fresh evidence for every selected resource and
rejects playback, human-review or approval claims.

`import-validation.json`, `resource-verification.json` and
`consistency-review.md` are the machine-readable and narrative authority.
`resource-verification.json` records the evidence date, URL, content
excerpt/hash, access state, objective relevance, candidate count, alternatives
and reason for every stage.

## Remaining work

- Named human curriculum review for all 186 stages; no stage is `approved` and
  no track is premium-ready.
- Human review of the 141 selected resources for accuracy, currency,
  accessibility, licensing and pedagogical fit. No playback or interactive
  use has been verified.
- Resolve the 45 unready stages, giving priority to the 10 unresolved preflight
  blockers, `ai-youtube:5` and the partial-coverage caveats.
- Human review the corrected `ai-youtube` 4-9 objectives, practice, mastery
  criteria and questions; stable IDs and learner history are unchanged.
- Resolve the 66 AI synthetic mastery contracts into real phase-project
  mappings only where genuine project evidence exists; do not convert
  synthetic contracts into project records.
- Complete external credential/live-web checks that this environment cannot
  perform. No production migration, shared database access, deployment,
  customer communication, payment, entitlement or checkout change occurred.
- Keep premium approval, launch, pricing and entitlements disabled until human
  review and resource gates are complete.

## Commerce gates

The following remained unchanged for the entire implementation:

```text
COMMERCE_CHECKOUT_ENABLED=false
COMMERCE_ENTITLEMENTS_ENFORCED=false
COMMERCE_PRICES_APPROVED=false
```

Provider test mode was left unchanged. No customer communication, payment,
refund, subscription, production migration, deployment or production/shared
database access was performed.
