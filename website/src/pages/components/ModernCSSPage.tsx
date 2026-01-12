import { useState } from 'react'
import { ComponentPageLayout } from './ComponentPageLayout'

// Preview Components
function ContainerQueryPreview() {
  return (
    <div className="w-full max-w-lg">
      <div className="p-4 bg-card border border-border rounded-xl" style={{ containerType: 'inline-size' }}>
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
          <div className="p-4 bg-primary/10 rounded-lg">
            <h4 className="font-medium text-foreground">Card 1</h4>
            <p className="text-sm text-muted-foreground">Responsive to container</p>
          </div>
          <div className="p-4 bg-primary/10 rounded-lg">
            <h4 className="font-medium text-foreground">Card 2</h4>
            <p className="text-sm text-muted-foreground">Not viewport</p>
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-3 text-center">
        Resize the container to see cards adapt
      </p>
    </div>
  )
}

function ScrollTimelinePreview() {
  return (
    <div className="w-full max-w-sm mx-auto h-40 bg-card border border-border rounded-xl overflow-auto">
      <div className="p-4 space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="p-4 bg-gradient-to-r from-primary to-accent rounded-lg text-white"
            style={{
              opacity: 0.3 + (i * 0.14),
              transform: `translateX(${(i - 1) * 10}px)`,
            }}
          >
            Item {i}
          </div>
        ))}
      </div>
      <p className="sticky bottom-0 p-2 bg-card text-xs text-muted-foreground text-center">
        Scroll to animate
      </p>
    </div>
  )
}

function ViewTransitionPreview() {
  const [view, setView] = useState(1)
  return (
    <div className="w-full max-w-sm">
      <div className="aspect-video mb-4 rounded-lg overflow-hidden relative">
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            view === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xl font-bold">
            View 1
          </div>
        </div>
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            view === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="w-full h-full bg-gradient-to-br from-info to-success flex items-center justify-center text-white text-xl font-bold">
            View 2
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setView(1)}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            view === 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'
          }`}
        >
          View 1
        </button>
        <button
          onClick={() => setView(2)}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            view === 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'
          }`}
        >
          View 2
        </button>
      </div>
    </div>
  )
}

function AnchorPositionPreview() {
  const [show, setShow] = useState(false)
  return (
    <div className="relative">
      <button
        onClick={() => setShow(!show)}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium"
      >
        Anchor Element
      </button>
      {show && (
        <div className="absolute top-full left-0 mt-2 p-4 bg-card border border-border rounded-lg shadow-lg z-10 w-48">
          <p className="text-sm text-muted-foreground">
            This element is anchored to the button above using CSS anchor positioning.
          </p>
        </div>
      )}
    </div>
  )
}

