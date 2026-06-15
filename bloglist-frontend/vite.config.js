import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [react()],

    server: {
      host: 'localhost',
      port: 5173,

      hmr: {
        protocol: 'ws',
        host: 'localhost',
        port: 5173,
      },

      proxy: {
        '/api': {
          target: `http://localhost:${env.VITE_BACKEND_PORT}`,
          changeOrigin: true,
        }
      }
    },

    test: {
      environment: 'jsdom',
      globals: true,
      
    }
  }
})