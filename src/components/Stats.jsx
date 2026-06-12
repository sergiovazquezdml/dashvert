import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  {
    value: 88,
    suffix: '%',
    label: 'de usuarios no regresa tras una mala experiencia web',
    prefix: '',
    icon: (
      <svg className="w-6 h-6 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
    )
  },
  {
    value: 3,
    suffix: 's',
    label: 'límite de carga antes de penalización de Google',
    prefix: '',
    icon: (
      <svg className="w-6 h-6 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 14 14" />
        <path d="M12 2v4" />
        <path d="M9 2h6" />
      </svg>
    )
  },
  {
    value: 40,
    suffix: '%',
    label: 'de búsquedas informacionales ya pasan por motores de IA',
    prefix: '',
    icon: (
      <svg className="w-6 h-6 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-14 8.38 8.38 0 0 1 3.8.9" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <path d="M19 3l.7 1.3L21 5l-1.3.7-.7 1.3-.7-1.3L17 5l1.3-.7z" />
      </svg>
    )
  },
  {
    value: 30,
    suffix: '%',
    label: 'mejora promedio en conversión con arquitectura CRO',
    prefix: '+',
    icon: (
      <svg className="w-6 h-6 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 6l-9.5 9.5-5-5L1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    )
  }
]

function Counter({ target, prefix, suffix, trigger }) {
  const [val, setVal] = useState(0)
  const animated = useRef(false)

  useEffect(() => {
    if (!trigger || animated.current) return
    animated.current = true
    const obj = { n: 0 }
    gsap.to(obj, {
      n: target,
      duration: 1.8,
      ease: 'power2.out',
      onUpdate: () => setVal(Math.round(obj.n)),
    })
  }, [trigger, target])

  return (
    <span className="tabular-nums">
      {prefix}{val}{suffix}
    </span>
  )
}

function StatCard({ s, trigger }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="stats-card group relative overflow-hidden rounded-[2.5rem] bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 p-8 md:p-10 transition-all duration-500 hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-[0_20px_40px_rgba(99,102,241,0.06)] flex flex-col justify-between min-h-[220px]"
      style={{
        '--mouse-x': '0px',
        '--mouse-y': '0px'
      }}
    >
      {/* Spotlight Background Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 bg-[radial-gradient(400px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(99,102,241,0.08),transparent_80%)]" />

      <div className="relative z-10 flex flex-col items-center text-center h-full justify-between gap-4">
        {/* Icon Container */}
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/20 flex items-center justify-center shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:border-indigo-200 dark:group-hover:border-indigo-900/40">
          {s.icon}
        </div>

        {/* Counter / Value */}
        <div
          className="text-5xl md:text-6xl font-black text-gradient leading-none transition-transform duration-500 group-hover:scale-105"
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          <Counter target={s.value} prefix={s.prefix} suffix={s.suffix} trigger={trigger} />
        </div>

        {/* Label */}
        <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-extrabold leading-relaxed uppercase tracking-wider max-w-[240px] mx-auto select-none">
          {s.label}
        </p>
      </div>
    </div>
  )
}

export default function Stats() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 80%',
        onEnter: () => setVisible(true),
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="relative z-10 py-10 px-6">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <StatCard key={i} s={s} trigger={visible} />
          ))}
        </div>
      </div>
    </section>
  )
}

