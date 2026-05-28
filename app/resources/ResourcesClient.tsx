'use client'

import { useMemo, useState } from 'react'
import { TRACKS, ResourceType } from '@/lib/tracks'
import { FEATURED_RESOURCES } from '@/lib/site-content'
import { PageHeader } from '@/components/ui/PageHeader'
import { CategoryFilter } from '@/components/ui/CategoryFilter'
import { ResourceItem } from '@/components/tracks/ResourceItem'

function filterByQuery(
  items: typeof allResources,
  query: string
) {
  const q = query.trim().toLowerCase()
  if (!q) return items
  return items.filter(
    (r) =>
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.trackName.toLowerCase().includes(q) ||
      r.source.toLowerCase().includes(q)
  )
}

const TYPE_OPTIONS = [
  { id: 'all', label: 'All Types' },
  { id: 'docs', label: 'Docs' },
  { id: 'video', label: 'Video' },
  { id: 'practice', label: 'Practice' },
  { id: 'book', label: 'Books' },
  { id: 'tool', label: 'Tools' },
  { id: 'community', label: 'Community' },
]

const allResources = TRACKS.flatMap((track) =>
  track.resources.map((r) => ({ ...r, trackName: track.name, trackId: track.id }))
)

const trackOptions = [
  { id: 'all', label: 'All Tracks' },
  ...TRACKS.map((t) => ({ id: t.id, label: t.name })),
]

export function ResourcesClient() {
  const [query, setQuery] = useState('')
  const [trackFilter, setTrackFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [view, setView] = useState<'cards' | 'table'>('cards')

  const filtered = useMemo(() => {
    const byFilters = allResources.filter((r) => {
      const trackOk = trackFilter === 'all' || r.trackId === trackFilter
      const typeOk = typeFilter === 'all' || r.type === (typeFilter as ResourceType)
      return trackOk && typeOk
    })
    return filterByQuery(byFilters, query)
  }, [query, trackFilter, typeFilter])

  return (
    <div className="section pt-28">
      <div className="container">
        <PageHeader
          title="Resource Index"
          subtitle="300+ curated links across every track — all verified and free where noted."
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Resources' }]}
        />

        <section className="mt-8">
          <h2 className="font-display text-xl font-bold">Featured — Essential 10</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_RESOURCES.map((r) => (
              <a
                key={r.url}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card border-teal/30 bg-teal/5 no-underline hover:border-teal"
              >
                <h3 className="font-display font-semibold text-teal">{r.title}</h3>
                <p className="mt-1 text-sm text-text-secondary">{r.description}</p>
              </a>
            ))}
          </div>
        </section>

        <div className="mt-12">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all resources..."
            className="w-full min-h-[52px] rounded-xl border border-border-default bg-surface px-4 text-lg text-text-primary outline-none focus:border-teal"
            aria-label="Search resources"
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <CategoryFilter options={trackOptions.slice(0, 6)} active={trackFilter} onChange={setTrackFilter} />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setView('cards')}
              className={`min-h-[44px] rounded-full px-4 text-xs font-mono uppercase ${view === 'cards' ? 'bg-teal text-text-inverse' : 'border border-border-default text-text-secondary'}`}
            >
              Cards
            </button>
            <button
              type="button"
              onClick={() => setView('table')}
              className={`min-h-[44px] rounded-full px-4 text-xs font-mono uppercase ${view === 'table' ? 'bg-teal text-text-inverse' : 'border border-border-default text-text-secondary'}`}
            >
              Table
            </button>
          </div>
        </div>
        <CategoryFilter options={TYPE_OPTIONS} active={typeFilter} onChange={setTypeFilter} className="mt-3" />

        <p className="mt-4 text-sm text-text-muted">{filtered.length} resources</p>

        {view === 'table' ? (
          <div className="mt-6 overflow-x-auto rounded-xl border border-border-default">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border-subtle bg-surface">
                <tr>
                  <th className="p-4 font-mono text-xs uppercase text-text-muted">Resource</th>
                  <th className="p-4 font-mono text-xs uppercase text-text-muted">Type</th>
                  <th className="p-4 font-mono text-xs uppercase text-text-muted">Track</th>
                  <th className="p-4 font-mono text-xs uppercase text-text-muted">Free?</th>
                  <th className="p-4 font-mono text-xs uppercase text-text-muted">Link</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-b border-border-subtle hover:bg-elevated">
                    <td className="p-4 font-medium text-text-primary">{r.title}</td>
                    <td className="p-4 text-text-secondary">{r.type}</td>
                    <td className="p-4 text-text-secondary">{r.trackName}</td>
                    <td className="p-4">
                      <span className={`badge ${r.free ? 'badge-green' : 'badge-amber'}`}>
                        {r.free ? 'FREE' : 'PAID'}
                      </span>
                    </td>
                    <td className="p-4">
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">
                        Open ↗
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {filtered.map((r) => (
              <ResourceItem key={r.id} resource={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
