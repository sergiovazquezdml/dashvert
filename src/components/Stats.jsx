import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 24,  suffix: '/7',   label: 'disponibilidad de expertos', prefix: '' },
  { value: 6,   suffix: '',     label: 'áreas de especialidad', prefix: '+' },
  { value: 100, suffix: '%',    label: 'privacidad garantizada', prefix: '' },
  { value: 200, suffix: ' MXN', label: 'suscripción plana mensual', prefix: '$' },
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
        <div className="h-px bg-slate-200 mb-10" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {STATS.map((s, i) => (
            <div key={i} className="text-center group">
              <div
                className="text-5xl md:text-6xl font-extrabold text-gradient mb-2 transition-transform duration-300 group-hover:scale-105"
                style={{ fontVariantNumeric: 'tabular-nums', fontFamily: '"Outfit", sans-serif' }}
              >
                <Counter target={s.value} prefix={s.prefix} suffix={s.suffix} trigger={visible} />
              </div>
              <p className="text-[11px] font-mono text-slate-600 font-bold leading-relaxed uppercase tracking-wider max-w-[200px] mx-auto">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div className="h-px bg-slate-200 mt-10" />
      </div>
    </section>
  )
}
