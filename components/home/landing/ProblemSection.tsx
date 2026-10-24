import { SectionRail } from './SectionRail'

const FRICTIONS = [
  {
    title: 'Too many tabs',
    text: 'A hundred bookmarks is not a curriculum. The more you save, the less you know where to begin.',
  },
  {
    title: 'No learning order',
    text: 'Tutorials pulled at random leave gaps — advanced ideas before the foundations that make them make sense.',
  },
  {
    title: 'Nothing to show',
    text: 'Watching is not the same as building. Without a project, there is no evidence of what you can do.',
  },
]

export function ProblemSection() {
  return (
    <section className="border-b border-hairline">
      <div className="landing-container py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <SectionRail
            index="01"
            label="The problem"
            note="Motivation is rarely the hard part. Sequencing is."
          />

          <div className="md:col-span-9">
            <h2 className="landing-display max-w-4xl text-[clamp(2rem,4vw,3.6rem)]">
              The internet has enough information.
              <br />
              <span className="landing-serif text-brand">
                It doesn&apos;t have enough direction.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70">
              Most beginners can find a tutorial, a video, documentation or a course. The
              difficulty is knowing what to learn first, what to learn next, and how to turn
              all of it into something useful.
            </p>

            <div className="mt-10 grid border-t border-hairline lg:grid-cols-3">
              {FRICTIONS.map((item, index) => (
                <div
                  key={item.title}
                  className="border-b border-hairline py-6 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
                >
                  <p className="landing-index">{String(index + 1).padStart(2, '0')}</p>
                  <h3 className="mt-2 font-display text-base font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
