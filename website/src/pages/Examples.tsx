import { useState } from 'react'

// Example categories with live demos
const exampleCategories = [
  {
    name: 'Fundamentals',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    examples: [
      {
        id: 'basic',
        title: 'Basic Utilities',
        description: 'Learn the fundamentals of CoralCSS utility classes.',
        preview: BasicUtilitiesPreview,
        code: `<!-- Spacing utilities -->
<div class="p-4 m-2">Padding and margin</div>

<!-- Text utilities -->
<p class="text-lg font-bold text-primary">
  Styled text
</p>

<!-- Background and borders -->
<div class="bg-card border border-border rounded-lg">
  Card with border
</div>`,
      },
      {
        id: 'responsive',
        title: 'Responsive Design',
        description: 'Build responsive layouts with breakpoint variants.',
        preview: ResponsivePreview,
        code: `<!-- Responsive breakpoints -->
<div class="
  w-full          /* mobile first */
  sm:w-1/2       /* >= 640px */
  md:w-1/3       /* >= 768px */
  lg:w-1/4       /* >= 1024px */
  xl:w-1/5       /* >= 1280px */
">
  Responsive width
</div>

<!-- Responsive flexbox -->
<div class="flex flex-col md:flex-row gap-4">
  <div>Column 1</div>
  <div>Column 2</div>
</div>`,
      },
    ],
  },
  {
    name: 'Layout',
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
    examples: [
      {
        id: 'flexbox',
        title: 'Flexbox Layout',
        description: 'Create flexible layouts with flex utilities.',
        preview: FlexboxPreview,
        code: `<!-- Flex container -->
<div class="flex items-center justify-between gap-4">
  <div>Left</div>
  <div>Center</div>
  <div>Right</div>
</div>

<!-- Flex wrap -->
<div class="flex flex-wrap gap-2">
  <div class="flex-1 min-w-[200px]">Flexible item</div>
  <div class="flex-1 min-w-[200px]">Flexible item</div>
</div>

<!-- Centering -->
<div class="flex items-center justify-center h-40">
  Perfectly centered
</div>`,
      },
      {
        id: 'grid',
        title: 'Grid Layout',
        description: 'Build complex grids with grid utilities.',
        preview: GridPreview,
        code: `<!-- Basic grid -->
<div class="grid grid-cols-3 gap-4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>

<!-- Responsive grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  <div>Item</div>
</div>

<!-- Grid with span -->
<div class="grid grid-cols-4 gap-4">
  <div class="col-span-2">Wide</div>
  <div>Normal</div>
  <div>Normal</div>
</div>`,
      },
    ],
  },
  {
    name: 'Styling',
    icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
    examples: [
      {
        id: 'colors',
        title: 'Colors & Gradients',
        description: 'Work with colors, opacity, and gradients.',
        preview: ColorsPreview,
        code: `<!-- Theme colors -->
<div class="bg-primary text-primary-foreground">Primary</div>
<div class="bg-secondary text-secondary-foreground">Secondary</div>
<div class="bg-destructive text-destructive-foreground">Destructive</div>

<!-- Opacity -->
<div class="bg-primary/50">50% opacity</div>
<div class="bg-primary/20">20% opacity</div>

<!-- Gradients -->
<div class="bg-gradient-to-r from-primary to-accent">
  Gradient
</div>`,
      },
      {
        id: 'borders',
        title: 'Borders & Shadows',
        description: 'Add borders, rounded corners, and shadows.',
        preview: BordersPreview,
        code: `<!-- Border styles -->
<div class="border border-border">Default border</div>
<div class="border-2 border-primary">Thick primary border</div>

<!-- Rounded corners -->
<div class="rounded">Small radius</div>
<div class="rounded-lg">Large radius</div>
<div class="rounded-full">Fully rounded</div>

<!-- Shadows -->
<div class="shadow-sm">Small shadow</div>
<div class="shadow-lg">Large shadow</div>
<div class="shadow-2xl">Extra large shadow</div>`,
      },
      {
        id: 'typography',
        title: 'Typography',
        description: 'Style text with typography utilities.',
        preview: TypographyPreview,
        code: `<!-- Font sizes -->
<p class="text-xs">Extra small</p>
<p class="text-base">Base size</p>
<p class="text-2xl">2XL size</p>

<!-- Font weights -->
<p class="font-normal">Normal weight</p>
<p class="font-semibold">Semibold</p>
<p class="font-bold">Bold</p>

<!-- Text colors -->
<p class="text-foreground">Primary text</p>
<p class="text-muted-foreground">Muted text</p>
<p class="text-primary">Accent text</p>`,
      },
    ],
  },
  {
    name: 'Effects',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    examples: [
      {
        id: 'transforms',
        title: 'Transforms',
        description: 'Apply transforms like scale, rotate, and translate.',
        preview: TransformsPreview,
        code: `<!-- Scale -->
<div class="hover:scale-105 transition-transform">
  Scale on hover
</div>

<!-- Rotate -->
<div class="hover:rotate-6 transition-transform">
  Rotate on hover
</div>

<!-- Translate -->
<div class="hover:-translate-y-1 transition-transform">
  Lift on hover
</div>

<!-- Combined -->
<div class="hover:(scale-105 rotate-2 -translate-y-1) transition-all">
  Combined effect
</div>`,
      },
      {
        id: 'transitions',
        title: 'Transitions',
        description: 'Animate properties with transition utilities.',
        preview: TransitionsPreview,
        code: `<!-- Basic transition -->
<button class="transition hover:bg-primary">
  Smooth color change
</button>

<!-- Duration -->
<div class="transition duration-300">300ms</div>
<div class="transition duration-500">500ms</div>

<!-- Timing functions -->
<div class="transition ease-in">Ease in</div>
<div class="transition ease-out">Ease out</div>
<div class="transition ease-in-out">Ease in-out</div>`,
      },
      {
        id: 'filters',
        title: 'Filters',
        description: 'Apply blur, brightness, and other filters.',
        preview: FiltersPreview,
        code: `<!-- Blur -->
<div class="blur-sm">Slight blur</div>
<div class="hover:blur-none transition">
  Blur until hover
</div>

<!-- Brightness -->
<img class="brightness-75" />
<img class="hover:brightness-110" />

<!-- Backdrop blur (glassmorphism) -->
<div class="bg-white/30 backdrop-blur-lg">
  Frosted glass effect
</div>`,
      },
    ],
  },
  {
    name: 'Dark Mode',
    icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z',
    examples: [
      {
        id: 'dark-mode',
        title: 'Dark Mode',
        description: 'Implement dark mode with class, media, or selector strategies.',
        preview: DarkModePreview,
        code: `<!-- Dark mode utilities -->
<div class="bg-white dark:bg-gray-900">
  Light bg, dark in dark mode
</div>

<p class="text-gray-900 dark:text-gray-100">
  Dark text, light in dark mode
</p>

<!-- Enable via class on html/body -->
<html class="dark">
  <!-- All dark: utilities active -->
</html>

<!-- Or use media query strategy -->
/* In coral config */
darkMode: 'media' // Uses prefers-color-scheme`,
      },
    ],
  },
  {
    name: 'Modern CSS',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    examples: [
      {
        id: 'container-queries',
        title: 'Container Queries',
        description: 'Respond to container size with @container.',
        preview: ContainerQueriesPreview,
        code: `<!-- Container -->
<div class="@container">
  <!-- Children respond to container width -->
  <div class="@sm:flex @md:grid @lg:hidden">
    Responds to container, not viewport
  </div>
</div>

<!-- Named containers -->
<article class="@container/card">
  <div class="@sm/card:flex-row">
    Named container query
  </div>
</article>`,
      },
      {
        id: '3d-transforms',
        title: '3D Transforms',
        description: 'Create stunning 3D effects with perspective.',
        preview: Transform3DPreview,
        code: `<!-- 3D perspective -->
<div class="perspective-lg">
  <div class="rotate-y-12 transform-3d">
    3D rotated element
  </div>
</div>

<!-- Card flip -->
<div class="card-3d">
  <div class="card-3d-inner">
    <div class="card-3d-front">Front</div>
    <div class="card-3d-back">Back</div>
  </div>
</div>`,
      },
      {
        id: 'entry-animations',
        title: 'Entry Animations',
        description: '@starting-style for smooth element appearance.',
        preview: EntryAnimationsPreview,
        code: `<!-- Fade in on mount -->
<div class="starting-fade">
  Fades in when added to DOM
</div>

<!-- Scale in -->
<div class="starting-scale starting-duration-500">
  Scales up on mount
</div>

<!-- Slide up with spring -->
<div class="starting-slide-up starting-ease-spring">
  Slides up with spring easing
</div>`,
      },
    ],
  },
  {
    name: 'Animations',
    icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z',
    examples: [
      {
        id: 'keyframes',
        title: 'Keyframe Animations',
        description: 'Built-in keyframe animations for common effects.',
        preview: KeyframePreview,
        code: `<!-- Pulse -->
<div class="animate-pulse">
  Loading state...
</div>

<!-- Bounce -->
<button class="animate-bounce">
  Scroll down
</button>

<!-- Spin -->
<div class="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />

<!-- Ping (notification dot) -->
<span class="relative flex h-3 w-3">
  <span class="animate-ping absolute h-full w-full rounded-full bg-primary opacity-75" />
  <span class="relative rounded-full h-3 w-3 bg-primary" />
</span>`,
      },
      {
        id: 'hover-animations',
        title: 'Hover Animations',
        description: 'Interactive animations on hover states.',
        preview: HoverAnimationsPreview,
        code: `<!-- Grow -->
<button class="hover:scale-105 transition-transform">
  Grow on hover
</button>

<!-- Glow -->
<button class="hover:shadow-lg hover:shadow-primary/25 transition-shadow">
  Glow effect
</button>

<!-- Slide underline -->
<a class="group relative">
  <span>Link text</span>
  <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all" />
</a>`,
      },
      {
        id: 'stagger',
        title: 'Staggered Animations',
        description: 'Create sequential animations with delays.',
        preview: StaggerPreview,
        code: `<!-- Staggered list -->
<ul>
  <li class="animate-fade-in-up [animation-delay:0ms]">Item 1</li>
  <li class="animate-fade-in-up [animation-delay:100ms]">Item 2</li>
  <li class="animate-fade-in-up [animation-delay:200ms]">Item 3</li>
  <li class="animate-fade-in-up [animation-delay:300ms]">Item 4</li>
</ul>`,
      },
    ],
  },
  {
    name: 'Form Patterns',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    examples: [
      {
        id: 'input-states',
        title: 'Input States',
        description: 'Style inputs for different states.',
        preview: InputStatesPreview,
        code: `<!-- Default -->
<input class="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50" />

<!-- Error state -->
<input class="border-2 border-destructive rounded px-3 py-2" />
<p class="text-sm text-destructive mt-1">Error message</p>

<!-- Disabled -->
<input class="border border-border rounded px-3 py-2 bg-muted opacity-50 cursor-not-allowed" disabled />`,
      },
      {
        id: 'floating-labels',
        title: 'Floating Labels',
        description: 'Animated floating label inputs.',
        preview: FloatingLabelsPreview,
        code: `<div class="relative">
  <input class="peer w-full px-3 py-2 border rounded placeholder-transparent" placeholder="Email" />
  <label class="absolute left-3 -top-2.5 bg-background px-1 text-sm text-muted-foreground
    peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
    peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary
    transition-all">
    Email
  </label>
</div>`,
      },
      {
        id: 'form-layout',
        title: 'Form Layout',
        description: 'Common form layout patterns.',
        preview: FormLayoutPreview,
        code: `<!-- Inline form -->
<form class="flex gap-4 items-end">
  <div class="flex-1">
    <label class="text-sm font-medium">Email</label>
    <input class="w-full border rounded px-3 py-2" />
  </div>
  <button class="btn btn-primary">Subscribe</button>
</form>

<!-- Stacked form -->
<form class="space-y-4">
  <div>
    <label class="text-sm font-medium">Name</label>
    <input class="w-full border rounded px-3 py-2" />
  </div>
  <button class="btn btn-primary w-full">Submit</button>
</form>`,
      },
    ],
  },
  {
    name: 'Components',
    icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
    examples: [
      {
        id: 'card-patterns',
        title: 'Card Patterns',
        description: 'Common card layout patterns.',
        preview: CardPatternsPreview,
        code: `<!-- Basic card -->
<div class="bg-card border rounded-lg p-4">
  <h3 class="font-semibold">Title</h3>
  <p class="text-muted-foreground">Description</p>
</div>

<!-- Card with image -->
<div class="bg-card border rounded-lg overflow-hidden">
  <img class="w-full h-40 object-cover" />
  <div class="p-4">
    <h3 class="font-semibold">Title</h3>
  </div>
</div>

<!-- Horizontal card -->
<div class="flex bg-card border rounded-lg overflow-hidden">
  <img class="w-24 object-cover" />
  <div class="p-4 flex-1">Content</div>
</div>`,
      },
      {
        id: 'avatar-stack',
        title: 'Avatar Patterns',
        description: 'Avatar stacks and groups.',
        preview: AvatarStackPreview,
        code: `<!-- Avatar stack -->
<div class="flex -space-x-3">
  <div class="w-10 h-10 rounded-full bg-primary border-2 border-background" />
  <div class="w-10 h-10 rounded-full bg-info border-2 border-background" />
  <div class="w-10 h-10 rounded-full bg-success border-2 border-background" />
  <div class="w-10 h-10 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs">
    +5
  </div>
</div>`,
      },
      {
        id: 'navigation',
        title: 'Navigation Patterns',
        description: 'Navbar and tab patterns.',
        preview: NavigationPreview,
        code: `<!-- Tab navigation -->
<nav class="flex border-b">
  <button class="px-4 py-2 border-b-2 border-primary text-primary">Active</button>
  <button class="px-4 py-2 border-b-2 border-transparent text-muted-foreground hover:text-foreground">Tab 2</button>
  <button class="px-4 py-2 border-b-2 border-transparent text-muted-foreground hover:text-foreground">Tab 3</button>
</nav>

<!-- Pill navigation -->
<nav class="flex gap-2 bg-muted p-1 rounded-lg">
  <button class="px-4 py-1.5 bg-card rounded-md shadow">Active</button>
  <button class="px-4 py-1.5 text-muted-foreground hover:text-foreground">Tab 2</button>
</nav>`,
      },
    ],
  },
  {
    name: 'Real World',
    icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
    examples: [
      {
        id: 'product-card',
        title: 'Product Card',
        description: 'E-commerce product card pattern.',
        preview: ProductCardPreview,
        code: `<div class="bg-card border rounded-xl overflow-hidden group">
  <div class="relative">
    <img class="w-full h-48 object-cover" />
    <button class="absolute top-2 right-2 p-2 bg-card/80 rounded-full opacity-0 group-hover:opacity-100 transition">
      ❤️
    </button>
  </div>
  <div class="p-4">
    <p class="text-sm text-muted-foreground">Category</p>
    <h3 class="font-semibold">Product Name</h3>
    <div class="flex items-center justify-between mt-2">
      <span class="text-lg font-bold text-primary">$99</span>
      <button class="btn btn-primary btn-sm">Add to Cart</button>
    </div>
  </div>
</div>`,
      },
      {
        id: 'pricing-card',
        title: 'Pricing Card',
        description: 'SaaS pricing card pattern.',
        preview: PricingCardPreview,
        code: `<div class="bg-card border rounded-xl p-6 text-center">
  <h3 class="text-xl font-bold">Pro</h3>
  <div class="my-4">
    <span class="text-4xl font-bold">$29</span>
    <span class="text-muted-foreground">/month</span>
  </div>
  <ul class="space-y-3 text-left mb-6">
    <li class="flex items-center gap-2">
      <span class="text-success">✓</span> Unlimited projects
    </li>
    <li class="flex items-center gap-2">
      <span class="text-success">✓</span> Priority support
    </li>
  </ul>
  <button class="btn btn-primary w-full">Get Started</button>
</div>`,
      },
      {
        id: 'stat-card',
        title: 'Dashboard Stats',
        description: 'Dashboard statistics cards.',
        preview: StatCardPreview,
        code: `<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
  <div class="bg-card border rounded-lg p-4">
    <p class="text-sm text-muted-foreground">Total Users</p>
    <p class="text-2xl font-bold">12,345</p>
    <p class="text-sm text-success">↑ 12%</p>
  </div>
  <div class="bg-card border rounded-lg p-4">
    <p class="text-sm text-muted-foreground">Revenue</p>
    <p class="text-2xl font-bold">$45,678</p>
    <p class="text-sm text-success">↑ 8%</p>
  </div>
</div>`,
      },
    ],
  },
]

