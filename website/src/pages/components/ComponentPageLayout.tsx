import { useState } from 'react'
import { Link } from 'react-router-dom'

interface ComponentData {
  id: string
  name: string
  description: string
  usage?: string
  props?: Array<{
    name: string
    type: string
    default: string
    description: string
  }>
  preview: React.ComponentType
}

interface ComponentPageLayoutProps {
  categoryName: string
  categoryId: string
  components: ComponentData[]
  accessibilityFeatures?: string[]
}

export function ComponentPageLayout({
  categoryName,
  categoryId,
  components,
  accessibilityFeatures = [
    'Keyboard Navigation',
    'Focus Management',
    'Screen Reader Support',
  ]
}: ComponentPageLayoutProps) {
  const [activeComponent, setActiveComponent] = useState(components[0].id)
  const [showCode, setShowCode] = useState(false)

  const currentComponent = components.find(c => c.id === activeComponent)!

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-muted/50 to-muted/30">
        <div className="container py-8">
          {/* Breadcrumb */}
          <nav data-coral-breadcrumb className="mb-6">
            <Link to="/components" data-coral-breadcrumb-item className="hover:text-primary">
              Components
            </Link>
            <span data-coral-breadcrumb-separator>/</span>
            <span data-coral-breadcrumb-item data-active>{categoryName}</span>
          </nav>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {categoryName}
          </h1>
          <p className="text-muted-foreground">
            {components.length} components available
          </p>
        </div>
      </div>

      {/* Component Tabs - Horizontal on all screens */}
      <div className="border-b border-border bg-card/50 sticky top-20 z-40 backdrop-blur-sm">
        <div className="container">
          <div className="flex overflow-x-auto py-2 gap-1 scrollbar-hide">
            {components.map((comp) => (
              <button
                key={comp.id}
                onClick={() => setActiveComponent(comp.id)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all
                  ${activeComponent === comp.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }
                `}
              >
                {comp.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8 lg:py-12">
        <div className="max-w-full">
          {/* Component Header */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {currentComponent.name}
            </h2>
            <p className="text-lg text-muted-foreground">
              {currentComponent.description}
            </p>
          </div>

          {/* Preview Section */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Preview</h3>
              {currentComponent.usage && (
                <button
                  onClick={() => setShowCode(!showCode)}
                  data-coral-button
                  data-variant={showCode ? 'primary' : 'outline'}
                  data-size="sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  {showCode ? 'Preview' : 'Code'}
                </button>
              )}
            </div>

            <div className="rounded-xl border border-border">
              {showCode && currentComponent.usage ? (
                <div className="bg-[#0d1117] p-6 rounded-xl">
                  <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap overflow-x-auto">
                    {currentComponent.usage}
                  </pre>
                </div>
              ) : (
                <div
                  className="relative p-8 md:p-12 min-h-[300px] flex items-center justify-center rounded-xl bg-gradient-to-br from-muted/30 via-background to-muted/20"
                >
                  {/* Subtle grid pattern */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-50 pointer-events-none"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, hsl(var(--border) / 0.3) 1px, transparent 1px),
                        linear-gradient(to bottom, hsl(var(--border) / 0.3) 1px, transparent 1px)
                      `,
                      backgroundSize: '32px 32px'
                    }}
                  />
                  {/* Glow effect */}
                  <div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{
                      background: `
                        radial-gradient(ellipse at 30% 0%, hsl(var(--primary) / 0.1) 0%, transparent 50%),
                        radial-gradient(ellipse at 70% 100%, hsl(var(--accent) / 0.08) 0%, transparent 50%)
                      `
                    }}
                  />
                  <div className="relative z-10">
                    <currentComponent.preview />
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Usage Section */}
          {currentComponent.usage && (
            <section className="mb-10">
              <h3 className="text-lg font-semibold text-foreground mb-4">Usage</h3>
              <div className="bg-[#1e1e1e] rounded-xl p-6 overflow-x-auto">
                <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap">
                  {currentComponent.usage}
                </pre>
              </div>
            </section>
          )}

          {/* Props Section */}
          {currentComponent.props && currentComponent.props.length > 0 && (
            <section className="mb-10">
              <h3 className="text-lg font-semibold text-foreground mb-4">Props</h3>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium text-foreground">Prop</th>
                      <th className="text-left p-4 font-medium text-foreground">Type</th>
                      <th className="text-left p-4 font-medium text-foreground">Default</th>
                      <th className="text-left p-4 font-medium text-foreground">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {currentComponent.props.map((prop) => (
                      <tr key={prop.name} className="hover:bg-muted/30 transition-colors">
                        <td className="p-4">
                          <code className="px-2 py-1 bg-muted rounded text-xs font-medium text-primary">
                            {prop.name}
                          </code>
                        </td>
                        <td className="p-4">
                          <code className="text-muted-foreground text-xs">{prop.type}</code>
                        </td>
                        <td className="p-4">
                          <code className="text-muted-foreground text-xs">{prop.default}</code>
                        </td>
                        <td className="p-4 text-muted-foreground">{prop.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Accessibility Section */}
          <section className="mb-10">
            <h3 className="text-lg font-semibold text-foreground mb-4">Accessibility</h3>
            <div data-coral-card className="p-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {accessibilityFeatures.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-8 border-t border-border">
            <Link
              to={`/components/${categoryId}`}
              data-coral-button
              data-variant="ghost"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All {categoryName}
            </Link>
            <Link
              to="/components"
              data-coral-button
              data-variant="outline"
            >
              Browse Components
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComponentPageLayout
