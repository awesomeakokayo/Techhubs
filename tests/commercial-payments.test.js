'use strict'
/**
 * Monetary matching: a charge must correspond to the trusted internal order in
 * amount, currency and product/variant, and must fail closed when required
 * signals are missing.
 */
const test = require('node:test')
const assert = require('node:assert/strict')

const { validatePaymentMatch } = require('../.test-dist/commercial/payments.js')

const order = { amount: 900, currency: 'USD', productCode: 'TRACK_PASS' }
const pay = (over = {}) => ({ type: 'payment_succeeded', amountMinor: 900, currency: 'USD', productId: null, ...over })

test('exact match passes', () => {
  assert.deepEqual(validatePaymentMatch(pay(), order, null, { requiresOrder: true }), { matches: true })
})

test('amount mismatch is rejected (fail closed)', () => {
  const r = validatePaymentMatch(pay({ amountMinor: 100 }), order, null, { requiresOrder: true })
  assert.equal(r.matches, false)
  assert.match(r.reason, /amount_mismatch:100!=900/)
})

test('currency mismatch is rejected', () => {
  const r = validatePaymentMatch(pay({ currency: 'NGN' }), order, null, { requiresOrder: true })
  assert.equal(r.matches, false)
  assert.match(r.reason, /currency_mismatch/)
})

test('missing order for a required one-time purchase is rejected', () => {
  const r = validatePaymentMatch(pay(), null, null, { requiresOrder: true })
  assert.equal(r.matches, false)
  assert.equal(r.reason, 'missing_order')
})

test('missing amount for a required purchase is rejected', () => {
  const r = validatePaymentMatch(pay({ amountMinor: null }), order, null, { requiresOrder: true })
  assert.equal(r.matches, false)
  assert.equal(r.reason, 'amount_missing')
})

test('variant/product mismatch against configured product is rejected', () => {
  const r = validatePaymentMatch(pay({ productId: '999' }), order, '11', { requiresOrder: true })
  assert.equal(r.matches, false)
  assert.match(r.reason, /variant_mismatch:999!=11/)
})

test('matching variant passes', () => {
  assert.equal(validatePaymentMatch(pay({ productId: '11' }), order, '11', { requiresOrder: true }).matches, true)
})

test('refund larger than the order is rejected', () => {
  const r = validatePaymentMatch({ type: 'refunded', amountMinor: 2000, currency: 'USD', productId: null }, order, null, { requiresOrder: false })
  assert.equal(r.matches, false)
  assert.match(r.reason, /refund_exceeds_order/)
})

test('subscription payment without an order is allowed (renewal) and amount compared when present', () => {
  assert.equal(validatePaymentMatch(pay({ amountMinor: 1200 }), null, null, { requiresOrder: false }).matches, true)
  const mismatch = validatePaymentMatch(pay({ amountMinor: 5 }), { amount: 1200, currency: 'USD', productCode: 'PRO_MONTHLY' }, null, { requiresOrder: false })
  assert.equal(mismatch.matches, false)
})

test('a missing configured product id skips only the variant check', () => {
  assert.equal(validatePaymentMatch(pay({ productId: 'anything' }), order, null, { requiresOrder: true }).matches, true)
})