function SubGridPreview() {
  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-md">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className={`p-4 rounded-lg text-center ${
            i % 2 === 0 ? 'bg-primary/10 text-primary' : 'bg-info/10 text-info'
          }`}
        >
          <span className="text-sm font-medium">Cell {i}</span>
        </div>
      ))}
    </div>
  )
}

function HasSelectorPreview() {
  const [checked, setChecked] = useState(false)
  return (
    <label
      className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
        checked ? 'border-primary bg-primary/5' : 'border-border'
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        className="w-5 h-5 accent-primary"
      />
      <span className={`font-medium transition-colors ${checked ? 'text-primary' : 'text-foreground'}`}>
        Parent styles change when checkbox is checked
      </span>
    </label>
  )
}

function TextWrapPreview() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div>
        <span className="text-xs text-muted-foreground mb-1 block">text-wrap: balance</span>
        <h3 className="text-lg font-semibold text-foreground" style={{ textWrap: 'balance' as never }}>
          This is a balanced heading that distributes text evenly across lines
        </h3>
      </div>
      <div>
        <span className="text-xs text-muted-foreground mb-1 block">text-wrap: pretty</span>
        <p className="text-muted-foreground" style={{ textWrap: 'pretty' as never }}>
          This paragraph uses pretty text wrapping which avoids orphans and widows for better readability.
        </p>
      </div>
    </div>
  )
}

function LightDarkPreview() {
  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
      <div className="p-4 bg-card text-foreground rounded-lg border border-border">
        <span className="text-sm font-medium">Light Mode</span>
        <p className="text-xs text-muted-foreground">Adapts to light scheme</p>
      </div>
      <div className="p-4 bg-muted text-foreground rounded-lg border border-border">
        <span className="text-sm font-medium">Dark Mode</span>
        <p className="text-xs text-muted-foreground">Adapts to dark scheme</p>
      </div>
    </div>
  )
}

function PopoverAPIPreview() {
  const [show, setShow] = useState(false)
  return (
    <div className="relative">
      <button
        onClick={() => setShow(!show)}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium"
      >
        Toggle Popover
      </button>
      {show && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 p-4 bg-card border border-border rounded-lg shadow-lg z-10 w-64">
          <h4 className="font-medium text-foreground mb-2">Native Popover</h4>
          <p className="text-sm text-muted-foreground mb-3">
            This uses the native Popover API with automatic light-dismiss.
          </p>
          <button
            onClick={() => setShow(false)}
            className="text-sm text-primary hover:underline"
          >
            Close
          </button>
        </div>
      )}
    </div>
  )
}

function ColorMixPreview() {
  return (
    <div className="space-y-4 w-full max-w-sm">
      <div className="flex gap-2 items-center">
        <div className="w-12 h-12 bg-destructive rounded-lg" />
        <span className="text-muted-foreground">+</span>
        <div className="w-12 h-12 bg-info rounded-lg" />
        <span className="text-muted-foreground">=</span>
        <div className="w-12 h-12 bg-primary rounded-lg" />
      </div>
      <div className="flex gap-2">
        {[10, 25, 50, 75, 90].map((mix) => (
          <div
            key={mix}
            className="flex-1 h-12 rounded-lg flex items-center justify-center text-xs font-medium text-white"
            style={{
              backgroundColor: `color-mix(in srgb, hsl(var(--destructive)), hsl(var(--info)) ${mix}%)`,
            }}
          >
            {mix}%
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center">
        color-mix() interpolates between colors in various color spaces
      </p>
    </div>
  )
}

function WideGamutColorsPreview() {
  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
      {[
        { name: 'P3', color: 'color(display-p3 1 0 0)' },
        { name: 'REC.2020', color: 'color(rec2020 1 0 0)' },
        { name: 'OKLCH', color: 'oklch(0.7 0.15 0)' },
        { name: 'OKLAB', color: 'oklab(0.8 0.1 0)' },
        { name: 'LCH', color: 'lch(70 50 0)' },
        { name: 'LAB', color: 'lab(70 50 0)' },
      ].map((color, i) => (
        <div
          key={i}
          className="aspect-square rounded-lg flex items-end p-2 text-xs font-medium text-white"
          style={{ backgroundColor: color.color }}
        >
          {color.name}
        </div>
      ))}
    </div>
  )
}

function EntryAnimationsPreview() {
  const [items, setItems] = useState([
    { id: 1, text: 'Fade in' },
    { id: 2, text: 'Slide up' },
    { id: 3, text: 'Scale in' },
  ])

  return (
    <div className="w-full max-w-sm">
      <div className="space-y-3">
        {items.map((item, i) => (
          <div
            key={item.id}
            className="p-4 bg-card border border-border rounded-lg transition-all hover:scale-[1.02]"
            style={{
              animation: `slideIn 300ms ease-out ${i * 100}ms both`,
            }}
          >
            <span className="font-medium text-foreground">{item.text}</span>
          </div>
        ))}
      </div>
      <button
        onClick={() => setItems([...items, { id: items.length + 1, text: 'New item' }])}
        className="mt-4 w-full py-2 bg-primary text-primary-foreground rounded-lg text-sm"
      >
        Add Item
      </button>
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  )
}

function FieldSizingPreview() {
  return (
    <div className="space-y-4 w-full max-w-sm">
      <div>
        <label className="text-xs text-muted-foreground mb-1 block">field-sizing: content (auto)</label>
        <input
          type="text"
          value="Hello"
          className="px-3 py-2 bg-background border border-border rounded-lg"
          style={{ fieldSizing: 'content' as any }}
        />
      </div>
      <div>
        <label className="text-xs text-muted-foreground mb-1 block">field-sizing: fixed</label>
        <input
          type="text"
          defaultValue="Fixed width input"
          className="px-3 py-2 bg-background border border-border rounded-lg w-full"
          style={{ fieldSizing: 'fixed' as any }}
        />
      </div>
    </div>
  )
}

function AdvancedSelectorsPreview() {
  return (
    <div className="space-y-3 w-full max-w-sm">
      <div className="p-3 bg-card border border-border rounded-lg">
        <p className="text-sm text-muted-foreground">
          Uses :is(), :where(), and :has() for advanced selection
        </p>
      </div>
      <div className="p-3 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          :is() - Matches any of the selectors
        </p>
      </div>
      <div className="p-3 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          :where() - Zero-specificity selector
        </p>
      </div>
      <div className="p-3 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          :has() - Parent state selector
        </p>
      </div>
    </div>
  )
}

function CSSNestedPreview() {
  return (
    <div className="w-full max-w-sm">
      <div className="p-4 bg-card border border-border rounded-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
            N
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Nested Styles</h4>
            <p className="text-xs text-muted-foreground">CSS nesting support</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function CSSLayerPreview() {
  return (
    <div className="space-y-3 w-full max-w-sm">
      <div className="p-3 bg-card border border-border rounded-lg">
        <h4 className="text-sm font-semibold text-foreground mb-1">CSS Cascade Layers</h4>
        <p className="text-xs text-muted-foreground">@layer utility, components, base</p>
      </div>
      <div className="p-3 bg-muted rounded-lg">
        <h4 className="text-sm font-semibold text-foreground mb-1">Layer Order</h4>
        <p className="text-xs text-muted-foreground">Explicit layer ordering</p>
      </div>
    </div>
  )
}

function IndividualTransformPropertiesPreview() {
  const [rotated, setRotated] = useState(false)
  const [scaled, setScaled] = useState(false)

  return (
    <div className="w-full max-w-sm">
      <div className="flex gap-4 justify-center mb-4">
        <button
          onClick={() => setRotated(!rotated)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm"
        >
          {rotated ? 'Remove' : 'Add'} Rotation
        </button>
        <button
          onClick={() => setScaled(!scaled)}
          className="px-4 py-2 bg-info text-info-foreground rounded-lg text-sm"
        >
          {scaled ? 'Remove' : 'Add'} Scale
        </button>
      </div>
      <div className="flex justify-center">
        <div
          className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white font-bold"
          style={{
            rotate: rotated ? '45deg' : '0deg',
            scale: scaled ? '1.2' : '1',
          }}
        >
          CSS
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-4">
        Individual transform properties (rotate, scale, translate)
      </p>
    </div>
  )
}

function CssLogicPropertiesPreview() {
  return (
    <div className="space-y-4 w-full max-w-sm">
      <div className="p-4 bg-card border border-border rounded-lg">
        <h4 className="font-medium text-foreground mb-2">Logical Properties</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-xs text-muted-foreground">inline-size:</span>
            <code className="text-xs bg-muted px-2 py-1 rounded">200px</code>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-muted-foreground">block-size:</span>
            <code className="text-xs bg-muted px-2 py-1 rounded">100px</code>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-muted-foreground">inset-inline:</span>
            <code className="text-xs bg-muted px-2 py-1 rounded">1rem</code>
          </div>
        </div>
      </div>
    </div>
  )
}

function MediaQueryRangePreview() {
  const [width, setWidth] = useState(50)

  return (
    <div className="w-full max-w-sm">
      <div
        className="p-6 bg-card border border-border rounded-lg text-center transition-all"
        style={{ width: `${width}%`, maxWidth: '100%' }}
      >
        <p className="text-sm text-muted-foreground">
          Resize to test media query ranges
        </p>
      </div>
      <input
        type="range"
        min="20"
        max="100"
        value={width}
        onChange={(e) => setWidth(Number(e.target.value))}
        className="w-full mt-4"
      />
    </div>
  )
}

function CustomMediaQueriesPreview() {
  return (
    <div className="space-y-3 w-full max-w-sm">
      <div className="p-3 bg-card border border-border rounded-lg">
        <h4 className="text-sm font-semibold text-foreground mb-1">@media queries</h4>
        <p className="text-xs text-muted-foreground">Custom media query ranges</p>
      </div>
      <div className="p-3 bg-muted rounded-lg">
        <h4 className="text-sm font-semibold text-foreground mb-1">@custom-media</h4>
        <p className="text-xs text-muted-foreground">Named media features</p>
      </div>
    </div>
  )
}

function ScrollSnapPreview() {
  return (
    <div className="w-full max-w-sm">
      <div
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex-shrink-0 w-40 h-32 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white text-lg font-bold snap-center"
            style={{ scrollSnapAlign: 'center' }}
          >
            Slide {i}
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">
        Swipe to snap to each slide
      </p>
    </div>
  )
}

function AccentColorPreview() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex items-center gap-4">
        <input type="checkbox" defaultChecked className="w-5 h-5" style={{ accentColor: 'hsl(var(--primary))' }} />
        <span className="text-sm text-foreground">Primary accent checkbox</span>
      </div>
      <div className="flex items-center gap-4">
        <input type="radio" name="accent" defaultChecked className="w-5 h-5" style={{ accentColor: 'hsl(var(--success))' }} />
        <span className="text-sm text-foreground">Green accent radio</span>
      </div>
      <div className="flex items-center gap-4">
        <input type="range" defaultValue={50} className="w-32" style={{ accentColor: 'hsl(var(--warning))' }} />
        <span className="text-sm text-foreground">Orange accent slider</span>
      </div>
      <div className="flex items-center gap-4">
        <progress value={75} max={100} className="w-32" style={{ accentColor: 'hsl(var(--primary))' }} />
        <span className="text-sm text-foreground">Purple accent progress</span>
      </div>
    </div>
  )
}

function OklchColorPreview() {
  const oklchColors = [
    { l: 70, c: 0.15, h: 30, name: 'Orange' },
    { l: 70, c: 0.15, h: 120, name: 'Green' },
    { l: 70, c: 0.15, h: 210, name: 'Blue' },
    { l: 70, c: 0.15, h: 300, name: 'Purple' },
  ]

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex gap-2">
        {oklchColors.map((color, i) => (
          <div
            key={i}
            className="flex-1 aspect-square rounded-lg flex items-end justify-center p-2"
            style={{ backgroundColor: `oklch(${color.l}% ${color.c} ${color.h})` }}
          >
            <span className="text-xs text-white font-medium">{color.name}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center">
        OKLCH: perceptually uniform color space
      </p>
    </div>
  )
}

function RelativeColorsPreview() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex gap-2">
        <div className="flex-1 h-16 bg-primary rounded-lg flex items-center justify-center text-xs text-primary-foreground">Base</div>
        <div className="flex-1 h-16 rounded-lg flex items-center justify-center text-xs text-white" style={{ backgroundColor: 'hsl(var(--primary) / 0.8)' }}>80%</div>
        <div className="flex-1 h-16 rounded-lg flex items-center justify-center text-xs text-white" style={{ backgroundColor: 'hsl(var(--primary) / 0.6)' }}>60%</div>
        <div className="flex-1 h-16 rounded-lg flex items-center justify-center text-xs" style={{ backgroundColor: 'hsl(var(--primary) / 0.4)' }}>40%</div>
      </div>
      <p className="text-xs text-muted-foreground text-center">
        Relative color syntax: derive colors from base
      </p>
    </div>
  )
}

function ContainerUnitsPreview() {
  return (
    <div className="w-full max-w-sm">
      <div
        className="p-4 bg-card border border-border rounded-lg"
        style={{ containerType: 'inline-size' }}
      >
        <div
          className="bg-primary/20 rounded-lg p-3 mb-3"
          style={{ width: '50cqi' }}
        >
          <span className="text-xs text-foreground">50cqi width</span>
        </div>
        <div
          className="bg-info/20 rounded-lg p-3 mb-3"
          style={{ width: '75cqi' }}
        >
          <span className="text-xs text-foreground">75cqi width</span>
        </div>
        <div
          className="bg-success/20 rounded-lg p-3"
          style={{ width: '100cqi' }}
        >
          <span className="text-xs text-foreground">100cqi width</span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">
        cqi, cqw, cqh: container query units
      </p>
    </div>
  )
}

function DialogElementPreview() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium"
      >
        Open Dialog
      </button>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'hsl(var(--foreground) / 0.5)' }}>
          <div className="bg-card border border-border rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-foreground mb-2">Native Dialog</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This demonstrates the native HTML dialog element with backdrop.
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-muted rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function DetailsDisclosurePreview() {
  return (
    <div className="w-full max-w-sm space-y-2">
      {['Section 1', 'Section 2', 'Section 3'].map((section, i) => (
        <details key={i} className="group bg-card border border-border rounded-lg">
          <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
            <span className="font-medium text-foreground">{section}</span>
            <svg className="w-4 h-4 text-muted-foreground transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-4 pb-4 text-sm text-muted-foreground">
            Content for {section}. Native HTML disclosure widget with CSS styling.
          </div>
        </details>
      ))}
    </div>
  )
}

function IndeterminatePreview() {
  const [checked, setChecked] = useState<boolean | 'indeterminate'>('indeterminate')

  return (
    <div className="w-full max-w-sm space-y-4">
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          className="w-5 h-5"
          ref={(el) => el && (el.indeterminate = checked === 'indeterminate')}
          checked={checked === true}
          onChange={() => setChecked(checked === true ? false : checked === false ? 'indeterminate' : true)}
        />
        <span className="text-sm text-foreground">
          State: {checked === 'indeterminate' ? 'Indeterminate' : checked ? 'Checked' : 'Unchecked'}
        </span>
      </label>
      <div className="flex gap-2">
        <button onClick={() => setChecked(true)} className="px-3 py-1 bg-muted rounded text-xs">Set Checked</button>
        <button onClick={() => setChecked(false)} className="px-3 py-1 bg-muted rounded text-xs">Set Unchecked</button>
        <button onClick={() => setChecked('indeterminate')} className="px-3 py-1 bg-muted rounded text-xs">Set Indeterminate</button>
      </div>
    </div>
  )
}

function FormValidationPseudoPreview() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div>
        <label className="text-xs text-muted-foreground mb-1 block">Required field (empty = invalid)</label>
        <input
          type="text"
          required
          className="w-full px-3 py-2 bg-background border border-border rounded-lg invalid:border-red-500 invalid:ring-1 invalid:ring-red-500"
          placeholder="Enter text..."
        />
      </div>
      <div>
        <label className="text-xs text-muted-foreground mb-1 block">Email validation</label>
        <input
          type="email"
          defaultValue="test@example.com"
          className="w-full px-3 py-2 bg-background border border-border rounded-lg valid:border-green-500 valid:ring-1 valid:ring-green-500"
        />
      </div>
      <div>
        <label className="text-xs text-muted-foreground mb-1 block">Number range (1-10)</label>
        <input
          type="number"
          min={1}
          max={10}
          defaultValue={5}
          className="w-full px-3 py-2 bg-background border border-border rounded-lg in-range:border-green-500 out-of-range:border-red-500"
        />
      </div>
    </div>
  )
}

function FocusVisiblePreview() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <p className="text-xs text-muted-foreground">Tab through buttons to see :focus-visible</p>
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
          Button 1
        </button>
        <button className="px-4 py-2 bg-info text-info-foreground rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2">
          Button 2
        </button>
        <button className="px-4 py-2 bg-success text-success-foreground rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-success focus-visible:ring-offset-2">
          Button 3
        </button>
      </div>
      <p className="text-xs text-muted-foreground">Click shows no ring, keyboard shows ring</p>
    </div>
  )
}

function FocusWithinPreview() {
  return (
    <div className="w-full max-w-sm">
      <div className="p-4 bg-card border-2 border-border rounded-lg transition-all focus-within:border-primary focus-within:shadow-lg focus-within:shadow-primary/20">
        <h4 className="font-medium text-foreground mb-3">Focus Within Container</h4>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Focus me..."
            className="w-full px-3 py-2 bg-background border border-border rounded-lg"
          />
          <input
            type="text"
            placeholder="Or focus me..."
            className="w-full px-3 py-2 bg-background border border-border rounded-lg"
          />
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">
        Container styles change when child has focus
      </p>
    </div>
  )
}

function UserInvalidPreview() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <p className="text-xs text-muted-foreground">Type and blur to trigger :user-invalid</p>
      <div>
        <label className="text-xs text-muted-foreground mb-1 block">Required field</label>
        <input
          type="text"
          required
          className="w-full px-3 py-2 bg-background border border-border rounded-lg [&:user-invalid]:border-red-500 [&:user-invalid]:bg-red-50"
          placeholder="Leave empty and blur..."
        />
      </div>
      <div>
        <label className="text-xs text-muted-foreground mb-1 block">Email field</label>
        <input
          type="email"
          className="w-full px-3 py-2 bg-background border border-border rounded-lg [&:user-valid]:border-green-500 [&:user-valid]:bg-green-50"
          placeholder="Enter valid email..."
        />
      </div>
    </div>
  )
}

function AspectRatioPreview() {
  return (
    <div className="w-full max-w-sm">
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-primary/20 rounded-lg flex items-center justify-center" style={{ aspectRatio: '1/1' }}>
          <span className="text-xs text-foreground">1:1</span>
        </div>
        <div className="bg-info/20 rounded-lg flex items-center justify-center" style={{ aspectRatio: '4/3' }}>
          <span className="text-xs text-foreground">4:3</span>
        </div>
        <div className="bg-success/20 rounded-lg flex items-center justify-center" style={{ aspectRatio: '16/9' }}>
          <span className="text-xs text-foreground">16:9</span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-3">
        Native CSS aspect-ratio property
      </p>
    </div>
  )
}

function GapPropertyPreview() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div>
        <span className="text-xs text-muted-foreground mb-2 block">Flexbox with gap: 1rem</span>
        <div className="flex gap-4 flex-wrap">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center text-sm">{i}</div>
          ))}
        </div>
      </div>
      <div>
        <span className="text-xs text-muted-foreground mb-2 block">Grid with row-gap and column-gap</span>
        <div className="grid grid-cols-3 gap-x-6 gap-y-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-10 bg-info/20 rounded-lg flex items-center justify-center text-sm">{i}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ClampFunctionPreview() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div
        className="p-4 bg-card border border-border rounded-lg"
        style={{ fontSize: 'clamp(0.875rem, 2vw + 0.5rem, 1.5rem)' }}
      >
        <h4 className="font-semibold text-foreground">Fluid Typography</h4>
        <p className="text-muted-foreground">
          This text scales fluidly between min and max sizes using clamp().
        </p>
      </div>
      <div
        className="bg-primary/20 rounded-lg flex items-center justify-center h-16"
        style={{ width: 'clamp(150px, 50%, 300px)' }}
      >
        <span className="text-xs text-foreground">clamp(150px, 50%, 300px)</span>
      </div>
    </div>
  )
}

const modernCSSComponents = [
  {
    id: 'container-query',
    name: 'ContainerQuery',
    description: 'Components that adapt based on container size, not viewport.',
    usage: `<div data-coral-container data-name="card">
  <div data-coral-container-query="@container(min-width: 400px)">
    <!-- Styles applied when container >= 400px -->
  </div>
