# TechSkillHUB — Free/Pro Entitlement Architecture (design + as-built)

Status: **partially implemented.** The safe, enforceable parts are now built and
tested; the commercial gates remain **off** and no learner access has changed. This
document is kept up to date with what was actually built, and explicitly marks the
parts of the original design that were **not** adopted.

Related, as-built documents:

- `docs/premium-first-wave.md` — the three premium tracks.
- `docs/assessment-credit-concurrency.md` — the race-safe allowance ledger.
- `docs/premium-rollout.md` — phased rollout + legacy-user transition.
- `docs/commercial-billing-setup.md` — operator/configuration guide.

---

## 1. Non-negotiable properties (unchanged)

1. **The payment provider is the authoritative source of payment state**, not the
   browser. Confirmed state only comes from verified webhooks (and server-side
   verification of a reference).
2. **Protected content is checked server-side.** A client-side "Pro" badge, a
   hidden component, or a prop must never grant access.
3. **No fake premium / hardcoded paid users / client-controlled flags.**
4. **Existing learners are not reduced** while pricing/transition policy is
   undecided. Track enforcement defaults **off** behind a flag.

## 2. What was reused (not duplicated)

| Concern | As-built building block |
| --- | --- |
| Subscription record | `Subscription` model (status, plan, `currentPeriodEnd`, provider codes) |
| Per-course access (legacy) | `TrackAccess` + `grantTrackAccess` / `getTrackEntitlements` (`lib/access.ts`) |
| Six-month one-time Track Pass | `TrackPassPurchase` (`lib/commercial/track-pass.ts`, `service.ts`) |
| Access gate seam | `hasTrackAccess(userId, trackId)` — the single choke point |
| AI assessment budget (hourly abuse) | `checkAssessmentBudget` (`lib/project-verification/store.ts`), DB-backed hourly caps |
| Monthly assessment allowance | `AssessmentCreditBucket` + `AssessmentCreditReservation` (`lib/commercial/assessment-credits.ts`) |
| Provider plumbing | `lib/payments.ts` (verify + idempotent fulfil), `app/api/payments/webhook/route.ts` (HMAC), `app/api/webhooks/lemonsqueezy/route.ts` (signature verify) |
| Readiness guard | `lib/commercial/launch.ts` (`launchReadiness`) — fail-closed checkout gate |
| Rollout/transition | `lib/commercial/rollout.ts`, `shadow.ts`, `transition.ts` |

## 3. Data model — proposed vs as-built

The original design proposed a single `Entitlement` row plus an `AssessmentCredit`
row with a mutable `used` counter. **That shape was deliberately not adopted:**

- The `used`-counter design is not race-safe: two concurrent requests both read
  `used`, both see spare capacity, and both increment — exceeding the limit. A
  counter requires a check-then-act.
- Introducing a parallel `Entitlement` table while `Subscription` / `TrackAccess`
  / `TrackPassPurchase` already carry verified state would create two competing
  sources of truth.

As-built instead:

```
enum AssessmentReservationStatus { RESERVED, CONSUMED, RELEASED, EXPIRED }

model AssessmentCreditBucket {        // one row per user + UTC month
  id, userId, periodStart, periodEnd, tier, allowance, ...
  @@unique([userId, periodStart])     // SELECT ... FOR UPDATE serialization point
}

model AssessmentCreditReservation {   // one row per logical assessment request
  id, bucketId, userId, requestId, status, expiresAt, releaseReason, ...
  @@unique([userId, requestId])       // idempotency key
}
```

The invariant is `consumed + active reservations <= allowance`, enforced under a
row lock rather than by a mutable counter. There is **no** `Entitlement` table:
plan state is derived server-side by `getEntitlementSnapshot` from the existing
verified records. See `docs/assessment-credit-concurrency.md`.

## 4. Enforcement points

1. **Subscription state (server, provider-authoritative).** Webhook handlers verify
   the signature, then apply an idempotent billing event (unique event key / unique
   `orderReference`), so duplicates never double-grant.
2. **Content access.** `hasTrackAccess` is the choke point:
   - returns `true` for everyone **until enforcement is enabled** (globally via
     `COMMERCE_ENTITLEMENTS_ENFORCED=true`, or for a server-side pilot cohort);
   - a premium track is gated as a whole against the validated premium set;
   - shadow mode (`COMMERCE_SHADOW_EVAL=true`) computes the proposal and logs a
     redacted diagnostic but still returns `true` — it can never change access.
   - Every protected read (`/api/guided-path/[trackId]`, project verification,
     certificate) already calls it, so enforcement changes in one place.
3. **AI assessment allowance (as-built).** The monthly allowance is enforced
   through a reserve → use → consume/release ledger (`assessment-credits.ts`):
   - a credit is **reserved atomically before** the billable model call;
   - it is **consumed exactly once** only when the model produced a usable
     decision, and the audit event is written in the same transaction;
   - it is **released** on reuse, deterministic rejection, provider failure, or
     exception — never charged for a failure;
   - stale reservations past their TTL stop consuming capacity and are
     reconciled (recorded, not silently discarded);
   - the hourly DB caps remain as an additional abuse control, applied first.
