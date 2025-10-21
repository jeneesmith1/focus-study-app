import { useState } from 'react'
import PomodoroTimer from './components/PomodoroTimer'
import ShuffleSpaces from './components/ShuffleSpaces'
import BottomToolbar from './components/BottomToolbar'
import TodoList, { Todo } from './components/TodoList'
import DayCalendar from './components/DayCalendar'
import MusicPlayer from './components/MusicPlayer'
import './App.css'

function App() {
  const [showTodoList, setShowTodoList] = useState(true)
  const [showCalendar, setShowCalendar] = useState(false)
  const [showMusic, setShowMusic] = useState(false)
  const [currentBackground, setCurrentBackground] = useState('car')
  const [totalSessionMinutes, setTotalSessionMinutes] = useState(0)
  const [todos, setTodos] = useState<Todo[]>([])

  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
      startTime: new Date()
    }
    setTodos([...todos, newTodo])
  }

  const handleToggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleUpdateTodoTime = (id: number, newTime: Date) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, startTime: newTime } : todo
    ))
  }

  const getBackgroundImage = (name: string) => {
    const backgrounds: { [key: string]: string } = {
      flower: '/photo-backgrounds/flower.jpeg',
      graph: '/photo-backgrounds/graph.JPG',
      car: '/photo-backgrounds/car.JPG',
      beach: '/photo-backgrounds/beach.jpg',
      diamond: '/photo-backgrounds/diamond.jpeg',
      phone: '/photo-backgrounds/phone.jpeg',
      cafe: '/photo-backgrounds/cafe.jpeg',
      mountain: '/photo-backgrounds/mountain.jpeg'
    }
    return backgrounds[name] || backgrounds.flower
  }

  return (
    <div className="app">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${getBackgroundImage(currentBackground)})` }}
      />

      <div className="content-container">
        <div style={{ position: 'relative' }}>
          <ShuffleSpaces onBackgroundChange={setCurrentBackground} />
          {showCalendar && (
            <DayCalendar
              onClose={() => setShowCalendar(false)}
              todos={todos}
              onUpdateTodoTime={handleUpdateTodoTime}
            />
          )}
        </div>
        <div style={{ position: 'relative' }}>
          <PomodoroTimer onSessionTimeUpdate={setTotalSessionMinutes} />
          {showTodoList && (
            <TodoList
              onClose={() => setShowTodoList(false)}
              todos={todos}
              onAddTodo={handleAddTodo}
              onToggleTodo={handleToggleTodo}
              onDeleteTodo={handleDeleteTodo}
            />
          )}
        </div>
      </div>

      {showMusic && <MusicPlayer onClose={() => setShowMusic(false)} />}

      <BottomToolbar
        onToggleTodo={() => setShowTodoList(!showTodoList)}
        onToggleCalendar={() => setShowCalendar(!showCalendar)}
        onToggleMusic={() => setShowMusic(!showMusic)}
        totalSessionMinutes={totalSessionMinutes}
      />
    </div>
  )
}

export default App
