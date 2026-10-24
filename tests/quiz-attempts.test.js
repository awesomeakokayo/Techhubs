'use strict'
/**
 * Quiz confirmation and durable-attempt contract.
 *
 * These tests exercise the pure lifecycle used by the guided-path route: the
 * server owns the score, a failed attempt never releases the key, every attempt
 * is version-bound and immutable, and retries are accounted for.
 */
const test = require('node:test')
const assert = require('node:assert/strict')

const {
  buildQuizAttempt,
  publicQuizFeedback,
  computeQuizVersion,
  appendQuizAttempt,
  emptyQuizAttemptState,
  readQuizAttemptState,
  serialiseQuizAttemptState,
  getQuizAttempt,
  latestPassForStageVersion,
  recordLegacyGrandfather,
  hasLegacyGrandfather,
  legacyQuizStageIds,
  quizRetryDecision,
  validAttemptId,
  QuizAttemptError,
  QUIZ_RETRY_COOLDOWN_SECONDS,
  QUIZ_ATTEMPT_SCHEMA_VERSION,
} = require('../.test-dist/quiz-attempts.js')

function question(overrides = {}) {
  return {
    id: 'q1',
    question: 'Which layout is two-dimensional?',
    options: ['Flexbox', 'CSS Grid', 'Floats', 'Tables'],
    correctIndex: 1,
    explanation: 'CSS Grid controls rows and columns.',
    points: 20,
    critical: false,
    objective: 'Choose an appropriate layout system.',
    ...overrides,
  }
}

function fiveQuestions() {
  return [1, 2, 3, 4, 5].map((n) => question({ id: `q${n}`, question: `Question ${n}?` }))
}

function baseInput(overrides = {}) {
  return {
    attemptId: 'attempt-12345678',
    userId: 'user-1',
    trackId: 'frontend',
    stageId: 1,
    stepIndex: 2,
    pathVersion: '2',
    questions: fiveQuestions(),
    answers: [1, 1, 1, 1, 1],
    requiredCorrect: 4,
    validateOnly: false,
    ...overrides,
  }
}

test('grades a 100-point quiz with the server-owned score', () => {
  const attempt = buildQuizAttempt(baseInput())
  assert.equal(attempt.score, 100)
  assert.equal(attempt.correctCount, 5)
  assert.equal(attempt.passed, true)
  assert.equal(attempt.status, 'passed')
  assert.equal(attempt.feedback.length, 5)
  assert.ok(attempt.feedback.every((item) => item.explanation))
  assert.equal(attempt.committed, false)
  assert.equal(attempt.answers[0].pointsAwarded, 20)
})

test('a missed critical question fails even when the required count is met', () => {
  const questions = fiveQuestions()
  questions[2] = question({ id: 'q3', question: 'Critical?', critical: true, correctIndex: 2 })
  const attempt = buildQuizAttempt(baseInput({ questions, answers: [1, 1, 1, 1, 1] }))
  assert.equal(attempt.correctCount, 4)
  assert.equal(attempt.score, 80)
  assert.equal(attempt.criticalMissed, true)
  assert.equal(attempt.passed, false)
})

test('a failed attempt withholds explanations and the answer key', () => {
  const attempt = buildQuizAttempt(baseInput({ answers: [0, 0, 0, 0, 0], requiredCorrect: 3 }))
  assert.equal(attempt.passed, false)
  assert.equal(attempt.score, 0)
  assert.ok(attempt.feedback.every((item) => item.explanation === undefined))
  assert.ok(attempt.reviewNotes.length > 0)
  const publicShape = publicQuizFeedback(attempt)
  const serialised = JSON.stringify(publicShape)
  assert.doesNotMatch(serialised, /correctIndex/)
  assert.doesNotMatch(serialised, /correctAnswer/)
  assert.doesNotMatch(serialised, /CSS Grid controls rows/)
  assert.equal(publicShape.attemptId, 'attempt-12345678')
  assert.equal(publicShape.totalQuestions, 5)
})

test('points must total exactly 100 when supplied', () => {
  const questions = fiveQuestions()
  questions[0] = { ...questions[0], points: 19 }
  assert.throws(() => buildQuizAttempt(baseInput({ questions })), (error) => {
    assert.ok(error instanceof QuizAttemptError)
    assert.equal(error.code, 'QUIZ_POINTS_INVALID')
    assert.equal(error.status, 500)
    return true
  })
})

test('partial point configuration is rejected instead of silently normalised', () => {
  const questions = fiveQuestions()
  questions[0] = { ...questions[0], points: undefined }
  assert.throws(() => buildQuizAttempt(baseInput({ questions })), /either every question needs points/i)
})

test('legacy questions without points are normalised to a deterministic 100', () => {
  const questions = fiveQuestions().map(({ points, ...rest }) => rest)
  const attempt = buildQuizAttempt(baseInput({ questions }))
  assert.equal(attempt.score, 100)
  assert.deepEqual(attempt.answers.map((entry) => entry.pointsAwarded), [20, 20, 20, 20, 20])
})

test('rejects duplicate ids, unknown ids, duplicate answers and invalid selections', () => {
  assert.throws(() => buildQuizAttempt(baseInput({ questions: fiveQuestions().map((q) => ({ ...q, id: 'same-id' })) })), /duplicate question/i)
  const objectAnswers = (entries) => entries.map(([questionId, selectedIndex]) => ({ questionId, selectedIndex }))
  assert.throws(
    () => buildQuizAttempt(baseInput({ answers: objectAnswers([['not-a-question', 0], ['q2', 0], ['q3', 0], ['q4', 0], ['q5', 0]]) })),
    /not part of this attempt/i,
  )
  assert.throws(
    () => buildQuizAttempt(baseInput({ answers: objectAnswers([['q1', 0], ['q1', 1], ['q3', 0], ['q4', 0], ['q5', 0]]) })),
    /only once/i,
  )
  assert.throws(() => buildQuizAttempt(baseInput({ answers: [9, 1, 1, 1, 1] })), /available options/i)
  assert.throws(() => buildQuizAttempt(baseInput({ answers: [1, 1, 1, 1] })), /answer every question/i)
})

