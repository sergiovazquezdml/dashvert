import AmbientBackground from './components/AmbientBackground'
import Header from './components/Header'
import Hero from './components/Hero'
import Stats from './components/Stats'
import HubWorkspace from './components/HubWorkspace'
import CreatorsForum from './components/CreatorsForum'
import Philosophy from './components/Philosophy'
import Protocol from './components/Protocol'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="relative min-h-screen bg-white">
      <AmbientBackground />

      <Header />

      <main>
        <Hero />
        <Stats />
        {/* Services: Problem + 3 Pillars + AEO + FAQ */}
        <HubWorkspace />
        {/* Calculator: 6-step pricing calculator */}
        <CreatorsForum />
        <Philosophy />
        <Protocol />
      </main>

      <Footer />

      {/* Floating CTA — always visible */}
      <a
        href="#diagnostico"
        className="fixed bottom-6 right-6 z-50 btn-primary text-sm py-3 px-5 shadow-2xl"
        style={{ boxShadow: '0 8px 32px rgba(79,70,229,0.35)' }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1v6m0 0l-2-2m2 2l2-2M1 10.5A2.5 2.5 0 003.5 13h7a2.5 2.5 0 002.5-2.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Auditoría gratuita
      </a>
    </div>
  )
}
