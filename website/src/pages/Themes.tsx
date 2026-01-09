import { useState } from 'react'
import { ThemePalette } from '../components/ThemeSwitcher'

// Theme presets with their CSS variable values
const themePresets = [
  { name: 'coral', label: 'Coral', primary: '12 76% 61%', accent: '173 58% 39%' },
  { name: 'slate', label: 'Slate', primary: '215 20% 65%', accent: '215 25% 27%' },
  { name: 'rose', label: 'Rose', primary: '346 77% 49%', accent: '346 77% 39%' },
  { name: 'emerald', label: 'Emerald', primary: '160 84% 39%', accent: '158 64% 52%' },
  { name: 'violet', label: 'Violet', primary: '262 83% 58%', accent: '263 70% 50%' },
  { name: 'amber', label: 'Amber', primary: '38 92% 50%', accent: '32 95% 44%' },
  { name: 'ocean', label: 'Ocean', primary: '199 89% 48%', accent: '200 98% 39%' },
  { name: 'crimson', label: 'Crimson', primary: '348 83% 47%', accent: '350 80% 40%' },
  { name: 'teal', label: 'Teal', primary: '174 72% 40%', accent: '172 66% 50%' },
  { name: 'indigo', label: 'Indigo', primary: '226 70% 55%', accent: '224 76% 48%' },
  { name: 'lime', label: 'Lime', primary: '82 85% 45%', accent: '84 85% 35%' },
  { name: 'fuchsia', label: 'Fuchsia', primary: '292 84% 61%', accent: '295 85% 53%' },
]

// CSS variable categories
const cssVariableGroups = [
  {
    name: 'Base Colors',
    description: 'Background and foreground colors',
    variables: [
      { name: '--background', label: 'Background', defaultLight: '0 0% 100%', defaultDark: '0 0% 7%' },
      { name: '--foreground', label: 'Foreground', defaultLight: '0 0% 3.9%', defaultDark: '0 0% 98%' },
    ]
  },
  {
    name: 'Brand Colors',
    description: 'Primary brand and accent colors',
    variables: [
      { name: '--primary', label: 'Primary', defaultLight: '12 76% 61%', defaultDark: '12 76% 61%' },
      { name: '--primary-foreground', label: 'Primary Text', defaultLight: '0 0% 98%', defaultDark: '0 0% 98%' },
      { name: '--accent', label: 'Accent', defaultLight: '12 6% 15%', defaultDark: '0 0% 14.9%' },
      { name: '--accent-foreground', label: 'Accent Text', defaultLight: '0 0% 98%', defaultDark: '0 0% 98%' },
    ]
  },
  {
    name: 'UI Colors',
    description: 'Card, muted, and border colors',
    variables: [
      { name: '--card', label: 'Card', defaultLight: '0 0% 100%', defaultDark: '0 0% 7%' },
      { name: '--card-foreground', label: 'Card Text', defaultLight: '0 0% 3.9%', defaultDark: '0 0% 98%' },
      { name: '--muted', label: 'Muted', defaultLight: '0 0% 96.1%', defaultDark: '0 0% 14.9%' },
      { name: '--muted-foreground', label: 'Muted Text', defaultLight: '0 0% 45.1%', defaultDark: '0 0% 63.9%' },
      { name: '--border', label: 'Border', defaultLight: '0 0% 89.8%', defaultDark: '0 0% 14.9%' },
    ]
  },
  {
    name: 'Status Colors',
    description: 'Success, warning, error, and info colors',
    variables: [
      { name: '--success', label: 'Success', defaultLight: '142 76% 36%', defaultDark: '142 70% 45%' },
      { name: '--warning', label: 'Warning', defaultLight: '38 92% 50%', defaultDark: '45 93% 47%' },
      { name: '--destructive', label: 'Destructive', defaultLight: '0 84% 60%', defaultDark: '0 62% 50%' },
      { name: '--info', label: 'Info', defaultLight: '199 89% 48%', defaultDark: '200 98% 39%' },
    ]
  },
]

