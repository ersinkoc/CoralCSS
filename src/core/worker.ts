/**
 * Worker Thread Processing
 *
 * Parallel CSS generation using Web Workers for improved performance.
 * Spawns worker threads to distribute CSS generation workload.
 *
 * @module core/worker
 */

import type { Rule, RuleMatch, RuleConfig } from '../types'

/**
 * Worker message types
 */
export interface WorkerMessage {
  type: 'generate' | 'match' | 'result' | 'error'
  classes?: string[]
  rules?: SerializableRule[]
  css?: string
  matches?: RuleMatch[]
  error?: string
  id?: string
}

/**
 * Worker response
 */
interface WorkerResponse {
  type: 'result' | 'error'
  id: string
  css?: string
  matches?: SerializableRuleMatch[]
  error?: string
}

/**
 * Serializable rule for worker transfer
 * Functions cannot be passed to workers, so we serialize rule patterns and properties
 */
interface SerializableRule {
  id: string
  pattern: string
  properties: Record<string, string | number>
  layer?: string
}

/**
 * Serializable rule match
 */
interface SerializableRuleMatch {
  className: string
  ruleId: string
  match: string[]
}

/**
 * Worker task configuration
 */
export interface WorkerTask {
  id: string
  classes: string[]
  rules: SerializableRule[]
  resolve: (value: WorkerTaskResult) => void
  reject: (error: Error) => void
}

/**
 * Worker task result
 */
interface WorkerTaskResult {
  css?: string
  matches?: SerializableRuleMatch[]
}

/**
 * Worker pool options
 */
export interface WorkerPoolOptions {
  /** Number of worker threads (default: hardware concurrency or 4) */
  concurrency?: number
  /** Maximum tasks per worker before recycling */
  maxTasksPerWorker?: number
  /** Worker timeout in milliseconds */
  timeout?: number
}

/**
 * Convert Rule to serializable format for worker transfer
 */
function serializeRule(rule: Rule, index: number): SerializableRule {
  // Convert CSSProperties to a flat Record<string, string | number>
  const flatProperties: Record<string, string | number> = {}
  if (rule.properties) {
    for (const [key, value] of Object.entries(rule.properties)) {
      if (typeof value === 'string' || typeof value === 'number') {
        flatProperties[key] = value
      }
    }
  }

  return {
    id: rule.name ?? `rule-${index}`,
    pattern: rule.pattern instanceof RegExp ? rule.pattern.source : String(rule.pattern),
    properties: flatProperties,
    layer: rule.layer
  }
}

/**
 * Convert SerializableRuleMatch to RuleMatch
 */
function deserializeMatch(match: SerializableRuleMatch, rules: Rule[]): RuleMatch | null {
  // Find rule by name or fallback to indexed lookup
  const rule = rules.find(r => r.name === match.ruleId) ?? rules.find((r, i) => `rule-${i}` === match.ruleId)
  if (!rule) {return null}

  // Convert string[] back to RegExpMatchArray-like structure
  const matchArray = match.match as unknown as RegExpMatchArray
  matchArray.index = 0
  matchArray.input = match.className

  // Cast Rule to RuleConfig for compatibility (Rule extends RuleConfig conceptually)
  const ruleConfig: RuleConfig = {
    name: rule.name,
    pattern: rule.pattern,
    properties: rule.properties,
    selector: rule.selector,
    layer: rule.layer,
    priority: rule.priority
  }

  return {
    className: match.className,
    rule: ruleConfig,
    match: matchArray
  }
}

/**
 * Coral Worker - Manages a single Web Worker for parallel CSS generation
 *
 * @example
 * ```typescript
 * const worker = new CoralWorker()
 * const css = await worker.generateCSS(['p-4', 'bg-red-500'], rules)
 * ```
 */
export class CoralWorker {
  private worker: Worker | null = null
  private workerUrl: string | null = null
  private activeTasks = 0
  private taskQueue: WorkerTask[] = []
  private pendingTasks: Map<string, WorkerTask> = new Map()
  private maxTasksPerWorker: number
  private timeout: number
  private totalTasks = 0

  constructor(options: { maxTasksPerWorker?: number; timeout?: number } = {}) {
    this.maxTasksPerWorker = options.maxTasksPerWorker ?? 1000
    this.timeout = options.timeout ?? 30000
  }

