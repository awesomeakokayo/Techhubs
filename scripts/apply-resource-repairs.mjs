/**
 * Apply verified resource repairs to `lib/tracks.ts`.
 *
 * Each entry below was confirmed broken by `scripts/audit-resources.mjs --live`
 * and replaced with a destination that was itself verified (HTTP 200, or a
 * YouTube oEmbed 200 for video links) before being recorded here.
 *
 * The script is idempotent: it only rewrites a field when the current value
 * differs from the target, so re-running it is safe and produces no diff.
 *
 * Usage: node scripts/apply-resource-repairs.mjs [--dry]
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const tracksPath = join(root, 'lib', 'tracks.ts')
const dry = process.argv.includes('--dry')

/** Extra fields are optional; `url`-only entries keep the existing title/type. */
const REPAIRS = {
  // ── Confirmed removed YouTube videos (oEmbed 404) ──────────────────────
  'fe-0a': { title: 'Learn CSS', description: 'Google web.dev free CSS course: selectors, the box model, layout, flexbox, grid, and responsive design, with hands-on challenges.', url: 'https://web.dev/learn/css', type: 'docs', source: 'web.dev (Google)' },
  'be-0b': { title: 'Introduction to Node.js', description: 'Official Node.js getting-started guide: install Node, run your first script, and understand the runtime.', url: 'https://nodejs.org/en/learn/getting-started/introduction-to-nodejs', type: 'docs', source: 'Node.js' },
  'ux-1': { title: 'The Definition of User Experience (UX)', description: 'Nielsen Norman Group defines UX and distinguishes it from UI, usability, and usability testing.', url: 'https://www.nngroup.com/articles/definition-user-experience/', type: 'docs', source: 'Nielsen Norman Group' },
  'ux-4': { title: 'The Futur — Design Education Channel', description: 'Practical UX, UI, and brand design lessons from a well-established design education channel.', url: 'https://www.youtube.com/@thefutur', type: 'video', source: 'The Futur' },
  'qa-1': { title: 'ISTQB — Certified Tester Syllabus', description: 'The International Software Testing Qualifications Board publishes the authoritative testing syllabus and glossary used worldwide.', url: 'https://www.istqb.org/', type: 'docs', source: 'ISTQB' },
  'qa-8': { title: 'Playwright — Official YouTube Channel', description: 'Official Playwright channel with walkthroughs of end-to-end browser testing, tracing, and CI integration.', url: 'https://www.youtube.com/@Playwrightdev', type: 'video', source: 'Microsoft' },
  'dv-0': { title: 'Docker Overview', description: 'Official Docker introduction to containers, images, and how Docker fits into a development workflow.', url: 'https://docs.docker.com/get-started/docker-overview/', type: 'docs', source: 'Docker' },
  'dv-0b': { title: 'Docker Get Started', description: 'Official step-by-step guide to building and running your first container, then a multi-container app.', url: 'https://docs.docker.com/get-started/', type: 'docs', source: 'Docker' },
  'mob-9': { title: 'React Native Express', description: 'Free, concise interactive guide to React Native core concepts, components, and layout.', url: 'https://www.reactnative.express/', type: 'docs', source: 'React Native Express' },
  'vid-9': { title: 'StudioBinder — Filmmaking & Storytelling Blog', description: 'Practical video storytelling, pacing, and filmmaking technique guides with visual examples.', url: 'https://www.studiobinder.com/blog/', type: 'docs', source: 'StudioBinder' },
  'yt-9': { title: 'YouTube Creators — Get Started', description: 'Official YouTube Creators hub covering starting a channel, formats, and platform fundamentals.', url: 'https://www.youtube.com/creators/get-started/', type: 'docs', source: 'YouTube' },
  'tw-5': { title: 'Microsoft Writing Style Guide', description: 'Microsoft official style guide for clear, consistent technical and UI writing.', url: 'https://learn.microsoft.com/en-us/style-guide/welcome/', type: 'docs', source: 'Microsoft' },
  'tw-7': { title: "A Beginner's Guide to Writing Docs", description: 'Write the Docs practical guide to planning, structuring, and maintaining developer documentation.', url: 'https://www.writethedocs.org/guide/writing/beginners-guide-to-docs/', type: 'docs', source: 'Write the Docs' },
  'cr-0a': { title: 'Introduction to Ethereum', description: 'The Ethereum Foundation explains blockchain fundamentals: accounts, transactions, and smart contracts.', url: 'https://ethereum.org/en/developers/docs/intro-to-ethereum/', type: 'docs', source: 'Ethereum Foundation' },
  'pm-5': { title: 'Jira — Getting Started Guide', description: 'Official Atlassian guide to Jira: creating a project, backlog, boards, and tracking work in sprints.', url: 'https://www.atlassian.com/software/jira/guides/getting-started/introduction', type: 'docs', source: 'Atlassian' },

  // ── Confirmed relocated or removed non-video resources ─────────────────
  'fe-2': { url: 'https://www.theodinproject.com/paths/foundations/courses/foundations' },
  'qa-0a': { title: 'How to Write Test Cases', description: 'Software Testing Help guide to writing clear test cases, with templates and worked examples.', url: 'https://www.softwaretestinghelp.com/how-to-write-test-cases-for-a-given-scenario/', type: 'docs', source: 'Software Testing Help' },
  'dv-8': { url: 'https://grafana.com/docs/grafana/latest/getting-started/' },
  'vid-4': { title: 'CapCut Video Tools', description: 'CapCut official editing tools and templates for mobile and desktop video production.', url: 'https://www.capcut.com/tools', type: 'tool', source: 'CapCut' },
  'vid-8': { url: 'https://www.youtube.com/creators/' },
  'yt-7': { url: 'https://support.google.com/youtube/answer/72857' },
  'yt-8': { title: 'Affiliate Marketing Guide', description: 'Ahrefs practical guide to affiliate marketing: how it works, programs, and content strategies.', url: 'https://ahrefs.com/blog/affiliate-marketing/', type: 'docs', source: 'Ahrefs' },
  'mkt-6': { title: 'Ahrefs Blog', description: 'Data-driven SEO and digital marketing guides, tutorials, and case studies from Ahrefs.', url: 'https://ahrefs.com/blog/', type: 'docs', source: 'Ahrefs' },
  'mkt-7': { title: 'Google Skillshop — Ads & Analytics Training', description: "Google's official free training and certifications for Google Ads and Analytics.", url: 'https://skillshop.withgoogle.com/', type: 'docs', source: 'Google' },
  'mkt-8': { url: 'https://support.google.com/analytics/answer/10089681' },
  'nc-2': { url: 'https://bubble.io/academy' },
  'cr-0b': { title: 'OpenZeppelin ERC-20 Guide', description: 'OpenZeppelin guide to ERC-20 tokens: the standard, the interface, and a vetted implementation.', url: 'https://docs.openzeppelin.com/contracts/5.x/erc20', type: 'docs', source: 'OpenZeppelin' },
  'cr-21': { title: 'MetaMask Learn', description: 'MetaMask educational hub on wallets, keys, seed phrases, and crypto security basics.', url: 'https://metamask.io/learn', type: 'docs', source: 'MetaMask' },
  'cr-22': { title: 'Ethereum Wallets Guide', description: 'The Ethereum Foundation explains wallets, accounts, keys, and how to store crypto safely.', url: 'https://ethereum.org/en/wallets/', type: 'docs', source: 'Ethereum Foundation' },
  'pm-9': { title: 'Jira Project Templates', description: 'Official Atlassian Jira templates for project management, sprints, and kanban boards.', url: 'https://www.atlassian.com/software/jira/templates', type: 'tool', source: 'Atlassian' },
  'pm-11': { url: 'https://www.projectmanager.com/guides/status-report' },
  'prd-11': { title: 'User Stories', description: 'Atlassian guide to writing user stories, acceptance criteria, and story mapping for agile teams.', url: 'https://www.atlassian.com/agile/project-management/user-stories', type: 'docs', source: 'Atlassian' },
  'prd-12': { title: 'Product Requirements Document Guide', description: 'ProductPlan guide to product requirements documents: purpose, structure, and worked examples.', url: 'https://www.productplan.com/glossary/product-requirements-document', type: 'docs', source: 'ProductPlan' },
  'son-10': { url: 'https://docs.sonicsvm.org/' },
  'son-11': { url: 'https://www.sonicsvm.org/' },
  'ai-a3': { url: 'https://academy.make.com/' },

  // ── Duplicate resources replaced with distinct, relevant alternatives ──
  'vid-3': { title: 'DaVinci Resolve — Color, VFX & Audio Tools', description: 'Blackmagic Design product page covering DaVinci Resolve color grading, Fusion VFX, and Fairlight audio.', url: 'https://www.blackmagicdesign.com/products/davinciresolve', type: 'docs', source: 'Blackmagic Design' },
  'pm-4': { title: 'Project Management Basics', description: 'Atlassian introduction to project management: planning, tracking, and delivering projects with agile methods.', url: 'https://www.atlassian.com/agile/project-management', type: 'docs', source: 'Atlassian' },

  // ── Confirmed-defunct resources (DeFi Pulse now resolves to a parked domain) ──
  'cr-18': { title: 'DefiLlama', description: 'Track Total Value Locked (TVL) across chains and protocols with free, real-time DeFi data and dashboards.', url: 'https://defillama.com', type: 'tool', source: 'DefiLlama' },
}

