import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Section-linked items scroll to real page anchors
const LINKS = {
  System: [
    { label: 'Fleet Overview',  href: '#fleet'  },
    { label: 'Live Tracking',   href: '#live'   },
    { label: 'Search Cargo',    href: '#search' },
    { label: 'Statistics',      href: '#stats'  },
  ],
  Data: [
    { label: 'Indian Railways', href: 'https://indianrailways.gov.in', external: true },
    { label: 'NTPC Power',      href: 'https://www.ntpc.co.in',         external: true },
    { label: 'Coal India',      href: 'https://www.coalindia.in',       external: true },
    { label: 'Rail Saarthi',    href: 'https://railsaarthi.in',        external: true },
  ],
  Legal: [
    { label: 'Privacy Policy',  href: '#' },
    { label: 'Terms of Use',    href: '#' },
    { label: 'Contact',         href: '#' },
    { label: 'Demo Mode',       href: '#' },
  ],
}

function scrollTo(href) {
  if (href.startsWith('http')) {
    window.open(href, '_blank', 'noopener')
    return
  }
  if (href === '#') return
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  const [showTop, setShowTop] = useState(false)
  const btnRef = useRef()

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (btnRef.current) {
      gsap.to(btnRef.current, {
        opacity: showTop ? 1 : 0,
        scale: showTop ? 1 : 0.7,
        duration: 0.35,
        ease: 'power2.out',
        pointerEvents: showTop ? 'auto' : 'none',
      })
    }
  }, [showTop])

  return (
    <>
      {/* Scroll-to-top floating button */}
      <button
        ref={btnRef}
        className="scroll-top-btn"
        style={{ opacity: 0, scale: 0.7 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        title="Back to top"
      >
        ↑
      </button>

      <footer className="site-footer">
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">Where Is My <span>Cargo</span></div>
            <p className="footer-tagline">
              Real-time freight locomotive tracking across the Indian Railways network.
              Every wagon. Every tonne. Every minute.
            </p>
            <div className="footer-demo-badge">⚠ Demo Mode — Simulated Data</div>

            {/* Quick jump buttons */}
            <div className="footer-quick-nav">
              <div className="footer-quick-label">Quick Jump</div>
              <div className="footer-quick-btns">
                {[
                  { label: 'Fleet',    href: '#fleet'  },
                  { label: 'Live',     href: '#live'   },
                  { label: 'Search',   href: '#search' },
                  { label: 'Stats',    href: '#stats'  },
                ].map(item => (
                  <button
                    key={item.label}
                    className="footer-quick-btn"
                    onClick={() => scrollTo(item.href)}
                  >
                    + {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="footer-links">
            {Object.entries(LINKS).map(([col, items]) => (
              <div key={col} className="footer-col">
                <div className="footer-col-title">{col}</div>
                <ul className="footer-col-list">
                  {items.map(item => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                        onClick={e => {
                          if (!item.external) {
                            e.preventDefault()
                            scrollTo(item.href)
                          }
                        }}
                      >
                        {item.label}
                        {item.external && <span className="ext-icon"> ↗</span>}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-meta">
            Built with React · Three.js · GSAP · Lenis · Framer Motion
          </div>
          <div className="footer-copy">© 2025 Where Is My Cargo · Locomotive Freight Tracker</div>
        </div>
      </footer>
    </>
  )
}
