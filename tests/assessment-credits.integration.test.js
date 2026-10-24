'use strict'
/**
 * Integration (real PostgreSQL): race-safe monthly assessment-credit accounting.
 *
 * Runs only when TSH_CHECKLIST_IMPORT_TEST_DB points at a disposable database
 * (same convention as the other integration suites) — never production. The
 * migrations must be applied first.
 *
 * These tests exist because a mocked check-then-act test cannot prove that the
 * database implementation is race-safe. They fire far more concurrent
 * reservations than the allowance and assert the invariant holds.
 */
const test = require('node:test')
const assert = require('node:assert/strict')
const { PrismaClient } = require('@prisma/client')

const {
  reserveAssessmentCredit,
  consumeAssessmentCredit,
  releaseAssessmentCredit,
  countReservationUsage,
  reconcileStaleReservations,
} = require('../.test-dist/commercial/assessment-credits.js')
const { ASSESSMENT_ALLOWANCES } = require('../.test-dist/commercial/plans.js')

const testDbUrl = process.env.TSH_CHECKLIST_IMPORT_TEST_DB
const skip = testDbUrl ? false : 'TSH_CHECKLIST_IMPORT_TEST_DB is not set'

function makeClient() {
  return new PrismaClient({ datasources: { db: { url: testDbUrl } } })
}

async function makeUser(prisma, tag) {
  return prisma.user.create({ data: { email: `${tag}-${Date.now()}-${Math.random().toString(36).slice(2)}@example.test` } })
}

async function withDb(tag, fn) {
  const prisma = makeClient()
  const user = await makeUser(prisma, tag)
  try {
    await fn(prisma, user)
  } finally {
    await prisma.$disconnect()
  }
}

test('concurrent reservations can never exceed the monthly limit', { skip }, async () => {
  await withDb('ac-limit', async (prisma, user) => {
    const LIMIT = 20
    const N = 60 // substantially more than the remaining allowance
    const results = await Promise.all(
      Array.from({ length: N }, (_, i) =>
        reserveAssessmentCredit(prisma, { userId: user.id, requestId: `r-${i}`, tier: 'FREE', allowance: LIMIT }),
      ),
    )
    const granted = results.filter((r) => r.outcome === 'reserved').length
    assert.equal(granted, LIMIT)
    const usage = await countReservationUsage(prisma, user.id)
    assert.equal(usage.consumed + usage.reserved, LIMIT)
    assert.ok(usage.consumed + usage.reserved <= LIMIT)
  })
})

test('concurrent requests cannot all pass on the same remaining credit', { skip }, async () => {
  await withDb('ac-one', async (prisma, user) => {
    const LIMIT = 1
    const results = await Promise.all(
      Array.from({ length: 25 }, (_, i) =>
        reserveAssessmentCredit(prisma, { userId: user.id, requestId: `one-${i}`, tier: 'FREE', allowance: LIMIT }),
      ),
    )
    assert.equal(results.filter((r) => r.outcome === 'reserved').length, 1)
    const usage = await countReservationUsage(prisma, user.id)
    assert.ok(usage.consumed + usage.reserved <= LIMIT)
  })
})

test('two separate clients (processes) still respect the limit', { skip }, async () => {
  const prismaA = makeClient()
  const prismaB = makeClient()
  const user = await makeUser(prismaA, 'ac-two')
  try {
    const LIMIT = 8
    const results = await Promise.all(
      Array.from({ length: 40 }, (_, i) =>
        reserveAssessmentCredit(i % 2 === 0 ? prismaA : prismaB, {
          userId: user.id,
          requestId: `two-${i}`,
          tier: 'FREE',
          allowance: LIMIT,
        }),
      ),
    )
    assert.equal(results.filter((r) => r.outcome === 'reserved').length, LIMIT)
    const usage = await countReservationUsage(prismaA, user.id)
    assert.ok(usage.consumed + usage.reserved <= LIMIT)
  } finally {
    await prismaA.$disconnect()
    await prismaB.$disconnect()
  }
})

test('a duplicate request id can never reserve twice', { skip }, async () => {
  await withDb('ac-dup', async (prisma, user) => {
    const first = await reserveAssessmentCredit(prisma, { userId: user.id, requestId: 'dup', tier: 'FREE', allowance: 5 })
    assert.equal(first.outcome, 'reserved')
    const second = await reserveAssessmentCredit(prisma, { userId: user.id, requestId: 'dup', tier: 'FREE', allowance: 5 })
    assert.equal(second.outcome, 'in_flight')

    // Concurrent duplicates: exactly one wins.
    const many = await Promise.all(
      Array.from({ length: 10 }, () =>
        reserveAssessmentCredit(prisma, { userId: user.id, requestId: 'dup-2', tier: 'FREE', allowance: 5 }),
      ),
    )
    assert.equal(many.filter((r) => r.outcome === 'reserved').length, 1)
    assert.equal(many.filter((r) => r.outcome === 'in_flight').length, 9)

    const usage = await countReservationUsage(prisma, user.id)
    assert.equal(usage.reserved, 2) // 'dup' + 'dup-2'
  })
})

