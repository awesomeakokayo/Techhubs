import Link from 'next/link'
import { Compass, FolderKanban, Map as MapIcon } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="section">
      <div className="container">
        <header className="mb-12 max-w-2xl">
          <span className="section-label">404</span>
          <h1 className="font-editorial text-display-xl">
            Looks like this learning path doesn&apos;t exist.
          </h1>
          <p className="mt-4 text-lg text-text-secondary">
            The page may have moved, or the link is wrong. Here are useful places to continue
            learning.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/roadmaps" className="card group flex h-full flex-col gap-2 no-underline">
            <MapIcon size={20} className="text-teal" />
            <h2 className="font-display text-lg text-text-primary group-hover:text-teal">
              Explore Roadmaps
            </h2>
            <p className="text-sm text-text-secondary">
              Follow a structured skill path with curated resources and projects.
            </p>
          </Link>
          <Link href="/start" className="card group flex h-full flex-col gap-2 no-underline">
            <Compass size={20} className="text-teal" />
            <h2 className="font-display text-lg text-text-primary group-hover:text-teal">
              Start Here
            </h2>
            <p className="text-sm text-text-secondary">
              Tell us what you want to learn and get a recommended path.
            </p>
          </Link>
          <Link href="/projects" className="card group flex h-full flex-col gap-2 no-underline">
            <FolderKanban size={20} className="text-teal" />
            <h2 className="font-display text-lg text-text-primary group-hover:text-teal">
              Find Projects
            </h2>
            <p className="text-sm text-text-secondary">
              Build practical projects that turn learning into proof of skill.
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}