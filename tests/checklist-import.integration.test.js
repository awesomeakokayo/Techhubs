'use strict'
const test = require('node:test')
const assert = require('node:assert/strict')
const { PrismaClient } = require('@prisma/client')
const { importChecklistProgress } = require('../.test-dist/checklist-import.js')

const testDbUrl = process.env.TSH_CHECKLIST_IMPORT_TEST_DB

test(
  'integration: checklist import reconciliation against PostgreSQL',
  { skip: testDbUrl ? false : 'TSH_CHECKLIST_IMPORT_TEST_DB is not set' },
  async () => {
    const prisma = new PrismaClient({ datasources: { db: { url: testDbUrl } } })
    const stamp = Date.now()
    const u1 = await prisma.user.create({ data: { email: `s23-a-${stamp}@example.test`, name: 'S23 A' } })
    const u2 = await prisma.user.create({ data: { email: `s23-b-${stamp}@example.test`, name: 'S23 B' } })
    const key = (item) => ({ userId_trackId_kind_itemKey: { userId: u1.id, trackId: item.trackId, kind: item.kind, itemKey: item.itemKey } })

    try {
      const items = [
        { trackId: 'frontend', kind: 'STAGE', itemKey: '1' },
        { trackId: 'frontend', kind: 'PROJECT', itemKey: 'fe-p1' },
      ]

      // Fresh import creates completed records with an import-time timestamp.
      const first = await importChecklistProgress(prisma, u1.id, items)
      assert.equal(first.created, 2)
      const created = await prisma.checklistProgress.findMany({ where: { userId: u1.id } })
      assert.equal(created.length, 2)
      assert.ok(created.every((r) => r.isCompleted && r.completedAt instanceof Date))

      // Duplicate import is idempotent.
      const second = await importChecklistProgress(prisma, u1.id, items)
      assert.equal(second.created, 0)
      assert.equal(second.alreadyCompleted, 2)
      assert.equal(await prisma.checklistProgress.count({ where: { userId: u1.id } }), 2)

      // An existing completed record and its timestamp are preserved.
      await prisma.checklistProgress.deleteMany({ where: { userId: u1.id } })
      await prisma.checklistProgress.create({
        data: { userId: u1.id, trackId: 'frontend', kind: 'STAGE', itemKey: '1', isCompleted: true, completedAt: new Date('2020-01-01T00:00:00Z') },
      })
      const preserved = await importChecklistProgress(prisma, u1.id, [{ trackId: 'frontend', kind: 'STAGE', itemKey: '1' }])
      assert.equal(preserved.created, 0)
      assert.equal(preserved.alreadyCompleted, 1)
      const preservedRow = await prisma.checklistProgress.findUnique({ where: key(items[0]) })
      assert.equal(preservedRow.completedAt.toISOString(), '2020-01-01T00:00:00.000Z')

      // An explicit server-side uncheck is preserved against a stale local completion.
      await prisma.checklistProgress.deleteMany({ where: { userId: u1.id } })
      await prisma.checklistProgress.create({
        data: { userId: u1.id, trackId: 'frontend', kind: 'PROJECT', itemKey: 'fe-p1', isCompleted: false, completedAt: null },
      })
      const incomplete = await importChecklistProgress(prisma, u1.id, [{ trackId: 'frontend', kind: 'PROJECT', itemKey: 'fe-p1' }])
      assert.equal(incomplete.created, 0)
      assert.equal(incomplete.preservedIncomplete, 1)
      const incompleteRow = await prisma.checklistProgress.findUnique({ where: key(items[1]) })
      assert.equal(incompleteRow.isCompleted, false)
      assert.equal(incompleteRow.completedAt, null)

      // Concurrent imports do not create duplicate rows.
      await prisma.checklistProgress.deleteMany({ where: { userId: u1.id } })
      await Promise.all([
        importChecklistProgress(prisma, u1.id, items),
        importChecklistProgress(prisma, u1.id, items),
      ])
      assert.equal(await prisma.checklistProgress.count({ where: { userId: u1.id } }), 2)

      // Cross-user isolation: same items, different account -> separate rows.
      await importChecklistProgress(prisma, u2.id, items)
      assert.equal(await prisma.checklistProgress.count({ where: { userId: u2.id } }), 2)

      // Import cannot affect guided-path enrollment, lesson progress or completions.
      assert.equal(await prisma.userProgress.count({ where: { userId: { in: [u1.id, u2.id] } } }), 0)
      assert.equal(await prisma.guidedPathEnrollment.count({ where: { userId: { in: [u1.id, u2.id] } } }), 0)
      assert.equal(await prisma.courseCompletion.count({ where: { userId: { in: [u1.id, u2.id] } } }), 0)
    } finally {
      await prisma.user.deleteMany({ where: { id: { in: [u1.id, u2.id] } } })
      await prisma.$disconnect()
    }
  },
)
