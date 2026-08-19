import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { CATEGORIES, getTracksByCategory } from '@/lib/tracks'
import { TrackCard } from '@/components/tracks/TrackCard'
import { PageHeader } from '@/components/ui/PageHeader'
import { PageViewTracker } from '@/components/analytics/page-view-tracker'

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: cat.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const cat = CATEGORIES.find((c) => c.id === category)
  if (!cat) return { title: 'Not found | Tech Skill Hub' }
  return {
    title: `${cat.label} Paths | Tech Skill Hub`,
    description: cat.description,
  }
}

export default async function PathCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const cat = CATEGORIES.find((c) => c.id === category)
  if (!cat) notFound()

  const tracks = getTracksByCategory(cat.id)

  return (
    <div className="section pt-16">
      <PageViewTracker path={`/paths/${cat.id}`} eventName="path_category_open" />

      <div className="bg-deep">
        <div className="container">
          <PageHeader
            title={`${cat.label} paths`}
            subtitle={cat.description}
            breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Paths', href: '/paths' }, { label: cat.label }]}
          />
        </div>
      </div>

      <div className="container mt-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tracks.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>

        <div className="mt-16 grid gap-px overflow-hidden border border-border-default bg-border-default sm:grid-cols-2">
          {CATEGORIES.filter((c) => c.id !== cat.id).map((other) => {
            const count = getTracksByCategory(other.id).length
            return (
              <Link
                key={other.id}
                href={`/paths/${other.id}`}
                className="group flex items-center justify-between gap-4 bg-surface p-6 no-underline transition-colors hover:bg-elevated"
              >
                <span className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: other.color }} aria-hidden />
                  <span className="font-editorial text-2xl text-text-primary">{other.label}</span>
                  <span className="font-mono text-xs text-text-muted">{count} paths</span>
                </span>
                <ArrowRight size={16} className="shrink-0 text-text-muted transition-all group-hover:translate-x-0.5 group-hover:text-teal" aria-hidden />
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}