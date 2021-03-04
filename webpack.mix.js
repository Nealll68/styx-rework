const mix = require('laravel-mix')
const path = require('path')

// NOTE: Don't remove this, Because it's the default public folder path on AdonisJs
mix.setPublicPath('public')

// Add your assets here
mix
  .js('resources/app.js', 'assets')
  .sass('resources/assets/app.scss', 'assets')
  .vue()


  mix.webpackConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources")
        }
    }
 })