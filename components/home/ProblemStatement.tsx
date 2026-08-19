export function ProblemStatement() {
  return (
    <section className="section">
      <div className="container">
        <div className="max-w-3xl">
          <p className="section-label">The problem</p>
          <h2 className="font-editorial text-display-lg">
            The internet has too much information.
            <br />
            <span className="italic text-text-secondary">It has very little direction.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden border border-border-default bg-border-default sm:grid-cols-2">
          <div className="bg-surface p-8 md:p-10">
            <p className="font-mono text-[0.65rem] font-medium uppercase tracking-widest text-text-muted">
              01 · Surrounded by
            </p>
            <ul className="mt-6 space-y-3">
              {['Tutorials', 'Courses', 'Videos', 'Documentation', 'Tools'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-text-primary">
                  <span className="h-px w-5" style={{ background: 'var(--border-default)' }} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-surface p-8 md:p-10">
            <p className="font-mono text-[0.65rem] font-medium uppercase tracking-widest text-teal">
              02 · Often missing
            </p>
            <ul className="mt-6 space-y-3">
              {['Sequence', 'Direction', 'Structure', 'Projects', 'Career context'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-text-primary">
                  <span className="h-px w-5" style={{ background: 'var(--accent-primary)' }} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-text-secondary">
          Tech Skill Hub exists to provide the missing half. Not more content — the
          structure that makes the content you already have approachable.
        </p>
      </div>
    </section>
  )
}