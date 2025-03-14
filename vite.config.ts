import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      external: ["yup"],
    }
  },
  optimizeDeps: {
    include: ["yup"],
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  base: "/",
});
