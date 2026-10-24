import { test, expect } from '@playwright/test'
import { PrismaClient } from '@prisma/client'
import { buildGuidedPath } from '../lib/guided-path'
import { questionIdFor } from '../lib/quiz-attempts'
import { signInWithTestCredentials, uniqueTestEmail } from './helpers'

/**
 * Returning-learner continuity, through the real HTTP + browser path.
 *
 * A learner who began under an earlier path version must keep their position and
 * completed work when the path is updated, must see an explanation of the change
 * rather than a silently different path, and must never be reset to step 1.
 *
 * The fixtures write an *older* path version straight into the progress record
 * (the only way to simulate history — the version field is server-owned and the
 * client cannot set it), then exercise the app as the returning learner would.
 */

const TRACK = 'crypto'
const dbUrl = process.env.E2E_DATABASE_URL ?? process.env.DATABASE_URL ?? ''

function db(): PrismaClient {
  return new PrismaClient({ datasources: { db: { url: dbUrl } } })
}

interface Step {
  type: string
  quizQuestions?: Array<{ options: string[] }>
}

let attemptCounter = 0

function newAttemptId(prefix: string): string {
  attemptCounter += 1
  return `${prefix}-${Date.now()}-${attemptCounter}`
}

/** Correct answers come from the server-side curriculum, never from the API. */
function correctAnswers(stepIndex: number): Array<{ questionId: string; selectedIndex: number }> {
  const step = buildGuidedPath(TRACK)[stepIndex]
  return (step.quizQuestions ?? []).map((question, index) => ({
    questionId: questionIdFor(question, index, step.stageId),
    selectedIndex: question.correctIndex,
  }))
}

/** Advance the learner through the real step API until a quiz has been passed. */
async function advancePastFirstQuiz(page: import('@playwright/test').Page): Promise<number> {
  const state = await (await page.request.get(`/api/guided-path/${TRACK}`)).json()
  const steps: Step[] = state.steps
  let current: number = state.currentStepIndex
  let sawQuiz = false
  let guard = 0

  while (current < steps.length && !sawQuiz && guard < 10) {
    guard += 1
    const step = steps[current]
    if (!step || step.type === 'project') break
    if (step.type === 'quiz') {
      const res = await page.request.post(`/api/guided-path/${TRACK}`, {
        data: {
          stepIndex: current,
          attemptId: newAttemptId('continuity'),
          answers: correctAnswers(current),
        },
      })
      expect(res.ok()).toBeTruthy()
      sawQuiz = true
    } else {
      const res = await page.request.post(`/api/guided-path/${TRACK}`, { data: { stepIndex: current } })
      expect(res.ok()).toBeTruthy()
    }
    current += 1
  }

  expect(sawQuiz, 'the fixture needs at least one completed knowledge check').toBe(true)
  return current
}

/** Rewrite the stored path version to an older value, as if the learner predates it. */
async function markStoredVersion(email: string, version: number): Promise<void> {
  const prisma = db()
  try {
    const user = await prisma.user.findUniqueOrThrow({ where: { email } })
    const existing = await prisma.userTrackProgress.findUnique({
      where: { userId_trackId: { userId: user.id, trackId: TRACK } },
    })
    const data = (existing?.data as Record<string, unknown>) ?? {}
    await prisma.userTrackProgress.upsert({
      where: { userId_trackId: { userId: user.id, trackId: TRACK } },
      create: { userId: user.id, trackId: TRACK, data: { ...data, guidedPathVersion: version } },
      update: { data: { ...data, guidedPathVersion: version } },
    })
  } finally {
    await prisma.$disconnect()
  }
}

