'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  LayoutList, Map, Hammer, Bot, Briefcase, Clock, ArrowRight, ArrowUpRight, GraduationCap, Loader2,
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import { Track, Resource } from '@/lib/tracks'
import { getTrackIcon } from '@/lib/icons'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { RoadmapTimeline } from './RoadmapTimeline'
import { ResourceItem } from './ResourceItem'
import { ProjectCard } from './ProjectCard'
import { PromptCard } from './PromptCard'
import { useChecklistProgress } from '@/hooks/useChecklistProgress'
import { prepareLegacyProgressForUser } from '@/lib/legacy-account'
import { WHO_IS_FOR } from '@/lib/site-content'
import { trackEvent } from '@/lib/analytics'

const SECTIONS = [
  { id: 'overview', label: 'Overview', icon: LayoutList },
  { id: 'roadmap', label: 'Roadmap', icon: Map },
  { id: 'projects', label: 'Projects', icon: Hammer },
  { id: 'ai-guide', label: 'AI Guide', icon: Bot },
  { id: 'career', label: 'Career Path', icon: Briefcase },
]

function SectionHeading({ n, label, note }: { n: string; label: string; note?: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span className="font-mono text-xs text-text-muted" aria-hidden>
        {n}
      </span>
      <h2 className="font-display text-3xl font-semibold">{label}</h2>
      {note && <p className="text-sm text-text-secondary">{note}</p>}
    </div>
  )
}

