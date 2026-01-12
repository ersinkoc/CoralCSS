import { ComponentPageLayout } from './ComponentPageLayout'

// AI/ML UI component data
const aiComponents = [
  {
    id: 'prompt-input',
    name: 'PromptInput',
    description: 'A text input optimized for AI prompts with send button and character count.',
    usage: `<div class="relative border border-border rounded-xl bg-card shadow-sm">
  <textarea
    placeholder="Ask me anything..."
    rows="3"
    class="w-full px-4 py-3 pr-24 resize-none rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
  ></textarea>
  <div class="absolute bottom-3 right-3 flex items-center gap-2">
    <span class="text-xs text-muted-foreground opacity-70">0/4000</span>
    <button class="p-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors disabled:opacity-50">
      <svg class="w-5 h-5"><!-- send icon --></svg>
    </button>
  </div>
</div>`,
    props: [
      { name: 'data-max-length', type: 'number', default: '4000', description: 'Maximum character limit' },
      { name: 'data-show-count', type: 'boolean', default: 'true', description: 'Show character count' },
    ],
    preview: PromptInputPreview,
  },
  {
    id: 'streaming-text',
    name: 'StreamingText',
    description: 'Text component that displays streaming AI responses with typing animation.',
    usage: `<div class="prose prose-coral">
  <p>
    Here's the response text that appears
    <span class="inline-block w-2 h-5 bg-primary animate-pulse ml-0.5"></span>
  </p>
</div>`,
    props: [
      { name: 'data-cursor', type: 'boolean', default: 'true', description: 'Show blinking cursor' },
      { name: 'data-speed', type: 'number', default: '30', description: 'Characters per second' },
    ],
    preview: StreamingTextPreview,
  },
  {
    id: 'model-selector',
    name: 'ModelSelector',
    description: 'Dropdown for selecting AI models with capability indicators.',
    usage: `<div class="relative">
  <button class="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted rounded-lg transition-colors">
    <span class="w-2 h-2 bg-success rounded-full"></span>
    <span class="font-medium">Claude 3.5 Sonnet</span>
    <svg class="w-4 h-4"><!-- chevron --></svg>
  </button>

  <div class="absolute top-full mt-2 w-72 bg-card border border-border rounded-xl shadow-lg p-2 z-10">
    <button class="w-full flex items-center gap-3 p-3 hover:bg-muted/50 rounded-lg">
      <span class="w-2 h-2 bg-info rounded-full"></span>
      <div class="flex-1 text-left">
        <p class="font-medium">Claude 3 Opus</p>
        <p class="text-xs text-muted-foreground">Most capable, best for complex tasks</p>
      </div>
    </button>
    <button class="w-full flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
      <span class="w-2 h-2 bg-success rounded-full"></span>
      <div class="flex-1 text-left">
        <p class="font-medium text-primary">Claude 3.5 Sonnet</p>
        <p class="text-xs text-muted-foreground">Fast and intelligent</p>
      </div>
      <svg class="w-4 h-4 text-primary"><!-- check --></svg>
    </button>
  </div>
</div>`,
    props: [
      { name: 'data-models', type: 'Model[]', default: '[]', description: 'Available models' },
      { name: 'data-show-capabilities', type: 'boolean', default: 'true', description: 'Show model capabilities' },
    ],
    preview: ModelSelectorPreview,
  },
  {
    id: 'token-counter',
    name: 'TokenCounter',
    description: 'Displays token usage with visual progress indicator.',
    usage: `<div class="flex items-center gap-3 text-sm">
  <div class="flex-1">
    <div class="flex justify-between mb-1">
      <span class="text-muted-foreground">Tokens used</span>
      <span class="font-medium">1,234 / 4,096</span>
    </div>
    <div class="h-2 bg-muted rounded-full overflow-hidden">
      <div class="h-full bg-primary rounded-full" style="width: 30%"></div>
    </div>
  </div>
</div>`,
    props: [
      { name: 'data-used', type: 'number', default: '0', description: 'Tokens used' },
      { name: 'data-max', type: 'number', default: '4096', description: 'Maximum tokens' },
    ],
    preview: TokenCounterPreview,
  },
  {
    id: 'ai-message',
    name: 'AIMessage',
    description: 'A message bubble styled for AI assistant responses.',
    usage: `<div class="flex gap-4">
  <div class="w-8 h-8 rounded-lg flex items-center justify-center text-primary-foreground flex-shrink-0" style="background: linear-gradient(to bottom right, hsl(var(--primary) / 0.8), hsl(var(--primary) / 1))">
    <svg class="w-5 h-5"><!-- AI icon --></svg>
  </div>
  <div class="flex-1 prose prose-sm prose-coral max-w-none">
    <p>Here's a helpful response from the AI assistant. It can include <strong>formatting</strong>, <code>code snippets</code>, and more.</p>
  </div>
</div>`,
    props: [
      { name: 'data-model', type: 'string', default: '""', description: 'Model name to display' },
    ],
    preview: AIMessagePreview,
  },
  {
    id: 'code-block',
    name: 'AICodeBlock',
    description: 'Code block with syntax highlighting, copy button, and language label.',
    usage: `<div class="relative group">
  <div class="flex items-center justify-between px-4 py-2 bg-gray-800 rounded-t-lg">
    <span class="text-xs text-muted-foreground/70">typescript</span>
    <button class="text-muted-foreground/70 hover:text-white transition-colors">
      <svg class="w-4 h-4"><!-- copy icon --></svg>
    </button>
  </div>
  <pre class="p-4 bg-gray-900 rounded-b-lg overflow-x-auto">
    <code class="text-sm text-gray-100">
function greet(name: string) {
  return \`Hello, \${name}!\`;
}
    </code>
  </pre>
</div>`,
    props: [
      { name: 'data-language', type: 'string', default: '""', description: 'Programming language' },
      { name: 'data-line-numbers', type: 'boolean', default: 'false', description: 'Show line numbers' },
    ],
    preview: AICodeBlockPreview,
  },
  {
    id: 'thinking-indicator',
    name: 'ThinkingIndicator',
    description: 'Shows AI is processing with animated dots or spinner.',
    usage: `<div class="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
  <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="background: linear-gradient(to bottom right, hsl(var(--primary) / 0.8), hsl(var(--primary) / 1))">
    <div class="w-4 h-4 border-2 border-white border-t border-border-transparent rounded-full animate-spin"></div>
  </div>
  <div>
    <p class="font-medium text-foreground">Thinking...</p>
    <p class="text-sm text-muted-foreground">Analyzing your request</p>
  </div>
</div>`,
    props: [
      { name: 'data-message', type: 'string', default: '"Thinking..."', description: 'Status message' },
    ],
    preview: ThinkingIndicatorPreview,
  },
  {
    id: 'suggestion-chips',
    name: 'SuggestionChips',
    description: 'Clickable prompt suggestions for common queries.',
    usage: `<div class="flex flex-wrap gap-2">
  <button class="px-4 py-2 bg-muted hover:bg-muted rounded-full text-sm transition-colors">
    Explain this code
  </button>
  <button class="px-4 py-2 bg-muted hover:bg-muted rounded-full text-sm transition-colors">
    Write tests
  </button>
  <button class="px-4 py-2 bg-muted hover:bg-muted rounded-full text-sm transition-colors">
    Improve performance
  </button>
  <button class="px-4 py-2 bg-muted hover:bg-muted rounded-full text-sm transition-colors">
    Add documentation
  </button>
</div>`,
    props: [
      { name: 'data-suggestions', type: 'string[]', default: '[]', description: 'List of suggestions' },
    ],
    preview: SuggestionChipsPreview,
  },
  {
    id: 'response-actions',
    name: 'ResponseActions',
    description: 'Action buttons for AI responses (copy, regenerate, feedback).',
    usage: `<div class="flex items-center gap-1 mt-2">
  <button class="p-2 text-muted-foreground/70 hover:text-muted-foreground hover:bg-muted rounded-lg transition-colors">
    <svg class="w-4 h-4"><!-- copy icon --></svg>
  </button>
  <button class="p-2 text-muted-foreground/70 hover:text-muted-foreground hover:bg-muted rounded-lg transition-colors">
    <svg class="w-4 h-4"><!-- regenerate icon --></svg>
  </button>
  <div class="w-px h-4 bg-muted mx-1"></div>
  <button class="p-2 text-muted-foreground opacity-70 hover:text-success hover:bg-success/10 rounded-lg transition-colors">
    <svg class="w-4 h-4"><!-- thumbs up --></svg>
  </button>
  <button class="p-2 text-muted-foreground opacity-70 hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
    <svg class="w-4 h-4"><!-- thumbs down --></svg>
  </button>
</div>`,
    props: [
      { name: 'data-show-feedback', type: 'boolean', default: 'true', description: 'Show feedback buttons' },
    ],
    preview: ResponseActionsPreview,
  },
  {
    id: 'context-file',
    name: 'ContextFile',
    description: 'Shows files attached as context for the AI.',
    usage: `<div class="flex items-center gap-2 p-2 bg-muted/50 border rounded-lg max-w-xs">
  <div class="w-8 h-8 bg-info/20 text-info rounded flex items-center justify-center flex-shrink-0">
    <svg class="w-4 h-4"><!-- file icon --></svg>
  </div>
  <div class="flex-1 min-w-0">
    <p class="text-sm font-medium truncate">app.tsx</p>
    <p class="text-xs text-muted-foreground">2.4 KB</p>
  </div>
  <button class="p-1 text-muted-foreground/70 hover:text-muted-foreground">
    <svg class="w-4 h-4"><!-- x icon --></svg>
  </button>
</div>`,
    props: [
      { name: 'data-filename', type: 'string', default: '""', description: 'File name' },
      { name: 'data-removable', type: 'boolean', default: 'true', description: 'Can be removed' },
    ],
    preview: ContextFilePreview,
  },
  {
    id: 'conversation-history',
    name: 'ConversationHistory',
    description: 'Sidebar showing conversation history.',
    usage: `<div class="w-64 border-r border-border h-full">
  <div class="p-4 border-b border-border">
    <button class="w-full flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors">
      <svg class="w-4 h-4"><!-- plus icon --></svg>
      New Chat
    </button>
  </div>
  <div class="p-2 space-y-1">
    <button class="w-full text-left px-3 py-2 bg-muted rounded-lg">
      <p class="font-medium text-sm truncate">React component help</p>
      <p class="text-xs text-muted-foreground">2 hours ago</p>
    </button>
    <button class="w-full text-left px-3 py-2 hover:bg-muted/50 rounded-lg">
      <p class="font-medium text-sm truncate">API integration</p>
      <p class="text-xs text-muted-foreground">Yesterday</p>
    </button>
  </div>
</div>`,
    props: [],
    preview: ConversationHistoryPreview,
  },
  {
    id: 'system-prompt',
    name: 'SystemPrompt',
    description: 'Editable system prompt configuration panel.',
    usage: `<div class="border rounded-xl overflow-hidden">
  <div class="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
    <span class="font-medium text-sm">System Prompt</span>
    <button class="text-sm text-primary hover:opacity-80">Reset</button>
  </div>
  <textarea
    placeholder="You are a helpful assistant..."
    rows="4"
    class="w-full p-4 resize-none focus:outline-none"
  ></textarea>
</div>`,
    props: [
      { name: 'data-default', type: 'string', default: '""', description: 'Default system prompt' },
    ],
    preview: SystemPromptPreview,
  },
  {
    id: 'parameter-slider',
    name: 'ParameterSlider',
    description: 'Slider for adjusting AI parameters like temperature.',
    usage: `<div class="space-y-4">
  <div>
    <div class="flex justify-between mb-2">
      <label class="text-sm font-medium">Temperature</label>
      <span class="text-sm text-muted-foreground">0.7</span>
    </div>
    <input type="range" min="0" max="2" step="0.1" value="0.7" class="w-full accent-primary" style="accent-color: hsl(var(--primary))" />
    <div class="flex justify-between text-xs text-muted-foreground opacity-70 mt-1">
      <span>Precise</span>
      <span>Creative</span>
    </div>
  </div>
</div>`,
    props: [
      { name: 'data-min', type: 'number', default: '0', description: 'Minimum value' },
      { name: 'data-max', type: 'number', default: '2', description: 'Maximum value' },
      { name: 'data-step', type: 'number', default: '0.1', description: 'Step increment' },
    ],
    preview: ParameterSliderPreview,
  },
  {
    id: 'stop-button',
    name: 'StopButton',
    description: 'Button to stop AI generation.',
    usage: `<button class="flex items-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition-colors">
  <svg class="w-4 h-4"><!-- stop icon --></svg>
  Stop generating
</button>`,
    props: [
      { name: 'data-generating', type: 'boolean', default: 'false', description: 'Is currently generating' },
    ],
    preview: StopButtonPreview,
  },
  {
    id: 'cost-estimate',
    name: 'CostEstimate',
    description: 'Shows estimated cost for the current conversation.',
    usage: `<div class="flex items-center gap-2 text-sm text-muted-foreground">
  <svg class="w-4 h-4"><!-- dollar icon --></svg>
  <span>Estimated cost: <span class="font-medium text-foreground">$0.024</span></span>
</div>`,
    props: [
      { name: 'data-cost', type: 'number', default: '0', description: 'Current cost in dollars' },
    ],
    preview: CostEstimatePreview,
  },
  {
    id: 'model-comparison',
    name: 'ModelComparison',
    description: 'Side-by-side comparison of model responses.',
    usage: `<div class="grid md:grid-cols-2 gap-4">
  <div class="border rounded-xl overflow-hidden">
    <div class="px-4 py-2 bg-info/10 border-b border-border flex items-center gap-2">
      <span class="w-2 h-2 bg-info rounded-full"></span>
      <span class="font-medium text-info">GPT-4</span>
    </div>
    <div class="p-4 prose prose-sm">
      <p>Response from GPT-4...</p>
    </div>
  </div>
  <div class="border rounded-xl overflow-hidden">
    <div class="px-4 py-2 bg-primary/10 border-b border-border flex items-center gap-2">
      <span class="w-2 h-2 bg-primary rounded-full"></span>
      <span class="font-medium text-primary">Claude</span>
    </div>
    <div class="p-4 prose prose-sm">
      <p>Response from Claude...</p>
    </div>
  </div>
</div>`,
    props: [],
    preview: ModelComparisonPreview,
  },
  {
    id: 'image-generation',
    name: 'ImageGeneration',
    description: 'Loading state and result display for AI image generation.',
    usage: `<div class="space-y-4">
  <!-- Loading state -->
  <div class="aspect-square bg-muted rounded-xl flex items-center justify-center">
    <div class="text-center">
      <div class="w-12 h-12 border-4 border-primary border-t border-border-transparent rounded-full animate-spin mx-auto"></div>
      <p class="mt-4 text-muted-foreground">Generating image...</p>
      <p class="text-sm text-muted-foreground opacity-70">This may take a few seconds</p>
    </div>
  </div>

  <!-- Result -->
  <div class="relative group">
    <img src="generated.jpg" class="rounded-xl" />
    <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
      <button class="p-2 bg-card rounded-lg">Download</button>
      <button class="p-2 bg-card rounded-lg">Regenerate</button>
    </div>
  </div>
</div>`,
    props: [],
    preview: ImageGenerationPreview,
  },
  {
    id: 'error-message',
    name: 'AIErrorMessage',
    description: 'Error display for failed AI requests.',
    usage: `<div class="flex items-start gap-3 p-4 bg-destructive/10 border border-r border-destructive/30 rounded-xl">
  <svg class="w-5 h-5 text-destructive flex-shrink-0 mt-0.5"><!-- error icon --></svg>
  <div>
    <p class="font-medium text-destructive">Rate limit exceeded</p>
    <p class="text-sm text-destructive mt-1">Please wait a moment before trying again.</p>
    <button class="mt-2 text-sm text-destructive hover:opacity-80 font-medium">
      Try again
    </button>
  </div>
</div>`,
    props: [
      { name: 'data-type', type: '"rate_limit" | "network" | "server" | "token_limit"', default: '"server"', description: 'Error type' },
    ],
    preview: AIErrorMessagePreview,
  },
]

