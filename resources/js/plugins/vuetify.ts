import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default new Vuetify({
  theme: { 
    dark: true,
    themes : {
      dark: {
        primary: '#3f72af',
        error: '#E23E57',
        success: '#15A846',
        warning: '#FC8621',
      }
    } 
  }
})