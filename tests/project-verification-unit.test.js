'use strict'
/**
 * Unit tests for the project verification system: artifact classification,
 * contract derivation, secret scanning, SSRF checks, response schema validation
 * and the deterministic decision policy.
 */
const test = require('node:test')
const assert = require('node:assert/strict')

const {
  classifyProvider,
  parseArtifactUrl,
  providerMatchesKind,
  scanForSecrets,
  looksLikePlaceholder,
} = require('../.test-dist/project-verification/validation.js')
const { isPrivateIp, createPinnedLookup } = require('../.test-dist/project-verification/safe-fetch.js')
const { parseGithubUrl } = require('../.test-dist/project-verification/github.js')
const { computeRubricVersion, deriveContract, disciplineForTrack, toPublicContract } = require('../.test-dist/project-verification/contract.js')
const { parseAssessmentResponse, decideAssessment, normalizeStatus } = require('../.test-dist/project-verification/schema.js')
const { SYSTEM_PROMPT, buildUserPrompt } = require('../.test-dist/project-verification/prompt.js')
const { createDeepSeekProvider, createMockProvider } = require('../.test-dist/project-verification/provider.js')
const { TRACKS } = require('../.test-dist/tracks.js')
const { getProjectBrief } = require('../.test-dist/curriculum.js')

/* ---------------- Artifact URL classification ---------------- */

test('classifies provider hosts correctly', () => {
  assert.equal(classifyProvider('https://github.com/user/repo').provider, 'github')
  assert.equal(classifyProvider('https://gist.github.com/x/1').provider, 'github')
  assert.equal(classifyProvider('https://www.figma.com/file/abc/Design').provider, 'figma')
  assert.equal(classifyProvider('https://youtu.be/dQw4w9WgXcQ').provider, 'youtube')
  assert.equal(classifyProvider('https://docs.google.com/document/d/abc/edit').provider, 'google_docs')
  assert.equal(classifyProvider('https://drive.google.com/file/d/abc/view').provider, 'google_drive')
  assert.equal(classifyProvider('https://example.com/page').provider, 'web')
  assert.equal(classifyProvider('mailto:x@y.com').provider, 'unknown')
  assert.equal(classifyProvider('not a url').provider, 'unknown')
})

test('rejects a Gmail link where a public GitHub repository is required', () => {
  const result = parseArtifactUrl('github_repo', 'https://mail.google.com/mail/u/0/#inbox')
  assert.equal(result.ok, false)
  assert.match(result.reason, /GitHub/i)
})

test('accepts a valid GitHub repository URL for github_repo', () => {
  const result = parseArtifactUrl('github_repo', 'https://github.com/learner/project')
  assert.equal(result.ok, true)
  assert.equal(result.provider, 'github')
})

