import type { Metadata } from 'next'
import { getPageMetadata } from '@/lib/seo/utils'

export const metadata: Metadata = getPageMetadata({
  title: 'Coding Projects for Every Skill Level',
  description:
    'Practical coding projects for beginner, intermediate and advanced learners — build real things that turn practice into proof of skill.',
  path: '/projects',
  keywords: ['coding projects', 'projects for beginners', 'web development projects'],
})

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}