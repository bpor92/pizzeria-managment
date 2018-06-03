<template>
  <div>
    <b-card
      header-text-variant="white"
      header-tag="header"
      header-bg-variant="dark"
      footer-bg-variant="white"
      :border-variant="statusBorder"
      >
      <div slot="header">
        {{order.address.city}}, {{order.address.street}}
        <span class="badge" :class="status">{{badgeInformation}}</span>
        <small class="d-block">telephone: {{order.address.telephone}}</small>
        <small class="text-muted">ID : {{order.id}}</small>
      </div>
      <div v-for="(detail, index) in order.details" :key="index">
        <p class="card-text" >{{detail.pizza}} {{detail.quantity > 1 ? 'x' + detail.quantity : ''}}</p>
      </div>
      <div class="text-right">
        <small>total: {{order.total}}</small>
      </div>
      <div  v-if="order.status !== 'done'" slot="footer">
        <button v-if="order.status === 'todo'" class="btn btn-default btn-block" @click="changeStatus(order['.key'], 'inProgress')">Prepare!</button>
        <button v-else class="btn btn-success btn-block" @click="changeStatus(order['.key'], 'done')">Done!</button>
      </div>
    </b-card>
  </div>
</template>

<script>
import {informationStatus, badgeStatus, borderStatus} from '../../Helpers/status'

export default {
  props: {
    order: {
      type: Object
    }
  },
  methods: {
    changeStatus(id, status) {
      this.$store.dispatch('changeStatus', { id, status })
    }
  },
  computed: {
    status() {
      return badgeStatus[this.order.status]
    },
    statusBorder() {
      return borderStatus[this.order.status]
    },
    badgeInformation() {
      return informationStatus[this.order.status]
    }
  }
}
</script>
