'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Compass, RotateCcw } from 'lucide-react'
import { TRACKS, TrackCategory, getProductStats } from '@/lib/tracks'
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
  { id: 'ai', label: 'AI' },
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

  const hasFilters = category !== 'all' || difficulty !== 'all'
  const reset = () => {
    setCategory('all')
    setDifficulty('all')
  }

  return (
    <div className="section pt-16">
      <div className="container">
        <PageViewTracker path="/tracks" eventName="tracks_page_open" />
        <PageHeader
          title="All learning tracks"
          subtitle={`${getProductStats().trackCount} paths from beginner to professional, across five directions.`}
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Tracks' }]}
        />

        <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link href="/find-your-path" className="btn btn-primary inline-flex items-center gap-2 text-sm">
            <Compass size={15} /> Not sure where to start?
          </Link>
          <span className="text-sm text-text-secondary">
            Answer three quick questions and get a recommendation.
          </span>
        </div>

        <div className="sticky top-16 z-40 -mx-6 border-b border-border-subtle bg-surface/95 px-6 py-4 backdrop-blur md:-mx-8 md:px-8">
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
          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <p className="text-text-secondary">No tracks match these filters.</p>
            {hasFilters && (
              <button type="button" onClick={reset} className="btn btn-secondary inline-flex items-center gap-2">
                <RotateCcw size={15} /> Clear filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
