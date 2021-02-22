import { createRouter, createWebHistory } from 'vue-router'
import Home from '../vue/pages/Home.vue'
import About from '../vue/pages/About.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router