'use strict'
/**
 * Path-continuity policy tests (pure — no database or browser).
 *
 * These prove the corrected behaviour of the guided-path version remap:
 *   - an incomplete learner is NEVER silently restarted when a path version
 *     changes; their position is preserved from their completed activity;
 *   - completed stages are not repeated;
 *   - a newly introduced mandatory assessment is not skipped using historical
 *     activity, and is made explicit without sending the learner to the start;
 *   - steps added after the learner passed them are adopted, not failed;
 *   - a learner with ambiguous historical state is not reset.
 *
 * The database-facing behaviour is covered by
 * `tests/path-enrollment.integration.test.js`.
 */
const test = require('node:test')
const assert = require('node:assert/strict')

const {
  guidedStepKey,
  userProgressStepKey,
  isAssessmentKey,
  isAssessmentStepType,
  canonicalProjectId,
  resolveCompatiblePathIndex,
  describePathUpdate,
  pathUpdateNoticeFromRecord,
  PROJECT_ID_ALIASES,
} = require('../.test-dist/path-compat.js')
const { completedStepKeys } = require('../.test-dist/path-enrollment.js')

// ── Stable step identity ────────────────────────────────────────────────────

test('a step keeps the same stable key regardless of its position', () => {
  assert.equal(guidedStepKey({ type: 'concept', stageId: 1 }), 'c:1')
  assert.equal(guidedStepKey({ type: 'resource', stageId: 2, resourceId: 'res-9' }), 'r:2:res-9')
  assert.equal(guidedStepKey({ type: 'practice', stageId: 3 }), 'p:3')
  assert.equal(guidedStepKey({ type: 'quiz', stageId: 3 }), 'q:3')
  assert.equal(guidedStepKey({ type: 'project', stageId: 3, projectId: 'proj-a' }), 'j:proj-a')
  assert.equal(guidedStepKey({ type: 'checkpoint', stageId: 4 }), 'k:4')
})

test('an activity record maps to the same key as the step it completed', () => {
  assert.equal(userProgressStepKey({ itemType: 'stage', stageId: 1, resourceId: 'step-quiz-1' }), 'q:1')
  assert.equal(userProgressStepKey({ itemType: 'stage', stageId: 1, resourceId: 'step-practice-1' }), 'p:1')
  assert.equal(userProgressStepKey({ itemType: 'project', stageId: null, resourceId: 'proj-a' }), 'j:proj-a')
  assert.equal(userProgressStepKey({ itemType: 'stage', stageId: 2, resourceId: 'res-9' }), 'r:2:res-9')
  // Synthetic ids with no stable meaning across versions are ignored.
  assert.equal(userProgressStepKey({ itemType: 'stage', stageId: 2, resourceId: 'step-checkpoint-2' }), 'k:2')
  assert.equal(userProgressStepKey({ itemType: 'stage', stageId: 2, resourceId: 'step-resource-2' }), null)
  assert.equal(userProgressStepKey({ itemType: 'stage', stageId: 2, resourceId: null }), null)
})

test('round trip: guidedStepKey(step) === userProgressStepKey(record written for that step)', () => {
  const steps = [
    { type: 'resource', stageId: 4, resourceId: 'r-x' },
    { type: 'practice', stageId: 4 },
    { type: 'quiz', stageId: 4 },
    { type: 'project', stageId: 4, projectId: 'p-x' },
  ]
  // Exactly what app/api/guided-path writes into UserProgress for each step type.
  const records = [
    { itemType: 'stage', stageId: 4, resourceId: 'r-x' },
    { itemType: 'stage', stageId: 4, resourceId: 'step-practice-4' },
    { itemType: 'stage', stageId: 4, resourceId: 'step-quiz-4' },
    { itemType: 'project', stageId: 4, resourceId: 'p-x' },
  ]
  for (let i = 0; i < steps.length; i += 1) {
    assert.equal(guidedStepKey(steps[i]), userProgressStepKey(records[i]))
  }
})

test('assessment keys are exactly the progression gates', () => {
  assert.equal(isAssessmentKey('q:1'), true)
  assert.equal(isAssessmentKey('j:proj'), true)
  assert.equal(isAssessmentKey('k:4'), true)
  assert.equal(isAssessmentKey('r:1:x'), false)
  assert.equal(isAssessmentKey('p:1'), false)
  assert.equal(isAssessmentKey('c:1'), false)
  assert.equal(isAssessmentStepType('quiz'), true)
  assert.equal(isAssessmentStepType('project'), true)
  assert.equal(isAssessmentStepType('checkpoint'), true)
  assert.equal(isAssessmentStepType('resource'), false)
})

