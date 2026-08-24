'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const ease = [0.4, 0, 0.2, 1]

/**
 * LandingHero — full-composition editorial hero.
 *
 * Typography is the dominant foreground element. The typewriter
 * (green duotone photo) sits low-opacity behind the message and a crisp
 * line-art typewriter anchors the bottom-right of the composition.
 */
export function LandingHero() {
  const reduced = useReducedMotion()

  return (
    <section
      aria-labelledby="landing-hero-title"
      className="relative overflow-hidden bg-void"
    >
      {/* ── Typewriter photograph — full-bleed hero background ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
        <Image
          src="/typewriter.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="art-photo object-cover object-[center_60%]"
        />

        {/* fade the edges to the page base so it melts into the hero */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(78% 72% at 50% 42%, transparent 30%, var(--bg-void) 92%)',
          }}
        />
      </div>

      {/* ── Editorial copy ── */}
      <div className="container relative flex min-h-[85vh] flex-col items-center justify-center py-24 text-center md:min-h-screen md:py-32">
        {reduced ? (
          <>
            <p className="section-label justify-center whitespace-nowrap text-teal">
              <span aria-hidden className="hidden h-px w-5 bg-teal sm:inline-block" />
              Guide for independent learning
              <span aria-hidden className="hidden h-px w-5 bg-teal sm:inline-block" />
            </p>
            <h1
              id="landing-hero-title"
              className="mt-8 font-editorial text-display-xl text-text-primary"
            >
              You don&apos;t need another course.
              <br />
              <span className="italic text-teal">You need a path.</span>
            </h1>
            <p className="lead mx-auto mt-8 max-w-xl text-text-secondary">
              Tech Skill Hub gives you a clear path to learn valuable technology skills
              independently — from choosing a direction to building the skills that matter.
            </p>
            <div className="mt-12 flex w-full max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:w-auto sm:flex-row sm:items-center">
              <Link href="/find-your-path" className="btn btn-primary inline-flex w-full items-center justify-center gap-2 sm:w-auto">
                Find Your Path <ArrowRight size={16} className="shrink-0" />
              </Link>
              <Link href="/paths" className="btn btn-secondary inline-flex w-full items-center justify-center gap-2 sm:w-auto">
                Explore Tech Skill Hub
              </Link>
            </div>
          </>
        ) : (
          <>
            <motion.p
              className="section-label justify-center whitespace-nowrap text-teal"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
            >
              <span aria-hidden className="hidden h-px w-5 bg-teal sm:inline-block" />
              Guide for independent learning
              <span aria-hidden className="hidden h-px w-5 bg-teal sm:inline-block" />
            </motion.p>

            <h1
              id="landing-hero-title"
              className="mt-8 font-editorial text-display-xl text-text-primary"
            >
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease }}
              >
                You don&apos;t need another course.
              </motion.span>
              <motion.span
                className="block italic text-teal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45, ease }}
              >
                You need a path.
              </motion.span>
            </h1>

            <motion.p
              className="lead mx-auto mt-8 max-w-xl text-text-secondary"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65, ease }}
            >
              Tech Skill Hub gives you a clear path to learn valuable technology skills
              independently — from choosing a direction to building the skills that matter.
            </motion.p>

            <motion.div
              className="mt-12 flex w-full max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:w-auto sm:flex-row sm:items-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.85, ease }}
            >
              <Link href="/find-your-path" className="btn btn-primary inline-flex w-full items-center justify-center gap-2 sm:w-auto">
                Find Your Path <ArrowRight size={16} className="shrink-0" />
              </Link>
              <Link href="/paths" className="btn btn-secondary inline-flex w-full items-center justify-center gap-2 sm:w-auto">
                Explore Tech Skill Hub
              </Link>
            </motion.div>
          </>
        )}
      </div>

      {/* fading path line that continues into the next section */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center">
        <span
          className="h-20 w-px"
          style={{
            background: 'linear-gradient(to bottom, transparent, var(--accent-primary) 30%, transparent)',
            maskImage: 'linear-gradient(to bottom, black, transparent)',
          }}
        />
      </div>
    </section>
  )
}
