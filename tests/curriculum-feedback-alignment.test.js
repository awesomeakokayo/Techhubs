const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '..')
const pilot = fs.readFileSync(path.join(root, 'lib', 'curriculum-package', 'pilot.generated.ts'), 'utf8')
const overview = fs.readFileSync(path.join(root, 'app', '(marketing)', 'guided-path', 'page.tsx'), 'utf8')
const preview = fs.readFileSync(path.join(root, 'app', '(marketing)', 'guided-path-preview', '[trackId]', 'page.tsx'), 'utf8')

test('keyboard-focus question feedback and objective stay aligned', () => {
  const start = pilot.indexOf('"id": "frontend-1-q3"')
  const end = pilot.indexOf('"id": "frontend-1-q4"', start)
  assert.ok(start >= 0 && end > start, 'keyboard-focus question block missing')
  const block = pilot.slice(start, end)
  assert.match(block, /keyboard-only user cannot see which control has focus/i)
  assert.match(block, /feedbackOnIncorrect": "Revisit keyboard accessibility and focus management/i)
  assert.match(block, /objective": "Provide a visible keyboard focus indicator/i)
  assert.doesNotMatch(block, /Revisit CSS Grid|375px to desktop without horizontal scrolling/)
})

test('Guided Path overview points to a public read-only lesson preview', () => {
  assert.match(overview, /Explore the free catalogue and curated learning resources/)
  assert.match(overview, /href="\/guided-path-preview\/ai-agents"/)
  assert.doesNotMatch(overview, /Everything you need to learn is free, forever/)
  assert.match(preview, /No account required/i)
  assert.doesNotMatch(preview, /correctIndex|quizQuestions|projectSubmission/i)
})
