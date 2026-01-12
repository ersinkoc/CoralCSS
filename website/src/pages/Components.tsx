import { useState, useMemo } from 'react'

// Component categories with component info - 150+ components!
const componentCategories = [
  {
    name: 'Overlays',
    components: ['Dialog', 'Drawer', 'Popover', 'Tooltip', 'Toast', 'ImageGallery', 'Lightbox', 'Modal', 'Sheet', 'Overlay', 'Backdrop'],
  },
  {
    name: 'Navigation',
    components: ['Menu', 'Tabs', 'Breadcrumb', 'Pagination', 'Stepper', 'Tree', 'Sidebar', 'Navbar', 'BottomNav', 'CommandMenu', 'Dock', 'MegaMenu'],
  },
  {
    name: 'Forms',
    components: ['Select', 'Switch', 'Slider', 'NumberInput', 'PinInput', 'RangeSlider', 'ColorPicker', 'DatePicker', 'FileUpload', 'Input', 'Textarea', 'Checkbox', 'Radio', 'RadioGroup', 'Toggle', 'SearchInput', 'OTPInput', 'PhoneInput', 'CreditCardInput', 'SignaturePad', 'RichTextEditor'],
  },
  {
    name: 'Data Display',
    components: ['Accordion', 'Avatar', 'Progress', 'Skeleton', 'Rating', 'Timeline', 'Stat', 'DataTable', 'Code', 'Chip', 'Badge', 'Card', 'List', 'Description', 'Calendar', 'Feed', 'Comment', 'Diff', 'JsonViewer', 'TreeView', 'VirtualList'],
  },
  {
    name: 'Feedback',
    components: ['Alert', 'Spinner', 'EmptyState', 'ErrorBoundary', 'LoadingBar', 'ProgressRing', 'Notification', 'Banner', 'Snackbar', 'StatusIndicator', 'Pulse'],
  },
  {
    name: 'Layout',
    components: ['Container', 'Grid', 'Flex', 'Stack', 'Divider', 'Spacer', 'AspectRatio', 'Center', 'Masonry', 'Resizable', 'Splitter', 'ScrollArea', 'Collapsible'],
  },
  {
    name: 'Typography',
    components: ['Heading', 'Text', 'Blockquote', 'Highlight', 'Mark', 'Prose', 'Truncate', 'Gradient'],
  },
  {
    name: 'Buttons',
    components: ['Button', 'IconButton', 'ButtonGroup', 'FloatingButton', 'CopyButton', 'ShareButton', 'LikeButton', 'ToggleButton', 'SplitButton'],
  },
  {
    name: 'Media',
    components: ['Image', 'Video', 'Audio', 'Iframe', 'Figure', 'Icon', 'QRCode', 'Barcode', 'EmojiPicker', 'GifPicker', 'MediaPlayer'],
  },
  {
    name: 'Advanced',
    components: ['Command', 'Carousel', 'ContextMenu', 'Dropdown', 'Marquee', 'Kbd', 'Spotlight', 'Tour', 'Onboarding', 'Hotkeys', 'Portal', 'FocusTrap'],
  },
  {
    name: 'Selection',
    components: ['Listbox', 'Combobox', 'MultiSelect', 'TagInput', 'Autocomplete', 'SearchSelect', 'TransferList', 'SegmentedControl'],
  },
  {
    name: 'Time',
    components: ['TimePicker', 'DateRangePicker', 'Clock', 'Countdown', 'Timer', 'Stopwatch', 'DateTimeInput', 'RelativeTime'],
  },
  {
    name: 'Charts',
    components: ['BarChart', 'LineChart', 'PieChart', 'DonutChart', 'AreaChart', 'Sparkline', 'Gauge', 'Meter', 'Heatmap'],
  },
  {
    name: 'E-commerce',
    components: ['ProductCard', 'PriceTag', 'CartItem', 'QuantitySelector', 'WishlistButton', 'CompareCheckbox', 'ReviewCard', 'CouponInput'],
  },
  {
    name: 'Social',
    components: ['UserCard', 'CommentThread', 'ReactionPicker', 'Mention', 'HashtagInput', 'FollowButton', 'ShareDialog', 'ProfileHeader'],
  },
  {
    name: 'Modern CSS',
    components: ['Card3D', 'WideGamutColors', 'EntryAnimations', 'AdvancedSelectors', 'FieldSizing', 'TextWrap', 'LightDark', 'ContainerQuery', 'AnchorPosition', 'ScrollTimeline', 'ViewTransition', 'Popover API', 'HasSelector', 'SubGrid'],
  },
]

// Get all components with their categories
const allComponents = componentCategories.flatMap(cat =>
  cat.components.map(comp => ({ name: comp, category: cat.name }))
)

