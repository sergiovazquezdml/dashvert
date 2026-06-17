import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    num: '01',
    title: 'Auditoría gratuita',
    desc: 'Analizamos la velocidad, conversión y SEO/AEO de tu sitio sin costo ni compromiso.',
    tag: 'Gratis'
  },
  {
    num: '02',
    title: 'Propuesta a medida',
    desc: 'Recibes un diagnóstico detallado de las mejoras necesarias y su cotización exacta.',
    tag: '3 días'
  },
  {
    num: '03',
    title: 'Ejecución semanal',
    desc: 'Desarrollamos las optimizaciones con reportes de avance en tiempo real.',
    tag: '2-4 semanas'
  },
  {
    num: '04',
    title: 'Entrega y capacitación',
    desc: 'Traspasamos el control completo a tu equipo con documentación simplificada.',
    tag: 'Entrega'
  },
  {
    num: '05',
    title: 'Soporte y crecimiento',
    desc: 'Actualizaciones de velocidad, SEO técnico y optimización AEO mes a mes.',
    tag: 'Soporte'
  }
]

export default function Protocol() {
  const comp = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.protocol-title',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: comp.current, start: 'top 85%' } }
      )

      const steps = gsap.utils.toArray('.protocol-step')
      steps.forEach((step) => {
        gsap.fromTo(step,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out',
            scrollTrigger: { trigger: step, start: 'top 85%' }
          }
        )
      })
    }, comp)
    return () => ctx.revert()
  }, [])

  return (
    <section id="proceso" ref={comp} data-theme="dark" className="relative px-6 py-16 md:py-24 text-white">
      <div className="w-full max-w-7xl mx-auto">

        <span className="tag mb-6 block text-indigo-400">Cómo trabajamos</span>
        <h2 className="protocol-title text-[clamp(2.2rem,5vw,5.5rem)] font-black text-white leading-[0.9] tracking-tighter mb-4 w-full max-w-6xl drop-shadow-lg">
          De sitio olvidado a máquina de conversión.
        </h2>
        <p className="protocol-title text-xl text-slate-300 font-medium mb-16 max-w-2xl">
          Cinco pasos. Plazos reales. Resultados verificables desde el primer mes.
        </p>

        <div className="flex flex-col gap-12 md:gap-8">
          {STEPS.map((step, i) => (
            <div key={i} className="protocol-step group flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 border-t border-white/10 pt-6 md:pt-8 hover:border-indigo-500 transition-colors duration-700">
              <div className="text-4xl md:text-6xl font-black text-slate-500 group-hover:text-indigo-400 transition-colors duration-700 w-24 drop-shadow-lg shrink-0">
                {step.num}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight drop-shadow-lg">{step.title}</h3>
                </div>
                <p className="text-lg md:text-xl text-slate-200 font-medium max-w-2xl drop-shadow-lg">{step.desc}</p>
              </div>
              <span className="shrink-0 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest border border-white/15 text-slate-300 group-hover:border-indigo-800/40 group-hover:text-indigo-400 transition-colors duration-700">
                {step.tag}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <a href="#diagnostico" className="btn-primary">
            Comenzar con auditoría gratuita
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7H11.5M8.5 4L11.5 7L8.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

      </div>
    </section>
  )
}
