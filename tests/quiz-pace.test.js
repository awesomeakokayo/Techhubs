'use strict'
/**
 * Content-exposure regression guards for the path-finder quiz.
 *
 * The quiz previously computed "weeks at your pace" in the browser with
 * `buildGuidedPath`, which pulled `lib/guided-path` (and, transitively,
 * `lib/curriculum` with every knowledge-check `correctIndex` and rationale)
 * into the client JavaScript bundle. Pace is now computed server-side in
 * `lib/quiz-pace.ts` and passed to the quiz as a plain number map.
 *
 * These tests fail if the client component re-imports curriculum-bearing
 * modules, or if the server-side estimate stops matching the guided path.
 */
const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const { TRACKS } = require('../.test-dist/tracks.js')
const { buildGuidedPath } = require('../.test-dist/guided-path.js')
const { approxLearningHoursByTrack } = require('../.test-dist/quiz-pace.js')

const root = path.resolve(__dirname, '..')
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8')

test('the quiz client component does not import curriculum-bearing modules', () => {
  const source = read(path.join('components', 'quiz', 'TrackQuiz.tsx'))
  assert.doesNotMatch(source, /from '@\/lib\/guided-path'/)
  assert.doesNotMatch(source, /from '@\/lib\/curriculum'/)
  assert.doesNotMatch(source, /from '@\/lib\/curriculum-extended'/)
  // The pace data must arrive as a prop computed on the server instead.
  assert.match(source, /approxHoursByTrack/)
})

test('no client component imports the curriculum or guided-path data modules', () => {
  const dirs = ['app', 'components', 'hooks']
  const offenders = []
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        if (entry.name === 'node_modules' || entry.name === '.next') continue
        walk(full)
        continue
      }
      if (!/\.(tsx|ts)$/.test(entry.name)) continue
      const source = fs.readFileSync(full, 'utf8')
      if (!/^\s*['"]use client['"]\s*$/m.test(source)) continue
      if (/from '@\/lib\/(curriculum|curriculum-extended)'/.test(source)) offenders.push(full)
      if (/^\s*import\s+[^;]*\sfrom '@\/lib\/guided-path'/m.test(source) && !/^\s*import type/m.test(source)) {
        offenders.push(full)
      }
    }
  }
  for (const dir of dirs) {
    const abs = path.join(root, dir)
    if (fs.existsSync(abs)) walk(abs)
  }
  assert.deepEqual(offenders, [], `client components importing protected curriculum: ${offenders.join(', ')}`)
})

test('server-side pace estimate covers every track and matches the guided path', () => {
  const hours = approxLearningHoursByTrack()
  for (const track of TRACKS) {
    const steps = buildGuidedPath(track.id)
    const expected = steps.filter((step) => step.type !== 'checkpoint').length * 0.75
    assert.equal(hours[track.id], expected, `${track.id} pace estimate mismatch`)
    assert.ok(hours[track.id] > 0, `${track.id} has a non-positive pace estimate`)
  }
})
