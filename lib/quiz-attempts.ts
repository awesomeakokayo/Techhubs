/**
 * Durable quiz-attempt lifecycle.
 *
 * Attempts are stored in the existing `UserTrackProgress.data.quizAttempts`
 * JSON map (no schema migration) and every attempt also writes an immutable
 * `LearningEvent`. The guided-path route serialises submissions by locking the
 * enrollment row and uses a client-supplied idempotency key, so a double click,
 * a network retry, or two concurrent requests cannot create two attempts or
 * advance the path twice.
 *
 * Security rules encoded here:
 *   - the server computes the score, pass state, and critical-question state;
 *   - a failed attempt never carries an explanation or the correct option;
 *   - a passed attempt may carry its rationale, but never a reusable key for a
 *     different question set or attempt;
 *   - every attempt is bound to the quiz version and question ids it was graded
 *     against, so old attempts remain auditable and are never rewritten.
 */

import { createHash } from 'crypto'
import type { QuizQuestion } from './guided-path'

export const QUIZ_ATTEMPT_SCHEMA_VERSION = 1
export const QUIZ_ATTEMPT_DATA_KEY = 'quizAttempts'
export const MAX_STORED_ATTEMPTS = 120
/**
 * A failed attempt is formative feedback, not a free answer-key oracle. A new
 * attempt for the same quiz version is delayed briefly, and repeated failures
 * trigger a bounded cooldown. Reusing the same attempt id (validate-then-commit)
 * is never rate-limited.
 */
export const QUIZ_RETRY_COOLDOWN_SECONDS = 15
export const QUIZ_FAILURE_WINDOW_SECONDS = 10 * 60
export const QUIZ_MAX_FAILURES_IN_WINDOW = 3
export const QUIZ_LOCKOUT_SECONDS = 5 * 60

export type QuizAttemptStatus = 'passed' | 'failed'

export interface QuizAttemptAnswer {
  questionId: string
  selectedIndex: number
  correct: boolean
  pointsAwarded: number
}

export interface QuizAttemptFeedback {
  questionId: string
  selectedIndex: number
  correct: boolean
  objective?: string
  /** Released only after a passed attempt. Never present on a failed attempt. */
  explanation?: string
}

export interface QuizAttemptRecord {
  schemaVersion: 1
  attemptId: string
  userId: string
  trackId: string
  stageId: number
  stepIndex: number
  quizVersion: string
  pathVersion: string
  questionIds: string[]
  answers: QuizAttemptAnswer[]
  correctCount: number
  questionCount: number
  score: number
  requiredCorrect: number
  passed: boolean
  criticalMissed: boolean
  status: QuizAttemptStatus
  validateOnly: boolean
  committed: boolean
  submittedAt: string
  committedAt?: string
  feedback: QuizAttemptFeedback[]
  reviewNotes: string[]
  source: 'server'
}

export interface LegacyQuizGrandfather {
  stageId: number
  quizVersion: string
  recordedAt: string
  source: 'legacy_user_progress'
  note: string
}

export interface QuizAttemptState {
  schemaVersion: 1
  attempts: Record<string, QuizAttemptRecord>
  legacyGrandfathers: Record<string, LegacyQuizGrandfather>
}

export class QuizAttemptError extends Error {
  code: string
  status: number
  details?: Record<string, unknown>
  constructor(code: string, message: string, status = 400, details?: Record<string, unknown>) {
    super(message)
    this.name = 'QuizAttemptError'
    this.code = code
    this.status = status
    this.details = details
  }
}

export function emptyQuizAttemptState(): QuizAttemptState {
  return { schemaVersion: QUIZ_ATTEMPT_SCHEMA_VERSION, attempts: {}, legacyGrandfathers: {} }
}

