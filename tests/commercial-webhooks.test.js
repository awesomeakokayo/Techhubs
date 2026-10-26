'use strict'
/**
 * Provider webhook verification and normalization. Signature checks must be
 * exact and constant-time; normalization must produce one canonical shape for
 * both providers and never trust unverified fields.
 */
const test = require('node:test')
const assert = require('node:assert/strict')
const crypto = require('node:crypto')

const {
  verifyPaystackSignature,
  verifyLemonSqueezySignature,
  webhookContentHash,
  safeJsonParse,
  normalizePaystackEvent,
  normalizeLemonSqueezyEvent,
  normalizeBillingEvent,
} = require('../.test-dist/commercial/webhooks.js')

function paystackSig(body, secret) {
  return crypto.createHmac('sha512', secret).update(body, 'utf8').digest('hex')
}
function lsSig(body, secret) {
  return crypto.createHmac('sha256', secret).update(body, 'utf8').digest('hex')
}

test('Paystack signature: valid accepted, tampered and missing rejected', () => {
  const body = '{"event":"charge.success"}'
  const secret = 'sk_test_paystack'
  assert.equal(verifyPaystackSignature(body, paystackSig(body, secret), secret), true)
  assert.equal(verifyPaystackSignature(body + ' ', paystackSig(body, secret), secret), false)
  assert.equal(verifyPaystackSignature(body, 'deadbeef', secret), false)
  assert.equal(verifyPaystackSignature(body, null, secret), false)
  assert.equal(verifyPaystackSignature(body, paystackSig(body, secret), ''), false)
})

test('Lemon Squeezy signature: valid accepted, tampered and wrong-secret rejected', () => {
  const body = '{"meta":{"event_name":"order_created"}}'
  const secret = 'ls_signing_secret'
  assert.equal(verifyLemonSqueezySignature(body, lsSig(body, secret), secret), true)
  assert.equal(verifyLemonSqueezySignature(body, lsSig(body, 'other'), secret), false)
  assert.equal(verifyLemonSqueezySignature(body, undefined, secret), false)
})

test('content hash is stable and safeJsonParse never throws', () => {
  assert.equal(webhookContentHash('abc'), webhookContentHash('abc'))
  assert.notEqual(webhookContentHash('abc'), webhookContentHash('abd'))
  assert.equal(safeJsonParse('{bad'), null)
  assert.deepEqual(safeJsonParse('{"a":1}'), { a: 1 })
})

test('Paystack charge.success normalizes to payment_succeeded with metadata', () => {
  const event = normalizePaystackEvent({
    event: 'charge.success',
    data: {
      reference: 'TSH_REF',
      id: 99,
      status: 'success',
      metadata: { plan_id: 'TRACK_PASS', track_id: 'frontend', user_id: 'u1' },
      customer: { customer_code: 'CUS_1' },
    },
  })
  assert.equal(event.provider, 'paystack')
  assert.equal(event.type, 'payment_succeeded')
  assert.equal(event.orderReference, 'TSH_REF')
  assert.equal(event.productCode, 'TRACK_PASS')
  assert.equal(event.trackId, 'frontend')
  assert.equal(event.userId, 'u1')
  assert.equal(event.providerCustomerId, 'CUS_1')
})

test('Paystack recurring and failed billing events are normalized', () => {
  assert.equal(normalizePaystackEvent({ event: 'charge.failed', data: {} }).type, 'payment_failed')
  const recurring = normalizePaystackEvent({ event: 'subscription.create', data: { subscription_code: 'SUB_X', plan: { plan_code: 'PLN_quarter' }, metadata: { plan_id: 'PRO_QUARTERLY' } } })
  assert.equal(recurring.type, 'subscription_created')
  assert.equal(recurring.productId, 'PLN_quarter')
  assert.equal(recurring.providerSubscriptionId, 'SUB_X')
})

test('Paystack unknown events normalize to ignored', () => {
  assert.equal(normalizePaystackEvent({ event: 'transfer.success', data: {} }).type, 'ignored')
})

