# TechSkillHub — Existing-Learner Transition: Operator Guide

Internal working document. Describes the implemented transition policy, how to run
the dry run safely, how to review its output, and the proposed grandfathering /
notice process. **Nothing here enables restrictions.** Enforcement stays off until
the policy is reviewed and explicitly approved.

---

## 1. Policy (implemented, pure, dry-runnable)

Source of truth: `lib/commercial/transition.ts`.

`resolveTransitionPolicy(env)` resolves:

| Env var | Meaning | Default |
| --- | --- | --- |
| `COMMERCE_TRANSITION_MODE` | `OPEN` \| `GRANDFATHERED` \| `ENFORCED` | `OPEN` |
| `COMMERCE_GRANDFATHERING_CUTOFF` | Accounts created on/after this are **not** legacy | unset |
| `COMMERCE_GRANDFATHERING_UNTIL` | Retain legacy access until this instant (+ grace) | unset |
| `COMMERCE_TRANSITION_GRACE_DAYS` | Extra days of access after the deadline | `0` |
| `COMMERCE_TRANSITION_NOTICE_DAYS` | Advance-notice window (documentation only) | `0` |

**Fail-safe:** a non-`OPEN` mode with neither a cutoff nor a grandfathering
deadline resolves back to `OPEN`. Misconfiguration cannot start restricting
learners.

`classifyLegacyUser(signals, policy, now)` returns exactly one action:

- **`retain`** — enforcement disabled, or within the grandfathering window, or the
  learner has **any** recorded activity (enrolment, progress, submission,
  completion, certificate) or a legacy access record.
- **`uncertain`** — no activity recorded **and** created before the cutoff (or an
  untrusted creation date). Retained pending review — **never silently revoked**.
- **`transition`** — the only reducing action, and only for a learner
  unambiguously post-cutover with **no** recorded activity.

## 2. What is preserved for a returning learner

Verified by `docs/learner-continuity.md` and the continuity tests:

- current position and incomplete stages;
- completed work and saved project submissions;
- historical assessment results **with their original rubric versions**;
- achievements, course completion and certificates;
- new requirements added **without** resetting the learner;
- ambiguous legacy access states (kept as `uncertain`, not revoked).

## 3. Operator-run dry-run procedure

The dry run is **read-only** and never writes to the database. It prints aggregate
counts and **redacted** (hashed) learner prefixes only.

Preconditions:

1. Run against a **disposable copy or a read replica**. Do **not** target
   production.
2. If the target reports `NODE_ENV=production`, the script refuses unless
   `TSH_TRANSITION_DRY_RUN=1` is set. Treat that override as an exceptional,
   reviewed action. The default in this repository is to run against a
   disposable database.
3. Do not change any commerce flag as part of the dry run.

Commands:

```bash
# 1. Current policy (default OPEN) — confirms nothing would change.
DATABASE_URL=postgresql://... node scripts/transition-dry-run.mjs

# 2. Candidate policy — evaluate what a real transition WOULD do.
DATABASE_URL=postgresql://... \
  TSH_TRANSITION_DRY_RUN=1 \
  COMMERCE_TRANSITION_MODE=ENFORCED \
  COMMERCE_GRANDFATHERING_UNTIL=2026-12-31T00:00:00Z \
  COMMERCE_GRANDFATHERING_CUTOFF=2026-01-01T00:00:00Z \
  COMMERCE_TRANSITION_GRACE_DAYS=30 \
  node scripts/transition-dry-run.mjs
```

Output fields: `policy.*`, then `total learners`, `retain (unaffected)`,
`uncertain (review)`, `transition candidates`, then a redacted list of the first
25 uncertain learners with their reasons.

## 4. Safe-review checklist for the dry-run output

- [ ] `policy.mode` is what you intended (and not silently `OPEN` from a missing cutoff/deadline).
- [ ] `retain` covers every learner with recorded activity — spot-check a few redacted ids against their records.
- [ ] `uncertain` is reviewed case by case; each keeps access until a human decision.
- [ ] `transition` candidates are genuinely post-cutover with **no** activity; none is a named/active learner.
- [ ] `transition` count is **not** published or acted on without approval.
- [ ] The run used a disposable/read-replica database; no production data was touched.
- [ ] No commerce flag was changed during the run.

Do **not** invent cohort counts: report the numbers the tool actually prints for
the data you actually ran against, and state the data source.

## 5. Proposed grandfathering, grace and notice

- **Default posture:** `OPEN` — everyone retained; no learner loses access.
- **Proposed policy (for owner approval):** legacy learners (pre-cutover) keep
  full access; a grandfathering deadline plus a **grace period**
  (`COMMERCE_TRANSITION_GRACE_DAYS`) softens the boundary; only post-cutover
  learners with no activity move to normal Free/premium rules.
- **Advance notice:** set a notice window (`COMMERCE_TRANSITION_NOTICE_DAYS`) and
  send customer communications **only after** approval. No notice has been sent.

## 6. Approval gate

Enforcement remains **off** (`COMMERCE_ENTITLEMENTS_ENFORCED=false`,
`COMMERCE_TRANSITION_MODE=OPEN`) until:

1. a dry run is reviewed against **real** cohort data (owner-approved snapshot),
2. the grandfathering/grace/notice policy is approved,
3. customer-facing notices and a notice period are approved, and
4. the release is explicitly authorised.
