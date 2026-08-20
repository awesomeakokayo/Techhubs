import type { Metadata } from 'next'
import { getPageMetadata } from '@/lib/seo/utils'
import { ResourcesClient } from './ResourcesClient'
import { PageViewTracker } from '@/components/analytics/page-view-tracker'

export const metadata: Metadata = getPageMetadata({
  title: 'Free Tech Learning Resources (Curated)',
  description:
    'A curated index of 300+ free learning resources across all technology tracks — docs, videos, practice tools, books and communities.',
  path: '/resources',
  keywords: ['free tech resources', 'free learning resources', 'curated resources'],
})

export default function ResourcesPage() {
  return (
    <>
      <PageViewTracker path="/resources" eventName="resources_page_open" />
      <ResourcesClient />
    </>
  )
}
