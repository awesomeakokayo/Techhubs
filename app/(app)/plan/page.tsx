import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, CalendarDays, CheckCircle2, Flame, Target } from 'lucide-react'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import type { LearnerExperienceLevel } from '@/lib/learner-profile'
import { WeeklyLearningPlan } from '@/components/dashboard/WeeklyLearningPlan'
import { DailyGoalControl } from '@/components/dashboard/DailyGoalControl'
import {
  calculateLearningRhythm,
  DEFAULT_LEARNER_TIME_ZONE,
  DEFAULT_PLANNED_STUDY_DAYS,
  getLocalWeekday,
  WEEKDAY_LABELS,
} from '@/lib/learning-rhythm'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Learning Plan | TechSkillHub',
  description: 'Your weekly learning schedule, daily goal and rhythm.',
  robots: { index: false, follow: false },
}

const EXPERIENCE_LABELS: Record<LearnerExperienceLevel, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

export default async function PlanPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login?next=/plan')

  const userId = session.user.id
  const now = new Date()
  const weekStart = new Date(now)
  weekStart.setDate(weekStart.getDate() - 7)
  const historyStart = new Date(now)
  historyStart.setDate(historyStart.getDate() - 400)

  const [profile, activityRecords, weeklyActivity, weeklyProjects] = await Promise.all([
    prisma.learnerProfile.findUnique({ where: { userId } }),
    prisma.userProgress.findMany({
      where: { userId, status: 'COMPLETED', completedAt: { gte: historyStart } },
      select: { completedAt: true },
    }),
    prisma.userProgress.count({ where: { userId, status: 'COMPLETED', completedAt: { gte: weekStart } } }),
    prisma.userProgress.count({
      where: { userId, status: 'COMPLETED', itemType: 'project', completedAt: { gte: weekStart } },
    }),
  ])

  const timeZone = profile?.timeZone || DEFAULT_LEARNER_TIME_ZONE
  const rhythm = calculateLearningRhythm(activityRecords.map((activity) => activity.completedAt), now, timeZone)
  const dailyGoalSteps = profile?.dailyGoalSteps ?? 1
  const plannedDays = profile?.plannedStudyDays?.length ? profile.plannedStudyDays : [...DEFAULT_PLANNED_STUDY_DAYS]
  const todayWeekday = getLocalWeekday(now, timeZone)
  const isPlannedStudyDay = plannedDays.includes(todayWeekday)
  const nextPlannedDay = plannedDays.find((day) => day > todayWeekday) ?? plannedDays[0]
  const nextPlannedDayLabel = WEEKDAY_LABELS[nextPlannedDay - 1]

  return (
    <div className="pb-4">
      <header>
        <p className="section-label">Learning Plan</p>
        <h1 className="mt-2 font-display text-display-md text-text-primary">Plan your learning rhythm</h1>
        <p className="mt-2 max-w-xl text-text-secondary">
          Keep your schedule realistic. A completed day means at least one guided-path activity was recorded that day.
        </p>
      </header>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Plan summary">
        <div className="card flex items-center gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-grape/10 text-grape">
            <Flame size={20} aria-hidden />
          </span>
          <div>
            <p className="font-display text-2xl font-semibold text-text-primary">{rhythm.currentStreakDays}</p>
            <p className="text-xs leading-tight text-text-secondary">Day streak</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-grape/10 text-grape">
            <CalendarDays size={20} aria-hidden />
          </span>
          <div>
            <p className="font-display text-2xl font-semibold text-text-primary">{rhythm.activeDaysThisWeek}<span className="text-lg text-text-muted">/7</span></p>
            <p className="text-xs leading-tight text-text-secondary">Active days this week</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-grape/10 text-grape">
            <CheckCircle2 size={20} aria-hidden />
          </span>
          <div>
            <p className="font-display text-2xl font-semibold text-text-primary">{weeklyActivity}</p>
            <p className="text-xs leading-tight text-text-secondary">Activities in last 7 days</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-grape/10 text-grape">
            <Target size={20} aria-hidden />
          </span>
          <div>
            <p className="font-display text-2xl font-semibold text-text-primary">{weeklyProjects}</p>
            <p className="text-xs leading-tight text-text-secondary">Projects completed in last 7 days</p>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-5 lg:grid-cols-2">
        <WeeklyLearningPlan
          initialDays={plannedDays}
          currentWeekDays={rhythm.currentWeekDays}
          todayWeekday={todayWeekday}
        />
        <DailyGoalControl initialGoal={dailyGoalSteps} activitiesToday={rhythm.activitiesToday} />
      </section>

      <section className="mt-6 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <article className="card">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="section-label">This week</p>
              <h2 className="mt-1 font-display text-lg font-semibold text-text-primary">Consistency over intensity.</h2>
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-grape/10 text-grape">
              <CalendarDays size={18} aria-hidden />
            </span>
          </div>
          <div className="mt-5 grid grid-cols-7 gap-1.5">
            {rhythm.currentWeekDays.map((day) => (
              <div key={day.key} className="flex flex-col items-center gap-1.5">
                <span className={'text-[10px] ' + (day.isToday ? 'font-semibold text-grape' : 'text-text-muted')}>{day.label}</span>
                <div
                  aria-label={day.label + (day.active ? ': activity completed' : ': no activity recorded')}
                  className={
                    'flex h-7 w-7 items-center justify-center rounded-full border ' +
                    (day.active
                      ? 'border-grape bg-grape text-text-inverse'
                      : day.isToday
                        ? 'border-grape/50 text-grape'
                        : 'border-border-default text-transparent')
                  }
                >
                  {day.active && <CheckCircle2 size={13} />}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-text-secondary">
            {isPlannedStudyDay
              ? `Today is a planned learning day. ${rhythm.activitiesToday} of ${dailyGoalSteps} activities completed.`
              : `Today is not a planned day. Your next planned learning day is ${nextPlannedDayLabel}.`}
          </p>
        </article>

        <article className="card">
          <p className="section-label">Saved preferences</p>
          <div className="mt-3 space-y-3 text-sm">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <span className="text-text-muted">Weekly pace</span>
              <span className="font-medium text-text-primary">{profile?.weeklyHours ? `${profile.weeklyHours} hours / week` : 'Not set'}</span>
            </div>
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <span className="text-text-muted">Goal</span>
              <span className="max-w-[60%] text-right font-medium text-text-primary">{profile?.primaryGoal ?? 'Not set'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-muted">Experience</span>
              <span className="font-medium text-text-primary">
                {profile?.experienceLevel
                  ? EXPERIENCE_LABELS[profile.experienceLevel as LearnerExperienceLevel] ?? profile.experienceLevel
                  : 'Not set'}
              </span>
            </div>
          </div>
          <Link href="/find-your-path?from=plan" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-grape no-underline hover:text-grape-bright">
            Update my preferences <ArrowRight size={14} />
          </Link>
        </article>
      </section>
    </div>
  )
}
