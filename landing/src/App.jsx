import AmbientBackground from './components/AmbientBackground'
import Header from './components/Header'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Features from './components/Features'
import Cases from './components/Cases'
import Philosophy from './components/Philosophy'
import Protocol from './components/Protocol'
import Footer from './components/Footer'
import InteractiveRocket from './components/InteractiveRocket'

export default function App() {
  return (
    <div className="relative min-h-screen bg-slate-950">
      <AmbientBackground />
      <InteractiveRocket />
      <Header />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Cases />
        <Philosophy />
        <Protocol />
      </main>
      <Footer />
    </div>
  )
}
