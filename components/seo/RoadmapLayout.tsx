import { ArrowRight, Clock, Layers, Users, FolderKanban, Briefcase } from 'lucide-react'
import { Track } from '@/lib/tracks'
import { CustomRoadmap } from '@/lib/seo/roadmaps'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { StructuredData } from './StructuredData'
import { RelatedContent } from './RelatedContent'
import { ContentFeedback } from './ContentFeedback'
import { LearningFunnel } from './LearningFunnel'
import { CtaLink } from './CtaLink'
import { ContentViewTracker } from './ContentViewTracker'
import { getJourneyForSlug } from '@/lib/seo/journeys'
import { breadcrumbJsonLd, courseJsonLd, faqJsonLd } from '@/lib/seo/utils'
import type { BreadcrumbItem } from '@/lib/seo/utils'

interface RoadmapLayoutProps {
  path: string
  breadcrumbs: BreadcrumbItem[]
  title: string
  tagline?: string
  openingAnswer: string
  stages: { title: string; description: string; topics: string[] }[]
  projects: { title: string; level?: string }[]
  jobTitles?: string[]
  prerequisites?: string[]
  timeEstimate?: string
  ctaHref: string
  faqs: { question: string; answer: string }[]
  related: React.ComponentProps<typeof RelatedContent>['links']
  courseName: string
  courseDescription: string
  audience?: string[]
  /** Slug used to resolve this roadmap into its learning journey. */
  journeySlug?: string
}

