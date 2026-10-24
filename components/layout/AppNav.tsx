'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { Menu, X, LogOut } from 'lucide-react'

const APP_LINKS = [
  { href: '/dashboard', label: 'Learning Home' },
  { href: '/paths', label: 'Explore paths' },
]

export function AppNav() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')
  const name = session?.user?.name?.split(' ')[0] || 'Learner'
  const initial = (name[0] ?? 'L').toUpperCase()

  async function handleSignOut() {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <header className="sticky top-0 z-[100] h-16 border-b border-border-subtle bg-surface/85 backdrop-blur-md">
      <div className="container flex h-full items-center justify-between gap-4">
        <Link
          href="/dashboard"
          className="flex items-baseline gap-1 no-underline"
          aria-label="TechSkillHub learning home"
        >
          <span className="font-display text-xl font-semibold text-text-primary">Tech</span>
          <span className="font-display text-sm font-medium text-text-primary">Skill Hub</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Application navigation">
          {APP_LINKS.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={
                  'relative rounded-md px-3 py-2 text-sm transition-colors ' +
                  (active ? 'font-semibold text-grape' : 'font-medium text-text-secondary hover:text-grape')
                }
              >
                {link.label}
                {active && (
                  <span aria-hidden className="absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-grape" />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href="/account"
            className="hidden items-center gap-2 rounded-full py-1 pl-1 pr-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-elevated hover:text-grape lg:inline-flex"
            aria-label="Account"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-grape/10 text-xs font-semibold text-grape">
              {initial}
            </span>
            <span className="hidden max-w-[7rem] truncate xl:inline">{name}</span>
          </Link>
          <button
            type="button"
            onClick={() => void handleSignOut()}
            className="hidden items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-elevated hover:text-grape lg:inline-flex"
          >
            <LogOut size={16} aria-hidden />
            Sign out
          </button>
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

      {menuOpen && (
        <div className="fixed inset-0 z-[99] lg:hidden" role="dialog" aria-modal="true" aria-label="Application navigation">
          <button
            type="button"
            className="absolute inset-0 bg-void"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <div className="relative flex h-full flex-col px-6 pt-24 pb-8">
            <nav className="flex flex-col gap-1" aria-label="Application navigation">
              {APP_LINKS.map((link) => {
                const active = isActive(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className="flex items-center gap-3 text-text-primary no-underline"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className={'font-display text-3xl ' + (active ? 'text-grape' : 'text-text-primary')}>
                      {link.label}
                    </span>
                  </Link>
                )
              })}
            </nav>
            <div className="mt-auto space-y-3 border-t border-border-subtle pt-6">
              <Link
                href="/account"
                className="btn btn-secondary inline-flex w-full items-center justify-center gap-1.5"
                onClick={() => setMenuOpen(false)}
              >
                Account
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false)
                  void handleSignOut()
                }}
                className="btn btn-secondary inline-flex w-full items-center justify-center gap-1.5"
              >
                <LogOut size={16} aria-hidden />
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
