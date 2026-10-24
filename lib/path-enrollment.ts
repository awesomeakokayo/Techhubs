/**
 * Guided-path enrollment versioning.
 *
 * When a path's step list changes we must move the learner to the equivalent
 * point in the new path — not restart them. `lib/path-compat.ts` owns the pure
 * policy (stable step keys + position preservation); this module is the thin,
 * dependency-light database layer so the migration can be integration tested
 * against a disposable database without invoking a route handler.
 *
 * Guarantees:
 *   - a completed course stays completed;
 *   - an incomplete path resumes at the correct equivalent step (never reset to
 *     the first step merely because the version number changed);
 *   - a newly required assessment is never skipped using historical activity;
 *   - every historical record (progress, submissions, assessment history) is
 *     preserved untouched.
 */

import type { PrismaClient } from '@prisma/client'
import { AI_GUIDED_PATH_VERSION } from './guided-path'
import {
  guidedStepKey,
  isAssessmentStepType,
  pathUpdateNoticeFromRecord,
  resolveCompatiblePathIndex,
  userProgressStepKey,
  type CompatibilityResult,
  type PathUpdateNotice,
  type StepIdentity,
} from './path-compat'

export interface MigrateEnrollmentInput {
  userId: string
  trackId: string
  /** The ordered steps of the current path. */
  steps: (StepIdentity & { type: string })[]
  expectedVersion: number
}

export interface MigrateEnrollmentResult {
  migrated: boolean
  currentStepIndex: number | null
  /** Details of the remap when one occurred, for the learner-facing notice. */
  compatibility: CompatibilityResult | null
  fromVersion: number | null
  toVersion: number | null
  /**
   * The notice to show the learner, if any. Persisted after an update so it
   * survives reloads, duplicate requests and prefetches, and cleared only when
   * the learner dismisses it.
   */
  pathUpdate: PathUpdateNotice | null
}

function emptyResult(fromVersion: number | null, toVersion: number | null, pathUpdate: PathUpdateNotice | null = null): MigrateEnrollmentResult {
  return { migrated: false, currentStepIndex: null, compatibility: null, fromVersion, toVersion, pathUpdate }
}

/** Read the last recorded path version for a learner's track, defaulting to 1. */
export function readStoredPathVersion(data: unknown, trackId: string): number {
  const stored = data && typeof data === 'object' && !Array.isArray(data) ? (data as Record<string, unknown>) : {}
  if (typeof stored.guidedPathVersion === 'number') return stored.guidedPathVersion
  if (trackId.startsWith('ai-') && stored.aiGuidedPathVersion === AI_GUIDED_PATH_VERSION) return AI_GUIDED_PATH_VERSION
  return 1
}

/** Reconstruct the set of stable step keys a learner has genuinely completed. */
export function completedStepKeys(
  records: { itemType: string; stageId: number | null; resourceId: string | null }[],
): Set<string> {
  const keys = new Set<string>()
  for (const record of records) {
    const key = userProgressStepKey(record)
    if (key) keys.add(key)
  }
  return keys
}

/**
 * Migrate an existing enrollment when its stored path version differs from the
 * expected one (or repair a learner the old restart policy left at step 0).
 * Assumes the enrollment row already exists.
 */
