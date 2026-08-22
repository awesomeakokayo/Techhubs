'use client'

import { useState, type FormEvent } from 'react'

const SUBJECTS = [
  'Feedback on a page',
  'Suggest a roadmap or guide',
  'Report a broken resource',
  'Partnership or collaboration',
  'Something else',
] as const

export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState<string>(SUBJECTS[0])
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, body: message }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong.')
      }

      setStatus('success')
      setName('')
      setEmail('')
      setSubject(SUBJECTS[0])
      setMessage('')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  return (
    <form className="panel max-w-2xl" onSubmit={handleSubmit}>
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-text-primary">Your name (optional)</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Alex"
          className="w-full rounded-md border border-border-default bg-surface px-3 py-2.5 text-text-primary placeholder:text-text-muted"
        />
      </label>
      <label className="mt-4 block">
        <span className="mb-1 block text-sm font-medium text-text-primary">Your email</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-md border border-border-default bg-surface px-3 py-2.5 text-text-primary placeholder:text-text-muted"
        />
      </label>
      <label className="mt-4 block">
        <span className="mb-1 block text-sm font-medium text-text-primary">Subject</span>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full rounded-md border border-border-default bg-surface px-3 py-2.5 text-text-primary"
        >
          {SUBJECTS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>
      <label className="mt-4 block">
        <span className="mb-1 block text-sm font-medium text-text-primary">Message</span>
        <textarea
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          placeholder="How can we help?"
          className="w-full rounded-md border border-border-default bg-surface px-3 py-2.5 text-text-primary placeholder:text-text-muted"
        />
      </label>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn btn-primary mt-6"
      >
        {status === 'loading' ? 'Sending...' : 'Send message'}
      </button>
      {status === 'success' && (
        <p className="mt-3 text-sm text-teal">Message sent! We&apos;ll get back to you soon.</p>
      )}
      {status === 'error' && (
        <p className="mt-3 text-sm text-red-400">{errorMsg}</p>
      )}
      <p className="mt-4 text-sm text-text-muted">
        Prefer email? Reach us directly at{' '}
        <a href="mailto:hello@techskillhub.cv" className="text-teal">
          hello@techskillhub.cv
        </a>.
      </p>
    </form>
  )
}
