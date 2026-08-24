'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CATEGORIES } from '@/lib/tracks'
import { AnimateIn } from '@/components/ui/AnimateIn'

const ease = [0.4, 0, 0.2, 1]

/**
 * PathChoice — Section 05 · Where do you want to go?
 *
 * Four directions, four subpages. Calm, autonomous, user-led.
 * The path branches as the user makes their choice.
 * SVG draws itself on scroll, category rows stagger in.
 */
export function PathChoice() {
  const reduced = useReducedMotion()

  return (
    <section>
      <div className="container py-36 md:py-40">
        <div className="text-center">
          <AnimateIn>
            <p className="section-label justify-center">Your choice</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2 className="font-editorial text-display-lg text-text-primary">
              Where do you want to go?
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="lead mx-auto mt-5 max-w-xl">
              There is no single correct path. Pick the direction that pulls you.
            </p>
          </AnimateIn>
        </div>

        {/* Branching motif — draws itself */}
        <div aria-hidden className="mx-auto mt-16 max-w-xs">
          <svg viewBox="0 0 220 120" className="mx-auto h-24 w-auto text-text-muted" fill="none" stroke="currentColor" strokeWidth={1.25}>
            {reduced ? (
              <>
                <path d="M 68 8 V 56" />
                <path d="M 68 56 H 110 V 88" strokeDasharray="2 4" opacity={0.6} />
                <path d="M 110 88 C 92 96 74 98 52 106" />
                <path d="M 110 88 C 130 96 150 96 172 106" />
                <path d="M 68 56 C 40 86 24 96 8 112" />
                <path d="M 68 56 C 30 78 6 78 -14 62" strokeDasharray="2 4" opacity={0.4} />
              </>
            ) : (
              <>
                <motion.path
                  d="M 68 8 V 56"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, ease }}
                />
                <motion.path
                  d="M 68 56 H 110 V 88"
                  strokeDasharray="2 4"
                  opacity={0.6}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: 0.3, ease }}
                />
                <motion.path
                  d="M 110 88 C 92 96 74 98 52 106"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: 0.5, ease }}
                />
                <motion.path
                  d="M 110 88 C 130 96 150 96 172 106"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: 0.5, ease }}
                />
                <motion.path
                  d="M 68 56 C 40 86 24 96 8 112"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: 0.2, ease }}
                />
                <motion.path
                  d="M 68 56 C 30 78 6 78 -14 62"
                  strokeDasharray="2 4"
                  opacity={0.4}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: 0.2, ease }}
                />
              </>
            )}
          </svg>
        </div>

        {/* Four directions — stagger in */}
        {reduced ? (
          <ul className="mx-auto mt-8 max-w-3xl divide-y divide-border-subtle border-y border-border-default">
            {CATEGORIES.map((cat, i) => (
              <li key={cat.id}>
                <Link
                  href={`/paths/${cat.id}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-6 gap-y-1 py-7 no-underline sm:grid-cols-[auto_auto_1fr_auto]"
                >
                  <span className="font-mono text-sm text-text-muted" aria-hidden>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="hidden h-2.5 w-2.5 shrink-0 rounded-full sm:block" style={{ background: cat.color }} aria-hidden />
                  <span className="min-w-0">
                    <span className="font-editorial text-3xl text-text-primary">{cat.label}</span>
                    <span className="block text-sm text-text-secondary">{cat.description}</span>
                  </span>
                  <ArrowRight size={16} className="shrink-0 text-text-muted transition-all group-hover:translate-x-0.5 group-hover:text-teal" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <motion.ul
            className="mx-auto mt-8 max-w-3xl divide-y divide-border-subtle border-y border-border-default"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {CATEGORIES.map((cat, i) => (
              <motion.li
                key={cat.id}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.45, ease },
                  },
                }}
              >
                <Link
                  href={`/paths/${cat.id}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-6 gap-y-1 py-7 no-underline sm:grid-cols-[auto_auto_1fr_auto]"
                >
                  <span className="font-mono text-sm text-text-muted" aria-hidden>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="hidden h-2.5 w-2.5 shrink-0 rounded-full sm:block" style={{ background: cat.color }} aria-hidden />
                  <span className="min-w-0">
                    <span className="font-editorial text-3xl text-text-primary">{cat.label}</span>
                    <span className="block text-sm text-text-secondary">{cat.description}</span>
                  </span>
                  <ArrowRight size={16} className="shrink-0 text-text-muted transition-all group-hover:translate-x-0.5 group-hover:text-teal" aria-hidden />
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
    </section>
  )
}
