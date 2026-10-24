# TechSkillHUB Curriculum Research — Coverage & QA Checkpoint

**Snapshot:** 21 October 2026  
**Disposition:** `needs_human_review` — not human-approved, not premium-approved, and not launch-ready.  
**Source archive SHA-256:** `ec2ff32e9f7c805cc9c6db1972426fdbe412a31ec3487ace1993867ae3cf6266`

## 1. Inventory reconciliation

| Item | Authoritative source snapshot | Current research bundle | Reconciliation |
|---|---:|---:|---|
| Tracks | 32 | 32 | Reconciled |
| Stages | 186 | 186 | Reconciled; exact source IDs/titles retained |
| Resource mappings | 398 | 398 inventory rows plus selected-stage disposition rows | Disposition remains provisional |
| Unique resource URLs | 326 in package README | 327 distinct parsed URL strings; 326 after trailing-slash normalization | The raw difference is `https://docs.n8n.io` vs `https://docs.n8n.io/` |
| Project/assessment records | 191 | 125 normalized phase projects + 66 synthetic section-mastery contracts not counted as full phase projects | Reconciled by purpose |
| Existing quiz items | 638 | 930 new authored quiz items | Exactly five items per stage in this checkpoint |
| Resource candidates | — | 610 | Three or more comparison records per stage where feasible; most are candidates, not current live verifications |

The source package checksum matched the sidecar provided with the upload. The independent audit reported that the ZIP manifest file hashes and recorded sizes were consistent, with the noted README/manifest wording issue.

## 2. Completed draft work

- One stage manifest row for every current stage (186/186).
- Detailed learning specifications for 186/186 stages, including outcomes, prerequisites/topics, original teaching additions, resource candidates/dispositions, stage quiz, AI mastery prompt/rubric, practice, phase-project mapping, blockers and review status.
- 930 quiz items, five per stage, with explicit integer points summing to 100 per stage, options, correct answer/index, rationale, distractor notes, learning outcome and incorrect-answer feedback. Quiz content remains an authored draft and answer keys must stay reviewer/server-side.
- 186 mastery and practice records, with stage-linked criteria weighted to 100.
- 125 phase/capstone projects with discipline-specific effective rubric weights totalling 100 and evidence formats appropriate to each project; 66 synthetic mastery records are deliberately not inflated into phase projects.
- 398 mapped resource entries reviewed/dispositioned, 610 candidate comparison records and 1021 timestamped evidence-log rows.
- High-risk project, AI quiz, unsafe/unclear resource-access and source-role findings captured in the review queue.
- Exact repeated question-stem groups were repaired through stage-topic cases and outcome-specific fallbacks. Remaining normalized duplicate groups after the latest pass: **0**. `QUIZ_DUPLICATE_REPAIR_LOG.csv` records the aggregate repair evidence and explicitly states that the earlier script did not preserve item-level before/after diffs. Wording uniqueness is a mechanical check only; it does not prove correctness or pedagogical quality.
- The 86 phase-project briefs whose original acceptance criteria were the same generic four statements now have project/domain-specific measurable criteria, with the original generic-criteria finding preserved as remediation metadata. This is still a model-authored proposal and requires SME review.

- Explicit status synchronization now marks 43 stages `blocked` because no primary candidate passes the archived screening gate; 143 remain `needs_human_review` with provisional archived-L3 candidates. Neither group is current-access verified or approved.

## 3. Resource evidence and decisions

| Evidence/disposition | Count | Meaning |
|---|---:|---|
| Stage candidates provisionally eligible using archived L3 extraction + historical free flag + positive automated objective-match signal | 143 | A starting candidate only; current page/access and exact assigned section must be rechecked |
| Stages blocked from that archived eligibility screen | 43 | Keep an original TechSkillHUB explanation and relevant safe practice; no unverified resource should be required |
| Stage primaries fully reverified through direct current-page inspection in this checkpoint | 0/186 | Incomplete due the documented web-tool access limit and DNS failure in separate fetch attempts |
| Playback/interactive execution verified (L4) | 0 | No media is described as watched/played |
| Qualified human-approved stages | 0 | No reviewer sign-off was supplied |
| Premium-approved courses | 0 | Research completion is not approval |

The resource candidate file separates screening scores from approval. The resource-map filename includes “approved” for the requested deliverable naming convention, but all primary selections remain provisional, and a failed free-access, content-fit or current-access gate must keep a resource optional/blocked. A high screening score cannot override those mandatory checks.

### Specific resource blockers retained

