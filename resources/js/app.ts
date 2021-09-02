import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import { createInertiaApp } from '@inertiajs/inertia-vue'
import { InertiaProgress } from '@inertiajs/progress'
import vuetify from './plugins/vuetify'
import { Notyf } from 'notyf'

import 'notyf/notyf.min.css'
import '../scss/app.scss'

import Layout from './Layout.vue'

Vue.use(VueCompositionAPI)

InertiaProgress.init({
  color: '#516dff',
  showSpinner: true
})

createInertiaApp({
  resolve: (name: string) => import(`./pages/${name}.vue`).then(module => {
    if (name !== 'Login') {
      module.default.layout = module.default.layout || Layout      
    }
    
    return module.default
  }),

  setup({ el, app, props }) {
    new Vue({
      provide: () => {
        return {
          notyf: new Notyf({
            position: { y: 'top', x: 'center'},
            duration: 6000,
            dismissible: true,
            // types: [
            //   {
            //     type: 'success',
            //     background: '#333',
            //     icon: {
            //       className: 'mdi mdi-check',
            //       tagName: 'i',
            //       color: '#07d85b',
            //     }
            //   }
            // ]
          })
        }
      },
      render: h => h(app, props),
      vuetify
    }).$mount(el)
  }
})