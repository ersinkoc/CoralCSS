import { useState } from 'react'
import { ComponentPageLayout } from './ComponentPageLayout'

// Preview Components with data-coral-* attributes
function CardPreview() {
  return (
    <div className="grid md:grid-cols-2 gap-4 w-full max-w-2xl">
      <div data-coral-card data-interactive>
        <div data-coral-card-image className="h-32 bg-gradient-to-br from-primary to-accent" />
        <div data-coral-card-content>
          <h3 data-coral-card-title>Card Title</h3>
          <p data-coral-card-description>This is a description of the card content.</p>
        </div>
        <div data-coral-card-footer>
          <button data-coral-button data-variant="primary" data-size="sm">Learn More</button>
        </div>
      </div>
      <div data-coral-card data-interactive>
        <div data-coral-card-content>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 data-coral-card-title>Performance</h3>
              <p className="text-xs text-muted-foreground">Optimized for speed</p>
            </div>
          </div>
          <p data-coral-card-description>
            Built with performance in mind, using modern optimization techniques.
          </p>
        </div>
      </div>
    </div>
  )
}

function AvatarPreview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size, i) => (
          <div key={size} data-coral-avatar data-size={size}>
            <span data-coral-avatar-fallback>
              {['JD', 'AB', 'CD', 'EF', 'GH'][i]}
            </span>
          </div>
        ))}
      </div>
      <div data-coral-avatar-group>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} data-coral-avatar data-size="md">
            <span data-coral-avatar-fallback>U{i}</span>
          </div>
        ))}
        <span data-coral-avatar-overflow>+5</span>
      </div>
    </div>
  )
}

function BadgePreview() {
  return (
    <div className="flex flex-wrap gap-3">
      <span data-coral-badge>Default</span>
      <span data-coral-badge data-variant="success">Success</span>
      <span data-coral-badge data-variant="warning">Warning</span>
      <span data-coral-badge data-variant="error">Error</span>
      <span data-coral-badge data-variant="info">Info</span>
      <span data-coral-badge data-outline>Outline</span>
    </div>
  )
}