  /**
   * Generate CSS for class names using worker thread
   */
  async generateCSS(classes: string[], rules: Rule[]): Promise<string> {
    const serializedRules = rules.map(serializeRule)

    const result = await this.executeTask({
      id: this.generateId(),
      classes,
      rules: serializedRules,
      resolve: () => {},
      reject: () => {}
    })

    return result.css ?? ''
  }

  /**
   * Match rules against class names using worker thread
   */
  async matchRules(classes: string[], rules: Rule[]): Promise<RuleMatch[]> {
    const serializedRules = rules.map(serializeRule)

    const result = await this.executeTask({
      id: this.generateId(),
      classes,
      rules: serializedRules,
      resolve: () => {},
      reject: () => {}
    })

    if (!result.matches) {return []}

    return result.matches
      .map(m => deserializeMatch(m, rules))
      .filter((m): m is RuleMatch => m !== null)
  }

  /**
   * Initialize worker if not already active
   */
  private ensureWorker(): void {
    if (this.worker !== null) {
      return
    }

    try {
      // Create worker from inline code
      const workerCode = this.createWorkerCode()
      const blob = new Blob([workerCode], { type: 'application/javascript' })
      this.workerUrl = URL.createObjectURL(blob)

      this.worker = new Worker(this.workerUrl, { type: 'module' })

      // Handle messages from worker
      this.worker.onmessage = (e: MessageEvent<WorkerResponse>) => {
        this.handleWorkerMessage(e.data)
      }

      this.worker.onerror = (error) => {
        this.handleWorkerError(error)
      }
    } catch {
      // Fallback: run in main thread if workers not supported
      console.warn('[CoralCSS] Web Workers not supported, running in main thread')
    }
  }

  /**
   * Execute a task using worker or fallback to main thread
   */
  private executeTask(task: WorkerTask): Promise<WorkerTaskResult> {
    return new Promise((resolve, reject) => {
      task.resolve = resolve
      task.reject = reject

      this.activeTasks++
      this.totalTasks++

      // Check if we need to recycle worker
      if (this.totalTasks > this.maxTasksPerWorker) {
        this.recycleWorker()
      }

      this.ensureWorker()

      if (this.worker) {
        this.taskQueue.push(task)
        this.pendingTasks.set(task.id, task)
        this.processQueue()

        // Set timeout
        const timeoutId = setTimeout(() => {
          if (this.pendingTasks.has(task.id)) {
            this.pendingTasks.delete(task.id)
            const queueIndex = this.taskQueue.indexOf(task)
            if (queueIndex > -1) {
              this.taskQueue.splice(queueIndex, 1)
            }
            this.activeTasks--
            reject(new Error(`Worker timeout after ${this.timeout}ms`))
          }
        }, this.timeout)

        // Clear timeout when task completes
        const originalResolve = task.resolve
        task.resolve = (value) => {
          clearTimeout(timeoutId)
          originalResolve(value)
        }
      } else {
        // Fallback: execute synchronously in main thread
        this.executeTaskMainThread(task)
          .then(resolve)
          .catch(reject)
          .finally(() => {
            this.activeTasks--
          })
      }
    })
  }

  /**
   * Process queued tasks
   */
  private processQueue(): void {
    if (this.taskQueue.length === 0 || !this.worker) {
      return
    }

    const task = this.taskQueue.shift()
    if (!task) {
      return
    }

    const message: WorkerMessage = {
      type: 'generate',
      id: task.id,
      classes: task.classes,
      rules: task.rules
    }

    this.worker.postMessage(message)
  }

  /**
   * Handle message from worker
   */
  private handleWorkerMessage(data: WorkerResponse): void {
    const task = this.pendingTasks.get(data.id)

    if (!task) {
      return
    }

    this.pendingTasks.delete(data.id)
    this.activeTasks--

    if (data.type === 'error') {
      task.reject(new Error(data.error ?? 'Worker error'))
    } else {
      task.resolve({
        css: data.css,
        matches: data.matches
      })
    }

    // Process next task in queue
    this.processQueue()
  }

  /**
   * Handle worker error
   */
  private handleWorkerError(error: ErrorEvent): void {
    console.error('[CoralCSS] Worker error:', error.message)

    // Reject all pending tasks
    for (const task of this.pendingTasks.values()) {
      task.reject(new Error(`Worker error: ${error.message}`))
    }

    this.terminate()
  }

