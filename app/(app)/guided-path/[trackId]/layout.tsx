import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Guided Path | TechSkillHub',
  robots: { index: false, follow: false },
}

export default function GuidedPathTrackLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}