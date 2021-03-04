import Vue from 'vue'
import router from '@/plugins/router'
import vuetify from '@/plugins/vuetify'

import App from '@/App.vue'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')