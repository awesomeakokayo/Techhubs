/**
 * EditorialStatement — Section 02 · The Problem.
 *
 * An editorial statement that lands before any product explanation.
 * One idea: the internet has information, not direction.
 */
export function EditorialStatement() {
  return (
    <section
      className="border-t border-border-subtle bg-void"
      style={{
        backgroundImage: 'radial-gradient(60% 50% at 50% 100%, var(--accent-primary-glow) 0%, transparent 55%)',
      }}
    >
      <div className="container py-28 md:py-40">
        <div className="mx-auto max-w-4xl text-center">
          <p className="section-label justify-center">The problem</p>
          <h2 className="font-editorial text-display-xl text-text-primary">
            The internet has enough information.
            <br />
            <span className="italic text-text-secondary">It doesn&apos;t have enough direction.</span>
          </h2>
          <p className="lead mx-auto mt-8 max-w-2xl">
            You don&apos;t need more tutorials, tabs, or bookmarks. You need to know
            where to start — and what to learn next.
          </p>
        </div>
      </div>
    </section>
  )
}