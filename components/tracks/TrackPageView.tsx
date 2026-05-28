'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  LayoutList, Map, BookOpen, Hammer, Bot, Briefcase,
} from 'lucide-react'
import { Track } from '@/lib/tracks'
import { getTrackIcon } from '@/lib/icons'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { RoadmapTimeline } from './RoadmapTimeline'
import { ResourceItem } from './ResourceItem'
import { ProjectCard } from './ProjectCard'
import { PromptCard } from './PromptCard'
import { getTrackPercent, startTrack, getTrackProgress } from '@/lib/progress'
import { WHO_IS_FOR } from '@/lib/site-content'
import type { ResourceType } from '@/lib/tracks'

const SECTIONS = [
  { id: 'overview', label: 'Overview', icon: LayoutList },
  { id: 'roadmap', label: 'Roadmap', icon: Map },
  { id: 'resources', label: 'Resources', icon: BookOpen },
  { id: 'projects', label: 'Projects', icon: Hammer },
  { id: 'ai-guide', label: 'AI Guide', icon: Bot },
  { id: 'career', label: 'Career Path', icon: Briefcase },
]

const RESOURCE_TABS: { id: ResourceType | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'docs', label: 'Documentation' },
  { id: 'video', label: 'Videos' },
  { id: 'practice', label: 'Practice' },
  { id: 'book', label: 'Books' },
  { id: 'tool', label: 'Tools' },
]