function Components() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showCode, setShowCode] = useState<string | null>(null)

  // Filter components based on category and search
  const filteredComponents = useMemo(() => {
    return allComponents.filter(comp => {
      const matchesCategory = activeCategory === 'all' || comp.category === activeCategory
      const matchesSearch = comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.category.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <div className="min-h-screen">
      {/* Hero */}
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
              {allComponents.length}+ Headless Components
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Build Beautiful UIs
              <br />
              <span className="gradient-text">Your Way</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
              Fully accessible, unstyled components that give you complete control.
              Zero dependencies, works with any framework.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <div className="group flex items-center gap-2 px-4 py-2 bg-card rounded-xl border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
                <span className="w-2 h-2 rounded-full bg-success"></span>
                <span className="text-sm font-medium text-foreground">ARIA Compliant</span>
              </div>
              <div className="group flex items-center gap-2 px-4 py-2 bg-card rounded-xl border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
                <span className="w-2 h-2 rounded-full bg-info"></span>
                <span className="text-sm font-medium text-foreground">Keyboard Navigation</span>
              </div>
              <div className="group flex items-center gap-2 px-4 py-2 bg-card rounded-xl border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span className="text-sm font-medium text-foreground">Focus Management</span>
              </div>
              <div className="group flex items-center gap-2 px-4 py-2 bg-card rounded-xl border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
                <span className="w-2 h-2 rounded-full bg-warning"></span>
                <span className="text-sm font-medium text-foreground">Zero Dependencies</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Category Filter */}
      <section className="sticky top-20 z-30 bg-background/80 backdrop-blur-lg border-b border-border py-4 mb-8">
        <div className="container">
          <div className="max-w-md mx-auto mb-4">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === 'all'
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              All ({allComponents.length})
            </button>
            {componentCategories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat.name
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                {cat.name} ({cat.components.length})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Count */}
      {(searchQuery || activeCategory !== 'all') && (
        <div className="container mb-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredComponents.length} of {allComponents.length} components
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>
      )}

      {/* Components Grid */}
      <section className="container pb-20">
        {filteredComponents.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No components found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search or filter</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="btn btn-primary"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredComponents.map((comp) => (
              <ComponentCard
                key={comp.name}
                name={comp.name}
                category={comp.category}
                showCode={showCode}
                setShowCode={setShowCode}
              />
            ))}
          </div>
        )}
      </section>

      {/* Usage Section */}
      <section className="py-20 section-dark mt-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Get Started in <span className="gradient-text">Minutes</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Simple API, powerful results. Use with any framework.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-primary rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
                <div className="relative bg-card/90 backdrop-blur rounded-2xl p-6 border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">1</div>
                    <h3 className="text-lg font-semibold text-foreground">Import Components</h3>
                  </div>
                  <pre className="bg-muted/50 rounded-xl p-4 text-sm text-muted-foreground overflow-x-auto border border-border/50">
{`import { Dialog, Tabs, Toast }
  from '@coral-css/core/components'

// Or initialize from HTML
import { initComponents }
  from '@coral-css/core/components'
initComponents()`}
                  </pre>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-0.5 bg-primary rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
                <div className="relative bg-card/90 backdrop-blur rounded-2xl p-6 border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">2</div>
                    <h3 className="text-lg font-semibold text-foreground">Add Data Attributes</h3>
                  </div>
                  <pre className="bg-muted/50 rounded-xl p-4 text-sm text-muted-foreground overflow-x-auto border border-border/50">
{`<div data-coral-dialog>
  <div data-coral-dialog-backdrop />
  <div data-coral-dialog-content>
    <h2>Dialog Title</h2>
    <button data-coral-dialog-close>
      Close
    </button>
  </div>
</div>`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="text-center mt-10">
              <a href="/docs" className="btn btn-primary px-8 py-3 text-lg">
                Read Full Documentation
                <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Component card with interactive demo
interface ComponentCardProps {
  name: string
  category: string
  showCode: string | null
  setShowCode: (id: string | null) => void
}

function ComponentCard({ name, category, showCode, setShowCode }: ComponentCardProps) {
  const isShowingCode = showCode === name
  const demo = componentDemos[name] || { preview: <DefaultPreview name={name} />, code: getDefaultCode(name) }

  return (
    <div className="group relative bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

      <div className="p-4 border-b border-border flex justify-between items-start">
        <div>
          <h3 className="text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-xs text-muted-foreground">{category}</p>
        </div>
        <button
          onClick={() => setShowCode(isShowingCode ? null : name)}
          className={`p-2 rounded-lg transition-all ${
            isShowingCode
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          }`}
          title={isShowingCode ? 'Hide code' : 'Show code'}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </button>
      </div>

      {isShowingCode ? (
        <div className="p-4 bg-secondary/50 overflow-x-auto max-h-48">
          <pre className="text-xs text-muted-foreground font-mono whitespace-pre-wrap">{demo.code}</pre>
        </div>
      ) : (
        <div className="p-4 bg-muted/30 min-h-[120px] flex items-center justify-center">
          {demo.preview}
        </div>
      )}
    </div>
  )
}

// Default preview for components without custom demos
function DefaultPreview({ name }: { name: string }) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-primary/10 flex items-center justify-center">
        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      </div>
      <p className="text-sm text-muted-foreground">{name}</p>
    </div>
  )
}

function getDefaultCode(name: string): string {
  const kebabName = name.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '')
  return `<div data-coral-${kebabName}>
  <!-- ${name} content -->
</div>`
}

// Interactive component demos
const componentDemos: Record<string, { preview: React.ReactNode; code: string }> = {
  // Overlays
  Dialog: {
    preview: <DialogPreview />,
    code: `<div data-coral-dialog>
  <button data-coral-dialog-trigger>Open</button>
  <div data-coral-dialog-backdrop />
  <div data-coral-dialog-content>
    <h2>Dialog Title</h2>
    <button data-coral-dialog-close>Close</button>
  </div>
</div>`
  },
  Drawer: {
    preview: <DrawerPreview />,
    code: `<div data-coral-drawer data-placement="right">
  <button data-coral-drawer-trigger>Open</button>
  <div data-coral-drawer-content>
    Drawer content
  </div>
</div>`
  },
  Popover: {
    preview: <PopoverPreview />,
    code: `<div data-coral-popover>
  <button data-coral-popover-trigger>Toggle</button>
  <div data-coral-popover-content>
    Popover content
  </div>
</div>`
  },
  Tooltip: {
    preview: <TooltipPreview />,
    code: `<div data-coral-tooltip>
  <button data-coral-tooltip-trigger>Hover</button>
  <div data-coral-tooltip-content>Tooltip</div>
</div>`
  },
  Toast: {
    preview: <ToastPreview />,
    code: `createToast({
  message: 'Success!',
  type: 'success',
  duration: 3000
})`
  },
  // Navigation
  Tabs: {
    preview: <TabsPreview />,
    code: `<div data-coral-tabs>
  <div data-coral-tabs-list>
    <button data-coral-tabs-tab>Tab 1</button>
    <button data-coral-tabs-tab>Tab 2</button>
  </div>
  <div data-coral-tabs-panel>Panel 1</div>
  <div data-coral-tabs-panel>Panel 2</div>
</div>`
  },
  Menu: {
    preview: <MenuPreview />,
    code: `<nav data-coral-menu>
  <button data-coral-menu-item>Home</button>
  <button data-coral-menu-item>About</button>
</nav>`
  },
  Breadcrumb: {
    preview: <BreadcrumbPreview />,
    code: `<nav data-coral-breadcrumb>
  <a href="/">Home</a>
  <span>/</span>
  <span>Current</span>
</nav>`
  },
  Pagination: {
    preview: <PaginationPreview />,
    code: `<nav data-coral-pagination>
  <button data-coral-pagination-prev />
  <button data-coral-pagination-page>1</button>
  <button data-coral-pagination-next />
</nav>`
  },
  Stepper: {
    preview: <StepperPreview />,
    code: `<div data-coral-stepper>
  <div data-coral-stepper-step data-completed>1</div>
  <div data-coral-stepper-step data-active>2</div>
  <div data-coral-stepper-step>3</div>
</div>`
  },
  // Forms
  Select: {
    preview: <SelectPreview />,
    code: `<div data-coral-select>
  <button data-coral-select-trigger>Select</button>
  <div data-coral-select-content>
    <button data-coral-select-option>Opt 1</button>
  </div>
</div>`
  },
  Switch: {
    preview: <SwitchPreview />,
    code: `<button data-coral-switch role="switch">
  <span data-coral-switch-thumb />
</button>`
  },
  Slider: {
    preview: <SliderPreview />,
    code: `<div data-coral-slider>
  <input type="range" min="0" max="100" />
</div>`
  },
  Checkbox: {
    preview: <CheckboxPreview />,
    code: `<label data-coral-checkbox>
  <input type="checkbox" />
  <span>Remember me</span>
</label>`
  },
  Radio: {
    preview: <RadioPreview />,
    code: `<div data-coral-radio-group>
  <label><input type="radio" name="opt" /> A</label>
  <label><input type="radio" name="opt" /> B</label>
</div>`
  },
  Input: {
    preview: <InputPreview />,
    code: `<div data-coral-input>
  <input type="text" placeholder="Enter text" />
</div>`
  },
  Textarea: {
    preview: <TextareaPreview />,
    code: `<div data-coral-textarea>
  <textarea placeholder="Message..."></textarea>
</div>`
  },
  NumberInput: {
    preview: <NumberInputPreview />,
    code: `<div data-coral-number-input>
  <button>-</button>
  <input type="number" value="5" />
  <button>+</button>
</div>`
  },
  PinInput: {
    preview: <PinInputPreview />,
    code: `<div data-coral-pin-input length="4">
  <input /> <input /> <input /> <input />
</div>`
  },
  FileUpload: {
    preview: <FileUploadPreview />,
    code: `<div data-coral-file-upload>
  <input type="file" />
  <div data-coral-file-upload-dropzone>
    Drop files here
  </div>
</div>`
  },
  ColorPicker: {
    preview: <ColorPickerPreview />,
    code: `<div data-coral-color-picker>
  <button data-coral-color-picker-trigger>
    <span data-coral-color-picker-swatch />
  </button>
</div>`
  },
  DatePicker: {
    preview: <DatePickerPreview />,
    code: `<div data-coral-date-picker>
  <input type="date" />
</div>`
  },
  SearchInput: {
    preview: <SearchInputPreview />,
    code: `<div data-coral-search-input>
  <svg data-coral-search-icon />
  <input type="search" placeholder="Search..." />
</div>`
  },
  // Data Display
  Accordion: {
    preview: <AccordionPreview />,
    code: `<div data-coral-accordion>
  <div data-coral-accordion-item>
    <button data-coral-accordion-trigger>Title</button>
    <div data-coral-accordion-content>Content</div>
  </div>
</div>`
  },
  Avatar: {
    preview: <AvatarPreview />,
    code: `<div data-coral-avatar>
  <img src="/avatar.jpg" alt="User" />
  <span data-coral-avatar-fallback>JD</span>
</div>`
  },
  Progress: {
    preview: <ProgressPreview />,
    code: `<div data-coral-progress value="75">
  <div data-coral-progress-bar />
</div>`
  },
  Skeleton: {
    preview: <SkeletonPreview />,
    code: `<div data-coral-skeleton>
  <div class="animate-pulse bg-muted h-4" />
</div>`
  },
  Rating: {
    preview: <RatingPreview />,
    code: `<div data-coral-rating value="3">
  <button data-coral-rating-star />
  <button data-coral-rating-star />
  <button data-coral-rating-star />
</div>`
  },
  Badge: {
    preview: <BadgePreview />,
    code: `<span data-coral-badge>New</span>
<span data-coral-badge data-variant="success">Active</span>`
  },
  Chip: {
    preview: <ChipPreview />,
    code: `<span data-coral-chip>
  React
  <button data-coral-chip-remove>×</button>
</span>`
  },
  Card: {
    preview: <CardPreview />,
    code: `<div data-coral-card>
  <div data-coral-card-header>Title</div>
  <div data-coral-card-content>Content</div>
  <div data-coral-card-footer>Footer</div>
</div>`
  },
  Timeline: {
    preview: <TimelinePreview />,
    code: `<div data-coral-timeline>
  <div data-coral-timeline-item>
    <div data-coral-timeline-dot />
    <div>Event 1</div>
  </div>
</div>`
  },
  Stat: {
    preview: <StatPreview />,
    code: `<div data-coral-stat>
  <span data-coral-stat-value>12.5K</span>
  <span data-coral-stat-label>Users</span>
</div>`
  },
  DataTable: {
    preview: <DataTablePreview />,
    code: `<table data-coral-table>
  <thead>
    <tr><th data-coral-table-sortable>Name</th></tr>
  </thead>
  <tbody>
    <tr><td>John</td></tr>
  </tbody>
</table>`
  },
  Code: {
    preview: <CodePreview />,
    code: `<pre data-coral-code>
  <code>const x = 'Hello';</code>
</pre>`
  },
  Calendar: {
    preview: <CalendarPreview />,
    code: `<div data-coral-calendar>
  <div data-coral-calendar-header />
  <div data-coral-calendar-grid />
</div>`
  },
  // Feedback
  Alert: {
    preview: <AlertPreview />,
    code: `<div data-coral-alert data-variant="info">
  <p data-coral-alert-title>Info</p>
  <p data-coral-alert-description>Message</p>
</div>`
  },
  Spinner: {
    preview: <SpinnerPreview />,
    code: `<div data-coral-spinner class="animate-spin" />`
  },
  EmptyState: {
    preview: <EmptyStatePreview />,
    code: `<div data-coral-empty-state>
  <svg data-coral-empty-state-icon />
  <h3>No items</h3>
  <button>Create</button>
</div>`
  },
  Banner: {
    preview: <BannerPreview />,
    code: `<div data-coral-banner data-variant="info">
  <p>Important announcement!</p>
  <button data-coral-banner-dismiss>×</button>
</div>`
  },
  Notification: {
    preview: <NotificationPreview />,
    code: `<div data-coral-notification>
  <div data-coral-notification-icon />
  <div data-coral-notification-content>
    <p data-coral-notification-title>New message</p>
    <p data-coral-notification-description>...</p>
  </div>
</div>`
  },
  // Layout
  Divider: {
    preview: <DividerPreview />,
    code: `<div data-coral-divider />
<div data-coral-divider data-orientation="vertical" />`
  },
  AspectRatio: {
    preview: <AspectRatioPreview />,
    code: `<div data-coral-aspect-ratio data-ratio="16/9">
  <img src="image.jpg" />
</div>`
  },
  ScrollArea: {
    preview: <ScrollAreaPreview />,
    code: `<div data-coral-scroll-area>
  <div data-coral-scroll-viewport>
    <!-- scrollable content -->
  </div>
</div>`
  },
  Collapsible: {
    preview: <CollapsiblePreview />,
    code: `<div data-coral-collapsible>
  <button data-coral-collapsible-trigger>Toggle</button>
  <div data-coral-collapsible-content>Content</div>
</div>`
  },
  Resizable: {
    preview: <ResizablePreview />,
    code: `<div data-coral-resizable>
  <div data-coral-resizable-panel>A</div>
  <div data-coral-resizable-handle />
  <div data-coral-resizable-panel>B</div>
</div>`
  },
  // Typography
  Heading: {
    preview: <HeadingPreview />,
    code: `<h1 data-coral-heading data-size="xl">Heading</h1>
<h2 data-coral-heading data-size="lg">Subtitle</h2>`
  },
  Blockquote: {
    preview: <BlockquotePreview />,
    code: `<blockquote data-coral-blockquote>
  <p>Quote text...</p>
  <cite>— Author</cite>
</blockquote>`
  },
  Highlight: {
    preview: <HighlightPreview />,
    code: `<p>This is <mark data-coral-highlight>highlighted</mark> text.</p>`
  },
  Truncate: {
    preview: <TruncatePreview />,
    code: `<p data-coral-truncate data-lines="2">
  Long text that will be truncated...
</p>`
  },
  // Buttons
  Button: {
    preview: <ButtonPreview />,
    code: `<button data-coral-button>Default</button>
<button data-coral-button data-variant="primary">Primary</button>
<button data-coral-button data-variant="outline">Outline</button>`
  },
  IconButton: {
    preview: <IconButtonPreview />,
    code: `<button data-coral-icon-button aria-label="Menu">
  <svg>...</svg>
</button>`
  },
  ButtonGroup: {
    preview: <ButtonGroupPreview />,
    code: `<div data-coral-button-group>
  <button>Left</button>
  <button>Center</button>
  <button>Right</button>
</div>`
  },
  CopyButton: {
    preview: <CopyButtonPreview />,
    code: `<button data-coral-copy-button data-value="text to copy">
  Copy
</button>`
  },
  // Advanced
  Command: {
    preview: <CommandPreview />,
    code: `<div data-coral-command>
  <input data-coral-command-input />
  <div data-coral-command-list>
    <button data-coral-command-item>Action</button>
  </div>
</div>`
  },
  Carousel: {
    preview: <CarouselPreview />,
    code: `<div data-coral-carousel>
  <div data-coral-carousel-track>
    <div data-coral-carousel-slide>1</div>
    <div data-coral-carousel-slide>2</div>
  </div>
  <button data-coral-carousel-prev />
  <button data-coral-carousel-next />
</div>`
  },
  ContextMenu: {
    preview: <ContextMenuPreview />,
    code: `<div data-coral-context-menu>
  <div data-coral-context-menu-trigger>Right click</div>
  <div data-coral-context-menu-content>
    <button data-coral-context-menu-item>Cut</button>
  </div>
</div>`
  },
  Dropdown: {
    preview: <DropdownPreview />,
    code: `<div data-coral-dropdown>
  <button data-coral-dropdown-trigger>Options</button>
  <div data-coral-dropdown-content>
    <button data-coral-dropdown-item>Edit</button>
  </div>
</div>`
  },
  Marquee: {
    preview: <MarqueePreview />,
    code: `<div data-coral-marquee>
  <div data-coral-marquee-content>
    Scrolling text...
  </div>
</div>`
  },
  Kbd: {
    preview: <KbdPreview />,
    code: `<kbd data-coral-kbd>Ctrl</kbd>+<kbd data-coral-kbd>K</kbd>`
  },
  Tree: {
    preview: <TreePreview />,
    code: `<div data-coral-tree>
  <div data-coral-tree-item>
    <button data-coral-tree-toggle />
    <span>Folder</span>
  </div>
</div>`
  },
  // Selection
  Combobox: {
    preview: <ComboboxPreview />,
    code: `<div data-coral-combobox>
  <input data-coral-combobox-input />
  <div data-coral-combobox-options>
    <button data-coral-combobox-option>Option</button>
  </div>
</div>`
  },
  TagInput: {
    preview: <TagInputPreview />,
    code: `<div data-coral-tag-input>
  <span data-coral-tag>React <button>×</button></span>
  <input placeholder="Add tag..." />
</div>`
  },
  MultiSelect: {
    preview: <MultiSelectPreview />,
    code: `<div data-coral-multi-select>
  <button data-coral-multi-select-trigger>Select items</button>
  <div data-coral-multi-select-content>
    <label><input type="checkbox" /> Option 1</label>
  </div>
</div>`
  },
  SegmentedControl: {
    preview: <SegmentedControlPreview />,
    code: `<div data-coral-segmented-control>
  <button data-coral-segment data-active>Daily</button>
  <button data-coral-segment>Weekly</button>
  <button data-coral-segment>Monthly</button>
</div>`
  },
  // Time
  TimePicker: {
    preview: <TimePickerPreview />,
    code: `<div data-coral-time-picker>
  <input type="time" />
</div>`
  },
  Countdown: {
    preview: <CountdownPreview />,
    code: `<div data-coral-countdown data-target="2025-01-01">
  <span data-coral-countdown-days>00</span>d
  <span data-coral-countdown-hours>00</span>h
  <span data-coral-countdown-minutes>00</span>m
</div>`
  },
  Clock: {
    preview: <ClockPreview />,
    code: `<div data-coral-clock>
  <span data-coral-clock-hours>12</span>:
  <span data-coral-clock-minutes>00</span>
</div>`
  },
  RelativeTime: {
    preview: <RelativeTimePreview />,
    code: `<time data-coral-relative-time datetime="2025-01-01">
  2 days ago
</time>`
  },
  // Charts
  BarChart: {
    preview: <BarChartPreview />,
    code: `<div data-coral-bar-chart>
  <div data-coral-bar data-value="75" />
  <div data-coral-bar data-value="50" />
</div>`
  },
  LineChart: {
    preview: <LineChartPreview />,
    code: `<div data-coral-line-chart data-points="10,50,25,75,40">
  <svg data-coral-line-path />
</div>`
  },
  PieChart: {
    preview: <PieChartPreview />,
    code: `<div data-coral-pie-chart>
  <svg data-coral-pie-segment data-value="60" />
  <svg data-coral-pie-segment data-value="40" />
</div>`
  },
  Sparkline: {
    preview: <SparklinePreview />,
    code: `<div data-coral-sparkline data-values="5,10,5,20,8,15" />`
  },
  Gauge: {
    preview: <GaugePreview />,
    code: `<div data-coral-gauge data-value="75" data-max="100">
  <svg data-coral-gauge-arc />
</div>`
  },
  Meter: {
    preview: <MeterPreview />,
    code: `<div data-coral-meter value="75" min="0" max="100">
  <div data-coral-meter-bar />
</div>`
  },
  // E-commerce
  ProductCard: {
    preview: <ProductCardPreview />,
    code: `<div data-coral-product-card>
  <img data-coral-product-image />
  <h3 data-coral-product-title>Product</h3>
  <span data-coral-product-price>$99</span>
  <button data-coral-add-to-cart>Add to Cart</button>
</div>`
  },
  QuantitySelector: {
    preview: <QuantitySelectorPreview />,
    code: `<div data-coral-quantity-selector>
  <button data-coral-quantity-decrement>-</button>
  <input type="number" value="1" />
  <button data-coral-quantity-increment>+</button>
</div>`
  },
  PriceTag: {
    preview: <PriceTagPreview />,
    code: `<div data-coral-price-tag>
  <span data-coral-price-original>$199</span>
  <span data-coral-price-sale>$149</span>
  <span data-coral-price-discount>-25%</span>
</div>`
  },
  // Social
  UserCard: {
    preview: <UserCardPreview />,
    code: `<div data-coral-user-card>
  <div data-coral-user-avatar />
  <div data-coral-user-name>John Doe</div>
  <div data-coral-user-role>Designer</div>
</div>`
  },
  ReactionPicker: {
    preview: <ReactionPickerPreview />,
    code: `<div data-coral-reaction-picker>
  <button data-coral-reaction>👍</button>
  <button data-coral-reaction>❤️</button>
  <button data-coral-reaction>😂</button>
</div>`
  },
  // Modern CSS
  Card3D: {
    preview: <Card3DPreview />,
    code: `.card-3d {
  perspective: 1000px;
}
.card-3d:hover .card-3d-inner {
  transform: rotateY(180deg);
}`
  },
  WideGamutColors: {
    preview: <WideGamutPreview />,
    code: `/* oklch colors for vibrant hues */
.bg-vivid-red {
  background: oklch(65% 0.29 29);
}`
  },
  EntryAnimations: {
    preview: <EntryAnimationsPreview />,
    code: `/* @starting-style */
.fade-in {
  @starting-style { opacity: 0; }
  transition: opacity 0.3s;
}`
  },
  ContainerQuery: {
    preview: <ContainerQueryPreview />,
    code: `.container { container-type: inline-size; }
@container (min-width: 400px) {
  .card { flex-direction: row; }
}`
  },
  HasSelector: {
    preview: <HasSelectorPreview />,
    code: `/* :has() selector */
.card:has(:checked) {
  border-color: var(--primary);
}`
  },
}

