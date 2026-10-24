---
title: "Curriculum Import Preflight — TechSkillHUB Research Package"
date: "2026-10-21"
status: "read-only preflight; no application, data, commercial, or migration changes"
repo: "C:/Tech Skill Hub"
branch: "feat/retention-v3"
head: "8c1a1154a45c735c3d418b2fa9b8cc7d385a6641"
package_zip_sha256_prefix: "1da422ca"
internal_provenance_sha256: "ec2ff32e9f7c805cc9c6db1972426fdbe412a31ec3487ace1993867ae3cf6266"
verdict: "CONDITIONAL GO for a branch-confined, feature-flagged internal pilot; NO-GO for learner-facing, paid, or launch activation"
---

# Curriculum import preflight

## 0. Verdict

**Safe to start? Conditionally yes — but only as a branch-confined, feature-flagged, internal pilot that stages content without exposing it to learners.**

**Safe to launch or import as-is? No.** The package is a high-quality research draft, not an approved curriculum. It contains zero stages with current live resource verification, zero playback-verified videos, zero human sign-offs, 143 provisional stage primaries, 43 explicitly blocked stages, and several runtime contracts that would silently discard or misapply the package's assessment design.

The shortest accurate statement is:

> Implementation may begin on the schema, staging module, tests, and non-user-facing import scaffolding. Quiz grading, answer-key exposure, project artifact contracts, AI discipline routing, and the external-resource gate must be fixed before any learner sees this content. Paid activation and launch claims must wait for fresh live verification and human review.

This report is a preflight. It does **not** claim that any URL is currently live, free, unchanged, or correctly matched. No live URL re-verification was performed in this phase.

---

## 1. Scope, method, and safety constraints

### 1.1 What was inspected

- The complete 19-file research package under `local-research/TechSkillHUB_DeepSeek_IDE_Starter_Pack/research_package/TechSkillHUB_Curriculum_Research_Deliverables/`.
- The repository's canonical track, stage, resource, quiz, project, mastery, persistence, progression, and commercial code paths.
- Representative quizzes and projects across Frontend, UI/UX, Cybersecurity, AI Foundations, Writing, and Project Management, plus cross-checks against all 186 stages for counts and identifiers.
- The package's own QA files, open issues, verification log, progress file, and provenance notes.

### 1.2 How it was inspected

- Large JSON files (`02_STAGE_LEARNING_SPECS.json`, 8.0 MB; `07_PHASE_PROJECTS.json`, 1.4 MB) were parsed with bounded Node scripts. They were never dumped wholesale into the session.
- CSV/JSONL files were parsed with a small RFC-4180-style parser to avoid comma/quote errors.
- Repository modules were loaded through `scripts/lib/load-ts.mjs` so counts and identifiers came from the actual catalogue, not regular-expression guesses.
- Temporary scripts and validation output live under `C:/Users/AWESOME/AppData/Local/Temp/opencode/`, outside the repository.

### 1.3 What was deliberately not done

- No application source file was edited.
- No record, learner, entitlement, credit, or commercial state was changed.
- No database connection, query, migration, reset, seed, or backfill was performed.
- No git clean, reset, stash, checkout, commit, or push was performed.
- No live verification of any resource URL, price, paywall, account requirement, or video playback was performed.
- No claim is made that the existing repository's archive-era resource evidence is current.

The repository already had **236 uncommitted entries** before this preflight. That dirty state was preserved. The only repository additions from this phase are the two report files named in §1.4.

### 1.4 Outputs

- `docs/curriculum-import-preflight.md` — this report.
- `docs/curriculum-import-preflight.json` — the same findings in machine-readable form.

These are documentation artifacts only. They do not wire content into the runtime.

---

## 2. Repository baseline

| Item | Value |
|---|---|
| Repository root | `C:/Tech Skill Hub` |
| Branch | `feat/retention-v3` |
| HEAD | `8c1a1154a45c735c3d418b2fa9b8cc7d385a6641` |
| HEAD commit date | `2026-10-09 12:44:41 +0100` |
| Dirty tree before preflight | 236 entries: 46 modified, 49 deleted, 141 untracked |
| Stashes | none found |
| Tags / extra worktrees | none found |
| Local repository backup | none found |
| Package location | `local-research/TechSkillHUB_DeepSeek_IDE_Starter_Pack/research_package/TechSkillHUB_Curriculum_Research_Deliverables/` |
| Package files | 19 |

### 2.1 Provenance hashes are not contradictory

Two different hashes appear in the package:

- `ec2ff32e9f7c805cc9c6db1972426fdbe412a31ec3487ace1993867ae3cf6266` — internal provenance in `research-progress.json` / source-package metadata. This refers to the source resource archive used during research.
- `1da422ca…` — the uploaded deliverables ZIP that was extracted for this review.

They identify different objects. Do not "fix" one to match the other. The report records both and treats the extracted deliverables as the review input.

---

## 3. Independent reconciliation

The package's headline counts were re-derived from the files, not accepted from its summary.

| Artifact | Result | Reconciliation |
|---|---:|---|
| Tracks | 32 | Matches repository exactly |
| Stages | 186 | Matches repository exactly |
| Stage title mismatches | 0 | All 186 titles match |
| Stage ID mismatches | 0 | IDs are `1..N` per track in both |
| Quiz rows | 930 | Exactly 5 per stage |
| Quiz points | 100 per stage | 5 × 20 |
| Quiz IDs | 930 unique | No duplicate IDs |
| Answer integrity | Pass | `correctIndex` agrees with `correctAnswer` on every row |
| Mastery records | 186 | One per stage |
| Mastery weights | 100 per stage | Sums valid |
| Projects | 125 | All IDs unique |
| Project IDs resolvable in repo | 125 / 125 | Includes all 10 AI capstones once AI modules are loaded |
| Resource candidates | 610 | 208 L3, 402 L2 |
| Resource-map rows | 584 | Covers all 32 tracks and all 186 stages |
| Verification-log rows | 1,021 | 398 archive-inventory, 610 candidate-screening, 10 live search, 3 failed fetches |
| Open-issue rows | 268 | 19 critical, 2 blockers |
| Stage primaries proposed as required | 143 | Provisional only |
| Stages blocked from a required primary | 43 | Must remain optional/blocked |

**Project-count distinction:** the package has **125 phase/capstone projects**. It also has **66 synthetic section-mastery contracts** used for section-level assessment; these are not additional phase projects. The package's 191 project/assessment records are therefore 125 + 66, not 191 projects. Do not inflate the project count or treat a synthetic mastery contract as a capstone.

**QA status:** `QA_VALIDATION.txt` reports **29 PASS, 3 WARN, 0 FAIL**. The 29 passes are mechanical checks (counts, IDs, point totals, answer-key index consistency, rubric weight totals, parseability). The 3 warnings are the real approval/access blockers:

1. `0/186` stage primary pages fully live-reverified.
2. No qualified SME review or human sign-off.
3. Free-access gates: 143 provisional archived candidates and 43 blocked stages; current access/account/paywall states are unverified.

A green QA run is therefore not a readiness statement.

### 3.1 The package itself says it is not verified

From its own verification log and progress summary:

- `stagePagesFullyLiveReverified: 0`
- `playbackVerified: 0`
- `currentLivePagesContentInspectedInReturnedSearchResults: 10`
- 3 direct URL fetches failed before an HTTP response (DNS/network).
- 7 recorded `403` responses, 1 `429`, and 610 candidate rows with no recorded HTTP status.
- Verification levels in the log: 512 L3, 506 L2, 3 L1 — but these are largely **archive-derived**, not current live checks.

`research-progress.json` is internally inconsistent: its batch summary says zero stages were fully live-reverified, while per-track fields such as `stagesWithDirectContentInspectionComplete` are non-zero (for example, Frontend reports 5). The zero figure is the authoritative one for *current live re-verification*. The per-track field appears to count a weaker, earlier activity. The package should rename or split that field; until then, do not cite it as live coverage.

### 3.2 The existing repository is also archive-era, not current

The current repository resolves resources for all 186 stages. Its `scripts/resource-probe.json` (dated `2026-10-17`) records 398 resource rows: 298 L3 and 100 L2, all marked `free`, all marked `required`, with 44 duplicate URL rows and no stage lacking an L3.

That is **archive-era evidence**. It does not prove the links work today, are free today, or still match the stage objective. It also means importing the package must not be described as "fixing" or "verifying" existing resources.

### 3.3 Quantity is not quality

The counts are coherent, which is a good sign for mechanical import. They do not establish:

- that 930 questions are pedagogically sound;
- that 125 projects have evaluable, discipline-appropriate evidence;
- that any resource is currently reachable or free;
- that any stage has human subject-matter approval.

The package's own open-issue file says the opposite on each of those points.

### 3.4 Representative spot-check

This was a structural and contract check, not pedagogical approval. All 930 rows passed the structural checks; the samples below were read for objective fit and runtime mapping.

