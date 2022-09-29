import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import adonis from '@91codes/adonis-vite/build/plugins/adonis'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, './resources/js'),
      },
      {
        find: '~',
        replacement: resolve(__dirname, './resources'),
      },
    ],
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/scss/element/index.scss" as *;`,
      },
    },
  },

  plugins: [
    vue({
      reactivityTransform: true,
    }),
    adonis({ input: 'resources/js/app.ts' }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      dts: 'js/auto-imports.d.ts',
    }),
    Components({
      dirs: ['js/components'],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
      dts: 'js/components.d.ts',
    }),
  ],

  root: './resources',
  base: '/assets/',

  build: {
    outDir: '../public/assets',
    assetsDir: '',
    manifest: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
      input: './resources/js/app.ts',
    },
  },
})
