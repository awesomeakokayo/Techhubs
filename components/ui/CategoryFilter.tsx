'use client'

import { motion } from 'framer-motion'

export interface FilterOption {
  id: string
  label: string
}

interface CategoryFilterProps {
  options: FilterOption[]
  active: string
  onChange: (id: string) => void
  className?: string
  layoutId?: string
}

export function CategoryFilter({ options, active, onChange, className = '', layoutId = 'filter-pill' }: CategoryFilterProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`} role="group">
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => onChange(opt.id)}
          className={`relative min-h-[44px] rounded-full px-4 py-2 font-mono text-xs font-medium uppercase tracking-wider transition-colors ${
            active === opt.id
              ? 'text-text-inverse'
              : 'border border-border-default text-text-secondary hover:border-teal hover:text-teal'
          }`}
          aria-pressed={active === opt.id}
        >
          {active === opt.id && (
            <motion.span
              layoutId={layoutId}
              className="absolute inset-0 rounded-full bg-teal"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{opt.label}</span>
        </button>
      ))}
    </div>
  )
}
