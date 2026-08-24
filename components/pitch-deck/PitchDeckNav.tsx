'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

const SECTIONS = [
  { id: 'cover', label: 'Cover' },
  { id: 'problem', label: 'Problem' },
  { id: 'insight', label: 'Insight' },
  { id: 'solution', label: 'Solution' },
  { id: 'differentiation', label: 'Why Us' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'product', label: 'Product' },
  { id: 'target-users', label: 'Users' },
  { id: 'market', label: 'Market' },
  { id: 'traction', label: 'Traction' },
  { id: 'business-model', label: 'Business' },
  { id: 'competitive', label: 'Competitive' },
  { id: 'go-to-market', label: 'GTM' },
  { id: 'partnership', label: 'Partners' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'vision', label: 'Vision' },
  { id: 'founder', label: 'Founder' },
  { id: 'the-ask', label: 'The Ask' },
  { id: 'final-cta', label: 'Contact' },
] as const

export function PitchDeckNav() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const scrollToSection = useCallback((index: number) => {
    const section = SECTIONS[index]
    if (!section) return
    const el = document.getElementById(section.id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  // Track scroll position to determine active section
  useEffect(() => {
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true

      requestAnimationFrame(() => {
        const scrollY = window.scrollY + window.innerHeight * 0.35

        // Show nav after scrolling past the cover
        setIsVisible(window.scrollY > 200)

        for (let i = SECTIONS.length - 1; i >= 0; i--) {
          const el = document.getElementById(SECTIONS[i].id)
          if (el && el.offsetTop <= scrollY) {
            setActiveIndex(i)
            break
          }
        }
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input or textarea
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return

      if (e.key === 'ArrowDown' || e.key === 'j') {
        e.preventDefault()
        const next = Math.min(activeIndex + 1, SECTIONS.length - 1)
        scrollToSection(next)
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        e.preventDefault()
        const prev = Math.max(activeIndex - 1, 0)
        scrollToSection(prev)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeIndex, scrollToSection])

  if (!isVisible) return null

  return (
    <nav
      className="fixed bottom-6 right-4 z-50 hidden flex-col items-center gap-1.5 rounded-[var(--radius-lg)] border border-border-default bg-surface/90 p-2 shadow-raised backdrop-blur-md lg:flex xl:right-8"
      aria-label="Pitch deck sections"
    >
      <button
        type="button"
        onClick={() => scrollToSection(Math.max(0, activeIndex - 1))}
        disabled={activeIndex === 0}
        className="flex h-6 w-6 items-center justify-center rounded text-text-muted transition-colors hover:text-teal disabled:opacity-30"
        aria-label="Previous section"
      >
        <ChevronUp size={14} />
      </button>

      <div className="flex flex-col items-center gap-1">
        {SECTIONS.map((section, i) => (
          <button
            key={section.id}
            type="button"
            onClick={() => scrollToSection(i)}
            className="group relative flex items-center"
            aria-label={`Go to ${section.label}`}
            aria-current={i === activeIndex ? 'step' : undefined}
          >
            <span
              className={`block rounded-full transition-all duration-200 ${
                i === activeIndex
                  ? 'h-2 w-2 bg-teal'
                  : 'h-1.5 w-1.5 bg-border-default group-hover:bg-text-muted'
              }`}
            />
            {/* Tooltip label on hover */}
            <span className="pointer-events-none absolute right-6 whitespace-nowrap rounded bg-elevated px-2 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-text-secondary opacity-0 shadow-card transition-opacity group-hover:opacity-100">
              {section.label}
            </span>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollToSection(Math.min(activeIndex + 1, SECTIONS.length - 1))}
        disabled={activeIndex === SECTIONS.length - 1}
        className="flex h-6 w-6 items-center justify-center rounded text-text-muted transition-colors hover:text-teal disabled:opacity-30"
        aria-label="Next section"
      >
        <ChevronDown size={14} />
      </button>

      <span className="mt-0.5 font-mono text-[0.5rem] text-text-muted">
        {activeIndex + 1}/{SECTIONS.length}
      </span>
    </nav>
  )
}
