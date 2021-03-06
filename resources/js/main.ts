import Vue from 'vue'
import router from './router'
import vuetify from './plugins/vuetify'

import App from './App.vue'

import '../css/main.css'

new Vue({
  router,
  vuetify,
  components: { App },
  render: h => h(App)
}).$mount('#app')
