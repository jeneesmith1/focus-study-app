import { useState } from 'react'
import './DayCalendar.css'
import { Todo } from './TodoList'

interface DayCalendarProps {
  onClose: () => void
  todos: Todo[]
  onUpdateTodoTime: (id: number, newTime: Date) => void
}

function DayCalendar({ onClose, todos, onUpdateTodoTime }: DayCalendarProps) {
  const [currentDate] = useState(new Date())
  const [draggedTask, setDraggedTask] = useState<number | null>(null)

  // Generate hours from 6 AM to 11 PM
  const hours = Array.from({ length: 18 }, (_, i) => i + 6)

  const formatHour = (hour: number) => {
    if (hour === 0) return '12 am'
    if (hour < 12) return `${hour} am`
    if (hour === 12) return '12 pm'
    return `${hour - 12} pm`
  }

  const formatDate = (date: Date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    return `${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()}`
  }

  const getTasksForHour = (hour: number) => {
    return todos.filter(todo => {
      const taskHour = todo.startTime.getHours()
      return taskHour === hour
    })
  }

  const handleDragStart = (e: React.DragEvent, taskId: number) => {
    setDraggedTask(taskId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, hour: number) => {
    e.preventDefault()
    if (draggedTask !== null) {
      const task = todos.find(t => t.id === draggedTask)
      if (task) {
        const newTime = new Date(task.startTime)
        newTime.setHours(hour, 0, 0, 0)
        onUpdateTodoTime(draggedTask, newTime)
      }
      setDraggedTask(null)
    }
  }

  const handleDragEnd = () => {
    setDraggedTask(null)
  }

  return (
    <div className="day-calendar">
      <div className="calendar-header">
        <div className="calendar-header-left">
          <span className="today-label">today</span>
          <button className="nav-btn">‹</button>
          <button className="nav-btn">›</button>
          <span className="current-date">{formatDate(currentDate)}</span>
        </div>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="hours-container">
        {hours.map((hour) => {
          const tasksAtHour = getTasksForHour(hour)
          return (
            <div
              key={hour}
              className="hour-slot"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, hour)}
            >
              <span className="hour-label">{formatHour(hour)}</span>
              <div className="hour-content">
                <div className="hour-line"></div>
                {tasksAtHour.length > 0 && (
                  <div className="tasks-at-hour">
                    {tasksAtHour.map(task => (
                      <div
                        key={task.id}
                        className={`calendar-task ${draggedTask === task.id ? 'dragging' : ''}`}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task.id)}
                        onDragEnd={handleDragEnd}
                      >
                        <span className="task-icon">📝</span>
                        <span className="task-name">{task.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DayCalendar
