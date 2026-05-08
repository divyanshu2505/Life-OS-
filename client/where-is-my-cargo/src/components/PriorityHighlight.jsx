import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import locoData from '../data/locos.json'

gsap.registerPlugin(ScrollTrigger)

function formatETA(min) {
  if (min < 60) return `${min} min`
  return `${Math.floor(min / 60)}h ${min % 60}m`
}

export default function PriorityHighlight() {
  const sectionRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.priority-card',
        { opacity: 0, y: 60, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.9, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Priority = in_transit locos with < 100 min ETA
  const { locos } = locoData
  const priority = locos.filter(l => l.status === 'in_transit').sort((a, b) => a.eta_minutes - b.eta_minutes)

  return (
    <section className="priority-section" ref={sectionRef}>
      <div className="section-header">
        <div>
          <div className="section-num">02 / Priority</div>
          <h2 className="section-title">🔥 Priority <em>Cargo</em></h2>
        </div>
        <div className="section-count">{priority.length} Priority Runs</div>
      </div>

      <div className="priority-grid">
        {priority.map((loco, i) => (
          <motion.div
            key={loco.id}
            className={`priority-card ${i === 0 ? 'priority-card--featured' : ''}`}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="priority-glow" />

            <div className="priority-top">
              <span className="priority-badge">
                {i === 0 ? '🔥 FASTEST ETA' : '⚡ HIGH PRIORITY'}
              </span>
              <span className="priority-speed">{loco.speed_kmh} km/h</span>
            </div>

            <div className="priority-loco-id">{loco.id}</div>

            <div className="priority-route">
              <span>{loco.origin}</span>
              <span className="priority-arrow">→</span>
              <span>{loco.destination}</span>
            </div>

            <div className="priority-bottom">
              <div className="priority-stat">
                <div className="ps-label">Cargo</div>
                <div className="ps-value">{loco.cargo_tonnes.toLocaleString()}T</div>
              </div>
              <div className="priority-stat">
                <div className="ps-label">Type</div>
                <div className="ps-value">{loco.cargo}</div>
              </div>
              <div className="priority-stat priority-eta-block">
                <div className="ps-label">ETA</div>
                <div className="ps-value ps-eta">{formatETA(loco.eta_minutes)}</div>
              </div>
            </div>

            <div className="priority-progress">
              <div className="priority-bar">
                <motion.div
                  className="priority-bar-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${loco.progress_percent}%` }}
                  transition={{ duration: 1.4, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <span className="priority-pct">{loco.progress_percent}%</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