function Themes() {
  const [copySuccess, setCopySuccess] = useState(false)
  const [previewMode, setPreviewMode] = useState<'light' | 'dark' | 'both'>('both')

  // Generate CSS code for export
  const generateCSS = () => {
    return `:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --primary: 12 76% 61%;
  --primary-foreground: 0 0% 98%;
  --muted: 0 0% 96.1%;
  --muted-foreground: 0 0% 45.1%;
  --border: 0 0% 89.8%;
}

.dark {
  --background: 0 0% 7%;
  --foreground: 0 0% 98%;
  --primary: 12 76% 61%;
  --primary-foreground: 0 0% 98%;
  --muted: 0 0% 14.9%;
  --muted-foreground: 0 0% 63.9%;
  --border: 0 0% 14.9%;
}`
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateCSS())
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch {
      console.error('Failed to copy')
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-muted/50 via-background to-primary/5" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/40 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-primary/20 text-primary text-sm font-medium mb-6 shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              {themePresets.length} Color Themes
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
              Beautiful <span className="gradient-text">Themes</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Choose from carefully crafted color palettes or customize your own.
              All themes include light and dark mode variants with WCAG compliant contrast.
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(var(--success))' }}></span>
                <span className="text-muted-foreground">WCAG AA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-primary rounded-full"></span>
                <span className="text-muted-foreground">CSS Variables</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(var(--info))' }}></span>
                <span className="text-muted-foreground">Light & Dark Modes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Theme Selector */}
      <section className="container mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Select a Theme</h2>
          <p className="text-muted-foreground">Click any theme to instantly preview it across the entire site</p>
        </div>
        <ThemePalette />
      </section>

      {/* Live Preview Section */}
      <section className="container mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Live Preview</h2>
            <p className="text-muted-foreground">See how your theme looks with various UI components</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPreviewMode('light')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                previewMode === 'light' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent'
              }`}
            >
              Light
            </button>
            <button
              onClick={() => setPreviewMode('dark')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                previewMode === 'dark' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent'
              }`}
            >
              Dark
            </button>
            <button
              onClick={() => setPreviewMode('both')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                previewMode === 'both' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent'
              }`}
            >
              Both
            </button>
          </div>
        </div>

        <div className={`grid gap-8 ${previewMode === 'both' ? 'lg:grid-cols-2' : ''}`}>
          {/* Light mode preview */}
          {(previewMode === 'light' || previewMode === 'both') && (
            <PreviewCard mode="light" />
          )}

          {/* Dark mode preview */}
          {(previewMode === 'dark' || previewMode === 'both') && (
            <PreviewCard mode="dark" />
          )}
        </div>
      </section>

      {/* Color Palette */}
      <section className="container mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Color Palette</h2>
          <p className="text-muted-foreground">Current theme color values as CSS variables</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cssVariableGroups.map(group => (
            <div key={group.name} className="p-6 bg-card rounded-xl border border-border">
              <h3 className="font-semibold text-foreground mb-2">{group.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{group.description}</p>
              <div className="space-y-3">
                {group.variables.slice(0, 4).map(variable => (
                  <div key={variable.name} className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg border border-border shadow-inner"
                      style={{ backgroundColor: `hsl(var(${variable.name}))` }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{variable.label}</p>
                      <p className="text-xs text-muted-foreground font-mono">{variable.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CSS Variables Reference */}
      <section className="container mb-16">
        <div className="p-8 bg-card rounded-2xl border border-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">CSS Variables</h2>
              <p className="text-muted-foreground">Copy and customize these variables in your CSS</p>
            </div>
            <button
              onClick={copyToClipboard}
              className="btn btn-primary flex items-center gap-2"
            >
              {copySuccess ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy CSS
                </>
              )}
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Light mode */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0z" />
                </svg>
                Light Mode
              </h3>
              <pre className="p-4 bg-secondary/50 rounded-xl text-sm font-mono text-muted-foreground overflow-x-auto border border-border/50">
{`:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 0 0% 3.9%;
  --primary: 12 76% 61%;
  --primary-foreground: 0 0% 98%;
  --secondary: 0 0% 96.1%;
  --secondary-foreground: 0 0% 9%;
  --muted: 0 0% 96.1%;
  --muted-foreground: 0 0% 45.1%;
  --accent: 12 6% 15%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 98%;
  --border: 0 0% 89.8%;
  --ring: 12 76% 61%;
  --radius: 0.5rem;
}`}
              </pre>
            </div>

            {/* Dark mode */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" />
                </svg>
                Dark Mode
              </h3>
              <pre className="p-4 bg-secondary/50 rounded-xl text-sm font-mono text-muted-foreground overflow-x-auto border border-border/50">
{`.dark {
  --background: 0 0% 7%;
  --foreground: 0 0% 98%;
  --card: 0 0% 7%;
  --card-foreground: 0 0% 98%;
  --primary: 12 76% 61%;
  --primary-foreground: 0 0% 98%;
  --secondary: 0 0% 14.9%;
  --secondary-foreground: 0 0% 98%;
  --muted: 0 0% 14.9%;
  --muted-foreground: 0 0% 63.9%;
  --accent: 0 0% 14.9%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 62% 50%;
  --destructive-foreground: 0 0% 98%;
  --border: 0 0% 14.9%;
  --ring: 12 76% 61%;
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Guide */}
      <section className="container mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">How to Use</h2>
          <p className="text-muted-foreground">Implement theming in your project</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-card rounded-xl border border-border">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-primary text-lg font-bold">1</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Add CSS Variables</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Copy the CSS variables above and add them to your stylesheet or CoralCSS config.
            </p>
            <pre className="p-3 bg-muted rounded-lg text-xs font-mono text-muted-foreground overflow-x-auto">
{`// coral.config.ts
export default {
  theme: {
    colors: {
      primary: 'hsl(var(--primary))'
    }
  }
}`}
            </pre>
          </div>

          <div className="p-6 bg-card rounded-xl border border-border">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-primary text-lg font-bold">2</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Toggle Dark Mode</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Add the 'dark' class to enable dark mode, or use media query strategy.
            </p>
            <pre className="p-3 bg-muted rounded-lg text-xs font-mono text-muted-foreground overflow-x-auto">
{`// Toggle dark mode
document.documentElement
  .classList.toggle('dark')

// Or use media strategy
darkMode: 'media'`}
            </pre>
          </div>

          <div className="p-6 bg-card rounded-xl border border-border">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-primary text-lg font-bold">3</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Use in Classes</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Reference theme colors using utility classes throughout your markup.
            </p>
            <pre className="p-3 bg-muted rounded-lg text-xs font-mono text-muted-foreground overflow-x-auto">
{`<!-- Use theme colors -->
<div class="bg-primary">
  <p class="text-primary-foreground">
    Themed content
  </p>
</div>`}
            </pre>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 section-dark">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Create Your Perfect Theme
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Every theme is designed with accessibility in mind and works perfectly
            with all CoralCSS components.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="/docs" className="btn btn-primary px-8 py-3">
              Get Started
              <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a href="/components" className="btn btn-outline px-8 py-3">
              View Components
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

