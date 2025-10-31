// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)), // import "@/components/..."
        },
    },
    server: {
        host: true, // permite acceder desde la red local si lo necesitas
        port: 5173,
        open: false,
    },
    preview: {
        port: 4173,
        open: false,
    },
    build: {
        sourcemap: false,
        target: "esnext",
        assetsInlineLimit: 4096,
        chunkSizeWarningLimit: 600, // evita avisos molestos en builds pequeños
    },
});
