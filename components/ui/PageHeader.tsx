import { Breadcrumbs, Crumb } from './Breadcrumbs'

interface PageHeaderProps {
  title: string
  subtitle?: string
  breadcrumbs?: Crumb[]
}

export function PageHeader({ title, subtitle, breadcrumbs }: PageHeaderProps) {
  return (
    <header className="mb-10">
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
      <h1 className="font-display text-display-md font-bold">{title}</h1>
      {subtitle && <p className="mt-3 max-w-2xl text-lg text-text-secondary">{subtitle}</p>}
    </header>
  )
}
