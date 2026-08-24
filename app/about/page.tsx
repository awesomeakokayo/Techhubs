import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { getPageMetadata } from '@/lib/seo/utils'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { PageViewTracker } from '@/components/analytics/page-view-tracker'

export const metadata: Metadata = getPageMetadata({
  title: 'About TechSkillHub: Learn Tech the Practical Way',
  description:
    'TechSkillHub is a self-paced technology learning platform helping learners build practical tech skills through structured roadmaps, resources, projects and career guidance.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <div className="section pt-16">
      <div className="container max-w-3xl">
        <PageViewTracker path="/about" eventName="about_page_open" />
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
        <span className="section-label">About</span>
        <h1 className="font-editorial text-display-xl max-w-2xl">
          A learning platform built for people who learn tech on their own.
        </h1>

        <div className="mt-10 space-y-6">
          <p className="lead">
            TechSkillHub is a self-paced technology learning platform helping learners build
            practical tech skills through structured roadmaps, curated free resources, projects and
            career guidance.
          </p>

          <section>
            <h2 className="font-editorial text-display-md mb-3">Why it exists</h2>
            <p>
              Most people who want to learn technology face the same problem: it is not a lack of
              resources, it is too many resources with no order. TechSkillHub exists to give every
              learner a clear answer to one question — <em>&quot;what should I learn next?&quot;</em>{" "}
              — so they can keep learning instead of restarting.
            </p>
          </section>

          <section>
            <h2 className="font-editorial text-display-md mb-3">Who it serves</h2>
            <p>
              Students, complete beginners, career switchers and independent learners — with a
              strong commitment to making quality tech education accessible to African learners
              while staying useful to learners everywhere.
            </p>
          </section>

          <section>
            <h2 className="font-editorial text-display-md mb-3">How learning paths are created</h2>
            <p>
              Every roadmap is built around a single learning goal. We sequence the skills in the
              order they are actually learned and used, link to quality resources (with a strong
              preference for free ones), and pair every stage with projects you can build to prove
              you understand it.
            </p>
          </section>

          <section>
            <h2 className="font-editorial text-display-md mb-3">How content is reviewed</h2>
            <p>
              Technology changes fast. Content is reviewed regularly by the TechSkillHub team,
              resources are checked for availability, and learners can flag anything that is
              outdated or broken. Our feedback system is designed to improve content — not to
              collect praise.
            </p>
          </section>

          <section>
            <h2 className="font-editorial text-display-md mb-3">For investors &amp; partners</h2>
            <p>
              If you&apos;re exploring partnership, investment, or collaboration opportunities, we
              have a dedicated pitch deck that outlines our vision, product, and roadmap.
            </p>
            <Link href="/pitch-deck" className="btn btn-secondary mt-4 inline-flex items-center gap-2">
              View Pitch Deck <ArrowRight size={16} className="shrink-0" />
            </Link>
          </section>

          <section>
            <h2 className="font-editorial text-display-md mb-3">Share your feedback</h2>
            <p>
              Every page has a &quot;was this helpful?&quot; prompt and a contact page. If a
              roadmap is missing a skill, a resource is broken, or we should build something next,
              tell us. That feedback decides what we improve.
            </p>
            <Link href="/contact" className="btn btn-primary mt-4 inline-flex items-center gap-2">
              Send feedback <ArrowRight size={16} className="shrink-0" />
            </Link>
          </section>
        </div>
      </div>
    </div>
  )
}