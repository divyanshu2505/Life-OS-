import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import locoData from '../data/locos.json'

gsap.registerPlugin(ScrollTrigger)

const STATS = (locos) => {
  const totalCargo = locos.reduce((a, l) => a + l.cargo_tonnes, 0)
  const delayed    = locos.filter(l => l.status === 'delayed').length
  const onTime     = locos.filter(l => l.status === 'in_transit').length
  const avgSpeed   = Math.round(locos.reduce((a, l) => a + l.speed_kmh, 0) / locos.length)
  return [
    { value: locos.length, label: 'Active\nLocomotives',   suffix: '',   color: 'var(--accent)',   progress: (locos.length / 10) * 100 },
    { value: totalCargo,   label: 'Total Cargo\nTonnes',   suffix: 'T',  color: 'var(--accent)',   progress: 85 },
    { value: onTime,       label: 'Locos\nOn Time',        suffix: '',   color: 'var(--accent-2)', progress: (onTime / locos.length) * 100 },
    { value: delayed,      label: 'Locos\nDelayed',        suffix: '',   color: 'var(--danger)',   progress: (delayed / locos.length) * 100 },
    { value: avgSpeed,     label: 'Avg Speed\nkm/h',       suffix: '',   color: 'var(--accent)',   progress: (avgSpeed / 100) * 100 },
    { value: 99,           label: 'System\nUptime %',      suffix: '%',  color: 'var(--accent-2)', progress: 99 },
  ]
}

export default function StatSection() {
  const sectionRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate counters on scroll
      gsap.utils.toArray('.stat-number[data-value]').forEach((el) => {
        const target = parseInt(el.dataset.value, 10)
        const proxy = { val: 0 }
        el.textContent = '0'
        gsap.to(proxy, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.round(proxy.val).toLocaleString()
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        })
      })

      // Animate progress bars
      gsap.fromTo('.stat-prog-fill',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          stagger: 0.1,
          ease: 'power3.out',
          transformOrigin: 'left',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        }
      )

      // Stagger cards
      gsap.fromTo('.stat-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const { locos } = locoData
  const stats = STATS(locos)

  return (
    <section className="stat-section" id="stats" ref={sectionRef}>
      <div className="section-header">
        <div>
          <div className="section-num">04 / Fleet Stats</div>
          <h2 className="section-title">Today's <em>Numbers</em></h2>
        </div>
      </div>

      <div className="stat-cards-grid">
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-card-inner">
              <div className="stat-number" data-value={s.value} style={{ color: s.color }}>
                {s.value.toLocaleString()}
              </div>
              <div className="stat-suffix" style={{ color: s.color }}>{s.suffix}</div>
            </div>
            <div className="stat-label">{s.label.split('\n')[0]}<br />{s.label.split('\n')[1]}</div>
            <div className="stat-prog-track">
              <div
                className="stat-prog-fill"
                style={{ width: `${Math.min(s.progress, 100)}%`, background: s.color }}
              />
            </div>
            <div className="stat-prog-pct" style={{ color: s.color }}>
              {Math.round(Math.min(s.progress, 100))}%
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
