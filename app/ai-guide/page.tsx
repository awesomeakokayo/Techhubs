'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ArrowLeftRight, ArrowRight } from 'lucide-react'
import { TRACKS } from '@/lib/tracks'
import { PageHeader } from '@/components/ui/PageHeader'
import { PageViewTracker } from '@/components/analytics/page-view-tracker'
import { TrackedLink } from '@/components/ui/tracked-link'
import {
  AI_PHILOSOPHY,
  PROMPT_TIPS,
  AI_TOOLS_GLOBAL,
} from '@/lib/site-content'

export default function AIGuidePage() {
  const [openTrack, setOpenTrack] = useState<string | null>(null)

  return (
    <div className="section pt-28">
      <div className="container">
        <PageViewTracker path="/ai-guide" eventName="ai_guide_page_open" />
        <PageHeader
          title="Use AI Like a Pro"
          subtitle="Not as a shortcut. As a thinking partner."
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'AI Guide' }]}
        />

        <div className="rounded-2xl border border-border-default bg-surface p-8 md:p-12 text-center">
          <div className="mx-auto flex max-w-md items-center justify-center gap-4">
            <span className="rounded-full border border-teal px-4 py-2 font-display font-semibold text-teal">You</span>
            <ArrowLeftRight size={20} className="text-text-muted shrink-0" aria-hidden />
            <span className="rounded-full border border-violet px-4 py-2 font-display font-semibold text-violet">AI</span>
          </div>
          <p className="mt-6 text-text-secondary">
            Think → Prompt → Verify → Ship. AI accelerates work you understand — it does not replace learning.
          </p>
        </div>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold">Core Philosophy</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {AI_PHILOSOPHY.map((p) => (
              <blockquote
                key={p.title}
                className="card border-l-[3px] border-l-teal italic"
              >
                <p className="font-display text-lg font-semibold text-teal not-italic">{p.title}</p>
                <p className="mt-2 text-sm text-text-secondary">{p.body}</p>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold">Prompt Engineering Basics</h2>
          <div className="mt-6 space-y-4">
            {PROMPT_TIPS.map((tip, i) => (
              <div key={i} className="card grid gap-4 md:grid-cols-2">
                <div>
                  <p className="font-mono text-xs uppercase text-red-400">Avoid</p>
                  <p className="mt-1 text-sm text-text-secondary">&ldquo;{tip.bad}&rdquo;</p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase text-teal">Better</p>
                  <p className="mt-1 text-sm text-text-primary">&ldquo;{tip.good}&rdquo;</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold">AI by Track</h2>
          <div className="mt-6 space-y-2">
            {TRACKS.map((track) => (
              <div key={track.id} className="rounded-lg border border-border-default overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenTrack(openTrack === track.id ? null : track.id)}
                  className="flex w-full min-h-[52px] items-center justify-between px-4 py-3 text-left hover:bg-elevated"
                  aria-expanded={openTrack === track.id}
                >
                  <span className="font-display font-semibold">{track.name}</span>
                  <ChevronDown
                    size={20}
                    className={`transition-transform ${openTrack === track.id ? 'rotate-180' : ''}`}
                  />
                </button>
                {openTrack === track.id && (
                  <div className="border-t border-border-subtle bg-surface p-4 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <ul className="space-y-1 text-sm text-text-secondary">
                        {track.aiGuide.goodFor.map((item) => (
                          <li key={item}>✓ {item}</li>
                        ))}
                      </ul>
                      <ul className="space-y-1 text-sm text-text-secondary">
                        {track.aiGuide.notFor.map((item) => (
                          <li key={item}>✗ {item}</li>
                        ))}
                      </ul>
                    </div>
                    <Link href={`/tracks/${track.slug}#ai-guide`} className="inline-flex items-center gap-1 text-sm text-teal hover:underline">
                      Full AI guide on track page <ArrowRight size={14} className="shrink-0" />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold">Tools Directory</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AI_TOOLS_GLOBAL.map((tool) => (
              <TrackedLink
                key={tool.name}
                href={tool.url}
                className="card no-underline hover:border-teal/40"
                path="/ai-guide"
                resourceTitle={tool.name}
                resourceType="tool"
              >
                <h3 className="font-display font-semibold text-teal">{tool.name}</h3>
                <p className="mt-1 text-sm text-text-secondary">{tool.use}</p>
              </TrackedLink>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="card border-amber/30 bg-amber/5">
            <h2 className="font-display text-xl font-bold">Ethics & Verification</h2>
            <ul className="mt-4 space-y-2 text-text-secondary">
              <li>• AI hallucinates — always verify facts, code, and citations</li>
              <li>• Never submit AI output you have not read and understood</li>
              <li>• Check your school or workplace AI policies before using tools</li>
              <li>• Build your own opinion before asking AI for one</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
