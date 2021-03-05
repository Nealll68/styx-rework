import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router