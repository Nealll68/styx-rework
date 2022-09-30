import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/inertia-vue3'

import '../scss/app.scss'
import PageLayout from './PageLayout.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faUserPlus,
  faHouseFire,
  faUsers,
  faUser,
  faLock,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faUserPlus,
  faHouseFire,
  faUsers,
  faUser,
  faLock,
  faArrowRightFromBracket
)

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
      .component('font-awesome-icon', FontAwesomeIcon)
      .mount(el)
  },
})
