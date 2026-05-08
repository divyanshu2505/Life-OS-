function formatETA(min) {
  if (min < 60) return `${min}m`
  return `${Math.floor(min / 60)}h ${min % 60}m`
}

export default function SingleLocoCard({ loco, index }) {
  return (
    <div className="loco-card">
      <div className="card-id-col">
        <div className="card-num">{String(index + 1).padStart(2, '0')}</div>
        <div className="card-loco-id">{loco.id}</div>
      </div>

      <div className="card-route-col">
        <div className="card-route-label">Route</div>
        <div className="card-route-text">
          {loco.origin}<br />
          <span className="card-arrow">↓</span><br />
          {loco.destination}
        </div>
      </div>

      <div className="card-cargo-col">
        <div className="cargo-tag">{loco.cargo}</div>
        <span className="cargo-weight">{loco.cargo_tonnes.toLocaleString()}</span>
        <span className="cargo-unit"> T</span>
      </div>

      <div className="card-status-col">
        <span className={`status-pill ${loco.status}`}>
          {loco.status.replace('_', ' ')}
        </span>
        <span className="card-speed">{loco.speed_kmh} km/h · ETA {formatETA(loco.eta_minutes)}</span>
      </div>
    </div>
  )
}
