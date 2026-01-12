/**
 * Worker Thread Processing
 *
 * Parallel CSS generation using Web Workers for improved performance.
 * Spawns worker threads to distribute CSS generation workload.
 *
 * @module core/worker
 */

import type { Rule, RuleMatch } from '../types'

/**
 * Worker message types
 */
export interface WorkerMessage {
  type: 'generate' | 'match' | 'result' | 'error'
  classes?: string[]
  rules?: Rule[]
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
  matches?: RuleMatch[]
  error?: string
}

/**
 * Worker task configuration
 */
export interface WorkerTask {
  id: string
  classes: string[]
  rules: Rule[]
  resolve: (value: string) => void
  reject: (error: Error) => void
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
  private activeTasks = 0
  private taskQueue: WorkerTask[] = []
  private maxTasksPerWorker: number
  private timeout: number

  constructor(options: { maxTasksPerWorker?: number; timeout?: number } = {}) {
    this.maxTasksPerWorker = options.maxTasksPerWorker ?? 1000
    this.timeout = options.timeout ?? 30000
  }

  /**
   * Generate CSS for class names using worker thread
   */
  async generateCSS(classes: string[], rules: Rule[]): Promise<string> {
    return this.executeTask({
      id: this.generateId(),
      classes,
      rules,
      resolve: () => '',
      reject: () => {}
    }).then(task => {
      // Return the CSS result from task execution
      return this.executeGenerate(task)
    })
  }

