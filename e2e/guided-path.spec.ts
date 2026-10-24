import { test, expect } from '@playwright/test'
import { buildGuidedPath } from '../lib/guided-path'
import { questionIdFor } from '../lib/quiz-attempts'
import { signInWithTestCredentials, uniqueTestEmail } from './helpers'

const TRACK = 'frontend'
let attemptCounter = 0

function newAttemptId(prefix = 'e2e'): string {
  attemptCounter += 1
  return `${prefix}-${Date.now()}-${attemptCounter}`
}

function curriculumStep(trackId: string, stepIndex: number) {
  return buildGuidedPath(trackId)[stepIndex]
}

function answersFor(trackId: string, stepIndex: number, correct: boolean) {
  const step = curriculumStep(trackId, stepIndex)
  const questions = step.quizQuestions ?? []
  return questions.map((question, index) => ({
    questionId: questionIdFor(question, index, step.stageId),
    selectedIndex: correct ? question.correctIndex : (question.correctIndex + 1) % question.options.length,
  }))
}

function post(request: import('@playwright/test').APIRequestContext, trackId: string, data: Record<string, unknown>) {
  return request.post(`/api/guided-path/${trackId}`, { data })
}

test('guided path renders for a signed-in learner', async ({ page }) => {
  await signInWithTestCredentials(page.request, uniqueTestEmail('pathui'))
  await page.goto(`/guided-path/${TRACK}`)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.getByText(/Step 1 of/)).toBeVisible()
})

test('progression is server-validated: checks are graded, answers hidden, projects gate on verification', async ({ page }) => {
  await signInWithTestCredentials(page.request, uniqueTestEmail('journey'))

  const initial = await page.request.get(`/api/guided-path/${TRACK}`)
  expect(initial.ok()).toBeTruthy()
  const state = await initial.json()
  const steps: Array<{ type: string; quizQuestions?: Array<{ question: string; options: string[]; correctIndex?: number; explanation?: string }>; submissionContract?: { requiredArtifacts: unknown[] } }> = state.steps
  expect(steps.length).toBeGreaterThan(0)

  // A quiz's answers must never be sent to the client.
  const quizStep = steps.find((step) => step.type === 'quiz')
  expect(quizStep).toBeTruthy()
  for (const question of quizStep!.quizQuestions ?? []) {
    expect(question.correctIndex).toBeUndefined()
    expect(question.explanation).toBeUndefined()
    expect(Array.isArray(question.options)).toBeTruthy()
  }

  let current: number = state.currentStepIndex
  let sawQuiz = false
  let sawProject = false
  let guard = 0

  while (current < steps.length && guard < 120) {
    guard += 1
    const step = steps[current]

    if (step.type === 'quiz') {
      const skip = await post(page.request, TRACK, { stepIndex: current + 3, attemptId: newAttemptId('skip') })
      expect([400, 409]).toContain(skip.status())

      const attemptId = newAttemptId('pass')
      const passed = await post(page.request, TRACK, {
        stepIndex: current,
        attemptId,
        answers: answersFor(TRACK, current, true),
      })
      expect(passed.ok()).toBeTruthy()
      const passedData = await passed.json()
      expect(passedData.quiz.score).toBe(100)
      expect(passedData.quiz.passed).toBe(true)
      expect(passedData.quiz.results.every((result: { correctIndex?: number }) => result.correctIndex === undefined)).toBe(true)
      sawQuiz = true
      current += 1
      continue
    }

    if (step.type === 'project') {
      // A project step cannot be advanced without a server-verified pass.
      const blocked = await post(page.request, TRACK, { stepIndex: current })
      expect(blocked.status()).toBe(422)
      expect(String((await blocked.json()).error)).toMatch(/verification/i)

      // The step exposes a per-project submission contract.
      expect(step.submissionContract?.requiredArtifacts.length ?? 0).toBeGreaterThan(0)

      // A wrong-provider artifact is rejected deterministically, without an AI call.
      const verify = await page.request.post(`/api/project-verification/${TRACK}`, {
        data: {
          stepIndex: current,
          acknowledged: true,
          explanation: 'I built this project myself and this is a sufficiently long explanation of the work.',
          artifacts: [{ kind: 'github_repo', url: 'https://mail.google.com/mail/u/0/' }],
        },
      })
      const verifyData = await verify.json()
      expect(['invalid', 'incomplete']).toContain(verifyData.status)
      sawProject = true
      break
    }

    const res = await post(page.request, TRACK, { stepIndex: current })
    expect(res.ok()).toBeTruthy()
    current += 1
  }

  expect(sawQuiz).toBe(true)
  expect(sawProject).toBe(true)

  // No certificate merely from submitting an invalid artifact.
  const certificate = await page.request.get(`/api/certificate/${TRACK}`)
  expect(certificate.status()).toBe(403)
})

