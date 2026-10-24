import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import { getPageMetadata } from '@/lib/seo/utils'
import { PageHeader } from '@/components/ui/PageHeader'
import { TrackQuiz } from '@/components/quiz/TrackQuiz'
import { TypewriterIllustration } from '@/components/ui/TypewriterIllustration'
import { PageViewTracker } from '@/components/analytics/page-view-tracker'
import { approxLearningHoursByTrack } from '@/lib/quiz-pace'
import { TRACKS } from '@/lib/tracks'

export const metadata: Metadata = getPageMetadata({
  title: 'Find Your Path: Get a Personalized Tech Recommendation',
  description:
    'Answer a few quick questions and TechSkillHub recommends the technology direction that fits your interests, experience and goals.',
  path: '/find-your-path',
  keywords: ['find your tech path', 'tech recommendation quiz', 'what should I learn in tech'],
})

export default function FindYourPathPage() {
  const approxHoursByTrack = approxLearningHoursByTrack()
  return (
    <div className="section pt-16">
      <PageViewTracker path="/find-your-path" eventName="find_your_path_open" />

      <div className="relative overflow-hidden bg-deep">
        <div className="container relative">
          <div aria-hidden className="pointer-events-none absolute -left-16 -top-10 select-none opacity-[0.06]">
            <TypewriterIllustration className="h-56 w-64 text-teal" />
          </div>
          <PageHeader
            title="Find Your Path"
            subtitle="Answer a few quick questions. We'll recommend the learning paths worth exploring first."
            breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Find Your Path' }]}
          />
        </div>
      </div>

      <div className="container max-w-3xl">
        <TrackQuiz approxHoursByTrack={approxHoursByTrack} tracks={TRACKS.map(({ id, slug, name, tagline, colorHex }) => ({ id, slug, name, tagline, colorHex }))} />

        <Link
          href="/paths"
          className="mt-12 inline-flex items-center gap-1.5 text-sm font-semibold text-teal no-underline hover:text-teal-bright"
        >
          <ArrowLeft size={14} className="shrink-0" /> Browse all paths instead
        </Link>
      </div>
    </div>
  )
}