function Examples() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [expandedExample, setExpandedExample] = useState<string | null>(null)

  // Filter examples by category
  const filteredCategories = activeCategory === 'all'
    ? exampleCategories
    : exampleCategories.filter(cat => cat.name === activeCategory)

  const totalExamples = exampleCategories.reduce((sum, cat) => sum + cat.examples.length, 0)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-muted/50 via-background to-primary/5" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-1/3 w-72 h-72 bg-primary/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-primary/20 text-primary text-sm font-medium mb-6 shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {totalExamples} Interactive Examples
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
              Learn by <span className="gradient-text">Example</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Explore practical examples covering utilities, layouts, components, and modern CSS features.
              Each example includes live preview and code snippets.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-20 z-30 bg-background/80 backdrop-blur-lg border-b border-border py-4 mb-8">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === 'all'
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              All ({totalExamples})
            </button>
            {exampleCategories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  activeCategory === cat.name
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={cat.icon} />
                </svg>
                {cat.name} ({cat.examples.length})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Examples Grid */}
      <section className="container pb-20">
        {filteredCategories.map((category) => (
          <div key={category.name} className="mb-16">
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={category.icon} />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{category.name}</h2>
                <p className="text-sm text-muted-foreground">{category.examples.length} examples</p>
              </div>
            </div>

            {/* Examples */}
            <div className="grid md:grid-cols-2 gap-6">
              {category.examples.map((example) => (
                <ExampleCard
                  key={example.id}
                  example={example}
                  isExpanded={expandedExample === example.id}
                  onToggle={() => setExpandedExample(expandedExample === example.id ? null : example.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="py-16 section-dark">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start using CoralCSS in your project today. Zero dependencies, modern CSS features, and excellent developer experience.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/docs" className="btn btn-primary px-8 py-3">
              Read Documentation
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

interface ExampleProps {
  example: {
    id: string
    title: string
    description: string
    preview: React.FC
    code: string
  }
  isExpanded: boolean
  onToggle: () => void
}

function ExampleCard({ example, isExpanded, onToggle }: ExampleProps) {
  const [showCode, setShowCode] = useState(false)
  const Preview = example.preview

  return (
    <div className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {example.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{example.description}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowCode(!showCode)}
              className={`p-2 rounded-lg transition-all ${
                showCode
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
              }`}
              title={showCode ? 'Show preview' : 'Show code'}
            >
              {showCode ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              )}
            </button>
            <button
              onClick={onToggle}
              className={`p-2 rounded-lg transition-all ${
                isExpanded
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
              }`}
              title={isExpanded ? 'Collapse' : 'Expand'}
            >
              <svg className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`transition-all duration-300 ${isExpanded ? 'max-h-[600px]' : 'max-h-[200px]'} overflow-hidden`}>
        {showCode ? (
          <div className="p-4 bg-secondary/50 overflow-auto">
            <pre className="text-sm text-muted-foreground font-mono whitespace-pre-wrap">{example.code}</pre>
          </div>
        ) : (
          <div className="p-6 bg-muted/30 min-h-[160px] flex items-center justify-center">
            <Preview />
          </div>
        )}
      </div>
    </div>
  )
}

// Preview Components
function BasicUtilitiesPreview() {
  return (
    <div className="space-y-4 w-full max-w-sm">
      <div className="p-4 bg-card border border-border rounded-lg">
        <p className="text-lg font-bold text-primary mb-2">Styled Text</p>
        <p className="text-sm text-muted-foreground">Using utility classes for styling</p>
      </div>
      <div className="flex gap-2">
        <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm">Tag</span>
        <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">Tag</span>
        <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">Tag</span>
      </div>
    </div>
  )
}

function ResponsivePreview() {
  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 p-4 bg-primary/10 border border-primary/20 rounded-lg text-center">
          <p className="text-sm font-medium text-primary">Column 1</p>
          <p className="text-xs text-muted-foreground">Stack on mobile</p>
        </div>
        <div className="flex-1 p-4 bg-primary/10 border border-primary/20 rounded-lg text-center">
          <p className="text-sm font-medium text-primary">Column 2</p>
          <p className="text-xs text-muted-foreground">Row on desktop</p>
        </div>
      </div>
    </div>
  )
}

function FlexboxPreview() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex items-center justify-between p-4 bg-card border rounded-lg">
        <span className="px-3 py-1 bg-primary/10 text-primary rounded text-sm">Left</span>
        <span className="px-3 py-1 bg-primary/10 text-primary rounded text-sm">Center</span>
        <span className="px-3 py-1 bg-primary/10 text-primary rounded text-sm">Right</span>
      </div>
      <div className="flex items-center justify-center h-20 bg-muted rounded-lg">
        <span className="text-muted-foreground">Centered content</span>
      </div>
    </div>
  )
}

function GridPreview() {
  return (
    <div className="w-full max-w-sm">
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="aspect-square bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center text-primary font-medium">
            {i}
          </div>
        ))}
      </div>
    </div>
  )
}

