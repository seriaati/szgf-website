import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://szgf.seria.moe",
  integrations: [react()],
  // Cloudflare redirects /page to /page/ when serving page/index.html; page.html is served at /page directly.
  build: { format: "file" },
  trailingSlash: "never",
  server: {
    host: true,
    port: 8080,
  },
});
