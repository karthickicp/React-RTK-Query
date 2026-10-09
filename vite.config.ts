import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true, // Allows using describe, it, expect without explicit imports
    environment: "jsdom", // Simulates a browser environment
    setupFiles: "./src/test/setup.js", // Runs setup code before executing tests
  },
});
