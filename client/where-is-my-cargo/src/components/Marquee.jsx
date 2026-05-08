import locoData from '../data/locos.json'

function statusSymbol(status) {
  if (status === 'in_transit') return '●'
  if (status === 'halted')    return '◐'
  if (status === 'delayed')   return '○'
  return '●'
}

export default function Marquee() {
  const { locos } = locoData
  const items = [...locos, ...locos]

  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        {items.map((loco, i) => (
          <div className="marquee-item" key={i}>
            <span className="marquee-dot" />
            <span className="loco-id-tag">{loco.id}</span>
            <span>{loco.cargo}</span>
            <span>{loco.cargo_tonnes.toLocaleString()}T</span>
            <span>{statusSymbol(loco.status)} {loco.status.replace('_', ' ').toUpperCase()}</span>
            <span>{loco.speed_kmh} km/h</span>
          </div>
        ))}
      </div>
    </div>
  )
}
