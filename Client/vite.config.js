import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load .env file based on mode (development, production, etc.)
  const env = loadEnv(mode, process.cwd());

  console.log('SERVER_URL:', env.VITE_SERVER_URL); // just for debug

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_SERVER_URL,
          changeOrigin: true,
          secure: false
        }
      }
    },
    base: './',
  };
});
