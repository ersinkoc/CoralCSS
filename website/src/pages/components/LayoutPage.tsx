import { useState } from 'react'
import { ComponentPageLayout } from './ComponentPageLayout'

// Preview Components
function ContainerPreview() {
  return (
    <div className="w-full space-y-4">
      <div className="bg-primary/10 border border-primary/30 rounded p-4 max-w-4xl mx-auto">
        <div className="text-center text-sm text-primary">
          Container (max-width: 1280px, centered)
        </div>
      </div>
      <div className="bg-info/10 border border-info/30 rounded p-4 max-w-2xl mx-auto">
        <div className="text-center text-sm text-info">
          Small Container (max-width: 768px)
        </div>
      </div>
    </div>
  )
}

function GridPreview() {
  return (
    <div className="w-full space-y-6">
      <div>
        <div className="text-sm text-muted-foreground mb-2">3 Columns</div>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 bg-primary/10 border border-primary/20 rounded-lg text-center text-sm text-primary">
              Col {i}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="text-sm text-muted-foreground mb-2">4 Columns</div>
        <div className="grid grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-3 bg-info/10 border border-info/20 rounded-lg text-center text-sm text-info">
              {i}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FlexPreview() {
  return (
    <div className="w-full space-y-6">
      <div>
        <div className="text-sm text-muted-foreground mb-2">Row with Gap</div>
        <div className="flex gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 bg-primary/10 border border-primary/20 rounded-lg text-sm text-primary">
              Item {i}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="text-sm text-muted-foreground mb-2">Space Between</div>
        <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
          <span className="text-sm">Left</span>
          <span className="text-sm">Center</span>
          <span className="text-sm">Right</span>
        </div>
      </div>
    </div>
  )
}

function StackPreview() {
  return (
    <div className="flex gap-8">
      <div>
        <div className="text-sm text-muted-foreground mb-2">Vertical</div>
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="px-4 py-2 bg-primary/10 border border-primary/20 rounded text-sm text-primary">
              Item {i}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="text-sm text-muted-foreground mb-2">Horizontal</div>
        <div className="flex gap-2">
          {['A', 'B', 'C'].map((i) => (
            <div key={i} className="w-10 h-10 bg-info/10 border border-info/20 rounded flex items-center justify-center text-sm text-info">
              {i}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function DividerPreview() {
  return (
    <div className="w-full max-w-md space-y-6">
      <div>
        <div className="text-sm text-muted-foreground mb-2">Horizontal</div>
        <div data-coral-divider />
      </div>
      <div>
        <div className="text-sm text-muted-foreground mb-2">With Label</div>
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-sm text-muted-foreground">OR</span>
          <div className="flex-1 h-px bg-border" />
        </div>
      </div>
      <div>
        <div className="text-sm text-muted-foreground mb-2">Vertical</div>
        <div className="flex items-center gap-4 h-12">
          <span className="text-sm">Left</span>
          <div className="w-px h-full bg-border" />
          <span className="text-sm">Right</span>
        </div>
      </div>
    </div>
  )
}

function AspectRatioPreview() {
  return (
    <div className="flex gap-4">
      <div className="w-40">
        <div className="text-sm text-muted-foreground mb-2">16:9</div>
        <div className="aspect-video bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white text-sm">
          16:9
        </div>
      </div>
      <div className="w-24">
        <div className="text-sm text-muted-foreground mb-2">1:1</div>
        <div className="aspect-square bg-gradient-to-br from-info to-primary rounded-lg flex items-center justify-center text-white text-sm">
          1:1
        </div>
      </div>
      <div className="w-32">
        <div className="text-sm text-muted-foreground mb-2">4:3</div>
        <div className="aspect-[4/3] bg-gradient-to-br from-success to-info rounded-lg flex items-center justify-center text-white text-sm">
          4:3
        </div>
      </div>
    </div>
  )
}

function CenterPreview() {
  return (
    <div className="flex gap-4">
      <div className="w-40 h-32 border-2 border-dashed border-border rounded-lg flex items-center justify-center">
        <div className="p-3 bg-primary text-primary-foreground rounded text-sm">
          Centered
        </div>
      </div>
      <div className="w-40 h-32 border-2 border-dashed border-border rounded-lg flex items-center">
        <div className="p-3 bg-info text-white rounded text-sm">
          Vertical Only
        </div>
      </div>
    </div>
  )
}

function ScrollAreaPreview() {
  return (
    <div className="w-64 h-40 border border-border rounded-lg overflow-auto">
      <div className="p-4 space-y-3">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="p-3 bg-muted rounded text-sm">
            Scrollable Item {i}
          </div>
        ))}
      </div>
    </div>
  )
}

function CollapsiblePreview() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div data-coral-collapsible data-open={isOpen || undefined} className="w-full max-w-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        data-coral-collapsible-trigger
        className="w-full flex items-center justify-between"
      >
        <span className="font-medium text-foreground">Click to toggle</span>
        <svg
          className={`w-5 h-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div data-coral-collapsible-content>
          This content is collapsible. You can show or hide it by clicking the button above.
        </div>
      )}
    </div>
  )
}

function ResizablePreview() {
  return (
    <div data-coral-resizable className="w-full max-w-lg h-40">
      <div data-coral-resizable-panel className="flex items-center justify-center">
        Left Panel
      </div>
      <div data-coral-resizable-handle />
      <div data-coral-resizable-panel className="flex items-center justify-center">
        Right Panel
      </div>
    </div>
  )
}

const layoutComponents = [
  {
    id: 'container',
    name: 'Container',
    description: 'A responsive container with max-width constraints.',
    usage: `<div data-coral-container>
  <!-- Content with max-width and centered -->
</div>

<div data-coral-container data-size="sm">
  <!-- Smaller max-width -->
</div>

<div data-coral-container data-fluid>
  <!-- Full-width with padding -->
</div>`,
    props: [
      { name: 'data-size', type: '"sm" | "md" | "lg" | "xl" | "2xl"', default: '"2xl"', description: 'Max-width size' },
      { name: 'data-fluid', type: 'boolean', default: 'false', description: 'Full-width mode' },
    ],
    preview: ContainerPreview,
  },
  {
    id: 'grid',
    name: 'Grid',
    description: 'A flexible grid layout system with responsive columns.',
    usage: `<div data-coral-grid data-cols="3" data-gap="4">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>

<div data-coral-grid data-cols="1" data-cols-md="2" data-cols-lg="4">
  <!-- Responsive columns -->
</div>`,
    props: [
      { name: 'data-cols', type: '1-12', default: '1', description: 'Number of columns' },
      { name: 'data-gap', type: '0-12', default: '4', description: 'Gap between items' },
      { name: 'data-cols-{breakpoint}', type: '1-12', default: 'undefined', description: 'Responsive column count' },
    ],
    preview: GridPreview,
  },
  {
    id: 'flex',
    name: 'Flex',
    description: 'A flexbox layout container for flexible item arrangement.',
    usage: `<div data-coral-flex data-direction="row" data-gap="4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<div data-coral-flex data-justify="between" data-align="center">
  <div>Left</div>
  <div>Right</div>
</div>`,
    props: [
      { name: 'data-direction', type: '"row" | "column"', default: '"row"', description: 'Flex direction' },
      { name: 'data-justify', type: '"start" | "center" | "end" | "between" | "around"', default: '"start"', description: 'Justify content' },
      { name: 'data-align', type: '"start" | "center" | "end" | "stretch"', default: '"stretch"', description: 'Align items' },
      { name: 'data-wrap', type: 'boolean', default: 'false', description: 'Enable flex wrap' },
    ],
    preview: FlexPreview,
  },
  {
    id: 'stack',
    name: 'Stack',
    description: 'A simple vertical or horizontal stack layout.',
    usage: `<div data-coral-stack data-spacing="4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<div data-coral-stack data-direction="horizontal" data-spacing="2">
  <div>A</div>
  <div>B</div>
  <div>C</div>
</div>`,
    props: [
      { name: 'data-direction', type: '"vertical" | "horizontal"', default: '"vertical"', description: 'Stack direction' },
      { name: 'data-spacing', type: '0-12', default: '4', description: 'Space between items' },
      { name: 'data-align', type: '"start" | "center" | "end" | "stretch"', default: '"stretch"', description: 'Cross-axis alignment' },
    ],
    preview: StackPreview,
  },
  {
    id: 'divider',
    name: 'Divider',
    description: 'A horizontal or vertical divider line.',
    usage: `<div data-coral-divider></div>

<div data-coral-divider data-orientation="vertical"></div>

<div data-coral-divider data-label="OR"></div>`,
    props: [
      { name: 'data-orientation', type: '"horizontal" | "vertical"', default: '"horizontal"', description: 'Divider orientation' },
      { name: 'data-label', type: 'string', default: 'undefined', description: 'Optional label text' },
    ],
    preview: DividerPreview,
  },
  {
    id: 'aspect-ratio',
    name: 'AspectRatio',
    description: 'Maintains a specific aspect ratio for content.',
    usage: `<div data-coral-aspect-ratio data-ratio="16/9">
  <img src="..." alt="..." />
</div>

<div data-coral-aspect-ratio data-ratio="1/1">
  <video src="..."></video>
</div>`,
    props: [
      { name: 'data-ratio', type: '"16/9" | "4/3" | "1/1" | "21/9"', default: '"16/9"', description: 'Aspect ratio' },
    ],
    preview: AspectRatioPreview,
  },
  {
    id: 'center',
    name: 'Center',
    description: 'Centers content horizontally and/or vertically.',
    usage: `<div data-coral-center>
  <!-- Horizontally and vertically centered -->
</div>

<div data-coral-center data-axis="horizontal">
  <!-- Only horizontally centered -->
</div>`,
    props: [
      { name: 'data-axis', type: '"both" | "horizontal" | "vertical"', default: '"both"', description: 'Centering axis' },
      { name: 'data-inline', type: 'boolean', default: 'false', description: 'Use inline-flex instead of flex' },
    ],
    preview: CenterPreview,
  },
  {
    id: 'scroll-area',
    name: 'ScrollArea',
    description: 'A scrollable container with custom scrollbars.',
    usage: `<div data-coral-scroll-area data-height="300">
  <!-- Scrollable content -->
</div>

<div data-coral-scroll-area data-direction="horizontal">
  <!-- Horizontally scrollable -->
</div>`,
    props: [
      { name: 'data-direction', type: '"vertical" | "horizontal" | "both"', default: '"vertical"', description: 'Scroll direction' },
      { name: 'data-height', type: 'string', default: 'auto', description: 'Container height' },
      { name: 'data-hide-scrollbar', type: 'boolean', default: 'false', description: 'Hide scrollbar' },
    ],
    preview: ScrollAreaPreview,
  },
  {
    id: 'collapsible',
    name: 'Collapsible',
    description: 'A collapsible content container with animation.',
    usage: `<div data-coral-collapsible>
  <button data-coral-collapsible-trigger>
    Toggle Content
  </button>
  <div data-coral-collapsible-content>
    Hidden content here...
  </div>
</div>`,
    props: [
      { name: 'data-open', type: 'boolean', default: 'false', description: 'Control open state' },
      { name: 'data-disabled', type: 'boolean', default: 'false', description: 'Disable toggle' },
    ],
    preview: CollapsiblePreview,
  },
  {
    id: 'resizable',
    name: 'Resizable',
    description: 'A resizable panel container with drag handles.',
    usage: `<div data-coral-resizable>
  <div data-coral-resizable-panel data-default-size="50">
    Left Panel
  </div>
  <div data-coral-resizable-handle></div>
  <div data-coral-resizable-panel>
    Right Panel
  </div>
</div>`,
    props: [
      { name: 'data-direction', type: '"horizontal" | "vertical"', default: '"horizontal"', description: 'Resize direction' },
      { name: 'data-min-size', type: 'number', default: '10', description: 'Minimum panel size (%)' },
      { name: 'data-max-size', type: 'number', default: '90', description: 'Maximum panel size (%)' },
    ],
    preview: ResizablePreview,
  },
]

function LayoutPage() {
  return (
    <ComponentPageLayout
      categoryName="Layout"
      categoryId="layout"
      components={layoutComponents}
      accessibilityFeatures={[
        'Semantic markup',
        'Focus order',
        'Responsive design',
        'ARIA landmarks',
      ]}
    />
  )
}

export default LayoutPage
