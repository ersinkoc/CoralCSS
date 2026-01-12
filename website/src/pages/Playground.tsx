/**
 * CoralCSS Interactive Playground
 *
 * Live code editor with real-time visual preview.
 */

import { useState, useEffect, useRef } from 'react'
import Editor from '@monaco-editor/react'

// CoralCSS class categories for the explorer
const CATEGORIES = {
  spacing: {
    name: 'Spacing',
    classes: [
      { name: 'p-4', desc: 'Padding: 1rem' },
      { name: 'px-6', desc: 'Horizontal padding: 1.5rem' },
      { name: 'm-4', desc: 'Margin: 1rem' },
      { name: 'gap-4', desc: 'Gap: 1rem' },
      { name: 'p-smart', desc: 'Fluid responsive padding' }
    ]
  },
  layout: {
    name: 'Layout',
    classes: [
      { name: 'flex', desc: 'Display: flex' },
      { name: 'grid', desc: 'Display: grid' },
      { name: 'grid-auto-fit', desc: 'Auto-fit responsive grid' },
      { name: 'flex-col', desc: 'Flex column' },
      { name: 'hidden', desc: 'Display: none' }
    ]
  },
  colors: {
    name: 'Colors',
    classes: [
      { name: 'bg-coral-500', desc: 'Coral red background' },
      { name: 'bg-slate-800', desc: 'Slate background' },
      { name: 'text-coral-600', desc: 'Coral red text' },
      { name: 'border-coral-300', desc: 'Coral border' },
      { name: 'bg-gradient-to-r from-coral-500 to-purple-600', desc: 'Gradient background' }
    ]
  },
  typography: {
    name: 'Typography',
    classes: [
      { name: 'text-lg', desc: 'Font size: 1.125rem' },
      { name: 'font-bold', desc: 'Font weight: bold' },
      { name: 'text-center', desc: 'Text align: center' },
      { name: 'leading-relaxed', desc: 'Line height: relaxed' },
      { name: 'tracking-wide', desc: 'Letter spacing: wide' }
    ]
  },
  effects: {
    name: 'Effects',
    classes: [
      { name: 'shadow-lg', desc: 'Large shadow' },
      { name: 'rounded-lg', desc: 'Border radius: 0.5rem' },
      { name: 'rounded-full', desc: 'Fully rounded' },
      { name: 'opacity-50', desc: 'Opacity: 50%' },
      { name: 'backdrop-blur-md', desc: 'Backdrop blur' }
    ]
  },
  animations: {
    name: 'Animations',
    classes: [
      { name: 'animate-spin', desc: 'Spin continuously' },
      { name: 'animate-pulse', desc: 'Pulse animation' },
      { name: 'animate-bounce', desc: 'Bounce animation' },
      { name: 'animate-spring-md', desc: 'Spring bounce' },
      { name: 'animate-scroll-fade-in', desc: 'Scroll fade in' }
    ]
  },
  transforms: {
    name: 'Transforms',
    classes: [
      { name: 'scale-105', desc: 'Scale: 1.05' },
      { name: 'rotate-45', desc: 'Rotate: 45deg' },
      { name: '-translate-y-2', desc: 'Translate Y: -0.5rem' },
      { name: 'hover:scale-110', desc: 'Scale on hover' },
      { name: 'transition-transform', desc: 'Transition transform' }
    ]
  },
  advanced: {
    name: 'Advanced',
    classes: [
      { name: 'grid-masonry-tight', desc: 'Masonry layout' },
      { name: 'text-perceptual', desc: 'Perceptual color' },
      { name: 'contrast-high', desc: 'High contrast' },
      { name: '@container', desc: 'Container query' },
      { name: 'hover:(bg-coral-500 text-white)', desc: 'Variant group' }
    ]
  }
}

// Example templates
const TEMPLATES = {
  card: `<div class="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 max-w-sm">
  <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Card Title</h3>
  <p class="text-slate-600 dark:text-slate-400">Card description goes here with some sample text.</p>
  <button class="mt-4 px-4 py-2 bg-coral-500 hover:bg-coral-600 text-white rounded-lg transition-colors">
    Action
  </button>
</div>`,

  button: `<button class="px-6 py-3 bg-gradient-to-r from-coral-500 to-purple-600 hover:from-coral-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105">
  Click Me
</button>`,

  alert: `<div class="flex items-start gap-3 p-4 bg-coral-100 dark:bg-coral-900/30 border border-coral-200 dark:border-coral-800 rounded-lg">
  <svg class="w-6 h-6 text-coral-600 dark:text-coral-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
  <div>
    <h4 class="font-semibold text-coral-900 dark:text-coral-100">Attention</h4>
    <p class="text-sm text-coral-700 dark:text-coral-300 mt-1">This is an alert message with important information.</p>
  </div>
</div>`,

  grid: `<div class="grid grid-auto-fit gap-6">
  <div class="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
    <h3 class="text-lg font-bold mb-2">Item 1</h3>
    <p class="text-slate-600 dark:text-slate-400">Description text</p>
  </div>
  <div class="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
    <h3 class="text-lg font-bold mb-2">Item 2</h3>
    <p class="text-slate-600 dark:text-slate-400">Description text</p>
  </div>
  <div class="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
    <h3 class="text-lg font-bold mb-2">Item 3</h3>
    <p class="text-slate-600 dark:text-slate-400">Description text</p>
  </div>
</div>`,

  form: `<div class="space-y-4 max-w-md">
  <div>
    <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
    <input type="email" placeholder="you@example.com" class="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
  </div>
  <div>
    <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
    <textarea rows="3" placeholder="Your message..." class="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white resize-none"></textarea>
  </div>
  <button class="w-full px-4 py-2 bg-coral-500 hover:bg-coral-600 text-white font-medium rounded-lg transition-colors">
    Send Message
  </button>
</div>`
}

