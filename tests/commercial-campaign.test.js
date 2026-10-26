'use strict'
const test = require('node:test')
const assert = require('node:assert/strict')
const { getFoundingLearnerCampaign } = require('../.test-dist/commercial/campaign.js')

const base = {
  COMMERCE_FOUNDING_OFFER_ENABLED: 'true',
  COMMERCE_FOUNDING_OFFER_STARTS_AT: '2026-11-01T00:00:00+01:00',
  COMMERCE_FOUNDING_OFFER_ENDS_AT: '2026-11-15T00:00:00+01:00',
}

test('campaign is fail-closed with no dates or disabled flag', () => {
  assert.equal(getFoundingLearnerCampaign({}, new Date('2026-11-03T00:00:00Z')).active, false)
  assert.equal(getFoundingLearnerCampaign({ ...base, COMMERCE_FOUNDING_OFFER_ENABLED: 'false' }, new Date('2026-11-03T00:00:00Z')).active, false)
  assert.equal(getFoundingLearnerCampaign({ ...base, COMMERCE_FOUNDING_OFFER_STARTS_AT: 'tomorrow' }, new Date('2026-11-03T00:00:00Z')).configured, false)
})

test('campaign uses one fixed Africa/Lagos sales window including the start but excluding the end', () => {
  const before = getFoundingLearnerCampaign(base, new Date('2026-10-31T22:59:59Z'))
  const start = getFoundingLearnerCampaign(base, new Date('2026-10-31T23:00:00Z'))
  const end = getFoundingLearnerCampaign(base, new Date('2026-11-14T23:00:00Z'))
  assert.equal(before.active, false)
  assert.equal(start.active, true)
  assert.equal(end.active, false)
  assert.equal(start.timezone, 'Africa/Lagos')
  assert.equal(start.regularPriceMinor, 600000)
  assert.equal(start.promotionalPriceMinor, 300000)
  assert.equal(start.discountPercent, 50)
})
