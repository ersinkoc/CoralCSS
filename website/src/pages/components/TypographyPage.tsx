import { ComponentPageLayout } from './ComponentPageLayout'

// Preview Components
function HeadingPreview() {
  return (
    <div className="space-y-4 w-full">
      <h1 data-coral-heading data-level="1">Heading 1</h1>
      <h2 data-coral-heading data-level="2">Heading 2</h2>
      <h3 data-coral-heading data-level="3">Heading 3</h3>
      <h4 data-coral-heading data-level="4">Heading 4</h4>
      <h5 data-coral-heading data-level="5">Heading 5</h5>
      <h6 data-coral-heading data-level="6">Heading 6</h6>
    </div>
  )
}

function TextPreview() {
  return (
    <div className="space-y-3 w-full max-w-md">
      <p data-coral-text data-size="xs">Extra Small Text (xs)</p>
      <p data-coral-text data-size="sm">Small Text (sm)</p>
      <p data-coral-text data-size="base">Base Text (base)</p>
      <p data-coral-text data-size="lg">Large Text (lg)</p>
      <p data-coral-text data-size="xl">Extra Large Text (xl)</p>
      <div data-coral-divider className="my-4" />
      <p data-coral-text data-weight="normal">Normal weight</p>
      <p data-coral-text data-weight="medium">Medium weight</p>
      <p data-coral-text data-weight="semibold">Semibold weight</p>
      <p data-coral-text data-weight="bold">Bold weight</p>
      <div data-coral-divider className="my-4" />
      <p data-coral-text data-color="muted">Muted text color</p>
      <p data-coral-text data-color="primary">Primary text color</p>
      <p data-coral-text data-color="error">Error text color</p>
    </div>
  )
}

function BlockquotePreview() {
  return (
    <div className="w-full max-w-md">
      <blockquote data-coral-blockquote>
        <p>
          "The best way to predict the future is to create it."
        </p>
        <cite data-coral-cite>— Peter Drucker</cite>
      </blockquote>
    </div>
  )
}

function HighlightPreview() {
  return (
    <div className="space-y-3 w-full max-w-md">
      <p className="text-foreground">
        This is some text with <span data-coral-highlight>highlighted content</span> in the middle.
      </p>
      <p className="text-foreground">
        Use <span data-coral-highlight data-color="success">success highlight</span> for positive emphasis.
      </p>
      <p className="text-foreground">
        Use <span data-coral-highlight data-color="warning">warning highlight</span> for caution.
      </p>
      <p className="text-foreground">
        Use <span data-coral-highlight data-color="error">error highlight</span> for errors.
      </p>
    </div>
  )
}

function CodePreview() {
  return (
    <div className="space-y-4 w-full max-w-md">
      <p className="text-foreground">
        Use <code data-coral-inline-code>inline code</code> for short snippets.
      </p>
      <div data-coral-code className="rounded-lg p-4">
        <pre className="text-sm font-mono">{`const greeting = "Hello, World!";
console.log(greeting);

function add(a, b) {
  return a + b;
}`}</pre>
      </div>
    </div>
  )
}

function GradientPreview() {
  return (
    <div className="space-y-4 text-center">
      <h2 data-coral-gradient data-from="primary" data-to="accent" className="text-4xl font-bold">
        Gradient Text
      </h2>
      <h2 data-coral-gradient data-from="info" data-to="success" className="text-4xl font-bold">
        Ocean Theme
      </h2>
      <h2 data-coral-gradient data-from="warning" data-via="destructive" data-to="primary" className="text-4xl font-bold">
        Sunset Vibes
      </h2>
    </div>
  )
}

function TruncatePreview() {
  return (
    <div className="space-y-4 w-full max-w-sm">
      <div>
        <span className="text-sm text-muted-foreground">Single line:</span>
        <p data-coral-truncate data-lines="1">
          This is a very long text that will be truncated at the end with an ellipsis.
        </p>
      </div>
      <div>
        <span className="text-sm text-muted-foreground">Two lines:</span>
        <p data-coral-truncate data-lines="2">
          This is a longer paragraph that will be truncated after two lines. It contains enough text to demonstrate the multi-line truncation feature with an ellipsis at the end.
        </p>
      </div>
    </div>
  )
}

