import { useState } from 'react'
import { ComponentPageLayout } from './ComponentPageLayout'

// Preview Components with data-coral-* attributes
function DialogPreview() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        data-coral-button
        data-variant="primary"
      >
        Open Dialog
      </button>
      {isOpen && (
        <div data-coral-dialog-backdrop data-open onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}>
          <div data-coral-dialog-content role="dialog" aria-modal="true">
            <h2 data-coral-dialog-title>Dialog Title</h2>
            <p data-coral-dialog-description>
              This is a dialog description. You can put any content here.
            </p>
            <div data-coral-dialog-footer>
              <button
                onClick={() => setIsOpen(false)}
                data-coral-button
                data-variant="outline"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsOpen(false)}
                data-coral-button
                data-variant="primary"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function DrawerPreview() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        data-coral-button
        data-variant="primary"
      >
        Open Drawer
      </button>
      {isOpen && (
        <div data-coral-drawer-backdrop data-open onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}>
          <div data-coral-drawer-content data-position="right" data-open>
            <div data-coral-drawer-header>
              <h2 data-coral-drawer-title>Drawer</h2>
              <button onClick={() => setIsOpen(false)} data-coral-icon-button data-variant="ghost" aria-label="Close">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div data-coral-drawer-body>
              <p className="text-muted-foreground">
                Drawer content goes here. Use it for navigation, forms, or additional options.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function PopoverPreview() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div data-coral-popover className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        data-coral-button
        data-variant="primary"
      >
        Toggle Popover
      </button>
      {isOpen && (
        <div data-coral-popover-content data-side="bottom" data-open>
          <h3 className="font-medium text-foreground mb-2">Popover Title</h3>
          <p className="text-sm text-muted-foreground">
            This is a popover. It can contain any content and automatically positions itself.
          </p>
        </div>
      )}
    </div>
  )
}