</div>`,
    props: [
      { name: 'data-name', type: 'string', default: 'undefined', description: 'Container name for named queries' },
      { name: 'data-type', type: '"size" | "inline-size"', default: '"inline-size"', description: 'Container type' },
    ],
    preview: ContainerQueryPreview,
  },
  {
    id: 'scroll-timeline',
    name: 'ScrollTimeline',
    description: 'Scroll-driven animations that respond to scroll position.',
    usage: `<div data-coral-scroll-timeline data-axis="y">
  <div data-coral-scroll-animation>
    Animated content
  </div>
</div>`,
    props: [
      { name: 'data-axis', type: '"x" | "y"', default: '"y"', description: 'Scroll axis' },
      { name: 'data-scroller', type: 'string', default: '"nearest"', description: 'Scroll container selector' },
    ],
    preview: ScrollTimelinePreview,
  },
  {
    id: 'view-transition',
    name: 'ViewTransition',
    description: 'Smooth transitions between page states using View Transitions API.',
    usage: `<div data-coral-view-transition data-name="hero">
  <img src="..." />
</div>`,
    props: [
      { name: 'data-name', type: 'string', default: 'required', description: 'Unique transition name' },
      { name: 'data-duration', type: 'string', default: '"250ms"', description: 'Transition duration' },
    ],
    preview: ViewTransitionPreview,
  },
  {
    id: 'anchor-position',
    name: 'AnchorPosition',
    description: 'CSS anchor positioning for tooltips and popovers.',
    usage: `<button data-coral-anchor data-anchor-name="--my-anchor">
  Anchor Element