test('Lemon Squeezy order_created normalizes one-time purchase', () => {
  const event = normalizeLemonSqueezyEvent({
    meta: { event_name: 'order_created', custom_data: { order_ref: 'TSH_REF', plan_id: 'TRACK_PASS', track_id: 'frontend', user_id: 'u1' }, test_mode: false },
    data: { type: 'orders', id: '42', attributes: { status: 'paid', customer_id: 7 } },
  })
  assert.equal(event.type, 'payment_succeeded')
  assert.equal(event.orderReference, 'TSH_REF')
  assert.equal(event.trackId, 'frontend')
  assert.equal(event.userId, 'u1')
  assert.equal(event.providerOrderId, '42')
  assert.equal(event.providerCustomerId, '7')
  assert.equal(event.testMode, false)
})

test('Lemon Squeezy subscription lifecycle maps to canonical types', () => {
  const sub = (name, attrs = {}) => normalizeLemonSqueezyEvent({
    meta: { event_name: name, custom_data: { plan_id: 'PRO_MONTHLY', user_id: 'u1' } },
    data: { type: 'subscriptions', id: '55', attributes: { status: 'active', renews_at: '2026-11-01T00:00:00.000Z', customer_id: 7, ...attrs } },
  })
  assert.equal(sub('subscription_created').type, 'subscription_created')
  assert.equal(sub('subscription_created').providerSubscriptionId, '55')
  assert.equal(sub('subscription_created').currentPeriodEnd, '2026-11-01T00:00:00.000Z')
  assert.equal(sub('subscription_cancelled').type, 'subscription_cancelled')
  assert.equal(sub('subscription_expired').type, 'subscription_expired')
  assert.equal(sub('subscription_payment_failed').type, 'subscription_payment_failed')
  assert.equal(sub('subscription_payment_success').type, 'payment_succeeded')
})

test('Lemon Squeezy refund and test mode are surfaced', () => {
  assert.equal(normalizeLemonSqueezyEvent({ meta: { event_name: 'order_refunded' }, data: { type: 'orders', id: '1', attributes: {} } }).type, 'refunded')
  assert.equal(normalizeLemonSqueezyEvent({ meta: { event_name: 'order_created', test_mode: true }, data: { type: 'orders', id: '1', attributes: {} } }).testMode, true)
})

test('normalizeBillingEvent dispatches by provider', () => {
  assert.equal(normalizeBillingEvent('paystack', { event: 'charge.success', data: {} }).provider, 'paystack')
  assert.equal(normalizeBillingEvent('lemonsqueezy', { meta: { event_name: 'order_created' }, data: {} }).provider, 'lemonsqueezy')
})

test('monetary and ordering fields are normalized for both providers', () => {
  const ps = normalizePaystackEvent({
    event: 'charge.success',
    data: { reference: 'r', amount: 245000, currency: 'NGN', domain: 'test', updated_at: '2026-10-01T00:00:00.000Z', metadata: {} },
  })
  assert.equal(ps.amountMinor, 245000)
  assert.equal(ps.currency, 'NGN')
  assert.equal(ps.testMode, true)
  assert.equal(ps.occurredAt, '2026-10-01T00:00:00.000Z')

  const ls = normalizeLemonSqueezyEvent({
    meta: { event_name: 'order_created', custom_data: {} },
    data: { type: 'orders', id: '1', attributes: { total: 900, currency: 'USD', first_order_item: { variant_id: 42 }, updated_at: '2026-10-02T00:00:00.000Z' } },
  })
  assert.equal(ls.amountMinor, 900)
  assert.equal(ls.currency, 'USD')
  assert.equal(ls.productId, '42')
  assert.equal(ls.occurredAt, '2026-10-02T00:00:00.000Z')

  const sub = normalizeLemonSqueezyEvent({
    meta: { event_name: 'subscription_updated', custom_data: {} },
    data: { type: 'subscriptions', id: '9', attributes: { variant_id: 12 } },
  })
  assert.equal(sub.productId, '12')
})
