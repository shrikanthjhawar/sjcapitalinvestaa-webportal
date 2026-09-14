import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Vite plugin to create a 404.html copy of index.html for GitHub Pages SPA routing fallback.
 */
function spaFallbackPlugin(): Plugin {
  return {
    name: 'spa-fallback',
    apply: 'build',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const indexPath = path.join(distDir, 'index.html');
      const fallbackPath = path.join(distDir, '404.html');

      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, fallbackPath);
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), spaFallbackPlugin()],
  esbuild: {
    jsx: 'react',
  },
  base: '/',
});
