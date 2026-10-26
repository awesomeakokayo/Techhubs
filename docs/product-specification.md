# TechSkillHub — Internal Product Specification (DRAFT, not launch-approved)

**Status:** internal drafting only. This document is a *specification*, not an approval.
Nothing here authorises publishing prices, activating checkout, enforcing entitlements,
sending customer communications, or deploying.

**Canonical source of truth:** the code in `lib/commercial/` *is* the single source of
truth for plan definitions, entitlements, quotas and prices. This document describes
that code; where they disagree, the code wins and this document must be corrected.

| Concern | Canonical code |
| --- | --- |
| Plan identities, tiers, kind, interval, feature bullets | `lib/commercial/plans.ts` |
| Plan prices and per-price approval flags (provider/currency keyed) | `lib/commercial/pricing.ts` |
| Provider → product/variant mapping | `lib/commercial/providers.ts` |
| Entitlement resolution (`hasTrackAccess`, tiers) | `lib/commercial/entitlements.ts` |
| Assessment-credit allowance + atomic reservation | `lib/commercial/assessment-credits.ts` |
| Track Pass (one-time, 3 months) | `lib/commercial/track-pass.ts` |
| Checkout fail-closed gate | `lib/commercial/launch.ts` |
| Existing-learner transition policy | `lib/commercial/transition.ts` |
| Staged rollout / pilot cohorts | `lib/commercial/rollout.ts` |
| Premium track manifest (first wave) | `lib/commercial/premium.ts` + `docs/premium-first-wave.md` |

---

## 1. Products (final names and descriptions)

Internal plan ids are stable and are **not** display text.

| Internal id | Display name | Kind | Interval | Tier granted |
| --- | --- | --- | --- | --- |
| *(none)* | **Free** | — | — | `FREE` |
| `TRACK_PASS` | **Track Pass** | one-time | none | `PASS` |
| `PRO_MONTHLY` | **TechSkillHub Pro — Monthly** | subscription | month | `PRO` |
| `PRO_QUARTERLY` | **TechSkillHub Pro — Quarterly** | subscription | three months | `PRO` |
| `PRO_ANNUAL` | **TechSkillHub Pro — Annual** | subscription | year | `PRO` |

### Product 1 — Free
- Full public catalogue, all public previews, and the free learning experiences that
  remain included (see §4).
- A **defined** monthly AI-assessment allowance of **2** (never unlimited). Configurable
  product rule, not a public figure.
- Restrictions: premium tracks are gated behind Track Pass/Pro **only when entitlement
  enforcement is enabled**; enforcement is currently **OFF**, so every learner retains
  access today. Free learners can always see which tracks are premium before a paywall
  via the track page badges and the pricing page.
- No established free functionality is removed without the approved transition policy
  (§7).

### Product 2 — Track Pass
- **₦6,000** via Paystack for **one** eligible premium track of the learner's choice,
  one-time. The amount is 600,000 kobo (`amountMinor: 600000`).
- **Three calendar months** of access from verified successful payment
  (`lib/commercial/track-pass.ts`).
- The **$9 USD** Lemon Squeezy Track Pass price remains provisional and cannot be charged
  until its individual price approval is changed in code.
- **One-time payment. No automatic renewal.** Nothing is charged when the term ends.
- After expiry, a **new verified purchase** is required to continue premium access to
  that track.
- Progress, submitted work, valid completions, achievements and earned certificates are
  **retained after expiry**.
- A currently valid **Pro** entitlement **overrides** an expired individual pass,
  per the central entitlement policy.
- Included in a pass: the track's lessons, its required resources, its knowledge checks,
  its AI-verified section mastery, its phase projects and their AI assessment, and the
  **30/month** assessment-credit allowance while the pass is valid.

### Product 3 — TechSkillHub Pro Monthly
- **$12 USD/month** (provisional; `amountMinor: 1200`), pending final approval.
- Grants **every** premium track plus the **150/month** Pro assessment allowance.
- Subscription starts on verified successful payment; access continues to the end of the
  paid period and renews monthly unless cancelled.
- Cancellation: available at any time; access continues to the end of the current paid
  period; no further charge.

### Product 4 — TechSkillHub Pro Annual
- **$96 USD/year** (provisional; `amountMinor: 9600`), pending final approval.
- Same core Pro entitlements as monthly (all premium tracks, 150/month allowance),
  billed once per year at a discounted effective monthly price.

