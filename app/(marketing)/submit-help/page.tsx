import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getPageMetadata } from '@/lib/seo/utils'
import { PageViewTracker } from '@/components/analytics/page-view-tracker'
import { SUBMISSION_GUIDE_LIST, SUBMISSION_INDEX } from '@/lib/seo/submission-guides'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import type { Metadata } from 'next'

export const metadata: Metadata = getPageMetadata({
  title: SUBMISSION_INDEX.seoTitle,
  description: SUBMISSION_INDEX.description,
  path: '/submit-help',
  keywords: [
    'how to submit a project',
    'create a public github repository',
    'upload files to github',
    'share a google drive link',
    'share a figma prototype',
    'submit a video project',
  ],
})

export default function SubmissionHelpIndexPage() {
  return (
    <div className="section pt-16">
      <div className="container">
        <PageViewTracker path="/submit-help" eventName="submit_help_index_open" />
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Project Submission Help' }]} />
        <header className="mb-10 mt-4 max-w-3xl">
          <span className="section-label">Project submission help</span>
          <h1 className="font-editorial text-display-xl">{SUBMISSION_INDEX.title}</h1>
          <p className="mt-4 text-lg text-text-secondary">{SUBMISSION_INDEX.openingAnswer}</p>
          <p className="mt-3 text-text-secondary">
            Find the guide for the deliverable your project needs. Every guide is written for beginners and explains
            what to do, what you should see, and how to check that your link is genuinely public.
          </p>
        </header>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SUBMISSION_GUIDE_LIST.map((guide) => (
            <Link key={guide.slug} href={`/submit-help/${guide.slug}`} className="card group flex h-full flex-col gap-3 no-underline">
              <h2 className="font-display text-lg text-text-primary group-hover:text-teal">{guide.title}</h2>
              <p className="flex-1 text-sm text-text-secondary">{guide.description}</p>
              <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-teal">
                Read the guide <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>

        <div className="panel mt-10 border-teal">
          <p className="font-medium text-text-primary">Submitting inside a project</p>
          <p className="mt-2 text-text-secondary">
            When you reach a project step in a guided path, the submission form lists the exact deliverables it
            requires and links directly to the relevant guide here. Nothing you have typed is lost when you open a
            guide in a new tab.
          </p>
        </div>
      </div>
    </div>
  )
}
