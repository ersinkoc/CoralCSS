/**
 * Runtime Performance Optimizer
 *
 * Batch DOM operations, RequestIdleCallback scheduling,
 * and virtualized style injection for improved runtime performance.
 *
 * @module core/runtime-optimizer
 */

/**
 * Scheduler options
 */
export interface SchedulerOptions {
  /** Use RequestIdleCallback if available */
  useIdleCallback?: boolean
  /** Timeout for idle callback (ms) */
  timeout?: number
  /** Priority level */
  priority?: 'high' | 'normal' | 'low'
}

/**
 * Batch operation options
 */
export interface BatchOptions {
  /** Maximum batch size */
  maxSize?: number
  /** Maximum batch delay (ms) */
  maxDelay?: number
  /** Auto-flush on max size */
  autoFlush?: boolean
}

/**
 * Virtualized injection options
 */
export interface VirtualizedOptions {
  /** Maximum style nodes */
  maxNodes?: number
  /** Classes per node */
  classesPerNode?: number
  /** Merge small nodes */
  mergeNodes?: boolean
}

/**
 * Scheduled task
 */
interface ScheduledTask {
  fn: () => void
  priority: number
  id: string
}

/**
 * Batch operation
 */
interface BatchOperation {
  type: 'insert' | 'update' | 'delete'
  selector: string
  css: string
  node?: HTMLElement | CSSStyleDeclaration
}

/**
 * Runtime Performance Optimizer
 *
 * Combines multiple optimization techniques for maximum performance:
 * - Batch DOM operations
 * - RequestIdleCallback scheduling
 * - Virtualized style injection
 *
 * @example
 * ```typescript
 * const optimizer = new RuntimeOptimizer({
 *   useIdleCallback: true,
 *   maxNodes: 10,
 *   batchSize: 50
 * })
 *
 * // Schedule non-critical work
 * optimizer.schedule(() => {
 *   console.log('Processed during idle time')
 * })
 * ```
 */
export class RuntimeOptimizer {
  private schedulerOptions: Required<SchedulerOptions>
  private batchOptions: Required<BatchOptions>
  private virtualizedOptions: Required<VirtualizedOptions>

  // Task scheduling
  private taskQueue: ScheduledTask[] = []
  private isScheduled = false
  private taskIdCounter = 0

  // Batch operations
  private operationQueue: BatchOperation[] = []
  private batchTimer: ReturnType<typeof setTimeout> | null = null

  // Virtualized styles
  private styleNodes: HTMLStyleElement[] = []
  private currentNodeIndex = 0
  private currentClassCount = 0

  constructor(
    schedulerOptions: SchedulerOptions = {},
    batchOptions: BatchOptions = {},
    virtualizedOptions: VirtualizedOptions = {}
  ) {
    this.schedulerOptions = {
      useIdleCallback: schedulerOptions.useIdleCallback ?? true,
      timeout: schedulerOptions.timeout ?? 50,
      priority: schedulerOptions.priority ?? 'normal'
    }

    this.batchOptions = {
      maxSize: batchOptions.maxSize ?? 100,
      maxDelay: batchOptions.maxDelay ?? 16,
      autoFlush: batchOptions.autoFlush ?? true
    }

    this.virtualizedOptions = {
      maxNodes: virtualizedOptions.maxNodes ?? 10,
      classesPerNode: virtualizedOptions.classesPerNode ?? 1000,
      mergeNodes: virtualizedOptions.mergeNodes ?? true
    }
  }

  // ========================================
  // TASK SCHEDULING
  // ========================================

  /**
   * Schedule a task to run during browser idle time
   */
  schedule(fn: () => void, priority: number = 0): string {
    const id = `task-${this.taskIdCounter++}`

    this.taskQueue.push({
      fn,
      priority,
      id
    })

    // Sort by priority (higher priority first)
    this.taskQueue.sort((a, b) => b.priority - a.priority)

    if (!this.isScheduled) {
      this.isScheduled = true
      this.requestIdle()
    }

    return id
  }

  /**
   * Schedule high-priority task
   */
  scheduleHigh(fn: () => void): string {
    return this.schedule(fn, 100)
  }

  /**
   * Schedule low-priority task
   */
  scheduleLow(fn: () => void): string {
    return this.schedule(fn, -100)
  }