function ProsePreview() {
  return (
    <article data-coral-prose className="w-full max-w-md">
      <h3>Article Title</h3>
      <p>
        This is a paragraph demonstrating prose typography. It has proper line height, letter spacing, and margins for comfortable reading.
      </p>
      <ul>
        <li>First list item</li>
        <li>Second list item</li>
        <li>Third list item</li>
      </ul>
      <p>
        The prose component ensures consistent typography across your content, making it perfect for blog posts, documentation, and articles.
      </p>
    </article>
  )
}

function ListPreview() {
  return (
    <div className="flex gap-8 w-full max-w-lg">
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-2">Unordered</h4>
        <ul data-coral-list data-type="unordered" className="space-y-1 text-muted-foreground">
          <li>First item</li>
          <li>Second item</li>
          <li>Third item</li>
        </ul>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-2">Ordered</h4>
        <ol data-coral-list data-type="ordered" className="space-y-1 text-muted-foreground list-decimal list-inside">
          <li>First step</li>
          <li>Second step</li>
          <li>Third step</li>
        </ol>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-2">Check</h4>
        <ul data-coral-list data-type="check" className="space-y-1">
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-muted-foreground">Completed</span>
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-muted-foreground">Done</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

function LinkPreview() {
  return (
    <div className="space-y-4 w-full max-w-md">
      <p className="text-muted-foreground">
        Check out our <a data-coral-link href="#">documentation</a> for more information.
      </p>
      <p className="text-muted-foreground">
        Visit <a data-coral-link data-variant="subtle" href="#">this page</a> for details.
      </p>
      <p className="text-muted-foreground">
        <a data-coral-link data-variant="underline" href="#">Underlined link</a> for emphasis.
      </p>
    </div>
  )
}

function LabelPreview() {
  return (
    <div className="space-y-4 w-full max-w-sm">
      <div>
        <label data-coral-label>Email Address</label>
        <input type="email" className="w-full px-3 py-2 bg-card border border-border rounded-lg" placeholder="you@example.com" />
      </div>
      <div>
        <label data-coral-label data-required>Password</label>
        <input type="password" className="w-full px-3 py-2 bg-card border border-border rounded-lg" placeholder="••••••••" />
      </div>
    </div>
  )
}

function DescriptionPreview() {
  return (
    <div className="w-full max-w-md">
      <dl data-coral-description-list>
        <div className="py-2 border-b border-border">
          <dt className="text-sm font-medium text-foreground">Full Name</dt>
          <dd className="text-sm text-muted-foreground">John Doe</dd>
        </div>
        <div className="py-2 border-b border-border">
          <dt className="text-sm font-medium text-foreground">Email</dt>
          <dd className="text-sm text-muted-foreground">john@example.com</dd>
        </div>
        <div className="py-2">
          <dt className="text-sm font-medium text-foreground">Role</dt>
          <dd className="text-sm text-muted-foreground">Administrator</dd>
        </div>
      </dl>
    </div>
  )
}

function MonoPreview() {
  return (
    <div className="space-y-4 w-full max-w-md">
      <p className="font-mono text-sm text-foreground">
        This is monospace text for technical content.
      </p>
      <p className="font-mono text-xs text-muted-foreground">
        const API_KEY = "sk-1234567890abcdef"
      </p>
      <div className="p-3 bg-muted rounded-lg">
        <p className="font-mono text-sm text-foreground">$ npm install @coral-css/core</p>
      </div>
    </div>
  )
}

function LeadPreview() {
  return (
    <div className="w-full max-w-lg">
      <p data-coral-lead className="text-xl text-muted-foreground leading-relaxed">
        A beautiful, modern CSS framework that helps you build stunning websites with ease. Start building your next project today.
      </p>
    </div>
  )
}

function SmallPreview() {
  return (
    <div className="space-y-3 w-full max-w-md">
      <p className="text-foreground">
        Regular text with <small data-coral-small>small text inline</small> for reference.
      </p>
      <small data-coral-small className="text-muted-foreground block">
        © 2025 CoralCSS. All rights reserved.
      </small>
      <small data-coral-small data-variant="muted" className="block">
        Last updated: January 2025
      </small>
    </div>
  )
}

function AbbreviationPreview() {
  return (
    <div className="w-full max-w-md">
      <p className="text-muted-foreground">
        The <abbr data-coral-abbr title="HyperText Markup Language" className="text-foreground border-b border-dotted border-muted-foreground cursor-help">HTML</abbr> specification
        is maintained by the <abbr data-coral-abbr title="World Wide Web Consortium" className="text-foreground border-b border-dotted border-muted-foreground cursor-help">W3C</abbr>.
      </p>
    </div>
  )
}

function SubscriptSuperscriptPreview() {
  return (
    <div className="space-y-4 w-full max-w-md">
      <p className="text-foreground">
        Water formula: H<sub className="text-muted-foreground">2</sub>O
      </p>
      <p className="text-foreground">
        Einstein's equation: E = mc<sup className="text-muted-foreground">2</sup>
      </p>
      <p className="text-foreground">
        1<sup className="text-muted-foreground">st</sup>, 2<sup className="text-muted-foreground">nd</sup>, 3<sup className="text-muted-foreground">rd</sup> place
      </p>
    </div>
  )
}

function KbdPreview() {
  return (
    <div className="space-y-4 w-full max-w-md">
      <p className="text-muted-foreground">
        Press <kbd data-coral-kbd className="px-2 py-1 bg-muted border border-border rounded text-xs font-mono">Ctrl</kbd> + <kbd data-coral-kbd className="px-2 py-1 bg-muted border border-border rounded text-xs font-mono">C</kbd> to copy
      </p>
      <p className="text-muted-foreground">
        Use <kbd data-coral-kbd className="px-2 py-1 bg-muted border border-border rounded text-xs font-mono">⌘</kbd> + <kbd data-coral-kbd className="px-2 py-1 bg-muted border border-border rounded text-xs font-mono">K</kbd> for search
      </p>
      <div className="flex gap-2">
        <kbd data-coral-kbd className="px-3 py-2 bg-card border border-border rounded shadow-sm text-sm font-mono">Esc</kbd>
        <kbd data-coral-kbd className="px-3 py-2 bg-card border border-border rounded shadow-sm text-sm font-mono">Enter ↵</kbd>
        <kbd data-coral-kbd className="px-3 py-2 bg-card border border-border rounded shadow-sm text-sm font-mono">Tab ⇥</kbd>
      </div>
    </div>
  )
}

function MarkPreview() {
  return (
    <div className="space-y-3 w-full max-w-md">
      <p className="text-muted-foreground">
        Search results for "<mark data-coral-mark className="bg-amber-200 dark:bg-amber-500/30 px-0.5 rounded">coral</mark>": Found 42 matches.
      </p>
      <p className="text-muted-foreground">
        <mark data-coral-mark data-variant="success" className="bg-emerald-200 dark:bg-emerald-500/30 px-0.5 rounded">Correct answer!</mark> Well done.
      </p>
    </div>
  )
}

function DropCapPreview() {
  return (
    <div className="w-full max-w-md">
      <p className="text-muted-foreground">
        <span data-coral-dropcap className="float-left text-5xl font-bold text-primary mr-2 leading-none">O</span>
        nce upon a time, in a land of beautiful code, there lived a CSS framework named Coral. It helped developers create stunning websites with ease.
      </p>
    </div>
  )
}

function StrikethroughPreview() {
  return (
    <div className="space-y-3 w-full max-w-md">
      <p className="text-muted-foreground">
        Regular price: <span data-coral-strikethrough className="line-through text-muted-foreground/60">$99</span> <span className="text-primary font-semibold">$49</span>
      </p>
      <p className="text-muted-foreground">
        <span data-coral-strikethrough className="line-through decoration-destructive">Deprecated feature</span> - no longer supported
      </p>
    </div>
  )
}

function TextAlignPreview() {
  return (
    <div className="w-full max-w-md space-y-4">
      <p data-coral-align="left" className="text-left text-muted-foreground p-2 bg-muted rounded">Left aligned text</p>
      <p data-coral-align="center" className="text-center text-muted-foreground p-2 bg-muted rounded">Center aligned text</p>
      <p data-coral-align="right" className="text-right text-muted-foreground p-2 bg-muted rounded">Right aligned text</p>
      <p data-coral-align="justify" className="text-justify text-muted-foreground p-2 bg-muted rounded">Justified text spreads across the line evenly.</p>
    </div>
  )
}

function LineHeightPreview() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div>
        <span className="text-xs text-muted-foreground">Tight (1.25)</span>
        <p data-coral-line-height="tight" className="leading-tight text-muted-foreground bg-muted p-2 rounded">
          This text has tight line height. Multiple lines will be closer together.
        </p>
      </div>
      <div>
        <span className="text-xs text-muted-foreground">Relaxed (1.75)</span>
        <p data-coral-line-height="relaxed" className="leading-relaxed text-muted-foreground bg-muted p-2 rounded">
          This text has relaxed line height. Multiple lines will be more spaced out.
        </p>
      </div>
    </div>
  )
}

