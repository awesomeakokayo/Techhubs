import { defineConfig, devices } from '@playwright/test'
import { existsSync, readFileSync } from 'node:fs'
import { resolve as resolvePath } from 'node:path'
import { resolveE2EDatabaseUrl } from './lib/e2e-database-guard'

const PORT = Number(process.env.E2E_PORT || 3100)
const baseURL = `http://localhost:${PORT}`

function readEnvValue(fileName: string, key: string): string | undefined {
  const filePath = resolvePath(process.cwd(), fileName)
  if (!existsSync(filePath)) return undefined

  for (const line of readFileSync(filePath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const match = trimmed.match(new RegExp('^' + key + '\\s*=\\s*(.*)
export default defineConfig({
  testDir: './e2e',
  // Next dev compiles routes on first use on Windows; 60s occasionally cut off
  // a legitimate assertion before the route was ready. This is a harness
  // latency allowance, not a relaxation of any assertion.
  timeout: 120_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [['list']],
  use: { baseURL, trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `npm run dev -- --port ${PORT}`,
    url: baseURL,
    reuseExistingServer: false,
    timeout: 180_000,
    env: {
      TSH_TEST_AUTH: 'true',
      AUTH_URL: baseURL,
      NEXTAUTH_URL: baseURL,
      AUTH_SECRET: process.env.AUTH_SECRET ?? 'e2e-test-secret-value-000000000000',
      DATABASE_URL: e2eDatabaseUrl,
    },
  },
})
))
    if (!match) continue

    let value = match[1].trim()
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    return value
  }
  return undefined
}

const e2eDatabaseUrl = resolveE2EDatabaseUrl(process.env.E2E_DATABASE_URL, [
  process.env.DATABASE_URL,
  readEnvValue('.env.local', 'DATABASE_URL'),
  readEnvValue('.env', 'DATABASE_URL'),
])

export default defineConfig({
  testDir: './e2e',
  // Next dev compiles routes on first use on Windows; 60s occasionally cut off
  // a legitimate assertion before the route was ready. This is a harness
  // latency allowance, not a relaxation of any assertion.
  timeout: 120_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [['list']],
  use: { baseURL, trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `npm run dev -- --port ${PORT}`,
    url: baseURL,
    reuseExistingServer: false,
    timeout: 180_000,
    env: {
      TSH_TEST_AUTH: 'true',
      AUTH_URL: baseURL,
      NEXTAUTH_URL: baseURL,
      AUTH_SECRET: process.env.AUTH_SECRET ?? 'e2e-test-secret-value-000000000000',
      DATABASE_URL: process.env.E2E_DATABASE_URL ?? process.env.DATABASE_URL ?? '',
    },
  },
})