test('attempt ids are bounded and opaque', () => {
  assert.equal(validAttemptId('attempt-12345678'), true)
  assert.equal(validAttemptId('short'), false)
  assert.equal(validAttemptId('has spaces in it'), false)
  assert.equal(validAttemptId(123), false)
})

test('quiz version is deterministic and changes with grading material', () => {
  const questions = fiveQuestions()
  assert.equal(computeQuizVersion(questions), computeQuizVersion(fiveQuestions()))
  const changedPoints = fiveQuestions()
  changedPoints[0] = { ...changedPoints[0], points: 21, correctIndex: 0 }
  assert.notEqual(computeQuizVersion(questions), computeQuizVersion(changedPoints))
})

test('attempt state is versioned, readable and idempotent by attempt id', () => {
  const attempt = buildQuizAttempt(baseInput({ attemptId: 'attempt-first-1' }))
  const state = appendQuizAttempt(emptyQuizAttemptState(), attempt)
  const read = readQuizAttemptState(serialiseQuizAttemptState(state))
  assert.equal(getQuizAttempt(read, 'attempt-first-1').attemptId, 'attempt-first-1')

  const replacement = { ...attempt, score: 0, passed: false, status: 'failed' }
  const after = appendQuizAttempt(read, replacement)
  assert.equal(getQuizAttempt(after, 'attempt-first-1').score, 100, 'existing attempt is never rewritten')
  assert.equal(getQuizAttempt(after, 'attempt-first-1').passed, true)

  assert.equal(latestPassForStageVersion(read, 1, attempt.quizVersion)?.attemptId, attempt.attemptId)
})

test('legacy completions are recorded without fabricated scores', () => {
  const state = recordLegacyGrandfather(emptyQuizAttemptState(), { stageId: 3, quizVersion: 'legacy_unversioned' })
  assert.equal(hasLegacyGrandfather(state, 3), true)
  assert.equal(hasLegacyGrandfather(state, 4), false)
  assert.equal(Object.keys(state.attempts).length, 0)
  const again = recordLegacyGrandfather(state, { stageId: 3, quizVersion: 'legacy_unversioned' })
  assert.equal(again, state)

  assert.deepEqual(
    legacyQuizStageIds([
      { itemType: 'stage', stageId: 2, resourceId: 'step-quiz-2' },
      { itemType: 'stage', stageId: 3, resourceId: 'step-quiz-3' },
      { itemType: 'stage', stageId: 4, resourceId: 'some-resource' },
      { itemType: 'project', stageId: 5, resourceId: 'step-quiz-5' },
    ]),
    [2, 3],
  )
})

test('an unsupported persisted schema fails closed rather than discarding attempts', () => {
  const state = emptyQuizAttemptState()
  const serialised = serialiseQuizAttemptState(state)
  serialised.quizAttempts = { ...state, schemaVersion: QUIZ_ATTEMPT_SCHEMA_VERSION + 1 }
  assert.throws(() => readQuizAttemptState(serialised), (error) => {
    assert.equal(error.code, 'QUIZ_STATE_SCHEMA_UNSUPPORTED')
    assert.equal(error.status, 500)
    return true
  })
  assert.deepEqual(readQuizAttemptState({}), emptyQuizAttemptState())
})

test('retry policy delays an immediate retry and locks out repeated failures', () => {
  const now = new Date('2026-01-01T00:00:00.000Z')
  const questions = fiveQuestions()
  const version = computeQuizVersion(questions)
  const failed = buildQuizAttempt(baseInput({
    attemptId: 'attempt-failed-1',
    questions,
    answers: [0, 0, 0, 0, 0],
    now: new Date(now.getTime() - 1000),
  }))
  const oneFailure = appendQuizAttempt(emptyQuizAttemptState(), failed)
  const immediate = quizRetryDecision(oneFailure, { stageId: 1, quizVersion: version, now })
  assert.equal(immediate.allowed, false)
  assert.ok(immediate.retryAfterSeconds > 0)
  assert.ok(immediate.retryAfterSeconds <= QUIZ_RETRY_COOLDOWN_SECONDS)

  const later = quizRetryDecision(oneFailure, {
    stageId: 1,
    quizVersion: version,
    now: new Date(now.getTime() + QUIZ_RETRY_COOLDOWN_SECONDS * 1000 + 1000),
  })
  assert.equal(later.allowed, true)

  let state = emptyQuizAttemptState()
  for (const [index, secondsAgo] of [60, 40, 20].entries()) {
    const attempt = buildQuizAttempt(baseInput({
      attemptId: `attempt-failed-${index + 2}`,
      questions,
      answers: [0, 0, 0, 0, 0],
      now: new Date(now.getTime() - secondsAgo * 1000),
    }))
    state = appendQuizAttempt(state, attempt)
  }
  const locked = quizRetryDecision(state, { stageId: 1, quizVersion: version, now })
  assert.equal(locked.allowed, false)
  assert.ok(locked.retryAfterSeconds > QUIZ_RETRY_COOLDOWN_SECONDS)

  const passed = buildQuizAttempt(baseInput({ attemptId: 'attempt-passed-1', questions, now }))
  const passedOnly = appendQuizAttempt(emptyQuizAttemptState(), passed)
  assert.equal(quizRetryDecision(passedOnly, { stageId: 1, quizVersion: version, now }).allowed, true)
})
