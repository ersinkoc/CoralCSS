import { Link } from 'react-router-dom'

// Component categories with descriptions and icons
const categories = [
  {
    id: 'buttons',
    name: 'Buttons',
    description: 'Interactive button components with multiple variants, sizes, and states.',
    icon: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122',
    count: 9,
    components: ['Button', 'IconButton', 'ButtonGroup', 'FloatingButton', 'CopyButton', 'ShareButton', 'LikeButton', 'ToggleButton', 'SplitButton']
  },
  {
    id: 'forms',
    name: 'Forms',
    description: 'Form controls and inputs for collecting user data with validation support.',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    count: 21,
    components: ['Input', 'Textarea', 'Select', 'Checkbox', 'Radio', 'Switch', 'Slider', 'RangeSlider', 'NumberInput', 'PinInput', 'ColorPicker', 'DatePicker', 'TimePicker', 'FileUpload', 'SearchInput', 'TagInput', 'Combobox', 'Autocomplete', 'PhoneInput', 'CreditCardInput', 'SignaturePad']
  },
  {
    id: 'data-display',
    name: 'Data Display',
    description: 'Components for presenting data in various formats and layouts.',
    icon: 'M4 6h16M4 10h16M4 14h16M4 18h16',
    count: 21,
    components: ['Card', 'Avatar', 'Badge', 'Chip', 'Accordion', 'Table', 'DataTable', 'List', 'Timeline', 'Calendar', 'Stat', 'Progress', 'Skeleton', 'Rating', 'Code', 'JsonViewer', 'Diff', 'Feed', 'Comment', 'TreeView', 'VirtualList']
  },
  {
    id: 'feedback',
    name: 'Feedback',
    description: 'Components for displaying feedback, alerts, and status to users.',
    icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    count: 11,
    components: ['Alert', 'Toast', 'Notification', 'Banner', 'Snackbar', 'Spinner', 'Progress', 'ProgressRing', 'EmptyState', 'ErrorBoundary', 'StatusIndicator']
  },
  {
    id: 'overlays',
    name: 'Overlays',
    description: 'Modal dialogs, drawers, and overlay components.',
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z',
    count: 11,
    components: ['Dialog', 'Modal', 'Drawer', 'Sheet', 'Popover', 'Tooltip', 'Dropdown', 'ContextMenu', 'Lightbox', 'ImageGallery', 'Backdrop']
  },
  {
    id: 'navigation',
    name: 'Navigation',
    description: 'Navigation components for routing and wayfinding.',
    icon: 'M4 6h16M4 12h16M4 18h16',
    count: 12,
    components: ['Menu', 'Navbar', 'Sidebar', 'Tabs', 'Breadcrumb', 'Pagination', 'Stepper', 'Tree', 'BottomNav', 'CommandMenu', 'Dock', 'MegaMenu']
  },
  {
    id: 'layout',
    name: 'Layout',
    description: 'Structural components for page layout and spacing.',
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
    count: 13,
    components: ['Container', 'Grid', 'Flex', 'Stack', 'Divider', 'Spacer', 'AspectRatio', 'Center', 'Masonry', 'Resizable', 'Splitter', 'ScrollArea', 'Collapsible']
  },
  {
    id: 'typography',
    name: 'Typography',
    description: 'Text and typography components for content presentation.',
    icon: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129',
    count: 8,
    components: ['Heading', 'Text', 'Blockquote', 'Highlight', 'Mark', 'Prose', 'Truncate', 'Gradient']
  },
  {
    id: 'media',
    name: 'Media',
    description: 'Components for displaying images, videos, and other media.',
    icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
    count: 11,
    components: ['Image', 'Video', 'Audio', 'Iframe', 'Figure', 'Icon', 'QRCode', 'Barcode', 'EmojiPicker', 'GifPicker', 'MediaPlayer']
  },
  {
    id: 'charts',
    name: 'Charts',
    description: 'Data visualization components for displaying charts and graphs.',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    count: 9,
    components: ['BarChart', 'LineChart', 'PieChart', 'DonutChart', 'AreaChart', 'Sparkline', 'Gauge', 'Meter', 'Heatmap']
  },
  {
    id: 'advanced',
    name: 'Advanced',
    description: 'Advanced interactive components for complex use cases.',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    count: 12,
    components: ['Command', 'Carousel', 'Marquee', 'Kbd', 'Spotlight', 'Tour', 'Onboarding', 'Hotkeys', 'Portal', 'FocusTrap', 'Toast', 'ContextMenu']
  },
  {
    id: 'modern-css',
    name: 'Modern CSS',
    description: 'Components showcasing modern CSS features like container queries and scroll animations.',
    icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
    count: 14,
    components: ['Card3D', 'ContainerQuery', 'AnchorPosition', 'ScrollTimeline', 'ViewTransition', 'HasSelector', 'SubGrid', 'WideGamutColors', 'EntryAnimations', 'FieldSizing', 'TextWrap', 'LightDark', 'PopoverAPI', 'AdvancedSelectors']
  },
]

