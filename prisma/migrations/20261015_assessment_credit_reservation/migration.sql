-- Race-safe monthly AI-assessment credit accounting.
--
-- Additive only: a new enum and two new tables are created. No existing column,
-- table or migration is modified, so all learner progress, submissions,
-- completions, certificates, legacy TrackAccess rows and payment records are
-- preserved untouched. No existing learner loses access as a result of this
-- migration.
--
-- Design (see docs/assessment-credit-concurrency.md):
--   * AssessmentCreditBucket: one row per (user, UTC calendar month). It is
--     locked with SELECT ... FOR UPDATE to serialize capacity decisions, and it
--     snapshots the tier/allowance that applied for the period.
--   * AssessmentCreditReservation: one durable row per logical assessment
--     request. `userId + requestId` is unique, so duplicate requests and retries
--     cannot reserve or consume more than one credit for the same assessment.
--   * An un-resolved reservation past `expiresAt` no longer counts against
--     capacity, so a crashed process cannot permanently exhaust a learner's
--     allowance.

-- CreateEnum
CREATE TYPE "AssessmentReservationStatus" AS ENUM ('RESERVED', 'CONSUMED', 'RELEASED', 'EXPIRED');

-- CreateTable
CREATE TABLE "AssessmentCreditBucket" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "periodStart" TIMESTAMP(3) NOT NULL,
    "tier" TEXT NOT NULL,
    "allowance" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AssessmentCreditBucket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AssessmentCreditBucket_userId_periodStart_key" ON "AssessmentCreditBucket"("userId", "periodStart");

-- CreateTable
CREATE TABLE "AssessmentCreditReservation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "periodStart" TIMESTAMP(3) NOT NULL,
    "status" "AssessmentReservationStatus" NOT NULL DEFAULT 'RESERVED',
    "credits" INTEGER NOT NULL DEFAULT 1,
    "tier" TEXT NOT NULL,
    "allowance" INTEGER NOT NULL,
    "trackId" TEXT,
    "stepId" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "consumedAt" TIMESTAMP(3),
    "releasedAt" TIMESTAMP(3),
    "releaseReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AssessmentCreditReservation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AssessmentCreditReservation_userId_requestId_key" ON "AssessmentCreditReservation"("userId", "requestId");

-- CreateIndex
CREATE INDEX "AssessmentCreditReservation_userId_periodStart_status_idx" ON "AssessmentCreditReservation"("userId", "periodStart", "status");

-- CreateIndex
CREATE INDEX "AssessmentCreditReservation_status_expiresAt_idx" ON "AssessmentCreditReservation"("status", "expiresAt");

-- AddForeignKey
ALTER TABLE "AssessmentCreditBucket" ADD CONSTRAINT "AssessmentCreditBucket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentCreditReservation" ADD CONSTRAINT "AssessmentCreditReservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
