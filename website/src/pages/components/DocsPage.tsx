/**
 * Documentation Page Showcase
 *
 * A comprehensive documentation page demonstrating CoralCSS utilities.
 * Features sidebar navigation, search, code blocks, and interactive examples.
 */

export function DocsPageShowcase() {
  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: '🚀',
      items: [
        { id: 'installation', title: 'Installation', content: 'Install CoralCSS via npm, yarn, or pnpm.' },
        { id: 'quick-start', title: 'Quick Start', content: 'Get up and running in minutes.' },
        { id: 'configuration', title: 'Configuration', content: 'Customize your CoralCSS setup.' },
      ]
    },
    {
      id: 'core-concepts',
      title: 'Core Concepts',
      icon: '💡',
      items: [
        { id: 'utility-first', title: 'Utility-First', content: 'Build designs with utility classes.' },
        { id: 'responsive', title: 'Responsive Design', content: 'Adaptive layouts for all screen sizes.' },
        { id: 'dark-mode', title: 'Dark Mode', content: 'Multiple strategies for dark mode.' },
        { id: 'variants', title: 'Variants', content: 'Conditional styling with variants.' },
      ]
    },
    {
      id: 'customization',
      title: 'Customization',
      icon: '🎨',
      items: [
        { id: 'theme', title: 'Theme Configuration', content: 'Customize colors, spacing, and more.' },
        { id: 'plugins', title: 'Plugins', content: 'Extend functionality with plugins.' },
        { id: 'presets', title: 'Presets', content: 'Ready-to-use design system presets.' },
      ]
    },
    {
      id: 'components',
      title: 'Components',
      icon: '🧩',
      items: [
        { id: 'accordion', title: 'Accordion', content: 'Collapsible content sections.' },
        { id: 'dialog', title: 'Dialog', content: 'Modal dialogs with focus management.' },
        { id: 'dropdown', title: 'Dropdown', content: 'Contextual menus and dropdowns.' },
        { id: 'tabs', title: 'Tabs', content: 'Tabbed content organization.' },
      ]
    },
  ]

  const codeExamples = [
    {
      title: 'Quick Start',
      language: 'bash',
      code: `npm install @coral-css/core`,
    },
    {
      title: 'Basic Usage',
      language: 'typescript',
      code: `import { createCoral, coralPreset } from '@coral-css/core'

const coral = createCoral({
  plugins: coralPreset(),
})

const css = coral.generate([
  'flex',
  'items-center',
  'p-4',
  'bg-coral-500',
  'text-white',
  'rounded-lg'
])`,
    },
    {
      title: 'Vite Integration',
      language: 'typescript',
      code: `// vite.config.ts
import { defineConfig } from 'vite'
import coral from '@coral-css/core/vite'

export default defineConfig({
  plugins: [
    coral({
      darkMode: 'class',
    }),
  ],
})`,
    },
  ]

  const features = [
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: '600K+ ops/sec with intelligent caching and prefix indexing.',
    },
    {
      icon: '🎯',
      title: 'Zero Dependencies',
      description: 'No runtime dependencies, just pure TypeScript.',
    },
    {
      icon: '🔌',
      title: 'Plugin Architecture',
      description: 'Modular micro-kernel design with everything as plugins.',
    },
    {
      icon: '🌙',
      title: 'Dark Mode',
      description: 'Built-in dark mode with class, media, or selector strategies.',
    },
    {
      icon: '📱',
      title: 'Modern CSS',
      description: 'Anchor positioning, container queries, scroll animations.',
    },
    {
      icon: '🎨',
      title: '60+ Components',
      description: 'Headless, accessible components with full keyboard support.',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white font-bold">
                C
              </div>
              <span className="text-lg font-semibold text-foreground">CoralCSS Docs</span>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="w-full pl-10 pr-4 py-2 bg-secondary/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 text-xs bg-muted rounded text-muted-foreground">
                  ⌘K
                </kbd>
              </div>
            </div>

            <nav className="flex items-center gap-4">
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                GitHub
              </a>
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Discord
              </a>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                Get Started
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="sticky top-16 w-64 h-[calc(100vh-4rem)] overflow-y-auto border-r border-border bg-card/50">
          <nav className="p-4 space-y-6">
            {sections.map((section) => (
              <div key={section.id}>
                <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                  <span>{section.icon}</span>
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="block px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-w-4xl">
          <article className="p-8">
            {/* Hero */}
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                v1.0.0 - Latest
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
                Welcome to{' '}
                <span className="gradient-text">CoralCSS</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                A modern, zero-dependency CSS framework with utility-first classes,
                headless components, and first-class support for modern CSS features.
              </p>
            </div>

            {/* Features Grid */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Why CoralCSS?</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="p-4 bg-card rounded-xl border border-border hover:shadow-lg hover:border-primary/30 transition-all">
                    <div className="text-2xl mb-2">{feature.icon}</div>
                    <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Code Examples */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Quick Examples</h2>
              <div className="space-y-6">
                {codeExamples.map((example, index) => (
                  <div key={index} className="bg-card rounded-xl border border-border overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
                      <span className="text-sm font-medium text-foreground">{example.title}</span>
                      <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                        Copy
                      </button>
                    </div>
                    <pre className="p-4 text-sm overflow-x-auto bg-secondary/30">
                      <code className="text-muted-foreground">{example.code}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </section>

            {/* On This Page Navigation */}
            <aside className="hidden xl:block sticky top-20 float-right right-0 ml-8 w-56">
              <div className="bg-card rounded-xl border border-border p-4">
                <h4 className="text-sm font-semibold text-foreground mb-3">On This Page</h4>
                <nav className="space-y-2">
                  <a href="#getting-started" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Getting Started
                  </a>
                  <a href="#core-concepts" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Core Concepts
                  </a>
                  <a href="#customization" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Customization
                  </a>
                  <a href="#components" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Components
                  </a>
                </nav>
              </div>
            </aside>

            {/* Installation Guide */}
            <section id="installation" className="mb-12 prose prose-slate max-w-none">
              <h2 className="text-2xl font-bold text-foreground mb-4">Installation</h2>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Package Manager</h3>
              <p className="text-muted-foreground mb-4">Install CoralCSS using your favorite package manager:</p>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-card rounded-lg border border-border p-4">
                  <div className="text-xs font-medium text-muted-foreground mb-2">npm</div>
                  <code className="text-sm text-foreground">npm install @coral-css/core</code>
                </div>
                <div className="bg-card rounded-lg border border-border p-4">
                  <div className="text-xs font-medium text-muted-foreground mb-2">yarn</div>
                  <code className="text-sm text-foreground">yarn add @coral-css/core</code>
                </div>
                <div className="bg-card rounded-lg border border-border p-4">
                  <div className="text-xs font-medium text-muted-foreground mb-2">pnpm</div>
                  <code className="text-sm text-foreground">pnpm add @coral-css/core</code>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">CDN</h3>
              <p className="text-muted-foreground mb-4">Or use it directly in the browser via CDN:</p>

              <div className="bg-card rounded-lg border border-border p-4">
                <code className="text-sm text-foreground">
                  {'<script src="https://unpkg.com/@coral-css/core/dist/cdn.iife.js"></script>'}
                </code>
              </div>
            </section>

            {/* Next Steps */}
            <section className="mt-16 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl border border-primary/20">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🎯</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Ready to dive deeper?</h3>
                  <p className="text-muted-foreground mb-4">
                    Explore our comprehensive guides to master CoralCSS and build amazing experiences.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                      Explore Components
                    </button>
                    <button className="px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
                      View Examples
                    </button>
                    <button className="px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
                      Join Discord
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </article>
        </main>

        {/* Right Sidebar - Table of Contents */}
        <aside className="hidden xl:block sticky top-16 w-56 h-[calc(100vh-4rem)] overflow-y-auto border-l border-border bg-card/50 p-4">
          <h4 className="text-sm font-semibold text-foreground mb-4">Overview</h4>
          <nav className="space-y-2">
            <a href="#getting-started" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
              Getting Started
            </a>
            <a href="#core-concepts" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
              Core Concepts
            </a>
            <a href="#customization" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
              Customization
            </a>
            <a href="#components" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
              Components
            </a>
            <hr className="my-3 border-border" />
            <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
              API Reference
            </a>
            <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
              Plugins
            </a>
            <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
              Migration Guide
            </a>
          </nav>
        </aside>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 CoralCSS. Built with ❤️ for the modern web.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                License
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default DocsPageShowcase