function LetterSpacingPreview() {
  return (
    <div className="w-full max-w-md space-y-3">
      <p data-coral-tracking="tight" className="tracking-tight text-muted-foreground">Tight tracking (-0.025em)</p>
      <p data-coral-tracking="normal" className="tracking-normal text-muted-foreground">Normal tracking (0)</p>
      <p data-coral-tracking="wide" className="tracking-wide text-muted-foreground">Wide tracking (0.025em)</p>
      <p data-coral-tracking="widest" className="tracking-widest text-muted-foreground uppercase text-sm">Widest tracking (0.1em) - great for headers</p>
    </div>
  )
}

function WordBreakPreview() {
  return (
    <div className="w-full max-w-sm mx-auto space-y-4">
      <div>
        <span className="text-xs text-muted-foreground">break-words</span>
        <p data-coral-break="words" className="break-words bg-muted p-2 rounded text-muted-foreground">
          Supercalifragilisticexpialidocious andanotherverylongword
        </p>
      </div>
      <div>
        <span className="text-xs text-muted-foreground">break-all</span>
        <p data-coral-break="all" className="break-all bg-muted p-2 rounded text-muted-foreground">
          https://example.com/very/long/url/that/needs/breaking
        </p>
      </div>
    </div>
  )
}

function FirstLetterPreview() {
  return (
    <div className="w-full max-w-md">
      <p data-coral-first-letter className="text-muted-foreground first-letter:text-4xl first-letter:font-bold first-letter:text-primary first-letter:float-left first-letter:mr-2">
        Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed.
      </p>
    </div>
  )
}

