# Neon PostgreSQL migration and release runbook

**Status: preflight required; do not run production DDL yet.** The repository's
launch-readiness audit records a pending live Prisma migration-history recovery.
This environment does not have a direct Neon database connection, so I cannot
truthfully certify which tables or migrations currently exist in your database.

## What the feature branch adds

The Prisma schema and migration sequence cover:

- learner profile preferences: goal, timezone, daily step goal and planned study days;
- learning events used by streaks, retention and re-engagement;
- notification preferences and notification logs;
- durable checklist progress;
- canonical provider/order fields and billing audit events;
- per-purchase Track Pass access history;
- assessment-credit buckets and reservations for concurrency-safe monthly limits.

The migration source of truth is the SQL under prisma/migrations. The recent migrations
are:

1. 20261013_commercial_billing
2. 20261014_track_pass_six_months
3. 20261015_assessment_credit_reservation

The name of the historical second migration must **not** be changed: Prisma records
migration names and checksums. The Track Pass term has now changed in application code
to three calendar months; its verified expiry is already stored in TrackPassPurchase,
so that term change does not require an ALTER TABLE.

## Step 1 — read-only Neon preflight

1. Create a Neon branch/snapshot from the database you intend to use.
2. Open the Neon SQL Editor against the **snapshot/branch**, not the live production
   branch, and run [NEON_MIGRATION_PREFLIGHT.sql](./NEON_MIGRATION_PREFLIGHT.sql).
3. Save the results. If the table public."_prisma_migrations" exists, run the follow-up
   SELECT at the bottom of that SQL file to see which migrations have finished.
4. Compare the table, column and enum results with the migration files in this repo.

The SQL file is deliberately read-only. It does not create tables, alter enums, update
migration history or touch learner rows.

## Step 2 — reconcile migration history before adding schema

The previous handoff says that migration-history recovery is still pending and that
20261011_checklist_progress must not be marked as applied unless ChecklistProgress
actually exists. Do not mark a migration applied merely because its file is present.

Use a local checkout of the reviewed branch and a disposable database copy:

```bash
npx prisma validate
npx prisma migrate status
```

For migration commands, point DATABASE_URL at the **direct/unpooled Neon connection**
for the target copy. Do not point Playwright or integration tests at the production
database. Rehearse the exact migration-history resolution on a clone first. Only use
prisma migrate resolve --applied <migration-name> for migrations whose full schema
effects have been verified as already present.

Once the existing baseline/history is reconciled, apply only genuine pending migrations:

```bash
npx prisma migrate deploy
npx prisma migrate status
```

Then compare the database schema with prisma/schema.prisma and run the fresh-database
migration replay plus the repository's tests. The new commercial and assessment-credit
migrations must be included in that replay.

## Step 3 — production release gates

Before production migrations, snapshot Neon again and rehearse the same sequence on a
restored/schema-cloned database. Confirm that existing users' progress, completions,
certificates, legacy TrackAccess rows, subscriptions and payments remain intact.

Keep payment and entitlement environment flags disabled until the provider sandbox,
database migration checks, entitlement/legacy-user transition and deployment preview
all pass. Do not paste a combined SQL migration into production while the history is
unreconciled: even additive DDL can leave Prisma's migration ledger inconsistent.

## Why there is no one-shot production ALTER script yet

The correct DDL depends on the Neon schema and migration ledger currently present. The
read-only preflight is the first SQL to run. After those results are available, the
remaining DDL can be selected from the existing versioned migrations without guessing,
reapplying enum changes, or accidentally marking a missing table as already migrated.