export default function PlaygroundPage() {
  const [code, setCode] = useState(TEMPLATES.card)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof CATEGORIES>('spacing')
  const [showClasses, setShowClasses] = useState(true)

  const previewRef = useRef<HTMLDivElement>(null)

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const insertClass = (className: string) => {
    // Simple insertion - find the first class attribute and add the class
    const classAttrMatch = code.match(/class="([^"]*)"/)
    if (classAttrMatch) {
      const existingClasses = classAttrMatch[1].trim()
      const newClasses = existingClasses ? `${existingClasses} ${className}` : className
      setCode(code.replace(/class="([^"]*)"/, `class="${newClasses}"`))
    }
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code)
  }

  const copyHTML = () => {
    navigator.clipboard.writeText(code)
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      {/* Left Panel - Code Editor */}
      <div className="flex-1 flex flex-col border-r border-slate-200 dark:border-slate-700">
        {/* Editor Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200">HTML Editor</h2>
          <div className="flex items-center gap-2">
            <select
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="text-xs px-3 py-1.5 bg-slate-100 dark:bg-slate-700 border-0 rounded-lg text-slate-700 dark:text-slate-200"
            >
              <option value={TEMPLATES.card}>Card Template</option>
              <option value={TEMPLATES.button}>Button Template</option>
              <option value={TEMPLATES.alert}>Alert Template</option>
              <option value={TEMPLATES.grid}>Grid Template</option>
              <option value={TEMPLATES.form}>Form Template</option>
            </select>
            <button
              onClick={copyCode}
              className="text-xs px-3 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg text-slate-700 dark:text-slate-200 transition-colors"
            >
              Copy
            </button>
          </div>
        </div>

        {/* Monaco Editor */}
        <div className="flex-1 overflow-hidden">
          <Editor
            height="100%"
            defaultLanguage="html"
            value={code}
            onChange={(value) => setCode(value || '')}
            theme={theme === 'dark' ? 'vs-dark' : 'light'}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: 'on'
            }}
          />
        </div>
      </div>

      {/* Right Panel - Preview & Classes */}
      <div className="w-96 flex flex-col bg-white dark:bg-slate-800">
        {/* Preview Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowClasses(true)}
              className={`text-sm font-medium transition-colors ${showClasses ? 'text-coral-600 dark:text-coral-400' : 'text-slate-500 dark:text-slate-400'}`}
            >
              Classes
            </button>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>
          <button
            onClick={copyHTML}
            className="text-xs px-3 py-1.5 bg-coral-500 hover:bg-coral-600 text-white rounded-lg transition-colors"
          >
            Copy HTML
          </button>
        </div>

        {/* Class Explorer */}
        {showClasses && (
          <>
            {/* Category Tabs */}
            <div className="flex overflow-x-auto gap-1 px-2 py-3 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
              {Object.entries(CATEGORIES).map(([key, cat]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key as keyof typeof CATEGORIES)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                    selectedCategory === key
                      ? 'bg-coral-500 text-white'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Class List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {CATEGORIES[selectedCategory].classes.map((cls) => (
                <button
                  key={cls.name}
                  onClick={() => insertClass(cls.name)}
                  className="w-full text-left px-3 py-2 bg-slate-50 dark:bg-slate-900 hover:bg-coral-50 dark:hover:bg-coral-900/20 rounded-lg transition-colors group"
                >
                  <code className="block text-sm font-mono text-coral-600 dark:text-coral-400 group-hover:text-coral-700 dark:group-hover:text-coral-300">
                    {cls.name}
                  </code>
                  <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">{cls.desc}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {/* Live Preview */}
        <div className="border-t border-slate-200 dark:border-slate-700">
          <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Live Preview</span>
          </div>
          <div
            ref={previewRef}
            className="p-6 min-h-[200px] bg-white dark:bg-slate-800 overflow-auto"
            dangerouslySetInnerHTML={{ __html: code }}
          />
        </div>
      </div>
    </div>
  )
}
