-- Track Pass becomes a six-calendar-month, one-time purchase period.
--
-- Additive only: a new enum and a new table are created. No existing column,
-- table or migration is modified, so legacy PaymentOrder / TrackAccess /
-- Subscription / progress / certificate records are preserved untouched and no
-- existing learner access can expire as a result of this migration.
--
-- The new table records each verified purchase period separately from legacy
-- `TrackAccess` rows, giving an auditable history of repurchases. The unique
-- `orderReference` guarantees that webhook retries and duplicate deliveries
-- cannot create a second period for the same payment.

-- CreateEnum
CREATE TYPE "TrackPassStatus" AS ENUM ('ACTIVE', 'EXPIRED', 'REVOKED');

-- CreateTable
CREATE TABLE "TrackPassPurchase" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,
    "provider" "PaymentProvider" NOT NULL,
    "status" "TrackPassStatus" NOT NULL DEFAULT 'ACTIVE',
    "startedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "pricingVersion" TEXT,
    "providerPaymentId" TEXT,
    "orderReference" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrackPassPurchase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TrackPassPurchase_orderReference_key" ON "TrackPassPurchase"("orderReference");

-- CreateIndex
CREATE INDEX "TrackPassPurchase_userId_trackId_idx" ON "TrackPassPurchase"("userId", "trackId");

-- CreateIndex
CREATE INDEX "TrackPassPurchase_userId_expiresAt_idx" ON "TrackPassPurchase"("userId", "expiresAt");

-- CreateIndex
CREATE INDEX "TrackPassPurchase_status_expiresAt_idx" ON "TrackPassPurchase"("status", "expiresAt");

-- AddForeignKey
ALTER TABLE "TrackPassPurchase" ADD CONSTRAINT "TrackPassPurchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackPassPurchase" ADD CONSTRAINT "TrackPassPurchase_orderReference_fkey" FOREIGN KEY ("orderReference") REFERENCES "PaymentOrder"("reference") ON DELETE CASCADE ON UPDATE CASCADE;
