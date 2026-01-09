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
