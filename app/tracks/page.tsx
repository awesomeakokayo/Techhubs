'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TRACKS, TrackCategory } from '@/lib/tracks'
import { PageHeader } from '@/components/ui/PageHeader'
import { CategoryFilter } from '@/components/ui/CategoryFilter'
import { TrackCardLarge } from '@/components/tracks/TrackCardLarge'
import { PageViewTracker } from '@/components/analytics/page-view-tracker'

const CATEGORY_OPTIONS = [
  { id: 'all', label: 'All' },
  { id: 'build', label: 'Build' },
  { id: 'design', label: 'Design' },
  { id: 'analyze', label: 'Analyze' },
  { id: 'grow', label: 'Grow' },
]

const DIFFICULTY_OPTIONS = [
  { id: 'all', label: 'All Levels' },
  { id: 'beginner', label: 'Beginner Friendly' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
]

function matchesDifficulty(difficulty: number, filter: string): boolean {
  if (filter === 'all') return true
  if (filter === 'beginner') return difficulty <= 2
  if (filter === 'intermediate') return difficulty === 3
  if (filter === 'advanced') return difficulty >= 4
  return true
}

export default function TracksPage() {
  const [category, setCategory] = useState('all')
  const [difficulty, setDifficulty] = useState('all')

  const filtered = useMemo(() => {
    return TRACKS.filter((t) => {
      const catOk = category === 'all' || t.category === (category as TrackCategory)
      const diffOk = matchesDifficulty(t.difficulty, difficulty)
      return catOk && diffOk
    })
  }, [category, difficulty])

  return (
    <div className="section pt-28">
      <div className="container">
        <PageViewTracker path="/tracks" eventName="tracks_page_open" />
        <PageHeader
          title="All Learning Tracks"
          subtitle="18 paths from beginner to professional."
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Tracks' }]}
        />

        <div className="sticky top-16 z-40 -mx-6 border-b border-border-subtle bg-deep/95 px-6 py-4 backdrop-blur md:-mx-8 md:px-8">
          <CategoryFilter options={CATEGORY_OPTIONS} active={category} onChange={setCategory} />
          <CategoryFilter
            options={DIFFICULTY_OPTIONS}
            active={difficulty}
            onChange={setDifficulty}
            className="mt-3"
            layoutId="difficulty-pill"
          />
        </div>

        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((track) => (
              <motion.div
                key={track.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <TrackCardLarge track={track} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-text-secondary">No tracks match these filters.</p>
        )}
      </div>
    </div>
  )
}
