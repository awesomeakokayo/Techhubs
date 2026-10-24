'use strict'
/**
 * Integration: guided-path enrollment migration against disposable PostgreSQL.
 *
 * Historical-progress fixtures model learners who began under an earlier path
 * version. They prove the corrected contract: an incomplete learner's position
 * is preserved across a version bump (never silently restarted), completed work
 * and submitted evidence survive, newly required assessments are not bypassed,
 * and repeated/concurrent migrations neither duplicate nor corrupt state.
 */
const test = require('node:test')
const assert = require('node:assert/strict')
const { PrismaClient } = require('@prisma/client')
const { migrateEnrollmentIfNeeded, acknowledgePathUpdate } = require('../.test-dist/path-enrollment.js')

const testDbUrl = process.env.TSH_CHECKLIST_IMPORT_TEST_DB
const hasDb = Boolean(testDbUrl)

// A new path where stage 2 gained an extra resource after the learner's point.
const PRESERVE_STEPS = [
  { type: 'concept', stageId: 1 }, // 0
  { type: 'resource', stageId: 1, resourceId: 'cr-1' }, // 1
  { type: 'practice', stageId: 1 }, // 2
  { type: 'quiz', stageId: 1 }, // 3
  { type: 'concept', stageId: 2 }, // 4
  { type: 'resource', stageId: 2, resourceId: 'cr-2' }, // 5
  { type: 'resource', stageId: 2, resourceId: 'cr-2b' }, // 6  ← added later
  { type: 'practice', stageId: 2 }, // 7
  { type: 'quiz', stageId: 2 }, // 8
  { type: 'concept', stageId: 3 }, // 9
  { type: 'resource', stageId: 3, resourceId: 'cr-3' }, // 10
  { type: 'practice', stageId: 3 }, // 11
  { type: 'quiz', stageId: 3 }, // 12
]

// A new path where stage 1 gained a mandatory project before the learner's point.
const NEW_PROJECT_STEPS = [
  { type: 'concept', stageId: 1 }, // 0
  { type: 'resource', stageId: 1, resourceId: 'cr-1' }, // 1
  { type: 'practice', stageId: 1 }, // 2
  { type: 'quiz', stageId: 1 }, // 3
  { type: 'project', stageId: 1, projectId: 'cr-pnew' }, // 4  ← newly required
  { type: 'concept', stageId: 2 }, // 5
  { type: 'resource', stageId: 2, resourceId: 'cr-2' }, // 6
  { type: 'practice', stageId: 2 }, // 7
  { type: 'quiz', stageId: 2 }, // 8
]

/** Exactly the UserProgress rows the guided-path route writes per step type. */
function activityRows(userId, trackId, stageId, kinds) {
  const rows = []
  for (const kind of kinds) {
    if (kind.type === 'resource') {
      rows.push({ userId, trackId, itemType: 'stage', stageId, resourceId: kind.resourceId, status: 'COMPLETED', completedAt: new Date() })
    } else if (kind.type === 'practice') {
      rows.push({ userId, trackId, itemType: 'stage', stageId, resourceId: `step-practice-${stageId}`, status: 'COMPLETED', completedAt: new Date() })
    } else if (kind.type === 'quiz') {
      rows.push({ userId, trackId, itemType: 'stage', stageId, resourceId: `step-quiz-${stageId}`, status: 'COMPLETED', completedAt: new Date() })
    } else if (kind.type === 'project') {
      rows.push({ userId, trackId, itemType: 'project', stageId, resourceId: kind.projectId, status: 'COMPLETED', completedAt: new Date() })
    }
  }
  return rows
}

