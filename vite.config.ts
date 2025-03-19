import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    allowedHosts: true,
  },
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "./src/app"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@entities": path.resolve(__dirname, "./src/entities"),
      "@widgets": path.resolve(__dirname, "./src/widgets"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@processes": path.resolve(__dirname, "./src/processes"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
  build: {
    rollupOptions: {
      external: ["@shared/ui"],
    },
  },
});
