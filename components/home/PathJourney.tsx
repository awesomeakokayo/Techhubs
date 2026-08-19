import { CheckpointNode, PathConnector } from '@/components/ui/path'

const STAGES = [
  { index: 1, title: 'Foundations', tone: 'var(--accent-primary)' },
  { index: 2, title: 'Core Skills', tone: 'var(--accent-primary)' },
  { index: 3, title: 'Tools', tone: 'var(--accent-primary)' },
  { index: 4, title: 'Build', tone: 'var(--accent-primary)' },
  { index: 5, title: 'Portfolio', tone: 'var(--accent-primary)' },
  { index: 6, title: 'Career', tone: 'var(--accent-primary)' },
]

/**
 * PathJourney — Section 04 · Show the Path.
 *
 * The visual heart of the page. A single numbered path from Foundations to
 * Career. Typography, numbers, lines and whitespace — no cards.
 */
export function PathJourney() {
  return (
    <section
      className="bg-void"
      style={{
        backgroundImage: 'radial-gradient(70% 50% at 50% 0%, var(--accent-primary-glow) 0%, transparent 60%)',
      }}
    >
      <div className="container py-28 md:py-40">
        <div className="mx-auto max-w-5xl text-center">
          <p className="section-label justify-center">One path</p>
          <h2 className="font-editorial text-display-lg text-text-primary">
            Follow the stages. <span className="italic text-teal">Know what comes next.</span>
          </h2>
        </div>

        {/* The path — desktop: horizontal checkpoints joined by a line */}
        <div className="mt-20 hidden items-start lg:flex" aria-hidden>
          {STAGES.map((stage, i) => (
            <div key={stage.index} className="contents">
              {i > 0 && (
                <PathConnector tone={stage.tone} active={i <= 4} />
              )}
              <div className="flex min-w-0 flex-1 flex-col items-center gap-4 text-center">
                <CheckpointNode step={{ index: stage.index, state: i <= 4 ? 'current' : 'upcoming' }} />
                <div>
                  <p className="font-editorial text-xl text-text-primary">{stage.title}</p>
                  <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-widest text-text-muted">
                    stage {String(stage.index).padStart(2, '0')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* The path — mobile: vertical, connecting line */}
        <ol className="mt-16 space-y-0 lg:hidden" aria-hidden>
          {STAGES.map((stage, i) => (
            <li key={stage.index} className="relative flex gap-5 pb-10 last:pb-0">
              {i < STAGES.length - 1 && (
                <span
                  className="absolute left-[17px] top-12 h-[calc(100%-1.5rem)] w-px"
                  style={{ background: 'var(--border-default)' }}
                />
              )}
              <span className="relative z-10">
                <CheckpointNode step={{ index: stage.index, state: 'current' }} />
              </span>
              <div className="pt-1.5">
                <p className="font-editorial text-2xl text-text-primary">{stage.title}</p>
                <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-widest text-text-muted">
                  stage {String(stage.index).padStart(2, '0')}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}