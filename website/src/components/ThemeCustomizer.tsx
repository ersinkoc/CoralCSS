import { useState, useEffect, useCallback } from 'react'
import { useTheme } from '../context/ThemeContext'

const colorThemes = [
  { id: 'coral', name: 'Coral', primary: '#ff7f50', accent: '#ff6b35' },
  { id: 'slate', name: 'Slate', primary: '#64748b', accent: '#475569' },
  { id: 'rose', name: 'Rose', primary: '#e11d48', accent: '#be123c' },
  { id: 'emerald', name: 'Emerald', primary: '#10b981', accent: '#059669' },
  { id: 'violet', name: 'Violet', primary: '#8b5cf6', accent: '#7c3aed' },
  { id: 'amber', name: 'Amber', primary: '#f59e0b', accent: '#d97706' },
  { id: 'ocean', name: 'Ocean', primary: '#0ea5e9', accent: '#0284c7' },
  { id: 'crimson', name: 'Crimson', primary: '#ef4444', accent: '#dc2626' },
  { id: 'teal', name: 'Teal', primary: '#14b8a6', accent: '#0d9488' },
  { id: 'indigo', name: 'Indigo', primary: '#6366f1', accent: '#4f46e5' },
  { id: 'lime', name: 'Lime', primary: '#84cc16', accent: '#65a30d' },
  { id: 'fuchsia', name: 'Fuchsia', primary: '#e879f9', accent: '#d946ef' },
]

const radiusOptions = [
  { id: 'none', name: 'Sharp', value: '0' },
  { id: 'sm', name: 'Small', value: '0.25rem' },
  { id: 'md', name: 'Medium', value: '0.5rem' },
  { id: 'lg', name: 'Large', value: '0.75rem' },
  { id: 'xl', name: 'Extra', value: '1rem' },
  { id: 'full', name: 'Full', value: '9999px' },
]