</button>
<div data-coral-anchored data-position-anchor="--my-anchor">
  Positioned content
</div>`,
    props: [
      { name: 'data-anchor-name', type: 'string', default: 'required', description: 'Anchor name for reference' },
      { name: 'data-position', type: '"top" | "bottom" | "left" | "right"', default: '"bottom"', description: 'Anchor position' },
    ],
    preview: AnchorPositionPreview,
  },
  {
    id: 'subgrid',
    name: 'SubGrid',
    description: 'Grid items that inherit parent grid tracks.',
    usage: `<div data-coral-grid data-cols="3">
  <div data-coral-subgrid data-rows>
    <!-- Inherits parent grid rows -->
  </div>
</div>`,
    props: [
      { name: 'data-rows', type: 'boolean', default: 'false', description: 'Inherit row tracks' },
      { name: 'data-cols', type: 'boolean', default: 'false', description: 'Inherit column tracks' },
    ],
    preview: SubGridPreview,
  },
  {
    id: 'has-selector',
    name: 'HasSelector',
    description: 'Parent selectors using the :has() pseudo-class.',
    usage: `<div data-coral-has-input>
  <input type="checkbox" />
  <span>Label changes when checked</span>
</div>

/* CSS */
[data-coral-has-input]:has(:checked) {
  --checked-styles...
}`,
    props: [
      { name: 'data-selector', type: 'string', default: 'required', description: 'Has selector condition' },
    ],
    preview: HasSelectorPreview,
  },
  {
    id: 'text-wrap',
    name: 'TextWrap',
    description: 'Modern text wrapping with balance and pretty options.',
    usage: `<h1 data-coral-text-wrap="balance">
  Balanced heading text that wraps evenly
