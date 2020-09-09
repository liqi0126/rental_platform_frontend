import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/admin.vue'),
    meta: {
      title: '管理者界面'
    }
  },
  {
    path: '/user/:userId',
    name: 'user',
    component: () => import('../views/user.vue')
  },
  {
    path: '/equipment/:equipmentId',
    name: 'equipment',
    component: () => import('../views/equipment.vue')
  },
  {
    path: '/rent-application/:rentApplicationId',
    name: 'rent-application',
    component: () => import('../views/rent-application.vue')
  },
  {
    path: '/renter-application/:renterApplicationId',
    name: 'renter-application',
    component: () => import('../views/renter-application.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/logon',
    name: 'logon',
    component: () => import('../views/logon.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
