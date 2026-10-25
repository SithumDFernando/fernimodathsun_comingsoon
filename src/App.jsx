import BackgroundParticles from './components/BackgroundParticles'
import Scorpion from './components/Scorpion'
import './App.css'

export default function App() {
  return (
    <div className="landing-container">
      {/* Dynamic amber/orange/yellow ember particles */}
      <BackgroundParticles />

      {/* Subtle ambient cyber-mesh backdrop */}
      <div className="ambient-mesh" aria-hidden="true" />
      <div className="ambient-spotlight" aria-hidden="true" />

      {/* Header / Navbar */}
      <header className="landing-header">
        <nav className="header-nav" aria-label="Brand Navigation">
          <span className="brand-gem" aria-hidden="true" />
          <span className="header-title">The World of Fernimo Dathsun</span>
        </nav>
      </header>

      {/* Main hero stage */}
      <main className="landing-stage">
        <div className="center-hero">
          {/* Animated Scorpion at the center */}
          <Scorpion />

          {/* Launching soon in big letters below it */}
          <h1 className="launching-title">
            <span className="word word-launching shimmer-text">LAUNCHING</span>
            <span className="word word-soon shimmer-text">SOON</span>
          </h1>
        </div>
      </main>

      {/* Simple footer */}
      <footer className="simple-footer">
        <div className="footer-content">
          <span className="live-dot" aria-hidden="true" />
          <span className="domain-text">fernimodathsun.design</span>
        </div>
      </footer>
    </div>
  )
}
