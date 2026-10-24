-- TechSkillHub / Neon PostgreSQL schema preflight
-- READ-ONLY. This file deliberately does not apply DDL or write migration records.
-- Run in Neon SQL Editor before deciding which migrations, if any, are pending.

SELECT
  current_database() AS database_name,
  current_user AS database_role,
  current_schema() AS current_schema,
  current_timestamp AS checked_at,
  to_regclass('public."_prisma_migrations"') IS NOT NULL AS prisma_migrations_table_exists;

-- Check the tables needed by the retention/dashboard, billing, and assessment work.
WITH expected(table_name, migration_group) AS (
  VALUES
    ('User', 'baseline'),
    ('UserProgress', 'baseline'),
    ('Subscription', 'baseline + commercial billing'),
    ('PaymentOrder', 'baseline + commercial billing'),
    ('TrackAccess', 'baseline'),
    ('CourseCompletion', 'baseline'),
    ('LearnerProfile', 'retention profile'),
    ('LearningEvent', 'streaks / learning events'),
    ('NotificationPreference', 'notifications'),
    ('NotificationLog', 'notifications'),
    ('ChecklistProgress', 'checklist persistence'),
    ('EntitlementEvent', 'billing audit trail'),
    ('TrackPassPurchase', 'time-limited Track Pass history'),
    ('AssessmentCreditBucket', 'assessment allowance accounting'),
    ('AssessmentCreditReservation', 'race-safe assessment reservations')
)
SELECT
  expected.table_name,
  expected.migration_group,
  (found.table_name IS NOT NULL) AS table_exists
FROM expected
LEFT JOIN information_schema.tables AS found
  ON found.table_schema = 'public'
 AND found.table_name = expected.table_name
ORDER BY expected.migration_group, expected.table_name;

-- Check enum types and their actual values, without assuming a migration ran.
WITH expected(type_name) AS (
  VALUES
    ('SubscriptionStatus'),
    ('SubscriptionPlan'),
    ('PaymentProvider'),
    ('PaymentStatus'),
    ('PricingRegion'),
    ('ChecklistKind'),
    ('TrackPassStatus'),
    ('AssessmentReservationStatus')
)
SELECT
  expected.type_name,
  (types.oid IS NOT NULL) AS type_exists,
  COALESCE(
    array_agg(enum_values.enumlabel ORDER BY enum_values.enumsortorder)
      FILTER (WHERE enum_values.enumlabel IS NOT NULL),
    ARRAY[]::text[]
  ) AS current_values
FROM expected
LEFT JOIN pg_type AS types
  ON types.typname = expected.type_name
LEFT JOIN pg_namespace AS namespaces
  ON namespaces.oid = types.typnamespace
 AND namespaces.nspname = 'public'
LEFT JOIN pg_enum AS enum_values
  ON enum_values.enumtypid = types.oid
GROUP BY expected.type_name, types.oid
ORDER BY expected.type_name;

-- Check important columns introduced by retention and commercial migrations.
WITH expected(table_name, column_name) AS (
  VALUES
    ('LearnerProfile', 'dailyGoalSteps'),
    ('LearnerProfile', 'timeZone'),
    ('LearnerProfile', 'plannedStudyDays'),
    ('Subscription', 'provider'),
    ('Subscription', 'providerCustomerId'),
    ('Subscription', 'providerSubscriptionId'),
    ('Subscription', 'productCode'),
    ('Subscription', 'cancelAtPeriodEnd'),
    ('Subscription', 'providerUpdatedAt'),
    ('PaymentOrder', 'provider'),
    ('PaymentOrder', 'productCode'),
    ('PaymentOrder', 'providerCheckoutId'),
    ('PaymentOrder', 'providerPaymentId')
)
SELECT
  expected.table_name,
  expected.column_name,
  (found.column_name IS NOT NULL) AS column_exists,
  found.data_type
FROM expected
LEFT JOIN information_schema.columns AS found
  ON found.table_schema = 'public'
 AND found.table_name = expected.table_name
 AND found.column_name = expected.column_name
ORDER BY expected.table_name, expected.column_name;

-- If the first query reports prisma_migrations_table_exists = true, run this
-- follow-up separately to inspect exact migration history:
--
-- SELECT migration_name, started_at, finished_at, rolled_back_at
-- FROM public."_prisma_migrations"
-- ORDER BY started_at;
