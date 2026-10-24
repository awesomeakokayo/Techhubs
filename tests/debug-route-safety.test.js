'use strict'

const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const source = fs.readFileSync(
  path.join(__dirname, '..', 'app', 'api', 'debug', 'route.ts'),
  'utf8',
)

test('debug endpoint remains disabled in production', () => {
  assert.match(source, /process\.env\.NODE_ENV\s*===\s*['"]production['"]/)
  assert.match(source, /new NextResponse\(null,\s*\{\s*status:\s*404\s*\}\)/)
})

test('debug endpoint never returns session identifiers or cookie material', () => {
  assert.doesNotMatch(source, /sessionCookieValue|sessionId\s*:/)
  assert.doesNotMatch(source, /allCookies\.map|cookie\.value|sessionCookie\.value/)
  assert.match(source, /hasSessionCookie/)
})
