'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SplineScene } from '@/components/ui/splite'
import { Spotlight } from '@/components/ui/spotlight'

const STATS = [
  { value: '18+', label: 'Learning Tracks' },
  { value: '300+', label: 'Curated Resources' },
  { value: '100%', label: 'Free & Public' },
]

export function Hero() {
  const reduced = useReducedMotion()

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-void py-16">
      {/* Background patterns */}
      <div className="bg-grid absolute inset-0 opacity-40" aria-hidden />
      <div className="bg-dot absolute inset-0 opacity-20" aria-hidden />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Text Block */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <motion.h1
              className="font-display font-extrabold leading-tight text-text-primary tracking-tight"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Learn tech the right way.
            </motion.h1>

            <motion.p
              className="mt-6 text-lg text-text-secondary max-w-xl"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Structured learning paths for students who want clarity. Roadmaps, resources, projects, and AI guidance in one place.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-4"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link href="/start-here" className="btn btn-primary inline-flex items-center gap-1.5">
                Start Learning <ArrowRight size={16} className="shrink-0" />
              </Link>
              <Link href="#tracks" className="btn btn-secondary">
                Browse All Tracks
              </Link>
            </motion.div>

            <motion.div
              className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-border-default pt-8"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              {STATS.map((stat) => (
                <div key={stat.label} className="min-w-[120px]">
                  <div className="font-display text-2xl font-bold text-text-primary">{stat.value}</div>
                  <div className="text-xs text-text-muted mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: 3D Scene */}
          <motion.div
            className="lg:col-span-5 relative h-[420px] w-full rounded-2xl border border-border-default bg-surface shadow-raised overflow-hidden hidden lg:block"
            initial={reduced ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Spotlight className="-top-40 left-0" size={250} />
            <div className="w-full h-full relative z-10">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
