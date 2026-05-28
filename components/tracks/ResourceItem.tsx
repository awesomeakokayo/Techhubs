import { ExternalLink, FileText, Play, BookOpen, Wrench, Users } from 'lucide-react'
import { Resource, ResourceType } from '@/lib/tracks'
import { TrackedLink } from '@/components/ui/tracked-link'

const TYPE_ICONS: Record<ResourceType, typeof FileText> = {
  docs: FileText,
  video: Play,
  practice: Wrench,
  book: BookOpen,
  tool: Wrench,
  community: Users,
}

interface ResourceItemProps {
  resource: Resource
  trackSlug?: string
  path?: string
}

export function ResourceItem({ resource, trackSlug, path }: ResourceItemProps) {
  const Icon = TYPE_ICONS[resource.type] ?? FileText

  return (
    <TrackedLink
      href={resource.url}
      className="card group flex gap-4 no-underline hover:border-teal/40"
      trackSlug={trackSlug}
      path={path}
      resourceTitle={resource.title}
      resourceType={resource.type}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal">
        <Icon size={18} aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h4 className="font-medium text-text-primary group-hover:text-teal">{resource.title}</h4>
          <span className={`badge shrink-0 ${resource.free ? 'badge-green' : 'badge-amber'}`}>
            {resource.free ? 'FREE' : 'PAID'}
          </span>
        </div>
        <p className="mt-1 text-sm text-text-secondary">{resource.description}</p>
        <p className="mt-2 font-mono text-xs text-text-muted truncate">{resource.url.replace(/^https?:\/\//, '')}</p>
      </div>
      <ExternalLink size={16} className="shrink-0 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
    </TrackedLink>
  )
}
