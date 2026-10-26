import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { LogoMark } from '@/components/brand/Logo'

type NavLink = { href: string; label: string }

const EXPLORE: NavLink[] = [
  { href: '/roadmaps', label: 'Roadmaps' },
  { href: '/paths', label: 'Learning paths' },
  { href: '/projects', label: 'Projects' },
  { href: '/resources', label: 'Resources' },
  { href: '/guides', label: 'Guides' },
  { href: '/career', label: 'Career prep' },
]

const START: NavLink[] = [
  { href: '/find-your-path', label: 'Find Your Path' },
  { href: '/start-here', label: 'Start here' },
  { href: '/guided-path', label: 'Guided Path' },
  { href: '/pricing', label: 'Pricing' },
]

const COMPANY: NavLink[] = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/ai', label: 'AI learning paths' },
  { href: '/pitch-deck', label: 'Pitch deck' },
]

function FooterColumn({ title, links }: { title: string; links: NavLink[] }) {
  return (
    <nav aria-label={title}>
      <p className="landing-index">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-ink/70 no-underline transition-colors hover:text-brand"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function Footer() {
  return (
    <footer className="landing border-t border-hairline">
      <div className="landing-container pt-14 md:pt-16">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline pb-6">
          <p className="landing-index">The path index / 2026</p>
          <Link href="/find-your-path" className="landing-arrow">
            Find your starting point <ArrowRight size={14} className="shrink-0" />
          </Link>
        </div>

        <p className="landing-display mt-8 text-[clamp(2.6rem,10vw,7.5rem)] leading-[0.85] text-brand">
          TechSkillHub<span className="text-aqua">.</span>
        </p>

        <div className="mt-10 grid gap-10 border-t border-hairline pt-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="max-w-sm text-sm leading-relaxed text-ink/70">
              A clearer path from wanting to learn technology to building skills you can
              show. Roadmaps, resources, projects and career context — in one place.
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              <LogoMark size={22} />
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink/70">
                Independent learning, structured.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            <FooterColumn title="Explore" links={EXPLORE} />
            <FooterColumn title="Start learning" links={START} />
            <FooterColumn title="Company" links={COMPANY} />
          </div>
        </div>

        <div
          className="relative mt-12 h-32 overflow-hidden rounded-[18px] border border-hairline bg-brand sm:h-40 md:mt-14 md:h-48"
        >
          <Image
            src="https://images.pexels.com/photos/9431442/pexels-photo-9431442.jpeg?auto=compress&cs=tinysrgb&w=1400"
            alt="Black colleagues collaborating at a whiteboard in a shared workspace"
            fill
            sizes="(max-width: 768px) 100vw, 1100px"
            quality={62}
            loading="lazy"
            className="object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ink/35 to-transparent" />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-hairline py-6">
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink/70">
            © 2026 TechSkillHub. All rights reserved.
          </p>
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink/70">
            Built for independent learners.
          </p>
        </div>
      </div>
    </footer>
  )
}
