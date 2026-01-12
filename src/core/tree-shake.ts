/**
 * Tree Shaking System
 *
 * Removes unused rules and utilities from the final CSS output
 * to reduce bundle size and improve performance.
 *
 * @module core/tree-shake
 */

import type { Rule, RuleConfig } from '../types'

/**
 * Tree shaking options
 */
export interface TreeShakeOptions {
  /** Enable tree shaking */
  enabled?: boolean
  /** Classes to include (safelist) */
  include?: string[]
  /** Classes to exclude */
  exclude?: string[]
  /** Patterns to always include */
  includePatterns?: RegExp[]
  /** Patterns to always exclude */
  excludePatterns?: RegExp[]
  /** Keep variants (even if unused) */
  keepVariants?: boolean
  /** Keep dynamic classes (arbitrary values) */
  keepDynamic?: boolean
}

/**
 * Usage analysis result
 */
export interface UsageAnalysis {
  /** Total rules registered */
  totalRules: number
  /** Used rules */
  usedRules: number
  /** Unused rules */
  unusedRules: number
  /** Tree shake effectiveness */
  effectiveness: number
  /** Memory saved (bytes estimate) */
  memorySaved: number
}

/**
 * Tree Shaking - Removes unused CSS rules
 *
 * @example
 * ```typescript
 * const treeShake = new TreeShake({
 *   include: ['p-4', 'bg-red-500', /^text-/],
 *   exclude: ['print:'],
 *   keepDynamic: true
 * })
 *
 * const usedClasses = ['p-4', 'bg-red-500', 'text-lg']
 * const optimized = treeShake.shake(rules, usedClasses)
 * ```
 */
export class TreeShake {
  private options: Required<TreeShakeOptions>
  private usedClasses: Set<string> = new Set()
  private usedVariants: Set<string> = new Set()

  constructor(options: TreeShakeOptions = {}) {
    this.options = {
      enabled: options.enabled ?? true,
      include: options.include ?? [],
      exclude: options.exclude ?? [],
      includePatterns: options.includePatterns ?? [],
      excludePatterns: options.excludePatterns ?? [],
      keepVariants: options.keepVariants ?? false,
      keepDynamic: options.keepDynamic ?? true
    }
  }

  /**
   * Analyze which classes are actually used
   */
  analyzeUsage(classes: string[]): void {
    this.usedClasses.clear()
    this.usedVariants.clear()

    for (const className of classes) {
      // Extract base class and variants
      const parts = className.split(':')
      const baseClass = parts[parts.length - 1]

      this.usedClasses.add(baseClass)

      // Track variants
      for (let i = 0; i < parts.length - 1; i++) {
        this.usedVariants.add(parts[i])
      }
    }
  }

  /**
   * Check if a rule should be kept
   */
  shouldKeepRule(rule: RuleConfig): boolean {
    if (!this.options.enabled) {
      return true
    }

    // Always keep if in include list
    for (const pattern of this.options.includePatterns) {
      if (pattern.test(rule.pattern)) {
        return true
      }
    }

    // Exclude if in exclude patterns
    for (const pattern of this.options.excludePatterns) {
      if (pattern.test(rule.pattern)) {
        return false
      }
    }

    // Check if pattern matches used classes
    const patternStr = typeof rule.pattern === 'string'
      ? rule.pattern
      : rule.pattern.source

    // Check against used classes
    for (const usedClass of this.usedClasses) {
      if (this.matchesPattern(patternStr, usedClass)) {
        return true
      }
    }

    // Keep dynamic/arbitrary value classes
    if (this.options.keepDynamic) {
      if (patternStr.includes('\\[') || patternStr.includes('[')) {
        return true
      }
    }

    return false
  }

  /**
   * Check if pattern matches class name
   */
  private matchesPattern(pattern: string, className: string): boolean {
    // Convert pattern to regex if needed
    let regex: RegExp

    if (pattern.startsWith('^') && pattern.endsWith('$')) {
      regex = new RegExp(pattern)
    } else {
      // Simple string matching for non-regex patterns
      return className.startsWith(pattern.replace(/[*?]/g, ''))
    }

    return regex.test(className)
  }