test('releasing a reservation returns the credit (and allows a retry)', { skip }, async () => {
  await withDb('ac-release', async (prisma, user) => {
    await reserveAssessmentCredit(prisma, { userId: user.id, requestId: 'rel', tier: 'FREE', allowance: 1 })
    let usage = await countReservationUsage(prisma, user.id)
    assert.equal(usage.reserved, 1)

    // The limit is full.
    const blocked = await reserveAssessmentCredit(prisma, { userId: user.id, requestId: 'rel-other', tier: 'FREE', allowance: 1 })
    assert.equal(blocked.outcome, 'exhausted')

    const released = await releaseAssessmentCredit(prisma, { userId: user.id, requestId: 'rel', reason: 'provider_error' })
    assert.equal(released.released, true)
    usage = await countReservationUsage(prisma, user.id)
    assert.equal(usage.reserved, 0)

    // A retry of the released request is allowed again.
    const retried = await reserveAssessmentCredit(prisma, { userId: user.id, requestId: 'rel', tier: 'FREE', allowance: 1 })
    assert.equal(retried.outcome, 'reserved')
  })
})

test('a billable result consumes exactly once; release after consume is a no-op', { skip }, async () => {
  await withDb('ac-consume', async (prisma, user) => {
    await reserveAssessmentCredit(prisma, { userId: user.id, requestId: 'use', tier: 'FREE', allowance: 5 })
    const first = await consumeAssessmentCredit(prisma, { userId: user.id, requestId: 'use' })
    assert.equal(first.consumed, true)
    const second = await consumeAssessmentCredit(prisma, { userId: user.id, requestId: 'use' })
    assert.equal(second.consumed, false)
    const lateRelease = await releaseAssessmentCredit(prisma, { userId: user.id, requestId: 'use', reason: 'timeout' })
    assert.equal(lateRelease.released, false)

    const usage = await countReservationUsage(prisma, user.id)
    assert.equal(usage.consumed, 1)
    assert.equal(usage.reserved, 0)

    // The completion audit event was written in the same transaction.
    const events = await prisma.learningEvent.count({ where: { userId: user.id, eventName: 'assessment_credit_used' } })
    assert.equal(events, 1)

    // A duplicate of the consumed request reports "consumed" (reuse, no new credit).
    const dup = await reserveAssessmentCredit(prisma, { userId: user.id, requestId: 'use', tier: 'FREE', allowance: 5 })
    assert.equal(dup.outcome, 'consumed')
    const after = await countReservationUsage(prisma, user.id)
    assert.equal(after.consumed, 1)
  })
})

test('a crashed/stale reservation does not permanently exhaust the allowance', { skip }, async () => {
  await withDb('ac-stale', async (prisma, user) => {
    const now = new Date('2026-10-10T10:00:00.000Z')
    const later = new Date('2026-10-10T11:00:00.000Z') // same month, beyond the TTL
    await reserveAssessmentCredit(prisma, { userId: user.id, requestId: 'stale', tier: 'FREE', allowance: 1, now, ttlMs: 60_000 })

    // While the reservation is live it occupies the only credit.
    const blocked = await reserveAssessmentCredit(prisma, { userId: user.id, requestId: 'blocked', tier: 'FREE', allowance: 1, now })
    assert.equal(blocked.outcome, 'exhausted')

    // Reconciliation finalizes the stale row (recorded, not silently discarded).
    const report = await reconcileStaleReservations(prisma, { now: later, userId: user.id })
    assert.ok(report.expired >= 1)
    assert.equal(report.inspected >= 1, true)
    const row = await prisma.assessmentCreditReservation.findUnique({
      where: { userId_requestId: { userId: user.id, requestId: 'stale' } },
    })
    assert.equal(row.status, 'EXPIRED')
    assert.equal(row.releaseReason, 'expired_unresolved')

    // With the stale row reclaimed, the credit is available again.
    const fresh = await reserveAssessmentCredit(prisma, { userId: user.id, requestId: 'fresh', tier: 'FREE', allowance: 1, now: later })
    assert.equal(fresh.outcome, 'reserved')
  })
})