test(
  'integration: version bump preserves an incomplete learner at the equivalent position',
  { skip: hasDb ? false : 'TSH_CHECKLIST_IMPORT_TEST_DB is not set' },
  async () => {
    const prisma = new PrismaClient({ datasources: { db: { url: testDbUrl } } })
    const stamp = Date.now()
    const trackId = 'crypto'
    const users = await Promise.all(
      ['a', 'b', 'c'].map((suffix) => prisma.user.create({ data: { email: `cont-${suffix}-${stamp}@example.test` } })),
    )
    const [learner, other, completedLearner] = users

    try {
      // ── 1 & 2. Incomplete learner with several completed stages ──
      await prisma.guidedPathEnrollment.create({ data: { userId: learner.id, trackId, currentStepIndex: 7 } })
      await prisma.userTrackProgress.create({
        data: {
          userId: learner.id,
          trackId,
          data: {
            guidedPathVersion: 5,
            projectSubmissions: {
              'cr-p1': {
                status: 'passed',
                url: 'https://example.com/x',
                notes: 'kept',
                submittedAt: new Date().toISOString(),
                assessedAt: new Date().toISOString(),
                rubricVersion: '2024-11-rubric',
              },
            },
            projectSubmissionHistory: [
              { projectId: 'cr-p1', status: 'submitted', at: new Date().toISOString(), fingerprint: 'ev0' },
            ],
          },
        },
      })
      await prisma.userProgress.createMany({
        data: [
          ...activityRows(learner.id, trackId, 1, [{ type: 'resource', resourceId: 'cr-1' }, { type: 'practice' }, { type: 'quiz' }]),
          ...activityRows(learner.id, trackId, 2, [{ type: 'resource', resourceId: 'cr-2' }, { type: 'practice' }, { type: 'quiz' }]),
        ],
      })

      const first = await migrateEnrollmentIfNeeded(prisma, { userId: learner.id, trackId, steps: PRESERVE_STEPS, expectedVersion: 6 })
      assert.equal(first.migrated, true)
      assert.notEqual(first.currentStepIndex, 0, 'must NOT restart an incomplete path')
      assert.equal(first.currentStepIndex, 9, 'resumes at the first step after the completed work')
      assert.equal(first.compatibility.strategy, 'preserved')
      assert.equal(first.fromVersion, 5)
      assert.equal(first.toVersion, 6)

      const enrollment = await prisma.guidedPathEnrollment.findUnique({ where: { userId_trackId: { userId: learner.id, trackId } } })
      assert.equal(enrollment.currentStepIndex, 9)

      // Submitted evidence and other progress data are untouched.
      const progress = await prisma.userTrackProgress.findUnique({ where: { userId_trackId: { userId: learner.id, trackId } } })
      assert.equal(progress.data.guidedPathVersion, 6)
      assert.equal(progress.data.projectSubmissions['cr-p1'].status, 'passed')
      assert.equal(progress.data.projectSubmissions['cr-p1'].notes, 'kept')
      // Historical assessment decisions keep their original rubric version.
      assert.equal(progress.data.projectSubmissions['cr-p1'].rubricVersion, '2024-11-rubric')
      assert.equal(progress.data.projectSubmissionHistory.length, 1)
      assert.equal(progress.data.projectSubmissionHistory[0].fingerprint, 'ev0')
      assert.equal(progress.data.pathCompatibility.strategy, 'preserved')

      // ── 11. Re-running is idempotent and does not duplicate activity ──
      const activityBefore = await prisma.userProgress.count({ where: { userId: learner.id, trackId } })
      const again = await migrateEnrollmentIfNeeded(prisma, { userId: learner.id, trackId, steps: PRESERVE_STEPS, expectedVersion: 6 })
      assert.equal(again.migrated, false)
      assert.equal(again.currentStepIndex, null)
      const activityAfter = await prisma.userProgress.count({ where: { userId: learner.id, trackId } })
      assert.equal(activityAfter, activityBefore)

      // ── 4. A completed learner is preserved, and their submission survives ──
      await prisma.guidedPathEnrollment.create({ data: { userId: completedLearner.id, trackId, currentStepIndex: 3 } })
      await prisma.userTrackProgress.create({
        data: { userId: completedLearner.id, trackId, data: { guidedPathVersion: 5, projectSubmissions: {} } },
      })
      await prisma.userProgress.createMany({
        data: activityRows(completedLearner.id, trackId, 1, [{ type: 'resource', resourceId: 'cr-1' }]),
      })
      await prisma.courseCompletion.create({ data: { userId: completedLearner.id, trackId } })

      const done = await migrateEnrollmentIfNeeded(prisma, { userId: completedLearner.id, trackId, steps: PRESERVE_STEPS, expectedVersion: 6 })
      assert.equal(done.migrated, true)
      assert.equal(done.currentStepIndex, PRESERVE_STEPS.length)
      const certificate = await prisma.courseCompletion.findUnique({ where: { userId_trackId: { userId: completedLearner.id, trackId } } })
      assert.ok(certificate, 'the completion (and thus the certificate) is still valid')

      // ── A learner already on the current version is untouched ──
      await prisma.guidedPathEnrollment.create({ data: { userId: other.id, trackId, currentStepIndex: 4 } })
      await prisma.userTrackProgress.create({ data: { userId: other.id, trackId, data: { guidedPathVersion: 6 } } })
      const otherResult = await migrateEnrollmentIfNeeded(prisma, { userId: other.id, trackId, steps: PRESERVE_STEPS, expectedVersion: 6 })
      assert.equal(otherResult.migrated, false)
      const otherEnrollment = await prisma.guidedPathEnrollment.findUnique({ where: { userId_trackId: { userId: other.id, trackId } } })
      assert.equal(otherEnrollment.currentStepIndex, 4)
    } finally {
      await prisma.user.deleteMany({ where: { id: { in: users.map((u) => u.id) } } })
      await prisma.$disconnect()
    }
  },
)