// Preview Components
function DialogPreview() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)} className="btn btn-primary text-sm">Open Dialog</button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative bg-card rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl animate-fade-in">
            <h2 className="font-semibold mb-2">Dialog</h2>
            <p className="text-sm text-muted-foreground mb-4">Fully accessible modal dialog.</p>
            <button onClick={() => setOpen(false)} className="btn btn-primary text-sm w-full">Close</button>
          </div>
        </div>
      )}
    </>
  )
}

function DrawerPreview() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)} className="btn btn-secondary text-sm">Open Drawer</button>
      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-card shadow-xl p-4 animate-slide-in-right">
            <h2 className="font-semibold mb-2">Drawer</h2>
            <button onClick={() => setOpen(false)} className="text-sm text-primary">Close</button>
          </div>
        </div>
      )}
    </>
  )
}

function PopoverPreview() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="btn btn-secondary text-sm">Toggle</button>
      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-card rounded-lg shadow-xl border p-3 w-48 animate-fade-in z-10">
          <p className="text-sm">Popover content</p>
        </div>
      )}
    </div>
  )
}

function TooltipPreview() {
  const [show, setShow] = useState(false)
  return (
    <div className="relative">
      <button
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="btn btn-secondary text-sm"
      >
        Hover me
      </button>
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-secondary text-foreground text-xs rounded animate-fade-in whitespace-nowrap">
          Tooltip text
        </div>
      )}
    </div>
  )
}

