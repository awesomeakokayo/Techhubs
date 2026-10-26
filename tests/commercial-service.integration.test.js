'use strict'
/**
 * Integration: the canonical entitlement service against disposable PostgreSQL.
 *
 * Runs only when TSH_CHECKLIST_IMPORT_TEST_DB points at a disposable database
 * (same convention as the other integration suites). Never points at production.
 * The schema must include the commercial_billing migration.
 */
const test = require('node:test')
const assert = require('node:assert/strict')
const { PrismaClient } = require('@prisma/client')

const {
  applyBillingEvent,
  createPendingOrder,
  getEntitlementSnapshot,
  getTrackPasses,
  getActiveTrackPass,
  checkAssessmentAllowance,
} = require('../.test-dist/commercial/service.js')
const { canAccessTrack } = require('../.test-dist/commercial/entitlements.js')

const testDbUrl = process.env.TSH_CHECKLIST_IMPORT_TEST_DB

function event(overrides) {
  return {
    provider: 'lemonsqueezy',
    type: 'payment_succeeded',
    rawType: 'order_created',
    orderReference: null,
    userId: null,
    productCode: null,
    trackId: null,
    providerOrderId: null,
    providerSubscriptionId: null,
    providerCustomerId: null,
    status: null,
    currentPeriodEnd: null,
    amountMinor: null,
    currency: null,
    productId: null,
    occurredAt: null,
    testMode: false,
    ...overrides,
  }
}

test(
  'integration: track pass, pro, cancellation grace, refund and idempotency',
  { skip: testDbUrl ? false : 'TSH_CHECKLIST_IMPORT_TEST_DB is not set' },
  async () => {
    const prisma = new PrismaClient({ datasources: { db: { url: testDbUrl } } })
    const stamp = Date.now()
    const user = await prisma.user.create({ data: { email: `commerce-${stamp}@example.test` } })
    const other = await prisma.user.create({ data: { email: `commerce-other-${stamp}@example.test` } })

    try {
      const ref = `TSH_${stamp}_TP`
      await createPendingOrder(prisma, {
        userId: user.id,
        planId: 'TRACK_PASS',
        provider: 'lemonsqueezy',
        trackId: 'frontend',
        currency: 'USD',
        amountMinor: 900,
        reference: ref,
        pricingVersion: 'test',
      })

      const passEvent = event({ orderReference: ref, userId: user.id, productCode: 'TRACK_PASS', trackId: 'frontend', providerOrderId: 'o1', providerCustomerId: 'c1', status: 'paid', amountMinor: 900, currency: 'USD' })

      // Verified payment grants the pass; a duplicate delivery is ignored.
      assert.equal((await applyBillingEvent(prisma, passEvent, 'lemonsqueezy:hash-1')).applied, true)
      assert.deepEqual(await applyBillingEvent(prisma, passEvent, 'lemonsqueezy:hash-1'), { applied: false, reason: 'duplicate', userId: user.id })

      let snapshot = await getEntitlementSnapshot(prisma, user.id)
      assert.equal(snapshot.tier, 'PASS')
      assert.deepEqual(snapshot.ownedTrackIds, ['frontend'])
      assert.equal((await prisma.paymentOrder.findUnique({ where: { reference: ref } })).status, 'PAID')

      // Pro subscription.
      const periodEnd = new Date(Date.now() + 30 * 86400000).toISOString()
      const proEvent = event({ type: 'subscription_created', rawType: 'subscription_created', userId: user.id, productCode: 'PRO_MONTHLY', providerSubscriptionId: 'sub_1', providerCustomerId: 'c1', status: 'active', currentPeriodEnd: periodEnd })
      await applyBillingEvent(prisma, proEvent, 'lemonsqueezy:hash-2')
      snapshot = await getEntitlementSnapshot(prisma, user.id)
      assert.equal(snapshot.tier, 'PRO')
      assert.equal(snapshot.hasAllPremiumTracks, true)

      // Cancellation events do not always carry a refreshed period end.
      // Preserve the previously verified end date instead of extending access.
      await applyBillingEvent(prisma, event({
        ...proEvent,
        type: 'subscription_cancelled',
        rawType: 'subscription_cancelled',
        status: 'cancelled',
        currentPeriodEnd: null,
      }), 'lemonsqueezy:hash-3')
      snapshot = await getEntitlementSnapshot(prisma, user.id)
      assert.equal(snapshot.tier, 'PRO')
      assert.equal(snapshot.cancelAtPeriodEnd, true)
      const cancelledSub = await prisma.subscription.findUnique({ where: { userId: user.id } })
      assert.equal(cancelledSub.currentPeriodEnd.toISOString(), periodEnd)

      // Expiry removes Pro (Track Pass remains).
      await applyBillingEvent(prisma, event({ ...proEvent, type: 'subscription_expired', rawType: 'subscription_expired', status: 'expired', currentPeriodEnd: new Date(Date.now() - 86400000).toISOString() }), 'lemonsqueezy:hash-4')
      snapshot = await getEntitlementSnapshot(prisma, user.id)
      assert.equal(snapshot.tier, 'PASS')

      // Refund revokes the one-time Track Pass.
      await applyBillingEvent(prisma, event({ ...passEvent, type: 'refunded', rawType: 'order_refunded' }), 'lemonsqueezy:hash-5')
      snapshot = await getEntitlementSnapshot(prisma, user.id)
      assert.equal(snapshot.tier, 'FREE')
      assert.equal((await prisma.paymentOrder.findUnique({ where: { reference: ref } })).status, 'REFUNDED')

      // Test-mode deliveries never grant entitlement.
      const tm = await applyBillingEvent(prisma, event({ ...passEvent, userId: other.id, testMode: true }), 'lemonsqueezy:hash-tm')
      assert.equal(tm.applied, false)
      assert.equal(tm.reason, 'test_mode')
      assert.equal((await getEntitlementSnapshot(prisma, other.id)).tier, 'FREE')

      // An unresolvable event is safely rejected (no user to attribute).
      assert.equal((await applyBillingEvent(prisma, event({ orderReference: 'UNKNOWN_REF' }), 'lemonsqueezy:hash-x')).reason, 'unresolved_user')

      // Audit trail and allowance defaults.
      assert.ok((await prisma.entitlementEvent.findMany({ where: { userId: user.id } })).length >= 5)
      const allowance = await checkAssessmentAllowance(prisma, user.id)
      // The monthly allowance is enforced by default and is finite for every tier.
      assert.equal(allowance.enforced, true)
      assert.equal(allowance.allowed, true)
      assert.ok(Number.isFinite(allowance.allowance))
      assert.equal(allowance.used, 0)
      assert.equal(allowance.reserved, 0)
      assert.equal(allowance.remaining, allowance.allowance)
    } finally {
      await prisma.user.delete({ where: { id: user.id } }).catch(() => {})
      await prisma.user.delete({ where: { id: other.id } }).catch(() => {})
      await prisma.$disconnect()
    }
  },
)

