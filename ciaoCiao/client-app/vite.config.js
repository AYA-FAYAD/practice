import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  server: {
    proxy: {
      "/": {
        target: "http://localhost:3000/",
        changeOrigin: true,
      },
    },
  },
  plugins: [TanStackRouterVite(), react()],
});
