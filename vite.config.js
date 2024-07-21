import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const ProxyTarget = import.meta.env.BASE_URL;
export default defineConfig({
  server: {
    proxy: {
      "/api/trending": ProxyTarget,
      "/api/movies": ProxyTarget,
      "/api/series": ProxyTarget,
      "/api/upcomingmovies": ProxyTarget,
      "/api/upcomingseries": ProxyTarget,
      "/api/recommendations": ProxyTarget,
      "/api/download/movie": ProxyTarget,
    },
  },
  plugins: [react()],
});
