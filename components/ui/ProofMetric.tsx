interface ProofMetricProps {
  value: string
  label: string
  className?: string
}

export function ProofMetric({ value, label, className = '' }: ProofMetricProps) {
  return (
    <div className={`bg-surface p-8 ${className}`}>
      <p className="font-editorial text-4xl md:text-5xl">{value}</p>
      <p className="mt-2 font-mono text-[0.65rem] font-medium uppercase tracking-widest text-text-muted">
        {label}
      </p>
    </div>
  )
}