  /**
   * Execute task in main thread (fallback)
   * This provides actual CSS generation when workers aren't available
   */
  private async executeTaskMainThread(task: WorkerTask): Promise<WorkerTaskResult> {
    const css: string[] = []
    const matches: SerializableRuleMatch[] = []
    const seen = new Set<string>()

    for (const className of task.classes) {
      if (seen.has(className)) {continue}
      seen.add(className)

      // Parse class name for variants and modifiers
      const parsed = this.parseClassName(className)

      for (const rule of task.rules) {
        const match = this.matchRule(parsed.base, rule)
        if (match) {
          matches.push({
            className,
            ruleId: rule.id,
            match
          })

          // Generate CSS
          const generated = this.generateCSSForMatch(className, parsed, rule, match)
          if (generated) {
            css.push(generated)
          }
        }
      }
    }

    return {
      css: css.join('\n'),
      matches
    }
  }

  /**
   * Parse a class name into its components
   */
  private parseClassName(className: string): {
    variants: string[]
    base: string
    opacity: string | null
    arbitrary: string | null
    important: boolean
    negative: boolean
  } {
    let input = className
    const important = input.startsWith('!')
    if (important) {input = input.slice(1)}

    // Extract variants (e.g., hover:dark:bg-red-500)
    const parts = input.split(':')
    const base = parts.pop() ?? input
    const variants = parts

    // Check for negative
    const negative = base.startsWith('-')
    let baseClass = negative ? base.slice(1) : base

    // Extract opacity modifier (e.g., bg-red-500/50)
    let opacity: string | null = null
    const slashIndex = baseClass.lastIndexOf('/')
    if (slashIndex > 0 && !baseClass.includes('[')) {
      opacity = baseClass.slice(slashIndex + 1)
      baseClass = baseClass.slice(0, slashIndex)
    }

    // Extract arbitrary value (e.g., bg-[#ff0000])
    let arbitrary: string | null = null
    const arbitraryMatch = baseClass.match(/\[([^\]]+)\]$/)
    if (arbitraryMatch) {
      arbitrary = arbitraryMatch[1] ?? null
      baseClass = baseClass.slice(0, baseClass.indexOf('['))
    }

