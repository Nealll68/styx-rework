const mix = require('laravel-mix')
const path = require('path')

// NOTE: Don't remove this, Because it's the default public folder path on AdonisJs
mix.setPublicPath('public')

// Add your assets here
mix
  .js('resources/js/main.ts', 'assets')
  .sass('resources/scss/main.scss', 'assets')
  .vue()
  .webpackConfig({
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: /\.vue$/
          }
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.vue', '.ts'],
        alias: {
            "@": path.resolve(__dirname, "resources/js/")
        }
    }
 })