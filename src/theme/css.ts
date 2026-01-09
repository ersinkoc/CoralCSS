/**
 * CoralCSS Default Theme CSS
 *
 * Pre-generated CSS theme variables for light and dark modes.
 * Can be imported directly or generated dynamically.
 * @module theme/css
 */

import { lightSemanticTokens, darkSemanticTokens, themePresets, generateSemanticCSS } from './semantic'
import type { ThemePresetName } from './semantic'
import { colors } from './colors'
import { spacing, sizing, maxWidth, zIndex } from './spacing'
import { fonts, fontSizes, fontWeights, lineHeights, letterSpacing } from './typography'
import { borderRadius, borderWidth, boxShadow, opacity, transitionDuration, transitionTimingFunction, blur, dropShadow, screens } from './default'
import type { DarkModeStrategy } from '../types'

/**
 * CSS generation options
 */
export interface CSSGenerationOptions {
  /** Theme preset to use */
  preset?: ThemePresetName
  /** Dark mode strategy */
  darkMode?: DarkModeStrategy
  /** Include color palette CSS variables */
  includeColors?: boolean
  /** Include spacing CSS variables */
  includeSpacing?: boolean
  /** Include typography CSS variables */
  includeTypography?: boolean
  /** Include effect CSS variables (shadows, blur, etc.) */
  includeEffects?: boolean
  /** Include breakpoint CSS variables */
  includeBreakpoints?: boolean
  /** Include CSS reset/normalize */
  includeReset?: boolean
  /** Include base layer styles */
  includeBase?: boolean
  /** Include pre-styled component classes (.btn, .card, .input, etc.) */
  includeComponents?: boolean
  /** Minify output */
  minify?: boolean
}

const defaultOptions: CSSGenerationOptions = {
  preset: 'coral',
  darkMode: 'class',
  includeColors: true,
  includeSpacing: true,
  includeTypography: true,
  includeEffects: true,
  includeBreakpoints: true,
  includeReset: true,
  includeBase: true,
  includeComponents: true,
  minify: false,
}

/**
 * Generate CSS color palette variables
 */
export function generateColorPaletteCSS(): string {
  const lines: string[] = []

  for (const [name, scale] of Object.entries(colors)) {
    if (typeof scale === 'object') {
      for (const [shade, value] of Object.entries(scale)) {
        lines.push(`  --color-${name}-${shade}: ${value};`)
      }
    }
  }

  return lines.join('\n')
}

/**
 * Generate CSS spacing variables
 */
export function generateSpacingCSS(): string {
  const lines: string[] = []

  for (const [key, value] of Object.entries(spacing)) {
    lines.push(`  --spacing-${key.replace('.', '\\.').replace('/', '\\/')}: ${value};`)
  }

  return lines.join('\n')
}

/**
 * Generate CSS sizing variables
 */
export function generateSizingCSS(): string {
  const lines: string[] = []

  for (const [key, value] of Object.entries(sizing)) {
    const safeKey = key.replace('.', '\\.').replace('/', '\\/')
    lines.push(`  --sizing-${safeKey}: ${value};`)
  }

  return lines.join('\n')
}

/**
 * Generate CSS max-width variables
 */
export function generateMaxWidthCSS(): string {
  const lines: string[] = []

  for (const [key, value] of Object.entries(maxWidth)) {
    lines.push(`  --max-width-${key}: ${value};`)
  }

  return lines.join('\n')
}

/**
 * Generate CSS z-index variables
 */
export function generateZIndexCSS(): string {
  const lines: string[] = []

  for (const [key, value] of Object.entries(zIndex)) {
    lines.push(`  --z-${key}: ${value};`)
  }

  return lines.join('\n')
}

/**
 * Generate CSS typography variables
 */
export function generateTypographyCSS(): string {
  const lines: string[] = []

  // Font families
  for (const [key, value] of Object.entries(fonts)) {
    lines.push(`  --font-${key}: ${value};`)
  }

  // Font sizes
  for (const [key, value] of Object.entries(fontSizes)) {
    if (typeof value === 'string') {
      lines.push(`  --text-${key}: ${value};`)
    } else if (typeof value === 'object' && value !== null) {
      const fontValue = value as { fontSize: string; lineHeight?: string }
      lines.push(`  --text-${key}: ${fontValue.fontSize};`)
      if (fontValue.lineHeight) {
        lines.push(`  --text-${key}-line-height: ${fontValue.lineHeight};`)
      }
    }
  }

  // Font weights
  for (const [key, value] of Object.entries(fontWeights)) {
    lines.push(`  --font-weight-${key}: ${value};`)
  }

  // Line heights
  for (const [key, value] of Object.entries(lineHeights)) {
    lines.push(`  --leading-${key}: ${value};`)
  }

  // Letter spacing
  for (const [key, value] of Object.entries(letterSpacing)) {
    lines.push(`  --tracking-${key}: ${value};`)
  }

  return lines.join('\n')
}

