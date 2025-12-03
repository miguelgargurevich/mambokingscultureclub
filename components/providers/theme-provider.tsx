'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'minimal' | 'retro'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('minimal')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Get theme from localStorage
    const savedTheme = localStorage.getItem('mambo-theme') as Theme | null
    if (savedTheme && (savedTheme === 'minimal' || savedTheme === 'retro')) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    // Apply theme class to html element
    const root = document.documentElement
    
    if (theme === 'retro') {
      root.classList.add('theme-retro')
      root.classList.remove('theme-minimal')
    } else {
      root.classList.add('theme-minimal')
      root.classList.remove('theme-retro')
    }
    
    // Save to localStorage
    localStorage.setItem('mambo-theme', theme)
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme(prev => prev === 'minimal' ? 'retro' : 'minimal')
  }

  // Always provide context, but use mounted state to prevent hydration mismatch
  const value = {
    theme,
    setTheme,
    toggleTheme,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
