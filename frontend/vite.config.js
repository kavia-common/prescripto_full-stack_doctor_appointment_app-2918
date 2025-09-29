import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Keep user app at root base
  base: '/',
  // Use a distinct build output directory to avoid clashes with admin builds
  build: {
    outDir: 'dist-frontend',
    assetsDir: 'assets',
    sourcemap: true
  },
  // Explicitly set unique dev and preview ports and enable host binding for previews behind proxies
  server: { port: 5173, host: true },
  preview: { port: 4173, host: true }
})
