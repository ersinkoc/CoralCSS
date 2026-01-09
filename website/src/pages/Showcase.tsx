import { useState, useRef, useEffect } from 'react'

function Showcase() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [switchChecked, setSwitchChecked] = useState(true)
  const [activeTab, setActiveTab] = useState('tab1')
  const [accordionOpen, setAccordionOpen] = useState<string | null>('item1')
  const [toasts, setToasts] = useState<Array<{ id: number; variant: string; title: string; message: string }>>([])
  const [progress, setProgress] = useState(65)
  const [sliderValue, setSliderValue] = useState(50)
  const [rating, setRating] = useState(4)
  const [tooltipVisible, setTooltipVisible] = useState<string | null>(null)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)
  const [contextMenuOpen, setContextMenuOpen] = useState(false)
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 })
  const [collapsibleOpen, setCollapsibleOpen] = useState(false)
  const [selectOpen, setSelectOpen] = useState(false)
  const [selectValue, setSelectValue] = useState('option1')
  const [hoverCardVisible, setHoverCardVisible] = useState(false)
  const contextMenuRef = useRef<HTMLDivElement>(null)

  // New impressive interactive states
  const [animatedStats, setAnimatedStats] = useState({ users: 0, revenue: 0, orders: 0, growth: 0 })
  const [draggedFile, setDraggedFile] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedColor, setSelectedColor] = useState('#ff7f50')
  const [pricingPeriod, setPricingPeriod] = useState<'monthly' | 'yearly'>('monthly')
  const [calendarDate, setCalendarDate] = useState(new Date())

  // Animate stats on mount
  useEffect(() => {
    const targets = { users: 12847, revenue: 48291, orders: 2847, growth: 23.5 }
    const duration = 2000
    const start = Date.now()

    const animate = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)

      setAnimatedStats({
        users: Math.floor(targets.users * easeOut),
        revenue: Math.floor(targets.revenue * easeOut),
        orders: Math.floor(targets.orders * easeOut),
        growth: Math.round(targets.growth * easeOut * 10) / 10
      })

      if (progress < 1) requestAnimationFrame(animate)
    }

    const timer = setTimeout(animate, 500)
    return () => clearTimeout(timer)
  }, [])

  const addToast = (variant: string) => {
    const id = Date.now()
    const messages = {
      success: { title: 'Success!', message: 'Your changes have been saved successfully.' },
      error: { title: 'Error', message: 'Something went wrong. Please try again.' },
      warning: { title: 'Warning', message: 'Please review your input before continuing.' },
      info: { title: 'Info', message: 'Your session will expire in 5 minutes.' },
    }
    const msg = messages[variant as keyof typeof messages] || messages.info
    setToasts(prev => [...prev, { id, variant, ...msg }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-primary/10 via-primary/5 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.08),transparent_50%)]" />
        <div className="container text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Live Interactive Demo
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Component <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Showcase</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Beautiful, accessible, theme-aware headless components styled with CoralCSS.
            <span className="block mt-2 text-base">Click, hover, and interact with everything below.</span>
          </p>
        </div>
      </section>

      <div className="container py-16 space-y-24">
        {/* Buttons Section */}
        <section>
          <SectionTitle>Buttons</SectionTitle>
          <div className="grid gap-8">
            <ComponentCard title="Button Variants">
              <div className="flex flex-wrap gap-4">
                <button data-coral-button data-variant="primary">Primary</button>
                <button data-coral-button data-variant="secondary">Secondary</button>
                <button data-coral-button data-variant="outline">Outline</button>
                <button data-coral-button data-variant="ghost">Ghost</button>
                <button data-coral-button data-variant="destructive">Destructive</button>
                <button data-coral-button data-variant="link">Link</button>
              </div>
              <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-border">
                <button data-coral-button data-variant="soft">Soft</button>
                <button data-coral-button data-variant="success">Success</button>
                <button data-coral-button data-variant="warning">Warning</button>
                <button data-coral-button data-variant="info">Info</button>
                <button data-coral-button data-variant="gradient">Gradient</button>
                <button data-coral-button data-variant="glow">Glow</button>
              </div>
            </ComponentCard>

            <ComponentCard title="Button Sizes">
              <div className="flex flex-wrap items-center gap-4">
                <button data-coral-button data-variant="primary" data-size="sm">Small</button>
                <button data-coral-button data-variant="primary">Default</button>
                <button data-coral-button data-variant="primary" data-size="lg">Large</button>
                <button data-coral-button data-variant="primary" data-size="xl">Extra Large</button>
                <button data-coral-button data-variant="primary" data-size="icon">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </ComponentCard>
          </div>
        </section>

        {/* Form Controls */}
        <section>
          <SectionTitle>Form Controls</SectionTitle>
          <div className="grid md:grid-cols-2 gap-8">
            <ComponentCard title="Switch">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <button
                    data-coral-switch
                    data-checked={switchChecked || undefined}
                    onClick={() => setSwitchChecked(!switchChecked)}
                    role="switch"
                    aria-checked={switchChecked}
                  >
                    <span data-coral-switch-thumb />
                  </button>
                  <span className="text-sm text-foreground">
                    {switchChecked ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button data-coral-switch data-size="sm" data-checked>
                    <span data-coral-switch-thumb />
                  </button>
                  <span className="text-sm text-muted-foreground">Small size</span>
                </div>
                <div className="flex items-center gap-3">
                  <button data-coral-switch data-size="lg" data-checked>
                    <span data-coral-switch-thumb />
                  </button>
                  <span className="text-sm text-muted-foreground">Large size</span>
                </div>
              </div>
            </ComponentCard>

            <ComponentCard title="Checkbox & Radio">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div data-coral-checkbox data-checked tabIndex={0} role="checkbox" aria-checked="true" />
                  <span className="text-sm text-foreground">Checked checkbox</span>
                </div>
                <div className="flex items-center gap-3">
                  <div data-coral-checkbox tabIndex={0} role="checkbox" aria-checked="false" />
                  <span className="text-sm text-foreground">Unchecked checkbox</span>
                </div>
                <div className="flex items-center gap-3">
                  <div data-coral-radio data-checked tabIndex={0} role="radio" aria-checked="true" />
                  <span className="text-sm text-foreground">Selected radio</span>
                </div>
                <div className="flex items-center gap-3">
                  <div data-coral-radio tabIndex={0} role="radio" aria-checked="false" />
                  <span className="text-sm text-foreground">Unselected radio</span>
                </div>
              </div>
            </ComponentCard>

            <ComponentCard title="Input">
              <div className="space-y-4">
                <div>
                  <label data-coral-label>Email</label>
                  <input data-coral-input type="email" placeholder="you@example.com" />
                </div>
                <div>
                  <label data-coral-label data-required>Password</label>
                  <input data-coral-input type="password" placeholder="Enter password" />
                </div>
                <div>
                  <label data-coral-label>Disabled</label>
                  <input data-coral-input disabled value="Cannot edit" />
                </div>
              </div>
            </ComponentCard>

            <ComponentCard title="Input Variants">
              <div className="space-y-4">
                <div>
                  <label data-coral-label>Filled Input</label>
                  <input data-coral-input data-variant="filled" placeholder="Filled variant" />
                </div>
                <div>
                  <label data-coral-label>Underlined Input</label>
                  <input data-coral-input data-variant="underlined" placeholder="Underlined variant" />
                </div>
                <div>
                  <label data-coral-label>Small Input</label>
                  <input data-coral-input data-size="sm" placeholder="Small size" />
                </div>
                <div>
                  <label data-coral-label>Large Input</label>
                  <input data-coral-input data-size="lg" placeholder="Large size" />
                </div>
              </div>
            </ComponentCard>

            <ComponentCard title="Floating Labels">
              <div className="space-y-6">
                <div data-coral-floating-label>
                  <input data-coral-input placeholder=" " type="text" />
                  <label data-coral-label>Username</label>
                </div>
                <div data-coral-floating-label>
                  <input data-coral-input placeholder=" " type="email" />
                  <label data-coral-label>Email Address</label>
                </div>
                <div data-coral-floating-label>
                  <input data-coral-input placeholder=" " type="password" />
                  <label data-coral-label>Password</label>
                </div>
              </div>
            </ComponentCard>

            <ComponentCard title="Input Groups">
              <div className="space-y-4">
                <div data-coral-input-group>
                  <span data-coral-input-addon>https://</span>
                  <input data-coral-input placeholder="example.com" />
                </div>
                <div data-coral-input-group>
                  <span data-coral-input-addon>$</span>
                  <input data-coral-input type="number" placeholder="0.00" />
                  <span data-coral-input-addon>.00</span>
                </div>
                <div data-coral-input-group>
                  <span data-coral-input-addon>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </span>
                  <input data-coral-input placeholder="Search..." />
                  <button data-coral-button data-variant="primary">Search</button>
                </div>
              </div>
            </ComponentCard>

            <ComponentCard title="Textarea">
              <div>
                <label data-coral-label>Message</label>
                <textarea data-coral-textarea placeholder="Write your message here..." rows={4} />
              </div>
            </ComponentCard>

            <ComponentCard title="Slider">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Volume</span>
                    <span className="text-sm font-medium">{sliderValue}%</span>
                  </div>
                  <div data-coral-slider>
                    <div data-coral-slider-track>
                      <div data-coral-slider-range style={{ width: `${sliderValue}%` }} />
                    </div>
                    <div
                      data-coral-slider-thumb
                      style={{ left: `${sliderValue}%` }}
                      tabIndex={0}
                      role="slider"
                      aria-valuenow={sliderValue}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowRight') setSliderValue(Math.min(100, sliderValue + 5))
                        if (e.key === 'ArrowLeft') setSliderValue(Math.max(0, sliderValue - 5))
                      }}
                    />
                  </div>
                </div>
              </div>
            </ComponentCard>

            <ComponentCard title="Rating">
              <div className="flex items-center gap-4">
                <div data-coral-rating>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      data-coral-rating-star
                      data-filled={star <= rating || undefined}
                      onClick={() => setRating(star)}
                      className="w-6 h-6 cursor-pointer"
                      fill={star <= rating ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  ))}
                </div>
                <span className="text-muted-foreground">{rating} stars</span>
              </div>
            </ComponentCard>
          </div>
        </section>

        {/* Tabs */}
        <section>
          <SectionTitle>Tabs</SectionTitle>
          <div className="grid md:grid-cols-2 gap-8">
            <ComponentCard title="Default Tabs">
              <div data-coral-tabs>
                <div data-coral-tabs-list>
                  {['Overview', 'Features', 'Pricing'].map((tab, i) => (
                    <button
                      key={tab}
                      data-coral-tabs-trigger
                      data-active={activeTab === `tab${i + 1}` || undefined}
                      onClick={() => setActiveTab(`tab${i + 1}`)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div data-coral-tabs-content data-active={activeTab === 'tab1' || undefined}>
                  <p className="text-muted-foreground">
                    Overview content goes here. This tab shows general information about the product.
                  </p>
                </div>
                <div data-coral-tabs-content data-active={activeTab === 'tab2' || undefined}>
                  <p className="text-muted-foreground">
                    Features content goes here. List all the amazing features of your product.
                  </p>
                </div>
                <div data-coral-tabs-content data-active={activeTab === 'tab3' || undefined}>
                  <p className="text-muted-foreground">
                    Pricing content goes here. Show your pricing plans and options.
                  </p>
                </div>
              </div>
            </ComponentCard>

            <ComponentCard title="Pills Variant">
              <div data-coral-tabs data-variant="pills">
                <div data-coral-tabs-list>
                  <button data-coral-tabs-trigger data-active>All</button>
                  <button data-coral-tabs-trigger>Active</button>
                  <button data-coral-tabs-trigger>Draft</button>
                </div>
              </div>
            </ComponentCard>
          </div>
        </section>

        {/* Accordion */}
        <section>
          <SectionTitle>Accordion</SectionTitle>
          <ComponentCard title="FAQ Accordion">
            <div data-coral-accordion className="max-w-xl">
              {[
                { id: 'item1', title: 'What is CoralCSS?', content: 'CoralCSS is a modern, utility-first CSS framework with a micro-kernel plugin architecture and JIT CSS generation.' },
                { id: 'item2', title: 'Is it accessible?', content: 'Yes! All components are built with accessibility in mind, following WAI-ARIA guidelines and supporting keyboard navigation.' },
                { id: 'item3', title: 'Can I customize the theme?', content: 'Absolutely! CoralCSS uses CSS variables for theming, making it easy to customize colors, spacing, and more.' },
              ].map((item) => (
                <div key={item.id} data-coral-accordion-item data-open={accordionOpen === item.id || undefined}>
                  <button
                    data-coral-accordion-trigger
                    onClick={() => setAccordionOpen(accordionOpen === item.id ? null : item.id)}
                    aria-expanded={accordionOpen === item.id}
                  >
                    {item.title}
                    <svg data-coral-accordion-icon viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div data-coral-accordion-content>
                    <div data-coral-accordion-content-inner>
                      <div data-coral-accordion-body>{item.content}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ComponentCard>
        </section>

        {/* Progress & Skeleton */}
        <section>
          <SectionTitle>Progress & Loading</SectionTitle>
          <div className="grid md:grid-cols-2 gap-8">
            <ComponentCard title="Progress Bars">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Default</span>
                    <span className="text-sm font-medium">{progress}%</span>
                  </div>
                  <div data-coral-progress>
                    <div data-coral-progress-bar style={{ width: `${progress}%` }} />
                  </div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground block mb-2">Striped Animated</span>
                  <div data-coral-progress data-striped data-animated>
                    <div data-coral-progress-bar style={{ width: '75%' }} />
                  </div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground block mb-2">Indeterminate</span>
                  <div data-coral-progress data-indeterminate>
                    <div data-coral-progress-bar />
                  </div>
                </div>
                <button
                  data-coral-button
                  data-variant="outline"
                  data-size="sm"
                  onClick={() => setProgress(Math.floor(Math.random() * 100))}
                >
                  Randomize Progress
                </button>
              </div>
            </ComponentCard>

            <ComponentCard title="Skeleton Loading">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div data-coral-skeleton data-variant="circular" data-animation="pulse" className="w-12 h-12" />
                  <div className="flex-1 space-y-2">
                    <div data-coral-skeleton data-animation="pulse" className="h-4 w-3/4" />
                    <div data-coral-skeleton data-animation="pulse" className="h-3 w-1/2" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div data-coral-skeleton data-animation="wave" className="h-4 w-full" />
                  <div data-coral-skeleton data-animation="wave" className="h-4 w-5/6" />
                  <div data-coral-skeleton data-animation="wave" className="h-4 w-4/6" />
                </div>
              </div>
            </ComponentCard>

            <ComponentCard title="Spinner">
              <div className="flex items-center gap-6">
                <div data-coral-spinner data-size="xs">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                    <path d="M12 2C6.47715 2 2 6.47715 2 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
                <div data-coral-spinner data-size="sm">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                    <path d="M12 2C6.47715 2 2 6.47715 2 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
                <div data-coral-spinner data-variant="primary">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                    <path d="M12 2C6.47715 2 2 6.47715 2 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
                <div data-coral-spinner data-size="lg">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                    <path d="M12 2C6.47715 2 2 6.47715 2 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
                <div data-coral-spinner data-size="xl">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                    <path d="M12 2C6.47715 2 2 6.47715 2 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </ComponentCard>
          </div>
        </section>

        {/* Badges & Chips */}
        <section>
          <SectionTitle>Badges & Chips</SectionTitle>
          <div className="grid md:grid-cols-2 gap-8">
            <ComponentCard title="Badges">
              <div className="flex flex-wrap gap-3">
                <span data-coral-badge data-variant="default">Default</span>
                <span data-coral-badge data-variant="secondary">Secondary</span>
                <span data-coral-badge data-variant="outline">Outline</span>
                <span data-coral-badge data-variant="success">Success</span>
                <span data-coral-badge data-variant="warning">Warning</span>
                <span data-coral-badge data-variant="destructive">Error</span>
                <span data-coral-badge data-variant="info">Info</span>
              </div>
            </ComponentCard>

            <ComponentCard title="Chips">
              <div className="flex flex-wrap gap-2">
                <span data-coral-chip>Default Chip</span>
                <span data-coral-chip data-variant="outline">Outline</span>
                <span data-coral-chip data-variant="primary">Primary</span>
                <span data-coral-chip data-closable>
                  Removable
                  <span data-coral-chip-close>
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                </span>
              </div>
            </ComponentCard>
          </div>
        </section>

        {/* Alerts */}
        <section>
          <SectionTitle>Alerts</SectionTitle>
          <div className="space-y-4 max-w-2xl">
            <div data-coral-alert data-variant="default">
              <svg data-coral-alert-icon viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div data-coral-alert-content>
                <div data-coral-alert-title>Heads up!</div>
                <div data-coral-alert-description>You can customize alerts with different variants and icons.</div>
              </div>
            </div>
            <div data-coral-alert data-variant="success">
              <svg data-coral-alert-icon viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div data-coral-alert-content>
                <div data-coral-alert-title>Success!</div>
                <div data-coral-alert-description>Your changes have been saved successfully.</div>
              </div>
            </div>
            <div data-coral-alert data-variant="warning">
              <svg data-coral-alert-icon viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div data-coral-alert-content>
                <div data-coral-alert-title>Warning</div>
                <div data-coral-alert-description>Please review your input before continuing.</div>
              </div>
            </div>
            <div data-coral-alert data-variant="error">
              <svg data-coral-alert-icon viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div data-coral-alert-content>
                <div data-coral-alert-title>Error</div>
                <div data-coral-alert-description>Something went wrong. Please try again later.</div>
              </div>
            </div>
          </div>
        </section>

        {/* Toast Notifications */}
        <section>
          <SectionTitle>Toast Notifications</SectionTitle>
          <ComponentCard title="Trigger Toasts">
            <div className="flex flex-wrap gap-3">
              <button data-coral-button data-variant="primary" onClick={() => addToast('success')}>
                Success Toast
              </button>
              <button data-coral-button data-variant="destructive" onClick={() => addToast('error')}>
                Error Toast
              </button>
              <button data-coral-button data-variant="outline" onClick={() => addToast('warning')}>
                Warning Toast
              </button>
              <button data-coral-button data-variant="secondary" onClick={() => addToast('info')}>
                Info Toast
              </button>
            </div>
          </ComponentCard>
        </section>

        {/* Card */}
        <section>
          <SectionTitle>Cards</SectionTitle>
          <div className="grid md:grid-cols-3 gap-6">
            <div data-coral-card>
              <div data-coral-card-header>
                <div data-coral-card-title>Default Card</div>
                <div data-coral-card-description>A simple card with header and content.</div>
              </div>
              <div data-coral-card-content>
                <p className="text-muted-foreground">Card content goes here. You can add any content you like.</p>
              </div>
              <div data-coral-card-footer>
                <button data-coral-button data-variant="outline" data-size="sm">Cancel</button>
                <button data-coral-button data-variant="primary" data-size="sm">Save</button>
              </div>
            </div>
            <div data-coral-card data-variant="elevated">
              <div data-coral-card-header>
                <div data-coral-card-title>Elevated Card</div>
                <div data-coral-card-description>With increased shadow depth.</div>
              </div>
              <div data-coral-card-content>
                <p className="text-muted-foreground">Perfect for featured content or important information.</p>
              </div>
            </div>
            <div data-coral-card data-interactive>
              <div data-coral-card-header>
                <div data-coral-card-title>Interactive Card</div>
                <div data-coral-card-description>Hover to see the effect.</div>
              </div>
              <div data-coral-card-content>
                <p className="text-muted-foreground">Click or hover to interact with this card.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Avatar */}
        <section>
          <SectionTitle>Avatars</SectionTitle>
          <ComponentCard title="Avatar Sizes & States">
            <div className="flex items-end gap-4">
              <div data-coral-avatar data-size="xs">
                <div data-coral-avatar-fallback>XS</div>
              </div>
              <div data-coral-avatar data-size="sm">
                <div data-coral-avatar-fallback>SM</div>
              </div>
              <div data-coral-avatar>
                <div data-coral-avatar-fallback>MD</div>
              </div>
              <div data-coral-avatar data-size="lg">
                <div data-coral-avatar-fallback>LG</div>
              </div>
              <div data-coral-avatar data-size="xl">
                <div data-coral-avatar-fallback>XL</div>
                <div data-coral-avatar-status data-status="online" />
              </div>
              <div data-coral-avatar data-size="2xl">
                <img data-coral-avatar-image src="https://i.pravatar.cc/150?img=1" alt="User" />
                <div data-coral-avatar-status data-status="busy" />
              </div>
            </div>
          </ComponentCard>
        </section>

        {/* Dialog & Drawer */}
        <section>
          <SectionTitle>Modals & Overlays</SectionTitle>
          <div className="flex gap-4">
            <button data-coral-button data-variant="primary" onClick={() => setDialogOpen(true)}>
              Open Dialog
            </button>
            <button data-coral-button data-variant="outline" onClick={() => setDrawerOpen(true)}>
              Open Drawer
            </button>
          </div>
        </section>

        {/* Keyboard & Code */}
        <section>
          <SectionTitle>Typography Elements</SectionTitle>
          <div className="grid md:grid-cols-2 gap-8">
            <ComponentCard title="Keyboard Keys">
              <div className="flex items-center gap-2 flex-wrap">
                <span data-coral-kbd>Ctrl</span>
                <span className="text-muted-foreground">+</span>
                <span data-coral-kbd>Shift</span>
                <span className="text-muted-foreground">+</span>
                <span data-coral-kbd>P</span>
                <span className="text-muted-foreground ml-4">to open command palette</span>
              </div>
            </ComponentCard>

            <ComponentCard title="Inline Code">
              <p className="text-muted-foreground">
                Use <code data-coral-code>npm install coralcss</code> to install the package, then import
                with <code data-coral-code>import 'coralcss'</code>.
              </p>
            </ComponentCard>
          </div>
        </section>

        {/* Stepper */}
        <section>
          <SectionTitle>Stepper</SectionTitle>
          <ComponentCard title="Horizontal Stepper">
            <div data-coral-stepper>
              <div data-coral-stepper-step data-completed>
                <div data-coral-stepper-indicator>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div data-coral-stepper-content>
                  <div data-coral-stepper-title>Account</div>
                  <div data-coral-stepper-description>Create your account</div>
                </div>
              </div>
              <div data-coral-stepper-connector />
              <div data-coral-stepper-step data-active>
                <div data-coral-stepper-indicator>2</div>
                <div data-coral-stepper-content>
                  <div data-coral-stepper-title>Profile</div>
                  <div data-coral-stepper-description>Setup your profile</div>
                </div>
              </div>
              <div data-coral-stepper-connector />
              <div data-coral-stepper-step>
                <div data-coral-stepper-indicator>3</div>
                <div data-coral-stepper-content>
                  <div data-coral-stepper-title>Complete</div>
                  <div data-coral-stepper-description>Review and finish</div>
                </div>
              </div>
            </div>
          </ComponentCard>
        </section>

        {/* Stats */}
        <section>
          <SectionTitle>Stats</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div data-coral-stat>
              <div data-coral-stat-label>Total Revenue</div>
              <div data-coral-stat-value>$45,231</div>
              <div data-coral-stat-change data-trend="up">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                +20.1%
              </div>
            </div>
            <div data-coral-stat>
              <div data-coral-stat-label>Active Users</div>
              <div data-coral-stat-value>2,350</div>
              <div data-coral-stat-change data-trend="up">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                +12.5%
              </div>
            </div>
            <div data-coral-stat>
              <div data-coral-stat-label>Bounce Rate</div>
              <div data-coral-stat-value>42.3%</div>
              <div data-coral-stat-change data-trend="down">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                -8.2%
              </div>
            </div>
            <div data-coral-stat>
              <div data-coral-stat-label>Avg. Session</div>
              <div data-coral-stat-value>4m 32s</div>
              <div data-coral-stat-help>Based on last 30 days</div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section>
          <SectionTitle>Timeline</SectionTitle>
          <ComponentCard title="Activity Timeline">
            <div data-coral-timeline className="max-w-md">
              <div data-coral-timeline-item>
                <div data-coral-timeline-dot />
                <div data-coral-timeline-content>
                  <div data-coral-timeline-title>Project Created</div>
                  <div data-coral-timeline-description>New project "CoralCSS" was initialized</div>
                  <div data-coral-timeline-time>2 hours ago</div>
                </div>
              </div>
              <div data-coral-timeline-item>
                <div data-coral-timeline-dot />
                <div data-coral-timeline-content>
                  <div data-coral-timeline-title>Components Added</div>
                  <div data-coral-timeline-description>50+ headless components were added to the library</div>
                  <div data-coral-timeline-time>1 hour ago</div>
                </div>
              </div>
              <div data-coral-timeline-item>
                <div data-coral-timeline-dot />
                <div data-coral-timeline-content>
                  <div data-coral-timeline-title>Styles Applied</div>
                  <div data-coral-timeline-description>Beautiful component styles were created</div>
                  <div data-coral-timeline-time>Just now</div>
                </div>
              </div>
            </div>
          </ComponentCard>
        </section>

        {/* Table */}
        <section>
          <SectionTitle>Table</SectionTitle>
          <div className="grid gap-8">
            <ComponentCard title="Data Table">
              <div data-coral-table-wrapper>
                <table data-coral-table>
                  <thead data-coral-table-header>
                    <tr data-coral-table-row>
                      <th data-coral-table-head data-sortable>Name</th>
                      <th data-coral-table-head data-sortable>Email</th>
                      <th data-coral-table-head>Role</th>
                      <th data-coral-table-head>Status</th>
                    </tr>
                  </thead>
                  <tbody data-coral-table-body>
                    {[
                      { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
                      { name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
                      { name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive' },
                    ].map((user) => (
                      <tr data-coral-table-row key={user.email}>
                        <td data-coral-table-cell className="font-medium">{user.name}</td>
                        <td data-coral-table-cell>{user.email}</td>
                        <td data-coral-table-cell>{user.role}</td>
                        <td data-coral-table-cell>
                          <span data-coral-badge data-variant={user.status === 'Active' ? 'success' : 'secondary'}>
                            {user.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ComponentCard>

            <ComponentCard title="Striped Table">
              <div data-coral-table-wrapper>
                <table data-coral-table data-variant="striped">
                  <thead data-coral-table-header>
                    <tr data-coral-table-row>
                      <th data-coral-table-head>Product</th>
                      <th data-coral-table-head>Category</th>
                      <th data-coral-table-head>Price</th>
                      <th data-coral-table-head>Stock</th>
                    </tr>
                  </thead>
                  <tbody data-coral-table-body>
                    {[
                      { product: 'MacBook Pro', category: 'Electronics', price: '$2,499', stock: 12 },
                      { product: 'iPhone 15', category: 'Electronics', price: '$999', stock: 45 },
                      { product: 'AirPods Pro', category: 'Accessories', price: '$249', stock: 89 },
                      { product: 'iPad Air', category: 'Electronics', price: '$599', stock: 23 },
                    ].map((item) => (
                      <tr data-coral-table-row key={item.product}>
                        <td data-coral-table-cell className="font-medium">{item.product}</td>
                        <td data-coral-table-cell>{item.category}</td>
                        <td data-coral-table-cell>{item.price}</td>
                        <td data-coral-table-cell>{item.stock}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ComponentCard>
          </div>
        </section>

        {/* Pagination */}
        <section>
          <SectionTitle>Pagination</SectionTitle>
          <ComponentCard title="Page Navigation">
            <nav data-coral-pagination>
              <ul data-coral-pagination-content>
                <li data-coral-pagination-item>
                  <a data-coral-pagination-previous href="#">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Previous</span>
                  </a>
                </li>
                <li data-coral-pagination-item>
                  <a data-coral-pagination-link href="#">1</a>
                </li>
                <li data-coral-pagination-item>
                  <a data-coral-pagination-link data-active href="#">2</a>
                </li>
                <li data-coral-pagination-item>
                  <a data-coral-pagination-link href="#">3</a>
                </li>
                <li data-coral-pagination-item>
                  <span data-coral-pagination-ellipsis>...</span>
                </li>
                <li data-coral-pagination-item>
                  <a data-coral-pagination-link href="#">10</a>
                </li>
                <li data-coral-pagination-item>
                  <a data-coral-pagination-next href="#">
                    <span>Next</span>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
          </ComponentCard>
        </section>

        {/* Breadcrumb */}
        <section>
          <SectionTitle>Breadcrumb</SectionTitle>
          <ComponentCard title="Navigation Path">
            <nav data-coral-breadcrumb aria-label="Breadcrumb">
              <ol data-coral-breadcrumb-list>
                <li data-coral-breadcrumb-item>
                  <a data-coral-breadcrumb-link href="#">Home</a>
                </li>
                <li data-coral-breadcrumb-separator>/</li>
                <li data-coral-breadcrumb-item>
                  <a data-coral-breadcrumb-link href="#">Components</a>
                </li>
                <li data-coral-breadcrumb-separator>/</li>
                <li data-coral-breadcrumb-item>
                  <span data-coral-breadcrumb-page>Showcase</span>
                </li>
              </ol>
            </nav>
          </ComponentCard>
        </section>

        {/* Separator */}
        <section>
          <SectionTitle>Separator</SectionTitle>
          <ComponentCard title="Content Divider">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Content above the separator</p>
              <div data-coral-separator data-orientation="horizontal" />
              <p className="text-sm text-muted-foreground">Content below the separator</p>
              <div className="flex items-center h-16 gap-4">
                <span className="text-sm">Left</span>
                <div data-coral-separator data-orientation="vertical" className="h-full" />
                <span className="text-sm">Right</span>
              </div>
            </div>
          </ComponentCard>
        </section>

        {/* Textarea */}
        <section>
          <SectionTitle>Textarea</SectionTitle>
          <div className="grid md:grid-cols-2 gap-8">
            <ComponentCard title="Default Textarea">
              <div className="space-y-4">
                <div>
                  <label data-coral-label>Description</label>
                  <textarea data-coral-textarea placeholder="Enter description..." rows={4} />
                </div>
                <div>
                  <label data-coral-label>Disabled</label>
                  <textarea data-coral-textarea disabled placeholder="Cannot edit..." rows={3} />
                </div>
              </div>
            </ComponentCard>

            <ComponentCard title="Textarea Variants">
              <div className="space-y-4">
                <div>
                  <label data-coral-label>Filled</label>
                  <textarea data-coral-textarea data-variant="filled" placeholder="Filled variant" rows={3} />
                </div>
                <div>
                  <label data-coral-label>With Error</label>
                  <textarea data-coral-textarea data-error placeholder="Error state" rows={3} />
                </div>
              </div>
            </ComponentCard>
          </div>
        </section>

        {/* Tooltip */}
        <section>
          <SectionTitle>Tooltip</SectionTitle>
          <ComponentCard title="Interactive Tooltips">
            <div className="flex flex-wrap items-center gap-6">
              <div className="relative">
                <button
                  data-coral-button
                  data-variant="outline"
                  onMouseEnter={() => setTooltipVisible('top')}
                  onMouseLeave={() => setTooltipVisible(null)}
                >
                  Hover me (Top)
                </button>
                {tooltipVisible === 'top' && (
                  <div data-coral-tooltip data-position="top" data-open>
                    <div data-coral-tooltip-content>
                      This is a tooltip on top
                    </div>
                    <div data-coral-tooltip-arrow />
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  data-coral-button
                  data-variant="outline"
                  onMouseEnter={() => setTooltipVisible('bottom')}
                  onMouseLeave={() => setTooltipVisible(null)}
                >
                  Hover me (Bottom)
                </button>
                {tooltipVisible === 'bottom' && (
                  <div data-coral-tooltip data-position="bottom" data-open>
                    <div data-coral-tooltip-content>
                      Tooltip on bottom
                    </div>
                    <div data-coral-tooltip-arrow />
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  data-coral-button
                  data-variant="secondary"
                  onMouseEnter={() => setTooltipVisible('right')}
                  onMouseLeave={() => setTooltipVisible(null)}
                >
                  Hover me (Right)
                </button>
                {tooltipVisible === 'right' && (
                  <div data-coral-tooltip data-position="right" data-open>
                    <div data-coral-tooltip-content>
                      Right tooltip
                    </div>
                    <div data-coral-tooltip-arrow />
                  </div>
                )}
              </div>
            </div>
          </ComponentCard>
        </section>

        {/* Popover */}
        <section>
          <SectionTitle>Popover</SectionTitle>
          <ComponentCard title="Interactive Popover">
            <div className="relative inline-block">
              <button
                data-coral-button
                data-variant="primary"
                onClick={() => setPopoverOpen(!popoverOpen)}
              >
                Open Popover
              </button>
              {popoverOpen && (
                <div data-coral-popover data-open data-position="bottom">
                  <div data-coral-popover-content>
                    <div data-coral-popover-header>
                      <h4 className="font-semibold text-foreground">Dimensions</h4>
                    </div>
                    <div className="space-y-3 mt-3">
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-muted-foreground w-20">Width</label>
                        <input data-coral-input data-size="sm" type="number" defaultValue={100} className="w-20" />
                        <span className="text-sm text-muted-foreground">px</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-muted-foreground w-20">Height</label>
                        <input data-coral-input data-size="sm" type="number" defaultValue={50} className="w-20" />
                        <span className="text-sm text-muted-foreground">px</span>
                      </div>
                    </div>
                    <button
                      data-coral-button
                      data-variant="primary"
                      data-size="sm"
                      className="mt-4 w-full"
                      onClick={() => setPopoverOpen(false)}
                    >
                      Apply
                    </button>
                  </div>
                  <div data-coral-popover-arrow />
                </div>
              )}
            </div>
          </ComponentCard>
        </section>

        {/* Select / Dropdown */}
        <section>
          <SectionTitle>Select</SectionTitle>
          <ComponentCard title="Custom Select Dropdown">
            <div className="max-w-xs">
              <label data-coral-label>Choose an option</label>
              <div data-coral-select data-open={selectOpen || undefined}>
                <button
                  data-coral-select-trigger
                  onClick={() => setSelectOpen(!selectOpen)}
                  type="button"
                >
                  <span data-coral-select-value>
                    {selectValue === 'option1' && 'React'}
                    {selectValue === 'option2' && 'Vue'}
                    {selectValue === 'option3' && 'Angular'}
                    {selectValue === 'option4' && 'Svelte'}
                  </span>
                  <svg data-coral-select-icon viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {selectOpen && (
                  <div data-coral-select-content>
                    {[
                      { value: 'option1', label: 'React' },
                      { value: 'option2', label: 'Vue' },
                      { value: 'option3', label: 'Angular' },
                      { value: 'option4', label: 'Svelte' },
                    ].map((option) => (
                      <div
                        key={option.value}
                        data-coral-select-item
                        data-selected={selectValue === option.value || undefined}
                        onClick={() => {
                          setSelectValue(option.value)
                          setSelectOpen(false)
                        }}
                      >
                        {selectValue === option.value && (
                          <span data-coral-select-item-indicator>
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                        )}
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </ComponentCard>
        </section>

        {/* Collapsible */}
        <section>
          <SectionTitle>Collapsible</SectionTitle>
          <ComponentCard title="Expandable Content">
            <div data-coral-collapsible data-open={collapsibleOpen || undefined} className="max-w-md">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-foreground">@coral-css/core</h4>
                <button
                  data-coral-collapsible-trigger
                  onClick={() => setCollapsibleOpen(!collapsibleOpen)}
                  data-coral-button
                  data-variant="ghost"
                  data-size="sm"
                >
                  <svg className="w-4 h-4 transition-transform" style={{ transform: collapsibleOpen ? 'rotate(180deg)' : undefined }} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              <div className="rounded-lg border border-border px-4 py-2 mt-2 text-sm text-muted-foreground">
                Utilities for building beautiful user interfaces.
              </div>
              {collapsibleOpen && (
                <div data-coral-collapsible-content>
                  <div className="mt-2 space-y-2">
                    <div className="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground">
                      @coral-css/colors - Color utilities
                    </div>
                    <div className="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground">
                      @coral-css/spacing - Spacing utilities
                    </div>
                    <div className="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground">
                      @coral-css/typography - Typography utilities
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ComponentCard>
        </section>

        {/* Command Palette */}
        <section>
          <SectionTitle>Command Palette</SectionTitle>
          <ComponentCard title="Quick Actions Menu">
            <button
              data-coral-button
              data-variant="outline"
              onClick={() => setCommandOpen(true)}
              className="gap-2"
            >
              <span className="text-muted-foreground">Search commands...</span>
              <span data-coral-kbd>Ctrl+K</span>
            </button>
          </ComponentCard>
        </section>

        {/* Context Menu */}
        <section>
          <SectionTitle>Context Menu</SectionTitle>
          <ComponentCard title="Right-Click Menu">
            <div
              className="border border-dashed border-border rounded-lg p-8 text-center text-muted-foreground cursor-context-menu"
              onContextMenu={(e) => {
                e.preventDefault()
                setContextMenuPos({ x: e.clientX, y: e.clientY })
                setContextMenuOpen(true)
              }}
            >
              Right-click anywhere in this area to open context menu
            </div>
          </ComponentCard>
        </section>

        {/* Hover Card */}
        <section>
          <SectionTitle>Hover Card</SectionTitle>
          <ComponentCard title="User Info on Hover">
            <div className="relative inline-block">
              <a
                href="#"
                className="font-semibold text-primary hover:underline"
                onMouseEnter={() => setHoverCardVisible(true)}
                onMouseLeave={() => setHoverCardVisible(false)}
              >
                @coral-css
              </a>
              {hoverCardVisible && (
                <div data-coral-hover-card data-open data-position="bottom">
                  <div data-coral-hover-card-content>
                    <div className="flex gap-4">
                      <div data-coral-avatar data-size="lg">
                        <div data-coral-avatar-fallback className="bg-primary text-primary-foreground">C</div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">CoralCSS</h4>
                        <p className="text-sm text-muted-foreground">The next-gen CSS framework with modern features and beautiful defaults.</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm text-muted-foreground">
                            <strong className="text-foreground">500+</strong> stars
                          </span>
                          <span className="text-sm text-muted-foreground">
                            <strong className="text-foreground">50+</strong> components
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ComponentCard>
        </section>

        {/* Scroll Area */}
        <section>
          <SectionTitle>Scroll Area</SectionTitle>
          <ComponentCard title="Custom Scrollbar">
            <div data-coral-scroll-area className="h-48 w-full rounded-lg border border-border">
              <div className="p-4 space-y-4">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                    <div data-coral-avatar data-size="sm">
                      <div data-coral-avatar-fallback>{String.fromCharCode(65 + (i % 26))}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Item {i + 1}</div>
                      <div className="text-xs text-muted-foreground">Description for item {i + 1}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div data-coral-scroll-bar data-orientation="vertical">
                <div data-coral-scroll-bar-thumb />
              </div>
            </div>
          </ComponentCard>
        </section>

        {/* Aspect Ratio */}
        <section>
          <SectionTitle>Aspect Ratio</SectionTitle>
          <div className="grid md:grid-cols-3 gap-6">
            <ComponentCard title="16:9 Video">
              <div data-coral-aspect-ratio data-ratio="16/9" className="bg-muted rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </ComponentCard>
            <ComponentCard title="1:1 Square">
              <div data-coral-aspect-ratio data-ratio="1/1" className="bg-muted rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </ComponentCard>
            <ComponentCard title="4:3 Classic">
              <div data-coral-aspect-ratio data-ratio="4/3" className="bg-muted rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </ComponentCard>
          </div>
        </section>

        {/* Navigation Menu */}
        <section>
          <SectionTitle>Navigation Menu</SectionTitle>
          <ComponentCard title="Site Navigation">
            <nav data-coral-navigation-menu>
              <ul data-coral-navigation-menu-list>
                <li data-coral-navigation-menu-item>
                  <button data-coral-navigation-menu-trigger>
                    Getting Started
                    <svg data-coral-navigation-menu-chevron viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 ml-1">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </li>
                <li data-coral-navigation-menu-item>
                  <a data-coral-navigation-menu-link href="#">Documentation</a>
                </li>
                <li data-coral-navigation-menu-item>
                  <a data-coral-navigation-menu-link href="#">Components</a>
                </li>
                <li data-coral-navigation-menu-item>
                  <a data-coral-navigation-menu-link href="#">Examples</a>
                </li>
              </ul>
            </nav>
          </ComponentCard>
        </section>

        {/* ============================================
            IMPRESSIVE INTERACTIVE COMPONENTS SECTION
            ============================================ */}

        {/* Animated Statistics Cards */}
        <section>
          <SectionTitle>Animated Statistics</SectionTitle>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div data-coral-stat-card className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-card to-card border border-border rounded-xl p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-muted-foreground">Total Users</span>
                  <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </span>
                </div>
                <p className="text-3xl font-bold text-foreground tabular-nums">{animatedStats.users.toLocaleString()}</p>
                <p className="text-sm text-success mt-1 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  +12.5% this month
                </p>
              </div>
            </div>

            <div data-coral-stat-card className="relative overflow-hidden bg-gradient-to-br from-success/10 via-card to-card border border-border rounded-xl p-6 hover:shadow-xl hover:shadow-success/10 transition-all duration-500 group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-success/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-muted-foreground">Revenue</span>
                  <span className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </div>
                <p className="text-3xl font-bold text-foreground tabular-nums">${animatedStats.revenue.toLocaleString()}</p>
                <p className="text-sm text-success mt-1 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  +{animatedStats.growth}% growth
                </p>
              </div>
            </div>

            <div data-coral-stat-card className="relative overflow-hidden bg-gradient-to-br from-warning/10 via-card to-card border border-border rounded-xl p-6 hover:shadow-xl hover:shadow-warning/10 transition-all duration-500 group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-warning/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-muted-foreground">Orders</span>
                  <span className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </span>
                </div>
                <p className="text-3xl font-bold text-foreground tabular-nums">{animatedStats.orders.toLocaleString()}</p>
                <p className="text-sm text-warning mt-1 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                  Steady
                </p>
              </div>
            </div>

            <div data-coral-stat-card className="relative overflow-hidden bg-gradient-to-br from-info/10 via-card to-card border border-border rounded-xl p-6 hover:shadow-xl hover:shadow-info/10 transition-all duration-500 group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-info/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-muted-foreground">Conversion</span>
                  <span className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </span>
                </div>
                <p className="text-3xl font-bold text-foreground tabular-nums">4.28%</p>
                <p className="text-sm text-info mt-1 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  +0.8% from last week
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Table */}
        <section>
          <SectionTitle>Pricing Table</SectionTitle>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 p-1 bg-muted rounded-lg">
              <button
                onClick={() => setPricingPeriod('monthly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  pricingPeriod === 'monthly'
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setPricingPeriod('yearly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                  pricingPeriod === 'yearly'
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Yearly
                <span className="text-xs bg-success/20 text-success px-2 py-0.5 rounded-full">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Starter Plan */}
            <div className="bg-card border border-border rounded-2xl p-6 lg:p-8 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
              <h3 className="text-lg font-semibold text-foreground mb-2">Starter</h3>
              <p className="text-sm text-muted-foreground mb-6">Perfect for side projects</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">${pricingPeriod === 'monthly' ? '9' : '86'}</span>
                <span className="text-muted-foreground">/{pricingPeriod === 'monthly' ? 'mo' : 'yr'}</span>
              </div>
              <button data-coral-button data-variant="outline" className="w-full mb-6">Get Started</button>
              <ul className="space-y-3 text-sm">
                {['5 projects', '10GB storage', 'Basic analytics', 'Email support'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-muted-foreground">
                    <svg className="w-4 h-4 text-success flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro Plan - Featured */}
            <div className="relative bg-card border-2 border-primary rounded-2xl p-6 lg:p-8 shadow-xl shadow-primary/10 scale-105">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">Most Popular</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Professional</h3>
              <p className="text-sm text-muted-foreground mb-6">For growing teams</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">${pricingPeriod === 'monthly' ? '29' : '278'}</span>
                <span className="text-muted-foreground">/{pricingPeriod === 'monthly' ? 'mo' : 'yr'}</span>
              </div>
              <button data-coral-button data-variant="primary" className="w-full mb-6">Start Free Trial</button>
              <ul className="space-y-3 text-sm">
                {['Unlimited projects', '100GB storage', 'Advanced analytics', 'Priority support', 'Custom domains', 'API access'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-foreground">
                    <svg className="w-4 h-4 text-success flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-card border border-border rounded-2xl p-6 lg:p-8 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
              <h3 className="text-lg font-semibold text-foreground mb-2">Enterprise</h3>
              <p className="text-sm text-muted-foreground mb-6">For large organizations</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">Custom</span>
              </div>
              <button data-coral-button data-variant="outline" className="w-full mb-6">Contact Sales</button>
              <ul className="space-y-3 text-sm">
                {['Everything in Pro', 'Unlimited storage', 'SLA guarantee', 'Dedicated support', 'Custom integrations', 'On-premise option'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-muted-foreground">
                    <svg className="w-4 h-4 text-success flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* File Upload with Drag & Drop */}
        <section>
          <SectionTitle>File Upload</SectionTitle>
          <ComponentCard title="Drag & Drop Upload">
            <div
              data-coral-file-upload
              data-dragging={draggedFile ? true : undefined}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                draggedFile
                  ? 'border-primary bg-primary/5 scale-[1.02]'
                  : 'border-border hover:border-primary/50'
              }`}
              onDragOver={(e) => {
                e.preventDefault()
                setDraggedFile('file')
              }}
              onDragLeave={() => setDraggedFile(null)}
              onDrop={(e) => {
                e.preventDefault()
                setDraggedFile(null)
                // Simulate upload progress
                setUploadProgress(0)
                const interval = setInterval(() => {
                  setUploadProgress(prev => {
                    if (prev >= 100) {
                      clearInterval(interval)
                      return 100
                    }
                    return prev + 10
                  })
                }, 200)
              }}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all ${
                draggedFile ? 'bg-primary/20 scale-110' : 'bg-muted'
              }`}>
                <svg className={`w-8 h-8 transition-colors ${draggedFile ? 'text-primary' : 'text-muted-foreground'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p className="font-medium text-foreground mb-1">
                {draggedFile ? 'Drop files here' : 'Drag and drop files here'}
              </p>
              <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
              <button data-coral-button data-variant="outline" data-size="sm">Browse Files</button>
            </div>

            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground">document.pdf</span>
                  <span className="text-muted-foreground">{uploadProgress}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {uploadProgress === 100 && (
              <div className="mt-4 flex items-center gap-3 p-3 bg-success/10 border border-success/20 rounded-lg">
                <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-success font-medium">Upload complete!</span>
              </div>
            )}
          </ComponentCard>
        </section>

        {/* Color Picker */}
        <section>
          <SectionTitle>Color Picker</SectionTitle>
          <div className="grid md:grid-cols-2 gap-8">
            <ComponentCard title="Palette Selection">
              <div className="space-y-4">
                <div className="grid grid-cols-8 gap-2">
                  {['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899',
                    '#dc2626', '#ea580c', '#ca8a04', '#16a34a', '#0891b2', '#2563eb', '#7c3aed', '#db2777',
                    '#991b1b', '#c2410c', '#a16207', '#15803d', '#0e7490', '#1d4ed8', '#6d28d9', '#be185d'
                  ].map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-lg transition-all hover:scale-110 ${
                        selectedColor === color ? 'ring-2 ring-offset-2 ring-foreground scale-110' : ''
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl border border-border shadow-inner"
                    style={{ backgroundColor: selectedColor }}
                  />
                  <div>
                    <p className="text-sm text-muted-foreground">Selected color</p>
                    <p className="font-mono font-medium text-foreground">{selectedColor.toUpperCase()}</p>
                  </div>
                </div>
              </div>
            </ComponentCard>

            <ComponentCard title="Color Input">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label data-coral-label>Hex</label>
                    <input
                      data-coral-input
                      type="text"
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="font-mono"
                    />
                  </div>
                  <div className="flex-1">
                    <label data-coral-label>Color</label>
                    <input
                      type="color"
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="w-full h-10 rounded-lg border border-border cursor-pointer"
                    />
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-border" style={{ backgroundColor: selectedColor + '20' }}>
                  <p className="text-sm" style={{ color: selectedColor }}>
                    This text uses the selected color. The background uses 12% opacity.
                  </p>
                </div>
              </div>
            </ComponentCard>
          </div>
        </section>

        {/* Mini Calendar */}
        <section>
          <SectionTitle>Calendar</SectionTitle>
          <ComponentCard title="Date Picker">
            <div className="max-w-xs">
              <div data-coral-calendar className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <button
                    data-coral-button
                    data-variant="ghost"
                    data-size="sm"
                    onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1))}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span className="font-semibold text-foreground">
                    {calendarDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                  <button
                    data-coral-button
                    data-variant="ghost"
                    data-size="sm"
                    onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1))}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground mb-2">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <div key={day} className="py-1">{day}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {(() => {
                    const firstDay = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1).getDay()
                    const daysInMonth = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 0).getDate()
                    const today = new Date()
                    const days = []

                    for (let i = 0; i < firstDay; i++) {
                      days.push(<div key={`empty-${i}`} />)
                    }

                    for (let day = 1; day <= daysInMonth; day++) {
                      const isToday = day === today.getDate() &&
                        calendarDate.getMonth() === today.getMonth() &&
                        calendarDate.getFullYear() === today.getFullYear()

                      days.push(
                        <button
                          key={day}
                          className={`w-8 h-8 rounded-lg text-sm font-medium transition-all hover:bg-primary/10 ${
                            isToday
                              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                              : 'text-foreground hover:text-primary'
                          }`}
                        >
                          {day}
                        </button>
                      )
                    }

                    return days
                  })()}
                </div>
              </div>
            </div>
          </ComponentCard>
        </section>

        {/* Interactive Data Table */}
        <section>
          <SectionTitle>Data Table</SectionTitle>
          <ComponentCard title="Sortable Table">
            <div className="overflow-x-auto">
              <table data-coral-table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                        Name
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                      </button>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Role</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'John Doe', email: 'john@example.com', status: 'Active', role: 'Admin' },
                    { name: 'Jane Smith', email: 'jane@example.com', status: 'Active', role: 'Editor' },
                    { name: 'Bob Johnson', email: 'bob@example.com', status: 'Inactive', role: 'Viewer' },
                    { name: 'Alice Brown', email: 'alice@example.com', status: 'Active', role: 'Editor' },
                  ].map((user, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div data-coral-avatar data-size="sm">
                            <div data-coral-avatar-fallback>{user.name.split(' ').map(n => n[0]).join('')}</div>
                          </div>
                          <span className="font-medium text-foreground">{user.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === 'Active'
                            ? 'bg-success/10 text-success'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            user.status === 'Active' ? 'bg-success' : 'bg-muted-foreground'
                          }`} />
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{user.role}</td>
                      <td className="py-3 px-4 text-right">
                        <button data-coral-button data-variant="ghost" data-size="sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">Showing 1-4 of 4 results</p>
              <div className="flex items-center gap-2">
                <button data-coral-button data-variant="outline" data-size="sm" disabled>Previous</button>
                <button data-coral-button data-variant="outline" data-size="sm" disabled>Next</button>
              </div>
            </div>
          </ComponentCard>
        </section>

        {/* Timeline */}
        <section>
          <SectionTitle>Timeline</SectionTitle>
          <ComponentCard title="Activity Feed">
            <div data-coral-timeline className="space-y-6">
              {[
                { time: 'Just now', title: 'New user registered', desc: 'john@example.com signed up', icon: '👤', color: 'bg-primary' },
                { time: '2 hours ago', title: 'Payment received', desc: '$299 for Pro subscription', icon: '💳', color: 'bg-success' },
                { time: '5 hours ago', title: 'Server deployed', desc: 'Production build v2.1.0 is live', icon: '🚀', color: 'bg-info' },
                { time: 'Yesterday', title: 'Security update', desc: 'All dependencies updated', icon: '🔒', color: 'bg-warning' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center text-lg`}>
                      {item.icon}
                    </div>
                    {i < 3 && <div className="w-0.5 h-full bg-border mt-2" />}
                  </div>
                  <div className="flex-1 pb-6">
                    <p className="text-xs text-muted-foreground mb-1">{item.time}</p>
                    <h4 className="font-medium text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ComponentCard>
        </section>
      </div>

      {/* Dialog */}
      <div data-coral-dialog data-open={dialogOpen || undefined}>
        <div data-coral-dialog-backdrop onClick={() => setDialogOpen(false)} />
        <div data-coral-dialog-content>
          <button data-coral-dialog-close onClick={() => setDialogOpen(false)} aria-label="Close">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 data-coral-dialog-title>Beautiful Dialog</h2>
          <p data-coral-dialog-description>
            This is an accessible modal dialog component with smooth animations and beautiful styling.
          </p>
          <div className="space-y-4">
            <div>
              <label data-coral-label>Email</label>
              <input data-coral-input type="email" placeholder="you@example.com" />
            </div>
            <div>
              <label data-coral-label>Message</label>
              <textarea data-coral-textarea placeholder="Enter your message..." rows={3} />
            </div>
          </div>
          <div data-coral-dialog-footer>
            <button data-coral-button data-variant="outline" onClick={() => setDialogOpen(false)}>Cancel</button>
            <button data-coral-button data-variant="primary" onClick={() => setDialogOpen(false)}>Save Changes</button>
          </div>
        </div>
      </div>

      {/* Drawer */}
      <div data-coral-drawer data-position="right" data-open={drawerOpen || undefined}>
        <div data-coral-drawer-backdrop onClick={() => setDrawerOpen(false)} />
        <div data-coral-drawer-content>
          <div data-coral-drawer-header>
            <h3 data-coral-drawer-title>Settings</h3>
            <button data-coral-dialog-close onClick={() => setDrawerOpen(false)} aria-label="Close">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div data-coral-drawer-body>
            <div className="space-y-6">
              <div>
                <label data-coral-label>Notifications</label>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-muted-foreground">Email notifications</span>
                  <button data-coral-switch data-checked>
                    <span data-coral-switch-thumb />
                  </button>
                </div>
              </div>
              <div className="h-px bg-border" />
              <div>
                <label data-coral-label>Theme</label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <button data-coral-button data-variant="outline" data-size="sm">Light</button>
                  <button data-coral-button data-variant="outline" data-size="sm">Dark</button>
                  <button data-coral-button data-variant="primary" data-size="sm">System</button>
                </div>
              </div>
            </div>
          </div>
          <div data-coral-drawer-footer>
            <button data-coral-button data-variant="outline" onClick={() => setDrawerOpen(false)}>Cancel</button>
            <button data-coral-button data-variant="primary" onClick={() => setDrawerOpen(false)}>Save</button>
          </div>
        </div>
      </div>

      {/* Command Palette Modal */}
      {commandOpen && (
        <div data-coral-dialog data-open>
          <div data-coral-dialog-backdrop onClick={() => setCommandOpen(false)} />
          <div data-coral-command className="fixed top-1/4 left-1/2 -translate-x-1/2 w-full max-w-lg">
            <div data-coral-command-input-wrapper className="flex items-center border-b border-border px-3">
              <svg data-coral-command-search-icon className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                data-coral-command-input
                placeholder="Type a command or search..."
                autoFocus
                className="flex-1 px-3 py-3 bg-transparent border-0 outline-none"
              />
            </div>
            <div data-coral-command-list className="max-h-80 overflow-y-auto p-2">
              <div data-coral-command-group>
                <div data-coral-command-group-heading className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Suggestions</div>
                {[
                  { icon: '📄', label: 'New File', shortcut: 'N' },
                  { icon: '📁', label: 'Open Folder', shortcut: 'O' },
                  { icon: '🔍', label: 'Search', shortcut: 'F' },
                ].map((item) => (
                  <div
                    key={item.label}
                    data-coral-command-item
                    onClick={() => setCommandOpen(false)}
                    className="flex items-center justify-between px-2 py-2 rounded-md hover:bg-muted cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </span>
                    <span data-coral-command-shortcut className="text-xs text-muted-foreground">
                      <span data-coral-kbd>Ctrl</span> + <span data-coral-kbd>{item.shortcut}</span>
                    </span>
                  </div>
                ))}
              </div>
              <div data-coral-command-separator className="my-2 h-px bg-border" />
              <div data-coral-command-group>
                <div data-coral-command-group-heading className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Settings</div>
                {[
                  { icon: '🎨', label: 'Theme', shortcut: 'T' },
                  { icon: '⚙️', label: 'Settings', shortcut: ',' },
                ].map((item) => (
                  <div
                    key={item.label}
                    data-coral-command-item
                    onClick={() => setCommandOpen(false)}
                    className="flex items-center justify-between px-2 py-2 rounded-md hover:bg-muted cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </span>
                    <span data-coral-command-shortcut className="text-xs text-muted-foreground">
                      <span data-coral-kbd>Ctrl</span> + <span data-coral-kbd>{item.shortcut}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Context Menu Portal */}
      {contextMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-50"
            onClick={() => setContextMenuOpen(false)}
          />
          <div
            ref={contextMenuRef}
            data-coral-context-menu
            data-open
            className="fixed z-50 min-w-[180px]"
            style={{ top: contextMenuPos.y, left: contextMenuPos.x }}
          >
            <div data-coral-context-menu-content>
              <div data-coral-context-menu-item onClick={() => setContextMenuOpen(false)}>
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                Back
                <span data-coral-context-menu-shortcut className="ml-auto text-xs text-muted-foreground">Alt+Left</span>
              </div>
              <div data-coral-context-menu-item onClick={() => setContextMenuOpen(false)}>
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                Forward
                <span data-coral-context-menu-shortcut className="ml-auto text-xs text-muted-foreground">Alt+Right</span>
              </div>
              <div data-coral-context-menu-item onClick={() => setContextMenuOpen(false)}>
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
                <span data-coral-context-menu-shortcut className="ml-auto text-xs text-muted-foreground">Ctrl+R</span>
              </div>
              <div data-coral-context-menu-separator />
              <div data-coral-context-menu-item onClick={() => setContextMenuOpen(false)}>
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copy
                <span data-coral-context-menu-shortcut className="ml-auto text-xs text-muted-foreground">Ctrl+C</span>
              </div>
              <div data-coral-context-menu-item onClick={() => setContextMenuOpen(false)}>
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Paste
                <span data-coral-context-menu-shortcut className="ml-auto text-xs text-muted-foreground">Ctrl+V</span>
              </div>
              <div data-coral-context-menu-separator />
              <div data-coral-context-menu-item data-destructive onClick={() => setContextMenuOpen(false)}>
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
                <span data-coral-context-menu-shortcut className="ml-auto text-xs text-muted-foreground">Del</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Toast Container */}
      <div data-coral-toast-container data-position="top-right">
        {toasts.map((toast) => (
          <div key={toast.id} data-coral-toast data-variant={toast.variant}>
            <svg data-coral-toast-icon viewBox="0 0 24 24" fill="none" stroke="currentColor">
              {toast.variant === 'success' && (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              )}
              {toast.variant === 'error' && (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              )}
              {toast.variant === 'warning' && (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              )}
              {toast.variant === 'info' && (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              )}
            </svg>
            <div data-coral-toast-content>
              <div data-coral-toast-title>{toast.title}</div>
              <div data-coral-toast-description>{toast.message}</div>
            </div>
            <button
              data-coral-toast-close
              onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
              aria-label="Close"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-foreground flex items-center gap-3 group">
        <span className="w-1.5 h-8 bg-gradient-to-b from-primary to-primary/50 rounded-full group-hover:h-10 transition-all duration-300" />
        {children}
      </h2>
      <div className="ml-5 mt-2 h-px bg-gradient-to-r from-primary/20 via-border to-transparent w-48" />
    </div>
  )
}

function ComponentCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
      <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary/40" />
        {title}
      </h3>
      {children}
    </div>
  )
}

export default Showcase
