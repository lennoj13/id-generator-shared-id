import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Info, Plus } from 'lucide-react';
import templates from '../templates';

/**
 * Landing Page — University template selector.
 * Displays a card grid for each available university template.
 */
export default function LandingPage() {
  const navigate = useNavigate();
  const templateList = Object.values(templates);

  return (
    <div className="landing-page">
      {/* Hero */}
      <header className="landing-hero">
        <div className="hero-glow" />
        <div className="hero-content">
          <span className="hero-badge">
            <Zap size={14} style={{ marginRight: '4px', verticalAlign: 'middle', marginTop: '-2px' }} />
            Fake Schedule Generator
          </span>
          <h1 className="hero-title">
            University Schedule
            <br />
            <span className="hero-accent">& ID Card Generator</span>
          </h1>
          <p className="hero-subtitle">
            Select a university template, enter your name, and instantly download
            a realistic-looking academic schedule and student ID card image.
          </p>
          <p className="hero-disclaimer">
            <Info size={14} style={{ marginRight: '4px', verticalAlign: 'middle', marginTop: '-2px' }} />
            For creative inspiration & social media content only — not official documents.
          </p>
        </div>
      </header>

      {/* Template Grid */}
      <section className="template-section">
        <h2 className="section-title">Choose a University Template</h2>
        <p className="section-subtitle">
          {templateList.length} templates available • More coming soon
        </p>

        <div className="template-grid">
          {templateList.map((tmpl) => (
            <button
              key={tmpl.id}
              className="template-card"
              onClick={() => navigate(`/generate/${tmpl.id}`)}
              style={{
                '--card-primary': tmpl.colors.primary,
                '--card-accent': tmpl.colors.accent,
              }}
            >
              <div className="card-color-bar" />
              <div className="card-body">
                <div className="card-icon">
                  <span className="card-initial">{tmpl.shortName.charAt(0)}</span>
                </div>
                <h3 className="card-name">{tmpl.name}</h3>
                <p className="card-location">{tmpl.location}</p>
                <p className="card-tagline">{tmpl.tagline}</p>
                <div className="card-stats">
                  <span>{Object.keys(tmpl.majors).length} majors</span>
                  <span>•</span>
                  <span>Schedule + ID Card</span>
                </div>
                <div className="card-cta">
                  Select Template →
                </div>
              </div>
            </button>
          ))}

          {/* Coming Soon Card */}
          <div className="template-card coming-soon">
            <div className="card-color-bar" style={{ background: 'linear-gradient(90deg, #334155, #475569)' }} />
            <div className="card-body">
              <div className="card-icon" style={{ background: '#1e293b' }}>
                <Plus size={24} color="#475569" />
              </div>
              <h3 className="card-name" style={{ color: '#64748b' }}>More Templates</h3>
              <p className="card-location">Coming Soon</p>
              <p className="card-tagline">Stanford, Oxford, Yale, and more university templates are on the way.</p>
              <div className="card-stats" style={{ color: '#475569' }}>
                <span>Stay tuned</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <p>
            NJ ID Generator — For creative & educational purposes only.
            <br />
            Not affiliated with any educational institution.
          </p>
          <a href="https://github.com/lennoj13" target="_blank" rel="noreferrer" className="github-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}
