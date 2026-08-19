import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

/**
 * FinalCTA — closes the narrative loop.
 *
 * The first message and the last message feel connected:
 * "You need a path" → "You need to know what to learn next."
 */
export function FinalCTA() {
  return (
    <section className="bg-void">
      <div className="container py-32 md:py-44">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-editorial text-display-xl text-text-primary">
            You don&apos;t need to learn everything.
            <br />
            <span className="italic text-teal">You need to know what to learn next.</span>
          </h2>
          <div className="mt-12 flex w-full max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:w-auto sm:flex-row sm:items-center">
            <Link href="/find-your-path" className="btn btn-primary inline-flex w-full items-center justify-center gap-2 sm:w-auto">
              Find Your Path <ArrowRight size={16} className="shrink-0" />
            </Link>
            <Link href="/paths" className="btn btn-secondary inline-flex w-full items-center justify-center sm:w-auto">
              Explore the paths
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}