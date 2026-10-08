CREATE TABLE "LearnerProfile" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "primaryGoal" TEXT,
  "experienceLevel" TEXT,
  "weeklyHours" INTEGER,
  "recommendedTrackId" TEXT,
  "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "LearnerProfile_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "LearnerProfile_userId_key" ON "LearnerProfile"("userId");
CREATE INDEX "LearnerProfile_recommendedTrackId_idx" ON "LearnerProfile"("recommendedTrackId");

ALTER TABLE "LearnerProfile"
  ADD CONSTRAINT "LearnerProfile_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
