<template>
  <div class="form-group">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{item.name}}</h5>
        <div class="form-group d-flex align-items-center">
          <img src="http://via.placeholder.com/150x100" alt="">
          <p class="card-text d-inline ml-2">{{item.description}}</p>
        </div>
        <div v-if="!isUserLoggedIn">
          <div v-if="isInBasket">
            <b-alert show variant="success">Product successful added to basket
              <icon name="check"></icon>
            </b-alert>
          </div>
          <div v-else>
            <a class="btn btn-success btn-block" @click="addToBasket({name: item.name, price: item.price, index, quantity: 1, total: item.price})">Add to basket</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object
    },
    index: {
      type: Number
    }
  },
  methods: {
    addToBasket(order) {
      this.$store.dispatch('addToBasket', order)
    }
  },
  computed: {
    isInBasket() {
      return this.$store.state.basket.find(item => item.name === this.item.name)
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn
    }
  }
}
</script>
