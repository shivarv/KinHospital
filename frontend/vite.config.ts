import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 5173,
      // Forward API calls to FastAPI so the browser sees one origin.
      // 127.0.0.1 (not "localhost"): Node may resolve localhost to IPv6 ::1, where uvicorn isn't listening.
      proxy: {
        '/api': { target: env.API_PROXY_TARGET ?? 'http://127.0.0.1:8000', changeOrigin: true },
      },
    },
  }
})
