import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Simple English Comment:
// Vite configuration for OmniSocial (Social Media) client.
// Configured to run on dedicated port 5177.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5177,
    host: true,
    open: false,
  },
  build: {
    sourcemap: false,
  },
});
