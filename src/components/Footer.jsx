import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DiagnosisForm from './DiagnosisForm'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const ctaRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ctaRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' } }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <footer className="relative z-10 pt-0 pb-10 px-6">
      <div className="max-w-[1800px] mx-auto">

        <div
          id="diagnostico"
          ref={ctaRef}
          className="relative mb-20 rounded-[2.5rem] overflow-hidden p-10 md:p-14 shadow-2xl border border-slate-200/60 bg-white"
        >
          <div
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-40 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(99, 102, 241, 0.06) 0%, transparent 70%)' }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start text-left">
            <div>
              <span className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-plasma mb-6 font-bold">Tu próximo paso</span>
              <h2 className="text-display-lg font-display font-black text-slate-900 mb-4 leading-tight">
                30 minutos.
                <br />
                <span className="text-gradient">Sin costo.</span>
              </h2>
              <p className="text-slate-700 leading-relaxed mb-6 font-semibold text-sm max-w-sm">
                Cuéntanos sobre tu sitio actual. En 30 minutos identificamos exactamente qué está frenando tu conversión y te proponemos cómo solucionarlo.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-700 font-bold">
                {[
                  'Diagnóstico de velocidad, SEO y conversión sin costo',
                  'Propuesta detallada sin paquetes genéricos',
                  'Resultados medibles desde el primer mes',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center bg-indigo-50 border border-indigo-200">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4L3.5 6L6.5 2" stroke="#4F46E5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl p-8 bg-slate-50 border border-slate-100 shadow-inner">
              <DiagnosisForm />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          <div className="col-span-2">
            <span className="font-sans font-black text-[22px] tracking-[-0.04em] text-slate-900 leading-none select-none block mb-5 lowercase">
              dash<span className="text-violet-600">vert</span>
            </span>
            <p className="text-xs font-bold text-slate-600 leading-relaxed max-w-xs">
              Agencia de diseño web que convierte. Diseño de alto impacto + CRO + velocidad + SEO + AEO.
            </p>
            <a href="mailto:hello@dashvert.co" className="mt-4 block text-xs text-plasma hover:text-indigo-700 transition-colors font-mono font-bold">
              hello@dashvert.co
            </a>
          </div>
          {[
            { title: 'Servicios', links: ['Diseño Visual', 'Velocidad & Core Web Vitals', 'SEO + AEO', 'Calculadora'] },
            { title: 'Legal', links: ['Privacidad', 'Términos', 'Política de cookies'] },
          ].map(col => (
            <div key={col.title}>
              <p className="text-xs font-mono font-extrabold uppercase tracking-widest text-slate-500 mb-4">{col.title}</p>
              <ul className="space-y-2.5 list-none">
                {col.links.map(l => (
                  <li key={l}>
                    <a href="#" className="text-xs text-slate-600 hover:text-slate-900 font-bold transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" style={{ boxShadow: '0 0 8px #10b981' }} />
            <span className="text-xs font-mono font-extrabold text-slate-600">Aceptando nuevos proyectos</span>
          </div>
          <p className="text-xs font-mono font-extrabold text-slate-500">© 2026 dashvert — Diseño web que genera negocio</p>
        </div>

      </div>
    </footer>
  )
}