export function readQuizAttemptState(data: unknown): QuizAttemptState {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return emptyQuizAttemptState()
  const value = data as Record<string, unknown>
  const candidate = value[QUIZ_ATTEMPT_DATA_KEY]
  if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) return emptyQuizAttemptState()
  const state = candidate as Record<string, unknown>
  if (state.schemaVersion !== QUIZ_ATTEMPT_SCHEMA_VERSION) {
    // Never silently discard a learner's durable attempts because a newer
    // deployment wrote a schema this build does not understand. Fail closed and
    // require an explicit migration.
    const version = typeof state.schemaVersion === 'number' ? state.schemaVersion : null
    throw new QuizAttemptError(
      'QUIZ_STATE_SCHEMA_UNSUPPORTED',
      `Quiz attempt state schema ${version ?? 'unknown'} cannot be read by this build; an explicit migration is required.`,
      500,
      { storedSchemaVersion: version, supportedSchemaVersion: QUIZ_ATTEMPT_SCHEMA_VERSION },
    )
  }
  const attempts = state.attempts && typeof state.attempts === 'object' && !Array.isArray(state.attempts)
    ? state.attempts as Record<string, QuizAttemptRecord>
    : {}
  const legacyGrandfathers = state.legacyGrandfathers && typeof state.legacyGrandfathers === 'object' && !Array.isArray(state.legacyGrandfathers)
    ? state.legacyGrandfathers as Record<string, LegacyQuizGrandfather>
    : {}
  return { schemaVersion: QUIZ_ATTEMPT_SCHEMA_VERSION, attempts, legacyGrandfathers }
}

export function serialiseQuizAttemptState(state: QuizAttemptState): Record<string, unknown> {
  return { [QUIZ_ATTEMPT_DATA_KEY]: state }
}

export function getQuizAttempt(state: QuizAttemptState, attemptId: string): QuizAttemptRecord | null {
  return state.attempts[attemptId] ?? null
}

export function latestPassForStageVersion(
  state: QuizAttemptState,
  stageId: number,
  quizVersion: string,
): QuizAttemptRecord | null {
  return Object.values(state.attempts)
    .filter((attempt) => attempt.stageId === stageId && attempt.quizVersion === quizVersion && attempt.passed)
    .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))[0] ?? null
}

/**
 * Add an attempt without ever rewriting an existing one. All passing attempts
 * are retained. When the cap is exceeded, the oldest failed attempts are
 * compacted first; a compacted attempt is still represented by its immutable
 * `LearningEvent`, so the audit trail is not erased.
 */
export function appendQuizAttempt(state: QuizAttemptState, attempt: QuizAttemptRecord): QuizAttemptState {
  // Attempt ids are idempotency keys. Once persisted, an attempt is immutable:
  // a replayed request must never replace a score, answer record, or pass.
  if (state.attempts[attempt.attemptId]) return state
  const attempts = { ...state.attempts, [attempt.attemptId]: attempt }
  const entries = Object.values(attempts)
  if (entries.length <= MAX_STORED_ATTEMPTS) return { ...state, attempts }

  const passed = entries.filter((entry) => entry.passed)
  const failed = entries
    .filter((entry) => !entry.passed)
    .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))
  const room = Math.max(0, MAX_STORED_ATTEMPTS - passed.length)
  const kept = [...passed, ...failed.slice(0, room)]
  return { ...state, attempts: Object.fromEntries(kept.map((entry) => [entry.attemptId, entry])) }
}

export function recordLegacyGrandfather(
  state: QuizAttemptState,
  input: { stageId: number; quizVersion: string; now?: Date },
): QuizAttemptState {
  const key = `${input.stageId}:${input.quizVersion}`
  if (state.legacyGrandfathers[key]) return state
  return {
    ...state,
    legacyGrandfathers: {
      ...state.legacyGrandfathers,
      [key]: {
        stageId: input.stageId,
        quizVersion: input.quizVersion,
        recordedAt: (input.now ?? new Date()).toISOString(),
        source: 'legacy_user_progress',
        note: 'A previous path version recorded this knowledge check as complete. The completion is preserved and labelled grandfathered; no score or answer record is fabricated.',
      },
    },
  }
}

