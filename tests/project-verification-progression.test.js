'use strict'
/**
 * Progression and security contract assertions for the verification system.
 * These read the route and client sources, mirroring the repository's existing
 * source-assertion tests.
 */
const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '..')
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8')

const guidedRoute = read(path.join('app', 'api', 'guided-path', '[trackId]', 'route.ts'))
const verifyRoute = read(path.join('app', 'api', 'project-verification', '[trackId]', 'route.ts'))
const client = read(path.join('app', '(app)', 'guided-path', '[trackId]', 'GuidedPathClient.tsx'))
const provider = read(path.join('lib', 'project-verification', 'provider.ts'))
const contract = read(path.join('lib', 'project-verification', 'contract.ts'))
const guides = read(path.join('lib', 'seo', 'submission-guides.ts'))

test('the guided path only advances a project step when the server holds a pass', () => {
  assert.match(guidedRoute, /getSubmission/)
  assert.match(guidedRoute, /stored\.status !== 'passed'/)
  assert.match(guidedRoute, /must pass automated verification/)
  assert.doesNotMatch(guidedRoute, /validateProjectEvidence/)
})

test('the verification route enforces auth, ownership and the current step', () => {
  assert.match(verifyRoute, /Authentication required/)
  assert.match(verifyRoute, /hasTrackAccess/)
  assert.match(verifyRoute, /enrollment\.currentStepIndex !== stepIndex/)
  // Only an assessable project step can be verified: the shared resolver returns
  // null for non-project steps and for project steps with no contract.
  assert.match(verifyRoute, /resolveStepAssessment/)
  assert.match(verifyRoute, /no configured assessment/)
})

test('the verification route requires acknowledgement and a budget check', () => {
  assert.match(verifyRoute, /acknowledged !== true/)
  assert.match(verifyRoute, /checkAssessmentBudget/)
})

test('an AI build step with no mapped project is assessable, not a dead end', () => {
  const guided = read(path.join('app', 'api', 'guided-path', '[trackId]', 'route.ts'))
  // Both routes resolve the assessment through the shared resolver, which falls
  // back to a section-mastery contract derived from the section objective.
  assert.match(guided, /resolveStepAssessment/)
  assert.match(verifyRoute, /resolveStepAssessment/)
  // The old unpassable dead ends are gone.
  assert.doesNotMatch(guided, /This project step is not configured/)
  assert.doesNotMatch(verifyRoute, /step\.projectId/)
  // The contract is resolved server-side, never from a path-specific field.
  assert.doesNotMatch(guided, /step\.projectBrief && track/)
})

test('the verification route preserves the submission before assessing and records the outcome', () => {
  assert.match(verifyRoute, /saveSubmission/)
  assert.match(verifyRoute, /assessSubmission/)
  assert.match(verifyRoute, /project_assessed/)
})

test('a valid prior pass is reused without a new provider call', () => {
  assert.match(verifyRoute, /isReusablePass/)
  assert.match(verifyRoute, /reused: true/)
})

test('the client submits to the verification endpoint and cannot set a pass flag', () => {
  assert.match(client, /\/api\/project-verification\//)
  assert.doesNotMatch(client, /passed:\s*true/)
  // Continue for a project is only shown once the server returned a pass.
  assert.match(client, /submissionState\?\.status === 'passed'/)
})

test('the client links each requirement to the public help center in a new tab', () => {
  assert.match(client, /\/submit-help\//)
  assert.match(client, /target="_blank"/)
  assert.match(client, /What you must submit/)
})

test('DeepSeek is the default provider, configured from server-side env only', () => {
  assert.match(provider, /DEFAULT_DEEPSEEK_MODEL = 'deepseek-flash'/)
  assert.match(provider, /process\.env\.DEEPSEEK_API_KEY/)
  assert.match(provider, /process\.env\.DEEPSEEK_MODEL/)
  assert.doesNotMatch(provider, /NEXT_PUBLIC/)
})

test('assessment outcomes carry a typed code and never blame the project for service failures', () => {
  const assessment = read(path.join('lib', 'project-verification', 'assessment.ts'))
  assert.match(assessment, /code: SubmissionCode/)
  assert.match(assessment, /assessment_invalid_response/)
  assert.match(assessment, /assessment_timeout/)
  assert.match(assessment, /artifact_unrelated/)
  // Malformed model output is a service failure, not an unverifiable project.
  assert.match(assessment, /status: 'service_unavailable',\s*\n\s*code: 'assessment_invalid_response'/)
  // The route persists and returns the code.
  assert.match(verifyRoute, /code: result\.code/)
})

test('the client renders a distinct heading per outcome code', () => {
  assert.match(client, /CODE_OUTCOME/)
  assert.match(client, /does not appear to match this assignment/)
  assert.match(client, /Assessment could not be completed/)
  assert.match(client, /been marked as/)
})

test('the submission form collects one primary artifact and a written explanation, not an explanation URL', () => {
  // The panel renders required artifacts as project links and a textarea for the explanation.
  assert.match(client, /Explain your work/)
  assert.match(client, /words minimum/)
  assert.doesNotMatch(client, /Explanation of your work link/)
})

test('software projects default to a required public source artifact', () => {
  assert.match(contract, /kind: 'github_repo'/)
  assert.match(contract, /requiresSourceInspection/)
})

test('the legacy weak evidence validator has been replaced', () => {
  assert.equal(fs.existsSync(path.join(root, 'lib', 'project-evidence.ts')), false)
  assert.doesNotMatch(guidedRoute, /project-evidence/)
})

test('every help guide id referenced by the contract exists in the help center', () => {
  const referenced = [...contract.matchAll(/_HELP = '([a-z0-9-]+)'/g)].map((m) => m[1])
  assert.ok(referenced.length >= 8, `expected several help ids, found ${referenced.length}`)
  for (const id of new Set(referenced)) {
    assert.match(guides, new RegExp(`'${id}':`), `help center is missing guide ${id}`)
  }
})
