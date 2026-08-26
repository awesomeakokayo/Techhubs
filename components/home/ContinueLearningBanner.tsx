'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { TRACKS } from '@/lib/tracks'
import { getInProgressTracks, getTrackPercent, getTrackProgress } from '@/lib/progress'
import { getTrackIcon } from '@/lib/icons'

export function ContinueLearningBanner() {
  const [ids, setIds] = useState<string[]>([])

  useEffect(() => {
    setIds(getInProgressTracks().slice(0, 3))
  }, [])

  if (!ids.length) return null

  const tracks = ids.map((id) => TRACKS.find((t) => t.id === id)).filter(Boolean)

  return (
    <section className="pt-8">
      <div className="container">
        <div className="border border-border-default border-l-[3px] border-l-teal bg-surface p-6 md:p-8" style={{ borderRadius: 'var(--radius-md)' }}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-editorial text-xl">
              Welcome back. Continue where you left off.
            </h2>
            <Link href="/tracks" className="inline-flex items-center gap-1 text-sm font-semibold text-teal no-underline hover:text-teal-bright">
              All tracks <ArrowRight size={14} className="shrink-0" />
            </Link>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tracks.map((track) => {
              if (!track) return null
              const Icon = getTrackIcon(track.icon)
              const tp = getTrackProgress(track.id)
              const pct = getTrackPercent(track.id, track.roadmap.length, track.projects.length)
              return (
                <Link key={track.id} href={`/tracks/${track.slug}`} className="group flex items-center gap-4 border border-border-default bg-surface px-4 py-3.5 no-underline transition-colors hover:border-teal/40" style={{ borderRadius: 'var(--radius-md)' }}>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border" style={{ backgroundColor: `${track.colorHex}14`, borderColor: `${track.colorHex}33`, color: track.colorHex }} aria-hidden>
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-sm font-semibold text-text-primary">{track.name}</p>
                    <p className="font-mono text-[0.65rem] uppercase tracking-widest text-teal">{pct}% complete</p>
                  </div>
                  <ArrowRight size={14} className="shrink-0 text-text-muted transition-all group-hover:translate-x-0.5 group-hover:text-teal" aria-hidden />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