> **Pricing approval is per product.** The code-level approved price is ₦6,000 for a
> three-month Track Pass through Paystack. The Lemon Squeezy USD prices remain
> unapproved. The master `COMMERCE_PRICES_APPROVED` flag must remain off until the
> pre-release checks are complete; turning it on does not approve the other prices.

---

## 2. Feature / entitlement comparison

| Capability | Free | Track Pass | Pro (Monthly/Annual) |
| --- | :---: | :---: | :---: |
| Public catalogue, previews, free tracks | ✅ | ✅ | ✅ |
| Premium tracks accessible | ❌ (once enforced) | one chosen track | all premium tracks |
| AI-verified section mastery | ✅ (allowance-bound) | ✅ | ✅ |
| Phase projects + AI project assessment | ✅ where free | ✅ for the chosen track | ✅ |
| Monthly AI-assessment allowance | 20 | 30 | 150 |
| Access term | ongoing | 3 calendar months | monthly / annual, renews |
| Auto-renewal | — | **none** | yes (until cancelled) |
| Progress / submissions / certificates kept after expiry | ✅ | ✅ | ✅ |
| Certificate eligibility | guided completion only | guided completion only | guided completion only |

**Assessment quotas and reset periods:** the allowance is **per calendar month**, reset on
the monthly boundary, and is reserved **atomically** before each billable model call so
concurrent requests cannot exceed it (`docs/assessment-credit-concurrency.md`). The
allowance is enforced by default (`COMMERCE_ASSESSMENT_ALLOWANCE_ENFORCED`).

**Which verified tracks are included:** the first premium wave is **`frontend`,
`backend`, `python`** (`PREMIUM_WAVE_1`), selected against the documented readiness rubric
on real catalogue data. Selecting them does **not** restrict anyone while enforcement is
off. Every other track stays in the Free catalogue.

---

## 3. Cancellation, expiry, refund and dispute behaviour

- **Cancellation:** self-serve; access continues to the end of the paid period.
- **Expiry (Track Pass):** access to that track ends at the term end; learner data is
  retained; a new purchase is required to continue.
- **Refunds / disputes:** policy wording is **pending** owner/legal approval. Provider
  (Lemon Squeezy / Paystack) refund tooling exists at the provider level; no TechSkillHub
  customer-facing refund policy is approved. **No refunds have been processed or
  promised.**
- **Failed / disputed payments:** handled by the provider; entitlement is derived from
  verified payment state, not from client input.

---

## 4. Preview boundaries and learner-facing disclosures

- Learners can identify a premium track **before** a paywall (track badge + pricing page).
- Free preview content per premium track is recorded in `PREMIUM_WAVE_1[].freePreview`.
- Prices are **hidden** while `COMMERCE_PRICES_APPROVED` is not `true`.
- No checkout button may become active from this document alone: checkout remains
  fail-closed (`lib/commercial/launch.ts`).
- Required disclosures before launch: price + currency, billing interval, renewal terms,
  cancellation method, refund policy, and what is retained after expiry.

---

## 5. Pricing approval status

| Product / provider | Price in code | Price approval |
| --- | --- | --- |
| Nigerian Track Pass / Paystack | ₦6,000 (600,000 kobo), one-time / three calendar months | Individually approved in code; not yet sandbox-verified or published |
| International Track Pass / Lemon Squeezy | $9.00 USD (900) | **NOT approved** |
| Pro Monthly / Lemon Squeezy | $12.00 USD (1200) | **NOT approved** |
| Pro Annual / Lemon Squeezy | $96.00 USD (9600) | **NOT approved** |
| Pro plans / Paystack NGN | — | Not configured; no price invented |

The global publication/checkout gate `COMMERCE_PRICES_APPROVED` remains **false**, so
the price is still hidden. Pricing version stamp:
`TSH-COMMERCE-2026-10-TRACKPASS-3M-NGN6000`.

---

## 6. Provider product/variant mappings

| Provider | Plan | Config key | Verified? |
| --- | --- | --- | --- |
| Lemon Squeezy | Track Pass | `LEMONSQUEEZY_VARIANT_TRACK_PASS` | **No** (no sandbox verification) |
| Lemon Squeezy | Pro Monthly | `LEMONSQUEEZY_VARIANT_PRO_MONTHLY` | **No** |
| Lemon Squeezy | Pro Annual | `LEMONSQUEEZY_VARIANT_PRO_ANNUAL` | **No** |
| Paystack | Track Pass only | `PAYSTACK_SECRET_KEY` (no provider product ID) | **Not sandbox-verified** (merchant/payout still to confirm) |

