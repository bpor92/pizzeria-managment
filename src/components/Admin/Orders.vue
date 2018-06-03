<template>
  <div>
    <b-card v-if="ordersTodo.length > 0" bg-variant="secondary" class="form-group col-xs-12 mx-auto">
      <h1 class="text-white text-center form-group">To do</h1>
      <div class="row">
        <Order v-for="order in ordersTodo"
          :key="order['.key']"
          :order="order"
          class="col-sm-3 mb-5"/>
      </div>
    </b-card>
    <b-card v-if="ordersInProgress.length > 0" bg-variant="secondary" class="form-group col-xs-12 mx-auto">
      <h1 class="text-white text-center form-group">In progress</h1>
      <div class="row">
        <Order v-for="order in ordersInProgress"
          :key="order['.key']"
          :order="order"
          class="col-sm-3 mb-5"/>
      </div>
    </b-card>
  </div>
</template>

<script>
import { dbOrderRef } from '../../firebase/firebase-config'
import Order from './Order.vue'

export default {
  components: {Order},
  created() {
    this.$store.dispatch('fetchOrders', dbOrderRef)
  },
  computed: {
    ordersTodo() {
      return this.$store.state.Order
        .filter(order => order.status === 'todo')
    },
    ordersInProgress() {
      return this.$store.state.Order
        .filter(order => order.status === 'inProgress')
    }
  }
}
</script>

