/**
 * CoralCSS Error Classes
 *
 * Custom error classes for better error handling and debugging.
 * @module errors
 */

/**
 * Error codes for CoralCSS errors
 */
export enum ErrorCode {
  /** Invalid configuration provided */
  INVALID_CONFIG = 'INVALID_CONFIG',
  /** Plugin not found */
  PLUGIN_NOT_FOUND = 'PLUGIN_NOT_FOUND',
  /** Plugin dependency not satisfied */
  PLUGIN_DEPENDENCY = 'PLUGIN_DEPENDENCY',
  /** Invalid rule definition */
  INVALID_RULE = 'INVALID_RULE',
  /** Invalid variant definition */
  INVALID_VARIANT = 'INVALID_VARIANT',
  /** Theme error */
  THEME_ERROR = 'THEME_ERROR',
  /** Parse error */
  PARSE_ERROR = 'PARSE_ERROR',
  /** Component error */
  COMPONENT_ERROR = 'COMPONENT_ERROR',
  /** Runtime error */
  RUNTIME_ERROR = 'RUNTIME_ERROR',
  /** Cache error */
  CACHE_ERROR = 'CACHE_ERROR',
  /** Build error */
  BUILD_ERROR = 'BUILD_ERROR',
}

/**
 * Context object for errors
 */
export interface ErrorContext {
  [key: string]: unknown
}

/**
 * Documentation links for common issues
 */
const DOCS_BASE = 'https://coralcss.dev/docs'
const ERROR_DOCS: Partial<Record<ErrorCode, string>> = {
  [ErrorCode.INVALID_CONFIG]: `${DOCS_BASE}/configuration`,
  [ErrorCode.PLUGIN_DEPENDENCY]: `${DOCS_BASE}/plugins#dependencies`,
  [ErrorCode.THEME_ERROR]: `${DOCS_BASE}/theme`,
  [ErrorCode.PARSE_ERROR]: `${DOCS_BASE}/utilities`,
  [ErrorCode.COMPONENT_ERROR]: `${DOCS_BASE}/components`,
}

/**
 * Base error class for all CoralCSS errors
 *
 * @example
 * ```typescript
 * throw new CoralError(
 *   'Invalid plugin configuration',
 *   ErrorCode.INVALID_CONFIG,
 *   { plugin: 'my-plugin' }
 * )
 * ```
 */
export class CoralError extends Error {
  /** Error code for programmatic handling */
  public readonly code: ErrorCode
  /** Additional context about the error */
  public readonly context: ErrorContext
  /** Suggestions for fixing the error */
  public readonly suggestions: string[]
  /** Link to relevant documentation */
  public readonly docsUrl?: string

  constructor(
    message: string,
    code: ErrorCode,
    context: ErrorContext = {},
    suggestions: string[] = []
  ) {
    super(message)
    this.name = 'CoralError'
    this.code = code
    this.context = context
    this.suggestions = suggestions
    this.docsUrl = ERROR_DOCS[code]

    // Maintains proper stack trace for where error was thrown (V8 engines)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CoralError)
    }
  }

  /**
   * Convert error to JSON for logging/serialization
   */
  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      context: this.context,
      suggestions: this.suggestions,
      docsUrl: this.docsUrl,
      stack: this.stack,
    }
  }

  /**
   * Get a formatted error message with suggestions
   */
  getFormattedMessage(): string {
    let formatted = `[${this.code}] ${this.message}`

    if (this.suggestions.length > 0) {
      formatted += '\n\nSuggestions:'
      for (const suggestion of this.suggestions) {
        formatted += `\n  • ${suggestion}`
      }
    }

    if (this.docsUrl) {
      formatted += `\n\nDocs: ${this.docsUrl}`
    }

    return formatted
  }
}

/**
 * Error thrown when configuration is invalid
 */
export class ConfigError extends CoralError {
  constructor(message: string, context: ErrorContext = {}, suggestions?: string[]) {
    super(message, ErrorCode.INVALID_CONFIG, context, suggestions ?? [
      'Check your coral.config.ts/js file for typos',
      'Ensure all required fields are present',
      'Verify that values match the expected types',
    ])
    this.name = 'ConfigError'
  }
}

/**
 * Error thrown when a plugin is not found
 */
export class PluginNotFoundError extends CoralError {
  constructor(pluginName: string, context: ErrorContext = {}, suggestions?: string[]) {
    super(`Plugin "${pluginName}" not found`, ErrorCode.PLUGIN_NOT_FOUND, {
      pluginName,
      ...context,
    }, suggestions ?? [
      `Install the plugin: npm install ${pluginName}`,
      'Check that the plugin name is spelled correctly',
      'Ensure the plugin is listed in your configuration',
    ])
    this.name = 'PluginNotFoundError'
  }
}

