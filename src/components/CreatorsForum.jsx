import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── Pricing Config ─────────────────────────────────────────────────────
const SERVICE_BASE = {
  audit:      { label: 'Auditoría + Diagnóstico',    price: 500,   desc: 'Análisis completo de velocidad, SEO, CRO y AEO' },
  optimize:   { label: 'Optimización técnica',        price: 1500,  desc: 'Mejora de PageSpeed, Core Web Vitals y rendimiento' },
  redesign:   { label: 'Rediseño de sitio existente', price: 2500,  desc: 'Misma URL, nueva identidad y arquitectura' },
  newsite:    { label: 'Sitio nuevo desde cero',      price: 4000,  desc: 'Diseño, desarrollo y despliegue completo' },
}

const DESIGN_TIER = {
  standard: { label: 'Estándar',  multiplier: 1.0,  desc: 'Diseño profesional limpio y efectivo' },
  premium:  { label: 'Premium',   multiplier: 1.5,  desc: 'Diseño de alto impacto con animaciones' },
  elite:    { label: 'Elite',     multiplier: 2.0,  desc: 'Diseño de revista: motion, partículas, 3D' },
}

const SEO_TIER = {
  none:     { label: 'Ninguno',        price: 0,    desc: 'Sin SEO en este proyecto' },
  basic:    { label: 'SEO básico',     price: 800,  desc: 'Meta tags, schema, sitemap, URLs limpias' },
  advanced: { label: 'SEO avanzado',   price: 1800, desc: 'Todo el básico + keyword research + linkbuilding' },
  aeo:      { label: 'SEO + AEO',      price: 2800, desc: 'SEO completo + optimización para ChatGPT, Perplexity, Gemini' },
}

const ADDONS = [
  { id: 'copy',       label: 'Copywriting',           price: 1500, desc: 'Textos escritos para conversión' },
  { id: 'assets',     label: 'Assets visuales',        price: 800,  desc: 'Ilustraciones, íconos y fotografía' },
  { id: 'analytics',  label: 'Analytics & Heatmaps',   price: 600,  desc: 'GA4, Hotjar, dashboard de métricas' },
  { id: 'crm',        label: 'Integración CRM',        price: 1200, desc: 'HubSpot, Pipedrive o Notion' },
]

const RETAINER = {
  none:     { label: 'Sin retención mensual', price: 0,    desc: 'Proyecto puntual sin continuidad' },
  basic:    { label: 'Básico — $500/mes',     price: 500,  desc: 'Monitoreo, actualizaciones menores, reporte mensual' },
  advanced: { label: 'Avanzado — $1,200/mes', price: 1200, desc: 'SEO continuo + reportes de posicionamiento' },
  premium:  { label: 'Premium — $2,200/mes',  price: 2200, desc: 'AEO activo + CRO iterativo + actualizaciones visuales' },
}

const PAGES_RANGES = [
  { value: 1,  label: '1-3 páginas',   multiplier: 1.0 },
  { value: 2,  label: '4-8 páginas',   multiplier: 1.4 },
  { value: 3,  label: '9-20 páginas',  multiplier: 1.9 },
  { value: 4,  label: '20+ páginas',   multiplier: 2.8 },
]

const STEPS = ['Servicio', 'Diseño', 'Páginas', 'Visibilidad', 'Add-ons', 'Retención']

