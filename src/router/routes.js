import Vue from 'vue'
import VueRouter from 'vue-router'

import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/firestore'

import Home from '../Components/Home.vue'
import Settings from '../Components/Settings.vue'
import Menu from '../Components/Menu.vue'
import Basket from '../Components/Basket.vue'
import Panel from '../Components/Admin/Panel.vue'
import Admin from '../Components/Admin/Admin.vue'
import Orders from '../Components/Admin/Orders.vue'
import DayReport from '../Components/Admin/DayReport.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/', component: Home},
    {path: '/menu', component: Menu},
    {path: '/basket', component: Basket},
    {path: '/settings', component: Settings},
    {path: '/admin', component: Admin},
    {path: '/admin/panel',
      component: Panel,
      beforeEnter: (to, from, next) => {
        const user = firebase.auth().currentUser
        if (user) {
          next()
        } else {
          next(false)
        }
      }},
    {path: '/admin/orders',
      component: Orders,
      beforeEnter: (to, from, next) => {
        const user = firebase.auth().currentUser
        if (user) {
          next()
        } else {
          next(false)
        }
      }},
    {path: '/admin/day-report',
      component: DayReport,
      beforeEnter: (to, from, next) => {
        const user = firebase.auth().currentUser
        if (user) {
          next()
        } else {
          next(false)
        }
      }},
    {path: '*', redirect: '/'}
  ]

})

export default router