function ComponentsIndex() {
  const totalComponents = categories.reduce((sum, cat) => sum + cat.count, 0)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-muted/50 via-background to-primary/5" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-accent rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-primary/20 text-primary text-sm font-medium mb-8 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              {totalComponents}+ Components
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Component
              <br />
              <span className="gradient-text">Library</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
              A comprehensive collection of accessible, unstyled headless components.
              Full keyboard navigation, ARIA compliance, and complete customization control.
            </p>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Link to="/components/buttons" className="group flex items-center gap-2 px-4 py-2 bg-card rounded-xl border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Get Started</span>
              </Link>
              <Link to="/docs" className="group flex items-center gap-2 px-4 py-2 bg-card rounded-xl border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
                <span className="w-2 h-2 rounded-full bg-info"></span>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Documentation</span>
              </Link>
              <a href="https://github.com" className="group flex items-center gap-2 px-4 py-2 bg-card rounded-xl border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
                <span className="w-2 h-2 rounded-full bg-success"></span>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="container pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/components/${category.id}`}
              className="group relative bg-card rounded-2xl border border-border p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-300"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-2xl" />

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={category.icon} />
                </svg>
              </div>

              {/* Content */}
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <span className="px-2 py-0.5 text-xs font-medium bg-muted rounded-full text-muted-foreground">
                  {category.count}
                </span>
              </div>

              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {category.description}
              </p>

              {/* Component preview */}
              <div className="flex flex-wrap gap-1">
                {category.components.slice(0, 4).map((comp) => (
                  <span key={comp} className="px-2 py-0.5 text-xs bg-muted/50 rounded text-muted-foreground">
                    {comp}
                  </span>
                ))}
                {category.count > 4 && (
                  <span className="px-2 py-0.5 text-xs bg-primary/10 rounded text-primary">
                    +{category.count - 4} more
                  </span>
                )}
              </div>

              {/* Arrow */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Install */}
      <section className="py-20 section-dark">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Use
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Install CoralCSS and start using components in minutes.
            </p>

            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-card/50 backdrop-blur rounded-xl p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">1</span>
                  Install Package
                </h3>
                <pre className="bg-secondary/50 rounded-lg p-4 text-sm overflow-x-auto">
                  <code className="text-muted-foreground">npm install @coral-css/core</code>
                </pre>
              </div>

              <div className="bg-card/50 backdrop-blur rounded-xl p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">2</span>
                  Import & Use
                </h3>
                <pre className="bg-secondary/50 rounded-lg p-4 text-sm overflow-x-auto">
                  <code className="text-muted-foreground">{`import { Dialog } from '@coral-css/core'

<Dialog>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Content>
    Hello World
  </Dialog.Content>
</Dialog>`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ComponentsIndex
