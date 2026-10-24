# Curriculum Consistency Review

Date: 2026-10-22  
Branch: `feat/retention-v3`  
HEAD: `8c1a1154a45c735c3d418b2fa9b8cc7d385a6641`

This note records the `ai-youtube` stage 4-9 alignment correction, the
partial-resource demotions made after the no-partial-promotion review, and the
project/phase-coverage audit. The alignment repair restores objectives that
match the canonical titles; it does not rewrite stable stage IDs or learner
history. No learner progress, quiz attempt, completion or certificate was
changed.

## 1. `ai-youtube` stages 4-9 alignment: corrected

The package generated stage 4-9 records with titles and topic lists that did
not match their objectives, worked examples or target outcomes. The mismatch
was systematic: the objectives belonged to a different sequence than the
titles and topics. The canonical titles/topics were stable and matched the
track's stage descriptions, so the repair restored the objective that belongs
to each title instead of retitling stages and breaking learner history.

| Stage | Canonical title | Corrected objective | Practice / mastery evidence |
|---|---|---|---|
| 4 | AI Voice & Audio | Record, generate and edit clear narration and sound while preserving intelligibility, accessibility and trust. | Narration comparison, clean capture, mix, pronunciation and disclosure checks. |
| 5 | AI Visual Production | Use AI and licensed sources to create coherent visuals that support the story without misrepresenting reality. | Storyboard, source/rights record, accurate diagram and accessibility review. |
| 6 | Editing | Assemble an AI-assisted edit that preserves clarity, pacing, captions and factual meaning. | Meaning-preserving review, caption placement, export checks. |
| 7 | Thumbnails & Packaging | Design honest thumbnails, titles and openings that set a clear promise and earn clicks without misleading. | Phone-size legibility, promise alignment and one controlled packaging test. |
| 8 | Publishing | Publish with accurate metadata, scheduling and promotion that respect platform rules and audience expectations. | Metadata/chapters, responsible promotion and live-page verification. |
| 9 | Analytics | Use YouTube Analytics and AI-assisted analysis to diagnose performance and choose one evidence-based experiment. | Impressions/CTR/retention, traffic-source segmentation and causal caution. |

The repair is implemented in
`docs/curriculum-implementation/stage-alignment-overrides.json` and
`docs/curriculum-implementation/quiz-overrides.json`. The adapter and resource
verifier apply it deterministically. Stable stage IDs and question IDs are
unchanged, and each stage keeps five 20-point questions (100 points) plus five
20-point mastery criteria (100 points). Practice prompts, worked examples,
question stems, distractors, rationales and feedback now match the canonical
title. `tests/ai-youtube-alignment.test.js` fails if the displaced objectives,
old question topics or the old stage-5/8 resources return.

Stage 5 remains unresolved for a required resource: the old originality policy
is not a visual-production resource, and no inspected free page yet covers
B-roll sourcing, AI image generation, screen recording and rights together.
The track is therefore still not premium-ready even though the content
alignment defect is closed.

## 2. Partial-resource demotions

These ten stages were previously counted as resource-ready by the automated
selection. On review, the selected page covered only part of the named outcome,
taught a neighbouring topic, or matched a title but not the objective. They have
been returned to the unresolved/optional-only state rather than promoted on a
partial source. The verifier also had a URL-normalisation defect: manual
rejection keys were compared without normalising the URL, so two trailing-slash
URLs were selected despite being rejected. That defect is fixed; `qa:4` and
`video:4` are now unresolved.

