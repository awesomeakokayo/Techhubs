import Link from 'next/link'
import type { Metadata } from 'next'
import { getPageMetadata } from '@/lib/seo/utils'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { PageViewTracker } from '@/components/analytics/page-view-tracker'
import { ContactForm } from '@/components/contact/ContactForm'

export const metadata: Metadata = getPageMetadata({
  title: 'Contact TechSkillHub: Feedback, Ideas & Support',
  description:
    'Send feedback, suggest a roadmap, report a broken resource or ask TechSkillHub a question. Your input decides what we improve next.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <div className="section pt-16">
      <div className="container">
        <PageViewTracker path="/contact" eventName="contact_page_open" />
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
        <header className="mb-10 max-w-3xl">
          <span className="section-label">Contact</span>
          <h1 className="font-editorial text-display-xl">Help us make TechSkillHub better for you.</h1>
          <p className="mt-4 text-lg text-text-secondary">
            Have feedback, a suggestion, a broken link to report, or a roadmap you want us to build?
            We read everything.
          </p>
        </header>

        <ContactForm />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 max-w-2xl">
          <Link href="/guides" className="card no-underline">
            <h2 className="font-display text-lg text-text-primary">Browse learning guides</h2>
            <p className="mt-1 text-sm text-text-secondary">Answers to the questions every learner asks.</p>
          </Link>
          <Link href="/roadmaps" className="card no-underline">
            <h2 className="font-display text-lg text-text-primary">Explore roadmaps</h2>
            <p className="mt-1 text-sm text-text-secondary">See the full picture before you start.</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
