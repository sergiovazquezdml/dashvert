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
                Inicia con Nex2u. Crea tu cuenta, selecciona tus asistentes y delega la fricción de inmediato.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-700 font-bold">
                {[
                  'Acceso a todos los asistentes premium',
                  'Respuestas inmediatas a cualquier duda',
                  'Cancela tu plan en cualquier momento',
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
            <span className="font-display font-extrabold text-[21px] tracking-[-0.03em] text-slate-900 leading-none select-none block mb-5">
              Nex<span className="text-gradient">2u</span>
            </span>
            <p className="text-xs font-bold text-slate-600 leading-relaxed max-w-xs">
              Hub de asistentes personales impulsado por inteligencia artificial comunitaria.
            </p>
            <a href="mailto:hello@nex2u.ai" className="mt-4 block text-xs text-plasma hover:text-indigo-700 transition-colors font-mono font-bold">
              hello@nex2u.ai
            </a>
          </div>
          {[
            { title: 'Plataforma', links: ['Asistentes', 'Portal Creadores', 'Planes'] },
            { title: 'Legal', links: ['Privacidad', 'Términos'] },
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
            <span className="text-xs font-mono font-extrabold text-slate-600">Asistentes en línea 24/7</span>
          </div>
          <p className="text-xs font-mono font-extrabold text-slate-500">Hecho con amor para Sergio</p>
        </div>

      </div>
    </footer>
  )
}
