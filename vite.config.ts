import { defineConfig } from 'vite'
import { resolve } from 'path'
//import vue from '@vitejs/plugin-vue'
const { createVuePlugin } = require('vite-plugin-vue2')

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, './resources/js')
      }
    ]
  },

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
