import { Hero } from '@/components/home/Hero'
import { ContinueLearningBanner } from '@/components/home/ContinueLearningBanner'
import { HowItWorks } from '@/components/home/HowItWorks'
import { TrackCategories } from '@/components/home/TrackCategories'
import { WhyThisHub } from '@/components/home/WhyThisHub'
import { QuizTeaser } from '@/components/home/QuizTeaser'
import { PageViewTracker } from '@/components/analytics/page-view-tracker'

export default function HomePage() {
  return (
    <>
      <PageViewTracker path="/" eventName="page_view" />
      <Hero />
      <ContinueLearningBanner />
      <HowItWorks />
      <TrackCategories />
      <WhyThisHub />
      <QuizTeaser />
    </>
  )
}
