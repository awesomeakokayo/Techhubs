-- Add optional purchase attribution. Existing orders remain unchanged.
ALTER TABLE "PaymentOrder"
  ADD COLUMN "campaignId" TEXT,
  ADD COLUMN "attribution" JSONB;
