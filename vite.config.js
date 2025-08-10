import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
// import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    server: {
      cors: true,
    },
    plugins: [
    //    basicSsl({
    //    name: 'test',
    //    domains: ['*.custom.com'],
    //    certDir: '/Users/.../.devServer/cert',
    //  }),
      react({
        babel: {
          plugins: ['babel-plugin-react-compiler'],
        }
      }),
      tailwindcss()
    ],
    build: {
      target: 'esnext'
    }
  }
})