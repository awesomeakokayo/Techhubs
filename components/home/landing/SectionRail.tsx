/**
 * Editorial section rail: a mono index, a short label and an optional note.
 * Repeats across the page to keep the narrative easy to scan.
 */
export function SectionRail({
  index,
  label,
  note,
}: {
  index: string
  label: string
  note?: string
}) {
  return (
    <div className="md:col-span-3">
      <p className="landing-index">
        {index} / {label}
      </p>
      {note ? (
        <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-ink/70">{note}</p>
      ) : null}
    </div>
  )
}