| Stage | Objective | Selected/researched page | What the page covers | Missing outcome | Disposition |
|---|---|---|---|---|---|
| `backend:1` | Explain how the web works and run a first backend program with HTTP and version control. | MDN, Express/Node introduction: server-side frameworks, HTTP and routes. | HTTP request/response, Node/Express roles, first server and route. | Version control (Git) is not taught. | Unresolved; package primary remains blocked; candidate retained as unsuitable. |
| `devops:2` | Use version control and build CI/CD pipelines. | GitHub Actions quickstart: workflows, tests and deployment. | Workflow creation, repository trigger, test run, result inspection. | Version-control fundamentals are assumed, not taught. | Unresolved; package primary remains blocked; candidate retained as unsuitable. |
| `productmgmt:8` | Build a credible PM portfolio and interview well. | Product School, PM portfolio tips and ten worked examples. | Portfolio structure, case studies, worked examples, a brief interview reference. | Interview preparation is not taught in enough depth to satisfy the outcome. | Unresolved; package primary remains blocked; candidate retained as unsuitable. |
| `qa:4` | Cover performance, security and CI for test suites. | FastAPI, Testing. | API unit/integration tests and test client usage. | Performance, security and CI are not covered. | Unresolved; manual rejection now enforced. |
| `video:4` | Adapt edits to each platform's format and audience. | W3C, Making Audio and Video Media Accessible. | Accessibility requirements for audio and video. | Platform-specific formats, aspect ratios and audience adaptation are not covered. | Unresolved; manual rejection now enforced. |
| `ai:1` | Choose AI tools based on what they can and cannot do. | OpenAI, Prompt engineering best practices for ChatGPT. | Prompt structure and instruction quality. | Tool selection by capability, modality, cost and limits is not covered. | Unresolved; candidate retained as unsuitable. |
| `ai-youtube:2` | Research topics and competitors to find viewer demand and a differentiated editorial angle. | QUT, Evaluating AI generated content. | Evaluating AI output and source quality. | Topic/competitor research and demand analysis are not covered. | Unresolved; candidate retained as unsuitable. |
| `ai-youtube:3` | Create scripts through research, structure, fact-checking, editing and a clear viewer promise. | QUT, Evaluating AI generated content. | Evaluating AI output and source quality. | Script structure, hooks and viewer-promise design are not covered. | Unresolved; candidate retained as unsuitable. |
| `ai-youtube:5` | Use AI and licensed sources to create coherent visuals that support the story without misrepresenting reality. | YouTube inauthentic-content policy. | Originality and mass-production platform rules. | Visual planning, B-roll, image generation, screen recording and rights are not covered. | Unresolved; the displaced originality page is rejected for this objective. |
| `ai-youtube:10` | Operate an AI-assisted channel with current platform rules, quality controls and a repeatable improvement loop. | YouTube Monetization Policies. | Platform monetization and originality rules. | Quality controls and a repeatable improvement loop are not covered. | Unresolved; candidate retained as unsuitable. |

The automated report now records these stages as `stageReady: false` with no
selected resource. Their candidates remain in the evidence file with the
limitations visible. The verifier's `manualMismatch` entries document the
rejection; this note records the substantive reason.

`crypto:9` and `ai-youtube:9` were re-researched after this table was first
written. `crypto:9` now selects the OWASP Smart Contract Top 10 (2026), which
covers access control, reentrancy, oracle/flash-loan composition and unsafe
external calls; front-running remains a documented limitation carried by the
authored lesson. `ai-youtube:9` now selects the broader YouTube Analytics
overview. `ai-youtube:5` remains unresolved rather than reusing the originality
policy. Stages 4, 6, 7 and 8 have selected pages that cover the core workflow
with partial-coverage caveats recorded in section 3.

## 3. Partial sources retained as ready

These were reviewed and retained because the source covers the named outcome,
even where the publisher is a vendor or consultancy:

| Stage | Source | Why retained | Caveat |
|---|---|---|---|
| `productmgmt:5` | Amplitude, North Star Metric | Defines the metric, its inputs and the choice rule. | Vendor blog; human review still required. |
| `productmgmt:6` | Amplitude, product analytics guide | Covers funnels, cohorts, retention, paths, segmentation and experimentation. | Vendor blog; human review still required. |
| `productmgmt:7` | SVPG, product management vs engineering | Covers the peer relationship, discovery and reducing churn. | Consultancy essay, not a course. |
| `writing:4` | UCSD, technical-writing portfolio | Covers portfolio evidence, breadth and specialisation choices. | Single article; no named human review. |
| `youtube:3` | Buffer, YouTube SEO | Covers packaging, search and performance review. | Vendor blog; platform rules can change. |

No stage in this table is `approved`; readiness means only that a fresh public
destination/content/free-access/relevance check passed.

