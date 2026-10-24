import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { getGuidedPathSummaries } from '@/lib/learner-overview'
import { PathSummaryCard, CompletedPathRow } from '@/components/app/PathSummaryCard'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'My Learning | TechSkillHub',
  description: 'Your current and completed learning paths.',
  robots: { index: false, follow: false },
}

export default async function LearningPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login?next=/learning')

  const summaries = await getGuidedPathSummaries(prisma, session.user.id)
  const active = summaries.filter((summary) => !summary.isComplete)
  const completed = summaries.filter((summary) => summary.isComplete)

  return (
    <div className="pb-4">
      <header>
        <p className="section-label">My Learning</p>
        <h1 className="mt-2 font-display text-display-md text-text-primary">Your learning paths</h1>
        <p className="mt-2 max-w-xl text-text-secondary">
          Pick up where you left off, or review a path you have finished.
        </p>
      </header>

      <section className="mt-8">
        <h2 className="font-display text-xl text-text-primary">In progress</h2>
        {active.length > 0 ? (
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {active.map((summary) => (
              <PathSummaryCard key={summary.trackId} summary={summary} />
            ))}
          </div>
        ) : (
          <div className="card mt-4">
            <p className="text-sm text-text-secondary">You do not have a path in progress.</p>
            <Link href="/tracks" className="btn btn-primary mt-4 inline-flex items-center gap-2 text-sm">
              Explore paths
            </Link>
          </div>
        )}
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl text-text-primary">Completed</h2>
        {completed.length > 0 ? (
          <div className="mt-4 space-y-3">
            {completed.map((summary) => (
              <CompletedPathRow key={summary.trackId} summary={summary} />
            ))}
          </div>
        ) : (
          <p className="card mt-4 text-sm text-text-secondary">
            No completed paths yet. Finish a guided path to earn a certificate.
          </p>
        )}
      </section>
    </div>
  )
}
