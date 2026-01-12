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
    <div className="w-full max-w-sm h-40 border border-border rounded-lg overflow-auto mx-auto">
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

function MasonryPreview() {
  const items = [
    { height: 'h-32', color: 'bg-primary/20' },
    { height: 'h-48', color: 'bg-info/20' },
    { height: 'h-24', color: 'bg-success/20' },
    { height: 'h-40', color: 'bg-warning/20' },
    { height: 'h-36', color: 'bg-error/20' },
    { height: 'h-28', color: 'bg-accent/20' },
  ]
  return (
    <div className="columns-3 gap-4 w-full max-w-lg">
      {items.map((item, i) => (
        <div key={i} className={`${item.height} ${item.color} rounded-lg mb-4 flex items-center justify-center border border-border`}>
          <span className="text-sm text-muted-foreground">{i + 1}</span>
        </div>
      ))}
    </div>
  )
}

function SpacerPreview() {
  return (
    <div className="w-full max-w-sm bg-card rounded-xl border border-border p-4">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-primary rounded-full" />
        <div className="flex-1" /> {/* Spacer */}
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm">Follow</button>
      </div>
      <div className="h-6" /> {/* Vertical spacer */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Spacer pushes elements apart</span>
      </div>
    </div>
  )
}

function SplitterPreview() {
  return (
    <div className="w-full max-w-lg h-48 flex border border-border rounded-xl overflow-hidden">
      <div className="flex-1 bg-card p-4 flex items-center justify-center">
        <span className="text-sm text-muted-foreground">Panel A</span>
      </div>
      <div className="w-1 bg-border cursor-col-resize hover:bg-primary transition-colors" />
      <div className="flex-1 bg-card p-4 flex items-center justify-center">
        <span className="text-sm text-muted-foreground">Panel B</span>
      </div>
    </div>
  )
}

function StickyPreview() {
  return (
    <div className="w-full max-w-sm h-48 overflow-auto border border-border rounded-xl">
      <div className="sticky top-0 bg-primary text-primary-foreground p-3 text-sm font-medium z-10">
        Sticky Header
      </div>
      <div className="p-4 space-y-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="p-3 bg-muted rounded-lg text-sm text-muted-foreground">
            Content item {i}
          </div>
        ))}
      </div>
    </div>
  )
}

function VisuallyHiddenPreview() {
  return (
    <div className="space-y-4">
      <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <span className="sr-only">Add to favorites</span>
        Like
      </button>
      <p className="text-sm text-muted-foreground">
        The "Add to favorites" text is visually hidden but readable by screen readers.
      </p>
    </div>
  )
}