- TryHackMe's complete beginner path must not be described as entirely free; free rooms and paid path access are distinct.
- Canva Design School destinations and Pexels remain unresolved from the source audit; verify the exact destination, account and use/licence terms before requiring them.
- Long freeCodeCamp JavaScript and Node/Express courses should not be represented as short required sessions without a verified segment, or else be optional deep dives alongside a focused text resource.
- Video runtime/segment fields remain unknown where no actual segment metadata was inspected; no timestamps were invented.
- Unknown access stays `unknown`, not assumed free or assumed paid.

## 4. Research access limitation (material)

The web research service returned an access/rate-limit refusal on later grouped queries. Separate direct fetch attempts for representative MDN, OWASP and YouTube help pages failed during DNS resolution before an HTTP response. These failures do **not** establish that those URLs are down; they establish only that this runtime could not retrieve them. As a result, the candidate searches and archive evidence were not promoted to a claim of 186-page live verification. The 610 candidate rows are stage-linked comparisons, not 610 independently opened current pages.

The logged official-source spot-check excerpts are capped at L2. The source package's archived L3 excerpts are still useful as content-screen evidence but were primarily captured around 17 October 2026, so they do not establish current free access, account requirements or whether the exact assigned section is still unchanged.

## 5. Question/rubric and human-review gates

Mechanical checks cover the manifest, JSON/JSONL parsing, question IDs, exact score totals, answer-index consistency, rubric weights, project format presence, and no fabricated human/premium approvals. They do not validate source-grounded correctness, subtle distractor quality, standards interpretation, or whether a learner has enough instruction to answer an item. Every question still needs a qualified domain review against the assigned reading or authored lesson. Security, financial/crypto, privacy and consequential AI criteria require particular scrutiny.

## 6. Per-track checkpoint status

| Track ID | Stages | Provisional archive-screen candidates | Human-approved | Disposition |
|---|---:|---:|---:|---|
| frontend | 5 | 4 | 0 | needs_human_review |
| backend | 5 | 4 | 0 | needs_human_review |
| fullstack | 5 | 2 | 0 | needs_human_review |
| python | 5 | 4 | 0 | needs_human_review |
| uiux | 5 | 4 | 0 | needs_human_review |
| qa | 4 | 4 | 0 | needs_human_review |
| data | 5 | 5 | 0 | needs_human_review |
| datascience | 5 | 5 | 0 | needs_human_review |
| devops | 5 | 2 | 0 | needs_human_review |
| cyber | 4 | 3 | 0 | needs_human_review |
| mobile | 4 | 3 | 0 | needs_human_review |
| video | 4 | 3 | 0 | needs_human_review |
| youtube | 4 | 1 | 0 | needs_human_review |
| marketing | 4 | 4 | 0 | needs_human_review |
| ai | 4 | 2 | 0 | needs_human_review |
| nocode | 3 | 2 | 0 | needs_human_review |
| writing | 4 | 3 | 0 | needs_human_review |
| crypto | 11 | 5 | 0 | needs_human_review |
| projectmgmt | 6 | 6 | 0 | needs_human_review |
| productmgmt | 8 | 4 | 0 | needs_human_review |
| dart | 4 | 4 | 0 | needs_human_review |
| sonic | 6 | 6 | 0 | needs_human_review |
| ai-foundations | 6 | 6 | 0 | needs_human_review |
| ai-work | 5 | 4 | 0 | needs_human_review |
| ai-research | 5 | 4 | 0 | needs_human_review |
| ai-content | 6 | 4 | 0 | needs_human_review |
| ai-youtube | 10 | 10 | 0 | needs_human_review |
| ai-software-development | 8 | 6 | 0 | needs_human_review |
| ai-automation | 8 | 5 | 0 | needs_human_review |
| ai-agents | 10 | 10 | 0 | needs_human_review |
| ai-engineering | 10 | 8 | 0 | needs_human_review |
| ai-design | 8 | 6 | 0 | needs_human_review |

## 7. Commercial, production and mascot gates

No checkout, prices, entitlement enforcement, premium restrictions, payment-provider tests, customer communication, deployment, production database, migration, repository mutation or mascot integration was performed. This is a research/specification package only. Preserve existing learner progress and historical assessment results during any future implementation.

## 8. Next verifiable actions

1. Start a fresh live research session and open the exact primary candidate for each stage, not just a search snippet. Verify the current content, free-access path, account/payment boundary, exact segment, accessibility and realistic workload; log the evidence and retrieval date.
2. Resolve the 43 blocked primary-resource gates first, then repeat the same process on the 143 provisional candidates.
3. Have qualified SMEs validate the 930 answer keys/rationales/distractors, mastery rubric criteria and 125 project contracts, record names/dates/decisions in the genuine sign-off process, and rerun all QA after corrections.
4. Inspect repository schemas separately before implementation. Keep live commerce, migrations, deployments and mascot work outside this phase.
