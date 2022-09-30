import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/inertia-vue3'

import '../scss/app.scss'
import PageLayout from './PageLayout.vue'

createInertiaApp({
  resolve: (name) =>
    import(`./pages/${name}.vue`).then((module) => {
      if (name !== 'LoginPage') {
        module.default.layout = module.default.layout || PageLayout
      }

      return module.default
    }),
  setup({ el, app, props, plugin }) {
    createApp({ render: () => h(app, props) })
      .use(plugin)
      .mount(el)
  },
})
