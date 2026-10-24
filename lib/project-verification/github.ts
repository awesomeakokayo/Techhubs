/**
 * GitHub artifact adapter.
 *
 * Validates a public repository and retrieves its actual content (metadata, file
 * tree, README and a bounded set of project-relevant source files) using the
 * official REST API. A validated URL is necessary evidence, not proof the work
 * is good — that is the evaluator's job.
 */

import { scanForSecrets, type SecretFinding } from './validation'

export interface GithubRepoRef {
  owner: string
  repo: string
  path?: string
  ref?: string
}

const OWNER_RE = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/
const REPO_RE = /^[A-Za-z0-9_.-]{1,100}$/
const RESERVED_OWNER = new Set(['features', 'about', 'pricing', 'login', 'signup', 'settings', 'orgs', 'topics', 'collections', 'sponsors', 'marketplace', 'apps', 'explore'])

interface GithubRepoApi {
  full_name?: string
  private?: boolean
  default_branch?: string
  size?: number
  pushed_at?: string
  description?: string | null
}

/** Parse a GitHub URL into a canonical repository reference, or null if invalid. */
export function parseGithubUrl(raw: string): GithubRepoRef | null {
  let url: URL
  try {
    url = new URL(raw.trim())
  } catch {
    return null
  }
  if (url.hostname.toLowerCase().replace(/^www\./, '') !== 'github.com') return null
  const segments = url.pathname.split('/').filter(Boolean)
  if (segments.length < 2) return null
  const owner = segments[0]
  const repo = segments[1].replace(/\.git$/, '')
  if (!OWNER_RE.test(owner) || !REPO_RE.test(repo)) return null
  if (RESERVED_OWNER.has(owner.toLowerCase())) return null
  const ref: GithubRepoRef = { owner, repo }
  if (segments.length >= 4 && (segments[2] === 'tree' || segments[2] === 'blob')) {
    ref.ref = segments[3]
    const path = segments.slice(4).join('/')
    if (path) ref.path = path
  }
  return ref
}

export type GithubInspectionKind = 'ok' | 'invalid' | 'inaccessible' | 'empty' | 'unavailable'

export interface GithubInspection {
  kind: GithubInspectionKind
  reason?: string
  fullName?: string
  canonicalUrl?: string
  defaultBranch?: string
  commitSha?: string
  sizeKb?: number
  pushedAt?: string
  description?: string
  readme?: string
  readmePresent: boolean
  tree: string[]
  selectedFiles: { path: string; content: string }[]
  secretFindings: SecretFinding[]
  hasRelevantSource: boolean
  warnings: string[]
}

export interface GithubInspectOptions {
  requiresReadme?: boolean
  requiresSourceInspection?: boolean
  token?: string
  fetchImpl?: typeof fetch
  maxFiles?: number
  maxFileBytes?: number
  maxTreeEntries?: number
}

const SOURCE_EXT_RE = /\.(ts|tsx|js|jsx|mjs|cjs|py|rb|go|java|kt|kts|dart|cs|cpp|c|h|rs|php|swift|scala|sol|vue|svelte|sql|sh|html|css|scss)$/i
const CONFIG_BASENAMES = new Set(['package.json', 'requirements.txt', 'pyproject.toml', 'cargo.toml', 'go.mod', 'pubspec.yaml', 'foundry.toml', 'hardhat.config.js', 'hardhat.config.ts', 'dockerfile', 'compose.yaml', 'docker-compose.yml'])
const SKIP_DIR_RE = /(^|\/)(node_modules|dist|build|\.next|vendor|\.git|coverage|__pycache__|\.venv|venv)(\/|$)/i
const LOCK_RE = /(package-lock\.json|yarn\.lock|pnpm-lock\.yaml|poetry\.lock|cargo\.lock)$/i
const DOC_RE = /^(readme|license|contributing)(\.|$)/i

/** True for actual project source/config files (not docs). */
function isSource(path: string): boolean {
  if (SKIP_DIR_RE.test(path) || LOCK_RE.test(path)) return false
  const base = path.split('/').pop()?.toLowerCase() ?? ''
  if (DOC_RE.test(base)) return false
  if (CONFIG_BASENAMES.has(base)) return true
  return SOURCE_EXT_RE.test(path)
}

/** True for files worth sending to the evaluator (source plus docs). */
function isSelectable(path: string): boolean {
  if (SKIP_DIR_RE.test(path) || LOCK_RE.test(path)) return false
  const base = path.split('/').pop()?.toLowerCase() ?? ''
  return CONFIG_BASENAMES.has(base) || DOC_RE.test(base) || SOURCE_EXT_RE.test(path)
}

function priority(path: string): number {
  const base = path.split('/').pop()?.toLowerCase() ?? ''
  if (CONFIG_BASENAMES.has(base)) return 0
  if (/test|spec/i.test(path)) return 2
  if (DOC_RE.test(base)) return 3
  if (SOURCE_EXT_RE.test(path)) return 1
  return 4
}

async function githubJson(fetchImpl: typeof fetch, path: string, token?: string): Promise<{ status: number; data: unknown }> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json', 'User-Agent': 'TechSkillHub-ArtifactVerifier/1.0' }
  if (token) headers.Authorization = `Bearer ${token}`
  const response = await fetchImpl(`https://api.github.com${path}`, { headers })
  if (response.status === 404) return { status: 404, data: null }
  if (!response.ok) return { status: response.status, data: null }
  return { status: response.status, data: await response.json().catch(() => null) }
}

