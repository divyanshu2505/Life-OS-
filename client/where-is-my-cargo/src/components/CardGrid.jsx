import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import locoData from '../data/locos.json'

gsap.registerPlugin(ScrollTrigger)

function statusColor(s) {
  if (s === 'in_transit') return 'green'
  if (s === 'delayed')    return 'red'
  return 'gold'
}

function statusLabel(s) {
  if (s === 'in_transit') return 'In Transit'
  if (s === 'delayed')    return 'Delayed'
  return 'Halted'
}

function formatETA(min) {
  if (min < 60) return `${min}m`
  return `${Math.floor(min / 60)}h ${min % 60}m`
}

function LocoCard({ loco }) {
  const [watchlisted, setWatchlisted] = useState(false)
  const [hovered, setHovered] = useState(false)
  const color = statusColor(loco.status)

  return (
    <div
      className={`loco-grid-card loco-grid-card--${color}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top bar */}
      <div className="card-top-bar">
        <span className={`status-pill status-pill--${color}`}>
          <span className="status-dot" />
          {statusLabel(loco.status)}
        </span>
        <button
          className={`watchlist-btn ${watchlisted ? 'watchlisted' : ''}`}
          onClick={e => { e.stopPropagation(); setWatchlisted(w => !w) }}
          title={watchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
        >
          {watchlisted ? '★' : '☆'}
        </button>
      </div>

      {/* Loco ID */}
      <div className="card-loco-id-block">
        <div className="card-class-tag">{loco.class}</div>
        <div className="card-loco-id">{loco.id}</div>
      </div>

      {/* Route */}
      <div className="card-route-block">
        <div className="card-route-from">{loco.origin}</div>
        <div className="card-route-arrow">→</div>
        <div className="card-route-to">{loco.destination}</div>
      </div>

      {/* Progress */}
      <div className="card-progress-wrap">
        <div className="card-progress-bar">
          <div
            className={`card-progress-fill fill--${color}`}
            style={{ width: `${loco.progress_percent}%` }}
          />
        </div>
        <div className="card-progress-labels">
          <span>{loco.progress_percent}% complete</span>
          <span className="card-eta">ETA {formatETA(loco.eta_minutes)}</span>
        </div>
      </div>

      {/* Hover overlay */}
      {hovered && (
        <div className="card-hover-overlay">
          <div className="cho-row">
            <div className="cho-field">
              <div className="cho-label">Cargo</div>
              <div className="cho-value">{loco.cargo}</div>
            </div>
            <div className="cho-field">
              <div className="cho-label">Tonnes</div>
              <div className="cho-value">{loco.cargo_tonnes.toLocaleString()}T</div>
            </div>
            <div className="cho-field">
              <div className="cho-label">Speed</div>
              <div className="cho-value">{loco.speed_kmh} km/h</div>
            </div>
          </div>
          <button
            className="track-now-btn"
            onClick={() => document.getElementById('search').scrollIntoView({ behavior: 'smooth' })}
          >
            Track Now →
          </button>
        </div>
      )}
    </div>
  )
}

export default function CardGrid({ filter }) {
  const sectionRef = useRef()
  const titleRef   = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      )
      gsap.utils.toArray('.loco-grid-card').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            duration: 0.6,
            delay: i * 0.08,
            ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 92%' }
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [filter])

  const { locos } = locoData
  const filtered = locos.filter(l => {
    if (!filter || filter === 'all') return true
    if (filter === 'electric')  return l.type.toLowerCase().includes('electric')
    if (filter === 'diesel')    return l.type.toLowerCase().includes('diesel')
    if (filter === 'highspeed') return l.speed_kmh > 60
    if (filter === 'coal')      return l.cargo.toLowerCase().includes('coal')
    if (filter === 'active')    return l.status === 'in_transit'
    return true
  })

  return (
    <section className="card-grid-section" id="fleet" ref={sectionRef}>
      <div className="section-header">
        <div>
          <div className="section-num">01 / Active Fleet</div>
          <h2 className="section-title" ref={titleRef}>
            All <em>Locomotives</em>
          </h2>
        </div>
        <div className="section-count">{filtered.length} Showing</div>
      </div>

      <div className="loco-grid">
        {filtered.map(loco => (
          <LocoCard key={loco.id} loco={loco} />
        ))}
      </div>
    </section>
  )
}