function ResponsiveHidePreview() {
  return (
    <div className="w-full">
      <div className="p-4 bg-card rounded-xl border border-border">
        <div className="flex items-center gap-4">
          <div className="hidden md:block p-3 bg-primary/10 rounded-lg">
            <span className="text-sm text-primary">Visible on md+</span>
          </div>
          <div className="block md:hidden p-3 bg-info/10 rounded-lg">
            <span className="text-sm text-info">Visible on mobile</span>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <span className="text-sm text-muted-foreground">Always visible</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function OverflowPreview() {
  return (
    <div className="flex gap-4">
      <div className="w-32">
        <p className="text-xs text-muted-foreground mb-2">Truncate</p>
        <div className="p-3 bg-card rounded-lg border border-border">
          <p className="text-sm truncate">This is a very long text that will be truncated</p>
        </div>
      </div>
      <div className="w-32">
        <p className="text-xs text-muted-foreground mb-2">Line Clamp</p>
        <div className="p-3 bg-card rounded-lg border border-border">
          <p className="text-sm line-clamp-2">This is a very long text that spans multiple lines and will be clamped to two lines</p>
        </div>
      </div>
    </div>
  )
}

function SectionPreview() {
  return (
    <div className="w-full max-w-md">
      <section className="p-6 bg-card rounded-xl border border-border">
        <h2 className="text-lg font-semibold text-foreground mb-2">Section Title</h2>
        <p className="text-sm text-muted-foreground mb-4">
          This is a semantic section element with proper heading hierarchy.
        </p>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm">Action</button>
          <button className="px-4 py-2 bg-muted text-muted-foreground rounded-lg text-sm">Cancel</button>
        </div>
      </section>
    </div>
  )
}

function WrapPreview() {
  const tags = ['React', 'TypeScript', 'CSS', 'HTML', 'JavaScript', 'Node.js', 'GraphQL', 'REST']
  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

function InlinePreview() {
  return (
    <div className="w-full max-w-md">
      <p className="text-muted-foreground">
        This is an <span className="inline-flex items-center px-2 py-0.5 bg-primary/10 text-primary text-sm rounded">inline element</span> within text, along with
        <span className="inline-flex items-center px-2 py-0.5 bg-info/10 text-info text-sm rounded mx-1">another one</span>
        that flows naturally.
      </p>
    </div>
  )
}

function BoxPreview() {
  return (
    <div className="flex gap-4">
      <div className="w-24 h-24 bg-card rounded-xl border border-border shadow-sm flex items-center justify-center">
        <span className="text-xs text-muted-foreground">Default</span>
      </div>
      <div className="w-24 h-24 bg-card rounded-xl border-2 border-primary shadow-lg flex items-center justify-center">
        <span className="text-xs text-primary">Elevated</span>
      </div>
      <div className="w-24 h-24 bg-muted/50 rounded-xl border border-dashed border-border flex items-center justify-center">
        <span className="text-xs text-muted-foreground">Dashed</span>
      </div>
    </div>
  )
}

function HolyGrailPreview() {
  return (
    <div className="w-full max-w-lg border border-border rounded-lg overflow-hidden">
      <header className="p-3 bg-primary text-primary-foreground text-center text-sm">Header</header>
      <div className="flex min-h-[120px]">
        <aside className="w-20 bg-muted p-2 text-xs text-muted-foreground">Sidebar</aside>
        <main className="flex-1 p-3 bg-card text-sm text-center">Main Content</main>
        <aside className="w-20 bg-muted p-2 text-xs text-muted-foreground">Ads</aside>
      </div>
      <footer className="p-3 bg-muted text-center text-sm text-muted-foreground">Footer</footer>
    </div>
  )
}

function SidebarLayoutPreview() {
  return (
    <div className="w-full max-w-lg h-48 flex border border-border rounded-lg overflow-hidden">
      <aside className="w-48 bg-card border-r border-border p-3 space-y-2">
        {['Dashboard', 'Users', 'Settings'].map(item => (
          <div key={item} className="px-3 py-2 bg-muted rounded text-sm text-muted-foreground">{item}</div>
        ))}
      </aside>
      <main className="flex-1 bg-muted/30 p-4 flex items-center justify-center">
        <span className="text-muted-foreground">Main Content Area</span>
      </main>
    </div>
  )
}

function DashboardLayoutPreview() {
  return (
    <div className="w-full max-w-lg grid grid-cols-3 grid-rows-2 gap-2 h-48">
      <div className="col-span-2 bg-card border border-border rounded-lg p-3 flex items-center justify-center">
        <span className="text-sm text-muted-foreground">Main Chart</span>
      </div>
      <div className="bg-card border border-border rounded-lg p-3 flex items-center justify-center">
        <span className="text-sm text-muted-foreground">Stats</span>
      </div>
      <div className="bg-card border border-border rounded-lg p-3 flex items-center justify-center">
        <span className="text-sm text-muted-foreground">Widget 1</span>
      </div>
      <div className="bg-card border border-border rounded-lg p-3 flex items-center justify-center">
        <span className="text-sm text-muted-foreground">Widget 2</span>
      </div>
      <div className="bg-card border border-border rounded-lg p-3 flex items-center justify-center">
        <span className="text-sm text-muted-foreground">Widget 3</span>
      </div>
    </div>
  )
}

function CardGridPreview() {
  return (
    <div className="w-full max-w-lg grid grid-cols-2 gap-3">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="p-4 bg-card border border-border rounded-lg">
          <div className="w-full h-16 bg-muted rounded mb-3" />
          <h4 className="font-medium text-sm text-foreground mb-1">Card {i}</h4>
          <p className="text-xs text-muted-foreground">Description text</p>
        </div>
      ))}
    </div>
  )
}

