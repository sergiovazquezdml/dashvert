import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── Pain Points ───────────────────────────────────────────────────────────
const PAIN_POINTS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    stat: 'Vel.',
    color: 'text-rose-600 dark:text-rose-400',
    iconBg: 'bg-rose-50 dark:bg-rose-950/30',
    iconBorder: 'border-rose-200/80 dark:border-rose-800/50',
    hoverBorder: 'group-hover:border-rose-400/50',
    shadowHover: 'group-hover:shadow-[0_20px_40px_rgba(225,29,72,0.15)]',
    spotlight: 'rgba(225,29,72,0.08)',
    statGlow: 'drop-shadow-[0_0_12px_rgba(225,29,72,0.25)]',
    title: 'Tu sitio web tiene un rendimiento lento',
    desc: 'Los visitantes abandonan la página si no carga al instante. Cada segundo cuesta conversiones.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    stat: '≠IA',
    color: 'text-teal-600 dark:text-teal-400',
    iconBg: 'bg-teal-50 dark:bg-teal-950/30',
    iconBorder: 'border-teal-200/80 dark:border-teal-800/50',
    hoverBorder: 'group-hover:border-teal-400/50',
    shadowHover: 'group-hover:shadow-[0_20px_40px_rgba(13,148,136,0.15)]',
    spotlight: 'rgba(13,148,136,0.08)',
    statGlow: 'drop-shadow-[0_0_12px_rgba(13,148,136,0.25)]',
    title: 'Google y ChatGPT no te encuentran',
    desc: 'Tus competidores aparecen en las respuestas de la IA antes que tú. Estás invisible.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
      </svg>
    ),
    stat: '50ms',
    color: 'text-violet-600 dark:text-violet-400',
    iconBg: 'bg-violet-50 dark:bg-violet-950/30',
    iconBorder: 'border-violet-200/80 dark:border-violet-800/50',
    hoverBorder: 'group-hover:border-violet-400/50',
    shadowHover: 'group-hover:shadow-[0_20px_40px_rgba(124,58,237,0.15)]',
    spotlight: 'rgba(124,58,237,0.08)',
    statGlow: 'drop-shadow-[0_0_12px_rgba(124,58,237,0.25)]',
    title: 'Tu interfaz ignora los patrones de consumo actuales',
    desc: 'El usuario de hoy escanea y decide rápido. Un diseño rígido o desactualizado destruye tu credibilidad en solo 50 milisegundos.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    stat: '0%',
    color: 'text-emerald-600 dark:text-emerald-400',
    iconBg: 'bg-emerald-50 dark:bg-emerald-950/30',
    iconBorder: 'border-emerald-200/80 dark:border-emerald-800/50',
    hoverBorder: 'group-hover:border-emerald-400/50',
    shadowHover: 'group-hover:shadow-[0_20px_40px_rgba(5,150,105,0.15)]',
    spotlight: 'rgba(5,150,105,0.08)',
    statGlow: 'drop-shadow-[0_0_12px_rgba(5,150,105,0.25)]',
    title: 'Nadie sabe qué hacer cuando llega',
    desc: 'Sin flujos de conversión guiados ni llamadas a la acción claras, el tráfico se pierde.',
  },
]

function PainPointCard({ p }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`pain-card group relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-8 md:p-10 transition-all duration-500 hover:-translate-y-2 ${p.hoverBorder} ${p.shadowHover} flex flex-col justify-between`}
      style={{
        '--mouse-x': '0px',
        '--mouse-y': '0px'
      }}
    >
      {/* Spotlight Background Effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" 
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), ${p.spotlight}, transparent 80%)`
        }}
      />

      {/* Background Watermark Stat */}
      <div className={`absolute -bottom-6 -right-6 text-[9rem] font-black font-mono leading-none tracking-tighter opacity-[0.03] dark:opacity-[0.04] z-0 select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-4 group-hover:-translate-x-4 ${p.color}`}>
        {p.stat}
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-4 mb-10">
          <div className={`w-14 h-14 rounded-2xl ${p.iconBg} border ${p.iconBorder} flex items-center justify-center ${p.color} flex-shrink-0 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:shadow-md`}>
            {p.icon}
          </div>
          <span className={`text-4xl font-black font-mono tracking-tighter ${p.color} ${p.statGlow} transition-all duration-500 group-hover:scale-110`}>
            {p.stat}
          </span>
        </div>
        <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-3 tracking-tight leading-tight transition-colors duration-300">
          {p.title}
        </h3>
        <p className="text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
          {p.desc}
        </p>
      </div>
    </div>
  )
}