export function isLegacyQuizGrandfathered(state: QuizAttemptState, stageId: number, quizVersion: string): boolean {
  return Boolean(state.legacyGrandfathers[`${stageId}:${quizVersion}`])
}

/** True when any legacy completion was recorded for this stage. */
export function hasLegacyGrandfather(state: QuizAttemptState, stageId: number): boolean {
  return Object.values(state.legacyGrandfathers).some((record) => record.stageId === stageId)
}

/**
 * Recover the stage ids of legacy quiz completions from UserProgress records.
 * The old path stored a completed quiz as itemType='stage' with a synthetic
 * resource id; this is evidence of a historical completion, not a score.
 */
export function legacyQuizStageIds(
  records: Array<{ itemType: string; stageId: number | null; resourceId: string | null }>,
): number[] {
  const stageIds = new Set<number>()
  for (const record of records) {
    if (record.itemType !== 'stage' || record.stageId === null || !record.resourceId) continue
    if (record.resourceId === `step-quiz-${record.stageId}`) stageIds.add(record.stageId)
  }
  return Array.from(stageIds).sort((a, b) => a - b)
}

export interface QuizRetryDecision {
  allowed: boolean
  failedCount: number
  retryAfterSeconds: number
  reason: string | null
}

/**
 * Deterministic retry policy over the persisted attempts. It is intentionally
 * conservative: an immediate second attempt after a failure is delayed, and
 * three failures in ten minutes lock the quiz for five minutes. Passing
 * attempts and idempotent reuse of an existing attempt are not penalised.
 */
export function quizRetryDecision(
  state: QuizAttemptState,
  input: { stageId: number; quizVersion: string; now?: Date },
): QuizRetryDecision {
  const nowMs = (input.now ?? new Date()).getTime()
  const failures = Object.values(state.attempts)
    .filter((attempt) => attempt.stageId === input.stageId && attempt.quizVersion === input.quizVersion && !attempt.passed)
    .map((attempt) => ({ attempt, at: Date.parse(attempt.submittedAt) }))
    .filter((entry) => Number.isFinite(entry.at))
    .sort((a, b) => b.at - a.at)

  if (!failures.length) return { allowed: true, failedCount: 0, retryAfterSeconds: 0, reason: null }

  const windowStart = nowMs - QUIZ_FAILURE_WINDOW_SECONDS * 1000
  const recent = failures.filter((entry) => entry.at >= windowStart)
  const latest = failures[0]
  let until = latest.at + QUIZ_RETRY_COOLDOWN_SECONDS * 1000
  let reason = 'Review the stage lesson and practice before trying again.'

  if (recent.length >= QUIZ_MAX_FAILURES_IN_WINDOW) {
    until = Math.max(until, latest.at + QUIZ_LOCKOUT_SECONDS * 1000)
    reason = 'Several recent attempts were unsuccessful. Review the lesson and practice, then try again after the cooldown.'
  }

  if (nowMs >= until) return { allowed: true, failedCount: recent.length, retryAfterSeconds: 0, reason: null }
  return {
    allowed: false,
    failedCount: recent.length,
    retryAfterSeconds: Math.max(1, Math.ceil((until - nowMs) / 1000)),
    reason,
  }
}

export function validAttemptId(value: unknown): value is string {
  return typeof value === 'string' && /^[A-Za-z0-9_-]{8,80}$/.test(value)
}

export function questionIdFor(question: QuizQuestion, index: number, stageId: number): string {
  return question.id?.trim() || `q-${stageId}-${index + 1}`
}