test('project id aliases are explicit and documentable (none configured today)', () => {
  assert.deepEqual(PROJECT_ID_ALIASES, {})
  assert.equal(canonicalProjectId('proj-a'), 'proj-a')
})

// ── Position preservation ───────────────────────────────────────────────────

// A representative new path: stage 2 and 3 gained a resource and a project
// after the learner had already worked through stage 1.
const KEYS = [
  'c:1', 'r:1:res1', 'p:1', 'q:1',
  'c:2', 'r:2:res2', 'r:2:res2b', 'p:2', 'q:2', 'j:proj1',
  'c:3', 'r:3:res3', 'p:3', 'q:3',
]
const TOTAL = KEYS.length

test('1. an incomplete learner resumes at the correct equivalent position after a version bump', () => {
  // Completed stage 1 only (concept steps are not recorded).
  const completed = ['r:1:res1', 'p:1', 'q:1']
  const result = resolveCompatiblePathIndex({
    isCompleted: false,
    totalSteps: TOTAL,
    storedStepIndex: 4, // old path position
    completedKeys: completed,
    stepKeys: KEYS,
  })
  assert.equal(result.strategy, 'preserved')
  assert.equal(result.index, 4, 'resumes at the first step after the completed work')
  assert.notEqual(result.index, 0, 'must never restart at the beginning')
})

test('2. a learner with several completed stages does not repeat them', () => {
  const completed = ['r:1:res1', 'p:1', 'q:1', 'r:2:res2', 'p:2', 'q:2', 'j:proj1']
  const result = resolveCompatiblePathIndex({
    isCompleted: false,
    totalSteps: TOTAL,
    storedStepIndex: 20,
    completedKeys: completed,
    stepKeys: KEYS,
  })
  assert.equal(result.index, 10, 'continues at stage 3, not at stage 1')
  assert.equal(result.anchorIndex, 9)
})

test('a resource added after the learner passed that point is adopted, not failed', () => {
  const completed = ['r:1:res1', 'p:1', 'q:1', 'r:2:res2', 'p:2', 'q:2', 'j:proj1']
  const result = resolveCompatiblePathIndex({
    isCompleted: false,
    totalSteps: TOTAL,
    storedStepIndex: 9,
    completedKeys: completed,
    stepKeys: KEYS,
  })
  assert.equal(result.index, 10)
  assert.equal(result.strategy, 'preserved')
  assert.equal(result.adoptedSteps, 1, 'the newly inserted resource before the resume point is adopted')
})

test('3+7. a newly required assessment cannot be bypassed and never resets the whole path', () => {
  // The new path gained a mandatory project in stage 1, before the learner's
  // position. It must be surfaced, not skipped, and not sent back to step 0.
  const keys = ['c:1', 'r:1:res1', 'p:1', 'q:1', 'j:newproj', 'c:2', 'r:2:res2', 'p:2', 'q:2']
  const completed = ['r:1:res1', 'p:1', 'q:1', 'r:2:res2', 'p:2', 'q:2']
  const result = resolveCompatiblePathIndex({
    isCompleted: false,
    totalSteps: keys.length,
    storedStepIndex: 12,
    completedKeys: completed,
    stepKeys: keys,
  })
  assert.equal(result.strategy, 'new-requirement')
  assert.equal(result.index, 4, 'resumes exactly at the new required project')
  assert.equal(result.blockingKey, 'j:newproj')
  assert.ok(result.index > 0, 'completed work is preserved — not a restart')
})

test('9. a learner with no activity records is not silently reset', () => {
  const result = resolveCompatiblePathIndex({
    isCompleted: false,
    totalSteps: TOTAL,
    storedStepIndex: 6,
    completedKeys: [],
    stepKeys: KEYS,
  })
  assert.equal(result.strategy, 'restored')
  assert.equal(result.index, 6)
  assert.notEqual(result.index, 0)
})

test('a learner who has genuinely completed nothing starts at the beginning', () => {
  const result = resolveCompatiblePathIndex({
    isCompleted: false,
    totalSteps: TOTAL,
    storedStepIndex: 0,
    completedKeys: [],
    stepKeys: KEYS,
  })
  assert.equal(result.strategy, 'fresh')
  assert.equal(result.index, 0)
})

