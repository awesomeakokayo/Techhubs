'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { ArrowRight, ArrowUpRight, LayoutDashboard, Menu, Search, X } from 'lucide-react'
import { SearchModal } from '@/components/search/SearchModal'
import { LogoMark } from '@/components/brand/Logo'

const NAV_LINKS = [
  { href: '/roadmaps', label: 'Roadmaps' },
  { href: '/paths', label: 'Paths' },
  { href: '/projects', label: 'Projects' },
  { href: '/guides', label: 'Guides' },
  { href: '/ai', label: 'AI' },
  { href: '/career', label: 'Career' },
  { href: '/pricing', label: 'Pricing' },
]

export function Navbar() {
  const pathname = usePathname()
  const isLanding = pathname === '/'
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setSearchOpen(false)
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        if (isLanding) return
        event.preventDefault()
        setMenuOpen(false)
        setSearchOpen(true)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isLanding])

  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return

    const previous = document.activeElement as HTMLElement | null
    const target =
      menuRef.current?.querySelector<HTMLElement>('[data-autofocus]') ??
      menuRef.current?.querySelector<HTMLElement>('a[href], button:not([disabled])')
    target?.focus()
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
      previous?.focus?.()
    }
  }, [menuOpen])

  function closeMenu() {
    setMenuOpen(false)
    menuButtonRef.current?.focus()
  }

  function handleDialogKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'Tab' || !menuRef.current) return

    const focusable = Array.from(
      menuRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
    ).filter((node) => node.offsetParent !== null)

    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <>
      <header className="sticky top-0 z-[100] border-b border-hairline bg-paper">
        <div className="landing-container flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5 no-underline"
            aria-label="TechSkillHub home"
          >
            <LogoMark size={26} />
            <span className="font-display text-[1.05rem] font-semibold tracking-tight text-ink">
              TechSkillHub
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className="landing-nav-link rounded px-2.5 py-2 text-[0.8125rem] font-medium text-ink/70 no-underline transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-1">
            <div className="mr-1 hidden lg:block">
              <Link
                href="/find-your-path"
                className="btn btn-primary btn-sm items-center gap-1.5"
              >
                Find Your Path <ArrowRight size={14} className="shrink-0" />
              </Link>
            </div>

            {session ? (
              <Link
                href="/dashboard"
                className="flex h-10 w-10 items-center justify-center rounded-md text-ink/70 transition-colors hover:text-brand"
                aria-label="Learning home"
              >
                <LayoutDashboard size={18} />
              </Link>
            ) : (
              <Link
                href="/login"
                className="hidden rounded-md px-2.5 py-2 text-[0.8125rem] font-medium text-ink/70 no-underline transition-colors hover:text-ink lg:inline-flex"
              >
                Sign in
              </Link>
            )}

            {!isLanding ? (
              <>
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-md text-ink/70 transition-colors hover:text-brand"
                  aria-label="Open search"
                  onClick={() => setSearchOpen(true)}
                >
                  <Search size={18} />
                </button>
                <kbd className="hidden items-center gap-0.5 rounded border border-hairline px-1.5 py-0.5 font-mono text-[0.6rem] text-ink/70 xl:inline-flex">
                  ⌘K
                </kbd>
              </>
            ) : null}

            <button
              ref={menuButtonRef}
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-md text-ink transition-colors lg:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <div
          ref={menuRef}
          className="fixed inset-0 z-[110] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          onKeyDown={handleDialogKeyDown}
        >
          <div className="absolute inset-0 bg-paper" aria-hidden="true" />

          <div className="relative flex h-full flex-col overflow-y-auto px-6 pb-8 pt-5">
            <div className="flex items-center justify-between gap-4 pb-6">
              <Link
                href="/"
                className="flex min-w-0 items-center gap-2.5 no-underline"
                aria-label="TechSkillHub home"
                onClick={closeMenu}
              >
                <LogoMark size={26} />
                <span className="font-display text-[1.05rem] font-semibold tracking-tight text-ink">
                  TechSkillHub
                </span>
              </Link>
              <button
                type="button"
                data-autofocus
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-ink transition-colors hover:text-brand"
                aria-label="Close menu"
                onClick={closeMenu}
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-col" aria-label="Mobile navigation">
              {NAV_LINKS.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-baseline gap-3 border-b border-hairline py-3 no-underline"
                  onClick={closeMenu}
                >
                  <span className="font-mono text-[0.6rem] tracking-[0.08em] text-ink/70">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-3xl font-semibold tracking-tight text-ink">
                    {link.label}
                  </span>
                  <ArrowUpRight size={16} className="ml-auto self-center text-ink/60" />
                </Link>
              ))}
            </nav>

            <div className="mt-auto space-y-3 border-t border-hairline pt-6">
              {session ? (
                <Link
                  href="/dashboard"
                  className="btn btn-secondary inline-flex w-full items-center justify-center gap-1.5"
                  onClick={closeMenu}
                >
                  <LayoutDashboard size={16} />
                  Learning home
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="btn btn-secondary inline-flex w-full items-center justify-center"
                  onClick={closeMenu}
                >
                  Sign in
                </Link>
              )}
              <Link
                href="/find-your-path"
                className="btn btn-primary inline-flex w-full items-center justify-center gap-1.5"
                onClick={closeMenu}
              >
                Find Your Path <ArrowRight size={16} className="shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
