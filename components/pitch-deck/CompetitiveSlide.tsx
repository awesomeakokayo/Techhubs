'use client'

import { AnimateIn } from '@/components/ui/AnimateIn'

const COLUMNS = [
  {
    name: 'YouTube',
    structure: 'Low',
    projects: 'Low',
    career: 'Low',
    accessible: 'High',
    african: 'Low',
    personalize: 'Low',
    cost: 'Free',
  },
  {
    name: 'Online Courses',
    structure: 'Medium',
    projects: 'Low',
    career: 'Low',
    accessible: 'Medium',
    african: 'Low',
    personalize: 'Low',
    cost: 'Paid',
  },
  {
    name: 'Bootcamps',
    structure: 'High',
    projects: 'High',
    career: 'Medium',
    accessible: 'Low',
    african: 'Low',
    personalize: 'Medium',
    cost: 'High',
  },
  {
    name: 'Documentation',
    structure: 'Low',
    projects: 'Low',
    career: 'Low',
    accessible: 'High',
    african: 'Low',
    personalize: 'Low',
    cost: 'Free',
  },
  {
    name: 'University',
    structure: 'High',
    projects: 'Medium',
    career: 'Medium',
    accessible: 'Low',
    african: 'Medium',
    personalize: 'Low',
    cost: 'High',
    highlight: false,
  },
  {
    name: 'TechSkillHub',
    structure: 'High',
    projects: 'High',
    career: 'High',
    accessible: 'High',
    african: 'High',
    personalize: 'High',
    cost: 'Free',
    highlight: true,
  },
]

const DIMENSIONS = ['Structure', 'Projects', 'Career', 'Accessible', 'African focus', 'Personalized', 'Cost']

function LevelBadge({ level }: { level: string }) {
  const color =
    level === 'High'
      ? 'text-teal'
      : level === 'Medium'
        ? 'text-amber'
        : level === 'Free'
          ? 'text-teal'
          : level === 'Paid' || level === 'High'
            ? 'text-amber'
            : 'text-text-muted'
  return <span className={`text-xs font-semibold ${color}`}>{level}</span>
}

export function CompetitiveSlide() {
  return (
    <section className="bg-void">
      <div className="container py-36 md:py-40">
        <AnimateIn>
          <div className="mx-auto max-w-3xl">
            <p className="section-label">Competitive landscape</p>
            <h2 className="font-editorial text-display-lg text-text-primary">
              Where TechSkillHub{' '}
              <span className="italic text-teal">fits in the landscape.</span>
            </h2>
            <p className="lead mt-4">
              Comparison with common alternatives. The purpose is to demonstrate positioning, not
              to attack competitors.
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div className="mx-auto mt-12 max-w-5xl overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr className="border-b border-border-default">
                  <th className="px-4 py-3 text-left font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">
                    Platform
                  </th>
                  {DIMENSIONS.map((d) => (
                    <th
                      key={d}
                      className="px-4 py-3 text-center font-mono text-[0.65rem] uppercase tracking-widest text-text-muted"
                    >
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COLUMNS.map((col) => (
                  <tr
                    key={col.name}
                    className={`border-b border-border-subtle ${
                      col.highlight ? 'bg-teal-50' : ''
                    }`}
                  >
                    <td
                      className={`px-4 py-3 text-sm font-semibold ${
                        col.highlight ? 'text-teal' : 'text-text-primary'
                      }`}
                    >
                      {col.name}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <LevelBadge level={col.structure} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <LevelBadge level={col.projects} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <LevelBadge level={col.career} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <LevelBadge level={col.accessible} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <LevelBadge level={col.african} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <LevelBadge level={col.personalize} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <LevelBadge level={col.cost} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.2}>
          <p className="mx-auto mt-8 max-w-2xl text-center font-mono text-xs text-text-muted">
            Qualitative comparison based on publicly available product features. Not a comprehensive
            market analysis.
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}
