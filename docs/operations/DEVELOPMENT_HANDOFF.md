# TechSkillHub — Development Handoff

**Current status last checked:** 2026-10-28. GitHub repository metadata and source files were inspected remotely; the requested local commands were not executed in this session.

## Current repository state (2026-10-28)

- **Production branch:** `main` at `610f0162c67436cdf804f5bfdb131b624d02122c` as last verified on October 28.
- **PR #4 — `feat/retention-v3`:** GitHub records this PR as merged on 2026-10-24.
- **PR #5 — `audit/techskillhub-security-cleanup`:** GitHub records this stacked PR as merged on 2026-10-24, after PR #4.
- **Current Phase 2 work:** draft PR [#11](https://github.com/awesomeakokayo/Techhubs/pull/11), branch `fix/curriculum-resource-gaps-20261028`. It adds curriculum-resource remediation, track-specific audience copy, salary-range removal, flagship client capstones/rubrics, and track-specific Track Pass terms. Do not merge until a fresh branch build, tests, audit and disposable-database E2E succeed.
- **Build failure diagnosis:** Vercel reported a syntax error in `lib/tracks.ts` at the duplicate array terminator `],    ],` in the AI Agents project list. That exact typo was removed in commit `eb1e94985378272aee7cc972c15d2d760cc73170`. Subsequent commits modify the branch further, so the newest Vercel status and build still need confirmation.
- **GitHub Actions:** the historical account billing lock prevented Actions runs. The Phase 2 branch changes `.github/workflows/phase-3-validation.yml` to manual dispatch only, to avoid automatic runs while the owner runs checks locally. That workflow change does not alter GitHub account or billing settings, and it does not affect `main` unless the PR is merged.
- **Track Pass term decision:** approved Option A for the current eligible premium tracks. The branch configures Frontend = 6 calendar months, Backend = 8 months, Python = 5 months, using the upper end of each published estimate. The ₦6,000 amount and payment-provider configuration are unchanged. The previous ₦6,000 review assumed a three-month term, so the revised offer requires commercial review before checkout or price publication is enabled.
- **Commerce safeguards:** keep `COMMERCE_CHECKOUT_ENABLED=false`, `COMMERCE_ENTITLEMENTS_ENFORCED=false`, `COMMERCE_PRICES_APPROVED=false`, and `COMMERCE_PROVIDER_TEST_MODE=false`. Do not modify these flags or payment-provider settings without separate approval.
- **Production database:** the migration guide records all 10 migrations as applied on 2026-10-24. This session did not query or modify the production database and did not run migrations.
- **E2E database:** Created disposable Neon branch `e2e/techskillhub-pr11-20261028` (`br-noisy-field-atgrn40x`) in project `blue-bread-46258191`, parented to the PR preview branch `br-blue-shadow-atymjb43` (not production `main`). A separate empty database named `techskillhub_e2e` was then created inside that child branch; it does not reuse the copied `neondb` application database. The copied branch's `public._prisma_migrations` metadata shows 10 expected migrations finished and none rolled back. No migration was run against any database in this session. Set `E2E_DATABASE_URL` temporarily in the local PowerShell session to the `techskillhub_e2e` URI from Neon Console, run `npx prisma migrate deploy` with `DATABASE_URL` temporarily set to that same URI, restore the prior `DATABASE_URL`, then run `npm run test:e2e`. Do not store the URI in Git, and never point E2E at production `DATABASE_URL`.
- **Local validation (user-provided Windows output, 2026-10-28):** `npx prisma validate` passed; `npm run build` completed successfully and generated 149/149 pages; `node scripts/curriculum-quality-audit.mjs --check` passed for all 32 catalogue tracks. `npm test` reported 515 passed, 1 failed, 29 skipped. The failure was a source-inspection assertion expecting LF-only line endings in `tests/security-hardening.test.js`; commit `90127d78c2e5d4430f375f68de796dae3c3adbac` normalizes CRLF before assertions. Pull the updated branch and rerun tests. A separate `npx tsc --noEmit -p tsconfig.json` invocation failed on stale `.next/types/app/page.ts` references to missing `app/page.js`, while the later production build's own lint/type-check phase passed. Clean `.next`, run the build, then rerun standalone TypeScript. The resource probe found 382/389 URLs reachable, with seven timeouts/fetch failures/403/429 results that need manual review; 300 URLs had content inspected. Playwright exited before running because the required `E2E_DATABASE_URL` was not set. `npm run lint` output is not present in the supplied log, so treat it as unverified.

This current-state section supersedes contradictory status statements in the historical handoff below. The older notes are retained as dated evidence of what was inspected and executed at that time. This document does not authorize merging PR #11, changing payment settings, enabling checkout, or touching the production database.

---

## 1. Historical verification scope (2026-10-24 baseline)

The previously recorded local validation results are a PR #4 baseline and are not a current-commit CI verdict for later PR #5 changes. GitHub Actions validation has been unable to start because GitHub reports an account billing lock; a green Vercel preview alone does not establish that the test suite passed.

Performed in this session:

- read-only Git inspection (branches, ancestry, working tree, authors, tracked files)
- `git fetch origin --prune` / `git fetch upstream --prune`
- secret-pattern scan over tracked source
- `npm run lint`
- `npm test`
- `npx tsc --noEmit -p tsconfig.json`
- `npx prisma validate`
- `npm run build`
- `node scripts/curriculum-quality-audit.mjs --check`

**Not performed, and why:**

| Check | Reason |
| --- | --- |
| Playwright E2E | Not run in this inspection because a disposable database was not supplied. `playwright.config.ts` now fails closed unless `E2E_DATABASE_URL` is explicit and different from configured shared `DATABASE_URL` values. |
| Resource link probe (`scripts/verify-resource-links.mjs`) | Probes ~326 external URLs; not re-run in this session. Prior result is recorded below. |
| `prisma migrate diff` | Needs a shadow database. Prior evidence reports "No difference detected"; not re-run here. |
| DB integration tests | 29 tests skip unless `TSH_CHECKLIST_IMPORT_TEST_DB` points at a disposable database. |
| Live migration history | Reconciled on production Neon on 2026-10-24; ten migrations are applied and schema diff is empty. Payment/provider configuration and real provider sandbox transactions remain untouched. |
| Google OAuth production flow | Requires the real client and callback URL. Not exercised. |

At the time of the earlier repository inspection, no production database, deployment, billing setting, or credential was read or modified. A separate production Neon schema migration was subsequently completed on 2026-10-24; see `docs/database/NEON_MIGRATION_GUIDE.md`. Payment settings and production deployment configuration were not changed.

---

## 2. Historical repository and branch map (2026-10-24 baseline)

| Ref | Purpose | State |
| --- | --- | --- |
| `main` | Production branch; Vercel deploys it | `a4dc39c` — includes the certificate download fix and founder analytics |
| `feat/retention-v3` | Active development: retention v1–v3 plus the launch/curriculum/commercial work | `bed93f1`; 61 commits ahead of `origin/main`; PR #4 open |
| `feat/retention-v1` | Historical retention work | Fully contained in v3 |
| `feat/retention-v2` | Historical retention work | Fully contained in v3 |
| `phase-3-ai-world-class-rebuild` | Earlier AI rebuild | Merged via PR #1 |
| `phase-3a-ai-resource-map` | Earlier resource mapping | Draft PR #2; superseded by the curriculum package |
| `docs/project-documentation` | Documentation-system PR #3 (opened 2026-09-22) | Open, not merged, stale relative to this tree |

`origin` and `upstream` both point at `https://github.com/awesomeakokayo/Techhubs.git`.

**Note:** the 12 unpushed commits are all authored by `Awesome Akokayo <awesomeakokayo@gmail.com>`.
No AI agent, bot, or co-author trailer was added.

### Publication and CI status at the 2026-10-24 inspection

- `feat/retention-v3` is pushed and PR #4 targets `main`.
- The Vercel preview for commit `7c2d5e8` succeeded at the time of the publication record.
- GitHub Actions validation could not start because GitHub reported an account billing lock. This is a CI availability blocker, not evidence that the current changes passed CI.
- `main` remains unchanged. Merging, production deployment, live migrations, and payment activation remain separate owner-approved actions.

## 3. Architecture

| Layer | Implementation |
| --- | --- |
| Framework | Next.js `14.2.35`, App Router, React `18.3`, TypeScript `5.7` |
| Styling | Tailwind CSS `3.4`, custom design tokens in `styles/globals.css` |
| Database | PostgreSQL (Neon in the deployed environment) via Prisma `5.22` |
| Auth | NextAuth v5 beta, Google OAuth, JWT sessions, Prisma adapter; fail-closed test credentials only outside production |
| Hosting | Vercel (production on `main`, previews on branches) |
| AI assessment | DeepSeek provider by default; public GitHub repository inspection; atomically reserved monthly credits |
| Payments | Paystack for Nigerian Track Pass (₦6,000 / three calendar months); Lemon Squeezy for potential international plans whose USD prices remain unapproved; signed-webhook-driven entitlements and fail-closed checkout |
| Email | Nodemailer/SMTP for the contact form |
| Analytics | `@vercel/analytics`, `@vercel/speed-insights`, first-party learning events |

### Route structure

- `app/(marketing)` — public catalogue, tracks, roadmaps, projects, resources, careers, pricing, guides, help center
- `app/(app)` — authenticated learner area: dashboard, learning home, plan, achievements, account, guided path, certificate
- `app/(auth)` — login
- `middleware.ts` — protects `/account`, `/dashboard`, `/learning`, `/plan`, `/achievements`, `/certificate/*`, `/guided-path/*`

### API surface

`app/api` contains: auth, access, certificate, guided-path, progress, checklist-progress
(plus import), learner-profile, notification-preferences, events, project-verification,
billing (checkout/cancel/entitlements), payments (initialize/verify/confirm/cancel/pricing/webhook),
Lemon Squeezy webhook, contact, and a production-gated `debug` route.

### Data model

19 Prisma models: `User`, `LearnerProfile`, `Account`, `Session`, `VerificationToken`,
`Subscription`, `UserProgress`, `UserTrackProgress`, `ChecklistProgress`,
`GuidedPathEnrollment`, `PaymentOrder`, `TrackPassPurchase`, `TrackAccess`,
`CourseCompletion`, `LearningEvent`, `AssessmentCreditBucket`,
`AssessmentCreditReservation`, `NotificationPreference`, `NotificationLog`,
`EntitlementEvent`.

10 tracked migrations under `prisma/migrations/` (`0_init` through
`20261015_assessment_credit_reservation`). Production migration history was reconciled on
2026-10-24: all 10 migrations are finished, `migrate status` is up to date, and
`migrate diff` reports no schema drift. See `docs/database/NEON_MIGRATION_GUIDE.md`.

---

## 4. Feature status

Status vocabulary: **Working (tested)** = code path exists and is covered by automated
tests that passed here; **Implemented, externally unverified** = code exists and unit
tests pass, but a real external service was not exercised; **Partial** = some of the
journey is missing or unverified; **Blocked** = requires credentials, approval, or data.

| Area | Status | Evidence and caveats |
| --- | --- | --- |
| Track catalogue and roadmaps | Working (tested) | 32 tracks / 186 progression-bearing stages; catalogue-integrity and curriculum-structure tests pass; pages are statically generated. |
| Guided learning paths | Working (tested) | Server-side sequential progression, server-graded quizzes, durable attempts, project gates, versioned enrolments. Covered by guided-path, quiz-attempt, path-continuity and route-source tests. |
| Curriculum content package | Working (tested); human review pending | Authored lessons, worked examples, knowledge checks, stage projects, reviewer packets. `curriculum-quality-audit --check` exits 0 for all 32 tracks. Human sign-off is **0/32**. |
| Onboarding and personalization | Working (tested) | `/find-your-path` quiz, learner profile API, quiz-preference persistence, pace estimates. |
| Accounts and progress persistence | Working (tested) | Google OAuth code path, JWT sessions, `UserProgress`, `GuidedPathEnrollment`, `ChecklistProgress`, legacy progress import. Google OAuth production flow is unverified. |
| Learning home, streaks, goals, weekly plan | Working (tested) | Retention v1–v3: daily goal, timezone, streaks, milestones, weekly schedule, adherence, re-engagement. Unit tests pass. |
| Certificates | Working (tested) | Issued only on guided-path completion; certificate-flow tests pass; browser-native download fix is on `main`. |
| Projects and portfolio | Working (tested) | Catalogue projects plus embedded stage projects; project-readiness and coverage tests pass. |
| AI project verification | Implemented, externally unverified | DeepSeek/GitHub pipeline, evidence contracts, rubric versioning, credit reservation, fail-closed parsing. Unit/integration tests pass; no live provider call was made in this session. |
| Career guides and resources | Working (content not re-reviewed) | Public careers/guides/resource pages render from repository content. Content quality was not re-audited here. |
| Commercial billing and entitlements | Implemented, fail-closed | Plans, pricing, entitlements, credits, rollout, transition and shadow evaluation exist and are tested. Checkout/entitlements/prices flags remain `false`; no provider sandbox transaction. |
| Payments (Lemon Squeezy / Paystack) | Implemented, externally unverified | Webhook verification, idempotency and fulfilment tests pass. Merchant, variant, NGN pricing, payout and sandbox verification are outstanding. |
| SEO | Implemented | Metadata helpers, `sitemap.ts`, `robots.ts`, static generation for catalogue routes. No Lighthouse/Core Web Vitals run in this session. |
| Responsive design and accessibility | Partial | A prior E2E suite reported a mobile-layout and no-hydration pass; that suite was not re-run here. No dedicated automated accessibility audit. |
| Rate limiting | Missing (launch blocker) | No shared-store limiter for contact or authenticated write endpoints. See `docs/operations/LAUNCH_READINESS.md` §2. |
| Live migration history | Reconciled (2026-10-24) | Ten migrations applied to production Neon branch `main`. Final `migrate status` clean, `migrate diff` empty, learner rows unchanged. Restore branch `backup/pre-migration-20261024` retained. See `docs/database/NEON_MIGRATION_GUIDE.md`. |

### Catalogue quality

The generated audit (`scripts/curriculum-quality-report.json`,
`docs/curriculum-stage-evidence.md`) records one evidence row per stage. The audit was
re-run on 2026-10-24 from the committed 2026-10-22 resource probe and now reports
**437 probe URLs, 346 content-inspected (level 3), 98 required-but-level-2**
(video/interactive), 1 level-1, and 4 unresolved URLs: `react.dev`, `react.dev/learn`
(status 0 — probe failure, not evidence the site is down), OWASP API Security (404) and
TryHackMe `/paths` (429). All four are supplementary; no stage depends on them for its
required resource. Re-probe before acting on the two `react.dev` entries.
Video playback/runtime remains unverifiable in this environment. No live provider call
was made.

---

## 5. Baseline verification results (PR #4, before latest PR #5 changes)

| Check | Command | Result |
| --- | --- | --- |
| Lint | `npm run lint` | Clean — no warnings or errors |
| Unit/contract tests | `npm test` | **525 tests: 496 pass, 0 fail, 29 skipped** |
| Type check | `npx tsc --noEmit -p tsconfig.json` | Exit 0 |
| Prisma schema | `npx prisma validate` | Valid |
| Production build | `npm run build` | Success; full route table generated |
| Curriculum audit | `node scripts/curriculum-quality-audit.mjs --check` | Exit 0 — 32/32 tracks meet thresholds and gates |
| Secret scan | tracked source, excluding docs/example env | No credential-like patterns found |

The 29 skips are database-backed integration tests gated on
`TSH_CHECKLIST_IMPORT_TEST_DB`. Prior runs on a disposable PostgreSQL recorded
470–472 passing tests with zero skips. The difference is environmental, not a regression.

CI (`.github/workflows/phase-3-validation.yml`) runs lint, tests and a production build
on pull requests to `main` and on pushes to the retention branches. It does not run
Playwright or a database-backed test job.

---

## 6. Known issues, debt and blockers

1. **GitHub Actions billing lock.** The feature branch is pushed and PR #4 is open, but the validation job did not start because the GitHub account is locked due to a billing issue. Re-run CI after the billing blocker is resolved.
2. **Playwright requires an isolated database.** The configuration now refuses to start unless `E2E_DATABASE_URL` is explicitly set to PostgreSQL and does not resolve to the same normalized host/database target as any configured shared `DATABASE_URL` in the process environment or Next.js dotenv files. The guard ignores port and credentials and normalizes a common managed-PostgreSQL pooler hostname suffix. E2E was not run in this inspection.
3. **No rate limiting** on public/authenticated write endpoints (Vercel serverless;
   needs Upstash/Vercel KV or edge WAF).
4. **Live migration history — resolved 2026-10-24.** All 10 migrations are applied to
   production; `_prisma_migrations` holds ten finished rows. A restore branch
   (`backup/pre-migration-20261024`) is retained. Keep using the direct/unpooled endpoint
   for future `prisma migrate` runs, and correct `DATABASE_URL_UNPOOLED` in `.env.local`
   (it still duplicates the pooled URL).
5. **Four unresolved supplementary resources** and unverifiable video playback (see §4).
6. **Human curriculum sign-off absent** — `docs/curriculum-quality-signoff.json` does
   not exist; automated scores are not approval.
7. **Commercial release gates remain open** — the ₦6,000 / three-month Paystack Track Pass is individually approved in code, but global price publication, checkout and enforcement flags remain off; USD prices, provider sandbox, payout, refund/legal copy and existing-user transition are not yet cleared.
8. **Google OAuth production flow unverified.**
9. **`.env.example` was incomplete** — now extended with Google, Lemon Squeezy, SMTP and
   E2E variables (names and placeholders only).
10. **Research bundle organization** — the security-cleanup PR removes the exploded generated curriculum/reviewer output and duplicate extracted research folder from the tracked tree while preserving the source-deliverables ZIP, the resource-verification ZIP, checksums, and the generator source. Confirm a successful Vercel deployment for the current PR #5 head and restore a valid CI verdict after the GitHub billing lock is resolved before merging.
11. **Stacked branch history** — v1/v2/v3 are sequential; v3 contains all prior work.
    Open one PR from v3 to `main`; do not merge v1/v2 separately.
12. **PR #3 (`docs/project-documentation`) is stale.** It adds an architecture/deployment
    documentation set based on an older tree. Rebase or close it after this branch lands
    to avoid contradictory docs.

---

## 7. Continuing development through ChatGPT

A GitHub connection alone is **not** an execution environment. To continue with the
laptop off, one of these is required:

- **GitHub Codespaces / dev container** — full Node, Prisma and Playwright execution.
- **GitHub Actions** — lint/test/build already run; add a disposable PostgreSQL service
  and an E2E job if browser coverage is needed.
- **Vercel preview + Neon branch** — for runtime verification against an isolated
  database.

Requirements and guardrails:

1. Write access to `awesomeakokayo/Techhubs` for the account used by the agent.
2. Secrets belong in Vercel/Neon/Codespaces secret stores, never in the repository.
   `.env` and `.env*.local` are gitignored; only `.env.example` is tracked.
3. Never point tests or E2E at the production database. Create a Neon branch or a
   disposable PostgreSQL instance and set `DATABASE_URL`/`E2E_DATABASE_URL` explicitly.
4. Pushing a branch creates a Vercel **preview**; pushing/merging to `main` deploys
   **production**. There is no deployment workflow in the repo; Vercel's Git integration
   performs the deploy.
5. Migrations are additive and tracked. History is reconciled as of 2026-10-24, so
   `prisma migrate deploy` is now safe against the live database using the direct
   endpoint. Still follow the snapshot-plus-clone-rehearsal procedure in
   `docs/database/NEON_MIGRATION_GUIDE.md` for any new migration.
6. Keep commerce flags at their safe defaults until launch approval:
   `COMMERCE_CHECKOUT_ENABLED=false`, `COMMERCE_ENTITLEMENTS_ENFORCED=false`,
   `COMMERCE_PRICES_APPROVED=false`, `COMMERCE_PROVIDER_TEST_MODE=false`.

---

## 8. Next tasks, in priority order

**P0 — review and validate**

1. Resolve the GitHub Actions billing lock and re-run lint, unit/contract tests, type-check, Prisma validation, production build, and curriculum audit.
2. Run Playwright only against a disposable PostgreSQL database supplied through `E2E_DATABASE_URL`.
3. Review PR #4 and the follow-up hardening/cleanup changes together; merge to `main` only with owner approval, because the merge triggers Vercel production deployment.

**P1 — safety before any launch**

5. Add a guard that refuses to run E2E when `E2E_DATABASE_URL` is unset or equals
   `DATABASE_URL` in a production-like environment.
6. Implement shared-store rate limiting for contact and authenticated write routes.
7. Reconcile live migration history on a snapshot/clone (approval required).
8. Verify Google OAuth with the production client and callback URL.

**P2 — launch readiness**

9. Obtain human subject-matter sign-off per track (reviewer packets are ready).
10. Re-probe the four unresolved resources; replace or document them.
11. Approve prices and NGN values; run the Lemon Squeezy and Paystack sandbox matrix;
    confirm payout readiness and refund/legal copy.
12. Run the existing-learner transition dry run on a production **snapshot** and approve
    grandfathering/notice policy.

**P3 — product quality**

13. Re-run the Playwright suite against a disposable database and add it to CI.
14. Accessibility and responsive audit; Lighthouse/Core Web Vitals pass.
15. Content refresh and course review for currency and beginner-friendliness.
16. Rebase or close PR #3 so documentation has one source of truth.

---

## 9. Command reference

```bash
# install and generate
npm install
npx prisma generate

# local development
npm run dev

# checks
npm run lint
npm test
npx tsc --noEmit -p tsconfig.json
npx prisma validate
npm run build
node scripts/curriculum-quality-audit.mjs --check

# E2E — only with a disposable database
E2E_DATABASE_URL="postgresql://..." npm run test:e2e
```

---

## 10. Publishing record

Published on 2026-10-24:

- `feat/retention-v3` is pushed at `bed93f1` (61 commits ahead of `main` at inspection).
- Pull request: [#4 — Retention v3, curriculum package and launch readiness](https://github.com/awesomeakokayo/Techhubs/pull/4)
  (`feat/retention-v3` → `main`), mergeable at the time of opening.
- Vercel **preview** deployment for `7c2d5e8`: succeeded.
- GitHub Actions `validate`: **did not start** because GitHub reported an account billing lock. This is not a code result; resolve billing before treating CI as available.
- `main` is unchanged. No merge, production deployment, migration or payment activation
  was performed.

Subsequent documentation commits on this branch update this record and are pushed to the
same branch; the PR updates automatically.
