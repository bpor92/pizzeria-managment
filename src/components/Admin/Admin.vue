<template>
  <div class="container">
    <b-card bg-variant="light" class="form-group col-xs-12 col-md-4 mx-auto">
      <div class="form-group">
        <label for="">Email</label>
        <input type="text" class="form-control" v-model="model.email">
      </div>
      <div class="form-group">
        <label for="">Password</label>
        <input type="password" class="form-control" v-model="model.password">
      </div>
      <div class="text-right">
        <button class="btn btn-primary" @click="signIn">Sign In</button>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    signIn() {
      this.$store.dispatch('signIn', this.model)
        .then(() => {
          this.$router.push('/admin/panel')
          this.$refs.modal.hide()
        })
        .catch(() => {
          this.error = true
        })
    }
  }
}
</script>
