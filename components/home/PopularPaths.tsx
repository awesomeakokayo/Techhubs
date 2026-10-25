'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { getTrackIcon } from '@/lib/icons'

export interface PathItem {
  id: string
  slug: string
  name: string
  tagline: string
  category: string
  colorHex: string
  icon: string
  difficultyLabel: string
}

export interface PathCategory {
  id: string
  label: string
}

/**
 * PopularPaths — brand-tinted bento panel with real, filterable learning paths.
 *
 * The path list and categories are computed on the server from the live
 * catalogue and passed in, so no track data is bundled into the client.
 */
export function PopularPaths({
  paths,
  categories,
}: {
  paths: PathItem[]
  categories: PathCategory[]
}) {
  const [active, setActive] = useState('all')
  const chips = [{ id: 'all', label: 'All' }, ...categories]
  const filtered =
    active === 'all' ? paths.slice(0, 6) : paths.filter((p) => p.category === active).slice(0, 6)

  return (
    <section className="bg-void">
      <div className="container pb-14 md:pb-20">
        <div className="rounded-[28px] border border-border-default bg-tint-grape p-6 sm:p-10 lg:p-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="section-label">Popular learning paths</p>
              <h2 className="mt-3 font-display text-display-lg text-text-primary">
                Find the path that fits your goal.
              </h2>
              <p className="mt-3 text-text-secondary">
                Browse the directions most learners start with, then follow the roadmap
                stage by stage.
              </p>
            </div>
            <Link
              href="/paths"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-grape no-underline hover:text-grape-bright"
            >
              Browse all paths <ArrowUpRight size={15} className="shrink-0" />
            </Link>
          </div>

          <div
            className="mt-8 flex flex-wrap gap-2"
            role="group"
            aria-label="Filter learning paths by direction"
          >
            {chips.map((chip) => {
              const isActive = active === chip.id
              return (
                <button
                  key={chip.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActive(chip.id)}
                  className={
                    'min-h-[40px] rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ' +
                    (isActive
                      ? 'border-carbon bg-carbon text-white'
                      : 'border-border-default bg-surface text-text-secondary hover:border-grape hover:text-grape')
                  }
                >
                  {chip.label}
                </button>
              )
            })}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((path) => {
              const Icon = getTrackIcon(path.icon)
              return (
                <Link
                  key={path.id}
                  href={`/tracks/${path.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-border-subtle bg-surface p-5 no-underline transition-colors hover:border-grape/40"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ backgroundColor: path.colorHex + '18', color: path.colorHex }}
                    >
                      <Icon size={18} aria-hidden />
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="text-text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-grape"
                      aria-hidden
                    />
                  </div>
                  <h3 className="mt-4 font-display text-base font-semibold text-text-primary group-hover:text-grape">
                    {path.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 flex-1 text-sm text-text-secondary">{path.tagline}</p>
                  <span className="mt-4 font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">
                    {path.difficultyLabel}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