test(
  'integration: a newly required project is surfaced, not bypassed with historical activity',
  { skip: hasDb ? false : 'TSH_CHECKLIST_IMPORT_TEST_DB is not set' },
  async () => {
    const prisma = new PrismaClient({ datasources: { db: { url: testDbUrl } } })
    const stamp = Date.now()
    const trackId = 'crypto'
    const learner = await prisma.user.create({ data: { email: `cont-newproj-${stamp}@example.test` } })

    try {
      await prisma.guidedPathEnrollment.create({ data: { userId: learner.id, trackId, currentStepIndex: 12 } })
      await prisma.userTrackProgress.create({ data: { userId: learner.id, trackId, data: { guidedPathVersion: 5 } } })
      await prisma.userProgress.createMany({
        data: [
          ...activityRows(learner.id, trackId, 1, [{ type: 'resource', resourceId: 'cr-1' }, { type: 'practice' }, { type: 'quiz' }]),
          ...activityRows(learner.id, trackId, 2, [{ type: 'resource', resourceId: 'cr-2' }, { type: 'practice' }, { type: 'quiz' }]),
        ],
      })

      const result = await migrateEnrollmentIfNeeded(prisma, { userId: learner.id, trackId, steps: NEW_PROJECT_STEPS, expectedVersion: 6 })
      assert.equal(result.migrated, true)
      assert.equal(result.compatibility.strategy, 'new-requirement')
      assert.equal(result.currentStepIndex, 4, 'resumes at the new project, not at the start')
      // No pass was fabricated for the new project.
      const stored = await prisma.userProgress.findFirst({
        where: { userId: learner.id, trackId, itemType: 'project', resourceId: 'cr-pnew' },
      })
      assert.equal(stored, null, 'historical activity must not mark the new requirement complete')
    } finally {
      await prisma.user.deleteMany({ where: { id: learner.id } })
      await prisma.$disconnect()
    }
  },
)

