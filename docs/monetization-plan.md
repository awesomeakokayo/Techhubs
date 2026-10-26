# TechSkillHUB — Monetization Plan (Free vs Pro)

Status: **final NGN pricing is coded; paid checkout remains disabled pending provider verification and release approval.** The prices are recorded in the canonical commercial catalogue. The Founding Learner offer is date-gated and stays inactive until valid Africa/Lagos timestamps are configured. Pro recurring checkout remains blocked until real Paystack plan codes are configured and verified against amount, currency and interval.

Evidence basis: inspection of the working tree on `feat/retention-v3`
(32 tracks, 180 roadmap stages, 271 resources, 114 projects; guided paths are
`concept` + `resource` + authored `practice` + `quiz` + `project` steps). Every
statement marked **[confirmed]** is verifiable in code; **[estimate]** and
**[proposal]** are labelled.

---

## 1. What TechSkillHUB actually is today

- A free, open-source (MIT) learning platform for African learners and beyond.
- Guided paths with progressive unlocks, server-validated knowledge checks, and
  AI-assisted project verification gated behind a real submission pipeline.
- Learner accounts (Google sign-in), progress persistence, checklists,
  portfolios, certificates on guided-path completion.
- **No payment gates anything.** `hasTrackAccess()` always returns `true`
  (`lib/access.ts:25`). `/upgrade` redirects to `/tracks`; no UI calls the
  checkout endpoint. **[confirmed]**

Monetization therefore means *adding* a sustainable Pro layer **without** removing
the free mission, and **without** turning the existing free experience into a paywall.

## 2. Guiding principles

1. **Never move an existing free capability behind a paywall retroactively.** A
   learner who started a path advertised as free must be able to finish it.
2. **Free must remain genuinely useful** — a complete, certifiable path.
3. **Pro sells capacity and depth, not competence.** Payment must not be a
   substitute for demonstrated skill, and certificates must not overstate what a
   learner has achieved.
4. **The main variable operating cost is AI project assessment.** Pro is priced
   to cover that cost plus a margin, with abuse controls.
5. **Nothing is enabled until settlement (see `payment-provider-readiness.md`) and
   policy are approved.**

---

## 3. Entitlement matrix

Legend for the five required categories:
**P** = Public (no account) · **F** = Free with account ·
**A** = Free with a defined usage allowance · **Pro** = Pro subscription ·
**N** = Not yet ready for monetization.

### 3.1 Learn & explore

| Feature | Category | Notes |
| --- | --- | --- |
| Homepage, `/start`, `/start-here`, `/about`, `/contact` | P | Marketing/onboarding |
| `/tracks`, `/tracks/[slug]` catalogue (roadmap topics, curated resource links, project list, career info) | P | Public catalogue metadata; intended for SEO |
| `/roadmaps`, `/paths`, `/resources`, `/guides`, `/careers`, `/ai`, `/ai-guide`, `/projects` | P | Public educational content |
| `/submit-help` + guides | P | Deliberately public how-to guides |
| `/find-your-path`, `/start` quiz | P | Pure client-side recommendation |
| Search (client-side index) | P | Public data only |

### 3.2 Core learning (account required)

| Feature | Category | Notes |
| --- | --- | --- |
| Enrol in any guided path (stage lessons, practice, knowledge checks, project steps) | F | All 32 tracks; **no allowance**; must never be reduced |
| Progress persistence, resume, streaks/goals, weekly plan, dashboard, analytics, achievements | F | |
| Checklists and portfolio-readiness view | F | |
| Certificate of completion (guided path completed) | F | Free for all completed paths |
| Knowledge-check retries | F | Ungraded cost; unlimited |
| **AI-assisted project verification (assessment credits)** | A | Costly per call — see §4 |
| Advanced / supplementary lesson depth ("deep dives") for authored tracks | Pro | **[proposal]** new content only; existing lessons stay free |
| Advanced AI tracks' extra practice & capstone review capacity | Pro | Consumes assessment credits |

### 3.3 AI assessment allowance (the priced resource)

| Tier | Suggested monthly allowance | Rationale |
| --- | --- | --- |
| Free | **2 assessments/month** | Small entry allowance; exact usage is shown inside the authenticated app. Free roadmaps, resources, projects, career guides and existing progress stay available after exhaustion. **[approved]** |
| Pro | **150 assessments/month** | Finite monthly capacity for multiple tracks and portfolio iteration. **[approved catalogue]** |

**Allowance policy:** Free accounts receive two server-enforced AI project assessments per UTC calendar month. The exact remaining allowance is shown in the authenticated dashboard and guided learning experience. Exhausting it must not remove access to free roadmaps, resources, projects, career guides, recorded progress, submissions or earned certificates. A project assessment already in flight is not stopped mid-request; a completed final assessment can be followed by a respectful Pro upgrade prompt. Identical evidence reuse and deterministic pre-checks remain non-billable.

### 3.4 Certificates and achievements

| Item | Category | Rule |
| --- | --- | --- |
| Course-completion certificate | F | Free; must reflect only completed guided work |
| Verifiable/portfolio certificate enhancements | Pro / N | **Not ready.** Do not price certificates such that they imply a higher level of verified competence than was actually demonstrated. Any "verified" wording needs a defensible verification method first. |

