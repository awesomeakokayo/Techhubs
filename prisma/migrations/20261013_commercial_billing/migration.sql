-- Commercial billing: Lemon Squeezy support, provider/product fields, audit trail.
-- Additive only. No existing column, table or migration is modified.
-- The new enum value is added but not used in this migration (PostgreSQL allows
-- ALTER TYPE ... ADD VALUE inside the migration transaction on PG 12+).

-- AlterEnum
ALTER TYPE "PaymentProvider" ADD VALUE 'LEMON_SQUEEZY';

-- AlterEnum (one-time Track Pass is represented as a plan value for legacy
-- compatibility with TrackAccess.plan / PaymentOrder.plan, which are non-null)
ALTER TYPE "SubscriptionPlan" ADD VALUE 'TRACK_PASS';

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "provider" "PaymentProvider";
ALTER TABLE "Subscription" ADD COLUMN     "providerCustomerId" TEXT;
ALTER TABLE "Subscription" ADD COLUMN     "providerSubscriptionId" TEXT;
ALTER TABLE "Subscription" ADD COLUMN     "productCode" TEXT;
ALTER TABLE "Subscription" ADD COLUMN     "cancelAtPeriodEnd" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Subscription" ADD COLUMN     "providerUpdatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "PaymentOrder" ADD COLUMN     "provider" "PaymentProvider";
ALTER TABLE "PaymentOrder" ADD COLUMN     "productCode" TEXT;
ALTER TABLE "PaymentOrder" ADD COLUMN     "providerCheckoutId" TEXT;
ALTER TABLE "PaymentOrder" ADD COLUMN     "providerPaymentId" TEXT;

-- CreateTable
CREATE TABLE "EntitlementEvent" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" TEXT,
    "providerEventId" TEXT,
    "type" TEXT NOT NULL,
    "planId" TEXT,
    "trackId" TEXT,
    "source" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EntitlementEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EntitlementEvent_providerEventId_key" ON "EntitlementEvent"("providerEventId");

-- CreateIndex
CREATE INDEX "EntitlementEvent_userId_createdAt_idx" ON "EntitlementEvent"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "EntitlementEvent_type_idx" ON "EntitlementEvent"("type");

-- AddForeignKey
ALTER TABLE "EntitlementEvent" ADD CONSTRAINT "EntitlementEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
