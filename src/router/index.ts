import { createRouter, createWebHistory, RouterOptions } from 'vue-router'
import Top from '../components/pages/PageTop.vue'
import Instructions from '../components/pages/PageInstructions.vue'
import Config from '../components/pages/PageConfig.vue'

const routes: RouterOptions['routes'] = [
  {
    path: '/',
    name: 'Top',
    component: Top,
  },
  {
    path: '/instructions',
    name: 'Instructions',
    component: Instructions,
  },
  {
    path: '/config',
    name: 'Config',
    component: Config,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
