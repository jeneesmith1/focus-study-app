import { useState } from 'react'
import './ShuffleSpaces.css'

const spaces = [
  { emoji: '⛰️', name: 'Mountain', file: 'mountain' },
  { emoji: '🌸', name: 'Cherry Blossom', file: 'flower' },
  { emoji: '📊', name: 'Office', file: 'graph' },
  { emoji: '🚗', name: 'City Drive', file: 'car' },
  { emoji: '📱', name: 'Phone', file: 'phone' },
  { emoji: '🏖️', name: 'Beach', file: 'beach' },
  { emoji: '☕', name: 'Cafe', file: 'cafe' },
  { emoji: '💎', name: 'Crystal', file: 'diamond' }
]

interface ShuffleSpacesProps {
  onBackgroundChange: (background: string) => void
}

function ShuffleSpaces({ onBackgroundChange }: ShuffleSpacesProps) {
  const [currentTime] = useState(new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }))

  return (
    <div className="shuffle-spaces">
      <div className="shuffle-header">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
        </div>
        <div className="current-time">{currentTime}</div>
      </div>

      <div className="shuffle-title">
        <h2>Shuffle Spaces</h2>
        <div className="shuffle-nav">
          <button className="nav-arrow">‹</button>
          <button className="nav-arrow">›</button>
        </div>
      </div>

      <p className="shuffle-subtitle">Click an emoji multiple times for more content</p>

      <div className="spaces-grid">
        {spaces.map((space, index) => (
          <button
            key={index}
            className="space-item"
            onClick={() => onBackgroundChange(space.file)}
          >
            <span className="space-emoji">{space.emoji}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ShuffleSpaces
