<template>
  <div id="app">
    <navigation></navigation>
    <div class="container">
      <router-view class="mt-5"></router-view>
    </div>
  </div>
</template>

<script>
import Navigation from './Layout/Navigation.vue'

export default {
  components: { Navigation }
}
</script>

<style>
  html {
  height: 100%;
  }
  body {
    min-height: 100%;
    background: url('./assets/pizza-background.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
  }
</style>

