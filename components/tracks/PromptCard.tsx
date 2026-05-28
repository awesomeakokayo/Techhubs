'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

export function PromptCard({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(prompt)
    trackEvent({ event_name: 'ai_prompt_copy' })
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group relative rounded-lg border border-border-default border-l-[3px] border-l-teal bg-void p-4">
      <button
        type="button"
        onClick={copy}
        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-md text-text-muted opacity-0 transition-opacity hover:bg-overlay hover:text-teal group-hover:opacity-100 focus:opacity-100"
        aria-label={copied ? 'Copied' : 'Copy prompt'}
      >
        {copied ? <Check size={16} className="text-teal" /> : <Copy size={16} />}
      </button>
      <pre className="m-0 border-0 bg-transparent p-0 pr-10 text-[0.85rem] leading-relaxed">
        <code>{prompt}</code>
      </pre>
    </div>
  )
}
