import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  console.log('------------------环境变量:', env.VITE_MODE, '--------------------')
  return {
    plugins: [vue(), vueJsx()],
    base: env.VITE_MODE === 'generate' ? './' : '/',
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
  }
})
