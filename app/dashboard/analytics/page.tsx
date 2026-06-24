'use client'

import { useMemo, useState, useEffect } from 'react'
import { TRACKS } from '@/lib/tracks'
import { getProgress } from '@/lib/progress'
import { PageHeader } from '@/components/ui/PageHeader'
import { PageViewTracker } from '@/components/analytics/page-view-tracker'

export default function AnalyticsDashboardPage() {
  const [refreshKey, setRefreshKey] = useState(0)
  useEffect(() => { const t = setInterval(() => setRefreshKey((k) => k + 1), 5000); return () => clearInterval(t) }, [])
  const summary = useMemo(() => {
    const progress = getProgress()
    const trackEntries = Object.entries(progress.tracks ?? {})
    const activeTrackCount = trackEntries.filter(([, item]) => item.started).length
    const completedStages = trackEntries.reduce((acc, [, item]) => acc + item.completedStages.length, 0)
    const completedProjects = trackEntries.reduce((acc, [, item]) => acc + item.completedProjects.length, 0)
    const topTracks = TRACKS.map((track) => ({
      id: track.id,
      name: track.name,
      started: Boolean(progress.tracks?.[track.id]?.started),
      completion:
        (progress.tracks?.[track.id]?.completedStages.length ?? 0) +
        (progress.tracks?.[track.id]?.completedProjects.length ?? 0),
    }))
      .sort((a, b) => b.completion - a.completion)
      .slice(0, 8)

    return { activeTrackCount, completedStages, completedProjects, topTracks }
  }, [refreshKey])

  return (
    <div className="section pt-28">
      <div className="container">
        <PageViewTracker path="/dashboard/analytics" eventName="dashboard_analytics_open" />
        <PageHeader
          title="Analytics Dashboard (Internal)"
          subtitle="Local summary preview. Use Vercel Analytics and Speed Insights dashboards for production traffic intelligence."
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Dashboard' }, { label: 'Analytics' }]}
        />

        <div className="grid gap-4 md:grid-cols-3">
          <article className="card">
            <p className="font-mono text-xs uppercase tracking-wider text-text-muted">Active learners</p>
            <p className="mt-2 font-display text-3xl font-bold text-teal">{summary.activeTrackCount}</p>
          </article>
          <article className="card">
            <p className="font-mono text-xs uppercase tracking-wider text-text-muted">Completed stages</p>
            <p className="mt-2 font-display text-3xl font-bold text-teal">{summary.completedStages}</p>
          </article>
          <article className="card">
            <p className="font-mono text-xs uppercase tracking-wider text-text-muted">Completed projects</p>
            <p className="mt-2 font-display text-3xl font-bold text-teal">{summary.completedProjects}</p>
          </article>
        </div>

        <section className="mt-10">
          <h2 className="font-display text-xl font-bold">Top Tracks by Engagement</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {summary.topTracks.map((track) => (
              <article key={track.id} className="card flex items-center justify-between">
                <div>
                  <h3 className="font-display font-semibold">{track.name}</h3>
                  <p className="text-sm text-text-secondary">
                    {track.started ? 'In progress' : 'Not started'}
                  </p>
                </div>
                <span className="badge badge-teal">{track.completion} actions</span>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
