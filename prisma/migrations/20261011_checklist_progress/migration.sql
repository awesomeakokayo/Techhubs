-- CreateEnum
CREATE TYPE "ChecklistKind" AS ENUM ('STAGE', 'PROJECT');

-- CreateTable
CREATE TABLE "ChecklistProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,
    "kind" "ChecklistKind" NOT NULL,
    "itemKey" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChecklistProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ChecklistProgress_userId_trackId_idx" ON "ChecklistProgress"("userId", "trackId");

-- CreateIndex
CREATE UNIQUE INDEX "ChecklistProgress_userId_trackId_kind_itemKey_key" ON "ChecklistProgress"("userId", "trackId", "kind", "itemKey");

-- AddForeignKey
ALTER TABLE "ChecklistProgress" ADD CONSTRAINT "ChecklistProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
