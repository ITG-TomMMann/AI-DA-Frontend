import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Add base property to ensure relative paths
  base: './',

  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