export function TrackPageView({
  track,
  resourcesByStage,
}: {
  track: Track
  resourcesByStage: Record<number, Resource[]>
}) {
  const { data: session } = useSession()
  const signedIn = Boolean(session?.user?.id)
  const [activeSection, setActiveSection] = useState('overview')
  const Icon = getTrackIcon(track.icon)
  const checklist = useChecklistProgress(track.id)

  const stageTotal = track.roadmap.length
  const stageDone = track.roadmap.filter((stage) => checklist.stages.has(stage.id)).length
  const projectTotal = track.projects.length
  const projectDone = track.projects.filter((project) => checklist.projects.has(project.id)).length

  useEffect(() => {
    if (session?.user?.id) prepareLegacyProgressForUser(session.user.id)
  }, [session?.user?.id])

  useEffect(() => {
    trackEvent({
      event_name: 'track_page_open',
      track_slug: track.slug,
      path: `/tracks/${track.slug}`,
    })
  }, [track.slug])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id)
        })
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    )
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const whoFor = WHO_IS_FOR[track.id] ?? WHO_IS_FOR.default

  const mappedIds = new Set(Object.values(resourcesByStage).flat().map((r) => r.id))
  const unmappedResources = track.resources.filter((r) => !mappedIds.has(r.id))

  return (
    <div className="pb-20">
      <div className="border-b border-border-subtle bg-void">
        <div className="container py-10">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Tracks', href: '/tracks' },
              { label: track.name },
            ]}
          />
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md border"
                style={{ backgroundColor: `${track.colorHex}14`, borderColor: `${track.colorHex}33`, color: track.colorHex }}
              >
                <Icon size={28} aria-hidden />
              </div>
              <div className="max-w-2xl">
                <h1 className="font-display text-display-lg text-text-primary">{track.name}</h1>
                <p className="mt-2 text-lg text-text-secondary">{track.tagline}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="badge badge-teal">{track.difficultyLabel}</span>
                  <span className="badge badge-purple inline-flex items-center gap-1">
                    <Clock size={11} aria-hidden />
                    <span>{track.timeEstimate}</span>
                  </span>
                  <span className="badge badge-blue uppercase">{track.category}</span>
                </div>
              </div>
            </div>
            <Link
              href={`/roadmaps/${track.slug}`}
              className="btn btn-secondary inline-flex shrink-0 items-center gap-1.5 text-sm"
            >
              Full roadmap guide <ArrowUpRight size={15} className="shrink-0" />
            </Link>
          </div>

          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-md">
              <div className="mb-1 flex items-center gap-2">
                <span className="font-mono text-xs text-text-muted">Roadmap &amp; project checklist</span>
                {!checklist.ready && <Loader2 size={11} className="animate-spin text-text-muted" aria-hidden />}
              </div>
              {checklist.ready ? (
                <>
                  <p className="text-sm text-text-secondary">
                    {stageDone} of {stageTotal} roadmap {stageTotal === 1 ? 'step' : 'steps'} · {projectDone} of {projectTotal}{' '}
                    {projectTotal === 1 ? 'project' : 'projects'} marked complete
                  </p>
                  <p className="mt-1 text-xs text-text-muted">
                    {signedIn ? 'Saved to your account.' : 'Saved on this device. Sign in to keep it across devices.'}
                  </p>
                </>
              ) : (
                <p className="text-sm text-text-muted">Loading your checklist…</p>
              )}
              {checklist.error && (
                <p role="alert" className="mt-1 text-xs text-[var(--color-error)]">
                  {checklist.error}
                </p>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/guided-path/${track.id}`}
                className="btn btn-primary inline-flex items-center gap-2"
              >
                <GraduationCap size={16} />
                {signedIn ? 'Open your learning path' : 'Start your learning path'}
              </Link>
              <Link href="/paths" className="btn btn-secondary inline-flex items-center gap-2">
                Explore other paths
              </Link>
            </div>
          </div>
          <p className="mt-3 text-xs text-text-muted">
            Free to follow. Sign in to save progress across devices.
          </p>
        </div>
      </div>

      {/* Mobile tabs */}
      <div className="sticky top-16 z-50 border-b border-border-subtle bg-surface/95 backdrop-blur lg:hidden">
        <div className="container flex gap-1 overflow-x-auto py-2">
          {SECTIONS.map(({ id, label, icon: SecIcon }) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollTo(id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium transition-colors ${
                activeSection === id ? 'bg-grape/15 text-grape' : 'text-text-secondary'
              }`}
            >
              <SecIcon size={14} aria-hidden />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="container flex gap-8 pt-10">
        {/* Left sidebar */}
        <aside className="hidden w-56 shrink-0 lg:block">
          <nav className="sticky top-24 space-y-1" aria-label="Track sections">
            {SECTIONS.map(({ id, label, icon: SecIcon }) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className={`flex min-h-[44px] w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  activeSection === id
                    ? 'font-medium'
                    : 'text-text-secondary hover:bg-elevated hover:text-text-primary'
                }`}
                style={activeSection === id ? { color: track.colorHex, backgroundColor: `${track.colorHex}12` } : undefined}
              >
                <SecIcon size={16} aria-hidden />
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <div className="min-w-0 flex-1 space-y-20">
          <section id="overview" className="scroll-mt-28">
            <SectionHeading n="01" label="Overview" />
            <p className="mt-4 max-w-none text-text-secondary">{track.overview.description}</p>

            <h3 className="mt-8 font-display text-base font-semibold">Who is this for?</h3>
            <ul className="mt-3 space-y-2">
              {whoFor.map((item) => (
                <li key={item} className="flex gap-2 text-text-secondary">
                  <span className="text-grape" aria-hidden>✓</span> {item}
                </li>
              ))}
            </ul>

            <h3 className="mt-8 font-display text-base font-semibold">What can you build?</h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {track.overview.whatYouCanBuild.map((item) => (
                <li key={item} className="card py-3 text-sm text-text-secondary">{item}</li>
              ))}
            </ul>

            <h3 className="mt-8 font-display text-base font-semibold">Jobs you can get</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {track.overview.jobTitles.map((job) => (
                <span key={job} className="badge badge-teal">{job}</span>
              ))}
            </div>
          </section>

          <section id="roadmap" className="scroll-mt-28">
            <SectionHeading
              n="02"
              label="Roadmap"
              note="Follow each step in order. Mark steps complete as you finish them."
            />
            <div className="mt-8">
              <RoadmapTimeline
                trackSlug={track.slug}
                stages={track.roadmap}
                colorHex={track.colorHex}
                resourcesByStage={resourcesByStage}
                completedStages={checklist.stages}
                pending={checklist.pending}
                ready={checklist.ready}
                onToggleStage={checklist.toggleStage}
              />
            </div>

            {unmappedResources.length > 0 && (
              <div className="mt-10 rounded-xl border border-border-subtle bg-elevated/40 p-4">
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">
                  More resources for this path
                </p>
                <div className="mt-3 space-y-3">
                  {unmappedResources.map((resource) => (
                    <ResourceItem
                      key={resource.id}
                      resource={resource}
                      trackSlug={track.slug}
                      path={`/tracks/${track.slug}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </section>

          <section id="projects" className="scroll-mt-28">
            <SectionHeading n="03" label="Projects" note="Build real work to prove the skill." />
            {track.projects.length > 0 ? (
              (['beginner', 'intermediate', 'advanced'] as const).map((level) => {
                const items = track.projects.filter((p) => p.level === level)
                if (!items.length) return null
                return (
                  <div key={level} className="mt-8">
                    <h3 className="font-mono text-xs uppercase tracking-widest text-text-muted">{level}</h3>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      {items.map((p, i) => (
                        <ProjectCard
                          key={p.id}
                          trackId={track.id}
                          trackSlug={track.slug}
                          project={p}
                          index={i}
                          done={checklist.projects.has(p.id)}
                          pending={checklist.pending.has(`PROJECT:${p.id}`)}
                          ready={checklist.ready}
                          onToggle={() => checklist.toggleProject(p.id)}
                        />
                      ))}
                    </div>
                  </div>
                )
              })
            ) : (
              <p className="card mt-4 text-sm text-text-secondary">No projects for this path yet.</p>
            )}
          </section>

          <section id="ai-guide" className="scroll-mt-28">
            <div className="rounded-lg border border-border-default border-l-[3px] border-l-grape bg-elevated p-6 md:p-8">
              <SectionHeading n="04" label="AI Guide" />
              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-grape">
                    What AI helps with
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {track.aiGuide.goodFor.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-text-secondary">
                        <span className="text-grape" aria-hidden>✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-[var(--color-error)]">
                    What AI cannot replace
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {track.aiGuide.notFor.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-text-secondary">
                        <span className="text-[var(--color-error)]" aria-hidden>✗</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <h3 className="mt-8 font-display font-semibold">Recommended Tools</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {track.aiGuide.tools.map((tool) => (
                  <a
                    key={tool.name}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card no-underline hover:border-grape/40"
                    onClick={() =>
                      trackEvent({
                        event_name: 'outbound_resource_click',
                        track_slug: track.slug,
                        resource_title: tool.name,
                        resource_type: 'tool',
                        outbound_url: tool.url,
                      })
                    }
                  >
                    <h4 className="font-medium text-grape">{tool.name}</h4>
                    <p className="mt-1 text-sm text-text-secondary">{tool.use}</p>
                  </a>
                ))}
              </div>
              <h3 className="mt-8 font-display font-semibold">Sample Prompts</h3>
              <div className="mt-4 space-y-3">
                {track.aiGuide.samplePrompts.map((prompt) => (
                  <PromptCard key={prompt.slice(0, 40)} prompt={prompt} />
                ))}
              </div>
            </div>
          </section>

          <section id="career" className="scroll-mt-28">
            <SectionHeading n="05" label="Career Path" />
            <div className="mt-4 flex flex-wrap gap-2">
              {track.overview.jobTitles.map((job) => (
                <span key={job} className="rounded-full border border-border-default px-4 py-2 font-display text-sm font-semibold">
                  {job}
                </span>
              ))}
            </div>
            <div className="card mt-6 border-l-[3px] border-l-amber bg-amber/5">
              <p className="text-text-primary">{track.careerTip}</p>
            </div>
            <div className="mt-6">
              <Link href="/career" className="btn btn-secondary inline-flex items-center gap-1.5">
                Full Career Prep Guide <ArrowRight size={16} className="shrink-0" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
