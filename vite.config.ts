import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  root: './resources/assets/',

  build: {
    outDir: '../../public/dist/',
    manifest: true,
    sourcemap: true,
    rollupOptions: {
      input: resolve(__dirname, 'resources/assets/js/app.js'),  
    }
  },

  plugins: [vue()]
})