function ToastPreview() {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <button onClick={() => { setVisible(true); setTimeout(() => setVisible(false), 2000) }} className="btn btn-primary text-sm">Show Toast</button>
      {visible && (
        <div className="fixed bottom-4 right-4 px-4 py-2 bg-success text-white rounded-lg shadow-lg animate-slide-in-right z-50">
          Success!
        </div>
      )}
    </>
  )
}

function TabsPreview() {
  const [active, setActive] = useState(0)
  return (
    <div className="w-full">
      <div className="flex border-b text-sm">
        {['Tab 1', 'Tab 2'].map((tab, i) => (
          <button key={tab} onClick={() => setActive(i)} className={`px-3 py-1.5 border-b-2 ${active === i ? 'border-primary text-primary' : 'border-transparent'}`}>{tab}</button>
        ))}
      </div>
      <div className="p-2 text-sm text-muted-foreground">Content {active + 1}</div>
    </div>
  )
}

function MenuPreview() {
  return (
    <nav className="bg-card rounded-lg border p-1 w-32 text-sm">
      <button className="w-full text-left px-2 py-1 rounded hover:bg-muted">Home</button>
      <button className="w-full text-left px-2 py-1 rounded hover:bg-muted">About</button>
      <button className="w-full text-left px-2 py-1 rounded hover:bg-muted">Contact</button>
    </nav>
  )
}

function BreadcrumbPreview() {
  return (
    <nav className="flex items-center gap-1 text-xs">
      <a href="#" className="text-primary hover:underline">Home</a>
      <span>/</span>
      <a href="#" className="text-primary hover:underline">Products</a>
      <span>/</span>
      <span className="text-foreground">Current</span>
    </nav>
  )
}

function PaginationPreview() {
  const [page, setPage] = useState(1)
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3].map(p => (
        <button key={p} onClick={() => setPage(p)} className={`w-8 h-8 rounded text-sm ${page === p ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>{p}</button>
      ))}
    </div>
  )
}

function StepperPreview() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">✓</div>
      <div className="w-12 h-0.5 bg-primary" />
      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">2</div>
      <div className="w-12 h-0.5 bg-muted" />
      <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm">3</div>
    </div>
  )
}

function SelectPreview() {
  const [open, setOpen] = useState(false)
  const [val, setVal] = useState('')
  return (
    <div className="relative w-32">
      <button onClick={() => setOpen(!open)} className="w-full px-2 py-1.5 border rounded text-sm text-left flex justify-between items-center">
        {val || 'Select'}<span>▼</span>
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border rounded shadow-lg z-10">
          {['React', 'Vue', 'Angular'].map(opt => (
            <button key={opt} onClick={() => { setVal(opt); setOpen(false) }} className="w-full text-left px-2 py-1 text-sm hover:bg-muted">{opt}</button>
          ))}
        </div>
      )}
    </div>
  )
}

function SwitchPreview() {
  const [on, setOn] = useState(false)
  return (
    <button onClick={() => setOn(!on)} className={`w-12 h-6 rounded-full transition-colors ${on ? 'bg-primary' : 'bg-muted'}`}>
      <span className={`block w-5 h-5 bg-white rounded-full shadow transition-transform ${on ? 'translate-x-6' : 'translate-x-0.5'}`} />
    </button>
  )
}

function SliderPreview() {
  return <input type="range" className="w-full accent-primary" defaultValue={50} />
}

function CheckboxPreview() {
  const [checked, setChecked] = useState(false)
  return (
    <label className="flex items-center gap-2 text-sm cursor-pointer">
      <input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)} className="w-4 h-4 accent-primary" />
      Remember me
    </label>
  )
}

function RadioPreview() {
  return (
    <div className="flex gap-4 text-sm">
      <label className="flex items-center gap-1 cursor-pointer"><input type="radio" name="opt" className="accent-primary" /> Option A</label>
      <label className="flex items-center gap-1 cursor-pointer"><input type="radio" name="opt" className="accent-primary" /> Option B</label>
    </div>
  )
}

function InputPreview() {
  return <input type="text" placeholder="Enter text..." className="px-3 py-1.5 border rounded text-sm w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/50" />
}

function TextareaPreview() {
  return <textarea placeholder="Message..." className="px-3 py-1.5 border rounded text-sm w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none h-16" />
}

function NumberInputPreview() {
  const [val, setVal] = useState(5)
  return (
    <div className="flex items-center border rounded overflow-hidden">
      <button onClick={() => setVal(v => Math.max(0, v - 1))} className="px-3 py-1 hover:bg-muted">-</button>
      <span className="px-4 py-1 border-x text-sm">{val}</span>
      <button onClick={() => setVal(v => v + 1)} className="px-3 py-1 hover:bg-muted">+</button>
    </div>
  )
}

function PinInputPreview() {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4].map(i => (
        <input key={i} type="text" maxLength={1} className="w-10 h-10 border rounded text-center text-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-transparent" />
      ))}
    </div>
  )
}

function FileUploadPreview() {
  return (
    <div className="border-2 border-dashed rounded-lg p-4 text-center text-sm text-muted-foreground hover:border-primary/50 transition-colors cursor-pointer">
      <p>Drop files here</p>
      <p className="text-xs mt-1">or click to browse</p>
    </div>
  )
}

function ColorPickerPreview() {
  const [color, setColor] = useState('#ff7f50')
  return (
    <div className="flex items-center gap-2">
      <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer" />
      <span className="text-sm font-mono">{color}</span>
    </div>
  )
}

function DatePickerPreview() {
  return <input type="date" className="px-3 py-1.5 border rounded text-sm bg-transparent" />
}

function SearchInputPreview() {
  return (
    <div className="relative">
      <svg className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input type="search" placeholder="Search..." className="pl-8 pr-3 py-1.5 border rounded text-sm w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/50" />
    </div>
  )
}

function AccordionPreview() {
  const [open, setOpen] = useState(false)
  return (
    <div className="w-full border rounded">
      <button onClick={() => setOpen(!open)} className="w-full px-3 py-2 text-left text-sm flex justify-between items-center hover:bg-muted">
        <span>Accordion Item</span>
        <span className={`transition-transform ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {open && <div className="px-3 py-2 text-sm text-muted-foreground border-t">Accordion content here.</div>}
    </div>
  )
}

function AvatarPreview() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">JD</div>
      <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-medium">AB</div>
      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-medium">+3</div>
    </div>
  )
}

