import { useRef, useState } from 'react'

const CATEGORIES = [
  { label: 'All',          icon: '◈', id: 'all'       },
  { label: 'Electric',     icon: '⚡', id: 'electric'  },
  { label: 'Diesel',       icon: '🔥', id: 'diesel'    },
  { label: 'High Speed',   icon: '◀◀', id: 'highspeed' },
  { label: 'Coal Freight', icon: '⬟', id: 'coal'      },
  { label: 'Active Now',   icon: '●', id: 'active'    },
]

export default function CategoryBar({ activeCategory, onSelect }) {
  const barRef = useRef()

  return (
    <div className="category-bar" ref={barRef}>
      <div className="category-bar-inner">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`cat-btn ${activeCategory === cat.id ? 'cat-btn--active' : ''}`}
            onClick={() => onSelect(cat.id)}
          >
            <span className="cat-icon">{cat.icon}</span>
            <span className="cat-label">{cat.label}</span>
            <span className="cat-underline" />
          </button>
        ))}
      </div>
    </div>
  )
}
