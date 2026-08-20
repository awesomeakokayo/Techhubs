import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export interface RelatedLink {
  title: string
  href: string
  description: string
}

interface RelatedContentProps {
  title?: string
  links: RelatedLink[]
  sidebar?: boolean
}

export function RelatedContent({ title = 'Continue learning', links, sidebar = false }: RelatedContentProps) {
  if (!links.length) return null
  return (
    <section className="mt-10" aria-label={title}>
      <h2 className="font-display text-2xl font-bold">{title}</h2>
      <div className={sidebar ? 'mt-6 space-y-3' : 'mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="card group flex h-full flex-col gap-2 no-underline"
          >
            <h3 className="font-display text-base text-text-primary group-hover:text-teal">
              {link.title}
            </h3>
            <p className="text-xs text-text-secondary line-clamp-2">{link.description}</p>
            <span className="mt-auto inline-flex items-center gap-1 pt-1 text-xs font-medium text-teal">
              Explore <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}