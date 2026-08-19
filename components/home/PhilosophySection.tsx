import { TypewriterIllustration } from '@/components/ui/TypewriterIllustration'

/**
 * PhilosophySection — Section 03 · The Product Philosophy.
 *
 * Extremely concise statement backed by ONE strong visual: a quiet
 * typewriter motif that continues the brand environment from the hero.
 */
export function PhilosophySection() {
  return (
    <section className="relative overflow-hidden bg-deep">
      <div className="container py-28 md:py-40">
        <div className="mx-auto max-w-3xl">
          <p className="section-label">The philosophy</p>
          <h2 className="font-editorial text-display-lg text-text-primary">
            Tech Skill Hub organizes the chaos of independent learning into
            clear paths, practical projects, and the next thing you actually need
            to learn.
          </h2>
        </div>
      </div>

      {/* one strong visual — a cropped typewriter continuing the environment */}
      <div aria-hidden className="pointer-events-none absolute -bottom-24 right-[-6rem] select-none opacity-[0.07]">
        <TypewriterIllustration className="h-[26rem] w-[29rem] text-teal" />
      </div>
    </section>
  )
}