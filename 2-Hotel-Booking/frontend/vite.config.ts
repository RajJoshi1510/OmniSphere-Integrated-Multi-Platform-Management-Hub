import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// Simple English Comment:
// Vite configuration for OmniStay (Hotel Booking) frontend.
// Running on dedicated port 5175.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
    host: true,
  },
});
