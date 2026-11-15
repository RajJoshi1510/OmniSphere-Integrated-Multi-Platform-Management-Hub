import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Simple English Comment:
// Vite configuration for OmniMart (E-Commerce) frontend.
// Running on dedicated port 5176.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5176,
    host: true,
  },
})
