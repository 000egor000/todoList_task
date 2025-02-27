import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { ManifestOptions } from "vite-plugin-pwa/dist/index.cjs";

const manifestInit: Partial<ManifestOptions> = {
  theme_color: "#000000",
  background_color: "#2EC6FE",
  icons: [
    {
      purpose: "maskable",
      sizes: "512x512",
      src: "icon512_maskable.png",
      type: "image/png",
    },
    {
      purpose: "any",
      sizes: "512x512",
      src: "icon512_rounded.png",
      type: "image/png",
    },
  ],
  orientation: "any",
  display: "standalone",
  lang: "ru-RU",
  name: "toDo-list",
  short_name: "toDo",
  start_url: "/",
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{html,css,js,ico,png,svg}"],
      },
      manifest: manifestInit,
    }),
  ],
});
