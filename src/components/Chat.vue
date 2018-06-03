<template>
  <div>
    <b-alert show variant="success">{{orderResponse}}</b-alert>
  </div>
</template>
<script>
import Pusher from 'pusher-js'
export default {
  created() {
    Pusher.logToConsole = true

    let pusher = new Pusher('d6bb628a284a3faefccd', {
      cluster: 'eu',
      encrypted: true
    })

    let channel = pusher.subscribe('orders')
    let that = this
    channel.bind('my-order', function(data) {
      this.message = true
      that.$emit('orderInProgress', data)
    })
    this.$on('orderInProgress', function (chatMessage) {
      this.orderInProgress(chatMessage)
    })
  },
  data() {
    return {
      orderResponse: ''
    }
  },
  methods: {
    orderInProgress(value) {
      this.orderResponse = value
    }
  }
}
</script>
