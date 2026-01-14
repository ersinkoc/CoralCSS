/**
 * Incremental Build System
 *
 * Tracks file changes and only rebuilds what's necessary for faster builds.
 * Uses file hashing and dependency tracking to enable incremental compilation.
 *
 * @module core/incremental
 */

import { readFileSync, existsSync, statSync } from 'fs'
import { createHash } from 'crypto'

/**
 * Build manifest entry
 */
export interface ManifestEntry {
  /** File path */
  path: string
  /** Content hash */
  hash: string
  /** File size in bytes */
  size: number
  /** Last modified timestamp */
  mtime: number
  /** Files this file depends on */
  dependencies: string[]
  /** Generated CSS classes from this file */
  classes: string[]
}

/**
 * Build manifest
 */
export interface BuildManifest {
  /** Manifest version */
  version: string
  /** Cache key for the entire build */
  cacheKey: string
  /** When the build was created */
  timestamp: number
  /** All tracked files */
  files: Record<string, ManifestEntry>
  /** Generated CSS */
  css?: string
  /** Build configuration hash */
  configHash?: string
}

/**
 * Build result
 */
export interface BuildResult {
  /** Generated CSS */
  css: string
  /** New build manifest */
  manifest: BuildManifest
  /** Whether this was an incremental build */
  incremental: boolean
  /** Files that were rebuilt */
  rebuiltFiles: string[]
  /** Files that were skipped (cached) */
  cachedFiles: string[]
  /** Build time in milliseconds */
  buildTime: number
}

/**
 * Incremental build options
 */
export interface IncrementalBuildOptions {
  /** Manifest file path */
  manifestPath?: string
  /** File patterns to include */
  include?: string[]
  /** File patterns to exclude */
  exclude?: string[]
  /** Whether to use hashing */
  useHashing?: boolean
  /** Cache directory */
  cacheDir?: string
}

/**
 * File change type
 */
export type FileChangeType = 'added' | 'modified' | 'deleted' | 'unchanged'

/**
 * File change info
 */
export interface FileChange {
  path: string
  type: FileChangeType
  oldHash?: string
  newHash?: string
}

/**
 * Incremental Builder - Tracks changes and rebuilds incrementally
 *
 * @example
 * ```typescript
 * const builder = new IncrementalBuilder({
 *   manifestPath: './dist/.coral-manifest.json'
 * })
 *
 * const result = await builder.build(['./src/index.html', './src/app.html'], async (file) => {
 *   const classes = await extractClasses(file)
 *   const css = await generateCSS(classes)
 *   return { classes, css }
 * })
 *
 * console.log('Incremental:', result.incremental)
 * console.log('Rebuilt', result.rebuiltFiles.length, 'files')
 * ```
 */
export class IncrementalBuilder {
  private manifest: BuildManifest | null = null
  private manifestPath: string
  private options: Required<IncrementalBuildOptions>

  constructor(options: IncrementalBuildOptions = {}) {
    this.manifestPath = options.manifestPath ?? './dist/.coral-manifest.json'
    this.options = {
      manifestPath: this.manifestPath,
      include: options.include ?? [],
      exclude: options.exclude ?? [],
      useHashing: options.useHashing ?? true,
      cacheDir: options.cacheDir ?? './dist/.coral-cache'
    }
  }

  /**
   * Load previous build manifest
   */
  async loadManifest(): Promise<BuildManifest | null> {
    if (!existsSync(this.manifestPath)) {
      return null
    }

    try {
      const content = readFileSync(this.manifestPath, 'utf-8')
      this.manifest = JSON.parse(content)
      return this.manifest
    } catch {
      return null
    }
  }

  /**
   * Save build manifest
   */
  async saveManifest(manifest: BuildManifest): Promise<void> {
    const content = JSON.stringify(manifest, null, 2)
    // Use fs.writeFileSync here - in production would use async
    const { writeFileSync } = await import('fs')
    writeFileSync(this.manifestPath, content, 'utf-8')
    this.manifest = manifest
  }

