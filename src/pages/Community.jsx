import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Community() {
  const comp = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    let ctx = gsap.context(() => {
      gsap.fromTo('.community-title',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' }
      )
      gsap.fromTo('.community-desc',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: 0.15 }
      )
      gsap.fromTo('.community-card',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, stagger: 0.2, ease: 'power3.out', delay: 0.3 }
      )
    }, comp)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={comp} className="relative z-10 text-slate-900">
      
      {/* ── Hero ── */}
      <section className="relative min-h-[60vh] flex flex-col justify-center px-6 pt-36 pb-12 overflow-hidden">
        <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
          <span className="tag mb-6 text-indigo-600">Comunidad</span>
          <h1 className="community-title font-black tracking-tighter leading-[0.95] text-[clamp(2.5rem,6vw,5.5rem)] mb-8 text-slate-900">
            Construyendo <span className="text-gradient">en Público.</span>
          </h1>
          <p className="community-desc text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Creemos en compartir valor sin restricciones. Participa en nuestros foros de debate y accede a recursos técnicos abiertos.
          </p>
        </div>
      </section>

      {/* ── Channels ── */}
      <section className="relative px-6 pb-24 bg-white">
        <div className="w-full max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Reddit Card */}
            <div className="community-card p-8 md:p-10 rounded-[2.5rem] bg-slate-50 border border-slate-200 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
              <div>
                <div className="flex items-center gap-3.5 mb-6">
                  {/* Reddit Logo SVG style */}
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 8V16M8 12H16"/>
                    </svg>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Foro de Estrategia</span>
                    <h3 className="text-2xl font-black text-slate-800 tracking-tight">Reddit / r/dashvert</h3>
                  </div>
                </div>
                
                <p className="text-sm font-medium text-slate-600 leading-relaxed mb-8">
                  Nuestra comunidad dedicada a discutir la intersección del diseño web, la conversión CRO y el impacto de los nuevos motores de IA (AEO). Hacemos reviews semanales gratuitas de los sitios que envían los miembros.
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    'Debate sobre actualizaciones AEO (SearchGPT, Claude, Gemini)',
                    'Consejos de conversión y mejoras de diseño visual',
                    'Auditorías y retroalimentación de la comunidad'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs font-bold text-slate-600">
                      <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="https://reddit.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary justify-center bg-gradient-to-br from-orange-500 to-red-600 hover:shadow-orange-200"
                style={{ boxShadow: '0 6px 20px rgba(249, 115, 22, 0.15)' }}
              >
                Unirse a la comunidad
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7H11.5M8.5 4L11.5 7L8.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

            {/* GitHub Card */}
            <div className="community-card p-8 md:p-10 rounded-[2.5rem] bg-slate-50 border border-slate-200 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
              <div>
                <div className="flex items-center gap-3.5 mb-6">
                  {/* GitHub Logo SVG style */}
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                    </svg>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Foro de Desarrollo</span>
                    <h3 className="text-2xl font-black text-slate-800 tracking-tight">GitHub / Discussions</h3>
                  </div>
                </div>
                
                <p className="text-sm font-medium text-slate-600 leading-relaxed mb-8">
                  El espacio técnico oficial donde compartimos plantillas de código, estructuras Schema Markup JSON-LD, librerías CSS recomendadas y configuraciones de velocidad de carga para que tu equipo desarrolle con autonomía.
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    'Snippets de código Schema.org listos para usar',
                    'Discusión sobre optimizaciones avanzadas de Core Web Vitals',
                    'Resolución de dudas de código en común'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs font-bold text-slate-600">
                      <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-slate-800 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary justify-center bg-gradient-to-br from-slate-800 to-slate-950 hover:shadow-slate-300"
                style={{ boxShadow: '0 6px 20px rgba(15, 23, 42, 0.15)' }}
              >
                Explorar discusiones
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7H11.5M8.5 4L11.5 7L8.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
