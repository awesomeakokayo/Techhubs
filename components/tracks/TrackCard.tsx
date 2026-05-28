import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { Track } from '@/lib/tracks'
import { getTrackIcon } from '@/lib/icons'
import { DifficultyBadge } from '@/components/ui/DifficultyBadge'

interface TrackCardProps {
  track: Track
}

export function TrackCard({ track }: TrackCardProps) {
  const Icon = getTrackIcon(track.icon)

  return (
    <Link
      href={`/tracks/${track.slug}`}
      className="card card-track group relative flex flex-col gap-3 no-underline"
      style={{ borderLeftColor: track.colorHex }}
      aria-describedby={`track-tagline-${track.id}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${track.colorHex}18`, color: track.colorHex }}
        >
          <Icon size={20} aria-hidden />
        </div>
        <ArrowRight
          size={18}
          className="shrink-0 text-text-muted opacity-0 transition-all duration-250 group-hover:translate-x-1 group-hover:text-teal group-hover:opacity-100"
          aria-hidden
        />
      </div>
      <div>
        <h3 className="font-display text-base font-semibold text-text-primary">{track.name}</h3>
        <p id={`track-tagline-${track.id}`} className="mt-1 text-sm text-text-secondary max-w-none">
          {track.tagline}
        </p>
      </div>
      <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-border-subtle pt-3">
        <DifficultyBadge difficulty={track.difficulty} label={track.difficultyLabel} />
        <span className="inline-flex items-center gap-1.5 text-xs text-text-secondary">
          <Clock size={11} className="text-text-muted animate-fade-in" aria-hidden />
          <span>{track.timeEstimate}</span>
        </span>
      </div>
    </Link>
  )
}
