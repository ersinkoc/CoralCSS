/**
 * Token Validators
 *
 * Validation utilities for design tokens.
 *
 * @module design-system/validators
 */

import type {
  DesignTokenFile,
  TokenGroup,
  StyleDictionaryToken,
  ValidationResult,
  ValidationError,
  ValidationWarning,
  TokenType,
} from './types'

/**
 * Validation options
 */
export interface ValidationOptions {
  /** Check for circular references */
  checkCircularRefs?: boolean
  /** Check naming conventions */
  checkNaming?: boolean
  /** Check color accessibility (contrast ratios) */
  checkAccessibility?: boolean
  /** Check for unused tokens */
  checkUnused?: boolean
  /** Custom naming pattern */
  namingPattern?: RegExp
}

/**
 * Validate design tokens
 */
export function validateTokens(
  tokens: DesignTokenFile,
  options: ValidationOptions = {}
): ValidationResult {
  const {
    checkCircularRefs = true,
    checkNaming = true,
    checkAccessibility = false,
    checkUnused = false,
    namingPattern = /^[a-z][a-z0-9-]*$/,
  } = options

  const errors: ValidationError[] = []
  const warnings: ValidationWarning[] = []
  const allTokenPaths: Set<string> = new Set()
  const references: Map<string, string[]> = new Map()

  // Collect all token paths and their references
  function collectTokens(node: TokenGroup | StyleDictionaryToken, path: string[]) {
    for (const [key, value] of Object.entries(node)) {
      if (key.startsWith('$')) {continue}

      const currentPath = [...path, key]
      const pathString = currentPath.join('.')

      if (isToken(value)) {
        const token = value as StyleDictionaryToken
        allTokenPaths.add(pathString)

        // Check for references
        const refs = extractReferences(token.$value)
        if (refs.length > 0) {
          references.set(pathString, refs)
        }

        // Validate token value
        const tokenErrors = validateTokenValue(token, currentPath)
        errors.push(...tokenErrors)

        // Check naming convention
        if (checkNaming && !namingPattern.test(key)) {
          warnings.push({
            path: pathString,
            message: `Token name "${key}" does not match naming convention`,
            type: 'naming-convention',
          })
        }

        // Check for deprecated tokens
        if (token.$deprecated) {
          warnings.push({
            path: pathString,
            message: typeof token.$deprecated === 'string'
              ? token.$deprecated
              : 'Token is deprecated',
            type: 'deprecated',
          })
        }
      } else if (typeof value === 'object' && value !== null) {
        collectTokens(value as TokenGroup, currentPath)
      }
    }
  }

  // Start collection
  for (const [key, value] of Object.entries(tokens)) {
    if (key.startsWith('$')) {continue}
    if (typeof value === 'object' && value !== null) {
      collectTokens(value as TokenGroup, [key])
    }
  }

  // Check for invalid references
  for (const [tokenPath, refs] of references) {
    for (const ref of refs) {
      if (!allTokenPaths.has(ref)) {
        errors.push({
          path: tokenPath,
          message: `Reference to unknown token: ${ref}`,
          type: 'invalid-reference',
        })
      }
    }
  }

  // Check for circular references
  if (checkCircularRefs) {
    const circularErrors = findCircularReferences(references)
    errors.push(...circularErrors)
  }

  // Check color accessibility
  if (checkAccessibility) {
    const accessibilityWarnings = checkColorAccessibility(tokens)
    warnings.push(...accessibilityWarnings)
  }

  // Check for unused tokens
  if (checkUnused) {
    const usedTokens = new Set<string>()
    for (const refs of references.values()) {
      refs.forEach(ref => usedTokens.add(ref))
    }

    for (const tokenPath of allTokenPaths) {
      // Skip semantic tokens (they reference primitives)
      if (references.has(tokenPath)) {continue}

      // Check if this primitive is referenced
      if (!usedTokens.has(tokenPath)) {
        warnings.push({
          path: tokenPath,
          message: 'Token is not referenced by any other token',
          type: 'unused',
        })
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  }
}

/**
 * Check if a value is a token (has $value property)
 */
function isToken(value: unknown): boolean {
  return typeof value === 'object' && value !== null && '$value' in value
}

/**
 * Extract token references from a value
 */
function extractReferences(value: unknown): string[] {
  const refs: string[] = []

  if (typeof value === 'string') {
    // Match {token.path} or var(--token-path)
    const refMatches = value.matchAll(/\{([^}]+)\}/g)
    for (const match of refMatches) {
      refs.push(match[1] as string)
    }
  }

  return refs
}

/**
 * Validate individual token value
 */
function validateTokenValue(
  token: StyleDictionaryToken,
  path: string[]
): ValidationError[] {
  const errors: ValidationError[] = []
  const pathString = path.join('.')

  // Check for missing value
  if (token.$value === undefined || token.$value === null) {
    errors.push({
      path: pathString,
      message: 'Token has no value',
      type: 'missing-value',
    })
    return errors
  }

  // Type-specific validation
  if (token.$type) {
    const typeError = validateTokenType(token.$value, token.$type, pathString)
    if (typeError) {
      errors.push(typeError)
    }
  }

  return errors
}

/**
 * Validate token value against its type
 */
function validateTokenType(
  value: unknown,
  type: TokenType,
  path: string
): ValidationError | null {
  // Skip validation for references
  if (typeof value === 'string' && value.includes('{')) {
    return null
  }

  switch (type) {
    case 'color':
      if (!isValidColor(value)) {
        return {
          path,
          message: `Invalid color value: ${value}`,
          type: 'invalid-type',
        }
      }
      break

    case 'dimension':
    case 'spacing':
    case 'sizing':
      if (!isValidDimension(value)) {
        return {
          path,
          message: `Invalid dimension value: ${value}`,
          type: 'invalid-type',
        }
      }
      break

    case 'fontWeight':
      if (!isValidFontWeight(value)) {
        return {
          path,
          message: `Invalid font weight: ${value}`,
          type: 'invalid-type',
        }
      }
      break

    case 'number':
      if (typeof value !== 'number' && isNaN(Number(value))) {
        return {
          path,
          message: `Invalid number: ${value}`,
          type: 'invalid-type',
        }
      }
      break

    case 'duration':
      if (!isValidDuration(value)) {
        return {
          path,
          message: `Invalid duration: ${value}`,
          type: 'invalid-type',
        }
      }
      break
  }

  return null
}

/**
 * Check if value is a valid color
 */
function isValidColor(value: unknown): boolean {
  if (typeof value !== 'string') {return false}

  // Hex color
  if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(value)) {
    return true
  }

  // RGB/RGBA
  if (/^rgba?\([^)]+\)$/.test(value)) {
    return true
  }

  // HSL/HSLA
  if (/^hsla?\([^)]+\)$/.test(value)) {
    return true
  }

  // Named colors
  const namedColors = [
    'transparent', 'currentColor', 'inherit',
    'black', 'white', 'red', 'green', 'blue', 'yellow', 'orange', 'purple',
    // Add more as needed
  ]
  if (namedColors.includes(value.toLowerCase())) {
    return true
  }

  return false
}

