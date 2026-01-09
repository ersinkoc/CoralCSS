/**
 * Tests for error classes and factory functions
 */
import { describe, it, expect } from 'vitest'
import {
  CoralError,
  ConfigError,
  PluginNotFoundError,
  PluginDependencyError,
  InvalidRuleError,
  InvalidVariantError,
  ThemeError,
  ParseError,
  ComponentError,
  RuntimeError,
  BuildError,
  RuleConflictError,
  InvalidValueError,
  GenerationError,
  ErrorCode,
  createError,
  createConfigError,
  createPluginNotFoundError,
  createPluginDependencyError,
  createInvalidRuleError,
  createInvalidVariantError,
  createThemeError,
  createParseError,
  createComponentError,
  createRuntimeError,
  createBuildError,
  createGenerationError,
  isCoralError,
  hasErrorCode,
} from '../../src/errors'

describe('ErrorCode enum', () => {
  it('should have all expected error codes', () => {
    expect(ErrorCode.INVALID_CONFIG).toBe('INVALID_CONFIG')
    expect(ErrorCode.PLUGIN_NOT_FOUND).toBe('PLUGIN_NOT_FOUND')
    expect(ErrorCode.PLUGIN_DEPENDENCY).toBe('PLUGIN_DEPENDENCY')
    expect(ErrorCode.INVALID_RULE).toBe('INVALID_RULE')
    expect(ErrorCode.INVALID_VARIANT).toBe('INVALID_VARIANT')
    expect(ErrorCode.THEME_ERROR).toBe('THEME_ERROR')
    expect(ErrorCode.PARSE_ERROR).toBe('PARSE_ERROR')
    expect(ErrorCode.COMPONENT_ERROR).toBe('COMPONENT_ERROR')
    expect(ErrorCode.RUNTIME_ERROR).toBe('RUNTIME_ERROR')
    expect(ErrorCode.CACHE_ERROR).toBe('CACHE_ERROR')
    expect(ErrorCode.BUILD_ERROR).toBe('BUILD_ERROR')
  })
})

describe('CoralError', () => {
  it('should create error with message, code, and context', () => {
    const error = new CoralError('Test error', ErrorCode.INVALID_CONFIG, { key: 'value' })
    expect(error.message).toBe('Test error')
    expect(error.code).toBe(ErrorCode.INVALID_CONFIG)
    expect(error.context).toEqual({ key: 'value' })
    expect(error.name).toBe('CoralError')
  })

  it('should create error with empty context by default', () => {
    const error = new CoralError('Test error', ErrorCode.RUNTIME_ERROR)
    expect(error.context).toEqual({})
  })

  it('should extend Error class', () => {
    const error = new CoralError('Test error', ErrorCode.INVALID_CONFIG)
    expect(error instanceof Error).toBe(true)
    expect(error instanceof CoralError).toBe(true)
  })

  it('should have proper stack trace', () => {
    const error = new CoralError('Test error', ErrorCode.INVALID_CONFIG)
    expect(error.stack).toBeDefined()
    expect(typeof error.stack).toBe('string')
  })

  it('should convert to JSON correctly', () => {
    const error = new CoralError('Test error', ErrorCode.INVALID_CONFIG, { plugin: 'test' })
    const json = error.toJSON()
    expect(json.name).toBe('CoralError')
    expect(json.message).toBe('Test error')
    expect(json.code).toBe(ErrorCode.INVALID_CONFIG)
    expect(json.context).toEqual({ plugin: 'test' })
    expect(json.stack).toBeDefined()
  })
})

describe('ConfigError', () => {
  it('should create config error', () => {
    const error = new ConfigError('Invalid config')
    expect(error.message).toBe('Invalid config')
    expect(error.code).toBe(ErrorCode.INVALID_CONFIG)
    expect(error.name).toBe('ConfigError')
    expect(error instanceof CoralError).toBe(true)
  })

  it('should accept context', () => {
    const error = new ConfigError('Invalid config', { option: 'darkMode' })
    expect(error.context).toEqual({ option: 'darkMode' })
  })
})

describe('PluginNotFoundError', () => {
  it('should create plugin not found error', () => {
    const error = new PluginNotFoundError('my-plugin')
    expect(error.message).toBe('Plugin "my-plugin" not found')
    expect(error.code).toBe(ErrorCode.PLUGIN_NOT_FOUND)
    expect(error.name).toBe('PluginNotFoundError')
    expect(error.context.pluginName).toBe('my-plugin')
  })

  it('should merge additional context', () => {
    const error = new PluginNotFoundError('my-plugin', { version: '1.0.0' })
    expect(error.context.pluginName).toBe('my-plugin')
    expect(error.context.version).toBe('1.0.0')
  })
})

