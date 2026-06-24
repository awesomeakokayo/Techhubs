import { NextResponse } from 'next/server'
import { auth } from '@/auth'

export const dynamic = 'force-dynamic'

const AMOUNTS: Record<string, number> = {
  monthly: 245000,
  threeMonths: 514500,
  yearly: 1470000,
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY
    if (!secretKey) return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })

    const baseUrl = process.env.NEXTAUTH_URL
    if (!baseUrl) return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })

    let plan: string
    try { ({ plan } = await req.json()) }
    catch { return NextResponse.json({ error: 'Invalid request body' }, { status: 400 }) }

    const amount = AMOUNTS[plan]
    if (!amount) return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })

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
        callback_url: `${baseUrl}/account?subscribed=true`,
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

    const authUrl = data.data?.authorization_url
    if (!authUrl) return NextResponse.json({ error: 'No authorization URL returned' }, { status: 502 })

    return NextResponse.json({ authorizationUrl: authUrl })
  } catch {
    return NextResponse.json({ error: 'Failed to initialize payment' }, { status: 500 })
  }
}
