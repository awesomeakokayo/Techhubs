'use strict'
const test = require('node:test')
const assert = require('node:assert/strict')

const { evaluatePaymentRisk } = require('../.test-dist/risk.js')

test('low-risk Nigeria: IP + card NG, NGN → ALLOW, no reasons', () => {
  const r = evaluatePaymentRisk({
    ipCountry: 'NG',
    pricingRegion: 'NG',
    transactionCurrency: 'NGN',
    cardCountry: 'NG',
    userId: 'u1',
  })
  assert.equal(r.outcome, 'ALLOW')
  assert.deepEqual(r.reasons, [])
})

test('low-risk international: IP + card US, USD → ALLOW', () => {
  const r = evaluatePaymentRisk({
    ipCountry: 'US',
    pricingRegion: 'INTERNATIONAL',
    transactionCurrency: 'USD',
    cardCountry: 'US',
    userId: 'u1',
  })
  assert.equal(r.outcome, 'ALLOW')
})

test('traveler: IP US, card NG, USD → REVIEW not denied', () => {
  const r = evaluatePaymentRisk({
    ipCountry: 'US',
    pricingRegion: 'INTERNATIONAL',
    transactionCurrency: 'USD',
    cardCountry: 'NG',
    userId: 'u1',
  })
  assert.equal(r.outcome, 'REVIEW')
  assert.ok(r.reasons.some((reason) => reason.startsWith('card_country_mismatch')))
})

test('suspicious: IP NG, card US with NGN price → REVIEW, recorded', () => {
  const r = evaluatePaymentRisk({
    ipCountry: 'NG',
    pricingRegion: 'NG',
    transactionCurrency: 'NGN',
    cardCountry: 'US',
    userId: 'u1',
  })
  assert.equal(r.outcome, 'REVIEW')
  assert.ok(r.reasons.includes('ngn_price_with_non_ng_card'))
})

test('paystack deny action → REVIEW', () => {
  const r = evaluatePaymentRisk({
    ipCountry: 'US',
    pricingRegion: 'INTERNATIONAL',
    transactionCurrency: 'USD',
    paystackRiskAction: 'deny',
    userId: 'u1',
  })
  assert.equal(r.outcome, 'REVIEW')
  assert.ok(r.reasons.includes('paystack_risk_action_deny'))
})

test('no signals → default ALLOW (do not overblock)', () => {
  const r = evaluatePaymentRisk({
    pricingRegion: 'INTERNATIONAL',
    transactionCurrency: 'USD',
    userId: 'u1',
  })
  assert.equal(r.outcome, 'ALLOW')
  assert.deepEqual(r.reasons, [])
})