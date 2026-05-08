import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SingleLocoCard from './SingleLocoCard'
import locoData from '../data/locos.json'

gsap.registerPlugin(ScrollTrigger)

export default function FleetSection() {
  const sectionRef = useRef()
  const titleRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      )

      gsap.utils.toArray('.loco-card').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, delay: i * 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 90%' }
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const { locos } = locoData

  return (
    <section className="fleet-section" id="fleet" ref={sectionRef}>
      <div className="section-header">
        <div>
          <div className="section-num">01 / Active Fleet</div>
          <h2 className="section-title" ref={titleRef}>
            All <em>Locomotives</em>
          </h2>
        </div>
        <div className="section-count">{locos.length} Active</div>
      </div>

      <div>
        {locos.map((loco, i) => (
          <SingleLocoCard key={loco.id} loco={loco} index={i} />
        ))}
      </div>
    </section>
  )
}
