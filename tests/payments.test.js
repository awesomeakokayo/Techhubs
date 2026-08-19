'use strict'
const test = require('node:test')
const assert = require('node:assert/strict')

const {
  transactionMatchesOrder,
  planKeyToEnum,
  planEnumToDays,
  getIpCountryFromHeaders,
} = require('../.test-dist/payments.js')

const order = { reference: 'TSH_abc123_REFERENCE', currency: 'NGN', amount: 245000 }

test('matching Paystack success fulfills checks', () => {
  const r = transactionMatchesOrder(
    { status: 'success', reference: order.reference, amount: 245000, currency: 'NGN' },
    order
  )
  assert.equal(r.matches, true)
})

test('wrong amount is rejected (subunit exact)', () => {
  const r = transactionMatchesOrder(
    { status: 'success', reference: order.reference, amount: 24500, currency: 'NGN' },
    order
  )
  assert.equal(r.matches, false)
  assert.match(r.reason, /amount_mismatch/)
})

test('string amount accepted when numeric-equal', () => {
  const r = transactionMatchesOrder(
    { status: 'success', reference: order.reference, amount: '245000', currency: 'NGN' },
    order
  )
  assert.equal(r.matches, true)
})

test('wrong currency is rejected', () => {
  const r = transactionMatchesOrder(
    { status: 'success', reference: order.reference, amount: 245000, currency: 'USD' },
    order
  )
  assert.equal(r.matches, false)
  assert.match(r.reason, /currency_mismatch/)
})

test('foreign reference is rejected (replay protection)', () => {
  const r = transactionMatchesOrder(
    { status: 'success', reference: 'SOMEONE_ELSES_REF', amount: 245000, currency: 'NGN' },
    order
  )
  assert.equal(r.matches, false)
  assert.match(r.reason, /reference_mismatch/)
})

test('failed transaction never matches', () => {
  const r = transactionMatchesOrder(
    { status: 'failed', reference: order.reference, amount: 245000, currency: 'NGN' },
    order
  )
  assert.equal(r.matches, false)
  assert.match(r.reason, /txn_status/)
})

test('amount must match in correct subunit for USD too', () => {
  const usdOrder = { reference: 'REF_USD', currency: 'USD', amount: 499 }
  const r = transactionMatchesOrder(
    { status: 'success', reference: 'REF_USD', amount: 499, currency: 'USD' },
    usdOrder
  )
  assert.equal(r.matches, true)
})

test('plan key/enum mapping', () => {
  assert.equal(planKeyToEnum('monthly'), 'MONTHLY')
  assert.equal(planKeyToEnum('threeMonths'), 'THREE_MONTHS')
  assert.equal(planKeyToEnum('yearly'), 'YEARLY')
  assert.equal(planEnumToDays('MONTHLY'), 30)
  assert.equal(planEnumToDays('THREE_MONTHS'), 90)
  assert.equal(planEnumToDays('YEARLY'), 365)
})

test('IP country read from trusted header only', () => {
  assert.equal(getIpCountryFromHeaders(new Headers({ 'x-vercel-ip-country': 'NG' })), 'NG')
  assert.equal(getIpCountryFromHeaders(new Headers({ cookie: 'tsh-region=ng' })), null)
  assert.equal(getIpCountryFromHeaders(new Headers({ 'x-forwarded-for': '1.2.3.4' })), null)
  assert.equal(getIpCountryFromHeaders({ 'x-vercel-ip-country': 'GB' }), 'GB')
})