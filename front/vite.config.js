import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  base: process.env.VITE_MODE === 'generate' ? './' : '/',
  server: {
    port: 8091,
    host: '0.0.0.0',
    open: true,
    proxy: {
      "/api/": {
        target: 'http://localhost:8025/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  },
  resolve: {
    alias: { "@": "/src", "@materials": '/src/packages/materials' }
  }
})
