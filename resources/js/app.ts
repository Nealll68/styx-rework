import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/inertia-vue3'
import { InertiaProgress } from '@inertiajs/progress'

import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'
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
  faGear,
  faPlay,
  faStop,
  faRotateLeft,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faUserPlus,
  faHouseFire,
  faUsers,
  faUser,
  faLock,
  faArrowRightFromBracket,
  faGear,
  faPlay,
  faStop,
  faRotateLeft
)

InertiaProgress.init({
  color: '#6072ab',
  showSpinner: true,
})

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
