'use strict'

const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '..')
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8')

test('resource index receives a lightweight server-built catalog with AI track additions', () => {
  const page = read(path.join('app', '(marketing)', 'resources', 'page.tsx'))
  const client = read(path.join('app', '(marketing)', 'resources', 'ResourcesClient.tsx'))

  assert.match(page, /TRACKS\.map\(getAIEnrichedTrack\)/)
  assert.match(page, /ResourcesClient resources=\{resources\} tracks=\{trackOptions\}/)
  assert.doesNotMatch(client, /import \{[^}]*TRACKS[^}]*\} from ['"]@\/lib\/tracks['"]/)
  assert.doesNotMatch(client, /trackOptions\.slice\(0,\s*6\)/)
  assert.match(client, /trackOptions\.map\(\(track\)/)
})

test('global projects index includes AI-enriched project additions', () => {
  const page = read(path.join('app', '(marketing)', 'projects', 'page.tsx'))
  assert.match(page, /TRACKS\.map\(getAIEnrichedTrack\)/)
  assert.match(page, /enrichedTracks\.flatMap/)
})