function ProgressPreview() {
  return (
    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
      <div className="h-full bg-primary rounded-full" style={{ width: '75%' }} />
    </div>
  )
}

function SkeletonPreview() {
  return (
    <div className="space-y-2 w-full">
      <div className="h-4 bg-muted rounded animate-pulse" />
      <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
      <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
    </div>
  )
}

function RatingPreview() {
  const [rating, setRating] = useState(3)
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <button key={star} onClick={() => setRating(star)} className={`text-xl ${star <= rating ? 'text-warning' : 'text-muted'}`}>★</button>
      ))}
    </div>
  )
}

function BadgePreview() {
  return (
    <div className="flex gap-2">
      <span className="px-2 py-0.5 text-xs rounded-full bg-primary text-primary-foreground">New</span>
      <span className="px-2 py-0.5 text-xs rounded-full bg-success text-white">Active</span>
      <span className="px-2 py-0.5 text-xs rounded-full bg-warning text-white">Pending</span>
    </div>
  )
}

function ChipPreview() {
  const [chips, setChips] = useState(['React', 'Vue', 'Angular'])
  return (
    <div className="flex flex-wrap gap-1">
      {chips.map(chip => (
        <span key={chip} className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-muted rounded-full">
          {chip}
          <button onClick={() => setChips(chips.filter(c => c !== chip))} className="hover:text-destructive">×</button>
        </span>
      ))}
    </div>
  )
}

function CardPreview() {
  return (
    <div className="bg-card border rounded-lg overflow-hidden w-full">
      <div className="p-3 border-b font-medium text-sm">Card Title</div>
      <div className="p-3 text-sm text-muted-foreground">Card content goes here.</div>
    </div>
  )
}

function TimelinePreview() {
  return (
    <div className="space-y-4">
      {['Event 1', 'Event 2'].map((event, i) => (
        <div key={i} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-primary" />
            {i < 1 && <div className="w-0.5 h-8 bg-border" />}
          </div>
          <p className="text-sm">{event}</p>
        </div>
      ))}
    </div>
  )
}

function StatPreview() {
  return (
    <div className="text-center">
      <p className="text-2xl font-bold text-foreground">12.5K</p>
      <p className="text-sm text-muted-foreground">Total Users</p>
      <p className="text-xs text-success">↑ 12%</p>
    </div>
  )
}

function DataTablePreview() {
  return (
    <table className="w-full text-sm">
      <thead><tr className="border-b"><th className="py-1 text-left">Name</th><th className="py-1 text-left">Role</th></tr></thead>
      <tbody>
        <tr className="border-b hover:bg-muted/50"><td className="py-1">John</td><td className="py-1">Admin</td></tr>
        <tr className="hover:bg-muted/50"><td className="py-1">Jane</td><td className="py-1">User</td></tr>
      </tbody>
    </table>
  )
}

function CodePreview() {
  return (
    <pre className="bg-secondary/50 rounded p-2 text-xs font-mono overflow-x-auto">
      <code>{`const greeting = 'Hello';`}</code>
    </pre>
  )
}

function CalendarPreview() {
  return (
    <div className="bg-card border rounded-lg p-2 text-xs">
      <div className="flex justify-between items-center mb-2">
        <button className="p-1 hover:bg-muted rounded">←</button>
        <span className="font-medium">Jan 2025</span>
        <button className="p-1 hover:bg-muted rounded">→</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="text-muted-foreground">{d}</div>)}
        {[...Array(31)].map((_, i) => (
          <button key={i} className={`p-1 rounded hover:bg-muted ${i === 14 ? 'bg-primary text-primary-foreground' : ''}`}>{i + 1}</button>
        ))}
      </div>
    </div>
  )
}

function AlertPreview() {
  return (
    <div className="flex items-start gap-2 p-3 bg-info/10 border border-info/30 rounded-lg">
      <svg className="w-5 h-5 text-info flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
      <div className="text-sm"><p className="font-medium">Info</p><p className="text-muted-foreground">Information message</p></div>
    </div>
  )
}

function SpinnerPreview() {
  return (
    <div className="flex gap-4">
      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      <div className="w-6 h-6 border-2 border-muted border-t-primary rounded-full animate-spin" />
    </div>
  )
}

function EmptyStatePreview() {
  return (
    <div className="text-center py-4">
      <div className="w-12 h-12 mx-auto mb-2 bg-muted rounded-full flex items-center justify-center">
        <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>
      <p className="text-sm text-muted-foreground">No items found</p>
    </div>
  )
}

function BannerPreview() {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm">
      <span>New feature available!</span>
      <button className="hover:opacity-80">×</button>
    </div>
  )
}

function NotificationPreview() {
  return (
    <div className="flex items-start gap-3 p-3 bg-card border rounded-lg">
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
        <span className="text-primary">✉</span>
      </div>
      <div className="text-sm">
        <p className="font-medium">New message</p>
        <p className="text-muted-foreground text-xs">You have a new message</p>
      </div>
    </div>
  )
}

function DividerPreview() {
  return (
    <div className="flex items-center gap-4 w-full">
      <div className="flex-1 h-px bg-border" />
      <span className="text-xs text-muted-foreground">OR</span>
      <div className="flex-1 h-px bg-border" />
    </div>
  )
}

