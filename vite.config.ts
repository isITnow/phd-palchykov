import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: { outDir: "dist" },
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: { port: 3001 },
  preview: { port: 3001 },
  base: "/",
});
