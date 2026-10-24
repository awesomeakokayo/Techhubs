import type { APIRequestContext } from '@playwright/test'

/**
 * Signs in using the fail-closed test credentials provider (available only when
 * TSH_TEST_AUTH is enabled outside production). Restricted to @example.test.
 */
export async function signInWithTestCredentials(request: APIRequestContext, email: string): Promise<void> {
  const csrfRes = await request.get('/api/auth/csrf')
  if (!csrfRes.ok()) throw new Error(`csrf request failed: ${csrfRes.status()}`)
  const { csrfToken } = (await csrfRes.json()) as { csrfToken: string }

  const res = await request.post('/api/auth/callback/test-credentials', {
    form: { csrfToken, email, callbackUrl: '/' },
    maxRedirects: 0,
  })
  if (res.status() >= 400) throw new Error(`test sign-in failed: ${res.status()}`)
}

export function uniqueTestEmail(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 100000)}@example.test`
}
