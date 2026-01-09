import { useState } from 'react'
import { ComponentPageLayout } from './ComponentPageLayout'

// Preview Components with data-coral-* attributes
function NavbarPreview() {
  return (
    <div className="w-full">
      <nav data-coral-navbar>
        <a data-coral-navbar-brand href="#">Logo</a>
        <div data-coral-navbar-links>
          <a data-coral-navbar-link href="#">Home</a>
          <a data-coral-navbar-link data-active href="#">Products</a>
          <a data-coral-navbar-link href="#">About</a>
        </div>
        <div data-coral-navbar-actions>
          <button data-coral-button data-variant="outline">Sign In</button>
          <button data-coral-button data-variant="primary">Get Started</button>
        </div>
      </nav>
    </div>
  )
}

function SidebarPreview() {
  const [activeItem, setActiveItem] = useState('dashboard')
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'projects', label: 'Projects', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z' },
    { id: 'team', label: 'Team', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { id: 'settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35' },
  ]
  return (
    <aside data-coral-sidebar>
      <div data-coral-sidebar-header>
        <div className="w-8 h-8 bg-primary rounded-lg" />
        <span className="font-semibold text-foreground">Company</span>
      </div>
      <nav data-coral-sidebar-nav>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveItem(item.id)}
            data-coral-sidebar-link
            data-active={activeItem === item.id || undefined}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}

function TabsPreview() {
  const [activeTab, setActiveTab] = useState(0)
  const tabs = ['Overview', 'Analytics', 'Reports', 'Settings']
  return (
    <div data-coral-tabs className="w-full max-w-md">
      <div data-coral-tabs-list role="tablist">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            data-coral-tab
            data-active={activeTab === i || undefined}
            role="tab"
            aria-selected={activeTab === i}
          >
            {tab}
          </button>
        ))}
      </div>
      <div data-coral-tab-panel role="tabpanel">
        <p className="text-muted-foreground">Content for {tabs[activeTab]} tab.</p>
      </div>
    </div>
  )
}

function BreadcrumbPreview() {
  return (
    <nav data-coral-breadcrumb aria-label="Breadcrumb">
      <a data-coral-breadcrumb-item href="#">Home</a>
      <span data-coral-breadcrumb-separator>/</span>
      <a data-coral-breadcrumb-item href="#">Products</a>
      <span data-coral-breadcrumb-separator>/</span>
      <a data-coral-breadcrumb-item href="#">Electronics</a>
      <span data-coral-breadcrumb-separator>/</span>
      <span data-coral-breadcrumb-item data-active aria-current="page">Laptops</span>
    </nav>
  )
}

function PaginationPreview() {
  const [currentPage, setCurrentPage] = useState(3)
  return (
    <nav data-coral-pagination aria-label="Pagination">
      <button
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        data-coral-pagination-prev
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      {[1, 2, 3, 4, 5].map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          data-coral-pagination-page
          data-active={currentPage === page || undefined}
        >
          {page}
        </button>
      ))}
      <span data-coral-pagination-ellipsis>...</span>
      <button
        onClick={() => setCurrentPage(10)}
        data-coral-pagination-page
        data-active={currentPage === 10 || undefined}
      >
        10
      </button>
      <button
        onClick={() => setCurrentPage(Math.min(10, currentPage + 1))}
        disabled={currentPage === 10}
        data-coral-pagination-next
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  )
}

function StepperPreview() {
  const steps = [
    { label: 'Account', completed: true },
    { label: 'Details', active: true },
    { label: 'Payment' },
    { label: 'Complete' },
  ]
  return (
    <div data-coral-stepper className="w-full max-w-lg">
      {steps.map((step, i) => (
        <div
          key={step.label}
          data-coral-step
          data-completed={step.completed || undefined}
          data-active={step.active || undefined}
        >
          <span data-coral-step-indicator>
            {step.completed ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : i + 1}
          </span>
          <span data-coral-step-label>{step.label}</span>
          {i < steps.length - 1 && <div data-coral-step-connector />}
        </div>
      ))}
    </div>
  )
}

