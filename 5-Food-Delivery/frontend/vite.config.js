import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration for OmniBite (Food Delivery) customer frontend.
// Running on dedicated port 5178.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5178,
    host: true,
  },
})
