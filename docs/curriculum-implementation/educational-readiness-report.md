# Educational Readiness Report

Date: 2026-10-22  
Branch: `feat/retention-v3`  
HEAD: `8c1a1154a45c735c3d418b2fa9b8cc7d385a6641`  
Status: **not approved; human review required**

## 1. Executive summary

The curriculum package is structurally complete and runs, but it is not
educationally approved. All 186 stages have authored instruction, practice,
completion criteria, a five-question 100-point knowledge check and a 100-point
mastery rubric. All 120 non-AI and AI-capstone stages that claim a project have
a real project brief, evidence requirements, a 100-point rubric, mandatory
criteria, AI evaluation, feedback and retry.

The remaining blockers are substantive:

- **141 of 186 stages** have a selected external resource that passed a fresh
  public destination, content, free-access and automated relevance check.
- **45 stages** have no suitable required external resource and remain
  optional-only.
- **10 preflight blockers** remain: `ai:3`, `backend:1`, `crypto:8`,
  `crypto:10`, `cyber:4`, `devops:1`, `devops:2`, `nocode:2`,
  `productmgmt:8`, `youtube:2`.
- **66 AI stages** still have synthetic mastery contracts only, not real
  projects. This is a project-coverage gap, not a presentation issue.
- **`ai-youtube` stages 4-9** now have corrected titles, objectives, practice,
  mastery criteria and questions. Stage 5 remains unresolved pending a
  full-coverage visual-production resource; the track is not premium-ready.
- **10 previously counted stages** remain demoted after consistency review
  because their selected page covered a neighbouring topic or only part of the
  named outcome. `crypto:9` and `ai-youtube:9` were re-researched and now have
  broader selected resources.
- No resource has `playback_verified`, `interaction_verified`,
  `human_reviewed` or `approved` set true. No stage or track is premium-ready.

No curriculum rewrite, learner-history rewrite, commit, push, deployment,
production migration, payment, entitlement or customer communication was
performed.

## 2. Current resource state

| State | Count |
|---|---:|
| Canonical tracks / stages | 32 / 186 |
| Package primary verified | 44 |
| Package primary provisional | 103 |
| Package primary blocked | 39 |
| Stages with a selected, freshly checked resource | 141 |
| - selected package primary | 44 |
| - selected verified alternative | 97 |
| Stages without a suitable required resource | 45 |
| Original preflight blockers | 43 |
| - now ready through a verified alternative | 33 |
| - still unresolved | 10 |

`verified` here means automated evidence only: the exact URL was reachable,
the main content was inspected, public access was confirmed, and the page
passed the objective-overlap check. It does **not** mean a human read the whole
resource, checked playback or interaction, verified licensing, or approved the
stage.

The net move from the previous 49 unresolved stages is four fewer: five
original blockers were closed (`crypto:9`, `ai-youtube:4`, `ai-youtube:7`,
`ai-youtube:8`, `ai-youtube:9`), while `ai-youtube:5` was deliberately returned
to unresolved because its old source was an originality policy, not a visual
production resource. `ai-youtube:6` remains ready with the corrected editing
resource.

### Evidence states

| Evidence state | Count / status |
|---|---:|
| `discovered` | 446 unique candidate URLs |
| `destination_verified` | 141 selected resources plus probed/rejected leads |
| `content_inspected` | 141 selected resources, with excerpt/content hash where available |
| `current_free_access_verified` | 141 selected resources; no login or payment required |
| `playback_verified` | 0 |
| `interaction_verified` | 0 |
| `human_reviewed` | 0 |
| `approved` | 0 |

The raw evidence is in
`docs/curriculum-implementation/resource-verification.json` and
`scripts/resource-probe.json`. All 446 unique candidate URLs were probed; zero
remain unprobed.

### Track readiness

| Track | Ready / stages |
|---|---:|
| `ai-agents` | 10/10 |
| `ai-automation` | 8/8 |
| `ai-content` | 5/6 |
| `ai-design` | 7/8 |
| `ai-engineering` | 10/10 |
| `ai-foundations` | 5/6 |
| `ai-research` | 4/5 |
| `ai-software-development` | 8/8 |
| `ai-work` | 5/5 |
| `ai-youtube` | 6/10 |
| `ai` | 1/4 |
| `backend` | 3/5 |
| `crypto` | 9/11 |
| `cyber` | 2/4 |
| `dart` | 3/4 |
| `data` | 3/5 |
| `datascience` | 3/5 |
| `devops` | 2/5 |
| `frontend` | 2/5 |
| `fullstack` | 5/5 |
| `marketing` | 3/4 |
| `mobile` | 2/4 |
| `nocode` | 1/3 |
| `productmgmt` | 6/8 |
| `projectmgmt` | 6/6 |
| `python` | 3/5 |
| `qa` | 3/4 |
| `sonic` | 3/6 |
| `uiux` | 4/5 |
| `video` | 2/4 |
| `writing` | 4/4 |
| `youtube` | 3/4 |

