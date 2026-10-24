'use strict'
/**
 * Evidence alternatives must be truly interchangeable. The route accepts an
 * alternative kind, so the deterministic evidence collector must resolve that
 * kind rather than looking up only the preferred primary and rejecting a valid
 * submission.
 */
const test = require('node:test')
const assert = require('node:assert/strict')

const { collectEvidence } = require('../.test-dist/project-verification/evidence.js')

function contract(overrides = {}) {
  return {
    projectId: 'qa-p1',
    trackId: 'qa',
    discipline: 'qa',
    rubricVersion: 'r-test-1',
    requiredArtifacts: [
      {
        kind: 'document_url',
        label: 'test report',
        description: 'A shareable test report.',
        required: true,
        helpGuideId: 'share-a-document-deliverable',
        alternatives: [{ kind: 'document_file', label: 'uploaded report', helpGuideId: 'share-a-document-deliverable' }],
      },
    ],
    optionalArtifacts: [],
    requiresSourceInspection: false,
    requiresReadme: false,
    requiresLivePreview: false,
    writtenExplanation: { minWords: 1, prompts: ['Summarise the evidence.'] },
    rubric: [{ id: 'evidence', label: 'Evidence', weight: 100, mandatory: true }],
    passThreshold: 80,
    acceptanceCriteria: ['Report is inspectable.'],
    ...overrides,
  }
}

const fetchText = async () => new Response('Test report: login and checkout were exercised.', {
  status: 200,
  headers: { 'content-type': 'text/plain' },
})

test('a required document accepts a document_file alternative', async () => {
  const result = await collectEvidence({
    contract: contract(),
    artifacts: [{ kind: 'document_file', url: 'https://docs.google.com/document/d/abc123/edit' }],
    explanation: 'I ran the login and checkout tests and recorded the results.',
    deps: { fetchImpl: fetchText, resolveImpl: async () => ['1.1.1.1'] },
  })
  assert.equal(result.package.ready, true, JSON.stringify(result.package.rejected))
  assert.equal(result.package.rejected, undefined)
  assert.equal(result.package.metadata['artifact:document_file'].accessible, true)
  assert.equal(result.package.metadata['artifact:document_url'], undefined)
  assert.ok(result.package.items.some((item) => /Test report/.test(item.content)))
})

test('an alternative cannot satisfy a required artifact if it is not submitted', async () => {
  const result = await collectEvidence({
    contract: contract(),
    artifacts: [],
    explanation: 'I ran the login and checkout tests and recorded the results.',
    deps: { fetchImpl: fetchText, resolveImpl: async () => ['1.1.1.1'] },
  })
  assert.equal(result.package.ready, false)
  assert.equal(result.package.rejected.code, 'missing_artifact')
})

test('a document_file alternative must still be inspectable', async () => {
  const result = await collectEvidence({
    contract: contract(),
    artifacts: [{ kind: 'document_file', url: 'https://docs.google.com/document/d/private/edit' }],
    explanation: 'I ran the login and checkout tests and recorded the results.',
    deps: {
      fetchImpl: async () => new Response('not found', { status: 404, headers: { 'content-type': 'text/plain' } }),
      resolveImpl: async () => ['1.1.1.1'],
    },
  })
  assert.equal(result.package.ready, false)
  assert.equal(result.package.rejected.code, 'artifact_unavailable')
})
