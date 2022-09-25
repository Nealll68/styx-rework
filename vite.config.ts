import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import adonis from "@91codes/adonis-vite/build/plugins/adonis";

// https://vitejs.dev/config/
export default defineConfig({
  // resolve: {
  //   alias: [
  //     {
  //       find: "@",
  //       replacement: resolve(__dirname, "./resources/js"),
  //     },
  //   ],
  // },

  plugins: [vue(), adonis({ input: "resources/js/app.ts" })],

  // root: "./resources",
  // base: "/assets/",

  // build: {
  //   outDir: "../public/assets",
  //   assetsDir: "",
  //   manifest: true,
  //   rollupOptions: {
  //     output: {
  //       manualChunks: undefined,
  //     },
  //     input: "./resources/js/app.ts",
  //   },
  // },
});
