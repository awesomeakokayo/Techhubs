'use strict'

const test = require('node:test')
const assert = require('node:assert/strict')

const { FLAGSHIP_CAPSTONES } = require('../.test-dist/capstone-rubrics.js')
const { TRACKS } = require('../.test-dist/tracks.js')
const { PORTFOLIO_PROJECT, getProjectBrief } = require('../.test-dist/curriculum.js')
const { deriveContract } = require('../.test-dist/project-verification/contract.js')

const EXPECTED = {
  'fe-client-capstone': 'frontend',
  'be-client-capstone': 'backend',
  'py-client-capstone': 'python',
  'ai-ag-p2': 'ai-agents',
}

test('flagship capstone rubrics total 100 and have mandatory criteria', () => {
  assert.deepEqual(Object.keys(FLAGSHIP_CAPSTONES).sort(), Object.keys(EXPECTED).sort())
  for (const [projectId, capstone] of Object.entries(FLAGSHIP_CAPSTONES)) {
    assert.equal(capstone.projectId, projectId)
    assert.equal(capstone.rubric.reduce((sum, criterion) => sum + criterion.weight, 0), 100, projectId)
    assert.ok(capstone.rubric.every((criterion) => criterion.id.trim()), projectId)
    assert.equal(new Set(capstone.rubric.map((criterion) => criterion.id)).size, capstone.rubric.length, projectId)
    assert.ok(capstone.rubric.some((criterion) => criterion.mandatory), projectId)
    assert.ok(capstone.clientBrief.length > 60, projectId)
    assert.ok(capstone.evidence.length >= 3, projectId)
  }
})

test('flagship tracks select the client-style project as their portfolio project', () => {
  for (const [projectId, trackId] of Object.entries(EXPECTED)) {
    if (trackId === 'ai-agents') {
      const track = TRACKS.find((candidate) => candidate.id === trackId)
      assert.ok(track, trackId)
      assert.ok(track.projects.some((project) => project.id === projectId), 'AI capstone stays in the AI Agents catalogue')
      assert.equal(projectId, 'ai-ag-p2')
      continue
    }
    assert.equal(PORTFOLIO_PROJECT[trackId], projectId, trackId)
    const track = TRACKS.find((candidate) => candidate.id === trackId)
    assert.ok(track, trackId)
    const project = track.projects.find((candidate) => candidate.id === projectId)
    assert.ok(project, `${trackId} portfolio project must exist in its track catalogue`)
    assert.equal(project.level, 'advanced')
    assert.ok(['beginner', 'intermediate', 'advanced'].every((level) => track.projects.some((item) => item.level === level)), `${trackId} needs a complete project ladder`)
  }
})

test('the server contract uses the authored 100-point capstone rubric', () => {
  for (const [projectId, trackId] of Object.entries(EXPECTED)) {
    const track = TRACKS.find((candidate) => candidate.id === trackId)
    assert.ok(track, trackId)
    const project = track.projects.find((candidate) => candidate.id === projectId)
    assert.ok(project, projectId)
    const brief = getProjectBrief(project.id, project.level, project.title)
    const contract = deriveContract({ project, track, brief })
    for (const criterion of FLAGSHIP_CAPSTONES[projectId].rubric) {
      const evaluated = contract.rubric.find((candidate) => candidate.id === criterion.id)
      assert.ok(evaluated, `${projectId} missing rubric criterion ${criterion.id}`)
      assert.equal(evaluated.weight, criterion.weight, `${projectId} weight ${criterion.id}`)
      assert.equal(evaluated.mandatory, criterion.mandatory, `${projectId} mandatory flag ${criterion.id}`)
    }
    assert.deepEqual(contract.acceptanceCriteria, FLAGSHIP_CAPSTONES[projectId].acceptanceCriteria)
    assert.ok(contract.rubric.some((criterion) => criterion.mandatory), projectId)
    assert.equal(contract.rubric.filter((criterion) => criterion.weight > 0).reduce((sum, criterion) => sum + criterion.weight, 0), 100, projectId)
  }
})
