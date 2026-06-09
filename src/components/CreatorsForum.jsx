import { useState } from 'react'

const INITIAL_PROPOSALS = [
  {
    id: 1,
    title: 'Asistente de Compras Inteligentes del Súper',
    author: 'Carlos G. (Nutriólogo & Creador)',
    category: 'Bienestar / Consumo',
    description: 'Arma listas del súper optimizadas según presupuestos familiares, perfiles nutricionales y alertas de ofertas en supermercados mexicanos en tiempo real.',
    votes: 142,
    comments: [
      { author: 'Elena F.', text: '¡Me urge esto! Gasto demasiado en el súper sin planificar.' },
      { author: 'Mateo R.', text: 'Si logramos sincronizarlo con tickets de Soriana y Walmart sería un hit.' }
    ]
  },
  {
    id: 2,
    title: 'Asistente Legal de Patentes e IMPI',
    author: 'Sofía M. (Abogada Corporativa)',
    category: 'Legal',
    description: 'Guía automatizada paso a paso para emprendedores en México sobre registro de marcas, búsqueda de anterioridad en el IMPI y contestación de negativas de registro.',
    votes: 98,
    comments: [
      { author: 'Carlos G.', text: 'El proceso del IMPI siempre es confuso. Apoyo totalmente la propuesta.' }
    ]
  },
  {
    id: 3,
    title: 'Asistente para Músicos Independientes',
    author: 'Alan K. (Productor de Audio)',
    category: 'Productividad / Arte',
    description: 'Estructuración de contratos de cesión de derechos musicales, planeación de lanzamientos en Spotify, y cálculo de regalías de distribución digital.',
    votes: 79,
    comments: [
      { author: 'Luna M.', text: 'Como artista independiente, pagar a un gestor es imposible al principio. Esto salvaría vidas.' }
    ]
  }
]