// ─── 3 Pilares ─────────────────────────────────────────────────────────────
const PILLARS = [
  {
    num: '01',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    gradient: 'from-indigo-500 to-violet-600',
    tag: 'Pilar 1',
    title: 'Diseño Visual de Alto Impacto + Conversión',
    desc: 'Diseñamos interfaces enfocadas en capturar clientes y generar confianza.',
    features: [
      'Identidad visual con microinteracciones',
      'Enfoque mobile-first de alto rendimiento',
      'Optimización de conversión y llamadas a la acción',
    ],
    cta: 'Ver más sobre diseño',
  },
  {
    num: '02',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    gradient: 'from-emerald-500 to-teal-600',
    tag: 'Pilar 2',
    title: 'Velocidad y Rendimiento Técnico',
    desc: 'Core Web Vitals para garantizar cargas instantáneas y mejor posicionamiento.',
    features: [
      'Score 90+ en Google PageSpeed Insights',
      'Compresión de imágenes avanzada y CDN',
      'Eliminación de código legacy y dependencias',
    ],
    cta: 'Ver más sobre rendimiento',
  },
  {
    num: '03',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    gradient: 'from-teal-500 to-emerald-600',
    tag: 'Pilar 3',
    title: 'Visibilidad Omnipresente (SEO + AEO)',
    desc: 'Optimización para búsquedas de Google tradicionales y respuestas de ChatGPT.',
    features: [
      'Optimización para ChatGPT, Perplexity y Gemini',
      'SEO técnico completo y Schema Markup',
      'Monitoreo mensual de posicionamiento',
    ],
    cta: 'Ver más sobre SEO/AEO',
  },
]

// ─── FAQ ───────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: '¿Cuánto tiempo tarda un rediseño completo?',
    a: 'Un rediseño estándar toma entre 4 y 6 semanas; los proyectos de optimización de velocidad de 2 a 4 semanas.'
  },
  {
    q: '¿Qué es el AEO y por qué importa?',
    a: 'AEO (Answer Engine Optimization) estructura tu contenido para que ChatGPT y Perplexity te recomienden en sus respuestas.'
  },
  {
    q: '¿Trabajan con cualquier tecnología?',
    a: 'Sí. Desarrollamos en WordPress, Webflow, Framer, Next.js y código custom, evaluando el mejor stack para tus metas.'
  },
  {
    q: '¿Garantizan resultados?',
    a: 'Garantizamos un score superior a 90 en Google PageSpeed y mejoras medibles en conversiones y SEO en 30 días.'
  },
  {
    q: '¿Cuál es el costo mínimo de un proyecto?',
    a: 'Nuestros servicios comienzan en $500 USD. Puedes cotizar tu proyecto al instante usando nuestra calculadora interactiva.'
  }
]

