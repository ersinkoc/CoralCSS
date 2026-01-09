#!/usr/bin/env node
/**
 * CoralCSS CSS Build Script
 *
 * Generates the complete CSS bundle including:
 * - Theme CSS variables
 * - Component styles
 * - Base/reset styles
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')

// CSS files to concatenate
const cssFiles = [
  'src/theme/components.css',
]

// Read and concatenate all CSS files
function buildCSS() {
  console.log('Building CSS...')

  let css = `/* ========================================
   @coral-css/core v1.0.0
   A Modern CSS Framework
   https://coralcss.com
   ======================================== */

`

  // Add each CSS file
  for (const file of cssFiles) {
    const filePath = join(rootDir, file)
    if (existsSync(filePath)) {
      console.log(`  Adding: ${file}`)
      css += readFileSync(filePath, 'utf8')
      css += '\n\n'
    } else {
      console.warn(`  Warning: ${file} not found`)
    }
  }

  // Ensure dist directory exists
  const distDir = join(rootDir, 'dist')
  if (!existsSync(distDir)) {
    mkdirSync(distDir, { recursive: true })
  }

  // Write unminified version
  const outputPath = join(distDir, 'coral.css')
  writeFileSync(outputPath, css)
  console.log(`  Output: dist/coral.css (${(css.length / 1024).toFixed(2)} KB)`)

  // Write minified version (basic minification)
  const minifiedCSS = minifyCSS(css)
  const minOutputPath = join(distDir, 'coral.min.css')
  writeFileSync(minOutputPath, minifiedCSS)
  console.log(`  Output: dist/coral.min.css (${(minifiedCSS.length / 1024).toFixed(2)} KB)`)

  console.log('CSS build complete!')
}

// Basic CSS minification
function minifyCSS(css) {
  return css
    // Remove comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove newlines and extra spaces
    .replace(/\s+/g, ' ')
    // Remove spaces around special characters
    .replace(/\s*([{}:;,>+~])\s*/g, '$1')
    // Remove trailing semicolons before closing braces
    .replace(/;}/g, '}')
    // Remove leading/trailing whitespace
    .trim()
}

// Run the build
buildCSS()