function ColorsPreview() {
  return (
    <div className="space-y-3 w-full max-w-sm">
      <div className="flex gap-2">
        <div className="w-12 h-12 rounded-lg bg-primary" title="primary" />
        <div className="w-12 h-12 rounded-lg bg-secondary" title="secondary" />
        <div className="w-12 h-12 rounded-lg bg-accent" title="accent" />
        <div className="w-12 h-12 rounded-lg bg-muted" title="muted" />
        <div className="w-12 h-12 rounded-lg bg-destructive" title="destructive" />
      </div>
      <div className="h-8 rounded-lg bg-gradient-to-r from-primary via-accent to-secondary" />
    </div>
  )
}

function BordersPreview() {
  return (
    <div className="flex gap-4 items-center">
      <div className="w-16 h-16 bg-card border border-border rounded flex items-center justify-center text-xs text-muted-foreground">sm</div>
      <div className="w-16 h-16 bg-card border border-border rounded-lg flex items-center justify-center text-xs text-muted-foreground">lg</div>
      <div className="w-16 h-16 bg-card border border-border rounded-full flex items-center justify-center text-xs text-muted-foreground">full</div>
      <div className="w-16 h-16 bg-card shadow-lg rounded-lg flex items-center justify-center text-xs text-muted-foreground">shadow</div>
    </div>
  )
}

