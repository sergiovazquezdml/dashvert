import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const NAV = [
  { label: 'Servicios',    href: '#servicios', isAnchor: true },
  { label: 'Proceso',      href: '#proceso', isAnchor: true },
  { label: 'Calculadora',  href: '#calculadora', isAnchor: true },
  { label: 'Sobre nosotros', href: '/about' },
  { label: 'Comunidad',    href: '/community' }
]

function Logo() {
  return (
    <Link to="/" aria-label="dashvert" className="flex items-center gap-3 shrink-0 group">
      {/* Isotipo: Pastilla (Cápsula) en corte diagonal con desfase. En hover se integran en una sola pastilla */}
      <div className="flex items-center justify-center flex-shrink-0 transition-all duration-500 ease-out group-hover:drop-shadow-[0_0_12px_rgba(79,70,229,0.95)]">
        <svg width="54" height="30" viewBox="0 0 54 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="leftGrad" x1="0" y1="0" x2="36" y2="30" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6366F1" />
              <stop offset="1" stopColor="#4338CA" />
            </linearGradient>
            <linearGradient id="rightGrad" x1="18" y1="0" x2="54" y2="30" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3730A3" />
              <stop offset="1" stopColor="#1E1B4B" />
            </linearGradient>
          </defs>

          {/* Mitad izquierda: Gradiente Indigo vibrante, corte diagonal pronunciado */}
          <g className="transform translate-x-[-4px] translate-y-[-3px] group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <path
              d="M 18 4 H 15 A 11 11 0 0 0 15 26 H 36 Z"
              fill="url(#leftGrad)"
              className="transition-opacity duration-300 group-hover:opacity-90"
            />
            {/* Letra 'd' con tipografía del sistema */}
            <text x="15" y="20.5" fill="#FFFFFF" fontSize="16" fontFamily="Plus Jakarta Sans, system-ui, sans-serif" fontWeight="900" textAnchor="middle">d</text>
          </g>

          {/* Mitad derecha: Gradiente Indigo oscuro */}
          <g className="transform translate-x-[4px] translate-y-[3px] group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <path
              d="M 18 4 L 36 26 H 39 A 11 11 0 0 0 39 4 Z"
              fill="url(#rightGrad)"
              className="transition-opacity duration-300 group-hover:opacity-95"
            />
            {/* Letra 'v' con tipografía del sistema */}
            <text x="39" y="20.5" fill="#FFFFFF" fontSize="16" fontFamily="Plus Jakarta Sans, system-ui, sans-serif" fontWeight="900" textAnchor="middle">v</text>
          </g>
        </svg>
      </div>

      {/* Wordmark adaptado a la tipografía del título ('Plus Jakarta Sans', black/extrabold, tracking-tighter) con 'vert' en indigo */}
      <span className="font-sans font-black text-[22px] tracking-[-0.04em] text-slate-900 dark:text-white leading-none select-none transition-all duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:drop-shadow-[0_0_6px_rgba(79,70,229,0.35)] lowercase">
        <span className="hidden sm:inline">
          dash<span className="text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-500">vert</span>
        </span>
        <span className="inline sm:hidden">
          d<span className="text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-500">v</span>
        </span>
      </span>
    </Link>
  )
}

export default function Header() {
  const ref = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)
  const [open, setOpen] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  const handleNavClick = (e, href) => {
    const targetId = href.substring(1)
    if (location.pathname !== '/') {
      e.preventDefault()
      navigate('/' + href)
    } else {
      e.preventDefault()
      const el = document.getElementById(targetId)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.substring(1)
      setTimeout(() => {
        const el = document.getElementById(targetId)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 150)
    }
  }, [location])

  useEffect(() => {
    gsap.fromTo(ref.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.1 }
    )
    const fn = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 24)
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true)
      } else if (currentScrollY < lastScrollY.current) {
        setHidden(false)
      }
      lastScrollY.current = currentScrollY
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header 
      ref={ref} 
      className={`fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4 transition-transform duration-500 ease-out ${hidden ? '-translate-y-[150%]' : 'translate-y-0'}`}
    >
      <nav
        className={`flex items-center justify-between gap-8 px-6 py-4 rounded-full w-full transition-all duration-300 ${scrolled ? 'bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 shadow-sm' : 'bg-transparent border-transparent'}`}
        style={{
          width: 'min(1150px, calc(100vw - 2rem))',
        }}
      >
        <Logo />

        {/* Divider */}
        <div className="hidden md:block w-px h-6 bg-slate-200 flex-shrink-0" />

        {/* Links desktop */}
        <ul className="hidden md:flex items-center gap-2 list-none flex-1">
          {NAV.map(n => (
            <li key={n.label}>
              {n.isAnchor ? (
                <a
                  href={n.href}
                  onClick={(e) => handleNavClick(e, n.href)}
                  className="px-4 py-2.5 rounded-full text-[15px] font-bold text-slate-700 hover:text-indigo-600 transition-colors duration-200 tracking-tight hover:bg-indigo-50/50"
                >
                  {n.label}
                </a>
              ) : (
                <Link
                  to={n.href}
                  className="px-4 py-2.5 rounded-full text-[15px] font-bold text-slate-700 hover:text-indigo-600 transition-colors duration-200 tracking-tight hover:bg-indigo-50/50"
                >
                  {n.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#diagnostico"
          onClick={(e) => handleNavClick(e, '#diagnostico')}
          className="hidden md:inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-[13px] font-extrabold shrink-0 transition-all duration-250 shadow-sm cursor-pointer"
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
          Auditoría gratuita
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
            n.isAnchor ? (
              <a
                key={n.label}
                href={n.href}
                className="text-lg font-extrabold text-slate-800 hover:text-indigo-600 transition-colors py-2.5 px-2 border-b border-slate-100 last:border-0"
                onClick={(e) => { setOpen(false); handleNavClick(e, n.href); }}
              >
                {n.label}
              </a>
            ) : (
              <Link
                key={n.label}
                to={n.href}
                className="text-lg font-extrabold text-slate-800 hover:text-indigo-600 transition-colors py-2.5 px-2 border-b border-slate-100 last:border-0"
                onClick={() => setOpen(false)}
              >
                {n.label}
              </Link>
            )
          ))}
          <a href="#diagnostico" onClick={(e) => { setOpen(false); handleNavClick(e, '#diagnostico'); }} className="btn-primary justify-center mt-3 cursor-pointer">
            Auditoría gratuita →
          </a>
        </div>
      )}
    </header>
  )
}