function AspectRatioPreview() {
  return (
    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
      <div className="absolute inset-0 bg-muted rounded flex items-center justify-center text-sm text-muted-foreground">16:9</div>
    </div>
  )
}

function ScrollAreaPreview() {
  return (
    <div className="h-24 overflow-auto border rounded p-2 text-sm">
      {[...Array(10)].map((_, i) => <p key={i} className="py-1">Scroll item {i + 1}</p>)}
    </div>
  )
}

function CollapsiblePreview() {
  const [open, setOpen] = useState(false)
  return (
    <div className="w-full">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2 text-sm font-medium">
        <span className={`transition-transform ${open ? 'rotate-90' : ''}`}>▶</span>
        Toggle content
      </button>
      {open && <div className="mt-2 p-2 bg-muted rounded text-sm">Collapsible content</div>}
    </div>
  )
}

function ResizablePreview() {
  return (
    <div className="flex h-20 border rounded overflow-hidden w-full">
      <div className="flex-1 bg-muted/50 flex items-center justify-center text-sm">Panel A</div>
      <div className="w-1 bg-border cursor-col-resize hover:bg-primary/50" />
      <div className="flex-1 bg-muted/30 flex items-center justify-center text-sm">Panel B</div>
    </div>
  )
}

function HeadingPreview() {
  return (
    <div className="space-y-1">
      <h1 className="text-xl font-bold">Heading 1</h1>
      <h2 className="text-lg font-semibold text-muted-foreground">Heading 2</h2>
    </div>
  )
}

function BlockquotePreview() {
  return (
    <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground text-sm">
      "Design is not just what it looks like, design is how it works."
      <cite className="block mt-1 text-xs not-italic">— Steve Jobs</cite>
    </blockquote>
  )
}

function HighlightPreview() {
  return (
    <p className="text-sm">
      This is <mark className="bg-warning/30 px-1 rounded">highlighted</mark> text.
    </p>
  )
}

function TruncatePreview() {
  return (
    <p className="text-sm line-clamp-2 w-32">
      This is a very long text that will be truncated after two lines of content.
    </p>
  )
}

function ButtonPreview() {
  return (
    <div className="flex gap-2">
      <button className="btn btn-primary text-sm">Primary</button>
      <button className="btn btn-secondary text-sm">Secondary</button>
      <button className="btn btn-outline text-sm">Outline</button>
    </div>
  )
}

function IconButtonPreview() {
  return (
    <div className="flex gap-2">
      <button className="p-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>
      <button className="p-2 rounded-lg bg-muted hover:bg-accent">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </button>
    </div>
  )
}

function ButtonGroupPreview() {
  return (
    <div className="inline-flex rounded-lg overflow-hidden border">
      <button className="px-3 py-1.5 text-sm bg-primary text-primary-foreground">Left</button>
      <button className="px-3 py-1.5 text-sm border-x hover:bg-muted">Center</button>
      <button className="px-3 py-1.5 text-sm hover:bg-muted">Right</button>
    </div>
  )
}

function CopyButtonPreview() {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000) }}
      className="flex items-center gap-1 px-3 py-1.5 text-sm border rounded hover:bg-muted"
    >
      {copied ? '✓ Copied!' : '📋 Copy'}
    </button>
  )
}

function CommandPreview() {
  return (
    <div className="w-48 bg-card border rounded-lg overflow-hidden">
      <div className="p-2 border-b">
        <input type="text" placeholder="Search..." className="w-full text-sm bg-transparent focus:outline-none" />
      </div>
      <div className="p-1">
        {['New File', 'Open', 'Save'].map(item => (
          <button key={item} className="w-full text-left px-2 py-1 text-sm rounded hover:bg-muted">{item}</button>
        ))}
      </div>
    </div>
  )
}

function CarouselPreview() {
  const [idx, setIdx] = useState(0)
  return (
    <div className="relative w-full">
      <div className="flex overflow-hidden rounded-lg">
        {['Slide 1', 'Slide 2', 'Slide 3'].map((slide, i) => (
          <div key={i} className={`flex-shrink-0 w-full h-20 flex items-center justify-center bg-muted transition-transform ${i === idx ? '' : 'hidden'}`}>{slide}</div>
        ))}
      </div>
      <div className="flex justify-center gap-1 mt-2">
        {[0, 1, 2].map(i => (
          <button key={i} onClick={() => setIdx(i)} className={`w-2 h-2 rounded-full ${idx === i ? 'bg-primary' : 'bg-muted'}`} />
        ))}
      </div>
    </div>
  )
}

function ContextMenuPreview() {
  return (
    <div className="text-center p-4 border-2 border-dashed rounded text-sm text-muted-foreground">
      Right-click for menu
    </div>
  )
}

function DropdownPreview() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-1 px-3 py-1.5 text-sm border rounded hover:bg-muted">
        Options <span>▼</span>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-card border rounded-lg shadow-lg z-10 py-1 min-w-[120px]">
          <button className="w-full text-left px-3 py-1.5 text-sm hover:bg-muted">Edit</button>
          <button className="w-full text-left px-3 py-1.5 text-sm hover:bg-muted">Delete</button>
        </div>
      )}
    </div>
  )
}

function MarqueePreview() {
  return (
    <div className="overflow-hidden w-full">
      <div className="animate-marquee whitespace-nowrap text-sm">
        🚀 Welcome to CoralCSS — The modern CSS framework — Zero dependencies — 150+ components
      </div>
    </div>
  )
}

function KbdPreview() {
  return (
    <div className="flex items-center gap-1">
      <kbd className="px-2 py-0.5 text-xs bg-muted border rounded font-mono">Ctrl</kbd>
      <span>+</span>
      <kbd className="px-2 py-0.5 text-xs bg-muted border rounded font-mono">K</kbd>
    </div>
  )
}

function TreePreview() {
  const [expanded, setExpanded] = useState(true)
  return (
    <div className="text-sm">
      <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-1 hover:bg-muted rounded px-1">
        <span className={`transition-transform ${expanded ? 'rotate-90' : ''}`}>▶</span>
        📁 src
      </button>
      {expanded && (
        <div className="ml-4">
          <div className="flex items-center gap-1 px-1">📄 index.ts</div>
          <div className="flex items-center gap-1 px-1">📄 utils.ts</div>
        </div>
      )}
    </div>
  )
}

function ComboboxPreview() {
  return (
    <div className="relative w-32">
      <input type="text" placeholder="Search..." className="w-full px-2 py-1.5 text-sm border rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/50" />
    </div>
  )
}

function TagInputPreview() {
  return (
    <div className="flex flex-wrap items-center gap-1 p-1 border rounded">
      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-primary/10 text-primary rounded">React <button>×</button></span>
      <input type="text" placeholder="Add..." className="flex-1 min-w-[60px] px-1 py-0.5 text-sm bg-transparent focus:outline-none" />
    </div>
  )
}

function MultiSelectPreview() {
  return (
    <div className="flex flex-wrap gap-1">
      <span className="px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded">React</span>
      <span className="px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded">Vue</span>
      <span className="px-2 py-0.5 text-xs border rounded">+2 more</span>
    </div>
  )
}

