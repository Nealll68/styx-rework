import Vue from 'vue'
import router from '@js/plugins/router'
import vuetify from '@js/plugins/vuetify'

import App from '@vue/App.vue'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')