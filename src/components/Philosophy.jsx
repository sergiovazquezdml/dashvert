import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PARADIGMS = [
  { title: "Comunidad de Creadores", text: "Cualquiera puede entrenar un asistente. Comparte tu conocimiento y crea agentes expertos para resolver problemas reales del día a día." },
  { title: "Privacidad por Diseño", text: "Tus datos y consultas son tuyos. Aplicamos protocolos estrictos para que tu información financiera y de salud esté siempre protegida." },
  { title: "Disponibilidad 24/7", text: "Olvídate de esperar citas o pagar consultas costosas para dudas rápidas. Tu equipo de expertos no duerme, tú sí." },
  { title: "Calidad Premium", text: "No somos otro chatbot genérico. Cada agente tiene un perfil psicológico, personalidad y área de expertise finamente ajustada." }
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
              Inteligencia humana, escalada con IA.
            </h2>
            <p className="philosophy-desc text-xl text-slate-900 font-medium max-w-md">
              Reimaginamos cómo interactúas con la tecnología. Nex2u no es una herramienta, es tu comité de asesores personales para navegar la vida moderna.
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
