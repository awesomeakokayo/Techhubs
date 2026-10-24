import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { PROJECT_LEVELS, getProjectsByLevel } from '@/lib/seo/projects'
import { getPageMetadata } from '@/lib/seo/utils'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { PageViewTracker } from '@/components/analytics/page-view-tracker'
import { ContentViewTracker } from '@/components/seo/ContentViewTracker'

interface Props {
  params: { level: string }
}

export function generateStaticParams() {
  return PROJECT_LEVELS.map((l) => ({ level: l.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const level = PROJECT_LEVELS.find((l) => l.slug === params.level)
  if (!level) return { title: 'Projects Not Found' }
  return getPageMetadata({
    title: `${level.label}: Coding Projects to Build Your Skills`,
    description: level.description,
    path: `/projects/${level.slug}`,
    keywords: [`${level.slug} projects`, 'coding projects for beginners'],
    type: 'article',
  })
}

export default function ProjectLevelPage({ params }: Props) {
  const level = PROJECT_LEVELS.find((l) => l.slug === params.level)
  if (!level) notFound()

  const items = getProjectsByLevel(level.slug as 'beginner' | 'intermediate' | 'advanced')

  return (
    <div className="section pt-16">
      <div className="container">
        <PageViewTracker path={`/projects/${level.slug}`} eventName="project_level_page_open" />
        <ContentViewTracker path={`/projects/${level.slug}`} contentType="projects" />
        <Breadcrumbs
          items={[{ label: 'Home', href: '/' }, { label: 'Projects', href: '/projects' }, { label: level.label }]}
        />
        <header className="mb-8 max-w-3xl">
          <span className="section-label">Projects</span>
          <h1 className="font-display text-display-xl">{level.label}</h1>
          <p className="mt-4 text-lg text-text-secondary">{level.description}</p>
          <p className="mt-3 font-mono text-sm text-text-muted">
            {items.length} {items.length === 1 ? 'project' : 'projects'}
          </p>
        </header>

        {/* Level navigation */}
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Project levels">
          {PROJECT_LEVELS.map((lvl) => {
            const active = lvl.slug === level.slug
            return (
              <Link
                key={lvl.slug}
                href={`/projects/${lvl.slug}`}
                aria-current={active ? 'page' : undefined}
                className={
                  'min-h-[40px] rounded-full border px-4 py-1.5 text-sm font-medium no-underline transition-colors ' +
                  (active
                    ? 'border-carbon bg-carbon text-white'
                    : 'border-border-default text-text-secondary hover:border-grape hover:text-grape')
                }
              >
                {lvl.label.replace(' Projects', '')}
              </Link>
            )
          })}
        </div>

        {items.length === 0 ? (
          <div className="card max-w-xl">
            <p className="text-sm text-text-secondary">
              No {level.label.toLowerCase()} in the catalogue yet. Explore another level or browse the learning paths.
            </p>
            <Link href="/projects" className="btn btn-secondary mt-4 inline-flex items-center gap-2">
              Back to projects
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map(({ project, trackName, trackSlug }) => (
              <Link
                key={`${trackSlug}-${project.title}`}
                href={`/tracks/${trackSlug}#projects`}
                className="card group flex h-full flex-col no-underline"
              >
                <span className="truncate font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">
                  {trackName}
                </span>
                <h2 className="mt-3 font-display text-lg text-text-primary group-hover:text-grape">
                  {project.title}
                </h2>
                <p className="mt-1 flex-1 text-sm leading-6 text-text-secondary">{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="badge badge-teal">{project.level}</span>
                  {project.techTags.slice(0, 3).map((tag) => (
                    <span key={tag} className="badge border border-border-default text-text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-grape">
                  Build in {trackName} <ArrowRight size={14} aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
