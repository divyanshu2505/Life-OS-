import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import locoData from '../data/locos.json'

function statusDot(status) {
  if (status === 'in_transit') return 'dot--green'
  if (status === 'delayed')    return 'dot--red'
  return 'dot--gold'
}

export default function LiveStrip() {
  const trackRef = useRef()

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    // Clone strip for seamless infinite loop
    const clone = track.cloneNode(true)
    track.parentElement.appendChild(clone)

    const totalWidth = track.scrollWidth

    const tween = gsap.to([track, clone], {
      x: `-=${totalWidth}`,
      duration: 35,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth)
      }
    })

    return () => tween.kill()
  }, [])

  const { locos } = locoData
  // Extend the list
  const extended = [...locos, ...locos, ...locos]

  return (
    <div className="live-strip-wrapper">
      <div className="live-strip-header">
        <span className="live-badge">
          <span className="live-pulse" />
          LIVE
        </span>
        <span className="live-strip-title">Active Locomotives · Real-Time Feed</span>
      </div>

      <div className="live-strip-viewport">
        <div className="live-strip-track" ref={trackRef}>
          {extended.map((loco, i) => (
            <div className="live-item" key={i}>
              <div className="live-item-top">
                <span className={`live-dot ${statusDot(loco.status)}`} />
                <span className="live-loco-id">{loco.id}</span>
              </div>
              <div className="live-item-speed">{loco.speed_kmh} <span>km/h</span></div>
              <div className="live-item-cargo">{loco.cargo_tonnes.toLocaleString()}T</div>
              <div className="live-item-route">{loco.origin.split(' ').slice(0,1)} → {loco.destination.split(' ').slice(0,1)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