// Preview components
function PromptInputPreview() {
  return (
    <div className="relative border border-border rounded-xl bg-card shadow-sm max-w-xl">
      <textarea
        placeholder="Ask me anything..."
        rows={3}
        className="w-full px-4 py-3 pr-24 resize-none rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
        defaultValue=""
      ></textarea>
      <div className="absolute bottom-3 right-3 flex items-center gap-2">
        <span className="text-xs text-muted-foreground opacity-70">0/4000</span>
        <button className="p-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors disabled:opacity-50">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  )
}

function StreamingTextPreview() {
  return (
    <div className="prose prose-coral max-w-xl">
      <p>
        Here's the response text that appears as the AI generates it
        <span className="inline-block w-2 h-5 bg-primary animate-pulse ml-0.5 align-middle"></span>
      </p>
    </div>
  )
}

function ModelSelectorPreview() {
  return (
    <div className="flex gap-4">
      <button className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted rounded-lg transition-colors">
        <span className="w-2 h-2 bg-success rounded-full"></span>
        <span className="font-medium">Claude 3.5 Sonnet</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className="w-72 bg-card border border-border rounded-xl shadow-lg p-2">
        <button className="w-full flex items-center gap-3 p-3 hover:bg-muted/50 rounded-lg text-left">
          <span className="w-2 h-2 bg-info rounded-full"></span>
          <div className="flex-1">
            <p className="font-medium">Claude 3 Opus</p>
            <p className="text-xs text-muted-foreground">Most capable</p>
          </div>
        </button>
        <button className="w-full flex items-center gap-3 p-3 bg-primary/10 rounded-lg text-left">
          <span className="w-2 h-2 bg-success rounded-full"></span>
          <div className="flex-1">
            <p className="font-medium text-primary">Claude 3.5 Sonnet</p>
            <p className="text-xs text-muted-foreground">Fast & intelligent</p>
          </div>
          <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </button>
        <button className="w-full flex items-center gap-3 p-3 hover:bg-muted/50 rounded-lg text-left">
          <span className="w-2 h-2 bg-chart-4 rounded-full"></span>
          <div className="flex-1">
            <p className="font-medium">Claude 3 Haiku</p>
            <p className="text-xs text-muted-foreground">Fastest</p>
          </div>
        </button>
      </div>
    </div>
  )
}

