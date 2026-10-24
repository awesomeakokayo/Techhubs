# TechSkillHub — Commercial Billing Setup (operator guide)

Status: internal. **Checkout and entitlement enforcement are OFF by default.**
This document lists what an operator must configure and confirm before enabling
live billing. No credentials, store ids or variant ids are invented here.

## 1. Canonical model (one catalogue, two providers)

- Internal catalogue: `lib/commercial/plans.ts` (`TRACK_PASS`, `PRO_MONTHLY`,
  `PRO_ANNUAL`; plus the implicit Free tier). Prices: `lib/commercial/pricing.ts`.
- Track Pass term arithmetic (six calendar months, UTC): `lib/commercial/track-pass.ts`.
- Provider capabilities / product mapping: `lib/commercial/providers.ts`.
- Webhook verification + normalization: `lib/commercial/webhooks.ts`.
- Entitlement service (the single source of truth): `lib/commercial/service.ts`.
- Both providers write to the same `Subscription` / `TrackAccess` /
  `PaymentOrder` / `EntitlementEvent` / `TrackPassPurchase` tables. There are no
  per-provider access rules.

## 2. Environment variables (names only — never commit values)

| Variable | Purpose | Default |
| --- | --- | --- |
| `COMMERCE_CHECKOUT_ENABLED` | Master switch for creating checkout sessions | `false` |
| `COMMERCE_ENTITLEMENTS_ENFORCED` | Enforce Premium **track access** (global) | `false` |
| `COMMERCE_ASSESSMENT_ALLOWANCE_ENFORCED` | Enforce the monthly AI-assessment allowance | `true` |
| `COMMERCE_PRICES_APPROVED` | Allow prices to be shown publicly | `false` |
| `COMMERCE_ANNOUNCEMENT` | Set to `false` to hide the in-app announcement | shown |
| `COMMERCE_PREMIUM_TRACK_IDS` | Override the premium track set (validated, comma-separated) | unset → first-wave manifest |
| `COMMERCE_SHADOW_EVAL` | Log proposed access decisions without changing access | `false` |
| `COMMERCE_PILOT_ENABLED` | Gate for the controlled pilot cohort | `false` |
| `COMMERCE_PILOT_USER_IDS` | Explicit pilot members (comma-separated) | unset |
| `COMMERCE_PILOT_PERCENT` | Stable percentage pilot cohort (0–100) | `0` |
| `COMMERCE_ROLLOUT_PHASE` | Pin the rollout phase (0–4) | derived |
| `COMMERCE_TRANSITION_MODE` | `OPEN` / `GRANDFATHERED` / `ENFORCED` | `OPEN` |
| `COMMERCE_GRANDFATHERING_UNTIL` | ISO date until which existing users keep full access | unset (off) |
| `COMMERCE_GRANDFATHERING_CUTOFF` | ISO date; only users created before it are grandfathered | unset |
| `COMMERCE_TRANSITION_GRACE_DAYS` | Extra grace days after the grandfathering deadline | `0` |
| `COMMERCE_TRANSITION_NOTICE_DAYS` | Intended advance-notice window (documentation only) | `0` |
| `LEMONSQUEEZY_API_KEY` | Lemon Squeezy API key (server only) | unset |
| `LEMONSQUEEZY_STORE_ID` | Lemon Squeezy store id | unset |
| `LEMONSQUEEZY_WEBHOOK_SECRET` | Webhook signing secret | unset |
| `LEMONSQUEEZY_VARIANT_TRACK_PASS` | Variant id for the Track Pass product | unset |
| `LEMONSQUEEZY_VARIANT_PRO_MONTHLY` | Variant id for Pro Monthly | unset |
| `LEMONSQUEEZY_VARIANT_PRO_ANNUAL` | Variant id for Pro Annual | unset |
| `PAYSTACK_SECRET_KEY` | Enables the Paystack (Nigeria) branch | unset |

A provider is only considered available when its variables are present. This is
detected as booleans only; secret values are never read into logs or responses.

The premium track set is the tracked first-wave manifest (`frontend`, `backend`,
`python`) — see `docs/premium-first-wave.md`. Setting `COMMERCE_PREMIUM_TRACK_IDS`
overrides it; unknown ids are dropped and block paid checkout via
`premium_allowlist_invalid`, so a bad value can never make an unintended track
premium or accidentally make every track premium.

Staged rollout and the existing-user transition are documented in
`docs/premium-rollout.md`. Assessment-credit accounting is documented in
`docs/assessment-credit-concurrency.md`.

## 3. Lemon Squeezy — activation steps

1. Create and activate a store; complete identity verification (required before
   payouts). See Lemon Squeezy docs: "Activate your store", "Verify your identity".
2. Create three products/variants: Track Pass (one-time), Pro Monthly
   (subscription, monthly), Pro Annual (subscription, yearly). Record the
   **variant ids** and set the corresponding `LEMONSQUEEZY_VARIANT_*` variables.
3. Create an API key → `LEMONSQUEEZY_API_KEY`; record the store id →
   `LEMONSQUEEZY_STORE_ID`.
4. Add a webhook with URL `https://<your-domain>/api/webhooks/lemonsqueezy`,
   choose a signing secret → `LEMONSQUEEZY_WEBHOOK_SECRET`, and subscribe to at
   least: `order_created`, `order_refunded`, `subscription_created`,
   `subscription_updated`, `subscription_cancelled`, `subscription_expired`,
   `subscription_payment_success`, `subscription_payment_failed`.
5. Use **test mode** first; verify a Track Pass and a Pro purchase end-to-end.
6. Confirm the **payout destination** works (bank/PayPal; Nigeria is supported
   for bank payouts) before enabling live billing.