export async function migrateEnrollmentIfNeeded(
  prisma: PrismaClient,
  input: MigrateEnrollmentInput,
): Promise<MigrateEnrollmentResult> {
  const { userId, trackId, expectedVersion } = input
  const steps = input.steps ?? []
  const stepKeys = steps.map((step) => guidedStepKey(step))
  const totalSteps = steps.length

  const enrollment = await prisma.guidedPathEnrollment.findUnique({
    where: { userId_trackId: { userId, trackId } },
  })
  if (!enrollment) return emptyResult(null, null)

  const trackProgress = await prisma.userTrackProgress.findUnique({
    where: { userId_trackId: { userId, trackId } },
  })
  const storedData =
    trackProgress?.data && typeof trackProgress.data === 'object' && !Array.isArray(trackProgress.data)
      ? (trackProgress.data as Record<string, unknown>)
      : {}
  const storedVersion = readStoredPathVersion(storedData, trackId)
  // An update that has not yet been dismissed stays visible across reloads.
  const persistedNotice = pathUpdateNoticeFromRecord(storedData.pathCompatibility)

  const versionChanged = storedVersion !== expectedVersion
  // The old policy could leave an affected learner at step 0 with real completed
  // activity behind them. Re-running the mapping repairs that without ever
  // moving anyone backwards, so no learner is stranded by the previous policy.
  const repairStalledAtZero = !versionChanged && enrollment.currentStepIndex === 0

  if (!versionChanged && !repairStalledAtZero) {
    return emptyResult(storedVersion, expectedVersion, persistedNotice)
  }

  const [completion, completedRecords] = await Promise.all([
    prisma.courseCompletion.findUnique({ where: { userId_trackId: { userId, trackId } } }),
    prisma.userProgress.findMany({
      where: { userId, trackId, status: 'COMPLETED' },
      select: { itemType: true, stageId: true, resourceId: true },
    }),
  ])

  const completedKeys = completedStepKeys(completedRecords)

  if (repairStalledAtZero && completedKeys.size === 0) {
    // A genuinely new learner who has not completed anything yet.
    return emptyResult(storedVersion, expectedVersion, persistedNotice)
  }

  const compatibility = resolveCompatiblePathIndex({
    isCompleted: Boolean(completion),
    totalSteps,
    storedStepIndex: enrollment.currentStepIndex,
    completedKeys,
    stepKeys,
    repairStalledAtZero,
  })

  if (repairStalledAtZero && compatibility.index <= enrollment.currentStepIndex) {
    // Nothing to recover.
    return emptyResult(storedVersion, expectedVersion, persistedNotice)
  }

  const strategy = compatibility.strategy === 'preserved' && repairStalledAtZero ? 'recovered' : compatibility.strategy
  const compatibilityRecord = {
    fromVersion: storedVersion,
    toVersion: expectedVersion,
    strategy,
    adoptedSteps: compatibility.adoptedSteps,
    at: new Date().toISOString(),
  }

  await prisma.$transaction([
    prisma.guidedPathEnrollment.update({
      where: { userId_trackId: { userId, trackId } },
      data: { currentStepIndex: compatibility.index },
    }),
    prisma.userTrackProgress.upsert({
      where: { userId_trackId: { userId, trackId } },
      create: {
        userId,
        trackId,
        data: { guidedPathVersion: expectedVersion, pathCompatibility: compatibilityRecord },
      },
      update: {
        data: { ...storedData, guidedPathVersion: expectedVersion, pathCompatibility: compatibilityRecord },
      },
    }),
  ])

  return {
    migrated: true,
    currentStepIndex: compatibility.index,
    compatibility: { ...compatibility, strategy },
    fromVersion: storedVersion,
    toVersion: expectedVersion,
    pathUpdate: pathUpdateNoticeFromRecord(compatibilityRecord),
  }
}

/** Dismiss the path-update notice for a learner's track (no progression effect). */
export async function acknowledgePathUpdate(
  prisma: PrismaClient,
  input: { userId: string; trackId: string },
): Promise<void> {
  const { userId, trackId } = input
  const trackProgress = await prisma.userTrackProgress.findUnique({
    where: { userId_trackId: { userId, trackId } },
  })
  const storedData =
    trackProgress?.data && typeof trackProgress.data === 'object' && !Array.isArray(trackProgress.data)
      ? (trackProgress.data as Record<string, unknown>)
      : {}
  const record = storedData.pathCompatibility
  if (!record || typeof record !== 'object' || Array.isArray(record)) return

  await prisma.userTrackProgress.update({
    where: { userId_trackId: { userId, trackId } },
    data: { data: { ...storedData, pathCompatibility: { ...(record as Record<string, unknown>), acknowledged: true } } },
  })
}

/** Re-exported so route/server code can describe a step without importing the policy module. */
export { isAssessmentStepType }
