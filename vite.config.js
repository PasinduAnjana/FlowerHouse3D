import { defineConfig } from 'vite';
import fs from 'fs-extra';

export default defineConfig({
  build: {
    // ...
    rollupOptions: {
      output: {
        manualChunks: {},
      },
    },
  },
  plugins: [
    // ...
    {
      name: 'copy-public-folder',
      async writeBundle() {
        // Copy the entire public folder to dist
        await fs.copy('public', 'dist/public');
      },
    },
  ],
});