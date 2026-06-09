import { useState } from 'react'
import AmbientBackground from './components/AmbientBackground'
import Header from './components/Header'
import Hero from './components/Hero'
import Stats from './components/Stats'
import HubWorkspace from './components/HubWorkspace'
import CreatorsForum from './components/CreatorsForum'
import Philosophy from './components/Philosophy'
import Protocol from './components/Protocol'
import Footer from './components/Footer'
import InteractiveRocket from './components/InteractiveRocket'
import AuthModal from './components/AuthModal'

export default function App() {
  const [user, setUser] = useState(null)
  const [isAuthOpen, setIsAuthOpen] = useState(false)

  return (
    <div className="relative min-h-screen bg-slate-950">
      <AmbientBackground />
      <InteractiveRocket />
      
      <Header
        user={user}
        onOpenLogin={() => setIsAuthOpen(true)}
        onLogout={() => setUser(null)}
      />

      <main>
        <Hero />
        <Stats />
        <HubWorkspace user={user} />
        <CreatorsForum user={user} />
        <Philosophy />
        <Protocol />
      </main>

      <Footer />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={(u) => setUser(u)}
      />
    </div>
  )
}