describe('PluginDependencyError', () => {
  it('should create plugin dependency error', () => {
    const error = new PluginDependencyError('my-plugin', 'required-plugin')
    expect(error.message).toBe('Plugin "my-plugin" requires "required-plugin" to be installed first')
    expect(error.code).toBe(ErrorCode.PLUGIN_DEPENDENCY)
    expect(error.name).toBe('PluginDependencyError')
    expect(error.context.pluginName).toBe('my-plugin')
    expect(error.context.missingDependency).toBe('required-plugin')
  })

  it('should merge additional context', () => {
    const error = new PluginDependencyError('my-plugin', 'required-plugin', { hint: 'install first' })
    expect(error.context.hint).toBe('install first')
  })
})

describe('InvalidRuleError', () => {
  it('should create invalid rule error', () => {
    const error = new InvalidRuleError('bg-color', 'pattern is invalid')
    expect(error.message).toBe('Invalid rule "bg-color": pattern is invalid')
    expect(error.code).toBe(ErrorCode.INVALID_RULE)
    expect(error.name).toBe('InvalidRuleError')
    expect(error.context.ruleName).toBe('bg-color')
    expect(error.context.reason).toBe('pattern is invalid')
  })

  it('should merge additional context', () => {
    const error = new InvalidRuleError('bg-color', 'pattern is invalid', { plugin: 'colors' })
    expect(error.context.plugin).toBe('colors')
  })
})

describe('InvalidVariantError', () => {
  it('should create invalid variant error', () => {
    const error = new InvalidVariantError('hover', 'transform function is required')
    expect(error.message).toBe('Invalid variant "hover": transform function is required')
    expect(error.code).toBe(ErrorCode.INVALID_VARIANT)
    expect(error.name).toBe('InvalidVariantError')
    expect(error.context.variantName).toBe('hover')
    expect(error.context.reason).toBe('transform function is required')
  })

  it('should merge additional context', () => {
    const error = new InvalidVariantError('hover', 'transform function is required', { source: 'plugin' })
    expect(error.context.source).toBe('plugin')
  })
})

describe('ThemeError', () => {
  it('should create theme error', () => {
    const error = new ThemeError('Color not found')
    expect(error.message).toBe('Color not found')
    expect(error.code).toBe(ErrorCode.THEME_ERROR)
    expect(error.name).toBe('ThemeError')
  })

  it('should accept context', () => {
    const error = new ThemeError('Color not found', { color: 'primary' })
    expect(error.context).toEqual({ color: 'primary' })
  })
})

describe('ParseError', () => {
  it('should create parse error', () => {
    const error = new ParseError('bg-[invalid', 'unclosed bracket')
    expect(error.message).toBe('Failed to parse "bg-[invalid": unclosed bracket')
    expect(error.code).toBe(ErrorCode.PARSE_ERROR)
    expect(error.name).toBe('ParseError')
    expect(error.context.input).toBe('bg-[invalid')
    expect(error.context.reason).toBe('unclosed bracket')
  })

  it('should merge additional context', () => {
    const error = new ParseError('bg-[invalid', 'unclosed bracket', { line: 1 })
    expect(error.context.line).toBe(1)
  })
})

describe('ComponentError', () => {
  it('should create component error', () => {
    const error = new ComponentError('Dialog', 'Element not found')
    expect(error.message).toBe('Component "Dialog": Element not found')
    expect(error.code).toBe(ErrorCode.COMPONENT_ERROR)
    expect(error.name).toBe('ComponentError')
    expect(error.context.componentName).toBe('Dialog')
  })

  it('should merge additional context', () => {
    const error = new ComponentError('Dialog', 'Element not found', { selector: '#modal' })
    expect(error.context.selector).toBe('#modal')
  })
})

describe('RuntimeError', () => {
  it('should create runtime error', () => {
    const error = new RuntimeError('Observer failed to start')
    expect(error.message).toBe('Observer failed to start')
    expect(error.code).toBe(ErrorCode.RUNTIME_ERROR)
    expect(error.name).toBe('RuntimeError')
  })

  it('should accept context', () => {
    const error = new RuntimeError('Observer failed', { reason: 'DOM not ready' })
    expect(error.context).toEqual({ reason: 'DOM not ready' })
  })
})

describe('BuildError', () => {
  it('should create build error', () => {
    const error = new BuildError('Failed to compile')
    expect(error.message).toBe('Failed to compile')
    expect(error.code).toBe(ErrorCode.BUILD_ERROR)
    expect(error.name).toBe('BuildError')
  })

  it('should accept context', () => {
    const error = new BuildError('Failed to compile', { file: 'input.css' })
    expect(error.context).toEqual({ file: 'input.css' })
  })
})