/**
 * Error thrown when plugin dependencies are not satisfied
 */
export class PluginDependencyError extends CoralError {
  constructor(pluginName: string, missingDependency: string, context: ErrorContext = {}, suggestions?: string[]) {
    super(
      `Plugin "${pluginName}" requires "${missingDependency}" to be installed first`,
      ErrorCode.PLUGIN_DEPENDENCY,
      { pluginName, missingDependency, ...context },
      suggestions ?? [
        `Install the dependency: npm install ${missingDependency}`,
        `Add "${missingDependency}" to your plugins array before "${pluginName}"`,
        'Check the plugin documentation for required dependencies',
      ]
    )
    this.name = 'PluginDependencyError'
  }
}

/**
 * Error thrown when a rule definition is invalid
 */
export class InvalidRuleError extends CoralError {
  constructor(ruleName: string, reason: string, context: ErrorContext = {}, suggestions?: string[]) {
    super(`Invalid rule "${ruleName}": ${reason}`, ErrorCode.INVALID_RULE, {
      ruleName,
      reason,
      ...context,
    }, suggestions ?? [
      'Check the rule syntax matches the expected pattern',
      'Ensure arbitrary values are properly bracketed: [value]',
      'Verify the utility name exists in your configuration',
    ])
    this.name = 'InvalidRuleError'
  }
}

/**
 * Error thrown when a variant definition is invalid
 */
export class InvalidVariantError extends CoralError {
  constructor(variantName: string, reason: string, context: ErrorContext = {}, suggestions?: string[]) {
    super(`Invalid variant "${variantName}": ${reason}`, ErrorCode.INVALID_VARIANT, {
      variantName,
      reason,
      ...context,
    }, suggestions ?? [
      'Check the variant name for typos (e.g., hover:, focus:, dark:)',
      'Ensure custom variants are registered in your configuration',
      'Verify the variant syntax: variant:utility',
    ])
    this.name = 'InvalidVariantError'
  }
}

/**
 * Error thrown when theme operations fail
 */
export class ThemeError extends CoralError {
  constructor(message: string, context: ErrorContext = {}, suggestions?: string[]) {
    super(message, ErrorCode.THEME_ERROR, context, suggestions ?? [
      'Check the theme path exists: theme("colors.blue.500")',
      'Ensure the theme value is defined in your configuration',
      'Verify nested paths use dot notation',
    ])
    this.name = 'ThemeError'
  }
}

/**
 * Error thrown when parsing fails
 */
export class ParseError extends CoralError {
  constructor(input: string, reason: string, context: ErrorContext = {}, suggestions?: string[]) {
    super(`Failed to parse "${input}": ${reason}`, ErrorCode.PARSE_ERROR, {
      input,
      reason,
      ...context,
    }, suggestions ?? [
      'Check for unclosed brackets or parentheses',
      'Ensure special characters are properly escaped',
      'Verify the class name follows utility naming conventions',
    ])
    this.name = 'ParseError'
  }
}

/**
 * Error thrown when component operations fail
 */
export class ComponentError extends CoralError {
  constructor(componentName: string, message: string, context: ErrorContext = {}, suggestions?: string[]) {
    super(`Component "${componentName}": ${message}`, ErrorCode.COMPONENT_ERROR, {
      componentName,
      ...context,
    }, suggestions ?? [
      'Ensure the component is properly initialized',
      'Check that required DOM elements exist',
      'Verify event listeners are attached to valid elements',
    ])
    this.name = 'ComponentError'
  }
}

/**
 * Error thrown during runtime operations
 */
export class RuntimeError extends CoralError {
  constructor(message: string, context: ErrorContext = {}, suggestions?: string[]) {
    super(message, ErrorCode.RUNTIME_ERROR, context, suggestions ?? [
      'Check the browser console for additional details',
      'Ensure CoralCSS is properly initialized',
      'Verify all required dependencies are loaded',
    ])
    this.name = 'RuntimeError'
  }
}

/**
 * Error thrown during build operations
 */
export class BuildError extends CoralError {
  constructor(message: string, context: ErrorContext = {}, suggestions?: string[]) {
    super(message, ErrorCode.BUILD_ERROR, context, suggestions ?? [
      'Check your build configuration for errors',
      'Ensure all source files are accessible',
      'Try clearing the cache and rebuilding',
    ])
    this.name = 'BuildError'
  }
}

