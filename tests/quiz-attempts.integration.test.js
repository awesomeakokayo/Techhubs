'use strict'
/**
 * Integration (disposable PostgreSQL): the quiz-attempt transaction used by the
 * guided-path route must be durable, idempotent, immutable, and must never lose
 * attempts under a concurrent retry. Runs only against
 * TSH_CHECKLIST_IMPORT_TEST_DB.
 */
const test = require('node:test')
const assert = require('node:assert/strict')
const { PrismaClient } = require('@prisma/client')

const { buildGuidedPath } = require('../.test-dist/guided-path.js')
const { readQuizAttemptState, getQuizAttempt } = require('../.test-dist/quiz-attempts.js')
const {
  lockEnrollmentRow,
  prepareQuizAttempt,
  markQuizAttemptCommitted,
  storedTrackData,
  recordLegacyQuizGrandfathers,
} = require('../.test-dist/guided-path-quiz.js')

const testDbUrl = process.env.TSH_CHECKLIST_IMPORT_TEST_DB
const skip = testDbUrl ? false : 'TSH_CHECKLIST_IMPORT_TEST_DB is not set'

const steps = buildGuidedPath('frontend')
const quizStepIndex = steps.findIndex((step) => step.type === 'quiz' && step.stageId === 1)
const quizStep = steps[quizStepIndex]
const questions = quizStep.quizQuestions

function answers(correct) {
  return questions.map((question) => ({
    questionId: question.id,
    selectedIndex: correct ? question.correctIndex : (question.correctIndex + 1) % question.options.length,
  }))
}

function makeClient() {
  return new PrismaClient({ datasources: { db: { url: testDbUrl } } })
}

async function fixture(prisma, tag) {
  const user = await prisma.user.create({ data: { email: `quiz-${tag}-${Date.now()}-${Math.random().toString(36).slice(2)}@example.test` } })
  await prisma.guidedPathEnrollment.create({ data: { userId: user.id, trackId: 'frontend', currentStepIndex: quizStepIndex } })
  return user
}

function input(user, overrides = {}) {
  return {
    userId: user.id,
    trackId: 'frontend',
    stepIndex: quizStepIndex,
    step: quizStep,
    pathVersion: 'test',
    attemptId: 'attempt-integration-1',
    answers: answers(true),
    validateOnly: false,
    requiredCorrect: 4,
    currentStepIndex: quizStepIndex,
    ...overrides,
  }
}

async function readState(prisma, userId) {
  const row = await prisma.userTrackProgress.findUnique({
    where: { userId_trackId: { userId, trackId: 'frontend' } },
    select: { data: true },
  })
  return readQuizAttemptState(storedTrackData(row?.data ?? null))
}

test('integration: a legacy quiz completion is preserved as a grandfather, not a fabricated pass', { skip }, async () => {
  const prisma = makeClient()
  const user = await fixture(prisma, 'legacy')
  try {
    await prisma.userProgress.create({
      data: {
        userId: user.id,
        trackId: 'frontend',
        itemType: 'stage',
        stageId: 1,
        resourceId: 'step-quiz-1',
        status: 'COMPLETED',
      },
    })
    await recordLegacyQuizGrandfathers(prisma, user.id, 'frontend')
    const state = await readState(prisma, user.id)
    assert.ok(state.legacyGrandfathers['1:legacy_unversioned'])
    assert.equal(Object.keys(state.attempts).length, 0)
    assert.doesNotMatch(JSON.stringify(state), /correctIndex/)
  } finally {
    await prisma.user.delete({ where: { id: user.id } }).catch(() => {})
    await prisma.$disconnect()
  }
})

test('integration: current durable attempts are never mislabelled as legacy', { skip }, async () => {
  const prisma = makeClient()
  const user = await fixture(prisma, 'notlegacy')
  try {
    await prisma.$transaction(async (tx) => {
      const currentStepIndex = await lockEnrollmentRow(tx, user.id, 'frontend')
      await prepareQuizAttempt(tx, input(user, { currentStepIndex }))
    })
    await prisma.userProgress.create({
      data: {
        userId: user.id,
        trackId: 'frontend',
        itemType: 'stage',
        stageId: 1,
        resourceId: 'step-quiz-1',
        status: 'COMPLETED',
      },
    })
    await recordLegacyQuizGrandfathers(prisma, user.id, 'frontend')
    const state = await readState(prisma, user.id)
    assert.equal(state.legacyGrandfathers['1:legacy_unversioned'], undefined)
    assert.equal(getQuizAttempt(state, 'attempt-integration-1').passed, true)
  } finally {
    await prisma.user.delete({ where: { id: user.id } }).catch(() => {})
    await prisma.$disconnect()
  }
})

