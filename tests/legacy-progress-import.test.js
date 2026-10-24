'use strict'
const test = require('node:test')
const assert = require('node:assert/strict')

const {
  LEGACY_BACKUP_KEY,
  LEGACY_PROGRESS_KEY,
  LEGACY_USER_KEY,
  importMarkerKey,
  dismissMarkerKey,
  collectImportItems,
  summarizeImportItems,
  classifyLegacyImport,
  shouldResetLegacyForUser,
} = require('../.test-dist/legacy-progress-import.js')

test('legacy keys and per-user marker keys are stable', () => {
  assert.equal(LEGACY_PROGRESS_KEY, 'tsh-progress')
  assert.equal(LEGACY_USER_KEY, 'tsh-user')
  assert.equal(LEGACY_BACKUP_KEY, 'tsh-progress-backup')
  assert.equal(importMarkerKey('u1'), 'tsh-progress-imported:u1')
  assert.equal(dismissMarkerKey('u1'), 'tsh-progress-import-dismissed:u1')
})

test('collectImportItems gathers completed stages and projects', () => {
  const data = {
    tracks: {
      frontend: { completedStages: [1, 2], completedProjects: ['fe-p1'] },
      backend: { completedStages: [3], completedProjects: [] },
    },
  }
  const items = collectImportItems(data)
  assert.equal(items.length, 4)
  assert.deepEqual(items[0], { trackId: 'frontend', kind: 'STAGE', itemKey: '1' })
  assert.ok(items.some((i) => i.trackId === 'frontend' && i.kind === 'PROJECT' && i.itemKey === 'fe-p1'))
  assert.ok(items.some((i) => i.trackId === 'backend' && i.kind === 'STAGE' && i.itemKey === '3'))
})

test('collectImportItems de-duplicates and ignores malformed entries', () => {
  const data = {
    tracks: {
      frontend: {
        completedStages: [1, 1, 2, null, undefined, Number.NaN, '9'],
        completedProjects: ['', '  ', 'p1', 'p1'],
      },
    },
  }
  const items = collectImportItems(data)
  const stages = items.filter((i) => i.kind === 'STAGE')
  const projects = items.filter((i) => i.kind === 'PROJECT')
  assert.deepEqual(stages.map((s) => s.itemKey).sort(), ['1', '2'])
  assert.deepEqual(projects.map((p) => p.itemKey), ['p1'])
})

test('collectImportItems tolerates missing data', () => {
  assert.deepEqual(collectImportItems(null), [])
  assert.deepEqual(collectImportItems(undefined), [])
  assert.deepEqual(collectImportItems({}), [])
  assert.deepEqual(collectImportItems({ tracks: {} }), [])
})

test('summarizeImportItems counts stages, projects, paths and total', () => {
  const summary = summarizeImportItems([
    { trackId: 'frontend', kind: 'STAGE', itemKey: '1' },
    { trackId: 'frontend', kind: 'STAGE', itemKey: '2' },
    { trackId: 'frontend', kind: 'PROJECT', itemKey: 'p1' },
    { trackId: 'backend', kind: 'STAGE', itemKey: '1' },
  ])
  assert.deepEqual(summary, { stages: 3, projects: 1, total: 4, tracks: 2 })
})

test('classifyLegacyImport distinguishes anonymous, matching and different users', () => {
  // Anonymous: no stored user id
  assert.equal(classifyLegacyImport(null, 'u1', 3), 'eligible')
  // Stored user matches the authenticated account
  assert.equal(classifyLegacyImport('u1', 'u1', 3), 'eligible')
  // Stored user belongs to a different account
  assert.equal(classifyLegacyImport('u2', 'u1', 3), 'different-user')
  // Nothing to import
  assert.equal(classifyLegacyImport(null, 'u1', 0), 'empty')
  assert.equal(classifyLegacyImport('u1', 'u1', 0), 'empty')
})

test('shouldResetLegacyForUser only resets on a genuine account change', () => {
  assert.equal(shouldResetLegacyForUser('u2', 'u1'), true)
  assert.equal(shouldResetLegacyForUser('u1', 'u1'), false)
  assert.equal(shouldResetLegacyForUser(null, 'u1'), false)
  assert.equal(shouldResetLegacyForUser('u1', null), false)
  assert.equal(shouldResetLegacyForUser(undefined, undefined), false)
})
