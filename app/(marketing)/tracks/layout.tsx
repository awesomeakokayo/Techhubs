import type { Metadata } from 'next'
import { getPageMetadata } from '@/lib/seo/utils'
import { getProductStats } from '@/lib/tracks'

export const metadata: Metadata = getPageMetadata({
  title: `All Learning Tracks: ${getProductStats().trackCount} Tech Paths to Follow`,
  description:
    'Browse all TechSkillHub learning tracks across build, design, analyze, grow and AI — each with a roadmap, curated free resources and projects.',
  path: '/tracks',
  keywords: ['learning tracks', 'tech tracks', 'technology paths'],
})

export default function TracksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