    return {
      variants,
      base: baseClass,
      opacity,
      arbitrary,
      important,
      negative
    }
  }

  /**
   * Match a class name against a rule pattern
   */
  private matchRule(className: string, rule: SerializableRule): string[] | null {
    try {
      const regex = new RegExp(`^${rule.pattern}$`)
      const match = className.match(regex)
      return match ? Array.from(match) : null
    } catch {
      // Invalid regex, try literal match
      return className === rule.pattern ? [className] : null
    }
  }

  /**
   * Generate CSS for a matched rule
   */
  private generateCSSForMatch(
    className: string,
    parsed: ReturnType<typeof this.parseClassName>,
    rule: SerializableRule,
    _match: string[]
  ): string | null {
    const properties = { ...rule.properties }

    if (Object.keys(properties).length === 0) {
      return null
    }

    // Apply arbitrary value
    if (parsed.arbitrary) {
      for (const [key, value] of Object.entries(properties)) {
        if (value === 'ARBITRARY' || (typeof value === 'string' && value.includes('$1'))) {
          properties[key] = parsed.arbitrary.replace(/_/g, ' ')
        }
      }
    }

    // Apply opacity
    if (parsed.opacity) {
      const opacityValue = parseInt(parsed.opacity) / 100
      for (const [key, value] of Object.entries(properties)) {
        if (typeof value === 'string' && value.includes('var(--')) {
          properties[key] = `color-mix(in srgb, ${value} ${opacityValue * 100}%, transparent)`
        }
      }
    }

    // Apply negative
    if (parsed.negative) {
      for (const [key, value] of Object.entries(properties)) {
        if (typeof value === 'string' && /^-?\d/.test(value)) {
          properties[key] = value.startsWith('-') ? value.slice(1) : `-${value}`
        }
      }
    }

    // Format properties
    const propsStr = Object.entries(properties)
      .map(([key, value]) => `${key}: ${value}`)
      .join('; ')

    // Escape class name for CSS selector
    const escapedClass = this.escapeClassName(className)

    // Build selector with variants
    let selector = `.${escapedClass}`
    let prefix = ''
    let suffix = ''

    for (const variant of parsed.variants) {
      if (variant.startsWith('@') || variant === 'sm' || variant === 'md' || variant === 'lg' || variant === 'xl' || variant === '2xl') {
        // Responsive variant
        const breakpoints: Record<string, string> = {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px'
        }
        const bp = variant.startsWith('@') ? variant.slice(1) : variant
        const width = breakpoints[bp] ?? `${bp}px`
        prefix = `@media (min-width: ${width}) { ${prefix}`
        suffix = `${suffix} }`
      } else if (variant === 'hover' || variant === 'focus' || variant === 'active' || variant === 'visited') {
        selector = `${selector}:${variant}`
      } else if (variant === 'dark') {
        prefix = `@media (prefers-color-scheme: dark) { ${prefix}`
        suffix = `${suffix} }`
      } else if (variant === 'first') {
        selector = `${selector}:first-child`
      } else if (variant === 'last') {
        selector = `${selector}:last-child`
      } else if (variant === 'odd') {
        selector = `${selector}:nth-child(odd)`
      } else if (variant === 'even') {
        selector = `${selector}:nth-child(even)`
      } else if (variant === 'disabled') {
        selector = `${selector}:disabled`
      } else if (variant === 'group-hover') {
        selector = `.group:hover ${selector}`
      }
    }

    // Apply !important
    const importantStr = parsed.important ? ' !important' : ''
    const finalProps = importantStr
      ? propsStr.replace(/;/g, ` !important;`)
      : propsStr

    return `${prefix}${selector} { ${finalProps} }${suffix}`
  }

  /**
   * Escape class name for use in CSS selector
   */
  private escapeClassName(className: string): string {
    return className
      .replace(/([!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~])/g, '\\$1')
      .replace(/\s/g, '\\ ')
  }

  /**
   * Create worker code with CSS generation logic
   */
  private createWorkerCode(): string {
    return `
      const pendingTasks = new Map()

      self.onmessage = function(e) {
        const message = e.data

        if (message.type === 'generate') {
          try {
            const result = processClasses(message.classes, message.rules)
            self.postMessage({
              type: 'result',
              id: message.id,
              css: result.css,
              matches: result.matches
            })
          } catch (error) {
            self.postMessage({
              type: 'error',
              id: message.id,
              error: error.message || 'Worker generation error'
            })
          }
        }
      }

      function processClasses(classes, rules) {
        const css = []
        const matches = []
        const seen = new Set()

        for (const className of classes) {
          if (seen.has(className)) continue
          seen.add(className)

          const parsed = parseClassName(className)

          for (const rule of rules) {
            const match = matchRule(parsed.base, rule)
            if (match) {
              matches.push({
                className,
                ruleId: rule.id,
                match
              })

              const generated = generateCSS(className, parsed, rule, match)
              if (generated) {
                css.push(generated)
              }
            }
          }
        }

        return { css: css.join('\\n'), matches }
      }

      function parseClassName(className) {
        let input = className
        const important = input.startsWith('!')
        if (important) input = input.slice(1)

        const parts = input.split(':')
        const base = parts.pop() || input
        const variants = parts

        const negative = base.startsWith('-')
        let baseClass = negative ? base.slice(1) : base

        let opacity = null
        const slashIndex = baseClass.lastIndexOf('/')
        if (slashIndex > 0 && !baseClass.includes('[')) {
          opacity = baseClass.slice(slashIndex + 1)
          baseClass = baseClass.slice(0, slashIndex)
        }

        let arbitrary = null
        const arbitraryMatch = baseClass.match(/\\[([^\\]]+)\\]$/)
        if (arbitraryMatch) {
          arbitrary = arbitraryMatch[1]
          baseClass = baseClass.slice(0, baseClass.indexOf('['))
        }

        return { variants, base: baseClass, opacity, arbitrary, important, negative }
      }

      function matchRule(className, rule) {
        try {
          const regex = new RegExp('^' + rule.pattern + '$')
          const match = className.match(regex)
          return match ? Array.from(match) : null
        } catch {
          return className === rule.pattern ? [className] : null
        }
      }

      function generateCSS(className, parsed, rule, match) {
        const properties = { ...rule.properties }

        if (Object.keys(properties).length === 0) {
          return null
        }

        if (parsed.arbitrary) {
          for (const [key, value] of Object.entries(properties)) {
            if (value === 'ARBITRARY' || value.includes('$1')) {
              properties[key] = parsed.arbitrary.replace(/_/g, ' ')
            }
          }
        }

        if (parsed.opacity) {
          const opacityValue = parseInt(parsed.opacity) / 100
          for (const [key, value] of Object.entries(properties)) {
            if (typeof value === 'string' && value.includes('var(--')) {
              properties[key] = 'color-mix(in srgb, ' + value + ' ' + (opacityValue * 100) + '%, transparent)'
            }
          }
        }

        if (parsed.negative) {
          for (const [key, value] of Object.entries(properties)) {
            if (typeof value === 'string' && /^-?\\d/.test(value)) {
              properties[key] = value.startsWith('-') ? value.slice(1) : '-' + value
            }
          }
        }

        const propsStr = Object.entries(properties)
          .map(([key, value]) => key + ': ' + value)
          .join('; ')

        const escapedClass = escapeClassName(className)
        let selector = '.' + escapedClass
        let prefix = ''
        let suffix = ''

        const breakpoints = { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' }

        for (const variant of parsed.variants) {
          if (variant.startsWith('@') || breakpoints[variant]) {
            const bp = variant.startsWith('@') ? variant.slice(1) : variant
            const width = breakpoints[bp] || (bp + 'px')
            prefix = '@media (min-width: ' + width + ') { ' + prefix
            suffix = suffix + ' }'
          } else if (['hover', 'focus', 'active', 'visited'].includes(variant)) {
            selector = selector + ':' + variant
          } else if (variant === 'dark') {
            prefix = '@media (prefers-color-scheme: dark) { ' + prefix
            suffix = suffix + ' }'
          } else if (variant === 'first') {
            selector = selector + ':first-child'
          } else if (variant === 'last') {
            selector = selector + ':last-child'
          } else if (variant === 'odd') {
            selector = selector + ':nth-child(odd)'
          } else if (variant === 'even') {
            selector = selector + ':nth-child(even)'
          } else if (variant === 'disabled') {
            selector = selector + ':disabled'
          } else if (variant === 'group-hover') {
            selector = '.group:hover ' + selector
          }
        }

        const importantStr = parsed.important ? ' !important' : ''
        const finalProps = importantStr
          ? propsStr.replace(/;/g, ' !important;')
          : propsStr

        return prefix + selector + ' { ' + finalProps + ' }' + suffix
      }

      function escapeClassName(className) {
        return className
          .replace(/([!"#$%&'()*+,./:;<=>?@[\\\\\\]^\\\`{|}~])/g, '\\\\$1')
          .replace(/\\s/g, '\\\\ ')
      }
    `
  }

  /**
   * Recycle worker (terminate and recreate on next use)
   */
  private recycleWorker(): void {
    if (this.worker) {
      this.worker.terminate()
      this.worker = null
    }
    if (this.workerUrl) {
      URL.revokeObjectURL(this.workerUrl)
      this.workerUrl = null
    }
    this.totalTasks = 0
  }

  /**
   * Terminate worker and clean up
   */
  terminate(): void {
    // Reject any pending tasks
    for (const task of this.pendingTasks.values()) {
      task.reject(new Error('Worker terminated'))
    }
    this.pendingTasks.clear()

    if (this.worker) {
      this.worker.terminate()
      this.worker = null
    }

    // Clean up blob URL to prevent memory leak
    if (this.workerUrl) {
      URL.revokeObjectURL(this.workerUrl)
      this.workerUrl = null
    }

    this.taskQueue = []
    this.activeTasks = 0
    this.totalTasks = 0
  }

  /**
   * Generate unique task ID
   */
  private generateId(): string {
    return `task-${Date.now()}-${Math.random().toString(36).slice(2)}`
  }

  /**
   * Get active task count
   */
  getActiveTaskCount(): number {
    return this.activeTasks
  }

  /**
   * Get queued task count
   */
  getQueuedTaskCount(): number {
    return this.taskQueue.length
  }

  /**
   * Get pending task count
   */
  getPendingTaskCount(): number {
    return this.pendingTasks.size
  }
}

