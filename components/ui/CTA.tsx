import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'

interface CTAProps {
  href: string
  variant?: 'primary' | 'secondary'
  children: ReactNode
  className?: string
}

export function CTA({ href, variant = 'primary', children, className = '' }: CTAProps) {
  return (
    <Link
      href={href}
      className={`btn btn-${variant} inline-flex items-center gap-2 ${className}`}
    >
      {children}
      <ArrowRight size={16} className="shrink-0" />
    </Link>
  )
}
