import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        id: "/",
        name: "WhatsWhen?",
        short_name: "WhatsWhen?",
        description: "Free Daily Planner and Task Manager",
        start_url: "/",
        scope: "/",
        display: "standalone",
        display_override: ["window-controls-overlay", "standalone"],
        theme_color: "#000000",
        background_color: "#000000",
        categories: ["schedule", "planner", "productivity"],
        icons: [
          {
            src: "/icons/icon.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/icon.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        screenshots: [
          {
            src: "/screenshots/screenshot.png",
            sizes: "1366x768",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "/screenshots/screenshot.png",
            sizes: "1366x768",
            type: "image/png",
            form_factor: "narrow",
          },
        ],
      },
    }),
  ],
});