## 3. Research batches and representative selections

The research ledger is
`docs/curriculum-implementation/resource-research-additions.json`. Search
results were treated as leads only; selection required exact-URL probing, full
main-content inspection, free-access confirmation and objective comparison.
The package verifier merges this ledger into the existing package sources.

### A1

Resolved AI-agent, automation, content, design, engineering and software
development stages. Representative selections include:

- OpenAI Agents documentation for agent concepts and tool use.
- n8n documentation for error workflows, webhook credentials, tools, data and
  execution logs.
- Anthropic, "Building effective agents" for bounded workflows and review
  points.
- Nielsen Norman Group for AI evaluation, prototyping and confirmation bias.
- GitHub Copilot best practices and review guidance.

### A2

Resolved `frontend:5`, `fullstack:2`, `fullstack:4`, `crypto:3`, `crypto:5`,
`crypto:11`, `productmgmt:5-7`, `video:2`, `writing:4` and `youtube:3`, among
others. Representative selections include:

- MDN Express/Node introduction (later demoted for `backend:1` because it does
  not teach version control).
- Martin Fowler, "Harness engineering for coding agent users", for human
  ownership and architectural fitness.
- Next.js authentication and Render multi-service architecture.
- GitHub Actions quickstart (later demoted for `devops:2` because it assumes
  version-control knowledge).
- Solidity by Example, ethereum.org DeFi, Dune Data Hub.
- Amplitude North Star/product analytics, SVPG product/engineering.
- Product School portfolio examples (later demoted for `productmgmt:8` because
  interview preparation is not covered).
- UCSD technical-writing portfolio and Buffer YouTube SEO.

### C1

Resolved `ai-engineering:2,4,9,10`, `ai-software-development:1,3,7`,
`ai-content:5`, `ai-work:3,4`, `ai-foundations:4,6`. Representative sources:

- OpenAI model selection, embeddings and production evaluation guidance.
- Azure AI workload operations.
- GitHub Copilot best practices, debugging and AI-code review.
- CMI content measurement, IBM AI project management, NC State "Thinking Still
  Matters", Anthropic "Building effective agents".

### C2

Resolved `projectmgmt:1,3`, `productmgmt:1`, `marketing:3`, `nocode:3`,
`datascience:4`, `mobile:3`, `python:2,5`. Representative sources:

- APM project management, Atlassian Scrum, SVPG product management.
- Google Ads Search campaign setup.
- Zapier workflows quickstart.
- Nielsen neural-networks chapter 1.
- Firebase Flutter codelab.
- Python classes tutorial and OpenAI API quickstart.

### C3

Resolved `frontend:3`, `sonic:1`, `sonic:2`, `uiux:1`. Representative sources:

- MDN React getting started.
- ethereum.org introduction to Ethereum and Sonic overview.
- PALNI Pressbooks basic design principles (hierarchy, Gestalt, colour,
  typography).

### Rejections and blocked leads

These were inspected and rejected or deferred rather than promoted:

- Cornell research-strategy page: too thin for the objective.
- Seeing Theory root: below the content threshold; not a specific lesson.
- SVPG product-thinking/product-strategy URLs: redirect to the home page.
- Zapier old create-Zap URL: redirects to a storage article.
- IxDF visual-hierarchy URL: redirects to a blog page.
- PMI and Real Python: access blocks.
- React.dev: timed out during probing.
- McKinsey: timed out.
- Think with Google: consent-only content.
- OWASP WSTG: redirect without usable content.
- Scrum.org: HTTP 403.
- Adobe Firefly alt-text article: too narrow for the stage.
- DigitalOcean PDF: reachable, but PDF text extraction is unavailable, so it
  cannot be content-inspected by the verifier.

No URL, duration, timestamp, transcript, access condition or outcome was
invented.

## 4. Demotions after consistency review

The following sources were previously counted ready but were returned to
unresolved because the page did not cover the named outcome:

