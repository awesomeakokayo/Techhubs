'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, RotateCcw } from 'lucide-react'
import { useChecklistProgress } from '@/hooks/useChecklistProgress'

export interface ProjectItem {
  id: string
  title: string
  description: string
  level: 'beginner' | 'intermediate' | 'advanced'
  techTags: string[]
  trackId: string
  trackName: string
  trackSlug: string
}

type LevelFilter = 'all' | 'beginner' | 'intermediate' | 'advanced'

const LEVEL_FILTERS: { id: LevelFilter; label: string }[] = [
  { id: 'all', label: 'All levels' },
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
]

/**
 * ProjectsExplorer — client filter + status layer.
 *
 * Receives a lightweight project list from the server so the full catalogue is
 * never bundled into the client.
 */
export function ProjectsExplorer({ projects }: { projects: ProjectItem[] }) {
  const [level, setLevel] = useState<LevelFilter>('all')
  const [trackId, setTrackId] = useState('all')
  const { ready, projects: builtIds } = useChecklistProgress()

  const trackOptions = useMemo(() => {
    const seen = new Map<string, string>()
    projects.forEach((project) => {
      if (!seen.has(project.trackId)) seen.set(project.trackId, project.trackName)
    })
    const list: { id: string; name: string }[] = []
    seen.forEach((name, id) => list.push({ id, name }))
    list.sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [projects])

  const filtered = useMemo(
    () =>
      projects.filter(
        (project) =>
          (level === 'all' || project.level === level) &&
          (trackId === 'all' || project.trackId === trackId),
      ),
    [projects, level, trackId],
  )

  const hasFilters = level !== 'all' || trackId !== 'all'
  const reset = () => {
    setLevel('all')
    setTrackId('all')
  }

  return (
    <>
      {ready && builtIds.size > 0 && (
        <div className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl border border-border-subtle bg-elevated/50 px-4 py-3 text-sm">
          <span className="font-medium text-text-primary">
            You have marked {builtIds.size} {builtIds.size === 1 ? 'project' : 'projects'} built.
          </span>
          <span className="text-text-secondary">Keep building — projects are your proof of skill.</span>
        </div>
      )}

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by level">
          {LEVEL_FILTERS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setLevel(opt.id)}
              aria-pressed={level === opt.id}
              className={
                'min-h-[40px] rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ' +
                (level === opt.id
                  ? 'border-grape bg-grape text-text-inverse'
                  : 'border-border-default text-text-secondary hover:border-grape hover:text-grape')
              }
            >
              {opt.label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm text-text-secondary">
          <span className="sr-only">Filter by learning path</span>
          <select
            value={trackId}
            onChange={(event) => setTrackId(event.target.value)}
            className="min-h-[40px] w-full rounded-md border border-border-default bg-surface px-3 py-1.5 text-sm text-text-primary sm:w-auto"
          >
            <option value="all">All paths</option>
            {trackOptions.map((track) => (
              <option key={track.id} value={track.id}>
                {track.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => {
          const built = builtIds.has(project.id)
          return (
            <Link
              key={`${project.trackId}-${project.id}`}
              href={`/tracks/${project.trackSlug}#projects`}
              className="card group flex h-full flex-col no-underline"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="truncate font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">
                  {project.trackName}
                </span>
                {ready && built && <span className="badge badge-green shrink-0">Built</span>}
              </div>
              <h3 className="mt-3 font-display text-base font-semibold text-text-primary group-hover:text-grape">
                {project.title}
              </h3>
              <p className="mt-1 flex-1 text-sm leading-6 text-text-secondary">{project.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="badge badge-teal">{project.level}</span>
                {project.techTags.slice(0, 4).map((tag) => (
                  <span key={tag} className="badge border border-border-default text-text-muted">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-grape">
                Open in path <ArrowRight size={14} aria-hidden />
              </span>
            </Link>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          <p className="text-text-secondary">No projects match these filters.</p>
          {hasFilters && (
            <button type="button" onClick={reset} className="btn btn-secondary inline-flex items-center gap-2">
              <RotateCcw size={15} aria-hidden /> Clear filters
            </button>
          )}
        </div>
      )}
    </>
  )
}
