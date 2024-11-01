import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  server: {
    port: 8091,
    open: true,
    proxy: 'http://localhost:3000/'
  },
  resolve: {
    alias: { "@": "/src" }
  },
  build: {
    rollupOptions: {
      input: 'test.html'
    }
  }
})
