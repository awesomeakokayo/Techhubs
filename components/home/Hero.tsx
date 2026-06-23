'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useRef, useEffect } from 'react'

export function Hero() {
  const { data: session } = useSession()

  /* ── Refs for direct DOM parallax (zero re-renders) ── */
  const containerRef  = useRef<HTMLDivElement>(null)
  const card1Ref      = useRef<SVGGElement>(null)
  const card2Ref      = useRef<SVGGElement>(null)
  const card3Ref      = useRef<SVGGElement>(null)
  const dotsRef       = useRef<SVGGElement>(null)
  const glowRef       = useRef<SVGCircleElement>(null)
  const sparklesRef   = useRef<SVGGElement>(null)
  const ringsRef      = useRef<SVGGElement>(null)
  const cursorGlowRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let target  = { x: 0, y: 0 }
    let current = { x: 0, y: 0 }
    let cursorSvg = { x: 200, y: 200 }   // SVG-space cursor for the trailing glow
    let active  = false
    let rafId: number

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      const ease = active ? 0.075 : 0.045
      current.x = lerp(current.x, target.x, ease)
      current.y = lerp(current.y, target.y, ease)

      const x = current.x
      const y = current.y

      /* Parallax layers — each at a different "depth" */
      if (ringsRef.current)
        ringsRef.current.style.transform = `translate(${x * -5}px, ${y * -4}px)`

      if (card1Ref.current)
        card1Ref.current.style.transform = `translate(${x * 16}px, ${y * 11}px)`

      if (card2Ref.current)
        card2Ref.current.style.transform = `translate(${x * -12}px, ${y * 9}px)`

      if (card3Ref.current)
        card3Ref.current.style.transform = `translate(${x * 10}px, ${y * -13}px)`

      if (dotsRef.current)
        dotsRef.current.style.transform = `translate(${x * 7}px, ${y * 7}px)`

      if (sparklesRef.current)
        sparklesRef.current.style.transform = `translate(${x * 22}px, ${y * 18}px)`

      if (glowRef.current)
        glowRef.current.style.transform = `translate(${x * 24}px, ${y * 22}px)`

      /* Cursor-following glow inside SVG */
      if (cursorGlowRef.current) {
        cursorGlowRef.current.setAttribute('cx', String(cursorSvg.x))
        cursorGlowRef.current.setAttribute('cy', String(cursorSvg.y))
        const opacity = active ? '0.08' : '0'
        cursorGlowRef.current.style.opacity = opacity
      }

      rafId = requestAnimationFrame(tick)
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      /* Normalise to -1 → +1 relative to container center */
      target.x = ((e.clientX - rect.left) / rect.width  - 0.5) * 2
      target.y = ((e.clientY - rect.top)  / rect.height - 0.5) * 2

      /* Map cursor into SVG coordinate space (viewBox 0 0 400 400) */
      cursorSvg.x = ((e.clientX - rect.left) / rect.width)  * 400
      cursorSvg.y = ((e.clientY - rect.top)  / rect.height) * 400
    }

    const onEnter = () => { active = true }
    const onLeave = () => { active = false; target = { x: 0, y: 0 } }

    el.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    rafId = requestAnimationFrame(tick)

    return () => {
      el.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section className="relative overflow-hidden">
      <style>{`
        @keyframes hero-draw-path {
          from { stroke-dashoffset: 620; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes hero-spin-cw {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes hero-spin-ccw {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        /* Float anims are on OUTER wrappers; parallax on INNER refs — no conflict */
        @keyframes hero-float-a {
          0%,100% { transform: translateY(0px);  }
          50%     { transform: translateY(-8px);  }
        }
        @keyframes hero-float-b {
          0%,100% { transform: translateY(0px);  }
          50%     { transform: translateY(-11px); }
        }
        @keyframes hero-float-c {
          0%,100% { transform: translateY(0px);  }
          50%     { transform: translateY(-6px);  }
        }
        @keyframes hero-pulse-dot {
          0%,100% { opacity:.85; transform:scale(1);    }
          50%     { opacity:.35; transform:scale(1.6);  }
        }
        @keyframes hero-breathe {
          0%,100% { opacity:.05; }
          50%     { opacity:.13; }
        }
        @keyframes hero-twinkle {
          0%,100% { opacity:.10; }
          50%     { opacity:.55; }
        }
        @keyframes hero-progress {
          from { width:0;    }
          to   { width:56px; }
        }
        @keyframes hero-fade-up {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:translateY(0);    }
        }

        .hero-copy > * { animation: hero-fade-up .55s cubic-bezier(.4,0,.2,1) both; }
        .hero-copy > *:nth-child(1) { animation-delay:.05s; }
        .hero-copy > *:nth-child(2) { animation-delay:.13s; }
        .hero-copy > *:nth-child(3) { animation-delay:.21s; }
        .hero-copy > *:nth-child(4) { animation-delay:.29s; }
        .hero-copy > *:nth-child(5) { animation-delay:.37s; }

        /* Rings spin on their own — parallax applied to parent <g> */
        .hero-ring-cw  { transform-origin:200px 200px; animation:hero-spin-cw  30s linear infinite; }
        .hero-ring-ccw { transform-origin:200px 200px; animation:hero-spin-ccw 20s linear infinite; }

        .hero-path {
          stroke-dasharray:620; stroke-dashoffset:620;
          animation:hero-draw-path 2.4s cubic-bezier(.4,0,.2,1) .5s forwards;
        }

        /* Outer float wrappers */
        .hw-card-a { animation:hero-float-a 4.4s ease-in-out 1.0s infinite; }
        .hw-card-b { animation:hero-float-b 5.2s ease-in-out 1.5s infinite; }
        .hw-card-c { animation:hero-float-c 4.8s ease-in-out 1.2s infinite; }

        /* Dot pulse — transform-origin set per dot */
        .hd-a { transform-origin: 72px 320px; animation:hero-pulse-dot 2.5s ease-in-out 2.8s infinite; }
        .hd-b { transform-origin:158px 186px; animation:hero-pulse-dot 2.5s ease-in-out 3.1s infinite; }
        .hd-c { transform-origin:240px 109px; animation:hero-pulse-dot 2.5s ease-in-out 3.3s infinite; }
        .hd-d { transform-origin:326px  96px; animation:hero-pulse-dot 2.8s ease-in-out 2.9s infinite; }

        .hero-glow-pulse { transform-origin:200px 200px; animation:hero-breathe 4s ease-in-out infinite; }

        .hw-tw-1 { animation:hero-twinkle 3.2s ease-in-out  .6s infinite; }
        .hw-tw-2 { animation:hero-twinkle 2.8s ease-in-out 1.3s infinite; }
        .hw-tw-3 { animation:hero-twinkle 3.6s ease-in-out  .9s infinite; }
        .hw-tw-4 { animation:hero-twinkle 2.4s ease-in-out 2.0s infinite; }
        .hw-tw-5 { animation:hero-twinkle 3.0s ease-in-out 1.7s infinite; }

        .hero-prog { animation:hero-progress 1.3s cubic-bezier(.4,0,.2,1) 3.2s both; }

        /* Cursor glow fades in/out smoothly */
        #hero-cursor-glow { transition: opacity .4s ease; pointer-events:none; }
      `}</style>

      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(var(--border-default) 1px, transparent 1px),
            linear-gradient(90deg, var(--border-default) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container relative py-20 md:py-28">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">

          {/* ── Copy ── */}
          <div className="hero-copy flex flex-col gap-0">
            <Link
              href="/upgrade"
              className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold no-underline transition"
              style={{ borderColor:'var(--accent-primary-border)', background:'var(--accent-primary-bg)', color:'var(--accent-primary)' }}
            >
              <Sparkles size={12} className="shrink-0" />
              Guided Path upgrade available
              <ArrowRight size={11} className="shrink-0" />
            </Link>

            <h1 className="font-display text-5xl font-extrabold leading-[1.1] tracking-tight text-text-primary md:text-6xl">
              Learn tech<br />the right way.
            </h1>

            <p className="mt-4 max-w-md text-base text-text-secondary md:text-lg">
              Structured learning paths, expert-curated resources, and real project
              experience — all in one place, completely free.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/start-here" className="btn btn-primary inline-flex items-center gap-2">
                Start Learning <ArrowRight size={16} />
              </Link>
              {!session && <Link href="/login" className="btn btn-secondary">Sign In</Link>}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              {[
                { value: '20+',  label: 'tracks'      },
                { value: '370+', label: 'resources'   },
                { value: '100%', label: 'free access' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="font-display text-xl font-bold text-text-primary">{value}</p>
                  <p className="text-xs text-text-muted">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Animated SVG (cursor-reactive) ── */}
          <div ref={containerRef} className="flex justify-center md:justify-end cursor-none" aria-hidden>
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">

                {/* Cursor-following glow — appears on hover */}
                <circle
                  id="hero-cursor-glow"
                  ref={cursorGlowRef}
                  cx="200" cy="200" r="70"
                  fill="var(--accent-primary)"
                  style={{ opacity: 0, filter: 'blur(28px)' }}
                />

                {/* ── Rings group — subtle counter-parallax ── */}
                <g ref={ringsRef}>
                  <circle className="hero-ring-cw"  cx="200" cy="200" r="174" stroke="var(--accent-primary)"   strokeOpacity="0.07" strokeWidth="1" strokeDasharray="9 7" />
                  <circle className="hero-ring-ccw" cx="200" cy="200" r="148" stroke="var(--accent-secondary)" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="5 10" />
                  <circle                            cx="200" cy="200" r="118" stroke="var(--accent-tertiary)"  strokeOpacity="0.05" strokeWidth="1" />
                </g>

                {/* ── Journey path ── */}
                <path
                  className="hero-path"
                  d="M 72 320 C 96 260, 138 230, 158 186 S 198 124, 240 109 S 314 130, 326 96"
                  stroke="var(--accent-primary)"
                  strokeWidth="2" strokeLinecap="round" strokeOpacity="0.45"
                />

                {/* ── Waypoint dots — parallax layer ── */}
                <g ref={dotsRef}>
                  <circle className="hd-a" cx="72"  cy="320" r="5.5" fill="var(--accent-primary)"   fillOpacity="0.9" />
                  <circle className="hd-b" cx="158" cy="186" r="4.5" fill="var(--accent-secondary)" fillOpacity="0.9" />
                  <circle className="hd-c" cx="240" cy="109" r="4.5" fill="var(--accent-tertiary)"  fillOpacity="0.9" />
                  <circle className="hd-d" cx="326" cy="96"  r="6.5" fill="var(--accent-primary)"   fillOpacity="1"   />
                  {/* Halo on destination */}
                  <circle cx="326" cy="96" r="13" stroke="var(--accent-primary)" strokeOpacity="0.18" strokeWidth="1.5" />
                  <circle cx="326" cy="96" r="22" stroke="var(--accent-primary)" strokeOpacity="0.07" strokeWidth="1"   />
                  {/* Connector dashes */}
                  <line x1="158" y1="186" x2="104" y2="148" stroke="var(--accent-secondary)" strokeOpacity="0.20" strokeWidth="1" strokeDasharray="4 3" />
                  <line x1="240" y1="109" x2="294" y2="154" stroke="var(--accent-tertiary)"  strokeOpacity="0.20" strokeWidth="1" strokeDasharray="4 3" />
                  <line x1="72"  y1="320" x2="130" y2="310" stroke="var(--accent-primary)"   strokeOpacity="0.15" strokeWidth="1" strokeDasharray="4 3" />
                </g>

                {/* ── Card 1: BUILD — outer float, inner parallax ── */}
                <g className="hw-card-a">
                  <g ref={card1Ref}>
                    <rect x="40" y="106" width="98" height="54" rx="12"
                      fill="var(--bg-surface)" stroke="var(--accent-secondary)" strokeOpacity="0.25" strokeWidth="1"
                      style={{ filter:'drop-shadow(0 4px 16px rgba(0,0,0,0.14))' }} />
                    <rect x="52" y="118" width="22" height="22" rx="6" fill="var(--accent-secondary)" fillOpacity="0.10" />
                    <rect x="58" y="124" width="10" height="10" rx="3" fill="var(--accent-secondary)" fillOpacity="0.80" />
                    <rect x="80" y="120" width="42" height="5"  rx="2.5" fill="var(--text-muted)" fillOpacity="0.35" />
                    <rect x="80" y="130" width="30" height="4"  rx="2"   fill="var(--text-muted)" fillOpacity="0.20" />
                    <rect x="80" y="139" width="36" height="4"  rx="2"   fill="var(--text-muted)" fillOpacity="0.13" />
                    <rect x="52" y="148" width="34" height="6"  rx="3"   fill="var(--accent-secondary)" fillOpacity="0.12" />
                    <rect x="54" y="150" width="22" height="2"  rx="1"   fill="var(--accent-secondary)" fillOpacity="0.50" />
                  </g>
                </g>

                {/* ── Card 2: DATA — outer float, inner parallax ── */}
                <g className="hw-card-b">
                  <g ref={card2Ref}>
                    <rect x="262" y="150" width="98" height="54" rx="12"
                      fill="var(--bg-surface)" stroke="var(--accent-tertiary)" strokeOpacity="0.25" strokeWidth="1"
                      style={{ filter:'drop-shadow(0 4px 16px rgba(0,0,0,0.14))' }} />
                    <rect x="274" y="162" width="22" height="22" rx="6" fill="var(--accent-tertiary)" fillOpacity="0.10" />
                    <rect x="280" y="168" width="10" height="10" rx="3" fill="var(--accent-tertiary)" fillOpacity="0.80" />
                    <rect x="303" y="164" width="42" height="5"  rx="2.5" fill="var(--text-muted)" fillOpacity="0.35" />
                    <rect x="303" y="174" width="30" height="4"  rx="2"   fill="var(--text-muted)" fillOpacity="0.20" />
                    <rect x="303" y="183" width="36" height="4"  rx="2"   fill="var(--text-muted)" fillOpacity="0.13" />
                    <rect x="274" y="192" width="34" height="6"  rx="3"   fill="var(--accent-tertiary)" fillOpacity="0.10" />
                    <rect x="276" y="194" width="22" height="2"  rx="1"   fill="var(--accent-tertiary)" fillOpacity="0.45" />
                  </g>
                </g>

                {/* ── Card 3: GROW — outer float, inner parallax + progress bar ── */}
                <g className="hw-card-c">
                  <g ref={card3Ref}>
                    <rect x="128" y="294" width="106" height="60" rx="12"
                      fill="var(--bg-surface)" stroke="var(--accent-primary)" strokeOpacity="0.20" strokeWidth="1"
                      style={{ filter:'drop-shadow(0 4px 16px rgba(0,0,0,0.14))' }} />
                    <rect x="140" y="306" width="22" height="22" rx="6" fill="var(--accent-primary)" fillOpacity="0.08" />
                    <rect x="146" y="312" width="10" height="10" rx="3" fill="var(--accent-primary)" fillOpacity="0.75" />
                    <rect x="169" y="308" width="50" height="5"  rx="2.5" fill="var(--text-muted)" fillOpacity="0.35" />
                    <rect x="169" y="318" width="36" height="4"  rx="2"   fill="var(--text-muted)" fillOpacity="0.20" />
                    <rect x="169" y="327" width="28" height="4"  rx="2"   fill="var(--text-muted)" fillOpacity="0.13" />
                    {/* Progress track */}
                    <rect x="140" y="336" width="84" height="5" rx="2.5" fill="var(--border-default)" fillOpacity="0.35" />
                    {/* Progress fill — animates on load */}
                    <rect className="hero-prog" x="140" y="336" width="0" height="5" rx="2.5" fill="var(--accent-primary)" fillOpacity="0.70" />
                  </g>
                </g>

                {/* ── Central ambient glow ── */}
                <circle ref={glowRef} className="hero-glow-pulse" cx="200" cy="200" r="52" fill="var(--accent-primary)" />

                {/* ── Sparkle dots — fastest parallax layer ── */}
                <g ref={sparklesRef}>
                  <circle className="hw-tw-1" cx="346" cy="248" r="3"   fill="var(--accent-primary)"   />
                  <circle className="hw-tw-2" cx="52"  cy="228" r="2.5" fill="var(--accent-secondary)" />
                  <circle className="hw-tw-3" cx="202" cy="52"  r="2.5" fill="var(--accent-tertiary)"  />
                  <circle className="hw-tw-4" cx="364" cy="170" r="2"   fill="var(--accent-primary)"   />
                  <circle className="hw-tw-5" cx="36"  cy="162" r="2"   fill="var(--accent-tertiary)"  />
                  <circle className="hw-tw-2" cx="292" cy="292" r="2"   fill="var(--accent-secondary)" />
                </g>

              </svg>

              {/* Ambient glow behind SVG */}
              <div
                className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-3xl"
                style={{ background:'radial-gradient(circle at 55% 45%, var(--accent-primary-glow) 0%, transparent 70%)', opacity:.7 }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
