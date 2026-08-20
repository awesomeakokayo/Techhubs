'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Menu, Search, X, ArrowRight, User } from 'lucide-react'
import { SearchModal } from '@/components/search/SearchModal'

const NAV_LINKS = [
  { href: '/roadmaps', label: 'Roadmaps' },
  { href: '/guides', label: 'Guides' },
  { href: '/paths', label: 'Paths' },
  { href: '/resources', label: 'Resources' },
  { href: '/career', label: 'Career' },
]

export function Navbar() {
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        setSearchOpen(false)
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header
        className="sticky top-0 z-[100] h-16 border-b border-border-subtle bg-surface/85 backdrop-blur-md"
      >
        <div className="container flex h-full items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-baseline gap-1 no-underline">
            <span className="font-editorial text-xl text-text-primary">Tech</span>
            <span className="font-display text-sm font-semibold text-text-primary">Skill Hub</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:text-teal"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-1">
            <div className="hidden lg:block">
              <Link
                href="/find-your-path"
                className="btn btn-primary items-center gap-1.5 px-3.5 py-2 text-sm"
              >
                Find Your Path <ArrowRight size={14} className="shrink-0" />
              </Link>
            </div>
            {session ? (
              <Link
                href="/account"
                className="flex h-10 w-10 items-center justify-center rounded-md text-text-secondary transition-colors hover:text-teal"
                aria-label="Account"
              >
                <User size={18} />
              </Link>
            ) : (
              <Link
                href="/login"
                className="hidden rounded-md px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:text-teal lg:inline-flex"
              >
                Sign In
              </Link>
            )}
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-md text-text-secondary transition-colors hover:text-teal"
              aria-label="Open search"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={18} />
            </button>
            <span className="hidden items-center gap-0.5 rounded-md border border-border-default px-1.5 py-0.5 font-mono text-[0.6rem] text-text-muted lg:inline-flex">
              <span className="text-[0.7rem]">⌘</span>K
            </span>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-md text-text-primary transition-colors lg:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[99] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-void"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <div className="relative flex h-full flex-col px-6 pt-24 pb-8">
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {NAV_LINKS.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center gap-3 text-text-primary no-underline"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="font-mono text-[0.6rem] text-text-muted">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-editorial text-3xl">{link.label}</span>
                </Link>
              ))}
            </nav>
            <div className="mt-auto border-t border-border-subtle pt-6 space-y-3">
              {!session && (
                <Link
                  href="/login"
                  className="btn btn-secondary w-full justify-center inline-flex items-center gap-1.5"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
              <Link href="/find-your-path" className="btn btn-primary w-full justify-center inline-flex items-center gap-1.5" onClick={() => setMenuOpen(false)}>
                Find Your Path <ArrowRight size={16} className="shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      )}

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
