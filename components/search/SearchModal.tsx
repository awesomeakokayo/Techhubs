'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { Search, X } from 'lucide-react'
import { search, searchSync, groupResults, SearchResult, SearchResultType } from '@/lib/search'
import { trackOutboundClick, trackSearch } from '@/lib/analytics'

const TYPE_LABELS: Record<SearchResultType, string> = {
  track: 'Tracks',
  resource: 'Resources',
  project: 'Projects',
  roadmap: 'Roadmaps',
}

interface SearchModalProps {
  open: boolean
  onClose: () => void
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    if (!open) {
      setQuery('')
      setResults([])
      setSelected(0)
    }
  }, [open])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setSelected(0)
      return
    }
    setResults(searchSync(query))
    setSelected(0)
    let cancelled = false
    search(query).then((fuseResults) => {
      if (!cancelled) setResults(fuseResults)
    })
    return () => {
      cancelled = true
    }
  }, [query])

  useEffect(() => {
    if (!open || !query.trim()) return
    const timer = setTimeout(() => {
      const grouped = groupResults(results)
      const topCategory = (Object.keys(grouped) as SearchResultType[]).find(
        (key) => grouped[key].length > 0
      )
      trackSearch({
        path: window.location.pathname,
        query_length: query.trim().length,
        result_count: results.length,
        search_category: topCategory ?? 'none',
      })
    }, 400)
    return () => clearTimeout(timer)
  }, [open, query, results])

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelected((s) => Math.min(s + 1, results.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelected((s) => Math.max(s - 1, 0))
      }
      if (e.key === 'Enter' && results[selected]) {
        const url = results[selected].url
        if (url.startsWith('http')) {
          trackOutboundClick({
            path: window.location.pathname,
            resource_title: results[selected].title,
            resource_type: results[selected].type,
            outbound_url: url,
          })
          window.open(url, '_blank')
        }
        else window.location.href = url
        onClose()
      }
    },
    [open, onClose, results, selected]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [handleKey])

  useEffect(() => {
    const onGlobal = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (!open) {
          /* parent opens */
        }
      }
    }
    document.addEventListener('keydown', onGlobal)
    return () => document.removeEventListener('keydown', onGlobal)
  }, [open])

  if (!open) return null

  const grouped = groupResults(results)
  let flatIndex = -1

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center bg-black/70 p-4 pt-[10vh]" role="dialog" aria-modal="true" aria-label="Search">
      <button type="button" className="absolute inset-0" aria-label="Close search" onClick={onClose} />
      <div className="relative w-full max-w-2xl rounded-xl border border-border-default bg-elevated shadow-modal">
        <div className="flex items-center gap-3 border-b border-border-subtle px-4">
          <Search size={20} className="text-text-muted shrink-0" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tracks, resources, projects..."
            className="min-h-[56px] flex-1 bg-transparent text-lg text-text-primary outline-none placeholder:text-text-muted"
            autoFocus
            aria-label="Search"
          />
          <button type="button" onClick={onClose} className="flex h-11 w-11 items-center justify-center text-text-muted hover:text-text-primary" aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="max-h-[50vh] overflow-y-auto p-2">
          {query && results.length === 0 && (
            <p className="p-4 text-center text-text-secondary">No results found.</p>
          )}
          {(Object.keys(grouped) as SearchResultType[]).map((type) => {
            const items = grouped[type]
            if (!items.length) return null
            return (
              <div key={type} className="mb-2">
                <p className="px-3 py-2 font-mono text-xs uppercase tracking-wider text-text-muted">
                  {TYPE_LABELS[type]}
                </p>
                {items.map((item) => {
                  flatIndex++
                  const idx = flatIndex
                  const isExternal = item.url.startsWith('http')
                  const inner = (
                    <>
                      <span className="font-medium text-text-primary">{item.title}</span>
                      {item.trackName && (
                        <span className="ml-2 text-xs text-text-muted">{item.trackName}</span>
                      )}
                      <p className="mt-0.5 truncate text-sm text-text-secondary">{item.description}</p>
                    </>
                  )
                  return isExternal ? (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block rounded-lg px-3 py-2 no-underline ${selected === idx ? 'bg-teal/15' : 'hover:bg-overlay'}`}
                      onClick={onClose}
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link
                      key={item.id}
                      href={item.url}
                      className={`block rounded-lg px-3 py-2 no-underline ${selected === idx ? 'bg-teal/15' : 'hover:bg-overlay'}`}
                      onClick={onClose}
                    >
                      {inner}
                    </Link>
                  )
                })}
              </div>
            )
          })}
        </div>
        <p className="border-t border-border-subtle px-4 py-2 text-xs text-text-muted">
          ↑↓ navigate · Enter select · Esc close · ⌘K open
        </p>
      </div>
    </div>
  )
}
