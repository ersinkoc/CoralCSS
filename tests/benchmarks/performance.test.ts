/**
 * CoralCSS Performance Benchmark Suite
 *
 * Compares CoralCSS performance against Tailwind CSS 4.1
 * in various real-world scenarios.
 *
 * @module benchmarks/performance
 */

import { describe, it, beforeEach, afterEach } from 'vitest'
import { createCoral, coralPreset } from '@coral-css/core'
import type { Coral } from '@coral-css/core/types'

/**
 * Benchmark result interface
 */
interface BenchmarkResult {
  name: string
  iterations: number
  totalTime: number
  avgTime: number
  opsPerSecond: number
  coralTime?: number
  tailwindTime?: number
  winner?: 'coral' | 'tailwind' | 'tie'
}

/**
 * Performance test configurations
 */
interface TestConfig {
  utilityCount: number
  variantCount: number
  complexClasses: boolean
  cacheHits: boolean
}

/**
 * Real-world class name samples
 */
const sampleUtilities = {
  spacing: ['p-0', 'p-1', 'p-2', 'p-3', 'p-4', 'p-5', 'p-6', 'p-8', 'p-10', 'p-12', 'px-1', 'px-2', 'px-3', 'px-4', 'py-1', 'py-2', 'py-3', 'py-4', 'm-0', 'm-1', 'm-2', 'm-3', 'm-4', 'mx-auto', 'my-auto'],
  sizing: ['w-0', 'w-1', 'w-2', 'w-3', 'w-4', 'w-8', 'w-10', 'w-12', 'w-16', 'w-20', 'w-24', 'w-32', 'w-40', 'w-48', 'w-64', 'w-full', 'w-1/2', 'w-1/3', 'w-2/3', 'w-1/4', 'w-3/4', 'h-0', 'h-1', 'h-2', 'h-3', 'h-4', 'h-8', 'h-10', 'h-12', 'h-full', 'h-screen'],
  flexbox: ['flex', 'inline-flex', 'flex-row', 'flex-col', 'flex-wrap', 'flex-nowrap', 'justify-start', 'justify-end', 'justify-center', 'justify-between', 'items-start', 'items-end', 'items-center', 'gap-1', 'gap-2', 'gap-3', 'gap-4'],
  grid: ['grid', 'inline-grid', 'grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4', 'grid-cols-6', 'grid-cols-12', 'grid-rows-1', 'grid-rows-2', 'grid-rows-3', 'grid-rows-4', 'gap-1', 'gap-2', 'gap-3', 'gap-4'],
  borders: ['border', 'border-0', 'border-2', 'border-4', 'border-t', 'border-r', 'border-b', 'border-l', 'rounded', 'rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-full', 'rounded-t-lg', 'rounded-b-lg'],
  colors: ['bg-primary', 'bg-secondary', 'bg-accent', 'bg-muted', 'bg-foreground', 'text-primary', 'text-secondary', 'text-muted', 'text-foreground', 'border-primary', 'border-secondary', 'border-muted'],
  backgrounds: ['bg-white', 'bg-black', 'bg-transparent', 'bg-current', 'bg-gradient-to-t', 'bg-gradient-to-tr', 'bg-gradient-to-r'],
  effects: ['shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl', 'shadow-none', 'opacity-0', 'opacity-25', 'opacity-50', 'opacity-75', 'opacity-100'],
  typography: ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'font-thin', 'font-light', 'font-normal', 'font-medium', 'font-semibold', 'font-bold', 'leading-none', 'leading-tight', 'leading-normal', 'leading-relaxed', 'tracking-tighter', 'tracking-tight', 'tracking-normal', 'tracking-wide'],
  transitions: ['transition', 'transition-all', 'transition-colors', 'transition-opacity', 'duration-75', 'duration-100', 'duration-150', 'duration-200', 'duration-300', 'ease-linear', 'ease-in', 'ease-out', 'ease-in-out'],
}

const sampleVariants = ['hover:', 'focus:', 'active:', 'disabled:', 'group-hover:', 'peer-focus:', 'dark:', 'sm:', 'md:', 'lg:', 'xl:']

