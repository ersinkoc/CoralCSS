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

// Mock process with all needed properties
const processMock = {
  argv: ['node', 'coral'],
  exit: vi.fn(),
  platform: 'linux',
  arch: 'x64',
  version: 'v20.0.0',
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

  describe('Commands', () => {
    describe('parseArgs with commands', () => {
      it('should parse init command', () => {
        const options = parseArgs(['init', 'react'])
        expect(options.command).toBe('init')
        expect(options.template).toBe('react')
      })

      it('should parse analyze command', () => {
        const options = parseArgs(['analyze'])
        expect(options.command).toBe('analyze')
      })

      it('should parse optimize command', () => {
        const options = parseArgs(['optimize', '-o', 'output.css'])
        expect(options.command).toBe('optimize')
        expect(options.output).toBe('output.css')
      })

      it('should parse migrate command', () => {
        const options = parseArgs(['migrate', 'tailwind'])
        expect(options.command).toBe('migrate')
        expect(options.template).toBe('tailwind')
      })

      it('should parse doctor command', () => {
        const options = parseArgs(['doctor'])
        expect(options.command).toBe('doctor')
      })

      it('should parse tokens command', () => {
        const options = parseArgs(['tokens', 'build', '-p', 'web'])
        expect(options.command).toBe('tokens')
        expect(options.input).toContain('build')
      })

      it('should parse benchmark command', () => {
        const options = parseArgs(['benchmark', '5000'])
        expect(options.command).toBe('benchmark')
        expect(options.input).toContain('5000')
      })

      it('should default to build command when no command specified', () => {
        const options = parseArgs(['src/*.html'])
        expect(options.command).toBe('build')
      })

      it('should handle unknown first arg as input file', () => {
        const options = parseArgs(['notacommand.html'])
        expect(options.command).toBe('build')
        expect(options.input).toContain('notacommand.html')
      })
    })

    describe('init command', () => {
      it('should run init with default template', async () => {
        const result = await run({ command: 'init' })
        expect(result.success).toBe(true)
        expect(consoleMock.log).toHaveBeenCalledWith(expect.stringContaining('basic'))
      })

      it('should run init with basic template', async () => {
        const result = await run({ command: 'init', template: 'basic' })
        expect(result.success).toBe(true)
        expect(result.files).toBeDefined()
      })

      it('should run init with react template', async () => {
        const result = await run({ command: 'init', template: 'react' })
        expect(result.success).toBe(true)
        expect(consoleMock.log).toHaveBeenCalledWith(expect.stringContaining('React'))
      })

      it('should run init with vue template', async () => {
        const result = await run({ command: 'init', template: 'vue' })
        expect(result.success).toBe(true)
        expect(consoleMock.log).toHaveBeenCalledWith(expect.stringContaining('Vue'))
      })

      it('should run init with next template', async () => {
        const result = await run({ command: 'init', template: 'next' })
        expect(result.success).toBe(true)
        expect(consoleMock.log).toHaveBeenCalledWith(expect.stringContaining('Next.js'))
      })

      it('should run init with nuxt template', async () => {
        const result = await run({ command: 'init', template: 'nuxt' })
        expect(result.success).toBe(true)
        expect(consoleMock.log).toHaveBeenCalledWith(expect.stringContaining('Nuxt'))
      })

      it('should fail with unknown template', async () => {
        const result = await run({ command: 'init', template: 'unknown' })
        expect(result.success).toBe(false)
        expect(result.error).toContain('Unknown template')
      })
    })

    describe('analyze command', () => {
      it('should run analyze', async () => {
        const result = await run({ command: 'analyze' })
        expect(result.success).toBe(true)
        expect(consoleMock.log).toHaveBeenCalledWith(expect.stringContaining('Bundle Analyzer'))
      })

      it('should display bundle analysis', async () => {
        await run({ command: 'analyze' })
        expect(consoleMock.log).toHaveBeenCalledWith(expect.stringContaining('CoralCSS'))
      })

      it('should show suggestions', async () => {
        await run({ command: 'analyze' })
        expect(consoleMock.log).toHaveBeenCalledWith(expect.stringContaining('Suggestions'))
      })
    })

    describe('optimize command', () => {
      it('should run optimize', async () => {
        const result = await run({ command: 'optimize' })
        expect(result.success).toBe(true)
        expect(result.css).toBeDefined()
      })

      it('should display optimization steps', async () => {
        await run({ command: 'optimize' })
        expect(consoleMock.log).toHaveBeenCalledWith(expect.stringContaining('Optimization Results'))
      })

      it('should show optimization results', async () => {
        await run({ command: 'optimize' })
        expect(consoleMock.log).toHaveBeenCalledWith(expect.stringContaining('Total Reduction'))
      })
    })

    describe('migrate command', () => {
      it('should run migrate with default source', async () => {
        const result = await run({ command: 'migrate' })
        expect(result.success).toBe(true)
        expect(consoleMock.log).toHaveBeenCalledWith(expect.stringContaining('tailwind'))
      })

      it('should run migrate with tailwind source', async () => {
        const result = await run({ command: 'migrate', template: 'tailwind' })
        expect(result.success).toBe(true)
      })

      it('should display migration overview', async () => {
        await run({ command: 'migrate' })
        expect(consoleMock.log).toHaveBeenCalledWith(expect.stringContaining('Migration Overview'))
      })

      it('should display class compatibility info', async () => {
        await run({ command: 'migrate' })
        expect(consoleMock.log).toHaveBeenCalledWith(expect.stringContaining('CLASS COMPATIBILITY'))
      })

      it('should display configuration changes', async () => {
        await run({ command: 'migrate' })
        expect(consoleMock.log).toHaveBeenCalledWith(expect.stringContaining('CONFIGURATION CHANGES'))
      })

      it('should display bonus features', async () => {
        await run({ command: 'migrate' })
        expect(consoleMock.log).toHaveBeenCalledWith(expect.stringContaining('BONUS FEATURES'))
      })

      it('should run in dry-run mode with stdout flag', async () => {
        const result = await run({ command: 'migrate', stdout: true })
        expect(result.success).toBe(true)
        expect(consoleMock.log).toHaveBeenCalledWith(expect.stringContaining('Dry Run'))
      })
    })

    describe('doctor command', () => {
      it('should run doctor', async () => {
        const result = await run({ command: 'doctor' })
        expect(result.success).toBe(true)
        expect(consoleMock.log).toHaveBeenCalledWith(expect.stringContaining('diagnostics'))
      })

      it('should display check results', async () => {
        await run({ command: 'doctor' })
        expect(consoleMock.log).toHaveBeenCalledWith(expect.stringContaining('Config file'))
      })

      it('should display diagnostics summary', async () => {
        await run({ command: 'doctor' })
        expect(consoleMock.log).toHaveBeenCalledWith(expect.stringContaining('Diagnostics complete'))
      })
    })

    describe('tokens command', () => {
      it('should run tokens with help flag', async () => {
        const result = await run({ command: 'tokens', input: ['--help'] })
        expect(result.success).toBe(true)
      })

      it('should run tokens with -h flag', async () => {
        const result = await run({ command: 'tokens', input: ['-h'] })
        expect(result.success).toBe(true)
      })

      it('should run tokens build subcommand', async () => {
        const result = await run({ command: 'tokens', input: ['build'] })
        expect(result.success).toBeDefined()
      })

      it('should run tokens export subcommand', async () => {
        const result = await run({ command: 'tokens', input: ['export'] })
        expect(result.success).toBeDefined()
      })

      it('should run tokens validate subcommand', async () => {
        const result = await run({ command: 'tokens', input: ['validate'] })
        expect(result.success).toBeDefined()
      })
    })

    describe('benchmark command', () => {
      it('should run benchmark with default iterations', async () => {
        const result = await run({ command: 'benchmark' })
        expect(result.success).toBe(true)
      })

      it('should run benchmark with custom iterations', async () => {
        const result = await run({ command: 'benchmark', input: ['100'] })
        expect(result.success).toBe(true)
      })

      it('should display benchmark header', async () => {
        await run({ command: 'benchmark', input: ['50'] })
        expect(consoleMock.log).toHaveBeenCalledWith(expect.stringContaining('Benchmark Suite'))
      })

      it('should display platform info', async () => {
        await run({ command: 'benchmark', input: ['50'] })
        expect(consoleMock.log).toHaveBeenCalledWith(expect.stringContaining('Platform'))
      })

      it('should display summary', async () => {
        await run({ command: 'benchmark', input: ['50'] })
        expect(consoleMock.log).toHaveBeenCalledWith(expect.stringContaining('Summary'))
      })

      it('should output JSON when stdout flag is true', async () => {
        await run({ command: 'benchmark', input: ['50'], stdout: true })
        expect(consoleMock.log).toHaveBeenCalledWith(expect.stringContaining('JSON Output'))
      })
    })
  })

  describe('Error handling', () => {
    it('should catch and return errors', async () => {
      // Force an error by passing invalid options
      const result = await run({ command: 'build', input: [] })
      expect(result.success).toBe(false)
      expect(result.error).toBeDefined()
    })

    it('should handle unknown commands gracefully', async () => {
      // Unknown commands fall through to build
      const result = await run({ command: 'unknown' as any, input: ['test.html'] })
      expect(result.success).toBe(true)
    })
  })

  describe('Build command features', () => {
    it('should process multiple input files', async () => {
      const result = await run({
        command: 'build',
        input: ['src/a.html', 'src/b.html', 'src/c.tsx']
      })
      expect(result.success).toBe(true)
      expect(result.files?.length).toBe(3)
    })

    it('should handle empty classes array', async () => {
      const result = await run({
        command: 'build',
        input: ['test.html']
      })
      expect(result.success).toBe(true)
      expect(result.classes).toEqual([])
    })

    it('should include theme CSS', async () => {
      const result = await run({
        command: 'build',
        input: ['test.html']
      })
      expect(result.css).toBeDefined()
    })

    it('should respect output option', async () => {
      await run({
        command: 'build',
        input: ['test.html'],
        output: 'custom-output.css'
      })
      expect(consoleMock.log).toHaveBeenCalledWith(expect.stringContaining('custom-output.css'))
    })
  })
})
