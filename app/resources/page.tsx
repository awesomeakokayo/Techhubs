import { ResourcesClient } from './ResourcesClient'
import { PageViewTracker } from '@/components/analytics/page-view-tracker'

export const metadata = {
  title: 'Resources | Tech Skills Learning Hub',
  description: 'Master index of 300+ curated free learning resources across all tech tracks.',
}

export default function ResourcesPage() {
  return (
    <>
      <PageViewTracker path="/resources" eventName="resources_page_open" />
      <ResourcesClient />
    </>
  )
}