  /**
   * Detect file changes since last build
   */
  detectChanges(files: string[]): FileChange[] {
    const changes: FileChange[] = []
    const previousFiles = this.manifest?.files ?? {}

    for (const file of files) {
      if (!existsSync(file)) {
        // File was deleted
        if (previousFiles[file]) {
          changes.push({ path: file, type: 'deleted' })
        }
        continue
      }

      const stats = statSync(file)
      const newHash = this.options.useHashing ? this.hashFile(file) : stats.mtime.toString()

      if (!previousFiles[file]) {
        // New file
        changes.push({ path: file, type: 'added', newHash })
      } else if (previousFiles[file].hash !== newHash) {
        // File modified
        changes.push({
          path: file,
          type: 'modified',
          oldHash: previousFiles[file].hash,
          newHash
        })
      } else {
        // File unchanged
        changes.push({ path: file, type: 'unchanged' })
      }
    }

    // Check for deleted files
    for (const file of Object.keys(previousFiles)) {
      if (!files.includes(file) && !existsSync(file)) {
        changes.push({ path: file, type: 'deleted' })
      }
    }

    return changes
  }

  /**
   * Get files that need to be rebuilt
   */
  getFilesToBuild(changes: FileChange[]): string[] {
    return changes
      .filter(c => c.type === 'added' || c.type === 'modified')
      .map(c => c.path)
  }

  /**
   * Get dependent files that need rebuilding
   */
  getDependentFiles(changedFiles: string[]): string[] {
    if (!this.manifest) {
      return []
    }

    const dependents = new Set<string>()

    for (const changedFile of changedFiles) {
      for (const [filePath, entry] of Object.entries(this.manifest.files)) {
        if (entry.dependencies.includes(changedFile)) {
          dependents.add(filePath)
        }
      }
    }

    return Array.from(dependents)
  }

  /**
   * Execute incremental build
   */
  async build(
    files: string[],
    buildFn: (file: string) => Promise<{ classes: string[]; css: string }>
  ): Promise<BuildResult> {
    const startTime = Date.now()

    // Load previous manifest
    await this.loadManifest()

    // Detect changes
    const changes = this.detectChanges(files)
    const filesToBuild = this.getFilesToBuild(changes)

    // Check for dependents
    const dependents = this.getDependentFiles(filesToBuild)
    const allFilesToBuild = [...new Set([...filesToBuild, ...dependents])]

    // Determine if incremental
    const incremental = this.manifest !== null && allFilesToBuild.length < files.length

    // Create new manifest
    const newManifest: BuildManifest = {
      version: '1.0.0',
      cacheKey: this.generateCacheKey(files),
      timestamp: Date.now(),
      files: { ...this.manifest?.files },
      css: this.manifest?.css ?? ''
    }

    const rebuiltFiles: string[] = []
    const cachedFiles: string[] = []
    let newCSS = newManifest.css ?? ''

    // Build changed files
    for (const file of allFilesToBuild) {
      try {
        const result = await buildFn(file)
        const stats = statSync(file)
        const hash = this.options.useHashing ? this.hashFile(file) : stats.mtime.toString()

        // Update manifest entry
        newManifest.files[file] = {
          path: file,
          hash,
          size: stats.size,
          mtime: stats.mtime.getTime(),
          dependencies: [],
          classes: result.classes
        }

        // Append new CSS
        newCSS += result.css + '\n'
        rebuiltFiles.push(file)
      } catch (error) {
        console.error(`Failed to build ${file}:`, error)
      }
    }

    // Mark unchanged files as cached
    for (const change of changes) {
      if (change.type === 'unchanged') {
        cachedFiles.push(change.path)
      }
    }

    // Remove deleted files from manifest
    for (const change of changes) {
      if (change.type === 'deleted') {
        delete newManifest.files[change.path]
      }
    }

    newManifest.css = newCSS

    // Save new manifest
    await this.saveManifest(newManifest)

    const buildTime = Date.now() - startTime

    return {
      css: newCSS,
      manifest: newManifest,
      incremental,
      rebuiltFiles,
      cachedFiles,
      buildTime
    }
  }

  /**
   * Hash a file's content
   */
  private hashFile(filePath: string): string {
    try {
      const content = readFileSync(filePath, 'utf-8')
      return createHash('sha256').update(content).digest('hex').substring(0, 16)
    } catch {
      return ''
    }
  }

  /**
   * Generate cache key for build
   */
  private generateCacheKey(files: string[]): string {
    const sortedFiles = [...files].sort()
    const combined = sortedFiles.join('|')
    return createHash('sha256').update(combined).digest('hex').substring(0, 16)
  }

