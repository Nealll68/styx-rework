const mix = require('laravel-mix')
const path = require('path')

// NOTE: Don't remove this, Because it's the default public folder path on AdonisJs
mix.setPublicPath('public')

// Add your assets here
mix
  .js('resources/assets/js/app.js', 'assets')
  .sass('resources/assets/scss/app.scss', 'assets')
  .vue()


  mix.webpackConfig({
    resolve: {
        alias: {
            "@js": path.resolve(
                __dirname,
                "resources/assets/js"
            ),
            "@sass": path.resolve(
                __dirname,
                "resources/assets/sass"
            ),
            "@vue": path.resolve(
              __dirname,
              "resources/assets/vue"
          ),
        }
    }
 })