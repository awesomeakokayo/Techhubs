'use strict'
const test = require('node:test')
const assert = require('node:assert/strict')

const {
  CHECKLIST_KINDS,
  isChecklistKind,
  isKnownChecklistItem,
  parseChecklistWrite,
} = require('../.test-dist/checklist-progress.js')

const catalogue = { stageIds: [1, 2, 3], projectIds: ['p1', 'p2'] }

test('checklist kinds are STAGE and PROJECT', () => {
  assert.deepEqual([...CHECKLIST_KINDS], ['STAGE', 'PROJECT'])
  assert.equal(isChecklistKind('STAGE'), true)
  assert.equal(isChecklistKind('PROJECT'), true)
  assert.equal(isChecklistKind('stage'), false)
  assert.equal(isChecklistKind('OTHER'), false)
  assert.equal(isChecklistKind(42), false)
  assert.equal(isChecklistKind(null), false)
})

test('parseChecklistWrite accepts a valid stage completion', () => {
  const r = parseChecklistWrite({ trackId: 'frontend', kind: 'STAGE', itemKey: '3', completed: true })
  assert.deepEqual(r, {
    ok: true,
    value: { trackId: 'frontend', kind: 'STAGE', itemKey: '3', completed: true },
  })
})

test('parseChecklistWrite accepts a project uncheck (explicit desired state)', () => {
  const r = parseChecklistWrite({ trackId: 'frontend', kind: 'PROJECT', itemKey: 'p1', completed: false })
  assert.equal(r.ok, true)
  assert.equal(r.value.completed, false)
})

test('parseChecklistWrite trims whitespace on identifiers', () => {
  const r = parseChecklistWrite({ trackId: ' frontend ', kind: 'STAGE', itemKey: ' 2 ', completed: true })
  assert.equal(r.ok, true)
  assert.equal(r.value.trackId, 'frontend')
  assert.equal(r.value.itemKey, '2')
})

test('parseChecklistWrite rejects malformed requests', () => {
  assert.equal(parseChecklistWrite(null).ok, false)
  assert.equal(parseChecklistWrite('nope').ok, false)
  assert.equal(parseChecklistWrite({}).ok, false)
  assert.equal(parseChecklistWrite({ trackId: 't', kind: 'STAGE', itemKey: '1' }).ok, false)
  assert.equal(parseChecklistWrite({ trackId: '', kind: 'STAGE', itemKey: '1', completed: true }).ok, false)
  assert.equal(parseChecklistWrite({ trackId: 't', kind: 'BAD', itemKey: '1', completed: true }).ok, false)
  assert.equal(parseChecklistWrite({ trackId: 't', kind: 'STAGE', itemKey: '', completed: true }).ok, false)
  assert.equal(parseChecklistWrite({ trackId: 't', kind: 'STAGE', itemKey: '1', completed: 'yes' }).ok, false)
  assert.equal(parseChecklistWrite({ trackId: 't', kind: 'STAGE', itemKey: '1', completed: 0 }).ok, false)
})

test('isKnownChecklistItem validates roadmap stage ids', () => {
  assert.equal(isKnownChecklistItem('STAGE', '1', catalogue), true)
  assert.equal(isKnownChecklistItem('STAGE', '3', catalogue), true)
  assert.equal(isKnownChecklistItem('STAGE', '4', catalogue), false)
  assert.equal(isKnownChecklistItem('STAGE', 'p1', catalogue), false)
})

test('isKnownChecklistItem validates project ids', () => {
  assert.equal(isKnownChecklistItem('PROJECT', 'p1', catalogue), true)
  assert.equal(isKnownChecklistItem('PROJECT', 'p2', catalogue), true)
  assert.equal(isKnownChecklistItem('PROJECT', 'p9', catalogue), false)
  assert.equal(isKnownChecklistItem('PROJECT', '2', catalogue), false)
})

test('isKnownChecklistItem rejects items when the catalogue is empty', () => {
  const empty = { stageIds: [], projectIds: [] }
  assert.equal(isKnownChecklistItem('STAGE', '1', empty), false)
  assert.equal(isKnownChecklistItem('PROJECT', 'p1', empty), false)
})
