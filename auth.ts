import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'

const TEST_AUTH_FLAG = 'TSH_TEST_AUTH'
const TEST_EMAIL_DOMAIN = '@example.test'

/**
 * Test-only authentication. Fail-closed: never registered in production, and
 * only when explicitly enabled via TSH_TEST_AUTH. Restricted to @example.test
 * addresses so it cannot authenticate real accounts.
 */
function testAuthEnabled(): boolean {
  if (process.env.NODE_ENV === 'production') return false
  return process.env[TEST_AUTH_FLAG] === 'true'
}

function testAuthProviders() {
  if (!testAuthEnabled()) return []
  return [
    Credentials({
      id: 'test-credentials',
      name: 'Test Credentials',
      credentials: { email: { label: 'Email', type: 'email' } },
      async authorize(credentials) {
        const email = typeof credentials?.email === 'string' ? credentials.email.trim().toLowerCase() : ''
        if (!email.endsWith(TEST_EMAIL_DOMAIN)) return null
        const user = await prisma.user.upsert({
          where: { email },
          create: { email, name: 'Test Learner' },
          update: {},
        })
        return { id: user.id, email: user.email, name: user.name }
      },
    }),
  ]
}

const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  path: '/',
  secure: true,
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  trustHost: true,
  cookies: {
    sessionToken: { name: 'next-auth.session-token', options: cookieOptions },
    callbackUrl: { name: 'next-auth.callback-url', options: cookieOptions },
    csrfToken: { name: 'next-auth.csrf-token', options: cookieOptions },
    state: { name: 'next-auth.state', options: cookieOptions },
    pkceCodeVerifier: { name: 'next-auth.pkce.code_verifier', options: cookieOptions },
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    ...testAuthProviders(),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      checks: ['state'],
    }),
  ],
  callbacks: {
    async jwt({ token, trigger }) {
      if (token.sub && (trigger === 'signIn' || trigger === 'signUp' || trigger === 'update')) {
        try {
          const sub = await prisma.subscription.findUnique({
            where: { userId: token.sub },
          })
          token.isSubscribed =
            sub?.status === 'ACTIVE' &&
            !!sub.currentPeriodEnd &&
            sub.currentPeriodEnd > new Date()
        } catch (e) {
          console.error('auth: failed to fetch subscription for', token.sub, e)
          token.isSubscribed = false
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
        session.user.isSubscribed = (token.isSubscribed as boolean) ?? false
      }
      return session
    },
    async signIn({ user }) {
      if (user.id) {
        try {
          const existing = await prisma.subscription.findUnique({
            where: { userId: user.id },
          })
          if (!existing) {
            await prisma.subscription.create({
              data: { userId: user.id, status: 'NONE' },
            })
          }
        } catch (e) {
          console.error('auth: failed to create subscription for', user.id, e)
        }
      }
      return true
    },
  },
})
