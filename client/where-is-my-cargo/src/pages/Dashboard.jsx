import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import locoData from '../data/locos.json'
import { JOBS } from '../data/jobs.js'
import { AI_TOOLS } from '../data/aiTools.js'

const RECENT_CARGO = locoData.locos.slice(0, 3)
const SAVED_JOBS   = JOBS.filter(j => j.featured)
const AI_USAGE     = [
  { tool: 'Resume Builder AI', runs: 3, last: '2h ago'  },
  { tool: 'Code Debugger AI',  runs: 7, last: '30m ago' },
  { tool: 'Content Generator', runs: 2, last: '1d ago'  },
]

const AI_STATS = [
  { label: 'Tools Used',    value: 3,   color: '#70b8e8'         },
  { label: 'Jobs Saved',    value: 2,   color: 'var(--accent-2)' },
  { label: 'Cargo Tracked', value: 5,   color: 'var(--accent)'   },
  { label: 'AI Runs',       value: 12,  color: '#c070e8'         },
]

export default function Dashboard() {
  const ref = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.dash-card').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: 'power2.out' }
        )
      })
      gsap.utils.toArray('.dash-stat').forEach((el, i) => {
        const val = parseInt(el.dataset.value)
        const proxy = { n: 0 }
        const numEl = el.querySelector('.dash-stat-num')
        gsap.to(proxy, {
          n: val, duration: 1.5, ease: 'power2.out', delay: i * 0.1,
          onUpdate: () => { numEl.textContent = Math.round(proxy.n) }
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div className="page-dashboard" ref={ref}>
      <div className="page-hero-banner">
        <div className="phb-eyebrow">Dashboard · Personal</div>
        <h1 className="phb-title">My <em>Overview</em></h1>
        <p className="phb-sub">Your activity across cargo tracking, AI tools, and job applications.</p>
      </div>

      {/* Stats row */}
      <div className="dash-stats-row">
        {AI_STATS.map((s, i) => (
          <div key={i} className="dash-stat" data-value={s.value}>
            <div className="dash-stat-num" style={{ color: s.color }}>0</div>
            <div className="dash-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="dash-grid">
        {/* Saved Jobs */}
        <div className="dash-card">
          <div className="dash-card-header">
            <span>💼 Saved Jobs</span>
            <Link to="/jobs" className="dash-card-link">View All →</Link>
          </div>
          {SAVED_JOBS.map(job => (
            <div key={job.id} className="dash-row">
              <span className="dash-row-icon">{job.logo}</span>
              <div className="dash-row-info">
                <div className="dash-row-title">{job.role}</div>
                <div className="dash-row-sub">{job.company} · {job.salary}</div>
              </div>
              <span className="dash-row-tag" style={{ color: 'var(--accent-2)' }}>{job.mode}</span>
            </div>
          ))}
        </div>

        {/* Recent Cargo */}
        <div className="dash-card">
          <div className="dash-card-header">
            <span>🚂 Recent Cargo</span>
            <Link to="/cargo" className="dash-card-link">Track All →</Link>
          </div>
          {RECENT_CARGO.map(loco => (
            <div key={loco.id} className="dash-row">
              <div className={`dash-dot dash-dot--${loco.status === 'in_transit' ? 'green' : loco.status === 'delayed' ? 'red' : 'gold'}`} />
              <div className="dash-row-info">
                <div className="dash-row-title">{loco.id}</div>
                <div className="dash-row-sub">{loco.cargo} · {loco.cargo_tonnes.toLocaleString()}T</div>
              </div>
              <span className="dash-row-tag" style={{ color: 'var(--accent)' }}>{loco.progress_percent}%</span>
            </div>
          ))}
        </div>

        {/* AI Usage */}
        <div className="dash-card">
          <div className="dash-card-header">
            <span>🤖 AI Usage</span>
            <Link to="/ai" className="dash-card-link">Open Tools →</Link>
          </div>
          {AI_USAGE.map((u, i) => (
            <div key={i} className="dash-row">
              <span className="dash-row-icon">⚡</span>
              <div className="dash-row-info">
                <div className="dash-row-title">{u.tool}</div>
                <div className="dash-row-sub">Last used: {u.last}</div>
              </div>
              <span className="dash-row-tag" style={{ color: '#70b8e8' }}>{u.runs} runs</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