</h1>

<p data-coral-text-wrap="pretty">
  Pretty text that avoids orphans and widows
</p>`,
    props: [
      { name: 'data-wrap', type: '"balance" | "pretty" | "stable"', default: '"balance"', description: 'Wrap algorithm' },
    ],
    preview: TextWrapPreview,
  },
  {
    id: 'light-dark',
    name: 'LightDark',
    description: 'Use light-dark() function for theme-aware colors.',
    usage: `<div data-coral-light-dark>
  <p style="color: light-dark(#000, #fff)">
    Adaptive text color
  </p>
</div>`,
    props: [
      { name: 'data-scheme', type: '"light" | "dark" | "auto"', default: '"auto"', description: 'Color scheme' },
    ],
    preview: LightDarkPreview,
  },
  {
    id: 'popover-api',
    name: 'PopoverAPI',
    description: 'Native popover using the Popover API.',
    usage: `<button popovertarget="my-popover">
  Toggle Popover
</button>
<div popover id="my-popover">
  Popover content
</div>`,
    props: [
      { name: 'popover', type: '"auto" | "manual"', default: '"auto"', description: 'Popover behavior' },
      { name: 'popovertarget', type: 'string', default: 'required', description: 'Target popover ID' },
    ],
    preview: PopoverAPIPreview,
  },
  {
    id: 'color-mix',
    name: 'ColorMix',
    description: 'Mix colors using color-mix() in CSS.',
    usage: `<div style="background: color-mix(in srgb, red, blue 30%)">
  Mixed color background
