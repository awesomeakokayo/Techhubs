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
}

export function RelatedContent({ title = 'Continue learning', links }: RelatedContentProps) {
  if (!links.length) return null
  return (
    <section className="mt-10" aria-label={title}>
      <h2 className="font-display text-2xl font-bold">{title}</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="card group flex h-full flex-col gap-2 no-underline"
          >
            <h3 className="font-display text-lg text-text-primary group-hover:text-teal">
              {link.title}
            </h3>
            <p className="text-sm text-text-secondary">{link.description}</p>
            <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-teal">
              Explore <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}