| Stage | Source | Missing outcome |
|---|---|---|
| `backend:1` | MDN Express/Node introduction | Version control (Git). |
| `devops:2` | GitHub Actions quickstart | Version-control fundamentals. |
| `productmgmt:8` | Product School portfolio examples | Interview preparation. |
| `qa:4` | FastAPI testing | Performance, security and CI. |
| `video:4` | W3C media accessibility | Platform-specific formats and audience. |
| `ai:1` | OpenAI prompt-engineering best practices | Choosing tools by capability and limits. |
| `ai-youtube:2` | QUT evaluating AI content | Topic/competitor research. |
| `ai-youtube:3` | QUT evaluating AI content | Script structure and viewer promise. |
| `ai-youtube:5` | YouTube inauthentic-content policy | Visual production, sourcing and rights. |
| `ai-youtube:10` | YouTube monetization policies | Quality controls and improvement loop. |

`crypto:9` and `ai-youtube:9` were re-researched after this table was first
written. `crypto:9` now selects the OWASP Smart Contract Top 10 (2026) and
`ai-youtube:9` now selects the broader YouTube Analytics overview; the narrow
pages that caused the original demotion remain rejected.

The verifier also had a URL-normalisation defect: manual rejection keys were
compared without normalising the URL, so two trailing-slash URLs (`qa:4`,
`video:4`) were selected despite being rejected. That defect is fixed. The
detailed finding is in
`docs/curriculum-implementation/consistency-review.md`.

Residual partial-coverage caveats remain in some AI stages whose selected page
covers part of the objective while the authored lesson carries the rest:
`ai-content:2`, `ai-content:3`, `ai-design:1`, `ai-design:4`,
`ai-foundations:1`, `ai-research:1`, `ai-research:3`, `ai-youtube:4`,
`ai-youtube:6`, `ai-youtube:7` and `ai-youtube:8`. They are counted as
resource-ready only on that basis and must be confirmed or demoted by human
review; they are not approvals. `ai-youtube:5` remains unresolved rather than
using the displaced originality page.

## 5. `ai-youtube` 4-9 content alignment

The package shipped objectives, practice prompts, mastery criteria and some
questions for a displaced sequence. The canonical stage titles and topics were
stable, so the repair restores the objective that belongs to each title rather
than retitling the stages and breaking learner history.

| Stage | Corrected objective |
|---|---|
| 4 | Record, generate and edit clear narration and sound while preserving intelligibility, accessibility and trust. |
| 5 | Use AI and licensed sources to create coherent visuals that support the story without misrepresenting reality. |
| 6 | Assemble an AI-assisted edit that preserves clarity, pacing, captions and factual meaning. |
| 7 | Design honest thumbnails, titles and openings that set a clear promise and earn clicks without misleading. |
| 8 | Publish with accurate metadata, scheduling and promotion that respect platform rules and audience expectations. |
| 9 | Use YouTube Analytics and AI-assisted analysis to diagnose performance and choose one evidence-based experiment. |

The correction is in `stage-alignment-overrides.json` and
`quiz-overrides.json`, applied deterministically by the adapter and verifier.
Stable stage IDs and question IDs are unchanged. Each stage keeps five
20-point questions; the questions, rationales, practice prompts, worked
examples and five 20-point mastery criteria now match the corrected title. A
regression test, `tests/ai-youtube-alignment.test.js`, fails if the displaced
objectives, questions or the old stage-5/8 resources return. Stage 5 remains
unresolved pending a resource that covers B-roll sourcing, AI image generation,
screen recording and rights, not the old originality topic.

## 6. Project coverage audit

| Segment | Stages | Real project mapping | Synthetic mastery only |
|---|---:|---:|---:|
| Non-AI tracks | 110 | 110 | 0 |
| AI tracks, capstone stage | 10 | 10 | 0 |
| AI tracks, other stages | 66 | 0 | 66 |
| **Total** | **186** | **120** | **66** |

The 66 synthetic AI contracts are explicitly excluded from the project count.
They have practice and mastery rubrics, but they do not satisfy the
phase-project requirement. They need real project briefs, authentic
deliverables, evidence types, 100-point rubrics, mandatory gates, AI
evaluation, feedback and retry before they can be counted.

### Phase-boundary audit

The canonical AI tracks have no explicit intermediate phase field. Their stages
form a linear sequence, and the only explicit applied phase boundary is the
capstone stage. The audit therefore finds 10 actual AI phase boundaries, and all
10 have a real project. The 66 stage-level synthetic contracts show that those
stages are not separately gated by a phase project; they are not proof of 66
missing phase projects. Creating one project per stage solely to zero the count
would be the superficial duplication the brief forbids. If curriculum owners
define intermediate phases, each new phase must be authored with a genuine
brief, evidence, 100-point rubric, mandatory gates, AI evaluation, feedback and
retry.

