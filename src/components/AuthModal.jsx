import { useState } from 'react'

export default function AuthModal({ isOpen, onClose, onLogin }) {
  const [email, setEmail] = useState('sergio@nex2u.ai')
  const [password, setPassword] = useState('123456')
  const [name, setName] = useState('Sergio Vázquez')
  const [isRegister, setIsRegister] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate server request
    setTimeout(() => {
      setLoading(false)
      if (email.trim() === '' || password.length < 4) {
        setError('Por favor, ingresa credenciales válidas (mínimo 4 caracteres).')
        return
      }
      onLogin({
        name: isRegister ? name : 'Sergio Vázquez',
        email: email
      })
      onClose()
    }, 1000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
      <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-8 shadow-2xl relative overflow-hidden">
        {/* Glow background */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-indigo-500/10 blur-[60px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-purple-500/10 blur-[60px] rounded-full pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Modal Header */}
        <div className="text-center mb-8">
          <span className="font-display font-black text-2xl tracking-[-0.03em] text-slate-100 block mb-2">
            Nex<span className="text-gradient">2u</span>
          </span>
          <h3 className="text-lg font-bold text-white tracking-tight">
            {isRegister ? 'Crea tu cuenta' : 'Ingresa a tu Hub'}
          </h3>
          <p className="text-xs text-slate-400 font-mono font-bold mt-1">
            {isRegister ? 'Colabora y administra tus asistentes' : 'Accede a tu comité de expertos 24/7'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                Nombre Completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre completo"
                required
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500/50 transition-colors font-medium"
              />
            </div>
          )}

          <div>
            <label className="block text-[10px] font-mono font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              required
              className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500/50 transition-colors font-medium"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500/50 transition-colors font-medium"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 font-mono font-bold">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center text-sm py-3.5 shadow-lg relative"
          >
            {loading ? (
              <span className="w-5 h-5 rounded-full border-2 border-current border-t-transparent animate-spin" />
            ) : (
              isRegister ? 'Registrarse' : 'Entrar'
            )}
          </button>
        </form>

        {/* Toggle Mode Link */}
        <div className="text-center mt-6">
          <button
            onClick={() => {
              setIsRegister(!isRegister)
              setError('')
            }}
            className="text-xs text-slate-400 hover:text-indigo-400 font-bold transition-colors font-mono"
          >
            {isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
          </button>
        </div>
      </div>
    </div>
  )
}
