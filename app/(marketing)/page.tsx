import type { Metadata } from 'next'
import { getPageMetadata } from '@/lib/seo/utils'
import { CATEGORIES, TRACKS, getProductStats, getTrackById } from '@/lib/tracks'
import { PageViewTracker } from '@/components/analytics/page-view-tracker'
import { LandingHero } from '@/components/home/landing/LandingHero'
import { ProblemSection } from '@/components/home/landing/ProblemSection'
import { MethodSection } from '@/components/home/landing/MethodSection'
import { DirectionExplorer } from '@/components/home/landing/DirectionExplorer'
import { StageSection } from '@/components/home/landing/StageSection'
import { ProjectsSection } from '@/components/home/landing/ProjectsSection'
import { LibrarySection } from '@/components/home/landing/LibrarySection'
import { GuidedPathSection } from '@/components/home/landing/GuidedPathSection'
import { CatalogueSection } from '@/components/home/landing/CatalogueSection'
import { FaqSection } from '@/components/home/landing/FaqSection'
import { FinalCta } from '@/components/home/landing/FinalCta'

export const metadata: Metadata = getPageMetadata({
  title: 'Structured Paths to Learn Technology',
  description:
    'Discover structured technology-learning paths, curated resources, practical projects, and career guidance. Find your starting point and learn at your own pace.',
  path: '/',
  keywords: [
    'learn technology',
    'tech learning paths',
    'technology roadmaps',
    'free coding resources',
    'tech projects for beginners',
  ],
})

/**
 * Curated samples per direction. The category pages remain the complete list;
 * these three are chosen because they best represent the direction's promise.
 */
const DIRECTION_SAMPLES: Record<string, string[]> = {
  build: ['frontend', 'backend', 'python'],
  design: ['uiux', 'nocode', 'writing'],
  analyze: ['data', 'datascience'],
  grow: ['marketing', 'projectmgmt', 'productmgmt'],
  ai: ['ai-foundations', 'ai-work', 'ai-agents'],
}

export default function HomePage() {
  const stats = getProductStats()
  const frontend = getTrackById('frontend') ?? TRACKS[0]
  const stage = frontend.roadmap[1] ?? frontend.roadmap[0]

  const heroTrack = {
    name: frontend.name,
    slug: frontend.slug,
    difficultyLabel: frontend.difficultyLabel,
    timeEstimate: frontend.timeEstimate,
    resourceCount: frontend.resources.length,
    stages: frontend.roadmap.map((item) => ({
      id: item.id,
      title: item.title,
      duration: item.duration,
      topics: item.topics,
    })),
  }

  const directions = CATEGORIES.map((category) => {
    const all = TRACKS.filter((track) => track.category === category.id)
    const curated = (DIRECTION_SAMPLES[category.id] ?? []).flatMap((id) => {
      const track = TRACKS.find((candidate) => candidate.id === id)
      return track ? [track] : []
    })
    const chosen = curated.length > 0 ? curated : all.slice(0, 3)

    return {
      id: category.id,
      label: category.label,
      description: category.description,
      count: all.length,
      tracks: chosen.map((track) => ({
        id: track.id,
        name: track.name,
        slug: track.slug,
        tagline: track.tagline,
        difficultyLabel: track.difficultyLabel,
        stageCount: track.roadmap.length,
      })),
    }
  })

  const javascriptResources = frontend.resources
    .filter((resource) => /javascript|frontend mentor/i.test(resource.title))
    .slice(0, 3)
  const stageResources = (javascriptResources.length === 3
    ? javascriptResources
    : frontend.resources.slice(0, 3)
  ).map((resource) => ({
    id: resource.id,
    title: resource.title,
    source: resource.source,
    type: resource.type,
    url: resource.url,
  }))

  const stageProject =
    frontend.projects.find((project) => project.title === 'Calculator App') ??
    frontend.projects[0]

  const projectSpecs = [
    { trackId: 'frontend', level: 'beginner' },
    { trackId: 'backend', level: 'intermediate' },
    { trackId: 'fullstack', level: 'advanced' },
  ] as const

  const projects = projectSpecs.flatMap(({ trackId, level }) => {
    const track = getTrackById(trackId)
    const project = track?.projects.find((item) => item.level === level)
    if (!track || !project) return []
    return [
      {
        level,
        trackName: track.name,
        title: project.title,
        description: project.description,
        techTags: project.techTags,
        href: `/projects/${level}`,
      },
    ]
  })

  const typeLabels: Record<string, string> = {
    docs: 'Docs',
    video: 'Video',
    tool: 'Tools',
    practice: 'Practice',
    book: 'Books',
    community: 'Community',
  }
  const typeCounts = new Map<string, number>()
  for (const track of TRACKS) {
    for (const resource of track.resources) {
      typeCounts.set(resource.type, (typeCounts.get(resource.type) ?? 0) + 1)
    }
  }
  const resourceTypes = Object.keys(typeLabels).map((type) => ({
    label: typeLabels[type],
    count: typeCounts.get(type) ?? 0,
  }))

  const guides = [
    { href: '/guides/how-to-learn-coding', title: 'How to learn coding from scratch' },
    {
      href: '/guides/how-to-learn-web-development',
      title: 'How to learn web development',
    },
    {
      href: '/guides/what-programming-language-should-i-learn',
      title: 'Which programming language should I learn first?',
    },
  ]

  const guidedStages = frontend.roadmap.slice(0, 5).map((item) => ({
    id: item.id,
    title: item.title,
    duration: item.duration,
  }))

  return (
    <div className="landing">
      <PageViewTracker path="/" eventName="page_view" />
      <LandingHero track={heroTrack} stats={stats} />
      <ProblemSection />
      <MethodSection />
      <DirectionExplorer directions={directions} />
      <StageSection
        trackName={frontend.name}
        trackSlug={frontend.slug}
        stage={stage}
        stageCount={frontend.roadmap.length}
        resources={stageResources}
        project={{
          title: stageProject.title,
          description: stageProject.description,
          techTags: stageProject.techTags,
          level: stageProject.level,
        }}
        resourceCount={frontend.resources.length}
      />
      <ProjectsSection projects={projects} projectCount={stats.projectCount} />
      <LibrarySection
        resourceCount={stats.resourceCount}
        resourceTypes={resourceTypes}
        guides={guides}
      />
      <GuidedPathSection trackName={frontend.name} stages={guidedStages} />
      <CatalogueSection stats={stats} />
      <FaqSection />
      <FinalCta />
    </div>
  )
}
