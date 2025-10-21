import { useState } from 'react'
import './TodoList.css'

export interface Todo {
  id: number
  text: string
  completed: boolean
  startTime: Date
}

interface TodoListProps {
  onClose: () => void
  todos: Todo[]
  onAddTodo: (text: string) => void
  onToggleTodo: (id: number) => void
  onDeleteTodo: (id: number) => void
}

function TodoList({ onClose, todos, onAddTodo, onToggleTodo, onDeleteTodo }: TodoListProps) {
  const [inputValue, setInputValue] = useState('')

  const addTodo = () => {
    if (inputValue.trim()) {
      onAddTodo(inputValue)
      setInputValue('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  return (
    <div className="todo-list">
      <div className="todo-header">
        <h2>Study Tasks</h2>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="todo-input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new task..."
          className="todo-input"
        />
        <button onClick={addTodo} className="add-btn">Add</button>
      </div>

      <div className="todos">
        {todos.length === 0 ? (
          <p className="empty-state">No tasks yet. Add one to get started!</p>
        ) : (
          todos.map(todo => (
            <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggleTodo(todo.id)}
                className="todo-checkbox"
              />
              <span className="todo-text">{todo.text}</span>
              <button onClick={() => onDeleteTodo(todo.id)} className="delete-btn">×</button>
            </div>
          ))
        )}
      </div>

      {todos.length > 0 && (
        <div className="todo-stats">
          {todos.filter(t => !t.completed).length} of {todos.length} tasks remaining
        </div>
      )}
    </div>
  )
}

export default TodoList
