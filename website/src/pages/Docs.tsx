import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const sections = [
  { id: 'installation', label: 'Installation', icon: '📦' },
  { id: 'quick-start', label: 'Quick Start', icon: '⚡' },
  { id: 'utilities', label: 'Utility Classes', icon: '🎨' },
  { id: 'variants', label: 'Variants', icon: '🔀' },
  { id: 'modern-css', label: 'Modern CSS', icon: '✨' },
  { id: 'themes', label: 'Theming', icon: '🎭' },
  { id: 'components', label: 'Components', icon: '🧩' },
  { id: 'plugins', label: 'Plugins', icon: '🔌' },
  { id: 'presets', label: 'Presets', icon: '📋' },
  { id: 'typescript', label: 'TypeScript', icon: '💎' },
]

function CodeBlock({ children, filename, language = 'typescript' }: { children: string; filename?: string; language?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group rounded-xl overflow-hidden border border-border bg-[#0d1117] shadow-lg">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-border/50">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs font-mono text-muted-foreground ml-2">{filename}</span>
          </div>
          <span className="text-xs text-muted-foreground/50">{language}</span>
        </div>
      )}
      <div className="relative">
        <pre className="p-4 overflow-x-auto text-sm font-mono text-gray-300 leading-relaxed">
          {children}
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-200"
          title="Copy to clipboard"
        >
          {copied ? (
            <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}

function Callout({ type = 'info', title, children }: { type?: 'info' | 'warning' | 'success' | 'tip'; title?: string; children: React.ReactNode }) {
  const styles = {
    info: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    warning: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    success: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    tip: 'bg-violet-500/10 border-violet-500/30 text-violet-400',
  }
  const icons = {
    info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    tip: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  }
  return (
    <div className={`p-4 rounded-xl border ${styles[type]} my-4`}>
      <div className="flex gap-3">
        <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icons[type]} />
        </svg>
        <div>
          {title && <p className="font-semibold mb-1">{title}</p>}
          <div className="text-sm opacity-90">{children}</div>
        </div>
      </div>
    </div>
  )
}

function InteractiveDemo({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="my-6 rounded-xl border border-border overflow-hidden">
      <div className="px-4 py-2 bg-muted/50 border-b border-border flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{title}</span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">Live Demo</span>
      </div>
      <div className="p-6 bg-card">{children}</div>
    </div>
  )
}

// Export for potential future use
void InteractiveDemo

function Docs() {
  const [activeSection, setActiveSection] = useState('installation')
  const [searchQuery, setSearchQuery] = useState('')

  // Track scroll position for active section
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => document.getElementById(s.id))
      const scrollPos = window.scrollY + 150

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i]
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-br from-primary/5 via-muted/30 to-accent/5">
        <div className="container py-12">
          <nav data-coral-breadcrumb className="mb-6">
            <Link to="/" data-coral-breadcrumb-item className="hover:text-primary transition-colors">
              Home
            </Link>
            <span data-coral-breadcrumb-separator className="mx-2 text-muted-foreground">/</span>
            <span data-coral-breadcrumb-item data-active className="text-primary">Documentation</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  Documentation
                </h1>
                <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
                  v1.0.0
                </span>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Everything you need to build beautiful interfaces with CoralCSS. From installation to advanced theming.
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 text-xs font-mono text-muted-foreground bg-muted rounded border border-border hidden md:inline">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-3 mt-8">
            {[
              { label: 'Getting Started', href: '#installation', icon: '🚀' },
              { label: 'Components', href: '/components', icon: '🧩' },
              { label: 'Themes', href: '/themes', icon: '🎨' },
              { label: 'GitHub', href: 'https://github.com/coralcss/coralcss', icon: '⭐' },
            ].map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:border-primary/30 hover:bg-primary/5 text-sm font-medium text-foreground transition-all"
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Sidebar Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="lg:sticky lg:top-28">
              {/* Progress indicator */}
              <div className="hidden lg:block mb-6 p-4 rounded-xl bg-card border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground">Reading Progress</span>
                  <span className="text-xs font-semibold text-primary">
                    {Math.round((sections.findIndex(s => s.id === activeSection) + 1) / sections.length * 100)}%
                  </span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300"
                    style={{ width: `${(sections.findIndex(s => s.id === activeSection) + 1) / sections.length * 100}%` }}
                  />
                </div>
              </div>

              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
                Contents
              </p>
              <div className="space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={() => setActiveSection(section.id)}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                      ${activeSection === section.id
                        ? 'bg-primary/10 text-primary shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }
                    `}
                  >
                    <span className={`
                      w-7 h-7 rounded-lg flex items-center justify-center text-sm
                      ${activeSection === section.id ? 'bg-primary/20' : 'bg-muted'}
                    `}>
                      {section.icon}
                    </span>
                    <span>{section.label}</span>
                    {activeSection === section.id && (
                      <svg className="w-4 h-4 ml-auto text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </a>
                ))}
              </div>

              {/* Resources */}
              <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Quick Resources
                </h4>
                <div className="space-y-2 text-sm">
                  <a href="https://github.com/coralcss/coralcss" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub Repository
                  </a>
                  <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    FAQ
                  </a>
                  <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    Discord Community
                  </a>
                </div>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Installation */}
            <section id="installation" className="mb-16 scroll-mt-28">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </span>
                Installation
              </h2>
              <p className="text-muted-foreground mb-6">
                Install CoralCSS using your preferred package manager.
              </p>
              <CodeBlock filename="terminal">{`npm install @coral-css/core
# or
pnpm add @coral-css/core
# or
yarn add @coral-css/core`}</CodeBlock>
            </section>

            {/* Quick Start */}
            <section id="quick-start" className="mb-16 scroll-mt-28">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </span>
                Quick Start
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Vite Plugin</h3>
                  <p className="text-muted-foreground mb-4">
                    The recommended way to use CoralCSS with Vite projects.
                  </p>
                  <CodeBlock filename="vite.config.ts">{`import { defineConfig } from 'vite'
import coral from '@coral-css/core/vite'

export default defineConfig({
  plugins: [
    coral({
      darkMode: 'class',
    }),
  ],
})`}</CodeBlock>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">CDN Usage</h3>
                  <p className="text-muted-foreground mb-4">
                    For quick prototyping or simple projects without a build step.
                  </p>
                  <CodeBlock filename="index.html">{`<script src="https://unpkg.com/@coral-css/core/dist/cdn.iife.js"></script>
<script>
  const coral = window.CoralCSS.getCoralCDN()
</script>`}</CodeBlock>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Programmatic Usage</h3>
                  <p className="text-muted-foreground mb-4">
                    Full control over CSS generation for advanced use cases.
                  </p>
                  <CodeBlock filename="app.ts">{`import { createCoral, coralPreset } from '@coral-css/core'

const coral = createCoral()
coralPreset().forEach(plugin => coral.use(plugin))

const css = coral.generate(['flex', 'items-center', 'p-4', 'bg-coral-500'])
console.log(css)`}</CodeBlock>
                </div>
              </div>
            </section>

            {/* Utility Classes */}
            <section id="utilities" className="mb-16 scroll-mt-28">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </span>
                Utility Classes
              </h2>
              <p className="text-muted-foreground mb-6">
                Comprehensive utility classes for building any design.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Layout',
                    code: `flex, grid, block, inline, hidden
items-center, justify-between, gap-4
container, mx-auto, px-4`
                  },
                  {
                    title: 'Spacing',
                    code: `p-{0-96}, m-{0-96}, gap-{0-96}
px-4, py-2, mt-4, mb-8
-mt-4, -ml-2 (negative)`
                  },
                  {
                    title: 'Sizing',
                    code: `w-{0-96}, h-{0-96}, size-{0-96}
w-full, w-screen, w-1/2, w-auto
min-w-0, max-w-lg, min-h-screen`
                  },
                  {
                    title: 'Typography',
                    code: `text-xs to text-9xl
font-sans, font-serif, font-mono
font-normal, font-medium, font-bold`
                  },
                  {
                    title: 'Colors',
                    code: `bg-{color}-{shade}
text-{color}-{shade}
border-{color}-{shade}
bg-coral-500/50 (opacity)`
                  },
                  {
                    title: 'Effects',
                    code: `shadow-{sm|md|lg|xl|2xl}
opacity-{0-100}
blur-{sm|md|lg|xl}`
                  },
                ].map((item) => (
                  <div key={item.title} className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                    <h3 className="text-sm font-semibold text-primary mb-3">{item.title}</h3>
                    <pre className="text-xs font-mono text-muted-foreground whitespace-pre-wrap">{item.code}</pre>
                  </div>
                ))}
              </div>
            </section>

            {/* Variants */}
            <section id="variants" className="mb-16 scroll-mt-28">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                  </svg>
                </span>
                Variants
              </h2>
              <p className="text-muted-foreground mb-6">
                Apply styles conditionally with pseudo-classes, responsive breakpoints, and more.
              </p>
              <CodeBlock filename="example.html">{`<!-- Pseudo-classes -->
<button class="bg-coral-500 hover:bg-coral-600 focus:ring-2">

<!-- Responsive -->
<div class="text-sm md:text-base lg:text-lg">

<!-- Dark mode -->
<div class="bg-white dark:bg-slate-900">

<!-- Group variants -->
<div class="group">
  <span class="group-hover:text-coral-500">Hover parent</span>
</div>

<!-- Variant Groups (unique!) -->
<div class="hover:(bg-coral-500 text-white scale-105)">`}</CodeBlock>

              <Callout type="tip" title="Pro Tip">
                Variant groups reduce repetition. Instead of writing <code className="text-xs bg-muted px-1.5 py-0.5 rounded">hover:bg-coral-500 hover:text-white hover:scale-105</code>, use the grouped syntax!
              </Callout>
            </section>

            {/* Modern CSS */}
            <section id="modern-css" className="mb-16 scroll-mt-28">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-lg">
                  ✨
                </span>
                Modern CSS Features
              </h2>
              <p className="text-muted-foreground mb-6">
                CoralCSS embraces cutting-edge CSS features that other frameworks don't support yet.
              </p>

              <div className="space-y-8">
                {/* Container Queries */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <span className="text-primary">@container</span> Queries
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Style elements based on their container size, not just the viewport.
                  </p>
                  <CodeBlock filename="container-queries.html" language="html">{`<div class="@container">
  <div class="@md:flex @lg:grid @lg:grid-cols-3">
    <!-- Responds to container width -->
  </div>
</div>`}</CodeBlock>
                </div>

                {/* Anchor Positioning */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <span className="text-primary">Anchor</span> Positioning
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Position elements relative to anchor elements without JavaScript.
                  </p>
                  <CodeBlock filename="anchor.html" language="html">{`<button class="anchor-name-[--trigger]">Click me</button>
<div class="position-anchor-[--trigger] anchor-bottom anchor-center-x">
  <!-- Tooltip automatically positions relative to button -->
</div>`}</CodeBlock>
                </div>

                {/* Scroll-Driven Animations */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <span className="text-primary">Scroll-Driven</span> Animations
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Create scroll-linked animations with pure CSS.
                  </p>
                  <CodeBlock filename="scroll-animations.html" language="html">{`<div class="scroll-timeline-[--main-scroll] scroll-timeline-axis-y">
  <div class="animate-fade-in animation-timeline-[--main-scroll]">
    <!-- Fades in as you scroll -->
  </div>
</div>`}</CodeBlock>
                </div>

                {/* OKLCH Colors */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <span className="text-primary">OKLCH</span> Wide-Gamut Colors
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Access the full P3 color space for more vibrant, perceptually uniform colors.
                  </p>
                  <CodeBlock filename="oklch.css" language="css">{`/* CoralCSS uses OKLCH internally */
.bg-coral-500 {
  background: oklch(70% 0.15 30);
}

/* color-mix() for dynamic colors */
.bg-primary-lighter {
  background: color-mix(in oklch, var(--primary) 50%, white);
}`}</CodeBlock>
                </div>

                {/* light-dark() */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <span className="text-primary">light-dark()</span> Function
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Switch colors automatically based on color scheme preference.
                  </p>
                  <CodeBlock filename="light-dark.css" language="css">{`/* Single property handles both modes */
.adaptive-text {
  color: light-dark(#1a1a1a, #f5f5f5);
}`}</CodeBlock>
                </div>
              </div>

              <Callout type="info" title="Browser Support">
                Modern CSS features gracefully degrade in older browsers. CoralCSS provides fallbacks automatically.
              </Callout>
            </section>

            {/* Theming */}
            <section id="themes" className="mb-16 scroll-mt-28">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-lg">
                  🎭
                </span>
                Theming
              </h2>
              <p className="text-muted-foreground mb-6">
                CoralCSS includes 12 beautiful theme presets with full dark mode support.
              </p>

              <div className="space-y-8">
                {/* Theme Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Available Themes</h3>
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {['Coral', 'Slate', 'Rose', 'Emerald', 'Violet', 'Amber', 'Ocean', 'Crimson', 'Teal', 'Indigo', 'Lime', 'Fuchsia'].map((theme) => (
                      <div key={theme} className="p-3 rounded-lg bg-card border border-border text-center hover:border-primary/30 transition-colors cursor-pointer">
                        <div className={`w-8 h-8 rounded-full mx-auto mb-2 bg-gradient-to-br from-${theme.toLowerCase()}-400 to-${theme.toLowerCase()}-600`} style={{
                          background: theme === 'Coral' ? 'linear-gradient(135deg, #ff7f50, #ff6b35)' :
                                     theme === 'Rose' ? 'linear-gradient(135deg, #f43f5e, #e11d48)' :
                                     theme === 'Emerald' ? 'linear-gradient(135deg, #34d399, #10b981)' :
                                     theme === 'Violet' ? 'linear-gradient(135deg, #a78bfa, #8b5cf6)' :
                                     theme === 'Ocean' ? 'linear-gradient(135deg, #38bdf8, #0ea5e9)' :
                                     theme === 'Amber' ? 'linear-gradient(135deg, #fbbf24, #f59e0b)' :
                                     theme === 'Slate' ? 'linear-gradient(135deg, #94a3b8, #64748b)' :
                                     theme === 'Crimson' ? 'linear-gradient(135deg, #f87171, #ef4444)' :
                                     theme === 'Teal' ? 'linear-gradient(135deg, #2dd4bf, #14b8a6)' :
                                     theme === 'Indigo' ? 'linear-gradient(135deg, #818cf8, #6366f1)' :
                                     theme === 'Lime' ? 'linear-gradient(135deg, #a3e635, #84cc16)' :
                                     'linear-gradient(135deg, #e879f9, #d946ef)'
                        }} />
                        <span className="text-xs font-medium text-foreground">{theme}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Apply Theme */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Applying a Theme</h3>
                  <CodeBlock filename="index.html" language="html">{`<!-- Add theme class to root element -->
<html class="theme-violet">
  <!-- All components use violet primary color -->
</html>

<!-- Or scope to a section -->
<section class="theme-ocean">
  <!-- Only this section uses ocean theme -->
</section>`}</CodeBlock>
                </div>

                {/* Dark Mode */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Dark Mode</h3>
                  <p className="text-muted-foreground mb-4">
                    Multiple strategies for dark mode implementation.
                  </p>
                  <CodeBlock filename="dark-mode.ts" language="typescript">{`// Class strategy (recommended)
coral({ darkMode: 'class' })
// Toggle with: document.documentElement.classList.toggle('dark')

// Media query strategy
coral({ darkMode: 'media' })
// Follows system preference automatically

// Selector strategy (custom)
coral({ darkMode: ['selector', '[data-theme="dark"]'] })`}</CodeBlock>
                </div>

                {/* Custom Theme */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Creating Custom Themes</h3>
                  <CodeBlock filename="custom-theme.css" language="css">{`.theme-custom {
  --theme-name: 'My Theme';

  /* Primary color in HSL */
  --primary: 280 80% 55%;
  --primary-foreground: 0 0% 100%;

  /* Ring/focus color */
  --ring: 280 80% 55%;

  /* Gradient for brand elements */
  --gradient-from: #9333ea;
  --gradient-to: #7c3aed;
}`}</CodeBlock>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to="/themes"
                  className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                >
                  Try all themes live
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </section>

            {/* Headless Components */}
            <section id="components" className="mb-16 scroll-mt-28">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </span>
                Headless Components
              </h2>
              <p className="text-muted-foreground mb-6">
                168+ accessible, unstyled components ready to customize.
              </p>
              <CodeBlock filename="components.ts">{`import {
  createDialog,
  createDropdown,
  createTabs,
  createAccordion,
  createTooltip,
  createSwitch,
  createToast
} from '@coral-css/core/components'

// Dialog
const dialog = createDialog('#my-dialog', {
  closeOnBackdrop: true,
  trapFocus: true,
})
dialog.open()
dialog.close()

// Dropdown
const dropdown = createDropdown('#my-dropdown')
dropdown.element.addEventListener('coral:dropdown:select', (e) => {
  console.log('Selected:', e.detail.item)
})

// Tabs
const tabs = createTabs('#my-tabs', { defaultTab: 0 })
tabs.selectTab(1)`}</CodeBlock>

              <div className="mt-6">
                <Link
                  to="/components"
                  className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                >
                  Browse all 168+ components
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </section>

            {/* Plugins */}
            <section id="plugins" className="mb-16 scroll-mt-28">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-lg">
                  🔌
                </span>
                Plugin System
              </h2>
              <p className="text-muted-foreground mb-6">
                Extend CoralCSS with custom utilities, variants, and components.
              </p>

              <div className="space-y-8">
                {/* Creating a Plugin */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Creating a Plugin</h3>
                  <CodeBlock filename="my-plugin.ts" language="typescript">{`import type { Plugin } from '@coral-css/core'

const myPlugin: Plugin = {
  name: 'my-custom-plugin',
  version: '1.0.0',
  install(api) {
    // Add custom utility rules
    api.addRule({
      pattern: /^glow-(.+)$/,
      generate: (match) => ({
        boxShadow: \`0 0 20px var(--\${match[1]})\`,
      }),
    })

    // Add custom variants
    api.addVariant({
      name: 'hocus',
      match: 'hocus',
      transform: (selector) => \`\${selector}:hover, \${selector}:focus\`,
    })

    // Extend the theme
    api.extendTheme({
      colors: {
        brand: '#ff6b6b',
      },
    })
  },
}

export default myPlugin`}</CodeBlock>
                </div>

                {/* Using Plugins */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Using Plugins</h3>
                  <CodeBlock filename="vite.config.ts" language="typescript">{`import coral from '@coral-css/core/vite'
import myPlugin from './my-plugin'
import typography from '@coral-css/typography'
import forms from '@coral-css/forms'

export default defineConfig({
  plugins: [
    coral({
      plugins: [myPlugin, typography, forms],
    }),
  ],
})`}</CodeBlock>
                </div>

                {/* Official Plugins */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Official Plugins</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { name: '@coral-css/typography', desc: 'Beautiful prose styling for articles and blogs' },
                      { name: '@coral-css/forms', desc: 'Better default styles for form elements' },
                      { name: '@coral-css/animations', desc: '50+ ready-to-use animation utilities' },
                      { name: '@coral-css/icons', desc: 'Inline SVG icon utilities' },
                    ].map((plugin) => (
                      <div key={plugin.name} className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                        <code className="text-sm font-semibold text-primary">{plugin.name}</code>
                        <p className="text-sm text-muted-foreground mt-1">{plugin.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plugin API */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Plugin API Reference</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 font-semibold text-foreground">Method</th>
                          <th className="text-left py-2 font-semibold text-foreground">Description</th>
                        </tr>
                      </thead>
                      <tbody className="text-muted-foreground">
                        <tr className="border-b border-border/50">
                          <td className="py-2"><code className="text-primary">api.addRule()</code></td>
                          <td className="py-2">Register a new utility pattern</td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-2"><code className="text-primary">api.addVariant()</code></td>
                          <td className="py-2">Register a new variant modifier</td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-2"><code className="text-primary">api.addComponent()</code></td>
                          <td className="py-2">Register component styles</td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-2"><code className="text-primary">api.extendTheme()</code></td>
                          <td className="py-2">Extend theme values</td>
                        </tr>
                        <tr>
                          <td className="py-2"><code className="text-primary">api.addBase()</code></td>
                          <td className="py-2">Add base/reset styles</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            {/* Presets */}
            <section id="presets" className="mb-16 scroll-mt-28">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </span>
                Presets
              </h2>
              <p className="text-muted-foreground mb-6">
                Pre-configured plugin bundles for different use cases.
              </p>
              <CodeBlock filename="presets.ts">{`import {
  coralPreset,  // Default with modern CSS
  windPreset,   // Tailwind-compatible
  miniPreset,   // Minimal utilities only
  fullPreset    // Everything included
} from '@coral-css/core'

const coral = createCoral()
coralPreset({ darkMode: 'class' }).forEach(p => coral.use(p))`}</CodeBlock>
            </section>

            {/* TypeScript */}
            <section id="typescript" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M3 3h18v18H3V3zm10.71 14.86c.5.98 1.51 1.73 3.09 1.73 1.6 0 2.8-.83 2.8-2.36 0-1.41-.81-2.04-2.25-2.66l-.42-.18c-.73-.31-1.04-.52-1.04-1.02 0-.41.31-.73.81-.73.48 0 .8.21 1.09.73l1.31-.87c-.55-.96-1.33-1.33-2.4-1.33-1.51 0-2.48.96-2.48 2.23 0 1.38.81 2.03 2.03 2.55l.42.18c.78.34 1.24.55 1.24 1.13 0 .48-.45.83-1.15.83-.83 0-1.31-.43-1.67-1.03l-1.38.8zM11 12.81H9v5.08H7.58v-5.08H5.5v-1.31H11v1.31z" />
                  </svg>
                </span>
                TypeScript
              </h2>
              <p className="text-muted-foreground mb-6">
                Full TypeScript support with comprehensive type definitions.
              </p>
              <CodeBlock filename="types.ts">{`import type {
  Coral,
  Plugin,
  Rule,
  Variant,
  Theme,
  ComponentConfig,
} from '@coral-css/core'`}</CodeBlock>
            </section>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-8 mt-8 border-t border-border">
              <Link
                to="/"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Home
              </Link>
              <Link
                to="/components"
                className="flex items-center gap-2 text-primary hover:underline font-medium"
              >
                View Components
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </main>

          {/* Right Sidebar - On This Page */}
          <aside className="hidden xl:block w-56 flex-shrink-0">
            <nav className="sticky top-28">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                On This Page
              </p>
              <div className="space-y-1 border-l border-border">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={() => setActiveSection(section.id)}
                    className={`
                      block pl-4 py-1.5 text-sm transition-all duration-200 -ml-px border-l-2
                      ${activeSection === section.id
                        ? 'border-primary text-primary font-medium'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                      }
                    `}
                  >
                    {section.label}
                  </a>
                ))}
              </div>

              {/* Help Section */}
              <div className="mt-8 p-4 rounded-xl bg-muted/30 border border-border">
                <p className="text-xs font-medium text-foreground mb-2">Need help?</p>
                <a
                  href="https://github.com/coralcss/coralcss/discussions"
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  Ask on GitHub Discussions
                </a>
              </div>
            </nav>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Docs
