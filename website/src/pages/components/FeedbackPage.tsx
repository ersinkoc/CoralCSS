import { useState } from 'react'
import { ComponentPageLayout } from './ComponentPageLayout'

const feedbackComponents = [
  {
    id: 'alert',
    name: 'Alert',
    description: 'A component for displaying important messages and notifications.',
    usage: `<div data-coral-alert data-variant="info">
  <svg data-coral-alert-icon>...</svg>
  <div data-coral-alert-content>
    <h4 data-coral-alert-title>Info</h4>
    <p data-coral-alert-description>This is an informational message.</p>
  </div>
  <button data-coral-alert-close>...</button>
</div>`,
    props: [
      { name: 'data-variant', type: '"info" | "success" | "warning" | "error"', default: '"info"', description: 'Alert type/color' },
      { name: 'data-dismissible', type: 'boolean', default: 'false', description: 'Show close button' },
    ],
    preview: AlertPreview,
  },
  {
    id: 'toast',
    name: 'Toast',
    description: 'A brief notification that appears temporarily.',
    usage: `<div data-coral-toast-container data-position="bottom-right">
  <div data-coral-toast data-variant="success">
    <svg data-coral-toast-icon>...</svg>
    <div data-coral-toast-content>
      <span data-coral-toast-title>Success!</span>
      <span data-coral-toast-description>Your changes have been saved.</span>
    </div>
    <button data-coral-toast-close>...</button>
  </div>
</div>`,
    props: [
      { name: 'data-position', type: '"top-left" | "top-right" | "bottom-left" | "bottom-right"', default: '"bottom-right"', description: 'Toast position' },
      { name: 'data-duration', type: 'number', default: '5000', description: 'Auto-dismiss duration (ms)' },
    ],
    preview: ToastPreview,
  },
  {
    id: 'notification',
    name: 'Notification',
    description: 'A notification component with avatar, title, and actions.',
    usage: `<div data-coral-notification>
  <img data-coral-notification-avatar src="..." />
  <div data-coral-notification-content>
    <span data-coral-notification-title>New message</span>
    <span data-coral-notification-description>John sent you a message.</span>
    <time data-coral-notification-time>2 min ago</time>
  </div>
  <button data-coral-notification-action>View</button>
</div>`,
    props: [
      { name: 'data-read', type: 'boolean', default: 'false', description: 'Mark as read' },
      { name: 'data-interactive', type: 'boolean', default: 'true', description: 'Enable hover effects' },
    ],
    preview: NotificationPreview,
  },
  {
    id: 'banner',
    name: 'Banner',
    description: 'A full-width banner for announcements and promotions.',
    usage: `<div data-coral-banner data-variant="info">
  <p data-coral-banner-content>
    New feature available! Check out our latest update.
  </p>
  <button data-coral-banner-action>Learn More</button>
  <button data-coral-banner-close>...</button>
</div>`,
    props: [
      { name: 'data-variant', type: '"info" | "warning" | "error" | "promo"', default: '"info"', description: 'Banner style' },
      { name: 'data-sticky', type: 'boolean', default: 'false', description: 'Stick to top of page' },
    ],
    preview: BannerPreview,
  },
  {
    id: 'spinner',
    name: 'Spinner',
    description: 'A loading spinner for indicating progress.',
    usage: `<div data-coral-spinner></div>
<div data-coral-spinner data-size="lg"></div>
<div data-coral-spinner data-variant="dots"></div>`,
    props: [
      { name: 'data-size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Spinner size' },
      { name: 'data-variant', type: '"default" | "dots" | "bars" | "ring"', default: '"default"', description: 'Spinner style' },
    ],
    preview: SpinnerPreview,
  },
  {
    id: 'progress-ring',
    name: 'ProgressRing',
    description: 'A circular progress indicator.',
    usage: `<div data-coral-progress-ring data-value="75">
  <svg>
    <circle data-coral-progress-ring-track />
    <circle data-coral-progress-ring-progress />
  </svg>
  <span data-coral-progress-ring-label>75%</span>
</div>`,
    props: [
      { name: 'data-value', type: 'number', default: '0', description: 'Progress value (0-100)' },
      { name: 'data-size', type: 'number', default: '64', description: 'Ring diameter in pixels' },
      { name: 'data-stroke-width', type: 'number', default: '4', description: 'Ring thickness' },
    ],
    preview: ProgressRingPreview,
  },
  {
    id: 'empty-state',
    name: 'EmptyState',
    description: 'A placeholder for empty content states.',
    usage: `<div data-coral-empty-state>
  <svg data-coral-empty-state-icon>...</svg>
  <h3 data-coral-empty-state-title>No results found</h3>
  <p data-coral-empty-state-description>
    Try adjusting your search or filters.
  </p>
  <button data-coral-empty-state-action>Clear Filters</button>
</div>`,
    props: [
      { name: 'data-variant', type: '"default" | "compact"', default: '"default"', description: 'Layout variant' },
    ],
    preview: EmptyStatePreview,
  },
  {
    id: 'status-indicator',
    name: 'StatusIndicator',
    description: 'A small indicator dot for showing status.',
    usage: `<span data-coral-status data-status="online">Online</span>
<span data-coral-status data-status="offline">Offline</span>
<span data-coral-status data-status="busy">Busy</span>
<span data-coral-status data-status="away">Away</span>`,
    props: [
      { name: 'data-status', type: '"online" | "offline" | "busy" | "away"', default: '"offline"', description: 'Status type' },
      { name: 'data-pulse', type: 'boolean', default: 'false', description: 'Enable pulse animation' },
    ],
    preview: StatusIndicatorPreview,
  },
]

