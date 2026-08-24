'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Mail, Share2, Copy, Check, Printer } from 'lucide-react'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function FinalCTASlide() {
  const [copied, setCopied] = useState(false)

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText('https://techskillhub.cv/pitch-deck')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const input = document.createElement('input')
      input.value = 'https://techskillhub.cv/pitch-deck'
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'TechSkillHub — Pitch Deck',
          text: 'Discover TechSkillHub\'s mission to make structured, practical technology education more accessible across Africa.',
          url: 'https://techskillhub.cv/pitch-deck',
        })
      } catch {
        // User cancelled or share failed — fall back to copy
        handleCopyUrl()
      }
    } else {
      handleCopyUrl()
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <section id="final-cta" className="bg-void">
      <div className="container py-36 md:py-40">
        <AnimateIn>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-editorial text-display-xl text-text-primary">
              Tech<span className="text-teal">Skill</span>Hub
            </h2>
            <p className="mt-4 font-editorial text-display-md italic text-teal">
              Learn. Build. Become.
            </p>
            <p className="lead mx-auto mt-6 max-w-xl">
              Building a clearer path from learning technology to creating opportunity.
            </p>

            <div className="mt-12 flex w-full max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:w-auto sm:flex-row sm:items-center sm:justify-center">
              <Link
                href="/"
                className="btn btn-primary inline-flex w-full items-center justify-center gap-2 sm:w-auto"
              >
                Explore TechSkillHub <ArrowRight size={16} className="shrink-0" />
              </Link>
              <Link
                href="mailto:hello@techskillhub.cv"
                className="btn btn-secondary inline-flex w-full items-center justify-center gap-2 sm:w-auto"
              >
                <Mail size={16} className="shrink-0" /> Partner With Us
              </Link>
            </div>

            {/* Share / Copy / Print */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleShare}
                className="btn btn-ghost inline-flex items-center gap-1.5 px-3 py-2 text-sm"
              >
                <Share2 size={14} /> Share
              </button>
              <button
                type="button"
                onClick={handleCopyUrl}
                className="btn btn-ghost inline-flex items-center gap-1.5 px-3 py-2 text-sm"
              >
                {copied ? <Check size={14} className="text-teal" /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy URL'}
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="btn btn-ghost inline-flex items-center gap-1.5 px-3 py-2 text-sm"
              >
                <Printer size={14} /> Print / Save PDF
              </button>
            </div>

            <div className="mt-12 space-y-2">
              <p className="font-mono text-xs text-text-muted">
                <a
                  href="https://techskillhub.cv"
                  className="text-teal hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  techskillhub.cv
                </a>
              </p>
              <p className="font-mono text-xs text-text-muted">
                <a
                  href="mailto:hello@techskillhub.cv"
                  className="text-teal hover:underline"
                >
                  hello@techskillhub.cv
                </a>
              </p>
              <p className="font-mono text-xs text-text-muted">@TechSkillHub</p>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