export function computeQuizVersion(questions: QuizQuestion[]): string {
  const material = questions.map((question, index) => ({
    index,
    id: question.id ?? null,
    question: question.question,
    options: question.options,
    correctIndex: question.correctIndex,
    explanation: question.explanation,
    feedbackOnIncorrect: question.feedbackOnIncorrect ?? null,
    points: question.points ?? null,
    critical: Boolean(question.critical),
    objective: question.objective ?? null,
    cognitiveLevel: question.cognitiveLevel ?? null,
  }))
  return `qv1-${createHash('sha256').update(JSON.stringify(material)).digest('hex').slice(0, 20)}`
}

function normalisePoints(questions: QuizQuestion[]): number[] {
  const explicit = questions.map((question) => question.points)
  const allExplicit = explicit.every((points) => typeof points === 'number' && Number.isFinite(points) && points > 0)
  const anyExplicit = explicit.some((points) => points !== undefined)

  if (allExplicit) {
    const total = (explicit as number[]).reduce((sum, points) => sum + points, 0)
    if (total !== 100) {
      throw new QuizAttemptError(
        'QUIZ_POINTS_INVALID',
        `This knowledge check is misconfigured: its points total ${total}, not 100.`,
        500,
      )
    }
    return explicit as number[]
  }
  if (anyExplicit) {
    throw new QuizAttemptError(
      'QUIZ_POINTS_INVALID',
      'This knowledge check is misconfigured: either every question needs points or none do.',
      500,
    )
  }

  const count = questions.length
  if (count === 0) return []
  const base = Math.floor(100 / count)
  const remainder = 100 - base * count
  return questions.map((_, index) => base + (index < remainder ? 1 : 0))
}

interface ParsedAnswer {
  selectedIndex: number
}

function parseAnswers(questions: QuizQuestion[], stageId: number, raw: unknown): ParsedAnswer[] {
  if (!Array.isArray(raw) || raw.length !== questions.length) {
    throw new QuizAttemptError('QUIZ_ANSWERS_REQUIRED', 'Answer every question before continuing.')
  }

  const ids = questions.map((question, index) => questionIdFor(question, index, stageId))
  const byId = new Map<string, number>()
  ids.forEach((id, index) => {
    if (byId.has(id)) throw new QuizAttemptError('QUIZ_DUPLICATE_QUESTION_ID', 'This knowledge check has duplicate question identifiers.', 500)
    byId.set(id, index)
  })

  const objectAnswers = raw.every((answer) => answer && typeof answer === 'object' && !Array.isArray(answer))
  if (!objectAnswers && !raw.every((answer) => typeof answer === 'number')) {
    throw new QuizAttemptError('QUIZ_ANSWERS_INVALID', 'Answers must be question identifiers with a selected option.')
  }

  const parsed: Array<ParsedAnswer | null> = questions.map(() => null)
  if (objectAnswers) {
    for (const answer of raw as Array<{ questionId?: unknown; selectedIndex?: unknown }>) {
      if (typeof answer.questionId !== 'string') {
        throw new QuizAttemptError('QUIZ_ANSWERS_INVALID', 'Each answer needs the question identifier it belongs to.')
      }
      const index = byId.get(answer.questionId)
      if (index === undefined) throw new QuizAttemptError('QUIZ_UNKNOWN_QUESTION', 'An answer referred to a question that is not part of this attempt.')
      if (parsed[index]) throw new QuizAttemptError('QUIZ_DUPLICATE_ANSWER', 'Each question may be answered only once.')
      const selectedIndex = answer.selectedIndex
      if (!Number.isInteger(selectedIndex) || (selectedIndex as number) < 0 || (selectedIndex as number) >= questions[index].options.length) {
        throw new QuizAttemptError('QUIZ_SELECTION_INVALID', 'Select one of the available options for every question.')
      }
      parsed[index] = { selectedIndex: selectedIndex as number }
    }
  } else {
    raw.forEach((selectedIndex, index) => {
      if (!Number.isInteger(selectedIndex) || (selectedIndex as number) < 0 || (selectedIndex as number) >= questions[index].options.length) {
        throw new QuizAttemptError('QUIZ_SELECTION_INVALID', 'Select one of the available options for every question.')
      }
      parsed[index] = { selectedIndex: selectedIndex as number }
    })
  }

  if (parsed.some((answer) => answer === null)) {
    throw new QuizAttemptError('QUIZ_ANSWERS_REQUIRED', 'Answer every question before continuing.')
  }
  return parsed as ParsedAnswer[]
}

