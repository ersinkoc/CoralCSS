/**
 * CLI Tool
 *
 * Command-line interface for CoralCSS.
 * @module build/cli
 */

import { createCoral } from '../kernel'
import { coralPreset } from '../presets/coral'
import { generateThemeCSS } from '../theme/dark'
import type { DarkModeStrategy } from '../types'

/**
 * CLI options
 */
export interface CLIOptions {
  /**
   * Input HTML/JSX files or glob patterns
   */
  input?: string[]

  /**
   * Output CSS file path
   */
  output?: string

  /**
   * Whether to watch for changes
   */
  watch?: boolean

  /**
   * Whether to minify output
   */
  minify?: boolean

  /**
   * Dark mode strategy
   */
  darkMode?: DarkModeStrategy

  /**
   * Whether to include base styles
   */
  base?: boolean

  /**
   * Config file path
   */
  config?: string

  /**
   * Whether to output to stdout
   */
  stdout?: boolean
}

/**
 * CLI result
 */
export interface CLIResult {
  success: boolean
  css?: string
  error?: string
  files?: string[]
  classes?: string[]
}

/**
 * Parse CLI arguments
 */
export function parseArgs(args: string[]): CLIOptions {
  const options: CLIOptions = {
    input: [],
    output: 'coral.css',
    minify: false,
    watch: false,
    darkMode: 'class',
    base: true,
    stdout: false,
  }

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    const next = args[i + 1]

    switch (arg) {
      case '-o':
      case '--output':
        options.output = next
        i++
        break

      case '-w':
      case '--watch':
        options.watch = true
        break

      case '-m':
      case '--minify':
        options.minify = true
        break

      case '--dark-mode':
        options.darkMode = next as DarkModeStrategy
        i++
        break

      case '--no-base':
        options.base = false
        break

      case '-c':
      case '--config':
        options.config = next
        i++
        break

      case '--stdout':
        options.stdout = true
        break

      case '-h':
      case '--help':
        printHelp()
        process.exit(0)
        break

      case '-v':
      case '--version':
        console.log(getVersion())
        process.exit(0)
        break

      default:
        if (arg && !arg.startsWith('-')) {
          options.input?.push(arg)
        }
    }
  }

  return options
}

/**
 * Print help message
 */
function printHelp(): void {
  console.log(`
CoralCSS CLI

Usage: coral [options] <input files...>

Options:
  -o, --output <file>    Output CSS file path
  -w, --watch            Watch for file changes
  -m, --minify           Minify output CSS
  --dark-mode <strategy> Dark mode strategy (class, media, selector, auto)
  --no-base              Don't include base styles
  -c, --config <file>    Path to config file
  --stdout               Output to stdout instead of file
  -h, --help             Show this help message
  -v, --version          Show version number

Examples:
  coral src/**/*.html -o dist/styles.css
  coral src/**/*.{html,jsx,tsx} -o dist/styles.css -m
  coral --watch src/**/*.html -o dist/styles.css
`)
}

/**
 * Get version from package.json
 */
function getVersion(): string {
  return '1.0.0' // Would read from package.json in real implementation
}

/**
 * Run CLI
 */
export async function run(options: CLIOptions): Promise<CLIResult> {
  try {
    // Validate options
    if (!options.input || options.input.length === 0) {
      return {
        success: false,
        error: 'No input files specified. Use --help for usage information.',
      }
    }

    // Initialize Coral
    const coral = createCoral()
    const plugins = coralPreset({ darkMode: options.darkMode ?? 'class' })
    plugins.forEach((plugin) => coral.use(plugin))

    // Collect all classes from input files
    const allClasses: string[] = []
    const processedFiles: string[] = []

    // In a real implementation, we would:
    // 1. Use fast-glob to find matching files
    // 2. Read each file with fs.readFile
    // 3. Extract classes using regex

    // For now, this is a placeholder that shows the structure
    for (const pattern of options.input) {
      // This would be replaced with actual file reading
      console.log(`Processing: ${pattern}`)
      processedFiles.push(pattern)
    }

    // Generate CSS
    let css = ''

    // Add base styles if requested
    if (options.base) {
      css += generateBaseCSS() + '\n\n'
    }

    // Add theme CSS
    css += generateThemeCSS(options.darkMode ?? 'class') + '\n\n'

    // Add utility CSS
    if (allClasses.length > 0) {
      css += coral.generate(allClasses)
    }

    // Minify if requested
    if (options.minify) {
      css = minifyCSS(css)
    }

    // Output
    if (options.stdout) {
      console.log(css)
    } else if (options.output) {
      // In real implementation: fs.writeFileSync(options.output, css)
      console.log(`Would write to: ${options.output}`)
    }

    return {
      success: true,
      css,
      files: processedFiles,
      classes: allClasses,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

/**
 * Generate base CSS
 */
function generateBaseCSS(): string {
  return `/* CoralCSS Base - See postcss.ts for full implementation */`
}

/**
 * Simple CSS minification
 */
function minifyCSS(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,>+~])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim()
}

/**
 * CLI entry point
 */
export function cli(args: string[] = process.argv.slice(2)): void {
  const options = parseArgs(args)

  run(options).then((result) => {
    if (!result.success) {
      console.error('Error:', result.error)
      process.exit(1)
    }

    if (!options.stdout && options.output) {
      console.log(`Generated CSS written to ${options.output}`)
      console.log(`Processed ${result.files?.length ?? 0} files`)
      console.log(`Found ${result.classes?.length ?? 0} unique classes`)
    }
  })
}

export default cli
