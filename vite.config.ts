import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dotenv from 'dotenv'

dotenv.config()


export default defineConfig({
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "./src/app"),
      "@entities": path.resolve(__dirname, "./src/entities"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@widgets": path.resolve(__dirname, "./src/widgets"),
      "@assets": path.resolve(__dirname, "./assets"),
    },
  },
  plugins: [react()],
  server: {
    port: 8080,
    allowedHosts: true,
  },
});