function TypographyPreview() {
  return (
    <div className="space-y-2 w-full max-w-sm text-left">
      <p className="text-2xl font-bold text-foreground">Heading Text</p>
      <p className="text-base text-foreground">Regular body text with normal weight</p>
      <p className="text-sm text-muted-foreground">Muted smaller text for descriptions</p>
      <p className="text-sm font-semibold text-primary">Accented semibold text</p>
    </div>
  )
}

function TransformsPreview() {
  return (
    <div className="flex gap-4">
      <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-xs hover:scale-110 transition-transform cursor-pointer">
        Scale
      </div>
      <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-xs hover:rotate-12 transition-transform cursor-pointer">
        Rotate
      </div>
      <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-xs hover:-translate-y-2 transition-transform cursor-pointer">
        Lift
      </div>
    </div>
  )
}

function TransitionsPreview() {
  return (
    <div className="flex gap-4">
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg transition-all duration-150 hover:bg-primary/80">
        Fast
      </button>
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg transition-all duration-300 hover:bg-primary/80">
        Medium
      </button>
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg transition-all duration-500 hover:bg-primary/80">
        Slow
      </button>
    </div>
  )
}

function FiltersPreview() {
  return (
    <div className="flex gap-4 items-center">
      <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-lg blur-sm" />
      <div className="w-20 h-20 bg-card/50 backdrop-blur-lg border border-border rounded-lg flex items-center justify-center text-xs text-muted-foreground p-2 text-center">
        Backdrop blur
      </div>
      <div className="w-20 h-20 bg-primary rounded-lg brightness-50 flex items-center justify-center text-primary-foreground text-xs">
        Dim
      </div>
    </div>
  )
}

