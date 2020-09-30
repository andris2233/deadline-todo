import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Create',
    component: () => import('../views/PageCreate.vue')
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('../views/PageList.vue')
  },
  {
    path: '/task/:id',
    name: 'Task',
    component: () => import('../views/PageTask.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
