CREATE TABLE "LearningEvent" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "eventName" TEXT NOT NULL,
  "trackId" TEXT,
  "stepId" TEXT,
  "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "LearningEvent_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "LearningEvent_userId_createdAt_idx" ON "LearningEvent"("userId", "createdAt");
CREATE INDEX "LearningEvent_userId_eventName_idx" ON "LearningEvent"("userId", "eventName");

ALTER TABLE "LearningEvent"
  ADD CONSTRAINT "LearningEvent_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
