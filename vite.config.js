import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/fx": {
        target: "https://open.er-api.com",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/fx/, ""),
      },
    },
  },
});