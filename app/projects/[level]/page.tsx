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
        <header className="mb-10 max-w-3xl">
          <span className="section-label">Projects</span>
          <h1 className="font-editorial text-display-xl">{level.label}</h1>
          <p className="mt-4 text-lg text-text-secondary">{level.description}</p>
        </header>

        {items.length === 0 ? (
          <p className="text-text-secondary">Coming soon.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map(({ project, trackName, trackSlug }) => (
              <Link
                key={`${trackSlug}-${project.title}`}
                href={`/tracks/${trackSlug}#projects`}
                className="card group flex h-full flex-col gap-2 no-underline"
              >
                <h2 className="font-display text-lg text-text-primary group-hover:text-teal">
                  {project.title}
                </h2>
                <p className="flex-1 text-sm text-text-secondary line-clamp-3">
                  {project.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="badge badge-teal">{project.level}</span>
                  {project.techTags.slice(0, 3).map((tag) => (
                    <span key={tag} className="badge border border-border-default text-text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-medium text-teal">
                  Build it via {trackName} <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}