import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DIFFERENTIATORS = [
  {
    title: "La trinidad completa",
    text: "Unimos lo que otros dividen: diseño de alto impacto, velocidad de carga óptima y visibilidad en buscadores tradicionales y de IA."
  },
  {
    title: "Diseño con intención",
    text: "Cada decisión estética responde a un objetivo de conversión. El primer impacto visual define la confianza en tu marca en solo 50ms."
  },
  {
    title: "Optimización AEO",
    text: "Estructuramos técnicamente tu contenido para que motores de IA y asistentes como ChatGPT, Gemini y Claude te recomienden como la opción ideal."
  },
  {
    title: "Resultados medibles",
    text: "Entregamos mejoras auditables en PageSpeed, SEO y conversión en 30 días, con checkpoints y reportes de avance semanales."
  }
]

export default function Philosophy() {
  const comp = useRef(null)
  const leftCol = useRef(null)
  const rightCol = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia()

      mm.add("(min-width: 768px)", () => {
        ScrollTrigger.create({
          trigger: comp.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: leftCol.current,
          pinSpacing: false
        })
      })

      gsap.fromTo('.philosophy-title',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: comp.current, start: 'top 80%' } }
      )
      gsap.fromTo('.philosophy-desc',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2,
          scrollTrigger: { trigger: comp.current, start: 'top 80%' } }
      )

      const items = gsap.utils.toArray('.philosophy-item')
      items.forEach((item) => {
        gsap.fromTo(item,
          { opacity: 0.2, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.8,
            scrollTrigger: {
              trigger: item,
              start: 'top 70%',
              end: 'top 40%',
              scrub: true
            }
          }
        )
      })
    }, comp)
    return () => ctx.revert()
  }, [])

  return (
    <section id="filosofia" ref={comp} data-theme="dark" className="relative px-6 py-16 md:py-24 text-white">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-start">

        <div className="w-full md:w-1/2 relative h-full">
          <div ref={leftCol} className="md:h-screen flex flex-col justify-center">
            <span className="tag mb-6 text-indigo-400">Por qué dashvert</span>
            <h2 className="philosophy-title text-[clamp(2.2rem,6vw,6rem)] font-black text-white leading-[0.9] tracking-tighter mb-4 max-w-5xl">
              Diseño con intención. Código con propósito.
            </h2>
            <p className="philosophy-desc text-xl text-slate-300 font-medium max-w-md">
              No construimos sitios bonitos. Construimos sistemas de conversión que se ven increíbles, cargan en menos de 2 segundos y aparecen en Google y en ChatGPT.
            </p>
            <a href="#diagnostico" className="btn-primary mt-8 self-start">
              Agendar auditoría gratuita
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7H11.5M8.5 4L11.5 7L8.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

        <div ref={rightCol} className="w-full md:w-1/2 flex flex-col pt-[10vh] pb-[10vh] md:pt-[50vh] md:pb-[50vh] gap-16">
          {DIFFERENTIATORS.map((d, i) => (
            <div key={i} className="philosophy-item">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-mono font-bold text-slate-600">0{i + 1}</span>
                <div className="h-px flex-1 bg-slate-800" />
              </div>
              <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">{d.title}</h3>
              <p className="text-xl text-slate-300 font-medium leading-relaxed">{d.text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
