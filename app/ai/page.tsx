import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, BrainCircuit, CheckCircle2, Code2, Layers3, Sparkles, Workflow } from 'lucide-react'
import { TRACKS } from '@/lib/tracks'
import { getAIEnrichedTrack } from '@/lib/ai-track'
import { getPageMetadata } from '@/lib/seo/utils'
import { getTrackIcon } from '@/lib/icons'

export const metadata: Metadata = getPageMetadata({
  title: 'AI Learning Paths: Learn, Build & Work With AI',
  description:
    'Learn modern AI from foundations to AI-assisted software development, research, content, automation, agents, AI engineering and design with structured roadmaps, curated resources, projects and guided paths.',
  path: '/ai',
  keywords: [
    'AI learning path',
    'artificial intelligence roadmap',
    'generative AI course',
    'AI software development',
    'AI agents roadmap',
    'AI engineering roadmap',
    'AI automation',
  ],
  type: 'website',
})

const GROUPS = [
  {
    eyebrow: '01',
    title: 'Start here',
    description: 'Build the mental models and everyday habits that make AI useful instead of mysterious.',
    ids: ['ai-foundations', 'ai-work', 'ai-research'],
    icon: BrainCircuit,
  },
  {
    eyebrow: '02',
    title: 'Create with AI',
    description: 'Apply AI to content, YouTube, creative work and practical production workflows.',
    ids: ['ai-content', 'ai-youtube', 'ai-design'],
    icon: Sparkles,
  },
  {
    eyebrow: '03',
    title: 'Build with AI',
    description: 'Move from using models to engineering software, automations and reliable agent systems.',
    ids: ['ai-software-development', 'ai-automation', 'ai-agents', 'ai-engineering'],
    icon: Code2,
  },
]

const PRINCIPLES = [
  'Learn the concept before delegating it to a model.',
  'Use AI to accelerate work, not to hide gaps in understanding.',
  'Verify important claims, code, numbers and decisions.',
  'Build real artifacts and portfolio evidence at every level.',
]

function TrackCard({ trackId }: { trackId: string }) {
  const base = TRACKS.find((track) => track.id === trackId)
  if (!base) return null

  const track = getAIEnrichedTrack(base)
  const Icon = getTrackIcon(track.icon)
  const resourceCount = track.resources.length
  const projectCount = track.projects.length

  return (
    <Link
      href={`/tracks/${track.slug}`}
      className="group block rounded-xl border border-border-subtle bg-elevated p-5 transition-all hover:-translate-y-0.5 hover:border-border-default hover:bg-deep"
      style={{ textDecoration: 'none' }}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border"
          style={{ backgroundColor: `${track.colorHex}14`, borderColor: `${track.colorHex}33`, color: track.colorHex }}
        >
          <Icon size={22} aria-hidden />
        </div>
        <ArrowRight size={18} className="mt-1 text-text-muted transition-transform group-hover:translate-x-1 group-hover:text-text-primary" aria-hidden />
      </div>

      <h3 className="mt-5 font-editorial text-2xl text-text-primary">{track.name}</h3>
      <p className="mt-2 text-sm leading-6 text-text-secondary">{track.tagline}</p>

      <div className="mt-5 flex flex-wrap gap-2 text-xs text-text-muted">
        <span className="badge badge-teal">{track.difficultyLabel}</span>
        <span className="badge badge-blue">{track.timeEstimate}</span>
      </div>

      <div className="mt-5 flex items-center gap-4 border-t border-border-subtle pt-4 text-xs text-text-muted">
        <span className="inline-flex items-center gap-1.5"><BookOpen size={13} /> {resourceCount} resources</span>
        <span className="inline-flex items-center gap-1.5"><Layers3 size={13} /> {projectCount} projects</span>
      </div>
    </Link>
  )
}