/**
 * Error thrown when rules conflict
 */
export class RuleConflictError extends CoralError {
  constructor(ruleName1: string, ruleName2: string, context: ErrorContext = {}, suggestions?: string[]) {
    super(
      `Rule conflict between "${ruleName1}" and "${ruleName2}"`,
      ErrorCode.INVALID_RULE,
      { ruleName1, ruleName2, ...context },
      suggestions ?? [
        'Remove one of the conflicting rules',
        'Use more specific variants to distinguish rules',
        'Check if both rules target the same CSS property',
      ]
    )
    this.name = 'RuleConflictError'
  }
}

/**
 * Error thrown when a value is invalid
 */
export class InvalidValueError extends CoralError {
  constructor(valueName: string, reason: string, context: ErrorContext = {}, suggestions?: string[]) {
    super(`Invalid value "${valueName}": ${reason}`, ErrorCode.INVALID_CONFIG, {
      valueName,
      reason,
      ...context,
    }, suggestions ?? [
      'Check the value type matches what is expected',
      'Ensure numeric values are within valid ranges',
      'Verify color values use a valid format (hex, rgb, hsl)',
    ])
    this.name = 'InvalidValueError'
  }
}

/**
 * Error thrown during CSS generation
 */
export class GenerationError extends CoralError {
  constructor(message: string, context: ErrorContext = {}, suggestions?: string[]) {
    super(message, ErrorCode.RUNTIME_ERROR, context, suggestions ?? [
      'Check for circular dependencies in your styles',
      'Ensure all referenced theme values exist',
      'Verify custom CSS syntax is valid',
    ])
    this.name = 'GenerationError'
  }
}

// =============================================================================
// Error Factory Functions
// =============================================================================

/**
 * Create an error for invalid configuration
 *
 * @example
 * ```typescript
 * throw createConfigError('darkMode must be one of: class, media, selector, auto', {
 *   received: 'invalid'
 * })
 * ```
 */
export function createConfigError(message: string, context?: ErrorContext): ConfigError {
  return new ConfigError(message, context)
}

/**
 * Create an error for missing plugin
 */
export function createPluginNotFoundError(
  pluginName: string,
  context?: ErrorContext
): PluginNotFoundError {
  return new PluginNotFoundError(pluginName, context)
}

/**
 * Create an error for unsatisfied plugin dependency
 */
export function createPluginDependencyError(
  pluginName: string,
  missingDependency: string,
  context?: ErrorContext
): PluginDependencyError {
  return new PluginDependencyError(pluginName, missingDependency, context)
}

/**
 * Create an error for invalid rule
 */
export function createInvalidRuleError(
  ruleName: string,
  reason: string,
  context?: ErrorContext
): InvalidRuleError {
  return new InvalidRuleError(ruleName, reason, context)
}

/**
 * Create an error for invalid variant
 */
export function createInvalidVariantError(
  variantName: string,
  reason: string,
  context?: ErrorContext
): InvalidVariantError {
  return new InvalidVariantError(variantName, reason, context)
}

/**
 * Create a theme error
 */
export function createThemeError(message: string, context?: ErrorContext): ThemeError {
  return new ThemeError(message, context)
}

/**
 * Create a parse error
 */
export function createParseError(input: string, reason: string, context?: ErrorContext): ParseError {
  return new ParseError(input, reason, context)
}

/**
 * Create a component error
 */
export function createComponentError(
  componentName: string,
  message: string,
  context?: ErrorContext
): ComponentError {
  return new ComponentError(componentName, message, context)
}

/**
 * Create a runtime error
 */
export function createRuntimeError(message: string, context?: ErrorContext): RuntimeError {
  return new RuntimeError(message, context)
}

/**
 * Create a build error
 */
export function createBuildError(message: string, context?: ErrorContext): BuildError {
  return new BuildError(message, context)
}

/**
 * Create a generation error
 */
export function createGenerationError(message: string, context?: ErrorContext): GenerationError {
  return new GenerationError(message, context)
}

/**
 * Generic error factory
 */
export function createError(code: ErrorCode, message: string, context?: ErrorContext): CoralError {
  return new CoralError(message, code, context)
}

// =============================================================================
// Type Guards
// =============================================================================

/**
 * Check if an error is a CoralError
 */
export function isCoralError(error: unknown): error is CoralError {
  return error instanceof CoralError
}

/**
 * Check if an error has a specific error code
 */
export function hasErrorCode(error: unknown, code: ErrorCode): boolean {
  return isCoralError(error) && error.code === code
}
