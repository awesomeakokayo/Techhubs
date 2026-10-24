import { SectionRail } from './SectionRail'

const STEPS = [
  {
    title: 'Choose a direction',
    text: 'Explore five fields, or take the three-question quiz to find a starting point that fits.',
  },
  {
    title: 'Follow a roadmap',
    text: 'See the recommended order — stage by stage — instead of jumping between unrelated tutorials.',
  },
  {
    title: 'Learn and practise',
    text: 'Use curated resources tied to each stage, then apply the ideas before moving on.',
  },
  {
    title: 'Build projects',
    text: 'Turn the skill into something real, at a level that matches where you are now.',
  },
  {
    title: 'Show your work',
    text: 'Organise the work into a portfolio and prepare for the opportunities you are aiming at.',
  },
]

export function MethodSection() {
  return (
    <section className="border-b border-hairline bg-white">
      <div className="landing-container py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <SectionRail
            index="02"
            label="The method"
            note="One system, five moves. The path is the product."
          />

          <div className="md:col-span-9">
            <h2 className="landing-display max-w-3xl text-[clamp(2rem,4vw,3.4rem)]">
              From choosing a direction to{' '}
              <span className="landing-serif text-brand">building something real.</span>
            </h2>

            <div className="mt-12 grid gap-px overflow-hidden rounded-[20px] border border-hairline bg-hairline sm:grid-cols-2 xl:grid-cols-5">
              {STEPS.map((step, index) => (
                <div
                  key={step.title}
                  className={[
                    'bg-white p-5 lg:p-4 xl:p-5',
                    index === STEPS.length - 1 ? 'sm:col-span-2 xl:col-span-1' : '',
                  ].join(' ')}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={
                        index === 0
                          ? 'flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand font-mono text-[0.65rem] font-medium text-white'
                          : 'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-hairline font-mono text-[0.65rem] font-medium text-ink/70'
                      }
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="h-px flex-1 bg-hairline" aria-hidden />
                  </div>
                  <h3 className="mt-6 font-display text-base font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{step.text}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink/70">
              Choose · Follow · Practise · Build · Show
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
