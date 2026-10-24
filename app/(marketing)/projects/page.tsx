import Link from 'next/link'
import { ArrowRight, Compass } from 'lucide-react'
import { TRACKS } from '@/lib/tracks'
import { getAIEnrichedTrack } from '@/lib/ai-track'
import { PROJECT_LEVELS } from '@/lib/seo/projects'
import { PageHeader } from '@/components/ui/PageHeader'
import { PageViewTracker } from '@/components/analytics/page-view-tracker'
import { ProjectsExplorer, type ProjectItem } from '@/components/projects/ProjectsExplorer'

export default function ProjectsPage() {
  const enrichedTracks = TRACKS.map(getAIEnrichedTrack)
  const projects: ProjectItem[] = enrichedTracks.flatMap((track) =>
    track.projects.map((project) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      level: project.level,
      techTags: project.techTags,
      trackId: track.id,
      trackName: track.name,
      trackSlug: track.slug,
    })),
  )

  // Count the same project list shown below, including the current AI projects.
  const countFor = (slug: string) => projects.filter((project) => project.level === slug).length

  return (
    <div className="section pt-16">
      <div className="container">
        <PageViewTracker path="/projects" eventName="projects_page_open" />
        <PageHeader
          title="Projects"
          subtitle={`${projects.length} practical projects across ${TRACKS.length} learning paths. Building is how knowledge becomes capability.`}
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Projects' }]}
        />

        {/* Browse by level — real counts */}
        <div className="grid gap-4 sm:grid-cols-3">
          {PROJECT_LEVELS.map((lvl) => (
            <Link key={lvl.slug} href={`/projects/${lvl.slug}`} className="card group flex h-full flex-col no-underline">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-display text-lg font-semibold text-text-primary group-hover:text-grape">
                  {lvl.label}
                </h2>
                <span className="font-mono text-sm text-text-muted">{countFor(lvl.slug)}</span>
              </div>
              <p className="mt-2 flex-1 text-sm leading-6 text-text-secondary">{lvl.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-grape">
                View projects <ArrowRight size={14} aria-hidden />
              </span>
            </Link>
          ))}
        </div>

        <ProjectsExplorer projects={projects} />

        {/* Find a path */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 rounded-xl border border-border-default bg-elevated p-6 sm:flex-row sm:items-center">
          <div>
            <p className="section-label">Not sure what to build?</p>
            <h2 className="mt-2 font-display text-xl font-semibold text-text-primary">
              Pick a path, and the projects come with it.
            </h2>
            <p className="mt-1 max-w-xl text-sm text-text-secondary">
              Every learning path ends in real, presentable projects you can show.
            </p>
          </div>
          <Link href="/find-your-path" className="btn btn-primary inline-flex shrink-0 items-center gap-2">
            <Compass size={15} aria-hidden /> Find your path
          </Link>
        </div>
      </div>
    </div>
  )
}
