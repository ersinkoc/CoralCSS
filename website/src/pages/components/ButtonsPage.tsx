import { useState } from 'react'
import { ComponentPageLayout } from './ComponentPageLayout'

// Button component data with detailed documentation
const buttonComponents = [
  {
    id: 'button',
    name: 'Button',
    description: 'A versatile button component with multiple variants, sizes, and states.',
    usage: `<button data-coral-button>Default</button>
<button data-coral-button data-variant="primary">Primary</button>
<button data-coral-button data-variant="secondary">Secondary</button>
<button data-coral-button data-variant="outline">Outline</button>
<button data-coral-button data-variant="ghost">Ghost</button>
<button data-coral-button data-variant="destructive">Destructive</button>`,
    props: [
      { name: 'data-variant', type: '"default" | "primary" | "secondary" | "outline" | "ghost" | "destructive"', default: '"default"', description: 'Visual style variant' },
      { name: 'data-size', type: '"sm" | "md" | "lg" | "xl"', default: '"md"', description: 'Button size' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the button' },
      { name: 'data-loading', type: 'boolean', default: 'false', description: 'Show loading spinner' },
    ],
    preview: ButtonPreview,
  },
  {
    id: 'icon-button',
    name: 'IconButton',
    description: 'A button designed for icons with equal width and height.',
    usage: `<button data-coral-icon-button aria-label="Menu">
  <svg><!-- icon --></svg>
</button>

<button data-coral-icon-button data-size="lg" aria-label="Settings">
  <svg><!-- icon --></svg>
</button>`,
    props: [
      { name: 'data-variant', type: '"default" | "primary" | "ghost" | "outline"', default: '"default"', description: 'Visual style variant' },
      { name: 'data-size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Button size' },
      { name: 'aria-label', type: 'string', default: 'required', description: 'Accessible label for screen readers' },
    ],
    preview: IconButtonPreview,
  },
  {
    id: 'button-group',
    name: 'ButtonGroup',
    description: 'Group related buttons together with connected styling.',
    usage: `<div data-coral-button-group>
  <button data-coral-button>Left</button>
  <button data-coral-button>Center</button>
  <button data-coral-button>Right</button>
</div>

<div data-coral-button-group data-orientation="vertical">
  <button data-coral-button>Top</button>
  <button data-coral-button>Bottom</button>
</div>`,
    props: [
      { name: 'data-orientation', type: '"horizontal" | "vertical"', default: '"horizontal"', description: 'Group direction' },
      { name: 'data-attached', type: 'boolean', default: 'true', description: 'Remove gaps between buttons' },
    ],
    preview: ButtonGroupPreview,
  },
  {
    id: 'toggle-button',
    name: 'ToggleButton',
    description: 'A button that can be toggled on and off.',
    usage: `<button data-coral-toggle aria-pressed="false">
  Bold
</button>

<button data-coral-toggle aria-pressed="true">
  <svg><!-- icon --></svg>
  Italic
</button>`,
    props: [
      { name: 'aria-pressed', type: 'boolean', default: 'false', description: 'Whether the button is pressed' },
      { name: 'data-variant', type: '"default" | "outline"', default: '"default"', description: 'Visual style variant' },
    ],
    preview: ToggleButtonPreview,
  },
  {
    id: 'copy-button',
    name: 'CopyButton',
    description: 'A button that copies text to clipboard with visual feedback.',
    usage: `<button data-coral-button data-variant="outline">
  <svg><!-- copy icon --></svg>
  Copy
</button>`,
    props: [
      { name: 'data-value', type: 'string', default: 'required', description: 'Text to copy to clipboard' },
      { name: 'data-success-duration', type: 'number', default: '2000', description: 'How long to show success state (ms)' },
    ],
    preview: CopyButtonPreview,
  },
  {
    id: 'split-button',
    name: 'SplitButton',
    description: 'A button with a dropdown for additional actions.',
    usage: `<div data-coral-split-button>
  <button data-coral-split-button-main>
    Save
  </button>
  <button data-coral-split-button-trigger aria-label="More options">
    <svg><!-- chevron icon --></svg>
  </button>
  <div data-coral-split-button-menu>
    <button data-coral-split-button-item>Save as Draft</button>
    <button data-coral-split-button-item>Save & Publish</button>
  </div>
</div>`,
    props: [
      { name: 'data-variant', type: '"primary" | "secondary" | "outline"', default: '"primary"', description: 'Visual style variant' },
      { name: 'data-size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Button size' },
    ],
    preview: SplitButtonPreview,
  },
  {
    id: 'floating-button',
    name: 'FloatingButton',
    description: 'A floating action button (FAB) for primary actions.',
    usage: `<button data-coral-fab data-position="bottom-right">
  <svg><!-- plus icon --></svg>
</button>

<button data-coral-fab data-size="lg" data-extended>
  <svg><!-- icon --></svg>
  <span>New Item</span>
</button>`,
    props: [
      { name: 'data-position', type: '"bottom-right" | "bottom-left" | "top-right" | "top-left"', default: '"bottom-right"', description: 'Fixed position on screen' },
      { name: 'data-size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Button size' },
      { name: 'data-extended', type: 'boolean', default: 'false', description: 'Show text label' },
    ],
    preview: FloatingButtonPreview,
  },
  {
    id: 'like-button',
    name: 'LikeButton',
    description: 'An animated like/heart button with counter.',
    usage: `<button data-coral-like-button>
  <svg data-coral-like-icon><!-- heart icon --></svg>
  <span data-coral-like-count>42</span>
</button>`,
    props: [
      { name: 'data-liked', type: 'boolean', default: 'false', description: 'Whether the item is liked' },
      { name: 'data-animate', type: 'boolean', default: 'true', description: 'Enable animation on click' },
    ],
    preview: LikeButtonPreview,
  },
  {
    id: 'share-button',
    name: 'ShareButton',
    description: 'A button for sharing content via native share API or custom menu.',
    usage: `<button data-coral-button data-variant="outline"
  data-title="Check this out"
  data-url="https://example.com">
  Share
</button>`,
    props: [
      { name: 'data-title', type: 'string', default: '""', description: 'Share title' },
      { name: 'data-text', type: 'string', default: '""', description: 'Share text/description' },
      { name: 'data-url', type: 'string', default: 'current URL', description: 'URL to share' },
    ],
    preview: ShareButtonPreview,
  },
]

function ButtonsPage() {
  return (
    <ComponentPageLayout
      categoryName="Buttons"
      categoryId="buttons"
      components={buttonComponents}
      accessibilityFeatures={[
        'Full keyboard support',
        'Focus visible states',
        'Screen reader announced',
        'ARIA roles & states',
        'Touch-friendly targets',
        'Disabled state handling',
      ]}
    />
  )
}

// Preview Components with data-coral-* attributes
function ButtonPreview() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button data-coral-button data-variant="primary">Primary</button>
      <button data-coral-button data-variant="secondary">Secondary</button>
      <button data-coral-button data-variant="outline">Outline</button>
      <button data-coral-button data-variant="ghost">Ghost</button>
      <button data-coral-button data-variant="destructive">Destructive</button>
      <button data-coral-button data-variant="primary" disabled>Disabled</button>
    </div>
  )
}