test('integration: a quiz attempt is durable, committed once, and immutable', { skip }, async () => {
  const prisma = makeClient()
  const user = await fixture(prisma, 'durable')
  try {
    const first = await prisma.$transaction(async (tx) => {
      const currentStepIndex = await lockEnrollmentRow(tx, user.id, 'frontend')
      const prepared = await prepareQuizAttempt(tx, input(user, { currentStepIndex }))
      await markQuizAttemptCommitted(tx, user.id, 'frontend', prepared.attempt.attemptId, new Date())
      return prepared.attempt
    })
    assert.equal(first.score, 100)
    assert.equal(first.passed, true)
    assert.equal(first.committed, false, 'the prepared record is marked by the separate commit step')

    const state = await readState(prisma, user.id)
    const stored = getQuizAttempt(state, 'attempt-integration-1')
    assert.equal(stored.committed, true)
    assert.equal(stored.score, 100)
    assert.equal(stored.answers.length, 5)
    assert.doesNotMatch(JSON.stringify(state), /correctIndex/)
    assert.equal(await prisma.learningEvent.count({ where: { userId: user.id, eventName: 'quiz_attempted' } }), 1)

    // Tampering/replay: the same id returns the stored record, not a new score.
    const replay = await prisma.$transaction(async (tx) => {
      const currentStepIndex = await lockEnrollmentRow(tx, user.id, 'frontend')
      return prepareQuizAttempt(tx, input(user, { currentStepIndex, answers: answers(false) }))
    })
    assert.equal(replay.attempt.attemptId, 'attempt-integration-1')
    assert.equal(replay.attempt.score, 100)
    assert.equal(replay.attempt.passed, true)
    assert.equal(await prisma.learningEvent.count({ where: { userId: user.id, eventName: 'quiz_attempted' } }), 1)
  } finally {
    await prisma.user.delete({ where: { id: user.id } }).catch(() => {})
    await prisma.$disconnect()
  }
})

test('integration: concurrent retries with one attempt id create one attempt and one event', { skip }, async () => {
  const prisma = makeClient()
  const user = await fixture(prisma, 'concurrent')
  try {
    const run = () =>
      prisma.$transaction(async (tx) => {
        const currentStepIndex = await lockEnrollmentRow(tx, user.id, 'frontend')
        return prepareQuizAttempt(tx, input(user, { currentStepIndex }))
      })
    const [a, b] = await Promise.all([run(), run()])
    assert.equal(a.attempt.attemptId, 'attempt-integration-1')
    assert.equal(b.attempt.attemptId, 'attempt-integration-1')
    assert.equal(a.attempt.score, b.attempt.score)
    assert.equal(await prisma.learningEvent.count({ where: { userId: user.id, eventName: 'quiz_attempted' } }), 1)
    const state = await readState(prisma, user.id)
    assert.equal(Object.keys(state.attempts).length, 1)
  } finally {
    await prisma.user.delete({ where: { id: user.id } }).catch(() => {})
    await prisma.$disconnect()
  }
})

test('integration: a stale step cannot create an orphan attempt after progress advanced', { skip }, async () => {
  const prisma = makeClient()
  const user = await fixture(prisma, 'stale')
  try {
    await prisma.guidedPathEnrollment.update({
      where: { userId_trackId: { userId: user.id, trackId: 'frontend' } },
      data: { currentStepIndex: quizStepIndex + 1 },
    })
    await assert.rejects(
      prisma.$transaction(async (tx) => {
        const currentStepIndex = await lockEnrollmentRow(tx, user.id, 'frontend')
        return prepareQuizAttempt(tx, input(user, { currentStepIndex, attemptId: 'attempt-stale-1' }))
      }),
      (error) => {
        assert.equal(error.code, 'STEP_ALREADY_ADVANCED')
        assert.equal(error.status, 409)
        return true
      },
    )
    const state = await readState(prisma, user.id)
    assert.equal(Object.keys(state.attempts).length, 0)
    assert.equal(await prisma.learningEvent.count({ where: { userId: user.id, eventName: 'quiz_attempted' } }), 0)
  } finally {
    await prisma.user.delete({ where: { id: user.id } }).catch(() => {})
    await prisma.$disconnect()
  }
})

test('integration: a failed attempt persists and rate-limits a new attempt id', { skip }, async () => {
  const prisma = makeClient()
  const user = await fixture(prisma, 'rate')
  try {
    const failed = await prisma.$transaction(async (tx) => {
      const currentStepIndex = await lockEnrollmentRow(tx, user.id, 'frontend')
      return prepareQuizAttempt(tx, input(user, { currentStepIndex, attemptId: 'attempt-failed-1', answers: answers(false) }))
    })
    assert.equal(failed.attempt.passed, false)
    assert.equal(failed.attempt.feedback.every((entry) => entry.explanation === undefined), true)

    await assert.rejects(
      prisma.$transaction(async (tx) => {
        const currentStepIndex = await lockEnrollmentRow(tx, user.id, 'frontend')
        return prepareQuizAttempt(tx, input(user, { currentStepIndex, attemptId: 'attempt-failed-2', answers: answers(false) }))
      }),
      (error) => {
        assert.equal(error.code, 'QUIZ_RETRY_COOLDOWN')
        assert.equal(error.status, 429)
        assert.ok(error.details.retryAfterSeconds > 0)
        return true
      },
    )

    const state = await readState(prisma, user.id)
    assert.equal(Object.keys(state.attempts).length, 1)
    assert.equal(await prisma.learningEvent.count({ where: { userId: user.id, eventName: 'quiz_attempted' } }), 1)
  } finally {
    await prisma.user.delete({ where: { id: user.id } }).catch(() => {})
    await prisma.$disconnect()
  }
})
