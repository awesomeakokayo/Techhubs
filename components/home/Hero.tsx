'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

const STATS = [
  { value: '17+', label: 'Tracks' },
  { value: '300+', label: 'Resources' },
  { value: '100%', label: 'Free' },
]

export function Hero() {
  const reduced = useReducedMotion()

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-hero">
      <div className="bg-grid absolute inset-0 opacity-50 animate-grid-drift" aria-hidden />
      <div className="bg-dot absolute inset-0 opacity-30" aria-hidden />
      <div
        className="absolute left-[15%] top-[25%] h-2 w-2 rounded-full bg-teal opacity-40 animate-glow-pulse"
        aria-hidden
      />
      <div
        className="absolute right-[20%] top-[40%] h-2 w-2 rounded-full bg-amber opacity-30 animate-glow-pulse"
        style={{ animationDelay: '1.5s' }}
        aria-hidden
      />
      <div
        className="absolute left-[60%] bottom-[30%] h-1.5 w-1.5 rounded-full bg-violet opacity-30 animate-glow-pulse"
        style={{ animationDelay: '3s' }}
        aria-hidden
      />

      <div className="container relative z-10 flex flex-col items-center py-24 text-center">
  
        <motion.h1
          className="mt-6 max-w-[800px] font-display font-extrabold leading-tight"
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Your Roadmap
          <br />
          <span className="gradient-text">Into Tech</span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-[560px] text-lg text-text-secondary"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Every learning path, resource, project, and roadmap you need — from absolute beginner to
          job-ready. Structured. Free. Built for you.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href="/start-here" className="btn btn-primary">
            Start Learning →
          </Link>
          <Link href="/tracks" className="btn btn-secondary">
            Browse All Tracks
          </Link>
        </motion.div>

        <motion.div
          className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:gap-0"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              {i > 0 && (
                <div className="mx-8 hidden h-8 w-px bg-border-default sm:block" aria-hidden />
              )}
              <div className="text-center sm:px-8">
                <div className="font-display text-2xl font-semibold text-teal">{stat.value}</div>
                <div className="text-sm text-text-secondary">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  )
}
