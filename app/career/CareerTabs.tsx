'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import {
  COMMUNITIES_AFRICA,
  COMMUNITIES_ONLINE,
  FREELANCE_PLATFORMS,
  PORTFOLIO_LAYERS,
} from '@/lib/site-content'

const TABS = ['Coding', 'Behavioral', 'System Design', 'Take-Home'] as const

const INTERVIEW_LINKS: Record<typeof TABS[number], { title: string; url: string }[]> = {
  Coding: [
    { title: 'LeetCode', url: 'https://leetcode.com' },
    { title: 'HackerRank', url: 'https://www.hackerrank.com' },
    { title: 'NeetCode', url: 'https://www.neetcode.io' },
    { title: 'NeetCode YouTube', url: 'https://www.youtube.com/c/NeetCode' },
  ],
  Behavioral: [
    { title: 'Behavioral Interview Tips', url: 'https://www.youtube.com/watch?v=1mHjMNZZvFo' },
  ],
  'System Design': [
    { title: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer' },
    { title: 'Gaurav Sen — System Design', url: 'https://www.youtube.com/c/GauravSensei' },
  ],
  'Take-Home': [
    { title: 'Read the requirements twice before coding', url: '#' },
    { title: 'Deliver a README with setup instructions', url: '#' },
    { title: 'Write tests for core functionality', url: '#' },
  ],
}

export function CareerTabs() {
  const [tab, setTab] = useState<typeof TABS[number]>('Coding')

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`min-h-[44px] rounded-full px-4 py-2 text-sm font-medium ${
              tab === t ? 'bg-teal text-text-inverse' : 'border border-border-default text-text-secondary'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="mt-6 space-y-3" role="tabpanel">
        {tab === 'Behavioral' && (
          <p className="text-text-secondary">
            Use the <strong className="text-text-primary">STAR method</strong>: Situation, Task, Action, Result.
            Prepare 5 stories from projects, school, or life that show problem-solving.
          </p>
        )}
        {INTERVIEW_LINKS[tab].map((link) =>
          link.url === '#' ? (
            <p key={link.title} className="text-text-secondary">• {link.title}</p>
          ) : (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card flex items-center justify-between no-underline hover:border-teal/40"
            >
              <span>{link.title}</span>
              <ArrowUpRight size={16} className="shrink-0 text-text-muted opacity-70" />
            </a>
          )
        )}
      </div>
    </div>
  )
}

export function CareerSections() {
  return (
    <>
      <section id="cv" className="scroll-mt-28">
        <h2 className="font-display text-2xl font-bold">CV / Resume</h2>
        <ul className="mt-4 space-y-2 text-text-secondary">
          <li>• Keep it to 1 page for early career</li>
          <li>• Lead with projects and skills — not just education</li>
          <li>• Use active verbs: Built, Designed, Automated, Led, Reduced</li>
        </ul>
        <a
          href="https://rxresu.me"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary mt-6 inline-flex items-center gap-1.5"
        >
          Build Resume on rxresu.me
          <ArrowUpRight size={16} className="shrink-0 opacity-70" />
        </a>
        <a
          href="https://www.youtube.com/watch?v=y8YH0Qbu5h4"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary mt-3 ml-0 sm:ml-3 inline-flex items-center gap-1.5"
        >
          Tech Resume Tips (freeCodeCamp)
          <ArrowUpRight size={16} className="shrink-0 opacity-70" />
        </a>
      </section>

      <section id="portfolio" className="mt-16 scroll-mt-28">
        <h2 className="font-display text-2xl font-bold">Portfolio Building</h2>
        <p className="mt-2 text-text-secondary">
          Your portfolio is proof you can build real things — not a list of tutorials completed.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {PORTFOLIO_LAYERS.map((layer) => (
            <article key={layer.layer} className="card">
              <span className="font-mono text-xs text-teal">{layer.layer}</span>
              <h3 className="mt-1 font-display text-lg font-semibold">{layer.title}</h3>
              <ul className="mt-4 space-y-2">
                {layer.items.map((item) => (
                  <li key={item} className="text-sm text-text-secondary">✓ {item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="interview" className="mt-16 scroll-mt-28">
        <h2 className="font-display text-2xl font-bold">Interview Prep</h2>
        <div className="mt-6">
          <CareerTabs />
        </div>
      </section>

      <section id="freelance" className="mt-16 scroll-mt-28">
        <h2 className="font-display text-2xl font-bold">Freelancing</h2>
        <p className="mt-2 text-text-secondary">
          Start with small local projects before competing on global platforms. Typical beginner rates: $15–40/hr depending on skill and region.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {FREELANCE_PLATFORMS.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card no-underline hover:border-teal/40"
            >
              <h3 className="font-display font-semibold text-teal">{p.name}</h3>
              <p className="mt-1 text-sm text-text-secondary">{p.description}</p>
            </a>
          ))}
        </div>
      </section>

      <section id="linkedin" className="mt-16 scroll-mt-28">
        <h2 className="font-display text-2xl font-bold">LinkedIn</h2>
        <ul className="mt-4 space-y-2 text-text-secondary">
          <li>• Professional photo, clear headline, complete About section</li>
          <li>• List every project with a link (GitHub, live demo)</li>
          <li>• Post your learning journey publicly — it builds visibility</li>
        </ul>
        <a
          href="https://university.linkedin.com/linkedin-for-students"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary mt-6 inline-flex items-center gap-1.5"
        >
          LinkedIn for Students Guide
          <ArrowUpRight size={16} className="shrink-0 opacity-70" />
        </a>
      </section>

      <section id="communities" className="mt-16 scroll-mt-28 pb-8">
        <h2 className="font-display text-2xl font-bold">Communities</h2>
        <h3 className="mt-8 font-display text-lg font-semibold">Global</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COMMUNITIES_ONLINE.map((c) => (
            <a key={c.url} href={c.url} target="_blank" rel="noopener noreferrer" className="card no-underline hover:border-teal/40">
              <h4 className="font-medium text-teal">{c.name}</h4>
              <p className="mt-1 text-sm text-text-secondary">{c.description}</p>
            </a>
          ))}
        </div>
        <h3 className="mt-10 font-display text-lg font-semibold">African & Nigerian</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COMMUNITIES_AFRICA.map((c) => (
            <a key={c.url} href={c.url} target="_blank" rel="noopener noreferrer" className="card no-underline hover:border-teal/40">
              <h4 className="font-medium text-teal">{c.name}</h4>
              <p className="mt-1 text-sm text-text-secondary">{c.description}</p>
            </a>
          ))}
        </div>
      </section>
    </>
  )
}