test(
  'integration: monetary matching, ownership and stale-event guards',
  { skip: testDbUrl ? false : 'TSH_CHECKLIST_IMPORT_TEST_DB is not set' },
  async () => {
    const prisma = new PrismaClient({ datasources: { db: { url: testDbUrl } } })
    const stamp = Date.now()
    const buyer = await prisma.user.create({ data: { email: `commerce-buyer-${stamp}@example.test` } })
    const attacker = await prisma.user.create({ data: { email: `commerce-attacker-${stamp}@example.test` } })

    try {
      // --- Altered amount: the charge must not fulfill an order for a different amount.
      const badRef = `TSH_${stamp}_BAD`
      await createPendingOrder(prisma, { userId: buyer.id, planId: 'TRACK_PASS', provider: 'lemonsqueezy', trackId: 'frontend', currency: 'USD', amountMinor: 900, reference: badRef, pricingVersion: 'test' })
      const underpaid = await applyBillingEvent(prisma, event({ orderReference: badRef, userId: buyer.id, productCode: 'TRACK_PASS', trackId: 'frontend', amountMinor: 100, currency: 'USD' }), 'lemonsqueezy:hash-bad')
      assert.equal(underpaid.applied, false)
      assert.match(underpaid.reason, /mismatch:amount_mismatch/)
      assert.equal((await prisma.paymentOrder.findUnique({ where: { reference: badRef } })).status, 'PENDING')
      assert.equal((await getEntitlementSnapshot(prisma, buyer.id)).tier, 'FREE')

      // --- Currency mismatch rejected.
      const ccyRef = `TSH_${stamp}_CCY`
      await createPendingOrder(prisma, { userId: buyer.id, planId: 'TRACK_PASS', provider: 'lemonsqueezy', trackId: 'backend', currency: 'USD', amountMinor: 900, reference: ccyRef, pricingVersion: 'test' })
      const wrongCcy = await applyBillingEvent(prisma, event({ orderReference: ccyRef, userId: buyer.id, productCode: 'TRACK_PASS', trackId: 'backend', amountMinor: 900, currency: 'NGN' }), 'lemonsqueezy:hash-ccy')
      assert.equal(wrongCcy.applied, false)
      assert.match(wrongCcy.reason, /currency_mismatch/)

      // --- Ownership: metadata claims the attacker, but the internal order owns the payment.
      const ownedRef = `TSH_${stamp}_OWN`
      await createPendingOrder(prisma, { userId: buyer.id, planId: 'TRACK_PASS', provider: 'lemonsqueezy', trackId: 'frontend', currency: 'USD', amountMinor: 900, reference: ownedRef, pricingVersion: 'test' })
      const spoofed = await applyBillingEvent(prisma, event({ orderReference: ownedRef, userId: attacker.id, productCode: 'TRACK_PASS', trackId: 'frontend', amountMinor: 900, currency: 'USD' }), 'lemonsqueezy:hash-own')
      assert.equal(spoofed.applied, true)
      assert.equal(spoofed.userId, buyer.id) // attributed to the order owner, not the metadata
      assert.equal((await getEntitlementSnapshot(prisma, buyer.id)).tier, 'PASS')
      assert.equal((await getEntitlementSnapshot(prisma, attacker.id)).tier, 'FREE')

      // --- Stale event cannot resurrect an expired subscription.
      const proRef = `TSH_${stamp}_PRO`
      await createPendingOrder(prisma, { userId: buyer.id, planId: 'PRO_MONTHLY', provider: 'lemonsqueezy', trackId: null, currency: 'USD', amountMinor: 1200, reference: proRef, pricingVersion: 'test' })
      const t1 = '2026-10-10T00:00:00.000Z'
      const t2 = '2026-10-15T00:00:00.000Z'
      const t3 = '2026-10-20T00:00:00.000Z'
      await applyBillingEvent(prisma, event({ type: 'subscription_created', rawType: 'subscription_created', userId: buyer.id, productCode: 'PRO_MONTHLY', providerSubscriptionId: 'sub_stale', status: 'active', occurredAt: t1, currentPeriodEnd: '2026-11-10T00:00:00.000Z' }), 'lemonsqueezy:hash-s1')
      assert.equal((await getEntitlementSnapshot(prisma, buyer.id)).tier, 'PRO')
      await applyBillingEvent(prisma, event({ type: 'subscription_expired', rawType: 'subscription_expired', userId: buyer.id, productCode: 'PRO_MONTHLY', providerSubscriptionId: 'sub_stale', status: 'expired', occurredAt: t3 }), 'lemonsqueezy:hash-s2')
      // buyer still has the earlier Track Pass, but Pro is gone:
      const afterExpiry = await getEntitlementSnapshot(prisma, buyer.id)
      assert.equal(afterExpiry.hasAllPremiumTracks, false)
      // A late "active" update with an older timestamp must be ignored.
      const stale = await applyBillingEvent(prisma, event({ type: 'subscription_updated', rawType: 'subscription_updated', userId: buyer.id, productCode: 'PRO_MONTHLY', providerSubscriptionId: 'sub_stale', status: 'active', occurredAt: t2, currentPeriodEnd: '2026-12-01T00:00:00.000Z' }), 'lemonsqueezy:hash-s3')
      assert.equal(stale.applied, true)
      assert.equal((await getEntitlementSnapshot(prisma, buyer.id)).hasAllPremiumTracks, false)
    } finally {
      await prisma.user.delete({ where: { id: buyer.id } }).catch(() => {})
      await prisma.user.delete({ where: { id: attacker.id } }).catch(() => {})
      await prisma.$disconnect()
    }
  },
)

