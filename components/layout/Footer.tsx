import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const LINKS = {
  Learn: [
    { href: '/tracks', label: 'Tracks' },
    { href: '/roadmaps', label: 'Roadmaps' },
    { href: '/resources', label: 'Resources' },
    { href: '/career', label: 'Career' },
  ],
  Tools: [
    { href: '/ai-guide', label: 'AI Guide' },
    { href: '/start-here', label: 'Start Here' },
    { href: '/upgrade', label: 'Guided Path' },
  ],
  Community: [
    { href: 'https://discord.gg/example', label: 'Discord', external: true },
    { href: 'https://linkedin.com/company/example', label: 'LinkedIn', external: true },
    { href: 'https://twitter.com/example', label: 'Twitter', external: true },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-surface">
      <div className="container py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="font-display text-lg font-extrabold text-text-primary no-underline">
              TSH
            </Link>
            <p className="mt-2 text-sm text-text-muted max-w-[200px]">
              Learn the skills that get you hired.
            </p>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group}>
              <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">{group}</p>
              <ul className="mt-3 space-y-2">
                {items.map(({ href, label, external }) => (
                  <li key={label}>
                    {external ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-text-secondary transition-colors hover:text-teal no-underline"
                      >
                        {label}
                        <ArrowUpRight size={13} className="shrink-0 opacity-60" />
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className="text-sm text-text-secondary transition-colors hover:text-teal no-underline"
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border-subtle pt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-text-muted">© 2025 Tech Skills Hub. All rights reserved.</p>
          <p className="text-xs text-text-muted">Made with focus, not fluff.</p>
        </div>
      </div>
    </footer>
  )
}