Residual partial-coverage caveats also remain in `ai-content:2`, `ai-content:3`,
`ai-design:1`, `ai-design:4`, `ai-foundations:1`, `ai-research:1` and
`ai-research:3`, plus `ai-youtube:4`, `ai-youtube:6`, `ai-youtube:7` and
`ai-youtube:8`. Their pages cover a relevant part of the objective while the
authored lesson carries the rest. They are counted ready on that basis only;
human review must confirm or demote them. They are not approvals.

## 4. Project coverage audit

The project catalogue contains 125 package project overrides and 10 generated
AI projects. The runtime maps 120 stages to a real project and 66 AI stages to
a synthetic mastery contract. The synthetic contracts are not projects and are
not counted in project coverage.

### Phase-boundary audit

The canonical curriculum data has no explicit `phase` field for the AI tracks;
the stages form a linear sequence and only the capstone stage is an explicit
applied phase boundary. The other stages carry stage-level practice and mastery
contracts, not separate phase-project gates. The audit therefore finds 10
actual AI phase boundaries (the capstones), and all 10 have a real project.
The 66 synthetic contracts are evidence that those stages are not separately
gated by a phase project; they are not 66 missing phase projects. Adding one
project per stage merely to zero the count would be the superficial duplicate
the brief forbids. If curriculum owners define intermediate phases, each new
phase needs its own brief, evidence, 100-point rubric, mandatory gates, AI
evaluation, feedback and retry before it is counted.

| Segment | Stages | Real project mapping | Synthetic mastery only |
|---|---:|---:|---:|
| Non-AI tracks | 110 | 110 | 0 |
| AI tracks, capstone stage | 10 | 10 | 0 |
| AI tracks, other stages | 66 | 0 | 66 |
| **Total** | **186** | **120** | **66** |

Every mapped project has a brief, required evidence types, a 100-point rubric,
at least one mandatory criterion, AI evaluation, feedback and retry, as
asserted by `tests/stage-project-coverage.test.js` and the curriculum-package
tests. The 66 synthetic AI contracts have authentic stage practice and mastery
rubrics, but they do not satisfy the phase-project requirement. This is a real
unresolved curriculum gap, not a presentation issue.

The 10 real AI capstones are:

| Track | Project | Stage |
|---|---|---|
| `ai-foundations` | Build: AI Workflow Case Study | 6 |
| `ai-work` | Build: Professional AI Workflow Portfolio | 5 |
| `ai-research` | Build: Research Audit & Evidence Map | 5 |
| `ai-content` | Build: Original Content Campaign | 5 |
| `ai-youtube` | Build: YouTube Pilot Series | 10 |
| `ai-software-development` | Build: AI Engineering Audit | 8 |
| `ai-automation` | Build: Production Automation Design | 8 |
| `ai-agents` | Build: Bounded Agent System | 10 |
| `ai-engineering` | Build: Production RAG Evaluation | 10 |
| `ai-design` | Build: AI-Assisted Design Case Study | 8 |

## 5. Learner-path checks

- All 186 stages have an objective, authored instruction, practice, completion
  criteria, five 20-point questions and a 100-point mastery rubric.
- 141 stages have a selected, freshly checked required resource. 45 remain
  optional-only for external resources; their authored teaching is still
  present.
- 120 stages gate on a real project. 66 AI stages use a synthetic mastery
  contract and do not claim a project gate.
- Quiz answers stay private before submission; question IDs, attempt versions,
  idempotency and server-side progression are covered by the unit/integration
  and Playwright suites.
- No resource has `playback_verified`, `interaction_verified`,
  `human_reviewed` or `approved` set true. No stage or track is premium-ready.

## 6. Approval state

This review does not approve any stage. It records the unresolved states so a
named human reviewer can resolve them without rewriting learner history:

- `ai-youtube` 4-9: content alignment corrected; stage 5 remains unresolved
  for a full visual-production resource.
- `backend:1`, `devops:2`, `productmgmt:8`, `qa:4`, `video:4`, `ai:1`,
  `ai-youtube:2`, `ai-youtube:3`, `ai-youtube:5`, `ai-youtube:10`: partial-source
  or mismatch demotions.
- 66 AI stages: synthetic mastery contracts still need real project evidence.