/**
 * Worker Pool - Manages multiple workers for parallel processing
 *
 * @example
 * ```typescript
 * const pool = new WorkerPool({ concurrency: 4 })
 * const css = await pool.generateCSS(['p-4', 'bg-red-500'], rules)
 * ```
 */
export class WorkerPool {
  private workers: CoralWorker[]
  private nextWorkerIndex = 0
  private concurrency: number

  constructor(options: WorkerPoolOptions = {}) {
    this.concurrency = options.concurrency ?? this.getDefaultConcurrency()
    this.workers = []

    // Initialize workers
    for (let i = 0; i < this.concurrency; i++) {
      this.workers.push(new CoralWorker({
        maxTasksPerWorker: options.maxTasksPerWorker,
        timeout: options.timeout
      }))
    }
  }

  /**
   * Generate CSS using worker pool
   */
  async generateCSS(classes: string[], rules: Rule[]): Promise<string> {
    if (classes.length === 0) {
      return ''
    }

    // For small workloads, use single worker
    if (classes.length < 100 || this.concurrency === 1) {
      const worker = this.getNextWorker()
      return worker.generateCSS(classes, rules)
    }

    // Split classes into chunks for parallel processing
    const chunkSize = Math.ceil(classes.length / this.concurrency)
    const chunks: string[][] = []

    for (let i = 0; i < classes.length; i += chunkSize) {
      chunks.push(classes.slice(i, i + chunkSize))
    }

    // Process chunks in parallel
    const results = await Promise.all(
      chunks.map((chunk) => {
        const worker = this.getNextWorker()
        return worker.generateCSS(chunk, rules)
      })
    )

    // Combine results
    return results.filter(Boolean).join('\n')
  }

