# TechSkillHub — Payment-Provider Sandbox Verification Matrix

Internal working document. **Status: NOT PERFORMED.** No provider sandbox account,
test credentials, store, product/variant identifiers or webhook secret are
available in this environment, so no sandbox transaction has been executed.

> **A local unit/integration test is not provider verification.** The code paths
> below are unit-tested (pure payload builders, webhook normalisation, entitlement
> derivation), but the provider-of-record has not been exercised. Do not record
> these as completed integration tests.

---

## 1. What was verified locally (code-level only)

| Concern | Where | Evidence |
| --- | --- | --- |
| Lemon Squeezy checkout payload shape | `lib/commercial/lemonsqueezy.ts` | `tests/commercial-lemonsqueezy.test.js` (pure) |
| Webhook normalisation + signature/secret handling | `lib/commercial/webhooks.ts` | `tests/commercial-webhooks.test.js` |
| Entitlement derivation from stored state | `lib/commercial/entitlements.ts` | `tests/commercial-entitlements.test.js` |
| Order → webhook → entitlement service flow | `lib/commercial/service.ts` | `tests/commercial-service.integration.test.js` (disposable DB, **synthetic** events) |
| Track Pass term + expiry | `lib/commercial/track-pass.ts` | `tests/commercial-track-pass.test.js` |
| Test-mode deliveries never grant entitlement | `lib/commercial/service.ts` (`reason: 'test_mode'`) | `tests/commercial-service.integration.test.js` |

These prove the *local* behaviour. They do **not** prove the provider account,
store, variant ids, webhook secret, currency support or payout arrangement work.

---

## 2. Prerequisites still outstanding (account / configuration)

### Lemon Squeezy
- [ ] A **sandbox/test store** (or test-mode enabled on the store).
- [ ] `LEMONSQUEEZY_API_KEY` (test key).
- [ ] `LEMONSQUEEZY_STORE_ID`.
- [ ] `LEMONSQUEEZY_VARIANT_TRACK_PASS` — variant id for the one-time Track Pass.
- [ ] `LEMONSQUEEZY_VARIANT_PRO_MONTHLY` — variant id for the monthly subscription.
- [ ] `LEMONSQUEEZY_VARIANT_PRO_ANNUAL` — variant id for the annual subscription.
- [ ] `LEMONSQUEEZY_WEBHOOK_SECRET` — the signing secret for the webhook endpoint.
- [ ] Confirmed **supported currency** for the store (USD assumed).
- [ ] Merchant **payout/settlement** arrangement confirmed (bank/tax details).
- [ ] `COMMERCE_PROVIDER_TEST_MODE=true` while testing (default false = live).

### Paystack
- [ ] Merchant account **approved** (business verification).
- [ ] `PAYSTACK_SECRET_KEY` (test key).
- [ ] `PAYSTACK_PUBLIC_KEY` (test key).
- [ ] `PAYSTACK_MONTHLY_PLAN_CODE` / `PAYSTACK_YEARLY_PLAN_CODE` (if used).
- [ ] `PAYSTACK_WEBHOOK_SECRET` — webhook signing.
- [ ] **Approved NGN prices** (none defined; must not be inferred).
- [ ] Payout account/settlement confirmation.

### Global
- [ ] `COMMERCE_ENTITLEMENTS_ENFORCED`, `COMMERCE_PRICES_APPROVED`,
      `COMMERCE_CHECKOUT_ENABLED` — only flipped inside the sandbox run, reverted after.
- [ ] A public HTTPS webhook URL reachable by the provider (e.g. a tunnel to a
      disposable deployment) — **never** a production endpoint.

---

## 3. Test matrix

Each row is executed against the provider sandbox with legitimate test
credentials. "Expected" is the behaviour the code must exhibit.

