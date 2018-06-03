<template>
<div>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link :to="{name: 'Home'}" class="navbar-brand">Home</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav mr-auto">
        <router-link :to="{name: 'Menu'}" tag="li" class="nav-item" active-class="active" exact>
          <a class="nav-link">Menu</a>
        </router-link>
        <router-link v-if="isUserLoggedIn" :to="{name: 'AdminPanel'}" tag="li" class="nav-item" active-class="active">
          <a class="nav-link">Admin panel</a>
        </router-link>
        <router-link v-if="isUserLoggedIn" :to="{name: 'Orders'}" tag="li" class="nav-item" active-class="active">
          <a class="nav-link">Orders</a>
        </router-link>
        <router-link v-if="isUserLoggedIn" :to="{name: 'DayReport'}" tag="li" class="nav-item" active-class="active">
          <a class="nav-link">Day report</a>
        </router-link>
      </ul>
      <div class="nav-item row" v-if="!isUserLoggedIn">
        <ul v-if="$store.state.basket.length" class="navbar-nav mr-auto">
          <router-link :to="{name: 'Basket'}" tag="li" class="nav-item ml-3" active-class="active" exact>
            <a class="nav-link">
              <icon name="shopping-basket"></icon>
              Basket
              <span class="badge badge-secondary">{{$store.state.basket.length}}</span>
            </a>
          </router-link>
        </ul>
      </div>
      <div v-else>
        <ul class="navbar-nav mr-auto">
          <router-link :to="{name: 'Settings'}" tag="li" class="nav-item" active-class="active" exact>
            <a class="nav-link">Settings</a>
          </router-link>
          <li class="nav-item">
            <a class="nav-link"  @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</div>
</template>
<script>
  export default {
    data() {
      return {
        model: {
          email: '',
          password: ''
        },
        error: false
      }
    },
    computed: {
      isUserLoggedIn() {
        return this.$store.getters.isUserLoggedIn
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('logout').then(() => {
          this.$router.push('/')
        })
      },
      signIn() {
        this.$store.dispatch('signIn', this.model).then(() => {
          this.$router.push('/')
          this.$refs.modal.hide()
        }).catch(() => {
          this.error = true
        })
      }
    }
  }
</script>
