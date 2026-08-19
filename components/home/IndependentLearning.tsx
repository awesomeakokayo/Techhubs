import Image from 'next/image'

/**
 * IndependentLearning — Section 07 · the emotional beat.
 *
 * No classroom schedule. No waiting. The typography does the work,
 * with the "your own pace" line-art printed faintly behind it.
 */
export function IndependentLearning() {
  return (
    <section className="relative overflow-hidden bg-void">
      {/* ── "your own pace" line-art — full-bleed background ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
        <Image
          src="/yourownpace.png"
          alt=""
          fill
          sizes="100vw"
          className="art-photo object-cover object-[center_65%]"
        />

        {/* fade to the page base so the copy stays readable */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(80% 70% at 50% 40%, transparent 25%, var(--bg-void) 88%)',
          }}
        />
      </div>

      <div className="container relative py-28 md:py-40">
        <div className="mx-auto max-w-4xl text-center">
          <p className="section-label justify-center">In your own time</p>
          <h2 className="font-editorial text-display-xl text-text-primary">
            Learn at <span className="italic text-teal">your own pace.</span>
          </h2>
          <p className="lead mx-auto mt-8 max-w-2xl">
            No classroom schedule. No waiting for the next lesson. Build the skill
            when you&apos;re ready to move.
          </p>
        </div>
      </div>
    </section>
  )
}