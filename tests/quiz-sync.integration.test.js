'use strict'
const test = require('node:test')
const assert = require('node:assert/strict')
const { PrismaClient } = require('@prisma/client')
const { syncLearnerProfile } = require('../.test-dist/quiz-sync.js')

const testDbUrl = process.env.TSH_CHECKLIST_IMPORT_TEST_DB

test(
  'integration: learner-profile quiz sync create/update/stale',
  { skip: testDbUrl ? false : 'TSH_CHECKLIST_IMPORT_TEST_DB is not set' },
  async () => {
    const prisma = new PrismaClient({ datasources: { db: { url: testDbUrl } } })
    const stamp = Date.now()
    const user = await prisma.user.create({ data: { email: `s25-${stamp}@example.test` } })
    const base = {
      primaryGoal: 'Get a job at a tech company',
      experienceLevel: 'beginner',
      weeklyHours: 5,
      recommendedTrackId: 'frontend',
    }

    try {
      // Create
      const created = await syncLearnerProfile(prisma, user.id, { ...base, clientUpdatedAt: '2026-01-01T00:00:00.000Z' })
      assert.equal(created.decision, 'create')
      assert.ok(created.profile)

      // Newer result updates
      const updated = await syncLearnerProfile(prisma, user.id, { ...base, recommendedTrackId: 'backend', clientUpdatedAt: new Date().toISOString() })
      assert.equal(updated.decision, 'update')
      assert.equal(updated.profile.recommendedTrackId, 'backend')

      // Older result is rejected and does not overwrite newer preferences
      const stale = await syncLearnerProfile(prisma, user.id, { ...base, recommendedTrackId: 'python', clientUpdatedAt: '2025-01-01T00:00:00.000Z' })
      assert.equal(stale.decision, 'stale')
      assert.equal(stale.profile.recommendedTrackId, 'backend')

      const persisted = await prisma.learnerProfile.findUnique({ where: { userId: user.id } })
      assert.equal(persisted.recommendedTrackId, 'backend')
    } finally {
      await prisma.user.deleteMany({ where: { id: user.id } })
      await prisma.$disconnect()
    }
  },
)