test(
  'integration: a learner stranded at 0 by the old restart policy is recovered',
  { skip: hasDb ? false : 'TSH_CHECKLIST_IMPORT_TEST_DB is not set' },
  async () => {
    const prisma = new PrismaClient({ datasources: { db: { url: testDbUrl } } })
    const stamp = Date.now()
    const trackId = 'crypto'
    const learner = await prisma.user.create({ data: { email: `cont-repair-${stamp}@example.test` } })

    try {
      // Version already matches (the old code bumped it) but the cursor was reset.
      await prisma.guidedPathEnrollment.create({ data: { userId: learner.id, trackId, currentStepIndex: 0 } })
      await prisma.userTrackProgress.create({ data: { userId: learner.id, trackId, data: { guidedPathVersion: 6 } } })
      await prisma.userProgress.createMany({
        data: activityRows(learner.id, trackId, 1, [{ type: 'resource', resourceId: 'cr-1' }, { type: 'practice' }, { type: 'quiz' }]),
      })

      const result = await migrateEnrollmentIfNeeded(prisma, { userId: learner.id, trackId, steps: PRESERVE_STEPS, expectedVersion: 6 })
      assert.equal(result.migrated, true)
      assert.equal(result.compatibility.strategy, 'recovered')
      assert.ok(result.currentStepIndex > 0, 'the learner is moved forward from the wrongly-reset position')
      assert.equal(result.currentStepIndex, 4)
    } finally {
      await prisma.user.deleteMany({ where: { id: learner.id } })
      await prisma.$disconnect()
    }
  },
)

test(
  'integration: concurrent migrations converge on one consistent position',
  { skip: hasDb ? false : 'TSH_CHECKLIST_IMPORT_TEST_DB is not set' },
  async () => {
    const prisma = new PrismaClient({ datasources: { db: { url: testDbUrl } } })
    const stamp = Date.now()
    const trackId = 'crypto'
    const learner = await prisma.user.create({ data: { email: `cont-conc-${stamp}@example.test` } })

    try {
      await prisma.guidedPathEnrollment.create({ data: { userId: learner.id, trackId, currentStepIndex: 7 } })
      await prisma.userTrackProgress.create({ data: { userId: learner.id, trackId, data: { guidedPathVersion: 5 } } })
      await prisma.userProgress.createMany({
        data: activityRows(learner.id, trackId, 1, [{ type: 'resource', resourceId: 'cr-1' }, { type: 'practice' }, { type: 'quiz' }]),
      })

      const results = await Promise.all(
        Array.from({ length: 4 }, () =>
          migrateEnrollmentIfNeeded(prisma, { userId: learner.id, trackId, steps: PRESERVE_STEPS, expectedVersion: 6 }),
        ),
      )
      const indices = new Set(results.filter((r) => r.migrated).map((r) => r.currentStepIndex))
      assert.equal(indices.size, 1, 'every concurrent run agrees on the resume index')
      assert.equal([...indices][0], 4)

      const enrollment = await prisma.guidedPathEnrollment.findUnique({ where: { userId_trackId: { userId: learner.id, trackId } } })
      assert.equal(enrollment.currentStepIndex, 4)

      // No duplicate progress rows were written by the concurrent migrations.
      const rows = await prisma.userProgress.findMany({ where: { userId: learner.id, trackId } })
      const uniqueKeys = new Set(rows.map((r) => `${r.itemType}|${r.stageId}|${r.resourceId}`))
      assert.equal(uniqueKeys.size, rows.length)
    } finally {
      await prisma.user.deleteMany({ where: { id: learner.id } })
      await prisma.$disconnect()
    }
  },
)

