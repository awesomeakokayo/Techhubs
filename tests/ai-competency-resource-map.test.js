const test = require('node:test')
const assert = require('node:assert/strict')
const { validateAICompetencyResourceMap } = require('../.test-dist/ai-competency-resource-map.js')

test('AI competency resource map is complete and internally consistent', () => {
  const result = validateAICompetencyResourceMap()
  assert.equal(result.ok, true, result.problems.join('\n'))
})
