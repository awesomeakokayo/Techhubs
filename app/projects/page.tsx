'use client'

import { useState } from 'react'
import Link from 'next/link'
import { TRACKS } from '@/lib/tracks'
import { PageHeader } from '@/components/ui/PageHeader'
import { CategoryFilter } from '@/components/ui/CategoryFilter'

const LEVELS = [
  { id: 'all', label: 'All Levels' },
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
]

const PROJECT_IDEAS = {
  beginner: [
    'Personal portfolio website',
    'Calculator or quiz app',
    'To-do list with local storage',
    'Simple REST API',
  ],
  intermediate: [
    'Weather or news app using a real API',
    'Blog with user authentication',
    'SQL data analysis and dashboard',
    'Automated script (file organizer, email sender)',
  ],
  advanced: [
    'Full SaaS application (payments, auth, database)',
    'AI-powered tool (using OpenAI or Groq API)',
    'Data science project with model deployment',
    'Open source contribution',
  ],
}

export default function ProjectsPage() {
  const [level, setLevel] = useState('all')
  const [trackId, setTrackId] = useState('all')

  const trackOptions = [
    { id: 'all', label: 'All Tracks' },
    ...TRACKS.map((t) => ({ id: t.id, label: t.name })),
  ]

  const projects = TRACKS.flatMap((track) =>
    track.projects
      .filter((p) => (level === 'all' || p.level === level) && (trackId === 'all' || track.id === trackId))
      .map((p) => ({ ...p, track }))
  )

  return (
    <div className="section pt-28">
      <div className="container">
        <PageHeader
          title="Projects Hub"
          subtitle="Building projects is how you prove skill. Theory without projects is just knowledge, not capability."
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Projects' }]}
        />

        <div className="grid gap-6 md:grid-cols-3">
          {(['beginner', 'intermediate', 'advanced'] as const).map((lv) => (
            <div key={lv} className="card">
              <h2 className="font-mono text-xs uppercase tracking-widest text-teal">{lv}</h2>
              <p className="mt-2 text-sm text-text-secondary">
                {lv === 'beginner' && 'Prove you know the basics'}
                {lv === 'intermediate' && 'Prove you can build real things'}
                {lv === 'advanced' && 'Prove you are job-ready'}
              </p>
              <ul className="mt-4 space-y-2">
                {PROJECT_IDEAS[lv].map((idea) => (
                  <li key={idea} className="text-sm text-text-secondary">• {idea}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <CategoryFilter options={trackOptions.slice(0, 8)} active={trackId} onChange={setTrackId} />
          <CategoryFilter options={LEVELS} active={level} onChange={setLevel} className="mt-3" />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map(({ track, ...project }) => (
            <article
              key={project.id}
              className="card"
              style={{ borderLeftColor: track.colorHex, borderLeftWidth: 3 }}
            >
              <span className="font-mono text-xs text-text-muted">{track.name}</span>
              <h3 className="mt-1 font-display font-semibold">{project.title}</h3>
              <p className="mt-1 text-sm text-text-secondary">{project.description}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {project.techTags.map((tag) => (
                  <span key={tag} className="rounded-full bg-overlay px-2 py-0.5 font-mono text-[0.65rem] text-text-muted">
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/tracks/${track.slug}#projects`}
                className="mt-4 inline-block text-sm text-teal hover:underline"
              >
                View in track →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