  /**
   * Request idle callback
   */
  private requestIdle(): void {
    const processTasks = (deadline?: IdleDeadline) => {
      const timeRemaining = deadline?.timeRemaining() ?? Infinity

      // Process as many tasks as possible within time budget
      while (this.taskQueue.length > 0 && timeRemaining > 0) {
        const task = this.taskQueue.shift()
        if (task) {
          try {
            task.fn()
          } catch (error) {
            console.error('Task execution error:', error)
          }
        }
      }

      this.isScheduled = false

      // If more tasks, schedule again
      if (this.taskQueue.length > 0) {
        this.requestIdle()
      }
    }

    if (this.schedulerOptions.useIdleCallback && typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(processTasks, { timeout: this.schedulerOptions.timeout })
    } else {
      // Fallback to setTimeout
      setTimeout(() => processTasks(), this.schedulerOptions.timeout)
    }
  }

  /**
   * Cancel a scheduled task
   */
  cancelTask(id: string): boolean {
    const index = this.taskQueue.findIndex(t => t.id === id)
    if (index > -1) {
      this.taskQueue.splice(index, 1)
      return true
    }
    return false
  }

  /**
   * Get pending task count
   */
  getPendingTaskCount(): number {
    return this.taskQueue.length
  }

  // ========================================
  // BATCH DOM OPERATIONS
  // ========================================

  /**
   * Add operation to batch
   */
  batchOperation(operation: BatchOperation): void {
    this.operationQueue.push(operation)

    // Auto-flush if at max size
    if (this.batchOptions.autoFlush && this.operationQueue.length >= this.batchOptions.maxSize) {
      this.flushBatch()
    }
  }

  /**
   * Batch style insertion
   */
  batchInsertStyle(selector: string, css: string): void {
    this.batchOperation({
      type: 'insert',
      selector,
      css
    })
  }

  /**
   * Batch style update
   */
  batchUpdateStyle(element: HTMLElement, styles: Record<string, string>): void {
    for (const [property, value] of Object.entries(styles)) {
      this.batchOperation({
        type: 'update',
        selector: property,
        css: value,
        node: element.style
      })
    }
  }

  /**
   * Flush batched operations
   */
  flushBatch(): void {
    if (this.operationQueue.length === 0) {
      return
    }

    // Clear any pending timer
    if (this.batchTimer) {
      clearTimeout(this.batchTimer)
      this.batchTimer = null
    }

    // Process all operations
    for (const op of this.operationQueue) {
      try {
        switch (op.type) {
          case 'insert':
            this.applyStyle(op.selector, op.css)
            break
          case 'update':
            if (op.node && op.node instanceof CSSStyleDeclaration) {
              op.node.setProperty(op.selector, op.css)
            }
            break
          case 'delete':
            this.removeStyle(op.selector)
            break
        }
      } catch (error) {
        console.error('Batch operation error:', error)
      }
    }

    this.operationQueue = []
  }

  /**
   * Start auto-flush timer
   */
  startBatchFlush(): void {
    if (this.batchTimer) {
      return
    }

    this.batchTimer = setTimeout(() => {
      this.flushBatch()
    }, this.batchOptions.maxDelay)
  }

  /**
   * Apply style to DOM
   */
  private applyStyle(selector: string, css: string): void {
    const styleId = `coral-${selector.replace(/[^a-zA-Z0-9]/g, '-')}`
    let styleElement = document.getElementById(styleId) as HTMLStyleElement | null

    if (!styleElement) {
      styleElement = document.createElement('style')
      styleElement.id = styleId
      document.head.appendChild(styleElement)
    }

    styleElement.textContent = `${selector} { ${css} }`
  }

  /**
   * Remove style from DOM
   */
  private removeStyle(selector: string): void {
    const styleId = `coral-${selector.replace(/[^a-zA-Z0-9]/g, '-')}`
    const styleElement = document.getElementById(styleId)
    if (styleElement) {
      styleElement.remove()
    }
  }

  // ========================================
  // VIRTUALIZED STYLE INJECTION
  // ========================================

  /**
   * Inject CSS into virtualized style nodes
   */
  virtualizedInject(css: string): void {
    // Create new style node if needed
    if (this.currentClassCount >= this.virtualizedOptions.classesPerNode) {
      this.currentNodeIndex++
      this.currentClassCount = 0
    }

    // Get or create style node
    let styleNode = this.styleNodes[this.currentNodeIndex]

    if (!styleNode) {
      styleNode = document.createElement('style')
      styleNode.setAttribute('data-coral-node', String(this.currentNodeIndex))
      document.head.appendChild(styleNode)
      this.styleNodes.push(styleNode)
    }

    // Append CSS
    styleNode.textContent += css
    this.currentClassCount++

    // Merge small nodes if enabled
    if (this.virtualizedOptions.mergeNodes) {
      this.mergeSmallNodes()
    }
  }

