'use strict'
/**
 * Strict artifact parsing runs before credit reservation or a model call. A
 * malformed or duplicated client payload must be rejected, never silently
 * dropped.
 */
const test = require('node:test')
const assert = require('node:assert/strict')

const {
  MAX_ARTIFACTS,
  parseArtifacts,
  artifactKindSet,
  missingRequiredArtifacts,
} = require('../.test-dist/project-verification/artifacts.js')

test('accepts a bounded list of known artifact kinds', () => {
  const parsed = parseArtifacts([
    { kind: 'github_repo', url: ' https://github.com/example/project ' },
    { kind: 'document_url', url: 'https://docs.google.com/document/d/abc/edit' },
  ])
  assert.equal(parsed.ok, true)
  assert.deepEqual(parsed.artifacts, [
    { kind: 'github_repo', url: 'https://github.com/example/project' },
    { kind: 'document_url', url: 'https://docs.google.com/document/d/abc/edit' },
  ])
})

test('missing artifacts are an empty list, not a silently dropped field', () => {
  assert.deepEqual(parseArtifacts(undefined), { ok: true, artifacts: [] })
  assert.deepEqual(parseArtifacts(null), { ok: true, artifacts: [] })
})

test('rejects a non-list payload', () => {
  const parsed = parseArtifacts({ kind: 'github_repo', url: 'https://github.com/example/project' })
  assert.equal(parsed.ok, false)
  assert.equal(parsed.code, 'ARTIFACTS_INVALID')
})

test('rejects more than eight links', () => {
  const artifacts = Array.from({ length: MAX_ARTIFACTS + 1 }, (_, index) => ({
    kind: 'image',
    url: `https://example.com/${index}.png`,
  }))
  const parsed = parseArtifacts(artifacts)
  assert.equal(parsed.ok, false)
  assert.equal(parsed.code, 'TOO_MANY_ARTIFACTS')
})

test('rejects unknown kinds rather than dropping them', () => {
  const parsed = parseArtifacts([{ kind: 'made_up_kind', url: 'https://example.com' }])
  assert.equal(parsed.ok, false)
  assert.equal(parsed.code, 'ARTIFACT_KIND_UNSUPPORTED')
  assert.equal(parsed.kind, 'made_up_kind')
})

test('rejects duplicate kinds and empty URLs', () => {
  const duplicate = parseArtifacts([
    { kind: 'github_repo', url: 'https://github.com/example/one' },
    { kind: 'github_repo', url: 'https://github.com/example/two' },
  ])
  assert.equal(duplicate.ok, false)
  assert.equal(duplicate.code, 'ARTIFACT_DUPLICATE_KIND')

  const empty = parseArtifacts([{ kind: 'github_repo', url: '   ' }])
  assert.equal(empty.ok, false)
  assert.equal(empty.code, 'ARTIFACT_URL_REQUIRED')
})

test('required-artifact checks accept the declared alternative', () => {
  const requirements = [{ kind: 'document_url', alternatives: [{ kind: 'document_file' }] }]
  assert.equal(artifactKindSet(requirements).has('document_file'), true)
  assert.deepEqual(missingRequiredArtifacts({ requiredArtifacts: requirements }, []), requirements)
  assert.deepEqual(
    missingRequiredArtifacts({ requiredArtifacts: requirements }, [{ kind: 'document_file', url: 'https://example.com' }]),
    [],
  )
})
