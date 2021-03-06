import { defineConfig } from 'vite'
//import vue from '@vitejs/plugin-vue'
const { createVuePlugin } = require('vite-plugin-vue2')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [createVuePlugin()],

  root: './resources',
  base: '/assets/',

  build: {
    outDir: '../public/assets',
    assetsDir: '',
    manifest: true,
    rollupOptions: {
      output: {
        manualChunks: undefined
      },
      input: './resources/js/main.ts'
    }
  }
})
