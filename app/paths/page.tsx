import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CATEGORIES, getTracksByCategory, getProductStats } from '@/lib/tracks'
import { PageHeader } from '@/components/ui/PageHeader'
import { TypewriterIllustration } from '@/components/ui/TypewriterIllustration'
import { PageViewTracker } from '@/components/analytics/page-view-tracker'

export default function PathsPage() {
  return (
    <div className="section pt-16">
      <PageViewTracker path="/paths" eventName="paths_page_open" />

      <div className="relative overflow-hidden bg-deep">
        <div className="container relative">
          <PageHeader
            title="Find a direction"
            subtitle={`Four families of work. ${getProductStats().trackCount} paths inside. Choose the one that pulls you.`}
            breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Paths' }]}
          />
          <div aria-hidden className="pointer-events-none absolute -right-16 bottom-0 select-none opacity-[0.06]">
            <TypewriterIllustration className="h-64 w-72 text-teal" />
          </div>
        </div>
      </div>

      <div className="container mt-14">
        <ul className="grid gap-px overflow-hidden border border-border-default bg-border-default md:grid-cols-2">
          {CATEGORIES.map((cat, i) => {
            const tracks = getTracksByCategory(cat.id)
            return (
              <li key={cat.id} className="bg-surface">
                <Link
                  href={`/paths/${cat.id}`}
                  className="group flex h-full flex-col p-10 no-underline transition-colors hover:bg-elevated"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm text-text-muted" aria-hidden>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <ArrowRight
                      size={18}
                      className="-translate-x-1 text-text-muted opacity-0 transition-all group-hover:translate-x-0 group-hover:text-teal group-hover:opacity-100"
                      aria-hidden
                    />
                  </div>
                  <div className="mt-8 flex items-center gap-3">
                    <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: cat.color }} aria-hidden />
                    <h2 className="font-editorial text-4xl text-text-primary">{cat.label}</h2>
                  </div>
                  <p className="mt-4 max-w-sm text-text-secondary">{cat.description}</p>
                  <p className="mt-auto pt-8 font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">
                    {tracks.length} paths
                  </p>
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="mt-16 flex justify-center">
          <Link href="/find-your-path" className="btn btn-primary inline-flex items-center gap-2">
            Not sure? Find Your Path <ArrowRight size={16} className="shrink-0" />
          </Link>
        </div>
      </div>
    </div>
  )
}