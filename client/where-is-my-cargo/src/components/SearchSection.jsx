import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import locoData from '../data/locos.json'

gsap.registerPlugin(ScrollTrigger)

const REGEX = /^(WAG7|WAG9|WDG4|WDP4|WAP7)-\d{5}$/

function formatETA(min) {
  if (min < 60) return `${min} min`
  return `${Math.floor(min / 60)}h ${min % 60}m`
}

export default function SearchSection() {
  const [query, setQuery]           = useState('')
  const [result, setResult]         = useState(null)
  const [error, setError]           = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const sectionRef = useRef()
  const titleRef   = useRef()
  const inputRef   = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleInput = (val) => {
    setQuery(val)
    setError('')
    const q = val.toUpperCase()
    if (q.length >= 2) {
      const matches = locoData.locos.filter(l =>
        l.id.includes(q) || l.cargo.toUpperCase().includes(q) || l.type.toUpperCase().includes(q)
      )
      setSuggestions(matches)
      setShowDropdown(matches.length > 0)
    } else {
      setSuggestions([])
      setShowDropdown(false)
    }
  }

  const pickSuggestion = (loco) => {
    setQuery(loco.id)
    setResult(loco)
    setError('')
    setShowDropdown(false)
    setSuggestions([])
  }

  const handleSearch = () => {
    const q = query.trim().toUpperCase()
    if (!q) { setError('Enter a loco ID'); return }
    const found = locoData.locos.find(l => l.id === q)
    if (found) { setResult(found); setError(''); setShowDropdown(false) }
    else { setError(`${q} not found in fleet`); setResult(null) }
  }

  const highlightMatch = (text) => {
    const q = query.toUpperCase()
    const idx = text.toUpperCase().indexOf(q)
    if (idx === -1 || !query) return text
    return (
      <>
        {text.slice(0, idx)}
        <mark className="search-highlight">{text.slice(idx, idx + q.length)}</mark>
        {text.slice(idx + q.length)}
      </>
    )
  }

  return (
    <section className="search-section" id="search" ref={sectionRef}>
      <div className="search-eyebrow">03 / Find a Locomotive</div>
      <h2 className="search-title" ref={titleRef}>Track Your<br />Cargo Now</h2>

      <div className="search-field-outer">
        <div className="search-field-wrap" style={{ position: 'relative' }}>
          <input
            ref={inputRef}
            placeholder="WAG7-28451"
            value={query}
            onChange={e => handleInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            onBlur={() => setTimeout(() => setShowDropdown(false), 180)}
            onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
            spellCheck={false}
            autoComplete="off"
          />
          <button className="search-submit-btn" onClick={handleSearch}>Find →</button>

          <AnimatePresence>
            {showDropdown && (
              <motion.div
                className="search-dropdown"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {suggestions.map((loco) => (
                  <div key={loco.id} className="search-suggestion" onMouseDown={() => pickSuggestion(loco)}>
                    <span className="sugg-id">{highlightMatch(loco.id)}</span>
                    <span className="sugg-meta">{loco.cargo} · {loco.type}</span>
                    <span className={`sugg-status sugg-status--${loco.status}`}>{loco.status.replace('_', ' ')}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {error && (
          <motion.div
            className="search-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ color: 'var(--danger)', marginTop: 12 }}
          >
            ⚠ {error}
          </motion.div>
        )}
        <div className="search-hint">
          Try: <span>WAG7-28451</span> · <span>WDG4-13302</span> · <span>WAG9-31001</span>
        </div>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            className="search-result"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="section-num" style={{ marginBottom: 8 }}>Result Found</div>
            <div className="result-loco-header">
              <div style={{ fontFamily: 'var(--font-wide)', fontSize: '2.5rem', color: 'var(--accent)', letterSpacing: '0.05em' }}>
                {result.id}
              </div>
              <span className={`status-pill status-pill--${result.status === 'in_transit' ? 'green' : result.status === 'delayed' ? 'red' : 'gold'}`}>
                <span className="status-dot" />
                {result.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>

            {/* Progress */}
            <div className="result-progress-wrap">
              <div className="result-progress-bar">
                <motion.div
                  className="result-progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${result.progress_percent}%` }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <span>{result.progress_percent}% of route complete</span>
            </div>

            <div className="result-grid">
              <div className="result-field">
                <div className="rf-label">Speed</div>
                <div className="rf-value accent">{result.speed_kmh} km/h</div>
              </div>
              <div className="result-field">
                <div className="rf-label">ETA</div>
                <div className="rf-value green">{formatETA(result.eta_minutes)}</div>
              </div>
              <div className="result-field">
                <div className="rf-label">Cargo</div>
                <div className="rf-value">{result.cargo} · {result.cargo_tonnes.toLocaleString()}T</div>
              </div>
              <div className="result-field">
                <div className="rf-label">Type</div>
                <div className="rf-value">{result.type}</div>
              </div>
              <div className="result-field" style={{ gridColumn: '1 / -1' }}>
                <div className="rf-label">Route</div>
                <div className="rf-value" style={{ fontSize: '1rem' }}>
                  {result.origin} → {result.destination}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
