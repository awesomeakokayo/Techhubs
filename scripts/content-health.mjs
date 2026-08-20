/**
 * Content Health Audit — TechSkillHub SEO content quality checker.
 *
 * Scores every guide / career / resource entry 0-3 on the dimensions an
 * editorial team cares about (direct answer, CTA, FAQs, related links,
 * freshness, next-step readiness) and flags unsupported claims. It is an
 * internal editorial tool, not a user-facing ranking.
 *
 * Usage: node scripts/content-health.mjs
 */

import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const files = ['lib/seo/guides.ts', 'lib/seo/careers.ts', 'lib/seo/resource-pages.ts', 'lib/seo/roadmaps.ts']

const CLAIMS = [
  'most developers',
  'best framework',
  'dominates the industry',
  'everyone uses',
  'guaranteed',
  'fastest growing',
  'highest paying',
  'most popular',
  'most in demand',
  'every employer',
]

function scorePresent(has) {
  return has ? 3 : 0
}

function scoreCount(count) {
  if (count <= 0) return 0
  if (count === 1) return 1
  if (count === 2) return 2
  return 3
}

/** Extract top-level entries from a `Record<string, T> = { ... }` source. */
function extractEntries(source) {
  const start = source.indexOf('Record<string')
  if (start === -1) return []
  const open = source.indexOf('{', start)
  let depth = 0
  let i = open
  while (i < source.length) {
    if (source[i] === '{') depth++
    else if (source[i] === '}') {
      depth--
      if (depth === 0) break
    }
    i++
  }
  const body = source.slice(open, i)
  const entries = []
  const re = /^  '([^']+)': \{/gm
  let m
  while ((m = re.exec(body))) {
    const slug = m[1]
    // Start past the entry's opening brace; count until its matching close.
    let d = 0
    let j = m.index + m[0].length
    while (j < body.length) {
      if (body[j] === '{') d++
      else if (body[j] === '}') {
        d--
        if (d < 0) {
          j++
          break
        }
      }
      j++
    }
    entries.push({ slug, text: body.slice(m.index, j) })
    re.lastIndex = j
  }
  return entries
}

function countOccurrences(text, field, suffix = ':') {
  const re = new RegExp(field.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*' + suffix, 'g')
  return (text.match(re) ?? []).length
}

function main() {
  const rows = []

  for (const file of files) {
    let source
    try {
      source = readFileSync(join(root, file), 'utf8')
    } catch {
      console.log(`  - skip (missing): ${file}`)
      continue
    }
    const entries = extractEntries(source)

    // Only roadmaps.ts uses a different shape (CustomRoadmap is object-literal
    // too, so treat as generic entries; skip non-SeoPage-like shapes).
    // Raw contents of the phase-list block are excluded from the "extra" file by slug filter below.

    for (const { slug, text } of entries) {
      const isSeoPage =
        countOccurrences(text, 'openingAnswer') > 0 ||
        countOccurrences(text, 'description') > 0
      if (!isSeoPage) continue

      const has = (field) => countOccurrences(text, field) > 0
      const hrefMatches = text.match(/\bhref: '([^']+)'/g)
      const hasCta = /cta:\s*\{/.test(text)
      const relatedCount = Math.max(0, (hrefMatches ?? []).length - (hasCta ? 1 : 0))

      const faqMatches = text.match(/\n\s+question:/g)
      const nFaqs = faqMatches ? faqMatches.length : 0

      const claims = CLAIMS.filter((c) => text.toLowerCase().includes(c.toLowerCase()))

      const modified = text.match(/modifiedTime:\s*'([^']+)'/)
      const published = text.match(/publishedTime:\s*'([^']+)'/)

      rows.push({
        file: file.split('/').pop(),
        slug,
        title: (text.match(/title:\s*'([^']+)'/) ?? [])[1] ?? slug,
        score: {
          directAnswer: scorePresent(has('openingAnswer')),
          intro: scorePresent(has('intro')),
          audience: scorePresent(has('audiences')),
          cta: scorePresent(hasCta),
          related: scoreCount(relatedCount),
          faqs: scoreCount(nFaqs),
          modified: scorePresent(has('modifiedTime')),
        },
        nFaqs,
        claims,
        modified,
        published,
      })
    }
  }

  const headers = ['File', 'Page', 'Answer', 'Intro', 'Audience', 'CTA', 'Related', 'FAQs', 'Fresh', 'Claims']
  const widths = headers.map((h) => h.length)
  const table = rows.map((r) => {
    const s = r.score
    return [
      r.file,
      r.slug,
      s.directAnswer,
      s.intro,
      s.audience,
      s.cta,
      s.related,
      s.faqs,
      s.modified,
      r.claims.length ? r.claims.join(';') : '',
    ]
  })
  for (const row of table) {
    row.forEach((v, i) => {
      const cell = String(v)
      if (cell.length > widths[i]) widths[i] = cell.length
    })
  }

  console.log('\n=== TechSkillHub — Content Health Audit ===\n')
  console.log(headers.map((h, i) => h.padEnd(widths[i])).join('  '))
  console.log(widths.map((w) => '-'.repeat(w)).join('  '))
  for (const row of table) {
    console.log(row.map((v, i) => String(v).padEnd(widths[i])).join('  '))
  }

  let issues = 0
  for (const r of rows) {
    const s = r.score
    if (s.directAnswer === 0) {
      console.log(`  ! ${r.slug}: missing openingAnswer (direct answer)`)
      issues++
    }
    if (s.cta === 0) {
      console.log(`  ! ${r.slug}: missing cta`)
      issues++
    }
    if (s.related < 2) {
      console.log(`  ! ${r.slug}: fewer than 2 related links`)
      issues++
    }
    if (s.faqs === 0) {
      console.log(`  ! ${r.slug}: no FAQs`)
      issues++
    }
    if (s.modified === 0) {
      console.log(`  ! ${r.slug}: no modifiedTime (freshness gate)`)
      issues++
    }
    if (r.claims.length) {
      console.log(`  ! ${r.slug}: unsupported claims -> ${r.claims.join(', ')}`)
      issues++
    }
  }

  console.log(`\nPages audited: ${rows.length} | Optional quality flags: ${issues}\n`)
  console.log('Scoring: 0 = missing, 1 = weak, 2 = acceptable, 3 = strong.')
  console.log('Claim checks are heuristics; verify flagged phrases in context.')
}

main()