function PlaceholderPreview() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div data-coral-placeholder className="h-20 bg-muted rounded-lg flex items-center justify-center">
        <span className="text-muted-foreground text-sm">Placeholder content</span>
      </div>
      <div className="space-y-2">
        <div data-coral-skeleton className="h-4 bg-muted rounded animate-pulse w-3/4" />
        <div data-coral-skeleton className="h-4 bg-muted rounded animate-pulse w-full" />
        <div data-coral-skeleton className="h-4 bg-muted rounded animate-pulse w-5/6" />
      </div>
    </div>
  )
}

function NumberStylePreview() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex gap-6">
        <div className="text-center">
          <span data-coral-number data-variant="display" className="text-5xl font-bold text-primary">42</span>
          <p className="text-xs text-muted-foreground">Display</p>
        </div>
        <div className="text-center">
          <span data-coral-number data-variant="tabular" className="font-mono text-2xl text-foreground tabular-nums">1,234,567</span>
          <p className="text-xs text-muted-foreground">Tabular</p>
        </div>
        <div className="text-center">
          <span data-coral-number data-variant="oldstyle" className="text-2xl text-foreground" style={{ fontFeatureSettings: '"onum"' }}>0123456789</span>
          <p className="text-xs text-muted-foreground">Old-style</p>
        </div>
      </div>
    </div>
  )
}

