import { useState } from 'react'

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-pattern min-h-screen flex items-center py-20 relative overflow-hidden">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-coral-500 rounded-full opacity-10 blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-coral-400 rounded-full opacity-10 blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-coral-600 rounded-full opacity-5 blur-2xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container relative z-10">
          <div className="text-center max-w-4xl mx-auto stagger-children">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral-50 border border-coral-200 text-coral-600 text-sm font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-coral-500"></span>
              </span>
              v1.0 is here - Zero dependencies, infinite possibilities
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-slate-900 tracking-tight leading-tight mb-6">
              The CSS Framework
              <br />
              <span className="gradient-text animate-gradient">Built for Tomorrow</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Zero dependencies. Utility-first. Modern CSS features out of the box.
              Anchor positioning, container queries, scroll animations, and more.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href="/docs" className="btn btn-primary px-8 py-3 text-lg animate-pulse-glow">
                Get Started
                <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="https://github.com/nicholasxjy/CoralCSS"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline px-8 py-3 text-lg group"
              >
                <svg className="w-5 h-5 mr-2 inline group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                View on GitHub
              </a>
            </div>

            {/* Install Command */}
            <div className="glass rounded-xl p-4 inline-block">
              <code className="text-slate-700 font-mono">
                <span className="text-coral-500">$</span> npm install <span className="text-coral-600 font-semibold">@coralcss/core</span>
              </code>
              <button className="ml-4 text-slate-400 hover:text-coral-500 transition" title="Copy to clipboard">
                <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatItem value="0" label="Dependencies" />
            <StatItem value="100%" label="TypeScript" />
            <StatItem value="<8KB" label="Core Size (gzipped)" />
            <StatItem value="20+" label="Headless Components" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A complete toolkit for building modern web interfaces, without the bloat.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            <FeatureCard
              title="Zero Dependencies"
              description="Pure TypeScript. No runtime deps. Just clean, efficient CSS generation."
              icon={<ZeroIcon />}
              color="coral"
            />
            <FeatureCard
              title="Utility-First"
              description="Thousands of utilities with intuitive naming. Build faster than ever."
              icon={<UtilityIcon />}
              color="blue"
            />
            <FeatureCard
              title="Modern CSS"
              description="Anchor positioning, container queries, :has(), view transitions."
              icon={<ModernIcon />}
              color="purple"
            />
            <FeatureCard
              title="Headless Components"
              description="Fully accessible UI primitives. Style them your way."
              icon={<ComponentIcon />}
              color="green"
            />
            <FeatureCard
              title="Plugin Architecture"
              description="Micro-kernel design. Enable only what you need."
              icon={<PluginIcon />}
              color="yellow"
            />
            <FeatureCard
              title="Multiple Presets"
              description="Coral, Wind (Tailwind-compatible), Mini, and Full presets."
              icon={<PresetIcon />}
              color="pink"
            />
            <FeatureCard
              title="Runtime + Build"
              description="Use via CDN or integrate with Vite, PostCSS, and more."
              icon={<RuntimeIcon />}
              color="indigo"
            />
            <FeatureCard
              title="Full TypeScript"
              description="Strict types throughout. Great IDE support and autocomplete."
              icon={<TypeScriptIcon />}
              color="cyan"
            />
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-24 bg-slate-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              See It In Action
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Try changing the classes below and watch the result update in real-time.
            </p>
          </div>

          <InteractiveDemo />
        </div>
      </section>

      {/* Code Examples Section */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Clean, Intuitive Syntax
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Familiar utility classes with powerful new features like variant groups.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CodeExample
              title="Variant Groups"
              description="Group multiple utilities under a single variant prefix"
              code={`<!-- Before: Repetitive -->
<div class="hover:bg-coral-500 hover:text-white
     hover:scale-105 hover:shadow-lg">

<!-- After: Grouped -->
<div class="hover:(bg-coral-500 text-white
     scale-105 shadow-lg)">`}
            />
            <CodeExample
              title="Arbitrary Values"
              description="Use any CSS value with bracket notation"
              code={`<div class="bg-[#ff7f50]
     p-[clamp(1rem,5vw,3rem)]
     grid-cols-[200px_1fr_200px]
     text-[length:var(--size)]">`}
            />
            <CodeExample
              title="Container Queries"
              description="Style based on container size, not viewport"
              code={`<div class="@container">
  <div class="@sm:flex @md:grid @lg:hidden">
    Responds to container width
  </div>
</div>`}
            />
            <CodeExample
              title="Modern Selectors"
              description="Use :has() for parent-based styling"
              code={`<!-- Style parent when child is focused -->
<div class="has-[:focus]:ring-2
     has-[input:invalid]:border-red-500">
  <input type="text" />
</div>`}
            />
          </div>
        </div>
      </section>

      {/* Modern CSS Features Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Modern CSS, <span className="gradient-text">Made Simple</span>
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              First-class support for cutting-edge CSS features with intuitive utilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ModernFeatureCard
              title="Anchor Positioning"
              description="Position elements relative to any anchor without JavaScript."
              code={`<button class="anchor-name-[--btn]">
  Menu
</button>
<div class="position-anchor-[--btn]
     position-area-bottom-span-left">
  Dropdown content
</div>`}
            />
            <ModernFeatureCard
              title="Scroll-Driven Animations"
              description="Animate elements based on scroll position."
              code={`<div class="animation-timeline-scroll
     animation-range-entry
     animate-fade-in">
  Fades in as you scroll
</div>`}
            />
            <ModernFeatureCard
              title="View Transitions"
              description="Smooth page transitions with the View Transitions API."
              code={`<img class="view-transition-name-[hero]" />

<!-- On page change, image
     morphs smoothly -->`}
            />
            <ModernFeatureCard
              title="Container Queries"
              description="Responsive design based on container, not viewport."
              code={`<article class="@container/card">
  <div class="@sm/card:flex
       @lg/card:grid-cols-2">
    Card content
  </div>
</article>`}
            />
            <ModernFeatureCard
              title="Subgrid"
              description="Align nested grid items to parent tracks."
              code={`<div class="grid grid-cols-3">
  <div class="col-span-2
       grid grid-cols-subgrid">
    Aligned to parent
  </div>
</div>`}
            />
            <ModernFeatureCard
              title="Color Functions"
              description="Modern color spaces and manipulation."
              code={`<div class="bg-oklch-[0.7_0.15_200]
     text-color-mix-[in_oklch,
       coral_70%,white]">
  Modern colors
</div>`}
            />
          </div>
        </div>
      </section>

      {/* Headless Components Section */}
      <section className="py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Headless Components
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                20+ accessible UI primitives with zero styling. Full keyboard navigation,
                ARIA support, and focus management built-in. Style them however you want.
              </p>

              <ul className="space-y-4">
                <ComponentFeature title="Dialog & Modal" description="Focus trap, escape to close, scroll lock" />
                <ComponentFeature title="Dropdown Menu" description="Keyboard navigation, click outside" />
                <ComponentFeature title="Tabs" description="Arrow key navigation, automatic activation" />
                <ComponentFeature title="Accordion" description="Single/multiple expand, animations" />
                <ComponentFeature title="Select & Combobox" description="Type-ahead, filtering, virtualization" />
              </ul>
            </div>

            <div className="relative">
              <div className="glass rounded-2xl p-8 shadow-2xl">
                <ComponentDemo />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white rounded-full opacity-10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white rounded-full opacity-10 blur-3xl" />
        </div>

        <div className="container text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">Ready to Build Something Beautiful?</h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Join developers who are building the future of the web with CoralCSS.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/docs" className="btn bg-white text-coral-600 hover:bg-slate-100 px-8 py-3 text-lg shadow-lg">
              Read the Documentation
            </a>
            <a href="/examples" className="btn bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 text-lg">
              Explore Examples
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

// Sub-components

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-4xl font-bold text-coral-400 mb-2">{value}</div>
      <div className="text-slate-400 text-sm">{label}</div>
    </div>
  )
}

