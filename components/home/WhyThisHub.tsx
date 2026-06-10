'use client'

import { Check } from 'lucide-react'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { motion, useReducedMotion } from 'framer-motion'

const CHECKLIST = [
  '18 complete learning tracks',
  'Roadmaps from beginner to job-ready',
  '300+ curated, verified resource links',
  'AI usage guides built into every track',
  'Project ideas with rubrics',
  'Career prep: CVs, interviews, freelancing',
  'Built for African students and context',
  'Zero cost. No signup required.',
]

export function WhyThisHub() {
  const reduced = useReducedMotion()

  return (
    <section className="section bg-surface">
      <div className="container">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <AnimateIn>
            <p className="section-label">Why this hub</p>
            <h2 className="font-display text-display-md font-bold">
              Built for students who can&apos;t afford to waste time
            </h2>
            <div className="mt-6 space-y-4">
              <p className="max-w-none text-text-secondary">
                You do not need to learn everything. You need to go deep in one direction. Pick a
                track, follow the roadmap, build the projects — everything else becomes clearer as
                you go.
              </p>
              <p className="max-w-none text-text-secondary">
                The students who succeed are not the smartest ones. They are the most consistent
                ones. Use AI as a thinking partner — not as a shortcut.
              </p>
              <p className="max-w-none font-medium text-text-primary">
                Build something. Ship something. Share it.
              </p>
            </div>
          </AnimateIn>

          <ul className="space-y-4" aria-label="Hub features">
            {CHECKLIST.map((item, i) => (
              <motion.li
                key={item}
                className="flex items-start gap-3"
                initial={reduced ? false : { opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
                  <Check size={14} strokeWidth={3} aria-hidden />
                </span>
                <span className="text-base text-text-primary">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
