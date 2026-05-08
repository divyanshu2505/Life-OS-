import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FeaturedCarousel from '../components/FeaturedCarousel'
import LiveStrip from '../components/LiveStrip'
import { AI_TOOLS } from '../data/aiTools.js'
import { JOBS } from '../data/jobs.js'
import locoData from '../data/locos.json'

gsap.registerPlugin(ScrollTrigger)

function SectionReveal({ children, className }) {
  const ref = useRef()
  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%' } }
    )
  }, [])
  return <div ref={ref} className={className}>{children}</div>
}

export default function Home() {
  return (
    <div className="page-home">
      <FeaturedCarousel />
      <LiveStrip />

      {/* Platform modules strip */}
      <SectionReveal>
        <div className="home-modules-strip">
          {[
            { icon: '🚂', title: 'Cargo Tracker',  sub: 'Real-time fleet',  href: '/cargo',     color: 'var(--accent)'   },
            { icon: '🤖', title: 'AI Workspace',   sub: '6 AI tools',       href: '/ai',        color: '#70b8e8'         },
            { icon: '💼', title: 'Jobs Board',     sub: `${JOBS.length} openings`,href: '/jobs', color: 'var(--accent-2)' },
            { icon: '📊', title: 'My Dashboard',   sub: 'Track everything', href: '/dashboard', color: '#c070e8'         },
          ].map(m => (
            <Link key={m.title} to={m.href} className="home-module-card" style={{ '--mc': m.color }}>
              <span className="hmc-icon">{m.icon}</span>
              <div className="hmc-title">{m.title}</div>
              <div className="hmc-sub">{m.sub}</div>
              <span className="hmc-arrow">→</span>
            </Link>
          ))}
        </div>
      </SectionReveal>

      {/* Featured AI Tools */}
      <SectionReveal className="home-preview-section">
        <div className="section-header">
          <div>
            <div className="section-num">AI / Featured Tools</div>
            <h2 className="section-title">Powered by <em>AI</em></h2>
          </div>
          <Link to="/ai" className="section-view-all">View All →</Link>
        </div>
        <div className="home-preview-grid">
          {AI_TOOLS.slice(0, 3).map(tool => (
            <Link key={tool.id} to="/ai" className="home-tool-preview">
              <span className="htp-icon">{tool.icon}</span>
              <div className="htp-title">{tool.title}</div>
              <div className="htp-desc">{tool.description}</div>
              <span className="htp-cat" style={{ color: tool.color }}>{tool.category}</span>
              {tool.pro && <span className="htp-pro">🔒 PRO</span>}
            </Link>
          ))}
        </div>
      </SectionReveal>

      {/* Trending Jobs */}
      <SectionReveal className="home-preview-section home-preview-section--alt">
        <div className="section-header">
          <div>
            <div className="section-num">Jobs / Trending</div>
            <h2 className="section-title">Top <em>Openings</em></h2>
          </div>
          <Link to="/jobs" className="section-view-all">View All →</Link>
        </div>
        <div className="home-jobs-preview">
          {JOBS.filter(j => j.featured).map(job => (
            <Link key={job.id} to="/jobs" className="home-job-row">
              <span className="hjr-logo">{job.logo}</span>
              <div className="hjr-info">
                <div className="hjr-role">{job.role}</div>
                <div className="hjr-company">{job.company}</div>
              </div>
              <span className="hjr-salary">{job.salary}</span>
              <span className={`hjr-mode hjr-mode--${job.mode.toLowerCase()}`}>{job.mode}</span>
              <span className="hjr-arrow">→</span>
            </Link>
          ))}
        </div>
      </SectionReveal>

      {/* Active Cargo Preview */}
      <SectionReveal className="home-preview-section">
        <div className="section-header">
          <div>
            <div className="section-num">Cargo / Active</div>
            <h2 className="section-title">Live <em>Fleet</em></h2>
          </div>
          <Link to="/cargo" className="section-view-all">Track All →</Link>
        </div>
        <div className="home-cargo-preview">
          {locoData.locos.slice(0, 3).map(loco => (
            <div key={loco.id} className="home-cargo-row">
              <div className={`hcr-dot hcr-dot--${loco.status === 'in_transit' ? 'green' : loco.status === 'delayed' ? 'red' : 'gold'}`} />
              <span className="hcr-id">{loco.id}</span>
              <span className="hcr-route">{loco.origin.split(' ')[0]} → {loco.destination.split(' ')[0]}</span>
              <span className="hcr-speed">{loco.speed_kmh} km/h</span>
              <span className="hcr-tonnes">{loco.cargo_tonnes.toLocaleString()}T</span>
            </div>
          ))}
        </div>
      </SectionReveal>
    </div>
  )
}