function PreviewCard({ mode }: { mode: 'light' | 'dark' }) {
  const isDark = mode === 'dark'

  // Fully isolated color scheme - primary uses CSS variable for theme support
  const colors = isDark ? {
    bg: '#121212',
    cardBg: '#1a1a1a',
    border: '#262626',
    borderLight: '#363636',
    text: '#ffffff',
    textMuted: '#9ca3af',
    textSubtle: '#6b7280',
    inputBg: '#1a1a1a',
    secondaryBg: '#262626',
    // Primary uses CSS variable to match selected theme
    primary: 'hsl(var(--primary))',
    primaryBg: 'hsl(var(--primary) / 0.2)',
    successBg: 'rgba(34, 197, 94, 0.2)',
    successText: '#4ade80',
    warningBg: 'rgba(234, 179, 8, 0.2)',
    warningText: '#facc15',
    errorBg: 'rgba(239, 68, 68, 0.2)',
    errorText: '#f87171',
  } : {
    bg: '#ffffff',
    cardBg: '#f9fafb',
    border: '#e5e7eb',
    borderLight: '#d1d5db',
    text: '#111827',
    textMuted: '#6b7280',
    textSubtle: '#9ca3af',
    inputBg: '#ffffff',
    secondaryBg: '#f3f4f6',
    // Primary uses CSS variable to match selected theme
    primary: 'hsl(var(--primary))',
    primaryBg: 'hsl(var(--primary) / 0.1)',
    successBg: '#dcfce7',
    successText: '#16a34a',
    warningBg: '#fef9c3',
    warningText: '#ca8a04',
    errorBg: '#fee2e2',
    errorText: '#dc2626',
  }

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}` }}
    >
      {/* Header */}
      <div
        className="p-4 flex items-center justify-between"
        style={{ borderBottom: `1px solid ${colors.border}` }}
      >
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(239, 68, 68, 0.8)' }} />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(234, 179, 8, 0.8)' }} />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(34, 197, 94, 0.8)' }} />
          </div>
          <span className="text-sm font-medium" style={{ color: colors.text }}>
            {mode === 'light' ? 'Light Mode' : 'Dark Mode'}
          </span>
        </div>
        <div
          className="px-2 py-1 rounded text-xs font-mono"
          style={{ backgroundColor: colors.secondaryBg, color: colors.textMuted }}
        >
          {mode}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Buttons */}
        <div>
          <p className="text-sm font-medium mb-3" style={{ color: colors.textMuted }}>Buttons</p>
          <div className="flex flex-wrap gap-2">
            <button
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{ backgroundColor: colors.primary, color: '#ffffff' }}
            >
              Primary
            </button>
            <button
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{ backgroundColor: colors.secondaryBg, color: colors.text }}
            >
              Secondary
            </button>
            <button
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{ border: `1px solid ${colors.borderLight}`, color: colors.text, backgroundColor: 'transparent' }}
            >
              Outline
            </button>
            <button
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{ color: colors.text, backgroundColor: 'transparent' }}
            >
              Ghost
            </button>
          </div>
        </div>

        {/* Badges */}
        <div>
          <p className="text-sm font-medium mb-3" style={{ color: colors.textMuted }}>Badges</p>
          <div className="flex flex-wrap gap-2">
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-medium"
              style={{ backgroundColor: colors.primaryBg, color: colors.primary }}
            >
              Primary
            </span>
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-medium"
              style={{ backgroundColor: colors.successBg, color: colors.successText }}
            >
              Success
            </span>
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-medium"
              style={{ backgroundColor: colors.warningBg, color: colors.warningText }}
            >
              Warning
            </span>
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-medium"
              style={{ backgroundColor: colors.errorBg, color: colors.errorText }}
            >
              Error
            </span>
          </div>
        </div>

        {/* Card */}
        <div
          className="p-4 rounded-lg"
          style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.border}` }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-medium"
              style={{ backgroundColor: colors.primary, color: '#ffffff' }}
            >
              JD
            </div>
            <div>
              <p className="font-medium" style={{ color: colors.text }}>John Doe</p>
              <p className="text-sm" style={{ color: colors.textMuted }}>Product Designer</p>
            </div>
          </div>
          <p className="text-sm" style={{ color: colors.textMuted }}>
            "CoralCSS has transformed how we build interfaces. The theming system is incredible!"
          </p>
        </div>

        {/* Progress */}
        <div>
          <p className="text-sm font-medium mb-3" style={{ color: colors.textMuted }}>Progress</p>
          <div
            className="h-2 rounded-full overflow-hidden"
            style={{ backgroundColor: colors.secondaryBg }}
          >
            <div
              className="h-full w-3/4 rounded-full"
              style={{ backgroundColor: colors.primary }}
            />
          </div>
        </div>

        {/* Input */}
        <div>
          <p className="text-sm font-medium mb-3" style={{ color: colors.textMuted }}>Form Input</p>
          <input
            type="text"
            placeholder="Enter your email..."
            className="w-full px-4 py-2 rounded-lg outline-none transition-shadow"
            style={{
              backgroundColor: colors.inputBg,
              border: `1px solid ${colors.borderLight}`,
              color: colors.text,
            }}
          />
        </div>

        {/* Alert */}
        <div
          className="p-4 rounded-lg"
          style={{
            backgroundColor: colors.primaryBg,
            border: `1px solid hsl(var(--primary) / ${isDark ? '0.3' : '0.2'})`
          }}
        >
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
              style={{ color: colors.primary }}
            >
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-medium" style={{ color: colors.primary }}>Theme Active</p>
              <p className="text-sm" style={{ color: colors.textMuted }}>
                This preview shows how components appear in {mode} mode.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Themes
