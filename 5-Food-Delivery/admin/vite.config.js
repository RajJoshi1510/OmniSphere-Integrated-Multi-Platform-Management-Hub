import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Simple English Comment:
// Vite configuration for OmniBite (Food Delivery) restaurant admin panel.
// Running on dedicated port 5179.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5179,
    host: true,
  },
})