function DarkModePreview() {
  return (
    <div className="flex gap-4">
      <div className="w-24 h-24 bg-white border border-gray-200 rounded-lg flex flex-col items-center justify-center">
        <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0z" />
        </svg>
        <span className="text-xs text-gray-900 mt-1">Light</span>
      </div>
      <div className="w-24 h-24 bg-gray-900 border border-gray-700 rounded-lg flex flex-col items-center justify-center">
        <svg className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" />
        </svg>
        <span className="text-xs text-gray-100 mt-1">Dark</span>
      </div>
    </div>
  )
}

function ContainerQueriesPreview() {
  return (
    <div className="w-full max-w-sm">
      <div className="@container p-4 bg-card border rounded-lg">
        <div className="flex flex-col @[200px]:flex-row gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-xl">
            {String.fromCharCode(128230)}
          </div>
          <div className="flex-1">
            <p className="font-medium text-foreground">Container Query</p>
            <p className="text-sm text-muted-foreground">Responds to container width</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Transform3DPreview() {
  return (
    <div className="card-3d w-32 h-20 cursor-pointer">
      <div className="card-3d-inner relative w-full h-full">
        <div className="card-3d-front absolute inset-0 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-medium text-sm">
          Hover me
        </div>
        <div className="card-3d-back absolute inset-0 bg-secondary rounded-lg flex items-center justify-center text-secondary-foreground font-medium text-sm">
          Flipped!
        </div>
      </div>
    </div>
  )
}

function EntryAnimationsPreview() {
  const [key, setKey] = useState(0)
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-3">
        <div key={`a-${key}`} className="w-10 h-10 bg-primary rounded-lg starting-fade" />
        <div key={`b-${key}`} className="w-10 h-10 bg-info rounded-lg starting-scale" />
        <div key={`c-${key}`} className="w-10 h-10 bg-success rounded-lg starting-slide-up" />
      </div>
      <button onClick={() => setKey(k => k + 1)} className="text-xs text-primary hover:underline">
        Replay
      </button>
    </div>
  )
}

// New Preview Components for added categories
function KeyframePreview() {
  return (
    <div className="flex gap-6 items-center">
      <div className="w-12 h-12 bg-muted rounded-lg animate-pulse" />
      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      <span className="relative flex h-4 w-4">
        <span className="animate-ping absolute h-full w-full rounded-full bg-primary opacity-75" />
        <span className="relative rounded-full h-4 w-4 bg-primary" />
      </span>
      <div className="animate-bounce text-xl">↓</div>
    </div>
  )
}

function HoverAnimationsPreview() {
  return (
    <div className="flex gap-4">
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:scale-105 transition-transform">
        Grow
      </button>
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-shadow">
        Glow
      </button>
      <div className="group cursor-pointer">
        <span className="text-foreground">Underline</span>
        <span className="block h-0.5 w-0 bg-primary group-hover:w-full transition-all" />
      </div>
    </div>
  )
}

function StaggerPreview() {
  const [key, setKey] = useState(0)
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        {[0, 1, 2, 3].map(i => (
          <div
            key={`${key}-${i}`}
            className="w-10 h-10 bg-primary rounded-lg animate-fade-in"
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>
      <button onClick={() => setKey(k => k + 1)} className="text-xs text-primary hover:underline">
        Replay
      </button>
    </div>
  )
}

function InputStatesPreview() {
  return (
    <div className="space-y-3 w-full max-w-xs">
      <input className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/50 bg-transparent" placeholder="Normal input" />
      <div>
        <input className="w-full px-3 py-2 border-2 border-destructive rounded bg-transparent" placeholder="Error state" />
        <p className="text-xs text-destructive mt-1">This field is required</p>
      </div>
      <input className="w-full px-3 py-2 border border-border rounded bg-muted opacity-50 cursor-not-allowed" placeholder="Disabled" disabled />
    </div>
  )
}

function FloatingLabelsPreview() {
  return (
    <div className="w-full max-w-xs">
      <div className="relative">
        <input
          type="text"
          className="peer w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/50 bg-transparent placeholder-transparent"
          placeholder="Email"
        />
        <label className="absolute left-3 -top-2.5 bg-background px-1 text-xs text-muted-foreground peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary transition-all">
          Email address
        </label>
      </div>
    </div>
  )
}

function FormLayoutPreview() {
  return (
    <div className="w-full max-w-sm">
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Email</label>
          <input className="w-full px-3 py-1.5 border border-border rounded text-sm bg-transparent" />
        </div>
        <button className="px-4 py-1.5 bg-primary text-primary-foreground rounded text-sm">Subscribe</button>
      </div>
    </div>
  )
}

function CardPatternsPreview() {
  return (
    <div className="flex gap-3">
      <div className="bg-card border rounded-lg p-3 w-24">
        <div className="w-full h-12 bg-muted rounded mb-2" />
        <p className="text-xs font-medium truncate">Card Title</p>
      </div>
      <div className="flex bg-card border rounded-lg overflow-hidden w-36">
        <div className="w-12 bg-muted" />
        <div className="p-2 flex-1">
          <p className="text-xs font-medium">Horizontal</p>
          <p className="text-xs text-muted-foreground">Card</p>
        </div>
      </div>
    </div>
  )
}

function AvatarStackPreview() {
  return (
    <div className="flex -space-x-3">
      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium border-2 border-background">A</div>
      <div className="w-10 h-10 rounded-full bg-info flex items-center justify-center text-white text-sm font-medium border-2 border-background">B</div>
      <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center text-white text-sm font-medium border-2 border-background">C</div>
      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs font-medium border-2 border-background">+5</div>
    </div>
  )
}

function NavigationPreview() {
  const [active, setActive] = useState(0)
  return (
    <div className="space-y-4">
      <nav className="flex border-b text-sm">
        {['Tab 1', 'Tab 2', 'Tab 3'].map((tab, i) => (
          <button key={tab} onClick={() => setActive(i)} className={`px-4 py-2 border-b-2 ${i === active ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`}>{tab}</button>
        ))}
      </nav>
      <nav className="flex gap-1 bg-muted p-1 rounded-lg text-sm">
        {['Pill 1', 'Pill 2'].map((tab, i) => (
          <button key={tab} onClick={() => setActive(i)} className={`px-3 py-1 rounded-md ${i === active ? 'bg-card shadow' : 'text-muted-foreground'}`}>{tab}</button>
        ))}
      </nav>
    </div>
  )
}

function ProductCardPreview() {
  return (
    <div className="bg-card border rounded-xl overflow-hidden w-40 group">
      <div className="relative h-24 bg-muted flex items-center justify-center">
        <span className="text-3xl">🎧</span>
        <button className="absolute top-1 right-1 p-1.5 bg-card/80 rounded-full opacity-0 group-hover:opacity-100 transition text-xs">❤️</button>
      </div>
      <div className="p-3">
        <p className="text-xs text-muted-foreground">Audio</p>
        <p className="text-sm font-semibold truncate">Headphones</p>
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-primary">$99</span>
          <button className="text-xs px-2 py-1 bg-primary text-primary-foreground rounded">Add</button>
        </div>
      </div>
    </div>
  )
}

function PricingCardPreview() {
  return (
    <div className="bg-card border rounded-xl p-4 text-center w-40">
      <p className="font-bold">Pro</p>
      <p className="text-2xl font-bold my-2">$29<span className="text-xs text-muted-foreground font-normal">/mo</span></p>
      <div className="space-y-1 text-xs text-left mb-3">
        <p className="flex items-center gap-1"><span className="text-success">✓</span> Unlimited</p>
        <p className="flex items-center gap-1"><span className="text-success">✓</span> Priority</p>
      </div>
      <button className="w-full py-1.5 bg-primary text-primary-foreground rounded text-sm">Start</button>
    </div>
  )
}

function StatCardPreview() {
  return (
    <div className="flex gap-3">
      <div className="bg-card border rounded-lg p-3">
        <p className="text-xs text-muted-foreground">Users</p>
        <p className="text-xl font-bold">12.5K</p>
        <p className="text-xs text-success">↑ 12%</p>
      </div>
      <div className="bg-card border rounded-lg p-3">
        <p className="text-xs text-muted-foreground">Revenue</p>
        <p className="text-xl font-bold">$45K</p>
        <p className="text-xs text-success">↑ 8%</p>
      </div>
    </div>
  )
}

export default Examples
