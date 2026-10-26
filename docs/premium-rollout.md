# TechSkillHub — Premium rollout and existing-user transition

Status: **implemented; all gates OFF/inert.** Nothing here restricts a real
learner, activates a price, sends an email or takes a payment. This document
covers the staged rollout controls, the grandfathering policy and the dry run.

---

## 1. Staged rollout phases

Phases are resolved server-side (`lib/commercial/rollout.ts`) from environment
configuration only. A client can never assert a phase or cohort.

| Phase | Meaning | How it is enabled |
| --- | --- | --- |
| 0 | Internal preparation (default) | nothing set |
| 1 | Shadow evaluation | `COMMERCE_SHADOW_EVAL=true` |
| 2 | Informational | the announcement is visible (`COMMERCE_ANNOUNCEMENT` ≠ `false`) |
| 3 | Controlled pilot | `COMMERCE_PILOT_ENABLED=true` + `COMMERCE_PILOT_USER_IDS` and/or `COMMERCE_PILOT_PERCENT` |
| 4 | Existing-user rollout | `COMMERCE_ENTITLEMENTS_ENFORCED=true` |

`COMMERCE_ROLLOUT_PHASE` may pin a phase explicitly; an invalid value falls back
to Phase 0 (safest).

### Phase 0 — internal preparation (current baseline)

Billing/entitlement code is present, the global price-publication flag and checkout
are disabled, and existing access is unchanged. The ₦6,000 Nigerian Track Pass is
individually approved in code but has not passed the provider sandbox/release gates;
the international USD prices remain unapproved. This safe state must remain until
the migration history, sandbox fulfilment, and existing-learner transition are
verified.

### Phase 1 — shadow evaluation

With `COMMERCE_SHADOW_EVAL=true` and enforcement off, `hasTrackAccess` computes
the *proposed* premium decision and logs a privacy-conscious mismatch line
(redacted user prefix, track id, proposal) but **still returns `true`**. Shadow
mode performs no database writes, so it cannot change access, progress, prices or
payment state. The pure decision function is `decideTrackAccess` and is unit
tested to never deny access off-enforcement.

### Phase 2 — informational

The dismissible `CommercialAnnouncement` explains that a few tracks are planned to
become premium, that a Track Pass gives three months of access to one track, and
that nothing changes today. It makes no price or launch-date claims, does not
block the learning flow, and hiding it changes nothing about entitlement. The
premium track pages show the same non-blocking notice; the checkout button is not
rendered while checkout is disabled.

### Phase 3 — controlled premium pilot

`entitlementsEnforcedForUser(userId, env)` returns true globally when
`COMMERCE_ENTITLEMENTS_ENFORCED=true`, or for an explicit pilot cohort when
`COMMERCE_PILOT_ENABLED=true` and the user is in `COMMERCE_PILOT_USER_IDS` or in
the stable `COMMERCE_PILOT_PERCENT` bucket. The bucket is a SHA-256 of the user
id, so a user's cohort never changes between requests. Both flags are required;
a stray id list alone affects nobody. Test the premium experience with seeded
test accounts in an isolated environment before any real cohort.

> Paid checkout still requires the global readiness gates (including
> `COMMERCE_ENTITLEMENTS_ENFORCED=true`) in the isolated environment. The pilot
> flag controls *access decisions*; it does not by itself open checkout.

### Phase 4 — existing-user rollout

Global enforcement. Only enable after the dry run has been reviewed, learners
have had advance notice and the grace period has elapsed (§3). It is never
enabled automatically as a consequence of Phase 3.

## 2. Configuration reference

