const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '..')
const certificatePage = fs.readFileSync(path.join(root, 'app', 'certificate', '[trackId]', 'page.tsx'), 'utf8')
const certificateActions = fs.readFileSync(path.join(root, 'app', 'certificate', '[trackId]', 'CertificateActions.tsx'), 'utf8')
const certificateRoute = fs.readFileSync(path.join(root, 'app', 'api', 'certificate', '[trackId]', 'route.ts'), 'utf8')
const guidedRoute = fs.readFileSync(path.join(root, 'app', 'api', 'guided-path', '[trackId]', 'route.ts'), 'utf8')
const guidedPage = fs.readFileSync(path.join(root, 'app', 'guided-path', '[trackId]', 'page.tsx'), 'utf8')
const schema = fs.readFileSync(path.join(root, 'prisma', 'schema.prisma'), 'utf8')

test('certificate page keeps browser-only print logic in a client component', () => {
  assert.match(certificatePage, /CertificateActions/)
  assert.doesNotMatch(certificatePage, /onClick=\{\(\) => window\.print\(\)\}/)
  assert.doesNotMatch(certificatePage, /window\.print\(\)/)
  assert.match(certificateActions, /'use client'/)
  assert.match(certificateActions, /window\.print\(\)/)
})

test('certificate page is gated by actual course completion', () => {
  assert.match(certificatePage, /prisma\.courseCompletion\.findUnique/)
  assert.match(certificatePage, /const earned = !!completion/)
  assert.match(certificatePage, /earned && <CertificateActions/)
})

test('guided path creates course completion only after the final step', () => {
  assert.match(guidedRoute, /if \(stepIndex === steps\.length - 1\)/)
  assert.match(guidedRoute, /prisma\.courseCompletion\.upsert/)
})

test('completed guided path sends learner directly to certificate', () => {
  assert.match(guidedPage, /Course complete!/) 
  assert.match(guidedPage, /href=\{`\/certificate\/\$\{trackId\}`\}/)
})

test('course completion is uniquely recorded per learner and track', () => {
  assert.match(schema, /model CourseCompletion \{/) 
  assert.match(schema, /@@unique\(\[userId, trackId\]\)/)
})

test('certificate has a real server-generated PDF download endpoint', () => {
  assert.match(certificateActions, /\/api\/certificate\/\$\{encodeURIComponent\(trackId\)\}/)
  assert.match(certificateRoute, /export async function GET/)
  assert.match(certificateRoute, /application\/pdf/)
  assert.match(certificateRoute, /Content-Disposition/) 
  assert.match(certificateRoute, /attachment; filename=/)
  assert.match(certificateRoute, /%PDF-1\.4/)
  assert.match(certificateRoute, /courseCompletion\.findUnique/)
  assert.match(certificateRoute, /if \(!completion\)/)
})

test('certificate download is protected by authentication and completion', () => {
  assert.match(certificateRoute, /if \(!session\?\.user\?\.id\)/)
  assert.match(certificateRoute, /Authentication required/)
  assert.match(certificateRoute, /Complete the course before downloading its certificate\./)
  assert.match(certificateRoute, /Cache-Control.*private, no-store|private, no-store/)
})

test('certificate print output is deliberately formatted for PDF saving', () => {
  assert.match(certificatePage, /@page \{ size: A4 landscape; margin: 0; \}/)
  assert.match(certificatePage, /print-color-adjust: exact/)
  assert.match(certificatePage, /\.certificate-shell \{/) 
  assert.match(certificateActions, /Print Certificate/)
})

test('certificate no longer advertises the incorrect .com verification domain', () => {
  assert.doesNotMatch(certificatePage, /techskillhub\.com/)
  assert.match(certificatePage, /Tech Skill Hub/)
})
