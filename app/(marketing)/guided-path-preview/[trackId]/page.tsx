import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowLeft, ArrowRight, ExternalLink, LockKeyhole } from 'lucide-react'
import { getPageMetadata } from '@/lib/seo/utils'
import { getTrackById } from '@/lib/tracks'
import { buildAIWorldClassPath } from '@/lib/ai-guided-path'

export const dynamicParams = false

export function generateStaticParams() {
  return [{ trackId: 'ai-agents' }]
}

export async function generateMetadata({ params }: { params: { trackId: string } }): Promise<Metadata> {
  if (params.trackId !== 'ai-agents') return { title: 'Guided Path Preview' }
  return getPageMetadata({
    title: 'Preview an AI Agents Lesson',
    description: 'Read a sample TechSkillHub AI Agents lesson, study a worked example, and try a guided practice task before signing in.',
    path: '/guided-path-preview/ai-agents',
    keywords: ['AI agents lesson', 'AI agents learning path', 'AI agents practice'],
  })
}

function LessonText({ text }: { text: string }) {
  const lines = text.split('\n')
  const blocks: { kind: 'heading' | 'paragraph' | 'bullet'; text: string }[] = []
  for (const raw of lines) {
    const line = raw.trim()
    if (!line) continue
    if (/^[A-Z0-9][A-Z0-9 ,'’&/-]*$/.test(line) && line.length <= 52) {
      blocks.push({ kind: 'heading', text: line })
    } else if (/^(?:•|-|\*)\s+/.test(line)) {
      blocks.push({ kind: 'bullet', text: line.replace(/^(?:•|-|\*)\s+/, '') })
    } else {
      blocks.push({ kind: 'paragraph', text: line })
    }
  }

  return (
    <div className="space-y-3">
      {blocks.map((block, index) => {
        if (block.kind === 'heading') {
          return <h3 key={index} className="pt-3 font-display text-xs font-semibold uppercase tracking-[0.14em] text-grape">{block.text}</h3>
        }
        if (block.kind === 'bullet') {
          return <p key={index} className="flex gap-2.5 text-sm leading-7 text-text-secondary"><span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-grape" aria-hidden /><span>{block.text}</span></p>
        }
        return <p key={index} className="text-sm leading-7 text-text-secondary">{block.text}</p>
      })}
    </div>
  )
}

export default function GuidedPathPreviewPage({ params }: { params: { trackId: string } }) {
  if (params.trackId !== 'ai-agents') notFound()
  const track = getTrackById('ai-agents')
  if (!track) notFound()

  const steps = buildAIWorldClassPath('ai-agents')
  const learn = steps.find((step) => step.type === 'concept' && step.stageId === 1)
  const example = steps.find((step) => step.type === 'resource' && step.stageId === 1 && step.title.startsWith('See:'))
  const practice = steps.find((step) => step.type === 'resource' && step.stageId === 1 && step.resourceType === 'practice')
  const resources = steps.filter((step) => step.type === 'resource' && step.stageId === 1 && step.title.startsWith('Resource:') && step.resourceUrl)

  if (!learn || !example || !practice) notFound()

  return (
    <main className="section pt-12">
      <div className="container max-w-3xl">
        <Link href="/guided-path" className="inline-flex items-center gap-2 text-sm text-text-secondary no-underline hover:text-text-primary">
          <ArrowLeft size={14} aria-hidden /> Guided Path overview
        </Link>

        <header className="mt-8 border-b border-border-default pb-8">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal">Public lesson preview · No account required</p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-text-primary sm:text-5xl">AI Agents: learn, inspect, practice</h1>
          <p className="mt-4 text-base leading-7 text-text-secondary">
            Preview the first stage before signing in. The lesson teaches a specific concept, the example walks through a real design decision, and the practice task asks you to apply it yourself.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs text-text-muted">
            <span className="border border-border-default px-3 py-1.5">Stage 1 of {track.roadmap.length}</span>
            <span className="border border-border-default px-3 py-1.5">Learn</span>
            <span className="border border-border-default px-3 py-1.5">Worked example</span>
            <span className="border border-border-default px-3 py-1.5">Guided practice</span>
          </div>
        </header>

        <section className="mt-8 border border-border-default bg-surface p-5 sm:p-7">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-text-muted">01 · Lesson</p>
          <h2 className="mt-2 font-display text-2xl text-text-primary">{learn.title}</h2>
          <div className="mt-5"><LessonText text={learn.description} /></div>
        </section>

        <section className="mt-5 border border-border-default bg-surface p-5 sm:p-7">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-text-muted">02 · Demonstration</p>
          <h2 className="mt-2 font-display text-2xl text-text-primary">{example.title}</h2>
          <div className="mt-5"><LessonText text={example.description} /></div>
          {example.resourceUrl ? (
            <a href={example.resourceUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal underline underline-offset-4">
              Open the supporting documentation <ExternalLink size={14} aria-hidden />
            </a>
          ) : null}
        </section>

        <section className="mt-5 border border-border-default bg-surface p-5 sm:p-7">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-text-muted">03 · Try it yourself</p>
          <h2 className="mt-2 font-display text-2xl text-text-primary">{practice.title}</h2>
          <div className="mt-5"><LessonText text={practice.description} /></div>
        </section>

        {resources.length ? (
          <section className="mt-5 border border-border-default bg-surface p-5 sm:p-7">
            <h2 className="font-display text-xl text-text-primary">Further reading for this stage</h2>
            <ul className="mt-4 space-y-3">
              {resources.slice(0, 4).map((resource) => (
                <li key={resource.resourceId ?? resource.title} className="flex items-start justify-between gap-4 border-t border-border-subtle pt-3">
                  <div>
                    <p className="text-sm font-medium text-text-primary">{resource.title.replace(/^Resource:\s*/, '')}</p>
                    <p className="mt-1 text-sm leading-6 text-text-secondary">{resource.description.split('\n\nSOURCE\n')[0]}</p>
                  </div>
                  {resource.resourceUrl ? <a href={resource.resourceUrl} target="_blank" rel="noopener noreferrer" aria-label={'Open ' + resource.title} className="shrink-0 text-teal"><ExternalLink size={16} aria-hidden /></a> : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-8 flex flex-col gap-4 border border-teal/30 bg-elevated p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="font-display text-xl text-text-primary">Ready to continue the full path?</h2>
            <p className="mt-2 text-sm leading-6 text-text-secondary">Sign in to save progress, complete the knowledge checks, build the stage project, and submit evidence for automated assessment.</p>
          </div>
          <Link href="/login?next=%2Fguided-path%2Fai-agents" className="btn btn-primary inline-flex shrink-0 items-center justify-center gap-2">
            Sign in to start <ArrowRight size={15} aria-hidden />
          </Link>
        </section>
        <p className="mt-4 flex items-start gap-2 text-xs leading-6 text-text-muted"><LockKeyhole size={13} className="mt-1 shrink-0" aria-hidden />This is a read-only sample. Quiz answers, saved progress, and project-submission actions are not exposed on this page.</p>
      </div>
    </main>
  )
}
