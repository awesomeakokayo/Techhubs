import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowRight, CheckCircle2, Flame, Route, Target, Trophy } from 'lucide-react'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { getAllTracks, getTrackById } from '@/lib/tracks'
import { getTrackIcon } from '@/lib/icons'
import { getGuidedPathSummaries } from '@/lib/learner-overview'
import {
  calculateLearningRhythm,
  DEFAULT_LEARNER_TIME_ZONE,
  DEFAULT_PLANNED_STUDY_DAYS,
  getLocalWeekday,
  WEEKDAY_LABELS,
} from '@/lib/learning-rhythm'
import { PathSummaryCard } from '@/components/app/PathSummaryCard'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Home | TechSkillHub',
  description: 'Your personalized TechSkillHub learning home.',
  robots: { index: false, follow: false },
}

function getGreeting(timeZone: string): string {
  const hour = Number(
    new Intl.DateTimeFormat('en-GB', { hour: '2-digit', hour12: false, timeZone }).format(new Date()),
  )
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login?next=/dashboard')

  const userId = session.user.id
  const now = new Date()
  const historyStart = new Date(now)
  historyStart.setDate(historyStart.getDate() - 400)

  const [profile, summaries, completions, activityRecords, totalActivities] = await Promise.all([
    prisma.learnerProfile.findUnique({ where: { userId } }),
    getGuidedPathSummaries(prisma, userId),
    prisma.courseCompletion.findMany({ where: { userId }, select: { trackId: true } }),
    prisma.userProgress.findMany({
      where: { userId, status: 'COMPLETED', completedAt: { gte: historyStart } },
      select: { completedAt: true },
    }),
    prisma.userProgress.count({ where: { userId, status: 'COMPLETED' } }),
  ])

  const timeZone = profile?.timeZone || DEFAULT_LEARNER_TIME_ZONE
  const rhythm = calculateLearningRhythm(
    activityRecords.map((activity) => activity.completedAt),
    now,
    timeZone,
  )
  const dailyGoalSteps = profile?.dailyGoalSteps ?? 1

  const active = summaries.filter((summary) => !summary.isComplete)
  const recommendedSummary = profile?.recommendedTrackId
    ? active.find((summary) => summary.trackId === profile.recommendedTrackId)
    : undefined
  const focus = recommendedSummary ?? active[0]
  const recommendedTrack = profile?.recommendedTrackId ? getTrackById(profile.recommendedTrackId) : undefined

  const completedTrackIds = new Set(completions.map((item) => item.trackId))
  const enrolledTrackIds = new Set(summaries.map((item) => item.trackId))
  const suggestion = getAllTracks().find(
    (track) => !completedTrackIds.has(track.id) && !enrolledTrackIds.has(track.id),
  )

  const todayWeekday = getLocalWeekday(now, timeZone)
  const plannedDays = profile?.plannedStudyDays?.length
    ? profile.plannedStudyDays
    : [...DEFAULT_PLANNED_STUDY_DAYS]
  const isPlannedStudyDay = plannedDays.includes(todayWeekday)
  const nextPlannedDay = plannedDays.find((day) => day > todayWeekday) ?? plannedDays[0]
  const nextPlannedDayLabel = WEEKDAY_LABELS[nextPlannedDay - 1]
  const goalComplete = rhythm.activitiesToday >= dailyGoalSteps

  const metrics = [
    { label: 'Active paths', value: active.length, icon: Route, href: '/learning' },
    { label: 'Activities completed', value: totalActivities, icon: CheckCircle2, href: '/achievements' },
    { label: 'Day streak', value: rhythm.currentStreakDays, icon: Flame, href: '/plan' },
    { label: 'Certificates', value: completions.length, icon: Trophy, href: '/achievements' },
  ]

  const FocusIcon = focus ? getTrackIcon(focus.icon) : recommendedTrack ? getTrackIcon(recommendedTrack.icon) : null
  const greeting = getGreeting(timeZone)
  const userName = session.user.name?.split(' ')[0] || 'Learner'

  return (
    <div className="pb-4">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="section-label">Home</p>
          <h1 className="mt-2 font-display text-display-md text-text-primary">
            {greeting}, {userName}.
          </h1>
          <p className="mt-2 max-w-xl text-text-secondary">
            {focus
              ? `You are working through ${focus.name}.`
              : 'Your learning space is organised around what you are trying to achieve.'}
          </p>
        </div>
      </header>

      {/* Continue learning */}
      <section className="mt-8 overflow-hidden rounded-2xl border border-border-default bg-surface shadow-card">
        <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.6fr_1fr] lg:items-stretch">
          <div className="min-w-0">
            <p className="section-label">{focus ? 'Continue learning' : 'Get started'}</p>
            {focus && FocusIcon ? (
              <>
                <div className="mt-3 flex items-center gap-3">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: focus.colorHex + '18', color: focus.colorHex }}
                  >
                    <FocusIcon size={20} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">{focus.name}</p>
                    <h2 className="font-display text-2xl font-semibold text-text-primary">
                      {focus.nextStepTitle ?? 'Start this learning path'}
                    </h2>
                  </div>
                </div>
                <div className="mt-5 max-w-md">
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <span>Path progress</span>
                    <span className="font-mono">{focus.percent}%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-border-subtle">
                    <div className="h-full rounded-full" style={{ width: focus.percent + '%', backgroundColor: focus.colorHex }} />
                  </div>
                  <p className="mt-2 text-xs text-text-muted">
                    Step {Math.min(focus.completedSteps + 1, focus.totalSteps)} of {focus.totalSteps}
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={'/guided-path/' + focus.trackId} className="btn btn-primary inline-flex items-center gap-2">
                    Continue learning <ArrowRight size={16} />
                  </Link>
                  <Link href={'/tracks/' + focus.slug} className="btn btn-secondary inline-flex items-center gap-2">
                    View path
                  </Link>
                </div>
              </>
            ) : recommendedTrack && FocusIcon ? (
              <>
                <div className="mt-3 flex items-center gap-3">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: recommendedTrack.colorHex + '18', color: recommendedTrack.colorHex }}
                  >
                    <FocusIcon size={20} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">{recommendedTrack.name}</p>
                    <h2 className="font-display text-2xl font-semibold text-text-primary">Your recommended path</h2>
                  </div>
                </div>
                <p className="mt-3 max-w-xl text-sm leading-6 text-text-secondary">{recommendedTrack.tagline}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={'/guided-path/' + recommendedTrack.id} className="btn btn-primary inline-flex items-center gap-2">
                    Start learning <ArrowRight size={16} />
                  </Link>
                  <Link href={'/tracks/' + recommendedTrack.slug} className="btn btn-secondary inline-flex items-center gap-2">
                    View path
                  </Link>
                </div>
              </>
            ) : (
              <>
                <h2 className="mt-3 max-w-lg font-display text-2xl font-semibold text-text-primary">Find a path built around you.</h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-text-secondary">
                  Answer a few questions and we will recommend a learning path that fits your goal, experience and available time.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/find-your-path?from=dashboard" className="btn btn-primary inline-flex items-center gap-2">
                    Find my path <ArrowRight size={16} />
                  </Link>
                  <Link href="/tracks" className="btn btn-secondary inline-flex items-center gap-2">
                    Explore paths
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Today / goal */}
          <div className="rounded-xl border border-border-subtle bg-elevated/50 p-5">
            <div className="flex items-center gap-2">
              <Target size={16} className="text-grape" aria-hidden />
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">Today&apos;s goal</p>
            </div>
            <p className="mt-3 font-display text-base font-semibold text-text-primary">
              {isPlannedStudyDay ? (goalComplete ? 'Goal complete for today.' : 'A small step counts.') : 'Today is your planned rest day.'}
            </p>
            <p className="mt-2 text-sm leading-6 text-text-secondary">
              {goalComplete
                ? 'Your activity has been recorded for today.'
                : isPlannedStudyDay
                  ? `Complete ${dailyGoalSteps} guided activity${dailyGoalSteps === 1 ? '' : 'ies'} to reach today's goal.`
                  : `Your next planned learning day is ${nextPlannedDayLabel}.`}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border-subtle pt-4 text-xs text-text-muted">
              <span className="inline-flex items-center gap-1.5">
                <Flame size={13} className="text-grape" aria-hidden /> {rhythm.currentStreakDays}-day streak
              </span>
              <span>{rhythm.activitiesToday} completed today</span>
            </div>
            <Link href="/plan" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-grape no-underline hover:text-grape-bright">
              Adjust your plan <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Learning summary">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <Link key={metric.label} href={metric.href} className="card flex items-center gap-4 no-underline">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-grape/10 text-grape">
                <Icon size={20} aria-hidden />
              </span>
              <div>
                <p className="font-display text-2xl font-semibold text-text-primary">{metric.value}</p>
                <p className="text-xs leading-tight text-text-secondary">{metric.label}</p>
              </div>
            </Link>
          )
        })}
      </section>

      {/* Active paths */}
      <section className="mt-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-label">In progress</p>
            <h2 className="mt-1 font-display text-2xl text-text-primary">Keep your momentum visible.</h2>
          </div>
          <Link href="/learning" className="inline-flex items-center gap-1.5 text-sm font-semibold text-grape no-underline hover:text-grape-bright">
            My Learning <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {active.slice(0, 3).map((summary) => (
            <PathSummaryCard key={summary.trackId} summary={summary} />
          ))}
          {active.length === 0 && (
            <article className="card md:col-span-2 xl:col-span-3">
              <h3 className="font-display text-lg font-semibold text-text-primary">No learning path started yet.</h3>
              <p className="mt-1 max-w-xl text-sm leading-6 text-text-secondary">
                Start with your personalised recommendation, or explore paths and choose the one that fits your next goal.
              </p>
              <Link href="/find-your-path?from=dashboard" className="btn btn-primary mt-4 inline-flex items-center gap-2">
                Find my path <ArrowRight size={15} />
              </Link>
            </article>
          )}
        </div>
      </section>

      {/* Recommendation / discovery */}
      <section className="mt-10 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <article className="card">
          <p className="section-label">Learning plan</p>
          <h2 className="mt-1 font-display text-lg font-semibold text-text-primary">Your weekly rhythm.</h2>
          <p className="mt-2 text-sm leading-6 text-text-secondary">
            {isPlannedStudyDay
              ? `Today is a planned learning day. ${rhythm.activitiesToday} of ${dailyGoalSteps} activities completed.`
              : `Your next planned learning day is ${nextPlannedDayLabel}.`}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/plan" className="btn btn-secondary inline-flex items-center gap-2 text-sm">Learning Plan</Link>
            <Link href="/achievements" className="btn btn-ghost inline-flex items-center gap-2 text-sm">Achievements</Link>
          </div>
        </article>

        {suggestion ? (
          <article className="card">
            <p className="section-label">Explore next</p>
            <h2 className="mt-1 font-display text-lg font-semibold text-text-primary">{suggestion.name}</h2>
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-text-secondary">{suggestion.tagline}</p>
            <Link href={'/tracks/' + suggestion.slug} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-grape no-underline hover:text-grape-bright">
              Explore path <ArrowRight size={14} />
            </Link>
          </article>
        ) : (
          <article className="card">
            <p className="section-label">Explore</p>
            <h2 className="mt-1 font-display text-lg font-semibold text-text-primary">Browse the catalogue</h2>
            <p className="mt-2 text-sm leading-6 text-text-secondary">Explore guides, roadmaps and projects across every path.</p>
            <Link href="/tracks" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-grape no-underline hover:text-grape-bright">
              Explore Paths <ArrowRight size={14} />
            </Link>
          </article>
        )}
      </section>
    </div>
  )
}