| Track | Runtime discipline | Sample checked | Result |
|---|---|---|---|
| Frontend | `software` | Quiz and project sample | Five options, one key, project brief maps to acceptance criteria; software contract is a reasonable fit |
| UI/UX | `design` | Quiz and design project sample | Structurally consistent; Figma artifact fits the `design` contract; `uiux:4` has no required primary |
| Cybersecurity | `security` | Stage 4 quiz/project with a blocked primary | **Mismatch risk:** `security` requires `github_repo` plus source inspection; lab-report or defensive-evidence deliverables do not fit without an override |
| AI Foundations | `software` (fallback) | Quiz sample and capstone | **Mismatch:** q3 asks about agent authorization beyond the stage objective; the non-code capstone falls into the software contract |
| Writing | `writing` | Stage 4 quiz and portfolio with a blocked primary | Document artifact fits; q4/q5 are generic; `writing:4` has no required primary |
| Project Management (`projectmgmt`) | `management` | Quiz/project and document evidence | Document artifact fits; no blocked stages, but every resource remains provisional |
| Product Management (`productmgmt`) | `management` | Stages 5–8 resource gate | Document artifact fits; all four stages (5–8) are blocked from a required primary |

The QA track deserves a separate note: `qa` is grouped with `cyber` under the `security` discipline, so its default contract also requires a public GitHub repository. Manual QA evidence such as test plans, bug reports, and exploratory-testing notes is not a repository by default. This needs explicit QA overrides rather than being inferred from the discipline.

### 3.5 Source-file shape validation

CSV row counts below use a quote-aware parser. Physical line counts differ where fields contain embedded newlines (notably `03_RESOURCE_CANDIDATES.csv`).

| File | Shape | Independent check |
|---|---|---|
| `00_EXECUTIVE_PLAN.md` | Markdown | Reviewed; scope and status are consistent with the package |
| `01_STAGE_MANIFEST.csv` | CSV, 12 columns | 186 data rows across 32 tracks |
| `02_STAGE_LEARNING_SPECS.json` | JSON object | 186 stages; keys include `schema`, `generatedAt`, `sourcePackageHash`, `stageCount`, `stages`, `sourceVersionNote` |
| `03_RESOURCE_CANDIDATES.csv` | CSV with multiline fields | 610 parsed candidate rows (824 physical lines) |
| `04_APPROVED_RESOURCE_MAP.csv` | CSV | 584 parsed rows (585 physical lines) |
| `05_QUIZ_BANK.jsonl` | JSONL | 930 objects; 5 per stage |
| `06_STAGE_MASTERY_AND_PRACTICE.json` | JSON object | 186 stages; `schema`, `generatedAt`, `stageCount`, `stages` |
| `07_PHASE_PROJECTS.json` | JSON object | 125 projects; `schema`, `generatedAt`, `projects`, `count`, `note` |
| `08_REVIEW_AND_OPEN_ISSUES.csv` | CSV | 268 issue rows (269 physical lines) |
| `09_RESOURCE_VERIFICATION_LOG.csv` | CSV | 1,021 rows (1,022 physical lines) |
| `10_TECHSKILLHUB_HUMAN_REVIEW_GUIDE.docx` | DOCX | Present; human-review process input, not parsed as data |
| `11_IDE_IMPLEMENTATION_PROMPT.md` | Markdown | Present; does not match this repository's module split (see P2-2) |
| `12_FINAL_COVERAGE_REPORT.md` | Markdown | Present; confirms 191 records = 125 projects + 66 synthetic contracts |
| `QA_VALIDATION.csv` / `.txt` | CSV / text | 32 checks: 29 PASS, 3 WARN, 0 FAIL |
| `QUIZ_DUPLICATE_REPAIR_LOG.csv` | CSV | 3 aggregate audit rows; no item-level before/after diff |
| `QUIZ_SPECIFICITY_AUDIT.csv` | CSV | 186 stage rows |
| `research-progress.json` | JSON object | 186 stage entries; `stagePagesFullyLiveReverified: 0`; per-track inspection field is ambiguous |
| `SOURCE_PROVENANCE.md` | Markdown | Records the source archive hash and access limitations |

---

## 4. Canonical per-track stage inventory (all 186 stage IDs)

Stage IDs below are the canonical repository IDs and match the package exactly. `blocked` means the package found **no acceptable required primary resource** for that stage; it does not mean the stage has no in-product content.

