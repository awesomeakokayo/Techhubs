const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '..')
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')

const guided = read('lib/ai-guided-path.ts')
const objectives = read('lib/ai-stage-objectives.ts')
const lessons = read('lib/ai-stage-lessons.ts')
const practice = read('lib/ai-practice-advanced.ts')
const projectAudit = read('lib/ai-project-audit.ts')
const resourceRegistry = read('lib/ai-resource-registry.ts')
const assessmentAudit = read('lib/ai-assessment-audit.ts')

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

test('Phase 8: all AI tracks expose the canonical five-phase learner contract', () => {
  assert.match(guided, /learningPhase: 'learn'/)
  assert.match(guided, /learningPhase: 'see'/)
  assert.match(guided, /learningPhase: 'practice'/)
  assert.match(guided, /learningPhase: 'verify'/)
  assert.match(guided, /learningPhase: 'build'/)
  assert.match(guided, /getAIResourceAuditsForStage\(trackId, stageId\)/)
  assert.match(guided, /annotateAIQuestions\(trackId, stageId, rawVerifyQuestions\)/)
  assert.match(guided, /getAIProjectAudit\(mappedProject\.id\)/)
})

test('Phase 8: every AI track has an objective and authored lesson system for every stage', () => {
  for (const [trackId, count] of Object.entries(tracks)) {
    const blockStart = objectives.indexOf(`'${trackId}': {`)
    assert.notEqual(blockStart, -1, `${trackId} is missing objectives`)
    const block = objectives.slice(blockStart, blockStart + 16000)
    for (let stage = 1; stage <= count; stage += 1) {
      assert.match(block, new RegExp(`\\n    ${stage}: \\{ objective:`), `${trackId} stage ${stage} has no objective`)
    }

    assert.match(lessons, new RegExp(`'${trackId}': \\[`), `${trackId} has no lesson context`)
  }
})

test('Phase 8: every AI stage can produce a Practice action without an outside search', () => {
  assert.match(guided, /primaryPractice \? `Practice:/)
  assert.match(guided, /lesson\?\.appliedChallenge/)
  assert.match(guided, /INSTRUCTIONS/)
  assert.match(guided, /SUCCESS CRITERIA/)
  assert.match(practice, /export const AI_ADVANCED_PRACTICE_TASKS/)
})

test('Phase 8: Verify remains tied to curriculum evidence and application', () => {
  assert.match(assessmentAudit, /teachingStageId/)
  assert.match(assessmentAudit, /cognitiveLevel/)
  assert.match(assessmentAudit, /Apply|Analyze|Evaluate/)
  assert.match(guided, /buildFallbackVerifyQuestions/)
  assert.match(guided, /AI stages require at least 80% to continue/)
})

test('Phase 8: Build remains backward-audited rather than introducing surprise concepts', () => {
  for (const projectId of ['ai-f-p3', 'ai-w-p4', 'ai-r-p2', 'ai-c-p4', 'ai-y-p3', 'ai-s-p4', 'ai-a-p2', 'ai-ag-p2', 'ai-e-p2', 'ai-d-p2']) {
    const start = projectAudit.indexOf(`'${projectId}': {`)
    assert.notEqual(start, -1, `${projectId} has no Phase 5 audit record`)
    const block = projectAudit.slice(start, start + 18000)
    assert.match(block, /status: 'complete'/)
    assert.match(block, /learn:/)
    assert.match(block, /see:/)
    assert.match(block, /practice:/)
    assert.match(block, /verify:/)
    assert.match(block, /newMajorConcepts: \[\]/)
  }
})

test('Phase 8: learner-facing external resources come only from the canonical verified registry', () => {
  assert.match(guided, /getAIResourceAuditsForStage/)
  assert.doesNotMatch(guided, /getAIInstructionalGapResources\(trackId, stageId\)/)
  assert.match(resourceRegistry, /status: 'verified'/)
  assert.match(resourceRegistry, /free: true/)
  assert.match(resourceRegistry, /lastChecked: '2026-08-26'/)
  assert.match(resourceRegistry, /competency:/)
  assert.match(resourceRegistry, /trackId:/)
})

test('Phase 8: no learner-flow step uses a generic “go search” instruction', () => {
  for (const file of ['lib/ai-guided-path.ts', 'lib/ai-stage-lessons.ts', 'lib/ai-practice-advanced.ts', 'lib/ai-project-briefs.ts']) {
    const content = read(file).toLowerCase()
    assert.doesNotMatch(content, /go search the internet/)
    assert.doesNotMatch(content, /figure it out yourself/)
  }
})