/**
 * Check if value is a valid dimension
 */
function isValidDimension(value: unknown): boolean {
  if (typeof value === 'number') {return true}
  if (typeof value !== 'string') {return false}

  // Check for valid CSS dimension units
  return /^-?[\d.]+(?:px|rem|em|%|vh|vw|vmin|vmax|ch|ex|cm|mm|in|pt|pc)?$/.test(value)
}

/**
 * Check if value is a valid font weight
 */
function isValidFontWeight(value: unknown): boolean {
  if (typeof value === 'number') {
    return value >= 100 && value <= 900 && value % 100 === 0
  }

  if (typeof value === 'string') {
    const validWeights = [
      'thin', 'hairline', 'extralight', 'ultralight', 'light',
      'normal', 'regular', 'medium', 'semibold', 'demibold',
      'bold', 'extrabold', 'ultrabold', 'black', 'heavy',
    ]
    return validWeights.includes(value.toLowerCase()) || /^[1-9]00$/.test(value)
  }

  return false
}

/**
 * Check if value is a valid duration
 */
function isValidDuration(value: unknown): boolean {
  if (typeof value === 'number') {return true}
  if (typeof value !== 'string') {return false}

  return /^[\d.]+(?:ms|s)?$/.test(value)
}

/**
 * Find circular references in token graph
 */
function findCircularReferences(
  references: Map<string, string[]>
): ValidationError[] {
  const errors: ValidationError[] = []
  const visited = new Set<string>()
  const visiting = new Set<string>()

  function dfs(path: string, chain: string[]): boolean {
    if (visiting.has(path)) {
      // Found circular reference
      const cycleStart = chain.indexOf(path)
      const cycle = [...chain.slice(cycleStart), path]
      errors.push({
        path: chain[chain.length - 1] || path,
        message: `Circular reference detected: ${cycle.join(' -> ')}`,
        type: 'circular-reference',
      })
      return true
    }

    if (visited.has(path)) {return false}

    visiting.add(path)
    const refs = references.get(path) || []

    for (const ref of refs) {
      if (dfs(ref, [...chain, path])) {
        return true
      }
    }

    visiting.delete(path)
    visited.add(path)
    return false
  }

  for (const path of references.keys()) {
    if (!visited.has(path)) {
      dfs(path, [])
    }
  }

  return errors
}

/**
 * Check color accessibility (contrast ratios)
 */
function checkColorAccessibility(tokens: DesignTokenFile): ValidationWarning[] {
  const warnings: ValidationWarning[] = []

  // This is a simplified check - in production, you'd want to:
  // 1. Find background/foreground color pairs
  // 2. Calculate actual contrast ratios using WCAG formulas
  // 3. Compare against WCAG AA (4.5:1) and AAA (7:1) thresholds

  // Placeholder for demonstration
  if (tokens.color) {
    const colors = tokens.color as TokenGroup
    if (colors.background && colors.foreground) {
      warnings.push({
        path: 'color',
        message: 'Consider validating contrast ratios between background and foreground colors',
        type: 'accessibility',
      })
    }
  }

  return warnings
}

/**
 * Generate validation report
 */
export function generateValidationReport(result: ValidationResult): string {
  const lines: string[] = []

  lines.push('# Token Validation Report')
  lines.push('')
  lines.push(`Status: ${result.valid ? '✅ Valid' : '❌ Invalid'}`)
  lines.push('')

  if (result.errors.length > 0) {
    lines.push('## Errors')
    lines.push('')
    for (const error of result.errors) {
      lines.push(`- **${error.path}**: ${error.message} (${error.type})`)
    }
    lines.push('')
  }

  if (result.warnings.length > 0) {
    lines.push('## Warnings')
    lines.push('')
    for (const warning of result.warnings) {
      lines.push(`- **${warning.path}**: ${warning.message} (${warning.type})`)
    }
    lines.push('')
  }

  if (result.errors.length === 0 && result.warnings.length === 0) {
    lines.push('No issues found!')
  }

  return lines.join('\n')
}

/**
 * Quick validation check (returns boolean)
 */
export function isValidTokenFile(tokens: DesignTokenFile): boolean {
  const result = validateTokens(tokens, {
    checkCircularRefs: true,
    checkNaming: false,
    checkAccessibility: false,
    checkUnused: false,
  })
  return result.valid
}
