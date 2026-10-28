const test = require('node:test')
const assert = require('node:assert/strict')

const { AI_AGENTS_AUTHORED_LESSONS } = require('../.test-dist/ai-stage-lessons-authored.js')
const { getAIStageLesson } = require('../.test-dist/ai-stage-lessons.js')

const EXPECTED_STAGE_TERMS = {
  1: /agent|workflow|tools/i,
  2: /workflow|deterministic|agent/i,
  3: /responsibility|tool|state/i,
  4: /tool|schema|authorization/i,
  5: /context|memory|retrieval/i,
  6: /failure|retry|recovery/i,
  7: /trace|observability|evaluation/i,
  8: /approval|consequential|action/i,
  9: /evaluation|regression|metrics/i,
  10: /multi-agent|specialist|handoff/i,
}

test('AI Agents flagship has ten substantial, distinct lessons and worked examples', () => {
  assert.equal(Object.keys(AI_AGENTS_AUTHORED_LESSONS).length, 10)
  const lessonFingerprints = new Set()

  for (let stageId = 1; stageId <= 10; stageId += 1) {
    const authored = AI_AGENTS_AUTHORED_LESSONS[stageId]
    assert.ok(authored, 'missing authored lesson for stage ' + stageId)
    assert.ok(authored.lesson.length >= 900, 'lesson too short for stage ' + stageId + ': ' + authored.lesson.length)
    assert.ok(authored.workedExample.length >= 350, 'worked example too short for stage ' + stageId)
    assert.ok(authored.commonMistakes.length >= 3, 'stage ' + stageId + ' needs at least three concrete mistakes')
    assert.ok(authored.appliedChallenge.length >= 150, 'stage ' + stageId + ' challenge is too thin')
    assert.match(authored.lesson, EXPECTED_STAGE_TERMS[stageId], 'stage ' + stageId + ' lesson does not discuss its own competency')

    const fingerprint = authored.lesson.slice(0, 180).toLowerCase()
    assert.ok(!lessonFingerprints.has(fingerprint), 'stage ' + stageId + ' duplicates another lesson opening')
    lessonFingerprints.add(fingerprint)

    const served = getAIStageLesson('ai-agents', stageId, 'Placeholder title', 'Placeholder objective', ['Placeholder criterion'])
    assert.equal(served.lesson, authored.lesson, 'stage ' + stageId + ' is not using its authored lesson')
    assert.equal(served.workedExample, authored.workedExample)
  }
})

test('other AI tracks retain a fallback until their authored curriculum is reviewed', () => {
  const fallback = getAIStageLesson('ai-foundations', 1, 'Understanding AI', 'Explain a model limitation', ['Name one limitation'])
  assert.match(fallback.lesson, /central idea/i)
  assert.doesNotMatch(fallback.lesson, /CASE: classify a customer support ticket/i)
})
