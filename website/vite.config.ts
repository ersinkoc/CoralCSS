import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_URL || '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@coralcss/core/runtime': path.resolve(__dirname, '../dist/runtime.js'),
      '@coralcss/core/components': path.resolve(__dirname, '../dist/components/index.js'),
      '@coralcss/core': path.resolve(__dirname, '../dist/index.js'),
    },
  },
  build: {
    outDir: 'dist',
  },
})