function TokenCounterPreview() {
  return (
    <div className="max-w-sm space-y-4">
      <div>
        <div className="flex justify-between mb-1 text-sm">
          <span className="text-muted-foreground">Tokens used</span>
          <span className="font-medium">1,234 / 4,096</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: '30%' }}></div>
        </div>
      </div>
      <div>
        <div className="flex justify-between mb-1 text-sm">
          <span className="text-muted-foreground">Tokens used</span>
          <span className="font-medium text-warning">3,500 / 4,096</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-warning rounded-full transition-all" style={{ width: '85%' }}></div>
        </div>
      </div>
    </div>
  )
}

function AIMessagePreview() {
  return (
    <div className="flex gap-4 max-w-2xl">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-primary-foreground flex-shrink-0" style={{ background: 'linear-gradient(to bottom right, hsl(var(--primary) / 0.8), hsl(var(--primary) / 1))' }}>
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>
      <div className="flex-1">
        <div className="prose prose-sm prose-coral max-w-none">
          <p>Here's a helpful response from the AI assistant. It can include <strong>formatting</strong>, <code>code snippets</code>, and structured content.</p>
          <ul>
            <li>First point with explanation</li>
            <li>Second point with details</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function AICodeBlockPreview() {
  return (
    <div className="relative group max-w-xl">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 rounded-t-lg">
        <span className="text-xs text-muted-foreground/70">typescript</span>
        <button className="text-muted-foreground/70 hover:text-white transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
      <pre className="p-4 bg-gray-900 rounded-b-lg overflow-x-auto">
        <code className="text-sm text-gray-100">{`function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));`}</code>
      </pre>
    </div>
  )
}

function ThinkingIndicatorPreview() {
  return (
    <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl w-full max-w-md mx-auto">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, hsl(var(--primary) / 0.8), hsl(var(--primary) / 1))' }}>
        <div className="w-4 h-4 border-2 border-white border-t border-border-transparent rounded-full animate-spin"></div>
      </div>
      <div>
        <p className="font-medium text-foreground">Thinking...</p>
        <p className="text-sm text-muted-foreground">Analyzing your request</p>
      </div>
    </div>
  )
}

function SuggestionChipsPreview() {
  const suggestions = ['Explain this code', 'Write tests', 'Improve performance', 'Add documentation', 'Find bugs']
  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((s, i) => (
        <button key={i} className="px-4 py-2 bg-muted hover:bg-muted rounded-full text-sm transition-colors">
          {s}
        </button>
      ))}
    </div>
  )
}

