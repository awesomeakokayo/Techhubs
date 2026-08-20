import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { getPageMetadata } from '@/lib/seo/utils'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { TrackQuiz } from '@/components/quiz/TrackQuiz'
import { PageViewTracker } from '@/components/analytics/page-view-tracker'

export const metadata: Metadata = getPageMetadata({
  title: 'Start Learning Technology: Find Your Path',
  description:
    'Tell TechSkillHub what you want to learn and how much experience you have — then follow a structured roadmap built for your goal.',
  path: '/start',
  keywords: ['start learning tech', 'find your tech path', 'tech roadmap for beginners'],
})

const GOALS = [
  {
    title: 'I want to learn coding',
    href: '/guides/how-to-learn-coding',
    description: 'Start from zero with a clear plan.',
  },
  {
    title: 'I want to become a frontend developer',
    href: '/roadmaps/frontend-development',
    description: 'HTML, CSS, JavaScript, React and deployment.',
  },
  {
    title: 'I want to become a backend developer',
    href: '/roadmaps/backend-development',
    description: 'APIs, databases and server-side logic.',
  },
  {
    title: 'I want to build websites',
    href: '/guides/how-to-learn-web-development',
    description: 'From first HTML page to deployed site.',
  },
  {
    title: 'I want to learn Python',
    href: '/roadmaps/python-development',
    description: 'The most beginner-friendly language.',
  },
  {
    title: 'I want to learn AI',
    href: '/roadmaps/ai-for-work',
    description: 'Practical AI skills for work and products.',
  },
  {
    title: 'I want to build real projects',
    href: '/projects',
    description: 'Turn learning into proof of skill.',
  },
  {
    title: 'I want to get into tech',
    href: '/guides/how-to-get-into-tech',
    description: 'A realistic path from zero to first role.',
  },
  {
    title: 'I want to start a tech career',
    href: '/careers',
    description: 'Explore roles and the path to each one.',
  },
]

export default function StartPage() {
  return (
    <div className="section pt-16">
      <div className="container">
        <PageViewTracker path="/start" eventName="start_page_open" />
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Start Here' }]} />

        <header className="mb-12 max-w-3xl">
          <span className="section-label">Start Here</span>
          <h1 className="font-editorial text-display-xl">What do you want to learn?</h1>
          <p className="mt-4 text-lg text-text-secondary">
            Pick a goal below for a direct path, or take the quick quiz to get a personalized
            recommendation in under a minute.
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
          <div>
            <h2 className="font-display text-xl font-semibold mb-5">Learn by goal</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {GOALS.map((goal) => (
                <Link
                  key={goal.href}
                  href={goal.href}
                  className="card group flex h-full flex-col gap-2 no-underline"
                >
                  <h3 className="font-display text-lg text-text-primary group-hover:text-teal">
                    {goal.title}
                  </h3>
                  <p className="text-sm text-text-secondary">{goal.description}</p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-teal">
                    Go there <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-10 border-t border-border-subtle pt-8">
              <h2 className="font-display text-xl font-semibold mb-4">Popular roadmaps</h2>
              <ul className="grid gap-2 sm:grid-cols-2">
                {[
                  ['Frontend', '/roadmaps/frontend-development'],
                  ['Backend', '/roadmaps/backend-development'],
                  ['Full-Stack', '/roadmaps/full-stack-development'],
                  ['JavaScript', '/roadmaps/javascript'],
                  ['Python', '/roadmaps/python'],
                  ['Data Science', '/roadmaps/data-science'],
                  ['Cybersecurity', '/roadmaps/cybersecurity'],
                ].map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="flex items-center justify-between rounded-md border border-border-default px-4 py-3 text-sm font-medium text-text-primary transition-colors hover:border-teal hover:text-teal no-underline"
                    >
                      {label} <ArrowRight size={14} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold mb-5">Take the quick quiz</h2>
            <TrackQuiz />
          </div>
        </div>
      </div>
    </div>
  )
}