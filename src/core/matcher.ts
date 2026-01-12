/**
 * Rule Matcher
 *
 * Matches utility class names against registered rules.
 * @module core/matcher
 */

import type { Rule, MatchResult } from '../types'
import { anchorPattern } from '../utils/regex'

/**
 * Compiled rule with pre-compiled RegExp and extracted prefix
 */
interface CompiledRule extends Rule {
  compiledPattern: RegExp
  prefix?: string
}

/**
 * Rule Matcher class
 *
 * @example
 * ```typescript
 * const matcher = new Matcher()
 * matcher.addRule({
 *   name: 'padding',
 *   pattern: /^p-(\d+)$/,
 *   generate: (match, theme) => ({ padding: theme.spacing[match[1]] })
 * })
 *
 * const result = matcher.match('p-4')
 * // { rule: {...}, match: ['p-4', '4'] }
 * ```
 */
export class Matcher {
  private rules: Map<string, CompiledRule>
  private sortedRules: CompiledRule[] | null
  private matchCache: Map<string, MatchResult | null>
  private prefixIndex: Map<string, CompiledRule[]> // Prefix -> rules with that prefix

  constructor() {
    this.rules = new Map()
    this.sortedRules = null
    this.matchCache = new Map()
    this.prefixIndex = new Map()
  }

  /**
   * Add a rule to the matcher
   *
   * @example
   * ```typescript
   * matcher.addRule({
   *   name: 'padding',
   *   pattern: /^p-(\d+)$/,
   *   generate: (match, theme) => ({ padding: theme.spacing[match[1]] }),
   *   priority: 10
   * })
   * ```
   */
  addRule(rule: Rule): void {
    // Compile pattern
    const compiledPattern =
      typeof rule.pattern === 'string' ? anchorPattern(rule.pattern) : anchorPattern(rule.pattern)

    // Extract prefix from pattern for faster matching
    const prefix = this.extractPrefix(rule.pattern)

    const compiledRule: CompiledRule = {
      ...rule,
      compiledPattern,
      prefix,
      priority: rule.priority ?? 0,
      layer: rule.layer ?? 'utilities',
    }

    const ruleName = rule.name ?? this.generateRuleName(rule.pattern)
    this.rules.set(ruleName, compiledRule)
    this.invalidateCache()
  }

  /**
   * Extract prefix from pattern for indexing
   * Examples: "^p-(\\d+)$" -> "p", "^bg-" -> "bg", "^col-span-" -> "col"
   */
  private extractPrefix(pattern: RegExp | string): string | undefined {
    let source: string
    if (typeof pattern === 'string') {
      source = pattern
    } else {
      source = pattern.source
    }

    // Match pattern starting with literal characters (stopping at first hyphen or special char)
    // This gives us the "first word" of the pattern for indexing
    const prefixMatch = source.match(/^\^?([a-zA-Z][a-zA-Z0-9]*)(?:-|[^a-zA-Z0-9])/)
    if (prefixMatch) {
      return prefixMatch[1]
    }

    return undefined
  }

  /**
   * Generate a rule name from pattern
   */
  private generateRuleName(pattern: RegExp | string): string {
    if (typeof pattern === 'string') {
      return pattern
    }
    // Extract base name from regex
    return pattern.source.replace(/[\^$\\[\](){}|+*?.]/g, '').slice(0, 40) || 'anonymous'
  }

  /**
   * Add multiple rules
   */
  addRules(rules: Rule[]): void {
    for (const rule of rules) {
      this.addRule(rule)
    }
  }

  /**
   * Remove a rule by name
   */
  removeRule(name: string): boolean {
    const removed = this.rules.delete(name)
    if (removed) {
      this.invalidateCache()
    }
    return removed
  }

  /**
   * Get a rule by name
   */
  getRule(name: string): Rule | undefined {
    return this.rules.get(name)
  }

  /**
   * Check if a rule exists
   */
  hasRule(name: string): boolean {
    return this.rules.has(name)
  }

  /**
   * Get all rules
   */
  getRules(): Rule[] {
    return Array.from(this.rules.values())
  }

  /**
   * Match a utility against all rules
   *
   * @example
   * ```typescript
   * const result = matcher.match('p-4')
   * if (result) {
   *   const css = result.rule.generate(result.match, theme)
   * }
   * ```
   */
  match(utility: string): MatchResult | null {
    // Check cache first
    const cached = this.matchCache.get(utility)
    if (cached !== undefined) {
      return cached
    }

    // Extract prefix from utility to narrow down candidate rules
    const prefix = this.extractUtilityPrefix(utility)
    let candidateRules: CompiledRule[]

    if (prefix && this.prefixIndex.has(prefix)) {
      // Use indexed rules for this prefix
      candidateRules = this.prefixIndex.get(prefix)!
    } else {
      // Fallback to all sorted rules
      candidateRules = this.getSortedRules()
    }

    // Try each candidate rule
    for (const rule of candidateRules) {
      const match = utility.match(rule.compiledPattern)
      if (match) {
        const result: MatchResult = { rule, match }
        this.matchCache.set(utility, result)
        return result
      }
    }

    // No match found
    this.matchCache.set(utility, null)
    return null
  }

  /**
   * Extract prefix from utility name for lookup
   * Examples: "p-4" -> "p", "bg-red-500" -> "bg"
   */
  private extractUtilityPrefix(utility: string): string | undefined {
    // Match prefix before first special character
    const prefixMatch = utility.match(/^([a-zA-Z][a-zA-Z0-9]*)[^a-zA-Z0-9]/)
    return prefixMatch ? prefixMatch[1] : undefined
  }

  /**
   * Match multiple utilities
   */
  matchAll(utilities: string[]): Map<string, MatchResult | null> {
    const results = new Map<string, MatchResult | null>()
    for (const utility of utilities) {
      results.set(utility, this.match(utility))
    }
    return results
  }

  /**
   * Clear the matcher
   */
  clear(): void {
    this.rules.clear()
    this.sortedRules = null
    this.matchCache.clear()
    this.prefixIndex.clear()
  }

  /**
   * Get the number of rules
   */
  get size(): number {
    return this.rules.size
  }

  /**
   * Get sorted rules by priority (highest first)
   * Also rebuilds prefix index if needed
   */
  private getSortedRules(): CompiledRule[] {
    if (this.sortedRules === null) {
      this.sortedRules = Array.from(this.rules.values()).sort(
        (a, b) => (b.priority ?? 0) - (a.priority ?? 0)
      )
      // Rebuild prefix index when sorting
      this.buildPrefixIndex(this.sortedRules)
    }
    return this.sortedRules
  }

  /**
   * Build prefix index for faster rule matching
   */
  private buildPrefixIndex(rules: CompiledRule[]): void {
    this.prefixIndex.clear()

    for (const rule of rules) {
      if (rule.prefix) {
        if (!this.prefixIndex.has(rule.prefix)) {
          this.prefixIndex.set(rule.prefix, [])
        }
        this.prefixIndex.get(rule.prefix)!.push(rule)
      }
    }
  }

  /**
   * Invalidate caches when rules change
   */
  private invalidateCache(): void {
    this.sortedRules = null
    this.matchCache.clear()
    // Note: prefixIndex will be rebuilt when getSortedRules is called
  }
}

/**
 * Create a new matcher instance
 *
 * @example
 * ```typescript
 * const matcher = createMatcher()
 * matcher.addRule({...})
 * ```
 */
export function createMatcher(): Matcher {
  return new Matcher()
}

// Alias for compatibility
export { Matcher as RuleMatcher }