describe('RuleConflictError', () => {
  it('should create rule conflict error', () => {
    const error = new RuleConflictError('bg-red', 'bg-blue')
    expect(error.message).toBe('Rule conflict between "bg-red" and "bg-blue"')
    expect(error.code).toBe(ErrorCode.INVALID_RULE)
    expect(error.name).toBe('RuleConflictError')
    expect(error.context.ruleName1).toBe('bg-red')
    expect(error.context.ruleName2).toBe('bg-blue')
  })

  it('should merge additional context', () => {
    const error = new RuleConflictError('bg-red', 'bg-blue', { priority: 'high' })
    expect(error.context.priority).toBe('high')
  })
})

describe('InvalidValueError', () => {
  it('should create invalid value error', () => {
    const error = new InvalidValueError('darkMode', 'must be one of: class, media')
    expect(error.message).toBe('Invalid value "darkMode": must be one of: class, media')
    expect(error.code).toBe(ErrorCode.INVALID_CONFIG)
    expect(error.name).toBe('InvalidValueError')
    expect(error.context.valueName).toBe('darkMode')
    expect(error.context.reason).toBe('must be one of: class, media')
  })

  it('should merge additional context', () => {
    const error = new InvalidValueError('darkMode', 'invalid', { received: 'foo' })
    expect(error.context.received).toBe('foo')
  })
})

describe('GenerationError', () => {
  it('should create generation error', () => {
    const error = new GenerationError('CSS generation failed')
    expect(error.message).toBe('CSS generation failed')
    expect(error.code).toBe(ErrorCode.RUNTIME_ERROR)
    expect(error.name).toBe('GenerationError')
  })

  it('should accept context', () => {
    const error = new GenerationError('CSS generation failed', { className: 'bg-invalid' })
    expect(error.context).toEqual({ className: 'bg-invalid' })
  })
})

describe('Error Factory Functions', () => {
  describe('createError', () => {
    it('should create generic CoralError', () => {
      const error = createError(ErrorCode.CACHE_ERROR, 'Cache miss', { key: 'abc' })
      expect(error instanceof CoralError).toBe(true)
      expect(error.code).toBe(ErrorCode.CACHE_ERROR)
      expect(error.message).toBe('Cache miss')
      expect(error.context).toEqual({ key: 'abc' })
    })

    it('should work without context', () => {
      const error = createError(ErrorCode.CACHE_ERROR, 'Cache miss')
      expect(error.context).toEqual({})
    })
  })

  describe('createConfigError', () => {
    it('should create ConfigError', () => {
      const error = createConfigError('Invalid option')
      expect(error instanceof ConfigError).toBe(true)
      expect(error.message).toBe('Invalid option')
    })

    it('should work with context', () => {
      const error = createConfigError('Invalid option', { option: 'theme' })
      expect(error.context).toEqual({ option: 'theme' })
    })
  })

  describe('createPluginNotFoundError', () => {
    it('should create PluginNotFoundError', () => {
      const error = createPluginNotFoundError('missing-plugin')
      expect(error instanceof PluginNotFoundError).toBe(true)
      expect(error.context.pluginName).toBe('missing-plugin')
    })

    it('should work with context', () => {
      const error = createPluginNotFoundError('missing-plugin', { version: '2.0' })
      expect(error.context.version).toBe('2.0')
    })
  })

  describe('createPluginDependencyError', () => {
    it('should create PluginDependencyError', () => {
      const error = createPluginDependencyError('plugin-a', 'plugin-b')
      expect(error instanceof PluginDependencyError).toBe(true)
      expect(error.context.pluginName).toBe('plugin-a')
      expect(error.context.missingDependency).toBe('plugin-b')
    })

    it('should work with context', () => {
      const error = createPluginDependencyError('plugin-a', 'plugin-b', { optional: false })
      expect(error.context.optional).toBe(false)
    })
  })

  describe('createInvalidRuleError', () => {
    it('should create InvalidRuleError', () => {
      const error = createInvalidRuleError('my-rule', 'invalid pattern')
      expect(error instanceof InvalidRuleError).toBe(true)
      expect(error.context.ruleName).toBe('my-rule')
      expect(error.context.reason).toBe('invalid pattern')
    })

    it('should work with context', () => {
      const error = createInvalidRuleError('my-rule', 'invalid', { source: 'test' })
      expect(error.context.source).toBe('test')
    })
  })

  describe('createInvalidVariantError', () => {
    it('should create InvalidVariantError', () => {
      const error = createInvalidVariantError('my-variant', 'missing transform')
      expect(error instanceof InvalidVariantError).toBe(true)
      expect(error.context.variantName).toBe('my-variant')
      expect(error.context.reason).toBe('missing transform')
    })

    it('should work with context', () => {
      const error = createInvalidVariantError('my-variant', 'invalid', { line: 10 })
      expect(error.context.line).toBe(10)
    })
  })

  describe('createThemeError', () => {
    it('should create ThemeError', () => {
      const error = createThemeError('Theme not found')
      expect(error instanceof ThemeError).toBe(true)
      expect(error.message).toBe('Theme not found')
    })

    it('should work with context', () => {
      const error = createThemeError('Theme not found', { theme: 'dark' })
      expect(error.context).toEqual({ theme: 'dark' })
    })
  })

  describe('createParseError', () => {
    it('should create ParseError', () => {
      const error = createParseError('invalid-syntax', 'unexpected token')
      expect(error instanceof ParseError).toBe(true)
      expect(error.context.input).toBe('invalid-syntax')
      expect(error.context.reason).toBe('unexpected token')
    })

    it('should work with context', () => {
      const error = createParseError('invalid', 'error', { pos: 5 })
      expect(error.context.pos).toBe(5)
    })
  })

  describe('createComponentError', () => {
    it('should create ComponentError', () => {
      const error = createComponentError('Tabs', 'Invalid tab index')
      expect(error instanceof ComponentError).toBe(true)
      expect(error.context.componentName).toBe('Tabs')
    })

    it('should work with context', () => {
      const error = createComponentError('Tabs', 'Invalid', { index: -1 })
      expect(error.context.index).toBe(-1)
    })
  })

  describe('createRuntimeError', () => {
    it('should create RuntimeError', () => {
      const error = createRuntimeError('Runtime failure')
      expect(error instanceof RuntimeError).toBe(true)
      expect(error.message).toBe('Runtime failure')
    })

    it('should work with context', () => {
      const error = createRuntimeError('Runtime failure', { phase: 'init' })
      expect(error.context).toEqual({ phase: 'init' })
    })
  })

  describe('createBuildError', () => {
    it('should create BuildError', () => {
      const error = createBuildError('Build failure')
      expect(error instanceof BuildError).toBe(true)
      expect(error.message).toBe('Build failure')
    })

    it('should work with context', () => {
      const error = createBuildError('Build failure', { step: 'compile' })
      expect(error.context).toEqual({ step: 'compile' })
    })
  })

  describe('createGenerationError', () => {
    it('should create GenerationError', () => {
      const error = createGenerationError('Generation failure')
      expect(error instanceof GenerationError).toBe(true)
      expect(error.message).toBe('Generation failure')
    })

    it('should work with context', () => {
      const error = createGenerationError('Generation failure', { rule: 'bg-red' })
      expect(error.context).toEqual({ rule: 'bg-red' })
    })
  })
})