/**
 * Generate CSS effect variables (shadows, blur, etc.)
 */
export function generateEffectsCSS(): string {
  const lines: string[] = []

  // Border radius
  for (const [key, value] of Object.entries(borderRadius)) {
    lines.push(`  --rounded-${key}: ${value};`)
  }

  // Border width
  for (const [key, value] of Object.entries(borderWidth)) {
    lines.push(`  --border-${key}: ${value};`)
  }

  // Box shadows
  for (const [key, value] of Object.entries(boxShadow)) {
    lines.push(`  --shadow-${key}: ${value};`)
  }

  // Opacity
  for (const [key, value] of Object.entries(opacity)) {
    lines.push(`  --opacity-${key}: ${value};`)
  }

  // Transition duration
  for (const [key, value] of Object.entries(transitionDuration)) {
    lines.push(`  --duration-${key}: ${value};`)
  }

  // Transition timing
  for (const [key, value] of Object.entries(transitionTimingFunction)) {
    lines.push(`  --ease-${key}: ${value};`)
  }

  // Blur
  for (const [key, value] of Object.entries(blur)) {
    lines.push(`  --blur-${key}: ${value};`)
  }

  // Drop shadow
  for (const [key, value] of Object.entries(dropShadow)) {
    if (Array.isArray(value)) {
      lines.push(`  --drop-shadow-${key}: ${value.join(', ')};`)
    } else {
      lines.push(`  --drop-shadow-${key}: ${value};`)
    }
  }

  return lines.join('\n')
}

/**
 * Generate CSS breakpoint variables
 */
export function generateBreakpointsCSS(): string {
  const lines: string[] = []

  for (const [key, value] of Object.entries(screens)) {
    if (typeof value === 'string') {
      lines.push(`  --screen-${key}: ${value};`)
    } else if (typeof value === 'object' && value !== null) {
      const screenValue = value as { min?: string; max?: string }
      if (screenValue.min) {
        lines.push(`  --screen-${key}: ${screenValue.min};`)
      }
    }
  }

  return lines.join('\n')
}

/**
 * Generate CSS reset/normalize
 */
export function generateResetCSS(): string {
  return `/*! CoralCSS Reset - Based on modern-normalize */
*, *::before, *::after {
  box-sizing: border-box;
}

html {
  -moz-tab-size: 4;
  tab-size: 4;
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
  font-family: var(--font-sans, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif);
  line-height: inherit;
}

hr {
  height: 0;
  color: inherit;
  border-top-width: 1px;
}

abbr[title] {
  text-decoration: underline dotted;
}

b, strong {
  font-weight: bolder;
}

code, kbd, samp, pre {
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace);
  font-size: 1em;
}

small {
  font-size: 80%;
}

sub, sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

table {
  text-indent: 0;
  border-color: inherit;
  border-collapse: collapse;
}

button, input, optgroup, select, textarea {
  font-family: inherit;
  font-size: 100%;
  font-weight: inherit;
  line-height: inherit;
  color: inherit;
  margin: 0;
  padding: 0;
}

button, select {
  text-transform: none;
}

button, [type='button'], [type='reset'], [type='submit'] {
  -webkit-appearance: button;
  appearance: button;
  background-color: transparent;
  background-image: none;
}

:-moz-focusring {
  outline: auto;
}

:-moz-ui-invalid {
  box-shadow: none;
}

progress {
  vertical-align: baseline;
}

::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
  height: auto;
}

[type='search'] {
  -webkit-appearance: textfield;
  appearance: textfield;
  outline-offset: -2px;
}

::-webkit-search-decoration {
  -webkit-appearance: none;
}

::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit;
}

summary {
  display: list-item;
}

blockquote, dl, dd, h1, h2, h3, h4, h5, h6, hr, figure, p, pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol, ul, menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

textarea {
  resize: vertical;
}

input::placeholder, textarea::placeholder {
  opacity: 1;
  color: hsl(var(--muted-foreground, 215.4 16.3% 46.9%));
}

button, [role='button'] {
  cursor: pointer;
}

:disabled {
  cursor: default;
}

img, svg, video, canvas, audio, iframe, embed, object {
  display: block;
  vertical-align: middle;
}

img, video {
  max-width: 100%;
  height: auto;
}

[hidden] {
  display: none;
}
`
}