/**
 * Validate and inspect a public repository. Never claims to verify a private
 * repository through an unauthenticated endpoint: a 404/403 is reported as
 * inaccessible, not as "not found" or "empty".
 */
export async function inspectGithubRepo(rawUrl: string, options: GithubInspectOptions = {}): Promise<GithubInspection> {
  const base: GithubInspection = {
    kind: 'invalid',
    readmePresent: false,
    tree: [],
    selectedFiles: [],
    secretFindings: [],
    hasRelevantSource: false,
    warnings: [],
  }
  const ref = parseGithubUrl(rawUrl)
  if (!ref) return { ...base, reason: 'That is not a valid GitHub repository URL.' }

  const doFetch = options.fetchImpl ?? fetch
  const token = options.token
  const maxFiles = options.maxFiles ?? 12
  const maxFileBytes = options.maxFileBytes ?? 8000
  const maxTreeEntries = options.maxTreeEntries ?? 4000
  const canonicalUrl = `https://github.com/${ref.owner}/${ref.repo}`

  let repoData: GithubRepoApi | null = null
  try {
    const res = await githubJson(doFetch, `/repos/${ref.owner}/${ref.repo}`, token)
    if (res.status === 404) {
      return { ...base, reason: 'That repository does not exist or is not public. Make sure the repository is public.' }
    }
    if (res.status === 403 || res.status === 429) {
      return { ...base, kind: 'unavailable', reason: 'GitHub is temporarily rate-limiting requests. Please try again shortly.' }
    }
    if (res.status !== 200 || !res.data) {
      return { ...base, kind: 'unavailable', reason: 'GitHub could not be reached right now. Please try again.' }
    }
    repoData = res.data as GithubRepoApi
  } catch {
    return { ...base, kind: 'unavailable', reason: 'GitHub could not be reached right now. Please try again.' }
  }

  if (!repoData || repoData.private === true) {
    return { ...base, reason: 'That repository is private. It must be public so an evaluator can inspect it.' }
  }
  if ((repoData.size ?? 0) === 0) {
    return { ...base, kind: 'empty', reason: 'That repository is empty. Push your project files before submitting.' }
  }

  const defaultBranch = repoData.default_branch || 'main'
  let commitSha: string | undefined
  try {
    const commits = await githubJson(doFetch, `/repos/${ref.owner}/${ref.repo}/commits/${encodeURIComponent(defaultBranch)}`, token)
    if (commits.status === 200 && commits.data) commitSha = (commits.data as { sha?: string }).sha
  } catch {
    /* fall through: commit sha is best-effort */
  }

  // File tree (bounded).
  let tree: string[] = []
  if (commitSha) {
    try {
      const treeRes = await githubJson(doFetch, `/repos/${ref.owner}/${ref.repo}/git/trees/${commitSha}?recursive=1`, token)
      if (treeRes.status === 200 && treeRes.data) {
        const entries = (treeRes.data as { tree?: { path: string; type: string }[] }).tree ?? []
        tree = entries.filter((e) => e.type === 'blob').map((e) => e.path).slice(0, maxTreeEntries)
      }
    } catch {
      /* tree is best-effort */
    }
  }

  // README (raw).
  let readme: string | undefined
  try {
    const headers: Record<string, string> = { Accept: 'application/vnd.github.raw', 'User-Agent': 'TechSkillHub-ArtifactVerifier/1.0' }
    if (token) headers.Authorization = `Bearer ${token}`
    const response = await doFetch(`https://api.github.com/repos/${ref.owner}/${ref.repo}/readme`, { headers })
    if (response.ok) readme = (await response.text()).slice(0, 16000)
  } catch {
    /* readme is best-effort */
  }
  const readmePresent = Boolean(readme && readme.trim().length > 0)

  const hasRelevantSource = tree.some(isSource)
  const warnings: string[] = []
  if (options.requiresReadme && !readmePresent) {
    warnings.push('No README was found in the repository. Add a README to explain and document the project.')
  }
  if (options.requiresSourceInspection && !hasRelevantSource) {
    return { ...base, kind: 'empty', reason: 'The repository does not appear to contain project source files. Add your actual implementation.' }
  }

  // Select relevant files (bounded) and fetch each from the pinned commit.
  const selectedPaths = tree
    .filter(isSelectable)
    .sort((a, b) => priority(a) - priority(b) || a.length - b.length)
    .slice(0, maxFiles)

  const selectedFiles: { path: string; content: string }[] = []
  for (const path of selectedPaths) {
    try {
      const url = `https://raw.githubusercontent.com/${ref.owner}/${ref.repo}/${commitSha ?? defaultBranch}/${path}`
      const response = await doFetch(url, { headers: { 'User-Agent': 'TechSkillHub-ArtifactVerifier/1.0' } })
      if (!response.ok) continue
      const text = (await response.text()).slice(0, maxFileBytes)
      selectedFiles.push({ path, content: text })
    } catch {
      /* skip unreadable file */
    }
  }

  // Secret scan over README + selected files. Never retain matched values.
  const secretFindings = scanForSecrets(`${readme ?? ''}\n${selectedFiles.map((f) => f.content).join('\n')}`)

  return {
    kind: 'ok',
    fullName: repoData.full_name ?? `${ref.owner}/${ref.repo}`,
    canonicalUrl,
    defaultBranch,
    commitSha,
    sizeKb: repoData.size,
    pushedAt: repoData.pushed_at,
    description: repoData.description ?? undefined,
    readme,
    readmePresent,
    tree,
    selectedFiles,
    secretFindings,
    hasRelevantSource,
    warnings,
  }
}
