import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PARADIGMS = [
  { title: "Ecosistema Descentralizado", text: "No creamos todos los asistentes de manera interna. Expertos reales —como contadores, médicos o ingenieros— entrenan a sus propios agentes dentro de nuestro protocolo y los publican en el marketplace." },
  { title: "Tus Datos, tu Inteligencia", text: "Tu historial financiero, médico o de hábitos no pertenece a una corporación. Se almacena y procesa con cifrado de grado militar para entrenar tu perfil personal, haciendo que tus asistentes se vuelvan más precisos con el tiempo." },
  { title: "Estándar de Calidad Riguroso", text: "Evitamos el ruido de los chatbots genéricos. Cada agente listado en el catálogo pasa por una auditoría técnica estricta: evaluamos su consistencia lógica, tono, seguridad y estructura de interacción." },
  { title: "Monetización Modular", text: "Eliminamos las suscripciones planas obligatorias. Cada asistente tiene un costo mensual independiente. Activa únicamente los que necesitas hoy y apaga los que dejes de utilizar sin plazos forzosos." }
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
    <section id="filosofia" ref={comp} className="relative px-6 py-32 md:py-48 bg-slate-950 text-white border-t border-slate-900">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-start">
        
        <div className="w-full md:w-1/2 relative h-full">
          <div ref={leftCol} className="md:h-screen flex flex-col justify-center">
            <h2 className="philosophy-title text-[clamp(3.5rem,6vw,6rem)] font-black text-white leading-[0.9] tracking-tighter mb-4 max-w-5xl">
              Inteligencia experta, a tu medida.
            </h2>
            <p className="philosophy-desc text-xl text-slate-300 font-medium max-w-md">
              Reimaginamos el acceso al conocimiento especializado. Nex2u estructura la inteligencia de la comunidad para poner un comité de asesores a tu lado, 24/7.
            </p>
          </div>
        </div>

        <div ref={rightCol} className="w-full md:w-1/2 flex flex-col pt-[10vh] pb-[10vh] md:pt-[50vh] md:pb-[50vh] gap-16">
          {PARADIGMS.map((p, i) => (
            <div key={i} className="philosophy-item">
              <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">{p.title}</h3>
              <p className="text-xl text-slate-300 font-medium leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
