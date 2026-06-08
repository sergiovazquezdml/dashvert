import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  { num: '01', title: 'Onboarding Personalizado', desc: 'Cuéntanos cuáles son tus tareas tediosas en un cuestionario rápido. Nuestro algoritmo seleccionará los asistentes ideales para ti.' },
  { num: '02', title: 'Explora el Catálogo', desc: 'Agrega a tu Hub a expertos como Arturo para impuestos o Sofía para nutrición con un solo clic.' },
  { num: '03', title: 'Delega y Chatea', desc: 'Interactúa naturalmente. Tus asistentes analizan el contexto y devuelven respuestas inteligentes de forma inmediata.' },
  { num: '04', title: 'Desarrolla el Tuyo', desc: 'Usa el portal de creadores para entrenar a tu propio agente y únete a la revolución de la comunidad Nex2u.' }
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
      steps.forEach((step, i) => {
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
    <section id="proceso" ref={comp} className="relative px-6 py-32 md:py-48 text-white">
      <div className="w-full max-w-7xl mx-auto">
        
        <h2 className="protocol-title text-[clamp(3rem,5vw,5.5rem)] font-black text-white leading-[0.9] tracking-tighter mb-8 w-full max-w-6xl drop-shadow-lg">
          Delega la fricción. Recupera tu tiempo en cuatro pasos.
        </h2>

        <div className="flex flex-col gap-12 md:gap-8">
          {STEPS.map((step, i) => (
            <div key={i} className="protocol-step group flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 border-t border-slate-700 pt-6 md:pt-8 hover:border-indigo-500 transition-colors duration-700">
              <div className="text-4xl md:text-6xl font-black text-slate-500 group-hover:text-indigo-400 transition-colors duration-700 w-24 drop-shadow-lg">
                {step.num}
              </div>
              <div className="flex-1">
                <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-lg">{step.title}</h3>
                <p className="text-lg md:text-xl text-slate-200 font-medium max-w-2xl drop-shadow-lg">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
