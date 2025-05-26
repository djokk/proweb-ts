import { createRouter, createWebHistory } from 'vue-router'
import LaunchesPage from '@/pages/LaunchesPage.vue'
import AboutPage from '@/pages/AboutPage.vue'

const routes = [
  { path: '/', component: LaunchesPage },
  { path: '/about', component: AboutPage },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
