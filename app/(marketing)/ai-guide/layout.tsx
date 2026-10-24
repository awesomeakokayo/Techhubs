import type { Metadata } from 'next'
import { getPageMetadata } from '@/lib/seo/utils'

export const metadata: Metadata = getPageMetadata({
  title: 'How to Use AI Like a Pro: A Practical Guide',
  description:
    'Learn how to use AI tools effectively for learning and work — prompt tips, the best AI tools, and how to build with AI without losing the fundamentals.',
  path: '/ai-guide',
  keywords: ['how to use AI', 'AI guide', 'AI tools for learning'],
})

export default function AiGuideLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}