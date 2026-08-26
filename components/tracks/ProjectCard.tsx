'use client'

import { useRef, useState } from 'react'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { Project } from '@/lib/tracks'
import { toggleProject, getTrackProgress, syncTrackProgressToServer } from '@/lib/progress'
import { trackEvent } from '@/lib/analytics'
import { AI_PROJECT_BRIEFS } from '@/lib/ai-project-briefs'

interface ProjectCardProps {
  trackId: string
  trackSlug?: string
  project: Project
  index: number
  onProgressChange?: () => void
}

export function ProjectCard({ trackId, trackSlug, project, index, onProgressChange }: ProjectCardProps) {
  const done = getTrackProgress(trackId).completedProjects.includes(project.id)
  const togglingRef = useRef(false)
  const [briefOpen, setBriefOpen] = useState(false)
  const [confirmed, setConfirmed] = useState(done)
  const brief = trackId.startsWith('ai-') ? AI_PROJECT_BRIEFS[project.id] : undefined

  const syncCompletion = async () => {
    await syncTrackProgressToServer(trackId)
  }

  const completeProject = () => {
    if (togglingRef.current || !confirmed) return
    togglingRef.current = true
    toggleProject(trackId, project.id)
    void syncCompletion()
    trackEvent({
      event_name: 'project_mark_complete',
      track_slug: trackSlug ?? trackId,
      project_name: project.title,
    })
    onProgressChange?.()
    setTimeout(() => { togglingRef.current = false }, 300)
  }

  return (
    <article className={`card ${done ? 'bg-green-500/5 border-green-500/30' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-xs text-text-muted">#{String(index + 1).padStart(2, '0')}</span>
        <button
          type="button"
          onClick={() => {
            if (done) {
              if (togglingRef.current) return
              togglingRef.current = true
              toggleProject(trackId, project.id)
              void syncCompletion()
              setConfirmed(false)
              onProgressChange?.()
              setTimeout(() => { togglingRef.current = false }, 300)
              return
            }
            completeProject()
          }}
          disabled={!done && brief ? !confirmed : false}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md border transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
            done
              ? 'border-green-500 bg-green-500/20 text-green-500'
              : 'border-border-default text-text-muted hover:border-teal hover:text-teal'
          }`}
          aria-label={done ? 'Mark as not built' : confirmed ? 'Mark as built' : 'Confirm requirements before marking as built'}
          aria-pressed={done}
        >
          {done && <Check size={16} strokeWidth={3} />}
        </button>
      </div>

      <h4 className={`mt-2 font-display text-[15px] font-semibold ${done ? 'line-through text-text-secondary' : ''}`}>
        {project.title}
      </h4>
      <p className="mt-1 text-sm text-text-secondary">{project.description}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.techTags.map((tag) => (
          <span key={tag} className="rounded-md bg-overlay px-2 py-0.5 font-mono text-[0.65rem] text-text-secondary">
            {tag}
          </span>
        ))}
      </div>

      {brief && (
        <div className="mt-4 border-t border-border-subtle pt-3">
          <button
            type="button"
            onClick={() => setBriefOpen((open) => !open)}
            className="inline-flex min-h-[40px] items-center gap-1.5 text-sm font-medium text-teal hover:text-text-primary"
            aria-expanded={briefOpen}
          >
            {briefOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            {briefOpen ? 'Hide project brief' : 'Open project brief'}
          </button>

          {briefOpen && (
            <div className="mt-4 space-y-5 rounded-lg border border-border-subtle bg-deep p-4 text-sm">
              <div>
                <h5 className="font-display font-semibold text-text-primary">Why this project matters</h5>
                <p className="mt-1.5 leading-6 text-text-secondary">{brief.why}</p>
              </div>

              <div>
                <h5 className="font-display font-semibold text-text-primary">Deliverables</h5>
                <ul className="mt-2 space-y-2 text-text-secondary">
                  {brief.deliverables.map((item) => <li key={item} className="flex gap-2"><span className="text-teal">•</span><span>{item}</span></li>)}
                </ul>
              </div>

              <div>
                <h5 className="font-display font-semibold text-text-primary">Acceptance criteria</h5>
                <ul className="mt-2 space-y-2 text-text-secondary">
                  {brief.acceptanceCriteria.map((item) => <li key={item} className="flex gap-2"><span className="text-teal">✓</span><span>{item}</span></li>)}
                </ul>
              </div>

              <div>
                <h5 className="font-display font-semibold text-text-primary">Keep as evidence</h5>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {brief.evidence.map((item) => <span key={item} className="rounded-md bg-overlay px-2 py-1 text-xs text-text-secondary">{item}</span>)}
                </div>
              </div>

              <div className="rounded-md border border-teal/20 bg-teal/5 p-3">
                <h5 className="font-display font-semibold text-teal">Stretch goal</h5>
                <p className="mt-1.5 leading-6 text-text-secondary">{brief.stretchGoal}</p>
              </div>

              <label className="flex items-start gap-3 rounded-md border border-border-default bg-overlay p-3">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-teal"
                />
                <span className="text-sm text-text-secondary">
                  I have completed the required deliverables, reviewed my work against the acceptance criteria, and saved the project evidence listed above.
                </span>
              </label>

              <div className="text-xs text-text-muted">
                Project completion is a learner-confirmed evidence checkpoint; it is not represented as an externally graded score.
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  )
}
