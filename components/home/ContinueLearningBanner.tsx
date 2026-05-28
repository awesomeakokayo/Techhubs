'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { TRACKS } from '@/lib/tracks'
import { getInProgressTracks, getTrackPercent } from '@/lib/progress'
import { getTrackIcon } from '@/lib/icons'

export function ContinueLearningBanner() {
  const [ids, setIds] = useState<string[]>([])

  useEffect(() => {
    setIds(getInProgressTracks().slice(0, 3))
  }, [])

  if (!ids.length) return null

  const tracks = ids.map((id) => TRACKS.find((t) => t.id === id)).filter(Boolean)

  return (
    <section className="section pt-0">
      <div className="container">
        <div className="rounded-2xl border border-border-default border-l-[3px] border-l-teal bg-elevated p-6 md:p-8">
          <h2 className="font-display text-xl font-bold">Welcome back! Continue where you left off.</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tracks.map((track) => {
              if (!track) return null
              const Icon = getTrackIcon(track.icon)
              const pct = getTrackPercent(track.id, track.roadmap.length, track.projects.length)
              return (
                <Link
                  key={track.id}
                  href={`/tracks/${track.slug}`}
                  className="card flex items-center gap-4 no-underline"
                  style={{ borderLeftColor: track.colorHex, borderLeftWidth: 3 }}
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${track.colorHex}18`, color: track.colorHex }}
                  >
                    <Icon size={20} aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-display font-semibold text-text-primary truncate">{track.name}</p>
                    <p className="text-xs text-teal">{pct}% complete</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