test('reconciliation consumes a stale reservation that has a completion signal', { skip }, async () => {
  await withDb('ac-recon', async (prisma, user) => {
    const now = new Date('2026-10-10T10:00:00.000Z')
    const later = new Date('2026-10-10T11:00:00.000Z')
    await reserveAssessmentCredit(prisma, { userId: user.id, requestId: 'recon', tier: 'FREE', allowance: 5, now, ttlMs: 60_000 })
    // Simulate a completion recorded out-of-band (same signal `consume` writes).
    await prisma.learningEvent.create({
      data: { userId: user.id, eventName: 'assessment_credit_used', metadata: { requestId: 'recon' } },
    })
    const report = await reconcileStaleReservations(prisma, { now: later, userId: user.id })
    assert.ok(report.reconciledConsumed >= 1)
    const row = await prisma.assessmentCreditReservation.findUnique({
      where: { userId_requestId: { userId: user.id, requestId: 'recon' } },
    })
    assert.equal(row.status, 'CONSUMED')
  })
})

test('different users and different months do not interfere', { skip }, async () => {
  const prisma = makeClient()
  const a = await makeUser(prisma, 'ac-a')
  const b = await makeUser(prisma, 'ac-b')
  const c = await makeUser(prisma, 'ac-c')
  try {
    const ra = await reserveAssessmentCredit(prisma, { userId: a.id, requestId: 'a1', tier: 'FREE', allowance: 1 })
    const rb = await reserveAssessmentCredit(prisma, { userId: b.id, requestId: 'b1', tier: 'FREE', allowance: 1 })
    assert.equal(ra.outcome, 'reserved')
    assert.equal(rb.outcome, 'reserved')

    // A different month has its own bucket for the same user.
    const october = new Date('2026-10-15T12:00:00.000Z')
    const november = new Date('2026-11-15T12:00:00.000Z')
    const rOct = await reserveAssessmentCredit(prisma, { userId: c.id, requestId: 'm-oct', tier: 'FREE', allowance: 1, now: october })
    const rNov = await reserveAssessmentCredit(prisma, { userId: c.id, requestId: 'm-nov', tier: 'FREE', allowance: 1, now: november })
    assert.equal(rOct.outcome, 'reserved')
    assert.equal(rNov.outcome, 'reserved')
  } finally {
    await prisma.$disconnect()
  }
})

test('Free, Track Pass and Pro enforce their configured limits', { skip }, async () => {
  const prisma = makeClient()
  const free = await makeUser(prisma, 'ac-free')
  const pass = await makeUser(prisma, 'ac-pass')
  const pro = await makeUser(prisma, 'ac-pro')
  try {
    const freeResults = await Promise.all(
      Array.from({ length: ASSESSMENT_ALLOWANCES.FREE + 20 }, (_, i) =>
        reserveAssessmentCredit(prisma, { userId: free.id, requestId: `f-${i}`, tier: 'FREE', allowance: ASSESSMENT_ALLOWANCES.FREE }),
      ),
    )
    assert.equal(freeResults.filter((r) => r.outcome === 'reserved').length, ASSESSMENT_ALLOWANCES.FREE)

    const passResults = await Promise.all(
      Array.from({ length: ASSESSMENT_ALLOWANCES.PASS + 15 }, (_, i) =>
        reserveAssessmentCredit(prisma, { userId: pass.id, requestId: `p-${i}`, tier: 'PASS', allowance: ASSESSMENT_ALLOWANCES.PASS }),
      ),
    )
    assert.equal(passResults.filter((r) => r.outcome === 'reserved').length, ASSESSMENT_ALLOWANCES.PASS)

    // Pro's higher limit admits a load that would already exhaust Free/Pass.
    const proLoad = ASSESSMENT_ALLOWANCES.PASS + 15
    const proResults = await Promise.all(
      Array.from({ length: proLoad }, (_, i) =>
        reserveAssessmentCredit(prisma, { userId: pro.id, requestId: `pr-${i}`, tier: 'PRO', allowance: ASSESSMENT_ALLOWANCES.PRO }),
      ),
    )
    assert.equal(proResults.filter((r) => r.outcome === 'reserved').length, proLoad)

    assert.ok(ASSESSMENT_ALLOWANCES.FREE < ASSESSMENT_ALLOWANCES.PASS)
    assert.ok(ASSESSMENT_ALLOWANCES.PASS < ASSESSMENT_ALLOWANCES.PRO)
  } finally {
    await prisma.$disconnect()
  }
})