// ─── Component ─────────────────────────────────────────────────────────────
export default function HubWorkspace() {
  const comp = useRef(null)
  const [activePillar, setActivePillar] = useState(0)
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.hub-title',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.hub-title', start: 'top 85%' } }
      )
      gsap.fromTo('.pain-card',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.pain-card', start: 'top 85%' } }
      )
    }, comp)
    return () => ctx.revert()
  }, [])

  return (
    <section id="servicios" ref={comp} className="relative z-10 text-slate-900">

      {/* ── Pain Points ── */}
      <div className="px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="tag mb-4 text-rose-500 dark:text-rose-400">El problema real</span>
            <h2 className="hub-title text-[clamp(2.5rem,4.5vw,4.5rem)] font-black leading-tight tracking-tighter mb-4 text-slate-900 dark:text-white">
              ¿Cuántos clientes estás perdiendo por esto?
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
              Estos cuatro problemas afectan a la mayoría de sitios en LATAM. Si tu sitio tiene alguno, estás dejando dinero sobre la mesa todos los días.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PAIN_POINTS.map((p, i) => (
              <PainPointCard key={i} p={p} />
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="#calculadora" className="btn-primary">
              Calcular qué necesita mi sitio
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7H11.5M8.5 4L11.5 7L8.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* ── 3 Pilares ── */}
      <div data-theme="dark" className="px-6 py-16 md:py-24 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="tag mb-4 text-indigo-400">Nuestros servicios</span>
            <h2 className="text-[clamp(2.5rem,4.5vw,4.5rem)] font-black leading-tight tracking-tighter mb-4 text-white">
              La trinidad que la mayoría de agencias no puede ofrecer
            </h2>
            <p className="text-lg text-slate-400 font-medium">
              Diseño visual + conversión + rendimiento técnico. Los tres frentes, simultáneamente.
            </p>
          </div>

          {/* Tab selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {PILLARS.map((p, i) => (
              <button
                key={i}
                onClick={() => setActivePillar(i)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
                  activePillar === i
                    ? 'bg-white text-slate-900 shadow-lg'
                    : 'border border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'
                }`}
              >
                {p.tag} — {p.title.split('+')[0].trim()}
              </button>
            ))}
          </div>

          {/* Active pillar content */}
          {PILLARS.map((pillar, i) => (
            <div
              key={i}
              className={`transition-all duration-500 ${activePillar === i ? 'block' : 'hidden'}`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center text-white`}>
                      {pillar.icon}
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">{pillar.tag}</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">{pillar.title}</h3>
                  <p className="text-xl text-slate-300 font-medium mb-8 leading-relaxed">{pillar.desc}</p>
                  <a href="#diagnostico" className="btn-primary">
                    Agendar auditoría para este servicio
                  </a>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {pillar.features.map((f, j) => (
                    <div key={j} className="flex items-start gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                      <svg className={`flex-shrink-0 mt-0.5 bg-gradient-to-br ${pillar.gradient} rounded-full p-1`} width="18" height="18" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7L5.5 10.5L12 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-sm font-medium text-slate-200">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── AEO Spotlight ── */}
      <div data-theme="dark" className="px-6 py-16 md:py-24 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-[2.5rem] overflow-hidden border border-indigo-900/30 p-10 md:p-14"
            style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.08) 0%, rgba(124,58,237,0.05) 100%)' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest">El diferenciador 2026</span>
                </div>
                <h2 className="text-[clamp(2.5rem,4vw,4rem)] font-black text-white tracking-tighter mb-6 leading-[0.95]">
                  En 2026, tu cliente busca en Google
                  <span className="text-indigo-300"> Y le pregunta a ChatGPT.</span>
                </h2>
                <p className="text-xl text-slate-300 font-medium mb-8 leading-relaxed">
                  ¿Apareces en ambos? El AEO (Answer Engine Optimization) estructura tu contenido para que ChatGPT y Perplexity te recomienden directamente en sus respuestas.
                </p>
                <a href="#diagnostico" className="btn-primary">
                  Quiero aparecer en los resultados de IA
                </a>
              </div>

              <div className="space-y-4">
                {[
                  { engine: 'ChatGPT Search', status: 'no', label: 'Sin AEO → No apareces' },
                  { engine: 'Perplexity', status: 'no', label: 'Sin AEO → No apareces' },
                  { engine: 'Google AI Overviews', status: 'no', label: 'Sin AEO → No apareces' },
                  { engine: 'Bing Copilot', status: 'no', label: 'Sin AEO → No apareces' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-slate-600" />
                      <span className="text-sm font-bold text-slate-300">{item.engine}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-red-400">{item.label}</span>
                    </div>
                  </div>
                ))}
                <div className="text-center pt-2">
                  <span className="text-xs font-mono font-bold text-slate-500">Con dashvert AEO, todos muestran ↑ tu empresa</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div className="px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="tag mb-4 text-indigo-600">Preguntas frecuentes</span>
            <h2 className="text-[clamp(2.5rem,4.5vw,4rem)] font-black leading-tight tracking-tighter text-slate-900">
              Lo que todos preguntan antes de empezar
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="border border-slate-200 rounded-2xl overflow-hidden hover:border-indigo-200 transition-colors duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left cursor-pointer group"
                >
                  <span className="text-base font-extrabold text-slate-800 group-hover:text-indigo-600 transition-colors">
                    {faq.q}
                  </span>
                  <svg
                    className={`flex-shrink-0 text-slate-400 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                    width="18" height="18" viewBox="0 0 18 18" fill="none"
                  >
                    <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6">
                    <p className="text-sm font-medium text-slate-500 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-sm text-slate-500 font-medium mb-4">¿Tienes una pregunta diferente?</p>
            <a href="#diagnostico" className="btn-ghost text-slate-700 border-slate-300 hover:border-indigo-400">
              Hablar con el equipo
            </a>
          </div>
        </div>
      </div>

    </section>
  )
}
