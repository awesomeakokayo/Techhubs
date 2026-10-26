# TechSkillHUB — Launch Readiness Notes

Internal working document. Covers security hardening applied, the rate-limiting
requirement, production Neon migration recovery completed on 2026-10-24, the curriculum
audit summary, and the remaining release-readiness gates.

## 1. Security hardening applied

- **Pricing decision (2026-10-24):** the code catalogue contains an individually approved
  ₦6,000 Paystack Track Pass for three calendar months. Lemon Squeezy USD prices remain
  individually unapproved. The checkout master switch, price-publication switch and
  entitlement enforcement must not be enabled in production until the provider sandbox,
  existing-learner transition, and database migration-history checks are complete.

- **`/api/debug`**: returns `404` in production. Development/preview diagnostics now report only session presence and forwarded-host metadata; they do not return session identifiers or cookie names/values.
- **Legacy commerce APIs**: unused `POST /api/payments/initialize` and `GET /api/payments/pricing` are retired with `410 Gone`; current checkout is handled by the launch-guarded `/api/billing/checkout` route.
- **`app/robots.ts`**: removed the stale `/purchase/` disallow entry.
- **`app/api/contact/route.ts`**: strict type checks and length caps
  (name ≤120, email ≤254, subject ≤200, message ≤5000) before sending mail.
- **`next.config.mjs`**: added `X-Content-Type-Options`, `Referrer-Policy`,
  `X-Frame-Options: DENY`, `Permissions-Policy`, and `poweredByHeader: false`.
  (A Content-Security-Policy is intentionally deferred — it needs a tested
  policy covering fonts, analytics, and YouTube embeds.)
- **Test authentication**: fail-closed — the `test-credentials` provider is
  registered only when `NODE_ENV !== 'production'` and `TSH_TEST_AUTH === 'true'`,
  and only authenticates `@example.test` addresses.

## 2. Rate limiting — required before launch (external dependency)

Public (`POST /api/contact`) and authenticated write endpoints have **no rate
limiting**. A process-local in-memory limiter must **not** be used as protection:
the app deploys serverless (Vercel), where instances are ephemeral and not shared,
so an in-memory counter would be misleading.

Required (one of):
- **Vercel KV / Upstash Redis** (recommended): add `UPSTASH_REDIS_REST_URL` and
  `UPSTASH_REDIS_REST_TOKEN` (or Vercel KV env vars) and implement a fixed-window
  or sliding-window limiter keyed by `userId` (authenticated) or client IP
  (`x-forwarded-for`) for public routes.
- Alternatively, enforce limits at the edge (Vercel WAF / middleware with a
  shared store).

If credentials/infra are unavailable, this remains an open launch blocker, not a
code defect that can be fixed locally.

## 3. Live migration recovery (COMPLETED 2026-10-24)

