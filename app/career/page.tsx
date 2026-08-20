import type { Metadata } from 'next'
import { getPageMetadata } from '@/lib/seo/utils'
import { PageHeader } from '@/components/ui/PageHeader'
import { CareerSections } from './CareerTabs'
import { PageViewTracker } from '@/components/analytics/page-view-tracker'

export const metadata: Metadata = getPageMetadata({
  title: 'Career Preparation: CV, Portfolio & Interviews',
  description:
    'CV tips, portfolio building, interview preparation, freelancing and communities for technology careers.',
  path: '/career',
  keywords: ['tech career preparation', 'developer interview prep', 'tech CV'],
})

export default function CareerPage() {
  return (
    <div className="section pt-16">
      <div className="container max-w-4xl">
        <PageViewTracker path="/career" eventName="career_page_open" />
        <PageHeader
          title="Career Preparation"
          subtitle="Complete this when you are in Stage 3 or 4 of your chosen track."
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Career' }]}
        />
        <CareerSections />
      </div>
    </div>
  )
}