  /**
   * Match rules using worker pool
   */
  async matchRules(classes: string[], rules: Rule[]): Promise<RuleMatch[]> {
    if (classes.length === 0) {
      return []
    }

    // For small workloads, use single worker
    if (classes.length < 100 || this.concurrency === 1) {
      const worker = this.getNextWorker()
      return worker.matchRules(classes, rules)
    }

    const chunkSize = Math.ceil(classes.length / this.concurrency)
    const chunks: string[][] = []

    for (let i = 0; i < classes.length; i += chunkSize) {
      chunks.push(classes.slice(i, i + chunkSize))
    }

    const results = await Promise.all(
      chunks.map((chunk) => {
        const worker = this.getNextWorker()
        return worker.matchRules(chunk, rules)
      })
    )

    return results.flat()
  }

  /**
   * Get next worker (round-robin)
   */
  private getNextWorker(): CoralWorker {
    const worker = this.workers[this.nextWorkerIndex]
    if (!worker) {
      throw new Error('No workers available')
    }
    this.nextWorkerIndex = (this.nextWorkerIndex + 1) % this.workers.length
    return worker
  }

  /**
   * Get default concurrency based on hardware
   */
  private getDefaultConcurrency(): number {
    if (typeof navigator !== 'undefined' && navigator.hardwareConcurrency) {
      return Math.min(navigator.hardwareConcurrency, 8) // Cap at 8 workers
    }
    return 4
  }

  /**
   * Get pool statistics
   */
  stats(): {
    concurrency: number
    workers: Array<{
      index: number
      activeTasks: number
      queuedTasks: number
      pendingTasks: number
    }>
  } {
    return {
      concurrency: this.concurrency,
      workers: this.workers.map((w, i) => ({
        index: i,
        activeTasks: w.getActiveTaskCount(),
        queuedTasks: w.getQueuedTaskCount(),
        pendingTasks: w.getPendingTaskCount()
      }))
    }
  }

  /**
   * Terminate all workers
   */
  terminate(): void {
    for (const worker of this.workers) {
      worker.terminate()
    }
    this.workers = []
    this.nextWorkerIndex = 0
  }

  /**
   * Get concurrency level
   */
  getConcurrency(): number {
    return this.concurrency
  }
}

/**
 * Create a new worker instance
 *
 * @example
 * ```typescript
 * const worker = createWorker()
 * const css = await worker.generateCSS(['p-4'], rules)
 * worker.terminate()
 * ```
 */
export function createWorker(options?: { maxTasksPerWorker?: number; timeout?: number }): CoralWorker {
  return new CoralWorker(options)
}

/**
 * Create a new worker pool
 *
 * @example
 * ```typescript
 * const pool = createWorkerPool({ concurrency: 4 })
 * const css = await pool.generateCSS(['p-4', 'bg-red-500'], rules)
 * ```
 */
export function createWorkerPool(options?: WorkerPoolOptions): WorkerPool {
  return new WorkerPool(options)
}

export default {
  CoralWorker,
  WorkerPool,
  createWorker,
  createWorkerPool
}
