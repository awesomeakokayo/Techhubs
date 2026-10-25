import { ArrowRight, Asterisk } from 'lucide-react'
import { CtaLink } from './CtaLink'

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <Asterisk
        aria-hidden
        size={420}
        strokeWidth={0.5}
        className="pointer-events-none absolute -bottom-40 -left-24 text-white/[0.05]"
      />

      <div className="landing-container py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-12 md:items-end md:gap-8">
          <div className="md:col-span-8">
            <p className="landing-eyebrow landing-eyebrow-light">Start here</p>
            <h2 className="landing-display mt-5 text-[clamp(2.35rem,5.6vw,5.2rem)] text-white">
              You don&apos;t need to learn everything.
              <br />
              <span className="landing-serif text-aqua">
                You need to know what to learn next.
              </span>
            </h2>
          </div>

          <div className="md:col-span-4">
            <p className="max-w-sm text-sm leading-relaxed text-white/75">
              Start with a direction. Follow the roadmap. Build the proof. You can explore
              the catalogue without an account.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <CtaLink
                href="/find-your-path"
                label="Find Your Path"
                className="btn btn-light w-full justify-center"
              >
                Find Your Path <ArrowRight size={16} className="shrink-0" />
              </CtaLink>
              <CtaLink
                href="/paths"
                label="Explore the paths"
                className="btn btn-outline-light w-full justify-center"
              >
                Explore the paths
              </CtaLink>
            </div>
            <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-white/75">
              Beginner-friendly · Self-paced · Free catalogue
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
