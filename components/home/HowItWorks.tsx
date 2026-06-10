import { MapPin, Route, Rocket } from 'lucide-react'
import { AnimateIn } from '@/components/ui/AnimateIn'

const STEPS = [
  {
    num: '01',
    icon: MapPin,
    title: 'Pick Your Track',
    description:
      "Choose from 18 career paths. Don't know where to start? Take the 2-minute quiz.",
  },
  {
    num: '02',
    icon: Route,
    title: 'Follow the Roadmap',
    description:
      'Every track has a clear stage-by-stage path from zero to job-ready.',
  },
  {
    num: '03',
    icon: Rocket,
    title: 'Build & Ship',
    description:
      'Projects, resources, and AI guides are built into every track.',
  },
]

export function HowItWorks() {
  return (
    <section className="section bg-surface">
      <div className="container">
        <AnimateIn>
          <p className="section-label">How it works</p>
          <h2 className="font-display text-display-md font-bold">Three steps to your first role</h2>
        </AnimateIn>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <AnimateIn key={step.num} delay={i * 0.08}>
              <article className="card relative overflow-hidden h-full">
                <span
                  className="pointer-events-none absolute -right-2 -top-4 font-mono text-[4rem] font-bold leading-none text-teal opacity-10"
                  aria-hidden
                >
                  {step.num}
                </span>
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-teal/10 text-teal">
                    <step.icon size={24} aria-hidden />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-text-secondary max-w-none">{step.description}</p>
                </div>
              </article>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