function TablePreview() {
  const data = [
    { name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
    { name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive' },
  ]
  return (
    <div data-coral-table-wrapper className="w-full">
      <table data-coral-table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.email}>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.role}</td>
              <td>
                <span data-coral-badge data-variant={row.status === 'Active' ? 'success' : 'default'}>
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function AccordionPreview() {
  const [openItems, setOpenItems] = useState<number[]>([0])
  const items = [
    { title: 'What is CoralCSS?', content: 'CoralCSS is a modern, utility-first CSS framework with JIT compilation and a comprehensive component library.' },
    { title: 'How do I install it?', content: 'You can install CoralCSS via npm: npm install @coral-css/core' },
    { title: 'Is it free to use?', content: 'Yes, CoralCSS is completely free and open-source under the MIT license.' },
  ]
  return (
    <div data-coral-accordion className="w-full max-w-md">
      {items.map((item, i) => (
        <div
          key={i}
          data-coral-accordion-item
          data-open={openItems.includes(i) || undefined}
        >
          <button
            onClick={() => setOpenItems(
              openItems.includes(i)
                ? openItems.filter(x => x !== i)
                : [...openItems, i]
            )}
            data-coral-accordion-trigger
          >
            {item.title}
            <svg
              data-coral-accordion-icon
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div data-coral-accordion-content>
            <p>{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function TimelinePreview() {
  const events = [
    { title: 'Project Started', date: 'Jan 15, 2024', completed: true },
    { title: 'Design Phase', date: 'Feb 1, 2024', completed: true },
    { title: 'Development', date: 'Mar 1, 2024', active: true },
    { title: 'Launch', date: 'Apr 1, 2024' },
  ]
  return (
    <div data-coral-timeline>
      {events.map((event, i) => (
        <div
          key={i}
          data-coral-timeline-item
          data-completed={event.completed || undefined}
          data-active={event.active || undefined}
        >
          <div data-coral-timeline-marker />
          <div data-coral-timeline-content>
            <h4 data-coral-timeline-title>{event.title}</h4>
            <time data-coral-timeline-time>{event.date}</time>
          </div>
        </div>
      ))}
    </div>
  )
}

function ProgressPreview() {
  return (
    <div className="w-full max-w-md space-y-6">
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-foreground">Progress</span>
          <span className="text-muted-foreground">60%</span>
        </div>
        <div data-coral-progress data-value="60">
          <div data-coral-progress-bar />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-foreground">Upload</span>
          <span className="text-success">Complete</span>
        </div>
        <div data-coral-progress data-value="100" data-variant="success">
          <div data-coral-progress-bar />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-foreground">Storage</span>
          <span className="text-warning">85%</span>
        </div>
        <div data-coral-progress data-value="85" data-variant="warning">
          <div data-coral-progress-bar />
        </div>
      </div>
    </div>
  )
}

function SkeletonPreview() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex items-center gap-4">
        <div data-coral-skeleton data-variant="circular" style={{ width: 48, height: 48 }} />
        <div className="flex-1 space-y-2">
          <div data-coral-skeleton data-variant="text" style={{ width: '75%' }} />
          <div data-coral-skeleton data-variant="text" style={{ width: '50%' }} />
        </div>
      </div>
      <div className="space-y-2">
        <div data-coral-skeleton data-variant="text" />
        <div data-coral-skeleton data-variant="text" style={{ width: '83%' }} />
        <div data-coral-skeleton data-variant="text" style={{ width: '66%' }} />
      </div>
      <div data-coral-skeleton data-variant="rectangular" style={{ height: 128 }} />
    </div>
  )
}

function StatPreview() {
  const stats = [
    { label: 'Total Revenue', value: '$45,231', change: '+20.1%', trend: 'up' as const },
    { label: 'Active Users', value: '2,350', change: '+15.3%', trend: 'up' as const },
    { label: 'Bounce Rate', value: '24.5%', change: '-4.2%', trend: 'down' as const },
  ]
  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-2xl">
      {stats.map((stat) => (
        <div key={stat.label} data-coral-stat>
          <div data-coral-stat-label>{stat.label}</div>
          <div data-coral-stat-value>{stat.value}</div>
          <div data-coral-stat-change data-trend={stat.trend}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={stat.trend === 'up' ? 'M5 10l7-7m0 0l7 7m-7-7v18' : 'M19 14l-7 7m0 0l-7-7m7 7V3'}
              />
            </svg>
            {stat.change}
          </div>
        </div>
      ))}
    </div>
  )
}

function ListPreview() {
  const items = [
    { title: 'Inbox', description: '24 unread messages', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { title: 'Drafts', description: '5 saved drafts', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
    { title: 'Sent', description: 'View sent messages', icon: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8' },
  ]
  return (
    <ul data-coral-list data-variant="divided" className="w-full max-w-sm">
      {items.map((item) => (
        <li key={item.title} data-coral-list-item data-interactive>
          <div data-coral-list-icon>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
          </div>
          <div data-coral-list-content>
            <span data-coral-list-title>{item.title}</span>
            <span data-coral-list-description>{item.description}</span>
          </div>
          <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </li>
      ))}
    </ul>
  )
}

const dataDisplayComponents = [
  {
    id: 'card',
    name: 'Card',
    description: 'A flexible container component for displaying content.',
    usage: `<div data-coral-card>
  <div data-coral-card-image></div>
  <div data-coral-card-content>
    <h3 data-coral-card-title>Title</h3>
    <p data-coral-card-description>Description</p>
  </div>
  <div data-coral-card-footer>
    <button data-coral-button>Action</button>
  </div>
</div>`,
    props: [
      { name: 'data-variant', type: '"default" | "bordered" | "elevated"', default: '"default"', description: 'Card style variant' },
      { name: 'data-interactive', type: 'boolean', default: 'false', description: 'Enable hover effects' },
    ],
    preview: CardPreview,
  },
  {
    id: 'avatar',
    name: 'Avatar',
    description: 'A circular image component for user profiles.',
    usage: `<div data-coral-avatar data-size="md">
  <span data-coral-avatar-fallback>JD</span>
</div>`,
    props: [
      { name: 'data-size', type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: 'Avatar size' },
      { name: 'data-status', type: '"online" | "offline" | "busy" | "away"', default: 'undefined', description: 'Status indicator' },
    ],
    preview: AvatarPreview,
  },
  {
    id: 'badge',
    name: 'Badge',
    description: 'A small label for status, count, or category.',
    usage: `<span data-coral-badge>Default</span>
<span data-coral-badge data-variant="success">Success</span>
<span data-coral-badge data-variant="warning">Warning</span>`,
    props: [
      { name: 'data-variant', type: '"default" | "success" | "warning" | "error" | "info"', default: '"default"', description: 'Badge color variant' },
      { name: 'data-outline', type: 'boolean', default: 'false', description: 'Outline style' },
    ],
    preview: BadgePreview,
  },
  {
    id: 'table',
    name: 'Table',
    description: 'A data table with sorting and selection support.',
    usage: `<table data-coral-table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Doe</td>
      <td>john@example.com</td>
    </tr>
  </tbody>
</table>`,
    props: [
      { name: 'data-striped', type: 'boolean', default: 'false', description: 'Alternating row colors' },
      { name: 'data-bordered', type: 'boolean', default: 'true', description: 'Show cell borders' },
    ],
    preview: TablePreview,
  },
  {
    id: 'accordion',
    name: 'Accordion',
    description: 'A collapsible section for organizing content.',
    usage: `<div data-coral-accordion>
  <div data-coral-accordion-item data-open>
    <button data-coral-accordion-trigger>Section 1</button>
    <div data-coral-accordion-content>Content 1</div>
  </div>
</div>`,
    props: [
      { name: 'data-type', type: '"single" | "multiple"', default: '"single"', description: 'Allow one or multiple open' },
    ],
    preview: AccordionPreview,
  },
  {
    id: 'timeline',
    name: 'Timeline',
    description: 'A vertical timeline for displaying events in sequence.',
    usage: `<div data-coral-timeline>
  <div data-coral-timeline-item>
    <div data-coral-timeline-marker data-completed></div>
    <div data-coral-timeline-content>
      <h4>Event Title</h4>
      <time>Jan 15, 2024</time>
    </div>
  </div>
</div>`,
    props: [
      { name: 'data-position', type: '"left" | "right" | "alternate"', default: '"left"', description: 'Content position' },
    ],
    preview: TimelinePreview,
  },
  {
    id: 'progress',
    name: 'Progress',
    description: 'A progress bar for showing completion status.',
    usage: `<div data-coral-progress data-value="60">
  <div data-coral-progress-bar></div>
</div>`,
    props: [
      { name: 'data-value', type: 'number', default: '0', description: 'Progress value (0-100)' },
      { name: 'data-variant', type: '"default" | "success" | "warning" | "error"', default: '"default"', description: 'Color variant' },
    ],
    preview: ProgressPreview,
  },
  {
    id: 'skeleton',
    name: 'Skeleton',
    description: 'A placeholder for loading content.',
    usage: `<div data-coral-skeleton data-variant="text"></div>
<div data-coral-skeleton data-variant="circular"></div>
<div data-coral-skeleton data-variant="rectangular"></div>`,
    props: [
      { name: 'data-variant', type: '"text" | "circular" | "rectangular"', default: '"text"', description: 'Skeleton shape' },
    ],
    preview: SkeletonPreview,
  },
  {
    id: 'stat',
    name: 'Stat',
    description: 'A component for displaying key metrics and statistics.',
    usage: `<div data-coral-stat>
  <div data-coral-stat-label>Total Users</div>
  <div data-coral-stat-value>12,345</div>
  <div data-coral-stat-change data-trend="up">+12.5%</div>
</div>`,
    props: [
      { name: 'data-trend', type: '"up" | "down" | "neutral"', default: 'undefined', description: 'Change direction' },
    ],
    preview: StatPreview,
  },
  {
    id: 'list',
    name: 'List',
    description: 'A flexible list component with various layouts.',
    usage: `<ul data-coral-list>
  <li data-coral-list-item>
    <div data-coral-list-content>
      <span data-coral-list-title>Title</span>
      <span data-coral-list-description>Description</span>
    </div>
  </li>
</ul>`,
    props: [
      { name: 'data-variant', type: '"default" | "bordered" | "divided"', default: '"default"', description: 'List style' },
    ],
    preview: ListPreview,
  },
]

function DataDisplayPage() {
  return (
    <ComponentPageLayout
      categoryName="Data Display"
      categoryId="data-display"
      components={dataDisplayComponents}
      accessibilityFeatures={[
        'Screen reader support',
        'ARIA labels',
        'Proper semantics',
        'Color contrast',
      ]}
    />
  )
}

export default DataDisplayPage
