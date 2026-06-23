import { NextResponse } from 'next/server'
import { auth } from '@/auth'

export const dynamic = 'force-dynamic'

const AMOUNTS: Record<string, number> = {
  monthly: 245000,
  yearly: 1470000,
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { plan } = await req.json()
  const amount = AMOUNTS[plan as keyof typeof AMOUNTS]

  if (!amount) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY!

  const response = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: session.user.email,
      amount: String(amount),
      currency: 'NGN',
      callback_url: `${process.env.NEXTAUTH_URL}/account?subscribed=true`,
      metadata: {
        userId: session.user.id,
        plan,
      },
    }),
  })

  const data = await response.json()

  if (!data.status) {
    return NextResponse.json({ error: `Paystack: ${data.message}` }, { status: 400 })
  }

  return NextResponse.json({ authorizationUrl: data.data.authorization_url })
}