/**
 * Generate CSS base layer styles
 */
export function generateBaseCSS(): string {
  return `/* CoralCSS Base Layer */
html {
  color-scheme: light;
}

.dark {
  color-scheme: dark;
}

body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  font-feature-settings: 'rlig' 1, 'calt' 1;
}

/* Focus ring default */
:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}

/* Selection styling */
::selection {
  background-color: hsl(var(--primary) / 0.2);
  color: hsl(var(--foreground));
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 0.5rem;
  height: 0.5rem;
}

::-webkit-scrollbar-track {
  background: hsl(var(--muted));
}

::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground) / 0.3);
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground) / 0.5);
}

/* Print styles */
@media print {
  body {
    background-color: white;
    color: black;
  }
}
`
}

/**
 * Generate pre-styled component CSS classes
 */
export function generateComponentsCSS(): string {
  return `/* CoralCSS Component Classes */

/* ============================================
   BUTTONS
   ============================================ */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap;
  border-radius: var(--radius, 0.5rem);
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  height: 2.5rem;
  border: 1px solid transparent;
}

.btn:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}

.btn:disabled {
  pointer-events: none;
  opacity: 0.5;
}

.btn-primary {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

.btn-primary:hover {
  background-color: hsl(var(--primary) / 0.9);
}

.btn-secondary {
  background-color: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
}

.btn-secondary:hover {
  background-color: hsl(var(--secondary) / 0.8);
}

.btn-destructive {
  background-color: hsl(var(--destructive));
  color: hsl(var(--destructive-foreground));
}

.btn-destructive:hover {
  background-color: hsl(var(--destructive) / 0.9);
}

.btn-outline {
  border-color: hsl(var(--border));
  background-color: transparent;
  color: hsl(var(--foreground));
}

.btn-outline:hover {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}

.btn-ghost {
  background-color: transparent;
  color: hsl(var(--foreground));
}

.btn-ghost:hover {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}

.btn-link {
  background-color: transparent;
  color: hsl(var(--primary));
  text-underline-offset: 4px;
  padding: 0;
  height: auto;
}

.btn-link:hover {
  text-decoration: underline;
}

/* Button sizes */
.btn-sm {
  height: 2rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
}

.btn-lg {
  height: 3rem;
  padding: 0.75rem 2rem;
  font-size: 1rem;
}

.btn-icon {
  width: 2.5rem;
  padding: 0;
}

.btn-icon.btn-sm {
  width: 2rem;
}

.btn-icon.btn-lg {
  width: 3rem;
}

/* ============================================
   CARDS
   ============================================ */
.card {
  background-color: hsl(var(--card));
  color: hsl(var(--card-foreground));
  border-radius: var(--radius, 0.5rem);
  border: 1px solid hsl(var(--border));
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}

.card-header {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  padding: 1.5rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.025em;
}

.card-description {
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
}

.card-content {
  padding: 1.5rem;
  padding-top: 0;
}

.card-footer {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  padding-top: 0;
}

/* ============================================
   INPUTS
   ============================================ */
.input {
  display: flex;
  width: 100%;
  height: 2.5rem;
  border-radius: var(--radius, 0.5rem);
  border: 1px solid hsl(var(--input));
  background-color: hsl(var(--background));
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  transition: border-color 150ms, box-shadow 150ms;
}

.input::placeholder {
  color: hsl(var(--muted-foreground));
}

.input:focus {
  outline: none;
  border-color: hsl(var(--ring));
  box-shadow: 0 0 0 2px hsl(var(--ring) / 0.2);
}

.input:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.input-sm {
  height: 2rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
}

.input-lg {
  height: 3rem;
  padding: 0.75rem 1rem;
  font-size: 1rem;
}

/* Textarea */
.textarea {
  display: flex;
  width: 100%;
  min-height: 5rem;
  border-radius: var(--radius, 0.5rem);
  border: 1px solid hsl(var(--input));
  background-color: hsl(var(--background));
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  resize: vertical;
  transition: border-color 150ms, box-shadow 150ms;
}

.textarea::placeholder {
  color: hsl(var(--muted-foreground));
}

.textarea:focus {
  outline: none;
  border-color: hsl(var(--ring));
  box-shadow: 0 0 0 2px hsl(var(--ring) / 0.2);
}

.textarea:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* Select */
.select {
  display: flex;
  width: 100%;
  height: 2.5rem;
  border-radius: var(--radius, 0.5rem);
  border: 1px solid hsl(var(--input));
  background-color: hsl(var(--background));
  padding: 0.5rem 2rem 0.5rem 0.75rem;
  font-size: 0.875rem;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  cursor: pointer;
  transition: border-color 150ms, box-shadow 150ms;
}

.select:focus {
  outline: none;
  border-color: hsl(var(--ring));
  box-shadow: 0 0 0 2px hsl(var(--ring) / 0.2);
}

.select:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* Checkbox & Radio */
.checkbox,
.radio {
  width: 1rem;
  height: 1rem;
  border: 1px solid hsl(var(--primary));
  background-color: hsl(var(--background));
  cursor: pointer;
  transition: background-color 150ms, border-color 150ms;
}

.checkbox {
  border-radius: 0.25rem;
}

.radio {
  border-radius: 9999px;
}

.checkbox:checked,
.radio:checked {
  background-color: hsl(var(--primary));
  border-color: hsl(var(--primary));
}

.radio:checked {
  box-shadow: inset 0 0 0 3px hsl(var(--background));
}

.checkbox:focus-visible,
.radio:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}

.checkbox:disabled,
.radio:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* Label */
.label {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
  color: hsl(var(--foreground));
}

.label-required::after {
  content: " *";
  color: hsl(var(--destructive));
}

/* ============================================
   BADGES
   ============================================ */
.badge {
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  padding: 0.125rem 0.625rem;
  font-size: 0.75rem;
  font-weight: 600;
  transition: background-color 150ms;
}

.badge-primary {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

.badge-secondary {
  background-color: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
}

.badge-destructive {
  background-color: hsl(var(--destructive));
  color: hsl(var(--destructive-foreground));
}

.badge-outline {
  border: 1px solid hsl(var(--border));
  background-color: transparent;
  color: hsl(var(--foreground));
}

.badge-success {
  background-color: hsl(142 76% 36%);
  color: white;
}

.badge-warning {
  background-color: hsl(38 92% 50%);
  color: white;
}

.badge-info {
  background-color: hsl(199 89% 48%);
  color: white;
}

/* ============================================
   ALERTS
   ============================================ */
.alert {
  position: relative;
  width: 100%;
  border-radius: var(--radius, 0.5rem);
  border: 1px solid hsl(var(--border));
  padding: 1rem;
  display: flex;
  gap: 0.75rem;
}

.alert-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

.alert-title {
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.025em;
  margin-bottom: 0.25rem;
}

.alert-description {
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
}

.alert-default {
  background-color: hsl(var(--background));
}

.alert-destructive {
  border-color: hsl(var(--destructive) / 0.5);
  background-color: hsl(var(--destructive) / 0.1);
  color: hsl(var(--destructive));
}

.alert-destructive .alert-description {
  color: hsl(var(--destructive) / 0.8);
}

.alert-success {
  border-color: hsl(142 76% 36% / 0.5);
  background-color: hsl(142 76% 36% / 0.1);
  color: hsl(142 76% 36%);
}

.alert-warning {
  border-color: hsl(38 92% 50% / 0.5);
  background-color: hsl(38 92% 50% / 0.1);
  color: hsl(38 92% 40%);
}

.alert-info {
  border-color: hsl(199 89% 48% / 0.5);
  background-color: hsl(199 89% 48% / 0.1);
  color: hsl(199 89% 48%);
}

/* ============================================
   AVATAR
   ============================================ */
.avatar {
  position: relative;
  display: flex;
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 9999px;
}

.avatar-image {
  aspect-ratio: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-fallback {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background-color: hsl(var(--muted));
  font-weight: 500;
}

.avatar-sm {
  width: 2rem;
  height: 2rem;
  font-size: 0.75rem;
}

.avatar-lg {
  width: 3rem;
  height: 3rem;
  font-size: 1.125rem;
}

.avatar-xl {
  width: 4rem;
  height: 4rem;
  font-size: 1.5rem;
}

/* ============================================
   SEPARATOR
   ============================================ */
.separator {
  flex-shrink: 0;
  background-color: hsl(var(--border));
}

.separator-horizontal {
  height: 1px;
  width: 100%;
}

.separator-vertical {
  height: 100%;
  width: 1px;
}

/* ============================================
   SKELETON
   ============================================ */
.skeleton {
  background-color: hsl(var(--muted));
  border-radius: var(--radius, 0.5rem);
  animation: skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes skeleton-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* ============================================
   PROGRESS
   ============================================ */
.progress {
  position: relative;
  overflow: hidden;
  border-radius: 9999px;
  background-color: hsl(var(--secondary));
  height: 0.5rem;
  width: 100%;
}

.progress-bar {
  height: 100%;
  width: 100%;
  flex: 1;
  background-color: hsl(var(--primary));
  transition: transform 500ms ease-out;
  transform-origin: left;
}

.progress-indeterminate .progress-bar {
  width: 50%;
  animation: progress-indeterminate 1.5s ease-in-out infinite;
}

@keyframes progress-indeterminate {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(300%); }
}

/* ============================================
   SWITCH / TOGGLE
   ============================================ */
.switch {
  position: relative;
  display: inline-flex;
  height: 1.5rem;
  width: 2.75rem;
  flex-shrink: 0;
  cursor: pointer;
  border-radius: 9999px;
  border: 2px solid transparent;
  background-color: hsl(var(--input));
  transition: background-color 150ms;
}

.switch:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}

.switch[data-state="checked"],
.switch.checked {
  background-color: hsl(var(--primary));
}

.switch:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.switch-thumb {
  pointer-events: none;
  display: block;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  background-color: hsl(var(--background));
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  transition: transform 150ms;
}

.switch[data-state="checked"] .switch-thumb,
.switch.checked .switch-thumb {
  transform: translateX(1.25rem);
}

/* ============================================
   TOOLTIP
   ============================================ */
.tooltip-content {
  position: absolute;
  z-index: 50;
  overflow: hidden;
  border-radius: var(--radius, 0.5rem);
  background-color: hsl(var(--popover));
  color: hsl(var(--popover-foreground));
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  animation: tooltip-in 150ms ease-out;
}

@keyframes tooltip-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

/* ============================================
   DROPDOWN / POPOVER
   ============================================ */
.dropdown,
.popover {
  position: absolute;
  z-index: 50;
  min-width: 8rem;
  overflow: hidden;
  border-radius: var(--radius, 0.5rem);
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--popover));
  color: hsl(var(--popover-foreground));
  padding: 0.25rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  animation: dropdown-in 150ms ease-out;
}

@keyframes dropdown-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.dropdown-item {
  position: relative;
  display: flex;
  width: 100%;
  cursor: pointer;
  align-items: center;
  gap: 0.5rem;
  border-radius: calc(var(--radius, 0.5rem) - 2px);
  padding: 0.375rem 0.5rem;
  font-size: 0.875rem;
  outline: none;
  transition: background-color 150ms;
}

.dropdown-item:hover,
.dropdown-item:focus {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}

.dropdown-item:disabled {
  pointer-events: none;
  opacity: 0.5;
}

.dropdown-separator {
  height: 1px;
  margin: 0.25rem -0.25rem;
  background-color: hsl(var(--muted));
}

.dropdown-label {
  padding: 0.375rem 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
}

/* ============================================
   DIALOG / MODAL
   ============================================ */
.dialog-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgb(0 0 0 / 0.8);
  animation: dialog-overlay-in 150ms ease-out;
}

@keyframes dialog-overlay-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.dialog {
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 50;
  display: grid;
  width: 100%;
  max-width: 32rem;
  transform: translate(-50%, -50%);
  gap: 1rem;
  border-radius: var(--radius, 0.5rem);
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--background));
  padding: 1.5rem;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  animation: dialog-in 150ms ease-out;
}

@keyframes dialog-in {
  from { opacity: 0; transform: translate(-50%, -48%) scale(0.95); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}

.dialog-header {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  text-align: center;
}

@media (min-width: 640px) {
  .dialog-header { text-align: left; }
}

.dialog-title {
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.025em;
}

.dialog-description {
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
}

.dialog-footer {
  display: flex;
  flex-direction: column-reverse;
  gap: 0.5rem;
}

@media (min-width: 640px) {
  .dialog-footer { flex-direction: row; justify-content: flex-end; }
}

.dialog-close {
  position: absolute;
  right: 1rem;
  top: 1rem;
  border-radius: calc(var(--radius, 0.5rem) - 2px);
  opacity: 0.7;
  transition: opacity 150ms;
}

.dialog-close:hover { opacity: 1; }

/* ============================================
   TABS
   ============================================ */
.tabs-list {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius, 0.5rem);
  background-color: hsl(var(--muted));
  padding: 0.25rem;
  gap: 0.25rem;
}

.tabs-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: calc(var(--radius, 0.5rem) - 2px);
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: hsl(var(--muted-foreground));
  transition: all 150ms;
}

.tabs-trigger:hover { color: hsl(var(--foreground)); }

.tabs-trigger[data-state="active"],
.tabs-trigger.active {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}

.tabs-trigger:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}

.tabs-trigger:disabled {
  pointer-events: none;
  opacity: 0.5;
}

.tabs-content { margin-top: 0.5rem; }

/* ============================================
   ACCORDION
   ============================================ */
.accordion-item {
  border-bottom: 1px solid hsl(var(--border));
}

.accordion-trigger {
  display: flex;
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  font-weight: 500;
  text-align: left;
  transition: all 150ms;
}

.accordion-trigger:hover { text-decoration: underline; }

.accordion-trigger[data-state="open"] .accordion-chevron,
.accordion-trigger.open .accordion-chevron {
  transform: rotate(180deg);
}

.accordion-chevron {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  transition: transform 200ms;
}

.accordion-content {
  overflow: hidden;
  font-size: 0.875rem;
  transition: max-height 200ms ease-out;
}

.accordion-content[data-state="closed"] { max-height: 0; }
.accordion-content[data-state="open"] { max-height: none; }
.accordion-content-inner { padding-bottom: 1rem; }

/* ============================================
   TABLE
   ============================================ */
.table-container {
  position: relative;
  width: 100%;
  overflow: auto;
}

.table {
  width: 100%;
  caption-side: bottom;
  font-size: 0.875rem;
}

.table-caption {
  margin-top: 1rem;
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
}

.table-header { border-bottom: 1px solid hsl(var(--border)); }

.table-body tr {
  border-bottom: 1px solid hsl(var(--border));
  transition: background-color 150ms;
}

.table-body tr:last-child { border-bottom: 0; }
.table-body tr:hover { background-color: hsl(var(--muted) / 0.5); }

.table-head {
  height: 3rem;
  padding: 0 1rem;
  text-align: left;
  vertical-align: middle;
  font-weight: 500;
  color: hsl(var(--muted-foreground));
}

.table-cell {
  padding: 1rem;
  vertical-align: middle;
}

.table-footer {
  border-top: 1px solid hsl(var(--border));
  background-color: hsl(var(--muted) / 0.5);
  font-weight: 500;
}

/* ============================================
   SPINNER / LOADING
   ============================================ */
.spinner {
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid hsl(var(--muted));
  border-top-color: hsl(var(--primary));
  border-radius: 9999px;
  animation: spinner-spin 600ms linear infinite;
}

.spinner-sm { width: 1rem; height: 1rem; }
.spinner-lg { width: 2rem; height: 2rem; border-width: 3px; }

@keyframes spinner-spin {
  to { transform: rotate(360deg); }
}

/* ============================================
   TOAST
   ============================================ */
.toast-container {
  position: fixed;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 100vh;
  padding: 1rem;
}

.toast-container-top-right { top: 0; right: 0; }
.toast-container-top-left { top: 0; left: 0; }
.toast-container-bottom-right { bottom: 0; right: 0; }
.toast-container-bottom-left { bottom: 0; left: 0; }

.toast {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  min-width: 16rem;
  max-width: 24rem;
  border-radius: var(--radius, 0.5rem);
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--background));
  padding: 1rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  animation: toast-in 300ms ease-out;
}

@keyframes toast-in {
  from { opacity: 0; transform: translateX(100%); }
  to { opacity: 1; transform: translateX(0); }
}

.toast-success {
  border-color: hsl(142 76% 36% / 0.5);
  background-color: hsl(142 76% 36% / 0.1);
}

.toast-error {
  border-color: hsl(var(--destructive) / 0.5);
  background-color: hsl(var(--destructive) / 0.1);
}

.toast-warning {
  border-color: hsl(38 92% 50% / 0.5);
  background-color: hsl(38 92% 50% / 0.1);
}

.toast-info {
  border-color: hsl(199 89% 48% / 0.5);
  background-color: hsl(199 89% 48% / 0.1);
}

/* ============================================
   BREADCRUMB
   ============================================ */
.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
}

.breadcrumb-item {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
}

.breadcrumb-link { transition: color 150ms; }
.breadcrumb-link:hover { color: hsl(var(--foreground)); }
.breadcrumb-separator { color: hsl(var(--muted-foreground)); }
.breadcrumb-current { font-weight: 400; color: hsl(var(--foreground)); }

/* ============================================
   PAGINATION
   ============================================ */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
}

.pagination-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: var(--radius, 0.5rem);
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 150ms;
  cursor: pointer;
}

.pagination-item:hover { background-color: hsl(var(--accent)); }

.pagination-item.active {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

.pagination-item:disabled {
  pointer-events: none;
  opacity: 0.5;
}

.pagination-ellipsis {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
}

/* ============================================
   KBD (Keyboard)
   ============================================ */
.kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 1.25rem;
  min-width: 1.25rem;
  border-radius: 0.25rem;
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--muted));
  padding: 0 0.25rem;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, monospace);
  font-size: 0.625rem;
  font-weight: 500;
  box-shadow: 0 1px 0 1px hsl(var(--border));
}

/* ============================================
   CODE
   ============================================ */
.code {
  position: relative;
  border-radius: var(--radius, 0.5rem);
  background-color: hsl(var(--muted));
  padding: 0.125rem 0.375rem;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, monospace);
  font-size: 0.875rem;
  font-weight: 500;
}

.code-block {
  display: block;
  overflow-x: auto;
  padding: 1rem;
  line-height: 1.5;
}

/* ============================================
   UTILITY CLASSES
   ============================================ */

/* Glass effect */
.glass {
  background-color: hsl(var(--background) / 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* Container */
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) { .container { max-width: 640px; } }
@media (min-width: 768px) { .container { max-width: 768px; } }
@media (min-width: 1024px) { .container { max-width: 1024px; } }
@media (min-width: 1280px) { .container { max-width: 1280px; } }
@media (min-width: 1536px) { .container { max-width: 1536px; } }

/* Screen reader only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.not-sr-only {
  position: static;
  width: auto;
  height: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}

/* Truncate */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Line clamp */
.line-clamp-1 { overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; }
.line-clamp-2 { overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
.line-clamp-3 { overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; }
.line-clamp-4 { overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 4; }
.line-clamp-5 { overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 5; }
.line-clamp-6 { overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 6; }

/* Aspect ratio */
.aspect-auto { aspect-ratio: auto; }
.aspect-square { aspect-ratio: 1 / 1; }
.aspect-video { aspect-ratio: 16 / 9; }

/* Gradient text */
.gradient-text {
  background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.7) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Animations */
.animate-fade-in {
  animation: fade-in 200ms ease-out;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-slide-in-right {
  animation: slide-in-right 300ms ease-out;
}

@keyframes slide-in-right {
  from { opacity: 0; transform: translateX(100%); }
  to { opacity: 1; transform: translateX(0); }
}

.animate-slide-in-left {
  animation: slide-in-left 300ms ease-out;
}

@keyframes slide-in-left {
  from { opacity: 0; transform: translateX(-100%); }
  to { opacity: 1; transform: translateX(0); }
}

.animate-slide-in-up {
  animation: slide-in-up 300ms ease-out;
}

@keyframes slide-in-up {
  from { opacity: 0; transform: translateY(100%); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-slide-in-down {
  animation: slide-in-down 300ms ease-out;
}

@keyframes slide-in-down {
  from { opacity: 0; transform: translateY(-100%); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-scale-in {
  animation: scale-in 200ms ease-out;
}

@keyframes scale-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-ping {
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {
  75%, 100% { transform: scale(2); opacity: 0; }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-bounce {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
`
}