export interface BuildQuizAttemptInput {
  attemptId: string
  userId: string
  trackId: string
  stageId: number
  stepIndex: number
  pathVersion: string
  questions: QuizQuestion[]
  answers: unknown
  requiredCorrect: number
  validateOnly: boolean
  now?: Date
}

export function buildQuizAttempt(input: BuildQuizAttemptInput): QuizAttemptRecord {
  if (!validAttemptId(input.attemptId)) {
    throw new QuizAttemptError('QUIZ_ATTEMPT_ID_INVALID', 'A valid attempt identifier is required.')
  }
  if (!input.questions.length) {
    throw new QuizAttemptError('QUIZ_EMPTY', 'This knowledge check has no questions.', 500)
  }

  const parsed = parseAnswers(input.questions, input.stageId, input.answers)
  const points = normalisePoints(input.questions)
  const questionIds = input.questions.map((question, index) => questionIdFor(question, index, input.stageId))

  let correctCount = 0
  let score = 0
  let criticalMissed = false
  const results: QuizAttemptAnswer[] = input.questions.map((question, index) => {
    const selectedIndex = parsed[index].selectedIndex
    const correct = selectedIndex === question.correctIndex
    const pointsAwarded = correct ? points[index] : 0
    if (correct) correctCount += 1
    score += pointsAwarded
    if (question.critical && !correct) criticalMissed = true
    return { questionId: questionIds[index], selectedIndex, correct, pointsAwarded }
  })

  const requiredCorrect = Math.max(0, Math.min(input.requiredCorrect, input.questions.length))
  const passed = correctCount >= requiredCorrect && !criticalMissed
  const questionCount = input.questions.length
  const feedback: QuizAttemptFeedback[] = results.map((answer, index) => ({
    questionId: answer.questionId,
    selectedIndex: answer.selectedIndex,
    correct: answer.correct,
    objective: input.questions[index].objective,
    ...(passed ? { explanation: input.questions[index].explanation } : {}),
  }))

  const submittedAt = (input.now ?? new Date()).toISOString()
  return {
    schemaVersion: QUIZ_ATTEMPT_SCHEMA_VERSION,
    attemptId: input.attemptId,
    userId: input.userId,
    trackId: input.trackId,
    stageId: input.stageId,
    stepIndex: input.stepIndex,
    quizVersion: computeQuizVersion(input.questions),
    pathVersion: input.pathVersion,
    questionIds,
    answers: results,
    correctCount,
    questionCount,
    score,
    requiredCorrect,
    passed,
    criticalMissed,
    status: passed ? 'passed' : 'failed',
    validateOnly: input.validateOnly,
    committed: false,
    submittedAt,
    feedback,
    reviewNotes: passed
      ? []
      : [
          'Review the stage lesson and practice before retrying. Answers and rationales are withheld after a failed attempt so the check remains a measure of learning, not a copy exercise.',
        ],
    source: 'server',
  }
}

/** Public response shape. It never contains `correctIndex` or a pre-submission key. */
export function publicQuizFeedback(attempt: QuizAttemptRecord) {
  return {
    attemptId: attempt.attemptId,
    passed: attempt.passed,
    score: attempt.score,
    requiredCorrect: attempt.requiredCorrect,
    totalQuestions: attempt.questionCount,
    correctCount: attempt.correctCount,
    criticalMissed: attempt.criticalMissed,
    results: attempt.feedback,
    reviewNotes: attempt.reviewNotes,
    quizVersion: attempt.quizVersion,
  }
}
