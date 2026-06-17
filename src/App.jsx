import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AmbientBackground from './components/AmbientBackground'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Community from './pages/Community'

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-white">
        <AmbientBackground />

        <Header />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/community" element={<Community />} />
          </Routes>
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
    </BrowserRouter>
  )
}

