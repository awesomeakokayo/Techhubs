'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { search, searchSync, groupResults, SearchResult, SearchResultType } from '@/lib/search'
import { trackOutboundClick, trackSearch } from '@/lib/analytics'

const TYPE_LABELS: Record<SearchResultType, string> = {
  track: 'Learning paths',
  resource: 'Resources',
  project: 'Projects',
  roadmap: 'Roadmaps',
}

interface SearchModalProps {
  open: boolean
  onClose: () => void
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selected, setSelected] = useState(0)
  const panelRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) {
      setQuery('')
      setResults([])
      setSelected(0)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    const previousFocus = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    const timer = window.setTimeout(() => inputRef.current?.focus(), 0)
    return () => {
      document.body.style.overflow = previousOverflow
      window.clearTimeout(timer)
      if (previousFocus?.isConnected) previousFocus.focus()
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
    (event: KeyboardEvent) => {
      if (!open) return
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (document.activeElement !== inputRef.current) return

      const grouped = groupResults(results)
      const flat = (Object.keys(grouped) as SearchResultType[]).flatMap(
        (type) => grouped[type]
      )

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setSelected((current) =>
          flat.length > 0 ? Math.min(current + 1, flat.length - 1) : 0
        )
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault()
        setSelected((current) => Math.max(current - 1, 0))
      }
      if (event.key === 'Enter') {
        const item = flat[selected]
        if (!item) return
        event.preventDefault()
        if (item.url.startsWith('http')) {
          trackOutboundClick({
            path: window.location.pathname,
            resource_title: item.title,
            resource_type: item.type,
            outbound_url: item.url,
          })
          window.open(item.url, '_blank', 'noopener,noreferrer')
        } else {
          router.push(item.url)
        }
        onClose()
      }
    },
    [open, onClose, results, selected, router]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [handleKey])

  useEffect(() => {
    if (!open) return
    const node = panelRef.current?.querySelector<HTMLElement>(
      `[data-search-index="${selected}"]`
    )
    node?.scrollIntoView({ block: 'nearest' })
  }, [open, selected])

  function handleDialogKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'Tab' || !panelRef.current) return
    const focusable = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled])'
      )
    ).filter((node) => node.tabIndex >= 0 && node.offsetParent !== null)

    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  if (!open) return null

  const trimmedQuery = query.trim()
  const grouped = groupResults(results)
  let flatIndex = -1

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center p-4 pt-[8vh] sm:pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Search the catalogue"
    >
      <button
        type="button"
        tabIndex={-1}
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        aria-label="Close search"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        onKeyDown={handleDialogKeyDown}
        className="relative w-full max-w-2xl overflow-hidden rounded-[20px] border border-hairline bg-paper shadow-[0_24px_80px_rgba(34,34,34,0.22)]"
      >
        <div className="border-b border-hairline bg-white px-5 pb-4 pt-4">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink/70">
              Search the catalogue
            </p>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-md text-ink/70 transition-colors hover:bg-brand/5 hover:text-ink"
              aria-label="Close search"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-2 flex items-center gap-3 rounded-xl border border-hairline bg-paper px-3 py-2 transition-colors focus-within:border-brand focus-within:ring-2 focus-within:ring-brand">
            <Search size={18} className="shrink-0 text-brand" aria-hidden />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search paths, resources, projects…"
              className="search-modal-input min-w-0 flex-1 bg-transparent py-0.5 font-display text-xl text-ink outline-none placeholder:text-ink/70 focus:outline-none focus-visible:outline-none"
              aria-label="Search the catalogue"
              autoComplete="off"
              spellCheck={false}
            />
            <kbd className="hidden rounded border border-hairline px-1.5 py-0.5 font-mono text-[0.6rem] text-ink/70 sm:inline-flex">
              ESC
            </kbd>
          </div>
        </div>

        <div className="max-h-[56vh] overflow-y-auto p-2">
          {!trimmedQuery ? (
            <div className="px-3 py-10 text-center">
              <p className="font-display text-base font-semibold text-ink">
                Find your next step.
              </p>
              <p className="mt-1 text-sm text-ink/70">
                Search the live catalogue: paths, resources, projects and roadmaps.
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="px-3 py-10 text-center">
              <p className="font-display text-base font-semibold text-ink">
                No results for “{trimmedQuery}”.
              </p>
              <p className="mt-1 text-sm text-ink/70">
                Try a path, resource, project or roadmap name.
              </p>
            </div>
          ) : null}

          {trimmedQuery &&
            (Object.keys(grouped) as SearchResultType[]).map((type) => {
              const items = grouped[type]
              if (!items.length) return null
              return (
                <div key={type} className="mb-1">
                  <p className="px-3 pb-1 pt-2 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink/70">
                    {TYPE_LABELS[type]}
                  </p>
                  {items.map((item) => {
                    flatIndex += 1
                    const idx = flatIndex
                    const isExternal = item.url.startsWith('http')
                    const inner = (
                      <>
                        <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                          <span
                            className={
                              'font-display text-[0.95rem] font-semibold ' +
                              (selected === idx ? 'text-brand' : 'text-ink')
                            }
                          >
                            {item.title}
                          </span>
                          {item.trackName && item.trackName !== item.title ? (
                            <span className="hidden font-mono text-[0.6rem] uppercase tracking-[0.08em] text-ink/70 sm:inline">
                              {item.trackName}
                            </span>
                          ) : null}
                        </span>
                        <span className="mt-0.5 block truncate text-sm text-ink/70">
                          {item.description}
                        </span>
                      </>
                    )

                    const className =
                      'block rounded-xl px-3 py-2.5 no-underline transition-colors ' +
                      (selected === idx ? 'bg-brand/[0.08]' : 'hover:bg-brand/[0.04]')

                    return isExternal ? (
                      <a
                        key={item.id}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-search-index={idx}
                        className={className}
                        onClick={() => {
                          trackOutboundClick({
                            path: window.location.pathname,
                            resource_title: item.title,
                            resource_type: item.type,
                            outbound_url: item.url,
                          })
                          onClose()
                        }}
                      >
                        {inner}
                      </a>
                    ) : (
                      <Link
                        key={item.id}
                        href={item.url}
                        data-search-index={idx}
                        className={className}
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

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-hairline px-5 py-3">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-ink/70">
            ↑↓ navigate · Enter select · Esc close
          </p>
          <p
            className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-ink/70"
            aria-live="polite"
          >
            {trimmedQuery
              ? `${results.length} ${results.length === 1 ? 'result' : 'results'}`
              : 'Live catalogue search'}
          </p>
        </div>
      </div>
    </div>
  )
}
