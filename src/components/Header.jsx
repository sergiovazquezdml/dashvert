import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const NAV = [
  { label: 'Servicios',        href: '#servicios' },
  { label: 'Proceso',          href: '#proceso' },
  { label: 'Por qué nosotros', href: '#filosofia' },
  { label: 'Casos reales',     href: '#casos' },
]

function Logo() {
  return (
    <a href="/" aria-label="Nex2u" className="flex items-center gap-3 shrink-0 group">
      {/* Icon mark */}
      <div
        className="w-10 h-10 rounded-[12px] flex items-center justify-center flex-shrink-0 transition-transform duration-350 group-hover:scale-95 shadow-sm"
        style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)' }}
      >
        <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
          <path d="M3.5 5.5L8.5 9L3.5 12.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 5.5L14 9L9 12.5"       stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {/* Wordmark */}
      <span className="font-display font-black text-[22px] tracking-[-0.03em] text-slate-900 leading-none select-none">
        Nex<span className="text-gradient font-black">2u</span>
      </span>
    </a>
  )
}

export default function Header() {
  const ref = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    gsap.fromTo(ref.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.1 }
    )
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header ref={ref} className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`flex items-center justify-between gap-8 px-6 py-4 rounded-full transition-all duration-500 ${
          scrolled
            ? 'shadow-lg shadow-slate-100/60'
            : ''
        }`}
        style={{
          width: 'min(1150px, calc(100vw - 2rem))',
          background: scrolled
            ? 'rgba(255, 255, 255, 0.92)'
            : 'rgba(255, 255, 255, 0.55)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: scrolled
            ? '1px solid rgba(79, 70, 229, 0.1)'
            : '1px solid rgba(79, 70, 229, 0.05)',
        }}
      >
        <Logo />

        {/* Divider */}
        <div className="hidden md:block w-px h-6 bg-slate-200 flex-shrink-0" />

        {/* Links desktop */}
        <ul className="hidden md:flex items-center gap-2 list-none flex-1">
          {NAV.map(n => (
            <li key={n.label}>
              <a
                href={n.href}
                className="px-4 py-2.5 rounded-full text-[15px] font-bold text-slate-700 hover:text-indigo-600 transition-colors duration-200 tracking-tight hover:bg-indigo-50/50"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#diagnostico"
          className="hidden md:inline-flex items-center gap-2.5 px-5.5 py-2.5 rounded-full text-[13px] font-extrabold shrink-0 transition-all duration-250 shadow-sm"
          style={{
            background: 'rgba(79, 70, 229, 0.08)',
            border: '1px solid rgba(79, 70, 229, 0.25)',
            color: '#4F46E5',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #4F46E5, #7C3AED)'
            e.currentTarget.style.color = '#FFFFFF'
            e.currentTarget.style.borderColor = 'transparent'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(79, 70, 229, 0.08)'
            e.currentTarget.style.color = '#4F46E5'
            e.currentTarget.style.borderColor = 'rgba(79, 70, 229, 0.25)'
          }}
        >
          Diagnóstico gratis
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6H10M7.5 3.5L10 6L7.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-slate-500 hover:text-slate-800 transition-colors p-1"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {open
              ? <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              : <>
                  <path d="M3 6H17"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M3 10H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M3 14H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </>
            }
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden absolute top-[72px] inset-x-4 rounded-3xl p-6 flex flex-col gap-3 shadow-xl"
          style={{
            background: 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(79, 70, 229, 0.08)',
          }}
        >
          {NAV.map(n => (
            <a
              key={n.label}
              href={n.href}
              className="text-lg font-extrabold text-slate-800 hover:text-indigo-600 transition-colors py-2.5 px-2 border-b border-slate-100 last:border-0"
              onClick={() => setOpen(false)}
            >
              {n.label}
            </a>
          ))}
          <a href="#diagnostico" className="btn-primary justify-center mt-3" onClick={() => setOpen(false)}>
            Diagnóstico gratis →
          </a>
        </div>
      )}
    </header>
  )
}