test('a returning learner keeps their position and sees the change explained', async ({ page }) => {
  const email = uniqueTestEmail('returning')
  await signInWithTestCredentials(page.request, email)

  const positionAfterQuiz = await advancePastFirstQuiz(page)
  expect(positionAfterQuiz).toBeGreaterThan(1)

  // Simulate the learner having started under an older path version.
  await markStoredVersion(email, 1)

  // The learner returns and opens the course.
  await page.goto(`/guided-path/${TRACK}`)

  // The change is explained, not presented silently.
  const notice = page.getByText('Course updated')
  await expect(notice).toBeVisible()

  // Their position is preserved — never reset to the first step.
  await expect(page.getByText(new RegExp(`Step ${positionAfterQuiz + 1} of`))).toBeVisible()
  await expect(page.getByText(/Step 1 of/)).toHaveCount(0)

  // The server agrees, and their completed work still counts.
  const after = await (await page.request.get(`/api/guided-path/${TRACK}`)).json()
  expect(after.currentStepIndex).toBe(positionAfterQuiz)

  // Dismissing it is remembered across a reload.
  await page.getByRole('button', { name: 'Dismiss course update message' }).click()
  await expect(notice).toHaveCount(0)
  await page.reload()
  await expect(page.getByText('Course updated')).toHaveCount(0)
  await expect(page.getByText(new RegExp(`Step ${positionAfterQuiz + 1} of`))).toBeVisible()
})

test('an update notice is reported until it is dismissed', async ({ page }) => {
  const email = uniqueTestEmail('firstrequest')
  await signInWithTestCredentials(page.request, email)

  const positionAfterQuiz = await advancePastFirstQuiz(page)
  await markStoredVersion(email, 1)

  // Survives repeated requests (a reload or duplicate fetch cannot lose it).
  const first = await (await page.request.get(`/api/guided-path/${TRACK}`)).json()
  expect(first.currentStepIndex).toBe(positionAfterQuiz)
  expect(first.pathUpdate).toBeTruthy()
  expect(first.pathUpdate.message).toMatch(/updated/i)

  const second = await (await page.request.get(`/api/guided-path/${TRACK}`)).json()
  expect(second.currentStepIndex).toBe(positionAfterQuiz)
  expect(second.pathUpdate).toBeTruthy()

  // Dismissing it clears it for good.
  const ack = await page.request.post(`/api/guided-path/${TRACK}`, { data: { acknowledgePathUpdate: true } })
  expect(ack.ok()).toBeTruthy()
  const third = await (await page.request.get(`/api/guided-path/${TRACK}`)).json()
  expect(third.currentStepIndex).toBe(positionAfterQuiz)
  expect(third.pathUpdate).toBeNull()
})

test('a completed course stays complete for a returning learner', async ({ page }) => {
  const email = uniqueTestEmail('completed')
  await signInWithTestCredentials(page.request, email)
  // Establish the enrollment/learner row through the normal first load.
  await page.request.get(`/api/guided-path/${TRACK}`)

  const prisma = db()
  try {
    const user = await prisma.user.findUniqueOrThrow({ where: { email } })
    await prisma.userTrackProgress.upsert({
      where: { userId_trackId: { userId: user.id, trackId: TRACK } },
      create: { userId: user.id, trackId: TRACK, data: { guidedPathVersion: 1 } },
      update: { data: { guidedPathVersion: 1 } },
    })
    // A historical completion (e.g. earned before the path was updated).
    await prisma.courseCompletion.upsert({
      where: { userId_trackId: { userId: user.id, trackId: TRACK } },
      create: { userId: user.id, trackId: TRACK },
      update: {},
    })
  } finally {
    await prisma.$disconnect()
  }

  await page.goto(`/guided-path/${TRACK}`)
  await expect(page.getByText('Course complete!')).toBeVisible()

  // The earned certificate is still downloadable.
  const certificate = await page.request.get(`/api/certificate/${TRACK}`)
  expect(certificate.status()).toBe(200)
})

test('a brand-new learner receives the latest path with no update notice', async ({ page }) => {
  const email = uniqueTestEmail('newlearner')
  await signInWithTestCredentials(page.request, email)

  const state = await (await page.request.get(`/api/guided-path/${TRACK}`)).json()
  expect(state.currentStepIndex).toBe(0)
  expect(state.pathUpdate).toBeNull()

  await page.goto(`/guided-path/${TRACK}`)
  await expect(page.getByText(/Step 1 of/)).toBeVisible()
  await expect(page.getByText('Course updated')).toHaveCount(0)
})
