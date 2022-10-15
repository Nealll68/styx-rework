import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/inertia-vue3'
import { InertiaProgress } from '@inertiajs/progress'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'
import 'element-plus/es/components/loading/style/css'
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
  faFolderOpen,
  faChevronDown,
  faStar,
  faTrash,
  faFileCirclePlus,
  faCheck,
  faQuestion,
  faFloppyDisk,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faUserPlus,
  faHouseFire,
  faUsers,
  faUser,
  faLock,
  faArrowRightFromBracket,
  faGear,
  faFolderOpen,
  faChevronDown,
  faStar,
  faTrash,
  faFileCirclePlus,
  faCheck,
  faQuestion,
  faFloppyDisk
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
      .use(autoAnimatePlugin)
      .component('font-awesome-icon', FontAwesomeIcon)
      .mount(el)
  },
})