Provider *capabilities* are modelled in `lib/commercial/providers.ts` and only read whether
configuration is present (booleans) — never secret values. **No provider sandbox
transaction or payout setup has been verified.**

---

## 7. Grandfathering and existing-learner transition

Policy is implemented and pure/dry-runnable in `lib/commercial/transition.ts`:

- While enforcement is off, mode is **`OPEN`** → **everyone is retained**.
- A learner in the legacy cohort, or with **any** recorded activity, legacy access
  record, submission, completion or certificate, is **retained**.
- An **ambiguous** legacy account (no activity but created before the cutoff) is retained
  and reported as `uncertain` — **never silently revoked**.
- Only an unambiguously post-cutover learner with **no** recorded activity is a candidate
  for normal Free/premium rules.
- A staged rollout (phases 0–4) with deterministic pilot cohorts and shadow evaluation
  that never denies access (`docs/premium-rollout.md`).

**Existing-user impact analysis:** the dry-run tooling is
`scripts/transition-dry-run.mjs`. **No production/learner data is available or used
here**, so no cohort counts are asserted; the decision to enforce must be made with real
data on a snapshot, not from this document.

---

## 8. Support and recovery scenarios

| Scenario | Expected behaviour |
| --- | --- |
| Successful payment, delayed webhook | Entitlement derived from verified provider state; idempotent webhook handling |
| Duplicate webhook / retry | Idempotent; no duplicate credit or access grant |
| Assessment-credit exhaustion | Reserved atomically; request is refused cleanly, not silently charged |
| Track Pass expiry | Access ends; data retained; re-purchase to continue |
| Pro expiry/cancellation | Continues to period end, then reverts to Free rules |
| Path version change mid-course | Position + completed work preserved via the continuity remap (§ see continuity report) |
| Lost response during a step | Client reconciles to server-saved progress; no double advance |

---

## 9. Outstanding financial, legal and operational requirements

1. **Price approval** for all four products (currently none approved).
2. **NGN pricing** calculated and approved (none exist).
3. **Provider sandbox verification** end-to-end (order → webhook → entitlement) for
   Lemon Squeezy and Paystack.
4. **Merchant payout / settlement readiness** confirmation.
5. **Refund/dispute policy** wording, approved by owner/legal.
6. **Rate limiting** credentials (Upstash/Vercel KV) — see `docs/LAUNCH_READINESS.md`.
7. **Live migration-history recovery** — approval-gated (§3 of LAUNCH_READINESS).
8. **Google OAuth production verification**.
9. **Human curriculum sign-off** for premium tracks. The canonical record is
   `docs/curriculum-quality-signoff.json` (absent until a genuine reviewer signs);
   a fill-in skeleton is provided at `docs/curriculum-quality-signoff.template.json`.
10. **Customer-facing notices** and a defined notice period before enforcement.
11. **Explicit release authorisation.**

None of the above is satisfied by this document. Completing this document was **not**
treated as a launch approval.

---

## 10. Reconciliation with the canonical code (verified)

This document and the code were re-checked line by line. The canonical source of
truth is `lib/commercial/*`; where this document and the code could disagree, the
code wins and the document was corrected.

