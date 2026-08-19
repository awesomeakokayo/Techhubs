interface CategoryMarkerProps {
  index?: number
  color: string
  label: string
  count?: number
  className?: string
}

export function CategoryMarker({ index, color, label, count, className = '' }: CategoryMarkerProps) {
  return (
    <div className={`flex items-baseline gap-4 ${className}`}>
      {index !== undefined && (
        <span className="font-mono text-sm text-text-muted" aria-hidden>
          {String(index).padStart(2, '0')}
        </span>
      )}
      <span
        className="h-2.5 w-2.5 shrink-0 translate-y-[-2px] rounded-full"
        style={{ background: color }}
        aria-hidden
      />
      <span className="font-editorial text-3xl">{label.toLowerCase()}</span>
      {count !== undefined && (
        <span className="font-mono text-xs text-text-muted">{count} tracks</span>
      )}
    </div>
  )
}