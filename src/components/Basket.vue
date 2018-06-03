<template>
  <div>
    <div v-if="$store.state.basket.length> 0">
      <b-table striped responsive  hover :items="$store.state.basket" :dark="true" :fields="fields">
        <template slot="show_details" slot-scope="row">
          <b-button size="sm" @click.stop="removeItem(row.index)" class="mr-2">Remove</b-button>
          <b-button size="sm" @click.stop="incQty(row.index)" class="mr-2">+</b-button>
          <b-button size="sm" @click.stop="decQty(row.index)" class="mr-2">-</b-button>
        </template>
      </b-table>
      <b-alert show variant="primary">Summary:  {{summary}}</b-alert>
      <b-card bg-variant="light" class="form-group">
        <b-form-group horizontal
          breakpoint="lg"
          label="Address"
          label-size="lg"
          label-class="font-weight-bold pt-0"
          class="mb-0">
          <b-form-group horizontal
            label="Street:"
            label-class="text-sm-right"
            label-for="nestedStreet">
            <b-form-input v-model="address.street"></b-form-input>
          </b-form-group>
          <b-form-group horizontal
            label="City:"
            label-class="text-sm-right"
            label-for="nestedCity">
            <b-form-input v-model="address.city"></b-form-input>
          </b-form-group>
          <b-form-group horizontal
            label="Telephone:"
            label-class="text-sm-right"
            label-for="nestedState">
            <b-form-input v-model="address.telephone"></b-form-input>
          </b-form-group>
        </b-form-group>
      </b-card>
      <b-button @click="submitOrder">Submit your order</b-button>
    </div>
    <div v-else v-for="status in showStatus" :key="status.id">
      <b-alert show variant="info" v-show="status.status ==='todo'">Your Order is waiting for confirmation</b-alert>
      <b-alert show variant="warning" v-show="status.status ==='inProgress'">Your Order is under preparation!</b-alert>
      <b-alert show variant="success" v-show="status.status ==='done'">Your pizza is on the way</b-alert>
    </div>
    <div v-if="$store.state.basket.length === 0 && !$store.state.orderInProgress">
      <b-alert show variant="light">Your basket its empty!</b-alert>
    </div>
  </div>
</template>

<script>
import { dbOrderRef } from '../firebase/firebase-config'
import { currentDate } from '../Helpers/date'

export default {
  data() {
    return {
      summaryOrder: 0,
      fields: {
        name: {
          label: 'Pizza'
        },
        total: {
          label: 'Price'
        },
        quantity: {
          label: 'Quantity'
        },
        show_details: {
          label: 'Option'
        }
      },
      address: {
        street: '',
        city: '',
        telephone: ''
      },
      orderId: false
    }
  },
  methods: {
    removeItem(index) {
      this.$store.dispatch('removeItem', index)
    },
    incQty(index) {
      this.$store.dispatch('incQty', index)
    },
    decQty(index) {
      this.$store.dispatch('decQty', index)
    },
    submitOrder() {
      const order = this.prepareOrder()
      this.orderId = order.id
      this.$store.dispatch('submitOrder', order)
    },
    fetchOrder() {
      this.$store.dispatch('fetchOrders', dbOrderRef)
    },
    prepareOrder() {
      const items = this.$store.state.basket.map(order => {
        return {
          pizza: order.name,
          quantity: order.quantity,
          price: parseFloat(order.price),
          total: parseFloat(order.total)
        }
      })

      return {
        id: Math.random()
          .toString(8)
          .slice(2, 6),
        details: items,
        total: this.summaryOrder,
        address: this.address,
        done: false,
        status: 'todo',
        date: currentDate
      }
    }
  },
  watch: {
    orderId() {
      this.fetchOrder()
    }
  },
  computed: {
    summary() {
      let summary = this.$store.state.basket.reduce(
        (a, b) => a + parseFloat(b.total),
        0
      )
      this.summaryOrder = parseFloat(summary)
      return summary
    },
    showStatus() {
      return this.$store.state.Order
        .filter(order => order.id === this.orderId)
    }
  }
}
</script>
