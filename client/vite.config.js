import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/getusers": {
        target: "http://localhost:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/getusers/, ""),
      },
      "/getuser/:id": "http://localhost:5000",
      "/api/users/signup": "http://localhost:5000",
    },
  },
});
