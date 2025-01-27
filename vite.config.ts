import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,  // Hardcoded to 3000 for local development or fallback
    host: "0.0.0.0",  // Ensure Vite listens on all interfaces
  },
})