function FeatureCard({
  title,
  description,
  icon,
  color,
}: {
  title: string
  description: string
  icon: React.ReactNode
  color: string
}) {
  const colorClasses: Record<string, string> = {
    coral: 'from-coral-500 to-coral-600',
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
    yellow: 'from-yellow-500 to-yellow-600',
    pink: 'from-pink-500 to-pink-600',
    indigo: 'from-indigo-500 to-indigo-600',
    cyan: 'from-cyan-500 to-cyan-600',
  }

  return (
    <div className="feature-card group">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[color]} text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    </div>
  )
}

function CodeExample({ title, description, code }: { title: string; description: string; code: string }) {
  return (
    <div className="feature-card p-0 overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-1">{title}</h3>
        <p className="text-slate-600 text-sm">{description}</p>
      </div>
      <pre className="m-0 rounded-none border-0">{code}</pre>
    </div>
  )
}

function ModernFeatureCard({ title, description, code }: { title: string; description: string; code: string }) {
  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 hover:border-coral-500/50 transition-colors">
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm mb-4">{description}</p>
      <pre className="text-sm bg-slate-900/50 rounded-lg p-4 border border-slate-700 overflow-x-auto">{code}</pre>
    </div>
  )
}

function ComponentFeature({ title, description }: { title: string; description: string }) {
  return (
    <li className="flex items-start gap-3">
      <svg className="w-6 h-6 text-coral-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      <div>
        <span className="font-medium text-slate-800">{title}</span>
        <span className="text-slate-600"> - {description}</span>
      </div>
    </li>
  )
}

