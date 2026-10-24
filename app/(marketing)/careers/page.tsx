import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { CAREER_CONTENT } from '@/lib/seo/careers'
import { getPageMetadata } from '@/lib/seo/utils'
import { PageViewTracker } from '@/components/analytics/page-view-tracker'

export const metadata: Metadata = getPageMetadata({
  title: 'Tech Career Paths: What to Learn for Each Role',
  description:
    'Explore technology career paths — frontend, backend, full-stack, software engineering and AI — and the exact learning path for each.',
  path: '/careers',
  keywords: ['tech career', 'how to become a developer', 'developer career path'],
})

export default function CareersIndexPage() {
  const careers = Object.values(CAREER_CONTENT)
  return (
    <div className="section pt-16">
      <div className="container">
        <PageViewTracker path="/careers" eventName="careers_page_open" />
        <header className="mb-10 max-w-3xl">
          <span className="section-label">Careers</span>
          <h1 className="font-editorial text-display-xl">Tech Career Paths</h1>
          <p className="mt-4 text-lg text-text-secondary">
            What each technology role actually does, the skills it needs and the roadmap that gets
            you there.
          </p>
        </header>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {careers.map((career) => (
            <Link
              key={career.slug}
              href={`/careers/${career.slug}`}
              className="card group flex h-full flex-col gap-3 no-underline"
            >
              <h2 className="font-display text-lg text-text-primary group-hover:text-teal">
                {career.title}
              </h2>
              <p className="flex-1 text-sm text-text-secondary line-clamp-3">{career.description}</p>
              <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-teal">
                Explore this career <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}