test('4. a completed course stays completed at the end of the new path', () => {
  const result = resolveCompatiblePathIndex({
    isCompleted: true,
    totalSteps: TOTAL,
    storedStepIndex: 9,
    completedKeys: ['r:1:res1'],
    stepKeys: KEYS,
  })
  assert.equal(result.strategy, 'completed')
  assert.equal(result.index, TOTAL)
})

test('a learner left at 0 by the old policy is recovered from their activity records', () => {
  const completed = ['r:1:res1', 'p:1', 'q:1', 'r:2:res2', 'p:2', 'q:2']
  const result = resolveCompatiblePathIndex({
    isCompleted: false,
    totalSteps: TOTAL,
    storedStepIndex: 0,
    completedKeys: completed,
    stepKeys: KEYS,
    repairStalledAtZero: true,
  })
  assert.ok(result.index > 0, 'moved forward from the wrongly-reset position')
  assert.equal(result.index, 9)
})

test('the mapping is deterministic and clamps to the path length', () => {
  const completed = ['r:1:res1', 'p:1', 'q:1']
  const a = resolveCompatiblePathIndex({ isCompleted: false, totalSteps: TOTAL, storedStepIndex: 3, completedKeys: completed, stepKeys: KEYS })
  const b = resolveCompatiblePathIndex({ isCompleted: false, totalSteps: TOTAL, storedStepIndex: 3, completedKeys: completed, stepKeys: KEYS })
  assert.deepEqual(a, b, 'repeated calls produce the same result (idempotent)')

  const far = resolveCompatiblePathIndex({ isCompleted: false, totalSteps: TOTAL, storedStepIndex: 10_000, completedKeys: [], stepKeys: KEYS })
  assert.equal(far.index, TOTAL)
})

// ── Completed-record derivation ─────────────────────────────────────────────

test('completed activity records are de-duplicated and ignore meaningless ids', () => {
  const keys = completedStepKeys([
    { itemType: 'stage', stageId: 1, resourceId: 'step-quiz-1' },
    { itemType: 'stage', stageId: 1, resourceId: 'step-quiz-1' },
    { itemType: 'project', stageId: null, resourceId: 'proj-a' },
    { itemType: 'stage', stageId: 2, resourceId: 'step-resource-2' },
  ])
  assert.deepEqual([...keys].sort(), ['j:proj-a', 'q:1'])
})

// ── Learner-facing explanation ──────────────────────────────────────────────

test('a material path change is explained, and an ordinary/no-op case is silent', () => {
  assert.match(describePathUpdate({ strategy: 'preserved', adoptedSteps: 0 }), /where you left off/)
  assert.match(describePathUpdate({ strategy: 'preserved', adoptedSteps: 2 }), /2 new steps/)
  assert.match(describePathUpdate({ strategy: 'new-requirement' }), /new required step/)
  assert.match(describePathUpdate({ strategy: 'restored' }), /kept as closely as possible/)
  assert.match(describePathUpdate({ strategy: 'recovered' }), /restored your place/)
  assert.equal(describePathUpdate({ strategy: 'completed' }), null)
  assert.equal(describePathUpdate({ strategy: 'fresh' }), null)
})

test('a persisted update notice survives reloads until the learner dismisses it', () => {
  const record = { fromVersion: 1, toVersion: 6, strategy: 'preserved', adoptedSteps: 1, at: new Date().toISOString() }
  const notice = pathUpdateNoticeFromRecord(record)
  assert.equal(notice.fromVersion, 1)
  assert.equal(notice.toVersion, 6)
  assert.equal(notice.strategy, 'preserved')
  assert.match(notice.message, /1 new step/)
  assert.match(notice.message, /updated/i)

  // Acknowledged notices, no-op updates and malformed records are all silent.
  assert.equal(pathUpdateNoticeFromRecord({ ...record, acknowledged: true }), null)
  assert.equal(pathUpdateNoticeFromRecord({ fromVersion: 1, toVersion: 2, strategy: 'completed', adoptedSteps: 0 }), null)
  assert.equal(pathUpdateNoticeFromRecord({ fromVersion: 1, toVersion: 2, strategy: 'fresh', adoptedSteps: 0 }), null)
  assert.equal(pathUpdateNoticeFromRecord({ strategy: 'preserved' }), null)
  for (const value of [null, undefined, 'x', 42, [], true]) {
    assert.equal(pathUpdateNoticeFromRecord(value), null)
  }
})