| Spec claim | Canonical source | Verified |
| --- | --- | --- |
| Track Pass is one-time, 3 **calendar** months, no auto-renewal | `lib/commercial/plans.ts` (`PLANS.TRACK_PASS`: `kind:'ONE_TIME'`), `lib/commercial/track-pass.ts` (`TRACK_PASS_TERM_MONTHS = 3`, UTC, month-end/leap-year clamped) | ✅ |
| Track Pass grants exactly one premium track | `plans.ts` (`grantsTrackCount: 1`) | ✅ |
| Pro grants every premium track | `plans.ts` (`grantsAllPremiumTracks: true`) | ✅ |
| Allowances are finite: Free 2 / Pass 30 / Pro 150 per **UTC calendar month** | `plans.ts` (`allowanceForTier`), `lib/commercial/entitlements.ts` (`monthBounds`) | ✅ |
| Allowance is server-enforced, race-safe, idempotent | `lib/commercial/assessment-credits.ts` (`SELECT … FOR UPDATE` bucket per (user, month); unique (userId, requestId) idempotency; TTL reservations) | ✅ |
| Allowance enforcement is ON by default (cost control) unless explicitly `false` | `lib/commercial/providers.ts` (`assessmentAllowanceEnforced`) | ✅ |
| Access starts at the **verified-payment** instant, not at order creation | `service.ts` (entitlement from verified webhook state) | ✅ |
| Cancellation continues to period end; past-due gets a grace to period end | `entitlements.ts` (PAST_DUE/CANCELLED grant until `currentPeriodEnd`) | ✅ |
| Progress/completions/submissions/achievements/certificates are retained after expiry | `transition.ts` + `docs/learner-continuity.md` (retention on any recorded activity) | ✅ |
| USD prices 900 / 1200 / 9600 remain provisional; NGN Track Pass is ₦6,000; NGN Pro plans are undefined | `lib/commercial/pricing.ts` (`PRICE_CATALOGUE`; only Paystack Track Pass individually approved) | ✅ |
| Premium wave = frontend, backend, python | `lib/commercial/premium.ts` (`PREMIUM_WAVE_1`, `PREMIUM_TRACK_IDS`) | ✅ |
| Checkout is fail-closed behind `launch.ts` | `lib/commercial/launch.ts`, `app/api/billing/checkout/route.ts` | ✅ |

One code gap found during reconciliation and **fixed**: the Lemon Squeezy checkout
builder could only produce **live** checkouts (`test_mode: false` hard-coded), which
makes a genuine sandbox run impossible. It is now config-gated
(`COMMERCE_PROVIDER_TEST_MODE`, default `false`) via `providerTestMode()`; test-mode
deliveries still never grant entitlement. See `docs/provider-sandbox-test-matrix.md`.

## 11. Draft approval checklists (status: PENDING — full product launch is not approved)

These checklists remain **not approved for launch**. The Nigerian Track Pass amount is individually approved in code, but price publication, payment fulfilment, settlement, policy and deployment checks remain open. Approval must be recorded by a named human owner; this document does not enable checkout.

**A. Product descriptions**
- [ ] Track Pass description ("three months, one track, no auto-renewal") approved.
- [ ] Pro Monthly / Pro Annual descriptions approved.
- [ ] Free-tier description ("no credit card") approved.
- [ ] No copy implies lifetime access, auto-renewal or a price while prices are hidden.

**B. Prices**
- [ ] USD 900 / 1200 / 9600 approved (or replaced with owner values).
- [ ] NGN values supplied **by the owner** and approved (none inferred/computed).
- [ ] Currency + tax display rules approved per market.

**C. Track eligibility**
- [ ] Each premium track has a genuine human sign-off (see §9 item 9).
- [ ] The premium allowlist (`PREMIUM_TRACK_IDS` / `COMMERCE_PREMIUM_TRACK_IDS`) approved.
- [ ] A track may not be sold merely because its mechanical score passes.

**D. Customer disclosures**
- [ ] Price, currency, billing interval and renewal terms.
- [ ] Cancellation method and effect.
- [ ] Refund/credit policy wording.
- [ ] What is retained after expiry (progress, submissions, certificates).
- [ ] That no track is charged without explicit purchase.

**E. Cancellation / refund policy**
- [ ] Cancellation path (self-serve) and the "access to period end" rule approved.
- [ ] Refund window and process approved.
- [ ] Dispute/chargeback handling approved.

**F. Support scenarios**
- [ ] Delayed/duplicate webhook, credit exhaustion, expiry, repurchase, failed payment.
- [ ] Learner-facing copy for each scenario approved.
- [ ] Escalation path for entitlement disputes approved.

## 12. Approval status summary

| Item | Status |
| --- | --- |
| Product definitions consistent (code ↔ docs) | ✅ Consistent |
| Prices | ⚠️ Partial: NGN Track Pass individually approved in code; master publish gate off and USD prices unapproved |
| NGN prices | ✅ ₦6,000 Track Pass entry in code; Pro plan prices remain undefined |
| Track eligibility / human sign-off | ❌ 0 of 32 approved |
| Customer disclosures | ❌ Draft pending |
| Cancellation / refund policy | ❌ Draft pending |
| Provider sandbox verification | ❌ Not performed |
| Merchant payout readiness | ❌ Not verified |
| Checkout / entitlements / prices flags | ✅ All safe (`false`) |