## 4. Paystack — activation steps (Nigeria only)

1. Confirm with Paystack which currencies and settlement the merchant account
   supports. Do **not** assume international card acceptance implies settlement.
2. Set `PAYSTACK_SECRET_KEY`. Configure the webhook URL
   `https://<your-domain>/api/payments/webhook`.
3. Provide approved **NGN** prices in `lib/commercial/pricing.ts` under
   `PROVISIONAL_PRICES.paystack` (none are defined; none should be invented).
4. Confirm the payout/settlement route; then use test mode to verify flows.

## 5. Go-live checklist (all required)

- [ ] Lemon Squeezy store approved and payout destination verified.
- [ ] First premium tracks selected (`COMMERCE_PREMIUM_TRACK_IDS`) and the
      free-to-paid transition/grandfathering policy approved.
- [ ] Approved prices set; `COMMERCE_PRICES_APPROVED=true` only then.
- [ ] Webhooks reachable and signature-verified for both providers.
- [ ] Grandfathering policy approved and configured.
- [ ] `COMMERCE_ENTITLEMENTS_ENFORCED=true` — only after the transition is
      approved. Until then, existing learner access is unchanged.
- [ ] `COMMERCE_CHECKOUT_ENABLED=true` — only after the above.
- [ ] Legal/tax review completed for the jurisdictions served.

## 6. Safety guarantees in the code

- A success-page redirect, query parameter, or client message never grants access.
- Only signature-verified webhooks (or authoritative server verification) do.
- Webhook processing is idempotent (unique `EntitlementEvent.providerEventId`).
- Test-mode events never grant live entitlement.
- Prices/eligible tracks are resolved server-side; the client cannot submit an amount.
- Assessment allowances are finite and enforced server-side when enabled; a
  credit is consumed only when the model produced a usable decision.
- Checkout, entitlement enforcement and price publication all default to OFF.

## 7. Track Pass — six-month, non-recurring model

A Track Pass is a **one-time payment for six calendar months of access to one
selected premium track**. It is not a subscription and never auto-renews.

- **Term arithmetic** (`lib/commercial/track-pass.ts`): the period starts at the
  verified payment instant (provider `paid_at`/order timestamp; server verified
  time if absent) and ends six *calendar* months later, computed in UTC with
  month-end and leap-year clamping (e.g. `2026-08-31 + 6mo = 2027-02-28`,
  `2027-08-31 + 6mo = 2028-02-29`). It is deliberately **not** a 180-day
  approximation and never depends on the browser or server timezone.
- **Grant** (`lib/commercial/service.ts → grantTrackPass`): a verified payment
  writes one `TrackPassPurchase` row (keyed by the unique internal
  `orderReference`, so webhook retries and duplicate deliveries cannot create a
  second period) and upserts the canonical `TrackAccess` row with the real
  expiry. Access is enforced server-side; nothing depends on a client timer.
- **Duplicate protection**: checkout refuses a new Track Pass for a track whose
  pass is still active (HTTP 409 with the current expiry).
- **Repurchase**: once expired, a new verified payment appends a new auditable
  period; access begins at the new successful payment.
- **Expiry retains data**: expiry never deletes or rewrites progress, project
  submissions, checklist completion, achievements or earned certificates. A
  completed track stays completed.
- **Pro interaction**: an active Pro subscription grants all premium tracks
  regardless of a pass; when Pro ends, any still-valid pass is honoured, else the
  learner falls back to Free.
- **Refunds**: a refund revokes only the refunded period; if another valid period
  for the same track remains, that access is preserved.

Premium tracks are the tracked first-wave manifest (`docs/premium-first-wave.md`),
overridable with `COMMERCE_PREMIUM_TRACK_IDS`; selecting them does **not** restrict
anyone while enforcement is off.

Assessment-credit consumption is now recorded through a durable reservation
ledger (`docs/assessment-credit-concurrency.md`) instead of a count-then-act. The
monthly allowance is enforced by default (`COMMERCE_ASSESSMENT_ALLOWANCE_ENFORCED`).

## 8. Migration & rollback

- Track Pass migration: `prisma/migrations/20261014_track_pass_six_months/migration.sql`.
  It is **additive only**: it creates the `TrackPassStatus` enum and the
  `TrackPassPurchase` table (+ indexes and FKs). No existing column, table or
  migration is modified, so legacy `PaymentOrder`, `TrackAccess`, `Subscription`,
  progress and certificate records are untouched and no existing learner access
  changes.
- Assessment-credit migration:
  `prisma/migrations/20261015_assessment_credit_reservation/migration.sql` —
  additive (new `AssessmentReservationStatus` enum, `AssessmentCreditBucket` and
  `AssessmentCreditReservation` tables, indexes and FKs). No existing table is
  altered.
- Apply to a **disposable** database first (`prisma migrate deploy`) — never to a
  shared/production database as part of this work.
- **Legacy vs six-month**: `TrackAccess` rows predate the commercial model and are
  **not** assumed to represent six-month purchases. New periods are recorded in
  `TrackPassPurchase`; a purchase is identified by its unique `orderReference`.
- **Rollback** (Track Pass): `DROP TABLE "TrackPassPurchase"; DROP TYPE "TrackPassStatus";`.
  **Rollback** (assessment credits):
  `DROP TABLE "AssessmentCreditReservation"; DROP TABLE "AssessmentCreditBucket"; DROP TYPE "AssessmentReservationStatus";`.
  Both are safe because nothing else references them. Note that PostgreSQL enum
  values added by the earlier `20261013_commercial_billing` migration
  (`LEMON_SQUEEZY`, `TRACK_PASS`) are effectively permanent and are left in place
  unused if the feature is rolled back.
