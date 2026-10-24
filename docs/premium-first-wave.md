# TechSkillHub — First premium wave

Status: **selected, tracked and tested, but not activated.** Selecting these
tracks does **not** restrict anyone. Access stays open until enforcement is
enabled (`COMMERCE_ENTITLEMENTS_ENFORCED=true` or a server-side pilot cohort),
and paid checkout stays fail-closed in `lib/commercial/launch.ts`. No price is
published by this work.

> **Authoritative quality evaluation moved.** The two independent 0–100 scores
> (curriculum readiness and premium worthiness) and the mandatory quality gates
> are now produced by `scripts/curriculum-quality-audit.mjs` and reported in
> `docs/curriculum-quality-audit.md`. The scores in *this* document are the
> earlier, single-dimension selection rubric and are kept for history.
>
> **No track is approved for premium.** Automated checks measure completeness and
> wiring only; they cannot establish factual correctness or instructional
> quality. A track becomes premium-*approved* only when it is mechanically
> eligible **and** a subject-matter expert has signed it off in
> `docs/curriculum-quality-signoff.json` (enforced by
> `node scripts/curriculum-quality-audit.mjs --check --release`). As of this
> revision no such sign-off exists, so `premiumApproved` is 0 for every track.

---

## 1. Selection method (documented rubric)

Every track in the real catalogue (32 tracks) was scored with a deterministic
script over actual repository data — guided-path steps, embedded project steps,
authored project briefs, authored knowledge-check coverage, portfolio project,
resources and tech stack. **No demand or market claim is made**: none was
available in the repository, and none was invented.

Weights (as required):

| Dimension | Weight | Signals used |
| --- | --- | --- |
| Curriculum completeness and coherent progression | 30% | guided steps, stage count, authored knowledge-check coverage |
| Quality/usefulness of the final portfolio/project outcome | 25% | embedded project steps, authored project briefs, portfolio project |
| Accuracy and readiness of assessments and feedback | 20% | authored knowledge-check coverage, quiz questions per track |
| Quality and usefulness of learning resources | 15% | resource count, tech-stack breadth |
| Ability to communicate a distinctive paid value proposition | 10% | portfolio-grade outcome + authored assessment + depth |

**Readiness gate.** Because the paid proposition is *AI-assessed project
outcomes*, a track must also embed real project work in the guided progression
(≥ 3 embedded project steps) and have at least one authored project brief. Tracks
that fail the gate are deferred regardless of aggregate score — see §4.

## 2. The three first-wave tracks

> Updated with the two-dimension quality audit (see note above). "Mechanical
> eligibility" means both scores >= 90 and every mechanically verifiable gate
> passing; it is **not** an approval.

| # | Track | Canonical id | Verified slug | Old score | Readiness | Worthiness | Gates | Approved |
| --- | --- | --- | --- | --- | ---: | ---: | :---: | :---: |
| 1 | Frontend Development | `frontend` | `frontend-development` | 79.9 | 95.5 | 96.3 | pass | no (awaiting human review) |
| 2 | Backend Development | `backend` | `backend-development` | 78.0 | 95.5 | 96.3 | pass | no (awaiting human review) |
| 3 | Python Development | `python` | `python-development` | 69.4 | 95.5 | 96.3 | pass | no (awaiting human review) |

The same mechanical bar is also met by `uiux`, `qa`, `data`, `cyber`, `mobile`,
`video`, `marketing` and `nocode`. This is a **completeness** result from live
catalogue data, not a quality claim: the readiness/worthiness components that
need human judgement are marked *(review)* in the audit report.

All three are `build`-category tracks, which gives a coherent commercial story
("learn to build real software on TechSkillHub") rather than three unrelated
singles.

### 2.1 Frontend Development (`frontend` / `frontend-development`)

* **Evidence:** 5 stages, 40 guided steps, 6 embedded project steps, 15
  knowledge-check questions with authored coverage for **every** stage (5/5), 4
  authored project briefs, a portfolio final project (`fe-p7`), a stage→project
  map for all 5 stages, and 19 resources. No empty steps.
* **Curriculum:** complete, well-ordered progression from markup/CSS through
  components and state to deployment.
* **Portfolio value:** the strongest set of embedded, individually assessed
  projects in the catalogue.
* **Assessment readiness:** full authored knowledge checks plus multiple authored
  briefs (the richest rubrics).
* **Gaps:** a few briefs fall back to the derived brief; no blocking defect.
* **Suitable because:** it is the most complete, best-assessed, most
  portfolio-focused track and the clearest paid proposition.

### 2.2 Backend Development (`backend` / `backend-development`)

* **Evidence:** 5 stages, 37 guided steps, 5 embedded project steps, 15
  knowledge-check questions, 5/5 authored coverage, 4 authored briefs, portfolio
  project `be-p5`, stage→project map for 4 stages, 17 resources, no empty steps.
* **Gaps:** one stage has no embedded project in the map.
* **Suitable because:** it pairs directly with Frontend to form a credible
  software-engineering wave, with portfolio-grade outcome and full assessment
  coverage.

### 2.3 Python Development (`python` / `python-development`)

