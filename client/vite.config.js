import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Clean URLs (/about-us). The preview build uses "hash" instead.
  define: { __ROUTER_MODE__: JSON.stringify('path') },
  server: {
    port: 5173,
    // Any request to /api goes to the Express server during development.
    proxy: { '/api': 'http://localhost:5000', '/uploads': 'http://localhost:5000' },
  },
});
