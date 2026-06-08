import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PARADIGMS = [
  { title: "Semanas, no meses", text: "Destruimos los ciclos de desarrollo interminables. Lanzamos plataformas optimizadas con precisión en tiempo récord." },
  { title: "Decisiones con datos", text: "La estética sin conversión es inútil. Analizamos cada iteración basándonos en interacción real y comportamiento del usuario." },
  { title: "Desempeño móvil absoluto", text: "Tratar el móvil como un extra es un error fatal. Construimos primariamente para dispositivos móviles con tiempos de carga milimétricos." },
  { title: "Dominio semántico", text: "Más allá del SEO básico. Creamos estructuras que las inteligencias artificiales comprenden e indexan prioritariamente." }
]

export default function Philosophy() {
  const comp = useRef(null)
  const leftCol = useRef(null)
  const rightCol = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: comp.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: leftCol.current,
        pinSpacing: false
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
    <section id="filosofia" ref={comp} className="relative px-6 py-32 md:py-48 bg-white">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-start">
        
        <div className="w-full md:w-1/2 relative h-full">
          <div ref={leftCol} className="md:h-screen flex flex-col justify-center">
            <h2 className="philosophy-title text-[clamp(3.5rem,6vw,6rem)] font-black text-slate-950 leading-[0.9] tracking-tighter mb-4 max-w-5xl">
              Inteligencia fluida y adaptación constante.
            </h2>
            <p className="philosophy-desc text-xl text-slate-900 font-medium max-w-md">
              Como un cerebro central con múltiples brazos tácticos, abandonamos las estructuras rígidas para implementar un ecosistema digital dinámico que responde al mercado en tiempo real.
            </p>
          </div>
        </div>

        <div ref={rightCol} className="w-full md:w-1/2 flex flex-col pt-[10vh] pb-[10vh] md:pt-[50vh] md:pb-[50vh] gap-16">
          {PARADIGMS.map((p, i) => (
            <div key={i} className="philosophy-item">
              <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">{p.title}</h3>
              <p className="text-xl text-slate-800 font-medium leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
