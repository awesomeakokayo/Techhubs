'use strict'
const test = require('node:test')
const assert = require('node:assert/strict')
const { sanitizeCheckoutAttribution } = require('../.test-dist/commercial/attribution.js')

test('attribution keeps only approved UTM fields and a safe path/hostname', () => {
  assert.deepEqual(sanitizeCheckoutAttribution({
    utmSource: 'instagram',
    utmMedium: 'paid_social',
    utmCampaign: 'founding-learner',
    utmContent: 'reel-1',
    utmTerm: 'beginner-tech',
    landingPath: '/pricing?utm_source=instagram',
    referrerHost: 'https://m.instagram.com/path?x=1',
    email: 'learner@example.com',
    userId: 'should-not-persist',
  }), {
    utmSource: 'instagram',
    utmMedium: 'paid_social',
    utmCampaign: 'founding-learner',
    utmContent: 'reel-1',
    utmTerm: 'beginner-tech',
    landingPath: '/pricing',
    referrerHost: 'm.instagram.com',
  })
})

test('attribution rejects invalid shapes and unsafe paths', () => {
  assert.equal(sanitizeCheckoutAttribution(null), null)
  assert.equal(sanitizeCheckoutAttribution('utm_source=instagram'), null)
  assert.equal(sanitizeCheckoutAttribution({ landingPath: '//attacker.example/path' }), null)
  assert.equal(sanitizeCheckoutAttribution({ referrerHost: 'javascript:alert(1)' }), null)
  assert.equal(sanitizeCheckoutAttribution({ custom: 'not an approved field' }), null)
})

test('attribution strips control characters and caps untrusted text', () => {
  const result = sanitizeCheckoutAttribution({
    utmCampaign: 'launch\n\u0000offer',
    utmSource: 's'.repeat(200),
  })
  assert.equal(result.utmCampaign, 'launchoffer')
  assert.equal(result.utmSource.length, 120)
})
