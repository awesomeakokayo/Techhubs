interface SectionHeaderProps {
  kicker?: string
  title: React.ReactNode
  lead?: React.ReactNode
  align?: 'left' | 'center'
  className?: string
  id?: string
}

/**
 * Shared section heading. The kicker is mono metadata; the title is an
 * editorial serif statement; the lead is a quiet supporting line.
 */
export function SectionHeader({ kicker, title, lead, align = 'left', className = '', id }: SectionHeaderProps) {
  const centered = align === 'center'
  return (
    <div id={id} className={`max-w-2xl ${centered ? 'mx-auto text-center' : ''} ${className}`}>
      {kicker && (
        <p className={`section-label ${centered ? 'justify-center' : ''}`}>{kicker}</p>
      )}
      <h2 className="font-editorial">{title}</h2>
      {lead && <p className="lead mt-4">{lead}</p>}
    </div>
  )
}