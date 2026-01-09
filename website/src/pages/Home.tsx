import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [commandVisible, setCommandVisible] = useState(false)
  const [activeDemo, setActiveDemo] = useState(0)
  const [statsVisible, setStatsVisible] = useState(false)

  useEffect(() => {
    // Trigger animation after mount
    setTimeout(() => setStatsVisible(true), 500)
  }, [])

  // Demo showcase items
  const demos = [
    { label: 'Dialog', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
    { label: 'Tabs', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { label: 'Dropdown', icon: 'M19 9l-7 7-7-7' },
    { label: 'Toast', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
    { label: 'Command', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />

        {/* Floating shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-[15%] w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-[15%] w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse-slow animation-delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        <div className="container relative z-10 pt-20">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-primary/20 text-primary text-sm font-medium mb-8 shadow-lg animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              v1.0 Now Available
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            {/* Main heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 tracking-tight animate-fade-in-up animation-delay-100">
              The Modern
              <br />
              <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary bg-[size:200%] animate-gradient">
                CSS Framework
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              Zero dependencies. Utility-first with JIT compilation.
              168+ accessible headless components. Modern CSS features built-in.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up animation-delay-300">
              <Link to="/docs" className="btn btn-primary px-8 py-4 text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5">
                Get Started
                <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link to="/components" className="btn btn-outline px-8 py-4 text-lg hover:-translate-y-0.5 transition-all">
                View Components
              </Link>
            </div>

            {/* Install command */}
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-card/80 backdrop-blur-sm rounded-2xl border border-border shadow-xl animate-fade-in-up animation-delay-400">
              <span className="text-muted-foreground font-mono text-sm sm:text-base">$</span>
              <code className="text-foreground font-mono text-sm sm:text-base">npm install @coral-css/core</code>
              <button
                onClick={() => {
                  navigator.clipboard.writeText('npm install @coral-css/core')
                  setCommandVisible(true)
                  setTimeout(() => setCommandVisible(false), 2000)
                }}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                title="Copy to clipboard"
              >
                {commandVisible ? (
                  <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border bg-muted/30">
        <div className="container">
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-foreground mb-2">0</p>
              <p className="text-muted-foreground">Dependencies</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-foreground mb-2">168+</p>
              <p className="text-muted-foreground">Components</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-foreground mb-2">12</p>
              <p className="text-muted-foreground">Theme Presets</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-foreground mb-2">100%</p>
              <p className="text-muted-foreground">TypeScript</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A complete toolkit for building modern web interfaces with unprecedented developer experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="group relative p-8 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-2xl" />
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                JIT Compilation
              </h3>
              <p className="text-muted-foreground">
                Generate only the CSS you use. Lightning-fast builds with zero unused styles in production.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group relative p-8 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-2xl" />
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                Fully Accessible
              </h3>
              <p className="text-muted-foreground">
                ARIA-compliant components with keyboard navigation, focus management, and screen reader support.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group relative p-8 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-2xl" />
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                Themeable
              </h3>
              <p className="text-muted-foreground">
                12 built-in color themes with CSS variables. Easily customize or create your own brand palette.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group relative p-8 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-2xl" />
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                Plugin System
              </h3>
              <p className="text-muted-foreground">
                Extend with custom utilities, variants, and components. Presets for common configurations.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group relative p-8 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-2xl" />
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                Modern CSS
              </h3>
              <p className="text-muted-foreground">
                Container queries, anchor positioning, @starting-style animations, oklch colors, and more.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group relative p-8 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-2xl" />
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                Developer Experience
              </h3>
              <p className="text-muted-foreground">
                TypeScript-first with full types. Vite/PostCSS plugins. CLI for static builds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section - Why CoralCSS */}
      <section className="py-24 section-dark">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose CoralCSS?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built from the ground up with modern CSS features that other frameworks don't have yet.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* CoralCSS Features */}
              <div className="bg-card rounded-2xl border border-primary/30 p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xl">🪸</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">CoralCSS</h3>
                  <span className="px-2 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full">Recommended</span>
                </div>
                <ul className="space-y-4">
                  {[
                    { feature: 'OKLCH Wide-Gamut Colors', desc: 'P3 display support with perceptual uniformity' },
                    { feature: '@starting-style Animations', desc: 'CSS-only entry animations without JavaScript' },
                    { feature: 'Anchor Positioning', desc: 'Native CSS positioning for popovers & tooltips' },
                    { feature: 'Scroll-Driven Animations', desc: 'Scroll timeline and view timeline support' },
                    { feature: '168+ Headless Components', desc: 'Fully accessible, unstyled UI components' },
                    { feature: 'Zero Dependencies', desc: 'No runtime, pure CSS generation' },
                    { feature: 'color-mix() & light-dark()', desc: 'Dynamic color manipulation in CSS' },
                    { feature: 'Pattern Fills', desc: '20+ CSS-only patterns (stripes, dots, grids)' },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="font-medium text-foreground">{item.feature}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Others */}
              <div className="bg-card rounded-2xl border border-border p-8 opacity-75">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-xl">💨</span>
                  </div>
                  <h3 className="text-xl font-bold text-muted-foreground">Other Frameworks</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    { feature: 'HSL/RGB Colors Only', supported: false },
                    { feature: 'JavaScript-Based Animations', supported: false },
                    { feature: 'No Anchor Positioning', supported: false },
                    { feature: 'Limited Animation Support', supported: false },
                    { feature: 'Separate Component Libraries', supported: false },
                    { feature: 'Runtime Dependencies', supported: false },
                    { feature: 'No Dynamic Color Functions', supported: false },
                    { feature: 'Basic Backgrounds Only', supported: false },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <p className="text-muted-foreground">{item.feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                Ready to use the most advanced CSS framework available?
              </p>
              <Link to="/docs" className="btn btn-primary px-6 py-3">
                Start Building Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Feature Comparison Table */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Feature Comparison
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how CoralCSS stacks up against Tailwind CSS 4.1 and other popular frameworks.
            </p>
          </div>

          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold text-primary">
                    <div className="flex flex-col items-center gap-1">
                      <span>🪸</span>
                      <span>CoralCSS</span>
                    </div>
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-muted-foreground">
                    <div className="flex flex-col items-center gap-1">
                      <span>💨</span>
                      <span>Tailwind 4.1</span>
                    </div>
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-muted-foreground">
                    <div className="flex flex-col items-center gap-1">
                      <span>⚡</span>
                      <span>UnoCSS</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'JIT Compilation', coral: true, tailwind: true, uno: true },
                  { feature: 'Zero Dependencies', coral: true, tailwind: false, uno: false },
                  { feature: 'OKLCH Wide-Gamut Colors', coral: true, tailwind: 'partial', uno: false },
                  { feature: 'CSS Anchor Positioning', coral: true, tailwind: false, uno: false },
                  { feature: '@starting-style Animations', coral: true, tailwind: false, uno: false },
                  { feature: 'Scroll-Driven Animations', coral: true, tailwind: false, uno: false },
                  { feature: 'Container Queries', coral: true, tailwind: true, uno: true },
                  { feature: 'color-mix() Support', coral: true, tailwind: 'partial', uno: false },
                  { feature: 'light-dark() Function', coral: true, tailwind: false, uno: false },
                  { feature: 'Built-in Components', coral: '168+', tailwind: '0', uno: '0' },
                  { feature: 'Pattern Fills', coral: '20+', tailwind: '0', uno: '0' },
                  { feature: 'Headless UI Included', coral: true, tailwind: false, uno: false },
                  { feature: 'TypeScript-First', coral: true, tailwind: true, uno: true },
                  { feature: 'Theme Presets', coral: '12', tailwind: '1', uno: '3' },
                  { feature: 'Vite Plugin', coral: true, tailwind: true, uno: true },
                  { feature: 'PostCSS Plugin', coral: true, tailwind: true, uno: true },
                  { feature: 'CDN Bundle', coral: true, tailwind: true, uno: true },
                  { feature: 'Attributify Mode', coral: true, tailwind: false, uno: true },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 font-medium text-foreground">{row.feature}</td>
                    <td className="py-3 px-4 text-center">
                      {row.coral === true ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-success/20 rounded-full">
                          <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      ) : row.coral === false ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-muted rounded-full">
                          <svg className="w-4 h-4 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </span>
                      ) : (
                        <span className="text-sm font-semibold text-primary">{row.coral}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {row.tailwind === true ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-success/20 rounded-full">
                          <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      ) : row.tailwind === false ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-muted rounded-full">
                          <svg className="w-4 h-4 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </span>
                      ) : row.tailwind === 'partial' ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-warning/20 rounded-full">
                          <svg className="w-4 h-4 text-warning" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">{row.tailwind}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {row.uno === true ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-success/20 rounded-full">
                          <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      ) : row.uno === false ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-muted rounded-full">
                          <svg className="w-4 h-4 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">{row.uno}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="max-w-3xl mx-auto mt-12">
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-5 h-5 bg-success/20 rounded-full">
                  <svg className="w-3 h-3 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <span className="text-muted-foreground">Full Support</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-5 h-5 bg-warning/20 rounded-full">
                  <svg className="w-3 h-3 text-warning" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </span>
                <span className="text-muted-foreground">Partial Support</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-5 h-5 bg-muted rounded-full">
                  <svg className="w-3 h-3 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
                <span className="text-muted-foreground">No Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browser Support Section */}
      <section className="py-24 section-dark">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Browser Support
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              CoralCSS is built on modern CSS standards with graceful degradation for older browsers.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                { name: 'Chrome', version: '120+', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z', support: 'full' },
                { name: 'Firefox', version: '121+', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.64 14.36c-.94.94-2.12 1.57-3.43 1.83-.17.03-.34.06-.52.08v-2.2c.5-.09.97-.26 1.39-.51l1.56 1.56c-.31.24-.64.44-.99.61-.34-.06-.68-.11-1.01-.17v-.01c.45-.29.84-.66 1.14-1.09l.86.86zm-5.64-3.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z', support: 'full' },
                { name: 'Safari', version: '17.2+', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z', support: 'full' },
                { name: 'Edge', version: '120+', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z', support: 'full' },
                { name: 'Opera', version: '106+', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z', support: 'full' },
              ].map((browser, i) => (
                <div key={i} className="text-center p-6 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d={browser.icon} />
                    </svg>
                  </div>
                  <p className="font-semibold text-foreground">{browser.name}</p>
                  <p className="text-sm text-primary font-medium">{browser.version}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-card rounded-xl border border-border">
              <h3 className="font-semibold text-foreground mb-4">Progressive Enhancement</h3>
              <p className="text-muted-foreground mb-4">
                CoralCSS uses feature detection and progressive enhancement. Modern CSS features like anchor positioning and @starting-style gracefully degrade in older browsers:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Anchor positioning falls back to JavaScript-based positioning
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  OKLCH colors convert to sRGB for older browsers
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Scroll-driven animations fall back to standard scroll events
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Container queries work in 95%+ of browsers
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built for Performance
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              CoralCSS generates minimal, optimized CSS with zero runtime overhead.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Build Size */}
              <div className="p-6 bg-card rounded-xl border border-border text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                </div>
                <p className="text-4xl font-bold text-foreground mb-2">&lt;10KB</p>
                <p className="text-muted-foreground">Typical Production CSS</p>
                <p className="text-sm text-muted-foreground mt-2">JIT generates only what you use</p>
              </div>

              {/* Build Time */}
              <div className="p-6 bg-card rounded-xl border border-border text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-4xl font-bold text-foreground mb-2">&lt;50ms</p>
                <p className="text-muted-foreground">Hot Module Reload</p>
                <p className="text-sm text-muted-foreground mt-2">Instant feedback during development</p>
              </div>

              {/* Runtime */}
              <div className="p-6 bg-card rounded-xl border border-border text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-4xl font-bold text-foreground mb-2">0</p>
                <p className="text-muted-foreground">Runtime Dependencies</p>
                <p className="text-sm text-muted-foreground mt-2">Pure CSS, no JavaScript required</p>
              </div>
            </div>

            {/* Performance bars */}
            <div className="mt-12 p-8 bg-card rounded-xl border border-border">
              <h3 className="font-semibold text-foreground mb-6">Bundle Size Comparison (gzipped)</h3>
              <div className="space-y-6">
                {[
                  { name: 'CoralCSS (typical)', size: '8KB', percent: 16, color: 'bg-primary' },
                  { name: 'Tailwind CSS 4.1', size: '12KB', percent: 24, color: 'bg-muted-foreground/50' },
                  { name: 'Bootstrap 5', size: '25KB', percent: 50, color: 'bg-muted-foreground/30' },
                  { name: 'Material UI', size: '50KB+', percent: 100, color: 'bg-muted-foreground/20' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-foreground">{item.name}</span>
                      <span className="text-muted-foreground">{item.size}</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              168+ Headless Components
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Accessible, unstyled components that give you complete control.
              Add your own styles or use our utility classes.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Component selector */}
            <div className="flex justify-center gap-3 mb-8 flex-wrap">
              {demos.map((demo, i) => (
                <button
                  key={demo.label}
                  onClick={() => setActiveDemo(i)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeDemo === i
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground border border-border'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={demo.icon} />
                  </svg>
                  {demo.label}
                </button>
              ))}
            </div>

            {/* Demo preview */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-2xl">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 bg-background rounded-md text-sm text-muted-foreground font-mono">
                    demo.coralcss.dev
                  </div>
                </div>
              </div>

              {/* Demo content */}
              <div className="p-8 min-h-[300px] flex items-center justify-center">
                {activeDemo === 0 && <DialogDemoPreview />}
                {activeDemo === 1 && <TabsDemoPreview />}
                {activeDemo === 2 && <DropdownDemoPreview />}
                {activeDemo === 3 && <ToastDemoPreview />}
                {activeDemo === 4 && <CommandDemoPreview />}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-8">
              <Link to="/components" className="btn btn-primary px-8 py-3">
                Explore All Components
                <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Simple, Powerful API
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                CoralCSS works with vanilla HTML using data attributes, or integrate with any JavaScript framework.
                Initialize components with a single function call.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-medium text-foreground">Data Attribute API</p>
                    <p className="text-sm text-muted-foreground">Add behavior with HTML attributes, no JavaScript needed</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-medium text-foreground">Programmatic Control</p>
                    <p className="text-sm text-muted-foreground">Full JavaScript API for dynamic interactions</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-medium text-foreground">Framework Agnostic</p>
                    <p className="text-sm text-muted-foreground">Works with React, Vue, Svelte, or vanilla JS</p>
                  </div>
                </li>
              </ul>

              <Link to="/docs" className="btn btn-outline px-6 py-3">
                Read the Docs
                <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </Link>
            </div>

            {/* Code example */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 blur-2xl opacity-50" />
              <div className="relative bg-card rounded-2xl border border-border overflow-hidden shadow-2xl">
                <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-sm text-muted-foreground font-mono ml-2">dialog.html</span>
                </div>
                <pre className="p-6 overflow-x-auto text-sm">
                  <code className="text-muted-foreground font-mono">
{`<div data-coral-dialog>
  <button data-coral-dialog-trigger
          class="btn btn-primary">
    Open Dialog
  </button>

  <div data-coral-dialog-backdrop
       class="fixed inset-0 bg-black/50" />

  <div data-coral-dialog-content
       class="bg-card rounded-xl p-6">
    <h2 class="text-xl font-bold">
      Welcome!
    </h2>
    <p class="text-muted-foreground">
      This dialog is fully accessible.
    </p>
    <button data-coral-dialog-close
            class="btn btn-secondary">
      Close
    </button>
  </div>
</div>`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 section-dark">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Start Building Today
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join developers who are building beautiful, accessible interfaces with CoralCSS.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/docs" className="btn btn-primary px-8 py-4 text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5">
              Get Started Free
              <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a
              href="https://github.com/coralcss/coralcss"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline px-8 py-4 text-lg hover:-translate-y-0.5 transition-all"
            >
              <svg className="w-5 h-5 mr-2 inline" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              Star on GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

// Demo Preview Components
function DialogDemoPreview() {
  const [open, setOpen] = useState(false)
  return (
    <div className="text-center">
      <button onClick={() => setOpen(true)} className="btn btn-primary">
        Open Dialog
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative bg-card rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl animate-fade-in">
            <h2 className="text-xl font-semibold mb-2">Welcome!</h2>
            <p className="text-muted-foreground mb-4">This is a fully accessible dialog with keyboard navigation and focus trap.</p>
            <button onClick={() => setOpen(false)} className="btn btn-primary w-full">Got it!</button>
          </div>
        </div>
      )}
    </div>
  )
}

function TabsDemoPreview() {
  const [active, setActive] = useState(0)
  const tabs = ['Overview', 'Features', 'Pricing']
  return (
    <div className="w-full max-w-md">
      <div className="flex border-b border-border">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActive(i)}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              active === i ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="p-6 text-muted-foreground">
        Content for the {tabs[active]} tab goes here.
      </div>
    </div>
  )
}

function DropdownDemoPreview() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="btn btn-secondary flex items-center gap-2">
        Options
        <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-2 bg-card rounded-lg shadow-xl border py-1 min-w-[180px] z-20 animate-fade-in">
            <button className="w-full px-4 py-2 text-left hover:bg-muted">Edit</button>
            <button className="w-full px-4 py-2 text-left hover:bg-muted">Duplicate</button>
            <button className="w-full px-4 py-2 text-left hover:bg-muted">Archive</button>
            <div className="border-t my-1" />
            <button className="w-full px-4 py-2 text-left text-destructive hover:bg-destructive/10">Delete</button>
          </div>
        </>
      )}
    </div>
  )
}

function ToastDemoPreview() {
  const [toasts, setToasts] = useState<{id: number; type: string}[]>([])
  const addToast = (type: string) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000)
  }
  return (
    <div className="flex gap-3">
      <button onClick={() => addToast('success')} className="btn btn-primary">Success Toast</button>
      <button onClick={() => addToast('error')} className="btn btn-secondary">Error Toast</button>
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className="px-4 py-3 rounded-lg shadow-lg animate-slide-in-right text-white"
            style={{ backgroundColor: toast.type === 'success' ? 'hsl(var(--success))' : 'hsl(var(--destructive))' }}
          >
            {toast.type === 'success' ? 'Operation successful!' : 'Something went wrong!'}
          </div>
        ))}
      </div>
    </div>
  )
}

function CommandDemoPreview() {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button onClick={() => setOpen(true)} className="btn btn-secondary flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        Search...
        <kbd className="px-2 py-0.5 text-xs bg-muted rounded ml-2">{String.fromCharCode(8984)}K</kbd>
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative bg-card rounded-xl w-full max-w-lg mx-4 shadow-2xl animate-fade-in overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 border-b">
              <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder="Type to search..." className="flex-1 outline-none bg-transparent" autoFocus />
            </div>
            <div className="p-2">
              {['New File', 'Open Project', 'Settings', 'Toggle Theme'].map(item => (
                <button key={item} className="w-full px-3 py-2 text-left rounded hover:bg-muted">{item}</button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