| Track | Title | Stages | Canonical stage IDs and titles | Blocked stage IDs |
|---|---|---:|---|---|
| `frontend` | Frontend Development | 5 | `frontend:1` Foundations<br>`frontend:2` Core JavaScript<br>`frontend:3` React Framework<br>`frontend:4` Professional Skills<br>`frontend:5` AI-Assisted Workflow | `frontend:5` |
| `backend` | Backend Development | 5 | `backend:1` Foundations<br>`backend:2` Core Backend<br>`backend:3` Databases<br>`backend:4` Advanced Backend<br>`backend:5` Deployment | `backend:1` |
| `fullstack` | Full-Stack Development | 5 | `fullstack:1` Complete Frontend Track<br>`fullstack:2` Complete Backend Track<br>`fullstack:3` Integration<br>`fullstack:4` Full Deployment<br>`fullstack:5` Production Patterns | `fullstack:1`, `fullstack:2`, `fullstack:4` |
| `python` | Python Development | 5 | `python:1` Python Basics<br>`python:2` Intermediate Python<br>`python:3` Python for the Web<br>`python:4` Automation & Scripting<br>`python:5` Python + AI | `python:5` |
| `uiux` | UI/UX Design | 5 | `uiux:1` Design Fundamentals<br>`uiux:2` UX Foundations<br>`uiux:3` Figma Mastery<br>`uiux:4` Advanced UX<br>`uiux:5` Portfolio & Case Studies | `uiux:4` |
| `qa` | QA Engineering | 4 | `qa:1` Testing Fundamentals<br>`qa:2` Tools & API Testing<br>`qa:3` Test Automation<br>`qa:4` Advanced QA | — |
| `data` | Data Analysis | 5 | `data:1` Spreadsheets & Excel<br>`data:2` SQL Fundamentals<br>`data:3` Python for Data<br>`data:4` BI & Visualization Tools<br>`data:5` Statistics Basics | — |
| `datascience` | Data Science | 5 | `datascience:1` Prerequisite: Data Analysis<br>`datascience:2` Statistics & Math<br>`datascience:3` Machine Learning<br>`datascience:4` Deep Learning Basics<br>`datascience:5` MLOps & Deployment | — |
| `devops` | DevOps Engineering | 5 | `devops:1` Linux & Networking<br>`devops:2` Version Control & CI/CD<br>`devops:3` Containers & Docker<br>`devops:4` Cloud & Orchestration<br>`devops:5` Monitoring & Security | `devops:1`, `devops:2`, `devops:5` |
| `cyber` | Cybersecurity | 4 | `cyber:1` Networking Fundamentals<br>`cyber:2` Security Concepts<br>`cyber:3` Ethical Hacking<br>`cyber:4` Defensive Security | `cyber:4` |
| `mobile` | Mobile Development | 4 | `mobile:1` Prerequisites<br>`mobile:2` Core Mobile Development<br>`mobile:3` Firebase & Backend<br>`mobile:4` Publishing & Polish | `mobile:4` |
| `video` | Video Editing | 4 | `video:1` Editing Fundamentals<br>`video:2` Storytelling & Pacing<br>`video:3` Visual Effects & Graphics<br>`video:4` Platform-Specific Editing | `video:2` |
| `youtube` | YouTube Automation | 4 | `youtube:1` Channel Strategy<br>`youtube:2` Content Production<br>`youtube:3` Growth & SEO<br>`youtube:4` Monetization | `youtube:2`, `youtube:3`, `youtube:4` |
| `marketing` | Digital Marketing | 4 | `marketing:1` Marketing Foundations<br>`marketing:2` Core Channels<br>`marketing:3` Paid Advertising<br>`marketing:4` Analytics & Optimization | — |
| `ai` | AI for Work & Productivity | 4 | `ai:1` Understanding AI Tools<br>`ai:2` Prompt Engineering<br>`ai:3` AI for Your Field<br>`ai:4` AI Ethics & Verification | `ai:2`, `ai:3` |
| `nocode` | No-Code Development | 3 | `nocode:1` Website Building<br>`nocode:2` App Building<br>`nocode:3` Automation | `nocode:2` |
| `writing` | Technical Writing | 4 | `writing:1` Writing Fundamentals<br>`writing:2` Tools & Formats<br>`writing:3` Documentation Types<br>`writing:4` Portfolio & Specialization | `writing:4` |
| `crypto` | Crypto & Web3 | 11 | `crypto:1` How Blockchain Actually Works<br>`crypto:2` Wallets, Keys & On-Chain Security<br>`crypto:3` Solidity Fundamentals<br>`crypto:4` Token Standards & Development Tooling<br>`crypto:5` DeFi Core Mechanics<br>`crypto:6` DeFi Risks & Advanced Concepts<br>`crypto:7` Web3 Frontend Foundations<br>`crypto:8` dApp Data & Storage<br>`crypto:9` Common Smart Contract Vulnerabilities<br>`crypto:10` Auditing Tools & Practice<br>`crypto:11` On-Chain Data Analysis | `crypto:5`, `crypto:7`, `crypto:8`, `crypto:9`, `crypto:10`, `crypto:11` |
| `projectmgmt` | Project Management | 6 | `projectmgmt:1` PM Foundations<br>`projectmgmt:2` Agile Principles<br>`projectmgmt:3` Scrum in Practice<br>`projectmgmt:4` Tools & Planning<br>`projectmgmt:5` Budgeting & Reporting<br>`projectmgmt:6` Certifications & Career | — |
| `productmgmt` | Product Management | 8 | `productmgmt:1` Product Thinking Foundations<br>`productmgmt:2` User Research & Discovery<br>`productmgmt:3` Strategy & Prioritisation<br>`productmgmt:4` Writing Product Requirements<br>`productmgmt:5` Growth & Engagement Metrics<br>`productmgmt:6` Retention, Funnels & Experiments<br>`productmgmt:7` Shipping with Engineering<br>`productmgmt:8` PM Career & Portfolio | `productmgmt:5`, `productmgmt:6`, `productmgmt:7`, `productmgmt:8` |
| `dart` | Dart Programming | 4 | `dart:1` Dart Fundamentals<br>`dart:2` Object-Oriented Dart<br>`dart:3` Async Dart<br>`dart:4` Dart for Flutter | — |
| `sonic` | Sonic Blockchain Development | 6 | `sonic:1` Web3 Basics (HackQuest Phase 1)<br>`sonic:2` Sonic Ecosystem (HackQuest Phase 2)<br>`sonic:3` Solidity Fundamentals (HackQuest Phases 3–4)<br>`sonic:4` Build & Frameworks (HackQuest Phases 5–6)<br>`sonic:5` Security & Ecosystem (HackQuest Phases 7–8)<br>`sonic:6` FeeM Strategy & Mainnet | — |
| `ai-foundations` | AI Foundations & Fluency | 6 | `ai-foundations:1` Understanding AI<br>`ai-foundations:2` The Modern AI Landscape<br>`ai-foundations:3` Communicating With AI<br>`ai-foundations:4` Thinking With AI<br>`ai-foundations:5` AI Reliability<br>`ai-foundations:6` Building Repeatable AI Workflows | — |
| `ai-work` | AI for Work & Productivity | 5 | `ai-work:1` AI for Communication<br>`ai-work:2` AI for Documents<br>`ai-work:3` AI for Learning<br>`ai-work:4` AI for Planning<br>`ai-work:5` AI for Professional Workflows | `ai-work:4` |
| `ai-research` | AI Research, Search & Verification | 5 | `ai-research:1` Search vs AI<br>`ai-research:2` AI-Assisted Research<br>`ai-research:3` Sources & Evidence<br>`ai-research:4` Verification & Fact Checking<br>`ai-research:5` Research Workflows | `ai-research:2` |
| `ai-content` | AI Content Creation | 6 | `ai-content:1` Content Strategy<br>`ai-content:2` AI-Assisted Research<br>`ai-content:3` Writing & Scripting<br>`ai-content:4` AI Visual Creation<br>`ai-content:5` Content Production<br>`ai-content:6` Repurposing | `ai-content:2`, `ai-content:3` |
| `ai-youtube` | AI Video & YouTube | 10 | `ai-youtube:1` YouTube Fundamentals<br>`ai-youtube:2` Topic Research<br>`ai-youtube:3` AI-Assisted Scripting<br>`ai-youtube:4` AI Voice & Audio<br>`ai-youtube:5` AI Visual Production<br>`ai-youtube:6` Editing<br>`ai-youtube:7` Thumbnails & Packaging<br>`ai-youtube:8` Publishing<br>`ai-youtube:9` Analytics<br>`ai-youtube:10` Responsible Automation | — |
| `ai-software-development` | AI-Assisted Software Development | 8 | `ai-software-development:1` AI Coding Fundamentals<br>`ai-software-development:2` Code Generation<br>`ai-software-development:3` Debugging With AI<br>`ai-software-development:4` AI Coding Tools<br>`ai-software-development:5` Coding Agents<br>`ai-software-development:6` Testing & Verification<br>`ai-software-development:7` Building With AI<br>`ai-software-development:8` Professional AI-Assisted Development | `ai-software-development:6`, `ai-software-development:8` |
| `ai-automation` | AI Automation | 8 | `ai-automation:1` Automation Fundamentals<br>`ai-automation:2` Workflows<br>`ai-automation:3` APIs<br>`ai-automation:4` Webhooks<br>`ai-automation:5` AI in Workflows<br>`ai-automation:6` Structured Data<br>`ai-automation:7` Human Approval<br>`ai-automation:8` Reliable Automation | `ai-automation:3`, `ai-automation:7`, `ai-automation:8` |
| `ai-agents` | AI Agents | 10 | `ai-agents:1` What AI Agents Are<br>`ai-agents:2` Agents vs Chatbots<br>`ai-agents:3` Agents vs Workflows<br>`ai-agents:4` Tools<br>`ai-agents:5` Context & Memory<br>`ai-agents:6` Planning<br>`ai-agents:7` Tool Use<br>`ai-agents:8` Human Oversight<br>`ai-agents:9` Reliability<br>`ai-agents:10` Agent Workflow Design | — |
| `ai-engineering` | AI Data, APIs & Engineering | 10 | `ai-engineering:1` AI APIs<br>`ai-engineering:2` Model Selection<br>`ai-engineering:3` Structured Outputs<br>`ai-engineering:4` Embeddings<br>`ai-engineering:5` Retrieval<br>`ai-engineering:6` RAG<br>`ai-engineering:7` Vector Search<br>`ai-engineering:8` AI Evaluation<br>`ai-engineering:9` Cost & Latency<br>`ai-engineering:10` Deployment | `ai-engineering:6`, `ai-engineering:7` |
| `ai-design` | AI Design & Creative Work | 8 | `ai-design:1` AI in Design<br>`ai-design:2` UI Ideation<br>`ai-design:3` Image Generation<br>`ai-design:4` Visual Exploration<br>`ai-design:5` Design Refinement<br>`ai-design:6` Prototyping<br>`ai-design:7` Brand Consistency<br>`ai-design:8` Human Design Judgment | `ai-design:2`, `ai-design:5` |

Notes:

- `crypto` is the largest track at 11 stages; `projectmgmt` has 6; `ai-youtube`, `ai-agents`, and `ai-engineering` have 10 each.
- The package's stage IDs are simple integers scoped to a track. They are not globally unique. Always key by `trackId:stageId`.
- All repository and package titles agree, so no title-reconciliation mapping is needed.
- The package proposes all 186 as `needs_human_review` or `blocked`; none is approved.

---

## 5. What the resource package actually contains

`04_APPROVED_RESOURCE_MAP.csv` is misnamed for its current state. It is a **provisional mapping**, not an approved list.

| Map decision | Rows | Meaning |
|---|---:|---|
| `provisional_primary_pending_current_access_and_sme` | 143 | Proposed required primary, archived L3 evidence only |
| `blocked_primary_not_instructional_or_no_objective_match` | 43 | No acceptable required primary; optional only |
| `keep_candidate_pending_fresh_check_and_sme` | 207 | Candidate or supplement, not approved |
| `hold_not_required_until_content_and_free_access_verified` | 95 | Held back from required path |
| `human_objective_match_review_required` | 57 | Objective match needs a human decision |
| `keep_as_optional_practice_tool_not_primary_instruction` | 29 | Tool/practice, not instruction |
| `remove_from_required_path_access_or_destination_blocked` | 9 | Access or destination blocked |
| `hold_as_optional_deep_dive_until_segment_and_runtime_checked` | 1 | Optional deep dive only |
| **Total** | **584** | |

Resource candidate facts:

- 610 candidates: 208 at L3, 402 at L2.
- Free-access labels: 156 `public_free`, 52 `public_free_at_archive_probe`, 402 `unverified_for_required_portion`.
- 82 duplicate candidate URLs and 178 duplicate map URL rows indicate heavy cross-stage reuse.
- The runtime's own minimum for a verified resource is `MIN_RESOURCE_VERIFICATION_LEVEL = 3` in `lib/resource-verification.ts`. An L2 candidate cannot satisfy that threshold.
- Importing archive-only L3 evidence as if it were current would misrepresent the verification level, even though the numeric level is 3.

**Import rule:** no package resource becomes a required primary until its exact portion is opened in a current session, its access/account/paywall terms are checked, its objective match is confirmed, and a named reviewer signs off. Archive 200/content is not current verification.

### 5.1 All 43 archive-screen-blocked stages

These stages are the complete blocked set. The package rejected the listed candidate as a required primary because it was non-instructional, a tool/product page, or not an objective match after the archival screen. That is a package decision, not a claim that the destination is dead; some candidates may be usable after human review. Until then, each stage must remain optional-only for external resources and must not use the link as a progression gate.

