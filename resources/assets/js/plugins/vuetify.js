import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default new Vuetify({
  theme: { 
    dark: true, 
    dark: {
      primary: '#3f72af',
      secondary: '#424242',
      accent: '#82B1FF',
      error: '#E23E57',
      info: '#009688',
      success: '#15A846',
      warning: '#FC8621',
    }
  }
})

/*
$--color-primary: #3f72af;
$--color-success: #15A846;
$--color-warning: #FC8621;
$--color-danger: #E23E57;
$--color-info: #009688;
*/