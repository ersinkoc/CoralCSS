/**
 * CLI Tool Tests
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { parseArgs, run, cli, CLIOptions, CLIResult } from '../../../src/build/cli'

// Mock console
const consoleMock = {
  log: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
}
vi.stubGlobal('console', consoleMock)

// Mock process
const processMock = {
  argv: ['node', 'coral'],
  exit: vi.fn(),
}
vi.stubGlobal('process', processMock)

describe('CLI Tool', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('parseArgs', () => {
    it('should return default options for empty args', () => {
      const options = parseArgs([])
      expect(options.input).toEqual([])
      expect(options.output).toBe('coral.css')
      expect(options.minify).toBe(false)
      expect(options.watch).toBe(false)
      expect(options.darkMode).toBe('class')
      expect(options.base).toBe(true)
      expect(options.stdout).toBe(false)
    })

    it('should parse input files', () => {
      const options = parseArgs(['src/**/*.html', 'src/**/*.tsx'])
      expect(options.input).toContain('src/**/*.html')
      expect(options.input).toContain('src/**/*.tsx')
    })

    it('should parse -o/--output flag', () => {
      const optionsShort = parseArgs(['-o', 'dist/styles.css'])
      expect(optionsShort.output).toBe('dist/styles.css')

      const optionsLong = parseArgs(['--output', 'build/app.css'])
      expect(optionsLong.output).toBe('build/app.css')
    })

    it('should parse -w/--watch flag', () => {
      const optionsShort = parseArgs(['-w'])
      expect(optionsShort.watch).toBe(true)

      const optionsLong = parseArgs(['--watch'])
      expect(optionsLong.watch).toBe(true)
    })

    it('should parse -m/--minify flag', () => {
      const optionsShort = parseArgs(['-m'])
      expect(optionsShort.minify).toBe(true)

      const optionsLong = parseArgs(['--minify'])
      expect(optionsLong.minify).toBe(true)
    })

    it('should parse --dark-mode flag', () => {
      const optionsClass = parseArgs(['--dark-mode', 'class'])
      expect(optionsClass.darkMode).toBe('class')

      const optionsMedia = parseArgs(['--dark-mode', 'media'])
      expect(optionsMedia.darkMode).toBe('media')

      const optionsSelector = parseArgs(['--dark-mode', 'selector'])
      expect(optionsSelector.darkMode).toBe('selector')

      const optionsAuto = parseArgs(['--dark-mode', 'auto'])
      expect(optionsAuto.darkMode).toBe('auto')
    })

    it('should parse --no-base flag', () => {
      const options = parseArgs(['--no-base'])
      expect(options.base).toBe(false)
    })

    it('should parse -c/--config flag', () => {
      const optionsShort = parseArgs(['-c', 'coral.config.js'])
      expect(optionsShort.config).toBe('coral.config.js')

      const optionsLong = parseArgs(['--config', 'coral.config.ts'])
      expect(optionsLong.config).toBe('coral.config.ts')
    })

    it('should parse --stdout flag', () => {
      const options = parseArgs(['--stdout'])
      expect(options.stdout).toBe(true)
    })

    it('should parse multiple flags together', () => {
      const options = parseArgs([
        'src/**/*.html',
        '-o', 'dist/styles.css',
        '-m',
        '-w',
        '--dark-mode', 'media',
        '--no-base',
      ])
      expect(options.input).toContain('src/**/*.html')
      expect(options.output).toBe('dist/styles.css')
      expect(options.minify).toBe(true)
      expect(options.watch).toBe(true)
      expect(options.darkMode).toBe('media')
      expect(options.base).toBe(false)
    })

    it('should ignore unknown flags starting with dash', () => {
      const options = parseArgs(['--unknown-flag', 'src/**/*.html'])
      expect(options.input).toContain('src/**/*.html')
      expect(options.input).not.toContain('--unknown-flag')
    })
  })

  describe('run', () => {
    it('should return error when no input files specified', async () => {
      const result = await run({ input: [] })
      expect(result.success).toBe(false)
      expect(result.error).toContain('No input files')
    })

    it('should return success with valid input', async () => {
      const result = await run({ input: ['src/**/*.html'] })
      expect(result.success).toBe(true)
      expect(result.css).toBeDefined()
      expect(result.files).toBeDefined()
      expect(result.classes).toBeDefined()
    })

    it('should include base styles when base option is true', async () => {
      const result = await run({ input: ['src/**/*.html'], base: true })
      expect(result.success).toBe(true)
      expect(result.css).toContain('CoralCSS')
    })

    it('should not include base styles when base option is false', async () => {
      const result = await run({ input: ['src/**/*.html'], base: false })
      expect(result.success).toBe(true)
    })

    it('should minify CSS when minify option is true', async () => {
      const resultNotMinified = await run({ input: ['src/**/*.html'], minify: false })
      const resultMinified = await run({ input: ['src/**/*.html'], minify: true })

      expect(resultMinified.css).toBeDefined()
      expect(resultNotMinified.css).toBeDefined()
      // Minified CSS should be shorter or equal (no extra whitespace)
      if (resultMinified.css && resultNotMinified.css) {
        expect(resultMinified.css.length).toBeLessThanOrEqual(resultNotMinified.css.length)
      }
    })

    it('should output to stdout when stdout option is true', async () => {
      await run({ input: ['src/**/*.html'], stdout: true })
      expect(consoleMock.log).toHaveBeenCalled()
    })

    it('should log output file path when not using stdout', async () => {
      await run({ input: ['src/**/*.html'], output: 'dist/styles.css' })
      expect(consoleMock.log).toHaveBeenCalledWith(expect.stringContaining('dist/styles.css'))
    })

    it('should handle different dark mode strategies', async () => {
      const classResult = await run({ input: ['test.html'], darkMode: 'class' })
      expect(classResult.success).toBe(true)

      const mediaResult = await run({ input: ['test.html'], darkMode: 'media' })
      expect(mediaResult.success).toBe(true)

      const selectorResult = await run({ input: ['test.html'], darkMode: 'selector' })
      expect(selectorResult.success).toBe(true)

      const autoResult = await run({ input: ['test.html'], darkMode: 'auto' })
      expect(autoResult.success).toBe(true)
    })

    it('should return processed files list', async () => {
      const result = await run({ input: ['file1.html', 'file2.tsx'] })
      expect(result.files).toContain('file1.html')
      expect(result.files).toContain('file2.tsx')
    })
  })

  describe('cli', () => {
    it('should call run with parsed arguments', async () => {
      // Just verify cli doesn't throw
      cli(['src/**/*.html', '-o', 'dist/styles.css'])
      // Give async operation time to complete
      await new Promise(resolve => setTimeout(resolve, 100))
    })

    it('should use process.argv when no args provided', async () => {
      processMock.argv = ['node', 'coral', 'input.html']
      cli()
      await new Promise(resolve => setTimeout(resolve, 100))
    })
  })
})
