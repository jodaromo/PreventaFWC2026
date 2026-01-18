import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // For custom domain: use '/'
  // For GitHub Pages without custom domain: use '/fifa2026-landing/'
  base: '/fifa2026-landing/',
})