function IconButtonPreview() {
  return (
    <div className="flex items-center gap-4">
      <button data-coral-icon-button data-variant="primary" aria-label="Menu">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <button data-coral-icon-button data-variant="outline" aria-label="Search">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
      <button data-coral-icon-button data-variant="ghost" aria-label="Settings">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
      <button data-coral-icon-button data-variant="destructive" data-size="lg" aria-label="Delete">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  )
}

function ButtonGroupPreview() {
  const [active, setActive] = useState(0)
  return (
    <div className="space-y-6">
      <div data-coral-button-group>
        {['Left', 'Center', 'Right'].map((label, i) => (
          <button
            key={label}
            onClick={() => setActive(i)}
            data-coral-button
            data-variant={i === active ? 'primary' : 'outline'}
          >
            {label}
          </button>
        ))}
      </div>
      <div data-coral-button-group data-orientation="vertical">
        {['Top', 'Middle', 'Bottom'].map((label) => (
          <button key={label} data-coral-button data-variant="outline">
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

function ToggleButtonPreview() {
  const [bold, setBold] = useState(false)
  const [italic, setItalic] = useState(true)
  const [underline, setUnderline] = useState(false)
  return (
    <div data-coral-button-group>
      <button
        onClick={() => setBold(!bold)}
        data-coral-toggle
        data-pressed={bold || undefined}
        aria-pressed={bold}
      >
        <strong>B</strong>
      </button>
      <button
        onClick={() => setItalic(!italic)}
        data-coral-toggle
        data-pressed={italic || undefined}
        aria-pressed={italic}
      >
        <em>I</em>
      </button>
      <button
        onClick={() => setUnderline(!underline)}
        data-coral-toggle
        data-pressed={underline || undefined}
        aria-pressed={underline}
      >
        <span style={{ textDecoration: 'underline' }}>U</span>
      </button>
    </div>
  )
}

function CopyButtonPreview() {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard?.writeText('npm install @coral-css/core')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={handleCopy}
      data-coral-button
      data-variant="outline"
      data-copied={copied || undefined}
    >
      {copied ? (
        <>
          <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-success">Copied!</span>
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span>Copy Code</span>
        </>
      )}
    </button>
  )
}

function SplitButtonPreview() {
  const [open, setOpen] = useState(false)
  return (
    <div data-coral-dropdown className="relative inline-flex">
      <div data-coral-button-group>
        <button data-coral-button data-variant="primary">Save</button>
        <button
          onClick={() => setOpen(!open)}
          data-coral-button
          data-variant="primary"
          aria-label="More options"
          style={{ borderLeft: '1px solid rgba(255,255,255,0.2)' }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      {open && (
        <div data-coral-dropdown-content data-open className="absolute top-full left-0 mt-1">
          <button data-coral-dropdown-item onClick={() => setOpen(false)}>Save as Draft</button>
          <button data-coral-dropdown-item onClick={() => setOpen(false)}>Save & Publish</button>
          <div data-coral-dropdown-separator />
          <button data-coral-dropdown-item onClick={() => setOpen(false)}>Save & Export</button>
        </div>
      )}
    </div>
  )
}

function FloatingButtonPreview() {
  return (
    <div className="relative w-64 h-32 bg-muted/30 rounded-xl border-2 border-dashed border-border">
      <button
        data-coral-fab
        className="absolute bottom-4 right-4"
        aria-label="Add new item"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  )
}

function LikeButtonPreview() {
  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState(42)
  return (
    <button
      onClick={() => {
        setLiked(!liked)
        setCount(liked ? count - 1 : count + 1)
      }}
      data-coral-like-button
      data-liked={liked || undefined}
    >
      <svg
        className={`w-5 h-5 transition-transform ${liked ? 'scale-110' : ''}`}
        fill={liked ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      <span className="font-medium">{count}</span>
    </button>
  )
}

function ShareButtonPreview() {
  const [shared, setShared] = useState(false)
  return (
    <button
      onClick={() => {
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      }}
      data-coral-button
      data-variant="outline"
    >
      {shared ? (
        <>
          <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-success">Shared!</span>
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <span>Share</span>
        </>
      )}
    </button>
  )
}

export default ButtonsPage