function ResponseActionsPreview() {
  return (
    <div className="flex items-center gap-1">
      <button className="p-2 text-muted-foreground opacity-70 hover:text-muted-foreground hover:bg-muted rounded-lg transition-colors">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </button>
      <button className="p-2 text-muted-foreground opacity-70 hover:text-muted-foreground hover:bg-muted rounded-lg transition-colors">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
      <div className="w-px h-4 bg-muted mx-1"></div>
      <button className="p-2 text-muted-foreground opacity-70 hover:text-success hover:bg-success/10 rounded-lg transition-colors">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
      </button>
      <button className="p-2 text-muted-foreground opacity-70 hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
        </svg>
      </button>
    </div>
  )
}

function ContextFilePreview() {
  return (
    <div className="flex flex-wrap gap-2">
      <div className="flex items-center gap-2 p-2 bg-muted/50 border rounded-lg">
        <div className="w-8 h-8 bg-info/20 text-info rounded flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium truncate">app.tsx</p>
          <p className="text-xs text-muted-foreground">2.4 KB</p>
        </div>
        <button className="p-1 text-muted-foreground/70 hover:text-muted-foreground">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex items-center gap-2 p-2 bg-muted/50 border rounded-lg">
        <div className="w-8 h-8 bg-success/20 text-success rounded flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium truncate">utils.ts</p>
          <p className="text-xs text-muted-foreground">1.1 KB</p>
        </div>
        <button className="p-1 text-muted-foreground/70 hover:text-muted-foreground">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

function ConversationHistoryPreview() {
  return (
    <div className="w-full max-w-sm mx-auto border border-border rounded-xl overflow-hidden">
      <div className="p-3 border-b border-border">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors text-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Chat
        </button>
      </div>
      <div className="p-2 space-y-1">
        <button className="w-full text-left px-3 py-2 bg-muted rounded-lg">
          <p className="font-medium text-sm truncate">React component help</p>
          <p className="text-xs text-muted-foreground">2 hours ago</p>
        </button>
        <button className="w-full text-left px-3 py-2 hover:bg-muted/50 rounded-lg">
          <p className="font-medium text-sm truncate">API integration</p>
          <p className="text-xs text-muted-foreground">Yesterday</p>
        </button>
        <button className="w-full text-left px-3 py-2 hover:bg-muted/50 rounded-lg">
          <p className="font-medium text-sm truncate">Database schema design</p>
          <p className="text-xs text-muted-foreground">3 days ago</p>
        </button>
      </div>
    </div>
  )
}

function SystemPromptPreview() {
  return (
    <div className="border rounded-xl overflow-hidden w-full max-w-xl mx-auto">
      <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
        <span className="font-medium text-sm">System Prompt</span>
        <button className="text-sm text-primary hover:opacity-80">Reset</button>
      </div>
      <textarea
        placeholder="You are a helpful assistant..."
        rows={4}
        className="w-full p-4 resize-none focus:outline-none text-sm"
        defaultValue="You are a helpful coding assistant. Provide clear, concise answers with code examples when relevant."
      ></textarea>
    </div>
  )
}

function ParameterSliderPreview() {
  return (
    <div className="space-y-6 w-full max-w-md mx-auto">
      <div>
        <div className="flex justify-between mb-2">
          <label className="text-sm font-medium">Temperature</label>
          <span className="text-sm text-muted-foreground">0.7</span>
        </div>
        <input type="range" min="0" max="2" step="0.1" defaultValue="0.7" className="w-full" style={{ accentColor: 'hsl(var(--primary))' }} />
        <div className="flex justify-between text-xs text-muted-foreground opacity-70 mt-1">
          <span>Precise</span>
          <span>Creative</span>
        </div>
      </div>
      <div>
        <div className="flex justify-between mb-2">
          <label className="text-sm font-medium">Max Tokens</label>
          <span className="text-sm text-muted-foreground">2048</span>
        </div>
        <input type="range" min="256" max="4096" step="256" defaultValue="2048" className="w-full" style={{ accentColor: 'hsl(var(--primary))' }} />
      </div>
    </div>
  )
}

function StopButtonPreview() {
  return (
    <div className="flex gap-4">
      <button className="flex items-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition-colors">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <rect x="6" y="6" width="12" height="12" rx="2" />
        </svg>
        Stop generating
      </button>
      <button className="flex items-center gap-2 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted/50 transition-colors" disabled>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <rect x="6" y="6" width="12" height="12" rx="2" />
        </svg>
        Stop
      </button>
    </div>
  )
}

function CostEstimatePreview() {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <div className="flex items-center gap-2 text-muted-foreground">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Estimated cost: <span className="font-medium text-foreground">$0.024</span></span>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Session total: <span className="font-medium text-foreground">$0.156</span></span>
      </div>
    </div>
  )
}

function ModelComparisonPreview() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="border rounded-xl overflow-hidden">
        <div className="px-4 py-2 bg-info/10 border-b border-border flex items-center gap-2">
          <span className="w-2 h-2 bg-info rounded-full"></span>
          <span className="font-medium text-info">GPT-4</span>
        </div>
        <div className="p-4 text-sm text-muted-foreground">
          <p>Response from GPT-4 model...</p>
        </div>
      </div>
      <div className="border rounded-xl overflow-hidden">
        <div className="px-4 py-2 bg-primary/10 border-b border-border flex items-center gap-2">
          <span className="w-2 h-2 bg-primary rounded-full"></span>
          <span className="font-medium text-primary">Claude</span>
        </div>
        <div className="p-4 text-sm text-muted-foreground">
          <p>Response from Claude model...</p>
        </div>
      </div>
    </div>
  )
}

