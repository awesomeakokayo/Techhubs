'use client'

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { TypewriterIllustration } from '@/components/ui/TypewriterIllustration'
import { AnimateIn } from '@/components/ui/AnimateIn'

/**
 * PhilosophySection — Section 03 · The Product Philosophy.
 *
 * Extremely concise statement backed by ONE strong visual: a quiet
 * typewriter motif that continues the brand environment from the hero.
 * The illustration drifts with parallax as the user scrolls.
 */
export function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const illustrationY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const illustrationOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.02, 0.07, 0.07, 0.02])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-deep">
      <div className="container py-36 md:py-40">
        <div className="mx-auto max-w-3xl">
          <AnimateIn>
            <p className="section-label">The philosophy</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2 className="font-editorial text-display-lg text-text-primary">
              Tech Skill Hub organizes the chaos of independent learning into
              clear paths, practical projects, and the next thing you actually need
              to learn.
            </h2>
          </AnimateIn>
        </div>
      </div>

      {/* one strong visual — a cropped typewriter continuing the environment, with parallax */}
      {reduced ? (
        <div aria-hidden className="pointer-events-none absolute -bottom-24 right-[-6rem] select-none opacity-[0.07]">
          <TypewriterIllustration className="h-[26rem] w-[29rem] text-teal" />
        </div>
      ) : (
        <div aria-hidden className="pointer-events-none absolute -bottom-24 right-[-6rem] select-none">
          <motion.div
            style={{ y: illustrationY, opacity: illustrationOpacity }}
          >
            <TypewriterIllustration className="h-[26rem] w-[29rem] text-teal" />
          </motion.div>
        </div>
      )}
    </section>
  )
}