  /**
   * Clear build cache and manifest
   */
  async clear(): Promise<void> {
    this.manifest = null

    const { unlinkSync } = await import('fs')
    try {
      unlinkSync(this.manifestPath)
    } catch {
      // File doesn't exist, ignore
    }
  }

  /**
   * Get current manifest
   */
  getManifest(): BuildManifest | null {
    return this.manifest
  }

  /**
   * Check if a file needs rebuilding
   */
  needsRebuild(filePath: string): boolean {
    if (!this.manifest || !this.manifest.files[filePath]) {
      return true
    }

    if (!existsSync(filePath)) {
      return true
    }

    const entry = this.manifest.files[filePath]
    const newHash = this.options.useHashing ? this.hashFile(filePath) : statSync(filePath).mtime.toString()

    return entry.hash !== newHash
  }

  /**
   * Invalidate cache for specific files
   */
  async invalidateFiles(files: string[]): Promise<void> {
    if (!this.manifest) {
      return
    }

    for (const file of files) {
      delete this.manifest.files[file]
    }

    await this.saveManifest(this.manifest)
  }
}

/**
 * Dependency tracker for build system
 */
export class DependencyTracker {
  private dependencies: Map<string, Set<string>> = new Map()

  /**
   * Add a dependency relationship
   */
  add(file: string, dependency: string): void {
    if (!this.dependencies.has(file)) {
      this.dependencies.set(file, new Set())
    }
    this.dependencies.get(file)!.add(dependency)
  }

  /**
   * Get all files that depend on a given file
   */
  getDependents(file: string): string[] {
    const dependents: string[] = []

    for (const [depFile, deps] of this.dependencies.entries()) {
      if (deps.has(file)) {
        dependents.push(depFile)
      }
    }

    return dependents
  }

  /**
   * Get transitive dependents (files that depend on files that depend on...)
   */
  getTransitiveDependents(file: string): Set<string> {
    const visited = new Set<string>()
    const queue = [file]

    while (queue.length > 0) {
      const current = queue.shift()!
      if (visited.has(current)) {
        continue
      }

      visited.add(current)
      const directDependents = this.getDependents(current)
      queue.push(...directDependents)
    }

    visited.delete(file) // Remove the original file
    return visited
  }

  /**
   * Clear all dependencies
   */
  clear(): void {
    this.dependencies.clear()
  }

  /**
   * Get all dependencies as a record
   */
  toRecord(): Record<string, string[]> {
    const result: Record<string, string[]> = {}

    for (const [file, deps] of this.dependencies.entries()) {
      result[file] = Array.from(deps)
    }

    return result
  }
}

/**
 * Build cache for storing intermediate results
 */
export class BuildCache<T = unknown> {
  private cache: Map<string, { result: T; timestamp: number }> = new Map()
  private ttl: number

  constructor(ttl: number = 3600000) { // 1 hour default
    this.ttl = ttl
  }

  /**
   * Get cached build result
   */
  get(key: string): T | null {
    const entry = this.cache.get(key)
    if (!entry) {
      return null
    }

    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key)
      return null
    }

    return entry.result
  }

  /**
   * Set build result in cache
   */
  set(key: string, result: T): void {
    this.cache.set(key, {
      result,
      timestamp: Date.now()
    })
  }

  /**
   * Clear cache
   */
  clear(): void {
    this.cache.clear()
  }

  /**
   * Clean up expired entries
   */
  cleanup(): number {
    const now = Date.now()
    let removed = 0

    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > this.ttl) {
        this.cache.delete(key)
        removed++
      }
    }

    return removed
  }
}

/**
 * Create an incremental builder
 *
 * @example
 * ```typescript
 * const builder = createIncrementalBuilder({
 *   manifestPath: './dist/.coral-manifest.json'
 * })
 * ```
 */
export function createIncrementalBuilder(options?: IncrementalBuildOptions): IncrementalBuilder {
  return new IncrementalBuilder(options)
}

/**
 * Create a dependency tracker
 */
export function createDependencyTracker(): DependencyTracker {
  return new DependencyTracker()
}

/**
 * Create a build cache
 */
export function createBuildCache(ttl?: number): BuildCache {
  return new BuildCache(ttl)
}

export default {
  IncrementalBuilder,
  DependencyTracker,
  BuildCache,
  createIncrementalBuilder,
  createDependencyTracker,
  createBuildCache
}
