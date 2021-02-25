import { createApp } from 'vue'
import router from './router.js'

import ElementPlus from 'element-plus'
import '../scss/app.scss'

import App from '../vue/App.vue'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)

app.mount('#app')