import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Simple English Comment:
// Vite configuration for OmniDrive (Car Rental) frontend.
// Fixed to port 5174 to avoid any port conflicts with other apps.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5174,
    host: true,
  },
  optimizeDeps: {
    exclude: ['lightningcss'],
  },
})