function ImageGenerationPreview() {
  return (
    <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
      <div className="aspect-square bg-muted rounded-xl flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t border-border-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Generating image...</p>
          <p className="text-sm text-muted-foreground opacity-70">This may take a few seconds</p>
        </div>
      </div>
      <div className="relative group aspect-square rounded-xl flex items-center justify-center text-white" style={{ background: 'linear-gradient(to bottom right, hsl(var(--chart-4) / 0.8), hsl(var(--primary) / 0.9))' }}>
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
        </svg>
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
          <button className="px-3 py-1.5 bg-card text-foreground rounded-lg text-sm font-medium">Download</button>
          <button className="px-3 py-1.5 bg-card text-foreground rounded-lg text-sm font-medium">Regenerate</button>
        </div>
      </div>
    </div>
  )
}

function AIErrorMessagePreview() {
  return (
    <div className="space-y-4 w-full max-w-xl mx-auto">
      <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/30 rounded-xl">
        <svg className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <p className="font-medium text-destructive">Rate limit exceeded</p>
          <p className="text-sm text-destructive mt-1">Please wait a moment before trying again.</p>
          <button className="mt-2 text-sm text-destructive hover:opacity-80 font-medium">
            Try again
          </button>
        </div>
      </div>
      <div className="flex items-start gap-3 p-4 bg-warning/10 border border-warning/30 rounded-xl">
        <svg className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div>
          <p className="font-medium text-warning">Token limit warning</p>
          <p className="text-sm text-warning mt-1">You're approaching the context limit.</p>
        </div>
      </div>
    </div>
  )
}

export default function AIPage() {
  return (
    <ComponentPageLayout
      categoryName="AI & ML UI"
      categoryId="ai"
      components={aiComponents}
    />
  )
}
