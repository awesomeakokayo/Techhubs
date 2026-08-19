import { Clock, BarChart3 } from 'lucide-react'

interface TrackMetaProps {
  difficulty?: string
  duration?: string
  className?: string
}

export function TrackMeta({ difficulty, duration, className = '' }: TrackMetaProps) {
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[0.65rem] uppercase tracking-widest text-text-muted ${className}`}>
      {difficulty && (
        <span className="inline-flex items-center gap-1.5">
          <BarChart3 size={12} className="text-teal" aria-hidden />
          {difficulty}
        </span>
      )}
      {duration && (
        <span className="inline-flex items-center gap-1.5">
          <Clock size={12} className="text-teal" aria-hidden />
          {duration}
        </span>
      )}
    </div>
  )
}
