import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Cambiar si la app no está en la raíz del dominio
  build: {
    outDir: 'dist', // Asegúrate de que coincida con el `distDir` en vercel.json
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    }
  }
});
