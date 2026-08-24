'use client'

import { motion, useInView, useSpring, useTransform, useMotionValue, useReducedMotion } from 'framer-motion'
import { useRef, useEffect } from 'react'

interface CountUpProps {
  target: number
  duration?: number
  className?: string
}

export function CountUp({ target, duration = 1.2, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  })

  const display = useTransform(springValue, (v) => Math.round(v))

  useEffect(() => {
    if (isInView) {
      motionValue.set(target)
    }
  }, [isInView, target, motionValue])

  if (reduced) {
    return <span className={className}>{target}</span>
  }

  return (
    <span className={className}>
      <motion.span ref={ref}>{display}</motion.span>
    </span>
  )
}
