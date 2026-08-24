'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { CheckpointNode, PathConnector } from '@/components/ui/path'
import { AnimateIn } from '@/components/ui/AnimateIn'

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
 * Nodes and connectors stagger in left-to-right.
 */
export function PathJourney() {
  const reduced = useReducedMotion()

  return (
    <section
      className="bg-void"
      style={{
        backgroundImage: 'radial-gradient(70% 50% at 50% 0%, var(--accent-primary-glow) 0%, transparent 60%)',
      }}
    >
      <div className="container py-36 md:py-40">
        <div className="mx-auto max-w-5xl text-center">
          <AnimateIn>
            <p className="section-label justify-center">One path</p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2 className="font-editorial text-display-lg text-text-primary">
              Follow the stages. <span className="italic text-teal">Know what comes next.</span>
            </h2>
          </AnimateIn>
        </div>

        {/* The path — desktop: horizontal checkpoints joined by a line */}
        {reduced ? (
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
        ) : (
          <motion.div
            className="mt-20 hidden items-start lg:flex"
            aria-hidden
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
          >
            {STAGES.map((stage, i) => (
              <div key={stage.index} className="contents">
                {i > 0 && (
                  <motion.div
                    variants={{
                      hidden: { scaleX: 0, opacity: 0 },
                      visible: {
                        scaleX: 1,
                        opacity: 1,
                        transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                      },
                    }}
                    className="flex-1"
                    style={{ transformOrigin: 'left' }}
                  >
                    <PathConnector tone={stage.tone} active={i <= 4} />
                  </motion.div>
                )}
                <motion.div
                  className="flex min-w-0 flex-1 flex-col items-center gap-4 text-center"
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
                    },
                  }}
                >
                  <CheckpointNode step={{ index: stage.index, state: i <= 4 ? 'current' : 'upcoming' }} />
                  <div>
                    <p className="font-editorial text-xl text-text-primary">{stage.title}</p>
                    <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-widest text-text-muted">
                      stage {String(stage.index).padStart(2, '0')}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        )}

        {/* The path — mobile: vertical, connecting line */}
        {reduced ? (
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
        ) : (
          <motion.ol
            className="mt-16 space-y-0 lg:hidden"
            aria-hidden
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {STAGES.map((stage, i) => (
              <motion.li
                key={stage.index}
                className="relative flex gap-5 pb-10 last:pb-0"
                variants={{
                  hidden: { opacity: 0, x: -16 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
                  },
                }}
              >
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
              </motion.li>
            ))}
          </motion.ol>
        )}
      </div>
    </section>
  )
}
