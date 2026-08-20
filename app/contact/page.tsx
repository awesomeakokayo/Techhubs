import Link from 'next/link'
import type { Metadata } from 'next'
import { getPageMetadata } from '@/lib/seo/utils'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { PageViewTracker } from '@/components/analytics/page-view-tracker'

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

        <form
          className="panel max-w-2xl"
          action="mailto:hello@techskillhub.cv"
          method="get"
          encType="text/plain"
        >
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-text-primary">Your name (optional)</span>
            <input type="text" name="name" className="w-full rounded-md border border-border-default bg-surface px-3 py-2.5 text-text-primary" />
          </label>
          <label className="mt-4 block">
            <span className="mb-1 block text-sm font-medium text-text-primary">Subject</span>
            <select name="subject" className="w-full rounded-md border border-border-default bg-surface px-3 py-2.5 text-text-primary">
              <option>Feedback on a page</option>
              <option>Suggest a roadmap or guide</option>
              <option>Report a broken resource</option>
              <option>Partnership or collaboration</option>
              <option>Something else</option>
            </select>
          </label>
          <label className="mt-4 block">
            <span className="mb-1 block text-sm font-medium text-text-primary">Message</span>
            <textarea name="body" rows={6} className="w-full rounded-md border border-border-default bg-surface px-3 py-2.5 text-text-primary" />
          </label>
          <button type="submit" className="btn btn-primary mt-6">
            Send message
          </button>
          <p className="mt-4 text-sm text-text-muted">
            Prefer email? Reach us directly at <a href="mailto:hello@techskillhub.cv" className="text-teal">hello@techskillhub.cv</a>.
          </p>
        </form>

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