import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SessionProvider } from '@/components/providers/SessionProvider'
import { ToastProvider } from '@/components/ui/toast'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://techskillhub.cv'),
  title: 'Tech Skill Hub — Know what to learn next',
  description:
    'A structured path for people building real skills in technology. Tracks, roadmaps, curated resources and projects — free, for independent learners.',
  keywords:
    'tech learning, programming roadmap, frontend development, Nigeria tech, African students, free coding resources, career in tech, independent learning',
  openGraph: {
    title: 'Tech Skill Hub',
    description: 'You do not need to learn everything. You need to know what to learn next.',
    url: 'https://techskillhub.cv',
    siteName: 'Tech Skill Hub',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tech Skill Hub',
    description: 'A structured path for independent learners building real skills in technology.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-deep antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SessionProvider>
          <ToastProvider>
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
          </ToastProvider>
        </SessionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
