import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Scene3D from './Scene3D'

export default function Hero() {
  const titleRef = useRef()
  const subRef = useRef()
  const ctaRef = useRef()

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    )
    .fromTo(subRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.6'
    )
    .fromTo(ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    )
  }, [])

  return (
    <section className="hero">
      <div className="hero-canvas">
        <Scene3D />
      </div>

      <div className="hero-content">
        <div className="hero-eyebrow">Coal Freight Locomotive Tracker · India</div>
        <h1 className="hero-title" ref={titleRef}>
          Where Is<br /><em>My Cargo</em>
        </h1>
        <div className="hero-bottom">
          <p className="hero-sub" ref={subRef}>
            Real-time tracking of coal-carrying freight locomotives
            across the Indian Railways network. Every wagon. Every
            tonne. Every minute.
          </p>
          <button className="hero-cta" ref={ctaRef} onClick={() => document.getElementById('fleet').scrollIntoView({ behavior: 'smooth' })}>
            View Active Fleet
            <span className="hero-cta-arrow">→</span>
          </button>
        </div>
      </div>
    </section>
  )
}
