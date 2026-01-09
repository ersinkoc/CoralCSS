import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    environmentMatchGlobs: [
      // Use jsdom for component and runtime tests
      ['tests/unit/components/**', 'jsdom'],
      ['tests/unit/runtime/**', 'jsdom'],
    ],
    include: ['tests/**/*.test.ts'],
    exclude: ['tests/e2e/**', 'node_modules', 'dist'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/',
        'tests/',
        'website/',
        'examples/',
        '*.config.*',
        'src/runtime/cdn.ts',
        'dist/',
        '**/*.d.ts',
      ],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    },
    testTimeout: 10000,
    hookTimeout: 10000,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@coral-css/core': resolve(__dirname, './src/index.ts'),
    },
  },
})
