import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import locoData from '../data/locos.json'
import { JOBS } from '../data/jobs.js'
import { AI_TOOLS } from '../data/aiTools.js'

const ALL_ITEMS = [
  ...locoData.locos.map(l => ({ type: 'cargo', label: l.id, sub: `${l.cargo} · ${l.type}`, href: '/cargo' })),
  ...JOBS.map(j => ({ type: 'job',   label: j.role,    sub: `${j.company} · ${j.salary}`, href: '/jobs' })),
  ...AI_TOOLS.map(t => ({ type: 'ai', label: t.title, sub: t.category, href: '/ai' })),
]

const TYPE_ICON = { cargo: '🚂', job: '💼', ai: '🤖' }
const TYPE_COLOR = { cargo: 'var(--accent)', job: 'var(--accent-2)', ai: '#70b8e8' }

export default function GlobalSearch({ onClose }) {
  const [q, setQ]           = useState('')
  const [results, setResults] = useState([])
  const inputRef = useRef()
  const navigate = useNavigate()

  const handleInput = (val) => {
    setQ(val)
    if (val.trim().length < 2) { setResults([]); return }
    const up = val.toUpperCase()
    setResults(ALL_ITEMS.filter(item =>
      item.label.toUpperCase().includes(up) || item.sub.toUpperCase().includes(up)
    ).slice(0, 8))
  }

  const pick = (item) => {
    navigate(item.href)
    onClose && onClose()
  }

  const highlightMatch = (text) => {
    const idx = text.toUpperCase().indexOf(q.toUpperCase())
    if (idx === -1 || !q) return text
    return (
      <>
        {text.slice(0, idx)}
        <mark className="search-highlight">{text.slice(idx, idx + q.length)}</mark>
        {text.slice(idx + q.length)}
      </>
    )
  }

  return (
    <div className="global-search-overlay" onClick={onClose}>
      <div className="global-search-box" onClick={e => e.stopPropagation()}>
        <div className="gsearch-header">
          <span className="gsearch-icon">⌕</span>
          <input
            ref={inputRef}
            autoFocus
            className="gsearch-input"
            placeholder="Search cargo, jobs, AI tools…"
            value={q}
            onChange={e => handleInput(e.target.value)}
            onKeyDown={e => e.key === 'Escape' && onClose && onClose()}
          />
          <button className="gsearch-close" onClick={onClose}>✕</button>
        </div>

        {results.length > 0 && (
          <div className="gsearch-results">
            {results.map((item, i) => (
              <div key={i} className="gsearch-item" onClick={() => pick(item)}>
                <span className="gsearch-type-icon">{TYPE_ICON[item.type]}</span>
                <div className="gsearch-item-info">
                  <div className="gsearch-item-label">{highlightMatch(item.label)}</div>
                  <div className="gsearch-item-sub">{item.sub}</div>
                </div>
                <span className="gsearch-item-type" style={{ color: TYPE_COLOR[item.type] }}>
                  {item.type}
                </span>
              </div>
            ))}
          </div>
        )}

        {q.length >= 2 && results.length === 0 && (
          <div className="gsearch-empty">No results for "{q}"</div>
        )}

        <div className="gsearch-footer">
          <span>🚂 Cargo</span>
          <span>💼 Jobs</span>
          <span>🤖 AI Tools</span>
          <span className="gsearch-esc">ESC to close</span>
        </div>
      </div>
    </div>
  )
}
