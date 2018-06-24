import Vue from 'vue'
import { firebaseMutations } from 'vuexfire'

const mutations = {
  ...firebaseMutations,
  signIn(state, payload) {
    Vue.set(state, 'isUserLoggedIn', payload.uid)
    Vue.set(state, 'email', payload.email)
  },
  logout(state) {
    Vue.set(state, 'isUserLoggedIn', null)
  },
  addToBasket(state, payload) {
    state.basket.push(payload)
  },
  removeItem(state, payload) {
    state.basket.splice(payload, 1)
  },
  recalcItem(state, payload) {
    Vue.set(state.basket[payload.index], 'total', payload.total)
  },
  incQty(state, payload) {
    Vue.set(state.basket, 'quantity', state.basket[payload].quantity++)
  },
  decQty(state, payload) {
    Vue.set(state.basket, 'quantity', state.basket[payload].quantity--)
  },
  orderInProgress(state, payload) {
    Vue.set(state, 'orderInProgress', payload)
  },
  clearBasket(state) {
    state.basket = []
  }
}

export default mutations
