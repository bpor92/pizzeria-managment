import { firebaseAction } from 'vuexfire'
import firebase from 'firebase'
import { dbMenuRef, dbOrderRef } from '../firebase/firebase-config'

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

export default actions