All 110 non-AI stages and the 10 AI capstones have real projects. The project
tests assert required artifacts, 100-point rubric totals, at least one
mandatory criterion and the no-GitHub-fallback rule for non-code disciplines.

## 7. Learner path

The intended path is:

`instruction → required resource → knowledge check → AI mastery → practice or
project → feedback → eligible progression`

What is proven:

- 186 stages have instruction, practice, completion criteria, five 20-point
  questions and a 100-point mastery rubric.
- 141 stages have a selected external resource; 45 are optional-only.
- 120 stages gate on a real project; 66 AI stages use synthetic mastery.
- Quiz answer keys stay private before submission; question IDs, attempt
  versions, idempotency, server-side progression and assessment-credit
  concurrency are covered by the unit, integration and Playwright suites.
- No historical learner progress, quiz attempt, completion or certificate was
  rewritten.

What is not proven:

- No selected resource has verified playback or interactive completion.
- No resource or stage has named human review or approval.
- The 45 unresolved stages do not have a required external resource.
- The 66 AI synthetic stages do not have real project evidence.
- `ai-youtube` stages 4-9 are content-aligned by the authored override, but
  stage 5 is unresolved and the partial-coverage caveats still need human
  review.

## 8. Verification evidence

| Check | Result |
|---|---|
| `npm test` with disposable PostgreSQL | **525 pass, 0 fail, 0 skip** |
| `npm run test:e2e` | **37 pass, 0 fail** on the final two full runs; two earlier runs had isolated flakes that passed alone; assertions unchanged |
| `npm run lint` | 0 warnings, 0 errors |
| `npx prisma validate` | Pass |
| `npm run build` | Pass |
| Targeted curriculum tests | 27 pass, 0 fail (alignment 14 + package 13) |
| Adapter | `validated_needs_human_review`; 32 tracks, 186 stages, 930 quiz rows, 186 mastery records, 125 projects, 10 extras, 0 findings |
| Resource verifier | 186 stages; 44 verified primaries, 141 ready, 97 alternatives, 45 unresolved, 446 URLs all probed |

PostgreSQL tests used the disposable container
`tsh-quiz-verify-20261022b`, database `tsh_verify`, `127.0.0.1:55439`. No
shared or production database was used.

E2E note: the first full run passed 36/37; the completion-refresh test did not
see `Step 2 of` after reload and passed when rerun alone. The second full run
passed 35/37; two journey tests failed to establish the test shell/anonymous
quiz state, and `journeys.spec.ts` passed 6/6 alone. The last two full runs,
including the final run after the last code change, passed 37/37. No assertion
was weakened or skipped.

## 9. Approval and commerce state

- 0 resources `human_reviewed`.
- 0 stages `approved`.
- 0 tracks premium-ready.
- No playback or interaction claims.
- No named human curriculum or resource reviewer.

Commerce gates remained:

```text
COMMERCE_CHECKOUT_ENABLED=false
COMMERCE_ENTITLEMENTS_ENFORCED=false
COMMERCE_PRICES_APPROVED=false
```

Provider test mode was unchanged. No production migration, deployment,
customer communication, payment, refund, subscription or entitlement change
occurred.

## 10. Required next actions

1. Named human review of the corrected `ai-youtube` 4-9 objectives, practice,
   mastery criteria and questions, plus the partial-coverage caveats.
2. Resolve the 10 preflight blockers, starting with a comprehensive
   backend/version-control resource, a CI/CD resource that teaches version
   control, a comprehensive smart-contract auditing resource, and a PM
   portfolio/interview resource.
3. Resolve the remaining 35 non-preflight stages with full-objective resources,
   or keep them optional-only. `ai-youtube:5` is the first visual-production
   priority.
4. Add real projects and evidence for the 66 AI synthetic stages only where
   genuine project briefs exist; do not multiply superficial projects to make
   the count look complete.
5. Human review of the 141 selected resources for accuracy, currency,
   accessibility, licensing and pedagogical fit. The 11 partial-coverage
   caveats must be confirmed or demoted.
6. Verify playback/interaction where a video or interactive resource is
   required.
7. Keep premium approval, launch, pricing and entitlements disabled until the
   above gates are complete.
