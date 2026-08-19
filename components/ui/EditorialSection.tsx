import type { ReactNode } from 'react'

interface EditorialSectionProps {
  kicker?: string
  title: ReactNode
  lead?: string
  align?: 'left' | 'center'
  className?: string
  children?: ReactNode
}

export function EditorialSection({
  kicker,
  title,
  lead,
  align = 'left',
  className = '',
  children,
}: EditorialSectionProps) {
  return (
    <div className={`${align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'} ${className}`}>
      {kicker && (
        <p className="section-label">{kicker}</p>
      )}
      <h2 className="font-editorial text-display-lg">{title}</h2>
      {lead && (
        <p className="lead mt-5">{lead}</p>
      )}
      {children}
    </div>
  )
}
