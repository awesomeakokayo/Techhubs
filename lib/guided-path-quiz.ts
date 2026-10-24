import { Prisma, PrismaClient } from '@prisma/client'
import type { GuidedStep } from './guided-path'
import {
  appendQuizAttempt,
  buildQuizAttempt,
  computeQuizVersion,
  getQuizAttempt,
  legacyQuizStageIds,
  quizRetryDecision,
  readQuizAttemptState,
  recordLegacyGrandfather,
  serialiseQuizAttemptState,
  QuizAttemptError,
  type QuizAttemptRecord,
} from './quiz-attempts'

export async function lockEnrollmentRow(tx: Prisma.TransactionClient, userId: string, trackId: string): Promise<number> {
  // PostgreSQL row lock. Every quiz submission for this enrollment takes this
  // lock before reading the attempt state, so two concurrent requests with the
  // same idempotency key cannot both create an attempt. The returned index is
  // the authoritative position after any concurrent progress committed while
  // this request was waiting for the lock.
  const rows = await tx.$queryRaw<Array<{ currentStepIndex: number }>>`
    SELECT "currentStepIndex" FROM "GuidedPathEnrollment"
    WHERE "userId" = ${userId} AND "trackId" = ${trackId}
    FOR UPDATE
  `
  return rows[0]?.currentStepIndex ?? -1
}

export function storedTrackData(value: Prisma.JsonValue | null): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value) ? (value as Record<string, unknown>) : {}
}

export async function writeQuizAttemptState(
  tx: Prisma.TransactionClient,
  userId: string,
  trackId: string,
  storedData: Record<string, unknown>,
  state: ReturnType<typeof readQuizAttemptState>,
) {
  const nextData = { ...storedData, ...serialiseQuizAttemptState(state) }
  await tx.userTrackProgress.upsert({
    where: { userId_trackId: { userId, trackId } },
    create: { userId, trackId, data: nextData as Prisma.InputJsonValue },
    update: { data: nextData as Prisma.InputJsonValue },
  })
}

export async function prepareQuizAttempt(
  tx: Prisma.TransactionClient,
  input: {
    userId: string
    trackId: string
    stepIndex: number
    step: GuidedStep
    pathVersion: string
    attemptId: string
    answers: unknown
    validateOnly: boolean
    requiredCorrect: number
    /** Authoritative step index read under the enrollment row lock. */
    currentStepIndex: number
  },
): Promise<{ attempt: QuizAttemptRecord; storedData: Record<string, unknown> }> {
  const trackProgress = await tx.userTrackProgress.findUnique({
    where: { userId_trackId: { userId: input.userId, trackId: input.trackId } },
    select: { data: true },
  })
  const storedData = storedTrackData(trackProgress?.data ?? null)
  const state = readQuizAttemptState(storedData)
  const existing = getQuizAttempt(state, input.attemptId)
  const quizVersion = computeQuizVersion(input.step.quizQuestions ?? [])
  const stageId = input.step.stageId ?? 0

  if (existing) {
    if (
      existing.trackId !== input.trackId ||
      existing.stageId !== input.step.stageId ||
      existing.stepIndex !== input.stepIndex
    ) {
      throw new QuizAttemptError('QUIZ_ATTEMPT_STEP_MISMATCH', 'That attempt belongs to a different learning step.', 409)
    }
    if (existing.quizVersion !== quizVersion) {
      throw new QuizAttemptError(
        'QUIZ_VERSION_CHANGED',
        'This knowledge check changed after your attempt started. Reload the stage and try the current version.',
        409,
      )
    }
    return { attempt: existing, storedData }
  }

  // A concurrent request may already have completed this step. Never create an
  // orphan attempt for a step the learner can no longer submit.
  if (input.currentStepIndex !== input.stepIndex) {
    throw new QuizAttemptError(
      'STEP_ALREADY_ADVANCED',
      'This step is already complete. Reload the guided path to continue from your current step.',
      409,
    )
  }

  const retry = quizRetryDecision(state, { stageId, quizVersion })
  if (!retry.allowed) {
    throw new QuizAttemptError(
      'QUIZ_RETRY_COOLDOWN',
      retry.reason ?? 'Review the stage before trying again.',
      429,
      { retryAfterSeconds: retry.retryAfterSeconds, failedCount: retry.failedCount },
    )
  }

  const attempt = buildQuizAttempt({
    attemptId: input.attemptId,
    userId: input.userId,
    trackId: input.trackId,
    stageId,
    stepIndex: input.stepIndex,
    pathVersion: input.pathVersion,
    questions: input.step.quizQuestions ?? [],
    answers: input.answers,
    requiredCorrect: input.requiredCorrect,
    validateOnly: input.validateOnly,
  })

  const nextState = appendQuizAttempt(state, attempt)
  await writeQuizAttemptState(tx, input.userId, input.trackId, storedData, nextState)
  await tx.learningEvent.create({
    data: {
      userId: input.userId,
      eventName: 'quiz_attempted',
      trackId: input.trackId,
      stepId: String(input.stepIndex),
      metadata: {
        attemptId: attempt.attemptId,
        stageId: attempt.stageId,
        quizVersion: attempt.quizVersion,
        pathVersion: attempt.pathVersion,
        questionIds: attempt.questionIds,
        score: attempt.score,
        correctCount: attempt.correctCount,
        requiredCorrect: attempt.requiredCorrect,
        passed: attempt.passed,
        criticalMissed: attempt.criticalMissed,
        validateOnly: attempt.validateOnly,
        answers: attempt.answers.map((answer) => ({
          questionId: answer.questionId,
          selectedIndex: answer.selectedIndex,
          correct: answer.correct,
        })),
      } as Prisma.InputJsonValue,
    },
  })
  return { attempt, storedData }
}

