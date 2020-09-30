import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/create',
    name: 'Create',
    component: () => import('../views/PageCreate.vue')
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('../views/PageList.vue')
  },
  {
    path: '/list/task/:id',
    name: 'Task',
    component: () => import('../views/PageTask.vue')
  },
  {
    path: '*',
    redirect: {name: 'Create'}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
