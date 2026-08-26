const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '..')
const guided = fs.readFileSync(path.join(root, 'lib', 'ai-guided-path.ts'), 'utf8')
const audit = fs.readFileSync(path.join(root, 'lib', 'ai-assessment-audit.ts'), 'utf8')
const objectives = fs.readFileSync(path.join(root, 'lib', 'ai-stage-objectives.ts'), 'utf8')

const tracks = {
  'ai-foundations': 6,
  'ai-work': 5,
  'ai-research': 5,
  'ai-content': 5,
  'ai-youtube': 10,
  'ai-software-development': 8,
  'ai-automation': 8,
  'ai-agents': 10,
  'ai-engineering': 10,
  'ai-design': 8,
}

test('Phase 6 metadata exists on AI quiz questions', () => {
  assert.match(guided, /annotateAIQuestions/)
  assert.match(guided, /const verifyQuestions = annotateAIQuestions/) 
  assert.match(audit, /teachingSource\?: string/)
  assert.match(audit, /teachingStageId\?: number/)
  assert.match(audit, /cognitiveLevel\?: QuizCognitiveLevel/)
})

test('every AI track/stage has a taught competency objective', () => {
  for (const [trackId, stageCount] of Object.entries(tracks)) {
    const trackStart = objectives.indexOf(`'${trackId}': {`)
    assert.notEqual(trackStart, -1, `${trackId} objective map missing`)
    const trackBlock = objectives.slice(trackStart, trackStart + 30000)
    for (let stageId = 1; stageId <= stageCount; stageId += 1) {
      assert.match(trackBlock, new RegExp(`\\b${stageId}: \\{ objective:`), `${trackId} stage ${stageId} objective missing`)
    }
  }
})

test('AI assessment emphasizes application and reasoning', () => {
  assert.match(audit, /AI_ASSESSMENT_COGNITIVE_ORDER/)
  assert.match(audit, /'understand',\s*'apply',\s*'apply',\s*'analyze',\s*'evaluate'/)
  assert.match(audit, /applicationAndReasoning < 3/)
})

test('AI assessments cannot silently pass without provenance', () => {
  assert.match(audit, /missing local teaching-stage provenance/)
  assert.match(audit, /missing teachingSource/)
  assert.match(audit, /missing cognitiveLevel/)
})

test('AI Verify is tied to the stage before Build', () => {
  assert.match(guided, /learningPhase: 'verify'/)
  assert.match(guided, /stageId, quizQuestions: verifyQuestions/) 
  assert.match(guided, /learningPhase: 'build'/)
})

// The AI path owns the new assessment contract. Legacy non-AI quizzes are
// intentionally excluded until their curriculum is independently rebuilt.
test('Phase 6 scope is explicit', () => {
  const documentation = fs.readFileSync(path.join(root, 'docs', 'AI_PHASE_6_ASSESSMENT_AUDIT.md'), 'utf8')
  assert.match(documentation, /audits the AI curriculum's verification layer/i)
  assert.match(documentation, /Existing non-AI track quizzes continue/i)
})
