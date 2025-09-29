import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Serve admin app under /admin/ to avoid clashes with user frontend
  base: '/admin/',
  // Use a distinct build output directory to prevent dist collisions
  build: {
    outDir: 'dist-admin',
    assetsDir: 'assets',
    sourcemap: true
  },
  // Explicitly set unique dev and preview ports and enable host binding for previews behind proxies
  server: { port: 5174, host: true },
  preview: {
    port: 4174,
    host: true,
    // Ensure preview serves at the same base path for admin
    // Note: Vite preview respects 'base' in links; using proxy is unnecessary here
  }
})