function TooltipPreview() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)
  return (
    <div className="flex gap-4">
      {['Top', 'Right', 'Bottom', 'Left'].map((side) => (
        <div key={side} data-coral-tooltip className="relative">
          <button
            onMouseEnter={() => setActiveTooltip(side)}
            onMouseLeave={() => setActiveTooltip(null)}
            data-coral-button
            data-variant="outline"
          >
            {side}
          </button>
          {activeTooltip === side && (
            <div
              data-coral-tooltip-content
              data-side={side.toLowerCase()}
              data-open
            >
              Tooltip on {side.toLowerCase()}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function DropdownPreview() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div data-coral-dropdown className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        data-coral-button
        data-variant="outline"
      >
        Options
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div data-coral-dropdown-content data-open>
          <button data-coral-dropdown-item onClick={() => setIsOpen(false)}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
          <button data-coral-dropdown-item onClick={() => setIsOpen(false)}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Duplicate
          </button>
          <div data-coral-dropdown-separator />
          <button data-coral-dropdown-item data-destructive onClick={() => setIsOpen(false)}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

function ContextMenuPreview() {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setPosition({ x: e.clientX, y: e.clientY })
    setIsOpen(true)
  }

  return (
    <>
      <div
        onContextMenu={handleContextMenu}
        data-coral-card
        data-variant="outline"
        className="w-64 h-32 flex items-center justify-center cursor-context-menu"
        style={{ borderStyle: 'dashed' }}
      >
        <span className="text-muted-foreground">Right-click here</span>
      </div>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div
            data-coral-context-menu-content
            data-open
            style={{ position: 'fixed', left: position.x, top: position.y }}
          >
            <button data-coral-dropdown-item onClick={() => setIsOpen(false)}>Cut</button>
            <button data-coral-dropdown-item onClick={() => setIsOpen(false)}>Copy</button>
            <button data-coral-dropdown-item onClick={() => setIsOpen(false)}>Paste</button>
            <div data-coral-dropdown-separator />
            <button data-coral-dropdown-item data-destructive onClick={() => setIsOpen(false)}>Delete</button>
          </div>
        </>
      )}
    </>
  )
}

function SheetPreview() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        data-coral-button
        data-variant="primary"
      >
        Open Sheet
      </button>
      {isOpen && (
        <div data-coral-sheet-backdrop data-open onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}>
          <div data-coral-sheet-content data-open>
            <div data-coral-sheet-handle />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-2">Sheet Title</h2>
              <p className="text-muted-foreground mb-6">
                This is a mobile-friendly sheet that slides up from the bottom.
              </p>
              <button
                onClick={() => setIsOpen(false)}
                data-coral-button
                data-variant="primary"
                className="w-full"
              >
                Close Sheet
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function LightboxPreview() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="w-32 h-24 bg-gradient-to-br from-primary to-accent rounded-lg cursor-pointer hover:scale-105 transition-transform"
      />
      {isOpen && (
        <div data-coral-lightbox-backdrop data-open onClick={() => setIsOpen(false)}>
          <button data-coral-lightbox-close aria-label="Close">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button data-coral-lightbox-nav data-prev aria-label="Previous">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="w-96 h-64 bg-gradient-to-br from-primary to-accent rounded-lg" onClick={(e) => e.stopPropagation()} />
          <button data-coral-lightbox-nav data-next aria-label="Next">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </>
  )
}

const overlayComponents = [
  {
    id: 'dialog',
    name: 'Dialog',
    description: 'A modal dialog component with backdrop and focus trapping.',
    usage: `<div data-coral-dialog>
  <button data-coral-dialog-trigger>Open Dialog</button>
  <div data-coral-dialog-backdrop>
    <div data-coral-dialog-content role="dialog" aria-modal="true">
      <h2 data-coral-dialog-title>Dialog Title</h2>
      <p data-coral-dialog-description>Dialog content here...</p>
      <button data-coral-dialog-close>Close</button>
    </div>
  </div>
</div>`,
    props: [
      { name: 'data-open', type: 'boolean', default: 'false', description: 'Control open state' },
      { name: 'data-modal', type: 'boolean', default: 'true', description: 'Enable modal behavior' },
      { name: 'data-close-on-escape', type: 'boolean', default: 'true', description: 'Close on Escape key' },
      { name: 'data-close-on-backdrop', type: 'boolean', default: 'true', description: 'Close on backdrop click' },
    ],
    preview: DialogPreview,
  },
  {
    id: 'drawer',
    name: 'Drawer',
    description: 'A sliding panel that emerges from the edge of the screen.',
    usage: `<div data-coral-drawer data-position="right">
  <button data-coral-drawer-trigger>Open Drawer</button>
  <div data-coral-drawer-backdrop>
    <div data-coral-drawer-content>
      <h2>Drawer Content</h2>
      <button data-coral-drawer-close>Close</button>
    </div>
  </div>
</div>`,
    props: [
      { name: 'data-position', type: '"left" | "right" | "top" | "bottom"', default: '"right"', description: 'Slide-in position' },
      { name: 'data-size', type: '"sm" | "md" | "lg" | "full"', default: '"md"', description: 'Drawer width/height' },
    ],
    preview: DrawerPreview,
  },
  {
    id: 'popover',
    name: 'Popover',
    description: 'A floating panel anchored to a trigger element.',
    usage: `<div data-coral-popover>
  <button data-coral-popover-trigger>Open Popover</button>
  <div data-coral-popover-content data-side="bottom">
    <p>Popover content here</p>
  </div>
</div>`,
    props: [
      { name: 'data-side', type: '"top" | "right" | "bottom" | "left"', default: '"bottom"', description: 'Preferred placement' },
      { name: 'data-align', type: '"start" | "center" | "end"', default: '"center"', description: 'Alignment on the side' },
    ],
    preview: PopoverPreview,
  },
  {
    id: 'tooltip',
    name: 'Tooltip',
    description: 'A brief informational popup on hover or focus.',
    usage: `<div data-coral-tooltip>
  <button data-coral-tooltip-trigger>Hover me</button>
  <div data-coral-tooltip-content data-side="top">
    Tooltip text here
  </div>
</div>`,
    props: [
      { name: 'data-side', type: '"top" | "right" | "bottom" | "left"', default: '"top"', description: 'Tooltip position' },
      { name: 'data-delay', type: 'number', default: '200', description: 'Show delay in ms' },
    ],
    preview: TooltipPreview,
  },
  {
    id: 'dropdown',
    name: 'Dropdown',
    description: 'A dropdown menu with keyboard navigation.',
    usage: `<div data-coral-dropdown>
  <button data-coral-dropdown-trigger>
    Options
    <svg><!-- chevron icon --></svg>
  </button>
  <div data-coral-dropdown-content>
    <button data-coral-dropdown-item>Edit</button>
    <button data-coral-dropdown-item>Delete</button>
    <div data-coral-dropdown-separator></div>
    <button data-coral-dropdown-item>Settings</button>
  </div>
</div>`,
    props: [
      { name: 'data-align', type: '"start" | "center" | "end"', default: '"start"', description: 'Menu alignment' },
      { name: 'data-side', type: '"top" | "bottom"', default: '"bottom"', description: 'Open direction' },
    ],
    preview: DropdownPreview,
  },
  {
    id: 'context-menu',
    name: 'ContextMenu',
    description: 'A right-click context menu with nested submenus.',
    usage: `<div data-coral-context-menu>
  <div data-coral-context-menu-trigger>
    Right click this area
  </div>
  <div data-coral-context-menu-content>
    <button data-coral-context-menu-item>Cut</button>
    <button data-coral-context-menu-item>Copy</button>
    <button data-coral-context-menu-item>Paste</button>
  </div>
</div>`,
    props: [
      { name: 'data-disabled', type: 'boolean', default: 'false', description: 'Disable context menu' },
    ],
    preview: ContextMenuPreview,
  },
  {
    id: 'sheet',
    name: 'Sheet',
    description: 'A modal sheet that slides up from the bottom (mobile-friendly).',
    usage: `<div data-coral-sheet>
  <button data-coral-sheet-trigger>Open Sheet</button>
  <div data-coral-sheet-backdrop>
    <div data-coral-sheet-content>
      <div data-coral-sheet-handle></div>
      <h2>Sheet Content</h2>
    </div>
  </div>
</div>`,
    props: [
      { name: 'data-snap-points', type: 'number[]', default: '[0.5, 1]', description: 'Height snap points' },
      { name: 'data-draggable', type: 'boolean', default: 'true', description: 'Enable drag to resize' },
    ],
    preview: SheetPreview,
  },
  {
    id: 'lightbox',
    name: 'Lightbox',
    description: 'A fullscreen image/media viewer with navigation.',
    usage: `<div data-coral-lightbox>
  <img data-coral-lightbox-trigger src="..." alt="..." />
  <div data-coral-lightbox-backdrop>
    <img data-coral-lightbox-content src="..." alt="..." />
    <button data-coral-lightbox-prev>Prev</button>
    <button data-coral-lightbox-next>Next</button>
    <button data-coral-lightbox-close>Close</button>
  </div>
</div>`,
    props: [
      { name: 'data-zoom', type: 'boolean', default: 'true', description: 'Enable zoom on click' },
      { name: 'data-loop', type: 'boolean', default: 'true', description: 'Loop through images' },
    ],
    preview: LightboxPreview,
  },
]

function OverlaysPage() {
  return (
    <ComponentPageLayout
      categoryName="Overlays"
      categoryId="overlays"
      components={overlayComponents}
      accessibilityFeatures={[
        'Focus trapping',
        'ARIA modal support',
        'Escape key close',
        'Backdrop click handling',
      ]}
    />
  )
}

export default OverlaysPage