function InteractiveDemo() {
  const [classes, setClasses] = useState('bg-coral-500 text-white p-6 rounded-xl shadow-lg')

  const presetOptions = [
    { label: 'Primary Button', classes: 'bg-coral-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-coral-600 transition' },
    { label: 'Glass Card', classes: 'bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/20' },
    { label: 'Gradient Box', classes: 'bg-gradient-to-r from-coral-500 to-pink-500 text-white p-8 rounded-xl' },
    { label: 'Outlined', classes: 'border-2 border-coral-500 text-coral-500 p-6 rounded-lg hover:bg-coral-50' },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Edit Classes:
        </label>
        <textarea
          value={classes}
          onChange={(e) => setClasses(e.target.value)}
          className="w-full h-32 p-4 font-mono text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent resize-none"
          placeholder="Enter utility classes..."
        />
        <div className="flex flex-wrap gap-2">
          {presetOptions.map((preset) => (
            <button
              key={preset.label}
              onClick={() => setClasses(preset.classes)}
              className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600 hover:bg-coral-100 hover:text-coral-600 transition"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center p-8 bg-white rounded-xl border border-slate-200 min-h-[200px]">
        <div className={classes}>
          Hello, CoralCSS!
        </div>
      </div>
    </div>
  )
}

function ComponentDemo() {
  const [activeTab, setActiveTab] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="text-sm font-medium text-slate-500 mb-4">Live Component Demo</div>

      {/* Tabs Demo */}
      <div>
        <div className="flex gap-1 p-1 bg-slate-100 rounded-lg mb-4" role="tablist">
          {['Overview', 'Features', 'Pricing'].map((tab, i) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === i}
              onClick={() => setActiveTab(i)}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition ${
                activeTab === i
                  ? 'bg-white text-coral-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-4 bg-slate-50 rounded-lg text-sm text-slate-600">
          {activeTab === 0 && 'A complete CSS framework with everything you need.'}
          {activeTab === 1 && 'Utilities, components, modern CSS, and more.'}
          {activeTab === 2 && 'Free and open source. MIT licensed.'}
        </div>
      </div>

      {/* Dropdown Demo */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-coral-500 text-white rounded-lg text-sm font-medium flex items-center gap-2"
        >
          Open Menu
          <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-10 animate-fade-in">
            {['Edit', 'Duplicate', 'Archive', 'Delete'].map((item) => (
              <button
                key={item}
                className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-coral-50 hover:text-coral-600"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Icons
function ZeroIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
    </svg>
  )
}

function UtilityIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    </svg>
  )
}

function ModernIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )
}

function ComponentIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  )
}

function PluginIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
    </svg>
  )
}

function PresetIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  )
}

function RuntimeIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function TypeScriptIcon() {
  return (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
    </svg>
  )
}

export default Home
