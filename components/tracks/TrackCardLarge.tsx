import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { Track } from '@/lib/tracks'
import { getTrackIcon } from '@/lib/icons'
import { DifficultyBadge } from '@/components/ui/DifficultyBadge'

interface TrackCardLargeProps {
  track: Track
}

export function TrackCardLarge({ track }: TrackCardLargeProps) {
  const Icon = getTrackIcon(track.icon)

  return (
    <Link
      href={`/tracks/${track.slug}`}
      className="card card-track group flex h-full flex-col gap-4 no-underline"
      style={{ borderLeftColor: track.colorHex }}
      aria-label={`${track.name} — ${track.difficultyLabel} learning path`}
    >
      <div className="flex items-start gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border"
          style={{ backgroundColor: `${track.colorHex}14`, borderColor: `${track.colorHex}33`, color: track.colorHex }}
        >
          <Icon size={22} aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[0.65rem] font-medium uppercase tracking-widest text-text-muted">
            {track.category}
          </p>
          <h2 className="font-display text-lg font-semibold text-text-primary group-hover:text-grape">
            {track.name}
          </h2>
          <p className="mt-1 text-sm text-text-secondary">{track.tagline}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <DifficultyBadge difficulty={track.difficulty} label={track.difficultyLabel} />
        <span className="inline-flex items-center gap-1.5 text-xs text-text-secondary">
          <Clock size={11} className="text-text-muted" aria-hidden />
          <span>{track.timeEstimate}</span>
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {track.techStack.slice(0, 5).map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-border-subtle bg-elevated px-2.5 py-0.5 font-mono text-[0.65rem] text-text-secondary"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-auto flex justify-end border-t border-border-subtle pt-3">
        <span className="inline-flex items-center gap-1 text-sm font-medium text-grape transition-all group-hover:gap-2">
          Explore path <ArrowRight size={16} aria-hidden />
        </span>
      </div>
    </Link>
  )
}