function MenuPreview() {
  const [activeItem, setActiveItem] = useState('inbox')
  return (
    <nav data-coral-menu>
      {[
        { id: 'inbox', label: 'Inbox', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', badge: 12 },
        { id: 'drafts', label: 'Drafts', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
        { id: 'sent', label: 'Sent', icon: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8' },
        { id: 'trash', label: 'Trash', icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' },
      ].map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveItem(item.id)}
          data-coral-menu-item
          data-active={activeItem === item.id || undefined}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
          </svg>
          {item.label}
          {item.badge && <span data-coral-badge>{item.badge}</span>}
        </button>
      ))}
    </nav>
  )
}

function BottomNavPreview() {
  const [activeItem, setActiveItem] = useState('home')
  return (
    <div className="w-full max-w-sm">
      <nav data-coral-bottom-nav>
        {[
          { id: 'home', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
          { id: 'search', label: 'Search', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
          { id: 'notifications', label: 'Alerts', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
          { id: 'profile', label: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveItem(item.id)}
            data-coral-bottom-nav-item
            data-active={activeItem === item.id || undefined}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

function CommandMenuPreview() {
  const [query, setQuery] = useState('')
  return (
    <div data-coral-command-menu className="w-full max-w-md">
      <div data-coral-command-header>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          data-coral-command-input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a command or search..."
        />
        <kbd data-coral-kbd>Esc</kbd>
      </div>
      <div data-coral-command-list>
        <div data-coral-command-group>
          <span data-coral-command-label>Actions</span>
          {[
            { label: 'New File', shortcut: 'Ctrl+N' },
            { label: 'New Folder', shortcut: 'Ctrl+Shift+N' },
            { label: 'Open File', shortcut: 'Ctrl+O' },
          ].map((item) => (
            <button key={item.label} data-coral-command-item>
              <span>{item.label}</span>
              <kbd data-coral-kbd>{item.shortcut}</kbd>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

const navigationComponents = [
  {
    id: 'navbar',
    name: 'Navbar',
    description: 'A responsive navigation bar with logo, links, and actions.',
    usage: `<nav data-coral-navbar>
  <a data-coral-navbar-brand href="/">Logo</a>
  <div data-coral-navbar-links>
    <a data-coral-navbar-link href="/home">Home</a>
    <a data-coral-navbar-link href="/about">About</a>
    <a data-coral-navbar-link data-active href="/contact">Contact</a>
  </div>
  <div data-coral-navbar-actions>
    <button data-coral-button>Sign In</button>
  </div>
</nav>`,
    props: [
      { name: 'data-sticky', type: 'boolean', default: 'false', description: 'Stick to top on scroll' },
      { name: 'data-transparent', type: 'boolean', default: 'false', description: 'Transparent background' },
    ],
    preview: NavbarPreview,
  },
  {
    id: 'sidebar',
    name: 'Sidebar',
    description: 'A vertical navigation sidebar with collapsible sections.',
    usage: `<aside data-coral-sidebar>
  <div data-coral-sidebar-header>
    <img src="logo.svg" alt="Logo" />
  </div>
  <nav data-coral-sidebar-nav>
    <a data-coral-sidebar-link data-active>Dashboard</a>
    <a data-coral-sidebar-link>Projects</a>
  </nav>
</aside>`,
    props: [
      { name: 'data-collapsed', type: 'boolean', default: 'false', description: 'Collapse to icons only' },
      { name: 'data-width', type: 'string', default: '256px', description: 'Sidebar width' },
    ],
    preview: SidebarPreview,
  },
  {
    id: 'tabs',
    name: 'Tabs',
    description: 'Tabbed navigation for organizing content into sections.',
    usage: `<div data-coral-tabs>
  <div data-coral-tabs-list role="tablist">
    <button data-coral-tab data-active role="tab">Tab 1</button>
    <button data-coral-tab role="tab">Tab 2</button>
  </div>
  <div data-coral-tab-panel role="tabpanel">Content 1</div>
</div>`,
    props: [
      { name: 'data-variant', type: '"default" | "pills" | "underline"', default: '"default"', description: 'Tab style variant' },
      { name: 'data-orientation', type: '"horizontal" | "vertical"', default: '"horizontal"', description: 'Tab layout' },
    ],
    preview: TabsPreview,
  },
  {
    id: 'breadcrumb',
    name: 'Breadcrumb',
    description: 'A breadcrumb navigation showing the current location.',
    usage: `<nav data-coral-breadcrumb>
  <a data-coral-breadcrumb-item href="/">Home</a>
  <span data-coral-breadcrumb-separator>/</span>
  <span data-coral-breadcrumb-item data-active>Current</span>
</nav>`,
    props: [
      { name: 'data-separator', type: 'string', default: '"/"', description: 'Separator character' },
    ],
    preview: BreadcrumbPreview,
  },
  {
    id: 'pagination',
    name: 'Pagination',
    description: 'Navigation for paginated content with page numbers.',
    usage: `<nav data-coral-pagination>
  <button data-coral-pagination-prev>Prev</button>
  <button data-coral-pagination-page data-active>1</button>
  <button data-coral-pagination-page>2</button>
  <button data-coral-pagination-next>Next</button>
</nav>`,
    props: [
      { name: 'data-variant', type: '"default" | "simple" | "compact"', default: '"default"', description: 'Pagination style' },
    ],
    preview: PaginationPreview,
  },
  {
    id: 'stepper',
    name: 'Stepper',
    description: 'A multi-step progress indicator for wizards and forms.',
    usage: `<div data-coral-stepper>
  <div data-coral-step data-completed>
    <span data-coral-step-indicator>1</span>
    <span data-coral-step-label>Account</span>
  </div>
  <div data-coral-step data-active>
    <span data-coral-step-indicator>2</span>
    <span data-coral-step-label>Details</span>
  </div>
</div>`,
    props: [
      { name: 'data-orientation', type: '"horizontal" | "vertical"', default: '"horizontal"', description: 'Stepper layout' },
    ],
    preview: StepperPreview,
  },
  {
    id: 'menu',
    name: 'Menu',
    description: 'A vertical menu with nested items and icons.',
    usage: `<nav data-coral-menu>
  <a data-coral-menu-item data-active>Dashboard</a>
  <a data-coral-menu-item>Projects</a>
</nav>`,
    props: [
      { name: 'data-compact', type: 'boolean', default: 'false', description: 'Reduce spacing' },
    ],
    preview: MenuPreview,
  },
  {
    id: 'bottom-nav',
    name: 'BottomNav',
    description: 'Mobile-friendly bottom navigation bar.',
    usage: `<nav data-coral-bottom-nav>
  <a data-coral-bottom-nav-item data-active>
    <svg><!-- icon --></svg>
    <span>Home</span>
  </a>
</nav>`,
    props: [
      { name: 'data-labels', type: 'boolean', default: 'true', description: 'Show text labels' },
    ],
    preview: BottomNavPreview,
  },
  {
    id: 'command-menu',
    name: 'CommandMenu',
    description: 'A keyboard-first command palette for quick navigation.',
    usage: `<div data-coral-command-menu>
  <input data-coral-command-input placeholder="Search..." />
  <div data-coral-command-list>
    <button data-coral-command-item>New File</button>
  </div>
</div>`,
    props: [
      { name: 'data-hotkey', type: 'string', default: '"cmd+k"', description: 'Keyboard shortcut' },
    ],
    preview: CommandMenuPreview,
  },
]

function NavigationPage() {
  return (
    <ComponentPageLayout
      categoryName="Navigation"
      categoryId="navigation"
      components={navigationComponents}
      accessibilityFeatures={[
        'Focus management',
        'Keyboard navigation',
        'ARIA roles',
        'Skip links support',
      ]}
    />
  )
}

export default NavigationPage
