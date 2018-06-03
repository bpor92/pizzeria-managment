<template>
  <div>
    <b-card bg-variant="light" class="form-group">
      <b-form-group horizontal
        breakpoint="lg"
        label="Add Pizza"
        label-size="lg"
        label-class="font-weight-bold pt-0"
        class="mb-0">
        <b-form-group horizontal
          label="Name:"
          label-class="text-sm-right"
          label-for="nestedStreet">
          <b-form-input id="nestedStreet" v-model="model.name"></b-form-input>
        </b-form-group>
        <b-form-group horizontal
          label="Description:"
          label-class="text-sm-right"
          label-for="nestedCity">
          <b-form-textarea
            id="nestedCity"
            v-model.trim="model.description"
            placeholder="Enter something"
            :rows="3"></b-form-textarea>
        </b-form-group>
        <b-form-group horizontal
          label="Price:"
          label-class="text-sm-right"
          label-for="nestedState">
          <b-form-input id="nestedState" v-model="model.price"></b-form-input>
        </b-form-group>
        <b-form-group horizontal
          label-class="text-sm-right"
          label-for="nestedState">
          <b-button variant="success" class="btn-block" @click="addPizza">Add</b-button>
        </b-form-group>
      </b-form-group>
    </b-card>
    <Menu />
  </div>
</template>

<script>
import Menu from '../Admin/Menu'

export default {
  components: {Menu},
  data() {
    return {
      model: {
        name: '',
        price: 0,
        description: ''
      }
    }
  },
  methods: {
    addPizza() {
      this.$store.dispatch('addPizza', this.model)
    }
  }
}
</script>
