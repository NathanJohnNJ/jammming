import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    server: {
      https: true,
      cors: true,
    },
    plugins: [
      basicSsl({
      name: 'test',
      domains: ['*.njtd.xyz'],
      certDir: '/Users/.../.devServer/cert',
    }),
      react(),
      tailwindcss()
    ],
    build: {
      target: 'esnext'
    }
  }
})