#!/usr/bin/env node
/**
 * SEO validation tool for TechSkillHub.
 *
 * Scans the Next.js App Router source and reports:
 *  - which public routes have metadata + canonical (page.tsx or sibling layout.tsx)
 *  - which private routes have noindex robots
 *  - required SEO routes that are missing
 *
 * Usage: node scripts/seo-audit.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const appDir = path.join(root, 'app')

const REQUIRED_ROUTES = [
  '/',
  '/start',
  '/roadmaps',
  '/roadmaps/[slug]',
  '/guides',
  '/guides/[slug]',
  '/careers',
  '/careers/[slug]',
  '/projects',
  '/projects/[level]',
  '/resources',
  '/resources/[slug]',
  '/paths',
  '/paths/[category]',
  '/tracks',
  '/tracks/[slug]',
  '/about',
  '/contact',
]

const NOINDEX_ROUTES = [
  'login',
  'guided-path/[trackId]',
  'account',
  'certificate/[trackId]',
  'purchase/[trackId]',
  'dashboard/analytics',
  'upgrade',
]

function findPages(dir, base = '') {
  const results = {}
  if (!fs.existsSync(dir)) return results
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    const rel = base ? `${base}/${entry.name}` : entry.name
    if (entry.isDirectory()) {
      const nested = findPages(full, rel)
      for (const [k, v] of Object.entries(nested)) results[k] = v
    } else if (entry.name === 'page.tsx' || entry.name === 'layout.tsx') {
      const route = rel.replace(/(^|\/)page\.tsx$/, '').replace(/(^|\/)layout\.tsx$/, '')
      results[route] = results[route] || []
      results[route].push({ file: full, name: entry.name })
    }
  }
  return results
}

function read(file) {
  try {
    return fs.readFileSync(file, 'utf8')
  } catch {
    return ''
  }
}

const hasMeta = (src) => /export\s+const\s+metadata/.test(src) || /generateMetadata/.test(src)
const hasCanonical = (src) => /getPageMetadata/.test(src) || /getSiteMetadata/.test(src) || /alternates\s*:\s*\{\s*canonical/.test(src)
const hasNoindex = (src) => /index:\s*false/.test(src)

const routes = findPages(appDir)
const problems = []
const ok = []

for (const [route, files] of Object.entries(routes)) {
  const isPriv = NOINDEX_ROUTES.includes(route)
  const pageFile = files.find((f) => f.name === 'page.tsx')
  const layoutFile = files.find((f) => f.name === 'layout.tsx')
  const pageSrc = pageFile ? read(pageFile.file) : ''
  const layoutSrc = layoutFile ? read(layoutFile.file) : ''

  if (isPriv) {
    const covered = (pageFile && hasNoindex(pageSrc)) || (layoutFile && hasNoindex(layoutSrc))
    if (covered) ok.push(`noindex OK       ${route === '' ? '/' : route}`)
    else problems.push(`MISSING noindex  ${route} (private route still indexable)`)
    continue
  }

  // routes with a page.tsx but a layout that provides metadata are fine (client pages wrapped by a layout)
  const metaSource = pageFile && hasMeta(pageSrc) ? pageSrc : layoutSrc
  const canonSource = pageFile && hasCanonical(pageSrc) ? pageSrc : layoutSrc

  if (!pageFile && !layoutFile) continue
  if (!hasMeta(metaSource)) {
    problems.push(`MISSING metadata  ${route === '' ? '/' : route}`)
  } else if (!hasCanonical(canonSource)) {
    problems.push(`MISSING canonical ${route === '' ? '/' : route} (metadata present but no canonical)`)
  } else {
    ok.push(`metadata OK      ${route === '' ? '/' : route}`)
  }
}

for (const route of REQUIRED_ROUTES) {
  const normalized = route === '/' ? '' : route.replace(/^\//, '')
  const pagePath = path.join(appDir, normalized, 'page.tsx')
  const layoutPath = path.join(appDir, normalized, 'layout.tsx')
  if (!fs.existsSync(pagePath) && !fs.existsSync(layoutPath)) {
    problems.push(`MISSING ROUTE    /${route.replace(/^\//, '')}`)
  }
}

// robots.txt / sitemap presence
for (const f of ['app/robots.ts', 'app/sitemap.ts', 'app/not-found.tsx']) {
  if (fs.existsSync(path.join(root, f))) ok.push(`file present     ${f}`)
  else problems.push(`MISSING FILE     ${f}`)
}

console.log('\n=== TechSkillHub — SEO Audit ===\n')
ok.sort().forEach((line) => console.log(`  ✓ ${line}`))
console.log('')
if (problems.length) {
  console.log(`Problems (${problems.length}):`)
  problems.sort().forEach((line) => console.log(`  ✗ ${line}`))
  process.exitCode = 1
} else {
  console.log('No problems found.')
}