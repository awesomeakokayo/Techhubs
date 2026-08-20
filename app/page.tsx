import { LandingHero } from '@/components/home/LandingHero'
import { EditorialStatement } from '@/components/home/EditorialStatement'
import { PhilosophySection } from '@/components/home/PhilosophySection'
import { PathJourney } from '@/components/home/PathJourney'
import { PathChoice } from '@/components/home/PathChoice'
import { ProductVisual } from '@/components/home/ProductVisual'
import { IndependentLearning } from '@/components/home/IndependentLearning'
import { ProofSection } from '@/components/home/ProofSection'
import { GuidedPathPreview } from '@/components/home/GuidedPathPreview'
import { SeoContentSection } from '@/components/home/SeoContentSection'
import { FinalCTA } from '@/components/home/FinalCTA'
import { PageViewTracker } from '@/components/analytics/page-view-tracker'

export default function HomePage() {
  return (
    <>
      <PageViewTracker path="/" eventName="page_view" />
      <LandingHero />
      <EditorialStatement />
      <PhilosophySection />
      <PathJourney />
      <PathChoice />
      <ProductVisual />
      <IndependentLearning />
      <ProofSection />
      <GuidedPathPreview />
      <SeoContentSection />
      <FinalCTA />
    </>
  )
}