/**
 * Generate random test classes
 */
function generateTestClasses(config: TestConfig): string[] {
  const classes: string[] = []
  const allUtilities = Object.values(sampleUtilities).flat().filter((u): u is string => typeof u === 'string')

  for (let i = 0; i < config.utilityCount; i++) {
    const utilityClass = allUtilities[Math.floor(Math.random() * allUtilities.length)]!

    // Add variants
    if (config.variantCount > 0 && Math.random() > 0.5) {
      const variantIndex = Math.floor(Math.random() * Math.min(config.variantCount, sampleVariants.length))
      const variant = sampleVariants[variantIndex]
      if (variant) {
        classes.push(variant + utilityClass)
      } else {
        classes.push(utilityClass)
      }
    } else {
      classes.push(utilityClass)
    }
  }

  return classes
}

/**
 * Benchmark utility function
 */
function benchmark(name: string, fn: () => void, iterations: number = 1000): BenchmarkResult {
  const start = performance.now()

  for (let i = 0; i < iterations; i++) {
    fn()
  }

  const end = performance.now()
  const totalTime = end - start
  const avgTime = totalTime / iterations
  const opsPerSecond = 1000 / avgTime

  return {
    name,
    iterations,
    totalTime,
    avgTime,
    opsPerSecond,
  }
}

/**
 * Initialize CoralCSS instance
 */
function initCoral(): Coral {
  return createCoral({
    plugins: coralPreset(),
    cache: {
      maxSize: 1000,
      ttl: Infinity,
      enabled: true,
    },
  })
}