| Stage | Title | Rejected primary candidate | Package decision | Required treatment |
|---|---|---|---|---|
| `frontend:5` | AI-Assisted Workflow | v0.dev by Vercel (Vercel) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `backend:1` | Foundations | CS50 Web Programming (Harvard) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `fullstack:1` | Complete Frontend Track | Full Stack Open (Univ. of Helsinki) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `fullstack:2` | Complete Backend Track | Next.js Official Docs (Vercel) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `fullstack:4` | Full Deployment | Stripe Documentation (Stripe) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `python:5` | Python + AI | LangChain Python Docs (LangChain) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `uiux:4` | Advanced UX | Mobbin (Mobbin) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `devops:1` | Linux & Networking | Docker Overview (Docker) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `devops:2` | Version Control & CI/CD | GitHub Actions Docs (GitHub) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `devops:5` | Monitoring & Security | Linux Monitoring with Prometheus & Grafana (DevOpsNess) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `cyber:4` | Defensive Security | Splunk SIEM Home Lab (Rajneesh) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `mobile:4` | Publishing & Polish | Publish to Google Play Guide (Google) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `video:2` | Storytelling & Pacing | StudioBinder — Filmmaking & Storytelling Blog (StudioBinder) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `youtube:2` | Content Production | ElevenLabs (ElevenLabs) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `youtube:3` | Growth & SEO | vidIQ (vidIQ) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `youtube:4` | Monetization | YouTube Monetization Guide (Google) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `ai:2` | Prompt Engineering | Prompt Engineering Guide (DAIR.AI) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `ai:3` | AI for Your Field | DeepLearning.AI Short Courses (DeepLearning.AI) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `nocode:2` | App Building | Glide Apps (Glide) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `writing:4` | Portfolio & Specialization | Write the Docs Guide (Write the Docs) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `crypto:5` | DeFi Core Mechanics | DefiLlama (DefiLlama) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `crypto:7` | Web3 Frontend Foundations | ethers — Getting Started (ethers) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `crypto:8` | dApp Data & Storage | ETHGlobal Hackathons (ETHGlobal) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `crypto:9` | Common Smart Contract Vulnerabilities | OpenZeppelin Security Blog (OpenZeppelin) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `crypto:10` | Auditing Tools & Practice | Code4rena (Code4rena) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `crypto:11` | On-Chain Data Analysis | Dune Analytics (Dune) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `productmgmt:5` | Growth & Engagement Metrics | Mixpanel (Mixpanel) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `productmgmt:6` | Retention, Funnels & Experiments | Hotjar (Hotjar) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `productmgmt:7` | Shipping with Engineering | ProductHunt (Product Hunt) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `productmgmt:8` | PM Career & Portfolio | Product School Free Resources (Product School) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `ai-work:4` | AI for Planning | Microsoft Learn — Draft, Analyze, and Present with Microsoft Copilot (MS-4018) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `ai-research:2` | AI-Assisted Research | Google Scholar (Google Scholar) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `ai-content:2` | AI-Assisted Research | OpenAI Academy — Prompting (OpenAI Academy) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `ai-content:3` | Writing & Scripting | Anthropic — Build With Claude (Anthropic) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `ai-software-development:6` | Testing & Verification | GitHub Copilot — Code Review (GitHub Docs) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `ai-software-development:8` | Professional AI-Assisted Development | GitHub Docs — Responsible Use of GitHub Copilot Features (GitHub Docs) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `ai-automation:3` | APIs | n8n Documentation (n8n) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `ai-automation:7` | Human Approval | n8n Docs — Wait (Human-in-the-Loop) (n8n Docs) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `ai-automation:8` | Reliable Automation | n8n Docs — Hosting, Logging and Monitoring (n8n Docs) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `ai-engineering:6` | RAG | LangChain Python Docs (LangChain) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `ai-engineering:7` | Vector Search | OpenAI — Vector Embeddings (OpenAI) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `ai-design:2` | UI Ideation | Figma AI Features (Figma) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |
| `ai-design:5` | Design Refinement | OpenAI Academy — Applied AI Foundations (OpenAI Academy) | blocked primary not instructional or no objective match | Keep optional; author in-product lesson or verify a replacement primary resource; do not gate progression on this link. |

Blocked-stage policy:

- The stage itself is not deleted or hidden; the repository's existing in-product material remains.
- No blocked stage gets a required external primary, a "verified" badge, or a paid claim.
- Progression must not depend on opening the blocked link.
- A blocked stage can leave the block list only through a documented replacement: current page check, exact portion, free/account terms, objective match, and named human sign-off.

---

## 6. Runtime mapping: where each artifact would go, and what breaks

| Package artifact | Runtime source of truth | Proposed import target | Compatibility |
|---|---|---|---|
| `01_STAGE_MANIFEST.csv` | `lib/tracks.ts` | No runtime import; reconciliation fixture/test only | Good — identifiers already match |
| `02_STAGE_LEARNING_SPECS.json` | `lib/curriculum.ts`, `lib/curriculum-extended.ts`, `lib/ai-curriculum.ts` | New staging module, then per-track plan modules | Partial — `authoredInstruction` is an outline, not full lesson text |
| `05_QUIZ_BANK.jsonl` | `lib/guided-path.ts` (`QuizQuestion`), `lib/curriculum.ts`, `lib/curriculum-extended.ts`, `lib/ai-curriculum.ts`, `lib/ai-assessment-bank.ts` | Quiz modules plus `app/api/guided-path/[trackId]/route.ts` grading | **Blocked** — schema and grading mismatch |
| `06_STAGE_MASTERY_AND_PRACTICE.json` | `lib/section-mastery.ts`, `lib/project-verification/*` | `lib/section-mastery.ts` and project contract resolvers | **Blocked** — rubric provenance and evaluator mismatch |
| `07_PHASE_PROJECTS.json` | `lib/curriculum.ts`, `lib/curriculum-extended-projects.ts`, `lib/ai-project-briefs.ts`, `lib/ai-projects.ts` | Project brief modules plus `lib/project-verification/contract.ts` | **Blocked** — artifact kinds and AI discipline routing |
| `03_RESOURCE_CANDIDATES.csv` | `lib/stage-resources.ts` | Staging resource registry | Partial — candidates only |
| `04_APPROVED_RESOURCE_MAP.csv` | `lib/stage-resources.ts`, `lib/resource-verification.ts` | Resource registry plus authored verification records | **Blocked** — 143 provisional, 43 blocked, zero current checks |
| `09_RESOURCE_VERIFICATION_LOG.csv` | `lib/resource-verification.ts` | Audit evidence only | Good as archive evidence; not a verification source |
| `08_REVIEW_AND_OPEN_ISSUES.csv` | No runtime equivalent | Import tracker / review queue | Good as process input |
| `10_TECHSKILLHUB_HUMAN_REVIEW_GUIDE.docx` | No runtime equivalent | Reviewer process | Good as process input |
| `11_IDE_IMPLEMENTATION_PROMPT.md` | No runtime equivalent | Implementation plan input | Needs correction to match this repo |
| `research-progress.json` | No runtime equivalent | Provenance only | Ambiguous live-coverage field; do not cite as coverage |

### 6.1 Current runtime facts that drive the findings

- `lib/guided-path.ts` defines `QuizQuestion` as `{ question, options, correctIndex, explanation, teachingSource?, teachingStageId?, cognitiveLevel? }`. The package adds `points`, `critical`, `correctAnswer`, `answerRationale`, `feedbackOnIncorrect`, `difficulty`, `distractorAnalysis`, and more. Those fields are **not** part of the runtime type and are not graded.
- `requiredCorrectFor(trackId, total)` returns `ceil(total * 0.8)` for `ai-*` tracks and `max(1, total - 1)` otherwise. With five questions, both paths require 4/5. With four AI questions, the AI path requires **4/4**.
- The quiz route grades by counting correct answers and computes `round(correct / total * 100)`. It ignores per-question points and critical flags.
- The quiz route returns `correctIndex` and `explanation` for **every** question in `results`, including in `validateOnly` responses and failed attempts (`app/api/guided-path/[trackId]/route.ts:204-218`).
- Pass completion is stored as a `UserProgress` row keyed by `q:<stage>`; there is no quiz attempt, score, answer, or version table in `prisma/schema.prisma`.
- Project rubrics are built at runtime from `mandatoryCriteria(discipline)` plus the project's `acceptanceCriteria` (`lib/project-verification/contract.ts:279-280`). The package's `effectiveRubric`, weights, and mandatory flags are not read by the evaluator.
- `parseArtifacts` casts any client-provided `kind` string to `ArtifactKind` without validating it against the enum (`app/api/project-verification/[trackId]/route.ts:26-33`).
- `disciplineForTrack` has no `ai-*` entries. Every unknown track falls through to `'software'`, so all ten AI tracks fall back to the software contract (public inspectable source artifact, README, source inspection) by default.
- Project assessment is entitlement-gated and consumes assessment credits (`app/api/project-verification/[trackId]/route.ts:35-41`, plus the credit reserve/consume flow). Content import therefore has commercial and provider-cost consequences even though no commercial file is being changed.
- Progression is server-authorized, not client-asserted: the quiz route rejects `stepIndex !== enrollment.currentStepIndex` and advances in a transaction (`app/api/guided-path/[trackId]/route.ts:181-183`, `274-280`); the project route independently checks enrollment, evidence, the deterministic decision, and credits. The AI assessment never grants progression by itself.

