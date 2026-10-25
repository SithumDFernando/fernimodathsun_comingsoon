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

      {/* Main hero stage */}
      <main className="landing-stage">
        <div className="center-hero">
          {/* Animated Scorpion at the center */}
          <Scorpion />

          {/* Launching soon in big letters below it */}
          <h1 className="launching-title">
            <span className="shimmer-text">LAUNCHING SOON</span>
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
