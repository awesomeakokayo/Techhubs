'use strict'
const test = require('node:test')
const assert = require('node:assert/strict')

const {
  resolvePricingContext,
  resolveCheckoutPricing,
  PRICING,
  PLAN_DAYS,
  PRICING_VERSION,
} = require('../.test-dist/pricing.js')

test('NG IP resolves to NGN Nigeria pricing', () => {
  const ctx = resolvePricingContext({ ipCountry: 'NG' })
  assert.equal(ctx.region, 'NG')
  assert.equal(ctx.currency, 'NGN')
  assert.deepEqual(ctx.countrySource, 'ip')
  assert.equal(ctx.confidence, 'medium')
})

test('NG IP with NG profile resolves to NGN high confidence', () => {
  const ctx = resolvePricingContext({ ipCountry: 'NG', profileCountry: 'NG' })
  assert.equal(ctx.region, 'NG')
  assert.equal(ctx.confidence, 'high')
})

test('US IP resolves to INTERNATIONAL USD', () => {
  const ctx = resolvePricingContext({ ipCountry: 'US' })
  assert.equal(ctx.region, 'INTERNATIONAL')
  assert.equal(ctx.currency, 'USD')
})

test('UK IP resolves to INTERNATIONAL USD', () => {
  const ctx = resolvePricingContext({ ipCountry: 'GB' })
  assert.equal(ctx.region, 'INTERNATIONAL')
  assert.equal(ctx.currency, 'USD')
})

test('lowercase ng IP is normalized to NG', () => {
  const ctx = resolvePricingContext({ ipCountry: 'ng ' })
  assert.equal(ctx.region, 'NG')
  assert.equal(ctx.currency, 'NGN')
})

test('missing IP falls back to INTERNATIONAL (never cheaper NGN)', () => {
  const ctx = resolvePricingContext({})
  assert.equal(ctx.region, 'INTERNATIONAL')
  assert.equal(ctx.currency, 'USD')
  assert.equal(ctx.countrySource, 'fallback')
  assert.equal(ctx.confidence, 'low')
})

test('NG monthly = 245000 kobo, 2450 major', () => {
  const p = resolveCheckoutPricing({ ipCountry: 'NG', plan: 'monthly' })
  assert.equal(p.amount, 245000)
  assert.equal(p.amountMajor, 2450)
  assert.equal(p.priceLabel, PRICING.NG.tiers[0].priceLabel)
})

test('INTL yearly = 2999 cents, 29.99 major', () => {
  const p = resolveCheckoutPricing({ ipCountry: 'US', plan: 'yearly' })
  assert.equal(p.amount, 2999)
  assert.equal(p.amountMajor, 29.99)
})

test('client-supplied currency/amount are ignored', () => {
  // Extra keys are not part of the API and must not affect resolution.
  const p = resolveCheckoutPricing({ ipCountry: 'US', plan: 'monthly', currency: 'NGN', amount: 1000 })
  assert.equal(p.currency, 'USD')
  assert.equal(p.amount, 499)
})

test('PRICING is centrally defined for both regions', () => {
  assert.equal(PRICING.NG.currency, 'NGN')
  assert.equal(PRICING.INTERNATIONAL.currency, 'USD')
  assert.ok(PRICING_VERSION.length > 0)
})

test('PLAN_DAYS map updated by tier', () => {
  assert.equal(PLAN_DAYS.monthly, 30)
  assert.equal(PLAN_DAYS.threeMonths, 90)
  assert.equal(PLAN_DAYS.yearly, 365)
})