export function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeColorTheme, setActiveColorTheme] = useState('coral')
  const [activeRadius, setActiveRadius] = useState('lg')
  const { theme, setTheme } = useTheme()

  // Load saved preferences
  useEffect(() => {
    const savedColor = localStorage.getItem('coral-color-theme')
    const savedRadius = localStorage.getItem('coral-radius')

    if (savedColor) {
      setActiveColorTheme(savedColor)
      applyColorTheme(savedColor)
    }
    if (savedRadius) {
      setActiveRadius(savedRadius)
      applyRadius(savedRadius)
    }
  }, [])

  const applyColorTheme = useCallback((themeId: string) => {
    // Remove all theme classes
    colorThemes.forEach(t => {
      document.documentElement.classList.remove(`theme-${t.id}`)
    })
    // Add new theme class if not default
    if (themeId !== 'coral') {
      document.documentElement.classList.add(`theme-${themeId}`)
    }
    localStorage.setItem('coral-color-theme', themeId)
  }, [])

  const applyRadius = useCallback((radiusId: string) => {
    const radius = radiusOptions.find(r => r.id === radiusId)
    if (radius) {
      document.documentElement.style.setProperty('--coral-radius-base', radius.value)
      // Update all radius variables proportionally
      const base = parseFloat(radius.value) || 0
      document.documentElement.style.setProperty('--coral-radius-sm', `${base * 0.5}rem`)
      document.documentElement.style.setProperty('--coral-radius-md', `${base}rem`)
      document.documentElement.style.setProperty('--coral-radius-lg', `${base * 1.5}rem`)
      document.documentElement.style.setProperty('--coral-radius-xl', `${base * 2}rem`)
    }
    localStorage.setItem('coral-radius', radiusId)
  }, [])

  const handleColorChange = (themeId: string) => {
    setActiveColorTheme(themeId)
    applyColorTheme(themeId)
  }

  const handleRadiusChange = (radiusId: string) => {
    setActiveRadius(radiusId)
    applyRadius(radiusId)
  }

  const resetToDefaults = () => {
    handleColorChange('coral')
    handleRadiusChange('lg')
    setTheme('system')
  }

  return (
    <>
      {/* Floating Tab Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`
          fixed right-0 top-1/2 -translate-y-1/2 z-50
          w-10 h-24 rounded-l-xl
          bg-gradient-to-b from-primary to-primary/80
          text-primary-foreground shadow-lg
          flex flex-col items-center justify-center gap-1
          hover:w-12 transition-all duration-200
          ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}
        `}
        aria-label="Open theme customizer"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
        <span className="text-[10px] font-medium writing-mode-vertical" style={{ writingMode: 'vertical-rl' }}>Theme</span>
      </button>

      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 bg-black/40 backdrop-blur-sm z-50
          transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={() => setIsOpen(false)}
      />

      {/* Panel */}
      <div
        className={`
          fixed right-0 top-0 h-full w-full max-w-md z-50
          bg-card border-l border-border shadow-2xl
          transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          overflow-y-auto
        `}
      >
        {/* Header */}
        <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border p-6 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground">Theme Customizer</h2>
              <p className="text-sm text-muted-foreground mt-1">Personalize your experience</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Mode Section */}
          <section>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Appearance</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'light', icon: '☀️', label: 'Light' },
                { id: 'dark', icon: '🌙', label: 'Dark' },
                { id: 'system', icon: '💻', label: 'System' },
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setTheme(mode.id as 'light' | 'dark' | 'system')}
                  className={`
                    p-4 rounded-xl border-2 transition-all duration-200
                    flex flex-col items-center gap-2
                    ${theme === mode.id
                      ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                      : 'border-border bg-card hover:border-primary/50'
                    }
                  `}
                >
                  <span className="text-2xl">{mode.icon}</span>
                  <span className="text-sm font-medium">{mode.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Color Theme Section */}
          <section>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Color Theme</h3>
            <div className="grid grid-cols-4 gap-3">
              {colorThemes.map((colorTheme) => (
                <button
                  key={colorTheme.id}
                  onClick={() => handleColorChange(colorTheme.id)}
                  className={`
                    group relative aspect-square rounded-xl transition-all duration-200
                    border-2 overflow-hidden
                    ${activeColorTheme === colorTheme.id
                      ? 'border-foreground scale-105 shadow-lg'
                      : 'border-transparent hover:scale-105'
                    }
                  `}
                  title={colorTheme.name}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${colorTheme.primary} 0%, ${colorTheme.accent} 100%)`
                    }}
                  />
                  {activeColorTheme === colorTheme.id && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <svg className="w-6 h-6 text-white drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                  <span className="sr-only">{colorTheme.name}</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              Active: <span className="font-medium text-foreground">{colorThemes.find(t => t.id === activeColorTheme)?.name}</span>
            </p>
          </section>

          {/* Border Radius Section */}
          <section>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Border Radius</h3>
            <div className="grid grid-cols-6 gap-2">
              {radiusOptions.map((radius) => (
                <button
                  key={radius.id}
                  onClick={() => handleRadiusChange(radius.id)}
                  className={`
                    p-3 border-2 transition-all duration-200 flex flex-col items-center gap-2
                    ${activeRadius === radius.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                    }
                  `}
                  style={{ borderRadius: radius.value }}
                >
                  <div
                    className="w-8 h-8 bg-primary/20 border border-primary/30"
                    style={{ borderRadius: radius.value }}
                  />
                  <span className="text-[10px] font-medium text-muted-foreground">{radius.name}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Preview Section */}
          <section>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Preview</h3>
            <div className="p-6 rounded-xl border border-border bg-muted/30 space-y-4">
              <div className="flex gap-3">
                <button data-coral-button data-variant="primary">Primary</button>
                <button data-coral-button data-variant="secondary">Secondary</button>
                <button data-coral-button data-variant="outline">Outline</button>
              </div>
              <div className="flex gap-3">
                <span data-coral-badge>Default</span>
                <span data-coral-badge data-variant="success">Success</span>
                <span data-coral-badge data-variant="warning">Warning</span>
                <span data-coral-badge data-variant="error">Error</span>
              </div>
              <div data-coral-progress data-value="65" className="w-full">
                <div data-coral-progress-bar />
              </div>
            </div>
          </section>

          {/* Reset Button */}
          <div className="pt-4 border-t border-border">
            <button
              onClick={resetToDefaults}
              className="w-full py-3 rounded-xl border-2 border-dashed border-border text-muted-foreground hover:border-destructive hover:text-destructive transition-colors"
            >
              Reset to Defaults
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 p-6 bg-gradient-to-t from-card via-card to-transparent">
          <p className="text-xs text-center text-muted-foreground">
            Settings are saved automatically
          </p>
        </div>
      </div>
    </>
  )
}

export default ThemeCustomizer