test('a project step shows required deliverables and links to the submission help center', async ({ page }) => {
  await signInWithTestCredentials(page.request, uniqueTestEmail('projectform'))
  const state = await (await page.request.get(`/api/guided-path/${TRACK}`)).json()
  const steps: Array<{ type: string }> = state.steps
  let current: number = state.currentStepIndex
  let guard = 0
  while (current < steps.length && steps[current].type !== 'project' && guard < 120) {
    const step = steps[current]
    if (step.type === 'quiz') {
      const res = await post(page.request, TRACK, {
        stepIndex: current,
        attemptId: newAttemptId('project'),
        answers: answersFor(TRACK, current, true),
      })
      expect(res.ok()).toBeTruthy()
    } else {
      const res = await post(page.request, TRACK, { stepIndex: current })
      expect(res.ok()).toBeTruthy()
    }
    current += 1
    guard += 1
  }

  await page.goto(`/guided-path/${TRACK}`)
  await expect(page.getByText('What you must submit')).toBeVisible()
  const helpLink = page.locator('a[href^="/submit-help/"]').first()
  await expect(helpLink).toBeVisible()
  await expect(page.getByRole('button', { name: /Submit for assessment/i })).toBeVisible()
})

test('an extended track (crypto) exposes graded checks and protects its answers', async ({ page }) => {
  await signInWithTestCredentials(page.request, uniqueTestEmail('crypto'))

  const initial = await page.request.get('/api/guided-path/crypto')
  expect(initial.ok()).toBeTruthy()
  const state = await initial.json()
  const steps: Array<{ type: string; stageId?: number; quizQuestions?: Array<{ options: string[]; correctIndex?: number; explanation?: string }> }> = state.steps

  const quizzes = steps.filter((step) => step.type === 'quiz')
  expect(quizzes.length).toBeGreaterThanOrEqual(8)
  for (const quiz of quizzes) {
    for (const question of quiz.quizQuestions ?? []) {
      expect(question.correctIndex).toBeUndefined()
      expect(question.explanation).toBeUndefined()
      expect(question.options.length).toBeGreaterThan(1)
    }
  }
  expect(steps[steps.length - 1].type).toBe('project')

  // Walk to the first quiz and confirm server-side grading without a key leak.
  let current: number = state.currentStepIndex
  while (current < steps.length && steps[current].type !== 'quiz') {
    const step = steps[current]
    if (step.type === 'project') break
    const res = await post(page.request, 'crypto', { stepIndex: current })
    expect(res.ok()).toBeTruthy()
    current += 1
  }

  const quiz = steps[current]
  const wrong = answersFor('crypto', current, false)
  const check = await post(page.request, 'crypto', {
    stepIndex: current,
    attemptId: newAttemptId('crypto-wrong'),
    answers: wrong,
    validateOnly: true,
  })
  // Validate-only is a formative check: it returns structured feedback with a
  // 200 even when the attempt fails, because the UI renders the review panel.
  expect(check.ok()).toBeTruthy()
  const data = await check.json()
  expect(data.passed).toBe(false)
  expect(data.results.length).toBe((quiz.quizQuestions ?? []).length)
  expect(typeof data.score).toBe('number')
  // Neither the key nor the explanations are released after a failed attempt.
  expect(data.results.every((result: { correctIndex?: number; explanation?: string }) => result.correctIndex === undefined && result.explanation === undefined)).toBe(true)
})
