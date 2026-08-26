const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '..')
const registry = fs.readFileSync(path.join(root, 'lib', 'ai-resource-registry.ts'), 'utf8')
const guided = fs.readFileSync(path.join(root, 'lib', 'ai-guided-path.ts'), 'utf8')
const auditDoc = fs.readFileSync(path.join(root, 'docs', 'AI_PHASE_7_RESOURCE_AUDIT.md'), 'utf8')

const requiredTracks = [
  'ai-foundations',
  'ai-work',
  'ai-research',
  'ai-content',
  'ai-youtube',
  'ai-software-development',
  'ai-automation',
  'ai-agents',
  'ai-engineering',
  'ai-design',
]

const entries = [...registry.matchAll(/^  '([^']+)': \{/gm)].map((m) => m[1])

function blockFor(id) {
  const start = registry.indexOf(`'${id}': {`)
  const next = entries
    .map((entry) => registry.indexOf(`'${entry}': {`, start + 1))
    .filter((i) => i > start)
    .sort((a, b) => a - b)[0]
  return registry.slice(start, next || registry.length)
}

test('every canonical AI resource has the required Phase 7 fields', () => {
  assert.ok(entries.length >= 20, `expected a substantial verified registry, got ${entries.length}`)
  for (const id of entries) {
    const block = blockFor(id)
    assert.match(block, /trackId:/)
    assert.match(block, /url:\s*'https:\/\//)
    assert.match(block, /provider:/)
    assert.match(block, /free:\s*true/)
    assert.match(block, /competency:/)
    assert.match(block, /stage:\s*\d+/)
    assert.match(block, /type:/)
    assert.match(block, /status:\s*'verified'/)
    assert.match(block, /lastChecked:\s*'2026-08-26'/)
  }
})

test('the registry covers every AI track', () => {
  for (const trackId of requiredTracks) {
    assert.match(registry, new RegExp(`trackId:\s*'${trackId}'`), `${trackId} has no canonical resource`) 
  }
})

test('the AI guided path consumes the canonical registry', () => {
  assert.match(guided, /getAIResourceAuditsForStage/)
  assert.doesNotMatch(guided, /getAIInstructionalGapResources/)
})

test('the audit documentation defines the deployment gate', () => {
  assert.match(auditDoc, /URL/)
  assert.match(auditDoc, /Provider/)
  assert.match(auditDoc, /Free/)
  assert.match(auditDoc, /Competency/)
  assert.match(auditDoc, /Stage/)
  assert.match(auditDoc, /Type/)
  assert.match(auditDoc, /Status/)
  assert.match(auditDoc, /Last checked/)
  assert.match(auditDoc, /Pre-deployment gate/)
})

test('no canonical AI resource is intentionally paid or unverified', () => {
  assert.doesNotMatch(registry, /free:\s*false/)
  assert.doesNotMatch(registry, /status:\s*'(?!verified)[^']+'/)
})
