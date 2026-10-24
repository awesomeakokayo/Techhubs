import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="section">
      <div className="container">
        <header className="mb-8 max-w-2xl">
          <span className="section-label">404</span>
          <h1 className="font-editorial text-display-xl">Page not found</h1>
          <p className="mt-4 text-lg text-text-secondary">
            The page you are looking for does not exist or has moved.
          </p>
        </header>
        <Link href="/" className="btn btn-primary inline-flex">
          Back to home
        </Link>
      </div>
    </div>
  )
}
