import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/trending": "https://flexify-backend.onrender.com",
      "/api/movies": "https://flexify-backend.onrender.com",
      "/api/series": "https://flexify-backend.onrender.com",
      "/api/upcomingmovies": "https://flexify-backend.onrender.com",
      "/api/upcomingseries": "https://flexify-backend.onrender.com",
      "/api/recommendations": "https://flexify-backend.onrender.com",
      "/api/download/movie": "https://flexify-backend.onrender.com",
    },
  },
  plugins: [react()],
});