---

## 7. Findings

Severity:

- **P0** — must be fixed before any learner-facing exposure.
- **P1** — must be fixed before public launch or paid activation.
- **P2** — quality, evidence, or follow-up work.

### P0-1 — Quiz answer keys are disclosed on every submission, enabling trivial retry farming

**Evidence.** `app/api/guided-path/[trackId]/route.ts:204-218` builds `results` with `{ correct, correctIndex, explanation }` for every question. That object is returned for `validateOnly` submissions and for failed submissions. The learner can submit five arbitrary integers, receive every key, then resubmit the key sequence and pass.

**Impact.** Any quiz that gates progression or paid content is effectively open-book after one attempt. The code comment "Correct answers and explanations are returned only after submission" is true but insufficient: the first submission is the disclosure event. There is no attempt limit, cooldown, or server-side attempt record in the current route.

**Required change.** Choose one product policy and implement it explicitly:

1. **Graded assessment:** return per-question `correct` only; never return `correctIndex`; reveal explanations only after a pass or after a supervised review. Add server-side attempt accounting and rate limiting.
2. **Formative assessment:** keep explanations, but stop using the quiz as a progression or entitlement gate; separate the practice bank from the graded bank.
3. **Hybrid:** allow one feedback attempt, record it, then require a cooldown or a different question set before the graded attempt.

Whichever is chosen, `validateOnly` must not be a free key oracle.

**Exit test.** A failed submission response contains no `correctIndex`, no `correctAnswer`, and no text that uniquely identifies the correct option; a second immediate submission is blocked or served a different variant; attempts are recorded.

### P0-2 — No quiz attempt, score, or version persistence; prior passes survive harder quizzes

**Evidence.** `prisma/schema.prisma` has `UserProgress`, `UserTrackProgress.data` (JSON), `GuidedPathEnrollment`, `CourseCompletion`, and `LearningEvent`, but no quiz-attempt, quiz-version, or answer table. `LearningEvent` records `quiz_failed` metadata, not a durable attempt record. The guided-path route stores completion under a stable `q:<stage>` key. `lib/path-compat.ts` remaps step keys across path versions so learners keep their place.

**Impact.**

- A learner who passed the old 3-question quiz keeps `q:<stage>` completion after a 5-question quiz is imported. The new assessment is never taken.
- There is no auditable record of what was asked, what was answered, or which version was passed.
- A path-version bump does not invalidate prior quiz passes by itself; it only remaps positions.
- Retry farming, score disputes, and content-regression analysis are impossible to investigate.

**Required change.** Persist attempts with `trackId`, `stageId`, `pathVersion`, `quizVersion`, score, pass/fail, and timestamp. Make the progression check require a pass for the **current** quiz version, or explicitly grandfather legacy passes with a recorded policy. Do not silently treat legacy completions as current.

**Exit test.** Importing a new quiz version causes a learner with only a legacy pass to be asked to take the new quiz (or to be explicitly flagged as grandfathered); the attempt row is queryable; a path-version bump does not lose the learner's position.

### P0-3 — The bundle's quiz schema is silently discarded by the runtime

**Evidence.** The runtime `QuizQuestion` supports only `question`, `options`, `correctIndex`, `explanation`, and optional teaching metadata. The bundle's 930 rows add points, critical flags, answer text, rationales, distractor analysis, difficulty, and feedback. The route grades by count and ignores all of it.

**Impact.** Importing the bundle as-is creates a false impression that:

- critical questions gate progression (they do not);
- 20-point weights matter (they do not, because all questions are equal);
- answer rationales and distractor feedback reach learners (they do not);
- a 100-point score is a weighted score (it is a percentage of correct count).

**Required change.** Pick one:

- **Option A (recommended for the first import):** normalize the bundle to the existing four-field contract at import time, drop unsupported fields with an explicit mapping report, and document count-based grading. Keep the richer fields in the staging module for future use.
- **Option B:** extend `QuizQuestion` with optional `points` and `critical`, update the grader to weighted scoring, and implement a critical-question gate. This is a larger behavioral change and needs its own tests and product sign-off.

Do not import extra fields and assume TypeScript or the grader will use them.

**Exit test.** The import report lists every dropped field and count; a fixture with a failed "critical" question behaves exactly as the chosen policy specifies; weighted and count-based scores are tested separately.

### P0-4 — Project artifact kinds and rubrics do not match the evaluator

**Evidence.** The runtime enum in `lib/project-verification/contract.ts:28-42` supports 14 kinds: `github_repo`, `code_sandbox`, `live_url`, `notebook`, `dataset`, `design_file`, `design_export`, `video_url`, `document_url`, `document_file`, `dashboard_url`, `presentation`, `image`, `text`. The package uses at least 29 additional strings such as `code_or_repo`, `test_evidence`, `readme`, `screenshots`, `rationale`, `analysis_artifact`, `authorized_lab_report`, `redacted_evidence`, `remediation`, `creative_output`, `script_or_storyboard`, `review_evidence`, `campaign_artifact`, `measurement_plan`, `workflow_artifact`, `evaluation_evidence`, `guardrails`, `editorial_notes`, `contract_or_analysis`, and `success_measures`.

The route casts arbitrary strings to `ArtifactKind` (`app/api/project-verification/[trackId]/route.ts:30`). The evaluator's contract is derived from the project brief's `acceptanceCriteria`, not from the package's `effectiveRubric` (`lib/project-verification/contract.ts:279-280`).

**Impact.**

- The package's required evidence formats are not what the learner is asked for.
- Unknown artifact kinds can reach the contract/evidence pipeline and be treated as unsupported or mismatched rather than rejected with a clear error.
- The package's 100-point rubric, weights, and mandatory flags never reach the evaluator.
- AI capstones are especially exposed: they are forced into the software contract (public inspectable source, README, source inspection) — see P0-5.
- `cyber` and `qa` both map to the `security` discipline, whose base contract requires `github_repo`; manual QA/security report deliverables need explicit overrides.

**Required change.**

1. Add a strict artifact-kind validator at the API boundary. Reject unknown kinds with `422` and a human-readable list of accepted kinds.
2. Publish an explicit mapping from package kinds to runtime kinds or to a richer runtime artifact record. Examples: `code_or_repo` → `github_repo` or `code_sandbox`; `sample_data` → `dataset`; `screenshots` → `image`; `script_or_storyboard` → `document_file` or `video_url`; `authorized_lab_report` / `redacted_evidence` / `remediation` → `document_file` or `text`.
3. Carry a `label`/`description` on submitted artifacts so discipline-specific evidence keeps its meaning even when the transport kind is generic.
4. Decide whether the package's rubric weights/mandatory criteria are imported into `RubricCriterion` or intentionally replaced by runtime derivation. Record the decision per project.

**Exit test.** Every one of the 125 projects resolves to a contract; every required artifact kind is in the runtime enum; an unknown kind returns 422; the rubric version is derived from the actual criteria; a project cannot pass with a missing required artifact.

### P0-5 — All AI tracks default to the software discipline

**Evidence.** `disciplineForTrack` checks `SOFTWARE_TRACKS`, `DATA_TRACKS`, `DESIGN_TRACKS`, `VIDEO_TRACKS`, `WRITING_TRACKS`, `MARKETING_TRACKS`, `MANAGEMENT_TRACKS`, `SECURITY_TRACKS`, and `NOCODE_TRACKS`. No `ai-*` ID appears in any set. The fallback is `'software'`. The legacy `ai` track is explicitly in `SOFTWARE_TRACKS`.

**Impact.** The ten AI tracks — including AI Foundations, AI Work, AI Research, AI Content, AI YouTube, AI Automation, AI Engineering, and AI Design — inherit the software default: a public inspectable source artifact, a README, and source inspection. That directly conflicts with the package's non-code evidence formats for those disciplines.

**Required change.** Add explicit discipline routing for the AI tracks, or per-project discipline overrides. Suggested routing:

- `ai-software-development`, `ai-engineering`, `ai-automation`, `ai-agents` → `software` or `data` as appropriate.
- `ai-design` → `design`.
- `ai-content`, `ai-youtube`, `ai-work` → `writing` or `marketing` as appropriate.
- `ai-research`, `ai-foundations` → `data`/`writing` with explicit project overrides.

Do not guess in code comments. Resolve each of the 125 projects to a discipline and artifact set, then test it.

**Exit test.** No AI project requires `github_repo` unless its brief explicitly asks for code; each AI capstone's required artifacts match its discipline; the ten `PROJECT-ARTIFACT-001` capstones are covered by fixtures.

### P0-6 — The external-resource gate is not met, and the runtime would overstate it

**Evidence.** 143 stages have only a provisional primary; 43 are blocked; zero stage primaries were fully live-reverified; zero videos were playback-verified. `isResourceVerified` requires level ≥ 3 plus at least 600 characters of content evidence, but it does not check `access` at all; a paid resource can pass the predicate. The package's archive-era L3 rows are not current checks.