const source = readFileSync(tracksPath, 'utf8')

function findObjectBounds(text, id) {
  const idPattern = new RegExp(`id:\\s*(['"])${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\1`)
  const match = idPattern.exec(text)
  if (!match) return null
  // Walk backward to the nearest '{' that opens this object.
  let open = match.index
  while (open >= 0 && text[open] !== '{') open -= 1
  if (open < 0) return null
  // Match braces forward to find the object end, respecting string literals.
  let depth = 0
  let inString = null
  for (let i = open; i < text.length; i += 1) {
    const char = text[i]
    if (inString) {
      if (char === '\\') { i += 1; continue }
      if (char === inString) inString = null
      continue
    }
    if (char === "'" || char === '"' || char === '`') { inString = char; continue }
    if (char === '{') depth += 1
    else if (char === '}') {
      depth -= 1
      if (depth === 0) return { start: open, end: i + 1 }
    }
  }
  return null
}

function replaceField(objectText, field, value) {
  const pattern = new RegExp(`(${field}:\\s*)(['"])(?:\\\\.|(?!\\2)[^\\\\])*\\2`)
  const quoted = `'${String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
  const match = objectText.match(pattern)
  if (!match) return { text: objectText, changed: false }
  const current = match[0]
  const quotedPattern = /(['"])(?:\\.|(?!\1)[^\\])*\1/
  const next = current.replace(quotedPattern, () => quoted)
  const updated = objectText.replace(current, () => next)
  return { text: updated, changed: next !== current }
}

let working = source
let changedFields = 0
const problems = []

for (const [id, fields] of Object.entries(REPAIRS)) {
  const bounds = findObjectBounds(working, id)
  if (!bounds) {
    problems.push(`resource ${id} not found`)
    continue
  }
  let objectText = working.slice(bounds.start, bounds.end)
  for (const [field, value] of Object.entries(fields)) {
    const result = replaceField(objectText, field, value)
    if (result.changed) changedFields += 1
    objectText = result.text
  }
  working = working.slice(0, bounds.start) + objectText + working.slice(bounds.end)
}

if (problems.length) {
  console.error('Repair problems:')
  for (const p of problems) console.error(`  - ${p}`)
  process.exit(1)
}

if (!dry && working !== source) writeFileSync(tracksPath, working, 'utf8')
console.log(`${dry ? '[dry run] ' : ''}Resource repairs: ${Object.keys(REPAIRS).length} resources processed, ${changedFields} field(s) updated.`)
