'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { LogOut, Menu, UserRound, X } from 'lucide-react'
import { APP_NAV, isNavActive, pageTitleFor } from './navigation'
import { Logo } from '@/components/brand/Logo'

export function AppShell({
  children,
  badges = {},
}: {
  children: React.ReactNode
  badges?: Record<string, number>
}) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const title = pageTitleFor(pathname)

  const user = session?.user
  const name = user?.name || user?.email || 'Learner'
  const email = user?.email ?? ''
  const initial = (user?.name?.[0] ?? user?.email?.[0] ?? 'L').toUpperCase()

  const renderNav = (onNavigate?: () => void) => (
    <nav className="flex flex-col gap-1" aria-label="Application navigation">
      <p className="px-3 pb-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-text-muted">Menu</p>
      {APP_NAV.map((item) => {
        const Icon = item.icon
        const active = isNavActive(pathname, item.href)
        const badge = badges[item.href]
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            onClick={onNavigate}
            className={
              'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ' +
              (active ? 'bg-[var(--accent-primary-bg)]' : 'hover:bg-elevated')
            }
          >
            {active && <span aria-hidden className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-grape" />}
            <span
              className={
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ' +
                (active ? 'bg-[var(--accent-primary-bg)] text-grape' : 'text-text-muted group-hover:bg-elevated group-hover:text-text-primary')
              }
            >
              <Icon size={17} aria-hidden />
            </span>
            <span className={active ? 'font-semibold text-text-primary' : 'font-medium text-text-secondary group-hover:text-text-primary'}>
              {item.label}
            </span>
            {typeof badge === 'number' && badge > 0 && (
              <span className="ml-auto rounded-full bg-elevated px-2 py-0.5 font-mono text-[0.65rem] text-text-secondary">{badge}</span>
            )}
          </Link>
        )
      })}
    </nav>
  )

  const renderSettings = (onNavigate?: () => void) => (
    <nav className="flex flex-col gap-1" aria-label="Account navigation">
      <p className="px-3 pb-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-text-muted">Settings</p>
      <Link href="/account" onClick={onNavigate} className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-elevated">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-text-muted transition-colors group-hover:text-text-primary">
          <UserRound size={17} aria-hidden />
        </span>
        <span className="font-medium text-text-secondary group-hover:text-text-primary">Account</span>
      </Link>
      <button
        type="button"
        onClick={() => {
          onNavigate?.()
          void signOut({ callbackUrl: '/' })
        }}
        className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-elevated"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-text-muted transition-colors group-hover:text-text-primary">
          <LogOut size={17} aria-hidden />
        </span>
        <span className="font-medium text-text-secondary group-hover:text-text-primary">Sign out</span>
      </button>
    </nav>
  )

  return (
    <div className="min-h-screen bg-void">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border-subtle bg-surface lg:flex">
        <div className="flex h-16 items-center border-b border-border-subtle px-5">
          <Link href="/dashboard" className="flex items-center no-underline" aria-label="TechSkillHub learning home">
            <Logo size={26} />
          </Link>
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto p-3">
          {renderNav()}
          <div className="mt-auto pt-4">{renderSettings()}</div>
        </div>
      </aside>

      {/* Content column */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border-subtle bg-surface/85 px-4 backdrop-blur-md sm:px-6 lg:px-8">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-md text-text-primary lg:hidden"
            aria-label={drawerOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen((open) => !open)}
          >
            {drawerOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <p className="font-display text-base font-semibold text-text-primary">{title}</p>
          <Link
            href="/account"
            aria-label="Account"
            className="ml-auto flex items-center gap-2 rounded-full py-1 pl-1 pr-2.5 transition-colors hover:bg-elevated"
          >
            <span
              aria-hidden
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-grape/10 text-xs font-semibold text-grape"
              style={
                user?.image
                  ? { backgroundImage: `url(${user.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                  : undefined
              }
            >
              {user?.image ? null : initial}
            </span>
            <span className="hidden min-w-0 sm:block">
              <span className="block max-w-[10rem] truncate text-sm font-medium text-text-primary">{name}</span>
              {email && <span className="block max-w-[10rem] truncate text-xs text-text-muted">{email}</span>}
            </span>
          </Link>
        </header>

        <main id="main-content" className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Application menu">
          <button
            type="button"
            className="absolute inset-0 bg-void/80"
            aria-label="Close navigation overlay"
            onClick={() => setDrawerOpen(false)}
          />
          <div data-testid="app-drawer" className="relative mr-auto flex h-full w-72 max-w-[82%] flex-col border-r border-border-subtle bg-surface p-4">
            <div className="mb-4 flex items-center justify-between">
              <Logo size={24} />
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-md text-text-primary"
                aria-label="Close navigation"
                onClick={() => setDrawerOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            {renderNav(() => setDrawerOpen(false))}
            <div className="mt-auto pt-4">{renderSettings(() => setDrawerOpen(false))}</div>
          </div>
        </div>
      )}
    </div>
  )
}