</div>`,
    props: [
      { name: 'data-color-space', type: 'string', default: '"srgb"', description: 'Color interpolation space' },
    ],
    preview: ColorMixPreview,
  },
  {
    id: 'wide-gamut-colors',
    name: 'WideGamutColors',
    description: 'Display-P3, REC.2020, OKLCH, and other wide color gamuts.',
    usage: `<div style="background: color(display-p3 1 0 0)">
  Wide gamut color
</div>`,
    props: [
      { name: 'data-gamut', type: '"display-p3" | "rec2020" | "oklch" | "oklab"', default: '"display-p3"', description: 'Color gamut space' },
    ],
    preview: WideGamutColorsPreview,
  },
  {
    id: 'entry-animations',
    name: 'EntryAnimations',
    description: 'View Transitions API for element entry animations.',
    usage: `<div data-coral-view-transition data-name="item">
  <div data-coral-transition-enter>
    Animated content
  </div>
</div>`,
    props: [
      { name: 'data-name', type: 'string', default: 'required', description: 'Transition name' },
      { name: 'data-duration', type: 'string', default: '"300ms"', description: 'Animation duration' },
    ],
    preview: EntryAnimationsPreview,
  },
  {
    id: 'field-sizing',
    name: 'FieldSizing',
    description: 'Auto or fixed sizing for form inputs.',
    usage: `<input type="text" style="field-sizing: content" />
<input type="text" style="field-sizing: fixed" />`,
    props: [
      { name: 'field-sizing', type: '"content" | "fixed"', default: '"content"', description: 'Input sizing strategy' },
    ],
    preview: FieldSizingPreview,
  },
  {
    id: 'advanced-selectors',
    name: 'AdvancedSelectors',
    description: ':is(), :where(), :has() for powerful selection.',
    usage: `:is(header, footer) p {
  /* Styles for paragraphs in header or footer */
}

:where(.btn) {
  /* Zero-specificity button styles */
}

:has(input:checked) {
  /* Parent styles when checkbox checked */
}`,
    props: [
      { name: 'data-selector', type: 'string', default: 'required', description: 'Advanced selector type' },
    ],
    preview: AdvancedSelectorsPreview,
  },
  {
    id: 'css-nested',
    name: 'CSSNested',
    description: 'Native CSS nesting like Sass.',
    usage: `.card {
  padding: 1rem;

  .title {
    font-size: 1.5rem;

    &:hover {
      color: blue;
    }
  }
}`,
    props: [
      { name: 'data-nesting', type: 'boolean', default: 'true', description: 'Enable CSS nesting' },
    ],
    preview: CSSNestedPreview,
  },
  {
    id: 'css-layer',
    name: 'CSSLayer',
    description: 'Cascade layers for explicit style ordering.',
    usage: `@layer base, components, utilities;

@layer base {
  body { margin: 0; }
}

@layer components {
  .btn { padding: 0.5rem; }
}`,
    props: [
      { name: 'data-layer', type: 'string', default: 'required', description: 'Layer name' },
      { name: 'data-order', type: 'number', default: 'undefined', description: 'Layer order' },
    ],
    preview: CSSLayerPreview,
  },
  {
    id: 'individual-transform',
    name: 'IndividualTransformProperties',
    description: 'Separate transform properties: rotate, scale, translate.',
    usage: `<div style="
  rotate: 45deg;
  scale: 1.2;
  translate: 10px 20px;
">
  Transformed element
