import Link from 'next/link'
import { Sparkles, ArrowRight } from 'lucide-react'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function UpgradeTeaser() {
  return (
    <section className="section">
      <div className="container">
        <AnimateIn>
          <div className="relative overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/5 to-purple-500/5 p-8 md:p-12">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <div className="flex items-center gap-2 text-accent mb-3">
                  <Sparkles size={20} />
                  <span className="font-mono text-xs uppercase tracking-widest">Premium</span>
                </div>
                <h2 className="font-display text-2xl font-bold md:text-3xl">
                  Go further with a Guided Path
                </h2>
                <p className="mt-3 text-text-secondary max-w-none">
                  Unlock a step-by-step learning experience with quizzes, projects, and cross-device
                  progress sync. <strong>₦2,450/month</strong> or <strong>₦14,700/year</strong> (50% off).
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/upgrade" className="btn btn-primary inline-flex items-center gap-1.5">
                    <Sparkles size={16} />
                    Upgrade Now <ArrowRight size={16} className="shrink-0" />
                  </Link>
                  <Link href="/login" className="btn btn-ghost text-sm">
                    Sign in to get started
                  </Link>
                </div>
              </div>

              <div className="flex justify-center" aria-hidden>
                <svg viewBox="0 0 200 160" className="h-40 w-full max-w-[240px] text-accent/30" fill="none">
                  <rect x="30" y="20" width="140" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" fill="var(--bg-elevated)" />
                  <rect x="30" y="50" width="100" height="8" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                  <rect x="30" y="65" width="120" height="8" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                  <rect x="30" y="80" width="80" height="8" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                  <circle cx="55" cy="120" r="16" stroke="currentColor" strokeWidth="2" fill="var(--bg-elevated)" />
                  <circle cx="55" cy="120" r="8" stroke="currentColor" strokeWidth="2" fill="var(--accent-primary)" opacity="0.4" />
                  <line x1="70" y1="120" x2="120" y2="120" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
                  <circle cx="145" cy="120" r="16" stroke="currentColor" strokeWidth="2" fill="var(--bg-elevated)" />
                  <text x="145" y="124" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="monospace">G</text>
                  <path d="M170 115 L185 120 L170 125" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
