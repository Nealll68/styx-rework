import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/inertia-vue3'

import 'element-plus/theme-chalk/dark/css-vars.css'
import '../scss/app.scss'

createInertiaApp({
  resolve: (name) => import(`./pages/${name}.vue`),
  setup({ el, app, props, plugin }) {
    createApp({ render: () => h(app, props) })
      .use(plugin)
      .mount(el)
  },
})