4. **Portfolio/premium material.** Delivered through the same authed content
   endpoint; the server decides what a non-entitled learner receives. The client
   never filters for security (it may hide for UX only). Per-stage previewing
   inside a premium track is **not** implemented (documented gap).

## 5. Feature flags (server-side only; no `NEXT_PUBLIC_*` entitlement flags)

| Flag | Default | Effect |
| --- | --- | --- |
| `COMMERCE_ENTITLEMENTS_ENFORCED` | `false` | gate premium **track access** globally |
| `COMMERCE_ASSESSMENT_ALLOWANCE_ENFORCED` | **`true`** | enforce the monthly AI-assessment allowance (only `'false'` disables) |
| `COMMERCE_CHECKOUT_ENABLED` | `false` | allow creating checkout sessions |
| `COMMERCE_PRICES_APPROVED` | `false` | allow publishing draft prices |
| `COMMERCE_PREMIUM_TRACK_IDS` | unset → first-wave manifest | override the premium set (validated) |
| `COMMERCE_SHADOW_EVAL` | `false` | log proposed decisions only |
| `COMMERCE_PILOT_ENABLED` / `_USER_IDS` / `_PERCENT` | off / empty / 0 | controlled pilot cohort |
| `COMMERCE_TRANSITION_MODE` + cutoffs | `OPEN` | legacy-user transition policy |

The monthly allowance is an AI **cost control**, not a content gate; it is
enforced by default because a finite allowance that is never applied cannot bound
cost. Track access itself remains open by default.

## 6. Transition handling

- Access is decided per **user and track** through a fail-safe policy
  (`lib/commercial/transition.ts`): `OPEN` by default; a transition mode with no
  cohort/deadline falls back to `OPEN`; learners with any recorded activity or a
  legacy `TrackAccess` record are retained; ambiguous pre-cutover accounts are
  retained and reported `uncertain` for human review; only an unambiguously
  post-cutover account with no activity is a transition candidate.
- Completed courses and certificates are immutable; progress is never deleted or
  reset; a legacy `TrackAccess` row is **not** treated as a six-month Track Pass.
- No learner is moved to a reduced state while policy is undecided — guaranteed
  today because enforcement is off. A read-only dry run
  (`scripts/transition-dry-run.mjs`) reports aggregate counts before any change.

## 7. Provider-agnostic abstraction

Only the **webhook → entitlement mapping** is provider-specific (`lib/commercial/
webhooks.ts`, `lemonsqueezy.ts`), so adding a merchant-of-record later means
writing one adapter, not re-plumbing the app. Paystack is modelled but **inert**:
no NGN prices are defined (they must be supplied by the owner) and no merchant
credentials are configured.

## 8. Failure handling

| Event | Behaviour |
| --- | --- |
| Payment failed (`invoice.payment_failed`) | `status = PAST_DUE`; keep access until `currentPeriodEnd`, then revert to FREE |
| Subscription cancelled | keep access until period end (`cancelAtPeriodEnd`) |
| Track Pass ends | access ends; progress/submissions/certificates preserved; completed tracks stay complete |
| Early Track Pass repurchase | extends from the later of now and current expiry — never shortens |
| Webhook replay/duplicate | idempotent (unique event key / `orderReference`); no double-grant, no double period |
| Provider outage | learner keeps last-known good entitlement; assessment returns `service_unavailable` and the reserved credit is released |
| Process crash mid-assessment | reservation expires after its TTL; credit returned (recorded) unless a completion signal exists |
| Signature invalid | reject; no state change |

## 9. Test plan (as executed)

- Free learner keeps the full free experience (enforcement off ⇒ access true).
- A premium entitlement is granted **only** after a verified event; never from a
  client flag (covered by the commercial webhook/service tests).
- Access is denied for a premium track **only** when enforcement is on — asserted
  by the shadow/rollout tests' "never denies while off" property.
- The assessment allowance cannot be exceeded under concurrency (real-PostgreSQL
  integration test: 60 concurrent reservations against a 20-credit allowance ⇒
  exactly 20 granted); consumed exactly once; released on reuse/failure; a stale
  reservation cannot permanently exhaust the allowance.
- Grandfathered/legacy learners retain access past the cutoff; ambiguous accounts
  are retained.
- Certificate only issues on real `CourseCompletion`.
- No test requires live payment credentials or a production account; DB-backed
  tests run against disposable PostgreSQL only.

## 10. Still out of scope / not done

- No live checkout, no real transactions, no billing activation.
- No NGN pricing (must be owner-supplied); Paystack remains inert.
- No provider-of-record verification: no verified Lemon Squeezy / Paystack
  merchant, product, variant or settlement details are available, so go-live is
  **not** approved.
- No per-stage preview inside a premium track.
- No changes that switch existing learners to a reduced-access state.