export function TrackPageView({ track }: { track: Track }) {
  const [activeSection, setActiveSection] = useState('overview')
  const [resourceTab, setResourceTab] = useState<ResourceType | 'all'>('all')
  const [progressKey, setProgressKey] = useState(0)
  const Icon = getTrackIcon(track.icon)

  const refresh = useCallback(() => setProgressKey((k) => k + 1), [])
  const percent = getTrackPercent(track.id, track.roadmap.length, track.projects.length)

  useEffect(() => {
    startTrack(track.id)
  }, [track.id])

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

  const filteredResources =
    resourceTab === 'all'
      ? track.resources
      : track.resources.filter((r) => r.type === resourceTab)

  const whoFor = WHO_IS_FOR.default

  return (
    <div className="pb-20">
      <div
        className="border-b border-border-subtle"
        style={{
          background: `linear-gradient(135deg, ${track.colorHex}0D 0%, transparent 60%)`,
        }}
      >
        <div className="container py-10">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Tracks', href: '/tracks' },
              { label: track.name },
            ]}
          />
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${track.colorHex}20`, color: track.colorHex }}
            >
              <Icon size={32} aria-hidden />
            </div>
            <div className="flex-1">
              <h1 className="font-display text-3xl font-extrabold md:text-4xl">{track.name}</h1>
              <p className="mt-2 text-lg text-text-secondary">{track.tagline}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="badge badge-teal">{track.difficultyLabel}</span>
                <span className="badge badge-purple">⏱ {track.timeEstimate}</span>
                <span className="badge badge-blue uppercase">{track.category}</span>
              </div>
              <div className="mt-6 max-w-md" key={progressKey}>
                <ProgressBar percent={percent} label="Your Progress" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile tabs */}
      <div className="sticky top-16 z-50 border-b border-border-subtle bg-deep/95 backdrop-blur lg:hidden">
        <div className="container flex gap-1 overflow-x-auto py-2">
          {SECTIONS.map(({ id, label, icon: SecIcon }) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollTo(id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium transition-colors ${
                activeSection === id ? 'bg-teal/15 text-teal' : 'text-text-secondary'
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
        <aside className="hidden w-60 shrink-0 lg:block">
          <nav className="sticky top-24 space-y-1" aria-label="Track sections">
            {SECTIONS.map(({ id, label, icon: SecIcon }) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className={`flex w-full min-h-[44px] items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
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
            <h2 className="font-display text-2xl font-bold">Overview</h2>
            <p className="mt-4 max-w-none text-text-secondary">{track.overview.description}</p>

            <h3 className="mt-8 font-display text-lg font-semibold">Who is this for?</h3>
            <ul className="mt-3 space-y-2">
              {whoFor.map((item) => (
                <li key={item} className="flex gap-2 text-text-secondary">
                  <span className="text-teal">✓</span> {item}
                </li>
              ))}
            </ul>

            <h3 className="mt-8 font-display text-lg font-semibold">What can you build?</h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {track.overview.whatYouCanBuild.map((item) => (
                <li key={item} className="card text-sm text-text-secondary py-3">{item}</li>
              ))}
            </ul>

            <h3 className="mt-8 font-display text-lg font-semibold">Jobs you can get</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {track.overview.jobTitles.map((job) => (
                <span key={job} className="badge badge-teal">{job}</span>
              ))}
            </div>
            <p className="mt-4 text-sm text-text-secondary">
              Salary range: <strong className="text-text-primary">{track.overview.salaryRange}</strong>
            </p>
          </section>

          <section id="roadmap" className="scroll-mt-28">
            <h2 className="font-display text-2xl font-bold">Roadmap</h2>
            <p className="mt-2 text-text-secondary">Follow each stage in order. Mark stages complete as you finish them.</p>
            <div className="mt-8">
              <RoadmapTimeline
                trackId={track.id}
                stages={track.roadmap}
                colorHex={track.colorHex}
                onProgressChange={refresh}
              />
            </div>
          </section>

          <section id="resources" className="scroll-mt-28">
            <h2 className="font-display text-2xl font-bold">Resources</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {RESOURCE_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setResourceTab(tab.id)}
                  className={`min-h-[44px] rounded-full px-4 py-2 text-xs font-mono uppercase tracking-wider ${
                    resourceTab === tab.id
                      ? 'bg-teal text-text-inverse'
                      : 'border border-border-default text-text-secondary hover:border-teal'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="mt-6 space-y-3">
              {filteredResources.map((r) => (
                <ResourceItem key={r.id} resource={r} />
              ))}
            </div>
          </section>

          <section id="projects" className="scroll-mt-28">
            <h2 className="font-display text-2xl font-bold">Projects</h2>
            {(['beginner', 'intermediate', 'advanced'] as const).map((level) => {
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
                        project={p}
                        index={i}
                        onProgressChange={refresh}
                      />
                    ))}
                  </div>
                </div>
              )
            })}
          </section>

          <section id="ai-guide" className="scroll-mt-28">
            <div className="rounded-2xl border border-border-default bg-elevated p-6 md:p-8 bg-dot">
              <h2 className="font-display text-2xl font-bold">AI Guide</h2>
              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="font-display font-semibold text-green-500">What AI helps with</h3>
                  <ul className="mt-3 space-y-2">
                    {track.aiGuide.goodFor.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-text-secondary">
                        <span className="text-green-500">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-red-400">What AI cannot replace</h3>
                  <ul className="mt-3 space-y-2">
                    {track.aiGuide.notFor.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-text-secondary">
                        <span className="text-red-400">✗</span> {item}
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
                    className="card no-underline hover:border-teal/40"
                  >
                    <h4 className="font-medium text-teal">{tool.name}</h4>
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
            <h2 className="font-display text-2xl font-bold">Career Path</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {track.overview.jobTitles.map((job) => (
                <span key={job} className="rounded-full border border-border-default px-4 py-2 font-display text-sm font-semibold">
                  {job}
                </span>
              ))}
            </div>
            <p className="mt-4 text-text-secondary">{track.overview.salaryRange}</p>
            <div className="card mt-6 border-l-[3px] border-l-amber bg-amber/5">
              <p className="text-text-primary">{track.careerTip}</p>
            </div>
            <div className="mt-6">
              <a href="/career" className="btn btn-secondary">
                Full Career Prep Guide →
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
