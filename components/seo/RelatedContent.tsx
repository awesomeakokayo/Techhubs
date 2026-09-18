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
    <section className={sidebar ? '' : 'mt-10'} aria-label={title}>
      <h2 className={sidebar ? 'font-display text-xl font-bold text-text-primary' : 'font-display text-2xl font-bold'}>
        {title}
      </h2>
      <div className={sidebar ? 'mt-4 space-y-3' : 'mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`card group flex flex-col no-underline transition-all ${
              sidebar ? '!p-4 gap-2' : 'h-full gap-2'
            }`}
          >
            <h3 className="font-display text-sm sm:text-base font-semibold text-text-primary group-hover:text-teal transition-colors">
              {link.title}
            </h3>
            <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">{link.description}</p>
            <span className="mt-2 inline-flex items-center gap-1 pt-1 text-xs font-medium text-teal group-hover:text-teal/80 transition-colors">
              Explore <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}