# TechSkillHUB — Monetization Plan (Free vs Pro)

Status: **billing remains inactive; release approval is pending.** The Nigerian
Track Pass price of ₦6,000 was previously reviewed for a three-calendar-month term; the term now varies by track and requires commercial re-review before publication or checkout is enabled. The global commerce flags remain off.
the code catalogue, but it is not published or chargeable while the global gates
remain off and provider/database checks are incomplete. The international USD
prices, assessment allowances, transition dates and remaining launch policies below
remain proposals unless explicitly marked otherwise.

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
4. **The only meaningful recurring cost is AI project assessment.** Pro is priced
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
| Free | **20 assessments/month** | Enough to complete **any single base track** (max 6 mandatory project steps: `frontend`, `python`) with retries and repeated attempts, plus headroom. **[estimate]** |
| Pro | **150 assessments/month** | Multiple tracks in parallel + portfolio iteration. **[proposal]** |

**Mandatory-activity guarantee (required):** every path advertised as fully free
and assessed must include enough free credits to complete all its mandatory
assessments. The base tracks require at most **6** project assessments (measured:
`frontend` 6, `python` 6, `backend` 5, `uiux` 5, `data` 5; 73 project steps
across 32 tracks). A free allowance of 20/month therefore completes any single
path even with several retries. Retries against *identical* evidence reuse the
prior result without spending a credit, and deterministic rejections (missing
artifact, invalid URL, short explanation) cost nothing because they never reach
the model. **[confirmed for measurement; estimate for the allowance]**

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
`docs/product/assessment-economics.md`; the summary:

| | Off-peak | Peak |
| --- | --- | --- |
| Typical assessment | ≈ $0.003–$0.004 | ≈ $0.006–$0.008 |
| Worst-case (full input + 3k output) | ≈ $0.004 | ≈ $0.008 |

Existing controls already reduce spend: deterministic pre-checks (no model call),
pass-reuse for identical evidence (`isReusablePass`), at-most-one retry for
malformed JSON, and a DB-backed budget (20/user/hour, 500 global/hour).

---

## 5. Proposed pricing (recommendation — not approved)

The code already contains a region-split price table (`lib/pricing.ts`,
`PRICING_VERSION 'TSH-PRO-2026-08'`) for Nigeria (NGN) and international (USD).
Those figures are **legacy internal values, not approved**. For planning only:

| Tier | Nigeria (NGN) | International (USD) |
| --- | --- | --- |
| Monthly | ₦2,450 *(legacy value)* | $4.99 *(legacy value)* |
| 3 months | ₦5,145 *(legacy value)* | $9.99 *(legacy value)* |
| Yearly | ₦14,700 *(legacy value)* | $29.99 *(legacy value)* |

> **Update — canonical commercial model.** The single source of truth is
> `lib/commercial/plans.ts` / `lib/commercial/pricing.ts`. The approved Nigerian
> Track Pass is a one-time **₦6,000 Paystack payment** with a **track-specific calendar-month term** (currently Frontend 6, Backend 8, Python 5 months). The amount is unchanged, but the previous approval applied to the old three-month term; do not enable checkout or price publication until the changed offer is reviewed.
> of access to one selected premium track. It does not renew automatically; expiry
> is calculated server-side from the verified payment instant. Pro Monthly ($12)
> and Pro Annual ($96) remain provisional, unapproved subscription prices for the
> international Lemon Squeezy path. The legacy table above is retained only as
> historical context. Price publication and checkout remain disabled until all
> release gates and sandbox tests pass.

At the typical assessment cost, a Pro user at the 150/month cap costs roughly
**$0.45–$1.20/month**, leaving healthy margin at $4.99 — **but this is only valid
if a payout/settlement route exists** (see payment-readiness doc). Do not publish
these numbers until pricing and settlement are approved.

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