function InlineQuotePreview() {
  return (
    <div className="w-full max-w-md space-y-3">
      <p className="text-muted-foreground">
        As the saying goes, <q data-coral-quote className="italic text-foreground">"simplicity is the ultimate sophistication"</q>.
      </p>
      <p className="text-muted-foreground">
        The French say <q data-coral-quote lang="fr" className="italic text-foreground">«c'est la vie»</q>.
      </p>
    </div>
  )
}

function EmStrongPreview() {
  return (
    <div className="w-full max-w-md space-y-3">
      <p className="text-muted-foreground">
        Use <em data-coral-em className="italic text-foreground">emphasis</em> for stress or importance in context.
      </p>
      <p className="text-muted-foreground">
        Use <strong data-coral-strong className="font-bold text-foreground">strong</strong> for serious or urgent content.
      </p>
      <p className="text-muted-foreground">
        You can <em className="italic"><strong className="font-bold text-foreground">combine both</strong></em> for maximum impact!
      </p>
    </div>
  )
}

function FontVariantPreview() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div>
        <span className="text-xs text-muted-foreground">Small Caps</span>
        <p data-coral-variant="small-caps" className="text-foreground" style={{ fontVariant: 'small-caps' }}>
          The Quick Brown Fox Jumps Over The Lazy Dog
        </p>
      </div>
      <div>
        <span className="text-xs text-muted-foreground">All Small Caps</span>
        <p data-coral-variant="all-small-caps" className="text-foreground" style={{ fontVariantCaps: 'all-small-caps' }}>
          Typography Design Patterns
        </p>
      </div>
    </div>
  )
}

function BalanceTextPreview() {
  return (
    <div className="w-full max-w-md">
      <h3 data-coral-balance className="text-xl font-semibold text-foreground mb-2" style={{ textWrap: 'balance' as never }}>
        This is a headline that uses text balancing for better visual appearance
      </h3>
      <p className="text-muted-foreground text-sm">
        Text balancing helps prevent orphaned words and creates visually pleasing line breaks in headings.
      </p>
    </div>
  )
}