</div>`,
    props: [
      { name: 'rotate', type: 'angle', default: '"0deg"', description: 'Rotation angle' },
      { name: 'scale', type: 'number', default: '1', description: 'Scale factor' },
    ],
    preview: IndividualTransformPropertiesPreview,
  },
  {
    id: 'css-logic-properties',
    name: 'CssLogicProperties',
    description: 'Logical properties for internationalization.',
    usage: `<div style="
  inline-size: 200px;
  block-size: 100px;
  inset-inline: 1rem;
  margin-block: 0.5rem;
">
  Logical properties
</div>`,
    props: [
      { name: 'data-property', type: '"inline-size" | "block-size" | "inset-inline"', default: '"inline-size"', description: 'Logical property type' },
    ],
    preview: CssLogicPropertiesPreview,
  },
  {
    id: 'media-query-range',
    name: 'MediaQueryRange',
    description: 'Range syntax for media queries.',
    usage: `@media (width >= 320px) and (width <= 768px) {
  /* Styles for mobile */
}`,
    props: [
      { name: 'data-feature', type: 'string', default: '"width"', description: 'Media feature' },
      { name: 'data-min', type: 'string', default: 'undefined', description: 'Minimum value' },
      { name: 'data-max', type: 'string', default: 'undefined', description: 'Maximum value' },
    ],
    preview: MediaQueryRangePreview,
  },
  {
    id: 'custom-media-queries',
    name: 'CustomMediaQueries',
    description: 'Named custom media queries.',
    usage: `@custom-media --small (width >= 320px);
@custom-media --large (width >= 1024px);

@media (--small) and (--large) {
  /* Styles */
}`,
    props: [
      { name: 'data-name', type: 'string', default: 'required', description: 'Custom media query name' },
      { name: 'data-query', type: 'string', default: 'required', description: 'Media query definition' },
    ],
    preview: CustomMediaQueriesPreview,
  },
  {
    id: 'scroll-snap',
    name: 'ScrollSnap',
    description: 'Scroll snap points for carousel-like scrolling behavior.',
    usage: `<div data-coral-scroll-snap data-type="x" data-align="mandatory">
  <div data-coral-snap-item data-align="center">Item 1</div>
  <div data-coral-snap-item data-align="center">Item 2</div>
</div>`,
    props: [
      { name: 'data-type', type: '"x" | "y" | "both"', default: '"x"', description: 'Scroll snap axis' },
      { name: 'data-align', type: '"start" | "center" | "end"', default: '"center"', description: 'Snap alignment' },
    ],
    preview: ScrollSnapPreview,
  },
  {
    id: 'accent-color',
    name: 'AccentColor',
    description: 'Native accent-color property for form controls.',
    usage: `<input type="checkbox" style="accent-color: var(--primary)" />
<input type="radio" style="accent-color: #10b981" />
<input type="range" style="accent-color: #f59e0b" />`,
    props: [
      { name: 'accent-color', type: 'color', default: 'auto', description: 'Accent color for controls' },
    ],
    preview: AccentColorPreview,
  },
  {
    id: 'oklch-color',
    name: 'OklchColor',
    description: 'OKLCH perceptually uniform color space.',
    usage: `<div style="background: oklch(70% 0.15 30)">
  Orange in OKLCH
</div>
<div style="color: oklch(50% 0.2 120)">
  Green text in OKLCH
</div>`,
    props: [
      { name: 'L', type: 'percentage', default: 'required', description: 'Lightness (0-100%)' },
      { name: 'C', type: 'number', default: 'required', description: 'Chroma (0-0.4)' },
      { name: 'H', type: 'angle', default: 'required', description: 'Hue (0-360)' },
    ],
    preview: OklchColorPreview,
  },
  {
    id: 'relative-colors',
    name: 'RelativeColors',
    description: 'Derive new colors from existing colors using relative color syntax.',
    usage: `<div style="background: hsl(from var(--primary) h s l / 80%)">
  80% opacity variant
</div>
<div style="background: oklch(from var(--primary) calc(l * 1.2) c h)">
  Lighter variant
</div>`,
    props: [
      { name: 'from', type: 'color', default: 'required', description: 'Base color to derive from' },
      { name: 'modifier', type: 'string', default: 'required', description: 'Color modification expression' },
    ],
    preview: RelativeColorsPreview,
  },
  {
    id: 'container-units',
    name: 'ContainerUnits',
    description: 'Container query units (cqi, cqw, cqh, cqmin, cqmax).',
    usage: `<div style="container-type: inline-size">
  <div style="width: 50cqi">50% of container inline size</div>
  <div style="font-size: 5cqw">5% of container width</div>
</div>`,
    props: [
      { name: 'cqi', type: 'length', default: 'undefined', description: 'Container inline size unit' },
      { name: 'cqw', type: 'length', default: 'undefined', description: 'Container width unit' },
      { name: 'cqh', type: 'length', default: 'undefined', description: 'Container height unit' },
    ],
    preview: ContainerUnitsPreview,
  },
  {
    id: 'dialog-element',
    name: 'DialogElement',
    description: 'Native HTML dialog element with backdrop.',
    usage: `<dialog data-coral-dialog>
  <h3>Dialog Title</h3>
  <p>Dialog content</p>
  <button onclick="this.closest('dialog').close()">Close</button>
</dialog>
<button onclick="document.querySelector('dialog').showModal()">
  Open Dialog
