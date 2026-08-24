'use client'

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { AnimateIn } from '@/components/ui/AnimateIn'

/**
 * IndependentLearning — Section 07 · the emotional beat.
 *
 * No classroom schedule. No waiting. The typography does the work,
 * with the "your own pace" line-art printed faintly behind it.
 * Background image drifts with parallax.
 */
export function IndependentLearning() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-void">
      {/* ── "your own pace" line-art — full-bleed background ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
        {reduced ? (
          <Image
            src="/yourownpace.png"
            alt=""
            fill
            sizes="100vw"
            className="art-photo object-cover object-[center_65%]"
          />
        ) : (
          <motion.div className="absolute inset-0" style={{ y: bgY }}>
            <Image
              src="/yourownpace.png"
              alt=""
              fill
              sizes="100vw"
              className="art-photo object-cover object-[center_65%]"
            />
          </motion.div>
        )}

        {/* fade to the page base so the copy stays readable */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(80% 70% at 50% 40%, transparent 25%, var(--bg-void) 88%)',
          }}
        />
      </div>

      <div className="container relative py-36 md:py-40">
        <div className="mx-auto max-w-4xl text-center">
          <AnimateIn>
            <p className="section-label justify-center">In your own time</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2 className="font-editorial text-display-xl text-text-primary">
              Learn at <span className="italic text-teal">your own pace.</span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="lead mx-auto mt-8 max-w-2xl">
              No classroom schedule. No waiting for the next lesson. Build the skill
              when you&apos;re ready to move.
            </p>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}
