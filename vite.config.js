// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist', // Output directory for built files
    rollupOptions: {
      input: '/assets/main.js', // Entry point
    },
  },
});
