import { NextResponse } from 'next/server'
import { auth } from '@/auth'

const PLAN_CONFIG = {
  monthly: { name: 'Tech Skills Hub Monthly', amount: 245000, interval: 'monthly' },
  yearly: { name: 'Tech Skills Hub Yearly', amount: 1470000, interval: 'annually' },
}

async function createPlan(
  config: { name: string; amount: number; interval: string },
  secretKey: string
): Promise<string> {
  const res = await fetch('https://api.paystack.co/plan', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...config,
      name: config.name + ' ' + Date.now(),
      currency: 'NGN',
    }),
  })
  const data = await res.json()
  if (!data.status) throw new Error(data.message)
  return data.data.plan_code
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { plan } = await req.json()
  const config = PLAN_CONFIG[plan as keyof typeof PLAN_CONFIG]

  if (!config) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY!
  let planCode: string

  try {
    planCode = await createPlan(config, secretKey)
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Plan setup failed' },
      { status: 500 }
    )
  }

  const response = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: session.user.email,
      plan: planCode,
      currency: 'NGN',
      callback_url: `${process.env.NEXTAUTH_URL}/account`,
      metadata: {
        userId: session.user.id,
        plan,
      },
    }),
  })

  const data = await response.json()

  if (!data.status) {
    return NextResponse.json({ error: data.message }, { status: 400 })
  }

  return NextResponse.json({ authorizationUrl: data.data.authorization_url })
}