test(
  'integration: the path-update notice persists until it is acknowledged',
  { skip: hasDb ? false : 'TSH_CHECKLIST_IMPORT_TEST_DB is not set' },
  async () => {
    const prisma = new PrismaClient({ datasources: { db: { url: testDbUrl } } })
    const stamp = Date.now()
    const trackId = 'crypto'
    const learner = await prisma.user.create({ data: { email: `cont-notice-${stamp}@example.test` } })

    try {
      await prisma.guidedPathEnrollment.create({ data: { userId: learner.id, trackId, currentStepIndex: 7 } })
      await prisma.userTrackProgress.create({ data: { userId: learner.id, trackId, data: { guidedPathVersion: 5 } } })
      await prisma.userProgress.createMany({
        data: activityRows(learner.id, trackId, 1, [{ type: 'resource', resourceId: 'cr-1' }, { type: 'practice' }, { type: 'quiz' }]),
      })

      const first = await migrateEnrollmentIfNeeded(prisma, { userId: learner.id, trackId, steps: PRESERVE_STEPS, expectedVersion: 6 })
      assert.equal(first.migrated, true)
      assert.ok(first.pathUpdate, 'the update is announced')
      assert.equal(first.pathUpdate.fromVersion, 5)
      assert.equal(first.pathUpdate.toVersion, 6)

      // A later load (a reload, a duplicate request or a prefetch) still shows it.
      const second = await migrateEnrollmentIfNeeded(prisma, { userId: learner.id, trackId, steps: PRESERVE_STEPS, expectedVersion: 6 })
      assert.equal(second.migrated, false)
      assert.ok(second.pathUpdate, 'the notice is not lost on the next request')
      assert.equal(second.currentStepIndex, null, 'no further remap')

      // Dismissing it clears it permanently, without touching progression.
      await acknowledgePathUpdate(prisma, { userId: learner.id, trackId })
      const third = await migrateEnrollmentIfNeeded(prisma, { userId: learner.id, trackId, steps: PRESERVE_STEPS, expectedVersion: 6 })
      assert.equal(third.pathUpdate, null)

      const enrollment = await prisma.guidedPathEnrollment.findUnique({ where: { userId_trackId: { userId: learner.id, trackId } } })
      assert.equal(enrollment.currentStepIndex, 4, 'dismissing the notice does not change position')
    } finally {
      await prisma.user.deleteMany({ where: { id: learner.id } })
      await prisma.$disconnect()
    }
  },
)

test(
  'integration: different tracks and learners are isolated',
  { skip: hasDb ? false : 'TSH_CHECKLIST_IMPORT_TEST_DB is not set' },
  async () => {
    const prisma = new PrismaClient({ datasources: { db: { url: testDbUrl } } })
    const stamp = Date.now()
    const userA = await prisma.user.create({ data: { email: `cont-iso-a-${stamp}@example.test` } })
    const userB = await prisma.user.create({ data: { email: `cont-iso-b-${stamp}@example.test` } })

    try {
      await prisma.guidedPathEnrollment.create({ data: { userId: userA.id, trackId: 'crypto', currentStepIndex: 5 } })
      await prisma.userTrackProgress.create({ data: { userId: userA.id, trackId: 'crypto', data: { guidedPathVersion: 5 } } })
      await prisma.userProgress.createMany({
        data: activityRows(userA.id, 'crypto', 1, [{ type: 'resource', resourceId: 'cr-1' }]),
      })

      // Same learner, unrelated track, current version.
      await prisma.guidedPathEnrollment.create({ data: { userId: userA.id, trackId: 'python', currentStepIndex: 3 } })
      await prisma.userTrackProgress.create({ data: { userId: userA.id, trackId: 'python', data: { guidedPathVersion: 6 } } })

      // Unrelated learner on the same track.
      await prisma.guidedPathEnrollment.create({ data: { userId: userB.id, trackId: 'crypto', currentStepIndex: 6 } })
      await prisma.userTrackProgress.create({ data: { userId: userB.id, trackId: 'crypto', data: { guidedPathVersion: 6 } } })

      await migrateEnrollmentIfNeeded(prisma, { userId: userA.id, trackId: 'crypto', steps: PRESERVE_STEPS, expectedVersion: 6 })

      const pythonEnrollment = await prisma.guidedPathEnrollment.findUnique({ where: { userId_trackId: { userId: userA.id, trackId: 'python' } } })
      assert.equal(pythonEnrollment.currentStepIndex, 3, 'the unrelated track is untouched')
      const userBEnrollment = await prisma.guidedPathEnrollment.findUnique({ where: { userId_trackId: { userId: userB.id, trackId: 'crypto' } } })
      assert.equal(userBEnrollment.currentStepIndex, 6, 'the unrelated learner is untouched')
    } finally {
      await prisma.user.deleteMany({ where: { id: { in: [userA.id, userB.id] } } })
      await prisma.$disconnect()
    }
  },
)
