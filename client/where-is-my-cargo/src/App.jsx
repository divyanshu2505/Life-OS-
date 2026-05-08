import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import useLenis from './hooks/useLenis'
import Nav from './components/Nav'
import Footer from './components/Footer'
import GlobalSearch from './components/GlobalSearch'
import Home from './pages/Home'
import CargoPage from './pages/CargoPage'
import AIWorkspace from './pages/AIWorkspace'
import Jobs from './pages/Jobs'
import Dashboard from './pages/Dashboard'
import MapPage from './pages/MapPage'

function AppInner() {
  useLenis()
  const location = useLocation()
  const cursorRef = useRef()
  const ringRef   = useRef()
  const [searchOpen, setSearchOpen] = useState(false)

  // Custom cursor
  useEffect(() => {
    const moveCursor = (e) => {
      cursorRef.current && Object.assign(cursorRef.current.style, { left: e.clientX + 'px', top: e.clientY + 'px' })
      ringRef.current   && Object.assign(ringRef.current.style,   { left: e.clientX + 'px', top: e.clientY + 'px' })
    }
    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])

  // Scale cursor on hover targets
  useEffect(() => {
    const onEnter = () => { cursorRef.current?.classList.add('cursor--hover'); ringRef.current?.classList.add('cursor-ring--hover') }
    const onLeave = () => { cursorRef.current?.classList.remove('cursor--hover'); ringRef.current?.classList.remove('cursor-ring--hover') }
    const targets = document.querySelectorAll('a, button, .loco-grid-card, .priority-card, .cat-btn, .ai-tool-card, .job-card, .home-module-card')
    targets.forEach(el => { el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave) })
    return () => targets.forEach(el => { el.removeEventListener('mouseenter', onEnter); el.removeEventListener('mouseleave', onLeave) })
  })

  // Keyboard shortcut Ctrl+K for global search
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); setSearchOpen(true) }
      if (e.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Scroll to top on route change
  useEffect(() => { window.scrollTo(0, 0) }, [location.pathname])

  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />

      {searchOpen && <GlobalSearch onClose={() => setSearchOpen(false)} />}

      {/* Search trigger button in nav area */}
      <button className="global-search-trigger" onClick={() => setSearchOpen(true)} title="Search (Ctrl+K)">
        ⌕ <span>Search…</span> <kbd>Ctrl K</kbd>
      </button>

      <Nav />
      <main>
        <Routes>
          <Route path="/"          element={<Home />}        />
          <Route path="/map"       element={<MapPage />}     />
          <Route path="/cargo"     element={<CargoPage />}   />
          <Route path="/ai"        element={<AIWorkspace />} />
          <Route path="/jobs"      element={<Jobs />}        />
          <Route path="/dashboard" element={<Dashboard />}   />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter basename="/cargo">
      <AppInner />
    </BrowserRouter>
  )
}