export function RoadmapLayout({
  path,
  breadcrumbs,
  title,
  tagline,
  openingAnswer,
  stages,
  projects,
  jobTitles,
  prerequisites,
  timeEstimate,
  ctaHref,
  faqs,
  related,
  courseName,
  courseDescription,
  audience,
  journeySlug,
}: RoadmapLayoutProps) {
  const journey = journeySlug ? getJourneyForSlug(journeySlug) : null
  return (
    <article className="section pt-16">
      <div className="container">
        <ContentViewTracker path={path} contentType="roadmap" />
        <StructuredData
          blocks={[
            courseJsonLd({ name: courseName, description: courseDescription, path }),
            breadcrumbJsonLd(breadcrumbs),
            faqJsonLd(faqs),
          ]}
        />

        <Breadcrumbs
          items={breadcrumbs.map((b) => ({ label: b.label, href: b.path }))}
        />

        <header className="mb-10 max-w-3xl">
          <span className="section-label">Roadmap</span>
          <h1 className="font-editorial text-display-xl">{title}</h1>
          {tagline && <p className="mt-4 text-lg text-text-secondary">{tagline}</p>}

          <div className="mt-5 flex flex-wrap gap-2">
            {timeEstimate && (
              <span className="badge badge-teal">
                <Clock size={12} className="mr-1" /> {timeEstimate}
              </span>
            )}
            {jobTitles && jobTitles.length > 0 && (
              <span className="badge badge-amber">
                <Briefcase size={12} className="mr-1" /> {jobTitles[0]}
              </span>
            )}
            {audience && audience.length > 0 && (
              <span className="badge badge-purple">
                <Users size={12} className="mr-1" /> {audience[0]}
              </span>
            )}
          </div>
        </header>

        <div className="panel mb-8 border-l-teal">
          <p className="lead font-medium text-text-primary">{openingAnswer}</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          <div className="max-w-3xl space-y-12">
            <section>
              <h2 className="font-editorial text-display-md mb-4">Roadmap at a glance</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {stages.map((stage, i) => (
                  <div key={stage.title} className="panel">
                    <div className="flex items-center gap-3">
                      <span className="path-node is-active shrink-0">{i + 1}</span>
                      <h3 className="font-display text-base text-text-primary">{stage.title}</h3>
                    </div>
                    <p className="mt-2 text-sm text-text-secondary">{stage.description}</p>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {stage.topics.map((topic) => (
                        <li key={topic} className="badge border border-border-default text-text-muted">
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {prerequisites && prerequisites.length > 0 && (
              <section>
                <h2 className="font-editorial text-display-md mb-4">
                  <Layers size={22} className="mr-2 inline text-teal" aria-hidden />
                  Prerequisites
                </h2>
                <ul className="list-disc space-y-2 pl-5 text-text-secondary">
                  {prerequisites.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </section>
            )}

            <section>
              <h2 className="font-editorial text-display-md mb-4">
                <FolderKanban size={22} className="mr-2 inline text-teal" aria-hidden />
                Projects to build
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {projects.map((p) => (
                  <li key={p.title} className="panel">
                    <h3 className="font-display text-lg text-text-primary">{p.title}</h3>
                    {p.level && (
                      <span className="badge badge-teal mt-2">{p.level} · project</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            {faqs.length > 0 && (
              <section>
                <h2 className="font-editorial text-display-md mb-4">Frequently asked questions</h2>
                <div className="space-y-4">
                  {faqs.map((faq) => (
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
              </section>
            )}

            <div className="panel border-teal">
              <p className="font-display text-xl text-text-primary">
                Follow this roadmap inside TechSkillHub with progress tracking and curated resources.
              </p>
              <CtaLink
                href={ctaHref}
                label="Start this roadmap"
                trackingPath={path}
                isRoadmapCta
                className="btn btn-primary mt-4 inline-flex items-center gap-2"
              />
            </div>

            {journey && <LearningFunnel journey={journey} currentHref={path} trackingPath={path} />}

            <div className="border-t border-border-subtle pt-8 text-sm text-text-muted">
              <p>Last reviewed: 2026-08-19</p>
              <p className="mt-1">Written by TechSkillHub</p>
            </div>

            <ContentFeedback path={path} contentType="roadmap" />
          </div>

          <aside className="hidden lg:block">
            <RelatedContent title="Related" links={related} />
          </aside>
        </div>

        <div className="lg:hidden">
          <RelatedContent links={related} />
        </div>
      </div>
    </article>
  )
}

/** Helpers to derive a Track into a roadmap layout */
export function trackToRoadmap(track: Track): Omit<RoadmapLayoutProps, 'path' | 'breadcrumbs' | 'ctaHref'> {
  const stages = track.roadmap.map((s) => ({
    title: s.title,
    description: s.description,
    topics: s.topics,
  }))
  const projects = track.projects.map((p) => ({ title: p.title, level: p.level }))
  return {
    title: `${track.name} Roadmap for Beginners: Learn ${track.name} Step by Step`,
    tagline: track.tagline,
    openingAnswer: `To learn ${track.name.toLowerCase()}, follow this sequence: ${stages
      .slice(0, 3)
      .map((s) => s.title)
      .join(', ')}. Build projects as you progress and use this roadmap to know exactly what to learn next.`,
    stages,
    projects,
    jobTitles: track.overview.jobTitles.slice(0, 3),
    prerequisites: track.techStack.map((t) => `Basic familiarity with ${t} is helpful but not required.`),
    timeEstimate: track.timeEstimate,
    faqs: [
      {
        question: `How long does it take to learn ${track.name.toLowerCase()}?`,
        answer: `On the TechSkillHub plan, most learners complete the ${track.name.toLowerCase()} roadmap in ${track.timeEstimate} with consistent daily practice.`,
      },
      {
        question: `Do I need experience to start the ${track.name.toLowerCase()} roadmap?`,
        answer: `No. The roadmap is designed for beginners. ${track.overview.description}`,
      },
      {
        question: `What can I do after completing this roadmap?`,
        answer: `You will have learned ${stages.map((s) => s.title).join(', ')}, and you will be ready to ${track.overview.whatYouCanBuild[0]?.toLowerCase()}.`,
      },
      {
        question: 'Is this roadmap free to follow?',
        answer: 'Yes. Every step links to quality free resources, and project ideas are built in.',
      },
    ],
    related: [
      ...(track.category === 'build'
        ? [
            { title: 'Full-Stack Developer Roadmap', href: '/roadmaps/full-stack-development', description: 'Continue into full-stack territory.' },
            { title: 'How to Learn Web Development', href: '/guides/how-to-learn-web-development', description: 'The complete beginner web journey.' },
          ]
        : []),
      { title: `${track.name} Track`, href: `/tracks/${track.slug}`, description: 'Open the interactive track with curated resources and progress tracking.' },
      { title: 'Related Career Guide', href: `/careers/${track.slug}`, description: 'See where this roadmap leads as a career.' },
    ].filter(Boolean) as React.ComponentProps<typeof RelatedContent>['links'],
    courseName: `${track.name} Roadmap`,
    courseDescription: track.overview.description,
    audience: [`Difficulty: ${track.difficultyLabel}`, ...track.overview.jobTitles.slice(0, 2)],
  }
}

export function customRoadmapToLayout(rm: CustomRoadmap): Omit<RoadmapLayoutProps, 'path' | 'breadcrumbs' | 'ctaHref'> {
  return {
    title: rm.title,
    tagline: undefined,
    openingAnswer: rm.openingAnswer,
    stages: rm.stages.map((s) => ({ title: s.title, description: s.description, topics: s.topics })),
    projects: rm.projects.map((p) => ({ title: p })),
    jobTitles: ['JavaScript Developer', 'Frontend Developer', 'Full-Stack Developer'].slice(0, 2),
    timeEstimate: '3 to 6 months',
    faqs: rm.faqs,
    related: rm.related,
    courseName: rm.title,
    courseDescription: rm.description,
    audience: rm.audience,
  }
}