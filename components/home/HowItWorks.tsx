import Link from 'next/link'
import { Search, Map, Wrench, ArrowRight } from 'lucide-react'

const STEPS = [
  {
    icon: Search,
    title: 'Find Your Track',
    description: "Don't know where to start? Take the 2-minute quiz and we'll point you straight to the right path.",
    cta: { label: 'Take the quiz', href: '/start-here' },
  },
  {
    icon: Map,
    title: 'Know the Road',
    description: 'Each track has a visual roadmap — so you always see where you are and what comes next.',
    cta: null,
  },
  {
    icon: Wrench,
    title: 'Ship It',
    description: 'Every track ends with real projects. No toy exercises — work you can actually show.',
    cta: null,
  },
]

export function HowItWorks() {
  return (
    <section className="container py-16 md:py-24">
      <p className="section-label">HOW IT WORKS</p>
      <h2 className="mt-2 font-display text-3xl font-bold text-text-primary md:text-4xl">
        Three steps to your first role
      </h2>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {STEPS.map(({ icon: Icon, title, description, cta }) => (
          <div key={title} className="card flex flex-col">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 text-teal">
              <Icon size={20} />
            </div>
            <h3 className="font-display text-lg font-semibold text-text-primary">{title}</h3>
            <p className="mt-2 text-sm text-text-secondary flex-1">{description}</p>
            {cta && (
              <Link
                href={cta.href}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:underline"
              >
                {cta.label} <ArrowRight size={14} />
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
