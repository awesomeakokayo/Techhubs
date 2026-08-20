import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Upgrade | TechSkillHub',
  robots: { index: false, follow: false },
}

export default function UpgradePage() {
  redirect('/tracks')
}