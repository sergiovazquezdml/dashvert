import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Features() {
  const comp = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.section-title',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: comp.current, start: 'top 80%' } }
      )
      gsap.fromTo('.bento-card', 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power4.out',
          scrollTrigger: { trigger: '.bento-grid', start: 'top 80%' } }
      )
    }, comp)
    return () => ctx.revert()
  }, [])

  return (
    <section id="servicios" ref={comp} className="relative z-10 px-6 py-32 md:py-48">
      <div className="w-full max-w-7xl mx-auto">
        <h2 className="section-title text-[clamp(3rem,5vw,5.5rem)] font-black text-white leading-[0.95] tracking-tighter mb-8 w-full max-w-5xl drop-shadow-lg">
          Ocho flujos de optimización. Un cerebro central implacable.
        </h2>

        <div className="bento-grid grid grid-cols-1 md:grid-cols-3 grid-flow-dense gap-6">
          
          <div className="bento-card group col-span-1 md:col-span-2 row-span-1 bg-slate-800 rounded-3xl p-10 md:p-16 overflow-hidden relative min-h-[400px] flex flex-col justify-end">
            <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute right-0 top-0 w-[60%] h-[120%] bg-gradient-to-l from-indigo-500/20 to-transparent transform translate-x-10 group-hover:translate-x-0 transition-transform duration-700 ease-out" />
            <h3 className="relative z-10 text-3xl md:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-lg">Ingeniería Multitarea</h3>
            <p className="relative z-10 text-slate-200 text-lg max-w-md font-medium drop-shadow-lg">Como un pulpo de 8 brazos, nuestra IA adapta, analiza y optimiza múltiples variables de conversión simultáneamente sin perder el foco.</p>
          </div>

          <div className="bento-card group col-span-1 md:col-span-1 row-span-2 bg-indigo-600 rounded-3xl p-10 md:p-12 overflow-hidden relative min-h-[400px] flex flex-col justify-between">
            <div className="absolute inset-0 bg-indigo-700 transform scale-105 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out" />
            <div className="relative z-10 text-7xl font-black text-white tracking-tighter">1.5s</div>
            <div className="relative z-10 mt-auto">
              <h3 className="text-3xl font-black text-white tracking-tight mb-4 drop-shadow-lg">Reflejos Inmediatos</h3>
              <p className="text-slate-200 text-base font-medium drop-shadow-lg">Renderizado crítico optimizado para reaccionar al instante ante el usuario, aniquilando el rebote en cualquier dispositivo.</p>
            </div>
          </div>

          <div className="bento-card group col-span-1 md:col-span-2 row-span-1 bg-slate-100 rounded-3xl p-10 md:p-16 overflow-hidden relative min-h-[400px] flex flex-col justify-end">
            <div className="absolute right-0 bottom-0 text-[160px] text-slate-200 font-black leading-none transform translate-y-10 group-hover:-translate-y-4 transition-transform duration-700 ease-out">SEO</div>
            <h3 className="relative z-10 text-3xl md:text-5xl font-black text-slate-950 tracking-tight mb-4">Tentáculos Semánticos</h3>
            <p className="relative z-10 text-slate-900 text-lg max-w-md font-medium">Estructuras de datos enriquecidos que se extienden y conectan con los motores de búsqueda, acaparando las primeras posiciones del mercado.</p>
          </div>

        </div>
      </div>
    </section>
  )
}
