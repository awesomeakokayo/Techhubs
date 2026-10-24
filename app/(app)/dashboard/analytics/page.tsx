import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { getTrackById } from '@/lib/tracks'
import { buildGuidedPath } from '@/lib/guided-path'
import { buildAIWorldClassPath } from '@/lib/ai-guided-path'
import { computeRetention, computePathFunnel, toDayKey } from '@/lib/retention'
import { PageHeader } from '@/components/ui/PageHeader'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const daysAgo = (days: number) => Date.now() - days * 24 * 60 * 60 * 1000

function trackName(id: string) {
  return getTrackById(id)?.name || id
}

function stepCount(trackId: string) {
  return trackId.startsWith('ai-') ? buildAIWorldClassPath(trackId).length : buildGuidedPath(trackId).length
}

function date(value: Date) {
  return value.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default async function AnalyticsDashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login?next=/dashboard/analytics')

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  const email = session.user.email?.trim().toLowerCase()
  if (!adminEmail || email !== adminEmail) {
    return (
      <div className="section pt-16">
        <div className="container">
          <PageHeader title="Founder Analytics" subtitle="Internal TechSkillHub metrics." breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Dashboard' }, { label: 'Analytics' }]} />
          <div className="card max-w-xl">
            <p className="text-sm text-text-secondary">
              {adminEmail ? 'Your account is not configured as the TechSkillHub admin.' : 'Set ADMIN_EMAIL in your production environment to the email address of the admin account.'}
            </p>
          </div>
        </div>
      </div>
    )
  }

  const [accountCount, progress, enrollments, completions, recentActivity, onboardedProfiles] = await Promise.all([
    prisma.user.count(),
    prisma.userProgress.findMany({
      select: { userId: true, trackId: true, createdAt: true, updatedAt: true, completedAt: true, itemType: true, status: true },
    }),
    prisma.guidedPathEnrollment.findMany({
      select: { userId: true, trackId: true, currentStepIndex: true, lastActivityAt: true },
    }),
    prisma.courseCompletion.findMany({
      select: { userId: true, trackId: true, completedAt: true },
    }),
    prisma.userProgress.findMany({
      orderBy: { updatedAt: 'desc' },
      take: 15,
      select: {
        trackId: true,
        itemType: true,
        status: true,
        updatedAt: true,
        user: { select: { name: true, email: true } },
      },
    }),
    prisma.learnerProfile.findMany({
      where: { onboardingCompleted: true },
      select: { userId: true },
    }),
  ])

  const learnersWithProgress = new Set(progress.map((x) => x.userId)).size
  const activeThisWeek = new Set(enrollments.filter((x) => x.lastActivityAt.getTime() >= daysAgo(7)).map((x) => x.userId)).size
  const progressThisWeek = new Set(progress.filter((x) => x.createdAt.getTime() >= daysAgo(7)).map((x) => x.userId)).size
  const completionRate = enrollments.length ? Math.round((completions.length / enrollments.length) * 100) : 0

  const retention = computeRetention(
    accountCount,
    onboardedProfiles.map((profile) => profile.userId),
    progress
      .filter((row) => row.status === 'COMPLETED' && row.completedAt)
      .map((row) => ({ userId: row.userId, day: toDayKey(row.completedAt as Date) })),
  )

  const funnel = computePathFunnel(
    enrollments.map((enrollment) => ({
      currentStepIndex: enrollment.currentStepIndex,
      totalSteps: stepCount(enrollment.trackId),
    })),
  )

  const byTrack = new Map<string, { enrollments: number; completions: number }>()
  for (const row of enrollments) {
    const item = byTrack.get(row.trackId) || { enrollments: 0, completions: 0 }
    item.enrollments += 1
    byTrack.set(row.trackId, item)
  }
  for (const row of completions) {
    const item = byTrack.get(row.trackId) || { enrollments: 0, completions: 0 }
    item.completions += 1
    byTrack.set(row.trackId, item)
  }

  const tracks = Array.from(byTrack.entries())
    .map(([trackId, values]) => ({ trackId, ...values }))
    .sort((a, b) => b.enrollments - a.enrollments)

  return (
    <div className="section pt-16">
      <div className="container">
        <PageHeader
          title="Founder Analytics"
          subtitle="Live learning and traction metrics pulled directly from the production database."
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Dashboard' }, { label: 'Analytics' }]}
        />

        <div className="mb-6 flex items-center justify-between gap-3">
          <p className="text-xs text-text-muted">Database-backed. Refresh the page for the latest values.</p>
          <Link href="/dashboard/analytics" className="btn btn-secondary text-sm">Refresh</Link>
        </div>

        <section>
          <p className="section-label">TRACTION</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Accounts', accountCount, 'Registered accounts'],
              ['Guided enrollments', enrollments.length, 'Learner-course starts'],
              ['Progress records', progress.length, 'Learning activity records'],
              ['Courses completed', completions.length, 'Verified completions'],
            ].map(([label, value, hint]) => (
              <article key={String(label)} className="card">
                <p className="font-mono text-xs uppercase tracking-wider text-text-muted">{label}</p>
                <p className="mt-2 font-editorial text-4xl text-teal">{value}</p>
                <p className="mt-2 text-xs text-text-muted">{hint}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <p className="section-label">ENGAGEMENT</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Learners with progress', learnersWithProgress, 'Unique users with activity'],
              ['Active this week', activeThisWeek, 'Guided-path learners active in 7 days'],
              ['Completion rate', `${completionRate}%`, 'Completions / guided enrollments'],
              ['Recent active learners', progressThisWeek, 'Users generating progress in 7 days'],
            ].map(([label, value, hint]) => (
              <article key={String(label)} className="card">
                <p className="font-mono text-xs uppercase tracking-wider text-text-muted">{label}</p>
                <p className="mt-2 font-editorial text-3xl text-teal">{value}</p>
                <p className="mt-2 text-xs text-text-muted">{hint}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <p className="section-label">RETENTION</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ['Activation rate', `${retention.activationRate}%`, `${retention.activated} of ${retention.signups} accounts activated`],
              ['Onboarded', retention.onboarded, 'Completed the path-finder flow'],
              ['Activated learners', retention.activated, 'Completed at least one activity'],
              ['D1 retention', `${retention.d1.rate}%`, `${retention.d1.returned}/${retention.d1.eligible} returned next day`],
              ['D7 retention', `${retention.d7.rate}%`, `${retention.d7.returned}/${retention.d7.eligible} returned within 7 days`],
              ['D30 retention', `${retention.d30.rate}%`, `${retention.d30.returned}/${retention.d30.eligible} returned within 30 days`],
            ].map(([label, value, hint]) => (
              <article key={String(label)} className="card">
                <p className="font-mono text-xs uppercase tracking-wider text-text-muted">{label}</p>
                <p className="mt-2 font-editorial text-3xl text-teal">{value}</p>
                <p className="mt-2 text-xs text-text-muted">{hint}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <p className="section-label">PATH PROGRESSION FUNNEL</p>
          <div className="mt-4 card">
            <div className="grid gap-4 sm:grid-cols-5">
              {[
                ['Started', funnel.started, 'Completed first step'],
                ['Reached 25%', funnel.reached25, 'Quarter through a path'],
                ['Reached 50%', funnel.reached50, 'Halfway through a path'],
                ['Reached 75%', funnel.reached75, 'Three-quarters complete'],
                ['Completed', funnel.completed, 'Finished a path'],
              ].map(([label, value, hint]) => (
                <div key={String(label)} className="border-border-subtle sm:border-r sm:last:border-0 sm:pr-4 sm:last:pr-0">
                  <p className="font-mono text-xs uppercase tracking-wider text-text-muted">{label}</p>
                  <p className="mt-2 font-editorial text-3xl text-teal">{value}</p>
                  <p className="mt-2 text-xs text-text-muted">{hint}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10">
          <p className="section-label">GUIDED PATH PERFORMANCE</p>
          <div className="mt-4 card overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead>
                <tr className="border-b border-border-default text-xs uppercase tracking-wider text-text-muted">
                  <th className="px-3 py-3">Course</th>
                  <th className="px-3 py-3">Enrollments</th>
                  <th className="px-3 py-3">Completions</th>
                  <th className="px-3 py-3">Completion rate</th>
                </tr>
              </thead>
              <tbody>
                {tracks.map((track) => (
                  <tr key={track.trackId} className="border-b border-border-subtle last:border-0">
                    <td className="px-3 py-3 text-text-primary">{trackName(track.trackId)}</td>
                    <td className="px-3 py-3 text-text-secondary">{track.enrollments}</td>
                    <td className="px-3 py-3 text-text-secondary">{track.completions}</td>
                    <td className="px-3 py-3 text-text-muted">{track.enrollments ? Math.round((track.completions / track.enrollments) * 100) : 0}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10 pb-16">
          <p className="section-label">RECENT LEARNING ACTIVITY</p>
          <div className="mt-4 card overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-border-default text-xs uppercase tracking-wider text-text-muted">
                  <th className="px-3 py-3">Learner</th>
                  <th className="px-3 py-3">Course</th>
                  <th className="px-3 py-3">Activity</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3">Updated</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((row, index) => (
                  <tr key={`${row.trackId}-${row.updatedAt.toISOString()}-${index}`} className="border-b border-border-subtle last:border-0">
                    <td className="px-3 py-3 text-text-primary">{row.user.name || row.user.email || 'Learner'}</td>
                    <td className="px-3 py-3 text-text-secondary">{trackName(row.trackId)}</td>
                    <td className="px-3 py-3 capitalize text-text-secondary">{row.itemType}</td>
                    <td className="px-3 py-3 capitalize text-text-muted">{row.status.toLowerCase().replace('_', ' ')}</td>
                    <td className="px-3 py-3 text-text-muted">{date(row.updatedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}
