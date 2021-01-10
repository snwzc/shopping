import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'List',
    component: () => import('@/views/list.vue')
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('@/views/detail.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
