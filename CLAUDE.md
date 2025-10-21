# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Focus Study App - A React + TypeScript application for managing focus and study sessions with Pomodoro technique, task tracking, calming video backgrounds, and motivational quotes.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── App.tsx              # Main application component
├── App.css              # Main application styles
├── main.tsx             # Application entry point
├── index.css            # Global styles
└── components/
    ├── TodoList.tsx           # Task management with add/complete/delete
    ├── PomodoroTimer.tsx      # 25/5 minute work/break timer
    ├── VideoBackground.tsx    # Calming video backgrounds (ocean, forest, mountain, night sky)
    └── MotivationalQuote.tsx  # Rotating inspirational quotes
```

## Architecture

- **Vite**: Build tool and dev server
- **React 18**: UI framework with hooks for state management
- **TypeScript**: Type safety throughout the application
- **Component-based**: Each feature is a self-contained component with its own styles
- **Layout**: Two-panel design with timer on left, todo list on right, video background behind
- **State Management**: Local component state using useState hooks
- **Styling**: CSS modules per component with responsive design