  /**
   * Match rules against class names using worker thread
   */
  async matchRules(classes: string[], rules: Rule[]): Promise<RuleMatch[]> {
    return this.executeTask({
      id: this.generateId(),
      classes,
      rules,
      resolve: () => [],
      reject: () => {}
    }).then(task => {
      return this.executeMatch(task)
    })
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
      const url = URL.createObjectURL(blob)

      this.worker = new Worker(url, { type: 'module' })

      // Handle messages from worker
      this.worker.onmessage = (e: MessageEvent<WorkerResponse>) => {
        this.handleWorkerMessage(e.data)
      }

      this.worker.onerror = (error) => {
        this.handleWorkerError(error)
      }
    } catch (error) {
      // Fallback: run in main thread if workers not supported
      console.warn('Web Workers not supported, running in main thread')
    }
  }

  /**
   * Execute a task using worker or fallback to main thread
   */
  private async executeTask(task: WorkerTask): Promise<WorkerTask> {
    this.activeTasks++

    // Check if we need to recycle worker
    if (this.activeTasks > this.maxTasksPerWorker) {
      this.terminate()
      this.activeTasks = 0
    }

    this.ensureWorker()

    return new Promise((resolve, reject) => {
      task.resolve = resolve as any
      task.reject = reject

      if (this.worker) {
        this.taskQueue.push(task)
        this.processQueue()
      } else {
        // Fallback: execute synchronously in main thread
        this.executeTaskMainThread(task).then(resolve).catch(reject)
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

    // Set timeout
    setTimeout(() => {
      const index = this.taskQueue.findIndex(t => t.id === task.id)
      if (index > -1) {
        task.reject(new Error('Worker timeout'))
        this.taskQueue.splice(index, 1)
        this.activeTasks--
      }
    }, this.timeout)
  }

  /**
   * Handle message from worker
   */
  private handleWorkerMessage(data: WorkerResponse): void {
    const taskIndex = this.taskQueue.findIndex(t => t.id === data.id)

    if (taskIndex === -1) {
      return
    }

    const task = this.taskQueue[taskIndex]
    this.taskQueue.splice(taskIndex, 1)
    this.activeTasks--

    if (data.type === 'error') {
      task.reject(new Error(data.error || 'Worker error'))
    } else {
      // Store result for later retrieval
      ;(task as any).result = data.css || data.matches
      task.resolve(task as any)
    }
  }

  /**
   * Handle worker error
   */
  private handleWorkerError(error: ErrorEvent): void {
    console.error('Worker error:', error.message)
    this.terminate()
  }

  /**
   * Execute task in main thread (fallback)
   */
  private async executeTaskMainThread(task: WorkerTask): Promise<any> {
    // Simplified main thread execution
    // In production, this would use the actual matching/generation logic
    return {
      id: task.id,
      classes: task.classes
    }
  }

  /**
   * Execute generate task
   */
  private async executeGenerate(task: WorkerTask): Promise<string> {
    // Check if worker returned result
    if ((task as any).result) {
      return (task as any).result
    }

    // Fallback: return empty CSS
    return ''
  }

  /**
   * Execute match task
   */
  private async executeMatch(task: WorkerTask): Promise<RuleMatch[]> {
    // Check if worker returned result
    if ((task as any).result) {
      return (task as any).result
    }

    // Fallback: return empty matches
    return []
  }

  /**
   * Create worker code with actual CSS generation logic
   */
  private createWorkerCode(): string {
    return `
      self.onmessage = function(e) {
        const message = e.data

        if (message.type === 'generate') {
          try {
            const css = generateCSS(message.classes, message.rules)
            self.postMessage({
              type: 'result',
              id: message.id,
              css: css
            })
          } catch (error) {
            self.postMessage({
              type: 'error',
              id: message.id,
              error: error.message || 'Worker generation error'
            })
          }
        } else if (message.type === 'match') {
          try {
            const matches = matchRules(message.classes, message.rules)
            self.postMessage({
              type: 'result',
              id: message.id,
              matches: matches
            })
          } catch (error) {
            self.postMessage({
              type: 'error',
              id: message.id,
              error: error.message || 'Worker match error'
            })
          }
        }
      }

      function generateCSS(classes, rules) {
        const css = []
        const seen = new Set()

        for (const className of classes) {
          if (seen.has(className)) continue
          seen.add(className)

          const result = generateForClass(className, rules)
          if (result) {
            css.push(result)
          }
        }

        return css.join('\\n')
      }

      function generateForClass(className, rules) {
        const parts = []

        // Extract variants (e.g., hover:bg-red-500)
        const colonIndex = className.lastIndexOf(':')
        let variants = []
        let baseClass = className

        if (colonIndex > 0) {
          variants = className.slice(0, colonIndex).split(':')
          baseClass = className.slice(colonIndex + 1)
        }

        // Extract opacity modifier (e.g., bg-red-500/50)
        const slashIndex = baseClass.lastIndexOf('/')
        let opacity = null
        if (slashIndex > 0) {
          opacity = baseClass.slice(slashIndex + 1)
          baseClass = baseClass.slice(0, slashIndex)
        }

        // Extract arbitrary value (e.g., bg-[#ff0000])
        const arbitraryMatch = baseClass.match(/\\[([^\\]]+)\\]$/)
        let arbitrary = null
        if (arbitraryMatch) {
          arbitrary = arbitraryMatch[1]
          baseClass = baseClass.slice(0, baseClass.indexOf('['))
        }

        // Match against rules
        for (const rule of rules) {
          const match = matchRule(baseClass, rule)
          if (match) {
            const generated = generateProperties(match, rule, { opacity, arbitrary })
            if (generated) {
              const selector = buildSelector('.' + className, variants)
              parts.push(selector + ' { ' + generated + ' }')
            }
          }
        }

        return parts.length > 0 ? parts.join('\\n') : null
      }

      function matchRule(className, rule) {
        if (typeof rule.pattern === 'string') {
          return rule.pattern === className ? [className] : null
        } else if (rule.pattern instanceof RegExp) {
          return className.match(rule.pattern)
        }
        return null
      }

      function generateProperties(match, rule, { opacity, arbitrary }) {
        let props = {}

        if (rule.generate) {
          const result = rule.generate(match)
          if (result && result.properties) {
            props = result.properties
          }
        } else if (rule.handler) {
          const result = rule.handler(match)
          if (result && result.properties) {
            props = result.properties
          }
        }

        // Apply opacity modifier
        if (opacity) {
          props = applyOpacity(props, opacity)
        }

        // Apply arbitrary value
        if (arbitrary) {
          props = applyArbitrary(props, arbitrary)
        }

        return formatProperties(props)
      }

      function applyOpacity(properties, opacity) {
        const result = {}
        const opacityValue = parseInt(opacity) / 100

        for (const [key, value] of Object.entries(properties)) {
          if (typeof value === 'string' && value.includes('var(--')) {
            result[key] = value.replace(/var\\((--[^)]+)\\)/, (match, colorVar) => {
              return 'color-mix(in srgb, ' + colorVar + ' ' + opacityValue + ', transparent)'
            })
          } else {
            result[key] = value
          }
        }

        return result
      }

      function applyArbitrary(properties, arbitrary) {
        const result = { ...properties }

        for (const [key, value] of Object.entries(properties)) {
          if (value === 'ARBITRARY') {
            result[key] = arbitrary.replace(/_/g, ' ')
          }
        }

        return result
      }

      function formatProperties(properties) {
        return Object.entries(properties)
          .map(([key, value]) => key + ': ' + value + ';')
          .join(' ')
      }

      function buildSelector(base, variants) {
        let selector = base

        // Apply variants in reverse order (hover:dark:bg -> .dark:hover:bg)
        for (let i = variants.length - 1; i >= 0; i--) {
          const variant = variants[i]
          if (variant.startsWith('@')) {
            // At-rule variant (e.g., @sm)
            const bp = variant.slice(1)
            selector = '@media (min-width: ' + bp + 'px) { ' + selector + ' }'
          } else {
            selector = variant + ' ' + selector
          }
        }

        return selector
      }

      function matchRules(classes, rules) {
        const matches = []

        for (const className of classes) {
          for (const rule of rules) {
            const match = matchRule(className, rule)
            if (match) {
              matches.push({
                className,
                rule,
                match
              })
            }
          }
        }

        return matches
      }
    `
  }

  /**
   * Terminate worker and clean up
   */
  terminate(): void {
    if (this.worker) {
      this.worker.terminate()
      this.worker = null
    }
    this.taskQueue = []
    this.activeTasks = 0
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
    // Split classes into chunks for parallel processing
    const chunkSize = Math.ceil(classes.length / this.concurrency)
    const chunks: string[][] = []

    for (let i = 0; i < classes.length; i += chunkSize) {
      chunks.push(classes.slice(i, i + chunkSize))
    }

    // Process chunks in parallel
    const results = await Promise.all(
      chunks.map((chunk, index) => {
        const worker = this.getNextWorker()
        return worker.generateCSS(chunk, rules)
      })
    )

    // Combine results
    return results.join('\n')
  }

  /**
   * Match rules using worker pool
   */
  async matchRules(classes: string[], rules: Rule[]): Promise<RuleMatch[]> {
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
    this.nextWorkerIndex = (this.nextWorkerIndex + 1) % this.workers.length
    return worker
  }

  /**
   * Get default concurrency based on hardware
   */
  private getDefaultConcurrency(): number {
    if (typeof navigator !== 'undefined' && navigator.hardwareConcurrency) {
      return navigator.hardwareConcurrency
    }
    return 4
  }

  /**
   * Get pool statistics
   */
  stats() {
    return {
      concurrency: this.concurrency,
      workers: this.workers.map((w, i) => ({
        index: i,
        activeTasks: w.getActiveTaskCount(),
        queuedTasks: w.getQueuedTaskCount()
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