Current state: **10 tracked migrations applied** (`0_init` through
`20261015_assessment_credit_reservation`). The live Prisma migration history was
reconciled and the three newer commercial/assessment-credit migrations were deployed on
2026-10-24 against the production Neon branch `main` (`br-wild-dream-atthu40u`,
endpoint `ep-silent-bread-at33fcy4`). Final `prisma migrate status` reported
"Database schema is up to date!" and `prisma migrate diff` reported no difference. All
SQL is unchanged (`0_init` sha256
`44B0700A215750296C94E39C0B624673E21B942FFD2C247837A0FF5E27FE067D`). Full record:
[docs/database/NEON_MIGRATION_GUIDE.md](../database/NEON_MIGRATION_GUIDE.md#completion-record-2026-10-24).

Preconditions satisfied before the change:

1. **Environment inventory** — production is the Neon `TechSkillHub` project
   (`blue-bread-46258191`); preview branches are separate Neon branches, so a preview
   deployment does not share the production database.
2. **Direct connection** — all `prisma migrate` commands ran against the direct
   (unpooled) endpoint via an in-memory override; the pooled `-pooler` host was not used
   for Migrate. `DATABASE_URL_UNPOOLED` in `.env.local` still duplicates the pooled URL
   and should be corrected for future runs.
3. **Snapshot / branch** — Neon restore branch `backup/pre-migration-20261024`
   (`br-frosty-forest-at4wuahe`) created from `main` at LSN `0/40B7D60`, confirmed `ready`.
4. **Clone rehearsal** — a disposable PostgreSQL 17 clone restored from a schema-only
   dump ran the full sequence to a clean `migrate status` with an empty `migrate diff`.
5. **Resolve on live** — the 7 historical migrations were marked applied (no DDL), then
   `migrate deploy` applied the 3 newer migrations. `_prisma_migrations` holds ten
   finished rows and no rollbacks. Rollback remains: restore the branch, or
   `DROP TABLE "_prisma_migrations"` within the retention window.
6. **Data preservation verified** — `User` 76, `UserProgress` 223, `CourseCompletion` 7,
   `LearningEvent` 37, `Subscription` 8, `PaymentOrder` 5, `LearnerProfile` 1,
   `ChecklistProgress` 4 (identical before and after).

The resolve steps encountered transient `P1002` timeouts and were retried against a
verified-healthy database; no schema or SQL error occurred.

Never mark `20261011_checklist_progress` as applied on a database where its table
does not exist.

## 4. Curriculum audit — coverage and priority findings

> **Update (2026-10-17):** the "priority findings" below are **historical** and have since
> been addressed. Non-AI guided paths now include authored knowledge checks and project
> steps (`lib/curriculum.ts`, `lib/curriculum-extended.ts`); the findings P1–P3 no longer
> describe the current tree. The current, evidence-based per-stage record is generated by
> `scripts/curriculum-quality-audit.mjs` into `docs/curriculum-stage-evidence.md` and
> `scripts/curriculum-quality-report.json`. Treat §4's "Confirmed structural result"
> paragraph as superseded; the release decision relies on the generated audit, not this
> note.

**Coverage:** programmatic pass over the **entire catalogue** (32 tracks, 180
roadmap stages, 271 resources, 114 projects, 246 quiz question groups) plus
structural checks on guided paths. No lesson body was manually read line-by-line;
the audit is structural + spot-check, not full manual verification.

**Confirmed structural result:** every base (non-AI) guided path consists of
**`concept` + `resource` steps only** — there are **no knowledge checks, practice
tasks, or project steps** inside the guided path for the 21 non-AI tracks. The
10 AI tracks (`ai-*`) build a richer path at runtime (`buildAIWorldClassPath`
adds practice/verify/build). `lib/quiz-data.ts` (246 question groups, ~1,000
lines) is **not imported anywhere** and is effectively dead content.

Positive: no track is missing an overview, resources, projects, or has a stage
without topics; no resource is left unmapped; every track has ≥3 roadmap stages.

**Priority findings and recommended corrections (with acceptance criteria):**
- **P1 — Non-AI guided paths lack assessment/practice.** Learners can complete a
  base track (and earn a certificate) by reading only. Correction: add at least
  one knowledge check (quiz) per stage and one practical/project step per stage to
  the base guided path (reuse `QUIZ_DATA` / `track.projects`). Acceptance: every
  non-AI track's guided path contains ≥1 quiz step and ≥1 practice/project step
  per roadmap stage; validated by an automated test that builds every track's path.
- **P2 — `lib/quiz-data.ts` is unused.** Either wire it into the base guided path
  (preferred, supports P1) or remove it. Acceptance: no generated file is unused;
  if wired, quizzes appear in the guided path.
  **Resolved:** removed in the "Complete Curriculum Coverage" work package. Its
  publisher-trivia questions were superseded by authored, concept-based knowledge
  checks (`lib/curriculum.ts` + `lib/curriculum-extended.ts`). See
  `docs/curriculum-quality-audit.md`. A regression test now guards against the
  legacy bank returning as the active assessment source.
- **P3 — Projects are not part of guided completion.** Projects exist as separate
  checklist items; completing them does not advance the guided path (by design for
  certificates). Correction: where appropriate, surface projects as guided steps in
  non-AI tracks so practice contributes to the learning flow (without changing
  certificate eligibility, which stays guided-completion-only).
- **P4 — Prerequisite clarity.** Roadmaps have stage topics but no explicit
  "prerequisites" field. Correction: add a short prerequisites note per track/stage
  where non-obvious. Acceptance: overview pages state prerequisites.

These are content/product decisions, not defects fixed in this package (a large
content rewrite was out of scope).

## 5. Release-readiness checklist

Baseline local checks recorded on the PR #4 code before the latest PR #5 changes (not a current-commit CI verdict):
- [x] `npm test` green (unit; 3 DB integration tests skipped without a DB).
- [x] `npm run lint` clean.
- [x] `npx tsc --noEmit -p tsconfig.json` clean.
- [x] `next build` succeeds.
- [x] DB integration tests pass on disposable PostgreSQL (7 migrations).
- [x] Chromium E2E journeys pass (11) — shell, sign-out, checklist persistence,
      anonymous progress, quiz→sign-in continuity, guided resume, account
      isolation, certificate gating, mobile layout, no hydration errors.
- [x] `/api/debug` gated; stale purchase references removed; security headers set.

Requires credentials / access / authorization (blockers):
- [ ] Rate limiting provider credentials (Upstash/Vercel KV) — §2.
- [x] Production migration-history reconciliation completed 2026-10-24: ten migrations
      applied, final status up to date, schema diff empty, and learner counts preserved — §3.
- [ ] Correct `DATABASE_URL_UNPOOLED` in `.env.local`; it still duplicates the pooled URL.
- [ ] Google OAuth production verification (real client + callback) — not covered
      by automated tests (test auth was used).
- [ ] Content work for P1–P4 (above).

## 6. Premium readiness (2026-10 wave)

- **First premium wave:** `frontend`, `backend`, `python` — selected with a
  documented rubric over real catalogue data and gated on project-outcome
  readiness. See `docs/premium-first-wave.md`. Selecting them does **not** restrict
  anyone; enforcement is still off.
- **Assessment-credit concurrency fixed:** the monthly allowance (Free 20 / Track
  Pass 30 / Pro 150) is now reserved atomically via a durable ledger before each
  billable model call, so concurrent requests cannot exceed it. The allowance is
  enforced by default (`COMMERCE_ASSESSMENT_ALLOWANCE_ENFORCED`). See
  `docs/assessment-credit-concurrency.md`.
- **Staged rollout + transition controls:** server-side phases 0–4, deterministic
  pilot cohorts, shadow evaluation that never denies access, and a fail-safe
  legacy-user policy. See `docs/premium-rollout.md`.
- **Migrations:** two additive migrations since this checklist
  (`20261014_track_pass_six_months`, `20261015_assessment_credit_reservation`).
  Total migrations: 10.
- **Still blocked (unchanged):** Lemon Squeezy / Paystack merchant, product,
  variant, currency/settlement and approved-pricing verification; rate-limiting
  credentials; GitHub Actions billing lock; disposable-database E2E; Google OAuth production.

The release decision remains tiered: code-level complete and
local/disposable-verified, but **not** provider-of-record verified and **not**
launch-approved.

## 7. Categorised release checklist (final audit, 2026-10-17)

Each category is decided **independently**; a pass in one never implies a pass in another.
`approved` for a track is never inferred from a passing mechanical score.

### 7.1 Educational quality and content review
- [x] All 32 tracks / 186 stages machine-audited with per-stage evidence
      (`docs/curriculum-stage-evidence.md`, `scripts/curriculum-quality-report.json`).
- [x] Every stage maps ≥1 content-inspected required resource; 0 resource gaps, 0 project gaps.
- [x] Machine scores: readiness ≥ 90 and worthiness ≥ 90 for all 32 tracks; 0 blocked gates.
- [ ] **Human subject-matter review of instructional quality** — pending (see 7.2).

### 7.2 Human sign-off for each track
- [x] Reviewer packets generated for all 32 tracks (`docs/reviewer-packets/`), each with
      objectives, sequence, representative instruction, resource evidence + limitations,
      knowledge checks + answer keys, AI mastery rubrics, project briefs + required evidence
      + acceptance criteria, and known concerns.
- [ ] `docs/curriculum-quality-signoff.json` — **absent / 0 approved**. A fill-in skeleton is
      at `docs/curriculum-quality-signoff.template.json`. The `--release` audit exits 1 by design.
      **Automated evidence can never approve a track.**

Per-track status (approved 0 / awaiting 32):

| Status | Tracks |
| --- | --- |
| Premium-approved | *(none)* |
| Awaiting human review | all 32 (readiness 98.8–100, worthiness 97.7–100, gates pass, eligible) |

A track may be considered individually once signed off; an awaiting track is **not** sold.

### 7.3 Product and pricing approval
- [ ] Product definitions reconciled code ↔ docs (`docs/product/product-specification.md` §10): **consistent**.
- [ ] Draft approval checklists (descriptions, prices, eligibility, disclosures, cancellation/refund,
      support): **drafted, not approved** (§11).
- [ ] Global price publication: **off** (`COMMERCE_PRICES_APPROVED=false`). The Nigerian Track Pass price is individually approved in code at ₦6,000 for three calendar months; international USD prices remain unapproved.
- [ ] Additional NGN prices: **not configured**. Pro Monthly/Annual are not offered through Paystack; no extra NGN prices should be invented.

### 7.4 Provider sandbox verification
- [ ] Lemon Squeezy sandbox order → webhook → entitlement: **not performed** (matrix ready;
      `docs/billing/provider-sandbox-test-matrix.md`). Test-mode checkout is now requestable
      (`COMMERCE_PROVIDER_TEST_MODE`, default false).
- [ ] Paystack sandbox: **not performed** (merchant/payout unverified).

### 7.5 Merchant payout readiness
- [ ] Lemon Squeezy payout/settlement (bank + tax) confirmed: **unverified**.
- [ ] Paystack merchant approval + payout account confirmed: **unverified**.

### 7.6 Database migration/recovery readiness
- [x] `prisma validate` valid; `migrate diff` reports no drift; migrations not rewritten.
- [x] Live migration-history reconciliation completed 2026-10-24: 10 finished ledger rows,
      clean `migrate status`, no schema diff, no learner-row changes; restore branch retained.

### 7.7 Existing-user transition approval
- [x] Transition policy implemented and dry-runnable (`lib/commercial/transition.ts`,
      `scripts/transition-dry-run.mjs`); default mode `OPEN` retains everyone. Operator
      procedure + safe-review checklist: `docs/operations/transition-operator-guide.md`.
- [x] Continuity verified for returning learners (`docs/engineering/learner-continuity.md`).
- [ ] Cohort analysis on a **production snapshot** — no production data is available here,
      so **no user counts are asserted**.
- [ ] Grandfathering / grace / notice policy approval by the owner.

### 7.8 Customer support, refund and legal disclosures
- [ ] Pricing/terms/cancellation/refund disclosures drafted (`docs/product/product-specification.md` §4/§11)
      but **not approved**.
- [ ] Notice period **not set**; no communications sent.
- [ ] Support scenarios (payment/handling) drafted, copy not approved.

### 7.9 Final release authorisation
- [ ] **Not given.** No deploy, no entitlement enforcement, no live payments.

### Technical verification (supporting evidence for 7.1–7.3)
- [x] Unit/integration tests: **472 pass / 0 fail / 0 skip** on disposable PostgreSQL.
- [x] Historical Playwright record: **40 passed** (returning-learner continuity and new-learner path). This is prior evidence, not a result from the current inspection. The current Playwright config now refuses to run without an explicit isolated `E2E_DATABASE_URL`; the suite must be rerun against a disposable database.
- [x] `tsc --noEmit` clean; lint clean; `prisma validate` valid; `migrate diff` empty.
- [x] Production build succeeds.

### Commerce safety flags (must remain for this package)
- `COMMERCE_CHECKOUT_ENABLED=false`
- `COMMERCE_ENTITLEMENTS_ENFORCED=false`
- `COMMERCE_PRICES_APPROVED=false`
- `COMMERCE_PROVIDER_TEST_MODE=false`

Checkout remains fail-closed in `lib/commercial/launch.ts` even if a flag is flipped.