export async function markQuizAttemptCommitted(
  tx: Prisma.TransactionClient,
  userId: string,
  trackId: string,
  attemptId: string,
  committedAt: Date,
) {
  const trackProgress = await tx.userTrackProgress.findUnique({
    where: { userId_trackId: { userId, trackId } },
    select: { data: true },
  })
  const storedData = storedTrackData(trackProgress?.data ?? null)
  const state = readQuizAttemptState(storedData)
  const attempt = getQuizAttempt(state, attemptId)
  if (!attempt || attempt.committed) return
  const nextState = {
    ...state,
    attempts: {
      ...state.attempts,
      [attemptId]: { ...attempt, committed: true, committedAt: committedAt.toISOString() },
    },
  }
  await writeQuizAttemptState(tx, userId, trackId, storedData, nextState)
}

export async function recordLegacyQuizGrandfathers(prisma: PrismaClient, userId: string, trackId: string): Promise<void> {
  await prisma.$transaction(async (tx) => {
    // Serialise with quiz submissions. Grandfather recording must never write a
    // stale JSON snapshot over a newly persisted attempt.
    await lockEnrollmentRow(tx, userId, trackId)

    const completed = await tx.userProgress.findMany({
      where: { userId, trackId, status: 'COMPLETED' },
      select: { itemType: true, stageId: true, resourceId: true },
    })
    const stageIds = legacyQuizStageIds(completed)
    if (!stageIds.length) return

    const trackProgress = await tx.userTrackProgress.findUnique({
      where: { userId_trackId: { userId, trackId } },
      select: { data: true },
    })
    const storedData = storedTrackData(trackProgress?.data ?? null)
    let state = readQuizAttemptState(storedData)
    let changed = false
    for (const stageId of stageIds) {
      // A stage with a durable attempt (including a current pass) is not a
      // legacy-only completion. Never mislabel new work as grandfathered.
      if (Object.values(state.attempts).some((attempt) => attempt.stageId === stageId)) continue
      const next = recordLegacyGrandfather(state, { stageId, quizVersion: 'legacy_unversioned' })
      if (next !== state) changed = true
      state = next
    }
    if (!changed) return

    await tx.userTrackProgress.upsert({
      where: { userId_trackId: { userId, trackId } },
      create: { userId, trackId, data: { ...storedData, ...serialiseQuizAttemptState(state) } as Prisma.InputJsonValue },
      update: { data: { ...storedData, ...serialiseQuizAttemptState(state) } as Prisma.InputJsonValue },
    })
  })
}
