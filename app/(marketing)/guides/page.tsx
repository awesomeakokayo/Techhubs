import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { GUIDE_CONTENT } from '@/lib/seo/guides'
import { getPageMetadata } from '@/lib/seo/utils'
import { SITE_URL } from '@/lib/seo/site'
import type { Metadata } from 'next'
import { PageViewTracker } from '@/components/analytics/page-view-tracker'

export const metadata: Metadata = getPageMetadata({
  title: 'Learning Guides: Start Learning Tech the Right Way',
  description:
    'Practical, step-by-step guides for learning coding, web development, Python, JavaScript and AI — plus how to build a portfolio and start your tech career.',
  path: '/guides',
  keywords: ['how to learn coding', 'coding guides', 'web development guide', 'learn programming'],
})

export default function GuidesIndexPage() {
  const guides = Object.values(GUIDE_CONTENT)
  return (
    <div className="section pt-16">
      <div className="container">
        <PageViewTracker path="/guides" eventName="guides_page_open" />
        <header className="mb-10 max-w-3xl">
          <span className="section-label">Guides</span>
          <h1 className="font-editorial text-display-xl">
            Learning Guides
          </h1>
          <p className="mt-4 text-lg text-text-secondary">
            Direct answers to the questions every tech learner asks. Pick a guide, read the answer,
            then follow the roadmap that fits.
          </p>
        </header>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="card group flex h-full flex-col gap-3 no-underline"
            >
              <h2 className="font-display text-lg text-text-primary group-hover:text-teal">
                {guide.title}
              </h2>
              <p className="flex-1 text-sm text-text-secondary line-clamp-3">{guide.description}</p>
              <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-teal">
                Read the guide <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}