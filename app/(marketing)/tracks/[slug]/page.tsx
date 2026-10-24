import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import { getTrackBySlug, TRACKS } from '@/lib/tracks'
import type { Resource } from '@/lib/tracks'
import { getAIEnrichedTrack } from '@/lib/ai-track'
import { RESOURCE_STAGE_MAP } from '@/lib/guided-path'
import { AI_RESOURCE_STAGE_MAP } from '@/lib/ai-curriculum'
import { TrackPageView } from '@/components/tracks/TrackPageView'
import { CheckoutButton } from '@/components/commercial/CheckoutButton'
import { isPremiumTrack } from '@/lib/commercial/plans'
import { checkoutEnabled, selectProvider, type ProviderId } from '@/lib/commercial/providers'
import { launchReadiness } from '@/lib/commercial/launch'
import type { Metadata } from 'next'
import { getPageMetadata } from '@/lib/seo/utils'
import { PageViewTracker } from '@/components/analytics/page-view-tracker'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const track = getTrackBySlug(params.slug)
  if (!track) return { title: 'Track Not Found' }
  const enrichedTrack = getAIEnrichedTrack(track)
  return getPageMetadata({
    title: `${enrichedTrack.name}: Path, Roadmap & Resources`,
    description: `${enrichedTrack.tagline} Follow the ${enrichedTrack.name.toLowerCase()} roadmap with curated free resources, projects and career guidance.`,
    path: `/tracks/${enrichedTrack.slug}`,
    keywords: [`${enrichedTrack.name.toLowerCase()} roadmap`, `${enrichedTrack.name.toLowerCase()} learning path`],
    type: 'article',
  })
}

export function generateStaticParams(): { slug: string }[] {
  return TRACKS.map((t) => ({ slug: t.slug }))
}

/** Group a track's resources under their roadmap stage, server-side. */
function groupResourcesByStage(trackId: string, resources: Resource[]): Record<number, Resource[]> {
  const stageMap = {
    ...(RESOURCE_STAGE_MAP[trackId] ?? {}),
    ...(AI_RESOURCE_STAGE_MAP[trackId] ?? {}),
  }
  const grouped: Record<number, Resource[]> = {}
  for (const resource of resources) {
    const stageId = stageMap[resource.id]
    if (stageId != null) {
      ;(grouped[stageId] ??= []).push(resource)
    }
  }
  return grouped
}

export default async function TrackPage({ params }: Props) {
  const track = getTrackBySlug(params.slug)
  if (!track) notFound()
  const enrichedTrack = getAIEnrichedTrack(track)
  const resourcesByStage = groupResourcesByStage(enrichedTrack.id, enrichedTrack.resources)
  const premium = isPremiumTrack(enrichedTrack.id)
  const country = headers().get('x-vercel-ip-country')?.trim().toUpperCase() ?? ''
  const preferredProvider: ProviderId = country === 'NG' ? 'paystack' : 'lemonsqueezy'
  const provider = selectProvider('TRACK_PASS', preferredProvider)
  const canCheckout = checkoutEnabled() && launchReadiness(process.env, 'TRACK_PASS', provider).ready

  return (
    <>
      <PageViewTracker path={`/tracks/${enrichedTrack.slug}`} eventName="track_page_open" />
      {premium && (
        <div className="container max-w-6xl pt-6">
          <div className="card flex flex-wrap items-center justify-between gap-4 border-teal/30">
            <div>
              <h2 className="font-display text-lg font-semibold text-text-primary">Premium track</h2>
              <p className="text-sm text-text-secondary">
                {canCheckout
                  ? 'Get three months of access to this track with a Track Pass (one-time, no auto-renewal), or unlock every premium track with Pro.'
                  : 'This track is planned to be part of the premium offering. When it opens, a Track Pass will give three months of access to this track (one-time, no auto-renewal). Your access to what you are learning now, and your progress, are unchanged.'}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {canCheckout && (
                <CheckoutButton planId="TRACK_PASS" trackId={enrichedTrack.id} label="Get 3-Month Track Pass" />
              )}
              <a href="/pricing" className="btn btn-secondary text-sm">See plans</a>
            </div>
          </div>
        </div>
      )}
      <TrackPageView track={enrichedTrack} resourcesByStage={resourcesByStage} />
    </>
  )
}
