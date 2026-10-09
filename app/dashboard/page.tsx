import Link from 'next/link'
import { redirect } from 'next/navigation'
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Compass,
  ExternalLink,
  Flame,
  Gauge,
  Trophy,
  UserRound,
} from 'lucide-react'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { getTrackById } from '@/lib/tracks'
import { getTrackIcon } from '@/lib/icons'
import { buildGuidedPath } from '@/lib/guided-path'
import { buildAIWorldClassPath } from '@/lib/ai-guided-path'
import type { LearnerExperienceLevel } from '@/lib/learner-profile'
import { DailyGoalControl } from '@/components/dashboard/DailyGoalControl'
import { WeeklyLearningPlan } from '@/components/dashboard/WeeklyLearningPlan'
import { calculateLearningRhythm, DEFAULT_LEARNER_TIME_ZONE, DEFAULT_PLANNED_STUDY_DAYS, getLocalWeekday, WEEKDAY_LABELS } from '@/lib/learning-rhythm'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Learning Home | TechSkillHub',
  description: 'Your personalized TechSkillHub learning home.',
  robots: { index: false, follow: false },
}

type Enrollment = {
  trackId: string
  currentStepIndex: number
  startedAt: Date
  lastActivityAt: Date
}

const EXPERIENCE_LABELS: Record<LearnerExperienceLevel, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

const GOAL_SUMMARIES: Record<string, string> = {
  'Get a job at a tech company': 'Build job-ready skills and a portfolio.',
  'Build my own products': 'Move from ideas to practical products.',
  'Freelance and work independently': 'Build skills you can turn into client work.',
  'Understand tech enough to lead': 'Build enough technical fluency to lead with confidence.',
}

function getSteps(trackId: string) {
  return trackId.startsWith('ai-') ? buildAIWorldClassPath(trackId) : buildGuidedPath(trackId)
}

function progressFor(enrollment: Enrollment) {
  const steps = getSteps(enrollment.trackId)
  if (!steps.length) return { steps, percent: 0 }
  return {
    steps,
    percent: Math.min(100, Math.round((enrollment.currentStepIndex / steps.length) * 100)),
  }
}

