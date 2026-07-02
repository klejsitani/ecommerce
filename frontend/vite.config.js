// ===================================================================
// VITE.CONFIG.JS - Konfigurimi i Vite (build tool)
// Vite eshte ai qe ekzekuton "npm run dev" dhe ngjit React me browser
// ===================================================================

// Sjellim defineConfig - funksion ndihmes qe jep autocomplete te VS Code
import { defineConfig } from "vite";

// Sjellim plugin-in oficial te React - lejon Vite te kuptoje .jsx
import react from "@vitejs/plugin-react";

// Eksportojme konfigurimin
export default defineConfig({

  // ===== PLUGINS =====
  // React plugin = lejon .jsx, hot-reload, Fast Refresh, etj.
  plugins: [react()],

  // ===== SERVER CONFIG =====
  // Konfigurim per dev server (kur ekzekuton "npm run dev")
  server: {

    // Porti ku do degjoje Vite
    port: 5173,

    // PROXY - shume i rendesishem!
    // Cdo kerkese qe nis me /api do drejtohet automatikisht te backend
    // P.sh. fetch("/api/products") -> shkon te http://localhost:5000/api/products
    // Kjo na lejon te shkruajme kod te thjeshte ne React (pa URL te plote)
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true
      }
    }
  }
});