const typographyComponents = [
  {
    id: 'heading',
    name: 'Heading',
    description: 'Typography heading components from h1 to h6.',
    usage: `<h1 data-coral-heading data-level="1">Heading 1</h1>
<h2 data-coral-heading data-level="2">Heading 2</h2>
<h3 data-coral-heading data-level="3">Heading 3</h3>`,
    props: [
      { name: 'data-level', type: '"1" | "2" | "3" | "4" | "5" | "6"', default: '"1"', description: 'Heading level' },
      { name: 'data-gradient', type: 'boolean', default: 'false', description: 'Apply gradient text' },
    ],
    preview: HeadingPreview,
  },
  {
    id: 'text',
    name: 'Text',
    description: 'Text component with various sizes, weights, and colors.',
    usage: `<p data-coral-text data-size="lg">Large text</p>
<p data-coral-text data-weight="bold">Bold text</p>
<p data-coral-text data-color="muted">Muted text</p>`,
    props: [
      { name: 'data-size', type: '"xs" | "sm" | "base" | "lg" | "xl"', default: '"base"', description: 'Text size' },
      { name: 'data-weight', type: '"normal" | "medium" | "semibold" | "bold"', default: '"normal"', description: 'Font weight' },
      { name: 'data-color', type: '"default" | "muted" | "primary" | "error"', default: '"default"', description: 'Text color' },
    ],
    preview: TextPreview,
  },
  {
    id: 'blockquote',
    name: 'Blockquote',
    description: 'A styled blockquote for quotations.',
    usage: `<blockquote data-coral-blockquote>
  <p>The best way to predict the future is to create it.</p>
  <cite data-coral-cite>— Peter Drucker</cite>
</blockquote>`,
    props: [
      { name: 'data-variant', type: '"default" | "bordered" | "filled"', default: '"default"', description: 'Quote style' },
    ],
    preview: BlockquotePreview,
  },
  {
    id: 'highlight',
    name: 'Highlight',
    description: 'Highlighted text with background color.',
    usage: `<p>This is <span data-coral-highlight>highlighted text</span> in a sentence.</p>
<p>Use <span data-coral-highlight data-color="warning">warning highlight</span> for attention.</p>`,
    props: [
      { name: 'data-color', type: '"primary" | "success" | "warning" | "error"', default: '"primary"', description: 'Highlight color' },
    ],
    preview: HighlightPreview,
  },
  {
    id: 'code',
    name: 'Code',
    description: 'Inline and block code styling.',
    usage: `<code data-coral-code>inline code</code>

<pre data-coral-code-block>
  <code>const hello = "world";</code>
</pre>`,
    props: [
      { name: 'data-language', type: 'string', default: 'undefined', description: 'Programming language' },
      { name: 'data-line-numbers', type: 'boolean', default: 'false', description: 'Show line numbers' },
    ],
    preview: CodePreview,
  },
  {
    id: 'gradient',
    name: 'Gradient',
    description: 'Gradient text effects for headings and special text.',
    usage: `<span data-coral-gradient data-from="primary" data-to="accent">
  Gradient Text
</span>`,
    props: [
      { name: 'data-from', type: 'string', default: '"primary"', description: 'Start color' },
      { name: 'data-to', type: 'string', default: '"accent"', description: 'End color' },
      { name: 'data-direction', type: '"right" | "left" | "down" | "up"', default: '"right"', description: 'Gradient direction' },
    ],
    preview: GradientPreview,
  },
  {
    id: 'truncate',
    name: 'Truncate',
    description: 'Text truncation with ellipsis for overflow content.',
    usage: `<p data-coral-truncate data-lines="1">
  This is a very long text that will be truncated...
</p>

<p data-coral-truncate data-lines="3">
  Multi-line truncation with custom line count...
</p>`,
    props: [
      { name: 'data-lines', type: 'number', default: '1', description: 'Number of lines before truncation' },
    ],
    preview: TruncatePreview,
  },
  {
    id: 'prose',
    name: 'Prose',
    description: 'Beautiful typography for long-form content.',
    usage: `<article data-coral-prose>
  <h1>Article Title</h1>
  <p>This is a paragraph with proper typography...</p>
  <ul>
    <li>List item one</li>
    <li>List item two</li>
  </ul>
</article>`,
    props: [
      { name: 'data-size', type: '"sm" | "base" | "lg"', default: '"base"', description: 'Base font size' },
      { name: 'data-invert', type: 'boolean', default: 'false', description: 'Invert colors for dark backgrounds' },
    ],
    preview: ProsePreview,
  },
  {
    id: 'list',
    name: 'List',
    description: 'Styled lists with various types (unordered, ordered, checklist).',
    usage: `<ul data-coral-list data-type="unordered">
  <li>First item</li>
  <li>Second item</li>
</ul>
<ul data-coral-list data-type="check">
  <li data-checked>Completed</li>
</ul>`,
    props: [
      { name: 'data-type', type: '"unordered" | "ordered" | "check"', default: '"unordered"', description: 'List type' },
      { name: 'data-spacing', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Item spacing' },
    ],
    preview: ListPreview,
  },
  {
    id: 'link',
    name: 'Link',
    description: 'Styled anchor links with various visual treatments.',
    usage: `<a data-coral-link href="#">Default link</a>
<a data-coral-link data-variant="underline" href="#">Underlined</a>
<a data-coral-link data-variant="subtle" href="#">Subtle link</a>`,
    props: [
      { name: 'data-variant', type: '"default" | "underline" | "subtle"', default: '"default"', description: 'Link style' },
      { name: 'data-external', type: 'boolean', default: 'false', description: 'Show external icon' },
    ],
    preview: LinkPreview,
  },
  {
    id: 'label',
    name: 'Label',
    description: 'Form labels with required indicators and help text.',
    usage: `<label data-coral-label>Email</label>
<label data-coral-label data-required>Password</label>`,
    props: [
      { name: 'data-required', type: 'boolean', default: 'false', description: 'Show required asterisk' },
    ],
    preview: LabelPreview,
  },
  {
    id: 'description-list',
    name: 'DescriptionList',
    description: 'Definition lists for term-description pairs.',
    usage: `<dl data-coral-description-list>
  <dt>Name</dt>
  <dd>John Doe</dd>
</dl>`,
    props: [
      { name: 'data-layout', type: '"stacked" | "inline"', default: '"stacked"', description: 'Layout style' },
    ],
    preview: DescriptionPreview,
  },
  {
    id: 'mono',
    name: 'Mono',
    description: 'Monospace text for code snippets and technical content.',
    usage: `<span data-coral-mono>const x = 42</span>
<p data-coral-mono data-variant="block">Block of monospace text</p>`,
    props: [
      { name: 'data-variant', type: '"inline" | "block"', default: '"inline"', description: 'Display style' },
    ],
    preview: MonoPreview,
  },
  {
    id: 'lead',
    name: 'Lead',
    description: 'Lead paragraphs for introductions and summaries.',
    usage: `<p data-coral-lead>
  A beautiful, modern CSS framework that helps you build stunning websites.
</p>`,
    props: [
      { name: 'data-size', type: '"md" | "lg" | "xl"', default: '"lg"', description: 'Lead text size' },
    ],
    preview: LeadPreview,
  },
  {
    id: 'small',
    name: 'Small',
    description: 'Small text for footnotes, captions, and legal text.',
    usage: `<small data-coral-small>© 2025 CoralCSS</small>
<small data-coral-small data-variant="muted">Last updated: Jan 2025</small>`,
    props: [
      { name: 'data-variant', type: '"default" | "muted"', default: '"default"', description: 'Text style' },
    ],
    preview: SmallPreview,
  },
  {
    id: 'abbreviation',
    name: 'Abbreviation',
    description: 'Abbreviations with tooltip explanations.',
    usage: `<abbr data-coral-abbr title="HyperText Markup Language">HTML</abbr>`,
    props: [
      { name: 'title', type: 'string', default: 'required', description: 'Full text explanation' },
    ],
    preview: AbbreviationPreview,
  },
  {
    id: 'subscript-superscript',
    name: 'Subscript/Superscript',
    description: 'Subscript and superscript text for math and chemistry.',
    usage: `<p>H<sub>2</sub>O</p>
<p>E = mc<sup>2</sup></p>`,
    props: [],
    preview: SubscriptSuperscriptPreview,
  },
  {
    id: 'kbd',
    name: 'Kbd',
    description: 'Keyboard input display for shortcuts and keys.',
    usage: `<kbd data-coral-kbd>Ctrl</kbd> + <kbd data-coral-kbd>C</kbd>`,
    props: [
      { name: 'data-size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Key size' },
    ],
    preview: KbdPreview,
  },
  {
    id: 'mark',
    name: 'Mark',
    description: 'Highlighted/marked text for search results or emphasis.',
    usage: `<mark data-coral-mark>highlighted text</mark>
<mark data-coral-mark data-variant="success">success</mark>`,
    props: [
      { name: 'data-variant', type: '"default" | "success" | "warning" | "error"', default: '"default"', description: 'Mark style' },
    ],
    preview: MarkPreview,
  },
  {
    id: 'dropcap',
    name: 'DropCap',
    description: 'Large decorative first letter for articles.',
    usage: `<p><span data-coral-dropcap>O</span>nce upon a time...</p>`,
    props: [
      { name: 'data-lines', type: '2 | 3 | 4', default: '3', description: 'Lines to span' },
    ],
    preview: DropCapPreview,
  },
  {
    id: 'strikethrough',
    name: 'Strikethrough',
    description: 'Strikethrough text for deleted or deprecated content.',
    usage: `<span data-coral-strikethrough>old price</span>`,
    props: [
      { name: 'data-color', type: 'string', default: '"muted"', description: 'Line color' },
    ],
    preview: StrikethroughPreview,
  },
  {
    id: 'text-align',
    name: 'TextAlign',
    description: 'Text alignment utilities.',
    usage: `<p data-coral-align="center">Centered text</p>
<p data-coral-align="right">Right aligned</p>`,
    props: [
      { name: 'data-align', type: '"left" | "center" | "right" | "justify"', default: '"left"', description: 'Alignment' },
    ],
    preview: TextAlignPreview,
  },
  {
    id: 'line-height',
    name: 'LineHeight',
    description: 'Line height/leading utilities.',
    usage: `<p data-coral-line-height="tight">Tight leading</p>
<p data-coral-line-height="relaxed">Relaxed leading</p>`,
    props: [
      { name: 'data-line-height', type: '"tight" | "normal" | "relaxed" | "loose"', default: '"normal"', description: 'Line height' },
    ],
    preview: LineHeightPreview,
  },
  {
    id: 'letter-spacing',
    name: 'LetterSpacing',
    description: 'Letter spacing/tracking utilities.',
    usage: `<p data-coral-tracking="wide">Wide tracking</p>
<p data-coral-tracking="widest">Widest tracking</p>`,
    props: [
      { name: 'data-tracking', type: '"tighter" | "tight" | "normal" | "wide" | "wider" | "widest"', default: '"normal"', description: 'Tracking' },
    ],
    preview: LetterSpacingPreview,
  },
  {
    id: 'word-break',
    name: 'WordBreak',
    description: 'Word break and overflow utilities.',
    usage: `<p data-coral-break="words">Long text that breaks</p>
<p data-coral-break="all">Break anywhere</p>`,
    props: [
      { name: 'data-break', type: '"normal" | "words" | "all"', default: '"normal"', description: 'Break style' },
    ],
    preview: WordBreakPreview,
  },
  {
    id: 'first-letter',
    name: 'FirstLetter',
    description: 'Styled first letter for decorative paragraphs.',
    usage: `<p data-coral-first-letter>Typography is...</p>`,
    props: [
      { name: 'data-size', type: '"md" | "lg" | "xl"', default: '"lg"', description: 'Letter size' },
    ],
    preview: FirstLetterPreview,
  },
  {
    id: 'placeholder',
    name: 'Placeholder',
    description: 'Placeholder and skeleton text components.',
    usage: `<div data-coral-placeholder>Loading...</div>
<div data-coral-skeleton />`,
    props: [
      { name: 'data-animate', type: 'boolean', default: 'true', description: 'Animate skeleton' },
    ],
    preview: PlaceholderPreview,
  },
  {
    id: 'number-style',
    name: 'NumberStyle',
    description: 'Stylized number displays.',
    usage: `<span data-coral-number data-variant="display">42</span>
<span data-coral-number data-variant="tabular">1,234</span>`,
    props: [
      { name: 'data-variant', type: '"display" | "tabular" | "oldstyle"', default: '"tabular"', description: 'Number style' },
    ],
    preview: NumberStylePreview,
  },
  {
    id: 'inline-quote',
    name: 'InlineQuote',
    description: 'Inline quotation marks with proper localization.',
    usage: `<q data-coral-quote>quoted text</q>
<q data-coral-quote lang="fr">texte cité</q>`,
    props: [
      { name: 'lang', type: 'string', default: '"en"', description: 'Quote language' },
    ],
    preview: InlineQuotePreview,
  },
  {
    id: 'em-strong',
    name: 'Em/Strong',
    description: 'Emphasis and strong importance text.',
    usage: `<em data-coral-em>emphasized</em>
<strong data-coral-strong>important</strong>`,
    props: [],
    preview: EmStrongPreview,
  },
  {
    id: 'font-variant',
    name: 'FontVariant',
    description: 'Font variants like small-caps.',
    usage: `<span data-coral-variant="small-caps">Small Caps Text</span>`,
    props: [
      { name: 'data-variant', type: '"small-caps" | "all-small-caps" | "petite-caps"', default: '"small-caps"', description: 'Variant' },
    ],
    preview: FontVariantPreview,
  },
  {
    id: 'balance-text',
    name: 'BalanceText',
    description: 'CSS text-wrap balance for headings.',
    usage: `<h2 data-coral-balance>Balanced headline text</h2>`,
    props: [
      { name: 'data-balance', type: 'boolean', default: 'true', description: 'Enable balancing' },
    ],
    preview: BalanceTextPreview,
  },
]

function TypographyPage() {
  return (
    <ComponentPageLayout
      categoryName="Typography"
      categoryId="typography"
      components={typographyComponents}
      accessibilityFeatures={[
        'Semantic heading levels',
        'Proper text contrast',
        'Scalable font sizes',
        'Screen reader support',
      ]}
    />
  )
}

export default TypographyPage
