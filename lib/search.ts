import { TRACKS } from './tracks'

export type SearchResultType = 'track' | 'resource' | 'project' | 'roadmap'

export interface SearchResult {
  id: string
  type: SearchResultType
  title: string
  description: string
  url: string
  trackName?: string
  trackSlug?: string
}

function buildIndex(): SearchResult[] {
  const items: SearchResult[] = []

  TRACKS.forEach((track) => {
    items.push({
      id: `track-${track.id}`,
      type: 'track',
      title: track.name,
      description: track.tagline,
      url: `/tracks/${track.slug}`,
      trackName: track.name,
      trackSlug: track.slug,
    })

    track.resources.forEach((r) => {
      items.push({
        id: r.id,
        type: 'resource',
        title: r.title,
        description: r.description,
        url: r.url,
        trackName: track.name,
        trackSlug: track.slug,
      })
    })

    track.projects.forEach((p) => {
      items.push({
        id: p.id,
        type: 'project',
        title: p.title,
        description: p.description,
        url: `/tracks/${track.slug}#projects`,
        trackName: track.name,
        trackSlug: track.slug,
      })
    })

    track.roadmap.forEach((s) => {
      items.push({
        id: `${track.id}-stage-${s.id}`,
        type: 'roadmap',
        title: `${track.name}: ${s.title}`,
        description: s.description,
        url: `/tracks/${track.slug}#roadmap`,
        trackName: track.name,
        trackSlug: track.slug,
      })
    })
  })

  return items
}

let indexCache: SearchResult[] | null = null
type FuseInstance = {
  search: (query: string, options?: { limit?: number }) => Array<{ item: SearchResult }>
}
let fuseInstance: FuseInstance | null = null

function getIndex(): SearchResult[] {
  if (!indexCache) indexCache = buildIndex()
  return indexCache
}

async function getFuse() {
  if (fuseInstance) return fuseInstance
  const Fuse = (await import('fuse.js')).default
  fuseInstance = new Fuse(getIndex(), {
    keys: ['title', 'description', 'trackName'],
    threshold: 0.35,
    includeScore: true,
  })
  return fuseInstance
}

export function searchSync(query: string, limit = 12): SearchResult[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return getIndex()
    .filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.trackName?.toLowerCase().includes(q) ?? false)
    )
    .slice(0, limit)
}

export async function search(query: string, limit = 12): Promise<SearchResult[]> {
  if (!query.trim()) return []
  try {
    const fuse = await getFuse()
    return fuse.search(query, { limit }).map((r) => r.item)
  } catch {
    return searchSync(query, limit)
  }
}

export function groupResults(results: SearchResult[]): Record<SearchResultType, SearchResult[]> {
  const groups: Record<SearchResultType, SearchResult[]> = {
    track: [],
    resource: [],
    project: [],
    roadmap: [],
  }
  results.forEach((r) => groups[r.type].push(r))
  return groups
}
