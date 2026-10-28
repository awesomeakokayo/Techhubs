import type { Metadata } from 'next'
import { SessionProvider } from '@/components/providers/SessionProvider'
import { ToastProvider } from '@/components/ui/toast'
import { StructuredData } from '@/components/seo/StructuredData'
import { QuizResultSync } from '@/components/progress/QuizResultSync'
import { CommercialAnnouncement } from '@/components/commercial/CommercialAnnouncement'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { getSiteMetadata, organizationJsonLd, websiteJsonLd } from '@/lib/seo/utils'
import '@/styles/globals.css'

export const metadata: Metadata = getSiteMetadata()

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body className="min-h-screen bg-deep antialiased">
        <StructuredData blocks={[organizationJsonLd(), websiteJsonLd()]} />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <CommercialAnnouncement enabled={process.env.COMMERCE_ANNOUNCEMENT !== 'false'} />
        <SessionProvider>
          <ToastProvider>
            <QuizResultSync />
            {children}
          </ToastProvider>
        </SessionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}