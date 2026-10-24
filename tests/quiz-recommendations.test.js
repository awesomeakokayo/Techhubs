'use strict'

const test = require('node:test')
const assert = require('node:assert/strict')
const { aggregateQuizAnswers } = require('../.test-dist/quiz-recommendations.js')

test('revised quiz answers replace the old score contribution instead of double-counting it', () => {
  const firstChoice = {
    label: 'Build software',
    scores: { frontend: 3, fullstack: 2 },
  }
  const revisedChoice = {
    label: 'Work with AI',
    scores: { 'ai-work': 3, 'ai-foundations': 2 },
  }

  // The UI replaces answers[0] with the second choice, then recalculates totals.
  const result = aggregateQuizAnswers([revisedChoice, null])

  assert.deepEqual(result.scores, { 'ai-work': 3, 'ai-foundations': 2 })
  assert.deepEqual(result.reasons, {
    'ai-work': ['Work with AI'],
    'ai-foundations': ['Work with AI'],
  })
  assert.equal(Object.hasOwn(result.scores, 'frontend'), false)
  assert.equal(Object.hasOwn(result.scores, 'fullstack'), false)
})

test('scores and match reasons are derived from the currently retained answers', () => {
  const result = aggregateQuizAnswers([
    { label: 'Build software', scores: { fullstack: 2, 'ai-engineering': 1 } },
    { label: 'Work analytically', scores: { fullstack: 1, data: 3 } },
    null,
  ])

  assert.deepEqual(result.scores, { fullstack: 3, 'ai-engineering': 1, data: 3 })
  assert.deepEqual(result.reasons.fullstack, ['Build software', 'Work analytically'])
  assert.deepEqual(result.reasons.data, ['Work analytically'])
})

test('missing or invalid score values do not alter recommendation totals', () => {
  const result = aggregateQuizAnswers([
    { label: 'No score', scores: { omitted: undefined, invalid: Number.NaN, zero: 0 } },
  ])
  assert.deepEqual(result.scores, {})
  assert.deepEqual(result.reasons, {})
})