/**
 * Generate complete theme CSS
 */
export function generateThemeCSSComplete(options: CSSGenerationOptions = {}): string {
  const opts = { ...defaultOptions, ...options }
  const sections: string[] = []

  // Reset
  if (opts.includeReset) {
    sections.push(generateResetCSS())
  }

  // Root variables
  const rootLines: string[] = []

  // Semantic tokens for light mode
  const lightTokens = opts.preset ? themePresets[opts.preset].light : lightSemanticTokens
  rootLines.push(generateSemanticCSS(lightTokens))

  // Color palette
  if (opts.includeColors) {
    rootLines.push('')
    rootLines.push('  /* Color Palette */')
    rootLines.push(generateColorPaletteCSS())
  }

  // Spacing
  if (opts.includeSpacing) {
    rootLines.push('')
    rootLines.push('  /* Spacing */')
    rootLines.push(generateSpacingCSS())
    rootLines.push('')
    rootLines.push('  /* Sizing */')
    rootLines.push(generateSizingCSS())
    rootLines.push('')
    rootLines.push('  /* Max Width */')
    rootLines.push(generateMaxWidthCSS())
    rootLines.push('')
    rootLines.push('  /* Z-Index */')
    rootLines.push(generateZIndexCSS())
  }

  // Typography
  if (opts.includeTypography) {
    rootLines.push('')
    rootLines.push('  /* Typography */')
    rootLines.push(generateTypographyCSS())
  }

  // Effects
  if (opts.includeEffects) {
    rootLines.push('')
    rootLines.push('  /* Effects */')
    rootLines.push(generateEffectsCSS())
  }

  // Breakpoints
  if (opts.includeBreakpoints) {
    rootLines.push('')
    rootLines.push('  /* Breakpoints */')
    rootLines.push(generateBreakpointsCSS())
  }

  sections.push(`:root {\n${rootLines.join('\n')}\n}`)

  // Dark mode tokens
  const darkTokens = opts.preset ? themePresets[opts.preset].dark : darkSemanticTokens

  switch (opts.darkMode) {
    case 'class':
      sections.push(`.dark {\n${generateSemanticCSS(darkTokens)}\n}`)
      break
    case 'media':
      sections.push(`@media (prefers-color-scheme: dark) {\n  :root {\n${generateSemanticCSS(darkTokens)}\n  }\n}`)
      break
    case 'selector':
      sections.push(`[data-theme="dark"] {\n${generateSemanticCSS(darkTokens)}\n}`)
      break
    case 'auto':
      sections.push(`.dark {\n${generateSemanticCSS(darkTokens)}\n}`)
      sections.push(`@media (prefers-color-scheme: dark) {\n  :root:not(.light) {\n${generateSemanticCSS(darkTokens)}\n  }\n}`)
      break
  }

  // Base styles
  if (opts.includeBase) {
    sections.push(generateBaseCSS())
  }

  // Component classes
  if (opts.includeComponents) {
    sections.push(generateComponentsCSS())
  }

  let css = sections.join('\n\n')

  // Minify if requested
  if (opts.minify) {
    css = css
      .replace(/\/\*[\s\S]*?\*\//g, '')  // Remove comments
      .replace(/\s*\n\s*/g, '')           // Remove newlines
      .replace(/\s*{\s*/g, '{')           // Clean braces
      .replace(/\s*}\s*/g, '}')
      .replace(/\s*:\s*/g, ':')           // Clean colons
      .replace(/\s*;\s*/g, ';')           // Clean semicolons
      .replace(/;}/g, '}')                // Remove trailing semicolons
  }

  return css
}

/**
 * Pre-generated default theme CSS (coral preset, class strategy)
 */
export const defaultThemeCSS = generateThemeCSSComplete({
  preset: 'coral',
  darkMode: 'class',
  includeReset: true,
  includeBase: true,
})

/**
 * Pre-generated minimal theme CSS (semantic tokens only)
 */
export const minimalThemeCSS = generateThemeCSSComplete({
  preset: 'coral',
  darkMode: 'class',
  includeColors: false,
  includeSpacing: false,
  includeTypography: false,
  includeEffects: false,
  includeBreakpoints: false,
  includeReset: false,
  includeBase: false,
})

/**
 * Pre-generated theme CSS with only reset
 */
export const resetOnlyCSS = generateResetCSS()

/**
 * Pre-generated theme CSS with system dark mode
 */
export const systemDarkModeCSS = generateThemeCSSComplete({
  preset: 'coral',
  darkMode: 'media',
  includeReset: true,
  includeBase: true,
})

export default generateThemeCSSComplete
