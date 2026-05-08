import { useEffect, useRef, useState } from 'react'
import locoData from '../data/locos.json'
import { FREIGHT_ROUTES, STATIONS } from '../data/railwayRoutes.js'

// ─── helpers ────────────────────────────────────────────────────────────────
function lerp(a, b, t) { return a + (b - a) * t }

function getPositionOnRoute(waypoints, progress) {
  const t  = Math.max(0, Math.min(1, progress / 100))
  const max = waypoints.length - 1
  const seg  = Math.min(Math.floor(t * max), max - 1)
  const segT = t * max - seg
  const [lat1, lng1] = waypoints[seg]
  const [lat2, lng2] = waypoints[seg + 1] ?? waypoints[seg]
  return [lerp(lat1, lat2, segT), lerp(lng1, lng2, segT)]
}

function statusColor(s) {
  if (s === 'in_transit') return '#c8e870'
  if (s === 'delayed')    return '#e05050'
  return '#e8c070'
}

function formatETA(min) {
  if (!min) return '—'
  return min < 60 ? `${min}m` : `${Math.floor(min / 60)}h ${min % 60}m`
}

// Load Leaflet CSS + JS from CDN then resolve
function loadLeaflet() {
  return new Promise((resolve) => {
    // Already loaded
    if (window.L) { resolve(window.L); return }

    // CSS
    if (!document.getElementById('leaflet-css')) {
      const css = document.createElement('link')
      css.id   = 'leaflet-css'
      css.rel  = 'stylesheet'
      css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(css)
    }

    // JS
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.onload = () => resolve(window.L)
    document.head.appendChild(script)
  })
}

// ─── Sidebar ────────────────────────────────────────────────────────────────
function Sidebar({ locos, selected, onSelect }) {
  return (
    <div className="fmap-sidebar">
      <div className="fmap-sidebar-header">
        <div className="fmap-live-badge">
          <span className="fmap-live-dot" /> LIVE
        </div>
        <div className="fmap-title">Freight Network</div>
      </div>

      <div className="fmap-loco-list">
        {locos.map(loco => (
          <div
            key={loco.id}
            className={`fmap-loco-row${selected === loco.id ? ' fmap-loco-row--active' : ''}`}
            onClick={() => onSelect(loco.id === selected ? null : loco.id)}
          >
            <span className="fmap-loco-dot" style={{ background: statusColor(loco.status) }} />
            <div className="fmap-loco-info">
              <div className="fmap-loco-id">{loco.id}</div>
              <div className="fmap-loco-sub">{loco.cargo} · {loco.speed_kmh} km/h</div>
            </div>
            <span className="fmap-loco-pct" style={{ color: statusColor(loco.status) }}>
              {loco.progress_percent}%
            </span>
          </div>
        ))}
      </div>

      <div className="fmap-ext-links">
        <div className="fmap-ext-label">Reference Maps</div>
        <a href="https://whereismytrain.org.in" target="_blank" rel="noopener noreferrer" className="fmap-ext-btn">
          🚂 Where Is My Train ↗
        </a>
        <a href="https://indiarailinfo.com/atlas" target="_blank" rel="noopener noreferrer" className="fmap-ext-btn">
          🗺 India Rail Atlas ↗
        </a>
      </div>
    </div>
  )
}