function formatDate(value: Date) {
  return value.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login?next=/dashboard')

  const userId = session.user.id
  const now = new Date()
  const weekStart = new Date(now)
  weekStart.setDate(weekStart.getDate() - 7)
  const historyStart = new Date(now)
  historyStart.setDate(historyStart.getDate() - 400)

  const [profile, enrollments, completions, activityRecords, totalActivities, weeklyActivity, weeklyProjects] = await Promise.all([
    prisma.learnerProfile.findUnique({ where: { userId } }),
    prisma.guidedPathEnrollment.findMany({
      where: { userId },
      orderBy: { lastActivityAt: 'desc' },
      take: 6,
      select: {
        trackId: true,
        currentStepIndex: true,
        startedAt: true,
        lastActivityAt: true,
      },
    }),
    prisma.courseCompletion.findMany({
      where: { userId },
      select: { trackId: true },
    }),
    prisma.userProgress.findMany({
      where: {
        userId,
        status: 'COMPLETED',
        completedAt: { gte: historyStart },
      },
      select: { completedAt: true },
    }),
    prisma.userProgress.count({
      where: { userId, status: 'COMPLETED' },
    }),
    prisma.userProgress.count({
      where: {
        userId,
        completedAt: { gte: weekStart },
        status: 'COMPLETED',
      },
    }),
    prisma.userProgress.count({
      where: {
        userId,
        completedAt: { gte: weekStart },
        itemType: 'project',
        status: 'COMPLETED',
      },
    }),
  ])

  const rhythm = calculateLearningRhythm(
    activityRecords.map((activity) => activity.completedAt),
    now,
    profile?.timeZone || DEFAULT_LEARNER_TIME_ZONE,
  )
  const dailyGoalSteps = profile?.dailyGoalSteps ?? 1
  const plannedStudyDays = profile?.plannedStudyDays?.length
    ? profile.plannedStudyDays
    : [...DEFAULT_PLANNED_STUDY_DAYS]
  const todayWeekday = getLocalWeekday(now, profile?.timeZone || DEFAULT_LEARNER_TIME_ZONE)
  const isPlannedStudyDay = plannedStudyDays.includes(todayWeekday)
  const nextPlannedDay = plannedStudyDays.find((day) => day > todayWeekday) ?? plannedStudyDays[0]
  const nextPlannedDayLabel = WEEKDAY_LABELS[nextPlannedDay - 1]
  const activityMilestones = [
    { count: 1, title: 'First step taken' },
    { count: 5, title: 'Building momentum' },
    { count: 10, title: 'Learning in action' },
    { count: 25, title: 'Committed builder' },
    { count: 50, title: 'Skill builder' },
    { count: 100, title: 'Learning champion' },
  ]
  const nextMilestone = activityMilestones.find((milestone) => milestone.count > totalActivities)
  const nextActivityTarget = nextMilestone?.count ?? Math.ceil((totalActivities + 1) / 100) * 100
  const previousMilestones = activityMilestones.filter((milestone) => milestone.count < nextActivityTarget)
  const previousActivityTarget = previousMilestones.length ? previousMilestones[previousMilestones.length - 1].count : 0
  const milestoneProgress = Math.min(100, Math.round(
    ((totalActivities - previousActivityTarget) / Math.max(1, nextActivityTarget - previousActivityTarget)) * 100,
  ))

  const completedTrackIds = new Set(completions.map((item) => item.trackId))
  const typedEnrollments = enrollments as Enrollment[]

  const activeEnrollments = typedEnrollments
    .map((enrollment) => ({
      enrollment,
      ...progressFor(enrollment),
    }))
    .filter(({ steps }) => steps.length > 0)

  const recommendedTrack = profile?.recommendedTrackId
    ? getTrackById(profile.recommendedTrackId)
    : undefined

  const recommendedEnrollment = profile?.recommendedTrackId
    ? activeEnrollments.find(({ enrollment }) => enrollment.trackId === profile.recommendedTrackId)
    : undefined

  const activeFocus =
    recommendedEnrollment && !completedTrackIds.has(recommendedEnrollment.enrollment.trackId)
      ? recommendedEnrollment
      : activeEnrollments.find(({ enrollment }) => !completedTrackIds.has(enrollment.trackId))

  const focusTrack = activeFocus
    ? getTrackById(activeFocus.enrollment.trackId)
    : recommendedTrack && !completedTrackIds.has(recommendedTrack.id)
      ? recommendedTrack
      : undefined

  const focusSteps = activeFocus?.steps ?? (focusTrack ? getSteps(focusTrack.id) : [])
  const focusIndex = activeFocus?.enrollment.currentStepIndex ?? 0
  const nextStep = focusSteps[focusIndex]
  const focusPercent = activeFocus?.percent ?? 0

  const planNudgeTitle = isPlannedStudyDay
    ? rhythm.activeToday
      ? rhythm.activitiesToday >= dailyGoalSteps
        ? 'You have completed today’s goal.'
        : 'You are on your way.'
      : 'Keep today’s plan small.'
    : rhythm.activeToday
      ? 'You made room for learning today.'
      : 'Today is your planned rest day.'
  const planNudgeDescription = isPlannedStudyDay
    ? rhythm.activeToday
      ? rhythm.activitiesToday >= dailyGoalSteps
        ? 'Your activity has been recorded. Take a break or continue when you feel ready.'
        : 'One activity is already logged. There is still room for another small step toward your daily goal.'
      : nextStep
        ? 'A short session on ' + (focusTrack?.name ?? 'your learning path') + ' is enough to get started. Your next step is ready.'
        : 'Complete one small guided-path activity to log today’s progress.'
    : rhythm.activeToday
      ? 'You learned outside your usual schedule. That flexibility counts, too.'
      : 'Your next planned learning day is ' + nextPlannedDayLabel + '. You can rest today and return when it fits.'

  const plannedActiveDaysThisWeek = rhythm.currentWeekDays.filter(
    (day, index) => day.active && plannedStudyDays.includes(index + 1),
  ).length

  const profileComplete = Boolean(
    profile?.onboardingCompleted &&
      profile.primaryGoal &&
      profile.experienceLevel &&
      profile.weeklyHours &&
      profile.recommendedTrackId,
  )

  const userName = session.user.name?.split(' ')[0] || 'Learner'

  return (
    <div className="section pt-12">
      <div className="container max-w-6xl">
        <header className="mb-10">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="section-label">LEARNING HOME</p>
              <h1 className="mt-2 font-editorial text-display-lg text-text-primary">
                Welcome back, {userName}.
              </h1>
              <p className="mt-3 max-w-2xl text-lg text-text-secondary">
                Your learning space is organized around what you are trying to achieve, not a generic course list.
              </p>
            </div>
            <Link
              href="/account"
              className="btn btn-secondary inline-flex items-center gap-2 text-sm"
            >
              <UserRound size={15} />
              Account
            </Link>
          </div>
        </header>

        {!profileComplete && (
          <section className="card mb-8 border-teal/30 bg-surface">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal">
                  <Compass size={21} />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-teal">PERSONALIZE YOUR HOME</p>
                  <h2 className="mt-1 font-display text-xl font-semibold text-text-primary">
                    Tell us what you are working toward.
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">
                    Your answers help us recommend a learning path and pace that fit your goal and available time.
                  </p>
                </div>
              </div>
              <Link
                href="/find-your-path?from=dashboard"
                className="btn btn-primary inline-flex shrink-0 items-center justify-center gap-2"
              >
                Find My Path
                <ArrowRight size={16} />
              </Link>
            </div>
          </section>
        )}

        <section className="card mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal">
                <CalendarDays size={18} />
              </div>
              <div>
                <p className="section-label">{isPlannedStudyDay ? 'TODAY’S LEARNING PLAN' : 'YOUR LEARNING RHYTHM'}</p>
                <h2 className="mt-1 font-display text-lg font-semibold text-text-primary">{planNudgeTitle}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">{planNudgeDescription}</p>
              </div>
            </div>
            {isPlannedStudyDay && focusTrack && nextStep && rhythm.activitiesToday < dailyGoalSteps ? (
              <Link href={'/guided-path/' + focusTrack.id} className="btn btn-primary inline-flex shrink-0 items-center justify-center gap-2">
                Continue learning
                <ArrowRight size={15} />
              </Link>
            ) : null}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.65fr_1fr]">
          <article className="overflow-hidden rounded-xl border border-border-default bg-surface">
            <div className="border-b border-border-subtle px-6 py-5 sm:px-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="section-label">NEXT BEST ACTION</p>
                  <h2 className="mt-2 font-editorial text-2xl text-text-primary">
                    {focusTrack ? (nextStep ? 'Continue your path.' : 'Your path is ready.') : 'Choose your next path.'}
                  </h2>
                </div>
                {focusTrack && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border-default px-3 py-1 text-xs text-text-muted">
                    <Clock3 size={13} />
                    {nextStep?.estimatedTime ?? focusTrack.timeEstimate}
                  </span>
                )}
              </div>
            </div>

            <div className="px-6 py-6 sm:px-7">
              {focusTrack ? (
                <>
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: focusTrack.colorHex + '18', color: focusTrack.colorHex }}
                    >
                      {(() => {
                        const Icon = getTrackIcon(focusTrack.icon)
                        return <Icon size={22} aria-hidden />
                      })()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-text-muted">
                        {focusTrack.name}
                      </p>
                      <h3 className="mt-1 font-display text-xl font-semibold text-text-primary">
                        {nextStep?.title ?? 'Start this learning path'}
                      </h3>
                      <p className="mt-2 max-w-xl text-sm leading-6 text-text-secondary">
                        {nextStep?.description ?? focusTrack.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-lg border border-border-subtle bg-elevated/40 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
                        Path progress
                      </span>
                      <span className="font-mono text-xs text-text-muted">{focusPercent}%</span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-border-subtle">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: focusPercent + '%', backgroundColor: focusTrack.colorHex }}
                      />
                    </div>
                    <p className="mt-3 text-xs text-text-muted">
                      {nextStep
                        ? 'Step ' + Math.min(focusIndex + 1, focusSteps.length) + ' of ' + focusSteps.length
                        : 'Ready to begin'}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={'/guided-path/' + focusTrack.id}
                      className="btn btn-primary inline-flex items-center gap-2"
                    >
                      {nextStep ? 'Continue learning' : 'Start learning'}
                      <ArrowRight size={16} />
                    </Link>
                    <Link
                      href={'/tracks/' + focusTrack.slug}
                      className="btn btn-secondary inline-flex items-center gap-2"
                    >
                      View path
                      <ExternalLink size={14} />
                    </Link>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-start gap-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal">
                    <Compass size={22} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-text-primary">
                      Get a recommendation built around you.
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-text-secondary">
                      Take the short path finder and we will use your goal, experience and weekly time to shape the starting point.
                    </p>
                  </div>
                  <Link
                    href="/find-your-path?from=dashboard"
                    className="btn btn-primary inline-flex items-center gap-2"
                  >
                    Personalize my path
                    <ArrowRight size={16} />
                  </Link>
                </div>
              )}
            </div>
          </article>

          <aside className="space-y-5">
            <section className="card">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10 text-teal">
                  <Gauge size={18} />
                </div>
                <div>
                  <p className="section-label">YOUR PACE</p>
                  <p className="mt-1 font-display text-lg font-semibold text-text-primary">
                    {profile?.weeklyHours ? profile.weeklyHours + ' hours / week' : 'Not set yet'}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-text-secondary">
                {profile?.primaryGoal
                  ? GOAL_SUMMARIES[profile.primaryGoal] ?? 'Your learning plan is shaped around your stated goal.'
                  : 'Set your goal and pace to make this home personal.'}
              </p>
              {profile?.experienceLevel && (
                <div className="mt-4 flex items-center justify-between border-t border-border-subtle pt-4">
                  <span className="text-xs uppercase tracking-[0.14em] text-text-muted">Experience</span>
                  <span className="text-sm font-medium text-text-primary">
                    {EXPERIENCE_LABELS[profile.experienceLevel as LearnerExperienceLevel] ?? profile.experienceLevel}
                  </span>
                </div>
              )}
              <Link
                href="/find-your-path?from=dashboard"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal no-underline hover:text-teal-bright"
              >
                {profileComplete ? 'Update my preferences' : 'Personalize my learning'}
                <ArrowRight size={14} />
              </Link>
            </section>

            <DailyGoalControl
              initialGoal={dailyGoalSteps}
              activitiesToday={rhythm.activitiesToday}
            />

            <section className="card">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="section-label">LEARNING RHYTHM</p>
                  <h2 className="mt-1 font-display text-lg font-semibold text-text-primary">Consistency over intensity.</h2>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal">
                  <Flame size={19} />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border-subtle p-4">
                  <p className="text-xs text-text-muted">Current streak</p>
                  <p className="mt-2 font-editorial text-3xl text-text-primary">
                    {rhythm.currentStreakDays}
                    <span className="ml-1 text-sm font-medium text-text-muted">
                      {rhythm.currentStreakDays === 1 ? 'day' : 'days'}
                    </span>
                  </p>
                  <p className="mt-1 text-xs leading-5 text-text-muted">
                    {rhythm.activeToday ? 'You have learned today.' : 'Complete an activity to continue.'}
                  </p>
                </div>
                <div className="rounded-lg border border-border-subtle p-4">
                  <p className="text-xs text-text-muted">Active days this week</p>
                  <p className="mt-2 font-editorial text-3xl text-text-primary">
                    {plannedActiveDaysThisWeek}<span className="text-lg text-text-muted">/{plannedStudyDays.length}</span>
                  </p>
                  <p className="mt-1 text-xs leading-5 text-text-muted">A flexible weekly rhythm</p>
                </div>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-medium text-text-muted">THIS WEEK</p>
                  <CalendarDays size={14} className="text-text-muted" />
                </div>
                <div className="mt-3 grid grid-cols-7 gap-1.5">
                  {rhythm.currentWeekDays.map((day) => (
                    <div key={day.key} className="flex flex-col items-center gap-1.5">
                      <span className={'text-[10px] ' + (day.isToday ? 'font-semibold text-teal' : 'text-text-muted')}>
                        {day.label}
                      </span>
                      <div
                        aria-label={day.label + (day.active ? ': activity completed' : ': no activity recorded')}
                        className={
                          'flex h-7 w-7 items-center justify-center rounded-full border ' +
                          (day.active
                            ? 'border-teal bg-teal text-white'
                            : day.isToday
                              ? 'border-teal/50 text-teal'
                              : 'border-border-default text-transparent')
                        }
                      >
                        {day.active && <CheckCircle2 size={13} />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 border-t border-border-subtle pt-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="section-label">NEXT MILESTONE</p>
                    <p className="mt-1 text-sm font-semibold text-text-primary">
                      {nextMilestone?.title ?? 'Keep building your learning record'}
                    </p>
                    <p className="mt-1 text-xs text-text-muted">
                      {totalActivities} of {nextActivityTarget} completed activities
                    </p>
                  </div>
                  <Trophy size={17} className="mt-1 shrink-0 text-teal" />
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border-subtle">
                  <div className="h-full rounded-full bg-teal transition-all" style={{ width: milestoneProgress + '%' }} />
                </div>
                <p className="mt-2 text-xs text-text-muted">
                  {Math.max(0, nextActivityTarget - totalActivities)} more {nextActivityTarget - totalActivities === 1 ? 'activity' : 'activities'} to go
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border-subtle pt-4">
                <div>
                  <p className="text-xs text-text-muted">Activities in last 7 days</p>
                  <p className="mt-1 font-display text-xl font-semibold text-text-primary">{weeklyActivity}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted">Projects completed in last 7 days</p>
                  <p className="mt-1 font-display text-xl font-semibold text-text-primary">{weeklyProjects}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border-subtle pt-4">
                <span className="text-sm text-text-secondary">Courses completed</span>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-primary">
                  <CheckCircle2 size={15} className="text-teal" />
                  {completions.length}
                </span>
              </div>
            </section>
          </aside>
        </section>

        <section className="mt-8">
          <WeeklyLearningPlan
            initialDays={plannedStudyDays}
            currentWeekDays={rhythm.currentWeekDays}
            todayWeekday={todayWeekday}
          />
        </section>

        <section className="mt-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-label">YOUR LEARNING PATHS</p>
              <h2 className="mt-2 font-editorial text-2xl text-text-primary">
                Keep your momentum visible.
              </h2>
            </div>
            <Link
              href="/paths"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal no-underline hover:text-teal-bright"
            >
              Explore all paths
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {activeEnrollments.length > 0 ? (
              activeEnrollments.map(({ enrollment, steps, percent }) => {
                const track = getTrackById(enrollment.trackId)
                if (!track) return null
                const Icon = getTrackIcon(track.icon)
                const completed = completedTrackIds.has(track.id)
                return (
                  <article key={track.id} className="card group">
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-lg"
                        style={{ backgroundColor: track.colorHex + '18', color: track.colorHex }}
                      >
                        <Icon size={19} aria-hidden />
                      </div>
                      {completed && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-teal">
                          <CheckCircle2 size={13} />
                          Completed
                        </span>
                      )}
                    </div>
                    <h3 className="mt-5 font-display font-semibold text-text-primary">{track.name}</h3>
                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-text-secondary">{track.tagline}</p>
                    <div className="mt-5">
                      <div className="flex items-center justify-between text-xs text-text-muted">
                        <span>{percent}% complete</span>
                        <span>Last active {formatDate(enrollment.lastActivityAt)}</span>
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border-subtle">
                        <div
                          className="h-full rounded-full"
                          style={{ width: percent + '%', backgroundColor: track.colorHex }}
                        />
                      </div>
                    </div>
                    <Link
                      href={'/guided-path/' + track.id}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal no-underline group-hover:text-teal-bright"
                    >
                      {completed ? 'Review path' : 'Continue'}
                      <ArrowRight size={14} />
                    </Link>
                  </article>
                )
              })
            ) : (
              <article className="card md:col-span-2 xl:col-span-3">
                <div className="flex flex-col items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10 text-teal">
                    <Compass size={18} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-text-primary">No learning path started yet.</h3>
                    <p className="mt-1 max-w-xl text-sm leading-6 text-text-secondary">
                      Start with your personalized recommendation, or explore paths and choose the one that fits your next goal.
                    </p>
                  </div>
                  <Link href="/find-your-path?from=dashboard" className="btn btn-primary inline-flex items-center gap-2">
                    Find my path
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </article>
            )}
          </div>
        </section>

        <section className="mt-8 pb-12">
          <div className="card border-border-subtle">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-elevated text-text-secondary">
                  <BarChart3 size={17} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">Your learning data is becoming useful.</p>
                  <p className="mt-1 text-sm leading-6 text-text-secondary">
                    As you learn, TechSkillHub can use your progress and activity to make future recommendations more relevant.
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-2 text-xs text-text-muted">
                <CheckCircle2 size={13} className="text-teal" />
                Personalized foundation
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
