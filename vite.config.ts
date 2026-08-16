import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  plugins: [react()],
  // Vite's built-in asset-extension list is case-sensitive and doesn't cover
  // uppercase .JPEG/.JPG, which some source photos came in as.
  assetsInclude: ["**/*.JPEG", "**/*.JPG"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
