'use strict'
const test = require('node:test')
const assert = require('node:assert/strict')

const {
  parseChecklistImportPayload,
  partitionChecklistImport,
  MAX_IMPORT_ITEMS,
} = require('../.test-dist/checklist-import.js')

test('parseChecklistImportPayload accepts a valid payload', () => {
  const r = parseChecklistImportPayload({
    items: [
      { trackId: 'frontend', kind: 'STAGE', itemKey: '1' },
      { trackId: 'frontend', kind: 'PROJECT', itemKey: 'p1' },
    ],
  })
  assert.equal(r.ok, true)
  assert.equal(r.items.length, 2)
  assert.deepEqual(r.items[0], { trackId: 'frontend', kind: 'STAGE', itemKey: '1' })
})

test('parseChecklistImportPayload rejects malformed bodies', () => {
  assert.equal(parseChecklistImportPayload(null).ok, false)
  assert.equal(parseChecklistImportPayload('nope').ok, false)
  assert.equal(parseChecklistImportPayload({}).ok, false)
  assert.equal(parseChecklistImportPayload({ items: 'x' }).ok, false)
  assert.equal(parseChecklistImportPayload({ items: [] }).ok, false)
  assert.equal(parseChecklistImportPayload({ items: ['x'] }).ok, false)
  assert.equal(parseChecklistImportPayload({ items: [{ trackId: 't', kind: 'STAGE' }] }).ok, false)
  assert.equal(parseChecklistImportPayload({ items: [{ trackId: '', kind: 'STAGE', itemKey: '1' }] }).ok, false)
  assert.equal(parseChecklistImportPayload({ items: [{ trackId: 't', kind: 'BAD', itemKey: '1' }] }).ok, false)
  assert.equal(parseChecklistImportPayload({ items: [{ trackId: 't', kind: 'STAGE', itemKey: '' }] }).ok, false)
})

test('parseChecklistImportPayload enforces the payload limit', () => {
  const tooMany = Array.from({ length: MAX_IMPORT_ITEMS + 1 }, (_, i) => ({ trackId: 'frontend', kind: 'STAGE', itemKey: String(i + 1) }))
  assert.equal(parseChecklistImportPayload({ items: tooMany }).ok, false)

  const atLimit = Array.from({ length: MAX_IMPORT_ITEMS }, (_, i) => ({ trackId: 'frontend', kind: 'STAGE', itemKey: String(i + 1) }))
  assert.equal(parseChecklistImportPayload({ items: atLimit }).ok, true)
})

test('parseChecklistImportPayload rejects oversized identifiers', () => {
  const long = 'x'.repeat(200)
  assert.equal(parseChecklistImportPayload({ items: [{ trackId: long, kind: 'STAGE', itemKey: '1' }] }).ok, false)
  assert.equal(parseChecklistImportPayload({ items: [{ trackId: 't', kind: 'STAGE', itemKey: long }] }).ok, false)
})

test('partitionChecklistImport separates valid items from reported invalids', () => {
  const catalogue = { stageIds: [1, 2], projectIds: ['p1'] }
  const resolve = (trackId) => (trackId === 'frontend' ? catalogue : null)

  const { valid, skipped } = partitionChecklistImport(
    [
      { trackId: 'frontend', kind: 'STAGE', itemKey: '1' },
      { trackId: 'frontend', kind: 'STAGE', itemKey: '9' },
      { trackId: 'frontend', kind: 'PROJECT', itemKey: 'p1' },
      { trackId: 'unknown', kind: 'STAGE', itemKey: '1' },
      { trackId: 'frontend', kind: 'PROJECT', itemKey: 'p9' },
    ],
    resolve,
  )

  assert.equal(valid.length, 2)
  assert.deepEqual(valid.map((i) => i.itemKey), ['1', 'p1'])
  assert.equal(skipped.length, 3)
  assert.deepEqual(skipped.map((s) => s.reason).sort(), ['unknown_item', 'unknown_item', 'unknown_track'])
  assert.ok(skipped.some((s) => s.itemKey === '9' && s.reason === 'unknown_item'))
  assert.ok(skipped.some((s) => s.trackId === 'unknown' && s.reason === 'unknown_track'))
})
