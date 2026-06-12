import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Hero() {
  const comp = useRef(null)
  const ctaRef = useRef(null)

  const line1 = "Tu sitio web debería"
  const line2 = "ser tu mejor vendedor."

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })
      tl.fromTo(
        '.char-span',
        { y: 55, opacity: 0, rotateZ: 4 },
        { y: 0, opacity: 1, rotateZ: 0, duration: 0.95, stagger: 0.025, ease: 'power4.out' }
      )
      .fromTo(
        ctaRef.current,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out' },
        '-=0.45'
      )
    }, comp)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={comp} className="relative min-h-[100dvh] flex flex-col justify-center px-6 py-20 md:py-28 overflow-hidden">
      {/* No blobs needed — AmbientBackground handles it */}

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center">
        <h1 className="font-black tracking-tighter leading-[0.95] text-[clamp(3.5rem,7.5vw,7.5rem)] mb-16 w-full text-center">
          <div className="overflow-hidden pb-8 -mb-5">
            <div className="inline-flex flex-wrap justify-center">
              {line1.split('').map((char, i) => (
                <span key={`l1-${i}`} className="inline-block char-span text-slate-900 drop-shadow-sm">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden pb-8 -mb-5">
            <div className="inline-flex flex-wrap justify-center">
              {line2.split('').map((char, i) => (
                <span key={`l2-${i}`} className="inline-block char-span text-indigo-600">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </div>
          </div>
        </h1>

        <div ref={ctaRef} className="flex flex-wrap gap-4 justify-center">
          <a href="#calculadora" className="btn-primary">
            Calcular mi inversión
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M9.5 4.5L13 8L9.5 11.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#servicios" className="btn-ghost">
            Ver cómo lo hacemos
          </a>
        </div>
      </div>
    </section>
  )
}