</button>`,
    props: [
      { name: 'open', type: 'boolean', default: 'false', description: 'Dialog open state' },
      { name: 'modal', type: 'boolean', default: 'true', description: 'Modal with backdrop' },
    ],
    preview: DialogElementPreview,
  },
  {
    id: 'details-disclosure',
    name: 'DetailsDisclosure',
    description: 'Native details/summary disclosure widget.',
    usage: `<details data-coral-details>
  <summary data-coral-summary>Click to expand</summary>
  <div data-coral-details-content>
    Hidden content revealed on click
  </div>
</details>`,
    props: [
      { name: 'open', type: 'boolean', default: 'false', description: 'Initial open state' },
    ],
    preview: DetailsDisclosurePreview,
  },
  {
    id: 'indeterminate',
    name: 'IndeterminateState',
    description: 'Indeterminate state for checkboxes and progress.',
    usage: `<input type="checkbox" data-coral-indeterminate />

/* CSS */
:indeterminate {
  opacity: 0.7;
  background: repeating-linear-gradient(...);
}`,
    props: [
      { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Set indeterminate state' },
    ],
    preview: IndeterminatePreview,
  },
  {
    id: 'form-validation-pseudo',
    name: 'FormValidationPseudo',
    description: 'CSS pseudo-classes for form validation (:valid, :invalid, :in-range).',
    usage: `<input type="email" required />

/* CSS */
input:valid { border-color: green; }
input:invalid { border-color: red; }
input:in-range { border-color: green; }
input:out-of-range { border-color: red; }`,
    props: [
      { name: 'required', type: 'boolean', default: 'false', description: 'Field is required' },
      { name: 'min', type: 'number', default: 'undefined', description: 'Minimum value' },
      { name: 'max', type: 'number', default: 'undefined', description: 'Maximum value' },
    ],
    preview: FormValidationPseudoPreview,
  },
  {
    id: 'focus-visible',
    name: 'FocusVisible',
    description: ':focus-visible pseudo-class for keyboard-only focus styles.',
    usage: `<button data-coral-focus-visible>
  Keyboard Focus Button
</button>

/* CSS */
:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}`,
    props: [
      { name: 'data-focus-ring', type: 'boolean', default: 'true', description: 'Show focus ring' },
    ],
    preview: FocusVisiblePreview,
  },
  {
    id: 'focus-within',
    name: 'FocusWithin',
    description: ':focus-within pseudo-class for parent styling when child has focus.',
    usage: `<div data-coral-focus-within>
  <input type="text" placeholder="Focus me" />
</div>

/* CSS */
[data-coral-focus-within]:focus-within {
  border-color: var(--primary);
  box-shadow: 0 0 0 4px var(--primary) / 20%;
}`,
    props: [
      { name: 'data-highlight', type: 'boolean', default: 'true', description: 'Highlight container on focus' },
    ],
    preview: FocusWithinPreview,
  },
  {
    id: 'user-invalid',
    name: 'UserInvalid',
    description: ':user-invalid and :user-valid for user-interacted validation.',
    usage: `<input type="email" required />

/* CSS */
input:user-invalid {
  border-color: red;
  background: rgba(255,0,0,0.1);
}
input:user-valid {
  border-color: green;
  background: rgba(0,255,0,0.1);
}`,
    props: [
      { name: 'required', type: 'boolean', default: 'false', description: 'Field is required' },
    ],
    preview: UserInvalidPreview,
  },
  {
    id: 'aspect-ratio',
    name: 'AspectRatio',
    description: 'Native CSS aspect-ratio property.',
    usage: `<div style="aspect-ratio: 16/9">
  Maintains 16:9 aspect ratio
</div>
<img style="aspect-ratio: 1/1" />`,
    props: [
      { name: 'aspect-ratio', type: 'ratio', default: 'auto', description: 'Width/height ratio' },
    ],
    preview: AspectRatioPreview,
  },
  {
    id: 'gap-property',
    name: 'GapProperty',
    description: 'Gap property for flexbox and grid layouts.',
    usage: `<div style="display: flex; gap: 1rem;">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<div style="display: grid; row-gap: 1rem; column-gap: 2rem;">
  <div>Cell 1</div>
  <div>Cell 2</div>
</div>`,
    props: [
      { name: 'gap', type: 'length', default: '0', description: 'Gap between items' },
      { name: 'row-gap', type: 'length', default: '0', description: 'Gap between rows' },
      { name: 'column-gap', type: 'length', default: '0', description: 'Gap between columns' },
    ],
    preview: GapPropertyPreview,
  },
  {
    id: 'clamp-function',
    name: 'ClampFunction',
    description: 'CSS clamp() function for responsive values.',
    usage: `<h1 style="font-size: clamp(1rem, 4vw, 3rem)">
  Fluid heading
</h1>
<div style="width: clamp(200px, 50%, 600px)">
  Responsive width
</div>`,
    props: [
      { name: 'min', type: 'value', default: 'required', description: 'Minimum value' },
      { name: 'preferred', type: 'value', default: 'required', description: 'Preferred value' },
      { name: 'max', type: 'value', default: 'required', description: 'Maximum value' },
    ],
    preview: ClampFunctionPreview,
  },
]

function ModernCSSPage() {
  return (
    <ComponentPageLayout
      categoryName="Modern CSS"
      categoryId="modern-css"
      components={modernCSSComponents}
      accessibilityFeatures={[
        'Progressive enhancement',
        'Fallback support',
        'Accessibility maintained',
        'Motion preferences respected',
      ]}
    />
  )
}

export default ModernCSSPage
