import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import {
  DEFAULT_REMINDER_WINDOW,
  isQuietHour,
  isReminderWindow,
} from '@/lib/re-engagement'

export const dynamic = 'force-dynamic'

async function authenticatedUserId() {
  const session = await auth()
  return session?.user?.id ?? null
}

export async function GET() {
  const userId = await authenticatedUserId()
  if (!userId) return NextResponse.json({ error: 'Authentication required' }, { status: 401 })

  const preference = await prisma.notificationPreference.findUnique({ where: { userId } })
  return NextResponse.json({ preference })
}

export async function PATCH(req: Request) {
  const userId = await authenticatedUserId()
  if (!userId) return NextResponse.json({ error: 'Authentication required' }, { status: 401 })

  const body = await req.json().catch(() => null)
  const email = body?.email
  const inApp = body?.inApp
  const reminderWindow = body?.reminderWindow
  const quietStartHour = body?.quietStartHour
  const quietEndHour = body?.quietEndHour

  if (email === undefined && inApp === undefined && reminderWindow === undefined && quietStartHour === undefined && quietEndHour === undefined) {
    return NextResponse.json({ error: 'Provide at least one preference to update.' }, { status: 400 })
  }
  if (email !== undefined && typeof email !== 'boolean') {
    return NextResponse.json({ error: 'Email preference must be a boolean.' }, { status: 400 })
  }
  if (inApp !== undefined && typeof inApp !== 'boolean') {
    return NextResponse.json({ error: 'In-app preference must be a boolean.' }, { status: 400 })
  }
  if (reminderWindow !== undefined && !isReminderWindow(reminderWindow)) {
    return NextResponse.json({ error: 'Reminder window must be morning, afternoon, or evening.' }, { status: 400 })
  }
  if (quietStartHour !== undefined && quietStartHour !== null && !isQuietHour(quietStartHour)) {
    return NextResponse.json({ error: 'Quiet start hour must be an integer between 0 and 23.' }, { status: 400 })
  }
  if (quietEndHour !== undefined && quietEndHour !== null && !isQuietHour(quietEndHour)) {
    return NextResponse.json({ error: 'Quiet end hour must be an integer between 0 and 23.' }, { status: 400 })
  }

  const preference = await prisma.notificationPreference.upsert({
    where: { userId },
    create: {
      userId,
      email: typeof email === 'boolean' ? email : true,
      inApp: typeof inApp === 'boolean' ? inApp : true,
      reminderWindow: isReminderWindow(reminderWindow) ? reminderWindow : DEFAULT_REMINDER_WINDOW,
      quietStartHour: isQuietHour(quietStartHour) ? quietStartHour : null,
      quietEndHour: isQuietHour(quietEndHour) ? quietEndHour : null,
    },
    update: {
      ...(typeof email === 'boolean' ? { email } : {}),
      ...(typeof inApp === 'boolean' ? { inApp } : {}),
      ...(isReminderWindow(reminderWindow) ? { reminderWindow } : {}),
      ...(quietStartHour !== undefined ? { quietStartHour: isQuietHour(quietStartHour) ? quietStartHour : null } : {}),
      ...(quietEndHour !== undefined ? { quietEndHour: isQuietHour(quietEndHour) ? quietEndHour : null } : {}),
    },
  })

  return NextResponse.json({ preference })
}