test(
  'integration: three-month Track Pass lifecycle, retention and repurchase',
  { skip: testDbUrl ? false : 'TSH_CHECKLIST_IMPORT_TEST_DB is not set' },
  async () => {
    const prisma = new PrismaClient({ datasources: { db: { url: testDbUrl } } })
    const stamp = Date.now()
    const user = await prisma.user.create({ data: { email: `commerce-pass-${stamp}@example.test` } })
    const pro = await prisma.user.create({ data: { email: `commerce-pro-${stamp}@example.test` } })
    const at = (iso) => new Date(iso)

    try {
      // 1. A pending checkout grants nothing and starts no clock.
      const ref1 = `TSH_${stamp}_P1`
      await createPendingOrder(prisma, { userId: user.id, planId: 'TRACK_PASS', provider: 'lemonsqueezy', trackId: 'frontend', currency: 'USD', amountMinor: 900, reference: ref1, pricingVersion: 'test' })
      assert.equal((await getEntitlementSnapshot(prisma, user.id, at('2026-02-01T00:00:00.000Z'))).tier, 'FREE')
      assert.equal(await prisma.trackPassPurchase.count({ where: { userId: user.id } }), 0)

      // 2. A verified payment grants the chosen track for three CALENDAR months.
      const paidAt = '2026-01-15T09:30:00.000Z'
      const granted = await applyBillingEvent(
        prisma,
        event({ orderReference: ref1, userId: user.id, productCode: 'TRACK_PASS', trackId: 'frontend', providerOrderId: 'o1', occurredAt: paidAt, amountMinor: 900, currency: 'USD' }),
        'lemonsqueezy:tp-1',
      )
      assert.equal(granted.applied, true)
      assert.equal(granted.userId, user.id)

      const purchase = await prisma.trackPassPurchase.findUnique({ where: { orderReference: ref1 } })
      assert.equal(purchase.startedAt.toISOString(), '2026-01-15T09:30:00.000Z')
      // Three calendar months from the verified payment instant:
      assert.equal(purchase.expiresAt.toISOString(), '2026-04-15T09:30:00.000Z')
      assert.equal(purchase.amount, 900)
      assert.equal(purchase.currency, 'USD')
      assert.equal(purchase.status, 'ACTIVE')

      const snapMid = await getEntitlementSnapshot(prisma, user.id, at('2026-02-01T00:00:00.000Z'))
      assert.equal(snapMid.tier, 'PASS')
      assert.deepEqual(snapMid.ownedTrackIds, ['frontend'])
      assert.equal((await getTrackPasses(prisma, user.id, at('2026-02-01T00:00:00.000Z')))[0].active, true)

      // 3. Just before expiry still entitled; at and after expiry denied.
      assert.equal((await getEntitlementSnapshot(prisma, user.id, at('2026-04-15T09:29:59.000Z'))).tier, 'PASS')
      assert.equal((await getEntitlementSnapshot(prisma, user.id, at('2026-04-15T09:30:00.000Z'))).tier, 'FREE')
      assert.equal((await getEntitlementSnapshot(prisma, user.id, at('2026-04-15T09:30:01.000Z'))).tier, 'FREE')
      assert.equal((await getTrackPasses(prisma, user.id, at('2026-08-01T00:00:00.000Z')))[0].active, false)

      // 4. A pass for one track never unlocks another.
      const snap = await getEntitlementSnapshot(prisma, user.id, at('2026-02-01T00:00:00.000Z'))
      assert.equal(canAccessTrack(snap, 'backend', ['frontend', 'backend']), false)
      assert.equal(canAccessTrack(snap, 'frontend', ['frontend', 'backend']), true)

      // 5. Completion, progress and checklists survive expiry intact.
      await prisma.courseCompletion.create({ data: { userId: user.id, trackId: 'frontend', completedAt: at('2026-05-01T00:00:00.000Z') } })
      await prisma.userProgress.create({ data: { userId: user.id, trackId: 'frontend', itemType: 'lesson', resourceId: 'r1', status: 'COMPLETED', completedAt: at('2026-04-01T00:00:00.000Z') } })
      await prisma.checklistProgress.create({ data: { userId: user.id, trackId: 'frontend', kind: 'PROJECT', itemKey: 'p1', isCompleted: true, completedAt: at('2026-04-02T00:00:00.000Z') } })

      assert.equal((await getEntitlementSnapshot(prisma, user.id, at('2026-08-01T00:00:00.000Z'))).tier, 'FREE')
      assert.ok(await prisma.courseCompletion.findUnique({ where: { userId_trackId: { userId: user.id, trackId: 'frontend' } } }))
      assert.equal(await prisma.userProgress.count({ where: { userId: user.id, trackId: 'frontend' } }), 1)
      assert.equal(await prisma.checklistProgress.count({ where: { userId: user.id, trackId: 'frontend' } }), 1)

      // 6. Repurchase after expiry appends a NEW auditable period; duplicates do not.
      const ref2 = `TSH_${stamp}_P2`
      await createPendingOrder(prisma, { userId: user.id, planId: 'TRACK_PASS', provider: 'lemonsqueezy', trackId: 'frontend', currency: 'USD', amountMinor: 900, reference: ref2, pricingVersion: 'test' })
      const secondEvent = event({ orderReference: ref2, userId: user.id, productCode: 'TRACK_PASS', trackId: 'frontend', providerOrderId: 'o2', occurredAt: '2026-08-01T00:00:00.000Z', amountMinor: 900, currency: 'USD' })
      assert.equal((await applyBillingEvent(prisma, secondEvent, 'lemonsqueezy:tp-2')).applied, true)
      assert.equal(await prisma.trackPassPurchase.count({ where: { userId: user.id, trackId: 'frontend' } }), 2)
      assert.equal((await getEntitlementSnapshot(prisma, user.id, at('2026-09-01T00:00:00.000Z'))).tier, 'PASS')
      // A re-delivery with a different event id but the same order cannot add a period.
      assert.equal((await applyBillingEvent(prisma, secondEvent, 'lemonsqueezy:tp-2b')).applied, true)
      assert.equal(await prisma.trackPassPurchase.count({ where: { userId: user.id, trackId: 'frontend' } }), 2)
      // The same event id is a duplicate at the audit layer.
      assert.equal((await applyBillingEvent(prisma, secondEvent, 'lemonsqueezy:tp-2')).reason, 'duplicate')

      // 7. Checkout duplicate guard: sees the active period, then nothing when expired.
      assert.ok(await getActiveTrackPass(prisma, user.id, 'frontend', at('2026-09-01T00:00:00.000Z')))
      assert.equal(await getActiveTrackPass(prisma, user.id, 'frontend', at('2027-03-01T00:00:00.000Z')), null)

      // 8. Pro overrides; when Pro ends, a still-valid pass is respected.
      const proPassRef = `TSH_${stamp}_P3`
      await createPendingOrder(prisma, { userId: pro.id, planId: 'TRACK_PASS', provider: 'lemonsqueezy', trackId: 'backend', currency: 'USD', amountMinor: 900, reference: proPassRef, pricingVersion: 'test' })
      await applyBillingEvent(prisma, event({ orderReference: proPassRef, userId: pro.id, productCode: 'TRACK_PASS', trackId: 'backend', occurredAt: '2026-10-01T00:00:00.000Z', amountMinor: 900, currency: 'USD' }), 'lemonsqueezy:tp-3')
      await applyBillingEvent(prisma, event({ type: 'subscription_created', rawType: 'subscription_created', userId: pro.id, productCode: 'PRO_MONTHLY', providerSubscriptionId: 'sub_pass', status: 'active', currentPeriodEnd: '2027-01-01T00:00:00.000Z' }), 'lemonsqueezy:tp-4')

      const nowPro = at('2026-12-01T00:00:00.000Z')
      assert.equal((await getEntitlementSnapshot(prisma, pro.id, nowPro)).tier, 'PRO')

      await applyBillingEvent(prisma, event({ type: 'subscription_expired', rawType: 'subscription_expired', userId: pro.id, productCode: 'PRO_MONTHLY', providerSubscriptionId: 'sub_pass', status: 'expired', occurredAt: '2027-01-01T00:00:00.000Z' }), 'lemonsqueezy:tp-5')
      const afterPro = await getEntitlementSnapshot(prisma, pro.id, nowPro)
      assert.equal(afterPro.tier, 'PASS')
      assert.deepEqual(afterPro.ownedTrackIds, ['backend'])

      // tp-1, tp-2 and the re-delivered tp-2b are auditable; the duplicate event id adds none.
      assert.ok((await prisma.entitlementEvent.count({ where: { userId: user.id } })) >= 3)
    } finally {
      await prisma.user.delete({ where: { id: user.id } }).catch(() => {})
      await prisma.user.delete({ where: { id: pro.id } }).catch(() => {})
      await prisma.$disconnect()
    }
  },
)
