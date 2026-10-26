# TechSkillHub — Payment Provider & Settlement Readiness

**Current code decision (2026-10-26):** the approved Nigerian catalogue includes a one-time
Single Guided Path Pass at **₦6,000 for three calendar months**, Pro Monthly at **₦4,500**,
Pro Quarterly at **₦11,000 per three months**, and Pro Annual at **₦36,000**. The Founding
Learner Offer may reduce the single-path pass to **₦3,000 for a centrally configured 14-day
sale window**. The sale remains inactive until real Africa/Lagos timestamps are supplied.
Lemon Squeezy USD prices remain provisional. This document does not mean any provider has
passed a live or sandbox transaction test.

The owner reports that Paystack credentials have already been added to Vercel. The
secret values were not read, printed, changed, or copied into this repository.

## 1. What the code does

- **Nigeria / Track Pass:** /pricing uses Vercel's x-vercel-ip-country header to
  prefer Paystack when the visitor country is NG. The server resolves the amount
  from lib/commercial/pricing.ts; the client cannot supply an amount or currency.
- **Price:** 600000 minor units = 6,000 naira (kobo are used for Paystack's API).
  The verified successful payment starts a three-calendar-month period, calculated
  in UTC by lib/commercial/track-pass.ts. Expiry is stored as a timestamp on
  TrackPassPurchase; no schema column is needed just to change the duration.
- **One-time access:** a Track Pass does not renew automatically. Only the
  signature-verified webhook and canonical billing service may grant access.
  Browser redirects never grant entitlements.
- **Pro subscriptions in Nigeria:** price entries are approved, but new recurring checkout remains
  blocked until each `PAYSTACK_PLAN_CODE_PRO_*` points at an actual Paystack plan that matches
  the catalogue amount, NGN currency and interval. Both `COMMERCE_PAYSTACK_PRO_SUBSCRIPTIONS_ENABLED`
  and `COMMERCE_PAYSTACK_PRO_SUBSCRIPTIONS_VERIFIED` default to false. The verified flag is set
  only after the recurring sandbox lifecycle checks pass; checkout rechecks the live plan before creating an order.
- **International pricing:** Lemon Squeezy entries remain provisional and cannot be charged just
  because the global publication flag is enabled.
- **Safety gates:** COMMERCE_CHECKOUT_ENABLED, COMMERCE_PRICES_APPROVED, and
  COMMERCE_ENTITLEMENTS_ENFORCED still control checkout. The per-price approval
  flag is an additional gate; it is not replaced by the global flag.

## 2. Provider configuration and test requirements

| Check | Current evidence |
| --- | --- |
| Paystack server-side integration | Implemented in /api/billing/checkout and /api/payments/webhook |
| Paystack key stored in Vercel | Owner reports it is already configured; not inspected by this review |
| Approved NGN price catalogue | ₦6,000 pass; ₦4,500 monthly; ₦11,000 quarterly; ₦36,000 annual |
| Paystack Pro plan codes and interval matching | Guarded in code; real plan codes/sandbox still required |
| Paystack test-mode checkout | Not verified in this review |
| Signature-verified webhook fulfilment | Implemented in code; live delivery and replay/idempotency remain to be tested |
| Production payment and refund | Not tested |
| Existing-user access transition | Enforcement and transition gates remain approval-gated |
| Neon migration history | Recovery remains pending; see docs/database/NEON_MIGRATION_GUIDE.md |

Before enabling live checkout, run a test-mode transaction in an isolated/approved
environment and verify that the amount/currency match the internal order, webhook
signature verification passes, repeated webhooks do not create duplicate access,
the expiry is exactly three calendar months after the verified payment instant, and
the learner's existing progress/certificates remain intact.

## 3. Settlement questions that still require external confirmation

The code alone cannot verify the merchant's Paystack dashboard or bank settlement.
Confirm these directly in the merchant dashboard / with Paystack support:

- The merchant's live account is approved to accept NGN payments.
- The Vercel Paystack key is the intended live or test key for the deployment being tested.
- The webhook URL is registered as https://techskillhub.cv/api/payments/webhook.
- Refund, chargeback and settlement timing are understood.
- Any foreign-currency settlement questions are separate from this NGN pricing path;
  do not enable USD through Paystack without separate confirmation and approved prices.
- Create and verify the monthly, quarterly and annual Paystack plans at the exact approved
  amounts and cadence before setting recurring-plan environment variables.

## 4. Release decision

Do not infer launch readiness from the existence of PAYSTACK_SECRET_KEY. The price,
plan-specific launch guard, entitlement policy, disposable-database tests, and provider
sandbox transaction all need to agree. Keep production flags off until those checks
pass. No live provider setting or transaction was changed during this code review.
