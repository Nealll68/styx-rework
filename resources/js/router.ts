import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

// Pages
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'



Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]


const router = new VueRouter({
  mode: 'history',
  routes
})

export default router