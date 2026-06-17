import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STANDARDS = [
  {
    category: "Rendimiento",
    title: "PageSpeed Score 90+",
    desc: "Cada página es auditada y optimizada para superar el score de 90/100 en Google PageSpeed Insights, tanto en dispositivos móviles como de escritorio.",
    metric: "Score mínimo > 90"
  },
  {
    category: "Core Web Vitals",
    title: "Largest Contentful Paint (LCP)",
    desc: "Aseguramos que el elemento principal de contenido visual aparezca en menos de 2.5 segundos para retener al usuario desde el primer instante.",
    metric: "LCP < 2.5s"
  },
  {
    category: "Estabilidad Visual",
    title: "Cumulative Layout Shift (CLS)",
    desc: "Evitamos desplazamientos de contenido molestos durante la carga de la página mediante layouts estáticos y reserva de espacios en CSS.",
    metric: "CLS < 0.1"
  },
  {
    category: "Interactividad",
    title: "Interaction to Next Paint (INP)",
    desc: "Garantizamos que la respuesta a clics o gestos en la pantalla ocurra de forma inmediata, sin bloqueos de Javascript en el hilo principal.",
    metric: "INP < 200ms"
  },
  {
    category: "Visibilidad IA",
    title: "Crawlers & Habilitación AEO",
    desc: "Permitimos el acceso estructurado a rastreadores de IA (GPTBot, ClaudeBot, Google-Extended) para indexación semántica directa.",
    metric: "Acceso Permitido"
  },
  {
    category: "Datos Estructurados",
    title: "JSON-LD Schema Markup",
    desc: "Inyectamos esquemas semánticos avanzados (Organization, LocalBusiness, FAQPage) para generar fragmentos interactivos ricos en buscadores.",
    metric: "0 Errores en validador"
  }
]

export default function About() {
  const comp = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    let ctx = gsap.context(() => {
      gsap.fromTo('.about-title',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' }
      )
      gsap.fromTo('.about-desc',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: 0.15 }
      )
      gsap.fromTo('.standard-card',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.standards-grid', start: 'top 85%' } }
      )
    }, comp)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={comp} className="relative z-10 text-slate-900">
      
      {/* ── Hero ── */}
      <section className="relative min-h-[70vh] flex flex-col justify-center px-6 pt-36 pb-20 overflow-hidden">
        <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
          <span className="tag mb-6 text-indigo-600">Sobre nosotros</span>
          <h1 className="about-title font-black tracking-tighter leading-[0.95] text-[clamp(2.5rem,6.5vw,6rem)] mb-8 text-slate-900">
            El Estándar <span className="text-gradient">dashvert.</span>
          </h1>
          <p className="about-desc text-xl md:text-2xl text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed">
            No creemos en plantillas genéricas ni en sitios lentos que destruyen tu conversión. Desarrollamos con estándares de ingeniería para el Internet de hoy.
          </p>
        </div>
      </section>

      {/* ── DNA Comparison ── */}
      <section data-theme="dark" className="relative px-6 py-20 bg-slate-950 text-white border-t border-slate-900">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="tag mb-4 text-indigo-400">Nuestro ADN</span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">¿Por qué somos diferentes?</h2>
            <p className="text-slate-400 font-medium">Comparamos el enfoque tradicional frente a nuestro estándar de calidad.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest block mb-4">Enfoque Tradicional</span>
              <ul className="space-y-4">
                {[
                  'Código genérico inflado con constructores de páginas lentos (Wordpress Elementor, Divi).',
                  'Descuido total de Core Web Vitals y velocidad móvil, perdiendo hasta el 50% del tráfico.',
                  'Sitios estáticos invisibles para motores conversacionales de Inteligencia Artificial.',
                  'Dependencia técnica constante y contratos de mantenimiento forzados.'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-medium text-slate-400">
                    <svg className="flex-shrink-0 mt-1 text-red-500" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-[2rem] bg-indigo-900/10 border border-indigo-500/20 backdrop-blur-sm"
              style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.06) 0%, rgba(124,58,237,0.04) 100%)' }}>
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest block mb-4">El Estándar dashvert</span>
              <ul className="space-y-4">
                {[
                  'Desarrollo optimizado y limpio, centrado en el menor uso de Javascript.',
                  'Score de 90+ garantizado en PageSpeed e integraciones CRO fluidas.',
                  'Arquitectura AEO semántica lista para ser recomendada en ChatGPT, Gemini y Claude.',
                  'Entrega limpia con documentación para autonomía total de tu equipo.'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-semibold text-slate-200">
                    <svg className="flex-shrink-0 mt-1 text-indigo-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Standards Checklist ── */}
      <section className="relative px-6 py-20 bg-slate-50 border-t border-slate-200">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="tag mb-4 text-indigo-600">Especificaciones</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">Nuestros Estándares Técnicos</h2>
            <p className="text-slate-500 font-medium">Cada proyecto entregado cumple obligatoriamente con el siguiente checklist técnico auditable.</p>
          </div>

          <div className="standards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STANDARDS.map((s, i) => (
              <div key={i} className="standard-card p-6 rounded-3xl bg-white border border-slate-200 flex flex-col justify-between hover:shadow-md hover:border-indigo-500/30 transition-all duration-300">
                <div>
                  <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-2">{s.category}</span>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{s.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium mb-6">{s.desc}</p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">Estándar</span>
                  <span className="text-[10px] font-mono font-bold text-indigo-600">{s.metric}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a href="#diagnostico" className="btn-primary">
              Auditar mi sitio web gratis
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
