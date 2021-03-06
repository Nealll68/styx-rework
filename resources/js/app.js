import Vue from 'vue'
import { createInertiaApp } from '@inertiajs/inertia-vue'
import { InertiaProgress } from '@inertiajs/progress'
import vuetify from './plugins/vuetify'

import Layout from './Layout.vue'

InertiaProgress.init({
  color: '#516dff',
  showSpinner: true
})

createInertiaApp({
  resolve: name => import(`./pages/${name}.vue`).then(module => {
    if (name !== 'Login') {
      module.default.layout = module.default.layout || Layout      
    }
    
    return module.default
  }),

  setup({ el, app, props }) {
    new Vue({
      render: h => h(app, props),
      vuetify
    }).$mount(el)
  }
})