import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      if (token.sub) {
        const sub = await prisma.subscription.findUnique({
          where: { userId: token.sub },
        })
        token.isSubscribed = sub?.status === 'ACTIVE'
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
        session.user.isSubscribed = token.isSubscribed as boolean
      }
      return session
    },
    async signIn({ user }) {
      if (user.id) {
        const existing = await prisma.subscription.findUnique({
          where: { userId: user.id },
        })
        if (!existing) {
          await prisma.subscription.create({
            data: { userId: user.id, status: 'NONE' },
          })
        }
      }
      return true
    },
  },
})