export default function CreatorsForum({ user }) {
  const [proposals, setProposals] = useState(INITIAL_PROPOSALS)
  const [newTitle, setNewTitle] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [newCat, setNewCat] = useState('Finanzas')
  const [activeProposalId, setActiveProposalId] = useState(null)
  
  // Comment states
  const [commentText, setCommentText] = useState('')
  
  // Co-creator Application states
  const [isApplying, setIsApplying] = useState(false)
  const [applyName, setApplyName] = useState(user ? user.name : '')
  const [applyRole, setApplyRole] = useState('Desarrollador de IA')
  const [applyShare, setApplyShare] = useState(70) // 70% commission
  const [projectedUsers, setProjectedUsers] = useState(500)
  const [applySuccess, setApplySuccess] = useState(false)

  // Vote handler
  const handleVote = (id, e) => {
    e.stopPropagation()
    setProposals(proposals.map(p => {
      if (p.id === id) {
        return { ...p, votes: p.votes + 1 }
      }
      return p
    }))
  }

  // Create new proposal
  const handleCreateProposal = (e) => {
    e.preventDefault()
    if (!newTitle.trim() || !newDesc.trim()) return

    const newProp = {
      id: Date.now(),
      title: newTitle,
      author: user ? `${user.name} (Usuario Registrado)` : 'Creador Anónimo',
      category: newCat,
      description: newDesc,
      votes: 1,
      comments: []
    }

    setProposals([newProp, ...proposals])
    setNewTitle('')
    setNewDesc('')
  }

  // Add comment
  const handleAddComment = (e) => {
    e.preventDefault()
    if (!commentText.trim()) return

    setProposals(proposals.map(p => {
      if (p.id === activeProposalId) {
        return {
          ...p,
          comments: [...p.comments, { author: user ? user.name : 'Visitante', text: commentText }]
        }
      }
      return p
    }))
    setCommentText('')
  }

  // Handle Application Submit
  const handleApplySubmit = (e) => {
    e.preventDefault()
    setApplySuccess(true)
    setTimeout(() => {
      setIsApplying(false)
      setApplySuccess(false)
    }, 3000)
  }

  const activeProposal = proposals.find(p => p.id === activeProposalId)

  // Commission Calculations
  const averagePrice = 200 // default price per assistant
  const monthlyRevenue = projectedUsers * averagePrice
  const developerCut = monthlyRevenue * (applyShare / 100)

  return (
    <section id="comunidad" className="relative z-10 px-6 py-24 bg-slate-950 text-white border-t border-slate-900">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="tag mb-4">Comunidad de Creadores</span>
          <h2 className="text-[clamp(2.5rem,4.5vw,4.5rem)] font-black leading-tight tracking-tighter mb-6 text-white">
            Portal de Creadores,{' '}<span className="text-gradient">Reddit</span>{' '}&{' '}<span className="text-gradient">GitHub</span>
          </h2>
          <p className="text-lg text-slate-300 font-medium mb-10">
            Propon asistentes, vota por las ideas que más te interesen y únete al desarrollo de agentes expertos. La conversación vive en nuestro foro estilo Reddit, en GitHub Discussions y en la comunidad — para que cada voz cuente y cada asistente que nazca aquí te genere comisiones reales.
          </p>

          {/* Ease-of-use callout */}
          <div className="bg-slate-900/50 border border-slate-800/70 rounded-3xl p-8 text-left backdrop-blur-md">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">Diseñado para todos</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-3">
              Usar los asistentes es <span className="text-gradient">increíblemente fácil.</span>
            </h3>
            <p className="text-base text-slate-300 font-medium mb-8 max-w-2xl">
              Cada asistente se construye desde el principio con un objetivo claro: que cualquier persona pueda usarlo sin curva de aprendizaje. Sin tecnicismos, sin manuales. Solo conversa y obtén resultados.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  ),
                  title: 'Habla en lenguaje natural',
                  desc: 'Escribe como le escribirías a un amigo experto. Sin comandos ni formatos especiales.'
                },
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                      <path d="M4.93 4.93a10 10 0 0 0 0 14.14" />
                    </svg>
                  ),
                  title: 'Respuestas al instante',
                  desc: 'Cada asistente responde en segundos con información contextual, precisa y accionable.'
                },
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  ),
                  title: 'Se adapta a ti',
                  desc: 'El Perfilador de datos entrena al asistente con tu contexto para que sus respuestas sean siempre más relevantes.'
                },
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-3 p-5 bg-slate-950/50 border border-slate-800/60 rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-indigo-950/60 border border-indigo-900/40 flex items-center justify-center text-indigo-400">
                    {item.icon}
                  </div>
                  <h4 className="text-sm font-extrabold text-white leading-snug">{item.title}</h4>
                  <p className="text-xs font-medium text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Panel: Proposals & Comments */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {activeProposalId ? (
              // DETAILS & COMMENTS VIEW
              <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
                <button
                  onClick={() => setActiveProposalId(null)}
                  className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-400 hover:text-indigo-300 transition-colors mb-6"
                >
                  ← Volver a propuestas
                </button>

                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border bg-slate-950/60 text-slate-400 border-slate-800/80">
                      {activeProposal.category}
                    </span>
                    <h3 className="text-2xl font-black text-white mt-3 leading-snug">{activeProposal.title}</h3>
                    <p className="text-xs text-slate-400 font-mono mt-1">Propuesto por {activeProposal.author}</p>
                  </div>

                  <button
                    onClick={(e) => handleVote(activeProposal.id, e)}
                    className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-indigo-950/20 border border-indigo-900/30 text-indigo-300 hover:bg-indigo-950/40 hover:text-white transition-all duration-300 shrink-0 min-w-[76px] cursor-pointer"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mb-0.5">
                      <polyline points="18 15 12 9 6 15"></polyline>
                    </svg>
                    <span className="text-xs font-mono font-black leading-none">{activeProposal.votes}</span>
                    <span className="text-[8px] font-mono uppercase font-bold tracking-widest mt-1 opacity-80">Apoyos</span>
                  </button>
                </div>

                <p className="text-sm font-medium text-slate-200 leading-relaxed mb-8">
                  {activeProposal.description}
                </p>

                {/* Co-Creator Joint Development CTA */}
                <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                  <div>
                    <h4 className="text-base font-extrabold text-white mb-1">¿Tienes experiencia en este tema?</h4>
                    <p className="text-xs text-slate-400 font-medium">Postúlate como co-creador de este asistente para ayudarnos a diseñarlo y llévate regalías.</p>
                  </div>
                  <button
                    onClick={() => {
                      setApplyName(user ? user.name : '')
                      setIsApplying(true)
                    }}
                    className="btn-primary py-2.5 px-6 text-xs shrink-0 self-start sm:self-auto"
                  >
                    Postularme al Desarrollo
                  </button>
                </div>

                {/* Comments Section */}
                <div className="border-t border-slate-800/60 pt-6">
                  <h4 className="text-sm font-mono font-bold text-slate-500 uppercase tracking-wider mb-4">
                    Discusión ({activeProposal.comments.length})
                  </h4>

                  {activeProposal.comments.length === 0 ? (
                    <p className="text-xs text-slate-500 font-medium py-4">No hay comentarios aún. Escribe el primero abajo.</p>
                  ) : (
                    <ul className="space-y-4 mb-6">
                      {activeProposal.comments.map((c, idx) => (
                        <li key={idx} className="bg-slate-950/30 border border-slate-900 p-4 rounded-2xl flex flex-col">
                          <span className="text-xs font-bold text-slate-400 mb-1.5">{c.author}</span>
                          <p className="text-xs font-medium text-slate-200 leading-relaxed">{c.text}</p>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Add Comment Form */}
                  <form onSubmit={handleAddComment} className="flex gap-2">
                    <input
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder={user ? "Escribe un comentario..." : "Inicia sesión para poder comentar..."}
                      disabled={!user}
                      className="flex-1 px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500/50 transition-colors font-medium disabled:opacity-40"
                    />
                    <button
                      type="submit"
                      disabled={!user || !commentText.trim()}
                      className="btn-primary py-3 px-6 text-xs disabled:opacity-40 shrink-0"
                    >
                      Comentar
                    </button>
                  </form>
                </div>

              </div>
            ) : (
              // PROPOSALS LIST VIEW
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-900">
                  <h3 className="text-sm font-mono font-bold text-slate-500 uppercase tracking-wider">
                    Asistentes Propuestos por la Comunidad
                  </h3>
                </div>

                {proposals.map(p => (
                  <div
                    key={p.id}
                    onClick={() => setActiveProposalId(p.id)}
                    className="group bg-slate-900/30 border border-slate-800/80 hover:border-indigo-500/30 hover:bg-slate-900/50 rounded-2xl p-5 md:p-6 transition-all duration-350 cursor-pointer flex justify-between items-center gap-6"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase border bg-slate-950/80 text-slate-400 border-slate-800">
                          {p.category}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono font-bold">Por {p.author}</span>
                      </div>
                      <h4 className="text-lg font-extrabold text-slate-100 group-hover:text-white transition-colors mb-2 tracking-tight leading-snug">
                        {p.title}
                      </h4>
                      <p className="text-xs text-slate-400 font-medium line-clamp-2 leading-relaxed">
                        {p.description}
                      </p>
                    </div>

                    <button
                      onClick={(e) => handleVote(p.id, e)}
                      className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-indigo-400 hover:border-indigo-800/40 hover:bg-indigo-950/10 transition-all duration-300 shrink-0 min-w-[64px] cursor-pointer"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-0.5">
                        <polyline points="18 15 12 9 6 15"></polyline>
                      </svg>
                      <span className="text-xs font-mono font-black leading-none">{p.votes}</span>
                      <span className="text-[8px] font-mono uppercase font-bold tracking-widest mt-1 opacity-70">Apoyos</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Panel: Create Proposal & Commission Calculator */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 flex flex-col gap-6">
            
            {/* Create Proposal Form */}
            <div className="rounded-[2.5rem] bg-slate-900/40 border border-slate-800/60 p-6 backdrop-blur-xl shadow-2xl">
              <h3 className="text-base font-extrabold text-white mb-4 tracking-tight">Propón un Asistente</h3>
              <form onSubmit={handleCreateProposal} className="space-y-4">
                <div>
                  <label className="block text-[9px] font-mono font-bold text-slate-500 mb-1 uppercase tracking-wider">Título de Asistente</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Ej. Asistente para compras locales"
                    required
                    disabled={!user}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500/50 transition-colors font-medium disabled:opacity-40"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-mono font-bold text-slate-500 mb-1 uppercase tracking-wider">Categoría</label>
                  <select
                    value={newCat}
                    onChange={(e) => setNewCat(e.target.value)}
                    disabled={!user}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 outline-none focus:border-indigo-500/50 transition-colors font-medium disabled:opacity-40"
                  >
                    <option value="Finanzas">Finanzas</option>
                    <option value="Bienestar">Bienestar</option>
                    <option value="Salud">Salud</option>
                    <option value="Legal">Legal</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-mono font-bold text-slate-500 mb-1 uppercase tracking-wider">Descripción del Rol</label>
                  <textarea
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="¿Qué problema resuelve y qué tipo de datos necesita?"
                    rows={3}
                    required
                    disabled={!user}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500/50 transition-colors font-medium resize-none disabled:opacity-40"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!user || !newTitle.trim() || !newDesc.trim()}
                  className="btn-primary w-full justify-center text-xs py-3 shadow-md disabled:opacity-40"
                >
                  Publicar Propuesta
                </button>

                {!user && (
                  <p className="text-[9px] font-mono font-bold text-slate-500 text-center mt-2">
                    Inicia sesión en la parte superior para proponer asistentes.
                  </p>
                )}
              </form>
            </div>

            {/* Commissions Calculator Card */}
            <div className="rounded-[2.5rem] bg-indigo-950/20 border border-indigo-900/30 p-6 backdrop-blur-xl shadow-2xl">
              <h3 className="text-base font-extrabold text-white mb-2 tracking-tight">Cálculo de Comisiones</h3>
              <p className="text-xs text-slate-400 font-medium mb-4 leading-relaxed">
                Estima tus ingresos mensuales participando en el desarrollo de asistentes bajo nuestro protocolo de reparto equitativo.
              </p>

              <div className="space-y-3.5 mb-5">
                <div>
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold text-slate-500 mb-1 uppercase tracking-wider">
                    <span>Usuarios Activos Proyectados</span>
                    <span className="text-white text-xs font-bold font-sans">{projectedUsers}</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="5000"
                    step="100"
                    value={projectedUsers}
                    onChange={(e) => setProjectedUsers(parseInt(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer bg-slate-950 rounded-lg h-1.5"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-950/40 border border-slate-900 p-3.5 rounded-xl text-center">
                    <span className="block text-[8px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-1">Facturación Total</span>
                    <span className="text-xs font-black text-slate-300">${monthlyRevenue.toLocaleString()} <span className="text-[9px] font-bold text-slate-400">MXN</span></span>
                  </div>
                  <div className="bg-slate-950/40 border border-slate-900 p-3.5 rounded-xl text-center">
                    <span className="block text-[8px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-1">Tu Ganancia (70%)</span>
                    <span className="text-xs font-black text-emerald-400">${developerCut.toLocaleString()} <span className="text-[9px] font-bold text-emerald-500">MXN</span></span>
                  </div>
                </div>
              </div>

              <div className="text-[10px] font-mono font-bold text-slate-400 leading-relaxed text-center">
                *Cálculo basado en un precio sugerido de $200 MXN mensuales por asistente activo.
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Application Form Modal */}
      {isApplying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-8 shadow-2xl relative">
            <button
              onClick={() => setIsApplying(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {applySuccess ? (
              <div className="text-center py-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-900/30 border border-emerald-600/30 flex items-center justify-center text-emerald-400 mb-6">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h4 className="text-xl font-extrabold text-white mb-2">Postulación Recibida</h4>
                <p className="text-xs text-slate-300 font-medium max-w-sm mx-auto leading-relaxed">
                  Hemos registrado tu interés en el desarrollo conjunto. En breve nos comunicaremos a tu correo para comenzar con las pruebas del sandbox de comisiones.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <h3 className="text-lg font-black text-white tracking-tight mb-2">Postulación a Co-Desarrollo</h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed mb-4">
                  Regístrate para colaborar en la construcción lógica de **{activeProposal?.title}** e intégralo en el sandbox oficial.
                </p>

                <div>
                  <label className="block text-[9px] font-mono font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Tu Nombre</label>
                  <input
                    type="text"
                    value={applyName}
                    onChange={(e) => setApplyName(e.target.value)}
                    placeholder="Tu nombre completo"
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500/50 transition-colors font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-mono font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Tu Rol Especialidad</label>
                  <select
                    value={applyRole}
                    onChange={(e) => setApplyRole(e.target.value)}
                    className="w-full px-3 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 outline-none focus:border-indigo-500/50 transition-colors font-medium"
                  >
                    <option value="Desarrollador de IA">Desarrollador de IA (LLM/FineTuning)</option>
                    <option value="Experto de Dominio">Experto de Dominio / Consultor Temático</option>
                    <option value="Diseñador de Interacción">Diseñador de Interacción y UX</option>
                    <option value="Ambos / Generalist">Ambos / Ingeniero FullStack</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[9px] font-mono font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Repositorio / Portafolio Link</label>
                  <input
                    type="url"
                    placeholder="https://github.com/tu-usuario"
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500/50 transition-colors font-medium"
                  />
                </div>

                <div className="bg-slate-950/40 p-4 border border-slate-900 rounded-2xl flex justify-between items-center">
                  <div>
                    <span className="block text-[8px] font-mono font-bold text-slate-500 uppercase tracking-widest">Comisión de Regalías</span>
                    <span className="text-xs font-black text-white">70% de la facturación modular</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono font-extrabold border border-emerald-900/35 bg-emerald-950/10 px-2 py-0.5 rounded">Aprobado</span>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full justify-center text-xs py-3.5 shadow-lg"
                >
                  Enviar Postulación
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
