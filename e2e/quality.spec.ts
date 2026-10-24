import { test, expect } from '@playwright/test'
import { signInWithTestCredentials, uniqueTestEmail } from './helpers'

test('stage introduction invites the learner to continue, then resumes correctly', async ({ page }) => {
  await signInWithTestCredentials(page.request, uniqueTestEmail('guided'))
  await page.goto('/guided-path/frontend')

  // The new stage overview is framed as future learning with a Continue action.
  await expect(page.getByText(/Step 1 of/)).toBeVisible()
  await expect(page.getByText('In this stage')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Continue' }).first()).toBeVisible()
  await expect(page.getByRole('button', { name: 'Mark complete' })).toHaveCount(0)

  // Continue opens the first required learning activity (a resource).
  await page.getByRole('button', { name: 'Continue' }).first().click()
  await expect(page.getByText(/Step 2 of/)).toBeVisible()
  await expect(page.getByRole('button', { name: 'Mark complete' }).first()).toBeVisible()

  // Progress persists and resumes on the current activity.
  await page.reload()
  await expect(page.getByText(/Step 2 of/)).toBeVisible()
})

test('continuing from a stage overview does not complete the course or bypass requirements', async ({ page }) => {
  await signInWithTestCredentials(page.request, uniqueTestEmail('orientation'))

  await page.goto('/guided-path/frontend')
  await expect(page.getByText('In this stage')).toBeVisible()
  await page.getByRole('button', { name: 'Continue' }).first().click()
  await expect(page.getByText(/Step 2 of/)).toBeVisible()

  // No certificate is granted (course completion is not created) merely by continuing.
  const certificate = await page.request.get('/api/certificate/frontend')
  expect(certificate.status()).toBe(403)

  // The remaining required activities still exist ahead of the learner.
  const state = await page.request.get('/api/guided-path/frontend')
  expect(state.ok()).toBeTruthy()
  const data = (await state.json()) as { currentStepIndex: number; steps: Array<{ type: string }> }
  expect(data.currentStepIndex).toBe(1)
  const remaining = data.steps.slice(data.currentStepIndex)
  expect(remaining.some((step) => step.type === 'resource')).toBe(true)
  expect(remaining.some((step) => step.type === 'quiz')).toBe(true)
  expect(remaining.some((step) => step.type === 'project')).toBe(true)
})

test('one account cannot see another account checklist', async ({ browser }) => {
  const contextA = await browser.newContext()
  const contextB = await browser.newContext()
  const pageA = await contextA.newPage()
  const pageB = await contextB.newPage()

  try {
    await signInWithTestCredentials(pageA.request, uniqueTestEmail('iso-a'))
    await pageA.goto('/tracks/frontend-development')
    await expect(pageA.getByText('Loading your checklist…')).toHaveCount(0)
    await pageA.getByRole('button', { name: 'Mark step complete' }).first().click()
    await expect(pageA.getByRole('button', { name: 'Mark step incomplete' }).first()).toBeVisible()

    await signInWithTestCredentials(pageB.request, uniqueTestEmail('iso-b'))
    await pageB.goto('/tracks/frontend-development')
    await expect(pageB.getByText('Loading your checklist…')).toHaveCount(0)
    await expect(pageB.getByRole('button', { name: 'Mark step complete' }).first()).toBeVisible()
    await expect(pageB.getByRole('button', { name: 'Mark step incomplete' })).toHaveCount(0)
  } finally {
    await contextA.close()
    await contextB.close()
  }
})

test('certificate is gated by guided completion, not checklist items', async ({ page }) => {
  await signInWithTestCredentials(page.request, uniqueTestEmail('cert'))

  const checklist = await page.request.post('/api/checklist-progress', {
    data: { trackId: 'frontend', kind: 'STAGE', itemKey: '1', completed: true },
  })
  expect(checklist.ok()).toBeTruthy()

  const certificate = await page.request.get('/api/certificate/frontend')
  expect(certificate.status()).toBe(403)
})

test('dashboard is usable on a mobile viewport without horizontal overflow', async ({ page }) => {
  await signInWithTestCredentials(page.request, uniqueTestEmail('mobile'))
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/dashboard')

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  )
  expect(overflow).toBeLessThanOrEqual(2)
})

test('public track page is usable on a mobile viewport without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/tracks/frontend-development')
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  )
  expect(overflow).toBeLessThanOrEqual(2)
})
