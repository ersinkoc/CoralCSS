/**
 * useTheme Hook and ThemeProvider
 *
 * React context for managing CoralCSS themes.
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

export type ThemeName =
  | 'coral'
  | 'slate'
  | 'rose'
  | 'emerald'
  | 'violet'
  | 'amber'
  | 'ocean'
  | 'crimson'
  | 'teal'
  | 'indigo'
  | 'lime'
  | 'fuchsia'

export type UIStyle =
  | 'coral'
  | 'material'
  | 'bootstrap'
  | 'minimal'
  | 'brutalist'
  | 'neumorphism'
  | 'glass'

export interface ThemeConfig {
  theme: ThemeName
  darkMode: boolean
  uiStyle: UIStyle
}

interface ThemeContextValue {
  theme: ThemeName
  darkMode: boolean
  uiStyle: UIStyle
  setTheme: (theme: ThemeName) => void
  setDarkMode: (dark: boolean) => void
  toggleDarkMode: () => void
  setUIStyle: (style: UIStyle) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: ThemeName
  defaultDarkMode?: boolean
  defaultUIStyle?: UIStyle
  storageKey?: string
}

/**
 * Theme Provider Component
 *
 * @example
 * ```tsx
 * import { ThemeProvider } from '@coral-css/react'
 *
 * function App() {
 *   return (
 *     <ThemeProvider defaultTheme="coral" defaultDarkMode={false}>
 *       <MyApp />
 *     </ThemeProvider>
 *   )
 * }
 * ```
 */
export function ThemeProvider({
  children,
  defaultTheme = 'coral',
  defaultDarkMode = false,
  defaultUIStyle = 'coral',
  storageKey = 'coralcss-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeName>(defaultTheme)
  const [darkMode, setDarkModeState] = useState(defaultDarkMode)
  const [uiStyle, setUIStyleState] = useState<UIStyle>(defaultUIStyle)

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<ThemeConfig>
        if (parsed.theme) setThemeState(parsed.theme)
        if (typeof parsed.darkMode === 'boolean') setDarkModeState(parsed.darkMode)
        if (parsed.uiStyle) setUIStyleState(parsed.uiStyle)
      }
    } catch {
      // Ignore storage errors
    }
  }, [storageKey])

  // Apply theme classes to document
  useEffect(() => {
    if (typeof document === 'undefined') return

    const root = document.documentElement

    // Remove old theme classes
    const themeClasses = Array.from(root.classList).filter(
      (c) => c.startsWith('theme-') || c.startsWith('ui-')
    )
    themeClasses.forEach((c) => root.classList.remove(c))

    // Apply new theme
    root.classList.add(`theme-${theme}`)
    root.classList.add(`ui-${uiStyle}`)

    // Dark mode
    if (darkMode) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme, darkMode, uiStyle])

  // Save to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ theme, darkMode, uiStyle })
      )
    } catch {
      // Ignore storage errors
    }
  }, [theme, darkMode, uiStyle, storageKey])

  const setTheme = useCallback((newTheme: ThemeName) => {
    setThemeState(newTheme)
  }, [])

  const setDarkMode = useCallback((dark: boolean) => {
    setDarkModeState(dark)
  }, [])

  const toggleDarkMode = useCallback(() => {
    setDarkModeState((prev) => !prev)
  }, [])

  const setUIStyle = useCallback((style: UIStyle) => {
    setUIStyleState(style)
  }, [])

  const value: ThemeContextValue = {
    theme,
    darkMode,
    uiStyle,
    setTheme,
    setDarkMode,
    toggleDarkMode,
    setUIStyle,
  }

  return React.createElement(ThemeContext.Provider, { value }, children)
}

/**
 * Hook to access theme context
 *
 * @example
 * ```tsx
 * import { useTheme } from '@coral-css/react'
 *
 * function ThemeToggle() {
 *   const { darkMode, toggleDarkMode, theme, setTheme } = useTheme()
 *
 *   return (
 *     <button onClick={toggleDarkMode}>
 *       {darkMode ? 'Light' : 'Dark'} Mode
 *     </button>
 *   )
 * }
 * ```
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export default useTheme
