import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// HashRouter is used, so base "./" keeps assets working on any host
// (GitHub Pages project sites, custom domains, subpaths).
export default defineConfig({
  plugins: [react()],
  base: "./",
});