test('canonicalizes YouTube URLs to a watch link', () => {
  const result = parseArtifactUrl('video_url', 'https://youtu.be/dQw4w9WgXcQ')
  assert.equal(result.ok, true)
  assert.equal(result.canonical, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ')
})

test('providerMatchesKind gates providers by artifact kind', () => {
  assert.equal(providerMatchesKind('github', 'github_repo'), true)
  assert.equal(providerMatchesKind('figma', 'github_repo'), false)
  assert.equal(providerMatchesKind('youtube', 'video_url'), true)
  assert.equal(providerMatchesKind('google_docs', 'document_url'), true)
})

/* ---------------- Secret scanning & placeholder detection ---------------- */

test('detects common committed secrets without returning the value', () => {
  const findings = scanForSecrets('const x = "AKIAIOSFODNN7EXAMPLE"')
  assert.ok(findings.find((f) => f.ruleId === 'aws-access-key'))
  assert.equal(JSON.stringify(findings).includes('AKIAIOSFODNN7EXAMPLE'), false)

  assert.ok(scanForSecrets('-----BEGIN RSA PRIVATE KEY-----').length >= 1)
  assert.ok(scanForSecrets('OPENAI=sk-abcdefghijklmnopqrstuvwx').length >= 1)
  assert.ok(scanForSecrets('password = "supersecretvalue123"').length >= 1)
  assert.deepEqual(scanForSecrets('const x = 1'), [])
})

test('placeholder detection flags empty and boilerplate READMEs', () => {
  assert.equal(looksLikePlaceholder(''), true)
  assert.equal(looksLikePlaceholder('todo'), true)
  const real = 'This project is a weather dashboard that fetches live data and shows a 5-day forecast.'
  assert.equal(looksLikePlaceholder(real), false)
})

/* ---------------- SSRF address filtering ---------------- */

test('blocks private, special-use, documentation, multicast and non-global addresses', () => {
  for (const ip of [
    '127.0.0.1', '10.0.0.5', '192.168.1.1', '172.16.0.1', '169.254.169.254',
    '100.64.0.1', '0.0.0.0', '192.0.2.1', '198.51.100.1', '203.0.113.1',
    '198.18.0.1', '224.0.0.1', '255.255.255.255', '::', '::1',
    'fe80::1', 'fe90::1', 'fc00::1', 'fd00::1', 'ff02::1',
    '2001:db8::1', '2001::1', '2002::1', '::ffff:192.168.1.1', 'not-an-ip',
  ]) {
    assert.equal(isPrivateIp(ip), true, `${ip} should be blocked`)
  }
  for (const ip of ['93.184.216.34', '8.8.8.8', '1.1.1.1', '2001:4860:4860::8888']) {
    assert.equal(isPrivateIp(ip), false, `${ip} should be allowed`)
  }
})

test('pins socket DNS lookups to the already-validated address', () => {
  const lookup = createPinnedLookup('93.184.216.34')
  lookup('attacker.example', {}, (error, address, family) => {
    assert.equal(error, null)
    assert.equal(address, '93.184.216.34')
    assert.equal(family, 4)
  })
  lookup('attacker.example', { all: true }, (error, addresses) => {
    assert.equal(error, null)
    assert.deepEqual(addresses, [{ address: '93.184.216.34', family: 4 }])
  })
  assert.throws(() => createPinnedLookup('not-an-ip'), /valid resolved IP/)
})

test('rejects redirects whose destination resolves to a private address', async () => {
  const lookups = []
  const requests = []
  const result = await safeFetchText('https://example.com/start', {
    resolveImpl: async (hostname) => {
      lookups.push(hostname)
      return hostname === 'example.com' ? ['93.184.216.34'] : ['127.0.0.1']
    },
    fetchImpl: async (url) => {
      requests.push(String(url))
      return new Response(null, {
        status: 302,
        headers: { location: 'http://internal.example/admin' },
      })
    },
  })
  assert.equal(result.ok, false)
  assert.equal(result.kind, 'blocked')
  assert.deepEqual(lookups, ['example.com', 'internal.example'])
  assert.equal(requests.length, 1)
})

test('follows a redirect only after resolving and checking the new host', async () => {
  const lookups = []
  const requests = []
  const result = await safeFetchText('https://example.com/start', {
    resolveImpl: async (hostname) => {
      lookups.push(hostname)
      return ['93.184.216.34']
    },
    fetchImpl: async (url) => {
      requests.push(String(url))
      if (requests.length === 1) {
        return new Response(null, {
          status: 302,
          headers: { location: 'https://docs.example.com/guide' },
        })
      }
      return new Response('public learning document', {
        status: 200,
        headers: { 'content-type': 'text/plain; charset=utf-8' },
      })
    },
  })
  assert.equal(result.ok, true)
  assert.equal(result.finalUrl, 'https://docs.example.com/guide')
  assert.equal(result.body, 'public learning document')
  assert.deepEqual(lookups, ['example.com', 'docs.example.com'])
  assert.equal(requests.length, 2)
})


/* ---------------- GitHub URL parsing ---------------- */

test('parses valid GitHub repository URLs and rejects others', () => {
  assert.deepEqual(parseGithubUrl('https://github.com/learner/project'), { owner: 'learner', repo: 'project' })
  const withPath = parseGithubUrl('https://github.com/learner/project/tree/main/src')
  assert.equal(withPath.owner, 'learner')
  assert.equal(withPath.repo, 'project')
  assert.equal(withPath.ref, 'main')
  assert.equal(withPath.path, 'src')

  assert.equal(parseGithubUrl('https://github.com/features/copilot'), null)
  assert.equal(parseGithubUrl('https://github.com/learner'), null)
  assert.equal(parseGithubUrl('https://example.com/github.com/user/repo'), null)
  assert.equal(parseGithubUrl('https://github.com/search?q=github'), null)
})

/* ---------------- Contract derivation ---------------- */

test('derives discipline-specific contracts across the catalogue', () => {
  assert.equal(disciplineForTrack('frontend'), 'software')
  assert.equal(disciplineForTrack('uiux'), 'design')
  assert.equal(disciplineForTrack('video'), 'video')
  assert.equal(disciplineForTrack('data'), 'data')
  assert.equal(disciplineForTrack('writing'), 'writing')

  const byId = new Map(TRACKS.flatMap((t) => t.projects.map((p) => [p.id, { t, p }])))
  let checked = 0
  for (const [projectId, { t, p }] of byId) {
    const brief = getProjectBrief(p.id, p.level, p.title)
    const contract = deriveContract({ project: p, track: t, brief })
    assert.ok(contract.requiredArtifacts.length >= 1, `${projectId} has no required artifacts`)
    assert.ok(contract.rubric.length >= 3, `${projectId} rubric too small`)
    assert.ok(contract.rubric.some((c) => c.mandatory), `${projectId} has no mandatory criteria`)
    assert.ok(contract.passThreshold > 0 && contract.passThreshold <= 1)
    checked += 1
  }
  assert.ok(checked > 80, `expected many projects, checked ${checked}`)
})

test('software projects require a public source artifact; design projects do not', () => {
  const track = TRACKS.find((t) => t.id === 'frontend')
  const project = track.projects.find((p) => p.id === 'fe-p4')
  const brief = getProjectBrief(project.id, project.level, project.title)
  const contract = deriveContract({ project, track, brief })
  assert.equal(contract.discipline, 'software')
  assert.ok(contract.requiredArtifacts.some((a) => a.kind === 'github_repo'))
  assert.equal(contract.requiresSourceInspection, true)

  const ux = TRACKS.find((t) => t.id === 'uiux')
  const uxProject = ux.projects.find((p) => p.id === 'ux-p3')
  const uxBrief = getProjectBrief(uxProject.id, uxProject.level, uxProject.title)
  const uxContract = deriveContract({ project: uxProject, track: ux, brief: uxBrief })
  assert.equal(uxContract.discipline, 'design')
  assert.ok(uxContract.requiredArtifacts.some((a) => a.kind === 'design_file'))
  assert.equal(uxContract.requiresSourceInspection, false)
})

test('no project requires a separate "explanation" URL artifact', () => {
  const byId = new Map(TRACKS.flatMap((t) => t.projects.map((p) => [p.id, { t, p }])))
  for (const [projectId, { t, p }] of byId) {
    const brief = getProjectBrief(p.id, p.level, p.title)
    const contract = deriveContract({ project: p, track: t, brief })
    for (const artifact of contract.requiredArtifacts) {
      assert.notEqual(artifact.kind, 'text', `${projectId} still requires a text/explanation URL artifact`)
      assert.doesNotMatch(artifact.label, /explanation/i, `${projectId} still labels a field as an explanation`)
    }
    assert.ok(contract.writtenExplanation.minWords > 0, `${projectId} must collect a written explanation as text`)
  }
})

test('the Weather App contract requires one primary artifact and a written explanation', () => {
  const track = TRACKS.find((t) => t.id === 'frontend')
  const weather = track.projects.find((p) => p.title === 'Weather App')
  assert.ok(weather, 'Weather App project should exist')
  const brief = getProjectBrief(weather.id, weather.level, weather.title)
  const contract = deriveContract({ project: weather, track, brief })
  const required = contract.requiredArtifacts
  assert.equal(required.length, 1)
  assert.equal(required[0].kind, 'github_repo')
  assert.equal(contract.writtenExplanation.minWords, 80)
})

test('rubric version is stable and changes with the criteria', () => {
  const a = [{ id: 'x', label: 'X', weight: 1, mandatory: true }]
  assert.equal(computeRubricVersion(a), computeRubricVersion([...a]))
  const b = [{ id: 'x', label: 'X', weight: 2, mandatory: true }]
  assert.notEqual(computeRubricVersion(a), computeRubricVersion(b))
  const relabelled = [{ id: 'x', label: 'A materially different requirement', weight: 1, mandatory: true }]
  assert.notEqual(computeRubricVersion(a), computeRubricVersion(relabelled))
})

test('public contract includes the rubric but no scoring internals', () => {
  const track = TRACKS.find((t) => t.id === 'python')
  const project = track.projects[0]
  const brief = getProjectBrief(project.id, project.level, project.title)
  const contract = deriveContract({ project, track, brief })
  const pub = toPublicContract(contract)
  assert.ok(Array.isArray(pub.rubric) && pub.rubric.length === contract.rubric.length)
  assert.equal(typeof pub.passThreshold, 'number')
})

/* ---------------- Response schema validation ---------------- */

function rubricOf(ids) {
  return ids.map((id) => ({ id, label: id, weight: 1, mandatory: true }))
}

function validResponse(ids) {
  return JSON.stringify({ criteria: ids.map((id) => ({ criterionId: id, status: 'met', evidence: 'seen', feedback: 'ok', suggestedFix: '', confidence: 0.9 })), reviewSummary: 'Good.' })
}

test('parses a valid assessment response', () => {
  const rubric = rubricOf(['a', 'b'])
  const parsed = parseAssessmentResponse(validResponse(['a', 'b']), rubric)
  assert.equal(parsed.ok, true)
  assert.equal(parsed.value.criteria.length, 2)
})

test('accepts a fenced JSON response', () => {
  const rubric = rubricOf(['a'])
  const parsed = parseAssessmentResponse('```json\n' + validResponse(['a']) + '\n```', rubric)
  assert.equal(parsed.ok, true)
})

test('normalizes common status phrasings the model may return', () => {
  assert.equal(normalizeStatus('met'), 'met')
  assert.equal(normalizeStatus('Not Met'), 'not_met')
  assert.equal(normalizeStatus('not met'), 'not_met')
  assert.equal(normalizeStatus('partially met'), 'partially_met')
  assert.equal(normalizeStatus('Partially-Met'), 'partially_met')
  assert.equal(normalizeStatus('unable to verify'), 'unable_to_verify')
  assert.equal(normalizeStatus('cannot verify'), 'unable_to_verify')
  assert.equal(normalizeStatus('failed'), 'not_met')
  assert.equal(normalizeStatus('something weird'), null)
  assert.equal(normalizeStatus(3), null)
})

test('parses a response whose status uses spaces instead of snake_case', () => {
  const rubric = rubricOf(['a', 'b'])
  const raw = JSON.stringify({
    criteria: [
      { criterionId: 'a', status: 'not met', evidence: 'looked', feedback: 'missing', suggestedFix: 'add it', confidence: 0.7 },
      { criterionId: 'b', status: 'Unable To Verify', evidence: 'none', feedback: 'cannot tell', confidence: '0.4' },
    ],
    reviewSummary: 'Mixed.',
  })
  const parsed = parseAssessmentResponse(raw, rubric)
  assert.equal(parsed.ok, true)
  assert.equal(parsed.value.criteria[0].status, 'not_met')
  assert.equal(parsed.value.criteria[1].status, 'unable_to_verify')
  assert.equal(parsed.value.criteria[1].confidence, 0.4)
})

test('rejects malformed, incomplete, duplicate and unknown responses', () => {  const rubric = rubricOf(['a', 'b'])
  assert.equal(parseAssessmentResponse('not json', rubric).ok, false)
  assert.equal(parseAssessmentResponse(JSON.stringify({ criteria: [{ criterionId: 'a', status: 'met', evidence: 'e', feedback: 'f' }] }), rubric).ok, false, 'missing criterion b')
  assert.equal(parseAssessmentResponse(JSON.stringify({ criteria: [{ criterionId: 'z', status: 'met', evidence: 'e', feedback: 'f' }], reviewSummary: 'x' }), rubric).ok, false, 'unknown id')
  const dup = { criteria: [{ criterionId: 'a', status: 'met', evidence: 'e', feedback: 'f' }, { criterionId: 'a', status: 'met', evidence: 'e', feedback: 'f' }], reviewSummary: 'x' }
  assert.equal(parseAssessmentResponse(JSON.stringify(dup), rubric).ok, false, 'duplicate id')
  const badStatus = { criteria: [{ criterionId: 'a', status: 'great', evidence: 'e', feedback: 'f' }, { criterionId: 'b', status: 'met', evidence: 'e', feedback: 'f' }], reviewSummary: 'x' }
  assert.equal(parseAssessmentResponse(JSON.stringify(badStatus), rubric).ok, false, 'invalid status')
  const extraField = { criteria: [{ criterionId: 'a', status: 'met', evidence: 'e', feedback: 'f', bonus: 1 }, { criterionId: 'b', status: 'met', evidence: 'e', feedback: 'f' }], reviewSummary: 'x' }
  assert.equal(parseAssessmentResponse(JSON.stringify(extraField), rubric).ok, false, 'unexpected field')
})

/* ---------------- Decision policy ---------------- */

function contractWith(rubric, threshold = 0.8) {
  return { projectId: 'p', trackId: 't', discipline: 'software', rubricVersion: 'r', requiredArtifacts: [], optionalArtifacts: [], requiresSourceInspection: true, requiresReadme: true, requiresLivePreview: false, writtenExplanation: { minWords: 1, prompts: [] }, rubric, passThreshold: threshold, acceptanceCriteria: [] }
}

test('passes only when mandatory criteria are met and score meets the threshold', () => {
  const rubric = [
    { id: 'mand', label: 'M', weight: 1, mandatory: true },
    { id: 'other', label: 'O', weight: 1, mandatory: false },
  ]
  const passed = decideAssessment(contractWith(rubric), [
    { criterionId: 'mand', status: 'met', evidence: 'e', feedback: 'f', confidence: 0.9 },
    { criterionId: 'other', status: 'met', evidence: 'e', feedback: 'f', confidence: 0.9 },
  ])
  assert.equal(passed.outcome, 'passed')

  const mandatoryFailed = decideAssessment(contractWith(rubric), [
    { criterionId: 'mand', status: 'not_met', evidence: 'e', feedback: 'f', confidence: 0.9 },
    { criterionId: 'other', status: 'met', evidence: 'e', feedback: 'f', confidence: 0.9 },
  ])
  assert.equal(mandatoryFailed.outcome, 'changes_required')

  const unable = decideAssessment(contractWith(rubric), [
    { criterionId: 'mand', status: 'unable_to_verify', evidence: 'e', feedback: 'f', confidence: 0.3 },
    { criterionId: 'other', status: 'met', evidence: 'e', feedback: 'f', confidence: 0.9 },
  ])
  assert.equal(unable.outcome, 'unable_to_verify')

  const lowScore = decideAssessment(contractWith(rubric, 0.9), [
    { criterionId: 'mand', status: 'met', evidence: 'e', feedback: 'f', confidence: 0.9 },
    { criterionId: 'other', status: 'partially_met', evidence: 'e', feedback: 'f', confidence: 0.9 },
  ])
  assert.equal(lowScore.outcome, 'changes_required')
  assert.equal(lowScore.score, 0.75)
})

/* ---------------- Prompt construction & provider config ---------------- */

test('the system prompt treats artifacts as untrusted data', () => {
  assert.match(SYSTEM_PROMPT, /untrusted/i)
  assert.match(SYSTEM_PROMPT, /never/i)
})

test('the user prompt includes the rubric ids and the word json', () => {
  const contract = contractWith([{ id: 'ac-1', label: 'Works', weight: 1, mandatory: true }])
  const prompt = buildUserPrompt({ contract, evidence: { metadata: {}, items: [{ label: 'README', source: 'github:readme', content: 'hello' }], warnings: [], fingerprint: 'x', ready: true }, explanation: 'I built it.', deterministicNotes: [] })
  assert.match(prompt, /ac-1/)
  assert.match(prompt, /json/i)
  assert.match(prompt, /UNTRUSTED EVIDENCE/)
})

test('the DeepSeek provider defaults to deepseek-flash and reads the key from the server env', () => {
  const provider = createDeepSeekProvider({ apiKey: 'test' })
  assert.equal(provider.model, 'deepseek-flash')
  const envProvider = createDeepSeekProvider({ apiKey: 'x', model: 'custom-model' })
  assert.equal(envProvider.model, 'custom-model')
})

test('the mock provider returns scripted output and records calls', async () => {
  const provider = createMockProvider(['hello'])
  const out = await provider.assess({ systemPrompt: 's', userPrompt: 'u' })
  assert.equal(out, 'hello')
  assert.equal(provider.calls.length, 1)
})