function StepIndicator({ current, total, labels }) {
  return (
    <div className="flex items-center gap-1 mb-10 overflow-x-auto pb-2">
      {labels.map((label, i) => (
        <div key={i} className="flex items-center gap-1 flex-shrink-0">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest transition-all duration-300 ${
            i < current ? 'bg-indigo-600 text-white' :
            i === current ? 'bg-indigo-100 text-indigo-700 border border-indigo-300' :
            'bg-slate-100 text-slate-400'
          }`}>
            <span className={`w-4 h-4 rounded-full text-[8px] flex items-center justify-center font-black ${
              i < current ? 'bg-white text-indigo-600' :
              i === current ? 'bg-indigo-600 text-white' :
              'bg-slate-300 text-slate-500'
            }`}>{i < current ? (
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1.5 4L3.5 6L6.5 2" />
              </svg>
            ) : i + 1}</span>
            <span className="hidden sm:block">{label}</span>
          </div>
          {i < total - 1 && (
            <div className={`w-3 h-px ${i < current ? 'bg-indigo-400' : 'bg-slate-200'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

function OptionCard({ selected, onClick, label, desc, badge, price }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-250 cursor-pointer group ${
        selected
          ? 'border-indigo-500 bg-indigo-50 shadow-md shadow-indigo-100'
          : 'border-slate-200 bg-white hover:border-indigo-200 hover:shadow-sm'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={`text-sm font-extrabold ${selected ? 'text-indigo-700' : 'text-slate-800'}`}>{label}</span>
            {badge && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400">
                {badge.icon === 'lightning' && (
                  <svg className="w-2.5 h-2.5 text-indigo-600 dark:text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                )}
                {typeof badge === 'string' ? badge : badge.text}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">{desc}</p>
        </div>
        {price !== undefined && (
          <span className={`text-sm font-black shrink-0 ${selected ? 'text-indigo-600' : 'text-slate-600'}`}>
            {price === 0 ? '—' : `+$${price.toLocaleString()}`}
          </span>
        )}
      </div>
      <div className={`mt-3 w-4 h-4 rounded-full border-2 transition-all ${
        selected ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300 group-hover:border-indigo-300'
      } flex items-center justify-center`}>
        {selected && (
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M1.5 4L3.5 6L6.5 2" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
    </button>
  )
}

// ─── Price Calculator ────────────────────────────────────────────────────
function calcPrice({ service, design, pages, seo, addons, retainer }) {
  const base = SERVICE_BASE[service]?.price ?? 0
  const designMult = DESIGN_TIER[design]?.multiplier ?? 1
  const pagesMult = PAGES_RANGES.find(p => p.value === pages)?.multiplier ?? 1
  const seoPrice = SEO_TIER[seo]?.price ?? 0
  const addonTotal = addons.reduce((sum, id) => sum + (ADDONS.find(a => a.id === id)?.price ?? 0), 0)
  const retainerPrice = RETAINER[retainer]?.price ?? 0

  const project = Math.round(base * designMult * pagesMult + seoPrice + addonTotal)
  return { project, retainer: retainerPrice }
}

// ─── Main Component ──────────────────────────────────────────────────────
export default function CreatorsForum() {
  const comp = useRef(null)
  const [step, setStep] = useState(0)
  const [result, setResult] = useState(false)
  const [form, setForm] = useState({
    service: '',
    design: 'premium',
    pages: 1,
    seo: 'basic',
    addons: [],
    retainer: 'none',
  })

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.calc-title',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.calc-title', start: 'top 85%' } }
      )
    }, comp)
    return () => ctx.revert()
  }, [])

  const toggleAddon = (id) => {
    setForm(f => ({
      ...f,
      addons: f.addons.includes(id) ? f.addons.filter(a => a !== id) : [...f.addons, id]
    }))
  }

  const canGoNext = () => {
    if (step === 0) return !!form.service
    return true
  }

  const price = calcPrice(form)
  const priceLow = Math.round(price.project * 0.9)
  const priceHigh = Math.round(price.project * 1.15)

  return (
    <section id="calculadora" ref={comp} className="relative z-10 px-6 py-10">
      <div className="max-w-[1800px] mx-auto">
        <div className="relative rounded-[2.5rem] overflow-hidden p-10 md:p-14 shadow-2xl border border-slate-200/60 bg-white">
          <div
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-40 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(99, 102, 241, 0.06) 0%, transparent 70%)' }}
          />
          <div className="relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="tag mb-4 text-indigo-600">Calculadora de inversión</span>
              <h2 className="calc-title text-[clamp(2.5rem,4.5vw,4.5rem)] font-black leading-tight tracking-tighter mb-4 text-slate-900">
                Cuánto cuesta mejorar tu sitio
              </h2>
              <p className="text-lg text-slate-500 font-medium">
                Sin hablar con ventas. Sin esperar cotizaciones. En 60 segundos tienes un rango de precio real para tu proyecto.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

              {/* ── Calculator Panel ── */}
              <div className="lg:col-span-2 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-inner p-8 md:p-10">
            {!result ? (
              <>
                <StepIndicator current={step} total={STEPS.length} labels={STEPS} />

                <div key={step} className="animate-fade-in-slide">
                  {/* Step 0: Service type */}
                  {step === 0 && (
                    <div>
                      <h3 className="text-xl font-black text-slate-800 mb-6">¿Qué tipo de servicio necesitas?</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {Object.entries(SERVICE_BASE).map(([key, val]) => (
                          <OptionCard
                            key={key}
                            selected={form.service === key}
                            onClick={() => setForm(f => ({ ...f, service: key }))}
                            label={val.label}
                            desc={val.desc}
                            price={val.price}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 1: Design tier */}
                  {step === 1 && (
                    <div>
                      <h3 className="text-xl font-black text-slate-800 mb-6">¿Qué nivel de diseño visual buscas?</h3>
                      <div className="grid grid-cols-1 gap-4">
                        {Object.entries(DESIGN_TIER).map(([key, val]) => (
                          <OptionCard
                            key={key}
                            selected={form.design === key}
                            onClick={() => setForm(f => ({ ...f, design: key }))}
                            label={val.label}
                            desc={val.desc}
                            badge={key === 'premium' ? 'Más elegido' : key === 'elite' ? 'Wow factor' : null}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Pages */}
                  {step === 2 && (
                    <div>
                      <h3 className="text-xl font-black text-slate-800 mb-6">¿Cuántas páginas necesitas?</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {PAGES_RANGES.map((p) => (
                          <OptionCard
                            key={p.value}
                            selected={form.pages === p.value}
                            onClick={() => setForm(f => ({ ...f, pages: p.value }))}
                            label={p.label}
                            desc={p.value === 1 ? 'Landing page, home, about' : p.value === 2 ? 'Servicios, blog, contacto' : p.value === 3 ? 'Sitio corporativo completo' : 'E-commerce o portal'}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 3: SEO/AEO */}
                  {step === 3 && (
                    <div>
                      <h3 className="text-xl font-black text-slate-800 mb-2">¿Qué nivel de visibilidad necesitas?</h3>
                      <p className="text-sm text-slate-500 font-medium mb-6">
                        AEO = visibilidad en ChatGPT, Perplexity y Google AI. El diferenciador de 2026.
                      </p>
                      <div className="grid grid-cols-1 gap-4">
                        {Object.entries(SEO_TIER).map(([key, val]) => (
                          <OptionCard
                            key={key}
                            selected={form.seo === key}
                            onClick={() => setForm(f => ({ ...f, seo: key }))}
                            label={val.label}
                            desc={val.desc}
                            price={val.price}
                            badge={key === 'aeo' ? { text: 'Recomendado', icon: 'lightning' } : null}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 4: Add-ons */}
                  {step === 4 && (
                    <div>
                      <h3 className="text-xl font-black text-slate-800 mb-2">¿Qué add-ons quieres incluir?</h3>
                      <p className="text-sm text-slate-500 font-medium mb-6">Puedes seleccionar varios. Todos son opcionales.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {ADDONS.map((addon) => (
                          <OptionCard
                            key={addon.id}
                            selected={form.addons.includes(addon.id)}
                            onClick={() => toggleAddon(addon.id)}
                            label={addon.label}
                            desc={addon.desc}
                            price={addon.price}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 5: Retainer */}
                  {step === 5 && (
                    <div>
                      <h3 className="text-xl font-black text-slate-800 mb-2">¿Quieres monitoreo continuo?</h3>
                      <p className="text-sm text-slate-500 font-medium mb-6">
                        Tu sitio puede mejorar mes a mes, no quedarse estático desde el día de entrega.
                      </p>
                      <div className="grid grid-cols-1 gap-4">
                        {Object.entries(RETAINER).map(([key, val]) => (
                          <OptionCard
                            key={key}
                            selected={form.retainer === key}
                            onClick={() => setForm(f => ({ ...f, retainer: key }))}
                            label={val.label}
                            desc={val.desc}
                            price={key !== 'none' ? val.price : undefined}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-10">
                  <button
                    onClick={() => step > 0 ? setStep(s => s - 1) : null}
                    disabled={step === 0}
                    className="btn-ghost text-slate-600 border-slate-200 disabled:opacity-30 cursor-pointer group flex items-center justify-center"
                  >
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3 h-3 transition-transform group-hover:-translate-x-0.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11.5 7H2.5M5.5 4L2.5 7L5.5 10" />
                      </svg>
                      Atrás
                    </span>
                  </button>
                  {step < STEPS.length - 1 ? (
                    <button
                      onClick={() => canGoNext() && setStep(s => s + 1)}
                      disabled={!canGoNext()}
                      className="btn-primary disabled:opacity-40 cursor-pointer group flex items-center justify-center"
                    >
                      <span className="flex items-center gap-1.5">
                        Siguiente
                        <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2.5 7H11.5M8.5 4L11.5 7L8.5 10" />
                        </svg>
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setResult(true)}
                      className="btn-primary cursor-pointer group flex items-center justify-center"
                    >
                      <span className="flex items-center gap-1.5">
                        Ver mi estimado
                        <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2.5 7H11.5M8.5 4L11.5 7L8.5 10" />
                        </svg>
                      </span>
                    </button>
                  )}
                </div>
              </>
            ) : (
              /* ── Result screen ── */
              <div>
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono font-bold mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Estimado listo
                  </div>
                  <h3 className="text-4xl font-black text-slate-900 mb-2">Tu inversión estimada</h3>
                  <p className="text-slate-500 font-medium text-sm">Rango basado en tu configuración. El precio exacto se define en la auditoría.</p>
                </div>

                <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 text-white text-center mb-8">
                  <p className="text-sm font-mono font-bold uppercase tracking-widest text-indigo-200 mb-2">Proyecto único</p>
                  <p className="text-6xl font-black tracking-tight mb-1">
                    ${priceLow.toLocaleString()} — ${priceHigh.toLocaleString()}
                  </p>
                  <p className="text-indigo-200 text-sm font-bold">USD · Pago en hasta 3 partes</p>
                  {price.retainer > 0 && (
                    <div className="mt-4 pt-4 border-t border-indigo-500/40">
                      <p className="text-sm font-mono font-bold text-indigo-200">+ ${price.retainer.toLocaleString()} USD/mes (retención)</p>
                    </div>
                  )}
                </div>

                <div className="space-y-2 mb-8">
                  <p className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest mb-3">Desglose de tu selección</p>
                  {[
                    { label: 'Servicio base', val: SERVICE_BASE[form.service]?.label },
                    { label: 'Nivel de diseño', val: DESIGN_TIER[form.design]?.label },
                    { label: 'Páginas', val: PAGES_RANGES.find(p => p.value === form.pages)?.label },
                    { label: 'Visibilidad', val: SEO_TIER[form.seo]?.label },
                    { label: 'Add-ons', val: form.addons.length > 0 ? form.addons.map(id => ADDONS.find(a => a.id === id)?.label).join(', ') : '—' },
                    { label: 'Retención mensual', val: RETAINER[form.retainer]?.label },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between py-2 border-b border-slate-100">
                      <span className="text-xs font-bold text-slate-500">{item.label}</span>
                      <span className="text-xs font-extrabold text-slate-800">{item.val}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="#diagnostico" className="btn-primary justify-center flex-1">
                    Agendar auditoría gratuita
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7H11.5M8.5 4L11.5 7L8.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <button
                    onClick={() => { setResult(false); setStep(0); setForm({ service: '', design: 'premium', pages: 1, seo: 'basic', addons: [], retainer: 'none' }) }}
                    className="btn-ghost cursor-pointer"
                  >
                    Recalcular
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── Sidebar: Live summary ── */}
          <div className="lg:col-span-1 sticky top-24">
            <div className="bg-slate-950 rounded-[2rem] p-8 text-white">
              <p className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest mb-6">Resumen en vivo</p>

              <div className="space-y-3 mb-8">
                {[
                  { label: 'Servicio', val: SERVICE_BASE[form.service]?.label ?? '—' },
                  { label: 'Diseño', val: DESIGN_TIER[form.design]?.label ?? '—' },
                  { label: 'Páginas', val: PAGES_RANGES.find(p => p.value === form.pages)?.label ?? '—' },
                  { label: 'SEO/AEO', val: SEO_TIER[form.seo]?.label ?? '—' },
                  { label: 'Add-ons', val: form.addons.length > 0 ? `${form.addons.length} seleccionados` : '—' },
                  { label: 'Retención', val: RETAINER[form.retainer]?.label.split('—')[0].trim() ?? '—' },
                ].map(item => (
                  <div key={item.label} className="flex items-start justify-between gap-3 py-2 border-b border-slate-800/60">
                    <span className="text-[10px] font-mono font-bold text-slate-600 uppercase tracking-widest shrink-0">{item.label}</span>
                    <span className="text-xs font-bold text-slate-300 text-right">{item.val}</span>
                  </div>
                ))}
              </div>

              {form.service && (
                <div className="bg-indigo-600/10 border border-indigo-900/30 rounded-2xl p-4 text-center">
                  <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-1">Estimado actual</p>
                  <p className="text-3xl font-black text-white">
                    ${priceLow.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-400 font-bold">USD (rango mínimo)</p>
                </div>
              )}

              {!form.service && (
                <div className="text-center py-6">
                  <p className="text-xs text-slate-600 font-bold">Selecciona un servicio para ver el estimado</p>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-slate-800/60">
                <div className="flex items-start gap-2 mb-2">
                  <svg width="14" height="14" className="text-emerald-400 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  <p className="text-[10px] font-mono font-bold text-slate-500">
                    Precios en USD. El precio exacto se confirma en la auditoría gratuita de 30 minutos.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <svg width="14" height="14" className="text-indigo-400 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <p className="text-[10px] font-mono font-bold text-slate-500">
                    Pagos en hasta 3 partes. Primer pago al inicio del proyecto.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</section>
  )
}
