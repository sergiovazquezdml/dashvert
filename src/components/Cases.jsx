import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CASES = [
  {
    company: 'E-Commerce Global',
    metric: '+280%',
    metricLabel: 'Tasa de conversión',
    description: 'Reescritura completa y reducción radical de LCP, disparando las ventas móviles en el primer trimestre de forma simultánea en 8 regiones.',
    bg: 'bg-slate-950',
    text: 'text-white',
    descText: 'text-slate-200'
  },
  {
    company: 'SaaS B2B',
    metric: '98/100',
    metricLabel: 'PageSpeed Mobile',
    description: 'Nuestra IA actuó sobre múltiples ramas del código para alcanzar métricas perfectas en auditoría técnica sin comprometer el diseño visual.',
    bg: 'bg-indigo-600',
    text: 'text-white',
    descText: 'text-slate-200'
  },
  {
    company: 'Fintech Capital',
    metric: '-71%',
    metricLabel: 'Costo por adquisición',
    description: 'Diseño conductual táctico que abraza al usuario, guiando su atención sin fricción hacia la meta como un flujo orgánico.',
    bg: 'bg-slate-100',
    text: 'text-slate-950',
    descText: 'text-slate-800'
  },
  {
    company: 'Real Estate Elite',
    metric: '5.6x',
    metricLabel: 'Volumen de leads',
    description: 'Jerarquía visual expansiva y conexiones profundas con sistemas CRM, multiplicando la retención y la red de prospectos.',
    bg: 'bg-slate-200',
    text: 'text-slate-900',
    descText: 'text-slate-800'
  }
]

export default function Cases() {
  const comp = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.cases-title',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: comp.current, start: 'top 80%' } }
      )
      gsap.fromTo('.case-card',
        { y: 120, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, stagger: 0.15, ease: 'expo.out',
          scrollTrigger: { trigger: '.cases-grid', start: 'top 75%' } }
      )
    }, comp)
    return () => ctx.revert()
  }, [])

  return (
    <section id="casos" ref={comp} className="relative px-6 py-32 md:py-48 bg-white">
      <div className="w-full max-w-7xl mx-auto">
        <h2 className="cases-title text-[clamp(3rem,5vw,5.5rem)] font-black text-slate-950 leading-[0.9] tracking-tighter mb-8 w-full max-w-5xl">
          Nuestros brazos en acción: Resultados medibles e irrefutables.
        </h2>

        <div className="cases-grid grid grid-cols-1 md:grid-cols-12 gap-6 grid-flow-dense">
          {CASES.map((c, i) => {
            let spanClass = 'md:col-span-6'
            if (i === 0) spanClass = 'md:col-span-7'
            if (i === 1) spanClass = 'md:col-span-5'
            if (i === 2) spanClass = 'md:col-span-5'
            if (i === 3) spanClass = 'md:col-span-7'

            return (
              <div key={i} className={`case-card group relative p-10 md:p-12 rounded-[2rem] overflow-hidden ${c.bg} ${c.text} ${spanClass} flex flex-col justify-between min-h-[400px]`}>
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
                <div className="relative z-10">
                  <h3 className={`text-xl font-bold tracking-wide uppercase opacity-90 mb-4 drop-shadow-sm`}>{c.company}</h3>
                  <div className="text-7xl md:text-[6rem] font-black tracking-tighter leading-none mb-4 group-hover:scale-105 transition-transform duration-700 ease-out origin-left drop-shadow-md">{c.metric}</div>
                  <div className="text-xl font-bold opacity-90 drop-shadow-sm">{c.metricLabel}</div>
                </div>
                <p className={`relative z-10 text-lg md:text-xl font-medium mt-6 ${c.descText || 'opacity-90'} max-w-md drop-shadow-sm`}>
                  {c.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
