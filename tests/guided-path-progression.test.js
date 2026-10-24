'use strict'
/**
 * Progression-contract tests.
 *
 * These assert that consequential validation happens on the server and that the
 * client cannot advance past a required assessment through optimistic state.
 * They complement the runtime integration and browser tests.
 */
const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '..')
const route = fs.readFileSync(path.join(root, 'app', 'api', 'guided-path', '[trackId]', 'route.ts'), 'utf8')
const quizFlow = fs.readFileSync(path.join(root, 'lib', 'guided-path-quiz.ts'), 'utf8')
const client = fs.readFileSync(path.join(root, 'app', '(app)', 'guided-path', '[trackId]', 'GuidedPathClient.tsx'), 'utf8')
const { expectedPathVersion, AI_GUIDED_PATH_VERSION, CONTENT_STEP_PATH_VERSION } = require('../.test-dist/guided-path.js')
const { resolveCompatiblePathIndex } = require('../.test-dist/path-compat.js')

test('the server validates quiz answers against a durable attempt, never a client score', () => {
  assert.match(route, /prepareQuizAttempt\(/)
  assert.match(quizFlow, /buildQuizAttempt\(/)
  assert.doesNotMatch(quizFlow, /answer === question\.correctIndex/)
  assert.match(route, /requiredCorrectFor\(/)
  assert.match(route, /status: 422/)
})

test('quiz submissions are serialized and committed exactly once', () => {
  assert.match(route, /lockEnrollmentRow\(tx/)
  assert.match(route, /markQuizAttemptCommitted\(/)
  assert.match(route, /publicQuizFeedback\(/)
  assert.doesNotMatch(route, /correctIndex/)
})

test('the server enforces sequential progression (no skipping ahead)', () => {
  assert.match(route, /stepIndex !== enrollment\.currentStepIndex/)
  assert.match(route, /Complete the currently unlocked step before continuing/)
})

test('the server compare-and-swaps the step index to stop duplicate advances', () => {
  assert.match(route, /currentStepIndex: stepIndex,/)
  assert.match(route, /claimed\.count !== 1/)
})

test('project steps cannot advance without a server-verified pass', () => {
  assert.match(route, /completedStep\.type === 'project'/)
  assert.match(route, /getSubmission\(/)
  assert.match(route, /stored\.status !== 'passed'/)
  assert.doesNotMatch(route, /validateProjectEvidence/)
})

test('project assessment persistence lives in the verification route, not guided completion', () => {
  const verifyRoute = fs.readFileSync(path.join(root, 'app', 'api', 'project-verification', '[trackId]', 'route.ts'), 'utf8')
  assert.match(verifyRoute, /saveSubmission\(prisma/)
  assert.doesNotMatch(route, /status: 'submitted'/)
})

test('guided-path versioning re-keys enrollments when the path changes', () => {
  assert.match(route, /migrateEnrollmentIfNeeded/)
  assert.match(route, /ensureEnrollment/)
  const enrollmentLib = fs.readFileSync(path.join(root, 'lib', 'path-enrollment.ts'), 'utf8')
  assert.match(enrollmentLib, /guidedPathVersion/)
  // The remap is evidence-based (stable keys + completed activity), never a reset.
  assert.match(enrollmentLib, /resolveCompatiblePathIndex/)
  assert.match(enrollmentLib, /userProgressStepKey|completedStepKeys/)
})

test('a path update is explained to the returning learner, not presented silently', () => {
  // The route surfaces the persisted remap notice (which survives reloads) and
  // the client renders a dismissible message.
  assert.match(route, /pathUpdate/)
  assert.match(route, /migration\.pathUpdate/)
  assert.match(route, /acknowledgePathUpdate/)
  const enrollmentLib = fs.readFileSync(path.join(root, 'lib', 'path-enrollment.ts'), 'utf8')
  assert.match(enrollmentLib, /pathUpdateNoticeFromRecord/)
  assert.match(client, /pathUpdate/)
  assert.match(client, /Course updated/)
  assert.match(client, /acknowledgePathUpdate: true/)
})

test('the server only records course completion at the final step', () => {
  assert.match(route, /if \(stepIndex === steps\.length - 1\)/)
  assert.match(route, /courseCompletion\.upsert/)
})

test('the GET endpoint reports portfolio readiness, not a blended percentage', () => {
  assert.match(route, /derivePortfolioReadiness\(/)
  assert.match(route, /readiness/)
})

test('the client does not advance until the server confirms success', () => {
  assert.match(client, /if \(!response\.ok\)/)
  // The failure branch sets an error and returns before applying progress.
  assert.match(client, /setSaveState\('error'\)\s*\n\s*return false/)
  // The authoritative state is applied only after the guard that requires an index.
  assert.ok(client.indexOf("applyConfirmedProgress(stepIndex, data)") > client.indexOf("if (!response.ok)"))
  assert.match(client, /if \(!data \|\| typeof data\.currentStepIndex !== 'number'\)/)
})

test('the client relies on the server for grading and reuses the durable attempt id', () => {
  assert.match(client, /attemptId/)
  assert.match(client, /validateOnly: true/)
  assert.match(client, /requiredCorrect: Number\(data\.requiredCorrect\)/)
  assert.doesNotMatch(client, /correctIndex/)
})

test('quiz answers are stripped before a step is sent to the client', () => {
  assert.match(route, /toPublicStep/)
  const guided = fs.readFileSync(path.join(root, 'lib', 'guided-path.ts'), 'utf8')
  assert.match(guided, /export function toPublicStep/)
  assert.match(guided, /question: question\.question,/)
  assert.match(guided, /options: question\.options,/)
})

test('the client gates project completion behind a server pass', () => {
  assert.match(client, /submissionState\?\.status === 'passed'/)
})

test('the interface labels the project assessment as automated, not human review', () => {
  assert.match(client, /automated assessment/)
  assert.match(client, /not human or expert review/)
})

test('path versions only re-key the tracks whose shape changed', () => {
  assert.equal(expectedPathVersion('ai-foundations', false), AI_GUIDED_PATH_VERSION)
  assert.equal(expectedPathVersion('frontend', false), 2)
  assert.equal(expectedPathVersion('crypto', true), CONTENT_STEP_PATH_VERSION)
  assert.equal(expectedPathVersion('fullstack', true), CONTENT_STEP_PATH_VERSION)
})

test('completed enrollments stay completed while incomplete enrollments keep their position', () => {
  const keys = ['c:1', 'r:1:a', 'p:1', 'q:1', 'c:2', 'r:2:b', 'p:2', 'q:2']

  // Changed + completed: the learner is kept at the end of the new path.
  const completed = resolveCompatiblePathIndex({
    isCompleted: true, totalSteps: keys.length, storedStepIndex: 2, completedKeys: [], stepKeys: keys,
  })
  assert.equal(completed.strategy, 'completed')
  assert.equal(completed.index, keys.length)

  // Changed + incomplete: the learner resumes from their completed work,
  // never restarted at the first step.
  const incomplete = resolveCompatiblePathIndex({
    isCompleted: false, totalSteps: keys.length, storedStepIndex: 4, completedKeys: ['r:1:a', 'p:1', 'q:1'], stepKeys: keys,
  })
  assert.equal(incomplete.index, 4)
  assert.notEqual(incomplete.index, 0)
})

test('the route applies per-track version overrides and delegates migration to the helper', () => {
  assert.match(route, /EXTENDED_TRACK_IDS/)
  assert.match(route, /expectedPathVersion\(trackId, EXTENDED_TRACK_IDS\.has\(trackId\)\)/)
  const enrollmentLib = fs.readFileSync(path.join(root, 'lib', 'path-enrollment.ts'), 'utf8')
  assert.match(enrollmentLib, /resolveCompatiblePathIndex\(/)
  // The obsolete restart policy is gone from both modules.
  const guided = fs.readFileSync(path.join(root, 'lib', 'guided-path.ts'), 'utf8')
  assert.doesNotMatch(guided, /resolvePathMigration/)
  assert.doesNotMatch(enrollmentLib, /restart incomplete paths at the first step/i)
})

test('stage overview offers a start/continue action, not a completion label', () => {
  // The concept (stage introduction) step must present "Continue", not "Mark complete".
  assert.match(client, /step\.type === 'concept'\s*\?\s*'Continue'/)
  // The introduction frames learning as future work.
  assert.match(client, /In this stage/)
  assert.match(client, /learn and practise/)
  // The completion label remains for actual activities (resources) only.
  assert.match(client, /'Mark complete'/)
})

test('the route treats the stage introduction as orientation, not a completed activity', () => {
  assert.match(route, /const isOrientation = completedStep\.type === 'concept'/)
  // The completion record write is guarded so orientation steps create nothing.
  assert.match(route, /if \(!isOrientation\) \{/)
  assert.match(route, /const isNewActivity = !existing \|\| existing\.status !== 'COMPLETED'/)
  // Orientation advances the path but is logged as a start, not a completion.
  assert.match(route, /eventName: isOrientation \? 'learning_step_started' : 'learning_step_completed'/)
})

test('orientation handling keeps assessment and completion gating in the route', () => {
  // Required assessments are still validated server-side.
  assert.match(route, /prepareQuizAttempt\(/)
  // Project steps still require a server-verified pass.
  assert.match(route, /stored\.status !== 'passed'/)
  // Course completion is still recorded only at the final step.
  assert.match(route, /if \(stepIndex === steps\.length - 1\)/)
  assert.match(route, /courseCompletion\.upsert/)
})
