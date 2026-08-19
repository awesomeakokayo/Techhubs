import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

/**
 * GuidedPathPreview — Section 09 · the optional deeper level.
 *
 * Contextualized, not sold. The user has chosen a direction and understood
 * the system; this is simply the natural next level of structure.
 */
export function GuidedPathPreview() {
  return (
    <section className="border-t border-border-subtle bg-deep">
      <div className="container py-36 md:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-label justify-center">Optional · Guided Path</p>
          <h2 className="font-editorial text-display-lg text-text-primary">
            Want a more <span className="italic text-teal">structured path?</span>
          </h2>
          <p className="lead mx-auto mt-6 max-w-2xl">
            Guided Path gives you a more deliberate learning experience when you want
            help staying on course.
          </p>
          <div className="mt-10">
            <Link href="/guided-path" className="btn btn-primary inline-flex items-center gap-2">
              Explore Guided Path <ArrowRight size={16} className="shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}