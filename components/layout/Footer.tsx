import Link from 'next/link'

const QUICK_LINKS = [
  { href: '/start-here', label: 'Start Here' },
  { href: '/tracks', label: 'All Tracks' },
  { href: '/roadmaps', label: 'Roadmaps' },
  { href: '/resources', label: 'Resources' },
  { href: '/ai-guide', label: 'AI Guide' },
  { href: '/career', label: 'Career Prep' },
  { href: '/projects', label: 'Projects' },
]

const COMMUNITY_LINKS = [
  { href: 'https://ingressive.org', label: 'Ingressive for Good', external: true },
  { href: 'https://hng.tech', label: 'HNG Internship', external: true },
  { href: 'https://shecodeafrica.org', label: 'She Code Africa', external: true },
  { href: 'https://www.freecodecamp.org/forum', label: 'freeCodeCamp Forum', external: true },
  { href: 'https://discord.com/invite/the-odin-project', label: 'The Odin Project Discord', external: true },
]

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-void">
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-3 mt-12">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 no-underline">
              <span className="font-display text-2xl font-extrabold gradient-text">TSH</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-text-secondary">
              A free learning hub for the next generation of tech talent.
            </p>
          </div>

          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-text-primary">
              Quick Links
            </h2>
            <ul className="mt-4 space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-teal">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-text-primary">
              Community
            </h2>
            <ul className="mt-4 space-y-2">
              {COMMUNITY_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-secondary hover:text-teal"
                  >
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border-subtle pt-8 text-center">
          <p className="text-sm text-text-secondary">
            Built with 🤍 by awesomeakokayo © 2026
          </p>
        </div>
      </div>
    </footer>
  )
}
