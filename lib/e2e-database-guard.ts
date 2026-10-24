/**
 * Fail-closed Playwright database guard.
 *
 * E2E writes users and learning progress. It must use an explicitly configured,
 * disposable PostgreSQL database, never fall back to DATABASE_URL.
 */
function databaseIdentity(connectionString: string, label: string): string {
  let parsed: URL
  try {
    parsed = new URL(connectionString.trim())
  } catch {
    throw new Error(`${label} must be a valid PostgreSQL connection URL.`)
  }

  const protocol = parsed.protocol.toLowerCase()
  if (protocol !== 'postgres:' && protocol !== 'postgresql:') {
    throw new Error(`${label} must use PostgreSQL.`)
  }

  const database = decodeURIComponent(parsed.pathname.slice(1))
  if (!parsed.hostname || !database) {
    throw new Error(`${label} must include a database host and database name.`)
  }

  // Ignore credentials and query parameters: different credentials do not make
  // a shared production database safe for test writes.
  return `${parsed.hostname.toLowerCase()}:${parsed.port || '5432'}/${database}`
}

export function resolveE2EDatabaseUrl(
  e2eDatabaseUrl: string | undefined | null,
  sharedDatabaseUrls: readonly (string | undefined | null)[] = [],
): string {
  if (!e2eDatabaseUrl?.trim()) {
    throw new Error(
      'E2E_DATABASE_URL must be explicitly set to a disposable PostgreSQL database. The test runner will not fall back to DATABASE_URL.',
    )
  }

  const candidate = e2eDatabaseUrl.trim()
  const candidateIdentity = databaseIdentity(candidate, 'E2E_DATABASE_URL')

  for (const configured of sharedDatabaseUrls) {
    if (!configured?.trim()) continue
    const sharedIdentity = databaseIdentity(configured, 'Configured DATABASE_URL')
    if (candidateIdentity === sharedIdentity) {
      throw new Error(
        'E2E_DATABASE_URL resolves to the same PostgreSQL database as a configured shared DATABASE_URL; refusing to run tests.',
      )
    }
  }

  return candidate
}
