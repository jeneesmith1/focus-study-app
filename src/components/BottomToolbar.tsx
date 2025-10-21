import './BottomToolbar.css'

interface BottomToolbarProps {
  onToggleTodo: () => void
  onToggleCalendar: () => void
  totalSessionMinutes: number
  onToggleMusic: () => void
}

function BottomToolbar({ onToggleTodo, onToggleCalendar, totalSessionMinutes, onToggleMusic }: BottomToolbarProps) {
  return (
    <div className="bottom-toolbar">
      <div className="toolbar-left">
        <button className="toolbar-btn active">
          <span className="toolbar-icon">⏱️</span>
        </button>
        <button className="toolbar-btn" onClick={onToggleCalendar}>
          <span className="toolbar-icon">📄</span>
        </button>
      </div>

      <div className="toolbar-center">
        <button className="toolbar-btn time-display">
          <span className="toolbar-icon">⏰</span>
          <span className="time-text">{totalSessionMinutes} min</span>
        </button>
        <button className="toolbar-btn" onClick={onToggleTodo}>
          <span className="toolbar-icon">✏️</span>
        </button>
        <button className="toolbar-btn" onClick={onToggleMusic}>
          <span className="toolbar-icon">🎵</span>
        </button>
        <button className="toolbar-btn add-btn">
          <span className="toolbar-icon">+</span>
        </button>
      </div>
    </div>
  )
}

export default BottomToolbar
