import type { Metadata } from 'next'
import { getPageMetadata } from '@/lib/seo/utils'
import { PageViewTracker } from '@/components/analytics/page-view-tracker'
import { PitchDeckNav } from '@/components/pitch-deck/PitchDeckNav'
import { CoverSlide } from '@/components/pitch-deck/CoverSlide'
import { ProblemSlide } from '@/components/pitch-deck/ProblemSlide'
import { InsightSlide } from '@/components/pitch-deck/InsightSlide'
import { SolutionSlide } from '@/components/pitch-deck/SolutionSlide'
import { HowItWorksSlide } from '@/components/pitch-deck/HowItWorksSlide'
import { ProductSlide } from '@/components/pitch-deck/ProductSlide'
import { DifferentiationSlide } from '@/components/pitch-deck/DifferentiationSlide'
import { TargetUsersSlide } from '@/components/pitch-deck/TargetUsersSlide'
import { MarketSlide } from '@/components/pitch-deck/MarketSlide'
import { BusinessModelSlide } from '@/components/pitch-deck/BusinessModelSlide'
import { TractionSlide } from '@/components/pitch-deck/TractionSlide'
import { CompetitiveSlide } from '@/components/pitch-deck/CompetitiveSlide'
import { GoToMarketSlide } from '@/components/pitch-deck/GoToMarketSlide'
import { PartnershipSlide } from '@/components/pitch-deck/PartnershipSlide'
import { RoadmapSlide } from '@/components/pitch-deck/RoadmapSlide'
import { VisionSlide } from '@/components/pitch-deck/VisionSlide'
import { FounderSlide } from '@/components/pitch-deck/FounderSlide'
import { TheAskSlide } from '@/components/pitch-deck/TheAskSlide'
import { FinalCTASlide } from '@/components/pitch-deck/FinalCTASlide'

export const metadata: Metadata = getPageMetadata({
  title: 'TechSkillHub — Pitch Deck',
  description:
    "Discover TechSkillHub's mission to make structured, practical technology education more accessible across Africa.",
  path: '/pitch-deck',
  keywords: [
    'TechSkillHub',
    'pitch deck',
    'Africa tech education',
    'technology learning platform',
    'digital skills Africa',
    'structured learning',
    'investor relations',
  ],
})

export default function PitchDeckPage() {
  return (
    <>
      <PageViewTracker path="/pitch-deck" eventName="pitch_deck_open" />
      <PitchDeckNav />
      <CoverSlide />
      <ProblemSlide />
      <InsightSlide />
      <SolutionSlide />
      <DifferentiationSlide />
      <HowItWorksSlide />
      <ProductSlide />
      <TargetUsersSlide />
      <MarketSlide />
      <TractionSlide />
      <BusinessModelSlide />
      <CompetitiveSlide />
      <GoToMarketSlide />
      <PartnershipSlide />
      <RoadmapSlide />
      <VisionSlide />
      <FounderSlide />
      <TheAskSlide />
      <FinalCTASlide />
    </>
  )
}
