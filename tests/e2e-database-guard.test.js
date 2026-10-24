'use strict'
const test = require('node:test')
const assert = require('node:assert/strict')
const { resolveE2EDatabaseUrl } = require('../.test-dist/e2e-database-guard.js')

const disposable = 'postgresql://e2e_user:e2e_pass@localhost:5432/techskillhub_e2e'

test('requires E2E_DATABASE_URL explicitly instead of falling back to DATABASE_URL', () => {
  assert.throws(
    () => resolveE2EDatabaseUrl(undefined, ['postgresql://app:secret@db.example.com:5432/app']),
    /E2E_DATABASE_URL must be explicitly set/,
  )
})

test('rejects non-PostgreSQL test URLs', () => {
  assert.throws(
    () => resolveE2EDatabaseUrl('https://example.com', []),
    /must use PostgreSQL/,
  )
})

test('rejects a test URL with the same database target even when credentials differ', () => {
  assert.throws(
    () => resolveE2EDatabaseUrl(
      'postgresql://other_user:other_pass@db.example.com:5432/app?sslmode=require',
      ['postgresql://app:secret@DB.EXAMPLE.COM:5432/app'],
    ),
    /same PostgreSQL database/,
  )
})

test('rejects the same host and database even when connection ports differ', () => {
  assert.throws(
    () => resolveE2EDatabaseUrl(
      'postgresql://test:secret@db.example.com:6543/app',
      ['postgresql://prod:secret@db.example.com:5432/app'],
    ),
    /same PostgreSQL database/,
  )
})

test('normalizes the common managed-postgres pooler host alias', () => {
  assert.throws(
    () => resolveE2EDatabaseUrl(
      'postgresql://test:secret@ep-example-pooler.region.aws.neon.tech:5432/app',
      ['postgresql://prod:secret@ep-example.region.aws.neon.tech:5432/app'],
    ),
    /same PostgreSQL database/,
  )
})

test('allows an explicitly configured separate disposable database', () => {
  assert.equal(
    resolveE2EDatabaseUrl(disposable, ['postgresql://app:secret@db.example.com:5432/app']),
    disposable,
  )
})

test('rejects invalid shared database configuration rather than making an unsafe comparison', () => {
  assert.throws(
    () => resolveE2EDatabaseUrl(disposable, ['not-a-database-url']),
    /Configured DATABASE_URL must be a valid PostgreSQL connection URL/,
  )
})