| Variable | Default | Effect |
| --- | --- | --- |
| `COMMERCE_SHADOW_EVAL` | off | log proposed decisions only |
| `COMMERCE_PILOT_ENABLED` | off | gate for the pilot cohort |
| `COMMERCE_PILOT_USER_IDS` | empty | explicit pilot members |
| `COMMERCE_PILOT_PERCENT` | 0 | stable percentage cohort |
| `COMMERCE_ROLLOUT_PHASE` | derived | pin the phase |
| `COMMERCE_ENTITLEMENTS_ENFORCED` | off | global enforcement |
| `COMMERCE_TRANSITION_MODE` | `OPEN` | `OPEN` / `GRANDFATHERED` / `ENFORCED` |
| `COMMERCE_GRANDFATHERING_CUTOFF` | none | accounts created before this are the legacy cohort |
| `COMMERCE_GRANDFATHERING_UNTIL` | none | access retained until this instant |
| `COMMERCE_TRANSITION_GRACE_DAYS` | 0 | extra days after the deadline |
| `COMMERCE_TRANSITION_NOTICE_DAYS` | 0 | intended advance-notice window (documentation) |

## 3. Legacy-user access policy

`lib/commercial/transition.ts` (pure, fully testable without a database):

* **OPEN** (default) — everyone is retained; classification returns
  `enforcement_disabled`.
* A transition mode with **neither** a cutoff nor a deadline falls back to `OPEN`
  (cannot make a safe decision).
* While the announced window is open (`now < grandfatheredUntil + grace`) everyone
  is retained.
* After the window, a learner is retained if they have **any** recorded activity
  (enrolment, progress, submissions, completion, certificate) **or** a legacy
  `TrackAccess` record — a legacy record is explicitly *not* treated as a three-month
  Track Pass.
* An **ambiguous** pre-cutover account with no activity (or an untrusted creation
  date) is retained and reported as `uncertain` — never silently revoked.
* Only an unambiguously post-cutover account with no recorded activity is a
  `transition` candidate for the normal Free/premium rules.

Progress, projects, completion records and earned certificates are never deleted
or reset. Existing free learners are never charged, converted to subscribers, or
implied to have agreed to recurring payments.

### The open-access trade-off (stated, not quietly resolved)

The historical product was genuinely open, so the *safe* default retains
essentially the entire existing cohort. That materially limits near-term
conversion, because most existing learners keep access. The alternative
(aggressively transitioning everyone without activity) would revoke access from
learners who were legitimately using the open product but whose activity is not
recorded. This implementation deliberately prefers retention and reports the
`uncertain` cases for human review rather than choosing an aggressive policy to
monetise faster.

## 4. Dry run

`scripts/transition-dry-run.mjs` is read-only and prints only aggregate counts and
redacted (hashed) user prefixes for uncertain cases. It reads the *same* policy
environment variables as the app.

```
DATABASE_URL=postgresql://... TSH_TRANSITION_DRY_RUN=1 \
  COMMERCE_TRANSITION_MODE=ENFORCED \
  COMMERCE_GRANDFATHERING_UNTIL=2026-12-31T00:00:00Z \
  COMMERCE_GRANDFATHERING_CUTOFF=2026-01-01T00:00:00Z \
  node scripts/transition-dry-run.mjs
```

It refuses to run against `NODE_ENV=production` unless `TSH_TRANSITION_DRY_RUN=1`
is explicitly set. **No production or shared database was accessed during this
task**, so no real learner cohorts are reported here; the tool exists so an
authorised operator can run it safely on a replica before any transition.

## 5. Applying the transition (checklist, later)

1. Run the dry run on a replica; review the `uncertain` count.
2. Publish the announcement (`docs/billing/commercial-faq.md` copy) at least
   `COMMERCE_TRANSITION_NOTICE_DAYS` in advance.
3. Set the cutoff and deadline, keep mode `OPEN` until the notice period ends.
4. Set mode `GRANDFATHERED` with a grace period; monitor shadow/`uncertain`.
5. Only then consider Phase 4. Do not enable automatically.

## 6. Tests

`tests/commercial-rollout.test.js` covers phases, cohort determinism,
percentage bounding and the shadow "never denies" property.
`tests/commercial-transition.test.js` covers the policy defaults, fail-safe
fallback, retention by activity/legacy record, ambiguous cases, the grace period
and the summary.
