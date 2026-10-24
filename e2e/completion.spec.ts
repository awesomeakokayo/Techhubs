import { test, expect } from '@playwright/test'
import { signInWithTestCredentials, uniqueTestEmail } from './helpers'

const TRACK = 'frontend'
const PATH = `**/api/guided-path/${TRACK}`

// Warm the API route so the first assertion does not race Next dev compilation
// (a dev-server artifact only; there is no compilation in production).
test.beforeEach(async ({ request }) => {
  await request.get(`/api/guided-path/${TRACK}`).catch(() => {})
})

test('a failed save keeps the learner on the step and offers a retry', async ({ page }) => {
  await signInWithTestCredentials(page.request, uniqueTestEmail('savefail'))

  await page.route(PATH, async (route) => {
    if (route.request().method() === 'POST') {
      await route.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ error: 'Simulated save failure' }) })
    } else {
      await route.continue()
    }
  })

  await page.goto(`/guided-path/${TRACK}`)
  await expect(page.getByText(/Step 1 of/)).toBeVisible()

  await page.getByRole('button', { name: 'Continue' }).first().click()

  // Failure: clear message, no false success, no advancement, retry available.
  await expect(page.getByText(/Simulated save failure/)).toBeVisible()
  await expect(page.getByText(/Step 1 of/)).toBeVisible()
  await expect(page.getByText(/Progress saved/)).toHaveCount(0)
  const retry = page.getByRole('button', { name: 'Retry' }).first()
  await expect(retry).toBeVisible()

  // Retry after the failure succeeds and advances.
  await page.unroute(PATH)
  await retry.click()
  await expect(page.getByText(/Step 2 of/)).toBeVisible()
  await expect(page.getByText(/Progress saved/)).toBeVisible()
})

test('a lost response reconciles to the server-saved progress without advancing twice', async ({ page }) => {
  await signInWithTestCredentials(page.request, uniqueTestEmail('lostresp'))

  // The POST reaches the server (so it persists) but the browser sees a network
  // error. The client must reconcile against the authoritative state.
  await page.route(PATH, async (route) => {
    if (route.request().method() === 'POST') {
      await route.fetch()
      await route.abort()
    } else {
      await route.continue()
    }
  })

  await page.goto(`/guided-path/${TRACK}`)
  await page.getByRole('button', { name: 'Continue' }).first().click()

  await expect(page.getByText(/Step 2 of/)).toBeVisible()
  await expect(page.getByText(/Progress saved/)).toBeVisible()
})

test('rapid repeated clicks advance the step only once', async ({ page }) => {
  await signInWithTestCredentials(page.request, uniqueTestEmail('dblclick'))
  await page.goto(`/guided-path/${TRACK}`)
  await expect(page.getByText(/Step 1 of/)).toBeVisible()

  const button = page.getByRole('button', { name: 'Continue' }).first()
  await button.click()
  await page.getByRole('button', { name: /Continue|Mark complete/ }).first().click({ force: true }).catch(() => {})

  await expect(page.getByText(/Step 2 of/)).toBeVisible()
  await expect(page.getByText(/Step 3 of/)).toHaveCount(0)
})

test('progress survives a refresh and returning to the path restores server state', async ({ page }) => {
  await signInWithTestCredentials(page.request, uniqueTestEmail('persist'))
  await page.goto(`/guided-path/${TRACK}`)
  await page.getByRole('button', { name: 'Continue' }).first().click()
  await expect(page.getByText(/Step 2 of/)).toBeVisible()

  await page.reload()
  await expect(page.getByText(/Step 2 of/)).toBeVisible()

  await page.goto('/learning')
  await page.goto(`/guided-path/${TRACK}`)
  await expect(page.getByText(/Step 2 of/)).toBeVisible()
})
