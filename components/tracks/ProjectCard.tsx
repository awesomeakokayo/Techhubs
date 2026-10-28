'use client'

import { useState } from 'react'
import { Check, ChevronDown, ChevronUp, Loader2 } from 'lucide-react'
import { Project } from '@/lib/tracks'
import { trackEvent } from '@/lib/analytics'
import { AI_PROJECT_BRIEFS } from '@/lib/ai-project-briefs'
import { FLAGSHIP_CAPSTONES } from '@/lib/capstone-rubrics'

interface ProjectCardProps {
  trackId: string
  trackSlug?: string
  project: Project
  index: number
  done: boolean
  pending: boolean
  ready: boolean
  onToggle: () => void
}

export function ProjectCard({ trackId, trackSlug, project, index, done, pending, ready, onToggle }: ProjectCardProps) {
  const [briefOpen, setBriefOpen] = useState(false)
  const [capstoneOpen, setCapstoneOpen] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const capstone = FLAGSHIP_CAPSTONES[project.id]
  const brief = !capstone && trackId.startsWith('ai-') ? AI_PROJECT_BRIEFS[project.id] : undefined

  const handleClick = () => {
    if (!ready || pending) return
    if (done) {
      onToggle()
      return
    }
    if ((brief || capstone) && !confirmed) return
    onToggle()
    trackEvent({
      event_name: 'project_mark_complete',
      track_slug: trackSlug ?? trackId,
      project_name: project.title,
    })
  }

  return (
    <article className="card" style={done ? { borderColor: 'var(--color-success)', backgroundColor: 'rgba(30, 124, 71, 0.05)' } : undefined}>
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-xs text-text-muted">#{String(index + 1).padStart(2, '0')}</span>
        <button
          type="button"
          onClick={handleClick}
          disabled={pending || !ready || (!done && (brief || capstone) ? !confirmed : false)}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md border transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
            done ? '' : 'border-border-default text-text-muted hover:border-grape hover:text-grape'
          }`}
          style={done ? { borderColor: 'var(--color-success)', color: 'var(--color-success)', backgroundColor: 'rgba(30, 124, 71, 0.15)' } : undefined}
          aria-label={done ? 'Mark as not built' : confirmed ? 'Mark as built' : 'Confirm requirements before marking as built'}
          aria-pressed={done}
        >
          {pending ? <Loader2 size={15} className="animate-spin" aria-hidden /> : done ? <Check size={16} strokeWidth={3} /> : null}
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

      {capstone && (
        <div className="mt-4 border-t border-border-subtle pt-3">
          <button
            type="button"
            onClick={() => setCapstoneOpen((open) => !open)}
            className="inline-flex min-h-[40px] items-center gap-1.5 text-sm font-medium text-teal hover:text-text-primary"
            aria-expanded={capstoneOpen}
          >
            {capstoneOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            {capstoneOpen ? 'Hide client brief & rubric' : 'View client brief & scored rubric'}
          </button>

          {capstoneOpen && (
            <div className="mt-4 space-y-5 rounded-lg border border-border-subtle bg-deep p-4 text-sm">
              <section>
                <h5 className="font-display font-semibold text-text-primary">Client brief</h5>
                <p className="mt-1.5 leading-6 text-text-secondary">{capstone.clientBrief}</p>
              </section>

              <section>
                <h5 className="font-display font-semibold text-text-primary">Deliverables</h5>
                <ul className="mt-2 space-y-2 text-text-secondary">
                  {capstone.deliverables.map((item) => (
                    <li key={item} className="flex gap-2"><span className="text-teal">•</span><span>{item}</span></li>
                  ))}
                </ul>
              </section>

              <section>
                <h5 className="font-display font-semibold text-text-primary">Acceptance criteria</h5>
                <ul className="mt-2 space-y-2 text-text-secondary">
                  {capstone.acceptanceCriteria.map((item) => (
                    <li key={item} className="flex gap-2"><span className="text-teal">✓</span><span>{item}</span></li>
                  ))}
                </ul>
              </section>

              <section>
                <h5 className="font-display font-semibold text-text-primary">Scored assessment rubric</h5>
                <p className="mt-1 text-xs text-text-muted">The weights total 100 points. Every criterion marked “Required to pass” is a mandatory gate, even if the overall weighted score is high.</p>
                <ul className="mt-3 space-y-3">
                  {capstone.rubric.map((criterion) => (
                    <li key={criterion.id} className="border-b border-border-subtle pb-3 last:border-0">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="font-medium text-text-primary">{criterion.label}</span>
                        <span className="font-mono text-xs text-text-secondary">{criterion.weight} / 100</span>
                      </div>
                      <p className="mt-1 text-xs text-text-muted">{criterion.mandatory ? 'Required to pass' : 'Scored criterion'}</p>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h5 className="font-display font-semibold text-text-primary">Evidence to submit</h5>
                <ul className="mt-2 space-y-2 text-text-secondary">
                  {capstone.evidence.map((item) => <li key={item} className="flex gap-2"><span className="text-teal">•</span><span>{item}</span></li>)}
                </ul>
              </section>

              <label className="flex items-start gap-3 rounded-md border border-border-default bg-overlay p-3">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-teal"
                />
                <span className="text-sm text-text-secondary">
                  I have completed the deliverables, reviewed the mandatory criteria, and saved the listed evidence before marking this project complete.
                </span>
              </label>
              <p className="text-xs text-text-muted">This checkbox is a learner-side checklist only. Course progression requires the server-side project assessment to pass.</p>
            </div>
          )}
        </div>
      )}

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
