import { test, expect } from '@playwright/test'
import { signInWithTestCredentials, uniqueTestEmail } from './helpers'

test('public pages use the marketing shell; the app uses the app shell', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('footer')).toHaveCount(1)

  await signInWithTestCredentials(page.request, uniqueTestEmail('shell'))
  await page.goto('/dashboard')
  await expect(page.getByRole('navigation', { name: 'Application navigation' })).toBeVisible()
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.locator('footer')).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible()
})

test('signing out returns the learner to the public site', async ({ page }) => {
  await signInWithTestCredentials(page.request, uniqueTestEmail('signout'))
  await page.goto('/dashboard')
  await page.getByRole('button', { name: 'Sign out' }).click()
  await page.waitForURL((url) => url.pathname === '/')

  await page.goto('/dashboard')
  await page.waitForURL(/\/login/)
  expect(page.url()).toContain('/login')
})

test('authenticated checklist change persists across reload', async ({ page }) => {
  await signInWithTestCredentials(page.request, uniqueTestEmail('checklist'))
  await page.goto('/tracks/frontend-development')

  await expect(page.getByText('Roadmap & project checklist')).toBeVisible()
  await expect(page.getByText('Loading your checklist…')).toHaveCount(0)

  await page.getByRole('button', { name: 'Mark step complete' }).first().click()
  await expect(page.getByRole('button', { name: 'Mark step incomplete' }).first()).toBeVisible()

  await page.reload()
  await expect(page.getByRole('button', { name: 'Mark step incomplete' }).first()).toBeVisible()
})

test('anonymous checklist is preserved and does not require sign-in', async ({ page }) => {
  await page.goto('/tracks/frontend-development')
  await expect(page.getByText('Saved on this device. Sign in to keep it across devices.')).toBeVisible()

  await page.getByRole('button', { name: 'Mark step complete' }).first().click()
  await expect(page.getByRole('button', { name: 'Mark step incomplete' }).first()).toBeVisible()

  await page.reload()
  await expect(page.getByRole('button', { name: 'Mark step incomplete' }).first()).toBeVisible()
})

test('no hydration errors on key routes', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(String(error)))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })

  await signInWithTestCredentials(page.request, uniqueTestEmail('hydrate'))
  for (const path of ['/', '/tracks/frontend-development', '/dashboard', '/account', '/projects']) {
    await page.goto(path)
    await page.waitForLoadState('networkidle')
  }

  const hydration = errors.filter((entry) => /hydrat|did not match|text content does not match/i.test(entry))
  expect(hydration, hydration.join('\n')).toHaveLength(0)
})

test('anonymous quiz result is preserved into the account after sign-in', async ({ page }) => {
  const quiz = {
    completed: true,
    recommendations: ['frontend'],
    level: 'beginner',
    weeklyHours: 5,
    goal: 'Get a job at a tech company',
    updatedAt: new Date().toISOString(),
  }
  await page.addInitScript((value) => {
    localStorage.setItem('tsh-progress', JSON.stringify({ tracks: {}, quizResult: value }))
  }, quiz)

  await page.goto('/')
  await signInWithTestCredentials(page.request, uniqueTestEmail('quiz'))
  await page.goto('/dashboard')

  await expect
    .poll(
      async () => {
        const res = await page.request.get('/api/learner-profile')
        const data = (await res.json()) as { profile?: { recommendedTrackId?: string } }
        return data?.profile?.recommendedTrackId ?? null
      },
      { timeout: 20_000 },
    )
    .toBe('frontend')

  await page.reload()
  await expect(page.getByText('Frontend Development').first()).toBeVisible()
})
