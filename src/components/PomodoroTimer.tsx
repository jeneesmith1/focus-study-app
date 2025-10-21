import { useState, useEffect, useRef } from 'react'
import './PomodoroTimer.css'

interface PomodoroTimerProps {
  onSessionTimeUpdate?: (totalMinutes: number) => void
}

function PomodoroTimer({ onSessionTimeUpdate }: PomodoroTimerProps) {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [mode, setMode] = useState<'work' | 'break'>('work')
  const [totalSessionSeconds, setTotalSessionSeconds] = useState(0)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        // Increment total session time
        setTotalSessionSeconds(prev => {
          const newTotal = prev + 1
          if (onSessionTimeUpdate) {
            onSessionTimeUpdate(Math.floor(newTotal / 60))
          }
          return newTotal
        })

        if (seconds === 0) {
          if (minutes === 0) {
            // Timer completed
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSx+zPDThjMHGmS56+OZTAsMT6Ln8LJnHgU5kdXxxHUpBSN0xu7ZjT0JFF608OyjVBELRJzd8bllHwU0f8vv1YU0BxlgsOfilUsTDEym4/C0aR8GM4/N76pZFApCnN/xwWsiBTGDzu3WizoIFl2v5+OPOAsWXK/n45E7ChVbrOXjlUQOF2Cz6OKYRg4WXrDn4pJECxdfs+nilUQOF2Gy6OKZRg4XYLLo4pdGDhZesOfilUsLF16w5+KURAwWXrDn4pNEDBdesOfklUsLFl604pVGDBZesOfilUYOF2Gy6OKZRg4WXrDn4pJDCxdes+jilUYOFl6w5+KTRAoXXrPo4pVFDBdfs+jilUQOF2Gz6OKYRg4WXrDn4pJEDBdesOfilUsLF16w5+KURAwWXrDn4pNEDBdesOfklUsLFl6w5+KURAwWXrDn4pJEDBZesOfikUYOFl6w5+KSRAwWXrDn4pNEDBdesOfilUsLF16w5+KTRAoXXrPo4pVFDBdfs+jilUQOF2Gz6OKYRg4WXrDn4pJEDBdesOfilUYOFl6w5+KSRAwWXrDn4pNEDBdesOfklUsLFl6w5+KTRAoXXrPo4pVFDBdfs+jilUQOF2Gz6OKYRg4WXrDn4pJEDBdesOfilUYOFl6w5+KSRAwWXrDn4pNEDBdesOfilUsLFl6w5+KTRAoXXrPo4pVFDBdfs+jilUQOF2Gz6OKYRg4WXrDn4pJEDBdesOfilUYOFl6w5+KSRAwWXrDn4pNEDBdesOfilUsLFl6w5+KSRAwWXrDn4pJEDBZesOfikUYOFl6w5+KURAwWXrDn4pFHDBdesOfilUsLFl6w5+KSRAwWXrDn4pJEDBZesOfikUYOFl6w5+KURAwWXrDn4pFHDBdesOfilUsLFl6w5+KSRAwWXrDn4pFHDBdesOfilUsLFl6w5+KSRAwWXrDn4pFGDBZesOfilUsLFl6w5+KSRAwWXrDn4pFGDBZesOfilUsLFl6w5+KSRAwWXrDn4pJEDBZesOfikUYOFl6w5+KURAwWXrDn4pFHDBdesOfilUsLFl6w5+KSRAwWXrDn4pFHDBdesOfilUsLFl6w5+KSRAwWXrDn4pFGDBZesOfilUsLFl6w5+KURAwWXrDn4pFHDBdesOfilUsLFl6w5+KSRAwWXrDn4pFGDBZesOfilUsLFl6w5+KSRAwWXrDn4pJEDBZesOfikUYOFl6w5+KURAwWXrDn4pFHDBdesOfilUsLFl6w5+KSRAwWXrDn4pFGDBZesOfilUsLFl6w5+KSRAwWXrDn4pFGDBZesOfikUYOFl6w5+KURAwWXrDn4pFHDBdesOfilUsLFl6w5+KSRAwWXrDn4pFGDBZesOfikUYOFl6w5+KURAwWXrDn4pFHDBdesOfilUsLFl6w5+KSRAwWXrDn4pFGDBZesOfikUYOFl6w5+KURAwWXrDn4pFHDBdesOfilUsLFl6w5+KSRAwWXrDn4pFGDBZesOfikUYOFl6w5+KURAwWXrDn4pFHDBdesOfilUsLFl6w5+KSRAwWXrDn')
            audio.play().catch(() => {}) // Silent notification

            setIsActive(false)
            if (mode === 'work') {
              setMode('break')
              setMinutes(5)
              setSeconds(0)
            } else {
              setMode('work')
              setMinutes(25)
              setSeconds(0)
            }
          } else {
            setMinutes(minutes - 1)
            setSeconds(59)
          }
        } else {
          setSeconds(seconds - 1)
        }
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive, minutes, seconds, mode, onSessionTimeUpdate])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    if (mode === 'work') {
      setMinutes(25)
    } else {
      setMinutes(5)
    }
    setSeconds(0)
  }

  const switchMode = (newMode: 'work' | 'break') => {
    setIsActive(false)
    setMode(newMode)
    if (newMode === 'work') {
      setMinutes(25)
    } else {
      setMinutes(5)
    }
    setSeconds(0)
  }

  return (
    <div className="pomodoro-timer">
      <div className="timer-header">
        <select className="timer-dropdown">
          <option>Personal</option>
          <option>Work</option>
          <option>Study</option>
        </select>
        <button className="minimize-btn">−</button>
      </div>

      <div className="timer-display">
        <div className="time">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </div>

      <div className="timer-actions">
        <button
          onClick={toggleTimer}
          className="action-btn pause-btn"
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="action-btn icon-btn" onClick={resetTimer}>⟲</button>
      </div>

      <div className="timer-tabs">
        <button
          className={`tab ${mode === 'work' ? 'active' : ''}`}
          onClick={() => switchMode('work')}
        >
          Pomodoro
        </button>
        <button
          className={`tab ${mode === 'break' ? 'active' : ''}`}
          onClick={() => switchMode('break')}
        >
          Short Break
        </button>
        <button className="tab">Long Break</button>
        <button className="settings-btn">⚙</button>
      </div>
    </div>
  )
}

export default PomodoroTimer