**Impact.** Wiring these resources as required would create false "verified" claims, expose learners to dead/paid/changed links, and make the 43 blocked stages look solved when they are not. It would also overwrite or displace the repository's current archive-era resources without improving their evidence.

**Required change.** Do not import any package resource as a required primary in this phase. Stage resources in a separate registry with explicit provenance and `verificationEra: 'archive'`, `currentCheck: 'none'`, and `role: 'optional'`. Promote a resource only after a fresh check. For the 43 blocked stages, keep the existing in-product material and label external links optional; do not gate progression on them.

**Exit test.** No stage has a required external primary whose only evidence is archive-era; all 43 blocked stages have no required external primary; the UI/API can distinguish "archive evidence" from "current check"; a fresh check updates level, access, and timestamp atomically.

### P0-7 — `authoredInstruction` is an outline, not a complete in-product lesson

**Evidence.** The stage specs contain `authoredInstruction`, but it is structured as an outline/worked example rather than full lesson prose with explanations, examples, and practice. For stages with a blocked external primary, this is the only instructional fallback.

**Impact.** Removing or demoting the external primary for a blocked stage would leave the learner with an outline and a project, not a teachable lesson. Calling that "adequately taught in-product" would be inaccurate.

**Required change.** For each of the 43 blocked stages, either:

- author complete lesson content and have it reviewed, or
- keep a current, verified external primary, or
- explicitly mark the stage as "project-only / supplementary" and remove any claim of complete instruction.

**Exit test.** Each blocked stage has a reviewed lesson or a verified primary; a content checklist confirms objective coverage; no blocked stage is presented as a complete required stage on outline text alone.

### P0-8 — Persistence needed for attempts and verification does not exist

**Evidence.** The Prisma schema has no quiz attempts, no resource verification records, and no normalized project submissions. Project submissions and history live in `UserTrackProgress.data` JSON.

**Impact.** P0-1 and P0-2 cannot be fixed reliably with in-memory or JSON-only state. Resource promotion cannot be audited without a verification record. Project evidence and rubric versions cannot be queried or invalidated cleanly.

**Required change.** See §10. This is a migration proposal only; no migration was created or applied in this phase.

**Exit test.** Migration is additive, reversible by feature flag, backfills no fabricated attempts, and preserves all existing learner progress.

### P1-1 — Rubric versioning is static in the bundle and dynamic in the runtime

**Evidence.** Every package mastery record uses `rubricVersion: "tsh-stage-rubric-v1"`, including discipline-specific rubrics. The runtime computes a stable hash from the criteria (`computeRubricVersion` in `lib/project-verification/contract.ts:85-94`) and uses it in the evidence fingerprint.

**Impact.** If the static bundle version is imported literally, different criteria can share a version, and prior passes may be reused when they should be invalidated. If the runtime version is used, prior passes invalidate correctly but the package's provenance no longer matches the stored string.

**Required change.** Do not import `rubricVersion` as the runtime value. Derive it at runtime from the criteria and store the package's version as provenance metadata. Add a test that any criteria change produces a new version and invalidates reuse.

### P1-2 — Mandatory flags contradict the progression gate

**Evidence.** Many package rubric items are marked `mandatory: false`, while the stage spec's `progressionGate.criticalCriteriaMustPass` is `true`. The runtime has explicit mandatory criteria per discipline plus project acceptance criteria.

**Impact.** A learner could satisfy the weighted threshold while failing a criterion the package calls critical. Conversely, runtime mandatory criteria may be stricter than the package intended.

**Required change.** Reconcile per project: either mark the package criteria mandatory and map them to runtime `RubricCriterion`, or change the gate text. Do not ship a spec that says "critical must pass" while every criterion is optional.

### P1-3 — AI quiz repetition and cross-domain contamination

**Evidence.** `lib/ai-assessment-bank.ts` supplies generic supplemental questions reused across stages. The package flags generic AI templates and six cross-domain leakage issues (`QUIZ-CROSS-crypto-6`, `fullstack-2/3/4`, `mobile-4`, `qa-4`). `AI-QUIZ-REPEATS` reports that 70 of 76 AI stages had only one topic-specific old question, with `ai-content:6` at zero; the package replaces those with five stage-scoped items but still requires SME review. Observed issues include lowercase stems, generic writing questions, and an AI Foundations question about agent authorization that exceeds the stage objective.

**Impact.** Learners see the same questions across stages; questions may test the wrong domain; assessment validity and perceived quality suffer.

**Required change.** Review all 930 questions for stage specificity, one correct answer, plausible distractors, and objective alignment. Replace generic bank reuse with stage-scoped items where the bank is currently the source. Treat the six leakage flags as must-fix before that track's quiz wave.

### P1-4 — QA audit is internally stale

**Evidence.** `QUIZ-QA-001` claims 67 duplicate stem groups, while the package's own QA summary reports zero. The duplicate-repair log and specificity audit do not agree on the current state.

**Impact.** Reviewers cannot trust the QA counts; duplicate repair may be repeated or skipped.

**Required change.** Recompute duplicate groups from the current 930-row bank, store the exact algorithm and output hash, and retire the stale row. Do not use either number in launch claims until recomputed.

### P1-5 — Video evidence is not playback-verified

**Evidence.** `VIDEO-RUNTIME` reports 60 video rows with no runtime/segment evidence; none is L4 playback-verified. The package explicitly says not to expose the current 30–90 minute estimates as verified runtime.

**Impact.** Required video portions cannot be timed, segmented, or checked for the exact assigned content. Learners may be sent to the wrong segment.

**Required change.** Keep video resources optional until playback and timestamps are captured. Prefer text/interactive resources for required learning where video cannot be inspected.

### P1-6 — Duplicate URLs and cross-stage reuse

**Evidence.** 82 duplicate candidate URLs; 178 duplicate map URL rows; the repository's own probe has 44 duplicate URL rows.

**Impact.** The same source may be proposed as the primary for multiple stages with different objectives, which weakens objective match and increases the chance of a single point of failure.

**Required change.** Deduplicate per stage, require an explicit `exactPortion`/segment for each reuse, and cap how many stages can share one source as a required primary.

### P1-7 — Commercial and provider-cost consequences are real even though no commercial file changes

**Evidence.** Project assessment requires track access, reserves assessment credits, and calls the configured DeepSeek provider. Importing 125 projects and encouraging resubmission increases assessment volume. The package has no pricing or credit model.

**Impact.** A content import can change unit economics and provider load without touching pricing code. Paid activation before verification would compound the risk.

**Required change.** Keep commercial gates untouched. Model the assessment volume per track, set pilot budgets/quotas, and require explicit approval before any paid exposure. Do not use the import to infer or change entitlements.

### P1-8 — Licensing, attribution, and accessibility are not evidenced

**Evidence.** Resource records include publisher, URL, and content excerpts, but no license/attribution terms. The verification interface has no license field. No accessibility review is present in the package.

**Impact.** Required use of third-party material may exceed permitted terms; learners may face inaccessible resources.

**Required change.** Add license/attribution and accessibility fields to the resource review. Treat both as human/legal gates, not engineering defaults.

### P2-1 — Stale "missing normalized project brief" issues

**Evidence.** The open-issue file contains 10 `missing_normalized_project_brief` rows, one for each AI capstone. They describe the package's source export, not the current repository: all ten capstones already have briefs in `lib/ai-project-briefs.ts` and project definitions in `lib/ai-curriculum.ts` / `lib/ai-projects.ts`.

**Impact.** Reviewers may waste time treating the capstones as missing, or may import the package's draft normalization without comparing it to the existing brief.

**Required change.** Compare each package draft normalization with the existing repository brief and contract, reconcile differences, then close the issue row. Do not report the capstones as missing projects.

### P2-2 — The package's implementation prompt does not match this repository

**Evidence.** `11_IDE_IMPLEMENTATION_PROMPT.md` describes an import flow but not the current module split (`lib/curriculum.ts` vs `lib/curriculum-extended.ts` vs `lib/ai-curriculum.ts`, or the project-verification contract). Following it literally would create parallel sources of truth.

