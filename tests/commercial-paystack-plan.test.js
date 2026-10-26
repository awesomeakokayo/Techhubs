'use strict'
const test = require('node:test')
const assert = require('node:assert/strict')
const { validatePaystackPlan } = require('../.test-dist/commercial/paystack-plan-validation.js')

const price = { planId: 'PRO_QUARTERLY', provider: 'paystack', currency: 'NGN', amountMinor: 1100000, interval: 'P3M', approved: true }

test('a Paystack plan is accepted only when code, amount, currency and interval match', () => {
  assert.deepEqual(validatePaystackPlan('PLN_quarter', {
    plan_code: 'PLN_quarter', amount: 1100000, currency: 'NGN', interval: 'quarterly',
  }, price), { matches: true })
})

test('a missing or different plan code fails closed', () => {
  assert.equal(validatePaystackPlan('', { plan_code: 'PLN_quarter', amount: 1100000, currency: 'NGN', interval: 'quarterly' }, price).matches, false)
  assert.equal(validatePaystackPlan('PLN_other', { plan_code: 'PLN_quarter', amount: 1100000, currency: 'NGN', interval: 'quarterly' }, price).reason, 'plan_code_mismatch')
})

test('a mispriced plan or wrong billing cadence is never chargeable', () => {
  assert.equal(validatePaystackPlan('PLN_quarter', { plan_code: 'PLN_quarter', amount: 450000, currency: 'NGN', interval: 'quarterly' }, price).reason, 'amount_mismatch')
  assert.equal(validatePaystackPlan('PLN_quarter', { plan_code: 'PLN_quarter', amount: 1100000, currency: 'USD', interval: 'quarterly' }, price).reason, 'currency_mismatch')
  assert.equal(validatePaystackPlan('PLN_quarter', { plan_code: 'PLN_quarter', amount: 1100000, currency: 'NGN', interval: 'monthly' }, price).reason, 'interval_mismatch')
})
