'use strict'
const test = require('node:test')
const assert = require('node:assert/strict')
const { PrismaClient } = require('@prisma/client')
const { getChecklistItems, setChecklistCompletion } = require('../.test-dist/checklist-store.js')

const testDbUrl = process.env.TSH_CHECKLIST_IMPORT_TEST_DB

test(
  'integration: checklist store reads/writes against PostgreSQL',
  { skip: testDbUrl ? false : 'TSH_CHECKLIST_IMPORT_TEST_DB is not set' },
  async () => {
    const prisma = new PrismaClient({ datasources: { db: { url: testDbUrl } } })
    const stamp = Date.now()
    const u1 = await prisma.user.create({ data: { email: `s24-a-${stamp}@example.test` } })
    const u2 = await prisma.user.create({ data: { email: `s24-b-${stamp}@example.test` } })
    const input = { trackId: 'frontend', kind: 'STAGE', itemKey: '1' }

    try {
      // Complete
      const completed = await setChecklistCompletion(prisma, u1.id, { ...input, completed: true })
      assert.equal(completed.isCompleted, true)
      assert.ok(completed.completedAt instanceof Date)

      // Repeated completion preserves the original timestamp
      const repeated = await setChecklistCompletion(prisma, u1.id, { ...input, completed: true })
      assert.equal(repeated.completedAt.toISOString(), completed.completedAt.toISOString())

      // Read back
      const items = await getChecklistItems(prisma, u1.id, 'frontend')
      assert.equal(items.length, 1)
      assert.equal(items[0].isCompleted, true)

      // Uncheck
      const unchecked = await setChecklistCompletion(prisma, u1.id, { ...input, completed: false })
      assert.equal(unchecked.isCompleted, false)
      assert.equal(unchecked.completedAt, null)

      // Recheck
      const rechecked = await setChecklistCompletion(prisma, u1.id, { ...input, completed: true })
      assert.equal(rechecked.isCompleted, true)
      assert.ok(rechecked.completedAt instanceof Date)

      // Concurrent completion of a fresh item yields exactly one row
      await prisma.checklistProgress.deleteMany({ where: { userId: u1.id } })
      await Promise.all([
        setChecklistCompletion(prisma, u1.id, { ...input, completed: true }),
        setChecklistCompletion(prisma, u1.id, { ...input, completed: true }),
      ])
      assert.equal(await prisma.checklistProgress.count({ where: { userId: u1.id } }), 1)

      // User isolation
      await setChecklistCompletion(prisma, u2.id, { ...input, completed: true })
      assert.equal((await getChecklistItems(prisma, u1.id)).length, 1)
      assert.equal((await getChecklistItems(prisma, u2.id)).length, 1)

      // Checklist operations never touch guided learning or certificates
      assert.equal(await prisma.guidedPathEnrollment.count({ where: { userId: { in: [u1.id, u2.id] } } }), 0)
      assert.equal(await prisma.userProgress.count({ where: { userId: { in: [u1.id, u2.id] } } }), 0)
      assert.equal(await prisma.courseCompletion.count({ where: { userId: { in: [u1.id, u2.id] } } }), 0)
    } finally {
      await prisma.user.deleteMany({ where: { id: { in: [u1.id, u2.id] } } })
      await prisma.$disconnect()
    }
  },
)