| # | Scenario | Expected behaviour | How to verify | Status |
| --- | --- | --- | --- | --- |
| P1 | Successful one-time **Track Pass** payment (Lemon Squeezy) | Pending order created → redirect → verified webhook → one `TrackAccess` row ACTIVE with a **6-calendar-month** `expiresAt`; entitlement tier `PASS`; only the purchased track unlocked | Complete a test checkout; assert DB rows + `deriveSnapshot` | ☐ |
| P2 | **Pending** checkout (user does not complete) | No entitlement; order stays `PENDING`; no `TrackAccess` | Abandon at provider; assert no entitlement | ☐ |
| P3 | **Failed** payment | No entitlement; order `FAILED`/unchanged; learner sees a clear message | Use a failing test card | ☐ |
| P4 | **Abandoned** checkout then return | No duplicate order/entitlement; resume or re-initiate cleanly | Reopen checkout | ☐ |
| P5 | **Valid** webhook (correct signature) | Event accepted, processed once | Replay a signed test event | ☐ |
| P6 | **Invalid** signature | Event **rejected** (401/400), nothing processed | Send a tampered signature | ☐ |
| P7 | **Duplicate** webhook (same event id) | **Idempotent** — processed once; no second grant/credit | Send the same event twice | ☐ |
| P8 | **Retried** webhook after a transient failure | Eventually consistent; still exactly-once effect | Force a failure then redeliver | ☐ |
| P9 | **Wrong order / user / product / amount / currency** | Rejected or recorded without granting the wrong entitlement; amount/currency mismatch never grants | Craft mismatched events | ☐ |
| P10 | **Track-specific** entitlement (Track Pass) | Only the chosen premium track unlocks; other premium tracks stay gated | Assert `canAccessTrack` for all premium ids | ☐ |
| P11 | **Six-calendar-month expiry** | Access ends at `expiresAt` (UTC, month-clamped); data retained | Fast-forward clock / set `expiresAt` past | ☐ |
| P12 | **Repurchase** after expiry | New verified payment creates a new access period; no auto-charge | Complete a second test checkout | ☐ |
| P13 | Pro **subscription creation** | Subscription ACTIVE → tier `PRO`; all premium tracks unlocked; Pro allowance | Complete a test subscription | ☐ |
| P14 | Pro **renewal** | Period extends; remains `PRO`; no double grant | Simulate a renewal event | ☐ |
| P15 | Pro **cancellation** (`cancel_at_period_end`) | Access continues to period end, then reverts to Free rules | Cancel then advance clock | ☐ |
| P16 | Pro **failed payment** (`PAST_DUE`) | Access until `currentPeriodEnd` (grace), then reverts | Send past-due event | ☐ |
| P17 | Pro **expiry** | Tier reverts to Free/Pass per remaining passes | Advance past `currentPeriodEnd` | ☐ |
| P18 | **Refund** | Entitlement revoked per policy; learner notified; audit recorded | Issue a test refund | ☐ |
| P19 | **Dispute / chargeback** | Provider-driven; entitlement fallback; support scenario documented | Provider test dispute | ☐ |
| P20 | **Duplicate / out-of-order** provider events | State converges to the latest provider truth; no regression to a weaker state | Deliver events out of order | ☐ |
| P21 | **Entitlement removal / fallback** when access ends | Learner falls back to Free rules; **progress, submissions, completions, achievements and certificates are retained** | Expire/cancel then check retention | ☐ |
| P22 | **Test-mode delivery** | Never grants live entitlement (`reason: test_mode`) | Send a `test` domain event | ☐ |

---

## 4. Exact remaining prerequisites (summary)

1. Lemon Squeezy sandbox store + API key + store id + three variant ids + webhook secret + payout setup.
2. Paystack merchant approval + test keys + (plan codes) + webhook secret + **approved NGN prices** + payout setup.
3. A disposable/tunnelled HTTPS webhook target (never production).
4. Owner approval to enable the three commerce flags **only** for the sandbox window.

Until all of these exist and every row above is executed by a human operator, the
provider integration remains **unverified** and the launch checklist item
"provider sandbox verification" stays **open**.
