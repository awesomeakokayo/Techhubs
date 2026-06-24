import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'

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
          token.isSubscribed = sub?.status === 'ACTIVE'
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
