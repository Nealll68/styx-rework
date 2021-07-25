import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: true,

    themes: {
      dark: {
        primary: '#516dff',
        success: '#07d85b',
        warning: '#ffba00',
        error: '#f93155',
      }
    }
  }
})