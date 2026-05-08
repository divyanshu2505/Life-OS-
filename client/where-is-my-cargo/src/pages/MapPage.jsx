import { Suspense, lazy } from 'react'

const FreightMap = lazy(() => import('../components/FreightMap'))

export default function MapPage() {
  return (
    <div className="page-map">
      <div className="map-page-header">
        <div className="map-header-left">
          <div className="map-eyebrow">
            <span className="map-live-dot-badge">
              <span className="map-live-pulse" /> LIVE
            </span>
            Indian Freight Rail Network
          </div>
          <h1 className="map-title">Dedicated <em>Freight Map</em></h1>
          <p className="map-subtitle">
            Real-time locomotive positions on Indian Railway freight corridors.
            Click any marker for full details.
          </p>
        </div>
        <div className="map-header-right">
          <a
            href="https://whereismytrain.org.in"
            target="_blank"
            rel="noopener noreferrer"
            className="map-ext-link"
          >
            🚂 Where Is My Train ↗
          </a>
          <a
            href="https://indiarailinfo.com/atlas"
            target="_blank"
            rel="noopener noreferrer"
            className="map-ext-link"
          >
            🗺 India Rail Atlas ↗
          </a>
        </div>
      </div>

      <Suspense fallback={
        <div className="map-loading">
          <div className="map-loading-spinner" />
          <span>Loading freight map…</span>
        </div>
      }>
        <FreightMap />
      </Suspense>

      {/* Legend */}
      <div className="map-legend">
        <div className="legend-title">Legend</div>
        <div className="legend-item"><span className="legend-dot" style={{ background: '#c8e870' }} />In Transit</div>
        <div className="legend-item"><span className="legend-dot" style={{ background: '#e8c070' }} />Halted</div>
        <div className="legend-item"><span className="legend-dot" style={{ background: '#e05050' }} />Delayed</div>
        <div className="legend-sep" />
        <div className="legend-item"><span className="legend-line" style={{ background: '#2a2a2a' }} />Full Route</div>
        <div className="legend-item"><span className="legend-line" style={{ background: '#c8e870' }} />Completed</div>
      </div>
    </div>
  )
}