**Required change.** Replace it with a repo-specific plan (this document's §8–§9) before implementation begins.

---

## 8. Import strategy and exact target files

### 8.1 Guiding decisions

1. **Stage first, wire later.** Import the normalized package into a new, unreferenced staging module. Runtime modules consume it only after their gate passes.
2. **One source of truth per artifact.** Do not create a second quiz bank, project registry, or resource resolver. Extend the existing modules.
3. **Preserve provenance.** Every imported record carries package filename, row key, package hash, and status (`provisional`, `blocked`, `draft`).
4. **No resource promotion without a current check.** Archive evidence stays archive evidence.
5. **No commercial edits.** Access, pricing, credits, and entitlements remain as they are.
6. **Backwards compatibility.** Existing learner keys (`q:<stage>`, `j:<project>`, `r:<stage>:<resource>`) must keep resolving; changing a step list requires a path version and a compat test.

### 8.2 Proposed staging module (new, unreferenced at first)

`lib/curriculum-imports/tsh-2026-10.ts`

Contents:

- `PACKAGE_PROVENANCE` — hashes, extraction date, source filenames.
- `STAGE_IMPORTS` — 186 normalized stage records with `status` and `packageStageKey`.
- `QUIZ_IMPORTS` — 930 normalized questions with unsupported fields preserved separately.
- `PROJECT_IMPORTS` — 125 normalized projects with discipline/artifact mapping decisions.
- `RESOURCE_IMPORTS` — 610 candidates plus 584 map decisions, with `verificationEra: 'archive'`.
- `MASTERY_IMPORTS` — 186 records with package rubric version as provenance only.

This module is data-only. It must not be imported by any runtime path until the corresponding gate passes. Add a test that asserts no runtime module imports it during the pilot.

### 8.3 Target modules by artifact

| Artifact | Target | Notes |
|---|---|---|
| Base non-AI stage plans | `lib/curriculum.ts` | Current base plans have 3 questions/stage; the package has 5. Replace only after P0-3 decision. |
| Extended non-AI stage plans | `lib/curriculum-extended.ts` | Used by selected non-AI tracks; keep its existing selection logic. |
| AI stage checkpoints | `lib/ai-curriculum.ts` | `AI_STAGE_CHECKPOINTS`; currently 3–5 questions/stage. |
| AI supplemental questions | `lib/ai-assessment-bank.ts` | Main source of cross-stage repetition; reduce or stage-scope. |
| AI quiz assembly | `lib/ai-guided-path.ts` | Assembles verify questions; must not duplicate imported questions. |
| Base project briefs | `lib/curriculum.ts` | Project briefs and acceptance criteria. |
| Extended project IDs | `lib/curriculum-extended-projects.ts` | IDs and mappings. |
| AI capstone definitions | `lib/ai-curriculum.ts`, `lib/ai-projects.ts` | Project IDs and hours; all 10 exist. |
| AI capstone briefs | `lib/ai-project-briefs.ts` | All 10 exist; use as the brief source. |
| Project contract | `lib/project-verification/contract.ts` | Discipline routing, artifact kinds, rubric derivation. |
| Evidence validation | `lib/project-verification/evidence.ts` | Reject unknown kinds; preserve labels. |
| Deterministic decision | `lib/project-verification/schema.ts` | Weighted threshold and mandatory criteria. |
| Assessment orchestration | `lib/project-verification/assessment.ts` | Ensure unable criteria cannot pass. |
| Mastery contracts | `lib/section-mastery.ts` | Section-level synthetic contracts; keep `stage:<track>:<stage>` keys. |
| Stage resources | `lib/stage-resources.ts` | Resolution and dedupe. |
| Verification records | `lib/resource-verification.ts` | Level/access/role; add archive-vs-current distinction. |
| Quiz types and public stripping | `lib/guided-path.ts` | `QuizQuestion`, `PublicQuizQuestion`, path versions. |
| Quiz grading | `app/api/guided-path/[trackId]/route.ts` | Key exposure, scoring, attempts. |
| Project API | `app/api/project-verification/[trackId]/route.ts` | Artifact validation, credits, progression. |
| Path compatibility | `lib/path-compat.ts` | Remap if step lists change. |
| Persistence | `prisma/schema.prisma` | Proposal only in this phase. |

### 8.4 Track waves

Content is reviewed in six waves. Each wave is split into four independent streams (quiz, project, mastery, resources) so a quiz review does not block a project review.

| Wave | Tracks | Stages |
|---|---|---:|
| W1 | `qa`, `data`, `datascience`, `marketing`, `projectmgmt` | 24 |
| W2 | `frontend`, `backend`, `fullstack`, `python`, `uiux`, `mobile`, `dart` | 33 |
| W3 | `devops`, `cyber`, `crypto`, `sonic` | 26 |
| W4 | `ai-foundations`, `ai-work`, `ai-research`, `ai-content`, `ai-youtube` | 32 |
| W5 | `ai-software-development`, `ai-automation`, `ai-agents`, `ai-engineering`, `ai-design` | 44 |
| W6 | `writing`, `video`, `youtube`, `nocode`, `ai`, `productmgmt` | 27 |
| **Total** | | **186** |

Ordering rationale:

- Start with tracks that have no blocked stages and smaller stage counts to validate the pipeline (`qa`, `data`, `datascience`, `marketing`, `projectmgmt`).
- Defer tracks with the heaviest blocked/resource risk (`crypto`, `productmgmt`, `youtube`, `ai-design`) until the resource and project contracts are stable.
- Keep AI tracks in their own waves because they need the discipline-routing fix first.

### 8.5 Batch sequence

| Batch | Scope | Write target | Exit gate |
|---|---|---|---|
| B0 | Guardrails: artifact validation, key-exposure policy, quiz types, discipline routing, rubric versioning | `lib/project-verification/*`, `lib/guided-path.ts`, `app/api/guided-path/[trackId]/route.ts` | P0-1, P0-3, P0-4, P0-5, P0-6 tests pass |
| B1 | Staging module and parity tests; no runtime wiring | `lib/curriculum-imports/tsh-2026-10.ts` | 32/186/stage-title parity; no runtime import |
| B2 | Quiz wave W1–W2 | `lib/curriculum.ts`, `lib/curriculum-extended.ts` | SME answer-key review; key-exposure test |
| B3 | Project wave W1–W2 | `lib/curriculum.ts`, `lib/curriculum-extended-projects.ts`, `lib/project-verification/contract.ts` | 125-project contract matrix; unknown-kind 422 |
| B4 | AI content waves W4–W5 | `lib/ai-curriculum.ts`, `lib/ai-assessment-bank.ts`, `lib/ai-guided-path.ts`, `lib/ai-project-briefs.ts` | AI discipline matrix; no forced GitHub for non-code capstones |
| B5 | Mastery and rubrics | `lib/section-mastery.ts` | Per-discipline rubric version; mandatory criteria reconciled |
| B6 | Resources, provisional first, blocked last | `lib/stage-resources.ts`, `lib/resource-verification.ts` | Fresh check per required primary; 43 blocked stages remain optional |
| B7 | Internal pilot behind flag | Runtime wiring for one wave | Canary account; no paid activation |
| B8 | Public launch decision | Separate approval | Fresh verification + human sign-off + commercial review |

Each batch is a separate PR-sized change. Do not combine schema, quiz grading, project contracts, and resource promotion in one change.

---

## 9. Required tests

### 9.1 Contract and parity tests

- 32 tracks and 186 stages resolve from `lib/tracks.ts`; every package `trackId:stageId` maps to exactly one repository stage.
- No duplicate stage titles or IDs within a track; no package stage without a repository stage.
- All 125 project IDs resolve across `lib/curriculum.ts`, `lib/curriculum-extended-projects.ts`, `lib/ai-curriculum.ts`, `lib/ai-projects.ts`, and `lib/ai-project-briefs.ts`.
- All 186 mastery records resolve through `resolveSectionMastery`/`resolveStepAssessment`; weights and rubric IDs are present.
- All 584 map rows have a decision; 143 are provisional and 43 are blocked; counts are asserted in fixtures.

### 9.2 Quiz tests

- Every question has 4–5 options, exactly one correct index, and an explanation; no empty stems; no duplicate IDs.
- Public path payloads contain no `correctIndex`, `correctAnswer`, or explanation before submission.
- `validateOnly` responses contain no key material.
- Failed responses contain no key material under the chosen policy.
- Non-AI 5-question quiz passes at 4/5 and fails at 3/5.
- AI 5-question quiz passes at 4/5; AI 4-question quiz requires 4/4 (current behavior) or the explicitly chosen replacement policy.
- Critical-question policy: if adopted, a failed critical question blocks even when the count threshold is met; if not adopted, the import report says so.
- Score is an integer 0–100; partial answer arrays are rejected; non-numeric answers are rejected.
- A new quiz version invalidates a legacy pass unless the learner is explicitly grandfathered.
- A path-version bump preserves the learner's position and does not silently mark a new quiz complete.

### 9.3 Project tests

- Every project resolves to a discipline, required artifact set, rubric, and rubric version.
- Every required artifact kind is in the runtime enum; every unknown kind returns `422`.
- AI capstones: no `github_repo` requirement unless the brief explicitly asks for code.
- Rubric weights are positive; the score is normalized against total weight; the `passThreshold` and mandatory criteria are enforced; an `unable` criterion cannot yield a pass.
- Missing evidence, unsupported modality, and mismatched artifact kind each produce the documented failure code.
- Evidence fingerprint changes when artifacts or rubric version change; reuse only occurs for identical evidence + rubric.
- Assessment credit is reserved once per logical request; duplicate requests do not double-consume; failure releases the reservation per the existing credit contract.
- Progression is denied unless the current step is unlocked and the assessment decision is a pass.

### 9.4 Resource tests

- No required resource has only archive evidence.
- No L2 resource satisfies the level-3 verification threshold.
- A resource with `access` other than free/free-with-account cannot be a required primary under the required-primary policy proposed here.
- All 43 blocked stages have no required external primary and no progression dependency on one.
- Duplicate URLs are deduped per stage; cross-stage reuse requires an explicit portion/segment.
- Fresh verification updates level, access, method, timestamp, and evidence together; a partial update is rejected.
- The UI/API can label archive evidence as not current.

### 9.5 Security and authorization tests

- Unauthenticated quiz/project requests return 401.
- Requests without track access return 403.
- Requests before the unlocked step return 409.
- A learner cannot submit for another learner; project/quiz records are scoped by session user.
- Answer keys and provider prompts are not written to logs.
- Assessment credit endpoints remain idempotent under retry/concurrency (existing concurrency tests must still pass).
- No package data is exposed through a public endpoint while the feature flag is off.

### 9.6 End-to-end and regression tests

- Complete one non-AI stage and one AI stage end to end: lesson → quiz → project → progression.
- Attempt a locked stage and verify the server rejects it.
- Reload after pass and verify progress persists.
- Import the same package twice and verify idempotence (no duplicate questions/projects/resources).
- Build all 32 tracks and 186 stages; no missing module, no circular import, no runtime access to the staging module.
- Confirm the 236 pre-existing dirty entries are untouched by the change set (except the intended files).

### 9.7 Performance and payload tests

- Guided-path construction remains bounded; no 8 MB JSON is parsed at request time.
- Public quiz payloads do not grow with the full bank; only the current step's questions are serialized.
- Project assessment payloads reject more than the configured artifact limit (currently 8).
- Staging-module import does not enter the client bundle while the flag is off.

---

## 10. Migration proposal (not executed)

This section is a proposal only. No migration file was created, no database was touched, and no backfill was run. Any migration needs separate approval and a backup/rollback plan.

### 10.1 Quiz attempts

Add `QuizAttempt`:

| Column | Type | Notes |
|---|---|---|
| `id` | `String @id @default(cuid())` | |
| `userId` | `String` | FK to `User`, cascade |
| `trackId` | `String` | |
| `stageId` | `Int` | |
| `pathVersion` | `Int` | Version active at submission |
| `quizVersion` | `String` | Content hash or explicit version |
| `score` | `Int` | 0–100 |
| `passed` | `Boolean` | |
| `correctCount` | `Int` | |
| `totalQuestions` | `Int` | |
| `results` | `Json` | Per-question correctness, not answer keys |
| `createdAt` | `DateTime @default(now())` | |

Indexes: `(userId, trackId, stageId, createdAt)`, `(userId, createdAt)`.

Policy decision required: store raw submitted answers or only correctness? Storing raw answers can retain learner mistakes and may be sensitive; correctness plus question IDs is usually enough for audit. Do not store correct answers in the attempt row.

### 10.2 Quiz versions

Add `StageQuizVersion`:

| Column | Type | Notes |
|---|---|---|
| `id` | `String @id @default(cuid())` | |
| `trackId` | `String` | |
| `stageId` | `Int` | |
| `version` | `String` | Content hash of normalized questions |
| `questionCount` | `Int` | |
| `publishedAt` | `DateTime` | |
| `retiredAt` | `DateTime?` | |

Unique: `(trackId, stageId, version)`.

Progression rule: require a passed attempt for the current published version, or an explicit `grandfatheredAt` marker on the learner's legacy completion. Never infer grandfathering silently.

### 10.3 Resource verification records

Add `ResourceVerificationRecord`:

| Column | Type | Notes |
|---|---|---|
| `id` | `String @id @default(cuid())` | |
| `resourceKey` | `String` | Stable `track:stage:resource` key |
| `url` | `String` | |
| `level` | `Int` | 0–4 |
| `method` | `String` | http/content/playback/manual |
| `access` | `String` | free/free-with-account/paid/unknown |
| `accountRequired` | `Boolean` | |
| `paymentRequired` | `Boolean` | |
| `role` | `String` | required/optional |
| `verificationEra` | `String` | `archive` or `current` |
| `checkedAt` | `DateTime` | |
| `contentHash` | `String?` | |
| `reviewer` | `String?` | |
| `limitations` | `String?` | |

Unique: `(resourceKey, checkedAt)` or a current-row pointer. Keep history; do not overwrite evidence.

### 10.4 Project submissions (optional normalization)

Project submissions currently live in `UserTrackProgress.data`. Normalizing them is not required for the first import, but it would make rubric-version invalidation, evidence reuse, and audit queries cleaner. If pursued later, add `ProjectSubmission` with `userId`, `trackId`, `projectId`, `evidenceFingerprint`, `rubricVersion`, `decision`, `score`, `artifacts` (JSON), `createdAt`, and a unique key on `(userId, trackId, projectId, evidenceFingerprint)`. Do not migrate JSON blobs destructively; dual-write and backfill with verification.

### 10.5 Backfill and rollout rules

- Additive only: new tables and nullable columns; no destructive column drops in the first migration.
- Do not fabricate attempts for historical completions. Mark them `legacy_unversioned` or grandfather them explicitly.
- Preserve `GuidedPathEnrollment.currentStepIndex` and all existing `q:`, `j:`, `r:` keys.
- Dual-write during the pilot; read from the new table behind a flag; fall back to legacy rows.
- Rollback: disable the flag, keep the additive tables, and leave learner data intact.
- Require a staging database rehearsal and a backup before any production migration.

---

## 11. Human and provider limitations

This preflight cannot substitute for the following:

| Limitation | Consequence |
|---|---|
| 0 stage primaries live-reverified | No resource can be called current, free, or unchanged |
| 0 L4 playback checks | No video runtime/segment can be trusted |
| Only 10 live search-result inspections | Most content evidence is archive-derived |
| 3 failed direct fetches (DNS) | Some destinations are unconfirmed, not "dead" |
| 7 × 403 and 1 × 429 in the log | Access may be blocked or rate-limited; needs a fresh session |
| 0 human approvals | No stage, quiz, project, or resource is SME-approved |
| 186 SME review rows open | Every stage still needs a qualified reviewer |
| 930 quiz rows need answer-key review | Questions may be wrong, ambiguous, or off-objective |
| 125 project briefs need discipline review | Evidence formats may not be assessable |
| 60 video rows lack runtime/segment | Video cannot be a required primary |
| No license/attribution fields | Legal review is required before required use |
| No accessibility review | Accessibility is unverified |
| Provider calls not exercised | Project assessment behavior/cost is unproven in this phase |
| No commercial review | Pricing, credits, and entitlements must remain unchanged |

Reviewer coverage needed by discipline: software, data, design, security, video, marketing, management, writing, and no-code. The AI tracks cut across these, so a single "AI reviewer" is not sufficient for AI Design, AI Content, AI Research, and AI YouTube.

---

## 12. Go/no-go gates

| Gate | Question | Exit criteria | Status |
|---|---|---|---|
| G0 | Is the package reconciled to the repo? | 32 tracks, 186 stages, 0 title/ID mismatches, counts re-derived | **Pass** |
| G1 | Is the runtime safe for learners? | P0-1, P0-2, P0-3, P0-4, P0-5 fixed and tested | **Not met** |
| G2 | Are quizzes trustworthy? | 930 questions SME-reviewed; duplicate/leakage issues closed; key policy enforced | **Not met** |
| G3 | Are projects assessable? | 125 contracts; artifact matrix; AI discipline routing; mandatory criteria reconciled | **Not met** |
| G4 | Are resources current? | 143 provisional checked; 43 blocked resolved or kept optional; playback for required video | **Not met** |
| G5 | Is the pilot safe? | Feature flag, canary accounts, no paid exposure, monitoring, rollback tested | **Not met** |
| G6 | Is launch safe? | G1–G5 + legal/accessibility + commercial approval + fresh evidence | **Not met** |

**Current position: G0 pass, G1–G6 not met.** That is why the verdict is a conditional pilot, not a launch.

---

## 13. Explicitly out of scope

- Editing app source, records, commercial gates, entitlements, credits, pricing, or deployment.
- Creating or applying a Prisma migration.
- Backfilling, seeding, resetting, or cleaning any database.
- Re-verifying URLs or videos live.
- Approving resources, quizzes, projects, or stages on behalf of a human reviewer.
- Changing the 236 pre-existing uncommitted entries.
- Committing, pushing, or opening a PR.

---

## 14. Final answer

**Implementation is safe to start only in a narrow, gated sense.** The mechanical reconciliation is clean: the package's 32 tracks, 186 stages, 930 questions, 186 mastery records, 125 projects, 610 candidates, and 584 map rows line up with the repository, and all stage IDs/titles match. That makes a staging import feasible without an identifier-mapping project.

It is **not** safe to import the package into learner-facing paths as-is. The runtime would ignore the package's points/critical flags, disclose answer keys after any submission, keep old quiz passes after a harder quiz is introduced, silently cast unsupported project artifact kinds, and force every AI track into the software default contract (public inspectable source, README, source inspection). The resource layer is archive-only: 143 provisional primaries, 43 blocked stages, zero current live checks, and zero playback checks.

**Recommended start:** B0 guardrails and B1 staging module only, on a branch, behind a flag, with no runtime wiring and no learner exposure. Then fix the P0 runtime contracts, obtain SME review for the first wave, and promote resources only after fresh verification.

**Recommended stop:** do not merge content into live paths, do not enable paid access, and do not claim any stage or resource is verified until G1–G6 are met.
