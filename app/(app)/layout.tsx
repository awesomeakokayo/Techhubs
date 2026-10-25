import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { AppShell } from '@/components/app/AppShell'
import { LegacyProgressImport } from '@/components/progress/LegacyProgressImport'

export const dynamic = 'force-dynamic'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  let badges: Record<string, number> = {}
  if (session?.user?.id) {
    const [enrollments, completions] = await Promise.all([
      prisma.guidedPathEnrollment.findMany({ where: { userId: session.user.id }, select: { trackId: true } }),
      prisma.courseCompletion.findMany({ where: { userId: session.user.id }, select: { trackId: true } }),
    ])
    const completedTrackIds = new Set(completions.map((item) => item.trackId))
    badges = {
      '/learning': enrollments.filter((item) => !completedTrackIds.has(item.trackId)).length,
      '/achievements': completions.length,
    }
  }

  return (
    <AppShell badges={badges}>
      <LegacyProgressImport />
      {children}
    </AppShell>
  )
}
