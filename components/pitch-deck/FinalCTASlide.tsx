'use client'

import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function FinalCTASlide() {
  return (
    <section className="bg-void">
      <div className="container py-36 md:py-40">
        <AnimateIn>
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-label justify-center">Get in touch</p>
            <h2 className="font-editorial text-display-xl text-text-primary">
              Tech<span className="text-teal">Skill</span>Hub
            </h2>
            <p className="mt-4 font-editorial text-display-md italic text-teal">
              Learn. Build. Become.
            </p>
            <p className="lead mx-auto mt-6 max-w-xl">
              Structured, practical technology education built for Africa. Ready to explore
              partnership or investment opportunities?
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
                <Mail size={16} className="shrink-0" /> Contact Us
              </Link>
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
