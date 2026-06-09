import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Hero() {
  const comp = useRef(null)
  const title1Ref = useRef(null)
  const title2Ref = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })
      tl.fromTo(
        [title1Ref.current, title2Ref.current],
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.4, stagger: 0.15, ease: 'power4.out' }
      )
      .fromTo(
        subRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
        '-=1'
      )
      .fromTo(
        ctaRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
        '-=1'
      )
    }, comp)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={comp} className="relative min-h-[100dvh] flex flex-col justify-center px-6 py-32 md:py-48 overflow-hidden text-white">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-indigo-500/10 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start">
        <h1 className="font-black tracking-tighter leading-[0.95] text-[clamp(3.5rem,8vw,8rem)] mb-10 w-full">
          <div className="overflow-hidden pb-4">
            <div ref={title1Ref} className="text-white drop-shadow-2xl">Tu equipo de expertos.</div>
          </div>
          <div className="overflow-hidden pb-4">
            <div ref={title2Ref} className="text-indigo-300">A una fracción del costo.</div>
          </div>
        </h1>
        
        <p ref={subRef} className="max-w-2xl text-[clamp(1.125rem,2vw,1.5rem)] text-slate-200 leading-relaxed font-medium mb-12">
          Nex2u es el primer Hub de asistentes especializados con IA en México. Construye tu comité personal de especialistas en finanzas, salud, legal y procesos, disponibles 24/7. Paga únicamente por los que actives.
        </p>

        <div ref={ctaRef}>
          <a href="#catalogo" className="inline-flex items-center justify-center bg-white text-slate-950 px-12 py-6 rounded-full text-lg font-bold hover:bg-indigo-400 hover:text-white transition-colors duration-500">
            Explorar asistentes
          </a>
        </div>
      </div>
    </section>
  )
}
