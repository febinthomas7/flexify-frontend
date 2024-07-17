import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/trending": "http://localhost:3000",
      "/api/movies": "http://localhost:3000",
    },
  },
  plugins: [react()],
});
