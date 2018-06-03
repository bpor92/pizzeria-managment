import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate'

import App from './App.vue'
import { store } from './Store/store'
import router from './router'
import Icon from 'vue-awesome/components/Icon'

// font-awesome icons
import 'vue-awesome/icons/check'
import 'vue-awesome/icons/shopping-basket'

Vue.use(BootstrapVue)
Vue.use(VeeValidate, {fieldsBagName: 'formFields'})
Vue.component('icon', Icon)

/* eslint-disable */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
