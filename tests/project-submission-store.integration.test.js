'use strict'
/**
 * Integration: project submission lifecycle against disposable PostgreSQL.
 * Verifies persistence, bounded records, pass reuse by fingerprint and the
 * durable assessment budget.
 */
const test = require('node:test')
const assert = require('node:assert/strict')
const { PrismaClient } = require('@prisma/client')
const { saveSubmission, getSubmission, isReusablePass, checkAssessmentBudget, boundSubmission } = require('../.test-dist/project-verification/store.js')

const testDbUrl = process.env.TSH_CHECKLIST_IMPORT_TEST_DB

test(
  'integration: project submission store, reuse and budget',
  { skip: testDbUrl ? false : 'TSH_CHECKLIST_IMPORT_TEST_DB is not set' },
  async () => {
    const prisma = new PrismaClient({ datasources: { db: { url: testDbUrl } } })
    const stamp = Date.now()
    const user = await prisma.user.create({ data: { email: `pv-store-${stamp}@example.test` } })
    const trackId = 'frontend'
    const projectId = 'fe-p4'

    try {
      const submission = {
        projectId,
        status: 'passed',
        artifacts: [{ kind: 'github_repo', url: 'https://github.com/learner/weather' }],
        explanation: 'I built a weather app that fetches live data.',
        evidenceFingerprint: 'ev123',
        rubricVersion: 'r1',
        assessmentVersion: '2026-01-1',
        provider: 'deepseek',
        model: 'deepseek-flash',
        attemptCount: 1,
        submittedAt: new Date().toISOString(),
        assessedAt: new Date().toISOString(),
      }
      await saveSubmission(prisma, user.id, trackId, submission)

      const stored = await getSubmission(prisma, user.id, trackId, projectId)
      assert.equal(stored.status, 'passed')
      assert.equal(stored.evidenceFingerprint, 'ev123')

      // Reuse only for identical evidence + rubric.
      assert.equal(isReusablePass(stored, 'ev123', 'r1'), true)
      assert.equal(isReusablePass(stored, 'ev999', 'r1'), false)
      assert.equal(isReusablePass(stored, 'ev123', 'r2'), false)

      // A changed artifact overwrites the record.
      await saveSubmission(prisma, user.id, trackId, { ...submission, status: 'changes_required', evidenceFingerprint: 'ev999', attemptCount: 2 })
      const updated = await getSubmission(prisma, user.id, trackId, projectId)
      assert.equal(updated.status, 'changes_required')
      assert.equal(isReusablePass(updated, 'ev123', 'r1'), false)

      // Records are bounded.
      const huge = boundSubmission({ ...submission, explanation: 'x'.repeat(9000), artifacts: Array.from({ length: 20 }, (_, i) => ({ kind: 'text', url: `https://e.com/${i}` })) })
      assert.ok(huge.explanation.length <= 4000)
      assert.equal(huge.artifacts.length, 8)

      // Durable budget: per-user limit blocks after N events in the window.
      for (let i = 0; i < 3; i += 1) {
        await prisma.learningEvent.create({ data: { userId: user.id, eventName: 'project_assessed' } })
      }
      const allowed = await checkAssessmentBudget(prisma, user.id, { perUserPerHour: 5, globalPerHour: 1000 })
      assert.equal(allowed.allowed, true)
      const blocked = await checkAssessmentBudget(prisma, user.id, { perUserPerHour: 3, globalPerHour: 1000 })
      assert.equal(blocked.allowed, false)
    } finally {
      await prisma.user.deleteMany({ where: { id: user.id } })
      await prisma.$disconnect()
    }
  },
)