// ─── Detail Card ─────────────────────────────────────────────────────────────
function DetailCard({ loco, onClose }) {
  if (!loco) return null
  const color = statusColor(loco.status)
  return (
    <div className="fmap-detail-card">
      <div className="fdc-header">
        <div className="fdc-id" style={{ color }}>{loco.id}</div>
        <button className="fdc-close" onClick={onClose}>✕</button>
      </div>
      <div className="fdc-grid">
        <div className="fdc-field"><div className="fdc-label">Status</div><div className="fdc-value" style={{ color, fontSize: '0.8rem' }}>{loco.status.replace('_', ' ').toUpperCase()}</div></div>
        <div className="fdc-field"><div className="fdc-label">Speed</div><div className="fdc-value">{loco.speed_kmh} km/h</div></div>
        <div className="fdc-field"><div className="fdc-label">Cargo</div><div className="fdc-value" style={{ fontSize: '0.8rem' }}>{loco.cargo}</div></div>
        <div className="fdc-field"><div className="fdc-label">ETA</div><div className="fdc-value" style={{ color }}>{formatETA(loco.eta_minutes)}</div></div>
        <div className="fdc-field" style={{ gridColumn: '1/-1' }}>
          <div className="fdc-label">Route</div>
          <div className="fdc-value" style={{ fontSize: '0.75rem' }}>{loco.origin} → {loco.destination}</div>
        </div>
      </div>
      <div className="fdc-progress-bar">
        <div className="fdc-progress-fill" style={{ width: `${loco.progress_percent}%`, background: color }} />
      </div>
      <div className="fdc-pct">{loco.progress_percent}% of route complete · {loco.cargo_tonnes.toLocaleString()}T</div>
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function FreightMap() {
  const mapDivRef    = useRef()
  const mapRef       = useRef(null)
  const markersRef   = useRef([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  const { locos } = locoData

  const [ormVisible, setOrmVisible] = useState(true)
  const ormLayerRef = useRef(null)

  useEffect(() => {
    let cancelled = false

    loadLeaflet().then(L => {
      if (cancelled || !mapDivRef.current || mapRef.current) return

      const map = L.map(mapDivRef.current, {
        center: [22.5, 84.0],
        zoom: 6,
        zoomControl: true,
      })
      mapRef.current = map

      // ── Base layer: dark CartoDB (looks like atlas background) ──
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap © CARTO',
        subdomains: 'abcd',
        maxZoom: 18,
        opacity: 0.9,
      }).addTo(map)

      // ── OpenRailwayMap overlay (same data as indiarailinfo.com/atlas) ──
      //    Shows actual Indian railway tracks in real-time
      const ormLayer = L.tileLayer('https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png', {
        attribution: '© OpenRailwayMap contributors',
        subdomains: 'abc',
        maxZoom: 18,
        opacity: 0.75,
      })
      ormLayer.addTo(map)
      ormLayerRef.current = ormLayer

      // ── Label overlay (city names on top) ──
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 18,
        opacity: 0.7,
      }).addTo(map)

      // ── Our freight routes + markers ──
      FREIGHT_ROUTES.forEach(route => {
        const loco  = locos.find(l => l.id === route.id)
        const color = loco ? statusColor(loco.status) : '#444'
        const prog  = loco ? loco.progress_percent / 100 : 0

        // Dim full route line
        L.polyline(route.waypoints, {
          color: '#2a2a2a', weight: 4, opacity: 0.8, dashArray: '6 6',
        }).addTo(map)

        // Completed segment (glowing colored line)
        const total   = route.waypoints.length - 1
        const segIdx  = Math.min(Math.floor(prog * total), total - 1)
        const segFrac = prog * total - segIdx
        const [la1, ln1] = route.waypoints[segIdx]
        const [la2, ln2] = route.waypoints[segIdx + 1] ?? route.waypoints[segIdx]
        const endPt = [lerp(la1, la2, segFrac), lerp(ln1, ln2, segFrac)]

        // Glow effect: thick dim + thin bright
        L.polyline([...route.waypoints.slice(0, segIdx + 1), endPt], {
          color, weight: 6, opacity: 0.3,
        }).addTo(map)
        L.polyline([...route.waypoints.slice(0, segIdx + 1), endPt], {
          color, weight: 2.5, opacity: 1,
        }).addTo(map)

        // Loco position marker (train icon)
        const pos = getPositionOnRoute(route.waypoints, loco?.progress_percent ?? 0)

        // Outer pulse ring
        L.circleMarker(pos, {
          radius: 14, fillColor: 'transparent',
          color, weight: 1.5, opacity: 0.5, fillOpacity: 0,
        }).addTo(map)

        // Main dot
        const marker = L.circleMarker(pos, {
          radius: 7, fillColor: color, color: '#080808', weight: 2, fillOpacity: 1,
        }).addTo(map)

        markersRef.current.push({ id: route.id, marker })

        const eta = loco ? formatETA(loco.eta_minutes) : '—'
        marker.bindPopup(`
          <div style="font-family:monospace;font-size:12px;color:#f0ede8;padding:12px;min-width:200px;line-height:1.6;">
            <div style="font-size:16px;font-weight:bold;color:${color};margin-bottom:8px;letter-spacing:0.05em">${route.id}</div>
            <div>Status: <b style="color:${color}">${loco ? loco.status.replace('_',' ').toUpperCase() : '—'}</b></div>
            <div>Speed: <b>${loco?.speed_kmh ?? 0} km/h</b></div>
            <div>Cargo: ${loco?.cargo ?? '—'} · ${(loco?.cargo_tonnes ?? 0).toLocaleString()}T</div>
            <div>Progress: <b style="color:${color}">${loco?.progress_percent ?? 0}%</b></div>
            <div>ETA: <b style="color:#c8e870">${eta}</b></div>
            <div style="margin-top:8px;color:#666;font-size:10px;border-top:1px solid #2a2a2a;padding-top:6px">${loco?.origin ?? ''}<br/>→ ${loco?.destination ?? ''}</div>
          </div>
        `)

        marker.on('click', () => setSelected(prev => prev === route.id ? null : route.id))
      })

      // ── Station dots ──
      Object.values(STATIONS).forEach(st => {
        L.circleMarker([st.lat, st.lng], {
          radius: 4, fillColor: '#e8c070', color: '#080808', weight: 1.5, fillOpacity: 0.9,
        }).addTo(map)
          .bindTooltip(st.name, { direction: 'top', className: 'leaflet-station-label' })
      })

      setLoading(false)
    }).catch(() => {
      if (!cancelled) setError('Failed to load map. Check your internet connection.')
    })

    return () => {
      cancelled = true
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null }
    }
  }, [])

  // Toggle OpenRailwayMap layer
  const toggleORM = () => {
    if (!ormLayerRef.current || !mapRef.current) return
    if (ormVisible) {
      mapRef.current.removeLayer(ormLayerRef.current)
    } else {
      mapRef.current.addLayer(ormLayerRef.current)
    }
    setOrmVisible(v => !v)
  }

  const selectedLoco = locos.find(l => l.id === selected)

  return (
    <div className="freight-map-root">
      <Sidebar locos={locos} selected={selected} onSelect={setSelected} />

      <div className="fmap-map-panel" ref={mapDivRef}>
        {loading && (
          <div className="map-loading">
            <div className="map-loading-spinner" />
            <span>Loading freight map…</span>
          </div>
        )}
        {error && (
          <div className="map-loading" style={{ flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: '1.5rem' }}>⚠️</span>
            <span style={{ color: 'var(--danger)' }}>{error}</span>
          </div>
        )}

        {/* Railway track toggle */}
        {!loading && !error && (
          <button
            className={`orm-toggle-btn ${ormVisible ? 'orm-toggle-btn--on' : ''}`}
            onClick={toggleORM}
            title="Toggle OpenRailwayMap track overlay"
          >
            🛤 {ormVisible ? 'Rail Tracks ON' : 'Rail Tracks OFF'}
          </button>
        )}
      </div>

      {selectedLoco && <DetailCard loco={selectedLoco} onClose={() => setSelected(null)} />}
    </div>
  )
}