describe('Type Guards', () => {
  describe('isCoralError', () => {
    it('should return true for CoralError', () => {
      const error = new CoralError('Test', ErrorCode.INVALID_CONFIG)
      expect(isCoralError(error)).toBe(true)
    })

    it('should return true for subclasses', () => {
      expect(isCoralError(new ConfigError('Test'))).toBe(true)
      expect(isCoralError(new PluginNotFoundError('test'))).toBe(true)
      expect(isCoralError(new ParseError('input', 'reason'))).toBe(true)
      expect(isCoralError(new ThemeError('Test'))).toBe(true)
      expect(isCoralError(new RuntimeError('Test'))).toBe(true)
      expect(isCoralError(new BuildError('Test'))).toBe(true)
      expect(isCoralError(new GenerationError('Test'))).toBe(true)
    })

    it('should return false for regular Error', () => {
      const error = new Error('Test')
      expect(isCoralError(error)).toBe(false)
    })

    it('should return false for non-errors', () => {
      expect(isCoralError(null)).toBe(false)
      expect(isCoralError(undefined)).toBe(false)
      expect(isCoralError('error')).toBe(false)
      expect(isCoralError(123)).toBe(false)
      expect(isCoralError({})).toBe(false)
    })
  })

  describe('hasErrorCode', () => {
    it('should return true when error has matching code', () => {
      const error = new CoralError('Test', ErrorCode.INVALID_CONFIG)
      expect(hasErrorCode(error, ErrorCode.INVALID_CONFIG)).toBe(true)
    })

    it('should return false when error has different code', () => {
      const error = new CoralError('Test', ErrorCode.INVALID_CONFIG)
      expect(hasErrorCode(error, ErrorCode.PARSE_ERROR)).toBe(false)
    })

    it('should return false for non-CoralError', () => {
      const error = new Error('Test')
      expect(hasErrorCode(error, ErrorCode.INVALID_CONFIG)).toBe(false)
    })

    it('should return false for non-errors', () => {
      expect(hasErrorCode(null, ErrorCode.INVALID_CONFIG)).toBe(false)
      expect(hasErrorCode('error', ErrorCode.INVALID_CONFIG)).toBe(false)
    })

    it('should work with subclasses', () => {
      const error = new ConfigError('Test')
      expect(hasErrorCode(error, ErrorCode.INVALID_CONFIG)).toBe(true)
      expect(hasErrorCode(error, ErrorCode.PARSE_ERROR)).toBe(false)
    })
  })
})
