import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

import Home from '@/components/Home.vue'
import Settings from '@/components/Settings.vue'
import Menu from '@/components/Menu.vue'
import Basket from '@/components/Basket.vue'
import Panel from '@/components/Admin/Panel.vue'
import Admin from '@/components/Admin/Admin.vue'
import Orders from '@/components/Admin/Orders.vue'
import DayReport from '@/components/Admin/DayReport.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      name: 'Home'
    },
    {
      path: '/menu',
      component: Menu,
      name: 'Menu'
    },
    {
      path: '/basket',
      component: Basket,
      name: 'Basket'
    },
    {
      path: '/settings',
      component: Settings,
      name: 'Settings',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin',
      component: Admin,
      name: 'Admin'
    },
    {
      path: '/admin/panel',
      component: Panel,
      name: 'AdminPanel',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/orders',
      component: Orders,
      name: 'Orders',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/day-report',
      component: DayReport,
      name: 'DayReport',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    let user = firebase.auth().currentUser
    if (user) {
      next()
    } else {
      next({
        name: 'Admin'
      })
    }
  } else {
    next()
  }
})

export default router
