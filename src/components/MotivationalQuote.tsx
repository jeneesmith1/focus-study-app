import { useState, useEffect } from 'react'
import './MotivationalQuote.css'

const quotes = [
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain"
  },
  {
    text: "Success is the sum of small efforts repeated day in and day out.",
    author: "Robert Collier"
  },
  {
    text: "Focus on being productive instead of busy.",
    author: "Tim Ferriss"
  },
  {
    text: "You don't have to be great to start, but you have to start to be great.",
    author: "Zig Ziglar"
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    text: "The future depends on what you do today.",
    author: "Mahatma Gandhi"
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson"
  },
  {
    text: "The expert in anything was once a beginner.",
    author: "Helen Hayes"
  },
  {
    text: "Your limitation—it's only your imagination.",
    author: "Unknown"
  },
  {
    text: "Study while others are sleeping; work while others are loafing.",
    author: "William A. Ward"
  },
  {
    text: "Education is the most powerful weapon you can use to change the world.",
    author: "Nelson Mandela"
  }
]

function MotivationalQuote() {
  const [currentQuote, setCurrentQuote] = useState(0)

  useEffect(() => {
    // Change quote every 30 seconds
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % quotes.length)
  }

  const prevQuote = () => {
    setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length)
  }

  return (
    <div className="motivational-quote">
      <button onClick={prevQuote} className="quote-nav prev">‹</button>

      <div className="quote-content">
        <p className="quote-text">"{quotes[currentQuote].text}"</p>
        <p className="quote-author">— {quotes[currentQuote].author}</p>
      </div>

      <button onClick={nextQuote} className="quote-nav next">›</button>
    </div>
  )
}

export default MotivationalQuote
