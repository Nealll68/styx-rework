import Vue from 'vue'
import router from './router'
import vuetify from './plugins/vuetify'

import App from './App.vue'

import '../css/main.css'

/*import VuetifyToast from 'vuetify-toast-snackbar-ng'

Vue.use(VuetifyToast, {
  x: 'top',
  y: 'middle',
  timeout: 6000
})*/

/*import Snackbar from '@/components/Snackbar.vue'

Vue.prototype.$toast = (type: string, message: string) => {
  //const ComponentClass = Vue.extend(Object.assign({ vuetify: Vue.prototype.$vuetify }, Snackbar))
  const container = document.querySelector('[data-app=true]') || document.body

  const instance = new Snackbar({
    propsData: {
      type,
      message
    },
    destroyed: () => {
      container.removeChild(instance.$el)
    }
  })

  container.appendChild(instance.$mount().$el)
}*/

new Vue({
  router,
  vuetify,
  components: { App },
  render: h => h(App)
}).$mount('#app')
