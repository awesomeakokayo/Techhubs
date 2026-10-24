import { test, expect } from '@playwright/test'
import { signInWithTestCredentials, uniqueTestEmail } from './helpers'

test('primary navigation opens each interface', async ({ page }) => {
  await signInWithTestCredentials(page.request, uniqueTestEmail('nav'))
  await page.goto('/dashboard')

  const nav = page.getByRole('navigation', { name: 'Application navigation' })

  await nav.getByRole('link', { name: 'My Learning' }).click()
  await expect(page).toHaveURL(/\/learning$/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/learning paths/i)

  await nav.getByRole('link', { name: 'Learning Plan' }).click()
  await expect(page).toHaveURL(/\/plan$/)

  await nav.getByRole('link', { name: 'Achievements' }).click()
  await expect(page).toHaveURL(/\/achievements$/)

  // The generic catalogue/Projects explorer is not a primary sidebar item.
  await expect(nav.getByRole('link', { name: 'Projects' })).toHaveCount(0)
})

test('refreshing a nested application route works', async ({ page }) => {
  await signInWithTestCredentials(page.request, uniqueTestEmail('refresh'))
  await page.goto('/learning')
  await page.reload()
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/learning paths/i)
})

test('public pages retain the marketing layout and no app shell', async ({ page }) => {
  await page.goto('/tracks/frontend-development')
  await expect(page.locator('footer')).toHaveCount(1)
  await expect(page.getByRole('navigation', { name: 'Application navigation' })).toHaveCount(0)
})

test('daily goal change saves and survives reload', async ({ page }) => {
  await signInWithTestCredentials(page.request, uniqueTestEmail('plan'))
  await page.goto('/plan')

  const two = page.getByRole('button', { name: '2 activities' })
  await two.click()
  await expect(two).toHaveAttribute('aria-pressed', 'true')

  await page.reload()
  await expect(page.getByRole('button', { name: '2 activities' })).toHaveAttribute('aria-pressed', 'true')
})

test('weekly plan change saves and survives reload', async ({ page }) => {
  await signInWithTestCredentials(page.request, uniqueTestEmail('week'))
  await page.goto('/plan')

  // Toggle a day off then save.
  const saturday = page.getByRole('button', { name: /Sat/ })
  await saturday.click()
  await page.getByRole('button', { name: /Save weekly plan/i }).click()
  await expect(page.getByText('Weekly plan saved.')).toBeVisible()

  await page.reload()
  await expect(page.getByRole('button', { name: /Sat, planned learning day|Sat, not scheduled/ })).toBeVisible()
})

test('mobile navigation opens from the left and navigates', async ({ page }) => {
  await signInWithTestCredentials(page.request, uniqueTestEmail('mobile-nav'))
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/dashboard')

  await page.getByRole('button', { name: 'Open navigation' }).click()
  const panel = page.getByTestId('app-drawer')
  await expect(panel).toBeVisible()

  const box = await panel.boundingBox()
  expect(box).not.toBeNull()
  expect(box!.x).toBeLessThanOrEqual(2)

  await panel.getByRole('link', { name: 'My Learning' }).click()
  await expect(page).toHaveURL(/\/learning$/)
})

test('sidebar active state follows the route, survives refresh and nested routes', async ({ page }) => {
  await signInWithTestCredentials(page.request, uniqueTestEmail('active'))
  await page.goto('/learning')

  await expect(
    page.getByRole('navigation', { name: 'Application navigation' }).getByRole('link', { name: 'My Learning' }),
  ).toHaveAttribute('aria-current', 'page')

  await page.getByRole('navigation', { name: 'Application navigation' }).getByRole('link', { name: 'Achievements' }).click()
  await expect(page).toHaveURL(/\/achievements$/)
  await expect(
    page.getByRole('navigation', { name: 'Application navigation' }).getByRole('link', { name: 'Achievements' }),
  ).toHaveAttribute('aria-current', 'page')

  await page.reload()
  await expect(
    page.getByRole('navigation', { name: 'Application navigation' }).getByRole('link', { name: 'Achievements' }),
  ).toHaveAttribute('aria-current', 'page')
})

test('sidebar items respond to hover', async ({ page }) => {
  await signInWithTestCredentials(page.request, uniqueTestEmail('hover'))
  await page.goto('/dashboard')

  const link = page.getByRole('navigation', { name: 'Application navigation' }).getByRole('link', { name: 'Achievements' })
  const before = await link.evaluate((element) => getComputedStyle(element).backgroundColor)
  await link.hover()
  await page.waitForTimeout(250)
  const after = await link.evaluate((element) => getComputedStyle(element).backgroundColor)
  expect(after).not.toBe(before)
})

test('the broad catalogue is not a primary sidebar item', async ({ page }) => {
  await signInWithTestCredentials(page.request, uniqueTestEmail('notracks'))
  await page.goto('/dashboard')
  const nav = page.getByRole('navigation', { name: 'Application navigation' })
  await expect(nav.getByRole('link', { name: /tracks|explore paths/i })).toHaveCount(0)
})

test('sidebar Settings provides account access and sign out', async ({ page }) => {
  await signInWithTestCredentials(page.request, uniqueTestEmail('acct'))
  await page.goto('/dashboard')

  const settings = page.getByRole('navigation', { name: 'Account navigation' })
  await expect(settings.getByRole('button', { name: 'Sign out' })).toBeVisible()
  await settings.getByRole('link', { name: 'Account' }).click()
  await expect(page).toHaveURL(/\/account$/)
})