function SegmentedControlPreview() {
  const [active, setActive] = useState(0)
  return (
    <div className="inline-flex bg-muted rounded-lg p-0.5">
      {['Daily', 'Weekly', 'Monthly'].map((seg, i) => (
        <button key={seg} onClick={() => setActive(i)} className={`px-3 py-1 text-sm rounded-md transition-colors ${active === i ? 'bg-card shadow text-foreground' : 'text-muted-foreground'}`}>{seg}</button>
      ))}
    </div>
  )
}

function TimePickerPreview() {
  return <input type="time" className="px-3 py-1.5 text-sm border rounded bg-transparent" defaultValue="12:00" />
}

function CountdownPreview() {
  return (
    <div className="flex gap-2 text-center">
      <div className="bg-muted rounded p-2"><span className="text-xl font-bold">05</span><span className="text-xs block text-muted-foreground">Days</span></div>
      <div className="bg-muted rounded p-2"><span className="text-xl font-bold">12</span><span className="text-xs block text-muted-foreground">Hours</span></div>
      <div className="bg-muted rounded p-2"><span className="text-xl font-bold">30</span><span className="text-xs block text-muted-foreground">Mins</span></div>
    </div>
  )
}

function ClockPreview() {
  return (
    <div className="text-2xl font-mono font-bold">
      12:34:56
    </div>
  )
}

function RelativeTimePreview() {
  return (
    <div className="space-y-1 text-sm">
      <p><span className="text-muted-foreground">Created:</span> 2 hours ago</p>
      <p><span className="text-muted-foreground">Updated:</span> Just now</p>
    </div>
  )
}

function BarChartPreview() {
  const data = [75, 50, 90, 60, 85]
  return (
    <div className="flex items-end gap-1 h-16">
      {data.map((val, i) => (
        <div key={i} className="flex-1 bg-primary rounded-t transition-all hover:bg-primary/80" style={{ height: `${val}%` }} />
      ))}
    </div>
  )
}

function LineChartPreview() {
  return (
    <svg viewBox="0 0 100 40" className="w-full h-12">
      <polyline fill="none" stroke="hsl(var(--primary))" strokeWidth="2" points="0,30 20,20 40,25 60,10 80,15 100,5" />
    </svg>
  )
}

function PieChartPreview() {
  return (
    <svg viewBox="0 0 32 32" className="w-16 h-16">
      <circle r="16" cx="16" cy="16" fill="hsl(var(--muted))" />
      <circle r="8" cx="16" cy="16" fill="transparent" stroke="hsl(var(--primary))" strokeWidth="16" strokeDasharray="31.4 50.3" transform="rotate(-90 16 16)" />
    </svg>
  )
}

function SparklinePreview() {
  return (
    <svg viewBox="0 0 60 20" className="w-16 h-5">
      <polyline fill="none" stroke="hsl(var(--success))" strokeWidth="1.5" points="0,15 10,10 20,12 30,5 40,8 50,3 60,6" />
    </svg>
  )
}

function GaugePreview() {
  return (
    <div className="relative w-20 h-10 overflow-hidden">
      <div className="absolute inset-0 border-8 border-muted rounded-t-full" />
      <div className="absolute inset-0 border-8 border-primary rounded-t-full" style={{ clipPath: 'inset(0 25% 0 0)' }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs font-bold">75%</div>
    </div>
  )
}

function MeterPreview() {
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs mb-1">
        <span>Storage</span>
        <span>75%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-warning rounded-full" style={{ width: '75%' }} />
      </div>
    </div>
  )
}

function ProductCardPreview() {
  return (
    <div className="bg-card border rounded-lg overflow-hidden w-full">
      <div className="h-16 bg-muted flex items-center justify-center text-muted-foreground">Image</div>
      <div className="p-2">
        <p className="font-medium text-sm">Product Name</p>
        <p className="text-primary font-bold">$99.00</p>
      </div>
    </div>
  )
}

function QuantitySelectorPreview() {
  const [qty, setQty] = useState(1)
  return (
    <div className="inline-flex items-center border rounded">
      <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-1 hover:bg-muted">-</button>
      <span className="px-3 py-1 border-x min-w-[40px] text-center">{qty}</span>
      <button onClick={() => setQty(qty + 1)} className="px-3 py-1 hover:bg-muted">+</button>
    </div>
  )
}

function PriceTagPreview() {
  return (
    <div className="flex items-baseline gap-2">
      <span className="line-through text-muted-foreground">$199</span>
      <span className="text-xl font-bold text-primary">$149</span>
      <span className="px-1.5 py-0.5 text-xs bg-destructive text-white rounded">-25%</span>
    </div>
  )
}

function UserCardPreview() {
  return (
    <div className="flex items-center gap-3 p-3 bg-card border rounded-lg">
      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">JD</div>
      <div>
        <p className="font-medium text-sm">John Doe</p>
        <p className="text-xs text-muted-foreground">Designer</p>
      </div>
    </div>
  )
}

function ReactionPickerPreview() {
  return (
    <div className="inline-flex gap-1 bg-card border rounded-full p-1">
      {['👍', '❤️', '😂', '😮', '😢'].map(emoji => (
        <button key={emoji} className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center">{emoji}</button>
      ))}
    </div>
  )
}

function Card3DPreview() {
  return (
    <div className="group perspective-1000">
      <div className="w-20 h-20 bg-primary rounded-lg transition-transform duration-500 group-hover:rotate-y-12 group-hover:-rotate-x-12 flex items-center justify-center text-primary-foreground font-bold shadow-xl">
        3D
      </div>
    </div>
  )
}

function WideGamutPreview() {
  return (
    <div className="flex gap-2">
      <div className="w-12 h-12 rounded-lg" style={{ background: 'oklch(65% 0.29 29)' }} title="Vivid Red" />
      <div className="w-12 h-12 rounded-lg" style={{ background: 'oklch(55% 0.25 264)' }} title="Vivid Blue" />
      <div className="w-12 h-12 rounded-lg" style={{ background: 'oklch(75% 0.18 145)' }} title="Vivid Green" />
    </div>
  )
}

function EntryAnimationsPreview() {
  const [show, setShow] = useState(true)
  return (
    <div>
      <button onClick={() => { setShow(false); setTimeout(() => setShow(true), 100) }} className="btn btn-secondary text-sm mb-2">Replay</button>
      {show && <div className="p-4 bg-primary/10 rounded animate-fade-in">Animated Entry!</div>}
    </div>
  )
}

function ContainerQueryPreview() {
  return (
    <div className="w-full p-2 bg-muted/50 rounded text-center text-xs text-muted-foreground">
      Responsive based on container width, not viewport
    </div>
  )
}

function HasSelectorPreview() {
  const [checked, setChecked] = useState(false)
  return (
    <label className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${checked ? 'border-primary bg-primary/5' : ''}`}>
      <input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)} className="accent-primary" />
      <span className="text-sm">Select me</span>
    </label>
  )
}

export default Components
