import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

// Helper function to serve static files
function serveStaticFiles(basePath: string) {
  return (req: any, res: any, next: any) => {
    const filePath = path.join(basePath, req.url || '')

    // Check if it's a directory and serve index.html
    const indexPath = path.join(filePath, 'index.html')
    const targetPath = fs.existsSync(indexPath) ? indexPath : filePath

    if (fs.existsSync(targetPath) && fs.statSync(targetPath).isFile()) {
      const ext = path.extname(targetPath)
      const contentType: Record<string, string> = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.json': 'application/json',
        '.map': 'application/json',
      }

      res.setHeader('Content-Type', contentType[ext] || 'text/plain')
      fs.createReadStream(targetPath).pipe(res)
    } else {
      next()
    }
  }
}

export default defineConfig({
  plugins: [
    react(),
    // Serve examples and dist from parent directory
    {
      name: 'serve-parent-directories',
      configureServer(server) {
        // Serve examples folder
        server.middlewares.use('/examples', serveStaticFiles(path.resolve(__dirname, '../examples')))
        // Serve dist folder for coral.min.global.js
        server.middlewares.use('/dist', serveStaticFiles(path.resolve(__dirname, '../dist')))
      },
    },
  ],
  base: process.env.BASE_URL || '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@coral-css/core/runtime': path.resolve(__dirname, '../dist/runtime.js'),
      '@coral-css/core/components': path.resolve(__dirname, '../dist/components/index.js'),
      '@coral-css/core': path.resolve(__dirname, '../dist/index.js'),
    },
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
  build: {
    outDir: 'dist',
  },
})
