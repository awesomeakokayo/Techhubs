'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'

type Variant = 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-in'

interface AnimateInProps {
  children: ReactNode
  className?: string
  delay?: number
  variant?: Variant
}

export function AnimateIn({ children, className, delay = 0, variant = 'fade-up' }: AnimateInProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={
        variant === 'fade-in'
          ? { opacity: 0 }
          : variant === 'slide-left'
            ? { opacity: 0, x: -32 }
            : variant === 'slide-right'
              ? { opacity: 0, x: 32 }
              : variant === 'scale-in'
                ? { opacity: 0, scale: 0.96 }
                : { opacity: 0, y: 24 }
      }
      whileInView={
        variant === 'fade-in'
          ? { opacity: 1 }
          : variant === 'slide-left'
            ? { opacity: 1, x: 0 }
            : variant === 'slide-right'
              ? { opacity: 1, x: 0 }
              : variant === 'scale-in'
                ? { opacity: 1, scale: 1 }
                : { opacity: 1, y: 0 }
      }
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}