export default function AIHubPage() {
  return (
    <main className="pb-24">
      <section className="border-b border-border-subtle bg-void">
        <div className="container py-16 md:py-24">
          <div className="max-w-4xl">
            <p className="section-label text-teal">THE AI LEARNING HUB</p>
            <h1 className="mt-4 max-w-4xl font-editorial text-display-lg text-text-primary">
              Learn to work with AI. Then learn to build with it.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-text-secondary">
              TechSkillHub&apos;s AI paths are built around the real workflow: understand the foundations, practice the task, use AI deliberately, verify the output, and ship something you can prove you built.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#paths" className="btn btn-primary inline-flex items-center gap-2">
                Explore AI paths <ArrowRight size={16} />
              </a>
              <Link href="/tracks/ai-foundations" className="btn btn-secondary inline-flex items-center gap-2">
                Start with AI Foundations <BrainCircuit size={16} />
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-3 md:grid-cols-4">
            {[
              ['Learn', 'Build the mental model.'],
              ['Practice', 'Use the concept on a real task.'],
              ['Verify', 'Test the output and your reasoning.'],
              ['Ship', 'Produce portfolio evidence.'],
            ].map(([label, description], index) => (
              <div key={label} className="rounded-xl border border-border-subtle bg-elevated p-5">
                <span className="font-mono text-xs text-text-muted">0{index + 1}</span>
                <h2 className="mt-3 font-display text-base font-semibold text-text-primary">{label}</h2>
                <p className="mt-1 text-sm leading-6 text-text-secondary">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="paths" className="container pt-16 md:pt-20">
        <div className="max-w-2xl">
          <p className="section-label text-text-muted">AI PATHWAYS</p>
          <h2 className="mt-3 font-editorial text-4xl text-text-primary">Choose the kind of AI work you want to do.</h2>
          <p className="mt-3 text-text-secondary">
            You do not need to become an ML researcher to benefit from AI. Start where the work you want to do begins, then move deeper as your goals change.
          </p>
        </div>

        <div className="mt-12 space-y-16">
          {GROUPS.map((group) => {
            const GroupIcon = group.icon
            return (
              <section key={group.title}>
                <div className="flex items-end justify-between gap-6 border-b border-border-subtle pb-4">
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-xs text-text-muted">{group.eyebrow}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <GroupIcon size={18} className="text-teal" aria-hidden />
                        <h3 className="font-editorial text-2xl text-text-primary">{group.title}</h3>
                      </div>
                      <p className="mt-1 max-w-2xl text-sm text-text-secondary">{group.description}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-3">
                  {group.ids.map((trackId) => <TrackCard key={trackId} trackId={trackId} />)}
                </div>
              </section>
            )
          })}
        </div>
      </section>

      <section className="container pt-20 md:pt-28">
        <div className="rounded-2xl border border-border-default bg-elevated p-7 md:p-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <div>
              <p className="section-label text-teal">THE STANDARD</p>
              <h2 className="mt-3 font-editorial text-4xl text-text-primary">AI should make you more capable, not more dependent.</h2>
              <p className="mt-4 text-text-secondary">
                Every AI path is designed around judgment. The goal is not to collect prompts or generate the most code. The goal is to understand the work well enough to use AI responsibly and still own the result.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {PRINCIPLES.map((principle) => (
                <div key={principle} className="rounded-xl border border-border-subtle bg-deep p-4">
                  <CheckCircle2 size={17} className="text-teal" aria-hidden />
                  <p className="mt-3 text-sm leading-6 text-text-secondary">{principle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container pt-16">
        <div className="rounded-2xl border border-border-default bg-void p-8 text-center md:p-12">
          <Workflow className="mx-auto text-teal" size={24} aria-hidden />
          <h2 className="mt-4 font-editorial text-4xl text-text-primary">Your next step is a path, not another list of links.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
            The guided paths turn curated resources into an ordered learning experience with checkpoints, projects and progress tracking.
          </p>
          <Link href="/tracks/ai-foundations" className="btn btn-primary mt-7 inline-flex items-center gap-2">
            Start learning <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  )
}
