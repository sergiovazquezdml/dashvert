import { useState, useEffect, useRef } from 'react'

const INTERESTS = [
  'Velocidad y Core Web Vitals',
  'Rediseño Estético y UX',
  'SEO Técnico y Posicionamiento',
  'Conversión (CRO) y Redacción',
  'Auditoría y Diagnóstico General',
]

const FORMSPREE_ID  = 'xwvzrrrv'
const CALCOM_LINK   = 'sergio-vazquez-del-m.-leos-okd9qd/impulsai'

const inputClass = `
  w-full px-4 py-3 rounded-2xl text-xs text-slate-800 placeholder-slate-400/80
  outline-none transition-all duration-200 font-semibold
`.trim()

const inputStyle = {
  background: 'rgba(255, 255, 255, 0.95)',
  border:     '1px solid rgba(79, 70, 229, 0.15)',
}

const inputFocusStyle = {
  background: 'rgba(255, 255, 255, 1)',
  border:     '1px solid rgba(79, 70, 229, 0.65)',
  boxShadow:  '0 0 12px rgba(79, 70, 229, 0.1)',
}

function Field({ label, optional, children }) {
  return (
    <div>
      <label className="block text-[10px] font-mono font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
        {label}{optional && <span className="normal-case text-slate-400 ml-1">(opcional)</span>}
      </label>
      {children}
    </div>
  )
}

function FocusInput({ as: Tag = 'input', ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <Tag
      {...props}
      className={inputClass}
      style={focused ? inputFocusStyle : inputStyle}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  )
}

function CalEmbed({ link }) {
  const ref = useRef(null)
  useEffect(() => {
    const load = () => {
      if (!window.Cal || !ref.current) return
      window.Cal('init', { origin: 'https://cal.com' })
      window.Cal('inline', {
        elementOrSelector: ref.current,
        calLink: link,
        layout: 'month_view',
        config: { theme: 'light' },
      })
    }
    if (window.Cal) { load(); return }
    const s = document.createElement('script')
    s.src   = 'https://cal.com/embed.js'
    s.async = true
    s.onload = load
    document.body.appendChild(s)
    return () => { try { document.body.removeChild(s) } catch {} }
  }, [link])
  return <div ref={ref} style={{ minHeight: 520, width: '100%' }} />
}

export default function DiagnosisForm() {
  const [step, setStep]   = useState('form')
  const [error, setError] = useState('')
  const [form, setForm]   = useState({
    nombre: '', empresa: '', email: '', interes: '', mensaje: '',
  })

  const set = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    if (!form.interes) { setError('Elige el área que te interesa.'); return }
    setError(''); setStep('loading')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body:    JSON.stringify(form),
      })
      if (res.ok) { setStep('calendar') }
      else { throw new Error() }
    } catch {
      setError('Algo salió mal. Escríbenos a hello@impulsai.mx')
      setStep('form')
    }
  }

  if (step === 'calendar') {
    return (
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7L5.5 10.5L12 4" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p className="text-xs text-slate-800 font-bold">Datos recibidos, {form.nombre.split(' ')[0]}.</p>
            <p className="text-[10px] font-mono text-slate-500 font-semibold">Elige el momento que mejor te quede.</p>
          </div>
        </div>
        <CalEmbed link={CALCOM_LINK} />
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Field label="Nombre">
          <FocusInput name="nombre" required value={form.nombre} onChange={set} placeholder="Tu nombre" />
        </Field>
        <Field label="Empresa">
          <FocusInput name="empresa" required value={form.empresa} onChange={set} placeholder="Nombre de tu empresa" />
        </Field>
      </div>

      <Field label="Correo">
        <FocusInput type="email" name="email" required value={form.email} onChange={set} placeholder="tu@empresa.com" className="mb-4" />
      </Field>

      <div className="mt-4 mb-4">
        <p className="text-[10px] font-mono font-bold text-slate-500 mb-2.5 uppercase tracking-wider">¿Qué área te interesa?</p>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map(op => {
            const active = form.interes === op
            return (
              <button
                key={op}
                type="button"
                onClick={() => setForm(f => ({ ...f, interes: op }))}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer"
                style={{
                  background:  active ? 'rgba(79, 70, 229, 0.08)' : 'rgba(255, 255, 255, 0.95)',
                  border:      active ? '1px solid rgba(79, 70, 229, 0.45)' : '1px solid rgba(79, 70, 229, 0.15)',
                  color:       active ? '#4F46E5' : '#64748B',
                  fontFamily:  'inherit',
                }}
              >
                {op}
              </button>
            )
          })}
        </div>
      </div>

      <Field label="Cuéntanos algo" optional>
        <FocusInput
          as="textarea"
          name="mensaje"
          rows={3}
          value={form.mensaje}
          onChange={set}
          placeholder="¿Cuál es la URL de tu sitio web actual? ¿Qué problemas notas más?"
          style={{ ...inputStyle, resize: 'none' }}
        />
      </Field>

      {error && (
        <p className="mt-3 text-xs text-red-500 font-mono font-bold">{error}</p>
      )}

      <button
        type="submit"
        disabled={step === 'loading'}
        className="btn-primary w-full justify-center text-sm py-4 mt-6 disabled:opacity-60 cursor-pointer shadow-md"
      >
        {step === 'loading' ? (
          <>
            <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            Siguiente — elige tu horario
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7H11.5M8.5 4L11.5 7L8.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </>
        )}
      </button>

      <p className="text-center text-[10px] font-mono font-bold text-slate-400 mt-3">
        Si no ves valor en la sesión, no nos debes nada.
      </p>
    </form>
  )
}