function FeedbackPage() {
  return (
    <ComponentPageLayout
      categoryName="Feedback"
      categoryId="feedback"
      components={feedbackComponents}
      accessibilityFeatures={[
        'ARIA live regions',
        'Role announcements',
        'Keyboard dismissible',
        'Color + icon status',
        'Focus management',
        'Screen reader support',
      ]}
    />
  )
}

// Preview Components with data-coral-* attributes
function AlertPreview() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div data-coral-alert data-variant="info">
        <svg data-coral-alert-icon className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div data-coral-alert-content>
          <h4 data-coral-alert-title>Information</h4>
          <p data-coral-alert-description>This is an informational alert message.</p>
        </div>
      </div>
      <div data-coral-alert data-variant="success">
        <svg data-coral-alert-icon className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <div data-coral-alert-content>
          <h4 data-coral-alert-title>Success</h4>
          <p data-coral-alert-description>Your changes have been saved successfully.</p>
        </div>
      </div>
      <div data-coral-alert data-variant="error">
        <svg data-coral-alert-icon className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div data-coral-alert-content>
          <h4 data-coral-alert-title>Error</h4>
          <p data-coral-alert-description>Something went wrong. Please try again.</p>
        </div>
      </div>
    </div>
  )
}

function ToastPreview() {
  const [toasts, setToasts] = useState<string[]>([])

  const addToast = (type: string) => {
    const id = Date.now().toString()
    setToasts([...toasts, type + '-' + id])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t !== type + '-' + id))
    }, 3000)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <button onClick={() => addToast('success')} data-coral-button data-variant="primary">
          Success Toast
        </button>
        <button onClick={() => addToast('error')} data-coral-button data-variant="destructive">
          Error Toast
        </button>
      </div>
      <div data-coral-toast-container data-position="bottom-right">
        {toasts.map((toast) => (
          <div key={toast} data-coral-toast data-variant={toast.startsWith('success') ? 'success' : 'error'} data-open>
            <svg data-coral-toast-icon className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {toast.startsWith('success') ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              )}
            </svg>
            <div data-coral-toast-content>
              <span data-coral-toast-title>{toast.startsWith('success') ? 'Success!' : 'Error!'}</span>
              <span data-coral-toast-description>
                {toast.startsWith('success') ? 'Changes saved.' : 'Something went wrong.'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function NotificationPreview() {
  return (
    <div className="w-full max-w-sm space-y-2">
      {[
        { name: 'John Doe', message: 'Sent you a message', time: '2 min ago', unread: true },
        { name: 'Jane Smith', message: 'Liked your post', time: '1 hour ago', unread: true },
        { name: 'Bob Wilson', message: 'Commented on your photo', time: '3 hours ago', unread: false },
      ].map((notification, i) => (
        <div key={i} data-coral-notification data-unread={notification.unread || undefined}>
          <div data-coral-avatar data-size="md">
            {notification.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div data-coral-notification-content>
            <div className="flex items-center gap-2">
              <span data-coral-notification-title>{notification.name}</span>
              {notification.unread && <span data-coral-notification-badge />}
            </div>
            <p data-coral-notification-description>{notification.message}</p>
            <time data-coral-notification-time>{notification.time}</time>
          </div>
        </div>
      ))}
    </div>
  )
}

function BannerPreview() {
  const [visible, setVisible] = useState(true)
  return visible ? (
    <div data-coral-banner data-variant="info" className="w-full max-w-2xl">
      <svg data-coral-banner-icon className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
      <p data-coral-banner-content>
        New feature! Check out our latest update with improved performance.
      </p>
      <button data-coral-button data-variant="primary" data-size="sm">Learn More</button>
      <button onClick={() => setVisible(false)} data-coral-icon-button data-variant="ghost" aria-label="Dismiss">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  ) : (
    <button onClick={() => setVisible(true)} data-coral-button data-variant="outline">
      Show Banner
    </button>
  )
}

function SpinnerPreview() {
  return (
    <div className="flex items-center gap-8">
      <div data-coral-spinner data-size="sm" />
      <div data-coral-spinner data-size="md" />
      <div data-coral-spinner data-size="lg" />
      <div data-coral-spinner data-variant="dots" />
    </div>
  )
}

function ProgressRingPreview() {
  const [value, setValue] = useState(75)
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="flex items-center gap-8">
      <div data-coral-progress-ring style={{ width: 96, height: 96 }}>
        <svg className="w-24 h-24 transform -rotate-90">
          <circle data-coral-progress-ring-track cx="48" cy="48" r={radius} strokeWidth="8" fill="none" />
          <circle
            data-coral-progress-ring-progress
            cx="48"
            cy="48"
            r={radius}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.3s' }}
          />
        </svg>
        <span data-coral-progress-ring-label>{value}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
        data-coral-slider
      />
    </div>
  )
}

function EmptyStatePreview() {
  return (
    <div data-coral-empty-state className="w-full max-w-sm">
      <div data-coral-empty-state-icon>
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 data-coral-empty-state-title>No results found</h3>
      <p data-coral-empty-state-description>
        We couldn't find any items matching your search. Try adjusting your filters.
      </p>
      <button data-coral-button data-variant="primary">Clear Filters</button>
    </div>
  )
}

function StatusIndicatorPreview() {
  return (
    <div className="flex flex-wrap gap-6">
      {[
        { status: 'online', label: 'Online' },
        { status: 'away', label: 'Away' },
        { status: 'busy', label: 'Busy' },
        { status: 'offline', label: 'Offline' },
      ].map((item) => (
        <span key={item.status} data-coral-status data-status={item.status}>
          {item.label}
        </span>
      ))}
    </div>
  )
}

export default FeedbackPage