  /**
   * Merge small style nodes
   */
  private mergeSmallNodes(): void {
    const threshold = this.virtualizedOptions.classesPerNode / 4

    for (let i = 0; i < this.styleNodes.length - 1; i++) {
      const node = this.styleNodes[i]
      const nextNode = this.styleNodes[i + 1]

      if (node && nextNode && node.textContent && node.textContent.length < threshold * 100) {
        // Merge with next node
        nextNode.textContent = (node.textContent || '') + (nextNode.textContent || '')
        node.remove()
        this.styleNodes.splice(i, 1)
        i-- // Adjust index
      }
    }
  }

  /**
   * Clear all virtualized style nodes
   */
  clearVirtualized(): void {
    for (const node of this.styleNodes) {
      node.remove()
    }
    this.styleNodes = []
    this.currentNodeIndex = 0
    this.currentClassCount = 0
  }

  /**
   * Get style node count
   */
  getStyleNodeCount(): number {
    return this.styleNodes.length
  }

  // ========================================
  // UTILITY METHODS
  // ========================================

  /**
   * Measure performance of a function
   */
  async measure<T>(label: string, fn: () => T): Promise<T> {
    const start = performance.now()
    const result = await fn()
    const end = performance.now()

    console.log(`[${label}] ${(end - start).toFixed(2)}ms`)

    return result
  }

  /**
   * Throttle function execution
   */
  throttle<T extends (...args: any[]) => any>(
    fn: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let lastCall = 0
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    return (...args: Parameters<T>) => {
      const now = Date.now()
      const remaining = delay - (now - lastCall)

      if (remaining <= 0) {
        if (timeoutId) {
          clearTimeout(timeoutId)
          timeoutId = null
        }
        lastCall = now
        fn(...args)
      } else if (!timeoutId) {
        timeoutId = setTimeout(() => {
          lastCall = Date.now()
          timeoutId = null
          fn(...args)
        }, remaining)
      }
    }
  }

  /**
   * Debounce function execution
   */
  debounce<T extends (...args: any[]) => any>(
    fn: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    return (...args: Parameters<T>) => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      timeoutId = setTimeout(() => {
        fn(...args)
      }, delay)
    }
  }

  /**
   * Cleanup all resources
   */
  cleanup(): void {
    // Clear tasks
    this.taskQueue = []

    // Flush and clear batch
    this.flushBatch()
    this.operationQueue = []

    // Clear virtualized styles
    this.clearVirtualized()

    // Clear timers
    if (this.batchTimer) {
      clearTimeout(this.batchTimer)
    }
  }

  /**
   * Get optimizer statistics
   */
  getStats() {
    return {
      pendingTasks: this.taskQueue.length,
      batchedOperations: this.operationQueue.length,
      styleNodes: this.styleNodes.length,
      currentNodeIndex: this.currentNodeIndex,
      currentClassCount: this.currentClassCount
    }
  }
}

/**
 * Create a runtime optimizer
 *
 * @example
 * ```typescript
 * const optimizer = createRuntimeOptimizer({
 *   useIdleCallback: true,
 *   batchSize: 50
 * })
 * ```
 */
export function createRuntimeOptimizer(
  schedulerOptions?: SchedulerOptions,
  batchOptions?: BatchOptions,
  virtualizedOptions?: VirtualizedOptions
): RuntimeOptimizer {
  return new RuntimeOptimizer(schedulerOptions, batchOptions, virtualizedOptions)
}

/**
 * Global runtime optimizer instance
 */
let globalOptimizer: RuntimeOptimizer | null = null

/**
 * Get or create global optimizer
 */
export function getGlobalOptimizer(): RuntimeOptimizer {
  if (!globalOptimizer) {
    globalOptimizer = new RuntimeOptimizer()
  }
  return globalOptimizer
}

/**
 * Set global optimizer
 */
export function setGlobalOptimizer(optimizer: RuntimeOptimizer): void {
  globalOptimizer = optimizer
}

export default {
  RuntimeOptimizer,
  createRuntimeOptimizer,
  getGlobalOptimizer,
  setGlobalOptimizer
}