* **Evidence:** 5 stages, 29 guided steps, 6 embedded project steps, 15
  knowledge-check questions, 5/5 authored coverage, 2 authored briefs, portfolio
  project `py-p6`, stage→project map for all 5 stages, 8 resources, no empty
  steps.
* **Gaps:** fewer resources and only two authored briefs (the rest use the
  derived brief, which still produces a working rubric).
* **Suitable because:** broad, durable demand as a foundation, full project
  integration and full knowledge-check coverage.

## 3. Configuration (single source of truth)

`lib/commercial/premium.ts` (`PREMIUM_WAVE_1`) is the tracked, documented
manifest — the one source of truth. `premiumTrackIds(env)` in
`lib/commercial/plans.ts` resolves the effective set:

* `COMMERCE_PREMIUM_TRACK_IDS` **unset** → the manifest (`frontend`, `backend`,
  `python`);
* set and non-empty → that operator value, **validated**: unknown ids are dropped;
* set to empty → explicitly no premium tracks.

The result is always validated against the real catalogue, so the allowlist can
never accidentally contain a non-existent id or (absent an explicitly full list)
every track. `launchReadiness` raises `premium_allowlist_invalid` for unknown ids
and `no_premium_tracks_selected` for an empty set, so a bad deployment
configuration blocks paid checkout rather than silently changing what is sold.

## 4. Next-best candidates and why they are deferred

| Track | Score | Why not in wave 1 |
| --- | --- | --- |
| Crypto & Web3 (`crypto`) | 78.7 | High aggregate score (58 steps, 33 quiz questions, 11/11 coverage) but **1 embedded project step and 0 authored briefs** — fails the project-outcome gate. It has 8 catalogue projects but they are not part of the guided progression. Deferred until its projects are embedded and assessed. |
| Data Analysis (`data`) | 67.5 | Solid (5 projects, 5/5 coverage) but only 1 authored brief and fewer resources; a good wave-2 candidate. |
| UI/UX Design (`uiux`) | 66.9 | Same shape as Data Analysis; a good wave-2 candidate and category-breadth option. |
| Full-Stack Development (`fullstack`) | 63.5 | Named as a candidate area, but only 4 embedded projects, 0 authored briefs and fewer resources — not yet at the bar. |
| Cybersecurity (`cyber`) | 60.1 | Named as a candidate area, but 4 stages, 4 projects, 0 authored briefs — not yet at the bar. |
| AI Foundations & Fluency (`ai-foundations`) | — | **Corrected.** It is served by the AI world-class path (`buildAIWorldClassPath`), not the base builder: 6 stages, each with Learn / See / Practice / Verify (graded quiz) / Build. Authored knowledge checks exist for every stage, and every build step is now AI-assessable through the section-mastery contract. It is **not** eligible today because not every stage has a mapped, verified external resource (the resources gate). Do not misrepresent it as premium-ready. |
| Other `ai-*` tracks | — | **Corrected.** All ten `ai-*` tracks use the AI world-class path with per-stage graded quizzes, and all 76 AI build steps are AI-assessable via the section-mastery contract. They are blocked by the resources gate (unmapped stages). |

## 5. Catalogue defects observed (fixed in this revision)

* `lib/tracks.ts` contained two entries with the **same slug** `ai-for-work`
  (`id: "ai"` and `id: "ai-work"`), which made the `ai-work` track unreachable by
  slug. **Fixed:** the `ai-work` track's slug is now `ai-work`, matching its
  roadmap entry. Track ids and all learner records (keyed by id) are untouched.
* `lib/roadmaps.ts` had three broken roadmap-to-track references
  (`ai-research`, `ai-content`, `docker`) whose `trackSlug` values did not resolve.
  **Fixed:** they now point at the real slugs.
* AI build steps with no mapped portfolio project returned HTTP 400 at the
  guided-path route, permanently blocking the learner. **Fixed:** they are now
  assessed through a versioned, objective-anchored section-mastery contract.
  See `docs/curriculum-quality-audit.md` for the remaining content gaps.

## 6. Free-preview boundary

Access is decided per **track**, not per step: a premium track is gated as a
whole when enforcement is on, and the free catalogue (29 tracks) remains free.
Per-stage previews inside a premium track are **not** implemented — that is a
remaining gap for a future wave, listed honestly rather than implied.

While enforcement is off (today), the boundary is entirely open: every learner
keeps every track. The three tracks will show a non-blocking informational
"Premium track" notice on their marketing pages; no checkout button is rendered
while `COMMERCE_CHECKOUT_ENABLED=false`.

## 7. Tests

`tests/commercial-premium.test.js` verifies that the three ids exist in the
canonical catalogue with the documented id/slug/title, have real content (stages,
projects, resources, non-empty guided steps, embedded project steps, authored
knowledge checks for every stage), that the allowlist is validated and fail-safe
(unknown/empty/malformed never makes everything premium), and that the manifest
never includes every track.

The quality work adds: `tests/curriculum-quality.test.js` (two scores + gates,
with intentionally incomplete fixtures proving a failed gate blocks eligibility
even at a high score), `tests/section-mastery.test.js` (section-level AI
verification, rubric versioning, no dead ends), and `tests/catalogue-integrity.test.js`
(unique ids/slugs and resolving roadmap/project/resource references).
