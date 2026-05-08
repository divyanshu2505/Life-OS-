import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function LiveClock() {
  const [timeStr, setTimeStr] = useState('')

  useEffect(() => {
    const update = () => {
      const t = new Date().toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      setTimeStr(t)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="nav-clock">
      <span className="city">IST</span>_{timeStr}
    </div>
  )
}

const NAV_ITEMS = [
  { label: 'Map',       href: '/map'       },
  { label: 'Cargo',     href: '/cargo'     },
  { label: 'AI Tools',  href: '/ai'        },
  { label: 'Jobs',      href: '/jobs'      },
  { label: 'Dashboard', href: '/dashboard' },
]

export default function Nav() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={scrolled ? 'nav--scrolled' : ''}>
      <Link to="/" className="nav-logo">
        Where Is My <span>Cargo</span>
      </Link>
      <LiveClock />
      <ul className="nav-links">
        {NAV_ITEMS.map(({ label, href }) => (
          <li key={label} className="nav-link-wrap">
            <Link
              to={href}
              data-text={label}
              className={location.pathname === href ? 'nav-link--active' : ''}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
