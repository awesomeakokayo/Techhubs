'use client'

import Link from 'next/link'
import { ArrowRight, Route, FolderKanban, Target, BookOpen } from 'lucide-react'
import { CATEGORIES, TRACKS } from '@/lib/tracks'
import { StructuredData } from '@/components/seo/StructuredData'
import { faqJsonLd } from '@/lib/seo/utils'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { StaggerGroup, StaggerItem } from '@/components/ui/StaggerGroup'

const WHY = [
  { title: 'Structured learning', text: 'Every skill in the right order, so you always know what to learn next.' },
  { title: 'Practical projects', text: 'Build real things that turn learning into proof of skill.' },
  { title: 'Self-paced', text: 'Learn when you can, where you can — no deadlines, no pressure.' },
  { title: 'Beginner-friendly pathways', text: 'Clear starting points for people with zero experience.' },
]

const GOALS = [
  { title: 'Learn coding', href: '/guides/how-to-learn-coding', desc: 'Start from zero with a clear plan.' },
  { title: 'Become a frontend developer', href: '/roadmaps/frontend-development', desc: 'HTML, CSS, JavaScript, React.' },
  { title: 'Become a backend developer', href: '/roadmaps/backend-development', desc: 'APIs, databases and logic.' },
  { title: 'Learn AI', href: '/roadmaps/ai-for-work', desc: 'Practical, buildable AI skills.' },
  { title: 'Learn Python', href: '/roadmaps/python', desc: 'The friendliest first language.' },
  { title: 'Build real projects', href: '/projects', desc: 'Turn learning into portfolios.' },
]

const FAQS = [
  {
    question: 'What is TechSkillHub?',
    answer:
      'TechSkillHub is a self-paced technology learning platform that helps learners build practical tech skills through structured roadmaps, curated free resources, projects and career guidance.',
  },
  {
    question: 'Do I need experience to start?',
    answer:
      'No. Every roadmap has a clear starting point for complete beginners, and each stage links to quality resources that assume no prior knowledge.',
  },
  {
    question: 'Is TechSkillHub free?',
    answer:
      'The roadmaps, curated free resources and project ideas are free to follow. Optional premium features like guided paths with progress tracking are available for learners who want more structure.',
  },
  {
    question: 'How do roadmaps work?',
    answer:
      'Each roadmap sequences the exact skills you need for a goal — like frontend development or data science — in learning order. Follow the stages, use the linked free resources, and build the projects to prove what you have learned.',
  },
  {
    question: 'What should I learn first?',
    answer:
      'Start with the "Find Your Path" quiz or the "What do you want to learn?" goal picker below. Most beginners begin with the How to Learn Coding guide and the Python or Frontend roadmap.',
  },
]

export function SeoContentSection() {
  const popularTracks = TRACKS.slice(0, 6)
  return (
    <>
      <StructuredData blocks={[faqJsonLd(FAQS)]} />

      <section className="section">
        <div className="container">
          <span className="section-label">What do you want to learn?</span>
          <h2 className="font-editorial text-display-lg max-w-2xl">
            Start with your goal. We&apos;ll map the path.
          </h2>
          <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((cat) => (
              <StaggerItem key={cat.id}>
                <Link href={`/paths/${cat.id}`} className="card group flex h-full flex-col gap-2 no-underline">
                  <span className="h-2 w-2 rounded-full" style={{ background: cat.color }} aria-hidden />
                  <h3 className="font-display text-lg text-text-primary group-hover:text-teal">
                    {cat.label}
                  </h3>
                  <p className="flex-1 text-sm text-text-secondary">{cat.description}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-teal">
                    Explore <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="bg-void py-20">
        <div className="container">
          <span className="section-label">Why TechSkillHub?</span>
          <h2 className="font-editorial text-display-lg mb-8 max-w-2xl">
            Built for people who learn on their own.
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((item) => (
              <li key={item.title} className="panel">
                <h3 className="font-display text-lg text-text-primary">{item.title}</h3>
                <p className="mt-2 text-sm text-text-secondary">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="section-label">Popular roadmaps</span>
          <h2 className="font-editorial text-display-lg mb-8">Follow a proven learning path</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popularTracks.map((track) => (
              <li key={track.id}>
                <Link href={`/roadmaps/${track.slug}`} className="card group flex h-full flex-col gap-2 no-underline">
                  <span className="inline-flex items-center gap-2 font-display text-lg text-text-primary group-hover:text-teal">
                    <Route size={16} className="text-teal" aria-hidden /> {track.name}
                  </span>
                  <p className="flex-1 text-sm text-text-secondary">{track.tagline}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-teal">
                    View roadmap <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/projects" className="card group flex h-full flex-col gap-2 no-underline">
              <FolderKanban size={18} className="text-teal" aria-hidden />
              <h3 className="font-display text-lg text-text-primary group-hover:text-teal">Build projects</h3>
              <p className="text-sm text-text-secondary">
                Real, buildable projects for beginner, intermediate and advanced learners.
              </p>
            </Link>
            <Link href="/careers" className="card group flex h-full flex-col gap-2 no-underline">
              <Target size={18} className="text-teal" aria-hidden />
              <h3 className="font-display text-lg text-text-primary group-hover:text-teal">Learn by career</h3>
              <p className="text-sm text-text-secondary">
                Understand each tech role and the exact path to reach it.
              </p>
            </Link>
            <Link href="/guides" className="card group flex h-full flex-col gap-2 no-underline">
              <BookOpen size={18} className="text-teal" aria-hidden />
              <h3 className="font-display text-lg text-text-primary group-hover:text-teal">Reading guides</h3>
              <p className="text-sm text-text-secondary">
                Direct answers to the questions every learner asks first.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-void py-20">
        <div className="container">
          <span className="section-label">Learn by goal</span>
          <h2 className="font-editorial text-display-lg mb-8">Pick what you want to achieve</h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {GOALS.map((goal) => (
              <li key={goal.href}>
                <Link href={goal.href} className="panel group flex h-full items-center justify-between gap-3 no-underline">
                  <span>
                    <span className="block font-medium text-text-primary group-hover:text-teal">{goal.title}</span>
                    <span className="block text-sm text-text-secondary">{goal.desc}</span>
                  </span>
                  <ArrowRight size={16} className="shrink-0 text-text-muted transition-transform group-hover:translate-x-1 group-hover:text-teal" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-3xl">
          <span className="section-label">Questions learners ask</span>
          <h2 className="font-editorial text-display-lg mb-8">Frequently asked questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <details key={faq.question} className="panel group">
                <summary className="cursor-pointer list-none font-medium text-text-primary">
                  <span className="flex items-center justify-between gap-4">
                    {faq.question}
                    <ArrowRight size={16} className="shrink-0 rotate-90 text-text-muted transition-transform group-open:rotate-0" />
                  </span>
                </summary>
                <p className="mt-3">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}