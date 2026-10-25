import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Award, CheckCircle2, Flame, Trophy } from 'lucide-react'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { getTrackById } from '@/lib/tracks'
import { getTrackIcon } from '@/lib/icons'
import { calculateLearningRhythm, DEFAULT_LEARNER_TIME_ZONE } from '@/lib/learning-rhythm'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Achievements | TechSkillHub',
  description: 'Your earned certificates and learning milestones.',
  robots: { index: false, follow: false },
}

const ACTIVITY_MILESTONES = [
  { count: 1, title: 'First step taken', description: 'You completed your first learning activity.' },
  { count: 5, title: 'Building momentum', description: 'Five learning activities completed.' },
  { count: 10, title: 'Learning in action', description: 'Ten learning activities completed.' },
  { count: 25, title: 'Committed builder', description: 'Twenty-five learning activities completed.' },
  { count: 50, title: 'Skill builder', description: 'Fifty learning activities completed.' },
  { count: 100, title: 'Learning champion', description: 'One hundred learning activities completed.' },
]

const STREAK_MILESTONES = [
  { days: 3, title: 'Three-day streak' },
  { days: 7, title: 'One-week streak' },
  { days: 14, title: 'Two-week streak' },
  { days: 30, title: 'Thirty-day streak' },
]

export default async function AchievementsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login?next=/achievements')

  const userId = session.user.id
  const now = new Date()
  const historyStart = new Date(now)
  historyStart.setDate(historyStart.getDate() - 400)

  const [profile, completions, activityRecords, totalActivities] = await Promise.all([
    prisma.learnerProfile.findUnique({ where: { userId } }),
    prisma.courseCompletion.findMany({ where: { userId }, orderBy: { completedAt: 'desc' } }),
    prisma.userProgress.findMany({
      where: { userId, status: 'COMPLETED', completedAt: { gte: historyStart } },
      select: { completedAt: true },
    }),
    prisma.userProgress.count({ where: { userId, status: 'COMPLETED' } }),
  ])

  const timeZone = profile?.timeZone || DEFAULT_LEARNER_TIME_ZONE
  const rhythm = calculateLearningRhythm(activityRecords.map((activity) => activity.completedAt), now, timeZone)

  const earnedActivity = ACTIVITY_MILESTONES.filter((milestone) => totalActivities >= milestone.count)
  const nextActivity = ACTIVITY_MILESTONES.find((milestone) => totalActivities < milestone.count)
  const nextActivityTarget = nextActivity?.count ?? 0
  const previousActivityTarget = earnedActivity.length ? earnedActivity[earnedActivity.length - 1].count : 0
  const milestoneProgress = nextActivity
    ? Math.min(100, Math.round(((totalActivities - previousActivityTarget) / Math.max(1, nextActivityTarget - previousActivityTarget)) * 100))
    : 100

  return (
    <div className="pb-4">
      <header>
        <p className="section-label">Achievements</p>
        <h1 className="mt-2 font-display text-display-md text-text-primary">Your accomplishments</h1>
        <p className="mt-2 max-w-xl text-text-secondary">
          Certificates are earned by completing a guided path. Milestones reflect genuine learning activity.
        </p>
      </header>

      <section className="mt-8">
        <h2 className="font-display text-xl text-text-primary">Certificates</h2>
        {completions.length > 0 ? (
          <div className="mt-4 space-y-3">
            {completions.map((completion) => {
              const track = getTrackById(completion.trackId)
              const Icon = track ? getTrackIcon(track.icon) : Trophy
              return (
                <div key={completion.trackId} className="flex items-center gap-3 rounded-lg border border-border-subtle p-3">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={track ? { backgroundColor: track.colorHex + '18', color: track.colorHex } : undefined}
                  >
                    <Icon size={19} aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-text-primary">{track?.name ?? completion.trackId}</p>
                    <p className="text-xs text-text-muted">
                      Completed {completion.completedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <Link href={`/certificate/${completion.trackId}`} className="btn btn-secondary text-xs">
                    View certificate
                  </Link>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="card mt-4">
            <p className="text-sm text-text-secondary">
              No certificates yet. A certificate is issued when you complete every step of a guided path.
            </p>
            <Link href="/learning" className="btn btn-primary mt-4 inline-flex items-center gap-2 text-sm">
              My Learning
            </Link>
          </div>
        )}
      </section>

      <section className="mt-10 grid gap-5 lg:grid-cols-2">
        <article className="card">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="section-label">Milestones</p>
              <h2 className="mt-1 font-display text-lg font-semibold text-text-primary">{totalActivities} learning activities</h2>
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-grape/10 text-grape">
              <Award size={18} aria-hidden />
            </span>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-text-muted">
              <span>{nextActivity ? nextActivity.title : 'All activity milestones earned'}</span>
              <span className="font-mono">{totalActivities}{nextActivity ? ` / ${nextActivityTarget}` : ''}</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border-subtle">
              <div className="h-full rounded-full bg-grape" style={{ width: milestoneProgress + '%' }} />
            </div>
          </div>

          <ul className="mt-4 space-y-2">
            {earnedActivity.length > 0 ? (
              earnedActivity.map((milestone) => (
                <li key={milestone.count} className="flex items-start gap-2 text-sm text-text-secondary">
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[var(--color-success)]" aria-hidden />
                  <span>{milestone.title}</span>
                </li>
              ))
            ) : (
              <li className="text-sm text-text-muted">Complete your first guided activity to earn your first milestone.</li>
            )}
          </ul>
        </article>

        <article className="card">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="section-label">Streaks</p>
              <h2 className="mt-1 font-display text-lg font-semibold text-text-primary">
                {rhythm.currentStreakDays}-day streak
              </h2>
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-grape/10 text-grape">
              <Flame size={18} aria-hidden />
            </span>
          </div>
          <ul className="mt-4 space-y-2">
            {STREAK_MILESTONES.map((milestone) => {
              const earned = rhythm.currentStreakDays >= milestone.days
              return (
                <li key={milestone.days} className="flex items-center justify-between text-sm">
                  <span className={earned ? 'text-text-secondary' : 'text-text-muted'}>{milestone.title}</span>
                  <span className={'badge ' + (earned ? 'badge-green' : '')}>
                    {earned ? 'Earned' : `${milestone.days} days`}
                  </span>
                </li>
              )
            })}
          </ul>
          <p className="mt-4 text-xs text-text-muted">
            {rhythm.activeToday ? 'You have learned today.' : 'Complete an activity today to continue your streak.'}
          </p>
        </article>
      </section>
    </div>
  )
}
