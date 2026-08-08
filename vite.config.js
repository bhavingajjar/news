import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// 404.html is produced by scripts/seo-prerender.mjs after build (GitHub Pages SPA fallback).
export default defineConfig({
  base: '/news/',
  plugins: [react(), tailwindcss()],
})
