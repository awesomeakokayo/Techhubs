'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, Search, X } from 'lucide-react'
import { SearchModal } from '@/components/search/SearchModal'

const NAV_LINKS = [
  { href: '/tracks', label: 'Tracks' },
  { href: '/roadmaps', label: 'Roadmaps' },
  { href: '/resources', label: 'Resources' },
  { href: '/ai-guide', label: 'AI Guide' },
  { href: '/career', label: 'Career' },
  { href: '/start-here', label: 'Start Here' },
]

export function Navbar() {
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
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <span className="font-display text-xl font-extrabold text-text-primary">TSH</span>
            <span className="hidden font-display text-sm font-semibold text-text-primary sm:inline">
              Tech Skills Hub
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-4 py-3 text-sm font-medium text-text-secondary transition-colors hover:text-teal"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-md text-text-secondary hover:text-teal"
              aria-label="Open search"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={20} />
            </button>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-md text-text-primary lg:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 z-[99] bg-void lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex h-full flex-col px-6 pt-24 pb-8">
            <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-display text-3xl font-bold text-text-primary no-underline hover:text-teal"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto border-t border-border-subtle pt-6">
              <Link href="/start-here" className="btn btn-primary w-full justify-center" onClick={() => setMenuOpen(false)}>
                Start Learning →
              </Link>
            </div>
          </div>
          <button
            type="button"
            className="absolute inset-0 -z-10"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
        </div>
      )}

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
