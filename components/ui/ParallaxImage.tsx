'use client'

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ReactNode, useRef } from 'react'

interface ParallaxImageProps {
  children: ReactNode
  speed?: number
  className?: string
}

export function ParallaxImage({ children, speed = 0.3, className }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [speed * -80, speed * 80])

  if (reduced) {
    return <div ref={ref} className={className}>{children}</div>
  }

  return (
    <div ref={ref} className={`pointer-events-none ${className ?? ''}`}>
      <motion.div style={{ y }} aria-hidden>
        {children}
      </motion.div>
    </div>
  )
}
