import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import { dbMenuRef, dbOrderRef } from '../firebase/firebase-config'
import { firebaseMutations, firebaseAction } from 'vuexfire'

Vue.use(Vuex)

const state = {
  isUserLoggedIn: false,
  orderInProgress: false,
  users: [],
  basket: [],
  Menu: [],
  Order: []
}

const getters = {
  isUserLoggedIn: state => state.isUserLoggedIn,
  getUsers: state => state.users
}

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

const actions = {
  signIn({ commit, state, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(res => {
          commit('signIn', { uid: res.uid, email: res.email })
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  logout({ commit, state, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then(user => {
          commit('logout')
          resolve()
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  },
  setUsersList: firebaseAction(({ bindFirebaseRef }, { ref }) => {
    bindFirebaseRef('users', ref)
  }),
  addToBasket({ commit }, payload) {
    commit('addToBasket', payload)
  },
  recalcItem({ commit, state }, payload) {
    const qty = state.basket[payload].quantity
    const price = state.basket[payload].price
    const total = parseFloat(qty) * price
    commit('recalcItem', { index: payload, total })
  },
  incQty({ commit, state, dispatch }, payload) {
    commit('incQty', payload)
    dispatch('recalcItem', payload)
  },
  decQty({ commit, state, dispatch }, payload) {
    const quantity = state.basket[payload].quantity
    if (quantity === 1) {
      commit('removeItem', payload)
    } else {
      commit('decQty', payload)
      dispatch('recalcItem', payload)
    }
  },
  removeItem({ commit }, payload) {
    commit('removeItem', payload)
  },
  addPizza({ commit }, payload) {
    dbMenuRef.push(payload).then(res => {
      console.log(res)
    })
  },
  submitOrder({commit, state}, payload) {
    dbOrderRef.push(payload).then(res => {
      commit('orderInProgress', true)
      commit('clearBasket')
    })
  },
  importMenu: firebaseAction(({ bindFirebaseRef }, { ref }) => {
    bindFirebaseRef('Menu', ref)
  }),
  fetchOrders: firebaseAction(({ bindFirebaseRef }, { ref }) => {
    bindFirebaseRef('Order', ref)
  }),
  removeItemFromMenu({ commit }, payload) {
    dbMenuRef.child(payload.key).remove()
  },
  changeStatus({commit}, payload) {
    dbOrderRef.child(payload.id).update({status: payload.status})
  }
}

const store = new Vuex.Store({ state, getters, actions, mutations })
export { store }
