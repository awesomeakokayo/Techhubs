'use client'

import { AnimateIn } from '@/components/ui/AnimateIn'

const COMPETITORS = [
  {
    name: 'freeCodeCamp',
    structure: true,
    projects: true,
    career: false,
    african: false,
    free: true,
    portfolio: true,
    employerConnect: false,
  },
  {
    name: 'The Odin Project',
    structure: true,
    projects: true,
    career: false,
    african: false,
    free: true,
    portfolio: false,
    employerConnect: false,
  },
  {
    name: 'Coursera / Udemy',
    structure: false,
    projects: false,
    career: false,
    african: false,
    free: false,
    portfolio: false,
    employerConnect: false,
  },
  {
    name: 'ALX / AltSchool',
    structure: true,
    projects: true,
    career: true,
    african: true,
    free: false,
    portfolio: false,
    employerConnect: true,
  },
  {
    name: 'YouTube',
    structure: false,
    projects: false,
    career: false,
    african: false,
    free: true,
    portfolio: false,
    employerConnect: false,
  },
  {
    name: 'University',
    structure: true,
    projects: false,
    career: false,
    african: true,
    free: false,
    portfolio: false,
    employerConnect: false,
  },
  {
    name: 'TechSkillHub',
    structure: true,
    projects: true,
    career: true,
    african: true,
    free: true,
    portfolio: true,
    employerConnect: false,
    highlight: true,
  },
]

const DIMENSIONS = [
  { key: 'structure', label: 'Structured Roadmaps' },
  { key: 'projects', label: 'Practical Projects' },
  { key: 'career', label: 'Career Orientation' },
  { key: 'african', label: 'African Relevance' },
  { key: 'free', label: 'Free Access' },
  { key: 'portfolio', label: 'Portfolio Dev' },
  { key: 'employerConnect', label: 'Employer Connect' },
] as const

function Check({ yes }: { yes: boolean }) {
  return (
    <span className={`text-xs font-semibold ${yes ? 'text-teal' : 'text-text-muted'}`}>
      {yes ? '●' : '—'}
    </span>
  )
}

export function CompetitiveSlide() {
  return (
    <section className="bg-void">
      <div className="container py-36 md:py-40">
        <AnimateIn>
          <div className="mx-auto max-w-3xl">
            <p className="section-label">Competitive landscape</p>
            <h2 className="font-editorial text-display-lg text-text-primary">
              TechSkillHub is not competing on{' '}
              <span className="italic text-teal">&ldquo;more courses.&rdquo;</span>
            </h2>
            <p className="lead mt-4">
              It is competing on a structured path from learning to demonstrable competence and
              career readiness.
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div className="mx-auto mt-12 max-w-5xl overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse">
              <thead>
                <tr className="border-b border-border-default">
                  <th className="px-3 py-3 text-left font-mono text-[0.6rem] uppercase tracking-widest text-text-muted">
                    Platform
                  </th>
                  {DIMENSIONS.map((d) => (
                    <th
                      key={d.key}
                      className="px-3 py-3 text-center font-mono text-[0.6rem] uppercase tracking-widest text-text-muted"
                    >
                      {d.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPETITORS.map((col) => (
                  <tr
                    key={col.name}
                    className={`border-b border-border-subtle ${
                      col.highlight ? 'bg-teal-50' : ''
                    }`}
                  >
                    <td
                      className={`px-3 py-3 text-sm font-semibold ${
                        col.highlight ? 'text-teal' : 'text-text-primary'
                      }`}
                    >
                      {col.name}
                    </td>
                    {DIMENSIONS.map((d) => (
                      <td key={d.key} className="px-3 py-3 text-center">
                        <Check yes={col[d.key]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.2}>
          <div className="mx-auto mt-8 max-w-3xl">
            <p className="text-center text-sm text-text-secondary">
              ● = available &nbsp;&nbsp; — = not available or not a focus
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-center font-mono text-xs text-text-muted">
              Qualitative comparison based on publicly available product features.
              TechSkillHub does not claim superiority in all dimensions — it identifies a specific
              gap in structured, free, career-oriented learning for African learners.
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