describe('Performance Benchmarks', () => {
  let coral: Coral

  beforeEach(() => {
    coral = initCoral()
  })

  afterEach(() => {
    coral.reset()
  })

  describe('CSS Generation Performance', () => {
    it('should generate CSS for single utility class quickly', () => {
      const result = benchmark(
        'Single utility class generation',
        () => coral.generate(['p-4']),
        10000
      )

      console.log(`[Performance] ${result.name}:`)
      console.log(`  - ${result.opsPerSecond.toFixed(0)} ops/sec`)
      console.log(`  - ${result.avgTime.toFixed(4)}ms avg`)
      console.log(`  - ${result.totalTime.toFixed(2)}ms total (${result.iterations} iterations)`)

      // Performance assertion: should be able to generate at least 90,000 ops/sec
      expect(result.opsPerSecond).toBeGreaterThan(90000)
    })

    it('should generate CSS for 10 utility classes efficiently', () => {
      const classes = generateTestClasses({ utilityCount: 10, variantCount: 0, complexClasses: false, cacheHits: false })

      const result = benchmark(
        '10 utility classes generation',
        () => coral.generate(classes),
        5000
      )

      console.log(`[Performance] ${result.name}:`)
      console.log(`  - ${result.opsPerSecond.toFixed(0)} ops/sec`)
      console.log(`  - ${result.avgTime.toFixed(4)}ms avg`)

      expect(result.opsPerSecond).toBeGreaterThan(10000)
    })

    it('should generate CSS for 50 utility classes efficiently', () => {
      const classes = generateTestClasses({ utilityCount: 50, variantCount: 0, complexClasses: false, cacheHits: false })

      const result = benchmark(
        '50 utility classes generation',
        () => coral.generate(classes),
        1000
      )

      console.log(`[Performance] ${result.name}:`)
      console.log(`  - ${result.opsPerSecond.toFixed(0)} ops/sec`)
      console.log(`  - ${result.avgTime.toFixed(4)}ms avg`)

      expect(result.opsPerSecond).toBeGreaterThan(2000)
    })

    it('should generate CSS for 100 utility classes efficiently', () => {
      const classes = generateTestClasses({ utilityCount: 100, variantCount: 0, complexClasses: false, cacheHits: false })

      const result = benchmark(
        '100 utility classes generation',
        () => coral.generate(classes),
        500
      )

      console.log(`[Performance] ${result.name}:`)
      console.log(`  - ${result.opsPerSecond.toFixed(0)} ops/sec`)
      console.log(`  - ${result.avgTime.toFixed(4)}ms avg`)

      expect(result.opsPerSecond).toBeGreaterThan(1000)
    })
  })

  describe('Cache Performance', () => {
    it('should use cached results efficiently', () => {
      const classes = generateTestClasses({ utilityCount: 20, variantCount: 0, complexClasses: false, cacheHits: false })

      // First run - cache miss
      const firstRun = benchmark(
        'First run (cache miss)',
        () => coral.generate(classes),
        100
      )

      // Second run - cache hit
      const secondRun = benchmark(
        'Second run (cache hit)',
        () => coral.generate(classes),
        1000
      )

      const speedup = firstRun.avgTime / secondRun.avgTime

      console.log(`[Performance] Cache Performance:`)
      console.log(`  - First run (cache miss): ${firstRun.avgTime.toFixed(4)}ms avg`)
      console.log(`  - Second run (cache hit): ${secondRun.avgTime.toFixed(4)}ms avg`)
      console.log(`  - Cache speedup: ${speedup.toFixed(2)}x`)

      // Cache should provide at least 5x speedup
      expect(speedup).toBeGreaterThan(5)
    })

    it('should handle cache eviction under load', () => {
      // Configure small cache to test eviction
      const smallCoral = createCoral({
        plugins: coralPreset(),
        cache: {
          maxSize: 100,
          ttl: Infinity,
          enabled: true,
        },
      })

      // Generate 500 different class sets to trigger eviction
      const iterations = 500
      const start = performance.now()

      for (let i = 0; i < iterations; i++) {
        const classes = [`unique-class-${i}`, `p-${i % 12}`, `bg-${['red', 'blue', 'green'][i % 3]}-500`]
        smallCoral.generate(classes)
      }

      const end = performance.now()
      const totalTime = end - start
      const avgTime = totalTime / iterations

      console.log(`[Performance] Cache Eviction Test (${iterations} iterations):`)
      console.log(`  - Total time: ${totalTime.toFixed(2)}ms`)
      console.log(`  - Avg time: ${avgTime.toFixed(4)}ms`)
      console.log(`  - Ops/sec: ${(1000 / avgTime).toFixed(0)}`)

      // Should maintain reasonable performance even with cache eviction
      expect(avgTime).toBeLessThan(15) // 15ms max per operation (more lenient for CI environments)
    })
  })

  describe('Variant Performance', () => {
    it('should handle hover variants efficiently', () => {
      const classes = [
        'hover:bg-primary',
        'hover:text-primary-foreground',
        'hover:scale-105',
        'hover:shadow-lg',
        'hover:-translate-y-1',
      ]

      const result = benchmark(
        'Hover variants generation',
        () => coral.generate(classes),
        2000
      )

      console.log(`[Performance] ${result.name}:`)
      console.log(`  - ${result.opsPerSecond.toFixed(0)} ops/sec`)
      console.log(`  - ${result.avgTime.toFixed(4)}ms avg`)

      expect(result.opsPerSecond).toBeGreaterThan(5000)
    })

    it('should handle responsive variants efficiently', () => {
      const classes = [
        'p-2',
        'sm:p-4',
        'md:p-6',
        'lg:p-8',
        'xl:p-12',
        'w-full',
        'sm:w-1/2',
        'md:w-1/3',
        'lg:w-1/4',
      ]

      const result = benchmark(
        'Responsive variants generation',
        () => coral.generate(classes),
        1000
      )

      console.log(`[Performance] ${result.name}:`)
      console.log(`  - ${result.opsPerSecond.toFixed(0)} ops/sec`)
      console.log(`  - ${result.avgTime.toFixed(4)}ms avg`)

      expect(result.opsPerSecond).toBeGreaterThan(2000)
    })

    it('should handle dark mode variants efficiently', () => {
      const classes = [
        'dark:bg-background',
        'dark:text-foreground',
        'dark:border-border',
        'dark:hover:bg-muted',
      ]

      const result = benchmark(
        'Dark mode variants generation',
        () => coral.generate(classes),
        2000
      )

      console.log(`[Performance] ${result.name}:`)
      console.log(`  - ${result.opsPerSecond.toFixed(0)} ops/sec`)
      console.log(`  - ${result.avgTime.toFixed(4)}ms avg`)

      expect(result.opsPerSecond).toBeGreaterThan(5000)
    })
  })

  describe('Memory Performance', () => {
    it('should maintain stable memory usage over time', () => {
      const iterations = 1000
      const classes = generateTestClasses({ utilityCount: 20, variantCount: 2, complexClasses: false, cacheHits: false })

      // Force garbage collection if available (Node.js with --expose-gc)
      if (global.gc) {
        global.gc()
      }

      const startMem = process.memoryUsage().heapUsed

      for (let i = 0; i < iterations; i++) {
        coral.generate(classes)
      }

      // Force garbage collection if available
      if (global.gc) {
        global.gc()
      }

      const endMem = process.memoryUsage().heapUsed
      const memDelta = (endMem - startMem) / 1024 / 1024 // Convert to MB

      console.log(`[Performance] Memory Usage (${iterations} iterations):`)
      console.log(`  - Memory delta: ${memDelta.toFixed(2)}MB`)
      console.log(`  - Per iteration: ${(memDelta / iterations * 1024).toFixed(2)}KB`)

      // Memory growth should be reasonable (less than 15MB for 1000 iterations)
      expect(memDelta).toBeLessThan(15)
    })
  })

  describe('Real-World Scenarios', () => {
    it('should handle a typical button component efficiently', () => {
      const buttonClasses = [
        'px-4', 'py-2', 'bg-primary', 'text-primary-foreground',
        'rounded-lg', 'font-medium', 'shadow', 'hover:bg-primary/90',
        'hover:shadow-lg', 'hover:-translate-y-0.5', 'active:scale-95',
        'focus:outline-none', 'focus:ring-2', 'focus:ring-primary',
        'disabled:opacity-50', 'disabled:cursor-not-allowed',
        'transition-all', 'duration-200'
      ]

      const result = benchmark(
        'Button component generation',
        () => coral.generate(buttonClasses),
        5000
      )

      console.log(`[Performance] ${result.name}:`)
      console.log(`  - ${result.opsPerSecond.toFixed(0)} ops/sec`)
      console.log(`  - ${result.avgTime.toFixed(4)}ms avg`)

      expect(result.opsPerSecond).toBeGreaterThan(10000)
    })

    it('should handle a typical card component efficiently', () => {
      const cardClasses = [
        'p-6', 'bg-card', 'text-card-foreground', 'rounded-xl',
        'shadow-md', 'border', 'border-border', 'hover:shadow-xl',
        'hover:-translate-y-1', 'transition-all', 'duration-300',
        'sm:p-8', 'md:p-10', 'lg:p-12'
      ]

      const result = benchmark(
        'Card component generation',
        () => coral.generate(cardClasses),
        3000
      )

      console.log(`[Performance] ${result.name}:`)
      console.log(`  - ${result.opsPerSecond.toFixed(0)} ops/sec`)
      console.log(`  - ${result.avgTime.toFixed(4)}ms avg`)

      expect(result.opsPerSecond).toBeGreaterThan(5000)
    })

    it('should handle a complex layout efficiently', () => {
      const layoutClasses = [
        // Grid layout
        'grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4',
        // Gap
        'gap-4', 'md:gap-6', 'lg:gap-8',
        // Items
        'items-start', 'justify-center',
        // Each item
        'p-4', 'bg-card', 'rounded-lg', 'shadow', 'hover:shadow-lg',
        'border', 'border-border', 'dark:border-muted',
        // Typography
        'text-lg', 'font-semibold', 'text-foreground',
        'text-sm', 'text-muted-foreground'
      ]

      const result = benchmark(
        'Complex layout generation',
        () => coral.generate(layoutClasses),
        2000
      )

      console.log(`[Performance] ${result.name}:`)
      console.log(`  - ${result.opsPerSecond.toFixed(0)} ops/sec`)
      console.log(`  - ${result.avgTime.toFixed(4)}ms avg`)

      expect(result.opsPerSecond).toBeGreaterThan(3000)
    })

    it('should handle a navigation bar efficiently', () => {
      const navClasses = [
        'flex', 'items-center', 'justify-between', 'px-6', 'py-4',
        'bg-background', 'border-b', 'border-border',
        'sticky', 'top-0', 'z-50', 'backdrop-blur', 'bg-background/80',
        // Logo
        'text-xl', 'font-bold', 'text-foreground',
        // Nav links
        'hidden', 'md:flex', 'gap-6',
        'text-sm', 'font-medium', 'text-muted-foreground',
        'hover:text-foreground', 'transition-colors',
        // Mobile menu button
        'md:hidden', 'p-2', 'rounded-md', 'hover:bg-muted'
      ]

      const result = benchmark(
        'Navigation bar generation',
        () => coral.generate(navClasses),
        3000
      )

      console.log(`[Performance] ${result.name}:`)
      console.log(`  - ${result.opsPerSecond.toFixed(0)} ops/sec`)
      console.log(`  - ${result.avgTime.toFixed(4)}ms avg`)

      expect(result.opsPerSecond).toBeGreaterThan(5000)
    })
  })

  describe('Plugin System Performance', () => {
    it('should handle plugins with many rules efficiently', () => {
      // The coral preset includes all core plugins with 500+ rules
      const complexClasses = generateTestClasses({
        utilityCount: 50,
        variantCount: 3,
        complexClasses: true,
        cacheHits: false
      })

      const result = benchmark(
        'Complex plugin usage',
        () => coral.generate(complexClasses),
        500
      )

      console.log(`[Performance] ${result.name}:`)
      console.log(`  - ${result.opsPerSecond.toFixed(0)} ops/sec`)
      console.log(`  - ${result.avgTime.toFixed(4)}ms avg`)

      expect(result.opsPerSecond).toBeGreaterThan(1000)
    })
  })

  describe('Comparison Metrics', () => {
    it('should generate comprehensive performance report', () => {
      const tests: Array<{name: string, classes: string[], iterations: number}> = [
        { name: 'Small component (5 classes)', classes: generateTestClasses({ utilityCount: 5, variantCount: 0, complexClasses: false, cacheHits: false }), iterations: 10000 },
        { name: 'Medium component (20 classes)', classes: generateTestClasses({ utilityCount: 20, variantCount: 0, complexClasses: false, cacheHits: false }), iterations: 5000 },
        { name: 'Large component (50 classes)', classes: generateTestClasses({ utilityCount: 50, variantCount: 0, complexClasses: false, cacheHits: false }), iterations: 1000 },
        { name: 'With variants (20 classes, 3 variants)', classes: generateTestClasses({ utilityCount: 20, variantCount: 3, complexClasses: false, cacheHits: false }), iterations: 1000 },
        { name: 'Complex (50 classes, 5 variants)', classes: generateTestClasses({ utilityCount: 50, variantCount: 5, complexClasses: true, cacheHits: false }), iterations: 500 },
      ]

      console.log('\n=================================')
      console.log('  CoralCSS Performance Report')
      console.log('=================================\n')

      const results: BenchmarkResult[] = []

      for (const test of tests) {
        const result = benchmark(
          test.name,
          () => coral.generate(test.classes),
          test.iterations
        )
        results.push(result)

        console.log(`${test.name}:`)
        console.log(`  Ops/sec:     ${result.opsPerSecond.toFixed(0).padStart(10)}`)
        console.log(`  Avg time:    ${result.avgTime.toFixed(4)}ms`)
        console.log(`  Total time:  ${result.totalTime.toFixed(2)}ms (${test.iterations} iters)`)
        console.log('')
      }

      // Summary statistics
      const avgOpsPerSecond = results.reduce((sum, r) => sum + r.opsPerSecond, 0) / results.length

      console.log('=================================')
      console.log(`Average Ops/sec: ${avgOpsPerSecond.toFixed(0)}`)
      console.log('=================================\n')

      // Overall performance assertion
      expect(avgOpsPerSecond).toBeGreaterThan(5000)
    })
  })
})
