import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    jsx: 'react',
  },
  //base: '/sjcapitalinvestaa-webportal/' // 👈 very important
  base: '/'
});
