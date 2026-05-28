import { PageHeader } from '@/components/ui/PageHeader'
import { CareerSections } from './CareerTabs'
import { PageViewTracker } from '@/components/analytics/page-view-tracker'

export const metadata = {
  title: 'Career Preparation | Tech Skills Learning Hub',
  description: 'CV tips, portfolio building, interview prep, freelancing, and communities for tech careers.',
}

export default function CareerPage() {
  return (
    <div className="section pt-28">
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
