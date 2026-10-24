import { test, expect } from '@playwright/test'

test('the submission help index is public and links to guides', async ({ page }) => {
  await page.goto('/submit-help')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  const firstGuide = page.locator('a[href^="/submit-help/"]').first()
  await expect(firstGuide).toBeVisible()
})

test('a submission guide renders with metadata, canonical URL and heading hierarchy', async ({ page }) => {
  await page.goto('/submit-help/publish-a-public-github-repository')
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/GitHub/i)
  await expect(page.getByRole('heading', { level: 2 }).first()).toBeVisible()

  const canonical = page.locator('link[rel="canonical"]')
  await expect(canonical).toHaveAttribute('href', /\/submit-help\/publish-a-public-github-repository$/)

  const title = await page.title()
  expect(title).toMatch(/GitHub/i)
})

test('submission guides are listed in the sitemap', async ({ request }) => {
  const res = await request.get('/sitemap.xml')
  expect(res.ok()).toBeTruthy()
  const xml = await res.text()
  expect(xml).toContain('/submit-help')
  expect(xml).toContain('/submit-help/publish-a-public-github-repository')
})
