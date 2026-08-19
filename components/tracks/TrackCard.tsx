import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Track } from '@/lib/tracks'
import { getTrackIcon } from '@/lib/icons'

interface TrackCardProps {
  track: Track
}

export function TrackCard({ track }: TrackCardProps) {
  const Icon = getTrackIcon(track.icon)

  return (
    <Link
      href={`/tracks/${track.slug}`}
      className="group flex flex-col gap-3 border border-border-default bg-surface p-5 no-underline transition-all"
      style={{ borderRadius: 'var(--radius-md)' }}
      aria-describedby={`track-tagline-${track.id}`}
    >
      <div className="flex items-start justify-between">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border"
          style={{ backgroundColor: `${track.colorHex}14`, borderColor: `${track.colorHex}33`, color: track.colorHex }}
          aria-hidden
        >
          <Icon size={18} />
        </div>
        <ArrowRight
          size={16}
          className="-translate-x-1 shrink-0 text-text-muted opacity-0 transition-all group-hover:translate-x-0 group-hover:text-teal group-hover:opacity-100"
          aria-hidden
        />
      </div>

      <div className="flex-1">
        <h3 className="text-[15px] font-semibold text-text-primary">{track.name}</h3>
        <p id={`track-tagline-${track.id}`} className="mt-1 max-w-none text-sm text-text-secondary">
          {track.tagline}
        </p>
      </div>

      <div className="flex items-center gap-2 border-t border-border-subtle pt-3 font-mono text-[0.65rem] uppercase tracking-wide text-text-muted">
        <span>{track.timeEstimate}</span>
        <span aria-hidden className="text-border-default">·</span>
        <span>{track.difficultyLabel}</span>
      </div>
    </Link>
  )
}