  /**
   * Shake rules - remove unused
   */
  shake(rules: Rule[], usedClasses: string[]): Rule[] {
    this.analyzeUsage(usedClasses)

    return rules.filter(rule => {
      // Keep if rule config matches
      if (this.shouldKeepRule(rule)) {
        return true
      }

      // Check if variant should be kept
      if (this.options.keepVariants) {
        return true
      }

      return false
    })
  }

  /**
   * Analyze tree shaking effectiveness
   */
  analyze(rules: Rule[], usedClasses: string[]): UsageAnalysis {
    const beforeShake = rules.length
    const afterShake = this.shake([...rules], usedClasses).length

    const totalRules = beforeShake
    const usedRules = afterShake
    const unusedRules = totalRules - usedRules
    const effectiveness = totalRules > 0 ? (unusedRules / totalRules) * 100 : 0

    // Estimate memory saved (rough estimate: 100 bytes per rule)
    const memorySaved = unusedRules * 100

    return {
      totalRules,
      usedRules,
      unusedRules,
      effectiveness,
      memorySaved
    }
  }

  /**
   * Generate report
   */
  generateReport(rules: Rule[], usedClasses: string[]): string {
    const analysis = this.analyze(rules, usedClasses)

    return `
Tree Shaking Report
==================
Total Rules:     ${analysis.totalRules}
Used Rules:      ${analysis.usedRules}
Unused Rules:    ${analysis.unusedRules}
Effectiveness:  ${analysis.effectiveness.toFixed(1)}%
Memory Saved:    ~${(analysis.memorySaved / 1024).toFixed(2)} KB

Safelisted Patterns: ${this.options.includePatterns.length}
Excluded Patterns:   ${this.options.excludePatterns.length}
    `.trim()
  }

  /**
   * Add pattern to include list
   */
  includePattern(pattern: string | RegExp): void {
    const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern
    this.options.includePatterns.push(regex)
  }

  /**
   * Add pattern to exclude list
   */
  excludePattern(pattern: string | RegExp): void {
    const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern
    this.options.excludePatterns.push(regex)
  }

  /**
   * Add classes to safelist
   */
  safelist(...classes: string[]): void {
    for (const cls of classes) {
      this.options.include.push(cls)
    }
  }

  /**
   * Get current options
   */
  getOptions(): TreeShakeOptions {
    return { ...this.options }
  }

  /**
   * Reset usage analysis
   */
  reset(): void {
    this.usedClasses.clear()
    this.usedVariants.clear()
  }

  /**
   * Get used classes
   */
  getUsedClasses(): string[] {
    return Array.from(this.usedClasses)
  }

  /**
   * Get used variants
   */
  getUsedVariants(): string[] {
    return Array.from(this.usedVariants)
  }
}

/**
 * Create a new tree shaker
 *
 * @example
 * ```typescript
 * const treeShake = createTreeShake({
 *   includePatterns: [/^p-/, /^m-/, /^bg-/],
 *   keepDynamic: true
 * })
 * ```
 */
export function createTreeShake(options?: TreeShakeOptions): TreeShake {
  return new TreeShake(options)
}

/**
 * Optimize rules by tree shaking unused ones
 *
 * @example
 * ```typescript
 * const optimized = treeShakeRules(allRules, ['p-4', 'bg-red-500'])
 * ```
 */
export function treeShakeRules(
  rules: Rule[],
  usedClasses: string[],
  options?: TreeShakeOptions
): Rule[] {
  const treeShake = new TreeShake(options)
  return treeShake.shake(rules, usedClasses)
}

/**
 * Analyze rule usage
 *
 * @example
 * ```typescript
 * const analysis = analyzeRuleUsage(allRules, ['p-4', 'bg-red-500'])
 * console.log(`Can save ${analysis.memorySaved} bytes`)
 * ```
 */
export function analyzeRuleUsage(
  rules: Rule[],
  usedClasses: string[],
  options?: TreeShakeOptions
): UsageAnalysis {
  const treeShake = new TreeShake(options)
  return treeShake.analyze(rules, usedClasses)
}

export default {
  TreeShake,
  createTreeShake,
  treeShakeRules,
  analyzeRuleUsage
}
