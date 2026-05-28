import { PageHeader } from '@/components/ui/PageHeader'
import { TrackQuiz } from '@/components/quiz/TrackQuiz'
import {
  SURVIVAL_STEPS,
  FIRST_WEEK_PLAN,
  COMMUNITIES_ONLINE,
  COMMUNITIES_AFRICA,
} from '@/lib/site-content'

export const metadata = {
  title: 'Start Here | Tech Skills Learning Hub',
  description: 'Beginner onboarding guide, 7 survival steps, track quiz, and your first week plan.',
}

export default function StartHerePage() {
  return (
    <div className="section pt-28">
      <div className="container max-w-3xl">
        <PageHeader
          title="Start Here"
          subtitle="You're in the right place. This guide is for students starting from zero."
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Start Here' }]}
        />

        <section className="prose-dark">
          <p className="text-lg text-text-secondary max-w-none">
            This hub is a structured, self-paced learning system for students who want to break into tech.
            Pick a track, follow the roadmap stage by stage, build the projects, and use AI as a thinking
            partner — not a shortcut.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold">The 7 Steps</h2>
          <p className="mt-2 text-text-secondary">From the Beginner Survival Guide — read these before picking a track.</p>
          <div className="mt-8 space-y-4">
            {SURVIVAL_STEPS.map((step) => (
              <article key={step.step} className="card">
                <span className="font-mono text-4xl font-bold text-teal/20">{String(step.step).padStart(2, '0')}</span>
                <h3 className="mt-2 font-display text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-text-secondary max-w-none">{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold">Which track is for you?</h2>
          <p className="mt-2 text-text-secondary">Answer 3 quick questions and we&apos;ll recommend the best paths.</p>
          <div className="mt-8">
            <TrackQuiz />
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold">Your First Week</h2>
          <div className="mt-6 space-y-3">
            {FIRST_WEEK_PLAN.map((day) => (
              <div key={day.day} className="flex gap-4 rounded-lg border border-border-default p-4">
                <span className="shrink-0 font-mono text-sm font-medium text-teal w-16">{day.day}</span>
                <p className="text-sm text-text-secondary">{day.task}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 pb-8">
          <h2 className="font-display text-2xl font-bold">Join a Community</h2>
          <h3 className="mt-8 font-display text-lg font-semibold">Online</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {COMMUNITIES_ONLINE.map((c) => (
              <a
                key={c.url}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card no-underline hover:border-teal/40 py-4"
              >
                <h4 className="font-medium text-teal">{c.name}</h4>
                <p className="text-xs text-text-secondary">{c.description}</p>
              </a>
            ))}
          </div>
          <h3 className="mt-10 font-display text-lg font-semibold">African & Nigerian</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {COMMUNITIES_AFRICA.map((c) => (
              <a
                key={c.url}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card no-underline hover:border-teal/40 py-4"
              >
                <h4 className="font-medium text-teal">{c.name}</h4>
                <p className="text-xs text-text-secondary">{c.description}</p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
