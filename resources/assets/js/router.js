import { createRouter, createWebHistory } from 'vue-router'
import Home from '../vue/pages/Home.vue'
import Login from '../vue/pages/Login.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router