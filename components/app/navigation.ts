import type { LucideIcon } from 'lucide-react'
import { LayoutDashboard, GraduationCap, CalendarCheck, Award } from 'lucide-react'

export interface AppNavItem {
  href: string
  label: string
  icon: LucideIcon
}

/**
 * Primary authenticated navigation. Focused on the core learning workflow.
 * The broad public catalogue (/tracks) and the generic /projects explorer are
 * deliberately not sidebar items — discovery happens contextually from Home,
 * My Learning and inside guided paths, where it can be personalised.
 */
export const APP_NAV: AppNavItem[] = [
  { href: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { href: '/learning', label: 'My Learning', icon: GraduationCap },
  { href: '/plan', label: 'Learning Plan', icon: CalendarCheck },
  { href: '/achievements', label: 'Achievements', icon: Award },
]

const PAGE_TITLES: Array<{ prefix: string; title: string }> = [
  { prefix: '/dashboard', title: 'Home' },
  { prefix: '/learning', title: 'My Learning' },
  { prefix: '/projects', title: 'Projects' },
  { prefix: '/plan', title: 'Learning Plan' },
  { prefix: '/achievements', title: 'Achievements' },
  { prefix: '/account', title: 'Account' },
  { prefix: '/certificate', title: 'Certificate' },
  { prefix: '/guided-path', title: 'Guided Path' },
]

export function pageTitleFor(pathname: string): string {
  const match = PAGE_TITLES.find(
    (entry) => pathname === entry.prefix || pathname.startsWith(entry.prefix + '/'),
  )
  return match?.title ?? 'Learning'
}

export function isNavActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(href + '/')
}
