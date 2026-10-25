# TechSkillHub — Assessment-credit concurrency (race-safe accounting)

Status: **implemented and verified** against disposable PostgreSQL. Production
enforcement of any *commercial* gate is unchanged (see `docs/premium-rollout.md`).
The monthly allowance itself is now authoritative (see "Policy change" below).

---

## 1. The defect that was fixed

The monthly AI-assessment allowance was checked with a read-then-act:

1. count how many `assessment_credit_used` events the learner has this month;
2. if `count < allowance`, run the (billable) model call;
3. afterwards, record an `assessment_credit_used` event.

Two concurrent requests could both read the same count, both see spare capacity,
and both run a billable assessment — exceeding the learner's allowance. The
record step happened after the model call and was independent of the check, so
nothing prevented the overshoot. This is a classic write-skew/phantom problem:
READ COMMITTED does not stop two transactions from inserting rows that each make
the other's earlier count invalid.

## 2. The correction

One durable, database-backed ledger replaces the check-then-act.

### Schema (additive migration `20261015_assessment_credit_reservation`)

* `AssessmentCreditBucket` — one row per `(userId, periodStart)` where
  `periodStart` is the first instant of the UTC calendar month. It snapshots the
  tier and allowance that applied for the period.
* `AssessmentCreditReservation` — one durable row per logical assessment
  request, keyed by the unique `(userId, requestId)`.
* `AssessmentReservationStatus` enum: `RESERVED | CONSUMED | RELEASED | EXPIRED`.

### Invariant

```
consumed credits + active (unexpired) reservations <= monthly limit
```

### How the invariant is guaranteed under concurrency

`reserveAssessmentCredit` runs in a single interactive transaction:

1. upsert the bucket row (so it exists);
2. `SELECT ... FOR UPDATE` the bucket row — **this is the serialization point**;
3. count `CONSUMED` + active `RESERVED` for the bucket;
4. if at capacity, reject; otherwise insert (or re-arm) the reservation;
5. commit (releasing the row lock).

Every capacity decision for the same learner and month therefore waits on the
same row lock, so a second transaction observes the first's committed
reservation. Different users and different months use different bucket rows and
never contend. `SELECT ... FOR UPDATE` is portable and needs no advisory-lock
hashing; the bucket row is the documented "atomic conditional update" unit.

The invariant is additionally covered by a real-PostgreSQL test that fires 60
concurrent reservations at a 20-credit allowance and asserts exactly 20 are
granted (`tests/assessment-credits.integration.test.js`).

## 3. Reserve → use → consume/release

* The model call happens **outside any database transaction** — no transaction is
  held open while waiting on the provider.
* `consumeAssessmentCredit` marks the reservation `CONSUMED` with a conditional
  `updateMany({ status: 'RESERVED' })`, so it is idempotent and cannot run twice.
  It writes the `assessment_credit_used` audit event **in the same transaction**,
  so a reservation can never be `CONSUMED` without its completion signal.
* `releaseAssessmentCredit` marks it `RELEASED` with the same conditional guard,
  so a reservation can never be released after it was consumed.
* A deterministic rejection, an eligible reuse, a provider error, a timeout or an
  unexpected exception releases the credit; only a usable, billable model
  decision consumes it.

## 4. Idempotency

`deriveAssessmentRequestId` produces the stable key for one logical request:

* a valid client-supplied key (`body.requestId`, bounded safe alphabet) is
  honoured, so a client can dedupe its own retries; otherwise
* the key is a SHA-256 of `userId | trackId | projectId | evidenceFingerprint |
  rubricVersion`.

So resending the identical submission cannot reserve or consume a second credit,
while a genuinely changed submission (new fingerprint) is a new billable request.
A duplicate of an already-consumed request returns the stored outcome
(`outcome: 'consumed'`) with no second model call. A duplicate of a request that
is still in flight returns `outcome: 'in_flight'` (HTTP 409).

## 5. Crash recovery and the failure policy

A process can die after reserving but before consuming or releasing. Policy:

* Every reservation carries `expiresAt` (TTL, default **20 minutes**). An
  un-resolved reservation past its TTL **no longer counts against capacity**, so a
  crash can never permanently exhaust a learner's allowance.
* `reconcileStaleReservations` finalizes those rows: if a completion signal
  (`assessment_credit_used` with the same `requestId`) exists the reservation
  becomes `CONSUMED`, otherwise it becomes `EXPIRED` (credit returned). Because the
  completion event is written in the *same transaction* as the consume, a
  reservation with a completion is always already `CONSUMED`; the check is
  belt-and-braces.
* Opportunistic reclamation happens inside `reserveAssessmentCredit` for the same
  bucket, so capacity is freed even before an operator runs reconciliation.

**Trade-off (documented, not silent).** The irreducible window is "the model
returned but the process died before the consume transaction". If both the
consume and its event were lost, the reservation expires and the credit is
returned: the learner is favoured over the platform. This is deliberate — a
platform failure must not cost a learner — and it is *auditable*: the row ends
`EXPIRED` with `releaseReason = 'expired_unresolved'` and is counted by
`reconcileStaleReservations` so operators can monitor it. The window is kept tiny
by consuming immediately after the model returns and outside long transactions.

## 6. Policy change: the monthly allowance is now enforced

Previously the limit was only applied when `COMMERCE_ENTITLEMENTS_ENFORCED` was
on; usage was measured but not capped. The requirement is that each tier's
allowance is **finite and authoritative** (Free 20 / Track Pass 30 / Pro 150 per
month, in `lib/commercial/plans.ts`), so the ledger cannot be meaningful without
enforcement. Enforcement is therefore **on by default** and can only be disabled
by explicitly setting `COMMERCE_ASSESSMENT_ALLOWANCE_ENFORCED=false`.

* This is an AI **cost control**, additional to the existing hourly abuse budget
  (`checkAssessmentBudget`), which is unchanged and still applied first.
* It does not gate track content. Track access is still decided by
  `hasTrackAccess` (default open).
* The browser can never assert a plan, quota or identity: tier and allowance are
  read from `getEntitlementSnapshot` on the server.

## 7. Migration, rollback and verification

* Migration: `prisma/migrations/20261015_assessment_credit_reservation/migration.sql`
  (additive: new enum + two tables + indexes + FKs). No existing table is
  altered, so progress, submissions, completions, certificates, legacy
  `TrackAccess` rows and payment records are untouched.
* Apply in a disposable environment:
  `DATABASE_URL=... npx prisma migrate deploy`.
* Rollback (if ever required):
  `DROP TABLE "AssessmentCreditReservation"; DROP TABLE "AssessmentCreditBucket"; DROP TYPE "AssessmentReservationStatus";`
  — safe because the tables hold only this feature's own rows; no other table has
  a foreign key to them.
* Drift: `prisma migrate diff` reports no difference; `prisma migrate status` is
  clean.

Verification performed (see the final report for exact counts): full `npm test`
against disposable PostgreSQL (unit + integration + the new concurrency suite),
`tsc --noEmit`, `npm run lint`, `prisma validate`, `prisma migrate diff`,
`next build` and the Playwright E2E suite.
