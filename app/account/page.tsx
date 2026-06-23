import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { TRACKS } from '@/lib/tracks'
import { AccountClient } from './AccountClient'

export const dynamic = 'force-dynamic'

export default async function AccountPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const subscription = await prisma.subscription.findUnique({
    where: { userId: session.user.id },
  })

  const serialized = subscription
    ? {
        status: subscription.status,
        plan: subscription.plan,
        currentPeriodEnd: subscription.currentPeriodEnd?.toISOString() ?? null,
        paystackSubscriptionCode: subscription.paystackSubscriptionCode,
      }
    : null

  return <AccountClient subscription={serialized} user={session.user} tracks={TRACKS} />
}