function TimelineLayoutPreview() {
  const events = [
    { time: '10:00', title: 'Meeting', color: 'bg-primary' },
    { time: '12:00', title: 'Lunch', color: 'bg-info' },
    { time: '14:00', title: 'Review', color: 'bg-success' },
  ]
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="relative border-l-2 border-border pl-6 space-y-6">
        {events.map((e, i) => (
          <div key={i} className="relative">
            <div className={`absolute -left-[29px] w-4 h-4 rounded-full ${e.color}`} />
            <span className="text-xs text-muted-foreground">{e.time}</span>
            <p className="text-sm font-medium text-foreground">{e.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function KanbanBoardPreview() {
  const columns = [
    { name: 'Todo', items: ['Task 1', 'Task 2'] },
    { name: 'In Progress', items: ['Task 3'] },
    { name: 'Done', items: ['Task 4'] },
  ]
  return (
    <div className="w-full max-w-lg flex gap-3">
      {columns.map(col => (
        <div key={col.name} className="flex-1 bg-muted/50 rounded-lg p-2">
          <h4 className="text-xs font-medium text-muted-foreground mb-2 px-1">{col.name}</h4>
          <div className="space-y-2">
            {col.items.map(item => (
              <div key={item} className="p-2 bg-card border border-border rounded text-xs">{item}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function GalleryGridPreview() {
  return (
    <div className="w-full max-w-md grid grid-cols-3 gap-2">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className="aspect-square bg-gradient-to-br from-primary/30 to-accent/30 rounded-lg" />
      ))}
    </div>
  )
}

function ListLayoutPreview() {
  return (
    <div className="w-full max-w-sm space-y-2">
      {['Item one', 'Item two', 'Item three', 'Item four'].map((item, i) => (
        <div key={i} className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg">
          <div className="w-8 h-8 bg-muted rounded-full" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{item}</p>
            <p className="text-xs text-muted-foreground">Description</p>
          </div>
          <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      ))}
    </div>
  )
}

function PanelGroupPreview() {
  return (
    <div className="w-full max-w-lg space-y-3">
      {['Panel A', 'Panel B', 'Panel C'].map(name => (
        <div key={name} className="p-4 bg-card border border-border rounded-lg">
          <h4 className="font-medium text-sm text-foreground mb-2">{name}</h4>
          <div className="h-12 bg-muted rounded" />
        </div>
      ))}
    </div>
  )
}

function FooterLayoutPreview() {
  return (
    <footer className="w-full max-w-lg p-6 bg-card border border-border rounded-lg">
      <div className="grid grid-cols-3 gap-4 mb-4">
        {['Product', 'Company', 'Support'].map(section => (
          <div key={section}>
            <h4 className="font-medium text-sm text-foreground mb-2">{section}</h4>
            <ul className="space-y-1">
              {['Link 1', 'Link 2'].map(link => (
                <li key={link} className="text-xs text-muted-foreground hover:text-primary cursor-pointer">{link}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-4 border-t border-border text-center text-xs text-muted-foreground">
        © 2025 Company
      </div>
    </footer>
  )
}

function HeroSectionPreview() {
  return (
    <div className="w-full max-w-lg p-8 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl text-center">
      <h1 className="text-2xl font-bold text-foreground mb-2">Hero Title</h1>
      <p className="text-sm text-muted-foreground mb-4">Subtitle text goes here with more details.</p>
      <div className="flex gap-2 justify-center">
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm">Get Started</button>
        <button className="px-4 py-2 bg-muted text-foreground rounded-lg text-sm">Learn More</button>
      </div>
    </div>
  )
}

function FeatureGridPreview() {
  const features = [
    { icon: '⚡', title: 'Fast', desc: 'Lightning quick' },
    { icon: '🔒', title: 'Secure', desc: 'Enterprise grade' },
    { icon: '🎨', title: 'Beautiful', desc: 'Modern design' },
    { icon: '📱', title: 'Responsive', desc: 'Works everywhere' },
  ]
  return (
    <div className="w-full max-w-lg grid grid-cols-2 gap-4">
      {features.map(f => (
        <div key={f.title} className="p-4 bg-card border border-border rounded-lg text-center">
          <span className="text-2xl">{f.icon}</span>
          <h4 className="font-medium text-sm text-foreground mt-2">{f.title}</h4>
          <p className="text-xs text-muted-foreground">{f.desc}</p>
        </div>
      ))}
    </div>
  )
}

function PricingGridPreview() {
  const plans = [
    { name: 'Basic', price: '$9', popular: false },
    { name: 'Pro', price: '$29', popular: true },
    { name: 'Team', price: '$99', popular: false },
  ]
  return (
    <div className="w-full max-w-lg flex gap-3">
      {plans.map(p => (
        <div key={p.name} className={`flex-1 p-4 rounded-lg border ${p.popular ? 'bg-primary/5 border-primary' : 'bg-card border-border'}`}>
          {p.popular && <span className="text-xs text-primary font-medium">Popular</span>}
          <h4 className="font-medium text-foreground">{p.name}</h4>
          <p className="text-xl font-bold text-foreground">{p.price}<span className="text-xs text-muted-foreground">/mo</span></p>
          <button className={`w-full mt-3 py-2 rounded text-sm ${p.popular ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>Select</button>
        </div>
      ))}
    </div>
  )
}

function TeamGridPreview() {
  return (
    <div className="w-full max-w-md grid grid-cols-3 gap-4">
      {['Alice', 'Bob', 'Carol'].map(name => (
        <div key={name} className="text-center">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-accent rounded-full mb-2" />
          <p className="text-sm font-medium text-foreground">{name}</p>
          <p className="text-xs text-muted-foreground">Engineer</p>
        </div>
      ))}
    </div>
  )
}

function FAQLayoutPreview() {
  const [open, setOpen] = useState<number | null>(null)
  const faqs = [
    { q: 'What is this?', a: 'A FAQ component.' },
    { q: 'How does it work?', a: 'Click to expand.' },
  ]
  return (
    <div className="w-full max-w-sm space-y-2">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between p-3 bg-card text-left"
          >
            <span className="text-sm font-medium text-foreground">{faq.q}</span>
            <svg className={`w-4 h-4 transition-transform ${open === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open === i && (
            <div className="p-3 bg-muted/50 text-sm text-muted-foreground">{faq.a}</div>
          )}
        </div>
      ))}
    </div>
  )
}

function StatsGridPreview() {
  const stats = [
    { label: 'Users', value: '12.5K' },
    { label: 'Revenue', value: '$45K' },
    { label: 'Growth', value: '+24%' },
    { label: 'Active', value: '89%' },
  ]
  return (
    <div className="w-full max-w-lg grid grid-cols-4 gap-3">
      {stats.map(s => (
        <div key={s.label} className="p-3 bg-card border border-border rounded-lg text-center">
          <p className="text-xl font-bold text-foreground">{s.value}</p>
          <p className="text-xs text-muted-foreground">{s.label}</p>
        </div>
      ))}
    </div>
  )
}

function SplitViewPreview() {
  return (
    <div className="w-full max-w-lg h-40 flex border border-border rounded-lg overflow-hidden">
      <div className="w-1/2 bg-card p-4 border-r border-border">
        <h4 className="text-sm font-medium text-foreground mb-2">Editor</h4>
        <div className="h-16 bg-muted rounded" />
      </div>
      <div className="w-1/2 bg-muted/30 p-4">
        <h4 className="text-sm font-medium text-foreground mb-2">Preview</h4>
        <div className="h-16 bg-card border border-border rounded" />
      </div>
    </div>
  )
}

function TabsLayoutPreview() {
  const [active, setActive] = useState(0)
  const tabs = ['Overview', 'Analytics', 'Reports']
  return (
    <div className="w-full max-w-sm">
      <div className="flex border-b border-border">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActive(i)}
            className={`px-4 py-2 text-sm ${active === i ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="p-4 bg-card border border-t-0 border-border rounded-b-lg">
        <p className="text-sm text-muted-foreground">{tabs[active]} content area</p>
      </div>
    </div>
  )
}

function CardCarouselPreview() {
  return (
    <div className="w-full max-w-lg overflow-x-auto">
      <div className="flex gap-3 pb-2" style={{ width: 'max-content' }}>
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="w-32 p-3 bg-card border border-border rounded-lg flex-shrink-0">
            <div className="w-full h-20 bg-muted rounded mb-2" />
            <p className="text-xs text-foreground">Card {i}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function SidebarNavLayoutPreview() {
  const [active, setActive] = useState(0)
  const items = ['Home', 'Profile', 'Messages', 'Settings']
  return (
    <div className="w-full max-w-md h-40 flex border border-border rounded-lg overflow-hidden">
      <nav className="w-32 bg-card border-r border-border p-2 space-y-1">
        {items.map((item, i) => (
          <button
            key={item}
            onClick={() => setActive(i)}
            className={`w-full px-3 py-2 rounded text-sm text-left ${
              active === i ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            {item}
          </button>
        ))}
      </nav>
      <main className="flex-1 p-4 flex items-center justify-center">
        <span className="text-muted-foreground">{items[active]} Page</span>
      </main>
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
  {
    id: 'masonry',
    name: 'Masonry',
    description: 'A Pinterest-style masonry grid layout.',
    usage: `<div data-coral-masonry data-columns="3" data-gap="4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>`,
    props: [
      { name: 'data-columns', type: '2 | 3 | 4 | 5', default: '3', description: 'Number of columns' },
      { name: 'data-gap', type: '0-12', default: '4', description: 'Gap between items' },
    ],
    preview: MasonryPreview,
  },
  {
    id: 'spacer',
    name: 'Spacer',
    description: 'A flexible spacer that expands to fill available space.',
    usage: `<div data-coral-flex>
  <span>Left</span>
  <div data-coral-spacer></div>
  <span>Right</span>
</div>`,
    props: [
      { name: 'data-size', type: 'string', default: 'auto', description: 'Fixed size (e.g., "20px")' },
    ],
    preview: SpacerPreview,
  },
  {
    id: 'splitter',
    name: 'Splitter',
    description: 'A draggable splitter between two panels.',
    usage: `<div data-coral-splitter data-direction="horizontal">
  <div data-coral-splitter-panel>Panel A</div>
  <div data-coral-splitter-handle></div>
  <div data-coral-splitter-panel>Panel B</div>
</div>`,
    props: [
      { name: 'data-direction', type: '"horizontal" | "vertical"', default: '"horizontal"', description: 'Split direction' },
    ],
    preview: SplitterPreview,
  },
  {
    id: 'sticky',
    name: 'Sticky',
    description: 'A container that sticks to the viewport on scroll.',
    usage: `<div data-coral-sticky data-offset="80">
  <nav>Sticky Navigation</nav>
</div>`,
    props: [
      { name: 'data-offset', type: 'number', default: '0', description: 'Offset from top in pixels' },
      { name: 'data-boundary', type: 'string', default: 'undefined', description: 'Sticky boundary selector' },
    ],
    preview: StickyPreview,
  },
  {
    id: 'visually-hidden',
    name: 'VisuallyHidden',
    description: 'Hides content visually while keeping it accessible to screen readers.',
    usage: `<button>
  <svg><!-- icon --></svg>
  <span data-coral-visually-hidden>Close dialog</span>
</button>`,
    props: [
      { name: 'data-focusable', type: 'boolean', default: 'false', description: 'Show on focus' },
    ],
    preview: VisuallyHiddenPreview,
  },
  {
    id: 'responsive-hide',
    name: 'ResponsiveHide',
    description: 'Show or hide content based on viewport size.',
    usage: `<div data-coral-show="md">
  Only visible on medium screens and up
</div>
<div data-coral-hide="lg">
  Hidden on large screens
</div>`,
    props: [
      { name: 'data-show', type: '"sm" | "md" | "lg" | "xl"', default: 'undefined', description: 'Show at breakpoint' },
      { name: 'data-hide', type: '"sm" | "md" | "lg" | "xl"', default: 'undefined', description: 'Hide at breakpoint' },
    ],
    preview: ResponsiveHidePreview,
  },
  {
    id: 'overflow',
    name: 'Overflow',
    description: 'Utilities for handling text and content overflow.',
    usage: `<p data-coral-truncate>Long text that will be truncated...</p>
<p data-coral-line-clamp="2">Text clamped to 2 lines...</p>`,
    props: [
      { name: 'data-truncate', type: 'boolean', default: 'false', description: 'Single line truncation' },
      { name: 'data-line-clamp', type: '1-6', default: 'undefined', description: 'Multi-line clamp' },
    ],
    preview: OverflowPreview,
  },
  {
    id: 'section',
    name: 'Section',
    description: 'A semantic section wrapper with consistent spacing.',
    usage: `<section data-coral-section>
  <h2 data-coral-section-title>Section Title</h2>
  <div data-coral-section-content>Content here</div>
</section>`,
    props: [
      { name: 'data-spacing', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Vertical spacing' },
    ],
    preview: SectionPreview,
  },
  {
    id: 'wrap',
    name: 'Wrap',
    description: 'A flex container that wraps its children.',
    usage: `<div data-coral-wrap data-gap="2">
  <span>Tag 1</span>
  <span>Tag 2</span>
  <span>Tag 3</span>
</div>`,
    props: [
      { name: 'data-gap', type: '0-12', default: '2', description: 'Gap between items' },
      { name: 'data-justify', type: '"start" | "center" | "end"', default: '"start"', description: 'Justify content' },
    ],
    preview: WrapPreview,
  },
  {
    id: 'inline',
    name: 'Inline',
    description: 'Inline elements that flow within text content.',
    usage: `<p>Text with <span data-coral-inline data-variant="highlight">inline element</span> inside.</p>`,
    props: [
      { name: 'data-variant', type: '"default" | "highlight" | "badge"', default: '"default"', description: 'Display style' },
    ],
    preview: InlinePreview,
  },
  {
    id: 'box',
    name: 'Box',
    description: 'A versatile container with configurable styling.',
    usage: `<div data-coral-box data-shadow="md" data-rounded="lg">
  Content in a styled box
</div>`,
    props: [
      { name: 'data-shadow', type: '"none" | "sm" | "md" | "lg"', default: '"sm"', description: 'Box shadow' },
      { name: 'data-rounded', type: '"none" | "sm" | "md" | "lg" | "full"', default: '"md"', description: 'Border radius' },
      { name: 'data-border', type: 'boolean', default: 'true', description: 'Show border' },
    ],
    preview: BoxPreview,
  },
  {
    id: 'holy-grail',
    name: 'HolyGrail',
    description: 'Classic holy grail layout with header, footer, sidebar and main content.',
    usage: `<div data-coral-holy-grail>
  <header data-coral-holy-grail-header>Header</header>
  <aside data-coral-holy-grail-sidebar>Sidebar</aside>
  <main data-coral-holy-grail-main>Main</main>
  <aside data-coral-holy-grail-aside>Aside</aside>
  <footer data-coral-holy-grail-footer>Footer</footer>
</div>`,
    props: [
      { name: 'data-sidebar-width', type: 'string', default: '"200px"', description: 'Sidebar width' },
    ],
    preview: HolyGrailPreview,
  },
  {
    id: 'sidebar-layout',
    name: 'SidebarLayout',
    description: 'Main content area with collapsible sidebar.',
    usage: `<div data-coral-sidebar-layout>
  <aside data-coral-sidebar>Sidebar</aside>
  <main data-coral-main>Main Content</main>
</div>`,
    props: [
      { name: 'data-collapsed', type: 'boolean', default: 'false', description: 'Sidebar collapsed' },
      { name: 'data-side', type: '"left" | "right"', default: '"left"', description: 'Sidebar position' },
    ],
    preview: SidebarLayoutPreview,
  },
  {
    id: 'dashboard-layout',
    name: 'DashboardLayout',
    description: 'Multi-panel dashboard grid layout.',
    usage: `<div data-coral-dashboard-layout data-cols="3">
  <div data-coral-dashboard-panel data-colspan="2">Main Panel</div>
  <div data-coral-dashboard-panel>Side Panel</div>
</div>`,
    props: [
      { name: 'data-cols', type: '2 | 3 | 4', default: '3', description: 'Grid columns' },
      { name: 'data-gap', type: 'number', default: '4', description: 'Gap between panels' },
    ],
    preview: DashboardLayoutPreview,
  },
  {
    id: 'card-grid',
    name: 'CardGrid',
    description: 'Responsive card grid layout.',
    usage: `<div data-coral-card-grid data-cols="3">
  <div data-coral-card-item>Card 1</div>
  <div data-coral-card-item>Card 2</div>
</div>`,
    props: [
      { name: 'data-cols', type: '2 | 3 | 4', default: '3', description: 'Columns' },
      { name: 'data-gap', type: 'number', default: '4', description: 'Gap' },
    ],
    preview: CardGridPreview,
  },
  {
    id: 'timeline-layout',
    name: 'TimelineLayout',
    description: 'Vertical timeline layout for events.',
    usage: `<div data-coral-timeline>
  <div data-coral-timeline-item>
    <span data-coral-timeline-marker />
    <div data-coral-timeline-content>Event 1</div>
  </div>
</div>`,
    props: [
      { name: 'data-line-color', type: 'string', default: '"border"', description: 'Line color' },
    ],
    preview: TimelineLayoutPreview,
  },
  {
    id: 'kanban-board',
    name: 'KanbanBoard',
    description: 'Kanban-style board with draggable columns.',
    usage: `<div data-coral-kanban>
  <div data-coral-kanban-column>
    <h3 data-coral-kanban-title>Todo</h3>
    <div data-coral-kanban-card>Task 1</div>
  </div>
</div>`,
    props: [
      { name: 'data-draggable', type: 'boolean', default: 'true', description: 'Enable drag' },
    ],
    preview: KanbanBoardPreview,
  },
  {
    id: 'gallery-grid',
    name: 'GalleryGrid',
    description: 'Image gallery grid layout.',
    usage: `<div data-coral-gallery-grid data-cols="3">
  <img data-coral-gallery-item src="..." />
</div>`,
    props: [
      { name: 'data-cols', type: '2 | 3 | 4 | 5', default: '3', description: 'Columns' },
      { name: 'data-gap', type: 'number', default: '2', description: 'Gap' },
    ],
    preview: GalleryGridPreview,
  },
  {
    id: 'list-layout',
    name: 'ListLayout',
    description: 'Vertical list layout for items.',
    usage: `<div data-coral-list>
  <div data-coral-list-item>
    <div data-coral-list-icon />
    <div data-coral-list-content>Content</div>
  </div>
</div>`,
    props: [
      { name: 'data-dividers', type: 'boolean', default: 'true', description: 'Show dividers' },
    ],
    preview: ListLayoutPreview,
  },
  {
    id: 'panel-group',
    name: 'PanelGroup',
    description: 'Group of stacked panels.',
    usage: `<div data-coral-panel-group>
  <div data-coral-panel>Panel A</div>
  <div data-coral-panel>Panel B</div>
</div>`,
    props: [
      { name: 'data-spacing', type: 'number', default: '4', description: 'Space between panels' },
    ],
    preview: PanelGroupPreview,
  },
  {
    id: 'footer-layout',
    name: 'FooterLayout',
    description: 'Multi-column footer layout.',
    usage: `<footer data-coral-footer>
  <div data-coral-footer-column>Links</div>
  <div data-coral-footer-bottom>Copyright</div>
</footer>`,
    props: [
      { name: 'data-cols', type: '2 | 3 | 4', default: '3', description: 'Columns' },
    ],
    preview: FooterLayoutPreview,
  },
  {
    id: 'hero-section',
    name: 'HeroSection',
    description: 'Hero banner section with title and CTA.',
    usage: `<section data-coral-hero>
  <h1 data-coral-hero-title>Title</h1>
  <p data-coral-hero-subtitle>Subtitle</p>
  <div data-coral-hero-actions>
    <button>CTA</button>
  </div>
</section>`,
    props: [
      { name: 'data-centered', type: 'boolean', default: 'true', description: 'Center content' },
      { name: 'data-size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Height' },
    ],
    preview: HeroSectionPreview,
  },
  {
    id: 'feature-grid',
    name: 'FeatureGrid',
    description: 'Feature cards grid layout.',
    usage: `<div data-coral-feature-grid>
  <div data-coral-feature>
    <span data-coral-feature-icon>Icon</span>
    <h4 data-coral-feature-title>Title</h4>
  </div>
</div>`,
    props: [
      { name: 'data-cols', type: '2 | 3 | 4', default: '3', description: 'Columns' },
    ],
    preview: FeatureGridPreview,
  },
  {
    id: 'pricing-grid',
    name: 'PricingGrid',
    description: 'Pricing table grid layout.',
    usage: `<div data-coral-pricing-grid>
  <div data-coral-pricing-card data-popular>
    <h3>Pro</h3>
    <p data-coral-price>$29/mo</p>
  </div>
</div>`,
    props: [
      { name: 'data-highlight', type: 'string', default: '"popular"', description: 'Highlight card' },
    ],
    preview: PricingGridPreview,
  },
  {
    id: 'team-grid',
    name: 'TeamGrid',
    description: 'Team member cards grid.',
    usage: `<div data-coral-team-grid>
  <div data-coral-team-member>
    <img data-coral-team-avatar />
    <h4 data-coral-team-name>Name</h4>
  </div>
</div>`,
    props: [
      { name: 'data-cols', type: '2 | 3 | 4', default: '3', description: 'Columns' },
    ],
    preview: TeamGridPreview,
  },
  {
    id: 'faq-layout',
    name: 'FAQLayout',
    description: 'Expandable FAQ accordion layout.',
    usage: `<div data-coral-faq>
  <div data-coral-faq-item>
    <button data-coral-faq-question>Question?</button>
    <div data-coral-faq-answer>Answer</div>
  </div>
</div>`,
    props: [
      { name: 'data-multiple', type: 'boolean', default: 'false', description: 'Allow multiple open' },
    ],
    preview: FAQLayoutPreview,
  },
  {
    id: 'stats-grid',
    name: 'StatsGrid',
    description: 'Statistics dashboard grid.',
    usage: `<div data-coral-stats-grid>
  <div data-coral-stat>
    <span data-coral-stat-value>12.5K</span>
    <span data-coral-stat-label>Users</span>
  </div>
</div>`,
    props: [
      { name: 'data-cols', type: '2 | 3 | 4', default: '4', description: 'Columns' },
    ],
    preview: StatsGridPreview,
  },
  {
    id: 'split-view',
    name: 'SplitView',
    description: 'Side-by-side split view layout.',
    usage: `<div data-coral-split-view>
  <div data-coral-split-pane>Left</div>
  <div data-coral-split-pane>Right</div>
</div>`,
    props: [
      { name: 'data-ratio', type: '"50/50" | "33/67" | "67/33"', default: '"50/50"', description: 'Split ratio' },
    ],
    preview: SplitViewPreview,
  },
  {
    id: 'tabs-layout',
    name: 'TabsLayout',
    description: 'Tabbed content area layout.',
    usage: `<div data-coral-tabs-layout>
  <div data-coral-tabs-list>
    <button data-coral-tab data-active>Tab 1</button>
  </div>
  <div data-coral-tabs-content>Content</div>
</div>`,
    props: [
      { name: 'data-variant', type: '"line" | "solid"', default: '"line"', description: 'Tab style' },
    ],
    preview: TabsLayoutPreview,
  },
  {
    id: 'card-carousel',
    name: 'CardCarousel',
    description: 'Horizontal scrolling card carousel.',
    usage: `<div data-coral-card-carousel>
  <div data-coral-carousel-track>
    <div data-coral-carousel-item>Card 1</div>
  </div>
</div>`,
    props: [
      { name: 'data-scroll-snap', type: 'boolean', default: 'true', description: 'Enable snap' },
    ],
    preview: CardCarouselPreview,
  },
  {
    id: 'sidebar-nav-layout',
    name: 'SidebarNavLayout',
    description: 'Navigation sidebar with content area.',
    usage: `<div data-coral-sidebar-nav-layout>
  <nav data-coral-sidebar-nav>
    <a data-coral-nav-item data-active>Home</a>
  </nav>
  <main data-coral-nav-content>Content</main>
</div>`,
    props: [
      { name: 'data-collapsed', type: 'boolean', default: 'false', description: 'Collapse sidebar' },
    ],
    preview: SidebarNavLayoutPreview,
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
