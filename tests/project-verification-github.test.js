'use strict'
/**
 * GitHub adapter tests using an injected fetch so they are deterministic and do
 * not depend on the live GitHub API.
 */
const test = require('node:test')
const assert = require('node:assert/strict')

const { inspectGithubRepo } = require('../.test-dist/project-verification/github.js')

function jsonResponse(status, body) {
  return { ok: status >= 200 && status < 300, status, json: async () => body, text: async () => JSON.stringify(body), headers: { get: () => 'application/json' } }
}
function textResponse(status, text) {
  return { ok: status >= 200 && status < 300, status, json: async () => null, text: async () => text, headers: { get: () => 'text/plain' } }
}

function makeFetch(config = {}) {
  return async (url, options = {}) => {
    const u = String(url)
    if (u.endsWith('/repos/learner/project')) {
      if (config.repoStatus) return jsonResponse(config.repoStatus, null)
      return jsonResponse(200, { full_name: 'learner/project', private: false, default_branch: 'main', size: config.size ?? 120, pushed_at: '2026-01-01T00:00:00Z', description: 'A project' })
    }
    if (u.includes('/commits/')) return jsonResponse(200, { sha: 'abc123' })
    if (u.includes('/git/trees/')) {
      return jsonResponse(200, { tree: config.tree ?? [
        { path: 'README.md', type: 'blob' },
        { path: 'src/index.js', type: 'blob' },
        { path: 'package.json', type: 'blob' },
        { path: 'node_modules/dep/index.js', type: 'blob' },
      ] })
    }
    if (u.endsWith('/repos/learner/project/readme')) {
      if (config.noReadme) return textResponse(404, '')
      return textResponse(200, config.readme ?? '# Project\nA real project that does something useful and is explained here.')
    }
    if (u.startsWith('https://raw.githubusercontent.com/')) {
      if (u.endsWith('/src/index.js')) return textResponse(200, config.source ?? 'export function main() { return 1 }')
      if (u.endsWith('/package.json')) return textResponse(200, '{"name":"project"}')
      if (u.endsWith('/README.md')) return textResponse(200, config.readme ?? '# Project')
      return textResponse(404, '')
    }
    return jsonResponse(404, null)
  }
}

test('validates a public repository and retrieves its content', async () => {
  const result = await inspectGithubRepo('https://github.com/learner/project', { fetchImpl: makeFetch(), requiresReadme: true, requiresSourceInspection: true })
  assert.equal(result.kind, 'ok')
  assert.equal(result.commitSha, 'abc123')
  assert.equal(result.readmePresent, true)
  assert.equal(result.hasRelevantSource, true)
  assert.ok(result.selectedFiles.some((f) => f.path === 'src/index.js'))
  assert.equal(result.selectedFiles.some((f) => f.path.includes('node_modules')), false)
})

test('rejects a private repository', async () => {
  const fetchImpl = async (url) => (String(url).endsWith('/repos/learner/project') ? jsonResponse(200, { private: true, full_name: 'learner/project', default_branch: 'main', size: 10 }) : jsonResponse(404, null))
  const result = await inspectGithubRepo('https://github.com/learner/project', { fetchImpl })
  assert.equal(result.kind, 'invalid')
  assert.match(result.reason, /private/i)
})

test('treats a 404 as inaccessible rather than empty', async () => {
  const result = await inspectGithubRepo('https://github.com/learner/project', { fetchImpl: makeFetch({ repoStatus: 404 }) })
  assert.equal(result.kind, 'invalid')
  assert.match(result.reason, /does not exist or is not public/i)
})

test('rejects an empty repository', async () => {
  const result = await inspectGithubRepo('https://github.com/learner/project', { fetchImpl: makeFetch({ size: 0 }) })
  assert.equal(result.kind, 'empty')
})

test('warns when a README is required but missing', async () => {
  const result = await inspectGithubRepo('https://github.com/learner/project', { fetchImpl: makeFetch({ noReadme: true }), requiresReadme: true, requiresSourceInspection: true })
  assert.equal(result.kind, 'ok')
  assert.equal(result.readmePresent, false)
  assert.ok(result.warnings.some((w) => /README/i.test(w)))
})

test('requires relevant source when source inspection is required', async () => {
  const fetchImpl = makeFetch({ tree: [{ path: 'README.md', type: 'blob' }] })
  const result = await inspectGithubRepo('https://github.com/learner/project', { fetchImpl, requiresSourceInspection: true })
  assert.equal(result.kind, 'empty')
})

test('detects committed secrets without returning the value', async () => {
  const result = await inspectGithubRepo('https://github.com/learner/project', { fetchImpl: makeFetch({ source: 'const key = "AKIAIOSFODNN7EXAMPLE"' }), requiresSourceInspection: true })
  assert.ok(result.secretFindings.some((f) => f.ruleId === 'aws-access-key'))
  assert.equal(JSON.stringify(result.secretFindings).includes('AKIAIOSFODNN7EXAMPLE'), false)
})

test('classifies rate limiting as unavailable, not invalid', async () => {
  const fetchImpl = async () => jsonResponse(403, null)
  const result = await inspectGithubRepo('https://github.com/learner/project', { fetchImpl })
  assert.equal(result.kind, 'unavailable')
})