### 3.5 Explicitly "not yet ready for monetization" (N)

- Paystack live transaction path — sandbox webhook fulfilment and release gates remain unverified.
- Email reminders / lifecycle messaging — no sender is implemented for learner
  notifications (only `/api/contact` sends mail). **[confirmed]**
- Any gating of content that is currently free.
- Any "Pro-only certificate" or ranking that misrepresents competence.
- Advanced portfolio review by a human — no human-review process exists.

> **Update (2026-10 wave).** The premium *track* set has since been selected with a
> documented rubric: `frontend`, `backend`, `python` (see
> `docs/premium-first-wave.md`). Selecting them restricts nobody while enforcement
> is off. The metered resource itself is now race-safe and enforced by default:
> see `docs/assessment-credit-concurrency.md`, and `docs/premium-rollout.md` for
> the staged rollout and legacy-user transition controls.

---

## 4. Why the AI assessment is the thing to meter

Project verification calls a paid model (`deepseek-flash`) after retrieving real
artifact evidence (up to ~52,000 characters of README/source/README/page text per
submission; `lib/project-verification/prompt.ts:56`). This is the platform's only
material variable cost. Full unit economics are in
`docs/assessment-economics.md`; the summary:

| | Off-peak | Peak |
| --- | --- | --- |
| Typical assessment | ≈ $0.003–$0.004 | ≈ $0.006–$0.008 |
| Worst-case (full input + 3k output) | ≈ $0.004 | ≈ $0.008 |

Existing controls already reduce spend: deterministic pre-checks (no model call),
pass-reuse for identical evidence (`isReusablePass`), at-most-one retry for
malformed JSON, and a DB-backed budget (20/user/hour, 500 global/hour).

---

## 5. Approved pricing (campaign launch model)

The canonical source of truth is `lib/commercial/plans.ts` and
`lib/commercial/pricing.ts`. Nigerian pricing is in NGN; international USD
values remain provisional and must not be inferred from these figures.

| Plan | Price | Access |
| --- | ---: | --- |
| Free | ₦0 | Free learning resources, progress features and two monthly AI assessments |
| Single Guided Path Pass | ₦6,000 one-time | One selected premium guided path for three calendar months; no auto-renewal |
| Founding Learner Offer | ₦3,000 one-time during the configured sale window | Same three-month, single-path access; 50% off the ₦6,000 regular price |
| Pro Monthly | ₦4,500/month | All included premium guided paths; recurring monthly billing |
| Pro Quarterly | ₦11,000 per three months | All included premium guided paths; recurring quarterly billing |
| Pro Annual | ₦36,000/year | All included premium guided paths; recurring annual billing |

Quarterly is the launch recommendation (approximately 18.5% below three monthly payments); annual is best long-term value (approximately 33.3% below twelve monthly payments). Pro assessment capacity is finite (150 per UTC calendar month), not unlimited.

The promotion is a fixed 14-day sale after a seven-day warm-up, part of a 21-day campaign. Its start and end instants must be explicitly set using Africa/Lagos time with an offset (for example `+01:00`). No default dates or per-visitor timer resets are permitted. The server uses the saved order amount to honour a checkout created before the deadline; new orders created after expiry use the regular ₦6,000 price. See `docs/pricing-launch-campaign.md` for environment configuration, verification gates and analytics definitions.

Pro recurring payments must remain unavailable until the owner configures three Paystack plan codes and checkout verifies each provider plan's amount, NGN currency and interval before creating the transaction. The global commerce gates and provider sandbox check still determine launch readiness.

---

## 6. How Pro adds value without faking competence

- **Capacity:** more AI assessments and reassessments (the true cost driver).
- **Depth:** new advanced lesson material and extended project briefs (authored
  content), not the answers to existing checks.
- **Portfolio:** extra portfolio-project assessment attempts and richer
  readiness/export tooling.
- **Never:** unlock a certificate without completing the work, skip knowledge
  checks, or grant a badge that implies verified skill that was not verified.

---

## 7. Transition policy (proposal)

1. **Grandfather existing learners** for at least one full billing cycle of any
   path they have already started, or until they finish it. Existing
   `Subscription`/`TrackAccess` rows and the grandfathered flag already exist in
   the schema and UI to support this. **[confirmed: mechanism exists]**
2. No learner is switched to a reduced state while pricing/transition policy is
   undecided. **[confirmed: nothing is enforced today]**
3. Free allowance applies going forward; nothing already completed is lost.

---

## 8. Risks and non-goals

- **Do not** launch billing before the merchant/payout route is confirmed.
- **Do not** use serverless in-memory counters for abuse control.
- **Do not** rely on `robots.txt` or client-side badges for access control.
- **Do not** price "certificates" as a competence signal that isn't verified.

## 9. Approvals required before any rollout

- [ ] Product owner approves the entitlement matrix and free allowance.
- [ ] Settlement route confirmed (payment-readiness doc) and pricing approved.
- [ ] Grandfathering policy and effective date approved.
- [ ] Communications plan approved (launch-communications doc).
- [ ] Entitlement architecture implemented and tested (entitlement-architecture doc).
