ALTER TABLE "LearnerProfile"
  ADD COLUMN "dailyGoalSteps" INTEGER NOT NULL DEFAULT 1,
  ADD COLUMN "timeZone" TEXT NOT NULL DEFAULT 'Africa/Lagos';

CREATE INDEX "UserProgress_userId_completedAt_idx"
  ON "UserProgress"("userId", "completedAt");
