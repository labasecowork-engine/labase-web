import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://labase.pe",
  integrations: [
    react(),
    tailwind({
      config: { path: "./tailwind.config.cjs" },
    }),
    sitemap({
      filter: (page) =>
        !page.includes("/politicas/") &&
        !page.includes("/terminos/") &&
        !page.includes("/arsenal/"),
    }),
  ],
  output: "server",
  adapter: node({ mode: "standalone" }),
});
