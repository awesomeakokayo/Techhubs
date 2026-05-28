'use client'

import { Check } from 'lucide-react'
import { Project } from '@/lib/tracks'
import { toggleProject, getTrackProgress } from '@/lib/progress'
import { trackEvent } from '@/lib/analytics'

interface ProjectCardProps {
  trackId: string
  trackSlug?: string
  project: Project
  index: number
  onProgressChange?: () => void
}

export function ProjectCard({ trackId, trackSlug, project, index, onProgressChange }: ProjectCardProps) {
  const done = getTrackProgress(trackId).completedProjects.includes(project.id)

  return (
    <article
      className={`card ${done ? 'bg-green-500/5 border-green-500/30' : ''}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-xs text-text-muted">#{String(index + 1).padStart(2, '0')}</span>
        <button
          type="button"
          onClick={() => {
            toggleProject(trackId, project.id)
            trackEvent({
              event_name: 'project_mark_complete',
              track_slug: trackSlug ?? trackId,
              project_name: project.title,
            })
            onProgressChange?.()
          }}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md border transition-colors ${
            done
              ? 'border-green-500 bg-green-500/20 text-green-500'
              : 'border-border-default text-text-muted hover:border-teal hover:text-teal'
          }`}
          aria-label={done ? 'Mark as not built' : 'Mark as built'}
          aria-pressed={done}
        >
          {done && <Check size={16} strokeWidth={3} />}
        </button>
      </div>
      <h4 className={`mt-2 font-display font-semibold ${done ? 'line-through text-text-secondary' : ''}`}>
        {project.title}
      </h4>
      <p className="mt-1 text-sm text-text-secondary">{project.description}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.techTags.map((tag) => (
          <span key={tag} className="rounded-full bg-overlay px-2 py-0.5 font-mono text-[0.65rem] text-text-secondary">
            {tag}
          </span>
        ))}
      </div>
    </article>
  )
}
