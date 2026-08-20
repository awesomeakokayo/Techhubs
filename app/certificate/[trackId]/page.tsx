import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { Download, Lock, GraduationCap } from 'lucide-react'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { getTrackById } from '@/lib/tracks'
import { hasTrackAccess } from '@/lib/access'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Certificate | TechSkillHub',
  robots: { index: false, follow: false },
}

export default async function CertificatePage({ params }: { params: { trackId: string } }) {
  const session = await auth()
  if (!session?.user?.id) redirect(`/login?next=/certificate/${params.trackId}`)

  const track = getTrackById(params.trackId)
  if (!track) notFound()

  const [completion, ownAccess] = await Promise.all([
    prisma.courseCompletion.findUnique({
      where: { userId_trackId: { userId: session.user.id, trackId: params.trackId } },
    }),
    hasTrackAccess(session.user.id, params.trackId),
  ])

  const earned = !!completion

  return (
    <div className="min-h-[80vh] py-12 px-6">
      <div className="mx-auto max-w-3xl">
        <div className="no-print mb-6 flex items-center justify-between gap-4">
          <Link
            href={`/tracks/${track.slug}`}
            className="text-sm text-text-secondary hover:text-text-primary no-underline"
          >
            ← Back to {track.name}
          </Link>
          {earned && (
            <button type="button" onClick={() => window.print()} className="btn btn-primary text-sm inline-flex items-center gap-2">
              <Download size={14} /> Download as PDF
            </button>
          )}
        </div>

        <div className={`certificate-shell relative overflow-hidden border-4 border-teal/30 bg-surface px-8 py-14 text-center shadow-2xl md:px-16 ${earned ? '' : 'opacity-90'}`}>
          <div aria-hidden className="pointer-events-none absolute inset-3 border border-border-default" />
          <div aria-hidden className="pointer-events-none absolute inset-4 border border-border-subtle" />

          <div className="relative">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-text-muted">Tech Skill Hub</p>
            <h1 className="mt-3 font-editorial text-4xl text-text-primary md:text-5xl">
              Certificate of Completion
            </h1>

            {earned ? (
              <>
                <p className="mt-8 text-sm text-text-secondary">This certifies that</p>
                <p className="mt-2 font-display text-2xl font-bold text-teal md:text-4xl">
                  {session.user.name || 'the bearer'}
                </p>
                <p className="mt-6 text-sm text-text-secondary">
                  has successfully completed the guided course
                </p>
                <p className="mt-2 font-display text-xl font-bold text-text-primary md:text-3xl">
                  {track.name}
                </p>
                <p className="mt-8 text-sm text-text-secondary">
                  {new Date(completion.completedAt).toLocaleDateString(undefined, {
                    year: 'numeric', month: 'long', day: 'numeric',
                  })}
                </p>
                <div className="mt-10 flex items-end justify-between text-left">
                  <div className="border-t border-border-default pt-2">
                    <p className="text-xs text-text-muted">Signed</p>
                    <p className="mt-1 font-display text-sm font-semibold text-text-primary">Tech Skill Hub</p>
                  </div>
                  <div className="border-t border-border-default pt-2 text-right">
                    <p className="text-xs text-text-muted">Verify</p>
                    <p className="mt-1 font-display text-sm font-semibold text-text-primary">techskillhub.com</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="py-10">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-md border border-border-default bg-elevated text-text-muted">
                  <Lock size={24} />
                </div>
                <p className="mt-6 max-w-md mx-auto text-text-secondary">
                  Finish every step of the {track.name} guided path to earn this certificate — quizzes,
                  resources, and projects included. Your progress is tracked right where you stopped.
                </p>
                <div className="mt-8">
                  <Link
                    href={ownAccess ? `/guided-path/${track.id}` : `/purchase/${track.id}`}
                    className="btn btn-primary inline-flex items-center gap-1.5"
                  >
                    <GraduationCap size={16} />
                    {ownAccess ? 'Continue Your Path' : 'Unlock This Course'}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}